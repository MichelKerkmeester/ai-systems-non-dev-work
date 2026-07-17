---
title: "Prompt Improver - Sync Manifest"
description: "Manual sync contract between the authoritative sk-prompt-improver skill and the derived claude.ai Project packaging: inventory, workflow, parity rules and drift checks."
---

# Prompt Improver Sync Manifest

> The skill folder is the source of truth. The Claude Project is a derived copy, kept honest by this contract and a checksum manifest.

---

## 1. OVERVIEW

Prompt Improver ships in two packagings. The source skill is authoritative and the Claude Project is derived from it.

| Packaging | Role |
| --- | --- |
| `sk-prompt-improver/` (`SKILL.md` + `references/` + `assets/`) | **Source of truth and CLI runtime identity.** `AGENTS.md` applies the context override, export protocol and manual-load fallback before handing identity to `sk-prompt-improver/SKILL.md`. |
| `claude project/` | **Derived Project package.** `knowledge/` contains versioned source mirrors, `Custom Instructions.md` is a hand-synthesized Claude kernel and `README.md` is the upload and integrity manifest. |

This system has no derive script. Synchronization is manual copy or a simple shell copy only. `sk-prompt-improver/` remains authoritative and `claude project/knowledge/` remains disposable.

Each surface carries a distinct role in the same contract:

- `AGENTS.md` is the CLI entry point, enforcement wrapper and manual-load handoff.
- `sk-prompt-improver/SKILL.md` is the runtime skill identity and router.
- `claude project/Custom Instructions.md` adapts the same rules for claude.ai Projects and replaces filesystem export with the Deliverable Block protocol.
- `claude project/README.md` is the upload checklist and paired-version manifest.

---

## 2. WHEN TO SYNC

Run the workflow in section 5 whenever any of these change:

- A reference or asset under `sk-prompt-improver/` (mode workflows, format guides, mode libraries)
- `sk-prompt-improver/SKILL.md` (routing, identity, gates, delivery)
- Identity, routing, gates or delivery protocol anywhere, which additionally requires updating `AGENTS.md` and hand-synthesizing the equivalent change into `claude project/Custom Instructions.md`

Keep `AGENTS.md`, `sk-prompt-improver/SKILL.md` and `claude project/Custom Instructions.md` aligned as one contract. A change to one is a change to all three until proven otherwise.

---

## 3. MANUAL-LOAD CONTRACT

1. Traditional skill loading is optional. A runtime may load the system by reading `sk-prompt-improver/SKILL.md` directly.
2. Manual load follows the same order as `AGENTS.md`: `SKILL.md`, DEPTH, interactive mode, routed mode or format references, then validation and export.
3. `$raw` is an energy and scoring bypass, not a separate artifact intent. It skips DEPTH, questions and scoring but never skips prompt-only scope, intent preservation or format correctness.
4. Mode resources load only after their intent is selected: `references/visual-mode.md` plus `assets/visual-mode-library.md` for Visual, `references/image-mode.md` plus `assets/image-mode-library.md` for Image, `references/video-mode.md` plus `assets/video-mode-library.md` for Video, and the matching format guide under `assets/` for a locked output format.

---

## 4. SOURCE-TO-MIRROR INVENTORY

The Project Knowledge package contains exactly these fourteen mirrors:

| Authoritative source | Claude Project Knowledge mirror |
| --- | --- |
| `sk-prompt-improver/SKILL.md` | `Prompt Improver - System - Skill - v1.2.0.md` |
| `sk-prompt-improver/references/depth-framework.md` | `Prompt Improver - DEPTH Thinking Framework - v0.200.md` |
| `sk-prompt-improver/references/interactive-mode.md` | `Prompt Improver - Interactive Mode - v0.700.md` |
| `sk-prompt-improver/references/patterns-evaluation.md` | `Prompt Improver - Patterns and Evaluation - v0.211.md` |
| `sk-prompt-improver/references/visual-mode.md` | `Prompt Improver - Visual Mode - v0.300.md` |
| `sk-prompt-improver/references/image-mode.md` | `Prompt Improver - Image Mode - v0.122.md` |
| `sk-prompt-improver/references/video-mode.md` | `Prompt Improver - Video Mode - v0.122.md` |
| `sk-prompt-improver/assets/framework-pattern-library.md` | `Prompt Improver - Assets - Framework Pattern Library - v0.100.md` |
| `sk-prompt-improver/assets/format-guide-markdown.md` | `Prompt Improver - Format Guide Markdown - v0.141.md` |
| `sk-prompt-improver/assets/format-guide-json.md` | `Prompt Improver - Format Guide JSON - v0.141.md` |
| `sk-prompt-improver/assets/format-guide-yaml.md` | `Prompt Improver - Format Guide YAML - v0.141.md` |
| `sk-prompt-improver/assets/visual-mode-library.md` | `Prompt Improver - Assets - Visual Mode Library - v0.110.md` |
| `sk-prompt-improver/assets/image-mode-library.md` | `Prompt Improver - Assets - Image Mode Library - v0.101.md` |
| `sk-prompt-improver/assets/video-mode-library.md` | `Prompt Improver - Assets - Video Mode Library - v0.101.md` |

There is no separate worked-examples folder for this system: the three mode libraries carry their transformation examples and quick lookups inline, so the Project Knowledge package contains exactly these fourteen files and no more.

The Prompt Improver Skill is pinned to `1.2.0`. Claude Custom Instructions are pinned to `1.2.0` and declare alignment with Skill `1.2.0`. Every other reference and asset mirror keeps its existing version because its source content is unchanged. A future content edit bumps that source's version, renames its mirror and regenerates the checksum manifest in the same pass.

