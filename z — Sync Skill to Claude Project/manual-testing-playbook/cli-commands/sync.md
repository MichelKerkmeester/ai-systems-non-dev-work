---
title: "CLI-003 -- Sync (sync)"
description: "This scenario validates Sync (sync) for `CLI-003`. It focuses on applying manifest-derived writes in a disposable fixture and proving idempotence."
version: 1.0.0.0
---

# CLI-003 -- Sync (sync)

This document captures the operator scenario for `CLI-003`.

---

## 1. OVERVIEW

This scenario validates Sync (sync) for `CLI-003`. It focuses on applying a generated-region write through the CLI and proving that the next run is a no-op.

### Why This Matters

Sync is the only command that writes derived package state. The fixture keeps the real fleet untouched while proving the command requires a registered system, applies the planned operation and recognizes unchanged bytes.

---

## 2. SCENARIO CONTRACT

Operators run the exact prompt and command sequence for `CLI-003` against the disposable fixture.

- Objective: Apply a manifest-derived generated-region write and prove a second invocation performs zero changes.
- Real user request: `Sync the Product Owner package in a disposable fixture, then confirm a second run makes no changes.`
- Prompt: `As a sync orchestrator, apply the manifest-derived mirror and generated-region writes against the disposable Product Owner fixture. Verify the first run applies changes and the second run is a no-op. Return the two CLI outputs.`
- Expected execution process: Prepare the fixture with `tests/helpers.cjs`, run two real CLI writes with `AI_SYSTEM_SYNC_REPO_ROOT` and capture the generated file and lock state.
- Expected signals: First run prints `sync: applied 2 change(s) for product-owner.` for the generated region and final package-lock write. Second run prints `sync: product-owner already up to date (0 change(s)).`
- Desired user-visible outcome: The disposable package is synchronized once and remains stable on a repeat run.
- Pass/fail: PASS if both outputs match and the live fleet is untouched. FAIL if a write reaches the live fleet, the second run rewrites state or the expected region is missing.

---

## 3. TEST EXECUTION

### Prompt

- Prompt: `As a sync orchestrator, apply the manifest-derived mirror and generated-region writes against the disposable Product Owner fixture. Verify the first run applies changes and the second run is a no-op. Return the two CLI outputs.`

### Commands

1. `node -e 'const fs=require("node:fs"),os=require("node:os"),path=require("node:path"); const root=path.join(os.tmpdir(),"ai-system-sync-playbook-fixtures","sync_write"); fs.rmSync(root,{recursive:true,force:true}); fs.mkdirSync(root,{recursive:true}); const tool=fs.readdirSync(".").find((name)=>fs.existsSync(path.join(name,"ai-system-sync.cjs"))); const h=require(path.resolve(tool,"tests","helpers.cjs")); h.buildCleanPackage(root,{id:"product-owner",packageRoot:"Product Owner",skillRoot:"sk-product-owner",generatedRegions:[{target:"SYNC.md",sections:["INVENTORY"]}]}); h.writeFile(root,"Product Owner/SYNC.md","# Sync\n\n<!-- BEGIN GENERATED: AI-SYSTEM-SYNC INVENTORY -->\n(pending)\n<!-- END GENERATED: AI-SYSTEM-SYNC INVENTORY -->\n");'`
2. `AI_SYSTEM_SYNC_REPO_ROOT="$(node -p 'require("node:path").join(require("node:os").tmpdir(),"ai-system-sync-playbook-fixtures","sync_write")')" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --write`
3. `AI_SYSTEM_SYNC_REPO_ROOT="$(node -p 'require("node:path").join(require("node:os").tmpdir(),"ai-system-sync-playbook-fixtures","sync_write")')" node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system product-owner --write`

| Feature ID | Feature Name | Scenario Name/Objective | Exact Prompt | Exact Command Sequence | Expected Signals | Evidence | Pass/Fail Criteria | Failure Triage |
|---|---|---|---|---|---|---|---|---|
| CLI-003 | Sync (sync) | Apply one generated region plus the final lock and prove a zero-change repeat | `As a sync orchestrator, apply the manifest-derived mirror and generated-region writes against the disposable Product Owner fixture. Verify the first run applies changes and the second run is a no-op. Return the two CLI outputs.` | `fixture setup -> sync --system product-owner --write -> sync --system product-owner --write` using the exact commands above | Step 2: `applied 2 change(s)`. Step 3: `already up to date (0 change(s))`. | Fixture root, both CLI transcripts, generated `SYNC.md`, package lock and absence of journal | PASS if the first output applies the region and lock and the second output reports zero changes. FAIL if a live package changes or the second run applies work. | Check `AI_SYSTEM_SYNC_REPO_ROOT`, inspect the manifest region declaration, then inspect the package lock and journal paths. |

### Expected

The first run printed `sync: applied 2 change(s) for product-owner.` The second run printed `sync: product-owner already up to date (0 change(s)).` The generated region and package lock existed in the fixture.

### Evidence

Capture the setup command, both CLI outputs, the fixture `SYNC.md`, the fixture `claude project/package-lock.json` and an artifact check showing no `sync-journal.json` remains.

### Pass / Fail

- **PASS**: The first isolated run applies the generated region and final package lock and the second isolated run is a zero-change no-op.
- **FAIL**: Any live package is touched, the generated region is not rendered or the second run applies a change.
- **SKIP**: Use only when the disposable fixture root cannot be created and record the filesystem blocker.

### Failure Triage

1. Confirm the environment override points to the fixture root and not the repository root.
2. Inspect `claude-project.sync.json` for the generated target and section.
3. Run the focused `sync-write.test.cjs` cross-reference and compare its no-op assertion.

---

## 4. SOURCE FILES

### Playbook Sources

| File | Role |
|---|---|
| [manual-testing-playbook.md](../manual-testing-playbook.md) | Root directory page and review policy |
| [feature-catalog/cli-commands/sync.md](../../feature-catalog/cli-commands/sync.md) | Feature-catalog command contract |

### Implementation And Test Anchors

| File | Role |
|---|---|
| `../../ai-system-sync.cjs` | Builds operations and dispatches sync or recovery |
| `../../lib/manifest.cjs` | Validates the manifest before staging |
| `../../lib/lockfile.cjs` | Builds the final package-lock operation |
| `../../lib/mirrors.cjs` | Renders raw or deterministic mirror bytes |
| `../../lib/render.cjs` | Renders generated section bodies |
| `../../lib/regions.cjs` | Finds and replaces generated regions |
| `../../lib/transaction.cjs` | Applies the staged transaction |
| `../../tests/cli.test.cjs` | Covers sync usage and recovery dispatch |
| `../../tests/sync-write.test.cjs` | Covers writes, regions, idempotence and exceptions |

---

## 5. SOURCE METADATA

- Group: CLI Commands
- Playbook ID: CLI-003
- Canonical root source: `manual-testing-playbook.md`
- Feature file path: `cli-commands/sync.md`
