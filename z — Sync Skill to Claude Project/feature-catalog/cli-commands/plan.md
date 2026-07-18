---
title: "Plan (plan)"
description: "Reports manifest declarations for one registered system or the full fleet without changing package state."
trigger_phrases:
  - "Plan (plan)"
  - "manifest planning"
  - "plan command"
version: 1.0.0.0
---

# Plan (plan)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Reports manifest declarations for one registered system or the full fleet without changing package state.

Operators use this command to inspect package roots, manifest paths, kernel versions, mirror counts, contract input counts, validator counts and retired-name counts before running checks or sync.

---

## 2. HOW IT WORKS

The command resolves a single registered system with `--system` or all systems with `--all`. It prints the package heading, confirms the package root and loads the manifest through the strict manifest loader.

For a valid manifest it reports the manifest path, kernel alignment, declared mirror count, expected knowledge count, contract input count, validator count and retired-name count. A missing manifest produces an explanatory report. An invalid manifest prints the validation message and the command returns the invalid-manifest exit code.

The command does not write package files. An unknown system or a missing target selector returns a usage or manifest-path error through the shared CLI exit table.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Dispatches `plan`, resolves targets and prints manifest declarations. |
| [`../../lib/manifest.cjs`](../../lib/manifest.cjs) | Shared | Loads and validates each selected manifest. |
| [`../../lib/registry.cjs`](../../lib/registry.cjs) | Shared | Supplies the closed registry and system lookup. |
| [`../../lib/util.cjs`](../../lib/util.cjs) | Shared | Provides stable ordering for fleet output. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Exercises command dispatch, target selection and report behavior. |
| [`../../tests/manifest.test.cjs`](../../tests/manifest.test.cjs) | Automated test | Covers missing and invalid manifest behavior used by the command. |

---

## 4. SOURCE METADATA

- Group: CLI Commands
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `cli-commands/plan.md`

Related references:
- [check.md](check.md): Uses the same registry target resolution for mechanical checks.
- [upload-plan.md](upload-plan.md): Provides another report-only manifest traversal.
