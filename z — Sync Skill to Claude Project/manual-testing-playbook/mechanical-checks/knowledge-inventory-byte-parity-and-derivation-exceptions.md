---
title: "MCH-002 -- Knowledge Inventory, Byte Parity And Derivation Exceptions"
description: "This scenario validates Knowledge Inventory, Byte Parity And Derivation Exceptions for `MCH-002`. It focuses on deterministic Project Skill mirror rendering."
version: 1.0.0.0
---

# MCH-002 -- Knowledge Inventory, Byte Parity And Derivation Exceptions

This document captures the operator scenario for `MCH-002`.

---

## 1. OVERVIEW

This scenario validates Knowledge Inventory, Byte Parity And Derivation Exceptions for `MCH-002`. It focuses on rendering a declared Project Skill mirror deterministically during sync.

### Why This Matters

Ordinary mirrors must match their dereferenced sources. A declared derivation exception must select the registered `project-skill-mirror-v1` renderer, and both the checker and sync planner must produce the same frontmatter and retargeted links.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `MCH-002` against a disposable fixture.

- Objective: Render a Project Skill mirror declared in `derivationExceptions`.
- Real user request: `Sync a disposable package with a deterministic derivation exception and verify its Project frontmatter and links.`
- Prompt: `Sync a disposable package with a deterministic derivation exception and verify its Project frontmatter and links.`
- Expected execution process: Build a fixture with a raw Skill, one mapped reference and `project-skill-mirror-v1` configuration, run `sync --write` and inspect the rendered target bytes.
- Expected signals: Sync prints `applied 3 change(s)` for the transformed Skill mirror, new reference mirror and final package lock. The assertion confirms the generated title, retrieval metadata and retargeted Project link.
- Desired user-visible outcome: The exception target is reproducible from declared source and manifest data with no hand-maintained bytes.
- Pass/fail: PASS if the target contains the exact deterministic transformations and stale target content is gone. FAIL if sync skips the target or produces undeclared output.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Sync a disposable package with a deterministic derivation exception and verify its Project frontmatter and links.`

### Commands

1. `node -e 'const fs=require("node:fs"),os=require("node:os"),path=require("node:path"); const root=path.join(os.tmpdir(),"ai-system-sync-playbook-fixtures","knowledge_exception"); fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); const target="Product Owner - System - Skill - v1.0.0.md"; const source="---\nname: product-owner\nversion: 1.0.0\n---\n\n# Raw Skill\n\n[Reference](./references/example.md)\n"; const f=h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner",mirrorTarget:target,skillMdContent:source}); h.writeFile(root,"Product Owner/sk-product-owner/references/example.md","# Reference\n"); f.manifest.sourceCoverage.include.push("sk-product-owner/references/example.md"); f.manifest.mirrors.push({source:"sk-product-owner/references/example.md",target:"Product Owner - Reference - Example - v1.0.0.md",sourceVersion:"1.0.0",projectVersion:"1.0.0"}); f.manifest.expectedKnowledgeCount=2; f.manifest.derivationExceptions=[{path:target,reason:"Retarget links and add Project retrieval metadata.",renderer:"project-skill-mirror-v1",projectFrontmatter:{contextType:"reference",importanceTier:"high",triggerPhrases:["product owner skill"]}}]; h.writeJson(root,"Product Owner/claude-project.sync.json",f.manifest);'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="$(node -p 'require("node:path").join(require("node:os").tmpdir(),"ai-system-sync-playbook-fixtures","knowledge_exception")')" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --write`
3. `node -e 'const fs=require("node:fs"),os=require("node:os"),path=require("node:path"); const root=path.join(os.tmpdir(),"ai-system-sync-playbook-fixtures","knowledge_exception"); const file=path.join(root,"Product Owner","claude project","knowledge","Product Owner - System - Skill - v1.0.0.md"); const rendered=fs.readFileSync(file,"utf8"); if(!rendered.includes("title: Product Owner - System - Skill - v1.0.0")||!rendered.includes("contextType: reference")||!rendered.includes("[Reference](<Product Owner - Reference - Example - v1.0.0.md>)")) process.exit(1); process.stdout.write("deterministic derivation exception rendered\n");'`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| MCH-002 | Knowledge Inventory, Byte Parity And Derivation Exceptions | Deterministically render a declared Project Skill mirror | `Sync a disposable package with a deterministic derivation exception and verify its Project frontmatter and links.` | `fixture setup -> sync --system product-owner --write -> byte assertion` using the exact commands above | Step 2: `applied 3 change(s)`. Step 3: `deterministic derivation exception rendered`. | Manifest renderer configuration, sync output, target bytes and assertion output | PASS if the exception target matches the declared transformation. FAIL if sync skips it or leaves stale bytes. | Confirm the exception path, renderer and frontmatter fields, then compare `renderMirrorBytes` output with the target. |

### Expected

The observed sync printed `sync: applied 3 change(s) for product-owner.` The byte assertion printed `deterministic derivation exception rendered`.

### Evidence

Capture the manifest renderer configuration, source Skill and reference, sync transcript, rendered target and assertion output.

### Pass / Fail

- **PASS**: The declared exception target contains the deterministic Project frontmatter and retargeted link.
- **FAIL**: The target is skipped, stale bytes remain, the transformation differs or the assertion fails.
- **SKIP**: Use only when a disposable package cannot be created and record the blocker.

### Failure Triage

1. Confirm the exception `path` exactly matches the mirror target and the renderer is `project-skill-mirror-v1`.
2. Confirm every relative reference or asset link maps to a declared mirror source.
3. Compare `renderMirrorBytes` use in `checkKnowledgeInventory` and `buildSyncOperations`.

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
| `../../lib/mechanical-checks.cjs` | Checks inventory, counts and parity with rendered bytes |
| `../../lib/hashing.cjs` | Hashes source and mirror bytes |
| `../../lib/manifest.cjs` | Validates renderer and Project frontmatter configuration |
| `../../lib/mirrors.cjs` | Applies Project frontmatter and link retargeting |
| `../../ai-system-sync.cjs` | Uses rendered bytes during sync planning |
| `../../tests/mechanical-checks.test.cjs` | Covers raw and rendered parity findings |
| `../../tests/sync-write.test.cjs` | Covers deterministic exception rendering through the CLI |
| `../../tests/manifest.test.cjs` | Covers required exception fields |

---

## 5. SOURCE METADATA

- Group: Mechanical Checks
- Playbook ID: MCH-002
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md`
