---
title: "AI System Sync Compiler"
description: "Dependency-free Node CLI that mechanically checks and (once written) syncs the ten Barter claude.ai Project packages against their authoritative sk-* skills."
---

# AI System Sync Compiler

> A dependency-free Node CLI that compiles and validates the mechanical parts of ten Barter claude.ai Project packages.

---

## 1. OVERVIEW

The AI System Sync Compiler manages the deterministic part of the packaging workflow for ten Barter AI systems. Each system has an authoritative `sk-*` skill folder and a derived `claude project/` package. The compiler checks mirrors, checksums, inventory, generated documentation regions and package state, then writes derived files only through its transaction engine.

The compiler never touches the two hand-authored semantic surfaces: everything under `sk-*` and `claude project/Custom Instructions.md`. It lives at the root of the Barter repo beside the ten system folders it manages, not inside the shared `.opencode/` tree.

### How It Works

Each Barter system keeps its real behavior in one place, the `sk-*` skill folder. The `claude project/` package next to it is a derived copy meant for uploading to claude.ai, built from that skill by a declared manifest.

1. A `claude-project.sync.json` manifest declares which skill files become which knowledge mirrors, which files feed the kernel's contract digest and which files hold generated documentation regions.
2. `check` reads that manifest against the live files and reports whether the derived package still matches its source. It never changes anything.
3. `sync --write` derives the mirrors and regions fresh from the skill, applies every change as one all-or-nothing transaction and locks the result in `package-lock.json`.
4. A kernel change needs a human `review-kernel` decision before `check` reports it current again. A live upload needs a recorded receipt before `release-check` reports it current. No single command can claim both at once.

The compiler's guarantee stays mechanical. It confirms the derived package is byte-correct and reviewed. A human still writes the kernel and uploads it to claude.ai.

### Key Statistics

| Metric | Value |
| --- | --- |
| Registered systems | 10 |
| Commands | 6 |
| Exit codes | 0-6 plus usage 64 |
| Test count | 113 |
| Enforcement status | report-only |

### Three Separate Green States

A single `aligned: true` field would hide the failure classes this tool exists to catch. The compiler keeps three states separate:

| State | What makes it green |
| --- | --- |
| Local mechanical parity | `check` passes: mirrors, checksums, inventory, generated regions, references and (with `--run-validators`) package-native validators all agree |
| Kernel review current | A human reviewed the current contract digest against the current kernel and recorded that with `review-kernel` |
| Live deployment current | The package was manually uploaded to claude.ai, its smoke matrix passed and that was recorded as a receipt |

`check` never reports live currency. Only `release-check` reads upload receipts. A clean `check --all` says nothing at all about what is live on claude.ai today.

---

## 2. QUICK START

Run these commands from the Barter repo root. The tool folder starts with a space and contains an em dash, so quote the path.

```bash
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" plan --all
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --all
```

Expected output from `plan --all`:

