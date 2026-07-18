---
title: "AI System Sync Compiler: Manual Testing Playbook"
description: "Operator-facing reference combining the manual testing directory, integrated review and orchestration guidance, execution expectations and per-feature validation files for the AI System Sync Compiler tool."
version: 1.0.0.0
---

# AI System Sync Compiler: Manual Testing Playbook

This playbook is the operator-facing manual validation directory for the AI System Sync Compiler. It combines global execution policy with one canonical scenario file for each catalog feature. The compiler manages ten registered systems, six CLI commands, package integrity checks, transaction state, registry rules and report-only enforcement surfaces.

---

## 1. OVERVIEW

This playbook provides 20 deterministic scenarios across 5 categories. The five categories are CLI Commands, Mechanical Checks, Transaction Engine, Fleet Registry And Manifest and Enforcement. Every feature keeps the exact catalog slug and links to one dedicated scenario file.

Coverage note: the package covers all 20 features in the sibling feature catalog. It does not add a feature, rename a feature, merge a feature or split a feature. Write and recovery scenarios use disposable fixtures rather than live fleet packages.

### Realistic Test Model

1. A realistic operator request is given to the orchestrator.
2. The orchestrator decides whether to stay local, use an isolated fixture or run a focused test surface.
3. The operator runs the exact prompt and command sequence and captures the output.
4. The operator compares the observed signals with the scenario contract and records PASS, FAIL or SKIP.

### What Each Feature File Explains

- The natural user request or orchestrator request.
- The exact prompt used for the scenario.
- The exact command sequence and fixture boundary.
- The expected signals and evidence.
- The pass, fail and sandbox-skip rules.
- The implementation, test and feature-catalog anchors.

---

## 2. GLOBAL PRECONDITIONS

1. Run commands from the repository root.
2. Use Node 22 and Git for the command surfaces that require them.
3. Keep the checked-in registry, manifests, source files and tests unchanged during execution.
4. Capture stdout, stderr, process exit code and any fixture artifact paths.
5. Run CLI-003, MCH-002, MCH-004, TXN-001 and TXN-002 only against disposable roots supplied through `AI_SYSTEM_SYNC_REPO_ROOT`.
6. Never run `sync --write` against a live fleet package for this playbook.
7. Treat `PASS`, `FAIL` and `SKIP` as the only scenario execution statuses. Record a concrete sandbox blocker whenever SKIP is used.

---

## 3. GLOBAL EVIDENCE REQUIREMENTS

- The natural user request or orchestrator request.
- The exact prompt copied from the scenario contract.
- The exact command transcript with exit codes.
- Fixture path and isolation notes when a command can write state.
- Relevant stdout and stderr signals.
- Changed or preserved artifact paths.
- Final user-facing outcome summary.
- PASS, FAIL or SKIP with a concise rationale.

For a synthetic fixture, capture the fixture root, the files deliberately changed before execution and the files checked after execution. Do not treat a command description as evidence.

---

## 4. DETERMINISTIC COMMAND NOTATION

- Run the CLI from the repository root with the quoted tool path, for example `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --all`.
- Use `AI_SYSTEM_SYNC_REPO_ROOT="<fixture-root>"` only when the scenario names a synthetic fixture.
- Use `node --test "z — Sync Skill to Claude Project/tests/<file>.test.cjs"` for a focused automated cross-reference run.
- Use `bash "z — Sync Skill to Claude Project/scripts/precommit-check.sh"` for the delegate scenario.
- Use `->` to separate sequential commands in a table cell.
- Resolve every fixture root before execution. Do not execute an unresolved placeholder.
- Record non-zero state codes as observed results. Do not convert them into shell success claims.

---

## 5. REVIEW PROTOCOL AND RELEASE READINESS

### Inputs Required

1. This root playbook.
2. The referenced per-feature scenario files.
3. The command transcript and captured output for every executed scenario.
4. The feature-to-scenario coverage index in Section 13.
5. Triage notes for every FAIL or SKIP result.

### Scenario Acceptance Rules

For each scenario, verify:

