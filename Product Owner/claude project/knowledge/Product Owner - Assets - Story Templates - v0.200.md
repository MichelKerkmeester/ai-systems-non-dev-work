---
title: "Product Owner - Assets - Story Templates - v0.200"
description: "One house-format story scaffold (blockquote preamble, About, Requirements with checklists, numbered Given/When/Then acceptance criteria with a Mark-as-done checkbox) sized to Simple/Medium/Complex, plus a catalog of optional enrichments (value lines, Rule blocks, Which-means-that, DoR/DoD, shared-mechanism section)."
version: "0.200"
contextType: asset
importance_tier: high
trigger_phrases:
  - "story templates"
  - "story house format"
  - "simple story template"
  - "medium story template"
  - "complex story template"
  - "story optional enrichments"
---

# Product Owner - Assets - Story Templates - v0.200

One house-format story shape for every story, sized to the requirement count, with heavier machinery available as optional enrichments rather than required. Refinements preserve the supplied story's existing structure instead of imposing this shape.

The house format is the shape the Barter team already writes in ClickUp: a blockquote preamble, an `### About` overview, `### Requirements` where each requirement carries a short prose lead and a build checklist, and `### Acceptance criteria` as numbered Given/When/Then blocks each closed with a Mark-as-done checkbox. That default is deliberately lean. The optional enrichments in section 4 add rigor (per-requirement value lines, exact Rule blocks, Definition of Ready/Done gates, a shared-mechanism section) only when a story earns it.

---

## 1. SHARED RULES

These apply to every story:

- Narrative first: the story opens with the blockquote preamble and an `### About` block that carries the User Story promise, the Problem and the Solution in prose before any requirement detail. Prose is never replaced by ticket boilerplate.
- No ticket header fields (no Type/Epic/Priority/Estimate/Status), no story points, no INVEST notes anywhere.
- Requirements carry a short prose lead and a `**Checklist**` of buildable `- [ ]` items. The checklist is the story's handoff to Tasks; keep items outcome-shaped, not step-by-step engineering.
- Acceptance criteria are numbered `1.` bold-title blocks. Each holds `*   **Given/When/Then/And**` ClickUp bullets with observable outcomes, and closes with `- [ ] _Mark as done, if the criteria are met_`. Cover the normal path, the edges that matter, and the guarantee the story exists to keep. Every criterion should trace back to a requirement.
- ClickUp-native grammar: `* * *` dividers immediately after each content heading, `*   ` unordered bullets for prose and Given/When/Then, `- [ ]` checklists for requirement checklists and the per-criterion Mark-as-done line, `1.` numbering for acceptance criteria, and same-level spacer headings (`###   `) between major sections.
- Heading depth: H1 is the story title only. Major sections (`### About`, `### Requirements`, `### Acceptance criteria`, and any optional gate or mechanism section) anchor at H3, because ClickUp renders H1 and H2 very large. Requirement names and spec sub-blocks use bold paragraph leads, not deeper headings.
- Preserve technical identifiers exactly, even when they look misspelled or use local notation (for example `Below 2.500 followers`). Flag oddities in prose instead of normalizing them.
- Exact expressions, thresholds, field names and event names travel in backticks.

### The H1 title

`# Story - {Platform/Area} - {Feature} - {Name}`

`{Platform/Area}` names the surface the work lands on, using the house short codes plus an optional product or version tag:

- `BO` Backoffice, `BE` Backend, `FE` Frontend, or a named area when no short code fits (for example `Managed Partners`, `Notifications`).
- Combine with a version tag when the work belongs to one, for example `Fv2.5`.

Worked house titles: `Story - BO - Managed Partners - Better 'Creator' Search`, `Story - BE - Managed Partners - Automate IG & TT Metric Collection`, `Story - BO - Fv2.5 - Promo's - Country Specific Targeting`. The short-code set is open; add an area name when Backoffice, Backend or Frontend does not describe the surface.

### The blockquote preamble

