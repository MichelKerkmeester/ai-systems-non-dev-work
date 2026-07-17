---
title: "Product Owner - Sync Manifest"
description: "Manual sync contract between the authoritative sk-product-owner skill and the derived claude.ai Project packaging: inventory, workflow, parity rules, and drift checks."
---

# Product Owner Sync Manifest

> The skill folder is the source of truth. The Claude Project is a derived copy, kept honest by this contract and a checksum manifest.

---

## 1. OVERVIEW

The Product Owner ships in two packagings. The source skill is authoritative and the Claude Project is derived from it.

| Packaging | Role |
| --- | --- |
| `sk-product-owner/` plus `AGENTS.md` | **Source of truth and CLI runtime identity.** `AGENTS.md` applies the Product Owner boundary, export protocol and manual-load fallback before handing identity to `sk-product-owner/SKILL.md`. |
| `claude project/` | **Derived Project package.** `knowledge/` contains versioned source mirrors, `Custom Instructions.md` is a hand-synthesized Claude kernel and `README.md` is the upload and integrity manifest. |

This system has no derive script. Synchronization is manual copy or a simple shell copy only. `sk-product-owner/` remains authoritative and `claude project/knowledge/` remains disposable.

---

## 2. WHEN TO SYNC

Run the workflow in section 5 whenever any of these change:

- A reference or asset under `sk-product-owner/` (workflow rules, templates, examples)
- `sk-product-owner/SKILL.md` (routing, identity, gates, delivery)
- Identity, routing, boundaries, source gates or delivery behavior anywhere, which additionally requires updating `AGENTS.md` and hand-synthesizing the equivalent change into `claude project/Custom Instructions.md`

Keep `AGENTS.md`, `sk-product-owner/SKILL.md` and `claude project/Custom Instructions.md` aligned as one contract. A change to one is a change to all three until proven otherwise.

---

## 3. MANUAL-LOAD CONTRACT

1. Traditional skill loading is optional. A runtime may load the system by reading `sk-product-owner/SKILL.md` directly.
2. Manual load follows the same order as `AGENTS.md`: Skill, Human Voice Rules, DEPTH, one routed Task, Bug, Doc, Story or Interactive reference and its asset, then validation and delivery.
3. Quick is an energy override, not an artifact intent. CLI and Claude routing must preserve Task, Bug, Doc and Story intent under Quick energy.
4. Mode resources load only after their intent is selected: `references/doc-mode.md` plus `assets/doc-templates.md` for Doc, `references/story-mode.md` plus `assets/story-templates.md` for Story, and the matching pairs for Task, Bug and Interactive.

---

## 4. SOURCE-TO-MIRROR INVENTORY

The Project Knowledge package contains exactly these thirteen core mirrors:

| Authoritative source                                        | Claude Project Knowledge mirror                                       |
| -------------------------------------------------------------| -----------------------------------------------------------------------|
| `sk-product-owner/SKILL.md`                                 | `Product Owner - System - Skill - v1.4.0.md`                          |
| `sk-product-owner/references/depth-framework.md`            | `Product Owner - Thinking - DEPTH Framework - v0.202.md`              |
| `sk-product-owner/references/human-voice-rules.md`          | `Product Owner - Rules - Human Voice - EN - v0.210.md`                |
| `sk-product-owner/references/interactive-mode.md`           | `Product Owner - System - Interactive Mode - v0.404.md`               |
| `sk-product-owner/references/task-mode.md`                  | `Product Owner - Templates - Task Mode - v0.303.md`                   |
| `sk-product-owner/references/bug-mode.md`                   | `Product Owner - Templates - Bug Mode - v0.203.md`                    |
| `sk-product-owner/references/doc-mode.md`                   | `Product Owner - Templates - Doc Mode - v0.106.md`                    |
| `sk-product-owner/references/story-mode.md`                 | `Product Owner - Templates - Story Mode - v0.103.md`                  |
| `sk-product-owner/assets/task-templates.md`                 | `Product Owner - Assets - Task Templates - v0.101.md`                 |
| `sk-product-owner/assets/bug-report-template.md`            | `Product Owner - Assets - Bug Report Template - v0.100.md`            |
| `sk-product-owner/assets/doc-templates.md`                  | `Product Owner - Assets - Doc Templates - v0.107.md`                  |
| `sk-product-owner/assets/story-templates.md`                | `Product Owner - Assets - Story Templates - v0.102.md`                |
| `sk-product-owner/assets/interactive-response-templates.md` | `Product Owner - Assets - Interactive Response Templates - v0.102.md` |

In addition, every worked example under `sk-product-owner/assets/examples/<mode>/` (task, bug, doc, story, seventeen files) mirrors byte-identically into `knowledge/` under its own frontmatter `title` plus `.md`, the `Product Owner - Examples - {Mode} - {Name} - v0.100.md` convention. The full Project Knowledge package therefore contains exactly thirty files.

The Product Owner Skill is pinned to `1.4.0`. Claude Custom Instructions are pinned to `1.3.0` and must declare alignment with Skill `1.4.0`. These filenames and versions belong to the current unreleased package: contract corrections made before release reuse the pinned names, replace the derived mirror bytes and regenerate the checksum manifest instead of creating parallel versioned mirrors.

