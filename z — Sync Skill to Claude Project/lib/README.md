---
title: "lib/: AI System Sync Compiler domain logic"
description: "Dependency-free domain modules for manifest validation, mechanical checks, rendering and transactional sync operations."
trigger_phrases:
  - "AI System Sync Compiler lib"
  - "sync compiler domain logic"
---

# lib/: AI System Sync Compiler domain logic

---

## 1. OVERVIEW

`lib/` owns the dependency-free CommonJS modules used by `../ai-system-sync.cjs`. It validates `claude-project.sync.json` and `registry.json`, computes contract and package digests, hashes files, renders generated regions, checks package state and runs the transaction engine behind `sync --write`.

Current state:

- 13 modules expose their own `module.exports` values.
- The CLI loads the modules through its `req` helper.
- The modules read package files and Git state, then return reports or support generated writes.
- The hook delegate and test inventory are documented in [`scripts/README.md`](../scripts/README.md) and [`tests/README.md`](../tests/README.md).

---

## 2. ARCHITECTURE

```text
ai-system-sync.cjs
        |
        v
+------------------------------+
| lib/                         |
| repo-root, registry, manifest|
| checks, digests, renderers   |
| transaction and support      |
+--------------+---------------+
               |
               v
+------------------------------+
| package files, Git state     |
| generated regions and locks  |
+------------------------------+
```

Dependency direction:

```text
ai-system-sync.cjs -> lib/* -> package files or Git state
```

---

## 3. PACKAGE TOPOLOGY

`lib/` has no subdirectories. Its modules group around package boundaries, integrity checks, generated output, transaction writes and shared support.

