# Product Owner - Claude Project Packaging

Hand-maintained claude.ai **Projects** package for Product Owner Skill v1.4.0. This folder is the editing surface; the live claude.ai Project is push-only because its UI has no repository lock.

## 1. OVERVIEW AND STRUCTURE

```text
claude project/
|-- Custom Instructions.md        <- synthesized Project kernel v1.3.0
|-- README.md                     <- manifest and manual sync contract
`-- knowledge/                    <- upload all thirty files as Project Knowledge
    |-- Product Owner - System - Skill - v1.4.0.md
    |-- Product Owner - Thinking - DEPTH Framework - v0.202.md
    |-- Product Owner - System - Interactive Mode - v0.404.md
    |-- Product Owner - Templates - Task Mode - v0.303.md
    |-- Product Owner - Templates - Bug Mode - v0.203.md
    |-- Product Owner - Templates - Doc Mode - v0.106.md
    |-- Product Owner - Templates - Story Mode - v0.103.md
    |-- Product Owner - Assets - Task Templates - v0.101.md
    |-- Product Owner - Assets - Bug Report Template - v0.100.md
    |-- Product Owner - Assets - Interactive Response Templates - v0.102.md
    |-- Product Owner - Assets - Doc Templates - v0.107.md
    |-- Product Owner - Assets - Story Templates - v0.102.md
    `-- Product Owner - Rules - Human Voice - EN - v0.210.md
```

## Custom Instructions = Skill Kernel, Project-Adapted

`Custom Instructions.md` v1.3.0 is the synthesized claude.ai kernel aligned to **Product Owner Skill v1.4.0**. It preserves backlog WHAT/WHY boundaries, source-backed technical HOW, product and engineering Doc routing, Quick as a separate energy override, DEPTH quality gates, Human Voice Rules, source authority, conflict blocking, ClickUp formatting, refinement fidelity and export-equivalent delivery.

CLI-only mechanics are adapted: filesystem export becomes the **Deliverable Block**, direct resource loading becomes Project Knowledge consultation, and the response reports an export-equivalent path. Refinements keep delivery metadata outside preserved content unless equivalent metadata already exists in the source.

## Source-to-Mirror Map

| Source | Project Knowledge mirror |
| --- | --- |
| `sk-product-owner/SKILL.md` | `Product Owner - System - Skill - v1.4.0.md` |
| `sk-product-owner/references/depth-framework.md` | `Product Owner - Thinking - DEPTH Framework - v0.202.md` |
| `sk-product-owner/references/interactive-mode.md` | `Product Owner - System - Interactive Mode - v0.404.md` |
| `sk-product-owner/references/task-mode.md` | `Product Owner - Templates - Task Mode - v0.303.md` |
| `sk-product-owner/references/bug-mode.md` | `Product Owner - Templates - Bug Mode - v0.203.md` |
| `sk-product-owner/references/doc-mode.md` | `Product Owner - Templates - Doc Mode - v0.106.md` |
| `sk-product-owner/references/story-mode.md` | `Product Owner - Templates - Story Mode - v0.103.md` |
| `sk-product-owner/assets/task-templates.md` | `Product Owner - Assets - Task Templates - v0.101.md` |
| `sk-product-owner/assets/bug-report-template.md` | `Product Owner - Assets - Bug Report Template - v0.100.md` |
| `sk-product-owner/assets/interactive-response-templates.md` | `Product Owner - Assets - Interactive Response Templates - v0.102.md` |
| `sk-product-owner/assets/doc-templates.md` | `Product Owner - Assets - Doc Templates - v0.107.md` |
| `sk-product-owner/assets/story-templates.md` | `Product Owner - Assets - Story Templates - v0.102.md` |
| `sk-product-owner/references/human-voice-rules.md` | `Product Owner - Rules - Human Voice - EN - v0.210.md` |

Every knowledge file is a byte-for-byte source mirror. Each worked example under `sk-product-owner/assets/examples/<mode>/` also mirrors under its frontmatter title plus `.md` (seventeen `Product Owner - Examples - ...` files). Use `cp -L` for `human-voice-rules.md` so claude.ai receives the dereferenced file contents rather than a symlink.

## Paired-Version + Checksum Table

