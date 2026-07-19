---
title: "Staged Atomic Writes And Locking"
description: "Applies sync writes through staged sibling files, a repository-wide lock, journaled operations and atomic renames."
trigger_phrases:
  - "Staged Atomic Writes And Locking"
  - "sync transaction locking"
  - "atomic sync writes"
version: 1.0.0.0
---

# Staged Atomic Writes And Locking (sync --write)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Applies sync writes through staged sibling files, a repository-wide lock, journaled operations and atomic renames.

The transaction engine protects the fleet from partial swaps and concurrent syncs. It writes only the operations prepared by the CLI after manifest validation and rendering.

---

## 2. HOW IT WORKS

Before inspecting transaction state or changing a live path, the engine acquires the repository-wide `.ai-system-sync.lock`. It then rejects a prior interrupted journal, validates every operation and source path against its allowed boundary, authorizes any delete against the previous package lock, stages every ordinary write as a same-filesystem sibling, validates the staged set when a validator is supplied and rehashes declared sources immediately before apply.

The engine journals each ordinary operation before the first real path changes. Each write moves the prior target to a backup, renames the staged file into place and updates the journal after success. It then renders, stages, appends and applies `package-lock.json` as the final journaled operation, so lock failures roll back with the rest of the package.

After success the engine removes backups and the journal and releases the lock. If apply fails, it restores operations in reverse order, cleans staging and backups and removes the journal before returning the error.

### Dual-Protocol Lock

Every lock acquisition creates BOTH a unique owner file `.ai-system-sync.lock.owner.<12-hex-token>` AND the fixed compatibility sentinel `.ai-system-sync.lock` at the repo root, both carrying the same JSON payload `{ pid, host, acquiredAt, processIdentity, token }`. New-protocol compilers coordinate through the unique owners; legacy compilers that only know the fixed sentinel are still blocked. Requiring both layers means a mixed fleet of old and new binaries cannot race each other.

`processIdentity` is read from `ps -o lstart= -p <pid>` and defeats PID-reuse resurrection: a reused live PID with a different process-start time is treated as stale. Stale cleanup is ABA-safe through `removeSnapshotIfUnchanged`, which compares payload, device and inode before unlinking. Acquire creates the owner first, lists every other snapshot, throws `RepoLockHeldError` if any active contender is observed, then creates the fixed sentinel (or reclaims a stale one). Stale owner records whose payload and inode still match are removed after the fixed sentinel is held. Release removes the fixed sentinel and the unique owner only when the on-disk payload still byte-equals the acquirer's own.

### Staged Path Direct-Sibling Validation

A staged path must be a direct sibling of its target, named exactly `<target>.ai-system-sync.staged.<12-hex>` with no additional path components, and must not be a symlink. The journal validator enforces this on every recovery, defeating the staged-directory symlink exploit: a journal that recorded a staged path inside another directory or with extra components is rejected as corrupt.

### Lockfile Through The Transaction

`package-lock.json` bytes are computed AFTER every ordinary operation has been applied, through the caller-supplied `renderLockFileLast` callback. The returned bytes are then staged, journaled and applied as the final journaled operation, so a failure between the package writes and the lock write rolls back as one transaction. The engine refuses any operation list that tries to write `package-lock.json` directly; the lock can only enter the transaction through this final-step callback.

### Mechanical-Check Refusal While A Writer Holds The Lock

Both `check` and `release-check` refuse while a fleet writer lock is held, BEFORE any journal inspection. This prevents either command from reading a package mid-swap. The finding is reported with the `SYNC_IN_PROGRESS` code at the interrupted-transaction exit class with guidance to wait for the lock to clear, not to run recovery against a live transaction.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/transaction.cjs`](../../lib/transaction.cjs) | Shared | Implements repository locking, staging, journaling, atomic swaps and rollback. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Supplies operations and the final package-lock renderer. |
| [`../../lib/lockfile.cjs`](../../lib/lockfile.cjs) | Shared | Builds complete lock bytes for the transaction's final operation. |
| [`../../lib/hashing.cjs`](../../lib/hashing.cjs) | Shared | Rehashes sources before apply and computes lock values. |
| [`../../lib/path-safety.cjs`](../../lib/path-safety.cjs) | Shared | Constrains operation and source paths before staging. |
| [`../../lib/paths.cjs`](../../lib/paths.cjs) | Shared | Defines lock, journal, backup and repository lock paths. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/transaction.test.cjs`](../../tests/transaction.test.cjs) | Automated test | Covers locks, path containment, staging, delete authorization, source changes and lock rollback. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Covers end-to-end sync writes, package locks and idempotence. |

---

## 4. SOURCE METADATA

- Group: Transaction Engine
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `transaction-engine/staged-atomic-writes-and-locking.md`

Related references:
- [crash-recovery.md](crash-recovery.md): Handles the journal left by an interrupted transaction.
- [sync.md](../cli-commands/sync.md): Builds the operations consumed by this engine.