Archived knowledge under `z_legacy/` is for manual comparison only and is not a sync source.

---

## 5. SYNC WORKFLOW

Apply this sequence whenever a source reference, asset, router or delivery contract changes:

1. Finish and validate the authoritative files under `sk-prompt-improver/`.
2. Copy `sk-prompt-improver/SKILL.md` and every changed reference or asset into the exact versioned mirror name above, byte-for-byte into `claude project/knowledge/`. Use `cp -L` for any symlinked source so Project Knowledge receives file bytes rather than links.
3. Remove superseded versioned mirrors. Do not retain old and new filenames together.
4. If identity, routing, gates or delivery protocol changed, update `AGENTS.md` and hand-synthesize the equivalent change into `claude project/Custom Instructions.md`.
5. Update `claude project/README.md` with the exact fourteen-file upload inventory, paired versions and sha256-16 values.
6. Compute each checksum from the final file bytes. Never copy a digest from an earlier version.
7. Run the drift checks in section 7 before release.

---

## 6. REQUIRED PARITY

Both packagings must agree on:

- The ten routed intents (Raw, Text, Improve, Refine, Short, Deep, Visual, MagicPath, Image, Video) plus Interactive as the no-signal fallback
- Exact command aliases and their shortcuts: `$raw`, `$text`/`$t`, `$improve`/`$i`, `$refine`/`$r`, `$short`/`$s`, `$deep`/`$d`, `$vibe`/`$v`, `$image`/`$img`, `$video`/`$vid`, `$json`/`$j`, `$yaml`/`$y`, `$markdown`/`$md`/`$m`
- Natural-language mode detection preceding and equal in force to explicit commands, with MagicPath routing before generic visual UI
- DEPTH energy levels and their phase sets: Raw (none), Quick (D-P-H), Standard (D-E-P-T-H), Deep (extended D, all five phases), Creative (abbreviated, mode-specific perspectives)
- One consolidated clarification question below 50% mode confidence, never answered by the assistant itself
- `$raw` bypassing DEPTH, questions and scoring while still preserving prompt-only scope, intent and format correctness
- CLEAR for text-family prompts (40+/50, dimension floors Correctness 7, Logic 7, Expression 10, Arrangement 7, Reusability 3)
- EVOKE for Visual UI prompts (40+/50, 42+/50 for MagicPath) with the non-skippable subject, audience, single-job and anti-default grounding pre-check
- VISUAL for Image (48+/60) and Video (56+/70, camera or subject motion mandatory) prompts
- Format locks: `$json` and `$yaml` require syntactically valid output, and `$markdown` is the default
- Repair limit of 3 improvement cycles, then best-effort delivery with a transparent quality note
- Direct-task refusal: no direct coding, debugging, implementation plans or content generation unless the user wants a prompt that asks another AI to do that work
- Export-equivalent delivery: file path (or Deliverable Block) before commentary, no full prompt pasted in chat, a 2-3 sentence summary, and a follow-up invitation after creative modes

CLI uses filesystem export-first delivery to `export/[###] - enhanced-[description].[md|json|yaml]`. Claude uses one Deliverable Block and reports the same export-equivalent path. That delivery difference must not change prompt content, scope discipline or naming.

---

## 7. DRIFT CHECKS

Verify all of the following before release:

1. The knowledge directory contains exactly the fourteen filenames in the inventory.
2. Each mirror is byte-identical to its authoritative source. Resolve symlinks while comparing.
3. Every sha256-16 in `claude project/README.md` matches the final bytes, including `Custom Instructions.md`.
4. No Prompt Improver surface references a superseded Skill, reference or asset version, or the retired `z_archive/knowledge base` folder name.
5. No surface treats a format lock as a mode or a mode as a format.
6. Routing smoke tests cover all ten intents, false-command handling, Interactive fallback, MagicPath-over-Visual precedence and format-lock independence from mode.
7. Scoring smoke tests cover CLEAR floors, EVOKE grounding pre-check and MagicPath reweighting, and VISUAL image/video thresholds including the video motion blocker.
8. Export smoke tests confirm the file exists before the chat response and that creative modes close with the refinement invitation.

Manual check sequence:

```bash
find "Prompt Improver/sk-prompt-improver" -type l ! -exec test -e {} \; -print
shasum -a 256 "Prompt Improver/sk-prompt-improver/references"/*.md "Prompt Improver/sk-prompt-improver/assets"/*.md "Prompt Improver/claude project/knowledge"/*.md
wc -l "Prompt Improver/sk-prompt-improver/SKILL.md"
stale_kb="z_archive/knowledge base"
grep -rn "$stale_kb" "Prompt Improver/AGENTS.md" "Prompt Improver/sk-prompt-improver" "Prompt Improver/claude project"
```

The mirror audit should compare each source reference or asset with its paired Project Knowledge file. There is no derive script for this system, so sync stays a manual copy or a simple shell copy.

---

## 8. RELATED DOCUMENTS

| Document | Purpose |
| --- | --- |
| [`sk-prompt-improver/SKILL.md`](sk-prompt-improver/SKILL.md) | Executable skill identity and router |
| [`sk-prompt-improver/README.md`](sk-prompt-improver/README.md) | Descriptive guide to the skill, its modes and its output contract |
| [`AGENTS.md`](AGENTS.md) | CLI entry point, enforcement wrapper and manual-load handoff |
| [`claude project/Custom Instructions.md`](claude%20project/Custom%20Instructions.md) | Project-compatible kernel replacing filesystem export with the Deliverable Block protocol |
| [`claude project/README.md`](claude%20project/README.md) | Upload, version and checksum manifest |