Every new story opens with the native ClickUp preamble, verbatim:

```markdown
> _A story is used to define product requirements, acceptance criteria, etc._
> _Use it as the foundation for Tasks that work towards fulfilling the acceptance criteria._
```

---

## 2. TIER SELECTION

Every tier uses the same house shape from section 3. The tier decides how much shape and which optional enrichments earn their place, from two signals: requirement count and shared machinery.

- **Simple** — one requirement, a small change (single behavior, copy tweak, one rule). Trim to one requirement and one or two acceptance criteria. Optional enrichments are rarely needed.
- **Medium** — two to four independent requirements sharing no machinery. Full About, a requirement block each, acceptance criteria per requirement. Reach for the Documentation link and the Definition of Ready/Done gates when the story warrants a readiness or done bracket.
- **Complex** — several requirements sharing one mechanism (a pipeline, rule ladder, state machine, lifecycle). Add the optional `### How {mechanism} works` section once and let every requirement lean on it, and mark one requirement `← PRIO`. Per-requirement value lines and Rule blocks earn their place here.

An explicit user-stated requirement count outranks model decomposition. Clauses, actions, states, edges and acceptance checks inside a stated requirement do not create extra requirements. When the count is inferred, mid-draft discovery may still change it, and shared machinery may still move a story between Medium and Complex; say so in the response when a tier switch happens.

---

## 3. THE HOUSE STORY SHAPE

The default shape for every story. Simple trims it, Complex adds the optional shared-mechanism section, but the skeleton is the same.

```markdown
# Story - {Platform/Area} - {Feature} - {Name}

> _A story is used to define product requirements, acceptance criteria, etc._
> _Use it as the foundation for Tasks that work towards fulfilling the acceptance criteria._

### About
* * *
{One or two lines of context: what this surface does today and where the work sits.}

**Problem**
* * *
{What breaks or is missing today}:
*   {Observable failure 1}
*   {Observable failure 2}

**Solution**
* * *
{One line naming the change, then the controls or behaviors it introduces}:
*   {Change 1}
*   {Change 2}

**User Story**
* * *
As a {end-user or team role}:
*   I want {capability 1}, so that {benefit 1}
*   I want {capability 2}, so that {benefit 2}
* * *
###   

### Requirements
* * *
_Mention_ [@{owner}]({profile link}) _if design input from Product is needed_

**{Requirement name}**
* * *
{One or two lines of prose: what the user expects here, and what this requirement does about it.}

**Checklist**
- [ ] {Buildable, outcome-shaped item}
- [ ] {Buildable, outcome-shaped item}
* * *

**{Next requirement name}**
* * *
{Prose lead.}

**Checklist**
- [ ] {Item}
* * *
###   

### Acceptance criteria
* * *
All acceptance criteria below must be met, or discuss and rescope any that cannot be met.

1. **{Criterion name}**
* * *
*   **Given** {precondition, with exact expressions in `backticks`}
*   **When** {the user action or system event}
*   **Then** {the observable outcome}
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

2. **{Next criterion name}**
* * *
*   **Given** {precondition}
*   **When** {trigger}
*   **Then** {observable outcome}
*   **And** {additional outcome, only when the criterion needs it}
* * *
- [ ] _Mark as done, if the criteria are met_
* * *
```

Notes:

- Simple drops the promise bullets down to a single `I want ... so that ...` line if there is only one capability, keeps one requirement, and stops at one or two acceptance criteria.
- The Mention line is optional but house-standard; keep it when Product may need to weigh in, drop it when the requirement is settled.
- Acceptance criteria are numbered per story, not grouped under each requirement. Keep them in requirement order so the trace is obvious.

---

## 4. OPTIONAL ENRICHMENTS

Add these only when a story earns them. None is required. A Simple story usually uses none; a Complex story usually uses several.

### 4.1 Documentation link

A link to the governing spec, placed inside `### About` after Solution or at the end of the block.

```markdown
**Documentation**
* * *
[{governing doc}]({url})
```

