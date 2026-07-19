// ╔══════════════════════════════════════════════════════════════════════════╗
// ║ TRANSACTION TESTS                                                        ║
// ╚══════════════════════════════════════════════════════════════════════════╝
'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────────────────────────────────────

const test = require('node:test');
const assert = require('node:assert/strict');
const { fork } = require('node:child_process');
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
  TransactionError,
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

test('acquireRepoLock: active owners preserve the legacy fixed-lock sentinel', () => {
  const repoRoot = mkTempRepo();
  const lock = acquireRepoLock(repoRoot);
  try {
    assert.throws(
      () => fs.openSync(path.join(repoRoot, '.ai-system-sync.lock'), 'wx'),
      (error) => error.code === 'EEXIST'
    );
  } finally {
    lock.release();
  }
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
  'acquireRepoLock: a legacy lock left by a dead process does not block a new owner',
  () => {
    const repoRoot = mkTempRepo();
    const lockPath = path.join(repoRoot, '.ai-system-sync.lock');
    // Use a high, non-running PID to exercise stale-lock recovery.
    fs.writeFileSync(lockPath, JSON.stringify({ pid: 999999, host: os.hostname() }));
    const lock = acquireRepoLock(repoRoot);
    lock.release();
  }
);

test('acquireRepoLock: age never evicts a live same-host owner', () => {
  const repoRoot = mkTempRepo();
  const lock = acquireRepoLock(repoRoot);
  const old = new Date(0);
  fs.utimesSync(lock.lockPath, old, old);
  try {
    assert.throws(() => acquireRepoLock(repoRoot, { staleMs: 1 }), RepoLockHeldError);
  } finally {
    lock.release();
  }
});

test('acquireRepoLock: a crashed stale owner record does not wedge acquisition', () => {
  const repoRoot = mkTempRepo();
  fs.writeFileSync(
    path.join(repoRoot, '.ai-system-sync.lock.owner.deadbeefcafe'),
    JSON.stringify({ pid: 999999, host: os.hostname(), acquiredAt: new Date(0).toISOString() })
  );
  const lock = acquireRepoLock(repoRoot);
  lock.release();
});

test('acquireRepoLock: a reused live PID cannot resurrect an old owner record', () => {
  const repoRoot = mkTempRepo();
  const staleOwnerPath = path.join(repoRoot, '.ai-system-sync.lock.owner.deadbeefcafe');
  fs.writeFileSync(
    staleOwnerPath,
    JSON.stringify({
      pid: process.pid,
      host: os.hostname(),
      acquiredAt: new Date(0).toISOString(),
      processIdentity: 'different process start',
    })
  );
  const lock = acquireRepoLock(repoRoot);
  lock.release();
  assert.equal(fs.existsSync(staleOwnerPath), false);
});

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

test('runSyncTransaction rejects duplicate targets before staging', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  fs.mkdirSync(packageAbsRoot, { recursive: true });

  assert.throws(
    () =>
      runSyncTransaction({
        repoRoot,
        packageAbsRoot,
        operations: [
          { type: 'write', target: 'same.md', content: Buffer.from('first\n') },
          { type: 'write', target: 'same.md', content: Buffer.from('second\n') },
        ],
      }),
    TransactionError
  );
  assert.equal(fs.existsSync(path.join(packageAbsRoot, 'same.md')), false);
  assert.equal(detectInterruptedJournal(packageAbsRoot), null);
});

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

test('runSyncTransaction preserves a concurrently edited full-file target', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  writeFile(repoRoot, 'Pkg/host.md', 'planned host bytes\n');
  const plannedHash = hashFile(path.join(packageAbsRoot, 'host.md')).sha256;

  assert.throws(
    () =>
      runSyncTransaction({
        repoRoot,
        packageAbsRoot,
        operations: [{ type: 'write', target: 'host.md', content: Buffer.from('rendered\n') }],
        rehashSources: [{
          path: 'host.md',
          expectedExists: true,
          expectedSha256: plannedHash,
        }],
        validateStaged() {
          fs.writeFileSync(path.join(packageAbsRoot, 'host.md'), 'concurrent edit\n');
        },
      }),
    SourceChangedError
  );
  assert.equal(fs.readFileSync(path.join(packageAbsRoot, 'host.md'), 'utf8'), 'concurrent edit\n');
  assert.equal(detectInterruptedJournal(packageAbsRoot), null);
});

