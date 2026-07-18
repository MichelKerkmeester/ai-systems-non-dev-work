---
title: "AI System Sync Compiler: Feature Catalog"
description: "Unified reference combining the complete feature inventory and current-reality reference for the AI System Sync Compiler system."
trigger_phrases:
  - "AI System Sync Compiler"
  - "sync compiler features"
  - "feature catalog"
last_updated: "2026-07-18"
version: 1.0.0.0
---

# AI System Sync Compiler: Feature Catalog

This catalog inventories the live CLI commands, mechanical checks, transaction behavior, registry and manifest rules and enforcement surfaces of the AI System Sync Compiler.

---

## 1. OVERVIEW

Use this catalog as the canonical inventory for the AI System Sync Compiler. The command entries describe the operator surface. The mechanical check entries describe the package integrity gates. The transaction, registry, manifest and enforcement entries describe the supporting behavior that keeps the ten registered systems aligned.

---

## 2. CLI COMMANDS

### Plan (plan)

#### Description

Reports manifest declarations for one registered system or the full fleet without changing package state.

#### Current Reality

The command resolves a system or all registered systems, reports package, kernel, mirror, contract input, validator and retired-name declarations and distinguishes missing manifests from invalid manifests. It returns clean when it can report the requested state.

#### Source Files

See [`cli-commands/plan.md`](cli-commands/plan.md) for implementation and test file listings.

---

### Check (check)

#### Description

Runs the mechanical package checks for one system, the fleet or affected staged packages.

#### Current Reality

The command supports `--system`, `--all`, `--staged` and `--run-validators`. It prints findings and aggregates exit codes with the fixed worst-first precedence. It never reports live deployment currency.

#### Source Files

See [`cli-commands/check.md`](cli-commands/check.md) for implementation and test file listings.

---

### Sync (sync)

#### Description

Plans and applies manifest-derived mirror and generated-region writes through the transaction engine.

#### Current Reality

The command requires a registered `--system`. Report-only invocation explains whether a valid manifest exists, while `--write` renders changed mirrors, generated regions and package-lock state through staged atomic operations. `--recover` acquires the repository lock and rolls back a validated interrupted transaction.

#### Source Files

See [`cli-commands/sync.md`](cli-commands/sync.md) for implementation and test file listings.

---

### Review Kernel (review-kernel)

#### Description

Records human review of the current contract inputs and kernel bytes for one registered system.

#### Current Reality

The command requires a system, reviewer and reason. It computes the sorted contract digest, hashes the kernel, records the optional decision and uses the latest kernel commit time or file modification time for the review timestamp.

#### Source Files

See [`cli-commands/review-kernel.md`](cli-commands/review-kernel.md) for implementation and test file listings.

---

### Upload Plan (upload-plan)

#### Description

Prints the manual deployment steps for the kernel, Project Knowledge mirrors, smoke matrix and upload receipt.

#### Current Reality

The command reads each selected manifest, lists the kernel path and sorted mirror targets and explains the remaining manual steps. It is informational and returns clean when it can print a plan or explain why a manifest is unavailable.

#### Source Files

See [`cli-commands/upload-plan.md`](cli-commands/upload-plan.md) for implementation and test file listings.

---

### Release Check (release-check)

#### Description

Checks whether each registered system has a current successful live deployment receipt.

#### Current Reality

The command requires `--all` and reads `upload-receipt.json` through the release check path. It compares the recorded package digest and smoke result with the current package and does not mix live state with local mechanical or kernel review state.

#### Source Files

See [`cli-commands/release-check.md`](cli-commands/release-check.md) for implementation and test file listings.

---

## 3. MECHANICAL CHECKS

### Coverage Mapping And Source Safety

#### Description

Verifies contained manifest paths, declared source coverage, mirror mapping, source existence, symlink containment and case-insensitive target uniqueness.

#### Current Reality

The manifest and registry validators reject absolute, traversing and non-normalized paths before checks run. The check expands included files and directories, removes excluded paths and blocks files that are covered but missing from the manifest mirror list. It checks every mirror source, rejects broken or repository-escaping symlinks and rejects mirror targets that collide by case. Transaction writes are independently resolved inside the selected package root.

#### Source Files

See [`mechanical-checks/coverage-mapping-and-source-safety.md`](mechanical-checks/coverage-mapping-and-source-safety.md) for implementation and test file listings.

---

### Knowledge Inventory, Byte Parity And Derivation Exceptions

#### Description

Checks the fixed knowledge inventory, declared mirror count and parity with raw or deterministically rendered source bytes.

#### Current Reality

The check reports undeclared, missing and count-mismatched knowledge files. It compares each ordinary mirror with its dereferenced source. A target in `derivationExceptions` must select the registered `project-skill-mirror-v1` renderer and valid Project frontmatter, and parity is checked against those rendered bytes. Unknown knowledge files are reported and never deleted automatically.

#### Source Files

See [`mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md`](mechanical-checks/knowledge-inventory-byte-parity-and-derivation-exceptions.md) for implementation and test file listings.

---

### Lock Consistency

#### Description

Requires complete package-lock state and verifies its file, region and deletable inventories against live package bytes.

#### Current Reality

A missing `package-lock.json` is mechanical drift. A present lock must carry schema version 1, the selected system ID, an ISO timestamp and exact file, generated-region and deletable inventories. The check validates each SHA value and byte count, then compares recorded hashes with current files and region bodies. Missing package files remain visible through the inventory checks.

#### Source Files

See [`mechanical-checks/lock-consistency.md`](mechanical-checks/lock-consistency.md) for implementation and test file listings.

---

### Generated Region Reproduction

#### Description

Verifies generated-region markers and detects body drift against fresh renderer output from the live manifest.

