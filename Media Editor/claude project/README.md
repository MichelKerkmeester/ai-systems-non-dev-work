# Media Editor - Claude Project packaging

Hand-maintained claude.ai Projects copy of the CLI Media Editor system. The `skill/` folder is the source of truth and the runtime that drives the MCP servers. This folder is the upload package for claude.ai.

This Project is a CHAT-ADVISORY variant. A claude.ai Project cannot run the Imagician or Video-Audio MCP servers or Terminal FFmpeg, so it cannot execute media edits. It guides the user through recipes and commands to run in the CLI runtime or their own terminal. The CLI `skill/` is where the tools actually run.

## Structure

```text
claude project/
├── Custom Instructions.md
├── README.md
└── knowledge/
    ├── Media Editor - System - Skill - v1.0.0.md
    ├── Media Editor - Thinking - MEDIA Framework - v0.233.md
    ├── Media Editor - System - Interactive Intelligence - v0.220.md
    ├── Media Editor - Integrations - MCP Imagician - v0.211.md
    ├── Media Editor - Integrations - MCP Video Audio - v0.212.md
    ├── Media Editor - Reference - HLS Video Conversion - v0.110.md
    └── Media Editor - Rules - Human Voice - EN - v0.210.md
```

## Upload

1. Create or open a claude.ai Project named Media Editor.
2. Paste `Custom Instructions.md` into the Project Custom Instructions field.
3. Upload every file under `knowledge/` as Project Knowledge.
4. Smoke test `$image`, `$video`, `$audio`, `$hls` and one ambiguous request. Confirm the Guidance Block appears first, includes the attestation footer and states the advisory-only limitation.

## Paired Versions

| Doc | Version | sha256 (16) |
|---|---|---|
| Custom Instructions | v1.0.0 | `6212906aa4cd6ad4` |
| knowledge/ System - Skill | v1.0.0 | `b6463a5603974b01` |
| knowledge/ Thinking - MEDIA Framework | v0.233 | `6b30effbcdfe03be` |
| knowledge/ System - Interactive Intelligence | v0.220 | `94ea34d54c474f9b` |
| knowledge/ Integrations - MCP Imagician | v0.211 | `17216d1a10f81522` |
| knowledge/ Integrations - MCP Video Audio | v0.212 | `d942636ef0073571` |
| knowledge/ Reference - HLS Video Conversion | v0.110 | `5044382e7ce496dc` |
| knowledge/ Rules - Human Voice EN | v0.210 | `f8980baed64ddb1c` |

## Sync

On any `skill/SKILL.md`, `skill/references/` or `skill/assets/` change, re-copy the relevant mirror, update this table and re-upload the changed Project Knowledge. Use `cp -L` for the Human Voice symlink so claude.ai receives file contents, not links. This Project never gains tool execution: keep the advisory-only framing in Custom Instructions whenever runtime behavior changes.
