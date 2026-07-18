---
title: "Upload Plan (upload-plan)"
description: "Prints the manual deployment steps for the kernel, Project Knowledge mirrors, smoke matrix and upload receipt."
trigger_phrases:
  - "Upload Plan (upload-plan)"
  - "manual upload plan"
  - "upload-plan"
version: 1.0.0.0
---

# Upload Plan (upload-plan)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Prints the manual deployment steps for the kernel, Project Knowledge mirrors, smoke matrix and upload receipt.

The command turns a valid manifest into an operator checklist. It does not upload files or create a receipt itself.

---

## 2. HOW IT WORKS

The command resolves one registered system or all systems, loads each manifest and prints a numbered plan. The plan names the kernel path, instructs the operator to remove superseded uploads, lists every mirror target in stable target order and instructs the operator to run the smoke matrix and record the result.

Missing manifests and invalid manifests produce explanatory lines for the affected system. The command remains informational and returns clean after processing the selected targets.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Resolves targets, loads manifests and prints upload steps. |
| [`../../lib/manifest.cjs`](../../lib/manifest.cjs) | Shared | Validates the manifest and supplies mirror declarations. |
| [`../../lib/registry.cjs`](../../lib/registry.cjs) | Shared | Supplies the registered target systems. |
| [`../../lib/util.cjs`](../../lib/util.cjs) | Shared | Sorts mirror targets for stable output. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Covers CLI command dispatch and report-only command behavior. |
| [`../../tests/manifest.test.cjs`](../../tests/manifest.test.cjs) | Automated test | Covers manifest availability and validation paths. |

---

## 4. SOURCE METADATA

- Group: CLI Commands
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `cli-commands/upload-plan.md`

Related references:
- [plan.md](plan.md): Reports the same manifest declarations without deployment steps.
- [release-check.md](release-check.md): Checks a receipt after the manual upload flow.
