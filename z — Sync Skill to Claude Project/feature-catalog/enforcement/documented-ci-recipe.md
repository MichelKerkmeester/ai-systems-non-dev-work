---
title: "Documented CI Recipe"
description: "Documents a report-only CI recipe for the test suite and all-system validator check."
trigger_phrases:
  - "Documented CI Recipe"
  - "AI system sync CI recipe"
  - "report-only CI check"
version: 1.0.0.0
---

# Documented CI Recipe (README.md)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Documents a report-only CI recipe for the test suite and all-system validator check.

The recipe is an operator-facing contract rather than a live workflow. It keeps the two enforcement surfaces aligned while the repository proves a quiet report-only cycle.

---

## 2. HOW IT WORKS

The compiler README states that the repository currently has no CI workflow directory. When CI infrastructure exists, it documents two commands for a report-only job: the full Node test glob and `check --all --run-validators`.

Both commands use the repository's dependency-free Node 22 surface. The documented policy treats non-zero results as reported findings rather than failed builds, matching the pre-commit delegate's current report-only mode. The recipe does not claim that a CI job runs today.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../README.md`](../../README.md) | Shared | Documents the current absence of CI workflows and the report-only CI command recipe. |
| [`../../tests/README.md`](../../tests/README.md) | Shared | Documents the full test command and its expected result. |
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Provides the all-system check path used by the recipe. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Exercises the CLI command used by the documented all-system check. |
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers the mechanical check families used by the recipe. |
| [`../../tests/sync-write.test.cjs`](../../tests/sync-write.test.cjs) | Automated test | Contributes end-to-end compiler coverage to the documented test command. |

---

## 4. SOURCE METADATA

- Group: Enforcement
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `enforcement/documented-ci-recipe.md`

Related references:
- [pre-commit-delegate.md](pre-commit-delegate.md): Describes the current pre-commit report surface.
- [../cli-commands/check.md](../cli-commands/check.md): Describes the all-system check command.