#### Current Reality

The check requires every declared target and section marker to exist. It renders each section from current manifest data and live package bytes, then compares the result directly with the extracted body. Drift is reported even when no prior region lock record exists; the lock check separately validates the recorded region inventory and hashes.

#### Source Files

See [`mechanical-checks/generated-region-reproduction.md`](mechanical-checks/generated-region-reproduction.md) for implementation and test file listings.

---

### Retired Token Scanning

#### Description

Scans package files for retired names while honoring declared history exclusions and tool-owned state files.

#### Current Reality

The check reads `retiredNames`, skips paths under `scanExcludes` and skips the manifest plus generated state files owned by the tool. Any remaining token hit produces mechanical drift and includes the file and line.

#### Source Files

See [`mechanical-checks/retired-token-scanning.md`](mechanical-checks/retired-token-scanning.md) for implementation and test file listings.

---

### JSON And Graph Target Validation

#### Description

Validates required skill metadata JSON files and checks graph edges against retired names collected across the fleet.

#### Current Reality

The check requires `description.json` and `graph-metadata.json` under each registered skill root and parses both files strictly. It also flags graph edge targets that match any retired name contributed by a loadable system manifest.

#### Source Files

See [`mechanical-checks/json-and-graph-target-validation.md`](mechanical-checks/json-and-graph-target-validation.md) for implementation and test file listings.

---

### Kernel Review Gate

#### Description

Requires a current human review record for the contract inputs and kernel bytes.

#### Current Reality

The gate computes the current contract digest, requires a readable kernel review record and compares both the recorded contract digest and kernel SHA-256 with the live values. Missing or stale review state produces exit code 3.

#### Source Files

See [`mechanical-checks/kernel-review-gate.md`](mechanical-checks/kernel-review-gate.md) for implementation and test file listings.

---

### Package Native Validators

#### Description

Runs validators declared by a valid manifest when the caller opts into validator execution.

#### Current Reality

The check runs each manifest command array from its declared working directory only when `--run-validators` is present. A spawn error or non-zero status creates a validator finding with exit code 4.

#### Source Files

See [`mechanical-checks/package-native-validators.md`](mechanical-checks/package-native-validators.md) for implementation and test file listings.

---

## 4. TRANSACTION ENGINE

### Staged Atomic Writes And Locking

#### Description

Applies sync writes through staged sibling files, a repository-wide lock, journaled operations and atomic renames.

#### Current Reality

The transaction engine acquires the fleet lock before inspecting journal state, validates every source and target path, stages all ordinary write bytes before touching live targets, validates staged content and rehashes sources. It journals every operation and stages, journals and writes the package lock as the final operation, then removes backups and the journal after success.

#### Source Files

See [`transaction-engine/staged-atomic-writes-and-locking.md`](transaction-engine/staged-atomic-writes-and-locking.md) for implementation and test file listings.

---

### Crash Recovery

#### Description

Restores a package to its pre-transaction state after an interrupted sync.

#### Current Reality

The CLI distinguishes an active transaction from a recoverable interrupted journal. Recovery first acquires the repository lock, validates every journal path and operation, reverses valid operations, removes staged and backup files and deletes the journal. A corrupt or unsafe journal is preserved for manual inspection, and recovery never forward-completes an unknown crash point.

#### Source Files

See [`transaction-engine/crash-recovery.md`](transaction-engine/crash-recovery.md) for implementation and test file listings.

---

## 5. FLEET REGISTRY AND MANIFEST

### Closed System Registry

#### Description

Loads and validates the exact ten-system fleet registry used by every command.

#### Current Reality

The registry is the sole fleet membership authority. It requires schema version 1, exactly ten entries, unique lowercase identifiers and roots, normalized basename roots, required path fields and fixed kernel and manifest paths. Commands never discover managed directories dynamically; a reviewed membership replacement is valid when the registry still satisfies these constraints.

#### Source Files

See [`fleet-registry-and-manifest/closed-system-registry.md`](fleet-registry-and-manifest/closed-system-registry.md) for implementation and test file listings.

---

### Manifest Schema And Derivation Exceptions

#### Description

Validates each system manifest and defines deterministic rendering for non-identical Project Skill mirrors.

#### Current Reality

The hand-rolled validator enforces identity, fixed and contained paths, coverage, mirrors, contract inputs, validators, retired-name settings, counts and registered generated-region names against the documented schema. A `derivationExceptions` entry requires a declared mirror path, reason, `project-skill-mirror-v1` renderer and complete Project frontmatter. Sync and parity both render and compare those deterministic bytes; no waiver skips compiler ownership.

#### Source Files

See [`fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md`](fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md) for implementation and test file listings.

---

## 6. ENFORCEMENT

### Pre Commit Delegate

#### Description

Provides an opt-in pre-commit delegate that reports staged sync findings without blocking commits in the current mode.

#### Current Reality

The script exits quietly unless `SPECKIT_AI_SYSTEM_SYNC_HOOK=on`, resolves the Git root and CLI path, runs `check --staged` and prints output to standard error. `ENFORCEMENT_MODE='report'` keeps the delegate fail-open and returns zero.

#### Source Files

See [`enforcement/pre-commit-delegate.md`](enforcement/pre-commit-delegate.md) for implementation and test file listings.

---

### Documented CI Recipe

#### Description

Documents a report-only CI recipe for the test suite and all-system validator check.

#### Current Reality

The repository has no CI workflow directory. The compiler README records the two dependency-free commands to run when CI infrastructure exists and instructs operators to report non-zero results instead of failing the build while enforcement remains report-only.

#### Source Files

See [`enforcement/documented-ci-recipe.md`](enforcement/documented-ci-recipe.md) for implementation and test file listings.
