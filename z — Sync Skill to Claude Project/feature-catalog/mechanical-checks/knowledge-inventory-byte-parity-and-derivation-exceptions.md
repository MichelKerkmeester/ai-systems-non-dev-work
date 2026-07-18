---
title: "Knowledge Inventory, Byte Parity And Derivation Exceptions"
description: "Checks the fixed knowledge inventory, declared mirror count and parity with raw or deterministically rendered source bytes."
trigger_phrases:
  - "Knowledge Inventory, Byte Parity And Derivation Exceptions"
  - "knowledge mirror byte parity"
  - "derivationExceptions"
version: 1.0.0.0
---

# Knowledge Inventory, Byte Parity And Derivation Exceptions
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Checks the fixed knowledge inventory, declared mirror count and parity with raw or deterministically rendered source bytes.

The check treats the `claude project/knowledge` directory as a manifest-owned inventory. It reports drift without deleting undeclared files.

---

## 2. HOW IT WORKS

The check reads the fixed knowledge root, ignores `.DS_Store`, compares actual filenames with declared mirror targets and checks the expected knowledge count. It reports unknown files, missing files and count mismatches independently.

For each ordinary mirror, the compiler compares the dereferenced source bytes with the target. A target listed in `derivationExceptions` must select `project-skill-mirror-v1`; the compiler adds declared Project retrieval frontmatter, retargets mapped reference and asset links and compares the resulting bytes. Sync uses the same renderer, so no exception target is skipped or preserved outside compiler ownership.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Implements knowledge inventory, count checks and parity with compiler-rendered bytes. |
| [`../../lib/hashing.cjs`](../../lib/hashing.cjs) | Shared | Hashes source and knowledge mirror bytes for parity comparison. |
| [`../../lib/manifest.cjs`](../../lib/manifest.cjs) | Shared | Validates mirror counts and deterministic derivation configuration. |
| [`../../lib/mirrors.cjs`](../../lib/mirrors.cjs) | Shared | Renders raw mirrors and `project-skill-mirror-v1` targets. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Uses the shared renderer while building sync writes. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers inventory findings and raw or rendered byte mismatches. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Verifies deterministic Project Skill rendering through `sync --write`. |
| [`../../tests/manifest.test.cjs`](../../tests/manifest.test.cjs) | Automated test | Covers mirror counts and required renderer and frontmatter fields. |

---

## 4. SOURCE METADATA

- Group: Mechanical Checks
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md`

Related references:
- [coverage-mapping-and-source-safety.md](coverage-mapping-and-source-safety.md): Establishes the source and mirror mapping boundary.
- [manifest-schema-and-derivation-exceptions.md](../fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md): Defines the exception object shape.
