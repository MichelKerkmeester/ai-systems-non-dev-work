// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Sync Transaction                                                         ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { hashFile } = require('./hashing.cjs');
const { JOURNAL_REL_PATH, LOCK_REL_PATH, REPO_LOCK_FILENAME } = require('./paths.cjs');
const { readJsonStrict } = require('./util.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const STAGED_SUFFIX = '.ai-system-sync.staged';
const BACKUP_SUFFIX = '.ai-system-sync.bak';
// Keep stale locks recoverable without interrupting a live transaction.
const DEFAULT_STALE_LOCK_MS = 6 * 60 * 60 * 1000;

// ─────────────────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Error raised for general transaction failures. */
class TransactionError extends Error {}

/** Error raised when a prior transaction needs recovery. */
class InterruptedTransactionError extends Error {}

/** Error raised when the repository lock is held by another process. */
class RepoLockHeldError extends Error {}

/** Error raised when a source changes during a transaction. */
class SourceChangedError extends Error {}

/** Error raised when a deletion is not authorized by the prior lock. */
class DeleteNotAllowedError extends Error {}

function randomToken() {
  return crypto.randomBytes(6).toString('hex');
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. CORE LOGIC
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Acquire the single fleet-wide lock at the repo root. Only one `sync`
 * transaction may run anywhere in the fleet at a time, since the check
 * engine and a concurrent sync must never observe a package mid-swap.
 *
 * @param {string} repoRoot - Absolute repository root.
 * @param {{staleMs?: number}} [options] - Lock timing options.
 * @returns {{lockPath: string, release: Function}} Lock handle.
 * @throws {RepoLockHeldError} When the lock cannot be acquired.
 */
function acquireRepoLock(repoRoot, options) {
  const normalizedOptions = options || {};
  const staleMs = normalizedOptions.staleMs !== undefined
    ? normalizedOptions.staleMs
    : DEFAULT_STALE_LOCK_MS;
  const lockPath = path.join(repoRoot, REPO_LOCK_FILENAME);
  const payload = JSON.stringify({
    pid: process.pid,
    host: os.hostname(),
    acquiredAt: new Date().toISOString(),
  });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const fd = fs.openSync(lockPath, 'wx');
      fs.writeFileSync(fd, payload);
      fs.closeSync(fd);
      return {
        lockPath,
        release() {
          releaseLockIfOwned(lockPath, payload);
        },
      };
    } catch (err) {
      if (err.code !== 'EEXIST') throw err;
      if (attempt === 0 && isLockStale(lockPath, staleMs)) {
        try {
          fs.unlinkSync(lockPath);
        } catch {
          // Another process may have cleared it first, so retry the create.
        }
        continue;
      }
      throw new RepoLockHeldError(
        `Another sync transaction holds the repo lock (${lockPath}). ` +
          'Wait for it to finish, or investigate if it is stale.'
      );
    }
  }
  throw new RepoLockHeldError(
    `Could not acquire the repo lock at ${lockPath} after breaking a stale copy.`
  );
}

function isLockStale(lockPath, staleMs) {
  let stat;
  try {
    stat = fs.statSync(lockPath);
  } catch {
    return false;
  }
  const age = Date.now() - stat.mtimeMs;
  if (age > staleMs) return true;
  try {
    const data = readJsonStrict(lockPath);
    if (typeof data.pid === 'number' && data.host === os.hostname()) {
      try {
        process.kill(data.pid, 0);
        return false; // The process is alive, so the lock is legitimate.
      } catch (err) {
        return err.code === 'ESRCH'; // No such process means the previous holder died.
      }
    }
  } catch {
    return age > staleMs;
  }
  return false;
}

function releaseLockIfOwned(lockPath, expectedPayload) {
  try {
    const current = fs.readFileSync(lockPath, 'utf8');
    if (current === expectedPayload) fs.unlinkSync(lockPath);
  } catch {
    // Already gone or replaced; nothing to do.
  }
}

/**
 * Resolve the journal path for a package.
 *
 * @param {string} packageAbsRoot - Absolute package root.
 * @returns {string} Absolute journal path.
 */
