---
title: "Product Owner - Assets - Story Templates - v0.102"
description: "Three copyable story scaffolds (Simple, Medium, Complex) in the ClickUp-native house format: Connextra Story lines, Given/When/Then scenarios, and DoR/DoD gates around a narrative-first document."
version: "0.102"
contextType: asset
importance_tier: high
trigger_phrases:
  - "story templates"
  - "story tier scaffold"
  - "simple story template"
  - "medium story template"
  - "complex story template"
---

# Product Owner - Assets - Story Templates - v0.102

Copy/apply scaffolds for new story documents at three tiers. Refinements preserve the supplied story's existing structure instead of imposing these shapes.

---

## 1. SHARED RULES

These apply to every tier:

- Narrative first: the Overview opens with the Story or User Story promise block, then problem and mechanism are explained in prose before any further structured block; prose is never replaced by ticket boilerplate
- One Connextra Story line per requirement; no Type/Epic/Priority/Estimate/Status fields, no story points, no INVEST notes
- Acceptance criteria are named **Scenario:** blocks with `*   **Given/When/Then/And**` ClickUp bullets, three to five steps, and observable outcomes. Scenario count is a blocking tier invariant: Simple has one or two in the entire artifact; Medium has three per requirement, with a fourth only for a genuinely separate edge; Complex has three per requirement. A Simple artifact with three scenarios is invalid and cannot be exported.
- ClickUp-native grammar throughout: `* * *` dividers, `*   ` unordered bullets, `*   [ ]` checklists, `1\.` escaped-dot requirement numbering, spacer headings at the closing section's level between major sections, at most one inline `← PRIO` per document
- Heading depth: H1 is the story title only. H2 anchors the major sections, Overview, Requirements and Definition of Done, and stays a minority of the document's headings because ClickUp renders H2 very large. Per-requirement headings use H3, spec sub-blocks use H4 or bold paragraph leads
- The story's life is bracketed by a Definition of Ready (Simple condenses it to one Readiness line; it remains a gate) and a Definition of Done
- Preserve technical identifiers exactly, even when they look misspelled; flag oddities in prose instead of normalizing them
- Exact expressions, thresholds, and field names travel in backticks

## 2. TIER SELECTION

Choose by requirement count and shared machinery:

- **One requirement, a small change** → Simple (section 3). A five-minute fill.
- **Two to four independent requirements** → Medium (section 4).
- **Several requirements sharing one mechanism** (a pipeline, rule ladder, state machine, lifecycle) → Complex (section 5).

An explicit user-stated requirement count outranks model decomposition. Keep actions, variants, states, edges and acceptance checks under the stated requirement; when the count is inferred, the mid-fill discovery rules below still apply.

Requirement count and shared machinery are the ONLY tier signals. Mid-fill switches beat bent scaffolds, and every switch is a change in those signals: a Medium requirement set re-stating one mechanism reveals shared machinery (move up to Complex); a Complex "How {mechanism} works" section with nothing to say reveals there is none (drop to Medium); a Simple story that needs a third scenario usually hides a second requirement — split it out, and the new count moves the story to Medium.

---

## 3. SIMPLE TEMPLATE

One requirement, one task, no shared machinery. Drops the promise bullets, the DoR checklist (one Readiness line instead), and the shared-mechanics section. "Which means that" is optional.

Worked example: [`examples/story/story-example-simple.md`](examples/story/story-example-simple.md) shows one compact requirement with paired validation boundaries and a Readiness line that honestly blocks sprint entry on incomplete sizing.

```markdown
# Story - {Version/Area} - {Feature} - {Name}

## Overview
* * *
**Story:** As a {end-user role}, I want {the one capability}, so that {the benefit in the user's terms}.

**Problem:** {What breaks this today, in one or two lines — the observable failure and why the current behavior cannot prevent it.}

**Solution:** {One sentence: the change that closes the gap.}

**Documentation:** [{governing doc}]({url})

**Readiness:** Story line and acceptance criteria below are written and testable; dependencies ({service / API / data this relies on — or "none"}) are live or confirmed absent. Not pulled into a sprint until this line is true.
* * *

### Requirement
* * *
1\. **{Requirement name}**
`({technical identifier, e.g. endpoint or field name})`
* * *
**Task(s):** [{task number and name}]({task link})
* * *
{One or two lines of prose: what the user expects, and what this requirement does about it.}

**{Spec block name, e.g. Rule}**
* * *
**{Rule}:** `{exact expression or threshold}`
{One plain-language line explaining it.}
* * *

Which means that:
*   {The hard guarantee, stated from the user's view — keep this block only if it adds something the scenarios don't}

**Acceptance criteria**

**Scenario:** {Normal path in a few words}
*   **Given** {precondition, exact expressions in `backticks`}
*   **When** {the user action or system event}
*   **Then** {the observable outcome}

**Scenario:** {The guarantee, or the one edge that matters}
*   **Given** {the boundary condition}
*   **When** {the final state or trigger}
*   **Then** {the never/always promise this change exists to keep}
* * *

### Definition of Done
* * *
Verify before the task closes:
*   [ ] The acceptance criteria pass against {the live system or realistic data}
*   [ ] Tests added covering {the rule and its guarantee}; CI green
*   [ ] Reviewed by a second engineer
*   [ ] Deployed to {staging or equivalent} and verified with production-shaped data
```

