---
title: "Knowledge Inventory, Byte Parity And Derivation Exceptions"
description: "Checks the fixed knowledge inventory, declared mirror count and byte parity while preserving reviewed derivation exceptions."
trigger_phrases:
  - "Knowledge Inventory, Byte Parity And Derivation Exceptions"
  - "knowledge mirror byte parity"
  - "derivationExceptions"
version: 1.0.0.0
---

# Knowledge Inventory, Byte Parity And Derivation Exceptions
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Checks the fixed knowledge inventory, declared mirror count and byte parity while preserving reviewed derivation exceptions.

The check treats the `claude project/knowledge` directory as a manifest-owned inventory. It reports drift without deleting undeclared files.

---

## 2. HOW IT WORKS

The check reads the fixed knowledge root, ignores `.DS_Store`, compares actual filenames with declared mirror targets and checks the expected knowledge count. It reports unknown files, missing files and count mismatches independently.

For each ordinary mirror, it hashes the source and target bytes and reports a mismatch when the digests differ. A target listed in `derivationExceptions` skips the byte comparison. The same exception is honored by sync planning, so a reviewed hand-derived mirror is not overwritten.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Implements knowledge inventory, count checks, byte parity and derivation exception handling. |
| [`../../lib/hashing.cjs`](../../lib/hashing.cjs) | Shared | Hashes source and knowledge mirror bytes for parity comparison. |
| [`../../lib/manifest.cjs`](../../lib/manifest.cjs) | Shared | Validates mirror counts and derivation exception entries. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Skips exception mirrors while building sync writes. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers inventory findings, byte mismatches and derivation exception behavior. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Verifies an exception mirror survives `sync --write`. |
| [`../../tests/manifest.test.cjs`](../../tests/manifest.test.cjs) | Automated test | Covers expected mirror count and exception shape validation. |

---

## 4. SOURCE METADATA

- Group: Mechanical Checks
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md`

Related references:
- [coverage-mapping-and-source-safety.md](coverage-mapping-and-source-safety.md): Establishes the source and mirror mapping boundary.
- [manifest-schema-and-derivation-exceptions.md](../fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md): Defines the exception object shape.
