---
title: "Product Owner - Templates - Story Mode - v0.103"
description: "Workflow, tier intelligence, refinement fidelity, and delivery standards for creating and refining narrative user stories with Connextra lines, Given/When/Then scenarios, and DoR/DoD gates."
version: "0.103"
contextType: reference
importance_tier: high
trigger_phrases:
  - "story mode"
  - "$story user story"
  - "write a user story"
  - "story with acceptance scenarios"
  - "story tier selection"
  - "refine this story"
---

# Product Owner - Templates - Story Mode - v0.103

Story-mode guidance for narrative user stories that developers cut tickets from. The mode creates or refines story documents that carry an epic-level promise, per-requirement Connextra Story lines, Given/When/Then acceptance scenarios, and Definition of Ready / Definition of Done gates — without turning the story into ticket boilerplate.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides the workflow, tier intelligence, and delivery standards for `$story`, `$s`, and clear natural-language story requests
**Scope:** New story documents at three tiers (Simple, Medium, Complex) and source-safe refinement of existing stories
**Output Path:** `export/[###] - story-[description].md` for a new story or `export/[original-source-filename].md` for a refinement

---

## 1. OVERVIEW

### Purpose

Story Mode turns an outcome and its requirements into a narrative story document. The story stays prose-first: the Overview opens with the Story or User Story promise block, and everything after it explains the problem and the mechanism in prose before any further structured block. The conventional elements it carries — Connextra Story lines, Given/When/Then scenarios, DoR/DoD gates — sharpen the narrative; they never replace it.

### When to Use

Use Story Mode for:

- A new user story covering one feature area with one or more requirements that will become implementation tasks
- Converting product notes, epics, or feature briefs into a story document with acceptance scenarios
- A targeted refinement of an existing story: adding Story lines, scenarios, or gates without restructuring it
- A natural-language request such as "write a user story for X" or "turn this into a story"

Use another mode when the requested artifact is different:

- A single implementation unit with requirements and a checklist is Task Mode
- A defect with evidence and reproduction steps is Bug Mode
- Knowledge documentation (guides, catalogs, behavior references, proposals) is Doc Mode
- "Create a task from this story" is Task Mode using the story as source context

### Commands

- **Primary command:** `$story`
- **Short alias:** `$s`
- **Energy override:** `$quick` or `$q` may accompany either Story command
- **Output:** One markdown story document in the ClickUp-native house format
- **Thinking:** DEPTH applies at the selected energy
- **Interactive behavior:** Ask one consolidated question only when role, value, requirement shape, or tier cannot be established safely

Command recognition belongs to the Product Owner router. `$story` and `$s` are exact, standalone tokens. Strings such as `$stories`, `$sort`, or text that merely contains `$s` are not Story commands.

### Core Rules

- Narrative first: after the Overview's Story or User Story promise block, problem and mechanism are explained in prose before any further structured block; prose is never replaced by ticket boilerplate
- One Connextra Story line per requirement; never ticket header fields (no Type/Epic/Priority/Estimate/Status blocks, no story points, no INVEST notes)
- Acceptance criteria are named **Scenario:** blocks with `*   **Given/When/Then/And**` ClickUp bullets, three to five steps, observable outcomes
- The DoR/DoD bracket gates the story's life; boxes reflect honest state (unchecked sizing means not sprint-ready)
- Preserve technical identifiers exactly; flag oddities in prose instead of normalizing them
- User-supplied context is the main source of truth; never invent requirements or evidence
- Apply every gate under Quick energy

---

## 2. TIER INTELLIGENCE

Select the tier from two signals: requirement count and shared machinery.

- **Simple** — one requirement, a small change (single behavior, copy tweak, one rule). Compact overview, one spec block, one or two scenarios, a one-line Readiness gate, short DoD.
- **Medium** — two to four independent requirements, no shared machinery. Full overview with promise bullets, DoR checklist, per-requirement blocks, DoD.
- **Complex** — several requirements sharing one mechanism (a pipeline, rule ladder, state machine, lifecycle). Medium plus a "How {mechanism} works" section every requirement inherits, mechanism-following spec blocks, and one `← PRIO` marker.

Inference rules:

- When the user explicitly states a requirement count, that count is authoritative unless the user later changes it. Clauses, actions, states, edge cases and acceptance checks inside a stated requirement do not create extra requirements. If supplied source explicitly labels a conflicting set of separate requirements, include the conflict in the one consolidated intake question; never silently override the user's count.
- Mid-draft tier switches remain required when the governing signals actually change. When count was inferred, discovery may still change it; shared machinery may still switch Medium and Complex. Scenario pressure alone is not a count change and cannot override an explicit count.
- Infer the tier silently when the request makes the two signals clear; say which tier was chosen in the response
- When requirement count or shared machinery is genuinely unclear, fold the tier question into the one consolidated intake question; do not ask a separate round
- Requirement count and shared machinery are the ONLY tier signals, at intake and during drafting alike. Mid-draft switches beat bent scaffolds, and every switch is a change in those signals: requirements re-stating one mechanism reveal shared machinery (move up to Complex); an empty "How it works" section reveals there is none (drop to Medium); a Simple story that needs a third scenario usually hides a second requirement — split it out, and the new count moves the story to Medium
- Quick energy biases toward the narrowest tier that honestly fits; it never drops gates

