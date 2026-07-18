// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ TRANSACTION TESTS                                                        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  acquireRepoLock,
  detectInterruptedJournal,
  recoverInterruptedJournal,
  runSyncTransaction,
  journalPath,
  InterruptedTransactionError,
  RepoLockHeldError,
  SourceChangedError,
  DeleteNotAllowedError,
  CorruptJournalError,
} = require('../lib/transaction.cjs');
const { hashFile } = require('../lib/hashing.cjs');
const { mkTempRepo, writeFile } = require('./helpers.cjs');

// ─────────────────────────────────────────────────────────────────────────────
// 2. TESTS
// ─────────────────────────────────────────────────────────────────────────────

test('acquireRepoLock: a second concurrent acquire is refused while the first is held', () => {
  const repoRoot = mkTempRepo();
  const lock = acquireRepoLock(repoRoot);
  assert.throws(() => acquireRepoLock(repoRoot), RepoLockHeldError);
  lock.release();
  assert.doesNotThrow(() => acquireRepoLock(repoRoot).release());
});

test('acquireRepoLock: release only removes the lock if it still holds our own payload', () => {
  const repoRoot = mkTempRepo();
  const lock = acquireRepoLock(repoRoot);
  fs.writeFileSync(lock.lockPath, 'someone else now owns this file');
  // Preserve a foreign lock when ownership changes before release.
  lock.release();
  assert.equal(fs.existsSync(lock.lockPath), true);
});

test(
  'acquireRepoLock: a lock left by a dead process (same host, non-existent pid) is broken ' +
    'automatically',
  () => {
    const repoRoot = mkTempRepo();
    const lockPath = path.join(repoRoot, '.ai-system-sync.lock');
    // Use a high, non-running PID to exercise stale-lock recovery.
    fs.writeFileSync(lockPath, JSON.stringify({ pid: 999999, host: os.hostname() }));
    const lock = acquireRepoLock(repoRoot);
    lock.release();
  }
);

test(
  'runSyncTransaction applies writes and deletes atomically, journals, then cleans up on success',
  () => {
    const repoRoot = mkTempRepo();
    const packageAbsRoot = path.join(repoRoot, 'Pkg');
    writeFile(repoRoot, 'Pkg/keep-me.md', 'will be replaced\n');
    writeFile(repoRoot, 'Pkg/remove-me.md', 'will be deleted\n');
    writeFile(repoRoot, 'Pkg/source.md', 'source content\n');
    // Authorize the delete through the previous package lock before applying operations.
    writeFile(
      repoRoot,
      'Pkg/claude project/package-lock.json',
      JSON.stringify({ deletable: ['remove-me.md'] })
    );

    let lockFileWritten = false;
    const result = runSyncTransaction({
      repoRoot,
      packageAbsRoot,
      operations: [
        { type: 'write', target: 'keep-me.md', content: Buffer.from('replaced content\n') },
        { type: 'write', target: 'brand-new.md', content: Buffer.from('created content\n') },
        { type: 'delete', target: 'remove-me.md' },
      ],
      rehashSources: [{
        path: 'source.md',
        expectedSha256: hashFile(path.join(packageAbsRoot, 'source.md')).sha256,
      }],
      validateStaged(stagedPaths) {
        assert.equal(stagedPaths.size, 2);
      },
      renderLockFileLast() {
        lockFileWritten = true;
        return Buffer.from('{"deletable":[]}\n');
      },
    });

    assert.equal(result.applied, 4);
    assert.equal(lockFileWritten, true);
    assert.equal(
      fs.readFileSync(path.join(packageAbsRoot, 'keep-me.md'), 'utf8'),
      'replaced content\n'
    );
    assert.equal(
      fs.readFileSync(path.join(packageAbsRoot, 'brand-new.md'), 'utf8'),
      'created content\n'
    );
    assert.equal(fs.existsSync(path.join(packageAbsRoot, 'remove-me.md')), false);
    assert.equal(
      fs.existsSync(journalPath(packageAbsRoot)),
      false,
      'journal must be gone after a clean finish'
    );
    assert.equal(detectInterruptedJournal(packageAbsRoot), null);
    // The journal directory may remain, but no transaction artifacts may survive.
    const remaining = fs.readdirSync(packageAbsRoot).filter(
      (fileName) => fileName !== 'claude project'
    );
    assert.deepEqual(remaining.sort(), ['brand-new.md', 'keep-me.md', 'source.md'].sort());
  }
);

