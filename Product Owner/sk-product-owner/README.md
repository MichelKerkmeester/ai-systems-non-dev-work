---
title: "sk-product-owner"
description: "Product Owner skill for Barter: routes requests into tasks, bugs, stories, and source-safe product or engineering docs, exports every artifact before responding."
trigger_phrases:
  - "product owner"
  - "$task"
  - "$bug"
  - "$doc"
  - "$story"
version: 1.4.0.0
---

# sk-product-owner

> Turns a half-formed product request into an export-ready task, bug report, user story or source-safe document, without inventing a single fact along the way.

| Core layer | What it adds |
|---|---|
| 🧭 **Smart Router** | Five artifact intents behind exact commands, artifact framing and semantic scoring |
| 🧠 **DEPTH Thinking** | Five phases with energy levels, so a copy tweak and a behavior reference each get fitting rigor |
| 🔒 **Source Safety** | Five claim classes, a conflict gate that stops instead of guessing and a hard no-fabrication rule |
| 📤 **Export-First Delivery** | Every artifact saves to disk and verifies with a read-back receipt before you see a summary |
| 📋 **ClickUp-Native Output** | The exact divider, bullet and heading grammar ClickUp renders correctly, consent-gated on push |
| 📚 **17 Worked Examples** | Filled artifacts on fictional products, loaded one at a time when a template needs a demonstration |

---

## 1. OVERVIEW

### What This Is

This folder is the CLI packaging of the Product Owner system: one skill that turns product requests into five kinds of backlog and documentation artifacts. `SKILL.md` carries the router, the identity and every rule. `references/` holds one workflow file per mode plus the DEPTH framework and Human Voice Rules. `assets/` holds the templates each mode fills and 17 worked examples the model can consult one at a time. A cold model bootstraps through `../AGENTS.md` and from that point on it IS the Product Owner: routing, gates and delivery rules replace generic assistant behavior.

Everything the skill produces lands as a markdown file in `../export/` before any response is written, and a second packaging of the same brain lives in `../claude project/` for claude.ai.

### How a Request Flows

```text
                      YOUR REQUEST
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│                    SMART ROUTER                    │
│                                                    │
│  1. Exact commands    $task $bug $doc $story       │
│  2. Artifact framing  "task to document X" = Task  │
│  3. Semantic topics   weighted intent signals      │
│  4. Interactive       one-question fallback        │
└────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│   MODE REFERENCE + TEMPLATES (+ one worked         │
│   example when shaping benefits from one)           │
└────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│   DEPTH: Discover → Engineer → Prototype           │
│          → Test → Harmonize                        │
│                                                    │
│   Gates: source safety, quality floors,             │
│          Human Voice Rules, ClickUp grammar        │
└────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│   export/ file  +  read-back receipt                │
└────────────────────────────────────────────────────┘
                           │
                           ▼
        ClickUp push, only after an explicit yes
```

---

## 2. QUICK START

Point any capable model at `../AGENTS.md` and ask:

```text
$task define the saved-deal empty state
$bug login returns the wrong error message
$doc document how notification delivery works
$story saved searches for creators
$quick $doc a short guide for rotating the signing key
need acceptance criteria for the new filter panel
```

Exact commands win over wording. Plain language routes by artifact framing: "create a task to document X" is a task, "document bug behavior" is a document. Two conflicting commands trigger one consolidated question instead of a guess.

### Precedence, By Example

| Request | Routes to |
|---|---|
| "Create a task to document Feed v2" | Task |
| "Write a bug report about documentation export naming" | Bug |
| "Document bug behavior for failed payments" | Doc |
| "Document how geo targeting works" | Doc, Behavior reference shape |
| "Recommend a ranking approach and document it" | Doc, labelled Proposal |
| "Write a user story for saved searches" | Story |
| "Create a task to write a story about search" | Task |
| "Refine the settings panel spacing" | Task (UI-refinement override) |
| "Refine the Notification settings guide" | Doc refinement |
| `$task $doc explain Feed v2` | One clarification question, no artifact |

Command tokens are exact and standalone: `$d,` counts, while `$document`, `$docs`, `$debug`, `$d.md` and embedded `$s` text do not. Negated phrasing ("this is not a quick task") never triggers Quick energy.