1. Preconditions were satisfied.
2. The prompt and command sequence were executed as written.
3. Every expected signal is present or the scenario records FAIL.
4. Evidence is complete and readable.
5. The final rationale uses exactly one of PASS, FAIL or SKIP.

Scenario verdicts:

- `PASS`: every acceptance check is true.
- `FAIL`: an expected signal is missing, contradictory or unsafe.
- `SKIP`: a specific sandbox blocker prevents execution. The blocker must be recorded.

### Feature Verdict Rules

- `PASS`: every mapped scenario is PASS.
- `FAIL`: any mapped scenario is FAIL.
- `SKIP`: no mapped scenario is FAIL and a required scenario has a documented sandbox blocker.

### Release Readiness Rule

Release readiness is `PASS` only when:

1. Every feature file is linked from the root index.
2. Every mapped scenario has a recorded verdict.
3. No feature verdict is FAIL.
4. No critical scenario is SKIP.
5. No blocking triage item remains.

Release readiness is `FAIL` when any condition above is false. A SKIP result is never silently treated as PASS.

### Root And Feature Rule

Keep global verdict logic, evidence policy and release rules here. Keep feature-specific commands, expected signals, isolation notes and triage steps in the matching scenario file.

---

## 6. SUB-AGENT ORCHESTRATION AND WAVE PLANNING

This section records execution planning for a coordinator and worker agents. It is guidance for evidence collection, not a runtime capability claim.

### Operational Rules

1. Probe available runtime capacity before dispatch.
2. Reserve one coordinator for fixture ownership, transcript collection and verdict review.
3. Assign one worker to each scenario file within a wave.
4. Keep read-only scenarios in the first wave.
5. Run write, lock and recovery scenarios in a dedicated sandbox-only wave.
6. Do not run two scenarios that mutate the same fixture root at the same time.
7. After each wave, save transcripts, artifact checks and verdicts before starting the next wave.

### Suggested Waves

| Wave | Scenario IDs | Purpose |
|---|---|---|
| 1 | CLI-001, CLI-002, CLI-005, CLI-006, REG-001, ENF-001, ENF-002 | Read-only fleet, registry and enforcement evidence |
| 2 | CLI-004, MCH-001, MCH-003, MCH-005, MCH-006, MCH-007, MCH-008, REG-002 | Review and mechanical findings against isolated roots |
| 3 | CLI-003, MCH-002, MCH-004, TXN-001, TXN-002 | Dedicated write, lock and recovery fixtures |

### Coordinator Record

The coordinator records the worker assignment, fixture root, transcript path, observed signals and final status for each scenario. The coordinator does not replace execution evidence with a delegated summary.

---

## 7. CLI COMMANDS

### CLI-001 | Plan (plan)

Reports the ten registered manifests, kernel versions, mirror counts, contract input counts, validator counts and retired-name counts without changing package state.

> **Scenario:** [CLI-001](cli-commands/plan.md)  
> **Catalog:** [Plan (plan)](../feature-catalog/cli-commands/plan.md)

### CLI-002 | Check (check)

Runs the local mechanical suite for the full fleet and reports ten clean system lines without claiming live deployment currency.

> **Scenario:** [CLI-002](cli-commands/check.md)  
> **Catalog:** [Check (check)](../feature-catalog/cli-commands/check.md)

### CLI-003 | Sync (sync)

Runs a manifest-derived write against a disposable fixture, applies a generated region and proves that a second run reports zero changes.

> **Scenario:** [CLI-003](cli-commands/sync.md)  
> **Catalog:** [Sync (sync)](../feature-catalog/cli-commands/sync.md)

### CLI-004 | Review Kernel (review-kernel)

Records a reviewer, reason, decision, contract digest and kernel hash against a disposable fixture and then checks the resulting review state.

> **Scenario:** [CLI-004](cli-commands/review-kernel.md)  
> **Catalog:** [Review Kernel (review-kernel)](../feature-catalog/cli-commands/review-kernel.md)

### CLI-005 | Upload Plan (upload-plan)

Prints the Product Owner kernel path, all 30 mirror targets and the smoke receipt instruction without uploading or writing a receipt.

> **Scenario:** [CLI-005](cli-commands/upload-plan.md)  
> **Catalog:** [Upload Plan (upload-plan)](../feature-catalog/cli-commands/upload-plan.md)

