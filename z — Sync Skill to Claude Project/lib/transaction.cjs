// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ Sync Transaction                                                         ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS/REQUIRES
// ─────────────────────────────────────────────────────────────────────────────

const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { hashFile } = require('./hashing.cjs');
const {
  UnsafePathError,
  resolveContainedPath,
  resolvePackageRoot,
} = require('./path-safety.cjs');
const { JOURNAL_REL_PATH, LOCK_REL_PATH, REPO_LOCK_FILENAME } = require('./paths.cjs');
const { readJsonStrict } = require('./util.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const STAGED_SUFFIX = '.ai-system-sync.staged';
const BACKUP_SUFFIX = '.ai-system-sync.bak';
const LOCK_OWNER_MARKER = '.owner.';
const JOURNAL_STATE_APPLYING = 'applying';
const JOURNAL_STATE_COMMITTED = 'committed';
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

/** Error raised when journal bytes cannot be trusted for automatic recovery. */
class CorruptJournalError extends Error {}

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
  const lockBasePath = path.join(repoRoot, REPO_LOCK_FILENAME);
  const token = randomToken();
  const ownerPath = `${lockBasePath}${LOCK_OWNER_MARKER}${token}`;
  const payload = JSON.stringify({
    pid: process.pid,
    host: os.hostname(),
    acquiredAt: new Date().toISOString(),
    processIdentity: readProcessIdentity(process.pid),
    token,
  });

  try {
    createOwnedFile(ownerPath, payload);
  } catch (err) {
    throw err;
  }

  try {
    const snapshots = listRepoLockSnapshots(repoRoot, staleMs);
    const activeContenders = snapshots.filter(
      (snapshot) => snapshot.path !== ownerPath && !snapshot.isStale
    );
    if (activeContenders.length) {
      throw new RepoLockHeldError(
        `Another sync transaction holds the repo lock (${activeContenders[0].path}). ` +
          'Wait for it to finish.'
      );
    }
    acquireFixedLock(lockBasePath, payload, staleMs);
    for (const snapshot of snapshots) {
      if (
        snapshot.path !== ownerPath &&
        snapshot.path.includes(LOCK_OWNER_MARKER) &&
        snapshot.isStale
      ) {
        removeSnapshotIfUnchanged(snapshot);
      }
    }
  } catch (err) {
    releaseLockIfOwned(ownerPath, payload);
    throw err;
  }
  return {
    lockPath: lockBasePath,
    release() {
      releaseLockIfOwned(lockBasePath, payload);
      releaseLockIfOwned(ownerPath, payload);
    },
  };
}

function readProcessIdentity(pid) {
  const result = spawnSync('ps', ['-o', 'lstart=', '-p', String(pid)], {
    encoding: 'utf8',
  });
  if (result.status !== 0) return null;
  const identity = (result.stdout || '').trim();
  return identity || null;
}