The response carries the saved path, a compact quality verdict and the receipt line `Verified: read-back succeeded; N lines`. No receipt means the save did not verify and the artifact is undelivered.

---

## 3. THE FIVE MODES

### Task Mode (`$task`, `$t`, `$task --subtask`)

Outcome-focused backlog artifacts that state WHAT should change and WHY it matters, leaving implementation to the delivery team.

| Template | Use |
|---|---|
| Canonical task | Full shape: About, References, Epic, Requirements in numbered groups with checklists |
| Parent task | Coordinates subtasks, each requirement linking one child |
| Subtask | Bounded child scope inside a parent |
| Quick task | Compact About plus one requirement group for small explicit changes |

The canonical shape at a glance:

```markdown
# Task Title

### About

---

What should change, why it matters and the outcome it creates.

### Requirements

---

1.  **First requirement group**

---

Short outcome description.

**Checklist**

- [ ] Literal, verifiable requirement
- [ ] Another one, no trailing period

**User Story**

- **Given:** context
- **When:** action
- **Then:** outcome
```

Structure rules that matter day to day: `### About` and `### Requirements` at H3 with `---` dividers, requirement groups numbered only when there are two or more (a single group keeps its bold title unnumbered), every group carrying a `**Checklist**` of literal `- [ ]` items a QA engineer can verify, and optional Given/When/Then user-story blocks where value needs spelling out. Checklist items never end with a period, assumptions never appear as bracketed tags and out-of-scope platform behavior gets an honest carve-out instead of silence. Refining an existing task keeps its structure, naming and quirks.

### Bug Mode (`$bug`, `$b`)

Consistent defect reports with a fixed shape:

```markdown
# Bug Title

### About

---

Scope, affected users and the report window.

### Bug

---

1. **Observed Behavior:** what actually happens, in the reporter's terms
2. **Expected Behavior:** what should happen instead

**Steps to Reproduce**

1. Exact numbered steps from the reported flow
2. Nothing beyond what the evidence supports

**Evidence** / **Environment** / **QA Checklist**
```

The hard rule is epistemic. No invented root causes, ever. A diagnosis appears only as supplied fact or as an explicitly labelled hypothesis for the team to verify, and every unsupplied field (severity, device, OS, browser, previous working version, screen recording) is marked `Not provided` instead of being filled in. Observed behavior leads with what the user sees, not internal error names, and the fixed four-item QA checklist survives every refinement.

### Doc Mode (`$doc`, `$d`)

Product and engineering documentation in five adaptive shapes, selected by the reader's job rather than the subject:

| Shape | The reader needs to |
|---|---|
| Guide | Follow an order or apply a standard |
| Catalog | Locate and compare repeated entries |
| Behavior reference | Predict what the system does in a given state |
| Proposal | Decide on candidate behavior kept distinct from what shipped |
| Narrative overview | Get oriented: READMEs, statuses, handovers, prose-first |

Every draft passes a source-authority gate first. Claims are classified into five classes, each with its own visible status label:

| Source class | Label the artifact carries |
|---|---|
| Current behavior | `Status: Current behavior — verified for {scope}` |
| Approved direction | `Status: Approved direction — not confirmed as shipped` |
| Proposal | `Status: Proposal — not current product behavior` |
| Retired material | `Status: Retired material — retained for historical context` |
| Unknown | `Status: Unverified — source authority is not established` |

Authority resolves in a fixed order (explicit user designation, source declaration, repository placement, corroboration), recency alone is never authority, and an unresolved contradiction stops the draft with one consolidated question rather than a blended guess.

Three newer layers govern how a doc reads. The Opening Contract: the first screen answers "what is this, who is it for, do I need it" with a shape-specific result (a Guide opens with what you can do after it, a Proposal with the decision sought before any current-state detail). The two-register rule: narrative register (full sentences, why before what) owns overviews, rationale and history, the reference register (terse bullets, tables, identifiers) owns enumerable content, and a section switches register while a paragraph never does. Reader simulation: the finished artifact is tested against its reader's actual job, so a Catalog reader must move index to entry and back in one hop and no Proposal candidate may be mistakable for shipped behavior on a skim. Procedural steps carry source-backed expected results or an explicit unverified flag, never an invented outcome.

