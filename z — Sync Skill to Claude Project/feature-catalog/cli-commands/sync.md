---
title: "Sync (sync)"
description: "Plans and applies manifest-derived mirror and generated-region writes through the transaction engine."
trigger_phrases:
  - "Sync (sync)"
  - "manifest driven sync"
  - "sync command"
version: 1.0.0.0
---

# Sync (sync)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Plans and applies manifest-derived mirror and generated-region writes through the transaction engine.

This is the only CLI command that writes package state. It renders declared derivation exceptions deterministically and separates report-only planning from `--write` execution.

---

## 2. HOW IT WORKS

The command requires a registered `--system`. It distinguishes a live locked transaction from a recoverable interrupted journal before normal work, loads the system manifest and returns a report-only explanation when `--write` is absent. A missing or invalid manifest blocks the write path before staging any content.

For a write, the command builds operations for changed raw or deterministically rendered mirror bytes and declared generated regions. It refuses missing or unsafe sources and targets, then passes the operations, source rehash list and final lock renderer to the transaction engine. The transaction journals `package-lock.json` as its final write. An unchanged package returns a zero-change result, while a missing or stale lock is repaired even when package bytes are already current.

The `--recover` flag invokes journal recovery and reports the number of rolled-back operations. Transaction failures return the fixed interrupted or invalid-manifest exit states without hiding the underlying error message.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Builds sync operations, renders regions and dispatches writes or recovery. |
| [`../../lib/transaction.cjs`](../../lib/transaction.cjs) | Shared | Stages, locks, journals, applies and rolls back operations. |
| [`../../lib/manifest.cjs`](../../lib/manifest.cjs) | Shared | Validates the manifest before operation planning. |
| [`../../lib/mirrors.cjs`](../../lib/mirrors.cjs) | Shared | Produces raw or deterministic Project Skill mirror bytes. |
| [`../../lib/lockfile.cjs`](../../lib/lockfile.cjs) | Shared | Renders complete package-lock state as the final transaction write. |
| [`../../lib/path-safety.cjs`](../../lib/path-safety.cjs) | Shared | Resolves sources and write targets within their allowed boundaries. |
| [`../../lib/render.cjs`](../../lib/render.cjs) | Shared | Renders declared generated-region sections. |
| [`../../lib/regions.cjs`](../../lib/regions.cjs) | Shared | Extracts and replaces generated regions. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Covers sync usage, report-only behavior and recovery dispatch. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Covers raw and deterministic mirror writes, generated regions, lock repair and idempotence. |
| [`../../tests/transaction.test.cjs`](../../tests/transaction.test.cjs) | Automated test | Covers contained staged writes, source changes, lock rollback and recovery. |

---

## 4. SOURCE METADATA

- Group: CLI Commands
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `cli-commands/sync.md`

Related references:
- [staged-atomic-writes-and-locking.md](../transaction-engine/staged-atomic-writes-and-locking.md): Describes the write transaction guarantees.
- [crash-recovery.md](../transaction-engine/crash-recovery.md): Describes the recovery path in detail.
