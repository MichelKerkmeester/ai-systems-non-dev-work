---
title: "MCH-005 -- Retired Token Scanning"
description: "This scenario validates Retired Token Scanning for `MCH-005`. It focuses on finding a retired token outside declared scan exclusions."
version: 1.0.0.0
---

# MCH-005 -- Retired Token Scanning

This document captures the operator scenario for `MCH-005`.

---

## 1. OVERVIEW

This scenario validates Retired Token Scanning for `MCH-005`. It focuses on reporting a retired name with its package-relative file and line number.

### Why This Matters

Retired names must not remain in live package content. The scanner must still allow the manifest and tool-owned state files to record those names.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `MCH-005` against a disposable fixture.

- Objective: Find a retired token in a package README.
- Real user request: `Find a retired token left in a disposable package file and show its path and line.`
- Prompt: `Find a retired token left in a disposable package file and show its path and line.`
- Expected execution process: Build a fixture with `retiredNames`, add the token to `README.md` and run the real check.
- Expected signals: Exit 1 with `[RETIRED_TOKEN_FOUND]` and `README.md:1 ("Old Skill Name v0.9")`.
- Desired user-visible outcome: The operator knows exactly where the retired reference remains.
- Pass/fail: PASS if the path, line and token are reported. FAIL if the token is missed or the manifest-owned declaration is incorrectly reported.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `Find a retired token left in a disposable package file and show its path and line.`

### Commands

1. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/retired"; fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner",retiredNames:["Old Skill Name v0.9"]}); h.writeFile(root,"Product Owner/README.md","See Old Skill Name v0.9 for background.\n");'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/retired" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| MCH-005 | Retired Token Scanning | Find a retired token and report its file and line | `Find a retired token left in a disposable package file and show its path and line.` | `fixture setup -> check --system product-owner` using the exact commands above | Step 2: exit 1 with `[RETIRED_TOKEN_FOUND] README.md:1` and the token | Fixture manifest, README content and CLI transcript | PASS if the finding includes the file, line and token. FAIL if the token is missed or tool-owned files create false findings. | Confirm `retiredNames`, `scanExcludes` and tool-owned paths, then inspect `scanFileForTokens`. |

### Expected

The observed check printed exit 1 with `[RETIRED_TOKEN_FOUND] Retired token(s) found outside declared history: README.md:1 ("Old Skill Name v0.9")`.

### Evidence

Capture the retired-name declaration, README content and the finding transcript.

### Pass / Fail

- **PASS**: The scanner reports the retired token with `README.md:1` and the token text.
- **FAIL**: The scanner misses the token, reports the wrong line or flags only the manifest declaration.
- **SKIP**: Use only when the fixture cannot be created and record the blocker.

### Failure Triage

1. Verify the token is in `retiredNames` with the exact case used in the file.
2. Confirm the file is not under `scanExcludes` and is not a binary extension.
3. Inspect the scanner's tool-owned path set before changing the fixture.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/mechanical-checks/retired-token-scanning.md](../../feature-catalog/mechanical-checks/retired-token-scanning.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/mechanical-checks.cjs` | Scans package files and emits retired-token findings |
| `../../lib/util.cjs` | Walks package files |
| `../../lib/paths.cjs` | Defines tool-owned state paths |
| `../../tests/mechanical-checks.test.cjs` | Covers token findings and exclusions |
| `../../tests/fleet-retired-names.test.cjs` | Covers fleet-wide retired-name aggregation |

---

## 5. SOURCE METADATA

- Group: Mechanical Checks
- Playbook ID: MCH-005
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `mechanical-checks/retired-token-scanning.md`