Refinement is its own workflow: the existing document is the structural baseline, the basename survives export as `export/{original-filename}.md`, headings, links, identifiers, tables and even typos are preserved, and only the requested change happens. Under `$quick` the same five shapes apply with less optional detail and zero gates dropped.

### Story Mode (`$story`, `$s`)

Narrative user stories developers cut tickets from, at three tiers selected by exactly two signals, requirement count and shared machinery:

| Tier | Shape |
|---|---|
| Simple | One requirement, one or two scenarios total, one-line Readiness gate |
| Medium | Two to four independent requirements, DoR checklist, three scenarios each |
| Complex | Several requirements sharing one mechanism, plus a "How it works" section they all inherit and one `← PRIO` marker |

Each requirement carries a Connextra Story line and named scenario blocks in exact ClickUp form:

```markdown
**Story:** As a subscriber, I want per-component subscriptions,
so that I only hear about the services I depend on.

**Scenario:** Subscriber narrows to one component
*   **Given** a subscriber opened the token-authenticated preferences page
*   **When** they deselect every component except `api`
*   **Then** only `api` incidents generate notifications for them
```

Scenarios run three to five steps with observable outcomes, never ticket fields, story points or INVEST notes. Definition of Ready and Definition of Done bracket the story with honest checkbox state: unchecked sizing means not sprint-ready, and nothing is marked done that is not done. An explicitly stated requirement count outranks whatever the model would prefer to decompose, scenario counts are blocking invariants (a Simple story with three scenarios cannot ship), and a mid-draft tier switch happens only when the two governing signals actually change: requirements re-stating one mechanism reveal shared machinery and move up to Complex, an empty "How it works" section reveals there is none and drops to Medium.

### Interactive Mode (fallback, no command)

Catches genuinely ambiguous requests. Instead of interviewing you across five messages it asks one consolidated question covering every unresolved decision, then waits. The question always names the artifact choice when intent is unclear, the essential missing inputs for the likeliest artifact (purpose and audience for a doc, role and value for a story, evidence for a bug) and any source conflict needing a ruling. Doc conflicts, missing story roles and colliding commands all funnel into the same single-question discipline, and Quick energy may skip preference questions but never this safety question.

### Energy Levels

| Energy | Effect |
|---|---|
| Raw | Explicit "skip depth": skips DEPTH, keeps every safety and delivery gate |
| Quick (`$quick`, `$q`) | Narrowest honest artifact, smart defaults, no gate skipped |
| Standard | Full DEPTH flow, the default |
| Deep | Expanded analysis for complex, high-risk or multi-source work |

`$quick $doc` and `$doc $quick` mean the same thing. Quick trims length and optional sections. It never trims source authority, conflict, factuality or fidelity gates.

### The DEPTH Phases

| Phase | What it does |
|---|---|
| Discover | Establishes value, stakeholders, scope and (for Doc) source authority and claim classes |
| Engineer | Selects the artifact shape, template or tier and the sections that earn their place |
| Prototype | Drafts from the selected scaffold, or preserves the existing structure for a refinement |
| Test | Runs the six quality dimensions, Human Voice Rules, source-fidelity and grammar gates |
| Harmonize | Exports, verifies the read-back and assembles the response with its verdict |

Quality is scored on six dimensions with floors that block export when unmet: completeness, clarity, actionability, accuracy, relevance and mechanism depth. Standard energy runs the full sequence with 3 or more perspectives, Deep runs all 5, Quick collapses to Discover-Prototype-Harmonize with 1-2 perspectives and Raw skips DEPTH entirely while keeping every safety and delivery gate.

---

## 4. OUTPUT FORMAT

### ClickUp Grammar (Doc and Story artifacts)

New Doc and Story artifacts use the grammar ClickUp renders correctly:

```markdown
# Document Title

* * *
> **Status: Current behavior — verified for the web app.**
* * *

## Overview
* * *

Opening prose that orients the reader before any structure appears.

*   **Term** — compact definition entry
*   [ ] checklist item where work is genuinely open

### Subsection
* * *

1.  Ordered steps stay numbered
```

The load-bearing rules: `* * *` dividers only (never `---`), a divider immediately after every content heading with a blank line after it, `*   ` bullets (never hyphens), `*   [ ]` checklists and `*   **Term** — value` definition entries.

### Heading Depth