```text
== barter-blog-posts (Barter - Blog Posts) ==
  manifest: claude-project.sync.json
  kernel: v1.3.0 aligned to skill v1.3.0
  mirrors declared: 16 (expectedKnowledgeCount 16)
  contractInputs: 4
  validators declared: 0
  retiredNames declared: 2
== barter-copywriter (Barter - Copywriter) ==
  manifest: claude-project.sync.json
  kernel: v1.2.1 aligned to skill v1.2.0
  mirrors declared: 15 (expectedKnowledgeCount 15)
  contractInputs: 5
  validators declared: 2
  retiredNames declared: 3
== barter-deal-templates (Barter - Deal Templates) ==
  manifest: claude-project.sync.json
  kernel: v1.1.2 aligned to skill v1.2.0
  mirrors declared: 20 (expectedKnowledgeCount 20)
  contractInputs: 2
  validators declared: 2
  retiredNames declared: 7
== linkedin-nigel-de-lange (LinkedIn - Nigel de Lange) ==
  manifest: claude-project.sync.json
  kernel: v1.0.6 aligned to skill v1.2.0
  mirrors declared: 22 (expectedKnowledgeCount 22)
  contractInputs: 3
  validators declared: 0
  retiredNames declared: 10
== linkedin-pieter-bertram (LinkedIn - Pieter Bertram) ==
  manifest: claude-project.sync.json
  kernel: v1.0.5 aligned to skill v1.2.0
  mirrors declared: 22 (expectedKnowledgeCount 22)
  contractInputs: 3
  validators declared: 0
  retiredNames declared: 5
== media-editor (Media Editor) ==
  manifest: claude-project.sync.json
  kernel: v1.0.1 aligned to skill v1.1.0
  mirrors declared: 7 (expectedKnowledgeCount 7)
  contractInputs: 3
  validators declared: 0
  retiredNames declared: 1
== product-owner (Product Owner) ==
  manifest: claude-project.sync.json
  kernel: v1.3.0 aligned to skill v1.4.0
  mirrors declared: 30 (expectedKnowledgeCount 30)
  contractInputs: 2
  validators declared: 0
  retiredNames declared: 5
== prompt-improver (Prompt Improver) ==
  manifest: claude-project.sync.json
  kernel: v1.2.1 aligned to skill v1.2.1
  mirrors declared: 14 (expectedKnowledgeCount 14)
  contractInputs: 7
  validators declared: 0
  retiredNames declared: 11
== sales-communication (Sales - Direct Communication) ==
  manifest: claude-project.sync.json
  kernel: v1.2.1 aligned to skill v1.2.1
  mirrors declared: 48 (expectedKnowledgeCount 48)
  contractInputs: 6
  validators declared: 0
  retiredNames declared: 45
== sales-hubspot-automation (Sales - HubSpot & Automation) ==
  manifest: claude-project.sync.json
  kernel: v1.0.0 aligned to skill v1.1.0
  mirrors declared: 27 (expectedKnowledgeCount 27)
  contractInputs: 4
  validators declared: 0
  retiredNames declared: 4
```

Expected output from `check --all`:

```text
== barter-blog-posts: clean ==
== barter-copywriter: clean ==
== barter-deal-templates: clean ==
== linkedin-nigel-de-lange: clean ==
== linkedin-pieter-bertram: clean ==
== media-editor: clean ==
== product-owner: clean ==
== prompt-improver: clean ==
== sales-communication: clean ==
== sales-hubspot-automation: clean ==
```

---

## 3. FEATURES

### Command Summary

| Command | What it does |
| --- | --- |
| `plan` | Reports each manifest's mirror count, contract input count and kernel versions without gating on package state. |
| `check` | Runs the mechanical suite for one system, the whole fleet or staged changes. Add `--run-validators` to run each manifest's package-native validators. It never writes. |
| `sync` | The only writing command. It requires `--write` for a normal sync. `--recover` rolls back a leftover interrupted transaction. |
| `review-kernel` | Computes the current contract digest, hashes the kernel and records the reviewer, reason, decision and review timestamp in `kernel-review.json`. |
| `upload-plan` | Prints the manual deployment steps for one system or the whole fleet. It does not gate deployment. |
| `release-check` | Reads only `upload-receipt.json` and compares the recorded package digest and smoke result with the current package. |

The complete command forms are:

```bash
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" plan [--system <id> | --all]
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check [--system <id> | --all | --staged] [--run-validators]
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system <id> [--write] [--recover]
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" review-kernel --system <id> --reviewer <name> --reason <text> [--decision <updated|no-change>]
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" upload-plan [--system <id> | --all]
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" release-check --all
```

### Mechanical Check Suite

The suite short-circuits when an interrupted journal is present or when the manifest is missing or invalid. It then checks the declared source coverage, mirror sources, symlink safety, case-insensitive target collisions, knowledge inventory, byte parity, package-lock hashes, generated-region markers and bodies, retired tokens, graph targets, JSON files and kernel review. `--run-validators` adds the package-native validator commands declared by each manifest.

An undeclared knowledge file is reported and is never deleted automatically. A declared `derivationExceptions` mirror is excluded from byte-copy writes and parity failures. This keeps approved hand-applied content intact.

### Transaction Engine

`sync --write` stages each new file beside its target, validates staged content, re-hashes sources before applying, holds one repository-wide lock and journals every replacement or deletion. It applies each operation through an atomic rename, writes `package-lock.json` last and removes backups only after the transaction succeeds.

