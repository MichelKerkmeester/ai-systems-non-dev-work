# Product Owner packagings - sync manifest

The Product Owner ships in TWO packagings. The skill is the source of truth; the claude.ai Project derives from it.

| Packaging | Role |
|---|---|
| `skill/` (SKILL.md + references/ + assets/) | **Source of truth + CLI runtime identity.** `AGENTS.md` is the entry-point and enforcement wrapper: it applies context override, export protocol and manual-load fallback before handing identity to the skill. Shared-global docs are relative symlinks into `z — Knowledge/`. |
| `claude project/` | Derived copy: `knowledge/` mirrors regenerate from `skill/references/` and `skill/assets/`; Custom Instructions are hand-synthesized for claude.ai Projects. |

## Manual-load contract

1. Traditional skill loading is optional. Any runtime may manually load the system by reading `skill/SKILL.md` directly.
2. Manual load must follow the same order as `AGENTS.md`: `skill/SKILL.md`, HVR, DEPTH, routed task, bug or interactive resources, then validation and export.
3. Keep `AGENTS.md`, `skill/SKILL.md` and `claude project/Custom Instructions.md` aligned whenever identity, routing, gates, required references or delivery protocol change.

## Sync rule (on any skill reference or asset bump)

1. Re-copy each changed `skill/references/` file and each `skill/assets/*.md` file into the matching `claude project/knowledge/` mirror. Use `cp -L` for symlinked global references so Project Knowledge receives file bytes, not links.
2. Files moved from references keep their existing mirror display name with only the version bumped. New split-out assets use `Product Owner - Assets - <Title Case Name> - v0.100.md`.
3. If identity, gates, routing or delivery protocol changed, update `skill/SKILL.md`, `AGENTS.md` and `claude project/Custom Instructions.md` together.
4. Update `claude project/README.md` with the new version and sha256-16 for every mirror.
5. Re-run the drift checks: symlink resolution, mirror shasums, `SKILL.md` word count, and a grep for stale references to the archived KB folder name outside z_archive.

## Manual copy contract

This system has no derive.py machinery. Sync is manual copy or simple shell copy only. `skill/` remains authoritative; `claude project/knowledge/` files are disposable mirrors.

## Synthesized surfaces

- `AGENTS.md` is the CLI entry point, enforcement wrapper and manual-load handoff.
- `skill/SKILL.md` is the executable skill identity and router.
- `claude project/Custom Instructions.md` is a Project-compatible synthesis that replaces filesystem export with the Deliverable Block protocol.
- `claude project/README.md` is the upload and checksum manifest.