function journalPath(packageAbsRoot) {
  return path.join(packageAbsRoot, JOURNAL_REL_PATH);
}

/**
 * Read the interrupted transaction journal when present.
 *
 * @param {string} packageAbsRoot - Absolute package root.
 * @returns {object|null} Parsed journal or null for a clean package.
 */
function detectInterruptedJournal(packageAbsRoot) {
  const journalAbsPath = journalPath(packageAbsRoot);
  if (!fs.existsSync(journalAbsPath)) return null;
  try {
    return readJsonStrict(journalAbsPath);
  } catch (err) {
    return {
      schemaVersion: 1,
      corrupt: true,
      path: journalAbsPath,
      error: err.message,
      operations: [],
    };
  }
}

/**
 * Roll back every operation the journal recorded as done, in reverse order,
 * then remove the journal and any leftover backup/staged files. This is the
 * only recovery strategy: forward-completing an interrupted transaction
 * from an unknown crash point is never attempted, since the safer,
 * deterministic move on a known-inconsistent package is always to restore
 * exactly what was there before the transaction began.
 *
 * @param {string} packageAbsRoot - Absolute package root.
 * @returns {{recovered: boolean, reason?: string, rolledBack?: number, totalOperations?: number}}
 *   Recovery result.
 */
function recoverInterruptedJournal(packageAbsRoot) {
  const journalAbsPath = journalPath(packageAbsRoot);
  const journal = detectInterruptedJournal(packageAbsRoot);
  if (!journal) return { recovered: false, reason: 'no-journal' };

  const operations = Array.isArray(journal.operations) ? journal.operations : [];
  const completedOperations = operations.filter((operation) => operation.done);
  // Roll back every operation, not only ones marked done: a single
  // The operation's apply step can move a backup before it is marked done,
  // So rollback also covers operations that appear incomplete in the journal.
  for (const operation of [...operations].reverse()) {
    rollbackOperation(packageAbsRoot, operation);
  }
  // Clean up any staged files from operations that never completed.
  for (const operation of operations) {
    const stagedAbs = operation.staged && path.join(packageAbsRoot, operation.staged);
    if (stagedAbs && fs.existsSync(stagedAbs)) {
      try {
        fs.unlinkSync(stagedAbs);
      } catch {
        // Best-effort cleanup is sufficient after recovery restored the target.
      }
    }
  }
  fs.unlinkSync(journalAbsPath);
  return {
    recovered: true,
    rolledBack: completedOperations.length,
    totalOperations: operations.length,
  };
}

function rollbackOperation(packageAbsRoot, operation) {
  const targetAbs = path.join(packageAbsRoot, operation.target);
  const backupAbs = operation.backup ? path.join(packageAbsRoot, operation.backup) : null;
  if (operation.type === 'write') {
    if (backupAbs && fs.existsSync(backupAbs)) {
      fs.renameSync(backupAbs, targetAbs); // Restore prior content during rollback.
    } else if (!operation.existedBefore) {
      // Target did not exist before this transaction created it.
      try {
        fs.unlinkSync(targetAbs);
      } catch {
        // Already gone, so there is nothing left to restore.
      }
    }
  } else if (operation.type === 'delete') {
    if (backupAbs && fs.existsSync(backupAbs)) {
      fs.renameSync(backupAbs, targetAbs); // Restore the deleted file during rollback.
    }
  }
}

/**
 * The set of package-root-relative paths the previous `package-lock.json`
 * (if any) declared as safe to auto-delete. A missing or unreadable lock
 * authorizes nothing: with no prior lock, nothing has ever been recorded as
 * deletable, so the safe default is to allow no automatic deletion at all.
 */
function loadPreviouslyDeletable(packageAbsRoot) {
  const lockAbs = path.join(packageAbsRoot, LOCK_REL_PATH);
  if (!fs.existsSync(lockAbs)) return new Set();
  try {
    const lock = readJsonStrict(lockAbs);
    return new Set(Array.isArray(lock.deletable) ? lock.deletable : []);
  } catch {
    return new Set();
  }
}

