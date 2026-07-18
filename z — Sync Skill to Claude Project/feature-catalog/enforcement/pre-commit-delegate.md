---
title: "Pre Commit Delegate"
description: "Provides an opt-in pre-commit delegate that reports staged sync findings without blocking commits in the current mode."
trigger_phrases:
  - "Pre Commit Delegate"
  - "AI system sync pre-commit check"
  - "SPECKIT_AI_SYSTEM_SYNC_HOOK"
version: 1.0.0.0
---

# Pre Commit Delegate (precommit-check.sh)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Provides an opt-in pre-commit delegate that reports staged sync findings without blocking commits in the current mode.

The script is called by the shared hook when executable and remains silent unless its opt-in environment variable is enabled.

---

## 2. HOW IT WORKS

The script requires `SPECKIT_AI_SYSTEM_SYNC_HOOK=on` before it resolves the Git root, checks for the CLI file and checks for `node`. Any missing prerequisite exits cleanly. With prerequisites present it runs `check --staged`, captures both output streams and prints a labeled report to standard error when output exists.

The script sets `ENFORCEMENT_MODE='report'`. The current branch never converts a non-zero CLI check result into a blocking exit, so the delegate returns zero after reporting. The script contains the single explicit mode value that would need a reviewed change before blocking enforcement exists.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../scripts/precommit-check.sh`](../../scripts/precommit-check.sh) | Script | Gates the delegate, invokes `check --staged` and enforces the report-only mode. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Receives the staged check invocation from the delegate. |
| [`../../lib/git-utils.cjs`](../../lib/git-utils.cjs) | Shared | Supports staged path inspection used by the delegated check. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Covers `--staged` flag acceptance in `check`'s usage validation, no automated test exercises staged-file detection end to end. |

---

## 4. SOURCE METADATA

- Group: Enforcement
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `enforcement/pre-commit-delegate.md`

Related references:
- [documented-ci-recipe.md](documented-ci-recipe.md): Documents the parallel report-only CI surface.
- [check.md](../cli-commands/check.md): Defines the staged check behavior.