| Document | Sync stamp |
| --- | --- |
| **Custom Instructions** | project kernel v1.3.0 -> Skill v1.4.0, sha16 `f4636ec3e3de4dcb` |
| knowledge/ System - Skill | v1.4.0 -> v1.4.0, sha16 `727f733915ad5bf1` |
| knowledge/ Thinking - DEPTH Framework | v0.202 -> v0.202, sha16 `53a90623f7af5fdd` |
| knowledge/ System - Interactive Mode | v0.404 -> v0.404, sha16 `100160a28f3b6c28` |
| knowledge/ Templates - Task Mode | v0.303 -> v0.303, sha16 `40cccb81fca6155e` |
| knowledge/ Templates - Bug Mode | v0.203 -> v0.203, sha16 `26f153475866468c` |
| knowledge/ Templates - Doc Mode | v0.106 -> v0.106, sha16 `1a37521662e92f86` |
| knowledge/ Templates - Story Mode | v0.103 -> v0.103, sha16 `d2fddc0a5a486c18` |
| knowledge/ Assets - Task Templates | v0.101 -> v0.101, sha16 `4f6dbe14cbf20dd3` |
| knowledge/ Assets - Bug Report Template | v0.100 -> v0.100, sha16 `fc70714e1d48c81c` |
| knowledge/ Assets - Interactive Response Templates | v0.102 -> v0.102, sha16 `70018ea339d29773` |
| knowledge/ Assets - Doc Templates | v0.107 -> v0.107, sha16 `d80d0ee04721ed01` |
| knowledge/ Assets - Story Templates | v0.102 -> v0.102, sha16 `b19e645a83978041` |
| knowledge/ Rules - Human Voice EN | v0.210 -> v0.210, sha16 `f8980baed64ddb1c` |
| knowledge/ Examples - Bug - Backend API - v0.100 | v0.100 -> v0.100, sha16 `b74e056e202c35d1` |
| knowledge/ Examples - Bug - Frontend Visual - v0.100 | v0.100 -> v0.100, sha16 `c3fe8eee08785ee9` |
| knowledge/ Examples - Bug - Mobile Crash - v0.100 | v0.100 -> v0.100, sha16 `b8653729cb076a43` |
| knowledge/ Examples - Bug - Quick Bug - v0.100 | v0.100 -> v0.100, sha16 `d233c8501969e29f` |
| knowledge/ Examples - Doc - Behavior Reference - v0.100 | v0.100 -> v0.100, sha16 `f0c50dcc3311c3ac` |
| knowledge/ Examples - Doc - Catalog - v0.100 | v0.100 -> v0.100, sha16 `b6bff2caa90417bd` |
| knowledge/ Examples - Doc - Guide - v0.100 | v0.100 -> v0.100, sha16 `c6a55af98b79beb9` |
| knowledge/ Examples - Doc - Proposal - v0.100 | v0.100 -> v0.100, sha16 `8b1e347f76537253` |
| knowledge/ Examples - Doc - Quick - v0.100 | v0.100 -> v0.100, sha16 `3360d86b4dc37386` |
| knowledge/ Examples - Doc - README - v0.100 | v0.100 -> v0.100, sha16 `bdc2dfbbf674f45c` |
| knowledge/ Examples - Story - Complex Tier - v0.100 | v0.100 -> v0.100, sha16 `b425a46b71f1bc12` |
| knowledge/ Examples - Story - Medium Tier - v0.100 | v0.100 -> v0.100, sha16 `dd27015fbefdafc3` |
| knowledge/ Examples - Story - Simple Tier - v0.100 | v0.100 -> v0.100, sha16 `2e617608a03468b8` |
| knowledge/ Examples - Task - Quick Task - v0.100 | v0.100 -> v0.100, sha16 `00567c4774ac11f6` |
| knowledge/ Examples - Task - Standard Feature - v0.100 | v0.100 -> v0.100, sha16 `8fb6f9bcd0eb22a8` |
| knowledge/ Examples - Task - Subtask - v0.100 | v0.100 -> v0.100, sha16 `8cd777bbbdfe48d7` |
| knowledge/ Examples - Task - UI Refinement - v0.100 | v0.100 -> v0.100, sha16 `2788b702696c66f2` |

Recompute full hashes with `shasum -a 256`. Never carry an old checksum forward after content changes.

## ClickUp Connector Delivery

When the Project has the claude.ai ClickUp connector, the kernel offers ClickUp delivery after every export and writes nothing without explicit approval in that conversation. Approved pushes preserve formatting through the connector's markdown-aware parameters:

- Task create and update: `markdown_description` on `clickup_create_task` / `clickup_update_task`
- Documents and pages: markdown content with the markdown (`text/md`) content format
- Never the plain `description` field — ClickUp stores it literally and the task shows raw `### About` / `**Checklist**` / `- [ ]` text

Push shape: artifact H1 becomes the task name; Deliverable Block framing and attestation stay out of ClickUp; the body travels verbatim.

## Set Up the Live Project

1. Create or open a claude.ai Project named **Product Owner**.
2. Paste `Custom Instructions.md` into the Project custom instructions field.
3. Remove superseded Project Knowledge uploads.
4. Upload all thirty files in `knowledge/` with filenames unchanged (thirteen core files plus the seventeen Examples mirrors).
5. Run the smoke matrix below.
6. Confirm the Deliverable Block appears first and the reported path follows the create or refinement contract.

## Smoke Matrix

