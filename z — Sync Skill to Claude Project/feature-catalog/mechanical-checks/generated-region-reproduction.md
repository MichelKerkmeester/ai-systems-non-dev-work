---
title: "Generated Region Reproduction"
description: "Verifies generated-region markers and detects body drift against fresh renderer output from the live manifest."
trigger_phrases:
  - "Generated Region Reproduction"
  - "generated region drift"
  - "generated region markers"
version: 1.0.0.0
---

# Generated Region Reproduction
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Verifies generated-region markers and detects body drift against fresh renderer output from the live manifest.

The check allows hand-authored text outside generated markers while requiring each compiler-owned body to reproduce from current manifest data and live package bytes.

---

## 2. HOW IT WORKS

For every `generatedRegions` declaration, the check requires the target file and each named begin and end marker. A missing target or incomplete marker pair produces `REGION_NOT_SCAFFOLDED`.

For each extracted body, the check invokes the registered section renderer with the live manifest, kernel and compiler-rendered mirror bytes. Any difference produces `REGION_DRIFT`, even when no prior lock record exists. The separate lock check validates that every declared region also has one complete recorded hash.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Checks region targets and markers and compares bodies with fresh renderer output. |
| [`../../lib/regions.cjs`](../../lib/regions.cjs) | Shared | Extracts named generated-region bodies and defines marker behavior. |
| [`../../lib/render.cjs`](../../lib/render.cjs) | Shared | Renders current inventory, checksum and smoke-pin bodies. |
| [`../../lib/manifest.cjs`](../../lib/manifest.cjs) | Shared | Validates generated region declarations. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers structural findings and fresh-render drift independent of stale locks. |
| [`../../tests/regions.test.cjs`](../../tests/regions.test.cjs) | Automated test | Covers marker rendering, extraction, replacement and exact reproduction. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Covers generated-region writes and marker refusal through the CLI. |

---

## 4. SOURCE METADATA

- Group: Mechanical Checks
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `mechanical-checks/generated-region-reproduction.md`

Related references:
- [lock-consistency.md](lock-consistency.md): Checks the package lock that stores region hashes.
- [staged-atomic-writes-and-locking.md](../transaction-engine/staged-atomic-writes-and-locking.md): Applies generated-region updates atomically.
