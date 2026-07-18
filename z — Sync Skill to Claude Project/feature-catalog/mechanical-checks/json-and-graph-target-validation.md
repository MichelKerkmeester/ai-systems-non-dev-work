---
title: "JSON And Graph Target Validation"
description: "Validates required skill metadata JSON files and checks graph edges against retired names collected across the fleet."
trigger_phrases:
  - "JSON And Graph Target Validation"
  - "graph target retired name check"
  - "description.json validation"
version: 1.0.0.0
---

# JSON And Graph Target Validation
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Validates required skill metadata JSON files and checks graph edges against retired names collected across the fleet.

This is a distinct mechanical family in `checkSystem`. It protects metadata presence and syntax, then adds a fleet-aware graph target check for retired system names.

---

## 2. HOW IT WORKS

The check resolves the registered skill root and requires both `description.json` and `graph-metadata.json`. Each file must parse through strict JSON reading. Missing or invalid files produce invalid-manifest or path findings.

When the caller supplies the fleet retired-name set, the check collects string `target` values from graph edge arrays and compares them case-insensitively. Any target matching a retired name produces `GRAPH_TARGET_RETIRED` with the affected skill path and names.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Validates metadata JSON files and checks graph edge targets. |
| [`../../lib/util.cjs`](../../lib/util.cjs) | Shared | Reads metadata JSON and walks graph values through strict parsing helpers. |
| [`../../lib/registry.cjs`](../../lib/registry.cjs) | Shared | Supplies the skill root named by each registry entry. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers JSON presence, parse errors and graph target findings. |
| [`../../tests/fleet-retired-names.test.cjs`](../../tests/fleet-retired-names.test.cjs) | Automated test | Covers the fleet retired-name set passed to graph validation. |

---

## 4. SOURCE METADATA

- Group: Mechanical Checks
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `mechanical-checks/json-and-graph-target-validation.md`

Related references:
- [retired-token-scanning.md](retired-token-scanning.md): Builds the fleet retired-name corpus and scans package text.
- [closed-system-registry.md](../fleet-registry-and-manifest/closed-system-registry.md): Defines each skill root.