Simple notes: one or two scenarios (normal path plus the guarantee); needing a third scenario or a degradation path usually reveals a second requirement — split it out, and the requirement count moves the story to Medium. No `← PRIO` at this tier. The Readiness line is still a gate; promote it to the Medium DoR checklist the moment readiness is genuinely in doubt.

---

## 4. MEDIUM TEMPLATE

Two to four independent requirements, each becoming its own task, sharing no machinery.

Worked example: [`examples/story/story-example-medium.md`](examples/story/story-example-medium.md) shows three independent safeguards with self-contained rules and scenarios plus an honestly unchecked sizing gate.

```markdown
# Story - {Version/Area} - {Feature} - {Name}

## Overview
* * *
**User Story**
As a {user role}, I want {the feature's core promise}:
*   {Named part 1} should {what its name promises}
*   {Named part 2} should {what its name promises}

**Problem**
{What breaks the promise today}:
*   {Observable failure 1}
*   {Observable failure 2}

**Solution**
{One sentence: the mechanism that closes the gap}.

**Documentation**
[{link to the governing doc}]({url})
###   

### Definition of Ready
* * *
Check off as met; pull requirements into a sprint only when every box is checked:
*   [ ] Every requirement's Story line is written in the Connextra form with a clear value clause
*   [ ] Acceptance criteria present and testable for every requirement
*   [ ] Dependencies identified ({e.g. the service or API this relies on is live})
*   [ ] Sized by the team and each requirement fits comfortably in a sprint
##   

## Requirements
* * *
1\. **{Requirement name}**
`({technical identifier, e.g. endpoint or field name})`
* * *
**Task(s):** [{task number and name}]({task file or ticket link})
* * *
**Story:** As a {user role} {using this specific part}, I want {capability},
so that {the benefit in the user's terms}.

{Two or three lines of prose: what the user expects here, what breaks that
expectation, and what this requirement does about it.}

**{Spec block name, e.g. Rule}**
* * *
**{Step or rule 1}:** `{exact expression or threshold}`
{One plain-language line explaining it.}
* * *
**{Step or rule 2}:** `{exact expression or threshold}`
{One plain-language line explaining it.}
* * *

Which means that:
*   {Hard guarantee stated from the user's view}
*   {Behavior when the normal path comes up short}
*   {Trade-off the requirement accepts}

**Acceptance criteria**

**Scenario:** {Normal path in a few words}
*   **Given** {precondition, with exact expressions in `backticks`}
*   **When** {the user action or system event}
*   **Then** {the observable outcome}

**Scenario:** {Degraded or short-supply path}
*   **Given** {the shortfall precondition}
*   **When** {the degradation or fallback trigger}
*   **Then** {the widened or fallback behavior, stated exactly}

**Scenario:** {The hard guarantee}
*   **Given** {the boundary condition}
*   **When** {the final state}
*   **Then** {the never/always promise the requirement exists to keep}
* * *

2\. **{Next requirement}**
`({technical identifier})`
* * *
{Repeat the same block: Task(s), Story, prose, spec block, Which means that,
Acceptance criteria. Keep every requirement self-contained.}
* * *
##   

## Definition of Done
* * *
Verify for every requirement above before its task closes:
*   [ ] The requirement's acceptance criteria all pass against {the live system or realistic data}
*   [ ] Unit and integration tests added covering {each rule / each guarantee stated above}; CI green
*   [ ] Reviewed by a second engineer
*   [ ] {Platform bar, e.g. accessibility on affected surfaces, or performance within tolerance}
*   [ ] Deployed to {staging or equivalent} and verified with production-shaped data
```

Medium notes: three scenarios per requirement (normal, degraded, guarantee); add a fourth only for a genuinely separate edge. No `← PRIO` — Medium requirements are peers; if one must lead, say so in its prose, and if requirements compete because they share a mechanism, move up to Complex. Requirements re-stating one mechanism belong in Complex.

---

## 5. COMPLEX TEMPLATE

Several requirements sharing one mechanism, described once and inherited by all.

Worked example: [`examples/story/story-example-complex.md`](examples/story/story-example-complex.md) shows four digest types inheriting one pipeline, exactly one priority marker and an honestly incomplete Definition of Ready.