If any step fails, the engine rolls back every operation it touched. A leftover journal makes the next sync stop with exit 5. Run `sync --system <id> --recover` to roll back that transaction and restore the state from before it began.

### Exit Codes

| Code | Meaning |
| --- | --- |
| 0 | Requested state is clean |
| 1 | Mechanical drift |
| 2 | Invalid manifest, path, inventory or symlink |
| 3 | Kernel review required |
| 4 | Package validator failed |
| 5 | Interrupted transaction or recovery required |
| 6 | Live deployment receipt stale or absent |
| 64 | CLI usage error (unknown command, missing required flag) |

Codes 0 through 6 are a fixed state table. Hooks and CI key off these numbers directly, so their meanings never shift once shipped. Code 64 is outside that table: a bad invocation is not a fleet state and must not be mistaken for one of the seven by a script that checks only a numeric range.

When `--all` or `--staged` covers more than one system, the process exit code is the worst code across every system checked. The precedence from worst to clean is interrupted transaction, invalid manifest or paths, validator failed, kernel review required, mechanical drift, live receipt stale and clean.

---

## 4. REQUIREMENTS

| Requirement | Details |
| --- | --- |
| Node | Node 22 is required. The tool uses Node builtins and `node:test` only. |
| External dependencies | None. No package installation is required. |
| Git | Git is required only for `--staged` and for `review-kernel`'s commit-timestamp lookup. Without a Git repository, `review-kernel` uses the kernel file mtime instead. |

---

## 5. STRUCTURE

```text
"z — Sync Skill to Claude Project"/
+-- ai-system-sync.cjs       # CLI entrypoint
+-- lib/                     # Domain logic and transaction engine
|   `-- README.md
+-- scripts/                 # Pre-commit delegate
|   `-- README.md
+-- tests/                   # node:test suite
|   `-- README.md
+-- registry.json            # Closed ten-system registry
+-- package.schema.json      # Manifest schema reference
`-- README.md                # This overview
```

| Path | Purpose |
| --- | --- |
| [`lib/README.md`](lib/README.md) | Domain modules for validation, checks, rendering, hashing and transactional sync. |
| [`scripts/README.md`](scripts/README.md) | Opt-in pre-commit delegate for `check --staged`. |
| [`tests/README.md`](tests/README.md) | Test coverage for library behavior, CLI behavior and sync-write integration. |
| `ai-system-sync.cjs` | Dispatches the six CLI commands. |
| `registry.json` | Lists the ten managed systems and their fixed paths. |
| `package.schema.json` | Documents the `claude-project.sync.json` manifest shape. |

---

## 6. CONFIGURATION

### Registry

[`registry.json`](registry.json) is the closed list of exactly ten systems. The registry validator checks the exact ID set rather than accepting any list with ten entries.

| System ID | Package root |
| --- | --- |
| `product-owner` | `Product Owner` |
| `sales-communication` | `Sales - Direct Communication` |
| `sales-hubspot-automation` | `Sales - HubSpot & Automation` |
| `media-editor` | `Media Editor` |
| `linkedin-pieter-bertram` | `LinkedIn - Pieter Bertram` |
| `linkedin-nigel-de-lange` | `LinkedIn - Nigel de Lange` |
| `barter-deal-templates` | `Barter - Deal Templates` |
| `barter-copywriter` | `Barter - Copywriter` |
| `barter-blog-posts` | `Barter - Blog Posts` |
| `prompt-improver` | `Prompt Improver` |

Each entry also fixes the skill root, kernel path, manifest path and validator placeholder. Adding an eleventh system requires changes to both the registry and the expected ID list in code.

### Manifest Schema

[`package.schema.json`](package.schema.json) defines the manifest schema that each system's `claude-project.sync.json` follows. `lib/manifest.cjs` enforces the shape with the tool's hand-rolled validator.

