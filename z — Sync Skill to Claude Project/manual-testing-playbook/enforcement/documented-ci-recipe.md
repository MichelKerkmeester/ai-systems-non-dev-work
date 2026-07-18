---
title: "ENF-002 -- Documented CI Recipe"
description: "This scenario validates Documented CI Recipe for `ENF-002`. It focuses on the report-only test and all-system validator commands documented for CI."
version: 1.0.0.0
---

# ENF-002 -- Documented CI Recipe

This document captures the operator scenario for `ENF-002`.

---

## 1. OVERVIEW

This scenario validates Documented CI Recipe for `ENF-002`. It focuses on running the complete Node test glob and the all-system validator check as report-only commands.

### Why This Matters

The repository documents a CI recipe rather than shipping a workflow directory. The commands must remain dependency-free, produce the documented test count and report the current ten-system state.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `ENF-002` from the repository root.

- Objective: Run the documented test suite and all-system validator check.
- Real user request: `Run the documented compiler test and CI checks, then tell me whether all 113 tests and all ten systems pass.`
- Prompt: `As a CI validation orchestrator, run the documented test glob and all-system validator check. Verify 113 tests pass and ten systems report clean. Return both transcripts.`
- Expected execution process: Run the full Node test glob, then run `check --all --run-validators` and capture both transcripts and exit codes.
- Expected signals: The test command reports `# tests 113`, `# pass 113`, `# fail 0`. The check command prints ten `clean` lines.
- Desired user-visible outcome: A report-only CI evidence bundle with no build-blocking interpretation added by the scenario.
- Pass/fail: PASS if both commands produce the observed results and exit 0. FAIL if the test count or clean-system count differs.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `As a CI validation orchestrator, run the documented test glob and all-system validator check. Verify 113 tests pass and ten systems report clean. Return both transcripts.`

### Commands

1. `node --test "z — Sync Skill to Claude Project/tests/"*.test.cjs`
2. `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --all --run-validators`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| ENF-002 | Documented CI Recipe | Run the documented test and all-system report-only commands | `As a CI validation orchestrator, run the documented test glob and all-system validator check. Verify 113 tests pass and ten systems report clean. Return both transcripts.` | `node --test "z — Sync Skill to Claude Project/tests/"*.test.cjs -> node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --all --run-validators` | Step 1: `# tests 113`, `# pass 113`, `# fail 0`. Step 2: ten `clean` lines | Full test transcript, full check transcript and exit codes | PASS if both commands exit 0 with the expected counts. FAIL if either result differs. | Rerun the failing focused test file or system check, preserve the first failing output and compare with README policy. |

### Expected

The observed test command printed `1..113`, `# tests 113`, `# pass 113`, `# fail 0`, `# skipped 0` and `# todo 0`. The validator check printed ten clean system lines and exited 0.

### Evidence

Capture both complete transcripts and their exit codes. Keep the test transcript separate from the fleet check transcript.

### Pass / Fail

- **PASS**: All 113 tests pass and all ten systems report clean under the documented commands.
- **FAIL**: Any test fails, any system reports a finding or either command exits non-zero.
- **SKIP**: Use only when the required Node or Git runtime is unavailable and record the blocker.

### Failure Triage

1. Rerun the full test command and identify the first failing `*.test.cjs` file.
2. Rerun `check --system <id> --run-validators` for the first non-clean system.
3. Compare the observed policy with `README.md` and `tests/README.md` without changing those files.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/enforcement/documented-ci-recipe.md](../../feature-catalog/enforcement/documented-ci-recipe.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../README.md` | Documents the report-only CI recipe and current test count |
| `../../tests/README.md` | Documents the full test command and expected result |
| `../../lib/mechanical-checks.cjs` | Provides the all-system check path |
| `../../tests/cli.test.cjs` | Covers all-system CLI behavior |
| `../../tests/mechanical-checks.test.cjs` | Covers mechanical check families |
| `../../tests/sync-write.test.cjs` | Adds end-to-end compiler coverage |

---

## 5. SOURCE METADATA

- Group: Enforcement
- Playbook ID: ENF-002
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `enforcement/documented-ci-recipe.md`
