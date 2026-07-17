---
title: "Media Editor - Sync Manifest"
description: "Manual sync contract between the authoritative sk-media-editor skill and the derived claude.ai Project packaging: inventory, workflow, parity rules, and drift checks."
---

# Media Editor Sync Manifest

> The skill folder is the source of truth. The Claude Project is a derived copy, kept honest by this contract and a checksum manifest.

---

## 1. OVERVIEW

The Media Editor ships in two packagings from one source of truth. The skill is the runtime that drives the tools. The claude.ai Project derives from it and is advisory only.

| Packaging | Role |
| --- | --- |
| `sk-media-editor/` (SKILL.md plus references/ and assets/) | **Source of truth and CLI runtime identity.** Drives the Imagician and Video-Audio MCP servers and Terminal FFmpeg for real image, video and audio editing. `AGENTS.md` is the entry point and enforcement wrapper: it applies context override, tool verification, export protocol and manual-load fallback before handing identity to the skill. The Human Voice global is a relative symlink into `z — Knowledge/`. |
| `claude project/` | **Derived, chat-advisory only.** `knowledge/` mirrors regenerate from `sk-media-editor/SKILL.md`, `sk-media-editor/references/` and `sk-media-editor/assets/`. Custom Instructions are hand-synthesized for claude.ai Projects. A claude.ai Project cannot run the MCP servers or FFmpeg, so this packaging guides the user through recipes and commands and never claims to execute the tools. |
| `mcp servers/` | Tool layer the skill drives: `imagician/` (image editing) and `video-audio/` (video and audio editing). Not touched by this contract. |
| `knowledge base/` | Pre-conversion legacy folder. Superseded by `sk-media-editor/`. Kept for manual comparison, read-only. |

This is the key distinction recorded in the rollout ruling for MCP-agent systems: the CLI `sk-media-editor/` package has live tool connections, verifies the tool first (blocking), runs the MCP operation or FFmpeg command, saves to `export/` and reports the result. The claude.ai Project has no tool connections. It applies the same MEDIA thinking and format intelligence, then returns a Guidance Block: the recipe, settings and exact commands for the user to run in the CLI runtime or their own terminal, stating the no-execution limitation plainly.

This system has no derive script. Synchronization is manual copy or a simple shell copy only. `sk-media-editor/` remains authoritative and `claude project/knowledge/` remains disposable.

---

## 2. WHEN TO SYNC

Run the workflow in section 5 whenever any of these change:

- A reference or asset under `sk-media-editor/` (MEDIA framework, integration specs, HLS recipes, interactive intelligence)
- `sk-media-editor/SKILL.md` (routing, identity, tool verification gate, delivery)
- Identity, tool binding, routing, the export protocol or delivery behavior anywhere, which additionally requires updating `AGENTS.md` and hand-synthesizing the equivalent change into `claude project/Custom Instructions.md`

Keep `AGENTS.md`, `sk-media-editor/SKILL.md` and `claude project/Custom Instructions.md` aligned as one contract. A change to one is a change to all three until proven otherwise. Keep this distinction explicit in both `claude project/Custom Instructions.md` (Section 6 Guidance Block, advisory-only attestation) and this file.

---

## 3. MANUAL-LOAD CONTRACT

1. Traditional skill loading is optional. Any runtime may load the system by reading `sk-media-editor/SKILL.md` directly.
2. Manual load follows the same order as `AGENTS.md`: `sk-media-editor/SKILL.md`, system prompt, MEDIA framework, Human Voice Rules, then the routed integration reference, then validation and export.
3. Required resources load only after intent is bound: `references/mcp-imagician.md` for Image, `references/mcp-video-audio.md` for Video and Audio, `assets/hls-video-conversion.md` for HLS, `references/interactive-intelligence.md` for Repair and ambiguous requests.

---

## 4. SOURCE-TO-MIRROR INVENTORY

The Project Knowledge package contains exactly these seven mirrors:

| Authoritative source | Claude Project Knowledge mirror |
| --- | --- |
| `sk-media-editor/SKILL.md` | `Media Editor - System - Skill - v1.1.0.md` |
| `sk-media-editor/references/media-framework.md` | `Media Editor - Thinking - MEDIA Framework - v0.233.md` |
| `sk-media-editor/references/interactive-intelligence.md` | `Media Editor - System - Interactive Intelligence - v0.220.md` |
| `sk-media-editor/references/mcp-imagician.md` | `Media Editor - Integrations - MCP Imagician - v0.211.md` |
| `sk-media-editor/references/mcp-video-audio.md` | `Media Editor - Integrations - MCP Video Audio - v0.212.md` |
| `sk-media-editor/assets/hls-video-conversion.md` | `Media Editor - Reference - HLS Video Conversion - v0.110.md` |
| `sk-media-editor/references/human-voice-rules.md` | `Media Editor - Rules - Human Voice - EN - v0.210.md` |

The Media Editor Skill is pinned to `1.1.0`. The Custom Instructions kernel is pinned to `1.0.0` and must declare alignment with Skill `1.1.0`. These filenames and versions belong to the current package: contract corrections reuse the pinned names, replace the derived mirror bytes and regenerate the checksum manifest instead of creating parallel versioned mirrors.