test(
  'runSyncTransaction refuses to delete a file the previous lock did not declare deletable',
  () => {
    const repoRoot = mkTempRepo();
    const packageAbsRoot = path.join(repoRoot, 'Pkg');
    writeFile(repoRoot, 'Pkg/not-authorized.md', 'still here\n');
    writeFile(
      repoRoot,
      'Pkg/claude project/package-lock.json',
      JSON.stringify({ deletable: ['some-other-file.md'] })
    );

    assert.throws(
      () =>
        runSyncTransaction({
          repoRoot,
          packageAbsRoot,
          operations: [{ type: 'delete', target: 'not-authorized.md' }],
        }),
      DeleteNotAllowedError
    );
    // Verify the guard refused before touching the package.
    assert.equal(fs.existsSync(path.join(packageAbsRoot, 'not-authorized.md')), true);
    assert.equal(detectInterruptedJournal(packageAbsRoot), null);
  }
);

test(
  'runSyncTransaction refuses any delete when there is no previous lock at all (first sync)',
  () => {
    const repoRoot = mkTempRepo();
    const packageAbsRoot = path.join(repoRoot, 'Pkg');
    writeFile(repoRoot, 'Pkg/whatever.md', 'still here\n');

    assert.throws(
      () =>
        runSyncTransaction({
          repoRoot,
          packageAbsRoot,
          operations: [{ type: 'delete', target: 'whatever.md' }],
        }),
      DeleteNotAllowedError
    );
    assert.equal(fs.existsSync(path.join(packageAbsRoot, 'whatever.md')), true);
  }
);

test(
  'runSyncTransaction aborts before touching anything if a source changed since planning',
  () => {
    const repoRoot = mkTempRepo();
    const packageAbsRoot = path.join(repoRoot, 'Pkg');
    writeFile(repoRoot, 'Pkg/keep-me.md', 'original\n');
    writeFile(repoRoot, 'Pkg/source.md', 'planned bytes\n');
    const staleSourceHash = hashFile(path.join(packageAbsRoot, 'source.md')).sha256;
    writeFile(repoRoot, 'Pkg/source.md', 'changed after planning, before the transaction ran\n');

    assert.throws(
      () =>
        runSyncTransaction({
          repoRoot,
          packageAbsRoot,
          operations: [{ type: 'write', target: 'keep-me.md', content: Buffer.from('new\n') }],
          rehashSources: [{ path: 'source.md', expectedSha256: staleSourceHash }],
        }),
      SourceChangedError
    );

    assert.equal(
      fs.readFileSync(path.join(packageAbsRoot, 'keep-me.md'), 'utf8'),
      'original\n',
      'nothing applied'
    );
    assert.equal(
      detectInterruptedJournal(packageAbsRoot),
      null,
      'no journal left behind by an aborted-before-apply run'
    );
    assert.deepEqual(fs.readdirSync(packageAbsRoot).sort(), ['keep-me.md', 'source.md']);
  }
);

test(
  'runSyncTransaction rolls back an already-applied operation when a later one fails mid-apply',
  () => {
    const repoRoot = mkTempRepo();
    const packageAbsRoot = path.join(repoRoot, 'Pkg');
    writeFile(repoRoot, 'Pkg/A.md', 'original A\n');
    writeFile(repoRoot, 'Pkg/B.md', 'original B\n');

    // Remove B's staged file to force a deterministic failure after A is applied.
    assert.throws(() =>
      runSyncTransaction({
        repoRoot,
        packageAbsRoot,
        operations: [
          { type: 'write', target: 'A.md', content: Buffer.from('new A\n') },
          { type: 'write', target: 'B.md', content: Buffer.from('new B\n') },
        ],
        validateStaged(stagedPaths) {
          fs.unlinkSync(stagedPaths.get('B.md'));
        },
      })
    );

    assert.equal(
      fs.readFileSync(path.join(packageAbsRoot, 'A.md'), 'utf8'),
      'original A\n',
      'A must be rolled back'
    );
    assert.equal(
      fs.readFileSync(path.join(packageAbsRoot, 'B.md'), 'utf8'),
      'original B\n',
      'B was never touched'
    );
    assert.equal(
      detectInterruptedJournal(packageAbsRoot),
      null,
      'a self-healed rollback must not leave a journal behind'
    );
  }
);