test('runSyncTransaction cleans earlier staged files when later staging fails', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  writeFile(repoRoot, 'Pkg/blocked', 'not a directory\n');

  assert.throws(() =>
    runSyncTransaction({
      repoRoot,
      packageAbsRoot,
      operations: [
        { type: 'write', target: 'A.md', content: Buffer.from('A\n') },
        { type: 'write', target: 'blocked/B.md', content: Buffer.from('B\n') },
      ],
    })
  );
  assert.ok(
    fs.readdirSync(packageAbsRoot).every((name) => !name.includes('.ai-system-sync.staged'))
  );
});

test('runSyncTransaction cleans staged files when journal directory setup fails', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  writeFile(repoRoot, 'Pkg/claude project', 'blocks journal directory\n');

  assert.throws(() =>
    runSyncTransaction({
      repoRoot,
      packageAbsRoot,
      operations: [{ type: 'write', target: 'A.md', content: Buffer.from('A\n') }],
    })
  );
  assert.ok(
    fs.readdirSync(packageAbsRoot).every((name) => !name.includes('.ai-system-sync.staged'))
  );
});

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

test('runSyncTransaction rejects a package-root symlink outside the repository', () => {
  const repoRoot = mkTempRepo();
  const externalRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  fs.symlinkSync(externalRoot, packageAbsRoot, 'dir');

  assert.throws(() =>
    runSyncTransaction({
      repoRoot,
      packageAbsRoot,
      operations: [{ type: 'write', target: 'outside.md', content: Buffer.from('outside\n') }],
    })
  );
  assert.equal(fs.existsSync(path.join(externalRoot, 'outside.md')), false);
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
    const stagedBPath = path.join(packageAbsRoot, 'B.md.ai-system-sync.staged.deadbeefcafe');
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
          staged: 'B.md.ai-system-sync.staged.deadbeefcafe',
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

    const recovery = recoverInterruptedJournal(repoRoot, packageAbsRoot, {
      allowedTargets: new Set(['A.md', 'B.md']),
    });
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

test('committed journal recovery preserves new bytes and only finishes cleanup', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  writeFile(repoRoot, 'Pkg/A.md', 'new A\n');
  writeFile(repoRoot, 'Pkg/A.md.ai-system-sync.bak', 'old A\n');
  writeFile(
    repoRoot,
    'Pkg/claude project/sync-journal.json',
    JSON.stringify({
      schemaVersion: 1,
      state: 'committed',
      updatedAt: new Date().toISOString(),
      operations: [{
        type: 'write',
        target: 'A.md',
        staged: null,
        backup: 'A.md.ai-system-sync.bak',
        existedBefore: true,
        done: true,
      }],
    })
  );

  const result = recoverInterruptedJournal(repoRoot, packageAbsRoot, {
    allowedTargets: new Set(['A.md']),
  });
  assert.equal(result.action, 'finalized');
  assert.equal(fs.readFileSync(path.join(packageAbsRoot, 'A.md'), 'utf8'), 'new A\n');
  assert.equal(fs.existsSync(path.join(packageAbsRoot, 'A.md.ai-system-sync.bak')), false);
  assert.equal(detectInterruptedJournal(packageAbsRoot), null);
});

test('recovery rejects incomplete journal fields without touching package files', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  writeFile(repoRoot, 'Pkg/important.md', 'keep me\n');
  writeFile(
    repoRoot,
    'Pkg/claude project/sync-journal.json',
    JSON.stringify({
      schemaVersion: 1,
      operations: [{
        type: 'write',
        target: 'important.md',
        staged: null,
        backup: 'important.md.ai-system-sync.bak',
        done: false,
      }],
    })
  );

  assert.throws(
    () => recoverInterruptedJournal(repoRoot, packageAbsRoot, {
      allowedTargets: new Set(['important.md']),
    }),
    CorruptJournalError
  );
  assert.equal(fs.readFileSync(path.join(packageAbsRoot, 'important.md'), 'utf8'), 'keep me\n');
  assert.ok(detectInterruptedJournal(packageAbsRoot));
});

