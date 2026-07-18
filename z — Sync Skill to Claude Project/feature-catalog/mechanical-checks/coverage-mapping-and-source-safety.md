---
title: "Coverage Mapping And Source Safety"
description: "Verifies declared source coverage, mirror mapping, source existence, symlink containment and case-insensitive target uniqueness."
trigger_phrases:
  - "Coverage Mapping And Source Safety"
  - "source coverage mapping"
  - "mirror source safety"
version: 1.0.0.0
---

# Coverage Mapping And Source Safety
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Verifies declared source coverage, mirror mapping, source existence, symlink containment and case-insensitive target uniqueness.

The check protects the boundary between authoritative skill files and the derived Project Knowledge inventory before any sync writes can occur.

---

## 2. HOW IT WORKS

The check expands each `sourceCoverage.include` file or directory recursively, expands exclusions and computes the covered set. Every covered file must appear as a mirror source. Missing include paths and unmapped covered files create invalid-manifest or path findings.

Each mirror source must exist. If a source is a symlink, the check rejects broken links and links whose resolved target leaves the repository. It also rejects mirror target names that collide case-insensitively, which prevents two targets from becoming ambiguous on case-insensitive filesystems.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Implements coverage expansion, mapping checks, source existence, symlink safety and target collision checks. |
| [`../../lib/util.cjs`](../../lib/util.cjs) | Shared | Walks covered directories and detects case-insensitive collisions. |
| [`../../lib/manifest.cjs`](../../lib/manifest.cjs) | Shared | Validates the source coverage and mirror fields consumed by the check. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers source mapping, missing sources, symlink handling and target collisions. |
| [`../../tests/manifest.test.cjs`](../../tests/manifest.test.cjs) | Automated test | Covers source coverage and mirror shape validation. |

---

## 4. SOURCE METADATA

- Group: Mechanical Checks
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `mechanical-checks/coverage-mapping-and-source-safety.md`

Related references:
- [knowledge-inventory-byte-parity-and-derivation-exceptions.md](knowledge-inventory-byte-parity-and-derivation-exceptions.md): Checks the materialized mirror inventory after source mapping.
- [manifest-schema-and-derivation-exceptions.md](../fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md): Defines the source coverage fields.
