---
title: "CLI-006 -- Release Check (release-check)"
description: "This scenario validates Release Check (release-check) for `CLI-006`. It focuses on separating live upload receipt state from local package checks."
version: 1.0.0.0
---

# CLI-006 -- Release Check (release-check)

This document captures the operator scenario for `CLI-006`.

---

## 1. OVERVIEW

This scenario validates Release Check (release-check) for `CLI-006`. It focuses on checking current successful upload receipts for all registered systems.

### Why This Matters

Local parity and kernel review do not prove that a package is current in the live service. This command must inspect only upload receipts and package digests for the live-state verdict.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `CLI-006` and compare the receipt findings with the live package state.

- Objective: Report the live receipt state for every registered system without mixing in local check findings.
- Real user request: `Check whether all registered systems have current successful upload receipts and separate that result from local check state.`
- Prompt: `Check whether all registered systems have current successful upload receipts and separate that result from local check state.`
- Expected execution process: Run the real all-system release check and capture every receipt finding and the aggregate exit code.
- Expected signals: Ten systems report `exit 6` with `LIVE_RECEIPT_MISSING` because no current upload receipt exists. No local mirror or kernel finding is printed.
- Desired user-visible outcome: A clear live deployment verdict that stays separate from `check --all`.
- Pass/fail: PASS if all ten missing receipts are reported as exit 6 and the command does not report local drift. FAIL if it reports local check state as live state.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Check whether all registered systems have current successful upload receipts and separate that result from local check state.`

### Commands

1. `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" release-check --all`
2. `node --test "z — Sync Skill to Claude Project/tests/release-check.test.cjs"`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| CLI-006 | Release Check (release-check) | Report missing live receipts separately from local state | `Check whether all registered systems have current successful upload receipts and separate that result from local check state.` | `release-check --all -> node --test "z — Sync Skill to Claude Project/tests/release-check.test.cjs"` using the exact commands above | Step 1: ten exit 6 receipt findings. Step 2: 6 passing receipt tests | Fleet release transcript, focused test transcript and exit codes | PASS if live receipt findings stay separate and focused tests pass. FAIL if local state is mixed in. | Compare `release-check` with `check --all` and inspect receipt digest paths. |

### Expected

The real fleet command printed ten `exit 6` lines with `LIVE_RECEIPT_MISSING`. The focused test run printed `1..6`, `# pass 6` and `# fail 0`, including tests for missing, stale, failed and current receipts.

### Evidence

Capture the fleet release transcript, the aggregate exit code and the focused test transcript. Record that `check --all` remains a separate command.

### Pass / Fail

- **PASS**: The fleet reports missing live receipts as exit 6 and the focused receipt tests pass without local-state leakage.
- **FAIL**: A receipt finding is absent, a local mechanical finding is substituted or the focused tests fail.
- **SKIP**: Use only when receipt files cannot be read and record the blocker.

### Failure Triage

1. Compare each system's receipt path with `UPLOAD_RECEIPT_REL_PATH`.
2. Run the focused release-check tests and inspect the package digest and smoke-result cases.
3. Run `check --all` separately to confirm the local state remains independently reportable.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/cli-commands/release-check.md](../../feature-catalog/cli-commands/release-check.md) | Feature-catalog command contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../ai-system-sync.cjs` | Requires `--all` and dispatches release checks |
| `../../lib/mechanical-checks.cjs` | Reads receipts and computes package digests |
| `../../lib/contract-digest.cjs` | Computes the package digest |
| `../../lib/paths.cjs` | Defines the upload receipt path |
| `../../tests/release-check.test.cjs` | Covers missing, stale, failed and current receipts |
| `../../tests/cli.test.cjs` | Covers release-check command requirements |

---

## 5. SOURCE METADATA

- Group: CLI Commands
- Playbook ID: CLI-006
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `cli-commands/release-check.md`
