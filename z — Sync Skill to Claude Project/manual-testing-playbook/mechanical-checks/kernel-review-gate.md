---
title: "MCH-007 -- Kernel Review Gate"
description: "This scenario validates Kernel Review Gate for `MCH-007`. It focuses on requiring a current review record for contract inputs and kernel bytes."
version: 1.0.0.0
---

# MCH-007 -- Kernel Review Gate

This document captures the operator scenario for `MCH-007`.

---

## 1. OVERVIEW

This scenario validates Kernel Review Gate for `MCH-007`. It focuses on the missing-review path and the actionable command in its finding.

### Why This Matters

Human review is separate from mirror parity. A package without `kernel-review.json` must not pass the local check even when its other bytes are consistent.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `MCH-007` against a disposable fixture.

- Objective: Require review when a valid package has no kernel review record.
- Real user request: `Check a disposable package with no kernel review record and show the required review command.`
- Prompt: `Check a disposable package with no kernel review record and show the required review command.`
- Expected execution process: Build a clean fixture without review state and run the real check through the environment override.
- Expected signals: Exit 3 with `[KERNEL_REVIEW_REQUIRED]` and the `review-kernel --system product-owner` command.
- Desired user-visible outcome: The operator receives a precise next action instead of a generic failure.
- Pass/fail: PASS if the missing record produces the review finding and command. FAIL if the package reports clean or the command is absent.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Check a disposable package with no kernel review record and show the required review command.`

### Commands

1. `node -e 'const fs=require("node:fs"),os=require("node:os"),path=require("node:path"); const root=path.join(os.tmpdir(),"ai-system-sync-playbook-fixtures","review_kernel"); fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner",withoutReview:true});'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="$(node -p 'require("node:path").join(require("node:os").tmpdir(),"ai-system-sync-playbook-fixtures","review_kernel")')" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| MCH-007 | Kernel Review Gate | Require a current review record and print the recovery command | `Check a disposable package with no kernel review record and show the required review command.` | `fixture setup -> check --system product-owner` using the exact commands above | Step 2: exit 3 with `[KERNEL_REVIEW_REQUIRED]` and a `review-kernel` command | Fixture state, missing review path and finding transcript | PASS if the finding names the missing review and gives the command. FAIL if the package is clean. | Inspect the review path, recompute the contract digest and confirm the kernel file exists before recording review. |

### Expected

The observed check printed exit 3 with `[KERNEL_REVIEW_REQUIRED] No kernel review recorded` and the command `review-kernel --system product-owner --reviewer <you> --reason <why>`.

### Evidence

Capture the fixture directory listing, the absent review path and the complete check output.

### Pass / Fail

- **PASS**: The gate returns exit 3 and gives the exact review command needed for the selected system.
- **FAIL**: The gate returns clean, reports a different exit state or omits the recovery command.
- **SKIP**: Use only when the fixture cannot be created and record the blocker.

### Failure Triage

1. Confirm the fixture manifest and contract inputs load successfully.
2. Confirm `claude project/kernel-review.json` is absent in the fixture.
3. Compare `checkKernelReview` with the review record produced by CLI-004.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/mechanical-checks/kernel-review-gate.md](../../feature-catalog/mechanical-checks/kernel-review-gate.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/mechanical-checks.cjs` | Enforces review record and hash parity |
| `../../lib/contract-digest.cjs` | Computes current contract digest |
| `../../lib/hashing.cjs` | Hashes the live kernel |
| `../../lib/paths.cjs` | Defines the review path |
| `../../ai-system-sync.cjs` | Provides the review command |
| `../../tests/mechanical-checks.test.cjs` | Covers missing and stale review findings |
| `../../tests/contract-digest.test.cjs` | Covers digest sensitivity |
| `../../tests/cli.test.cjs` | Covers review command dispatch |

---

## 5. SOURCE METADATA

- Group: Mechanical Checks
- Playbook ID: MCH-007
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `mechanical-checks/kernel-review-gate.md`
