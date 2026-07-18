---
title: "MCH-004 -- Generated Region Reproduction"
description: "This scenario validates Generated Region Reproduction for `MCH-004`. It focuses on detecting a hand edit inside a locked generated region."
version: 1.0.0.0
---

# MCH-004 -- Generated Region Reproduction

This document captures the operator scenario for `MCH-004`.

---

## 1. OVERVIEW

This scenario validates Generated Region Reproduction for `MCH-004`. It focuses on locking a generated region through sync and detecting body drift afterward.

### Why This Matters

Generated markers protect compiler-owned content while allowing hand-authored text outside the markers. A changed locked body must produce a precise finding instead of being silently absorbed.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `MCH-004` against a disposable fixture.

- Objective: Detect drift inside the locked `INVENTORY` region in `SYNC.md`.
- Real user request: `Sync a disposable generated region, edit its locked body and check for region drift.`
- Prompt: `Sync a disposable generated region, edit its locked body and check for region drift.`
- Expected execution process: Prepare markers, run `sync --write`, replace one generated line and run `check`.
- Expected signals: Sync applies one change. The later check exits 1 with `[REGION_DRIFT]` and names `INVENTORY` in `SYNC.md`.
- Desired user-visible outcome: The operator sees that a hand edit inside compiler-owned bytes requires regeneration.
- Pass/fail: PASS if the locked body edit produces `REGION_DRIFT`. FAIL if the check accepts or overwrites the edit without reporting it.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Sync a disposable generated region, edit its locked body and check for region drift.`

### Commands

1. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/region"; fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner",generatedRegions:[{target:"SYNC.md",sections:["INVENTORY"]}]}); h.writeFile(root,"Product Owner/SYNC.md","# Sync\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC INVENTORY -->\n(pending)\n<!-- END GENERATED: AI-SYSTEM-SYNC INVENTORY -->\n");'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/region" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --write`
3. `node -e 'const fs=require("node:fs"),path=require("node:path"); const file="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/region/Product Owner/SYNC.md"; const content=fs.readFileSync(file,"utf8"); fs.writeFileSync(file,content.replace("**Declared mirrors:** 1","hand edited region"));'`
4. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/region" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| MCH-004 | Generated Region Reproduction | Detect drift inside a locked generated region | `Sync a disposable generated region, edit its locked body and check for region drift.` | `fixture setup -> sync --write -> edit locked body -> check --system product-owner` using the exact commands above | Step 2: `applied 1 change(s)`. Step 4: exit 1 with `[REGION_DRIFT]` for `INVENTORY` in `SYNC.md` | Generated file before and after edit, package lock region hash and check output | PASS if the body edit produces `REGION_DRIFT`. FAIL if it is accepted silently. | Confirm the markers and section name, compare `lock.regions` with the extracted body and inspect `regions.cjs`. |

### Expected

The observed sync printed `sync: applied 1 change(s) for product-owner.` The later check printed exit 1 with `[REGION_DRIFT] Generated region "INVENTORY" in SYNC.md`.

### Evidence

Capture the scaffold, rendered body, `package-lock.json` region record, edit command and drift finding.

### Pass / Fail

- **PASS**: The locked generated body edit is reported as `REGION_DRIFT` with the target and section.
- **FAIL**: The body edit is ignored, the marker pair is lost without a structural finding or the check returns clean.
- **SKIP**: Use only when the fixture cannot be created and record the blocker.

### Failure Triage

1. Confirm the generated target and section are present in the manifest.
2. Extract the live region body and compare its SHA-256 with `lock.regions`.
3. Check `extractRegion` and `checkGeneratedRegions` for the target and section key.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/mechanical-checks/generated-region-reproduction.md](../../feature-catalog/mechanical-checks/generated-region-reproduction.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/mechanical-checks.cjs` | Checks markers and locked region hashes |
| `../../lib/regions.cjs` | Extracts and replaces generated regions |
| `../../lib/hashing.cjs` | Hashes region bodies |
| `../../lib/manifest.cjs` | Validates region declarations |
| `../../tests/mechanical-checks.test.cjs` | Covers structural and drift findings |
| `../../tests/regions.test.cjs` | Covers marker and extraction behavior |
| `../../tests/sync-write.test.cjs` | Covers CLI region writes and refusal |

---

## 5. SOURCE METADATA

- Group: Mechanical Checks
- Playbook ID: MCH-004
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `mechanical-checks/generated-region-reproduction.md`
