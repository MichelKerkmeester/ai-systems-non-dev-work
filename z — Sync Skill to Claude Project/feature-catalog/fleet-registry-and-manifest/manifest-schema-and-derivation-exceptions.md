---
title: "Manifest Schema And Derivation Exceptions"
description: "Validates each system manifest and defines deterministic rendering for non-identical Project Skill mirrors."
trigger_phrases:
  - "Manifest Schema And Derivation Exceptions"
  - "claude-project.sync.json schema"
  - "manifest derivation exception"
version: 1.0.0.0
---

# Manifest Schema And Derivation Exceptions (claude-project.sync.json)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Validates each system manifest and defines deterministic rendering for non-identical Project Skill mirrors.

The manifest is hand-authored package contract data. The runtime validator in `manifest.cjs` enforces the same documented shape described by `package.schema.json` without requiring a JSON Schema dependency.

---

## 2. HOW IT WORKS

The validator requires schema version 1, registry-aligned identity, fixed knowledge and kernel paths, source coverage, non-empty mirror declarations, contract inputs and an expected knowledge count equal to the mirror count. It rejects absolute, traversing or non-normalized paths; validates optional validators, retired-name settings and scan exclusions; permits only registered generated targets and sections; and rejects unknown fields.

Each mirror carries explicit source, target, source version and project version values. A `derivationExceptions` item must match a declared target and carry a reason, the `project-skill-mirror-v1` renderer and complete `contextType`, `importanceTier` and `triggerPhrases` configuration. Mechanical parity and sync both invoke the same renderer, so an exception is deterministic configuration rather than a waiver.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/manifest.cjs`](../../lib/manifest.cjs) | Shared | Implements strict manifest shape validation and loading. |
| [`../../package.schema.json`](../../package.schema.json) | Shared | Documents the manifest fields and constraints enforced by the runtime validator. |
| [`../../lib/path-safety.cjs`](../../lib/path-safety.cjs) | Shared | Validates normalized relative paths and containment constraints. |
| [`../../lib/mirrors.cjs`](../../lib/mirrors.cjs) | Shared | Implements the registered deterministic mirror renderer. |
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Compares targets with raw or rendered expected bytes. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Uses the same renderer during sync operation planning. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/manifest.test.cjs`](../../tests/manifest.test.cjs) | Automated test | Covers fixed and contained paths, registered renderers, duplicates, unknown fields and invalid JSON handling. |
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers manifest-driven raw and deterministic mirror parity. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Verifies deterministic exception rendering during sync. |

---

## 4. SOURCE METADATA

- Group: Fleet Registry And Manifest
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md`

Related references:
- [closed-system-registry.md](closed-system-registry.md): Supplies the registry values cross-checked by the manifest loader.
- [knowledge-inventory-byte-parity-and-derivation-exceptions.md](../mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md): Applies the exception to live mirror bytes.
