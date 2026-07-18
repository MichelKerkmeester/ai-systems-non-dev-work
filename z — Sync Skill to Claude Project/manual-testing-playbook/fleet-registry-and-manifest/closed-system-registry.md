---
title: "REG-001 -- Closed System Registry"
description: "This scenario validates Closed System Registry for `REG-001`. It focuses on the registry as the sole ten-entry membership authority and on unknown-system rejection."
version: 1.0.0.0
---

# REG-001 -- Closed System Registry

This document captures the operator scenario for `REG-001`.

---

## 1. OVERVIEW

This scenario validates Closed System Registry for `REG-001`. It focuses on accepting the real ten-system registry as the sole membership list and rejecting an identifier outside it.

### Why This Matters

The compiler must not discover arbitrary directories as managed systems. Every command depends on the IDs and roots currently declared by `registry.json`, while code independently enforces the ten-entry and path contracts.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `REG-001` from the real tool root.

- Objective: Confirm the sole ten-entry registry authority and reject an unknown CLI target.
- Real user request: `Show that the compiler accepts exactly the registered ten-system fleet and rejects an unknown system id.`
- Prompt: `Show that the compiler accepts exactly the registered ten-system fleet and rejects an unknown system id.`
- Expected execution process: Run the focused registry tests, then invoke `check` with an unknown system ID.
- Expected signals: The focused run reports 9 passing tests. The unknown CLI invocation prints `error: check unknown system id "not-a-real-system"` and exits 2.
- Desired user-visible outcome: The operator sees both registry validation evidence and a clear closed-system refusal.
- Pass/fail: PASS if the focused tests pass and the unknown ID is rejected with exit 2. FAIL if an unknown ID is accepted or the registry count changes.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Show that the compiler accepts exactly the registered ten-system fleet and rejects an unknown system id.`

### Commands

1. `node --test "z — Sync Skill to Claude Project/tests/registry.test.cjs"`
2. `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system not-a-real-system`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| REG-001 | Closed System Registry | Validate the sole ten-entry registry and reject an unknown target | `Show that the compiler accepts exactly the registered ten-system fleet and rejects an unknown system id.` | `registry.test.cjs -> check --system not-a-real-system` using the exact commands above | Step 1: `1..9`, `# pass 9`, `# fail 0`. Step 2: unknown system error and exit 2 | Focused test transcript and unknown-target CLI output | PASS if the ten-system validation passes and the unknown ID is rejected. FAIL if either condition is false. | Inspect `registry.json` and `EXPECTED_SYSTEM_COUNT`, rerun `plan --all` and compare the unknown ID lookup path. |

### Expected

The focused run printed `1..9`, `# pass 9` and `# fail 0`. The CLI printed `error: check unknown system id "not-a-real-system"`.

### Evidence

Capture the focused registry transcript, the unknown-target output and the process exit code.

### Pass / Fail

- **PASS**: The real registry supplies ten valid membership entries and the unknown target returns exit 2.
- **FAIL**: The registry tests fail or an unknown ID reaches a package check.
- **SKIP**: Use only when the tool test surface cannot be launched and record the blocker.

### Failure Triage

1. Confirm `registry.json` has ten valid entries and compare its count with `EXPECTED_SYSTEM_COUNT`.
2. Inspect duplicate ID, package root and skill root validation.
3. Confirm `findSystem` returns null for the unknown identifier.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/fleet-registry-and-manifest/closed-system-registry.md](../../feature-catalog/fleet-registry-and-manifest/closed-system-registry.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/registry.cjs` | Defines and validates the closed registry |
| `../../registry.json` | Declares ten registry entries |
| `../../ai-system-sync.cjs` | Loads the registry for every command |
| `../../lib/util.cjs` | Provides strict JSON and duplicate checks |
| `../../tests/registry.test.cjs` | Covers real registry and lookup behavior |
| `../../tests/cli.test.cjs` | Covers unknown system behavior |

---

## 5. SOURCE METADATA

- Group: Fleet Registry And Manifest
- Playbook ID: REG-001
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `fleet-registry-and-manifest/closed-system-registry.md`
