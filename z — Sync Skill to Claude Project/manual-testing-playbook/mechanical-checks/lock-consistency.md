---
title: "MCH-003 -- Lock Consistency"
description: "This scenario validates Lock Consistency for `MCH-003`. It focuses on detecting live bytes that no longer match package-lock.json."
version: 1.0.0.0
---

# MCH-003 -- Lock Consistency

This document captures the operator scenario for `MCH-003`.

---

## 1. OVERVIEW

This scenario validates Lock Consistency for `MCH-003`. It focuses on detecting a kernel byte change after a package lock was recorded.

### Why This Matters

The package lock records the live kernel and mirror hashes. A changed file must be visible as drift even when the manifest and review state also need attention.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `MCH-003` against a disposable fixture.

- Objective: Detect a kernel hash mismatch against the recorded package lock.
- Real user request: `Check a disposable package after its kernel changed without updating package-lock.json.`
- Prompt: `Check a disposable package after its kernel changed without updating package-lock.json.`
- Expected execution process: Build a clean fixture, replace the kernel bytes without updating the lock and run the real CLI check.
- Expected signals: Exit 3 includes `[LOCK_HASH_MISMATCH]` for `claude project/Custom Instructions.md` and also reports the review requirement caused by the same kernel change.
- Desired user-visible outcome: The operator sees both the byte-lock drift and the required review action.
- Pass/fail: PASS if the lock finding names the kernel path and the process reports exit 3. FAIL if the changed bytes are accepted.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Check a disposable package after its kernel changed without updating package-lock.json.`

### Commands

1. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/lock"; fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner"}); h.writeFile(root,"Product Owner/claude project/Custom Instructions.md","drifted kernel\n");'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/lock" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| MCH-003 | Lock Consistency | Detect a changed kernel against package-lock.json | `Check a disposable package after its kernel changed without updating package-lock.json.` | `fixture setup -> check --system product-owner` using the exact commands above | Step 2: exit 3 with `[LOCK_HASH_MISMATCH]` for `Custom Instructions.md` and `[KERNEL_REVIEW_REQUIRED]` | Original and changed kernel bytes, package lock and CLI transcript | PASS if the lock mismatch is reported with the kernel path. FAIL if the changed kernel is accepted. | Inspect the recorded `sha256` and `sha16`, hash the live kernel and rerun the review gate check. |

### Expected

The observed check printed exit 3 with `[LOCK_HASH_MISMATCH] claude project/Custom Instructions.md` and `[KERNEL_REVIEW_REQUIRED] Custom Instructions.md changed since the recorded kernel review.`

### Evidence

Capture the original lock record, the replacement kernel content and the complete finding output.

### Pass / Fail

- **PASS**: The process reports the lock mismatch for the changed kernel and keeps the review requirement visible.
- **FAIL**: The lock mismatch is absent or the check returns clean.
- **SKIP**: Use only when the fixture cannot be created and record the blocker.

### Failure Triage

1. Verify the fixture lock exists and contains a hash for the kernel path.
2. Compare `hashFile(kernel)` with the recorded `sha256` and `sha16`.
3. Check whether the file changed after the lock was recorded.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/mechanical-checks/lock-consistency.md](../../feature-catalog/mechanical-checks/lock-consistency.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/mechanical-checks.cjs` | Loads the lock and compares live hashes |
| `../../lib/hashing.cjs` | Computes file hashes and validates prefixes |
| `../../lib/paths.cjs` | Defines the package-lock path |
| `../../tests/mechanical-checks.test.cjs` | Covers lock mismatch and prefix findings |
| `../../tests/sync-write.test.cjs` | Covers package-lock creation after sync |

---

## 5. SOURCE METADATA

- Group: Mechanical Checks
- Playbook ID: MCH-003
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `mechanical-checks/lock-consistency.md`