- `$task`, `$bug`, `$doc` and `$d` select their named artifact intents.
- `$quick $doc` and `$doc $quick` select Doc with Quick energy; `$quick` alone retains the Task fallback.
- `$document`, `$docs`, `$debug`, embedded `$d`, `$d.md` and `$doc/path` do not activate Doc; `$d,` does.
- `create a task to document X` stays Task, `bug report about documentation` stays Bug and `document bug behavior` becomes Doc.
- `write engineering documentation for Feed ranking`, `create API docs`, `create architecture docs`, `write a technical recommendation` and `write a configuration runbook` route to Doc.
- Modified artifact requests such as `create developer docs`, `draft endpoint reference`, `write a deployment guide`, `create a debugging guide`, `draft SDK documentation`, `write CLI docs`, `create integration documentation`, `draft infrastructure runbook` and `write service docs` route to Doc.
- `compare ranking approaches and document the recommendation`, `select an API pattern and document the decision` and `analyze the schema options and document it` route to Doc proposals or recommendations.
- `refine the Notification settings guide` and equivalent update or edit requests for a typed or titled document route to Doc refinement.
- `create a task to write engineering docs` stays Task and `bug report about incorrect API documentation` stays Bug.
- Architecture, debugging, operational, legal, compliance and security subject matter may be documented from supplied or verified material; those nouns alone do not trigger refusal.
- `$doc create a task explaining Feed v2` stays Doc because one explicit artifact command wins over natural-language actions.
- `create a task and create a guide` has two independent natural-language artifact actions and produces one consolidated question.
- Conflicting artifact commands produce one consolidated question and no artifact.
- Unresolved source authority, contradictory claims and current-versus-proposed ambiguity block Doc drafting under every energy.
- Guide, Catalog, Behavior reference, Proposal and Narrative overview requests use the matching adaptive shape.
- Source-backed technical HOW is retained. Technical proposals and recommendations remain clearly labelled; they never become current implementation, approved decisions or professional sign-off without authority.
- Proposal and retired labels remain visible; they never become current product or engineering facts.
- New Docs put one blank line between the document title and its first `* * *` divider, then put exact `* * *` dividers immediately after every non-title, non-empty content heading; they use `*   ` unordered bullets and `*   **Term** — definition` for compact definition lists, never `-` unordered bullets.
- A Doc refinement preserves the source's divider, bullet, heading and spacing style unless the user explicitly requests ClickUp normalization.
- A Doc refinement retains its original basename, structure, links, identifiers, tables, literal copy and status markers outside requested scope.
- New Docs report `export/NNN - doc-[description].md`; refinements report `export/[original-source-filename].md`.
- Task and Bug behavior remains compatible with the pinned v0.303 and v0.203 references.
- New Docs balance heading depth: H2 stays a minority of headings and H3/H4 carry the rest, with no all-H2 wall.
- Doc deliveries report the dimensioned verdict: pass or attention for Source safety, Shape fit, ClickUp layout, Readability and Voice.
- `$story` and `$s` select Story; `$stories`, `$sort` and embedded `$s` do not; `create a task to write a story` stays Task.
- A generated story names its tier (Simple, Medium or Complex), keeps the narrative first, uses Given/When/Then scenario bullets, and carries no ticket header fields, story points or INVEST notes.
- With the ClickUp connector present, every export response offers ClickUp delivery and nothing is written to ClickUp without explicit approval in that conversation.
- An approved ClickUp push uses `markdown_description` (never plain `description`) and the created task renders real headings, bold and checkboxes with zero literal `###`, `**` or `- [ ]` text.
- `$task`, `$bug` and `$story` each consult only their own routed knowledge pair (Task Mode + Task Templates, Bug Mode + Bug Report Template, Story Mode + Story Templates) and load no unrelated mode resource.
- `skip depth` explicitly selects Raw energy and skips DEPTH. `$quick` never selects Raw, and Raw never fires without the explicit phrase.
- `$quick $story` and `$story $quick` both select Story with Quick energy, matching the `$quick $doc` / `$doc $quick` order equivalence.
- New Task, Bug and Story exports report `export/NNN - {task|bug|story}-[description].md`. A Task source sync retains the existing task filename.
- An approved task read-back uses `include_markdown_description=true` and confirms the rendered body matches the pushed artifact before delivery is reported complete.
- An approved ClickUp document or page create uses markdown content with the markdown `content_format` value, never the plain `description` field.
- New Doc and Story artifacts use same-level empty spacer headings only in ClickUp-bound content, never in a file export.

## Change Checklist

- Copy changed source files from `../sk-product-owner/SKILL.md`, `../sk-product-owner/references/` and `../sk-product-owner/assets/` to the exact mapped filenames.
- Keep all thirty mirror files byte-identical to their sources, including every file under `sk-product-owner/assets/examples/`.
- Re-derive `Custom Instructions.md` when identity, routing, source safety, template handling, quality or delivery behavior changes.
- Recompute every sha256-16 value and update this README.
- Remove superseded mirror filenames and search for stale version references.
- Re-upload changed files to the live Project and run the smoke matrix.

## Known Notes

- Backlog artifacts remain WHAT/WHY focused. Docs may cover source-backed technical HOW, supplied implementation facts, architecture, APIs, schemas, debugging or operational procedures and clearly labelled technical proposals or recommendations. Never fabricate current facts, evidence, approval, authority or professional sign-off.
- Project Knowledge may be retrieved as chunks, so the kernel repeats the routing, source-safety and delivery gates.
- This package is manually maintained. There is no generated derivation path or repository lock for the live Project.