/**
 * Enforce the council protocol's named guardrail: only files the previous
 * package lock itself declared deletable may be removed automatically.
 * Without this, a caller's operations array could delete anything under the
 * package root; checking it here, at the one place every deletion must pass
 * through, keeps the guarantee true regardless of how many callers build
 * operations arrays in the future.
 */
function assertDeletesAreAuthorized(packageAbsRoot, operations) {
  const deleteOperations = operations.filter((operation) => operation.type === 'delete');
  if (!deleteOperations.length) return;
  const previouslyDeletable = loadPreviouslyDeletable(packageAbsRoot);
  const unauthorized = deleteOperations
    .map((operation) => operation.target)
    .filter((target) => !previouslyDeletable.has(target));
  if (unauthorized.length) {
    throw new DeleteNotAllowedError(
      `Refusing to auto-delete file(s) not listed in the previous ${LOCK_REL_PATH}'s ` +
        '"deletable" set: ' +
        `${unauthorized.join(', ')}`
    );
  }
}

/**
 * Run a staged, journaled sync transaction with rollback on failure.
 *
 * @param {object} params
 * @param {string} params.repoRoot
 * @param {string} params.packageAbsRoot
 * @param {Array<{type: 'write'|'delete', target: string, content?: Buffer}>} params.operations
 *   `target` is package-root-relative. `write` covers both create and
 *   replace; `content` is required for `write`.
 * @param {Array<{path: string, expectedSha256: string}>} [params.rehashSources]
 *   Source files (package-root-relative) to re-hash immediately before
 *   applying, aborting the whole transaction if any changed since planning.
 * @param {(stagedPaths: Map<string,string>) => void} [params.validateStaged]
 *   Called after every operation's content is staged but before anything is
 *   applied; receives target -> staged absolute path. Throw to abort.
 * @param {() => void} [params.writeLockFileLast]
 *   Called after every apply succeeds, before the journal/backups are
 *   cleared - this is where the caller writes package-lock.json, satisfying
 *   "write package-lock.json last".
 * @returns {{applied: number}} Transaction result.
 * @throws {InterruptedTransactionError} When a prior journal is present.
 * @throws {SourceChangedError} When a source changes during staging.
 */