test('a lock renderer failure rolls back applied package operations and preserves the old lock', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  writeFile(repoRoot, 'Pkg/A.md', 'original A\n');
  writeFile(repoRoot, 'Pkg/claude project/package-lock.json', 'old lock\n');

  assert.throws(
    () =>
      runSyncTransaction({
        repoRoot,
        packageAbsRoot,
        operations: [{ type: 'write', target: 'A.md', content: Buffer.from('new A\n') }],
        renderLockFileLast() {
          throw new Error('lock render failed');
        },
      }),
    /lock render failed/
  );
  assert.equal(fs.readFileSync(path.join(packageAbsRoot, 'A.md'), 'utf8'), 'original A\n');
  assert.equal(
    fs.readFileSync(path.join(packageAbsRoot, 'claude project/package-lock.json'), 'utf8'),
    'old lock\n'
  );
  assert.equal(detectInterruptedJournal(packageAbsRoot), null);
});

test('runSyncTransaction rejects an escaping target before creating transaction artifacts', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  fs.mkdirSync(packageAbsRoot, { recursive: true });
  assert.throws(
    () =>
      runSyncTransaction({
        repoRoot,
        packageAbsRoot,
        operations: [{ type: 'write', target: '../outside.md', content: Buffer.from('x') }],
      }),
    /Unsafe path/
  );
  assert.equal(fs.existsSync(path.join(repoRoot, 'outside.md')), false);
  assert.equal(detectInterruptedJournal(packageAbsRoot), null);
});

test(
  'crash-and-recover: a journal left by a killed process is detected and rolled back on recovery',
  () => {
    const repoRoot = mkTempRepo();
    const packageAbsRoot = path.join(repoRoot, 'Pkg');
    writeFile(repoRoot, 'Pkg/A.md', 'original A\n');
    writeFile(repoRoot, 'Pkg/B.md', 'original B\n');

    // Recreate the on-disk state left when a process dies between journaled operations.
    fs.renameSync(
      path.join(packageAbsRoot, 'A.md'),
      path.join(packageAbsRoot, 'A.md.ai-system-sync.bak')
    );
    fs.writeFileSync(path.join(packageAbsRoot, 'A.md'), 'new A\n');
    const stagedBPath = path.join(packageAbsRoot, 'B.md.ai-system-sync.staged.deadbeef');
    fs.writeFileSync(stagedBPath, 'new B\n');

    const journal = {
      schemaVersion: 1,
      updatedAt: new Date().toISOString(),
      operations: [
        {
          type: 'write',
          target: 'A.md',
          staged: null,
          backup: 'A.md.ai-system-sync.bak',
          existedBefore: true,
          done: true,
        },
        {
          type: 'write',
          target: 'B.md',
          staged: 'B.md.ai-system-sync.staged.deadbeef',
          backup: 'B.md.ai-system-sync.bak',
          existedBefore: true,
          done: false,
        },
      ],
    };
    fs.mkdirSync(path.dirname(journalPath(packageAbsRoot)), { recursive: true });
    fs.writeFileSync(journalPath(packageAbsRoot), JSON.stringify(journal, null, 2));

    assert.throws(
      () =>
        runSyncTransaction({
          repoRoot,
          packageAbsRoot,
          operations: [{ type: 'write', target: 'A.md', content: Buffer.from('irrelevant\n') }],
        }),
      InterruptedTransactionError
    );

    const detected = detectInterruptedJournal(packageAbsRoot);
    assert.ok(detected);
    assert.equal(detected.operations.length, 2);

    const recovery = recoverInterruptedJournal(repoRoot, packageAbsRoot);
    assert.equal(recovery.recovered, true);
    assert.equal(recovery.rolledBack, 1);
    assert.equal(recovery.totalOperations, 2);

    assert.equal(fs.readFileSync(path.join(packageAbsRoot, 'A.md'), 'utf8'), 'original A\n');
    assert.equal(fs.readFileSync(path.join(packageAbsRoot, 'B.md'), 'utf8'), 'original B\n');
    assert.equal(
      fs.existsSync(stagedBPath),
      false,
      'leftover staged file for the never-applied op is cleaned up'
    );
    assert.equal(detectInterruptedJournal(packageAbsRoot), null, 'journal is gone after recovery');

    const postRecoveryResult = runSyncTransaction({
      repoRoot,
      packageAbsRoot,
      operations: [{ type: 'write', target: 'A.md', content: Buffer.from('post-recovery A\n') }],
    });
    assert.equal(postRecoveryResult.applied, 1);
    assert.equal(fs.readFileSync(path.join(packageAbsRoot, 'A.md'), 'utf8'), 'post-recovery A\n');
  }
);