| Field group | Purpose |
| --- | --- |
| Identity and paths | Cross-checks `schemaVersion`, `id`, `skillRoot`, `skillId`, `knowledgeRoot` and `kernel.path`. |
| Kernel versions | Records `kernel.version` and `kernel.alignedSkillVersion`. |
| Coverage and mirrors | Declares `sourceCoverage`, explicit `mirrors` pairs and `expectedKnowledgeCount`. |
| Contract and validators | Declares `contractInputs` and validator command arrays with their working directories. |
| Retired names and exclusions | Controls `retiredNames`, `scanExcludes` and reviewed `derivationExceptions`. |
| Generated regions | Declares target files and named sections owned between generated-region markers. |

---

## 7. USAGE EXAMPLES

Run every command from the Barter repo root.

### Everyday Change

Use this sequence when a system's kernel needs a change. Hand-edit the kernel only when identity, routing or gates changed.

```bash
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" plan --system product-owner
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" review-kernel --system product-owner --reviewer "$USER" --reason "manual kernel review"
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --write
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner --run-validators
```

Expected result:

```text
review-kernel: recorded for product-owner at claude project/kernel-review.json (digest <16 hex characters>...)
sync: applied <number> change(s) for product-owner.
== product-owner: clean ==
```

If no derived bytes changed, `sync` prints `sync: product-owner already up to date (0 change(s)).` instead.

### Before a Release

Run the local and validator checks, print the manual upload plan, complete the upload and smoke matrix by hand, then record the receipt before running the live check.

```bash
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --all --run-validators
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" upload-plan --all
# upload the packages and run the smoke matrix by hand
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" release-check --all
```

Expected result for the first command is ten `clean` lines. `upload-plan` prints one numbered plan for every registered system. `release-check` returns exit 6 with `LIVE_RECEIPT_MISSING` until each upload receipt exists and matches the current package digest and smoke result.

### Recovering a Crashed Sync

Use the recovery path when a journal remains after a process failure.

```bash
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system product-owner
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --recover
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --write
```

Expected result:

```text
== product-owner: exit 5 ==
  [INTERRUPTED_TRANSACTION] Interrupted sync transaction detected (claude project/sync-journal.json present). Run: sync --system product-owner --recover
sync --recover: rolled back <rolled-back>/<total> operation(s) for product-owner.
sync: applied <number> change(s) for product-owner.
```

Recovery always rolls back the interrupted transaction. The final sync can instead report `product-owner already up to date (0 change(s)).` when the rollback restored current bytes.

---

## 8. TROUBLESHOOTING

| What You See | Cause | Fix |
| --- | --- | --- |
| `check` reports exit 5 and `INTERRUPTED_TRANSACTION` | `claude project/sync-journal.json` remains after an interrupted sync. | Run `node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system <id> --recover`, then retry the sync. |
| `check` reports exit 3 and `KERNEL_REVIEW_REQUIRED` | Contract inputs or `Custom Instructions.md` changed after the recorded review. | Run `review-kernel` with the current reviewer and reason, then run `check` again. |
| `check` reports exit 1 for mirrors, inventory, locks or generated regions | Derived package bytes or generated state drifted from the manifest and lock records. | Inspect the finding, run `sync --system <id> --write` for declared derived content and remove undeclared files manually. The checker never deletes unknown knowledge files. |
| `check` reports exit 2 for a manifest, path or symlink | The manifest is invalid, a required path is missing or a symlink is broken or leaves the repo. | Fix the manifest or path, keep symlink targets inside the repo and run `check` again. |
| `check --staged` reports unstaged changes in scope | The index and working tree differ inside an affected package. | Stage or discard the in-scope changes, or run `check --system` or `check --all` against the working tree. |
| `release-check` reports exit 6 | The upload receipt is missing, its package digest is stale or its smoke result is not `pass`. | Run `upload-plan`, deploy the package, run the smoke matrix and record a current upload receipt. |

---

## 9. RELATED RESOURCES

- [`lib/README.md`](lib/README.md) explains the domain modules and transaction engine.
- [`scripts/README.md`](scripts/README.md) explains the opt-in pre-commit delegate.
- [`tests/README.md`](tests/README.md) explains the 113-test suite and its fixtures.
- [`feature-catalog/feature-catalog.md`](feature-catalog/feature-catalog.md) is the feature catalog for this tool.
- [`manual-testing-playbook/manual-testing-playbook.md`](manual-testing-playbook/manual-testing-playbook.md) is the operator-facing manual validation playbook.