function acquireFixedLock(lockPath, payload, staleMs) {
  try {
    createOwnedFile(lockPath, payload);
    return;
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
  const snapshot = inspectLockFile(lockPath, staleMs);
  if (!snapshot || !snapshot.isStale || !removeSnapshotIfUnchanged(snapshot)) {
    throw new RepoLockHeldError(
      `Another sync transaction holds the repo lock (${lockPath}). Wait for it to finish.`
    );
  }
  try {
    createOwnedFile(lockPath, payload);
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
    throw new RepoLockHeldError(
      `Another sync transaction acquired the repo lock (${lockPath}). Wait for it to finish.`
    );
  }
}

function createOwnedFile(absolutePath, payload) {
  let fd;
  let created = false;
  try {
    fd = fs.openSync(absolutePath, 'wx');
    created = true;
    fs.writeFileSync(fd, payload);
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fd = undefined;
  } catch (err) {
    if (fd !== undefined) {
      try {
        fs.closeSync(fd);
      } catch {
        // Cleanup below still removes the partially initialized ownership file.
      }
    }
    if (created) {
      try {
        fs.unlinkSync(absolutePath);
      } catch {
        // Preserve the original creation failure.
      }
    }
    throw err;
  }
}

function inspectLockFile(lockPath, staleMs) {
  let stat;
  let payload;
  try {
    stat = fs.statSync(lockPath);
    payload = fs.readFileSync(lockPath, 'utf8');
  } catch {
    return null;
  }
  const age = Date.now() - stat.mtimeMs;
  try {
    const data = JSON.parse(payload);
    if (typeof data.pid === 'number' && data.host === os.hostname()) {
      try {
        process.kill(data.pid, 0);
        if (typeof data.processIdentity === 'string') {
          const currentIdentity = readProcessIdentity(data.pid);
          if (currentIdentity && currentIdentity !== data.processIdentity) {
            return { path: lockPath, payload, stat, isStale: true };
          }
        } else if (age > staleMs) {
          return { path: lockPath, payload, stat, isStale: true };
        }
        return { path: lockPath, payload, stat, isStale: false };
      } catch (err) {
        return { path: lockPath, payload, stat, isStale: err.code === 'ESRCH' };
      }
    }
  } catch {
    // Malformed and foreign-host locks become recoverable only after the age threshold.
  }
  return { path: lockPath, payload, stat, isStale: age > staleMs };
}

function removeSnapshotIfUnchanged(snapshot) {
  try {
    const currentStat = fs.statSync(snapshot.path);
    const currentPayload = fs.readFileSync(snapshot.path, 'utf8');
    if (
      currentPayload !== snapshot.payload ||
      currentStat.dev !== snapshot.stat.dev ||
      currentStat.ino !== snapshot.stat.ino
    ) {
      return false;
    }
    fs.unlinkSync(snapshot.path);
    return true;
  } catch (err) {
    return err.code === 'ENOENT';
  }
}

function listRepoLockSnapshots(repoRoot, staleMs) {
  const lockBasename = path.basename(REPO_LOCK_FILENAME);
  let names;
  try {
    names = fs.readdirSync(repoRoot);
  } catch {
    return [];
  }
  return names
    .filter(
      (name) =>
        name === lockBasename || name.startsWith(`${lockBasename}${LOCK_OWNER_MARKER}`)
    )
    .map((name) => inspectLockFile(path.join(repoRoot, name), staleMs))
    .filter(Boolean);
}

function inspectRepoLock(repoRoot, options) {
  const staleMs = options && options.staleMs !== undefined
    ? options.staleMs
    : DEFAULT_STALE_LOCK_MS;
  const lockPath = path.join(repoRoot, REPO_LOCK_FILENAME);
  const snapshots = listRepoLockSnapshots(repoRoot, staleMs);
  if (snapshots.some((snapshot) => !snapshot.isStale)) return { state: 'held', lockPath };
  if (snapshots.length) return { state: 'stale', lockPath };
  return { state: 'absent', lockPath };
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

function assertSafePackageRoot(repoRoot, packageAbsRoot) {
  const relative = path.relative(path.resolve(repoRoot), path.resolve(packageAbsRoot));
  const normalized = relative.split(path.sep).join('/');
  const resolved = resolvePackageRoot(repoRoot, normalized);
  if (path.resolve(resolved) !== path.resolve(packageAbsRoot)) {
    throw new UnsafePathError(`Package root does not match its repository path: ${packageAbsRoot}`);
  }
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

function validateJournal(packageAbsRoot, journal, options) {
  const normalizedOptions = options || {};
  if (journal.corrupt) {
    throw new CorruptJournalError(
      `Cannot recover corrupt ${JOURNAL_REL_PATH}: ${journal.error}. ` +
        'The journal was preserved for manual inspection.'
    );
  }
  if (
    typeof journal !== 'object' ||
    journal === null ||
    Array.isArray(journal) ||
    journal.schemaVersion !== 1 ||
    !Array.isArray(journal.operations)
  ) {
    throw new CorruptJournalError(
      `Cannot recover invalid ${JOURNAL_REL_PATH}: expected schemaVersion 1 and operations array.`
    );
  }
  if (
    journal.operations.length > 0 &&
    !(normalizedOptions.allowedTargets instanceof Set)
  ) {
    throw new CorruptJournalError(
      `Cannot recover ${JOURNAL_REL_PATH} without a compiler-owned target allowlist.`
    );
  }
  const allowedJournalKeys = new Set(['schemaVersion', 'state', 'updatedAt', 'operations']);
  const unknownJournalKeys = Object.keys(journal).filter((key) => !allowedJournalKeys.has(key));
  if (unknownJournalKeys.length) {
    throw new CorruptJournalError(
      `Cannot recover invalid ${JOURNAL_REL_PATH}: unknown field(s) ${unknownJournalKeys.join(', ')}.`
    );
  }
  const state = journal.state || JOURNAL_STATE_APPLYING;
  if (![JOURNAL_STATE_APPLYING, JOURNAL_STATE_COMMITTED].includes(state)) {
    throw new CorruptJournalError(`Cannot recover invalid ${JOURNAL_REL_PATH}: invalid state.`);
  }
  if (
    journal.updatedAt !== undefined &&
    (typeof journal.updatedAt !== 'string' || Number.isNaN(Date.parse(journal.updatedAt)))
  ) {
    throw new CorruptJournalError(`Cannot recover invalid ${JOURNAL_REL_PATH}: invalid updatedAt.`);
  }
  const seenTargets = new Set();
  for (const [index, operation] of journal.operations.entries()) {
    if (!operation || typeof operation !== 'object' || Array.isArray(operation)) {
      throw new CorruptJournalError(`Journal operation ${index} must be an object.`);
    }
    const allowedOperationKeys = new Set([
      'type',
      'target',
      'staged',
      'backup',
      'existedBefore',
      'done',
    ]);
    const unknownOperationKeys = Object.keys(operation).filter(
      (key) => !allowedOperationKeys.has(key)
    );
    if (unknownOperationKeys.length) {
      throw new CorruptJournalError(
        `Journal operation ${index} has unknown field(s): ${unknownOperationKeys.join(', ')}.`
      );
    }
    if (!['write', 'delete'].includes(operation.type)) {
      throw new CorruptJournalError(`Journal operation ${index} has an invalid type.`);
    }
    if (typeof operation.target !== 'string' || operation.target.length === 0) {
      throw new CorruptJournalError(`Journal operation ${index} has an invalid target.`);
    }
    if (seenTargets.has(operation.target)) {
      throw new CorruptJournalError(`Journal has duplicate target: ${operation.target}.`);
    }
    seenTargets.add(operation.target);
    if (
      normalizedOptions.allowedTargets instanceof Set &&
      !normalizedOptions.allowedTargets.has(operation.target)
    ) {
      throw new CorruptJournalError(
        `Journal operation ${index} targets a non-compiler-owned path: ${operation.target}.`
      );
    }
    if (typeof operation.backup !== 'string') {
      throw new CorruptJournalError(`Journal operation ${index} has an invalid backup path.`);
    }
    if (typeof operation.existedBefore !== 'boolean' || typeof operation.done !== 'boolean') {
      throw new CorruptJournalError(
        `Journal operation ${index} must declare boolean existedBefore and done fields.`
      );
    }
    if (operation.type === 'delete' && operation.staged !== null) {
      throw new CorruptJournalError(`Journal delete operation ${index} must have staged: null.`);
    }
    if (
      operation.type === 'write' &&
      operation.staged !== null &&
      typeof operation.staged !== 'string'
    ) {
      throw new CorruptJournalError(`Journal write operation ${index} has an invalid staged path.`);
    }
    if (state === JOURNAL_STATE_COMMITTED && !operation.done) {
      throw new CorruptJournalError(
        `Committed journal operation ${index} is not marked complete.`
      );
    }
    try {
      resolveContainedPath(packageAbsRoot, operation.target);
      resolveContainedPath(packageAbsRoot, operation.backup);
      if (operation.staged) resolveContainedPath(packageAbsRoot, operation.staged);
    } catch (err) {
      if (err instanceof UnsafePathError) {
        throw new CorruptJournalError(`Journal operation ${index} is unsafe: ${err.message}`);
      }
      throw err;
    }
    if (operation.backup !== `${operation.target}${BACKUP_SUFFIX}`) {
      throw new CorruptJournalError(`Journal operation ${index} has an unexpected backup path.`);
    }
    if (
      operation.staged &&
      !operation.staged.startsWith(`${operation.target}${STAGED_SUFFIX}.`)
    ) {
      throw new CorruptJournalError(`Journal operation ${index} has an unexpected staged path.`);
    }
    if (operation.staged) {
      const targetDirectory = path.posix.dirname(operation.target);
      const stagedDirectory = path.posix.dirname(operation.staged);
      const expectedPrefix = `${path.posix.basename(operation.target)}${STAGED_SUFFIX}.`;
      const stagedBasename = path.posix.basename(operation.staged);
      const token = stagedBasename.slice(expectedPrefix.length);
      if (
        stagedDirectory !== targetDirectory ||
        !stagedBasename.startsWith(expectedPrefix) ||
        !/^[a-f0-9]{12}$/.test(token)
      ) {
        throw new CorruptJournalError(
          `Journal operation ${index} staged path is not a direct target sibling.`
        );
      }
      const stagedAbs = path.join(packageAbsRoot, operation.staged);
      if (fs.existsSync(stagedAbs) && fs.lstatSync(stagedAbs).isSymbolicLink()) {
        throw new CorruptJournalError(
          `Journal operation ${index} staged path must not be a symlink.`
        );
      }
    }
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
 * @param {string} repoRoot - Absolute repository root.
 * @param {string} packageAbsRoot - Absolute package root.
 * @returns {{recovered: boolean, reason?: string, rolledBack?: number, totalOperations?: number}}
 *   Recovery result.
 */
function recoverInterruptedJournal(repoRoot, packageAbsRoot, options) {
  assertSafePackageRoot(repoRoot, packageAbsRoot);
  const lock = acquireRepoLock(repoRoot);
  try {
    const journalAbsPath = journalPath(packageAbsRoot);
    const journal = detectInterruptedJournal(packageAbsRoot);
    if (!journal) return { recovered: false, reason: 'no-journal' };
    validateJournal(packageAbsRoot, journal, options);

    const operations = journal.operations;
    const completedOperations = operations.filter((operation) => operation.done);
    if (journal.state === JOURNAL_STATE_COMMITTED) {
      cleanupStagedFromJournal(packageAbsRoot, operations);
      cleanupBackups(packageAbsRoot, operations);
      fs.unlinkSync(journalAbsPath);
      return {
        recovered: true,
        action: 'finalized',
        rolledBack: 0,
        totalOperations: operations.length,
      };
    }
    // Roll back every operation because a crash can happen after backup creation
    // but before the journal records the operation as complete.
    for (const operation of [...operations].reverse()) {
      rollbackOperation(packageAbsRoot, operation);
    }
    cleanupStagedFromJournal(packageAbsRoot, operations);
    cleanupBackups(packageAbsRoot, operations);
    fs.unlinkSync(journalAbsPath);
    return {
      recovered: true,
      rolledBack: completedOperations.length,
      totalOperations: operations.length,
    };
  } finally {
    lock.release();
  }
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

function assertTransactionPaths(repoRoot, packageAbsRoot, operations, rehashSources) {
  const seenTargets = new Set();
  for (const operation of operations) {
    if (!operation || !['write', 'delete'].includes(operation.type)) {
      throw new TransactionError('Sync operations must be write or delete records.');
    }
    if (seenTargets.has(operation.target)) {
      throw new TransactionError(`Duplicate sync operation target: ${operation.target}`);
    }
    seenTargets.add(operation.target);
    resolveContainedPath(packageAbsRoot, operation.target);
    if (operation.type === 'write' && !Buffer.isBuffer(operation.content)) {
      throw new TransactionError(`Write operation content must be a Buffer: ${operation.target}`);
    }
  }
  for (const source of rehashSources || []) {
    resolveContainedPath(packageAbsRoot, source.path, {
      mustExist: source.expectedExists !== false,
      realBoundaryAbs: source.allowRepoBoundary ? repoRoot : packageAbsRoot,
    });
  }
}

function stageWrite(packageAbsRoot, operation) {
  const targetAbs = resolveContainedPath(packageAbsRoot, operation.target);
  const stagedAbs = `${targetAbs}${STAGED_SUFFIX}.${randomToken()}`;
  fs.mkdirSync(path.dirname(stagedAbs), { recursive: true });
  fs.writeFileSync(stagedAbs, operation.content);
  return stagedAbs;
}

function buildJournalOperation(packageAbsRoot, operation, stagedAbs) {
  return {
    type: operation.type,
    target: operation.target,
    staged: operation.type === 'write'
      ? path.relative(packageAbsRoot, stagedAbs).split(path.sep).join('/')
      : null,
    backup: `${operation.target}${BACKUP_SUFFIX}`,
    existedBefore: fs.existsSync(path.join(packageAbsRoot, operation.target)),
    done: false,
  };
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
 * @param {() => Buffer|null} [params.renderLockFileLast]
 *   Called after normal operations apply. Returned bytes are journaled and
 *   written to package-lock.json last; null leaves a current lock untouched.
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
    renderLockFileLast,
  } = params;

  assertSafePackageRoot(repoRoot, packageAbsRoot);
  const lock = acquireRepoLock(repoRoot);
  try {
    const existing = detectInterruptedJournal(packageAbsRoot);
    if (existing) {
      throw new InterruptedTransactionError(
        `Cannot start a new sync: an interrupted transaction is present at ` +
          `${journalPath(packageAbsRoot)}. Run the recovery path first.`
      );
    }

    assertTransactionPaths(repoRoot, packageAbsRoot, operations, rehashSources);
    if (renderLockFileLast && operations.some((operation) => operation.target === LOCK_REL_PATH)) {
      throw new TransactionError(
        `${LOCK_REL_PATH} must be supplied only through renderLockFileLast.`
      );
    }
    assertDeletesAreAuthorized(packageAbsRoot, operations);

    const stagedPaths = new Map();
    try {
      // Stage every operation's new content into a same-filesystem sibling file.
      for (const operation of operations) {
        if (operation.type !== 'write') continue;
        stagedPaths.set(operation.target, stageWrite(packageAbsRoot, operation));
      }

      // Validate the staged package completely before touching real files.
      if (validateStaged) validateStaged(stagedPaths);

      // Rehash sources so a concurrent edit cannot be overwritten silently.
      for (const source of rehashSources || []) {
        const absolutePath = resolveContainedPath(packageAbsRoot, source.path, {
          mustExist: source.expectedExists !== false,
          realBoundaryAbs: source.allowRepoBoundary ? repoRoot : packageAbsRoot,
        });
        const exists = fs.existsSync(absolutePath);
        const expectedExists = source.expectedExists !== false;
        if (exists !== expectedExists) {
          throw new SourceChangedError(`Source changed during sync, aborting: ${source.path}`);
        }
        if (!exists) continue;
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
    const journalOperations = operations.map((operation) =>
      buildJournalOperation(packageAbsRoot, operation, stagedPaths.get(operation.target))
    );
    const journalAbsPath = journalPath(packageAbsRoot);
    let journalWritten = false;
    if (journalOperations.length) {
      try {
        fs.mkdirSync(path.dirname(journalAbsPath), { recursive: true });
        writeJournal(journalAbsPath, journalOperations, JOURNAL_STATE_APPLYING);
      } catch (err) {
        cleanupStaged(stagedPaths);
        throw err;
      }
      journalWritten = true;
    }

    try {
      // Apply atomically and update the journal after each successful operation.
      for (const operation of journalOperations) {
        applyOperation(packageAbsRoot, operation);
        operation.done = true;
        writeJournal(journalAbsPath, journalOperations, JOURNAL_STATE_APPLYING);
      }

      if (renderLockFileLast) {
        const lockContent = renderLockFileLast();
        if (lockContent !== null && lockContent !== undefined) {
          if (!Buffer.isBuffer(lockContent)) {
            throw new TransactionError('renderLockFileLast must return a Buffer or null.');
          }
          const lockOperation = { type: 'write', target: LOCK_REL_PATH, content: lockContent };
          assertTransactionPaths(repoRoot, packageAbsRoot, [lockOperation], []);
          const stagedAbs = stageWrite(packageAbsRoot, lockOperation);
          const journalOperation = buildJournalOperation(
            packageAbsRoot,
            lockOperation,
            stagedAbs
          );
          journalOperations.push(journalOperation);
          fs.mkdirSync(path.dirname(journalAbsPath), { recursive: true });
          writeJournal(journalAbsPath, journalOperations, JOURNAL_STATE_APPLYING);
          journalWritten = true;
          applyOperation(packageAbsRoot, journalOperation);
          journalOperation.done = true;
          writeJournal(journalAbsPath, journalOperations, JOURNAL_STATE_APPLYING);
        }
      }
    } catch (err) {
      // The in-flight operation may have moved its backup before failing.
      for (const operation of [...journalOperations].reverse()) {
        rollbackOperation(packageAbsRoot, operation);
      }
      cleanupBackups(packageAbsRoot, journalOperations);
      cleanupStagedFromJournal(packageAbsRoot, journalOperations);
      if (journalWritten && fs.existsSync(journalAbsPath)) fs.unlinkSync(journalAbsPath);
      throw err;
    }

    if (journalWritten) {
      writeJournal(journalAbsPath, journalOperations, JOURNAL_STATE_COMMITTED);
    }
    // A committed journal tells recovery to preserve the new package while cleanup finishes.
    cleanupBackups(packageAbsRoot, journalOperations);
    cleanupStagedFromJournal(packageAbsRoot, journalOperations);
    if (journalWritten) fs.unlinkSync(journalAbsPath);

    return { applied: journalOperations.length };
  } finally {
    lock.release();
  }
}

function writeJournal(journalAbsPath, journalOperations, state) {
  const temporaryPath = `${journalAbsPath}.tmp.${process.pid}.${randomToken()}`;
  const content = JSON.stringify(
    {
      schemaVersion: 1,
      state,
      updatedAt: new Date().toISOString(),
      operations: journalOperations,
    },
    null,
    2
  );
  let fd;
  try {
    fd = fs.openSync(temporaryPath, 'wx');
    fs.writeFileSync(fd, content);
    fs.fsyncSync(fd);
    fs.closeSync(fd);
    fd = undefined;
    fs.renameSync(temporaryPath, journalAbsPath);
  } catch (err) {
    if (fd !== undefined) fs.closeSync(fd);
    try {
      fs.unlinkSync(temporaryPath);
    } catch {
      // Preserve the original journal error; the temporary file is non-authoritative.
    }
    throw err;
  }
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
  inspectRepoLock,
  detectInterruptedJournal,
  recoverInterruptedJournal,
  runSyncTransaction,
  journalPath,
  TransactionError,
  InterruptedTransactionError,
  RepoLockHeldError,
  SourceChangedError,
  DeleteNotAllowedError,
  CorruptJournalError,
};