The three tier scaffolds and their filling notes live in [story-templates.md](../assets/story-templates.md).

---

## 3. CREATE WORKFLOW

### Step 1: Establish the Contract

Identify: the user role and the value clause; the requirements (count, names, technical identifiers); whether requirements share a mechanism; supplied evidence, links, or source material; requested depth or Quick energy. If role, value, or requirement shape cannot be established safely, ask the one consolidated question and wait.

### Step 2: Select the Tier

Apply the tier intelligence above. State the chosen tier in the delivery response.

### Step 3: Draft From the Tier Scaffold

- Epic-level User Story with promise bullets (Medium/Complex) or a single Story line (Simple)
- Problem and Solution in prose; Documentation link when supplied
- Complex only: the "How {mechanism} works" section, written once
- Per requirement: Story line, context prose, spec block with exact expressions in backticks, "Which means that" implications, then scenarios (normal path, degraded or exception path, hard guarantee)
- Definition of Ready with honest checkbox state; Definition of Done for the closing gate

### Step 4: Validate and Export

- Run the quality checklist below and Human Voice Rules
- Validate ClickUp grammar: `* * *` dividers, `*   ` bullets, `*   [ ]` checklists, spacers at the closing section's level, `1\.` numbering, at most one `← PRIO`
- Validate heading depth: H1 title only, H2 on the major section anchors and a minority of headings, H3 per requirement, H4 or bold leads below
- Count `**Scenario:**` headings before export. Simple must have one or two in the entire artifact. If it has three or more, remove padding or merge overlapping proof; re-tier only when the requirement-count rule establishes a genuine second requirement. Otherwise block export.
- Save using the story export contract and verify the file exists before responding

---

## 4. REFINEMENT WORKFLOW

The existing story is the structural baseline. Adding conventional elements never restructures the document — this is the settled lesson from the Fv2.5 Rulesets review, where a full restructure into ticket blocks lost to the original narrative.

- Preserve the source's structure, headings, prose, spec blocks, identifiers, links, and formatting outside the requested change
- Add Story lines, scenarios, or gates in place, in the source's own grammar
- Keep known identifier oddities verbatim and flag them in prose
- Export a copy with the original source basename; never overwrite the supplied source
- A refinement that requests restructuring needs explicit authorization, exactly as in Doc Mode

---

## 5. DELIVERY STANDARDS

### Artifact Rules

- One complete ClickUp-native markdown story per request
- No ticket header blocks, story points, or INVEST notes anywhere
- Scenario steps carry observable outcomes; internal state belongs in the spec block
- The story's H1 is `Story - {Version/Area} - {Feature} - {Name}`

### Export Contract

New story: `export/[###] - story-[description].md` (next available number, short hyphenated description). Refined story: `export/[original-source-filename].md`. Never overwrite the source.

### Response Contract

Respond with the saved path, the chosen tier, a compact quality summary, and a brief next step. In a Claude Project runtime, deliver one markdown artifact with the export-equivalent path. When ClickUp tooling is available, offer ClickUp delivery and wait for explicit approval, per the skill's ClickUp handoff rule.

---

## 6. QUALITY CHECKLIST

- [ ] Tier matches requirement count and shared-machinery signals, and the response names it?
- [ ] Narrative present: Story or User Story block opens the Overview, with problem and mechanism in prose before any further structured block?
- [ ] Every requirement has a Connextra Story line with a real value clause?
- [ ] Scenarios named, 3-5 steps, observable outcomes, exact expressions in backticks?
- [ ] DoR state honest; DoD present; no ticket fields, points, or INVEST anywhere?
- [ ] ClickUp grammar passes; identifiers preserved exactly; oddities flagged in prose?
- [ ] Refinement preserved the source structure and basename?
- [ ] Reader simulation passes: a developer could cut a ticket from each requirement without asking a follow-up question?
- [ ] Export exists and was verified before the response?

---

## 7. ERROR RECOVERY

- **Unclear tier:** fold tier selection into the one consolidated question; never ask it as a second round
- **Requirements arrive mid-draft:** switch tiers rather than bending the scaffold; say so in the response
- **Story-shaped request with no requirements:** ask for the outcome and at least one concrete requirement; a story with zero requirements is an epic brief, not a story
- **Source story conflicts with supplied context:** user context wins; flag the difference in prose rather than silently merging

Final reminders: narrative first; scenarios prove the promise; gates stay honest; tiers switch instead of bending; export first and verify.
