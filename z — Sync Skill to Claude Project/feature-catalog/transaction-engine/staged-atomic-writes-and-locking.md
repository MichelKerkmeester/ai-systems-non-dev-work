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

Before changing a live path, the engine rejects a prior interrupted journal, authorizes any delete operation against the previous package lock and acquires the repository-wide `.ai-system-sync.lock`. It stages every write as a same-filesystem sibling, validates the staged set when a validator is supplied and rehashes declared sources immediately before apply.

The engine journals each operation before the first real path changes. Each write moves the prior target to a backup, renames the staged file into place and updates the journal after success. The caller writes `package-lock.json` last, after every requested operation is in place.

After success the engine removes backups and the journal and releases the lock. If apply fails, it restores operations in reverse order, cleans staging and backups and removes the journal before returning the error.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/transaction.cjs`](../../lib/transaction.cjs) | Shared | Implements repository locking, staging, journaling, atomic swaps and rollback. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Supplies operations and writes the final package lock after apply. |
| [`../../lib/hashing.cjs`](../../lib/hashing.cjs) | Shared | Rehashes sources before apply and computes lock values. |
| [`../../lib/paths.cjs`](../../lib/paths.cjs) | Shared | Defines lock, journal, backup and repository lock paths. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/transaction.test.cjs`](../../tests/transaction.test.cjs) | Automated test | Covers locks, staging, delete authorization, source changes and rollback. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Covers end-to-end sync writes, package locks and idempotence. |

---

## 4. SOURCE METADATA

- Group: Transaction Engine
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `transaction-engine/staged-atomic-writes-and-locking.md`

Related references:
- [crash-recovery.md](crash-recovery.md): Handles the journal left by an interrupted transaction.
- [sync.md](../cli-commands/sync.md): Builds the operations consumed by this engine.