### CLI-006 | Release Check (release-check)

Checks all ten upload receipt paths and reports missing live receipts separately from local mechanical state.

> **Scenario:** [CLI-006](cli-commands/release-check.md)  
> **Catalog:** [Release Check (release-check)](../feature-catalog/cli-commands/release-check.md)

---

## 8. MECHANICAL CHECKS

### MCH-001 | Coverage Mapping And Source Safety

Blocks an unmapped source under declared coverage and preserves the path in the finding.

> **Scenario:** [MCH-001](mechanical-checks/coverage-mapping-and-source-safety.md)  
> **Catalog:** [Coverage Mapping And Source Safety](../feature-catalog/mechanical-checks/coverage-mapping-and-source-safety.md)

### MCH-002 | Knowledge Inventory, Byte Parity And Derivation Exceptions

Runs a sync against a hand-applied exception mirror and verifies that the exception target is not overwritten.

> **Scenario:** [MCH-002](mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md)  
> **Catalog:** [Knowledge Inventory, Byte Parity And Derivation Exceptions](../feature-catalog/mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md)

### MCH-003 | Lock Consistency

Detects a kernel byte change through the package lock and reports the recorded path.

> **Scenario:** [MCH-003](mechanical-checks/lock-consistency.md)  
> **Catalog:** [Lock Consistency](../feature-catalog/mechanical-checks/lock-consistency.md)

### MCH-004 | Generated Region Reproduction

Detects a hand edit inside an already locked generated region while allowing the surrounding file to remain hand-authored.

> **Scenario:** [MCH-004](mechanical-checks/generated-region-reproduction.md)  
> **Catalog:** [Generated Region Reproduction](../feature-catalog/mechanical-checks/generated-region-reproduction.md)

### MCH-005 | Retired Token Scanning

Finds a retired token in a package file and reports the relative file and line number.

> **Scenario:** [MCH-005](mechanical-checks/retired-token-scanning.md)  
> **Catalog:** [Retired Token Scanning](../feature-catalog/mechanical-checks/retired-token-scanning.md)

### MCH-006 | JSON And Graph Target Validation

Reports a graph edge target that matches a retired fleet name while also exposing the text scan finding.

> **Scenario:** [MCH-006](mechanical-checks/json-and-graph-target-validation.md)  
> **Catalog:** [JSON And Graph Target Validation](../feature-catalog/mechanical-checks/json-and-graph-target-validation.md)

### MCH-007 | Kernel Review Gate

Requires a current human review record and prints the command needed to create one when the record is absent.

> **Scenario:** [MCH-007](mechanical-checks/kernel-review-gate.md)  
> **Catalog:** [Kernel Review Gate](../feature-catalog/mechanical-checks/kernel-review-gate.md)

### MCH-008 | Package Native Validators

Runs a manifest-declared validator only when requested and reports its non-zero result as a validator finding.

> **Scenario:** [MCH-008](mechanical-checks/package-native-validators.md)  
> **Catalog:** [Package Native Validators](../feature-catalog/mechanical-checks/package-native-validators.md)

---

## 9. TRANSACTION ENGINE

### TXN-001 | Staged Atomic Writes And Locking

Applies a generated-region write, creates the package lock and leaves no journal, backup or staged artifact after success.

> **Scenario:** [TXN-001](transaction-engine/staged-atomic-writes-and-locking.md)  
> **Catalog:** [Staged Atomic Writes And Locking](../feature-catalog/transaction-engine/staged-atomic-writes-and-locking.md)

### TXN-002 | Crash Recovery

Detects a synthetic interrupted journal, refuses normal checking with the recovery state, restores the original bytes and removes the journal.

> **Scenario:** [TXN-002](transaction-engine/crash-recovery.md)  
> **Catalog:** [Crash Recovery](../feature-catalog/transaction-engine/crash-recovery.md)

---

## 10. FLEET REGISTRY AND MANIFEST

### REG-001 | Closed System Registry

Confirms the real registry contains the exact ten expected IDs and rejects an unknown CLI system identifier.

