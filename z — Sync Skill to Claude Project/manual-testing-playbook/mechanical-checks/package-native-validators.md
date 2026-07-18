---
title: "MCH-008 -- Package Native Validators"
description: "This scenario validates Package Native Validators for `MCH-008`. It focuses on running a declared validator only when the caller opts in."
version: 1.0.0.0
---

# MCH-008 -- Package Native Validators

This document captures the operator scenario for `MCH-008`.

---

## 1. OVERVIEW

This scenario validates Package Native Validators for `MCH-008`. It focuses on the opt-in validator path and its fixed exit code.

### Why This Matters

Package-owned validators must run from their declared working directory with their declared argument vector. The caller must not run them by default and must report a failure as exit 4 when explicitly requested.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `MCH-008` against a disposable fixture.

- Objective: Run a declared failing validator through `check --run-validators`.
- Real user request: `Run the declared package validator against a disposable fixture and show its failure state.`
- Prompt: `As a CI validation operator, run check --system product-owner --run-validators against the disposable package fixture. Verify a non-zero validator returns exit 4 with a named finding. Return the validator output.`
- Expected execution process: Build a valid fixture with one `node -e process.exit(1)` validator and invoke the CLI with the opt-in flag.
- Expected signals: Exit 4 with `[VALIDATOR_FAILED] Validator "always-fails" failed` and `exited with status 1, no output`.
- Desired user-visible outcome: The operator sees the validator name, command and failure detail.
- Pass/fail: PASS if the validator runs only with the flag and produces the named exit 4 finding. FAIL if it runs without opt-in or produces an incorrect state.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `As a CI validation operator, run check --system product-owner --run-validators against the disposable package fixture. Verify a non-zero validator returns exit 4 with a named finding. Return the validator output.`

### Commands

1. `node -e 'const fs=require("node:fs"),path=require("node:path"); const root="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/validator"; fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner",validators:[{name:"always-fails",command:["node","-e","process.exit(1)"],cwd:"."}]});'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="/var/folders/3c/zfqcqsts0kn19cgblj82gqhm0000gn/T/opencode/ai-system-sync-playbook-fixtures/validator" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner --run-validators`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| MCH-008 | Package Native Validators | Run one declared failing validator through the opt-in path | `As a CI validation operator, run check --system product-owner --run-validators against the disposable package fixture. Verify a non-zero validator returns exit 4 with a named finding. Return the validator output.` | `fixture setup -> check --system product-owner --run-validators` using the exact commands above | Step 2: exit 4 with `[VALIDATOR_FAILED]`, validator name and status 1 detail | Fixture manifest validator, CLI output and exit code | PASS if the validator runs with the flag and reports exit 4. FAIL if it is skipped or runs without opt-in. | Run the same fixture without `--run-validators`, verify no validator finding, then inspect the command array and cwd. |

### Expected

The observed check printed exit 4 with `[VALIDATOR_FAILED] Validator "always-fails" failed (node -e process.exit(1)): exited with status 1, no output`.

### Evidence

Capture the validator declaration, the opt-in command, the finding and the exit code. A separate no-flag run is optional and must be recorded if executed.

### Pass / Fail

- **PASS**: The declared validator runs with the opt-in flag and produces the named exit 4 finding without an `undefined` detail.
- **FAIL**: The validator runs by default, is skipped with the flag or returns another exit state.
- **SKIP**: Use only when the fixture cannot be created and record the blocker.

### Failure Triage

1. Confirm the manifest validator has a non-empty name, command array and cwd.
2. Run the command from the fixture cwd to confirm the intended non-zero status.
3. Inspect `runValidators` and the `--run-validators` flag path.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/mechanical-checks/package-native-validators.md](../../feature-catalog/mechanical-checks/package-native-validators.md) | Feature-catalog implementation contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../lib/mechanical-checks.cjs` | Executes validator arrays and emits findings |
| `../../lib/manifest.cjs` | Validates validator shape |
| `../../ai-system-sync.cjs` | Exposes `--run-validators` |
| `../../lib/exit-codes.cjs` | Defines exit 4 |
| `../../tests/mechanical-checks.test.cjs` | Covers passing and failing validators |
| `../../tests/manifest.test.cjs` | Covers validator field validation |
| `../../tests/cli.test.cjs` | Covers CLI option dispatch |

---

## 5. SOURCE METADATA

- Group: Mechanical Checks
- Playbook ID: MCH-008
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `mechanical-checks/package-native-validators.md`
