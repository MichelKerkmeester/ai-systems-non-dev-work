# Product Owner - Claude Project packaging

Hand-maintained claude.ai **Projects** copy of the CLI Product Owner system. The `skill/` folder is the source of truth; this folder is the upload package for claude.ai.

## Structure

```text
claude project/
├── Custom Instructions.md
├── README.md
└── knowledge/
    ├── Product Owner - System - Skill - v1.1.0.md
    ├── Product Owner - Thinking - DEPTH Framework - v0.201.md
    ├── Product Owner - System - Interactive Mode - v0.402.md
    ├── Product Owner - Templates - Task Mode - v0.301.md
    ├── Product Owner - Templates - Bug Mode - v0.201.md
    ├── Product Owner - Assets - Task Templates - v0.100.md
    ├── Product Owner - Assets - Bug Report Template - v0.100.md
    ├── Product Owner - Assets - Interactive Response Templates - v0.100.md
        └── Product Owner - Rules - Human Voice - EN - v0.210.md
```

## Upload

1. Create or open a claude.ai Project named **Product Owner**.
2. Paste `Custom Instructions.md` into the Project Custom Instructions field.
3. Upload every file under `knowledge/` and `knowledge/` as Project Knowledge.
4. Smoke test `$task`, `$bug`, `$quick` and one ambiguous request. Confirm the Deliverable Block appears first and includes the attestation footer.

## Paired Versions

| Doc | Version | sha256 (16) |
|---|---|---|
| Custom Instructions | v1.1.0 | `ee1054145966e2b3` |
| knowledge/ System - Skill | v1.1.0 | `4d13bef37e877371` |
| knowledge/ Thinking - DEPTH Framework | v0.201 | `7d8ef9f46073f6f0` |
| knowledge/ System - Interactive Mode | v0.402 | `8c0d30878b93a544` |
| knowledge/ Templates - Task Mode | v0.301 | `ee1a13e950797d2c` |
| knowledge/ Templates - Bug Mode | v0.201 | `4a9cb1d190325131` |
| knowledge/ Assets - Task Templates | v0.100 | `2f6bd7da82af3fca` |
| knowledge/ Assets - Bug Report Template | v0.100 | `70b96e9efcb036fc` |
| knowledge/ Assets - Interactive Response Templates | v0.100 | `2d705a204ed9827d` |
| knowledge/ Rules - Human Voice EN | v0.210 | `f8980baed64ddb1c` |

## Sync

On any `skill/references/` or `skill/assets/` change, re-copy the relevant mirror, update this table and re-upload changed Project Knowledge. Use `cp -L` for global symlinks so claude.ai receives file contents, not links.
