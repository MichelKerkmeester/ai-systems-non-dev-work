---
title: "Release Check (release-check)"
description: "Checks whether each registered system has a current successful live deployment receipt."
trigger_phrases:
  - "Release Check (release-check)"
  - "live deployment receipt check"
  - "release-check"
version: 1.0.0.0
---

# Release Check (release-check)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Checks whether each registered system has a current successful live deployment receipt.

This command is deliberately separate from local mechanical checks and kernel review. It evaluates the manual upload record against the current package bytes.

---

## 2. HOW IT WORKS

The command requires `--all` and sorts every registry entry by system id. For each system it loads the manifest, requires `claude project/upload-receipt.json` and parses the receipt as strict JSON.

It computes the current package digest from the kernel and declared knowledge mirror targets. A digest mismatch or a smoke result other than `pass` produces a stale live-receipt finding with exit code 6. Missing or malformed manifest and receipt data use the invalid-manifest or path states.

The command does not inspect local mechanical drift or kernel review state. A clean result means only that the recorded live receipt matches the current package and smoke result.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Requires `--all`, dispatches release checks and prints results. |
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Reads receipts, computes package digests and creates live-state findings. |
| [`../../lib/contract-digest.cjs`](../../lib/contract-digest.cjs) | Shared | Supplies the package digest over kernel and mirror bytes. |
| [`../../lib/paths.cjs`](../../lib/paths.cjs) | Shared | Defines the upload receipt path. |
| [`../../lib/exit-codes.cjs`](../../lib/exit-codes.cjs) | Shared | Defines the stale live-receipt exit state. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/release-check.test.cjs`](../../tests/release-check.test.cjs) | Automated test | Covers missing, stale, failed and current upload receipts. |
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Covers command requirements and black-box CLI status reporting. |

---

## 4. SOURCE METADATA

- Group: CLI Commands
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `cli-commands/release-check.md`

Related references:
- [check.md](check.md): Reports local mechanical state without live receipt evaluation.
- [upload-plan.md](upload-plan.md): Prints the manual steps that precede a receipt.
