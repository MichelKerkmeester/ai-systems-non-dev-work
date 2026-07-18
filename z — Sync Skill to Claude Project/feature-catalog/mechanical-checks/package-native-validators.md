---
title: "Package Native Validators"
description: "Runs validators declared by a valid manifest when the caller opts into validator execution."
trigger_phrases:
  - "Package Native Validators"
  - "manifest declared validators"
  - "run-validators"
version: 1.0.0.0
---

# Package Native Validators
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Runs validators declared by a valid manifest when the caller opts into validator execution.

Validators stay package-owned. The compiler supplies the declared working directory and argument vector, then reports a validator failure without rewriting the package.

---

## 2. HOW IT WORKS

The check calls `runValidators` only when `check` receives `--run-validators`. Each manifest validator supplies a name, command array and working directory. The command array is passed to `spawnSync` without a shell command string.

A spawn error or non-zero status produces `VALIDATOR_FAILED` with exit code 4. The finding includes the validator name, command and the final output lines when available. An empty validator list adds no finding.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Executes declared validator commands and emits validator findings. |
| [`../../lib/manifest.cjs`](../../lib/manifest.cjs) | Shared | Validates validator names, commands and working directories. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Exposes `--run-validators` on the `check` command. |
| [`../../lib/exit-codes.cjs`](../../lib/exit-codes.cjs) | Shared | Defines the validator failure exit state. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers successful and failing package validator execution. |
| [`../../tests/manifest.test.cjs`](../../tests/manifest.test.cjs) | Automated test | Covers validator field shape validation. |
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Covers the `--run-validators` CLI option. |

---

## 4. SOURCE METADATA

- Group: Mechanical Checks
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `mechanical-checks/package-native-validators.md`

Related references:
- [check.md](../cli-commands/check.md): Supplies the caller-facing validator flag.
- [manifest-schema-and-derivation-exceptions.md](../fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md): Defines the validator field contract.
