---
title: "Check (check)"
description: "Runs the mechanical package checks for one system, the fleet or affected staged packages."
trigger_phrases:
  - "Check (check)"
  - "mechanical package check"
  - "check command"
version: 1.0.0.0
---

# Check (check)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Runs the mechanical package checks for one system, the fleet or affected staged packages.

The command is read-only. It can also run manifest-declared package validators when `--run-validators` is supplied.

---

## 2. HOW IT WORKS

The command accepts `--system`, `--all` or `--staged`. A system or fleet target runs `checkSystem` for the selected registry entries. The staged path first confirms that the repository is a Git work tree, identifies packages affected by the index and refuses to check affected packages with unstaged in-scope changes.

Each result prints the system identifier, clean state or exit code and every tagged finding. Fleet results use `worstExitCode` so a more dangerous state takes precedence over softer findings. `check` reports local mechanical and review state only. It never reports live deployment currency.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Dispatches `check`, handles staged scope and prints findings. |
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Runs the full package check suite and returns findings. |
| [`../../lib/git-utils.cjs`](../../lib/git-utils.cjs) | Shared | Reads Git status and staged paths for `--staged`. |
| [`../../lib/exit-codes.cjs`](../../lib/exit-codes.cjs) | Shared | Defines exit meanings and fleet aggregation precedence. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Covers black-box check dispatch, staged scope and exit reporting. |
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Exercises findings, inventory, locks, regions, retired names and validators. |
| [`../../tests/fleet-retired-names.test.cjs`](../../tests/fleet-retired-names.test.cjs) | Automated test | Covers fleet-wide retired-name aggregation used before checks. |

---

## 4. SOURCE METADATA

- Group: CLI Commands
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `cli-commands/check.md`

Related references:
- [plan.md](plan.md): Reports the manifest state without running checks.
- [release-check.md](release-check.md): Keeps live receipt checks separate from local check state.
