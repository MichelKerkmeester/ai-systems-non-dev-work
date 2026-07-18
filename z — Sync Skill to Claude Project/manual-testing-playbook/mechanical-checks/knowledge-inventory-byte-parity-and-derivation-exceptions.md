---
title: "MCH-002 -- Knowledge Inventory, Byte Parity And Derivation Exceptions"
description: "This scenario validates Knowledge Inventory, Byte Parity And Derivation Exceptions for `MCH-002`. It focuses on preserving an explicitly reviewed hand-applied mirror."
version: 1.0.0.0
---

# MCH-002 -- Knowledge Inventory, Byte Parity And Derivation Exceptions

This document captures the operator scenario for `MCH-002`.

---

## 1. OVERVIEW

This scenario validates Knowledge Inventory, Byte Parity And Derivation Exceptions for `MCH-002`. It focuses on keeping a declared exception mirror intact during sync.

### Why This Matters

Ordinary mirrors must match their dereferenced sources. A reviewed derivation exception is the narrow boundary for intentional hand-applied content and must be honored by both the checker and the sync planner.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `MCH-002` against a disposable fixture.

- Objective: Preserve a hand-applied mirror declared in `derivationExceptions`.
- Real user request: `Sync a disposable package with a reviewed derivation exception and verify the hand-applied mirror survives.`
- Prompt: `Sync a disposable package with a reviewed derivation exception and verify the hand-applied mirror survives.`
- Expected execution process: Build a fixture with one declared exception, replace its mirror bytes, run `sync --write` and compare the target bytes afterward.
- Expected signals: Sync prints `already up to date (0 change(s))` and the target remains `hand-applied content`.
- Desired user-visible outcome: The approved exception survives without a raw source copy overwriting it.
- Pass/fail: PASS if the target bytes remain unchanged and no unrelated write occurs. FAIL if the exception target is overwritten or an undeclared exception is honored.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Sync a disposable package with a reviewed derivation exception and verify the hand-applied mirror survives.`

### Commands

1. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/knowledge_exception"; fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); const target="Product Owner - System - Skill - v1.0.0.md"; h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner",mirrorTarget:target,derivationExceptions:[{path:target,reason:"hand-applied mirror formatting"}]}); h.writeFile(root,path.join("Product Owner","claude project","knowledge",target),"hand-applied content\n");'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/knowledge_exception" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --write`
3. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/knowledge_exception"; const file=path.join(root,"Product Owner","claude project","knowledge","Product Owner - System - Skill - v1.0.0.md"); if(fs.readFileSync(file,"utf8")!=="hand-applied content\n") process.exit(1); process.stdout.write("derivation exception mirror preserved\n");'`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| MCH-002 | Knowledge Inventory, Byte Parity And Derivation Exceptions | Preserve the content of a declared exception mirror | `Sync a disposable package with a reviewed derivation exception and verify the hand-applied mirror survives.` | `fixture setup -> sync --system product-owner --write -> byte assertion` using the exact commands above | Step 2: `already up to date (0 change(s))`. Step 3: `derivation exception mirror preserved`. | Manifest exception entry, sync output, target bytes and assertion output | PASS if the exception target remains byte-identical to the hand-applied content. FAIL if sync overwrites it. | Confirm the exception path equals the mirror target, inspect the reason and compare the sync planner with `isDerivationException`. |

### Expected

The observed sync printed `sync: product-owner already up to date (0 change(s)).` The byte assertion printed `derivation exception mirror preserved`.

### Evidence

Capture the manifest exception object, the sync transcript, the target file before and after the command and the assertion output.

### Pass / Fail

- **PASS**: The declared exception target remains hand-applied and the command does not replace it.
- **FAIL**: The target is overwritten, an undeclared target is skipped or the assertion fails.
- **SKIP**: Use only when a disposable package cannot be created and record the blocker.

### Failure Triage

1. Confirm the exception `path` exactly matches the mirror target.
2. Remove the exception in a fresh fixture and confirm ordinary parity behavior before changing implementation files.
3. Inspect `checkKnowledgeInventory` and `buildSyncOperations` for consistent exception handling.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md](../../feature-catalog/mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/mechanical-checks.cjs` | Checks inventory, counts, byte parity and exceptions |
| `../../lib/hashing.cjs` | Hashes source and mirror bytes |
| `../../lib/manifest.cjs` | Validates exception shape |
| `../../ai-system-sync.cjs` | Skips exception targets during sync planning |
| `../../tests/mechanical-checks.test.cjs` | Covers parity and exception findings |
| `../../tests/sync-write.test.cjs` | Covers exception preservation through the CLI |
| `../../tests/manifest.test.cjs` | Covers exception field validation |

---

## 5. SOURCE METADATA

- Group: Mechanical Checks
- Playbook ID: MCH-002
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md`
