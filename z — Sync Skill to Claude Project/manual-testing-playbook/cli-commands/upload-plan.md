---
title: "CLI-005 -- Upload Plan (upload-plan)"
description: "This scenario validates Upload Plan (upload-plan) for `CLI-005`. It focuses on printing a complete manual deployment plan without uploading files."
version: 1.0.0.0
---

# CLI-005 -- Upload Plan (upload-plan)

This document captures the operator scenario for `CLI-005`.

---

## 1. OVERVIEW

This scenario validates Upload Plan (upload-plan) for `CLI-005`. It focuses on turning the Product Owner manifest into a stable manual deployment checklist.

### Why This Matters

The command is informational. It must name the kernel path, the exact Knowledge mirror targets and the smoke receipt step without uploading files or creating a receipt.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `CLI-005` and compare the Product Owner plan with the manifest.

- Objective: Print the Product Owner manual upload plan with all declared mirror targets.
- Real user request: `Print the manual upload plan for Product Owner, including every Knowledge target and the smoke receipt step.`
- Prompt: `Print the manual upload plan for Product Owner, including every Knowledge target and the smoke receipt step.`
- Expected execution process: Run the real report-only command and capture the numbered plan.
- Expected signals: The output names `Custom Instructions.md`, says to remove superseded uploads, lists 30 files and ends with the smoke matrix and receipt instruction.
- Desired user-visible outcome: A complete manual checklist with no upload side effect.
- Pass/fail: PASS if all 30 manifest targets appear in stable order and the command exits 0. FAIL if a target is missing or a receipt is written.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Print the manual upload plan for Product Owner, including every Knowledge target and the smoke receipt step.`

### Commands

1. `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" upload-plan --system product-owner`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| CLI-005 | Upload Plan (upload-plan) | Print the complete Product Owner manual plan | `Print the manual upload plan for Product Owner, including every Knowledge target and the smoke receipt step.` | `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" upload-plan --system product-owner` | Step 1: kernel path, 30 targets, smoke and receipt steps, exit 0 | Complete upload-plan stdout and receipt-path check | PASS if all 30 targets and four steps appear. FAIL if a target is missing or state changes. | Compare the target count with `plan --system product-owner` and inspect stable sorting. |

### Expected

The observed output printed `== product-owner upload plan ==`, step 1 for `claude project/Custom Instructions.md`, step 2 for superseded uploads, step 3 for all 30 files and step 4 for the smoke matrix and upload receipt.

### Evidence

Capture the complete Product Owner plan and verify that no `upload-receipt.json` is created or changed.

### Pass / Fail

- **PASS**: The plan lists 30 files, names the kernel path, includes all four steps and exits 0 without writing a receipt.
- **FAIL**: A target is absent, the order is unstable or the command writes package state.
- **SKIP**: Use only when the Product Owner manifest cannot be read and record the blocker.

### Failure Triage

1. Run `plan --system product-owner` and compare its mirror count with the upload plan count.
2. Inspect `manifest.cjs` target sorting and the selected manifest's `mirrors` array.
3. Confirm the receipt path remains absent after the command.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/cli-commands/upload-plan.md](../../feature-catalog/cli-commands/upload-plan.md) | Feature-catalog command contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../ai-system-sync.cjs` | Resolves targets and prints upload steps |
| `../../lib/manifest.cjs` | Loads the selected manifest |
| `../../lib/registry.cjs` | Supplies registered systems |
| `../../lib/util.cjs` | Sorts mirror targets |
| `../../tests/cli.test.cjs` | Covers upload-plan dispatch |
| `../../tests/manifest.test.cjs` | Covers manifest availability and validation |

---

## 5. SOURCE METADATA

- Group: CLI Commands
- Playbook ID: CLI-005
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `cli-commands/upload-plan.md`
