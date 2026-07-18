---
title: "ENF-001 -- Pre Commit Delegate"
description: "This scenario validates Pre Commit Delegate for `ENF-001`. It focuses on the opt-in report-only staged check."
version: 1.0.0.0
---

# ENF-001 -- Pre Commit Delegate

This document captures the operator scenario for `ENF-001`.

---

## 1. OVERVIEW

This scenario validates Pre Commit Delegate for `ENF-001`. It focuses on the opt-in Bash delegate that reports `check --staged` output without blocking the commit path.

### Why This Matters

The hook must stay quiet when disabled and fail open in the current report mode. When enabled, it must send the staged report to stderr and preserve the delegate's zero exit result.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `ENF-001` from the repository root.

- Objective: Run the opt-in pre-commit delegate and capture its report-only output.
- Real user request: `Run the opt-in AI system sync pre-commit delegate and show whether it blocks the current worktree.`
- Prompt: `As a pre-commit hook orchestrator, run the opt-in delegate against this Git worktree. Verify the staged check report is emitted and the delegate exits 0 in report mode. Return stderr.`
- Expected execution process: Enable `SPECKIT_AI_SYSTEM_SYNC_HOOK`, run the real Bash script and capture stderr and the exit code.
- Expected signals: Stderr contains `[ai-system-sync] check --staged report (mode: report):` and the no-staged-change message. The script exits 0.
- Desired user-visible outcome: The operator sees the report without a blocking hook decision.
- Pass/fail: PASS if the report is emitted and the script exits 0. FAIL if the delegate blocks or stays silent while enabled.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `As a pre-commit hook orchestrator, run the opt-in delegate against this Git worktree. Verify the staged check report is emitted and the delegate exits 0 in report mode. Return stderr.`

### Commands

1. `SPECKIT_AI_SYSTEM_SYNC_HOOK=on bash "z — Sync Skill to Claude Project/scripts/precommit-check.sh"`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| ENF-001 | Pre Commit Delegate | Emit the opt-in staged report without blocking | `As a pre-commit hook orchestrator, run the opt-in delegate against this Git worktree. Verify the staged check report is emitted and the delegate exits 0 in report mode. Return stderr.` | `SPECKIT_AI_SYSTEM_SYNC_HOOK=on bash "z — Sync Skill to Claude Project/scripts/precommit-check.sh"` | Stderr contains the labeled report and `check --staged: no staged changes touch a registered package, the registry, or the CLI.` | stderr transcript, exit code and enabled environment | PASS if the labeled report appears and the script exits 0. FAIL if it blocks or omits the report. | Run with the flag off, confirm quiet behavior, then inspect Git root, CLI path and `ENFORCEMENT_MODE`. |

### Expected

The observed stderr contained `[ai-system-sync] check --staged report (mode: report):` followed by `check --staged: no staged changes touch a registered package, the registry, or the CLI.` The command exited 0.

### Evidence

Capture stderr separately from stdout, the environment flag and the process exit code.

### Pass / Fail

- **PASS**: The enabled delegate emits the staged report and exits 0 under report mode.
- **FAIL**: The delegate blocks, exits non-zero for the report-only result or emits no report.
- **SKIP**: Use only when Git or Node is unavailable and record the blocker.

### Failure Triage

1. Confirm `SPECKIT_AI_SYSTEM_SYNC_HOOK=on` is present for the process.
2. Confirm the script resolves the repository root and CLI path.
3. Run `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --staged` directly and compare output.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/enforcement/pre-commit-delegate.md](../../feature-catalog/enforcement/pre-commit-delegate.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../scripts/precommit-check.sh` | Gates, delegates and enforces report-only behavior |
| `../../ai-system-sync.cjs` | Receives the staged check invocation |
| `../../lib/git-utils.cjs` | Reads staged paths |
| `../../tests/cli.test.cjs` | Covers staged command behavior |
| `../../tests/mechanical-checks.test.cjs` | Covers staged mechanical findings |

---

## 5. SOURCE METADATA

- Group: Enforcement
- Playbook ID: ENF-001
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `enforcement/pre-commit-delegate.md`
