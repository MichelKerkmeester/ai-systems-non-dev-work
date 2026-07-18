---
title: "Retired Token Scanning"
description: "Scans package files for retired names while honoring declared history exclusions and tool-owned state files."
trigger_phrases:
  - "Retired Token Scanning"
  - "retired name scan"
  - "retiredNames check"
version: 1.0.0.0
---

# Retired Token Scanning
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Scans package files for retired names while honoring declared history exclusions and tool-owned state files.

The scan keeps old skill, mirror or version names out of live package content without flagging the manifest and generated state that must record those names.

---

## 2. HOW IT WORKS

The check reads the manifest's `retiredNames` list and returns without scanning when the list is empty. Otherwise it walks all package files, skips paths under `scanExcludes` and skips the manifest, journal, lock, kernel review and upload receipt paths owned by the tool.

Binary extensions are ignored. Text files are scanned line by line for each retired token. Any remaining hit produces `RETIRED_TOKEN_FOUND` with the relative path, line number and token. Fleet-wide graph checks receive the lowercased retired-name set through a separate aggregation path.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Walks package files, applies exclusions and emits retired-token findings. |
| [`../../lib/util.cjs`](../../lib/util.cjs) | Shared | Provides recursive file walking and ignored-basename behavior. |
| [`../../lib/paths.cjs`](../../lib/paths.cjs) | Shared | Defines tool-owned generated state paths excluded from scanning. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers retired token findings and scan exclusions. |
| [`../../tests/fleet-retired-names.test.cjs`](../../tests/fleet-retired-names.test.cjs) | Automated test | Covers lowercased retired-name aggregation across manifests. |

---

## 4. SOURCE METADATA

- Group: Mechanical Checks
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `mechanical-checks/retired-token-scanning.md`

Related references:
- [json-and-graph-target-validation.md](json-and-graph-target-validation.md): Uses the fleet retired-name set for graph targets.
- [manifest-schema-and-derivation-exceptions.md](../fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md): Defines retired-name and scan-exclusion fields.
