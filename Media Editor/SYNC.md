# Media Editor packagings - sync manifest

The Media Editor ships in TWO packagings from one source of truth. The skill is the runtime that drives the tools. The claude.ai Project derives from it and is advisory only.

| Packaging | Role |
|---|---|
| `skill/` (SKILL.md + references/ + assets/) | **Source of truth + CLI runtime identity.** Drives the Imagician and Video-Audio MCP servers and Terminal FFmpeg for real image, video and audio editing. `AGENTS.md` is the entry point and enforcement wrapper: it applies context override, tool verification, export protocol and manual-load fallback before handing identity to the skill. The Human Voice global is a relative symlink into `z — Knowledge/`. |
| `claude project/` | **Derived, chat-advisory only.** `knowledge/` mirrors regenerate from `skill/SKILL.md`, `skill/references/` and `skill/assets/`. Custom Instructions are hand-synthesized for claude.ai Projects. A claude.ai Project cannot run the MCP servers or FFmpeg, so this packaging guides the user through recipes and commands and never claims to execute the tools. |
| `mcp servers/` | Tool layer the skill drives: `imagician/` (image editing) and `video-audio/` (video and audio editing). Not deleted by the conversion. |
| `knowledge base/` | Pre-conversion legacy folder. Superseded by `skill/`. Kept for manual comparison, read-only. |

## The runtime-versus-advisory split

This is the key distinction recorded in the rollout ruling for MCP-agent systems.

- The CLI `skill/` package has live tool connections. It verifies the tool first (blocking), runs the MCP operation or FFmpeg command, saves to `export/` and reports the result.
- The claude.ai Project has no tool connections. It applies the same MEDIA thinking and format intelligence, then returns a Guidance Block: the recipe, settings and exact commands for the user to run in the CLI runtime or their own terminal. The Project states the no-execution limitation plainly.
- Keep this distinction explicit in both `claude project/Custom Instructions.md` (Section 6 Guidance Block, advisory-only attestation) and this file.

## Manual-load contract

1. Traditional skill loading is optional. Any runtime may load the system by reading `skill/SKILL.md` directly.
2. Manual load follows the same order as `AGENTS.md`: `skill/SKILL.md`, system prompt, MEDIA framework, Human Voice Rules, then the routed integration reference, then validation and export.
3. Keep `AGENTS.md`, `skill/SKILL.md` and `claude project/Custom Instructions.md` aligned whenever identity, routing, tool verification, required references or delivery protocol change.

## Sync rule (on any skill reference or asset bump)

1. Re-copy each changed `skill/references/` file, each `skill/assets/*.md` file and `skill/SKILL.md` into the matching `claude project/knowledge/` mirror. Use `cp -L` for the symlinked Human Voice global so Project Knowledge receives file bytes, not a link.
2. Mirrors keep the house display name `Media Editor - <Section> - <Title> - v<version>.md`, with only the version bumped on change.
3. If identity, the tool verification gate, routing or delivery protocol changed, update `skill/SKILL.md`, `AGENTS.md` and `claude project/Custom Instructions.md` together. Preserve the advisory-only framing in the Project.
4. Update `claude project/README.md` with the new version and sha256-16 for every changed mirror and for Custom Instructions.
5. Re-run the drift checks below.

## Drift checks

```bash
# Human Voice symlink resolves
test -f "skill/references/human_voice_rules.md" && echo "HVR symlink OK"

# Required skill surfaces exist
test -f "skill/SKILL.md"
test -f "skill/references/media_framework.md"
test -f "skill/references/interactive_intelligence.md"
test -f "skill/references/mcp_imagician.md"
test -f "skill/references/mcp_video_audio.md"
test -f "skill/assets/hls_video_conversion.md"

# Mirror count matches sources (7 knowledge files)
ls "claude project/knowledge/" | wc -l

# Tool layer preserved
test -d "mcp servers/imagician" && test -d "mcp servers/video-audio" && echo "MCP servers OK"

# SKILL.md within caps
test "$(grep -c "" skill/SKILL.md)" -le 3000 && echo "line cap OK"
```

## Manual copy contract

This system has no derive.py machinery. Sync is manual copy or simple shell copy only. `skill/` remains authoritative; `claude project/knowledge/` files are disposable mirrors. The `mcp servers/` tool packages and `INSTALL_GUIDE.md` are maintained independently of the knowledge mirrors.

## Synthesized surfaces

- `AGENTS.md` is the CLI entry point, enforcement wrapper and manual-load handoff.
- `skill/SKILL.md` is the executable skill identity, router and tool driver.
- `claude project/Custom Instructions.md` is the chat-advisory Project synthesis that replaces filesystem execution with the Guidance Block protocol.
- `claude project/README.md` is the upload and checksum manifest.
