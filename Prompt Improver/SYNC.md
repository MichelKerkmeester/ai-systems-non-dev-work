# Prompt Improver packagings - sync manifest

Prompt Improver ships in TWO packagings. The skill is the source of truth; the claude.ai Project derives from it.

| Packaging | Role |
|---|---|
| `skill/` (SKILL.md + references/ + assets/) | **Source of truth + CLI runtime identity.** `AGENTS.md` is the entry-point and enforcement wrapper: it applies context override, export protocol and manual-load fallback before handing identity to the skill. |
| `claude project/` | Derived copy: `knowledge/` mirrors regenerate from `skill/references/` and `skill/assets/`; `Custom Instructions.md` is hand-synthesized for claude.ai's no-filesystem environment. |

## Manual-load contract

1. Traditional skill loading is optional. Any runtime may manually load the system by reading `skill/SKILL.md` directly.
2. Manual load must follow the same order as `AGENTS.md`: `skill/SKILL.md`, DEPTH, interactive mode, routed mode or format references, then validation and export.
3. Keep `AGENTS.md`, `skill/SKILL.md` and `claude project/Custom Instructions.md` aligned whenever identity, routing, gates, required references or delivery protocol change.

## Sync rule

1. Treat `skill/SKILL.md`, `skill/references/` and `skill/assets/` as canonical. The archived `z_archive/knowledge base/` folder is for manual comparison only.
2. Regenerate Project Knowledge mirrors by copying `skill/SKILL.md`, each `skill/references/*.md` and each `skill/assets/*.md` file byte-for-byte into `claude project/knowledge/` with the paired display filename.
3. Files split out under `skill/assets/*.md` are mirrored byte-for-byte exactly like references. Assets newly split from references use mirror names in the form `Prompt Improver - Assets - <Title Case Name> - v0.100.md`; references keep their existing display names with bumped versions when edited.
4. If identity, routing, gates or delivery protocol change, update `skill/SKILL.md`, `AGENTS.md` and `claude project/Custom Instructions.md` together.
5. Update `claude project/README.md` with the current version and sha256-16 for every mirrored knowledge file.
6. Re-run the drift checks listed below before distributing either packaging.

## Synthesized surfaces

- `AGENTS.md` is the CLI entry point, enforcement wrapper and manual-load handoff.
- `skill/SKILL.md` is the runtime skill identity and router.
- `claude project/Custom Instructions.md` adapts the same rules for claude.ai Projects and replaces filesystem export with the Deliverable Block protocol.
- `claude project/README.md` is the upload checklist and paired-version manifest.

## Drift audit

Manual check sequence:

```bash
find "Prompt Improver/skill" -type l ! -exec test -e {} \; -print
shasum -a 256 "Prompt Improver/skill/references"/*.md "Prompt Improver/skill/assets"/*.md "Prompt Improver/claude project/knowledge"/*.md
wc -w "Prompt Improver/skill/SKILL.md"
grep -rn the archived KB folder name "Prompt Improver/AGENTS.md" "Prompt Improver/skill" "Prompt Improver/claude project" | grep -v z_archive
```

The mirror audit should compare each source reference or asset with its paired Project Knowledge file. There is no derive.py machinery for this system; sync is manual copy or a simple shell copy.