```text
lib/
+-- repo-root.cjs, registry.cjs, manifest.cjs, paths.cjs
+-- contract-digest.cjs, hashing.cjs, mechanical-checks.cjs
+-- regions.cjs, render.cjs
+-- transaction.cjs
`-- exit-codes.cjs, git-utils.cjs, util.cjs
```

Allowed dependency direction:

```text
ai-system-sync.cjs -> lib/*
registry.cjs -> util.cjs
manifest.cjs -> util.cjs
mechanical-checks.cjs -> contract-digest.cjs, exit-codes.cjs, hashing.cjs, manifest.cjs, paths.cjs, regions.cjs, util.cjs
render.cjs -> hashing.cjs
transaction.cjs -> hashing.cjs, paths.cjs, util.cjs
```

`manifest.cjs` validates the manifest shape in code. [`package.schema.json`](../package.schema.json) is the schema reference and is not required by the module.

Disallowed dependency direction:

```text
lib/*.cjs -> ai-system-sync.cjs
```

---

## 4. DIRECTORY TREE

```text
lib/
+-- contract-digest.cjs   # Contract and package digest functions
+-- exit-codes.cjs        # Fixed exit codes and worst-code aggregation
+-- git-utils.cjs         # Thin wrapper around the git binary
+-- hashing.cjs           # Shared sha256, sha16 and file hashing
+-- manifest.cjs          # Manifest loading and strict shape validation
+-- mechanical-checks.cjs # Byte-based check and release-check findings
+-- paths.cjs             # Package-relative generated and state paths
+-- regions.cjs           # Generated-region markers and replacements
+-- registry.cjs          # Closed registry loading and validation
+-- render.cjs            # Generated-region body renderers
+-- repo-root.cjs         # Repo root resolution and override validation
+-- transaction.cjs       # sync --write locking, journaling and rollback
+-- util.cjs              # Deterministic filesystem, JSON and ordering helpers
`-- README.md             # Local orientation for lib/
```

---

## 5. KEY FILES

| File | Responsibility |
|---|---|
| `contract-digest.cjs` | Computes the `ai-system-contract-v1` digest and the package digest from sorted logical paths and dereferenced bytes. |
| `exit-codes.cjs` | Defines fixed codes 0 through 6 plus `USAGE` 64 and aggregates fleet results with `worstExitCode`. |
| `git-utils.cjs` | Runs `git`, reads staged names and staged file content and gets last commit timestamps. |
| `hashing.cjs` | Provides `sha256Hex`, `sha16`, `hashFile`, `isSha16` and `isSha256` under one prefix convention. |
| `manifest.cjs` | Loads and strictly validates `claude-project.sync.json` against the manifest shape. |
| `mechanical-checks.cjs` | Runs byte-based package and release checks, short-circuits interrupted journals and invalid or missing manifests and aggregates findings. |
| `paths.cjs` | Centralizes package-relative paths for the journal, lock, kernel review, upload receipt and repo lock. |
| `regions.cjs` | Creates, finds, extracts, replaces and lists generated regions and tests exact reproduction. |
| `registry.cjs` | Loads and validates the exact registry system ids and finds systems by id. |
| `render.cjs` | Renders `INVENTORY`, `CHECKSUMS` and `SMOKE_VERSION_PINS` sections from manifest data and live bytes. |
| `repo-root.cjs` | Resolves the repo root from `AI_SYSTEM_SYNC_REPO_ROOT` or the nearest `.git` directory. |
| `transaction.cjs` | Stages writes, acquires the repo lock, journals operations, applies atomic swaps and rolls back or recovers. |
| `util.cjs` | Provides deterministic sorting, JSON parsing, file walking, duplicate detection and case-insensitive collision checks. |

---

## 6. BOUNDARIES AND FLOW

| Boundary | Rule |
|---|---|
| Imports | `ai-system-sync.cjs` loads the library modules through `req`. Internal imports follow [Package Topology](#3-package-topology). |
| Exports | Each library module defines its own `module.exports`. Library modules do not import the CLI. |
| Package state | `mechanical-checks.cjs` reads package files and generated state. `transaction.cjs` writes sync state through the CLI path. |
| Ownership | `lib/` owns validation, hashing, rendering, checks, Git helpers and transaction state. |

Main flow:

```text
CLI command dispatch
        |
        v
resolveRepoRoot and loadRegistry
        |
        +--> plan and upload-plan -> manifest.cjs
        +--> check and check --staged -> mechanical-checks.cjs
        +--> sync --write -> manifest.cjs -> render.cjs -> transaction.cjs
        +--> review-kernel -> contract-digest.cjs and git-utils.cjs
        +--> release-check -> mechanical-checks.cjs and package digest
        |
        v
reports, package files, lock and journal
```

---

## 7. ENTRYPOINTS

| Module | Exported names |
|---|---|
| `contract-digest.cjs` | `computeContractDigest`, `computePackageDigest`, `ContractInputMissingError`, `DOMAIN_PREFIX` and `PACKAGE_DOMAIN_PREFIX` |
| `exit-codes.cjs` | `EXIT`, `EXIT_MEANING`, `AGGREGATION_PRIORITY` and `worstExitCode` |
| `git-utils.cjs` | `isGitRepo`, `stagedFiles`, `readStagedFile`, `lastCommitTimestamp` and `run` |
| `hashing.cjs` | `PREFIX_LENGTH`, `sha256Hex`, `sha16`, `hashFile`, `isSha16` and `isSha256` |
| `manifest.cjs` | `MANIFEST_FILENAME_DEFAULT`, `FIXED_KNOWLEDGE_ROOT`, `FIXED_KERNEL_PATH`, `validateManifestShape`, `loadManifest`, `ManifestMissingError` and `ManifestValidationError` |
| `mechanical-checks.cjs` | `CODE`, `JOURNAL_REL_PATH`, `LOCK_REL_PATH`, `KERNEL_REVIEW_REL_PATH`, `UPLOAD_RECEIPT_REL_PATH`, `checkSystem`, `releaseCheckSystem`, `loadFleetRetiredNames`, `buildCoverageSet`, `expandCoverageEntry` and `isDerivationException` |
| `paths.cjs` | `JOURNAL_REL_PATH`, `LOCK_REL_PATH`, `KERNEL_REVIEW_REL_PATH`, `UPLOAD_RECEIPT_REL_PATH` and `REPO_LOCK_FILENAME` |
| `regions.cjs` | `beginMarker`, `endMarker`, `renderRegion`, `extractRegion`, `replaceRegion`, `regionReproducesExactly`, `listSections` and `RegionNotFoundError` |
| `registry.cjs` | `REGISTRY_FILENAME`, `EXPECTED_SYSTEM_IDS`, `REQUIRED_ENTRY_FIELDS`, `validateRegistryShape`, `loadRegistry`, `findSystem` and `RegistryValidationError` |
| `render.cjs` | `shortLabel`, `commonTargetPrefix`, `mirrorBySource`, `renderInventorySection`, `renderChecksumsSection`, `renderSmokeVersionPinsSection`, `renderSection`, `MirrorNotDeclaredError` and `UnknownSectionError` |
| `repo-root.cjs` | `ENV_OVERRIDE`, `resolveRepoRoot` and `RepoRootError` |
| `transaction.cjs` | `acquireRepoLock`, `detectInterruptedJournal`, `recoverInterruptedJournal`, `runSyncTransaction`, `journalPath`, `TransactionError`, `InterruptedTransactionError`, `RepoLockHeldError`, `SourceChangedError` and `DeleteNotAllowedError` |
| `util.cjs` | `sortStable`, `readJsonStrict`, `findCaseInsensitiveCollisions`, `findDuplicates`, `walkFilesRecursive`, `IGNORED_BASENAMES`, `JsonReadError` and `JsonParseError` |

---

## 8. VALIDATION

Run from the repository root.

```bash
node --test "z — Sync Skill to Claude Project/tests/"*.test.cjs
```

Expected result:

```text
1..113
# tests 113
# suites 0
# pass 113
# fail 0
# cancelled 0
# skipped 0
# todo 0
```

---

## 9. RELATED

- [`../README.md`](../README.md)
- [`../scripts/README.md`](../scripts/README.md)
- [`../tests/README.md`](../tests/README.md)
- [`../package.schema.json`](../package.schema.json)
- [`../registry.json`](../registry.json)