---

## 5. SYNC WORKFLOW

Apply this sequence whenever a source reference, asset, router or delivery contract changes:

1. Finish and validate the authoritative files under `sk-media-editor/`.
2. Copy `sk-media-editor/SKILL.md` and every changed reference or asset into the exact versioned mirror name above. Use `cp -L` for the symlinked Human Voice global so Project Knowledge receives file bytes rather than a link.
3. Mirrors keep the house display name `Media Editor - <Section> - <Title> - v<version>.md`, with only the version bumped on change. Remove superseded versioned mirrors. Do not retain old and new filenames together.
4. If identity, the tool verification gate, routing or delivery protocol changed, update `sk-media-editor/SKILL.md`, `AGENTS.md` and `claude project/Custom Instructions.md` together. Preserve the advisory-only framing in the Project.
5. Update `claude project/README.md` with the new version and sha256-16 for every changed mirror and for Custom Instructions.
6. Compute each checksum from the final file bytes. Never copy a digest from an earlier version.
7. Run the drift checks in section 7 before release.

---

## 6. REQUIRED PARITY

Both packagings must agree on:

- The tool-binding table: Image to Imagician, Video and Audio to Video-Audio, HLS to Terminal FFmpeg, Repair to auto-detect.
- The tool verification gate. The CLI blocks on a live check (`list_images`, `health_check`, `ffmpeg -version`). The Project cannot run these checks, so it must name the same verification command for the user to run first.
- Format and quality defaults: WebP at 85 percent for web images, JPEG at 80 percent for compatibility, H.264 MP4 with AAC audio for web video, H.265 for smaller modern files, MP3 at 192 kbps or AAC for audio, and the 1080p, 720p, 480p, 360p HLS ladder.
- One comprehensive question, then wait, when media type, file, goal or output is unclear.
- No new-media generation, no platform upload, no application code and no complex non-linear editing beyond the bound tool's scope. Both packagings refuse and reframe these identically.
- Tool capability limits: over 100MB for MCP operations, over 5GB for HLS. Both packagings surface the same limit language rather than promising an unbounded capability.
- The export path shape `export/[###] - [description]/`. The CLI writes to it after verifying the save. The Project recommends the identical path for the user to use in their own runtime or terminal.
- No horizontal rules in chat responses and dash-bullet formatting per Human Voice Rules.
- The Project's advisory-only attestation: it must state plainly that it did not execute, verify or save anything, in every actionable response.

---

## 7. DRIFT CHECKS

Verify all of the following before release:

1. The Human Voice symlink resolves from `sk-media-editor/references/human-voice-rules.md`.
2. Every required skill surface exists: `SKILL.md` plus the five references and assets in section 4.
3. `claude project/knowledge/` contains exactly seven files, matching the inventory above.
4. `mcp servers/imagician` and `mcp servers/video-audio` still exist and are untouched by this contract.
5. `sk-media-editor/SKILL.md` stays within its line cap.
6. No surface references a superseded Skill version, a stale `skill/` path, `INSTALL_GUIDE.md` or an underscored filename.
7. Each mirror is byte-identical to its authoritative source. Resolve symlinks while comparing.
8. Every sha256-16 in `claude project/README.md` matches the final bytes, including `Custom Instructions.md`.

```bash
# Human Voice symlink resolves
test -f "sk-media-editor/references/human-voice-rules.md" && echo "HVR symlink OK"

# Required skill surfaces exist
test -f "sk-media-editor/SKILL.md"
test -f "sk-media-editor/references/media-framework.md"
test -f "sk-media-editor/references/interactive-intelligence.md"
test -f "sk-media-editor/references/mcp-imagician.md"
test -f "sk-media-editor/references/mcp-video-audio.md"
test -f "sk-media-editor/assets/hls-video-conversion.md"

# Mirror count matches sources (7 knowledge files)
ls "claude project/knowledge/" | wc -l

# Tool layer preserved
test -d "mcp servers/imagician" && test -d "mcp servers/video-audio" && echo "MCP servers OK"

# SKILL.md within caps
test "$(grep -c "" sk-media-editor/SKILL.md)" -le 3000 && echo "line cap OK"
```

Full hashes can be recomputed with `shasum -a 256`.

---

## 8. RELATED DOCUMENTS

| Document | Purpose |
| --- | --- |
| [`sk-media-editor/SKILL.md`](sk-media-editor/SKILL.md) | Executable skill identity, router and tool driver |
| [`sk-media-editor/README.md`](sk-media-editor/README.md) | Descriptive guide to the skill, its modes and its output contract |
| [`AGENTS.md`](AGENTS.md) | CLI entry point, enforcement wrapper and manual-load handoff |
| [`claude project/Custom Instructions.md`](claude%20project/Custom%20Instructions.md) | Chat-advisory Project synthesis that replaces filesystem execution with the Guidance Block protocol |
| [`claude project/README.md`](claude%20project/README.md) | Upload, version and checksum manifest |
