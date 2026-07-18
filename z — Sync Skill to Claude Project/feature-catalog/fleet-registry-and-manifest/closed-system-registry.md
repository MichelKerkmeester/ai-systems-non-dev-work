---
title: "Closed System Registry"
description: "Loads and validates the exact ten-system fleet registry used by every command."
trigger_phrases:
  - "Closed System Registry"
  - "ten system registry"
  - "registry.json validation"
version: 1.0.0.0
---

# Closed System Registry (registry.json)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Loads and validates the exact ten-system fleet registry used by every command.

The registry is a closed allowlist. It names package roots, skill roots, fixed kernel paths, manifest paths and validator placeholders for the managed systems.

---

## 2. HOW IT WORKS

The loader reads `registry.json` relative to the tool directory and validates schema version 1, an array of systems and exactly ten entries. Each entry must carry the required identity and path fields, an array of validators and the fixed kernel path.

The validator rejects duplicate ids, duplicate package roots, duplicate skill roots, absolute package roots, missing required identifiers and unexpected identifiers. Commands use `findSystem` for a single target or stable sorting for fleet traversal, so an unregistered directory cannot expand the managed fleet.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/registry.cjs`](../../lib/registry.cjs) | Shared | Defines the expected id set, validates registry shape and finds systems. |
| [`../../registry.json`](../../registry.json) | Shared | Declares the ten registered system entries. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Loads the registry before dispatching every command. |
| [`../../lib/util.cjs`](../../lib/util.cjs) | Shared | Provides duplicate detection and strict JSON parsing. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/registry.test.cjs`](../../tests/registry.test.cjs) | Automated test | Validates the real ten-system registry, shape errors and lookup. |
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Covers unknown system and fleet target behavior through the CLI. |

---

## 4. SOURCE METADATA

- Group: Fleet Registry And Manifest
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `fleet-registry-and-manifest/closed-system-registry.md`

Related references:
- [manifest-schema-and-derivation-exceptions.md](manifest-schema-and-derivation-exceptions.md): Validates each registered package manifest.
- [coverage-mapping-and-source-safety.md](../mechanical-checks/coverage-mapping-and-source-safety.md): Checks the paths selected by a registry entry.