test('recoverInterruptedJournal on a package with no journal is a clean no-op', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  fs.mkdirSync(packageAbsRoot, { recursive: true });
  const result = recoverInterruptedJournal(repoRoot, packageAbsRoot);
  assert.deepEqual(result, { recovered: false, reason: 'no-journal' });
});

test('crash recovery restores the previous package lock with the rest of the transaction', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  writeFile(repoRoot, 'Pkg/A.md', 'old A\n');
  writeFile(repoRoot, 'Pkg/claude project/package-lock.json', 'old lock\n');
  fs.renameSync(path.join(packageAbsRoot, 'A.md'), path.join(packageAbsRoot, 'A.md.ai-system-sync.bak'));
  fs.writeFileSync(path.join(packageAbsRoot, 'A.md'), 'new A\n');
  const lockPath = path.join(packageAbsRoot, 'claude project/package-lock.json');
  fs.renameSync(lockPath, `${lockPath}.ai-system-sync.bak`);
  fs.writeFileSync(lockPath, 'new lock\n');
  writeFile(
    repoRoot,
    'Pkg/claude project/sync-journal.json',
    JSON.stringify({
      schemaVersion: 1,
      operations: [
        {
          type: 'write',
          target: 'A.md',
          staged: null,
          backup: 'A.md.ai-system-sync.bak',
          existedBefore: true,
          done: true,
        },
        {
          type: 'write',
          target: 'claude project/package-lock.json',
          staged: null,
          backup: 'claude project/package-lock.json.ai-system-sync.bak',
          existedBefore: true,
          done: true,
        },
      ],
    })
  );

  const result = recoverInterruptedJournal(repoRoot, packageAbsRoot);
  assert.equal(result.rolledBack, 2);
  assert.equal(fs.readFileSync(path.join(packageAbsRoot, 'A.md'), 'utf8'), 'old A\n');
  assert.equal(fs.readFileSync(lockPath, 'utf8'), 'old lock\n');
});

test(
  'a corrupt (unparsable) journal is still detected as interrupted rather than crashing the caller',
  () => {
    const repoRoot = mkTempRepo();
    const packageAbsRoot = path.join(repoRoot, 'Pkg');
    fs.mkdirSync(path.dirname(journalPath(packageAbsRoot)), { recursive: true });
    fs.writeFileSync(journalPath(packageAbsRoot), '{ not valid json at all');

    const detected = detectInterruptedJournal(packageAbsRoot);
    assert.equal(detected.corrupt, true);

    assert.throws(
      () => runSyncTransaction({ repoRoot, packageAbsRoot, operations: [] }),
      InterruptedTransactionError
    );
    assert.throws(
      () => recoverInterruptedJournal(repoRoot, packageAbsRoot),
      CorruptJournalError
    );
    assert.equal(
      fs.existsSync(journalPath(packageAbsRoot)),
      true,
      'fail-closed recovery must preserve corrupt evidence'
    );
  }
);

test('recovery refuses to race a live transaction holding the repository lock', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  fs.mkdirSync(path.dirname(journalPath(packageAbsRoot)), { recursive: true });
  fs.writeFileSync(
    journalPath(packageAbsRoot),
    JSON.stringify({ schemaVersion: 1, operations: [] })
  );
  const liveLock = acquireRepoLock(repoRoot);
  try {
    assert.throws(
      () => recoverInterruptedJournal(repoRoot, packageAbsRoot),
      RepoLockHeldError
    );
    assert.equal(fs.existsSync(journalPath(packageAbsRoot)), true);
  } finally {
    liveLock.release();
  }
});
