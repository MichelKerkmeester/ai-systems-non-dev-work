---
title: "MCH-001 -- Coverage Mapping And Source Safety"
description: "This scenario validates Coverage Mapping And Source Safety for `MCH-001`. It focuses on blocking a covered source that has no mirror mapping."
version: 1.0.0.0
---

# MCH-001 -- Coverage Mapping And Source Safety

This document captures the operator scenario for `MCH-001`.

---

## 1. OVERVIEW

This scenario validates Coverage Mapping And Source Safety for `MCH-001`. It focuses on detecting files under declared source coverage that are absent from the mirror mapping.

### Why This Matters

The check protects the boundary between authoritative skill files and derived Knowledge files. An unmapped covered file must block the package before any sync write can occur.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `MCH-001` against a disposable fixture.

- Objective: Detect an unmapped source under a declared coverage directory.
- Real user request: `Check a disposable package whose declared coverage contains an unmapped source and show the blocking finding.`
- Prompt: `Check a disposable package whose declared coverage contains an unmapped source and show the blocking finding.`
- Expected execution process: Build a valid fixture, broaden `sourceCoverage.include`, add an unlisted file and run the real CLI check through the environment override.
- Expected signals: Exit 2 with `[UNMAPPED_SOURCE]` and the paths for the uncovered metadata and reference files.
- Desired user-visible outcome: The operator sees which covered files need explicit mirror declarations.
- Pass/fail: PASS if the check blocks with `UNMAPPED_SOURCE` and names the unlisted paths. FAIL if the package reports clean or writes derived content.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Check a disposable package whose declared coverage contains an unmapped source and show the blocking finding.`

### Commands

1. `node -e 'const fs=require("node:fs"),os=require("node:os"),path=require("node:path"); const root=path.join(os.tmpdir(),"ai-system-sync-playbook-fixtures","coverage"); fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); const f=h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner"}); f.manifest.sourceCoverage.include=["sk-product-owner"]; h.writeFile(root,"Product Owner/sk-product-owner/forgotten-reference.md","new file\n"); h.writeJson(root,"Product Owner/claude-project.sync.json",f.manifest);'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="$(node -p 'require("node:path").join(require("node:os").tmpdir(),"ai-system-sync-playbook-fixtures","coverage")')" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| MCH-001 | Coverage Mapping And Source Safety | Block a file covered by sourceCoverage but absent from mirrors | `Check a disposable package whose declared coverage contains an unmapped source and show the blocking finding.` | `fixture setup -> check --system product-owner` using the exact commands above | Step 2: exit 2 and `[UNMAPPED_SOURCE]` naming covered paths | Fixture manifest, added file and CLI transcript | PASS if the finding names the unlisted paths. FAIL if the check is clean or writes state. | Inspect `sourceCoverage.include`, compare it with `mirrors[].source` and verify the environment override. |

### Expected

The observed check printed exit 2 with `[UNMAPPED_SOURCE]` and listed `sk-product-owner/description.json`, `sk-product-owner/forgotten-reference.md` and `sk-product-owner/graph-metadata.json`.

### Evidence

Capture the fixture manifest, the added file, the CLI output and the exit code.

### Pass / Fail

- **PASS**: The check returns exit 2 and identifies each covered path that has no mirror declaration.
- **FAIL**: The check returns clean, misses the added file or performs a write.
- **SKIP**: Use only when the fixture filesystem is unavailable and record the blocker.

### Failure Triage

1. Compare every file under the declared include path with `mirrors[].source`.
2. Confirm the missing path is not covered by `sourceCoverage.exclude`.
3. Inspect `checkCoverageAndMirrors` in `mechanical-checks.cjs`.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/mechanical-checks/coverage-mapping-and-source-safety.md](../../feature-catalog/mechanical-checks/coverage-mapping-and-source-safety.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/mechanical-checks.cjs` | Expands coverage and emits unmapped-source findings |
| `../../lib/util.cjs` | Walks covered directories and checks collisions |
| `../../lib/manifest.cjs` | Validates coverage and mirror fields |
| `../../lib/path-safety.cjs` | Rejects unsafe relative paths and escaping realpaths |
| `../../lib/transaction.cjs` | Rechecks source and write-target containment before staging |
| `../../tests/mechanical-checks.test.cjs` | Covers `UNMAPPED_SOURCE` and source safety |
| `../../tests/manifest.test.cjs` | Covers source coverage shape |

---

## 5. SOURCE METADATA

- Group: Mechanical Checks
- Playbook ID: MCH-001
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `mechanical-checks/coverage-mapping-and-source-safety.md`
