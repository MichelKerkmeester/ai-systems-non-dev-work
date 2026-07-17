---
title: "Product Owner Bug Report Template - v0.100"
description: "Copy/apply template for Product Owner bug reports with evidence, reproduction and QA handoff."
version: "0.100"
contextType: asset
importance_tier: high
trigger_phrases:
  - "bug report template"
  - "defect evidence template"
  - "steps to reproduce"
  - "expected behavior template"
  - "QA handoff checklist"
---

# Product Owner Bug Report Template - v0.100

Copy/apply template for isolated Product Owner bug reports.

---

## 1. OVERVIEW

### Purpose

Provides a reusable markdown scaffold for defect reports that need observed behavior, reproduction steps, expected behavior and QA handoff criteria.

### Usage

Load this asset with Bug Mode. Copy the template, fill only user-supported facts, write `Not provided` where required details are missing and remove conditional comments before delivery.

---

## 2. BUG REPORT TEMPLATE

Worked example: [`examples/bug/bug-example-frontend-visual.md`](examples/bug/bug-example-frontend-visual.md) shows a visual stacking defect supported by cross-browser evidence, exact design tokens and a focused BDD scenario.

Worked example: [`examples/bug/bug-example-mobile-crash.md`](examples/bug/bug-example-mobile-crash.md) shows crash-log evidence and an explicitly labelled memory-pressure hypothesis instead of an asserted root cause.

Worked example: [`examples/bug/bug-example-backend-api.md`](examples/bug/bug-example-backend-api.md) shows a concurrency-sensitive API defect with paired request evidence and conditional reproduction.

Worked example: [`examples/bug/bug-example-quick.md`](examples/bug/bug-example-quick.md) shows the compact form, honest missing environment data and an unverified route hypothesis.

````markdown
# {Bug Title}

### About

---

{1-2 sentence description of the bug and where it occurs in the application.}

| Field           | Value                         |
| --------------- | ----------------------------- |
| Frequency       | {Always / Sometimes / Rarely} |
| Severity        | {Critical/High/Medium/Low}    |
| Platform        | {iOS/Android/Web}             |
| Device          | {Device name/model}           |
| OS Version      | {OS version}                  |
| Browser         | {Browser name - if web}       |
| Browser Version | {Browser version - if web}    |

**References:**

**Flows**
- [{Flow name}]({figma-url})

**Components**
- [{Component name}]({figma-url})

---

### Bug

---

**1. Observed Behavior**

---

{ Describe what happens when the bug is triggered }
- { What the user sees }
- { Any error messages displayed }
- { Incorrect data or behavior }

Steps to Reproduce:
1. { First action to take }
2. { Second action to take }
3. { Third action to take }
4. { Continue until bug is triggered }
5. { Observe the bug }


{ Screen Recording }



---

**2. Expected Behavior**

---

{ Describe what should happen instead. }
- { Design specifications }
- { Previous working behavior }
- { User expectations }

Checklist
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Bug no longer reproducible
- [ ] No regressions introduced

---

<!-- IF BDD applicable -->
### BDD Scenarios

---

**Scenario:** [Bug behavior scenario]
- **Given** [precondition describing the buggy state]
- **When** [action that triggers the bug]
- **Then** [expected correct behavior after fix]

<!-- END IF -->

````
