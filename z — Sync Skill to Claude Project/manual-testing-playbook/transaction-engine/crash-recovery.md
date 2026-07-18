---
title: "TXN-002 -- Crash Recovery"
description: "This scenario validates Crash Recovery for `TXN-002`. It focuses on deterministic rollback of a synthetic interrupted journal."
version: 1.0.0.0
---

# TXN-002 -- Crash Recovery

This document captures the operator scenario for `TXN-002`.

---

## 1. OVERVIEW

This scenario validates Crash Recovery for `TXN-002`. It focuses on detecting a journal, refusing normal check progress, restoring original bytes and removing recovery state.

### Why This Matters

The recovery path must roll back from the journal rather than guessing how to complete an unknown crash point. It must also leave the package ready for a later sync.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `TXN-002` against a disposable fixture.

- Objective: Recover a package from a synthetic interrupted write.
- Real user request: `Recover this disposable package after an interrupted sync and confirm the original file bytes return before a new sync starts.`
- Prompt: `Recover this disposable package after an interrupted sync and confirm the original file bytes return before a new sync starts.`
- Expected execution process: Create an original file, replace it with half-applied bytes, record a journal, run `check`, run `sync --recover`, verify the original bytes and run `check` again.
- Expected signals: First check exits 5 with `[INTERRUPTED_TRANSACTION]`. Recovery prints `rolled back 1/1 operation(s)`. The assertion confirms original bytes and no journal. Final check is clean.
- Desired user-visible outcome: The operator can recover safely without forward-completing an unknown transaction.
- Pass/fail: PASS if rollback restores the original bytes and removes the journal. FAIL if half-applied content remains or recovery leaves state behind.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Recover this disposable package after an interrupted sync and confirm the original file bytes return before a new sync starts.`

### Commands

1. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/recovery"; fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner"}); const pkg=path.join(root,"Product Owner"); h.writeFile(root,"Product Owner/recovery.md","original\n"); fs.renameSync(path.join(pkg,"recovery.md"),path.join(pkg,"recovery.md.ai-system-sync.bak")); h.writeFile(root,"Product Owner/recovery.md","half-applied\n"); h.writeJson(root,"Product Owner/claude project/sync-journal.json",{schemaVersion:1,operations:[{type:"write",target:"recovery.md",staged:null,backup:"recovery.md.ai-system-sync.bak",existedBefore:true,done:true}]});'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/recovery" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner`
3. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/recovery" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --recover`
4. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/recovery"; const pkg=path.join(root,"Product Owner"); if(fs.readFileSync(path.join(pkg,"recovery.md"),"utf8")!=="original\n"||fs.existsSync(path.join(pkg,"claude project","sync-journal.json"))) process.exit(1); process.stdout.write("recovery restored original bytes and removed journal\n");'`
5. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/recovery" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| TXN-002 | Crash Recovery | Roll back a journaled half-applied write and clear recovery state | `Recover this disposable package after an interrupted sync and confirm the original file bytes return before a new sync starts.` | `fixture setup -> check -> sync --recover -> byte and journal assertion -> check` using the exact commands above | Step 2: exit 5 with `[INTERRUPTED_TRANSACTION]`. Step 3: `rolled back 1/1`. Step 4: original bytes and no journal. Step 5: clean | Journal JSON, backup file, check and recovery transcripts and assertion output | PASS if recovery restores `original` bytes, removes the journal and the final check is clean. FAIL if recovery forward-completes or leaves artifacts. | Inspect journal operations in reverse order, confirm the backup path and run `sync --recover` again only after recording the first result. |

### Expected

The first check printed exit 5 with `[INTERRUPTED_TRANSACTION]`. Recovery printed `sync --recover: rolled back 1/1 operation(s) for product-owner.` The assertion printed `recovery restored original bytes and removed journal`. The final check printed `== product-owner: clean ==`.

### Evidence

Capture the synthetic journal, original and half-applied bytes, both check outputs, the recovery output and the post-recovery assertion.

### Pass / Fail

- **PASS**: Recovery restores the original bytes, removes the journal and leaves the fixture clean.
- **FAIL**: The recovery path loses the original bytes, leaves the journal or reports clean before recovery.
- **SKIP**: Use only when the sandbox cannot safely create a journal and record the blocker.

### Failure Triage

1. Confirm the journal is valid JSON and contains the expected operation target and backup.
2. Inspect `detectInterruptedJournal` and `rollbackOperation` for the observed path.
3. Check for leftover staged or backup files before attempting a second recovery.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/transaction-engine/crash-recovery.md](../../feature-catalog/transaction-engine/crash-recovery.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/transaction.cjs` | Detects journals and performs reverse rollback |
| `../../ai-system-sync.cjs` | Blocks interrupted syncs and exposes recovery |
| `../../lib/util.cjs` | Parses journal JSON and typed read errors |
| `../../lib/paths.cjs` | Defines the journal path |
| `../../tests/transaction.test.cjs` | Covers crash journals, rollback and cleanup |
| `../../tests/sync-write.test.cjs` | Covers the real CLI recovery path |
| `../../tests/cli.test.cjs` | Covers interruption reporting and recovery dispatch |

---

## 5. SOURCE METADATA

- Group: Transaction Engine
- Playbook ID: TXN-002
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `transaction-engine/crash-recovery.md`
