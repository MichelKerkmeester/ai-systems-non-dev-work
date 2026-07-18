---
title: "Lock Consistency"
description: "Requires complete package-lock state and verifies its inventories, hashes and byte counts against the live package."
trigger_phrases:
  - "Lock Consistency"
  - "package lock hash check"
  - "sha16 lock consistency"
version: 1.0.0.0
---

# Lock Consistency
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Requires complete package-lock state and verifies its inventories, hashes and byte counts against the live package.

The lock check makes compiler-owned package state explicit after inventory checks have identified missing package files.

---

## 2. HOW IT WORKS

A missing `claude project/package-lock.json` produces `LOCK_MISSING`. A present lock must use schema version 1, match the selected system ID, carry an ISO-8601 `generatedAt` value and list exactly the expected kernel, mirror, generated-region and deletable records with no duplicates or extras.

For every expected file record, the check validates full and prefix SHA formats, byte counts and live bytes. It also validates generated-region hashes. Changed content or byte counts produce `LOCK_HASH_MISMATCH`; incomplete inventories produce `LOCK_STRUCTURE_MISMATCH`; invalid JSON produces an invalid-path finding. `sync --write` rebuilds a missing or stale lock as its final journaled operation.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Loads package locks and checks structure, inventories, hashes, bytes and live files. |
| [`../../lib/lockfile.cjs`](../../lib/lockfile.cjs) | Shared | Builds complete desired lock state for sync repair. |
| [`../../lib/hashing.cjs`](../../lib/hashing.cjs) | Shared | Computes live file hashes and validates the sha16 format. |
| [`../../lib/paths.cjs`](../../lib/paths.cjs) | Shared | Defines the package-lock path. |
| [`../../lib/util.cjs`](../../lib/util.cjs) | Shared | Parses lock JSON with typed errors. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers missing locks, structure, inventories, bytes, hashes, prefixes and invalid JSON. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Verifies package-lock creation and missing-lock repair after sync. |

---

## 4. SOURCE METADATA

- Group: Mechanical Checks
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `mechanical-checks/lock-consistency.md`

Related references:
- [generated-region-reproduction.md](generated-region-reproduction.md): Applies the lock pattern to generated region bodies.
- [staged-atomic-writes-and-locking.md](../transaction-engine/staged-atomic-writes-and-locking.md): Writes the lock only after real files are in place.
