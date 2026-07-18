---
title: "REG-002 -- Manifest Schema And Derivation Exceptions"
description: "This scenario validates Manifest Schema And Derivation Exceptions for `REG-002`. It focuses on rejecting an unknown manifest field before planning."
version: 1.0.0.0
---

# REG-002 -- Manifest Schema And Derivation Exceptions

This document captures the operator scenario for `REG-002`.

---

## 1. OVERVIEW

This scenario validates Manifest Schema And Derivation Exceptions for `REG-002`. It focuses on the hand-rolled manifest validator and its unknown-field rejection.

### Why This Matters

The manifest is hand-authored contract data. Rejecting fields outside the documented shape prevents a typo or unreviewed option from changing package behavior silently.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `REG-002` against a disposable fixture.

- Objective: Reject an unknown top-level manifest field through the plan command.
- Real user request: `Validate a disposable manifest with an unknown top-level field and show the exact validation finding.`
- Prompt: `Validate a disposable manifest with an unknown top-level field and show the exact validation finding.`
- Expected execution process: Build a valid fixture, add an `unexpected` top-level field and run `plan --system product-owner` through the environment override.
- Expected signals: The plan prints `manifest invalid` and `unknown manifest field "unexpected"`.
- Desired user-visible outcome: The operator receives the exact field error before any sync operation is attempted.
- Pass/fail: PASS if the unknown field is named and no package write occurs. FAIL if the manifest is accepted or the error is hidden.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Validate a disposable manifest with an unknown top-level field and show the exact validation finding.`

### Commands

1. `node -e 'const fs=require("node:fs"),os=require("node:os"),path=require("node:path"); const root=path.join(os.tmpdir(),"ai-system-sync-playbook-fixtures","manifest_invalid"); fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); const f=h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner"}); f.manifest.unexpected=true; h.writeJson(root,"Product Owner/claude-project.sync.json",f.manifest);'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="$(node -p 'require("node:path").join(require("node:os").tmpdir(),"ai-system-sync-playbook-fixtures","manifest_invalid")')" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" plan --system product-owner`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| REG-002 | Manifest Schema And Derivation Exceptions | Reject an unknown top-level manifest field | `Validate a disposable manifest with an unknown top-level field and show the exact validation finding.` | `fixture setup -> plan --system product-owner` using the exact commands above | Step 2: `manifest invalid` and `unknown manifest field "unexpected"` | Fixture manifest, plan output and exit code | PASS if the validator names the unknown field and prevents normal planning. FAIL if the field is accepted. | Inspect the allowed-key set in `manifest.cjs`, confirm the fixture path and rerun the focused manifest tests. |

### Expected

The observed plan printed `manifest invalid` followed by `unknown manifest field "unexpected"`.

### Evidence

Capture the invalid manifest, the plan output and the exit code.

### Pass / Fail

- **PASS**: The validator rejects the field with the exact field name before printing a valid manifest report.
- **FAIL**: The unknown field is accepted, the error is generic or the command writes package state.
- **SKIP**: Use only when the fixture cannot be created and record the blocker.

### Failure Triage

1. Validate the fixture JSON independently with strict JSON parsing.
2. Compare the top-level keys with the allowed set in `manifest.cjs` and `package.schema.json`.
3. Run `node --test "z — Sync Skill to Claude Project/tests/manifest.test.cjs"` and compare the unknown-field assertion.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md](../../feature-catalog/fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/manifest.cjs` | Enforces manifest shape, registered renderers and exception fields |
| `../../package.schema.json` | Documents the manifest contract |
| `../../lib/path-safety.cjs` | Rejects unsafe relative path declarations |
| `../../lib/mirrors.cjs` | Implements deterministic exception rendering |
| `../../lib/mechanical-checks.cjs` | Checks parity against compiler-rendered bytes |
| `../../ai-system-sync.cjs` | Uses rendered bytes during sync planning |
| `../../tests/manifest.test.cjs` | Covers unknown fields and fixed paths |
| `../../tests/mechanical-checks.test.cjs` | Covers exception behavior |
| `../../tests/sync-write.test.cjs` | Covers deterministic exception rendering |

---

## 5. SOURCE METADATA

- Group: Fleet Registry And Manifest
- Playbook ID: REG-002
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md`