ClickUp renders H2 enormous, so depth stays balanced. H1 is the title only. H2 anchors a few major sections (Overview and the primary body section) and stays a minority, three or four H2s in a ten-heading document. H3 and H4 carry the working structure and bold paragraph leads replace anything deeper. Empty spacer headings (`##   `) exist only in ClickUp-bound content, never in file exports.

### Readability Floor

One idea per paragraph with the takeaway first. Links sit at the end of the claims they support. Checklist items are short bold imperatives with rationale in the surrounding prose. Lists stay one level deep. Prose is a first-class citizen: a document that reads like a glossary when its reader needed a story has failed, whatever its shape.

### Task and Bug House Format

Task, Bug and Interactive artifacts keep their own format: H3 section headings, `---` dividers, plain `- [ ]` checklists. The ClickUp doc grammar never leaks into them.

---

## 5. CLICKUP DELIVERY

### Consent Comes First

The file export never waits for approval. The ClickUp write always does. When ClickUp tooling is available the export response offers a push as a next step and waits for an explicit yes, every time, even when a previous message already approved one. Nothing is ever pushed unsolicited.

### Transport Contract

Markdown survives a push only through the markdown-aware parameters:

| Operation | Parameter |
|---|---|
| Create task | `markdown_description` |
| Update task | `markdown_content` (connector: `markdown_description`) |
| Create doc or page | `content` with `content_format: "markdown"` |
| Read back | `include_markdown_description=true` |

The plain `description` field stores markdown as literal text: visible `###` and `**` in ClickUp means the wrong parameter was used. The contract is identical across every surface that can reach ClickUp, the claude.ai connector, Code Mode's `clickup_official` tools and the raw v2 API, only the update-parameter name differs as noted above.

### Push Shape

- The artifact's H1 becomes the ClickUp task or doc name and drops out of the body
- Internal HTML comments and attestation metadata never enter ClickUp
- Everything else travels verbatim, dividers, bullets, checklists and tables included
- After a push, the task is read back with markdown enabled to confirm the formatting survived

---

## 6. EXPORT AND RECEIPTS

Every artifact saves before the response:

```text
export/[###] - [artifact-type]-[description].md      (new artifact)
export/[original-source-filename].md                 (refinement)
```

New artifacts take the next free sequence number, and a refinement keeps the original basename so the human can reconcile it against the source. A planned path, a Write result or a remembered draft does not count as delivery. Only a successful Read of the saved file, reported as `Verified: read-back succeeded; N lines`, allows a path to appear in the response. A failed read-back forbids the `Path:` line entirely.

Doc responses add a dimensioned quality verdict, one line per gate group:

```text
- Source safety: pass
- Shape fit: pass
- ClickUp layout: attention — two headings missing the trailing divider
- Readability: pass
- Voice: pass
```

An attention line names the specific item. The verdict reports gate outcomes, it is not a new gate, and source-safety, conflict or export failures block delivery regardless of its wording. In a claude.ai Project, where no filesystem exists, the same artifact arrives as one markdown deliverable labelled with its export-equivalent path.

---

## 7. THE EXAMPLES LIBRARY

`assets/examples/` holds 17 filled artifacts on fictional products, each one instantiating a specific template section named in its frontmatter, so the model pulls exactly one relevant demonstration instead of bulk-reading a folder.

| Fixture | Demonstrates |
|---|---|
| `task/task-example-ui-refinement.md` | Full canonical shape on design-parity work with protected functional scope |
| `task/task-example-standard-feature.md` | Parent-task coordination, shared scope stated once |
| `task/task-example-subtask.md` | Bounded child scope that does not leak sibling state |
| `task/task-example-quick.md` | The compact shape with the unnumbered single requirement group |
| `bug/bug-example-frontend-visual.md` | Visual defect with design-spec evidence |
| `bug/bug-example-backend-api.md` | API defect with request and response evidence |
| `bug/bug-example-mobile-crash.md` | Crash report with device context honestly marked where missing |
| `bug/bug-example-quick.md` | Minimal report that still refuses to invent a root cause |
| `doc/doc-example-guide.md` | One writing standard adapted across four empty-state intents |
| `doc/doc-example-catalog.md` | Mixed-status entries with local labels preserved |
| `doc/doc-example-behavior-reference.md` | A state machine with one unresolved edge kept outside settled rules |
| `doc/doc-example-proposal.md` | Candidate design separated from verified current context |
| `doc/doc-example-readme.md` | Folder README on the Narrative overview shape with an earned reading map |
| `doc/doc-example-quick.md` | A Quick Guide dropping optional sections while every gate survives |
| `story/story-example-simple.md` | One requirement, two scenarios, an honest Readiness line |
| `story/story-example-medium.md` | Three independent safeguards with self-contained scenarios |
| `story/story-example-complex.md` | A shared pipeline section every requirement inherits, with the `← PRIO` marker |

