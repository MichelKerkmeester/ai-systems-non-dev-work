---
title: "Lock Consistency"
description: "Verifies that package-lock hashes still describe the live kernel and mirror bytes."
trigger_phrases:
  - "Lock Consistency"
  - "package lock hash check"
  - "sha16 lock consistency"
version: 1.0.0.0
---

# Lock Consistency
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Verifies that package-lock hashes still describe the live kernel and mirror bytes.

The lock check adds a recorded-byte comparison after inventory checks have identified missing package files.

---

## 2. HOW IT WORKS

When `claude project/package-lock.json` is absent, the check has no recorded lock state to compare and does not create a lock finding. When the file exists, it parses the records and validates that each `sha16` is exactly the first 16 hexadecimal characters of its recorded `sha256`.

For every existing recorded file, the check hashes the live bytes and compares the full digest with the lock. Any changed kernel or mirror produces `LOCK_HASH_MISMATCH`. An invalid lock JSON file produces a single invalid-path finding during lock loading.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Loads package locks and checks hash prefixes and live file hashes. |
| [`../../lib/hashing.cjs`](../../lib/hashing.cjs) | Shared | Computes live file hashes and validates the sha16 format. |
| [`../../lib/paths.cjs`](../../lib/paths.cjs) | Shared | Defines the package-lock path. |
| [`../../lib/util.cjs`](../../lib/util.cjs) | Shared | Parses lock JSON with typed errors. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers lock hash, prefix and invalid JSON findings. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Verifies package-lock creation after a successful sync. |

---

## 4. SOURCE METADATA

- Group: Mechanical Checks
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `mechanical-checks/lock-consistency.md`

Related references:
- [generated-region-reproduction.md](generated-region-reproduction.md): Applies the lock pattern to generated region bodies.
- [staged-atomic-writes-and-locking.md](../transaction-engine/staged-atomic-writes-and-locking.md): Writes the lock only after real files are in place.
