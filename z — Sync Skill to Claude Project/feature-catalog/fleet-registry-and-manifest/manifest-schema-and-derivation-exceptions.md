---
title: "Manifest Schema And Derivation Exceptions"
description: "Validates each system manifest and defines the reviewed exception mechanism for non-identical mirror derivation."
trigger_phrases:
  - "Manifest Schema And Derivation Exceptions"
  - "claude-project.sync.json schema"
  - "manifest derivation exception"
version: 1.0.0.0
---

# Manifest Schema And Derivation Exceptions (claude-project.sync.json)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Validates each system manifest and defines the reviewed exception mechanism for non-identical mirror derivation.

The manifest is hand-authored package contract data. The runtime validator in `manifest.cjs` enforces the same documented shape described by `package.schema.json` without requiring a JSON Schema dependency.

---

## 2. HOW IT WORKS

The validator requires schema version 1, registry-aligned identity, fixed knowledge and kernel paths, source coverage, non-empty mirror declarations, contract inputs and an expected knowledge count equal to the mirror count. It validates optional validators, retired-name settings, scan exclusions, derivation exceptions and generated-region declarations and rejects unknown fields.

Each mirror carries explicit source, target, source version and project version values. A `derivationExceptions` item carries a target path and a non-empty reason. The mechanical parity check skips only that target and the sync planner skips it too, preserving a reviewed mirror that contains intentional hand-applied changes.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/manifest.cjs`](../../lib/manifest.cjs) | Shared | Implements strict manifest shape validation and loading. |
| [`../../package.schema.json`](../../package.schema.json) | Shared | Documents the manifest fields and constraints enforced by the runtime validator. |
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Applies derivation exceptions during byte parity checks. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Applies derivation exceptions during sync operation planning. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/manifest.test.cjs`](../../tests/manifest.test.cjs) | Automated test | Covers fixed paths, duplicates, unknown fields and invalid JSON handling. |
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers manifest-driven parity and exception behavior. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Verifies an exception mirror is preserved during sync. |

---

## 4. SOURCE METADATA

- Group: Fleet Registry And Manifest
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md`

Related references:
- [closed-system-registry.md](closed-system-registry.md): Supplies the registry values cross-checked by the manifest loader.
- [knowledge-inventory-byte-parity-and-derivation-exceptions.md](../mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md): Applies the exception to live mirror bytes.