```markdown
# Story - {Version/Area} - {Feature} - {Name}

## Overview
* * *
**User Story**
As a {user role}, I want {the feature's core promise}:
*   {Named part 1} should {what its name promises}
*   {Named part 2} should {what its name promises}
*   {Named part 3} should {what its name promises}

**Problem**
{What breaks the promise today}:
*   {Observable failure 1}
*   {Observable failure 2}
*   {Why the current mechanism cannot prevent this}

**Solution**
{One sentence: the shared mechanism that closes the gap}.

**Documentation**
[{link to the governing doc}]({url})
##   

## How {mechanism} works
* * *
{Two or three short paragraphs: what the mechanism is, where it runs, and what it
guarantees. This is the machinery every requirement below inherits.}

**{Shared concept 1, e.g. Sequence / Stages / States}**
* * *
{The ordered steps, rules or states every requirement below follows. Spell the
shape out once so requirements only fill in their own values.}

**{Shared concept 2, e.g. Degradation / Exceptions / Opt-outs}**
* * *
{Edge behavior every requirement inherits, and what happens when a requirement
opts out of part of it. State the shared guarantee and the opt-out trade-off.}
* * *
###   

### Definition of Ready
* * *
Check off as met; pull requirements into a sprint only when every box is checked:
*   [ ] Every requirement's Story line is written in the Connextra form with a clear value clause
*   [ ] Acceptance criteria present and testable for every requirement
*   [ ] Dependencies identified ({e.g. the shared mechanism / service this relies on is live})
*   [ ] Sized by the team and each requirement fits comfortably in a sprint
##   

## Requirements
* * *
1\. **{Requirement name}** ← PRIO
`({technical identifier, e.g. endpoint or url name})`
* * *
**Task(s):** [{task number and name}]({task file or ticket link})
* * *
**Story:** As a {user role} {using this specific part}, I want {capability},
so that {the benefit in the user's terms}.

{Two or three lines of prose: what the user expects here, what breaks that
expectation, and what this requirement does about it.}

**{Spec block name — reuse Shared concept 1's name}**
* * *
**{Step, rule or state 1}:** `{exact expression, threshold or value}`
{One plain-language line explaining it.}
* * *
**{Step, rule or state 2}:** `{exact expression, or the opt-out token}`
{One plain-language line — or the skip convention when this requirement opts out.}
* * *
**{Step, rule or state 3}:** `{exact expression, or the opt-out token}`
{What happens when everything before it is exhausted.}
* * *

Which means that:
*   {Hard guarantee stated from the user's view}
*   {Behavior when the normal path comes up short}
*   {Trade-off the requirement accepts, e.g. fewer items rather than a broken promise}

**Acceptance criteria**

**Scenario:** {Normal path in a few words}
*   **Given** {precondition, with exact expressions in `backticks`}
*   **When** {the user action or system event}
*   **Then** {the observable outcome}

**Scenario:** {Degraded, exception or short-supply path}
*   **Given** {the shortfall or exception precondition}
*   **When** {the degradation, exception or fallback trigger}
*   **Then** {the widened or fallback behavior, stated exactly}

**Scenario:** {The hard guarantee}
*   **Given** {the boundary condition}
*   **When** {every tier has been tried}
*   **Then** {the never/always promise the requirement exists to keep}
* * *

2\. **{Next requirement}**
`({technical identifier})`
* * *
{Repeat the same block. Every requirement inherits the shared machinery above,
so only state what differs here. Keep each block self-contained.}
* * *
##   

## Definition of Done
* * *
Verify for every requirement above before its task closes:
*   [ ] The requirement's acceptance criteria all pass against {the live system or realistic data}
*   [ ] Unit and integration tests added covering {each shared-mechanism step or state and each hard guarantee}; CI green
*   [ ] Reviewed by a second engineer
*   [ ] {Platform bar, e.g. performance within tolerance, or accessibility on the affected surfaces}
*   [ ] Deployed to {staging or equivalent} and verified with production-shaped data
```

Complex notes: write "How {mechanism} works" once and let every requirement lean on it — a requirement re-explaining the mechanism means the explanation belongs in the shared section; nothing shared to write means the story belongs in Medium. Name the spec block after Shared concept 1 and keep row names identical across requirements. When the mechanism is a rule ladder, the proven three-row shape is Primary (full strength), Relaxed (how it widens, possibly `` `≤ 14d`, then `≤ 21d` ``), and Final fallback (a plain single-column production sort like `created_at DESC`); write opt-outs as exact backticked tokens such as `no_relaxation` and `no_fallback`, and let the scenarios carry the "shows fewer items instead" trade-off. Mark exactly one requirement `← PRIO`.

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

Never overwrite the supplied source. Validate ClickUp grammar and honest gate state, save, verify, then report the path, the chosen tier, and a compact quality summary.
