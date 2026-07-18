---
title: "scripts/: AI System Sync Compiler pre-commit delegate"
description: "Opt-in Bash delegate that runs the AI System Sync Compiler CLI check --staged path from the shared pre-commit hook."
trigger_phrases:
  - "AI system sync pre-commit check"
  - "SPECKIT_AI_SYSTEM_SYNC_HOOK"
---

# scripts/: AI System Sync Compiler pre-commit delegate

---

## 1. OVERVIEW

`scripts/` owns one file, `precommit-check.sh`. It delegates staged sync drift checks to `ai-system-sync.cjs` while the current `ENFORCEMENT_MODE='report'` policy keeps the AI-system-sync check report-only.

Current state:

- The script is opt-in through `SPECKIT_AI_SYSTEM_SYNC_HOOK=on`.
- It runs `check --staged` through the CLI and prints non-empty output to standard error.
- It exits 0 in the current report mode even when the CLI reports a non-zero check result.
- It exits 0 when the repo root, CLI file or `node` command is unavailable.

---

## 2. DIRECTORY TREE

```text
scripts/
+-- precommit-check.sh # Opt-in staged-check delegate
`-- README.md          # Local orientation for scripts/
```

---

## 3. KEY FILES

| File | Responsibility |
|---|---|
| `precommit-check.sh` | Checks the opt-in flag, resolves the Git repo root, runs the CLI `check --staged` command and reports the result without blocking in `report` mode. |

---

## 4. BOUNDARIES AND FLOW

| Boundary | Rule |
|---|---|
| Shared hook caller | `../../.opencode/scripts/git-hooks/pre-commit` assigns the tool path and runs it with `bash` only when the file is executable. |
| Shared hook gate | `SPECKIT_SKIP_DOC_MODEL_VALIDATE=1` makes the shared hook exit before it reaches this delegate. |
| Script gate | `SPECKIT_AI_SYSTEM_SYNC_HOOK=on` enables the delegate. Its default is `off`. |
| CLI boundary | The script calls `node "$CLI_PATH" check --staged`. It does not require a `lib/` module directly. |
| Enforcement | `ENFORCEMENT_MODE='report'` prints the CLI result and returns 0. The value is a script constant, not an environment setting. |

Main flow:

```text
git commit
    |
    v
../../.opencode/scripts/git-hooks/pre-commit
    | file is executable
    v
scripts/precommit-check.sh
    | SPECKIT_AI_SYSTEM_SYNC_HOOK=on
    v
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --staged
    |
    v
report to standard error, exit 0
```

---

## 5. ENTRYPOINTS

| Entrypoint | Type | Purpose |
|---|---|---|
| `../../.opencode/scripts/git-hooks/pre-commit` | Shared hook | Calls this script when the file is executable. |
| `precommit-check.sh` | Bash script | Resolves the repo root and delegates to the CLI `check --staged` command. |

---

## 6. VALIDATION

Run from the repository root with the delegate enabled.

```bash
SPECKIT_AI_SYSTEM_SYNC_HOOK=on bash "z — Sync Skill to Claude Project/scripts/precommit-check.sh"
```

Expected result:

```text
[ai-system-sync] check --staged report (mode: report):
check --staged: no staged changes touch a registered package, the registry, or the CLI.
```

The command exits 0. The second line changes when staged paths touch the registry, the CLI or a registered package.

---

## 7. RELATED

- [`../README.md`](../README.md)
- [`../lib/README.md`](../lib/README.md)
- [`../tests/README.md`](../tests/README.md)
- [`../../.opencode/scripts/git-hooks/README.md`](../../.opencode/scripts/git-hooks/README.md)