> **Scenario:** [REG-001](fleet-registry-and-manifest/closed-system-registry.md)  
> **Catalog:** [Closed System Registry](../feature-catalog/fleet-registry-and-manifest/closed-system-registry.md)

### REG-002 | Manifest Schema And Derivation Exceptions

Rejects an unknown manifest field through the hand-rolled validator before a plan can report the package.

> **Scenario:** [REG-002](fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md)  
> **Catalog:** [Manifest Schema And Derivation Exceptions](../feature-catalog/fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md)

---

## 11. ENFORCEMENT

### ENF-001 | Pre Commit Delegate

Runs the opt-in delegate in report mode, emits the staged check report to stderr and exits without blocking.

> **Scenario:** [ENF-001](enforcement/pre-commit-delegate.md)  
> **Catalog:** [Pre Commit Delegate](../feature-catalog/enforcement/pre-commit-delegate.md)

### ENF-002 | Documented CI Recipe

Runs the documented full test command and all-system validator check, then records the observed 113 passing tests and ten clean systems.

> **Scenario:** [ENF-002](enforcement/documented-ci-recipe.md)  
> **Catalog:** [Documented CI Recipe](../feature-catalog/enforcement/documented-ci-recipe.md)

---

## 12. AUTOMATED TEST CROSS-REFERENCE

The following map names only real `tests/*.test.cjs` files read from the tool source. `helpers.cjs` supplies the disposable fixture builder used by several rows but is not a test file.

| Test Module | Features Covered |
|---|---|
| [`cli.test.cjs`](../tests/cli.test.cjs) | CLI-001, CLI-002, CLI-003, CLI-004, CLI-005, CLI-006, TXN-002, REG-001 |
| [`contract-digest.test.cjs`](../tests/contract-digest.test.cjs) | CLI-004, CLI-006, MCH-007 |
| [`fleet-retired-names.test.cjs`](../tests/fleet-retired-names.test.cjs) | MCH-005, MCH-006 |
| [`hashing.test.cjs`](../tests/hashing.test.cjs) | CLI-004, MCH-003, MCH-007, TXN-001 |
| [`manifest.test.cjs`](../tests/manifest.test.cjs) | CLI-001, CLI-005, MCH-001, MCH-002, REG-002 |
| [`mechanical-checks.test.cjs`](../tests/mechanical-checks.test.cjs) | CLI-002, CLI-006, MCH-001, MCH-002, MCH-003, MCH-004, MCH-005, MCH-006, MCH-007, MCH-008 |
| [`regions.test.cjs`](../tests/regions.test.cjs) | CLI-003, MCH-004, TXN-001 |
| [`registry.test.cjs`](../tests/registry.test.cjs) | REG-001 |
| [`release-check.test.cjs`](../tests/release-check.test.cjs) | CLI-006 |
| [`render.test.cjs`](../tests/render.test.cjs) | CLI-003, MCH-004 |
| [`repo-root.test.cjs`](../tests/repo-root.test.cjs) | CLI-001, CLI-002, CLI-003, CLI-004, CLI-005, CLI-006, ENF-001 |
| [`sync-write.test.cjs`](../tests/sync-write.test.cjs) | CLI-003, MCH-002, MCH-004, TXN-001, TXN-002 |
| [`transaction.test.cjs`](../tests/transaction.test.cjs) | TXN-001, TXN-002 |

---

## 13. FEATURE CATALOG CROSS-REFERENCE INDEX

