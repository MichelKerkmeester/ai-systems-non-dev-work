---
title: "Crash Recovery"
description: "Restores a package to its pre-transaction state after an interrupted sync."
trigger_phrases:
  - "Crash Recovery"
  - "interrupted sync recovery"
  - "sync --recover"
version: 1.0.0.0
---

# Crash Recovery (sync --recover)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Restores a package to its pre-transaction state after an interrupted sync.

Recovery treats the journal as the authoritative record of a possibly incomplete swap and chooses deterministic rollback instead of guessing how to finish a crashed transaction.

---

## 2. HOW IT WORKS

The CLI detects `claude project/sync-journal.json` before starting a normal sync. It reports an active transaction when the repository lock is held and otherwise requires recovery. `sync --recover` first acquires the same repository lock, then validates schema, operation types and every target, backup and staged path before rollback.

Rollback restores backups for replaced or deleted targets, removes targets that did not exist before a write and cleans staged files. Recovery removes a valid journal only after restoration and returns the rolled-back and total operation counts. A corrupt, invalid or unsafe journal is preserved for manual inspection, a live lock blocks recovery and a package without a journal returns a clean no-recovery result.

### Applying Versus Committed Recovery

The journal records one of two states, and recovery handles each differently:

- `applying` — Recovery treats the transaction as not-yet-complete and rolls back EVERY operation in reverse order, regardless of whether each individual operation was marked done. This is the conservative choice: a crash can occur after a backup is created but before the journal records the operation as complete, so every operation is undone. After rollback, leftover staged and backup files are cleaned and the journal is removed.
- `committed` — Recovery treats the transaction as having reached its final state and finalizes it instead of rolling back. The new package bytes are preserved, leftover staged and backup files are cleaned, and the journal is removed. This state is written once every operation has been applied successfully and signals that cleanup, not rollback, is the safe recovery.

A corrupt, invalid or unsafe journal is never forwarded or rolled back automatically; it is preserved for manual inspection.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/transaction.cjs`](../../lib/transaction.cjs) | Shared | Inspects locks, validates journals, reverses operations and cleans valid recovery state. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Distinguishes active and interrupted syncs and exposes `--recover`. |
| [`../../lib/path-safety.cjs`](../../lib/path-safety.cjs) | Shared | Rejects journal paths outside the selected package. |
| [`../../lib/util.cjs`](../../lib/util.cjs) | Shared | Parses journal JSON and preserves typed read or parse errors. |
| [`../../lib/paths.cjs`](../../lib/paths.cjs) | Shared | Defines the journal path. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/transaction.test.cjs`](../../tests/transaction.test.cjs) | Automated test | Covers live locks, corrupt and unsafe journals, reverse rollback, package-lock restoration and cleanup. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Covers recovery through the real CLI path. |
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Covers interruption reporting and recovery command dispatch. |

---

## 4. SOURCE METADATA

- Group: Transaction Engine
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `transaction-engine/crash-recovery.md`

Related references:
- [staged-atomic-writes-and-locking.md](staged-atomic-writes-and-locking.md): Creates and clears the journal during normal writes.
- [sync.md](../cli-commands/sync.md): Exposes report-only sync and recovery behavior.
