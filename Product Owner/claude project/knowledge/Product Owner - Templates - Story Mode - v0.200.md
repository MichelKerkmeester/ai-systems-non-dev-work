---
title: "Product Owner - Templates - Story Mode - v0.200"
description: "Workflow, tier intelligence, refinement fidelity and delivery standards for creating and refining narrative user stories in the Barter house format: a blockquote preamble, About overview, requirement checklists, numbered Given/When/Then acceptance criteria with a Mark-as-done checkbox, and optional rigor (value lines, Rule blocks, DoR/DoD, shared-mechanism section)."
version: "0.200"
contextType: reference
importance_tier: high
trigger_phrases:
  - "story mode"
  - "$story user story"
  - "write a user story"
  - "story with acceptance criteria"
  - "story tier selection"
  - "refine this story"
---

# Product Owner - Templates - Story Mode - v0.200

Story-mode guidance for narrative user stories that developers cut tickets from. The mode creates or refines story documents in the Barter house format: a blockquote preamble, an About overview carrying the User Story promise plus Problem and Solution, Requirements where each requirement has a short prose lead and a build checklist, and Acceptance criteria written as numbered Given/When/Then blocks each closed with a Mark-as-done checkbox. Heavier machinery (per-requirement value lines, exact Rule blocks, Definition of Ready/Done gates, a shared-mechanism section) is available as optional enrichment, not required.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides the workflow, tier intelligence and delivery standards for `$story`, `$s`, and clear natural-language story requests
**Scope:** New story documents at three sizes (Simple, Medium, Complex) and source-safe refinement of existing stories
**Output Path:** `export/[###] - story-[description].md` for a new story or `export/[original-source-filename].md` for a refinement

---

## 1. OVERVIEW

### Purpose

Story Mode turns an outcome and its requirements into a narrative story document in the house format. The story stays prose-first: it opens with the blockquote preamble and an `### About` block carrying the User Story promise, the Problem and the Solution in prose before any requirement detail. The conventional elements it carries, the requirement checklists and the numbered Given/When/Then acceptance criteria, sharpen the narrative; they never replace it.

### When to Use

Use Story Mode for:

- A new user story covering one feature area with one or more requirements that will become implementation tasks
- Converting product notes, epics or feature briefs into a story document with acceptance criteria
- A targeted refinement of an existing story: adding requirements, acceptance criteria or gates without restructuring it
- A natural-language request such as "write a user story for X" or "turn this into a story"

Use another mode when the requested artifact is different:

- A single implementation unit with requirements and a build checklist is Task Mode
- A defect with evidence and reproduction steps is Bug Mode
- Knowledge documentation (guides, catalogs, behavior references, proposals) is Doc Mode
- "Create a task from this story" is Task Mode using the story as source context

Research and feasibility spikes: work whose deliverable is a decision rather than shipped behavior (requirements phrased as decide, confirm or document, and acceptance that asserts a documented outcome rather than an observable system change) is usually Task Mode, or Doc Mode when the deliverable is a written recommendation. When the team prefers to keep a spike on the story surface, write it in the house shape with acceptance criteria that assert the documented decision (for example "the chosen source, limits and access requirements are documented in ClickUp"), and skip the buildable requirement checklists.

### Commands

- **Primary command:** `$story`
- **Short alias:** `$s`
- **Energy override:** `$quick` or `$q` may accompany either Story command
- **Output:** One markdown story document in the Barter house format
- **Thinking:** DEPTH applies at the selected energy
- **Interactive behavior:** Ask one consolidated question only when role, value, requirement shape or tier cannot be established safely

Command recognition belongs to the Product Owner router. `$story` and `$s` are exact, standalone tokens. Strings such as `$stories`, `$sort`, or text that merely contains `$s` are not Story commands.

### Core Rules

