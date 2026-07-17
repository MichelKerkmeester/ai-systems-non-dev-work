---
title: "Product Owner - Assets - Interactive Response Templates - v0.102"
description: "Copy/apply response templates for Product Owner comprehensive, task, bug, story and document intake questions."
version: "0.102"
contextType: asset
importance_tier: high
trigger_phrases:
  - "interactive response templates"
  - "comprehensive intake question"
  - "task format question"
  - "bug context question"
  - "story context question"
  - "document context question"
  - "source authority question"
  - "one question intake"
---

# Product Owner - Assets - Interactive Response Templates - v0.102

Copy/apply response templates for Product Owner interactive intake.

---

## 1. OVERVIEW

### Purpose

Provides reusable multi-line markdown prompts for default intake, task-specific intake, bug-specific intake, story intake and product- or engineering-document creation or refinement.

### Usage

Load this asset with Interactive Mode. Copy the appropriate question template, keep the multi-line markdown structure and ask one consolidated question before waiting for the user. For Doc requests, populate only unresolved fields and list every known source conflict in the same question. When artifact commands conflict, include artifact selection and any conditional Doc fields together so one response can resolve routing and Doc context.

---

## 2. RESPONSE TEMPLATES

**CRITICAL: All templates must be multi-line markdown. Never convert to single-line text.**

### Comprehensive Question (Default)

```markdown
Welcome! Let's create exactly what you need.

Please provide the following information at once:

[If artifact commands conflict: I detected these deliverables: {detected_artifacts}. Choose one primary deliverable and complete its relevant fields below.]

**0. How should I work this?**
- Quick - lean pass with smart defaults, minimal back-and-forth
- Deeper - take more time, read more context and apply the full DEPTH flow

**1. Deliverable type:**
- Task - Development task with QA checklist
- Bug - Defect report with evidence and reproduction steps
- Story - Narrative user story with Connextra lines, Given/When/Then scenarios and DoR/DoD gates; new or refined
- Doc - Product or engineering guide, catalog, behavior reference, runbook, technical reference, or proposal; new or refined

**2. Scope & complexity:**
- For tasks: Backend/Frontend/Mobile/Full-stack/DevOps/QA
- For bugs: Platform, affected area, severity and reproduction context
- For stories: Create or refine, the user role and value, how many requirements, and whether they share one mechanism
- For docs: Create or refine, product/engineering/mixed domain, purpose, audience, required technical depth, requested scope and preferred shape if known

**3. Requirements:**
- What needs to be built/fixed
- Why does this matter? (problem being solved)
- What does success look like?
- For docs: What should readers understand, decide or do after reading?

**4. Sources, authority & status:**
- For docs: Source files or links, which source controls any conflict, and whether claims are current behavior, approved direction, proposal, retired material or unknown
- For tasks and bugs: References, evidence, dependencies and relevant constraints

**5. Additional context:**
- Target audience, product or engineering constraints, dependencies
- Figma references? Platforms? (iOS / Android / Web / All)

**6. Assumptions to challenge:**
- What am I likely to assume incorrectly?
- What "impossible" options should I consider?
```

### Task Format Question

```markdown
I'll create your task. Quick questions:

**Format & scope:** Backend/Frontend/Mobile/Full-stack/DevOps/QA
**Requirements:** What needs to be built/fixed? Acceptance criteria? Technical constraints?
**Design & platform:** Figma links? Platforms? (iOS / Android / Web / All)
**Dependencies:** Related or dependent tickets?
**Validation:** What am I likely misunderstanding? What constraints should I question?
```

### Bug Context Question

```markdown
I'll create your bug report. Quick questions:

**Bug details:** Unexpected behavior? Expected behavior? Steps to reproduce?
**Environment:** Where does this occur? Platform(s)? (iOS / Android / Web / All)
**Design reference:** Figma references showing expected design?
**Evidence:** Screenshots, error logs, console output? When first noticed? Known workaround?
**Validation:** What should I NOT assume about root cause? Related bug reports?
```

### Story Context Question

Use this when Story intent is selected but role, value, requirement shape or tier cannot be inferred safely. Populate only unresolved fields and wait once.

```markdown
I'll create or refine your user story. Before drafting, I need the unresolved decisions below in one response:

**Operation:** New story, or refine an existing one? For a refinement, which file — I will preserve its structure and only add or adjust what you name.
**Role & value:** Who is the user, and what benefit should the story deliver? (This becomes the Connextra "As a ..., I want ..., so that ..." line.)
**Requirements:** Which concrete requirements should the story cover? List them — the count decides the tier (one = Simple; two to four independent = Medium; several sharing one mechanism = Complex).
**Shared machinery:** Do the requirements run through one common mechanism (a pipeline, rule ladder, state machine or lifecycle)? If so, describe it once.
**Evidence & links:** Any governing docs, technical identifiers, thresholds or task links to carry into the spec blocks — exact values, please.
**Validation:** What am I likely to assume incorrectly about the user or the promise?
```

### Doc Context and Clarification Question

Use this single pattern for new-document intake, refinement intake, missing source authority, source-status ambiguity and contradictory sources. Include only unresolved items, state known conflicts explicitly, then wait once for the complete response.

```markdown
I'll create or refine the product or engineering document. Before drafting, I need the unresolved decisions below in one response:

**Operation, purpose & audience:** Create or refine? What should the document help its readers understand, decide or do, and who are those readers?
**Domain & detail:** Is this product, engineering, operational, security, compliance or mixed documentation? What technical HOW, code, architecture, API, schema, data-model, debugging or evidence detail does the audience need?
**Source set:** Which files, links or supplied materials may I use? For a refinement, what is the source filename?
**Authority & conflicts:** Which source or claim controls each conflict listed here? [List every known conflict or missing canonical source.]
**Document status:** Should the result describe current behavior, approved direction, proposal, retired material or unknown?
**Scope & shape:** What must be included or excluded? Choose Guide, Catalog, Behavior reference or Proposal/future state, or ask me to infer the shape from the confirmed purpose.
**Layout & refinement boundaries:** New documents use the ClickUp `* * *` divider and `*   ` bullet grammar. For a refinement, what exactly should change? I will preserve existing headings, dividers, bullet markers, order, links, identifiers, tables, code fences, status notices and untouched literal copy outside that scope. State whether structural rewriting or ClickUp normalization is explicitly allowed.
**Validation:** Which claims remain unverified, and what should I avoid presenting as fact?
```
