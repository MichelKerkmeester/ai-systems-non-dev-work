---
title: "CLI-004 -- Review Kernel (review-kernel)"
description: "This scenario validates Review Kernel (review-kernel) for `CLI-004`. It focuses on recording current contract and kernel review state in a disposable fixture."
version: 1.0.0.0
---

# CLI-004 -- Review Kernel (review-kernel)

This document captures the operator scenario for `CLI-004`.

---

## 1. OVERVIEW

This scenario validates Review Kernel (review-kernel) for `CLI-004`. It focuses on creating the review record that the kernel review gate consumes.

### Why This Matters

The review record binds a reviewer decision to the sorted contract digest and the current kernel SHA-256. The scenario writes only to a disposable fixture.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `CLI-004` against the disposable fixture.

- Objective: Record a current kernel review and confirm the check gate becomes clean.
- Real user request: `Record a Product Owner kernel review in a disposable fixture and confirm the review gate passes afterward.`
- Prompt: `As a review orchestrator, record a kernel review against the disposable Product Owner fixture. Verify the record clears the review gate. Return the digest prefix and check result.`
- Expected execution process: Prepare a valid fixture without a review file, run `review-kernel` with a reviewer, reason and decision, then run `check` against the same fixture.
- Expected signals: `review-kernel: recorded for product-owner` includes a digest prefix. The follow-up check prints `== product-owner: clean ==`.
- Desired user-visible outcome: The operator receives evidence that the current contract and kernel were reviewed.
- Pass/fail: PASS if the review record is written only in the fixture and the follow-up check is clean. FAIL if the record is missing or the gate remains required.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `As a review orchestrator, record a kernel review against the disposable Product Owner fixture. Verify the record clears the review gate. Return the digest prefix and check result.`

### Commands

1. `node -e 'const fs=require("node:fs"),os=require("node:os"),path=require("node:path"); const root=path.join(os.tmpdir(),"ai-system-sync-playbook-fixtures","review_kernel"); fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner",withoutReview:true});'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="$(node -p 'require("node:path").join(require("node:os").tmpdir(),"ai-system-sync-playbook-fixtures","review_kernel")')" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" review-kernel --system product-owner --reviewer playbook-operator --reason "verify current fixture contract" --decision updated`
3. `AI_SYSTEM_SYNC_REPO_ROOT="$(node -p 'require("node:path").join(require("node:os").tmpdir(),"ai-system-sync-playbook-fixtures","review_kernel")')" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| CLI-004 | Review Kernel (review-kernel) | Record a current contract and kernel review in an isolated package | `As a review orchestrator, record a kernel review against the disposable Product Owner fixture. Verify the record clears the review gate. Return the digest prefix and check result.` | `fixture setup -> review-kernel --system product-owner --reviewer playbook-operator --reason "verify current fixture contract" --decision updated -> check --system product-owner` using the exact commands above | Step 2: recorded review with a 16-character digest prefix. Step 3: `== product-owner: clean ==`. | Fixture kernel-review JSON, command outputs and final check output | PASS if the fixture receives a review record and the follow-up check exits 0. FAIL if the real fleet changes or the gate still reports required review. | Inspect contract input paths, confirm the reviewer and reason flags, then compare the recorded kernel hash with the fixture kernel. |

### Expected

The observed review command printed `review-kernel: recorded for product-owner at claude project/kernel-review.json` with digest prefix `d046c432f850e8b3...`. The follow-up check printed `== product-owner: clean ==`.

### Evidence

Capture the fixture setup, review output, the created `claude project/kernel-review.json` and the clean check transcript.

### Pass / Fail

- **PASS**: The review record contains the reviewer, reason, decision, contract digest and kernel hash, and the fixture check is clean.
- **FAIL**: The review command errors, writes outside the fixture or leaves `KERNEL_REVIEW_REQUIRED` in the follow-up check.
- **SKIP**: Use only when the disposable fixture cannot be created and record the blocker.

### Failure Triage

1. Confirm every `contractInputs` file exists in the fixture.
2. Check the exact `--reviewer`, `--reason` and `--decision` flags.
3. Compare `kernel-review.json` with `contract-digest.cjs` and `hashing.cjs` outputs.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/cli-commands/review-kernel.md](../../feature-catalog/cli-commands/review-kernel.md) | Feature-catalog command contract |

### Implementation And Test Anchors

| File                                   | Role                                         |
| ----------------------------------------| ----------------------------------------------|
| `../../ai-system-sync.cjs`             | Validates flags and writes the review record |
| `../../lib/contract-digest.cjs`        | Computes the sorted contract digest          |
| `../../lib/hashing.cjs`                | Computes the kernel SHA-256                  |
| `../../lib/git-utils.cjs`              | Supplies the review timestamp                |
| `../../tests/cli.test.cjs`             | Covers review command dispatch               |
| `../../tests/contract-digest.test.cjs` | Covers digest ordering and byte sensitivity  |
| `../../tests/hashing.test.cjs`         | Covers file hash behavior                    |

---

## 5. SOURCE METADATA

- Group: CLI Commands
- Playbook ID: CLI-004
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `cli-commands/review-kernel.md`
