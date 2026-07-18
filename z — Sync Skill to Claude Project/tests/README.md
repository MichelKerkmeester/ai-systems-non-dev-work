---
title: "tests/: AI System Sync Compiler test suite"
description: "Node test coverage for the lib modules, CLI behavior and manifest-driven sync-write integration paths."
trigger_phrases:
  - "AI System Sync Compiler tests"
  - "sync compiler node test suite"
---

# tests/: AI System Sync Compiler test suite

---

## 1. OVERVIEW

`tests/` owns 13 `node:test` files and `helpers.cjs`. The suite covers `lib/` behavior through focused imports and caller paths. It also covers CLI behavior and manifest-driven `sync --write` integration against isolated temporary repositories.

Current state:

- Fixture-based tests create their fixture under `os.tmpdir()` through the shared helpers.
- `registry.test.cjs` also loads the tool's real `registry.json` for registry validation.
- Focused tests cover contract digests, hashing, manifests, mechanical checks, generated regions, registry validation, rendering, repo-root resolution and transactions.
- `cli.test.cjs` exercises the real CLI entry with black-box command checks.
- `sync-write.test.cjs` exercises raw and deterministically rendered mirrors, generated regions, transaction locking, package-lock repair and idempotence through the real CLI.

---

## 2. ARCHITECTURE

```text
node:test glob
      |
      +--> focused test files -> ../lib/*.cjs
      |
      +--> cli.test.cjs and sync-write.test.cjs
      |          |
      |          v
      |      ../ai-system-sync.cjs
      |          |
      |          v
      |      AI_SYSTEM_SYNC_REPO_ROOT -> temporary fixture repo
      |
      `--> helpers.cjs -> isolated package files and JSON state
```

---

## 3. DIRECTORY TREE

```text
tests/
+-- cli.test.cjs                 # Black-box CLI commands, recovery and exit statuses
+-- contract-digest.test.cjs    # Contract and package digest determinism and missing inputs
+-- fleet-retired-names.test.cjs # Retired-name aggregation and missing-manifest handling
+-- hashing.test.cjs             # sha256Hex, sha16, hashFile, isSha16 and isSha256
+-- helpers.cjs                  # Temporary repositories and package fixture builders
+-- manifest.test.cjs            # Manifest loading, shape validation and typed errors
+-- mechanical-checks.test.cjs   # Mechanical findings, exit codes, locks, regions and validators
+-- regions.test.cjs             # Generated-region markers, replacement and reproduction
+-- registry.test.cjs            # Ten-system registry validation and lookup
+-- release-check.test.cjs       # Upload receipts and live package digest state
+-- render.test.cjs              # Inventory, checksum, smoke-pin and section rendering
+-- repo-root.test.cjs           # AI_SYSTEM_SYNC_REPO_ROOT and .git root resolution
+-- sync-write.test.cjs          # CLI sync --write, deterministic mirrors, locks and idempotence
+-- transaction.test.cjs         # Repo locks, path safety, staging, rollback and recovery
`-- README.md                    # Local orientation for tests/
```

---

## 4. KEY FILES

| File | Responsibility |
|---|---|
| `cli.test.cjs` | Spawns `ai-system-sync.cjs` and checks help, command dispatch, usage errors, fleet reports and recovery. |
| `contract-digest.test.cjs` | Checks sorted contract inputs, byte changes, path changes and typed missing-input errors. |
| `fleet-retired-names.test.cjs` | Checks lowercased retired-name aggregation and the skip path for an unloadable manifest. |
| `hashing.test.cjs` | Checks SHA-256, the 16-character prefix, file hashing and digest format predicates. |
| `helpers.cjs` | Provides shared temporary-repository and package-fixture builders for the suite. |
| `manifest.test.cjs` | Checks manifest loading, registry cross-checks, contained paths, deterministic derivation configuration, generated renderer names, duplicate targets and unknown fields. |
| `mechanical-checks.test.cjs` | Checks package findings, exit codes 0 through 5, deterministic mirror bytes, complete lock state, fresh generated regions, retired names and validators. |
| `regions.test.cjs` | Checks marker rendering, extraction, replacement, missing markers and exact reproduction. |
| `registry.test.cjs` | Checks the real ten-system registry as the sole membership list, safe path constraints, reviewed membership replacement, shape errors and `findSystem`. |
| `release-check.test.cjs` | Checks missing, stale, failed and current upload receipts without mixing local state. |
| `render.test.cjs` | Checks target labels, inventory, checksum and Task or Bug version-pin rendering. |
| `repo-root.test.cjs` | Checks the environment override and upward `.git` search. |
| `sync-write.test.cjs` | Checks real CLI mirror writes, deterministic Project Skill rendering, generated regions, package-lock repair, no-op reruns and marker refusal. |
| `transaction.test.cjs` | Checks repo locks, contained paths, staged writes, delete authorization, source changes, rollback and lock-aware crash recovery. |

---

## 5. BOUNDARIES AND FLOW

| Boundary | Rule |
|---|---|
| Library imports | Focused tests import modules through `../lib/*.cjs`. |
| CLI integration | `cli.test.cjs` and `sync-write.test.cjs` spawn `../ai-system-sync.cjs` and set `AI_SYSTEM_SYNC_REPO_ROOT` for the fixture root. |
| Fixture isolation | `helpers.cjs` creates temporary roots under `os.tmpdir()` for package behavior. `registry.test.cjs` also reads the real `registry.json`. |
| Test ownership | Tests write fixture files, assert results and clean up their temporary roots. Production modules own sync behavior. |

Main flow:

```text
test file
    |
    +--> direct lib import -> module exports -> assertions
    |
    +--> CLI spawn -> AI_SYSTEM_SYNC_REPO_ROOT -> fixture package
    |
    `--> helpers.cjs -> writeFile or writeJson -> isolated state
```

`helpers.cjs` exports these fixture builders:

| Export | Use |
|---|---|
| `mkTempRepo()` | Creates an isolated temporary repository path under `os.tmpdir()`. |
| `writeFile(repoRoot, relPath, content)` | Creates parent directories and writes a fixture file. |
| `writeJson(repoRoot, relPath, data)` | Serializes fixture data with two-space indentation and a trailing newline. |
| `buildCleanPackage(repoRoot, options)` | Builds a self-consistent package with a source skill file, knowledge mirror, kernel, manifest and optional review or lock state. |
| `registryOf(...entries)` | Returns a schema version 1 registry containing the supplied entries. |

---

## 6. ENTRYPOINTS

| Entrypoint | Type | Purpose |
|---|---|---|
| `helpers.cjs` | CommonJS module | Exports the shared fixture builders used by the test files. |
| `cli.test.cjs` | `node:test` file | Runs black-box CLI command scenarios. |
| `sync-write.test.cjs` | `node:test` file | Runs end-to-end `sync --write` scenarios through the real CLI. |

---

## 7. VALIDATION

Run from the repository root.

```bash
node --test "z — Sync Skill to Claude Project/tests/"*.test.cjs
```

Expected result:

```text
1..126
# tests 126
# suites 0
# pass 126
# fail 0
# cancelled 0
# skipped 0
# todo 0
```

---

## 8. RELATED

- [`../README.md`](../README.md)
- [`../lib/README.md`](../lib/README.md)
- [`../scripts/README.md`](../scripts/README.md)
- [`../package.schema.json`](../package.schema.json)