| Feature ID | Feature Name | Scenario File | Feature Catalog File |
|---|---|---|---|
| CLI-001 | Plan (plan) | [cli-commands/plan.md](cli-commands/plan.md) | [cli-commands/plan.md](../feature-catalog/cli-commands/plan.md) |
| CLI-002 | Check (check) | [cli-commands/check.md](cli-commands/check.md) | [cli-commands/check.md](../feature-catalog/cli-commands/check.md) |
| CLI-003 | Sync (sync) | [cli-commands/sync.md](cli-commands/sync.md) | [cli-commands/sync.md](../feature-catalog/cli-commands/sync.md) |
| CLI-004 | Review Kernel (review-kernel) | [cli-commands/review-kernel.md](cli-commands/review-kernel.md) | [cli-commands/review-kernel.md](../feature-catalog/cli-commands/review-kernel.md) |
| CLI-005 | Upload Plan (upload-plan) | [cli-commands/upload-plan.md](cli-commands/upload-plan.md) | [cli-commands/upload-plan.md](../feature-catalog/cli-commands/upload-plan.md) |
| CLI-006 | Release Check (release-check) | [cli-commands/release-check.md](cli-commands/release-check.md) | [cli-commands/release-check.md](../feature-catalog/cli-commands/release-check.md) |
| MCH-001 | Coverage Mapping And Source Safety | [mechanical-checks/coverage-mapping-and-source-safety.md](mechanical-checks/coverage-mapping-and-source-safety.md) | [mechanical-checks/coverage-mapping-and-source-safety.md](../feature-catalog/mechanical-checks/coverage-mapping-and-source-safety.md) |
| MCH-002 | Knowledge Inventory, Byte Parity And Derivation Exceptions | [mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md](mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md) | [mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md](../feature-catalog/mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md) |
| MCH-003 | Lock Consistency | [mechanical-checks/lock-consistency.md](mechanical-checks/lock-consistency.md) | [mechanical-checks/lock-consistency.md](../feature-catalog/mechanical-checks/lock-consistency.md) |
| MCH-004 | Generated Region Reproduction | [mechanical-checks/generated-region-reproduction.md](mechanical-checks/generated-region-reproduction.md) | [mechanical-checks/generated-region-reproduction.md](../feature-catalog/mechanical-checks/generated-region-reproduction.md) |
| MCH-005 | Retired Token Scanning | [mechanical-checks/retired-token-scanning.md](mechanical-checks/retired-token-scanning.md) | [mechanical-checks/retired-token-scanning.md](../feature-catalog/mechanical-checks/retired-token-scanning.md) |
| MCH-006 | JSON And Graph Target Validation | [mechanical-checks/json-and-graph-target-validation.md](mechanical-checks/json-and-graph-target-validation.md) | [mechanical-checks/json-and-graph-target-validation.md](../feature-catalog/mechanical-checks/json-and-graph-target-validation.md) |
| MCH-007 | Kernel Review Gate | [mechanical-checks/kernel-review-gate.md](mechanical-checks/kernel-review-gate.md) | [mechanical-checks/kernel-review-gate.md](../feature-catalog/mechanical-checks/kernel-review-gate.md) |
| MCH-008 | Package Native Validators | [mechanical-checks/package-native-validators.md](mechanical-checks/package-native-validators.md) | [mechanical-checks/package-native-validators.md](../feature-catalog/mechanical-checks/package-native-validators.md) |
| TXN-001 | Staged Atomic Writes And Locking | [transaction-engine/staged-atomic-writes-and-locking.md](transaction-engine/staged-atomic-writes-and-locking.md) | [transaction-engine/staged-atomic-writes-and-locking.md](../feature-catalog/transaction-engine/staged-atomic-writes-and-locking.md) |
| TXN-002 | Crash Recovery | [transaction-engine/crash-recovery.md](transaction-engine/crash-recovery.md) | [transaction-engine/crash-recovery.md](../feature-catalog/transaction-engine/crash-recovery.md) |
| REG-001 | Closed System Registry | [fleet-registry-and-manifest/closed-system-registry.md](fleet-registry-and-manifest/closed-system-registry.md) | [fleet-registry-and-manifest/closed-system-registry.md](../feature-catalog/fleet-registry-and-manifest/closed-system-registry.md) |
| REG-002 | Manifest Schema And Derivation Exceptions | [fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md](fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md) | [fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md](../feature-catalog/fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md) |
| ENF-001 | Pre Commit Delegate | [enforcement/pre-commit-delegate.md](enforcement/pre-commit-delegate.md) | [enforcement/pre-commit-delegate.md](../feature-catalog/enforcement/pre-commit-delegate.md) |
| ENF-002 | Documented CI Recipe | [enforcement/documented-ci-recipe.md](enforcement/documented-ci-recipe.md) | [enforcement/documented-ci-recipe.md](../feature-catalog/enforcement/documented-ci-recipe.md) |