### 4.2 Per-requirement value line

A Connextra value line under a requirement name, when the requirement's own "why" is not obvious from the About promise. Connextra is the `As a {role}, I want {capability}, so that {benefit}` form.

```markdown
**{Requirement name}**
* * *
**Story:** As a {role} {using this specific part}, I want {capability}, so that {benefit in the user's terms}.

{Prose lead.}
```

### 4.3 Rule / spec block

For a requirement that hinges on an exact threshold, expression or field. State each rule with the exact value in backticks and one plain-language line.

```markdown
**Rule**
* * *
**{Rule name}:** `{exact expression or threshold}`
{One plain-language line explaining it.}
* * *
**{Second rule}:** `{exact expression}`
{One plain-language line.}
* * *
```

### 4.4 Which means that

Implications drawn from a Rule block, stated from the user's view. Use it to state a guarantee the acceptance criteria then prove.

```markdown
Which means that:
*   {The hard guarantee, from the user's view}
*   {Behavior when the normal path comes up short}
*   {A trade-off the requirement accepts}
```

### 4.5 Definition of Ready

A readiness gate, placed after `### About` or just before `### Requirements`. Boxes reflect honest state; an unchecked sizing box means the story is not sprint-ready.

```markdown
### Definition of Ready
* * *
Check off as met; pull requirements into a sprint only when every box is checked:
- [ ] Every requirement has a clear value clause and testable acceptance criteria
- [ ] Dependencies identified ({service, API or data this relies on is live, or confirmed absent})
- [ ] Sized by the team and each requirement fits comfortably in a sprint
###   
```

### 4.6 Definition of Done

A done gate at the end of the story, after the acceptance criteria.

```markdown
### Definition of Done
* * *
Verify for every requirement above before its task closes:
- [ ] The requirement's acceptance criteria all pass against {the live system or realistic data}
- [ ] Tests added covering {each rule and guarantee stated above}; CI green
- [ ] Reviewed by a second engineer
- [ ] {Platform bar, e.g. accessibility on affected surfaces, or performance within tolerance}
- [ ] Deployed to {staging or equivalent} and verified with production-shaped data
```

### 4.7 Shared-mechanism section (Complex)

When several requirements inherit one mechanism, describe it once between `### About` and `### Requirements`, and let every requirement lean on it. A requirement that re-explains the mechanism means the explanation belongs here; nothing shared to write means the story is Medium, not Complex.

```markdown
### How {mechanism} works
* * *
{Two or three short paragraphs: what the mechanism is, where it runs, and what it guarantees. This is the machinery every requirement below inherits.}

**{Shared concept, e.g. Stages / States / Sequence}**
* * *
{The ordered steps, rules or states every requirement follows. Spell the shape out once so requirements only fill in their own values.}
* * *
###   
```

### 4.8 Priority marker (Complex)

When requirements compete because they share a mechanism, mark exactly one `← PRIO` on its requirement name so the lead is unambiguous.

```markdown
**{Requirement name}** ← PRIO
```

---

## 5. WORKED EXAMPLES

- [`examples/story/story-example-simple.md`](examples/story/story-example-simple.md) — one requirement, house shape trimmed, no optional enrichments.
- [`examples/story/story-example-medium.md`](examples/story/story-example-medium.md) — three independent requirements with per-requirement checklists and numbered acceptance criteria.
- [`examples/story/story-example-complex.md`](examples/story/story-example-complex.md) — several requirements inheriting one mechanism, with the shared-mechanism section and one `← PRIO`.
- [`examples/story/story-example-complete.md`](examples/story/story-example-complete.md) — the maximal story: every section and every optional enrichment populated, as a reference for what is available.

---

## 6. EXPORT REMINDER

New story:

```text
export/[###] - story-[description].md
```

Refined story:

```text
export/[original-source-filename].md
```

Never overwrite the supplied source. Validate the house grammar and honest gate state, save, verify, then report the path, the chosen tier, and a compact quality summary.
