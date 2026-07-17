# Media Editor - Claude Project Packaging

> Hand-maintained claude.ai Project copy of the CLI Media Editor system.

This folder is the source for the live claude.ai **Media Editor** Project. The live Project is push-only from this folder because the claude.ai UI has no repository lock.

## Structure

```text
claude project/
|-- Custom Instructions.md        <- advisory Project kernel, Skill v1.1.0 aligned
|-- README.md                     <- this manifest and sync contract
`-- knowledge/                    <- upload every file below as Project Knowledge
    |-- Media Editor - System - Skill - v1.1.0.md
    |-- Media Editor - Thinking - MEDIA Framework - v0.233.md
    |-- Media Editor - System - Interactive Intelligence - v0.220.md
    |-- Media Editor - Integrations - MCP Imagician - v0.211.md
    |-- Media Editor - Integrations - MCP Video Audio - v0.212.md
    |-- Media Editor - Reference - HLS Video Conversion - v0.110.md
    `-- Media Editor - Rules - Human Voice - EN - v0.210.md
```

| Path | Purpose |
| --- | --- |
| `Custom Instructions.md` | The advisory-only kernel pasted into the claude.ai Project custom instructions field |
| `knowledge/` | Project Knowledge mirrors uploaded to claude.ai |
| `README.md` | Packaging manifest, checksum table and update checklist |

## Custom Instructions = Advisory Skill Kernel, Project-Adapted

`Custom Instructions.md` is the synthesized claude.ai Project kernel aligned to **Media Editor Skill v1.1.0**. It preserves existing-media scope, MEDIA thinking, image, video, audio and HLS modes, tool routing, Human Voice Rules and guidance-first delivery.

CLI-only mechanics are adapted for claude.ai Projects. Tool execution becomes advisory recipes, direct file loading becomes Project Knowledge consultation and media export becomes a user-run `export/NNN - [description]/` path in the CLI runtime or terminal.

The kernel must stay advisory-only. Do not add language that claims claude.ai can run MCP servers, FFmpeg, terminal commands or save edited media files.

The Project is a chat-advisory variant. A claude.ai Project cannot run the Imagician or Video-Audio MCP servers or Terminal FFmpeg, so it cannot execute media edits. It guides the user through recipes and commands to run in the CLI runtime or their own terminal. The CLI `sk-media-editor/` package is where the tools actually run.

### Key Statistics

| Metric | Value |
| --- | --- |
| Project role | Advisory-only Media Editor for claude.ai Projects |
| Runtime source | `../sk-media-editor/` |
| Custom Instructions | Canonical 10-section advisory kernel |
| Project Knowledge files | 7 |
| Supported modes | Image, video, audio, HLS, repair, interactive |

## Paired-Version + Checksum Table

| Doc | Sync stamp |
| --- | --- |
| **Custom Instructions** | project kernel v1.0.1 -> Skill v1.1.0, sha16 `a24a88fcdcd30a0b` |
| knowledge/ System - Skill | v1.1.0 -> v1.1.0, sha16 `0ae1bbef9b45887c` |
| knowledge/ Thinking - MEDIA Framework | v0.233 -> v0.233, sha16 `6b30effbcdfe03be` |
| knowledge/ System - Interactive Intelligence | v0.220 -> v0.220, sha16 `94ea34d54c474f9b` |
| knowledge/ Integrations - MCP Imagician | v0.211 -> v0.211, sha16 `17216d1a10f81522` |
| knowledge/ Integrations - MCP Video Audio | v0.212 -> v0.212, sha16 `d942636ef0073571` |
| knowledge/ Reference - HLS Video Conversion | v0.110 -> v0.110, sha16 `5044382e7ce496dc` |
| knowledge/ Rules - Human Voice EN | v0.210 -> v0.210, sha16 `f8980baed64ddb1c` |

Full hashes can be recomputed with `shasum -a 256`.

## Set Up The Live Project

1. Create or open a claude.ai Project named Media Editor.
2. Paste `Custom Instructions.md` into the Project custom instructions field.
3. Upload every file in `knowledge/` as Project Knowledge.
4. Keep the house display name for each mirror, `Media Editor - <Section> - <Title> - v<version>.md`, bumping only the version number on change and removing any superseded mirror.
5. Smoke test `$image`, `$video`, `$audio`, `$hls`, `$repair`, `$interactive` and one ambiguous request.
6. Confirm the Guidance Block appears first with all six fields (Deliverable, Tool, Recipe, Settings, Expected result, Attestation) and confirm the two-to-three sentence post-block instructions follow, per Custom Instructions Section 7.

## Change Checklist

- Re-copy changed source files from `../sk-media-editor/SKILL.md`, `../sk-media-editor/references/` and `../sk-media-editor/assets/` into `knowledge/`.
- Use `cp -L` for the Human Voice symlink so claude.ai receives file contents, not links.
- If scope, routing, tool guidance or delivery behavior changes, re-derive `Custom Instructions.md` from the Skill kernel.
- Update this README with the new version stamps and sha256-16 values.
- Re-upload changed files to the live Project and confirm the upload took.
- Run every `SYNC.md` section 7 drift check before release and confirm all pass.

## Known Notes

- This Project is advisory only. It never gains tool execution inside claude.ai.
- Project Knowledge may be retrieved as chunks rather than full files, so the Project kernel repeats the core gates and routing contract.
- Preserve the no-execution limitation whenever runtime behavior changes.