test('recovery rejects targets outside the compiler-owned allowlist', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  writeFile(repoRoot, 'Pkg/authoritative.md', 'keep me\n');
  writeFile(
    repoRoot,
    'Pkg/claude project/sync-journal.json',
    JSON.stringify({
      schemaVersion: 1,
      operations: [{
        type: 'write',
        target: 'authoritative.md',
        staged: null,
        backup: 'authoritative.md.ai-system-sync.bak',
        existedBefore: false,
        done: false,
      }],
    })
  );

  assert.throws(
    () => recoverInterruptedJournal(repoRoot, packageAbsRoot, {
      allowedTargets: new Set(['claude project/package-lock.json']),
    }),
    CorruptJournalError
  );
  assert.equal(
    fs.readFileSync(path.join(packageAbsRoot, 'authoritative.md'), 'utf8'),
    'keep me\n'
  );
});

test('recovery rejects staged paths that are not direct target siblings', () => {
  const repoRoot = mkTempRepo();
  const packageAbsRoot = path.join(repoRoot, 'Pkg');
  writeFile(repoRoot, 'Pkg/AGENTS.md', 'do not delete\n');
  writeFile(
    repoRoot,
    'Pkg/claude project/sync-journal.json',
    JSON.stringify({
      schemaVersion: 1,
      operations: [{
        type: 'write',
        target: 'allowed.md',
        staged: 'allowed.md.ai-system-sync.staged.deadbeefcafe/AGENTS.md',
        backup: 'allowed.md.ai-system-sync.bak',
        existedBefore: false,
        done: false,
      }],
    })
  );

  assert.throws(
    () => recoverInterruptedJournal(repoRoot, packageAbsRoot, {
      allowedTargets: new Set(['allowed.md']),
    }),
    CorruptJournalError
  );
  assert.equal(fs.readFileSync(path.join(packageAbsRoot, 'AGENTS.md'), 'utf8'), 'do not delete\n');
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

  const result = recoverInterruptedJournal(repoRoot, packageAbsRoot, {
    allowedTargets: new Set(['A.md', 'claude project/package-lock.json']),
  });
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

test(
  'acquireRepoLock: a real child process holding the lock blocks the parent until release',
  async () => {
    const repoRoot = mkTempRepo();
    const transactionPath = path.resolve(__dirname, '..', 'lib', 'transaction.cjs');
    const childScriptPath = path.join(repoRoot, 'child-acquire.cjs');
    const childSource = `'use strict';
const { acquireRepoLock } = require(${JSON.stringify(transactionPath)});
const lock = acquireRepoLock(${JSON.stringify(repoRoot)});
process.send('held');
process.on('message', (message) => {
  if (message === 'release') {
    lock.release();
    process.exit(0);
  }
});
`;
    fs.writeFileSync(childScriptPath, childSource);

    const child = fork(childScriptPath, [], {
      stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    });

    try {
      await new Promise((resolve, reject) => {
        child.once('message', (message) => {
          if (message === 'held') resolve();
          else reject(new Error(`unexpected child message: ${message}`));
        });
        child.once('exit', (code) => {
          if (code !== null) reject(new Error(`child exited before holding lock (code=${code})`));
        });
      });

      // The parent process must observe the lock as held while the child owns it.
      assert.throws(() => acquireRepoLock(repoRoot), RepoLockHeldError);

      child.send('release');
      await new Promise((resolve) => child.once('exit', resolve));

      // After the child releases, the parent must be able to acquire the lock.
      const retry = acquireRepoLock(repoRoot);
      retry.release();
    } finally {
      try { child.kill('SIGKILL'); } catch { /* already exited */ }
      try { fs.unlinkSync(childScriptPath); } catch { /* already cleaned */ }
    }
  }
);
