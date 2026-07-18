---
title: "TXN-001 -- Staged Atomic Writes And Locking"
description: "This scenario validates Staged Atomic Writes And Locking for `TXN-001`. It focuses on staging, locking, package-lock creation and cleanup after sync."
version: 1.0.0.0
---

# TXN-001 -- Staged Atomic Writes And Locking

This document captures the operator scenario for `TXN-001`.

---

## 1. OVERVIEW

This scenario validates Staged Atomic Writes And Locking for `TXN-001`. It focuses on the transaction artifacts and idempotent cleanup around a generated-region write.

### Why This Matters

The transaction engine must stage bytes before apply, serialize fleet writes with one lock, write the package lock last and remove journal, backup and staged artifacts after success.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `TXN-001` against a disposable fixture.

- Objective: Apply a sync transaction and prove that its temporary artifacts are cleaned.
- Real user request: `Run a disposable sync twice and confirm the first write is atomic while the second write is a no-op.`
- Prompt: `As a transaction orchestrator, run sync --write twice against the disposable fixture. Verify staging artifacts are absent after apply and the second run reports zero changes. Return both outputs and artifact checks.`
- Expected execution process: Prepare a generated-region fixture, run two real sync writes and inspect the package lock, journal and transaction artifact names.
- Expected signals: First run applies one change. Second run reports zero changes. The package lock exists and no journal, backup or staged file remains.
- Desired user-visible outcome: The operator can trust the sync result as an atomic, repeatable operation.
- Pass/fail: PASS if the first transaction applies once, all temporary files are gone and the second transaction is a no-op. FAIL if artifacts remain or a partial result is visible.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `As a transaction orchestrator, run sync --write twice against the disposable fixture. Verify staging artifacts are absent after apply and the second run reports zero changes. Return both outputs and artifact checks.`

### Commands

1. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/transaction"; fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner",generatedRegions:[{target:"SYNC.md",sections:["INVENTORY"]}]}); h.writeFile(root,"Product Owner/SYNC.md","# Sync\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC INVENTORY -->\n(pending)\n<!-- END GENERATED: AI-SYSTEM-SYNC INVENTORY -->\n");'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/transaction" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --write`
3. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/transaction" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --write`
4. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/transaction"; const pkg=path.join(root,"Product Owner"); const lock=path.join(pkg,"claude project","package-lock.json"); const journal=path.join(pkg,"claude project","sync-journal.json"); if(!fs.existsSync(lock)||fs.existsSync(journal)||fs.readdirSync(pkg).some((name)=>name.includes(".ai-system-sync"))) process.exit(1); process.stdout.write("transaction artifacts cleaned after apply\n");'`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| TXN-001 | Staged Atomic Writes And Locking | Apply one transaction, clean its artifacts and prove a no-op repeat | `As a transaction orchestrator, run sync --write twice against the disposable fixture. Verify staging artifacts are absent after apply and the second run reports zero changes. Return both outputs and artifact checks.` | `fixture setup -> sync --write -> sync --write -> artifact assertion` using the exact commands above | Step 2: `applied 1 change(s)`. Step 3: `already up to date (0 change(s))`. Step 4: cleanup assertion | Both outputs, package lock, generated file and artifact assertion | PASS if the lock remains and all journal, backup and staged artifacts are absent. FAIL if any temporary artifact remains. | Inspect the repo lock, journal lifecycle and staged sibling names, then compare the transaction test rollback cases. |

### Expected

The observed first sync printed `sync: applied 1 change(s) for product-owner.` The second printed `sync: product-owner already up to date (0 change(s)).` The assertion printed `transaction artifacts cleaned after apply`.

### Evidence

Capture the fixture state before the write, both CLI outputs, the package lock and the artifact assertion output.

### Pass / Fail

- **PASS**: The first write applies once, the package lock exists, the second write applies zero changes and no temporary transaction file remains.
- **FAIL**: A journal, backup or staged file remains, the lock is missing or the second run rewrites unchanged bytes.
- **SKIP**: Use only when the disposable fixture cannot be created and record the blocker.

### Failure Triage

1. Check the repository lock path and whether a stale lock exists.
2. Inspect `sync-journal.json`, `*.ai-system-sync.bak` and `*.ai-system-sync.staged.*` before cleanup.
3. Run the focused transaction and sync-write tests to distinguish apply failure from cleanup failure.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/transaction-engine/staged-atomic-writes-and-locking.md](../../feature-catalog/transaction-engine/staged-atomic-writes-and-locking.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/transaction.cjs` | Implements staging, lock, journal, apply and cleanup |
| `../../ai-system-sync.cjs` | Supplies operations and writes the lock last |
| `../../lib/hashing.cjs` | Rehashes sources before apply |
| `../../lib/paths.cjs` | Defines transaction artifact paths |
| `../../tests/transaction.test.cjs` | Covers locks, staging and rollback |
| `../../tests/sync-write.test.cjs` | Covers end-to-end writes, locks and no-op reruns |

---

## 5. SOURCE METADATA

- Group: Transaction Engine
- Playbook ID: TXN-001
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `transaction-engine/staged-atomic-writes-and-locking.md`
