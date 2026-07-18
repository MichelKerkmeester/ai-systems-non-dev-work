---
title: "MCH-006 -- JSON And Graph Target Validation"
description: "This scenario validates JSON And Graph Target Validation for `MCH-006`. It focuses on finding a graph edge target that matches a retired fleet name."
version: 1.0.0.0
---

# MCH-006 -- JSON And Graph Target Validation

This document captures the operator scenario for `MCH-006`.

---

## 1. OVERVIEW

This scenario validates JSON And Graph Target Validation for `MCH-006`. It focuses on strict metadata parsing and fleet-aware retired graph target detection.

### Why This Matters

Every registered skill root needs valid `description.json` and `graph-metadata.json`. Graph edges also need to avoid retired names collected from the fleet manifests.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `MCH-006` against a disposable fixture.

- Objective: Report a graph target that matches a retired fleet name.
- Real user request: `Check a disposable graph metadata file whose edge targets a retired fleet name.`
- Prompt: `Check a disposable graph metadata file whose edge targets a retired fleet name.`
- Expected execution process: Build a fixture with `mcp-media-editor` in `retiredNames`, replace graph metadata with an `enhances` edge to that name and run the real check.
- Expected signals: Exit 1 includes `[GRAPH_TARGET_RETIRED]` for `mcp-media-editor` and the text scanner also reports the graph metadata line.
- Desired user-visible outcome: The operator sees both the stale graph edge and the retired token evidence.
- Pass/fail: PASS if the graph target finding names the skill root and retired target. FAIL if the edge is accepted or metadata parsing crashes.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Check a disposable graph metadata file whose edge targets a retired fleet name.`

### Commands

1. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/graph"; fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner",retiredNames:["mcp-media-editor"]}); h.writeJson(root,"Product Owner/sk-product-owner/graph-metadata.json",{schema_version:2,skill_id:"product-owner",edges:{enhances:[{target:"mcp-media-editor",weight:0.5,context:"stale cross-reference"}]}});'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/graph" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| MCH-006 | JSON And Graph Target Validation | Flag a graph target that matches a retired fleet name | `Check a disposable graph metadata file whose edge targets a retired fleet name.` | `fixture setup -> check --system product-owner` using the exact commands above | Step 2: exit 1 with `[GRAPH_TARGET_RETIRED]` and `[RETIRED_TOKEN_FOUND]` | Graph metadata, manifest retired name and CLI findings | PASS if both findings are present and metadata remains parseable. FAIL if the graph target is accepted or the command crashes. | Parse graph metadata directly, compare lowercased target values with fleet retired names and inspect `collectEdgeTargets`. |

### Expected

The observed check printed exit 1 with `[RETIRED_TOKEN_FOUND]` for `sk-product-owner/graph-metadata.json:7` and `[GRAPH_TARGET_RETIRED]` naming `mcp-media-editor`.

### Evidence

Capture the graph JSON, the retired-name declaration and the complete check transcript.

### Pass / Fail

- **PASS**: Strict JSON parsing succeeds and the graph target finding names the retired target.
- **FAIL**: The file is ignored, the target is accepted or the check crashes before reporting it.
- **SKIP**: Use only when the fixture cannot be created and record the blocker.

### Failure Triage

1. Validate the graph file as strict JSON and inspect the `edges` arrays.
2. Confirm the retired name is present in the fixture manifest and is lowercased for comparison.
3. Compare the graph target path with `collectEdgeTargets` output.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/mechanical-checks/json-and-graph-target-validation.md](../../feature-catalog/mechanical-checks/json-and-graph-target-validation.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/mechanical-checks.cjs` | Parses metadata and checks graph targets |
| `../../lib/util.cjs` | Provides strict JSON parsing |
| `../../lib/registry.cjs` | Supplies registered skill roots |
| `../../tests/mechanical-checks.test.cjs` | Covers JSON and graph findings |
| `../../tests/fleet-retired-names.test.cjs` | Covers fleet retired-name aggregation |

---

## 5. SOURCE METADATA

- Group: Mechanical Checks
- Playbook ID: MCH-006
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `mechanical-checks/json-and-graph-target-validation.md`
