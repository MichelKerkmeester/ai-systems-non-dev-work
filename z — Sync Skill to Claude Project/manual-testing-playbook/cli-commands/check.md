---
title: "CLI-002 -- Check (check)"
description: "This scenario validates Check (check) for `CLI-002`. It focuses on reporting local mechanical state for the full fleet."
version: 1.0.0.0
---

# CLI-002 -- Check (check)

This document captures the operator scenario for `CLI-002`.

---

## 1. OVERVIEW

This scenario validates Check (check) for `CLI-002`. It focuses on running the local mechanical suite for all ten registered systems without treating live deployment as current.

### Why This Matters

The command is the local parity gate. A clean result must cover every registered package and must stay separate from the upload receipt state reported by `release-check`.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `CLI-002` and compare the fleet report with the expected signals.

- Objective: Run the full local mechanical check and preserve the separation from live deployment state.
- Real user request: `Check every registered system and report the local mechanical state without treating live deployment as current.`
- Prompt: `Check every registered system and report the local mechanical state without treating live deployment as current.`
- Expected execution process: Run the real fleet check and capture every system line, finding line and process exit code.
- Expected signals: Ten lines report `clean`. No upload receipt or live deployment claim appears.
- Desired user-visible outcome: A concise local parity verdict for all ten systems.
- Pass/fail: PASS if the command exits 0 and prints ten clean lines. FAIL if a system reports drift or the output claims live currency.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Check every registered system and report the local mechanical state without treating live deployment as current.`

### Commands

1. `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --all`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| CLI-002 | Check (check) | Report clean local state for all systems | `Check every registered system and report the local mechanical state without treating live deployment as current.` | `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --all` | Step 1: ten `clean` lines, exit 0 and no live receipt claim | Complete fleet stdout and exit code | PASS if all ten lines are clean. FAIL if a finding or live-state claim appears. | Rerun the first non-clean system with `check --system <id>`. |

### Expected

The observed run printed exactly ten lines from `== barter-blog-posts: clean ==` through `== sales-hubspot-automation: clean ==` and exited 0.

### Evidence

Capture the complete stdout transcript, the process exit code and the absence of any `LIVE_RECEIPT` finding.

### Pass / Fail

- **PASS**: All ten system lines report `clean`, the process exits 0 and no live deployment conclusion is made.
- **FAIL**: Any system reports a finding, any line is missing or the output conflates local state with a live receipt.
- **SKIP**: Use only when the real fleet cannot be read and record the blocker.

### Failure Triage

1. Rerun `plan --all` and confirm the registry and manifests are readable.
2. Re-run `check --system <id>` for the first system that is not clean.
3. Classify the finding by its exit code before changing a package file.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/mechanical-checks/check.md](../../feature-catalog/cli-commands/check.md) | Feature-catalog command contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../ai-system-sync.cjs` | Dispatches `check` and prints fleet findings |
| `../../lib/mechanical-checks.cjs` | Runs the full check suite |
| `../../lib/exit-codes.cjs` | Defines exit meanings and worst-first aggregation |
| `../../tests/cli.test.cjs` | Covers fleet and staged command behavior |
| `../../tests/mechanical-checks.test.cjs` | Covers findings and exit codes |

---

## 5. SOURCE METADATA

- Group: CLI Commands
- Playbook ID: CLI-002
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `cli-commands/check.md`