- Narrative first: the story opens with the blockquote preamble and an `### About` block (User Story promise, Problem, Solution in prose) before any requirement detail; prose is never replaced by ticket boilerplate
- Never ticket header fields (no Type/Epic/Priority/Estimate/Status blocks, no story points, no INVEST notes)
- Requirements carry a short prose lead and a `**Checklist**` of buildable `- [ ]` items
- Acceptance criteria are numbered `1.` bold-title blocks with `*   **Given/When/Then/And**` bullets, observable outcomes, and a closing `- [ ] _Mark as done, if the criteria are met_`
- The default shape is lean; the optional enrichments (value lines, Rule blocks, Which-means-that, Definition of Ready/Done, shared-mechanism section) are added only when a story earns them
- Preserve technical identifiers exactly; flag oddities in prose instead of normalizing them
- User-supplied context is the main source of truth; never invent requirements or evidence
- Apply every gate under Quick energy

---

## 2. TIER INTELLIGENCE

Every tier uses the same house shape. The tier decides how much shape and which optional enrichments earn their place, from two signals: requirement count and shared machinery.

- **Simple** — one requirement, a small change (single behavior, copy tweak, one rule). House shape trimmed to one requirement and one or two acceptance criteria. Optional enrichments rarely needed.
- **Medium** — two to four independent requirements, no shared machinery. Full About, a requirement block each, acceptance criteria per requirement. Add the Documentation link and Definition of Ready/Done gates when the story warrants a readiness or done bracket.
- **Complex** — several requirements sharing one mechanism (a pipeline, rule ladder, state machine, lifecycle). Add the optional `### How {mechanism} works` section once, mark one requirement `← PRIO`, and let per-requirement value lines and Rule blocks earn their place.

Inference rules:

- When the user explicitly states a requirement count, that count is authoritative unless the user later changes it. Clauses, actions, states, edge cases and acceptance checks inside a stated requirement do not create extra requirements. If supplied source explicitly labels a conflicting set of separate requirements, include the conflict in the one consolidated intake question; never silently override the user's count.
- Mid-draft tier switches remain valid when the governing signals actually change: requirements re-stating one mechanism reveal shared machinery (move to Complex); an empty "How it works" section reveals there is none (drop to Medium); a Simple story that grows a second requirement moves to Medium.
- Infer the tier silently when the request makes the two signals clear; say which tier was chosen in the response.
- When requirement count or shared machinery is genuinely unclear, fold the tier question into the one consolidated intake question; do not ask a separate round.
- Requirement count and shared machinery are the ONLY tier signals. Acceptance-criteria pressure alone is not a count change and cannot override an explicit count.
- Quick energy biases toward the leanest tier that honestly fits; it never drops gates that a story genuinely needs.

The house shape, its sizing notes and the optional-enrichment catalog live in [story-templates.md](../assets/story-templates.md).

---

## 3. CREATE WORKFLOW

### Step 1: Establish the Contract

Identify: the user role and the value clause; the requirements (count, names, any technical identifiers); whether requirements share a mechanism; supplied evidence, links or source material; requested depth or Quick energy. If role, value or requirement shape cannot be established safely, ask the one consolidated question and wait.

### Step 2: Select the Tier

Apply the tier intelligence above. State the chosen tier in the delivery response.

### Step 3: Draft From the House Shape

- The blockquote preamble, then an `### About` block: the User Story promise bullets, then Problem and Solution in prose, plus a Documentation link when supplied
- Complex only: the optional `### How {mechanism} works` section, written once
- `### Requirements`: each requirement a bold name, a short prose lead, and a `**Checklist**` of buildable `- [ ]` items; the Mention line when Product may need to weigh in
- `### Acceptance criteria`: numbered Given/When/Then blocks with observable outcomes and a Mark-as-done checkbox, in requirement order
- Optional enrichments (per-requirement value line, Rule block, Which-means-that, Definition of Ready/Done, `← PRIO`) only where they earn their place

### Step 4: Validate and Export

- Run the quality checklist below and the Human Voice Rules
- Validate house grammar: the blockquote preamble; `* * *` dividers after each content heading; `*   ` bullets for prose and Given/When/Then; `- [ ]` checklists; `1.` numbering on acceptance criteria; at most one `← PRIO`
- Validate heading depth: H1 title only; major sections anchored at H3; requirement names and spec sub-blocks as bold leads
- Confirm every acceptance criterion traces back to a requirement, and that the set covers the normal path, the edges that matter, and the guarantee the story exists to keep
- Save using the story export contract and verify the file exists before responding