function runSyncTransaction(params) {
  const {
    repoRoot,
    packageAbsRoot,
    operations,
    rehashSources,
    validateStaged,
    writeLockFileLast,
  } = params;

  const existing = detectInterruptedJournal(packageAbsRoot);
  if (existing) {
    throw new InterruptedTransactionError(
      `Cannot start a new sync: an interrupted transaction is present at ` +
        `${journalPath(packageAbsRoot)}. ` +
        'Run the recovery path first.'
    );
  }

  assertDeletesAreAuthorized(packageAbsRoot, operations);

  const lock = acquireRepoLock(repoRoot);
  try {
    // Stage every operation's new content into a same-filesystem sibling file.
    const stagedPaths = new Map();
    for (const operation of operations) {
      if (operation.type !== 'write') continue;
      const targetAbs = path.join(packageAbsRoot, operation.target);
      const stagedAbs = `${targetAbs}${STAGED_SUFFIX}.${randomToken()}`;
      fs.mkdirSync(path.dirname(stagedAbs), { recursive: true });
      fs.writeFileSync(stagedAbs, operation.content);
      stagedPaths.set(operation.target, stagedAbs);
    }

    try {
      // Validate the staged package completely before touching real files.
      if (validateStaged) validateStaged(stagedPaths);

      // Rehash sources so a concurrent edit cannot be overwritten silently.
      for (const source of rehashSources || []) {
        const absolutePath = path.join(packageAbsRoot, source.path);
        const liveHash = hashFile(absolutePath).sha256;
        if (liveHash !== source.expectedSha256) {
          throw new SourceChangedError(`Source changed during sync, aborting: ${source.path}`);
        }
      }
    } catch (err) {
      cleanupStaged(stagedPaths);
      throw err;
    }

    // Journal every replacement or deletion before touching a real path.
    const journalOperations = operations.map((operation) => ({
      type: operation.type,
      target: operation.target,
      staged: operation.type === 'write'
        ? path.relative(packageAbsRoot, stagedPaths.get(operation.target))
        : null,
      backup: `${operation.target}${BACKUP_SUFFIX}`,
      existedBefore: fs.existsSync(path.join(packageAbsRoot, operation.target)),
      done: false,
    }));
    const journalAbsPath = journalPath(packageAbsRoot);
    fs.mkdirSync(path.dirname(journalAbsPath), { recursive: true });
    writeJournal(journalAbsPath, journalOperations);

    try {
      // Apply atomically and update the journal after each successful operation.
      for (const operation of journalOperations) {
        applyOperation(packageAbsRoot, operation);
        operation.done = true;
        writeJournal(journalAbsPath, journalOperations);
      }
    } catch (err) {
      // Roll back every operation because the in-flight operation may have moved
      // The in-flight operation may have moved its backup before the failure.
      for (const operation of [...journalOperations].reverse()) {
        rollbackOperation(packageAbsRoot, operation);
      }
      cleanupBackups(packageAbsRoot, journalOperations);
      cleanupStagedFromJournal(packageAbsRoot, journalOperations);
      fs.unlinkSync(journalAbsPath);
      throw err;
    }

    // Write package-lock.json last, once every real file is in place.
    if (writeLockFileLast) writeLockFileLast();

    // Drop backups and the journal only after the transaction is complete.
    cleanupBackups(packageAbsRoot, journalOperations);
    fs.unlinkSync(journalAbsPath);

    return { applied: journalOperations.length };
  } finally {
    lock.release();
  }
}

function writeJournal(journalAbsPath, journalOperations) {
  fs.writeFileSync(
    journalAbsPath,
    JSON.stringify(
      { schemaVersion: 1, updatedAt: new Date().toISOString(), operations: journalOperations },
      null,
      2
    )
  );
}

function applyOperation(packageAbsRoot, operation) {
  const targetAbs = path.join(packageAbsRoot, operation.target);
  const backupAbs = path.join(packageAbsRoot, operation.backup);
  if (operation.type === 'write') {
    if (fs.existsSync(targetAbs)) {
      fs.renameSync(targetAbs, backupAbs);
    }
    const stagedAbs = path.join(packageAbsRoot, operation.staged);
    fs.mkdirSync(path.dirname(targetAbs), { recursive: true });
    fs.renameSync(stagedAbs, targetAbs);
  } else if (operation.type === 'delete') {
    if (fs.existsSync(targetAbs)) {
      fs.renameSync(targetAbs, backupAbs);
    }
  }
}

function cleanupStaged(stagedPaths) {
  for (const stagedAbs of stagedPaths.values()) {
    try {
      fs.unlinkSync(stagedAbs);
    } catch {
      // Best-effort cleanup is sufficient after validation fails.
    }
  }
}

function cleanupStagedFromJournal(packageAbsRoot, journalOperations) {
  for (const operation of journalOperations) {
    if (!operation.staged) continue;
    const stagedAbs = path.join(packageAbsRoot, operation.staged);
    try {
      fs.unlinkSync(stagedAbs);
    } catch {
      // The file was already swapped or never existed, so cleanup is complete.
    }
  }
}

function cleanupBackups(packageAbsRoot, journalOperations) {
  for (const operation of journalOperations) {
    const backupAbs = path.join(packageAbsRoot, operation.backup);
    if (fs.existsSync(backupAbs)) {
      try {
        fs.unlinkSync(backupAbs);
      } catch {
        // Best-effort cleanup is sufficient after the backup is no longer needed.
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  acquireRepoLock,
  detectInterruptedJournal,
  recoverInterruptedJournal,
  runSyncTransaction,
  journalPath,
  TransactionError,
  InterruptedTransactionError,
  RepoLockHeldError,
  SourceChangedError,
  DeleteNotAllowedError,
};
