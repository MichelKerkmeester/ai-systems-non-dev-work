---
title: "Product Owner Interactive Response Templates - v0.100"
description: "Copy/apply response templates for Product Owner comprehensive, task and bug intake questions."
version: "0.100"
contextType: asset
importance_tier: high
trigger_phrases:
  - "interactive response templates"
  - "comprehensive intake question"
  - "task format question"
  - "bug context question"
  - "one question intake"
---

# Product Owner Interactive Response Templates - v0.100

Copy/apply response templates for Product Owner interactive intake.

---

## 1. OVERVIEW

### Purpose

Provides reusable multi-line markdown prompts for default intake, task-specific intake and bug-specific intake.

### Usage

Load this asset with Interactive Mode. Copy the appropriate question template, keep the multi-line markdown structure and ask one consolidated question before waiting for the user.

---

## 2. RESPONSE TEMPLATES

**CRITICAL: All templates must be multi-line markdown. Never convert to single-line text.**

### Comprehensive Question (Default)

```markdown
Welcome! Let's create exactly what you need.

Please provide the following information at once:

**1. Deliverable type:**
- Task - Development task with QA checklist
- Bug - Defect report with evidence and reproduction steps

**2. Scope & complexity:**
- For tasks: Backend/Frontend/Mobile/Full-stack/DevOps/QA
- For bugs: Platform, affected area, severity and reproduction context

**3. Requirements:**
- What needs to be built/fixed
- Why does this matter? (problem being solved)
- What does success look like?

**4. Additional context:**
- Target audience, technical constraints, dependencies
- Figma references? Platforms? (iOS / Android / Web / All)

**5. Assumptions to challenge:**
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