---

## 4. REFINEMENT WORKFLOW

The existing story is the structural baseline. Adding conventional elements never restructures the document. This is the settled lesson from the Fv2.5 Rulesets review, where a full restructure into ticket blocks lost to the original narrative.

- Preserve the source's structure, headings, prose, checklists, identifiers, links and formatting outside the requested change
- Add requirements, acceptance criteria or gates in place, in the source's own grammar
- Keep known identifier oddities verbatim and flag them in prose
- Create-time shape checks do not fire on a source-preserving refinement. A refined house story keeps its own acceptance-criteria shape (numbered blocks, or a source's `**Scenario:**` blocks); do not convert one into the other, and do not block export because the source uses a different acceptance shape than a new story would
- Preserve the source's own overview, requirement leads and build checklists. Refining a house-format draft protects its narrative; it does not oblige you to strip its build checklists, but it also does not oblige you to keep placeholder or malformed content (a broken H1, a criterion with no backing requirement) that the source clearly got wrong. Fix those in place and flag the fix
- Export a copy with the original source basename; never overwrite the supplied source
- A refinement that requests restructuring needs explicit authorization, exactly as in Doc Mode

---

## 5. DELIVERY STANDARDS

### Artifact Rules

- One complete house-format markdown story per request
- No ticket header blocks, story points or INVEST notes anywhere
- Acceptance-criteria steps carry observable outcomes; internal state belongs in a requirement's prose or optional Rule block
- The story's H1 is `Story - {Platform/Area} - {Feature} - {Name}`, where `{Platform/Area}` is a house short code (`BO`, `BE`, `FE`) or named area, optionally with a version tag

### Export Contract

New story: `export/[###] - story-[description].md` (next available number, short hyphenated description). Refined story: `export/[original-source-filename].md`. Never overwrite the source.

### Response Contract

Respond with the saved path, the chosen tier, a compact quality summary and a brief next step. In a Claude Project runtime, deliver one markdown artifact with the export-equivalent path. When ClickUp tooling is available, offer ClickUp delivery and wait for explicit approval, per the skill's ClickUp handoff rule.

---

## 6. QUALITY CHECKLIST

- [ ] Tier matches requirement count and shared-machinery signals, and the response names it?
- [ ] Narrative present: blockquote preamble and `### About` block open the story, with the User Story promise, Problem and Solution in prose before any requirement detail?
- [ ] Every requirement has a short prose lead and a build checklist; the epic-level User Story carries a real value clause?
- [ ] Acceptance criteria numbered, Given/When/Then with observable outcomes, exact expressions in backticks, each closed with a Mark-as-done checkbox, each tracing back to a requirement?
- [ ] Optional enrichments (value lines, Rule blocks, DoR/DoD, shared-mechanism section) present only where they earn their place; no ticket fields, points or INVEST anywhere?
- [ ] House grammar passes; identifiers preserved exactly; oddities flagged in prose?
- [ ] Refinement preserved the source structure and basename?
- [ ] Reader simulation passes: a developer could cut a ticket from each requirement without asking a follow-up question?
- [ ] Export exists and was verified before the response?

---

## 7. ERROR RECOVERY

- **Unclear tier:** fold tier selection into the one consolidated question; never ask it as a second round
- **Requirements arrive mid-draft:** switch tiers rather than bending the shape; say so in the response
- **Story-shaped request with no requirements:** ask for the outcome and at least one concrete requirement; a story with zero requirements is an epic brief, not a story
- **Research or feasibility spike:** decide/confirm/document work with no buildable behavior usually routes to Task Mode, or Doc Mode for a written recommendation; keep it on the story surface only when the team prefers, writing acceptance that asserts the documented decision
- **Source story conflicts with supplied context:** user context wins; flag the difference in prose rather than silently merging

Final reminders: narrative first; acceptance criteria prove the promise and trace to requirements; keep the default lean and reach for optional rigor only when earned; tiers change size, not shape; export first and verify.
