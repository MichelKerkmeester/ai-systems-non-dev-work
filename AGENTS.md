# AI Assistant Framework (Public AI Systems)

> Self-contained repository contract for routing, authority, maintenance,
> synchronization, verification, and Git work.

---

## 1. OVERVIEW

This repository contains a changing fleet of AI systems. Active systems use a
project `AGENTS.md` bootstrap, an authoritative `sk-*` skill package, and, when
present, a derived `claude project/` package.

**The Iron Law:** Work is complete only when the active local contract and the
verification owned by the changed surface have both passed.

| Mode                   | Authority                                                                         |     |     |     |
| ------------------------| -----------------------------------------------------------------------------------| -----| -----| -----|
| **System execution**   | Project `AGENTS.md` -> named `sk-*/SKILL.md` -> routed resources                  |     |     |     |
| **System maintenance** | Root rules + project contracts as requirements + authoritative source + `SYNC.md` |     |     |     |

During System execution, the project exclusively owns persona, clarification,
resource loading, quality gates, export, and response format. During maintenance,
read that identity as requirements but do not adopt its content persona. A named
project, command, workflow, or file is binding unless it is demonstrably blocked.

---

## 2. HARD RULES

1. **Read first.** Read targets and applicable local instructions before editing.
2. **Authority first.** Edit sources, never generated mirrors as sources.
3. **Scope lock.** Change only what was requested; preserve unrelated work.
4. **Verify.** Run the checks owned by the changed surface before completion.

Always prefer current files, manifests, tests, and runtime output over memory.
Separate confirmed evidence from inference. Never fabricate facts, scores,
approvals, test results, deployment state, tool execution, file saves, or runtime
capabilities. Keep secrets and environment values out of files, logs, prompts,
commits, and responses. Use repository-relative documentation paths.

Stop rather than guess when authority is ambiguous, a required source or tool is
missing, source and derived behavior conflict, verification fails, concurrent
work overlaps directly, or progress requires a secret, unsupported approval, or
destructive recovery.

---

## 3. DISCOVERY AND AUTHORITY

Use `Commands/agent-router.md` for dynamic System execution routing when
available. It is not a maintenance orchestrator. Ask the user when no target can
be resolved confidently.

When resolving a project:

1. Read its `AGENTS.md` completely.
2. Read the exact `sk-*/SKILL.md` named there.
3. Load always-required resources, then only routed references and assets.
4. Never use `claude project/Custom Instructions.md` as the CLI identity.

| Surface | Authority |
| --- | --- |
| Project `AGENTS.md` | CLI bootstrap and System execution wrapper |
| `sk-*/` | Behavioral source of truth |
| `SYNC.md` + `claude-project.sync.json` | Packaging and parity contract |
| `claude project/knowledge/` | Derived mirrors |
| `claude project/Custom Instructions.md` | Hand-synthesized claude.ai kernel |
| `package-lock.json`, generated regions, sync journals | Compiler-owned state |
| `export/` | Deliverables, never system source |

Directories without a qualifying project `AGENTS.md` are not automatically AI
systems. Read their local documentation and treat them by their actual role.

---

## 4. EXECUTION AND MAINTENANCE

### System Execution

```text
request
  -> resolve project
  -> read project AGENTS.md and named SKILL.md
  -> load required and routed resources only
  -> follow project mode and clarification rules
  -> verify required tools or documented fallbacks
  -> create, validate, export, and verify the artifact
  -> respond exactly as the project requires
```

Do not wrap a successful project response in a generic repository report. If a
preferred tool is unavailable, use only the fallback or guidance mode allowed by
the project. Never claim execution, verification, save, upload, mutation, or
approval without current evidence.

### Maintenance

1. Read root and project `AGENTS.md`, project `SYNC.md`, the manifest when
   present, and the authoritative `SKILL.md`.
2. Establish source, derived outputs, blast radius, verification, and rollback.
3. Edit authoritative `sk-*` sources first.
4. Update project `AGENTS.md` only when bootstrap, boundaries, loading, export,
   or response behavior changed.
5. Update `Custom Instructions.md` only when the claude.ai kernel needs the same
   semantic change.
6. Use the local compiler for registered mirrors and generated package state.
7. Run project validators and the applicable compiler check.

Do not require an external planning or memory workflow. Create planning artifacts
only when requested or required by a local project contract.

For `Commands/`, preserve frontmatter, arguments, permissions, routing, state,
outputs, and failure behavior; verify referenced tools and paths. Command-only
changes do not require package sync. Do not route or modify `z — Archive/` unless
archival work is explicitly requested.

---

## 5. SYNC AND RELEASE

The local compiler is
`z — Sync Skill to Claude Project/ai-system-sync.cjs`; its registry owns managed
package membership.

For one registered system:

```bash
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" plan --system <id>
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" sync --system <id> --write
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --system <id> --run-validators
```

For registry, schema, compiler, or multi-package changes:

```bash
node "z — Sync Skill to Claude Project/ai-system-sync.cjs" check --all --run-validators
```

After compiler or transaction-engine changes:

```bash
node --test "z — Sync Skill to Claude Project/tests/"*.test.cjs
```

Confirm registry and package paths exist before running the compiler. Report
registry drift instead of creating missing packages or substituting archives.
Never hand-edit declared mirrors, generated regions, package locks, transaction
journals, staged replacements, or recovery backups.

Keep mechanical parity, human kernel review, and live deployment separate. A
compiler check proves neither human review nor deployment. Record review only
after the named human confirms it; claim deployment only with a current receipt
and passing smoke evidence.

---

## 6. VERIFICATION, GIT, AND COMPLETION

| Changed surface        | Minimum verification                                         |
| ------------------------| --------------------------------------------------------------|
| System deliverable     | Project quality gate, export, and project-required read-back |
| Project source/package | Project checks + applicable manifest and compiler checks     |
| Sync compiler          | Full local tests + registry-wide check when paths are valid  |

Before Git mutation, inspect status, relevant diff, and recent history. Stage
only intended files. Do not create commits, branches, tags, pushes, pull
requests, or releases unless explicitly requested. Never bypass hooks,
force-push protected history, or use destructive reset or checkout without
approval.

System execution uses only the project's completion response. Maintenance and
tooling reports must name the source changed, derived effects, checks and results,
remaining human or external steps, and Git state.

Do not claim repository-wide alignment without the applicable registry-wide
check, live deployment without receipt and smoke evidence, or testing when only
static inspection ran. On failure, stop the completion claim, report the exact
failure, fix only in-scope causes, and rerun the complete relevant gate.