Every example uses invented products (Driftboard, Ledgerly, Prism, Fieldstack and friends), so the fixtures teach form without leaking real Barter material.

---

## 8. DUAL PACKAGING

This folder is authoritative. A second packaging lives in `../claude project/` for upload to a claude.ai Project: `Custom Instructions.md` is a hand-synthesized kernel carrying the router and rules in compact form, and `knowledge/` mirrors `SKILL.md` plus every file in `references/` and `assets/`, thirty files in all, byte-identical and tracked by a sha256-16 manifest. The `human-voice-rules.md` symlink is mirrored dereferenced so the Project receives real file contents. `../SYNC.md` holds the manual sync contract.

---

## 9. FAQ

**What does `$quick` actually skip?**
Length and optional sections. Never source classification, conflict gates, factuality, fidelity rules or the export receipt. A Quick doc is shorter, not looser.

**What happens when my sources disagree?**
The draft stops. You get one consolidated question naming the conflict and the decision needed. Silence never resolves a contradiction.

**What if I state one requirement and the model finds four?**
Your stated count wins. Clauses, edge cases and acceptance checks inside a stated requirement do not create extra requirements.

**Can it write code or debug a live system?**
No. A Doc artifact may carry source-backed code and troubleshooting detail, but the deliverable is always a written artifact.

**Do I need the claude.ai Project packaging?**
No. The CLI packaging is complete on its own. The Project exists for people who work in claude.ai and want the same brain there.

---

## 10. TROUBLESHOOTING

| What you see | What to do |
|---|---|
| Response has no `Verified:` line or `Path:` | The export read-back failed. Treat the artifact as undelivered and rerun the request rather than trusting chat-pasted content |
| Markdown renders as literal text after a ClickUp push | The push used the plain `description` field. Repush with the markdown-aware parameters in section 5 |
| A UI feedback request routed to Bug Mode | "Fix" co-occurred with design-parity wording. Rephrase with explicit polish or Figma-alignment language, or use `$task` directly |
| Doc draft stalls on a clarification question | Purpose, audience, source authority or lifecycle status could not be established safely. Answer the consolidated question in one reply |
| Conflicting artifact commands in one request | Two exact commands such as `$task` and `$doc` both matched. Resend with one command, or answer the consolidated clarification |

---

## 11. RELATED DOCUMENTS

| Document | Purpose |
|---|---|
| [`SKILL.md`](./SKILL.md) | Executable router, DEPTH methodology, rules, and export protocol |
| [`../AGENTS.md`](../AGENTS.md) | CLI bootstrap and identity handoff for a cold model |
| [`../SYNC.md`](../SYNC.md) | Manual sync contract between this skill and the Claude Project mirror |
| [`references/task-mode.md`](./references/task-mode.md) | Task, subtask, and parent-task workflow and structure rules |
| [`references/bug-mode.md`](./references/bug-mode.md) | Bug workflow, evidence handling, and QA checklist |
| [`references/doc-mode.md`](./references/doc-mode.md) | Doc creation, refinement, source-authority, and fidelity rules |
| [`references/story-mode.md`](./references/story-mode.md) | Story tier intelligence and refinement fidelity |
| [`references/interactive-mode.md`](./references/interactive-mode.md) | Single-question intake flow and state handling |
| [`references/depth-framework.md`](./references/depth-framework.md) | DEPTH phases, energy levels, and the six-dimension scoring rubric |
| [`references/human-voice-rules.md`](./references/human-voice-rules.md) | Voice and style rules every artifact passes |
| [`assets/examples/`](./assets/examples/) | 17 worked examples across task, bug, doc, and story on fictional products |
| [`../claude project/README.md`](../claude%20project/README.md) | Upload and integrity manifest for the Claude Project packaging |