---

## 5. SYNC WORKFLOW

Apply this sequence whenever a source reference, asset, router or delivery contract changes:

1. Finish and validate the authoritative files under `sk-product-owner/`.
2. Copy `sk-product-owner/SKILL.md` and every changed reference or asset into the exact versioned mirror name above. Use `cp -L` for symlinked shared references so Project Knowledge receives file bytes rather than links.
3. Remove superseded versioned mirrors. Do not retain old and new filenames together.
4. If identity, routing, Product Owner boundaries, source gates or delivery changed, update `AGENTS.md` and hand-synthesize the equivalent change into `claude project/Custom Instructions.md`.
5. Update `claude project/README.md` with the exact thirty-file upload inventory (thirteen core plus seventeen examples), paired versions, lookup phrases, smoke tests and sha256-16 values.
6. Compute each checksum from the final file bytes. Never copy a digest from an earlier version.
7. Run the drift checks in section 7 before release.

---

## 6. REQUIRED PARITY

Both packagings must agree on:

- Exact standalone `$doc` and `$d` commands and their false-prefix exclusions
- Quick as energy, including `$quick $doc` and `$doc $quick` equivalence
- Task-about-documentation, Bug-about-documentation, Doc-about-bugs and UI-refinement tie-breaks
- Natural-language product and engineering documentation requests route to Doc without weakening explicit Task or Bug framing
- One consolidated clarification question for ambiguous intent or unresolved source authority
- Guide, Catalog, product or system Behavior reference, Proposal or future-state and Narrative overview shapes
- Current behavior, approved direction, proposal, retired material and unknown source classes
- A non-bypassable conflict gate and proposal-status protection
- Source-backed product and engineering HOW, with technical options, proposals and recommendations labelled according to their actual authority
- No fabricated implementation facts, unsupported authority claims or promotion of a proposal, recommendation, retired source or unknown into current behavior
- ClickUp-native new-document grammar: exact `* * *` dividers, exact `*   ` unordered bullets and definition entries, heading dividers, the balanced heading ladder and adaptive spacer headings
- Refinement preservation for filenames, structure, links, identifiers, tables, status notices, formatting and untouched literal copy unless normalization is explicitly requested
- Story Mode: `$story`/`$s` token rules, tier selection from requirement count and shared machinery, tier named in the response, no ticket header fields, story points or INVEST notes
- New exports at `export/[###] - {task|bug|doc|story}-[description].md` and refined exports at `export/[original-source-filename].md`
- ClickUp handoff consent: both packagings offer ClickUp delivery after export and never write to ClickUp without explicit approval in the current conversation. Approved pushes use markdown-aware parameters (task create `markdown_description`, task update `markdown_content`, documents `content_format` markdown), never the plain description field

CLI uses filesystem export-first delivery. Claude uses one markdown artifact and reports the same export-equivalent path. That delivery difference must not change artifact content, source safety or naming.

---

## 7. DRIFT CHECKS

Verify all of the following before release:

1. The knowledge directory contains exactly the thirty filenames in the inventory: the thirteen core mirrors plus the seventeen example mirrors.
2. Each mirror is byte-identical to its authoritative source. Resolve symlinks while comparing.
3. Every sha256-16 in `claude project/README.md` matches the final bytes, including `Custom Instructions.md`.
4. No Product Owner surface references superseded Skill, mode or template versions.
5. No surface treats Quick as an artifact mode or advertises the old export syntax without the required spaces and artifact type.
6. Routing smoke tests cover Doc commands, false prefixes, product and engineering natural language, Quick order, `skip depth` Raw-energy routing, compatibility tie-breaks and conflicting commands.
7. Doc smoke tests cover all five shapes, source classes, source-backed engineering HOW, conflict blocking, proposal and recommendation labels, refinement fidelity and new-versus-refined filenames.
8. Task, Bug and Story regression checks retain their prior intent, resource loading, templates, exports, task read-back and the ClickUp `content_format` parameter.
9. New-document fixtures use exact `* * *` dividers, exact `*   ` bullets and definition entries, heading dividers, a balanced heading ladder and purpose-fit spacer headings. Refinement fixtures retain source formatting unless normalization is requested.

---

## 8. RELATED DOCUMENTS

| Document | Purpose |
| --- | --- |
| [`sk-product-owner/SKILL.md`](sk-product-owner/SKILL.md) | Executable skill identity and router |
| [`sk-product-owner/README.md`](sk-product-owner/README.md) | Descriptive guide to the skill, its modes and its output contract |
| [`AGENTS.md`](AGENTS.md) | CLI entry point, enforcement wrapper and manual-load handoff |
| [`claude project/Custom Instructions.md`](claude%20project/Custom%20Instructions.md) | Project-compatible kernel replacing filesystem export with the Deliverable Block protocol |
| [`claude project/README.md`](claude%20project/README.md) | Upload, version, lookup, smoke-test and checksum manifest |
