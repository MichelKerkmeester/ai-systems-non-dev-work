---
title: "Kernel Review Gate"
description: "Requires a current human review record for the contract inputs and kernel bytes."
trigger_phrases:
  - "Kernel Review Gate"
  - "kernel review required"
  - "kernel-review.json check"
version: 1.0.0.0
---

# Kernel Review Gate
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Requires a current human review record for the contract inputs and kernel bytes.

The gate separates human approval of the semantic kernel from automated mirror and inventory parity.

---

## 2. HOW IT WORKS

The check recomputes the contract digest from the manifest's contract inputs and requires `claude project/kernel-review.json`. It parses the review record as strict JSON and compares its contract digest with the current digest.

It then hashes the live kernel and compares it with the recorded kernel hash. Missing review state, changed contract inputs or changed kernel bytes produce `KERNEL_REVIEW_REQUIRED` with exit code 3. The finding includes the command needed to record a new review.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../lib/mechanical-checks.cjs`](../../lib/mechanical-checks.cjs) | Shared | Computes current review inputs and enforces review record and kernel hash parity. |
| [`../../lib/contract-digest.cjs`](../../lib/contract-digest.cjs) | Shared | Computes the contract digest used by the gate. |
| [`../../lib/hashing.cjs`](../../lib/hashing.cjs) | Shared | Hashes the live kernel file. |
| [`../../lib/paths.cjs`](../../lib/paths.cjs) | Shared | Defines the kernel review path. |
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Provides the `review-kernel` command that creates the record. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/mechanical-checks.test.cjs`](../../tests/mechanical-checks.test.cjs) | Automated test | Covers missing and stale kernel review findings. |
| [`../../tests/contract-digest.test.cjs`](../../tests/contract-digest.test.cjs) | Automated test | Covers current contract digest inputs and change sensitivity. |
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Covers the review command path and exit reporting. |

---

## 4. SOURCE METADATA

- Group: Mechanical Checks
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `mechanical-checks/kernel-review-gate.md`

Related references:
- [review-kernel.md](../cli-commands/review-kernel.md): Records the human review consumed by this gate.
- [lock-consistency.md](lock-consistency.md): Checks byte state independently from human review state.
