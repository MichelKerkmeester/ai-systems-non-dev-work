---
title: "CLI-001 -- Plan (plan)"
description: "This scenario validates Plan (plan) for `CLI-001`. It focuses on reporting manifest declarations without changing package state."
version: 1.0.0.0
---

# CLI-001 -- Plan (plan)

This document captures the operator scenario for `CLI-001`.

---

## 1. OVERVIEW

This scenario validates Plan (plan) for `CLI-001`. It focuses on reporting the current manifest declarations for every registered system without changing package state.

### Why This Matters

Operators need a stable inventory before they run checks or prepare a manual upload. The command must show the manifest path, kernel alignment, mirror count, contract input count, validator count and retired-name count for all ten systems.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `CLI-001` and compare the fleet report with the expected signals.

- Objective: Report every registered system's manifest declarations without writing package files.
- Real user request: `Show me the manifest declarations for every registered system without changing any package files.`
- Prompt: `Show me the manifest declarations for every registered system without changing any package files.`
- Expected execution process: Run the real fleet command from the repository root and capture stdout and the process exit code.
- Expected signals: Ten system headings appear. Each valid manifest reports its path, kernel alignment, mirror count, contract input count, validator count and retired-name count.
- Desired user-visible outcome: A complete fleet inventory with no write or sync message.
- Pass/fail: PASS if all ten systems are reported and the command exits 0. FAIL if a registered system is missing or the command reports a write.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Show me the manifest declarations for every registered system without changing any package files.`

### Commands

1. `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" plan --all`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| CLI-001 | Plan (plan) | Report every manifest declaration without writing | `Show me the manifest declarations for every registered system without changing any package files.` | `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" plan --all` | Step 1: ten system headings and declaration fields, exit 0 | Complete fleet stdout and exit code | PASS if all ten systems are reported. FAIL if a system or field is missing. | Compare the missing system with `registry.json` and run its single-system plan. |

### Expected

The observed run printed ten `== <system> (<package root>) ==` headings. Every system printed `manifest: claude-project.sync.json`, kernel alignment, declared mirror count, contract input count, validator count and retired-name count.

### Evidence

Capture the complete stdout transcript and the exit code. Confirm no package file has a changed mtime or content after the run.

### Pass / Fail

- **PASS**: Ten registered systems appear with the six declaration fields and the process exits 0.
- **FAIL**: Any system is absent, any declaration field is missing or the command writes package state.
- **SKIP**: Use only when Node or the repository root is unavailable and record that blocker.

### Failure Triage

1. Confirm the command ran from the repository root and the quoted tool path resolves.
2. Compare the missing system ID with `registry.json` and inspect that system's manifest path.
3. Run `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" plan --system <id>` for the affected system.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/cli-commands/plan.md](../../feature-catalog/cli-commands/plan.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../ai-system-sync.cjs` | Dispatches `plan` and prints manifest declarations |
| `../../lib/manifest.cjs` | Loads and validates each manifest |
| `../../lib/registry.cjs` | Supplies the closed system registry |
| `../../tests/cli.test.cjs` | Exercises plan dispatch and fleet reporting |
| `../../tests/manifest.test.cjs` | Covers missing and invalid manifest behavior |

---

## 5. SOURCE METADATA

- Group: CLI Commands
- Playbook ID: CLI-001
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `cli-commands/plan.md`
