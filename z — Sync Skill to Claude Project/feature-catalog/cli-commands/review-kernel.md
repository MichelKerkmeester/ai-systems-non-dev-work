---
title: "Review Kernel (review-kernel)"
description: "Records human review of the current contract inputs and kernel bytes for one registered system."
trigger_phrases:
  - "Review Kernel (review-kernel)"
  - "kernel review command"
  - "review-kernel"
version: 1.0.0.0
---

# Review Kernel (review-kernel)
<!-- sk-doc-template: skill_asset_feature-catalog -->

## 1. OVERVIEW

Records human review of the current contract inputs and kernel bytes for one registered system.

The command creates the review record consumed by the kernel review mechanical gate. It captures the reviewer supplied reason and optional decision alongside deterministic content hashes.

---

## 2. HOW IT WORKS

The command requires `--system`, `--reviewer` and `--reason`. It loads the selected manifest, computes the `ai-system-contract-v1` digest from sorted contract input paths and hashes the kernel file with SHA-256.

The command records schema version, system id, reviewer, reason, optional decision, review timestamp, contract digest, kernel hash, kernel version and aligned skill version in `kernel-review.json`. The timestamp comes from the kernel's latest Git commit when available and otherwise from the file modification time.

Missing or invalid manifests, missing contract inputs or a missing kernel produce an invalid-manifest or path result and no review record.

---

## 3. SOURCE FILES

### Implementation

| File | Layer | Role |
|---|---|---|
| [`../../ai-system-sync.cjs`](../../ai-system-sync.cjs) | Handler | Validates flags, computes the review record and writes kernel review state. |
| [`../../lib/contract-digest.cjs`](../../lib/contract-digest.cjs) | Shared | Computes the sorted contract digest and reports missing inputs. |
| [`../../lib/hashing.cjs`](../../lib/hashing.cjs) | Shared | Computes the kernel SHA-256 digest. |
| [`../../lib/git-utils.cjs`](../../lib/git-utils.cjs) | Shared | Supplies the latest kernel commit timestamp. |
| [`../../lib/paths.cjs`](../../lib/paths.cjs) | Shared | Defines the kernel review path. |

### Validation And Tests

| File | Type | Role |
|---|---|---|
| [`../../tests/cli.test.cjs`](../../tests/cli.test.cjs) | Automated test | Covers CLI flag requirements and command dispatch. |
| [`../../tests/contract-digest.test.cjs`](../../tests/contract-digest.test.cjs) | Automated test | Covers digest ordering, byte sensitivity and missing inputs. |
| [`../../tests/hashing.test.cjs`](../../tests/hashing.test.cjs) | Automated test | Covers SHA-256 and file hash behavior used for review records. |

---

## 4. SOURCE METADATA

- Group: CLI Commands
- Canonical catalog source: `feature-catalog.md`
- Feature file path: `cli-commands/review-kernel.md`

Related references:
- [kernel-review-gate.md](../mechanical-checks/kernel-review-gate.md): Consumes the recorded review state.
- [manifest-schema-and-derivation-exceptions.md](../fleet-registry-and-manifest/manifest-schema-and-derivation-exceptions.md): Supplies the contract input declaration.
