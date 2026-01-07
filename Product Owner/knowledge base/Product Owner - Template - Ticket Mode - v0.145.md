# Product Owner - Template - Ticket Mode

Streamlined ticket templates aligned with real-world ClickUp usage patterns. Concise, practical format with integrated formatting rules and quality standards.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides self-contained ticket templates with QA resolution checklists for creating development tasks when $ticket or $t command is detected
**Scope:** Ticket mode overview, delivery standards, complexity auto-scaling (Simple/Standard/Complex), quality checklists, error recovery, complete ticket templates, quick mode variants, DEPTH methodology integration

---

## 📋 TABLE OF CONTENTS
1. [🎫 TICKET MODE OVERVIEW](#1-ticket-mode-overview)
2. [📦 DELIVERY STANDARDS](#2-delivery-standards)
3. [📏 COMPLEXITY AUTO-SCALING](#3-complexity-auto-scaling)
4. [✅ QUALITY CHECKLIST](#4-quality-checklist)
5. [🚨 ERROR RECOVERY](#5-error-recovery)
6. [🔵 SIMPLE TICKET TEMPLATE](#6-simple-ticket-template)
7. [🟠 STANDARD TICKET TEMPLATE](#7-standard-ticket-template)
8. [🔴 COMPLEX TICKET TEMPLATE](#8-complex-ticket-template)
9. [⚡ QUICK MODE TEMPLATES](#9-quick-mode-templates)
10. [🎯 FINAL REMINDERS](#10-final-reminders)

---

## 1. 🎫 TICKET MODE OVERVIEW

### Command: `$ticket`

- **Purpose:** Create development tickets with QA checklists that auto-scale complexity
- **Output:** Always as `text/markdown` artifact
- **Thinking:** 10 rounds automatic (DEPTH methodology), 1-5 auto-scaled for $quick
- **Interactive Mode:** Handled by Interactive Mode file (all question logic lives there)
- **Header Position:** Optional - at top as first line when included
- **Output Constraints:** Ticket contains ONLY the requested feature/fix/change
- **Key Feature:** Includes Resolution Checklist for QA verification

### Critical Rules
- **NEVER create artifact until user responds to comprehensive question**
- **NEVER answer own questions - always wait for user response**
- **NO TABLE OF CONTENTS** - ClickUp/Jira provide native TOC functionality
- **HEADER AT TOP:** System metadata appears as first line of artifact (optional)
- **INTERACTIVE QUESTIONS:** All question logic is in Interactive Mode (not duplicated here)

### Note on User Stories
For user story format (narrative without QA checklists), use `$story` command which references **Product Owner - Template - Story Mode**

---

## 2. 📦 DELIVERY STANDARDS

### Universal Requirements
- **Artifact Type:** Always use `text/markdown` (never `text/plain`)
- **Single Artifact:** All content delivered as one artifact
- **DEPTH Processing:** 
  - Standard modes: 10 rounds automatic (not user choice)
  - Quick mode: 1-5 rounds auto-scaled based on complexity
- **Wait for Input:** NEVER proceed without user response to questions
- **Template Compliance:** Use structure exactly

### Ticket-Specific Standards
- **Scaling:** 
  - Simple: 2-3 sections, 4-6 resolution items
  - Standard: 4-5 sections, 8-12 items
  - Complex: 6-8 sections, 12-20 items
- **Output Focus:** ONLY deliver what user requested
- **No Scope Expansion:** Template scaling affects structure, not content scope
- **Multiple Perspectives:** All analyze the SAME requirement
- **Convergent Output:** Many approaches considered, ONE delivered
- **Resolution Checklist:** Mandatory for all ticket templates

### Mandatory Structure Elements

#### Symbol Hierarchy
- **H2:** ⌘ (About)
- **H3:** ⌥ (References), ❖ (Requirements), ✓ (Resolution Checklist)
- **H4:** NOT used in Ticket mode

#### Structure Order
1. Header (Mode | Complexity | Template) - FIRST LINE (optional)
2. About (## ⌘) - Narrative description + Scope bullets
3. References (### ⌥) - Flows, Components, Related Features (optional)
4. Requirements (### ❖) - Numbered descriptive format with embedded User Stories
5. Resolution Checklist (### ✓) - Numbered categories with checkbox items

#### Formatting Standards
- **Dividers:** Use `---` between all major sections
- **Lists:** Always use `-` for bullets, `[]` for checkboxes
- **References:** Bulleted list with 3 categories: Flows, Components, Related Features
- **Inline Images:** Supported in Requirements and References using `![alt text](image.png)`
- **Links:** Use `[Description](URL)` format with actual URLs or `[Link - to be added]`
- **Priority:** Format as `**→ Priority:** Critical/High/Medium/Low` in About section (optional)
- **Status Notes:** Format as `[Status note: "description"]` when needed
- **Assumptions:** Format as `[Assumes: X]` inline within requirements
- **Problems:** Integrated in About narrative, never listed separately

### Visual Hierarchy Rules
- Use `---` as major section separators
- No blank lines between dividers and section headers
- H2 for About section (## ⌘ About)
- H3 for other sections (### ⌥ References, ### ❖ Requirements, ### ✓ Resolution Checklist)
- H4 NOT used in Ticket mode
- Consistent spacing throughout

### Content Integration
- **About Section:** Contains narrative description + Scope bullets
- **Narrative:** 1-3 sentences explaining what and why
- **Scope:** Bulleted list of features and changes
- **Practical Focus:** Implementation-ready, concise, actionable

### Ticket Focus Areas

**Bug Fixes:**
- Root cause analysis
- Impact assessment
- Fix implementation
- Testing requirements

**Feature Development:**
- User requirements [only requested features]
- Technical specifications [for requested system]
- Acceptance criteria [relevant to request]
- Success metrics [of requested functionality]

**Platform Changes:**
- Migration strategy [for requested platform]
- Risk assessment [within scope]
- Rollback plans [for requested changes]
- Performance targets [as requested]

---

## 3. 📏 COMPLEXITY AUTO-SCALING

| Keywords                      | Complexity | Sections | Resolution Items | DEPTH Processing          |
| ----------------------------- | ---------- | -------- | ---------------- | ------------------------- |
| bug, fix, typo, update        | Simple     | 2-3      | 4-6              | 10 rounds (1-2 if $quick) |
| feature, dashboard, interface | Standard   | 4-5      | 8-12             | 10 rounds (3 if $quick)   |
| platform, migration, system   | Complex    | 6-8      | 12-20            | 10 rounds (5 if $quick)   |

**Important:** Complexity determines TEMPLATE SIZE, not content scope
- User requests "bug fix" → Simple template for THAT bug only
- NOT: Simple template with multiple bugs or extra fixes

### DEPTH Processing Standards
- **Multiple perspectives:** All analyze SAME requirement
- **Single output:** One ticket covering exact request
- **No scope expansion:** Complexity affects template size, not feature count

---

## 4. ✅ QUALITY CHECKLIST

### Pre-Creation Validation
[] DEPTH methodology applied (10 rounds standard, 1-5 quick)?
[] User responded to comprehensive question?
[] System waited for response (never answered own questions)?
[] Complexity determined correctly?
[] Template version confirmed?
[] Output scope limited to user request?

### Structure Validation
[] About section uses H2 (## ⌘ About)?
[] About contains narrative + Scope bullets?
[] Requirements section uses H3 (### ❖ Requirements)?
[] Requirements use numbered descriptive format (1. **Feature: Action**)?
[] Resolution Checklist uses H3 (### ✓ Resolution Checklist)?
[] Resolution Checklist uses numbered categories?
[] Correct symbol hierarchy applied (H2 for About, H3 for others)?
[] Dividers (---) between all sections?
[] No H1 headers except document title?

### Format Validation
[] Using `text/markdown` artifact type?
[] Lists use `-` bullets?
[] Checkboxes use `[]` format?
[] Dividers between all sections?
[] Numbered descriptive format for requirements?
[] Inline images supported where relevant?
[] No Table of Contents?
[] No unrequested features?
[] Content limited to requested feature?

### Mode-Specific Validation
[] Header at top (if included)?
[] About uses narrative format?
[] Scope uses bulleted list?
[] Requirements use numbered descriptive format?
[] User Stories embedded under requirements?
[] Resolution checklist scaled (4-6/8-12/12-20)?
[] Numbered categories in checklist?
[] Separators used correctly?
[] 10-round DEPTH applied?
[] Only requested feature covered?

---

## 5. 🚨 ERROR RECOVERY

### Common Errors & Fixes

#### Wrong Symbol Hierarchy
**Fix:** Update to H2: ⌘ (About), H3: ⌥/❖/✓ (References, Requirements, Checklist)

#### Using H1 for About Section
**Fix:** Change `# ⌘ About` to `## ⌘ About` - H1 reserved for document title only

#### Requirements or Checklist Using H2
**Fix:** Change `## ❖ Requirements` to `### ❖ Requirements` and `## ✓ Resolution Checklist` to `### ✓ Resolution Checklist` - H3 for these sections

#### Missing Scope Section
**Fix:** Add `**Scope**` with bulleted list after narrative in About section

#### Problems Listed Separately
**Fix:** Integrate into About narrative

**Pattern:** Sequential questions
**Fix:** Stop, apologize, ask comprehensive question (in Interactive Mode), WAIT

#### Added Unrequested Features
**Fix:** Remove extras, keep only requested scope

#### Wrong Artifact Type
**Fix:** Recreate with `text/markdown`

#### Missing Separators
**Fix:** Add `---` between major sections

#### Table of Contents Included
**Fix:** Remove ToC, rely on external tools

#### Flat Resolution Checklist
**Fix:** Convert to numbered categories with `**1. Category**` format

### Prevention Strategies
1. Apply DEPTH automatically (10 rounds standard, 1-5 quick)
2. Wait for comprehensive response
3. Check template version
4. Verify symbol hierarchy (H2 for About, H3 for References/Requirements/Checklist)
5. Use narrative + Scope format in About
6. Use numbered descriptive format in Requirements
7. Use numbered categories in Resolution Checklist
8. Integrate problems narratively
9. Priority label is optional
10. Limit output to request
11. Use correct artifact type
12. Include inline images where relevant
13. NEVER answer own questions

---

## 6. 🔵 SIMPLE TICKET TEMPLATE

```markdown
# {Ticket Title}

## ⌘ About

---

{1-2 sentence narrative explaining what this change does and why it matters.}

**Scope**

---

- **{Category}:** {Details}

---

### ⌥ References

---

![alt text](image.png)

---

### ❖ Requirements

---

1. **{Feature}: {Action}**

---

{Description of what needs to be done.}

**{Subsection}**

- {Detail}
- {Detail}

---

2. **{Feature}: {Action}**

---

{Description of the second requirement.}

**{Subsection}**

- {Detail}
- {Detail}

---

### ✓ Resolution Checklist

---

Complete all items below before moving to QA

**1. {Category}**
---
[] {Action item}
[] {Action item}

**2. {Category}**
---
[] {Action item}
[] {Action item}

**3. Validation**
---
[] Tested on iOS
[] Tested on Android
[] QA verified
```

---

## 7. 🟠 STANDARD TICKET TEMPLATE

```markdown
# {Ticket Title}

## ⌘ About

---

{2-3 sentence narrative explaining what this change does, why it matters, and the expected outcome.}

**Scope**

---

- **{Category}:** {Details}
- **{Category}:** {Details}

---

### ⌥ References

---

**Flows**
- {Flow name} - [{Link - to be added}]

**Components**
- {Component name} - [{Link - to be added}]

**Related Features**
- {Feature name} - [{Link - to be added}]

---

### ❖ Requirements

---

1. **{Feature}: {Action}**

---

{Description of what needs to be done.}

**User Story**

As a {user type}, I want to {action} so that {benefit}.

**{Subsection}**

- {Detail}
- {Detail}

---

2. **{Feature}: {Action}**

---

{Description of the second requirement.}

**{Subsection}**

- {Detail}
- {Detail}
- {Detail}

---

3. **{Feature}: {Action}**

---

{Description of the third requirement.} [Assumes: {assumption}]

**{Subsection}**

- {Detail}
- {Detail}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. {Category}**
---
[] {Action item}
[] {Action item}
[] {Action item}

**2. {Category}**
---
[] {Action item}
[] {Action item}
[] {Action item}

**3. {Category}**
---
[] {Action item}
[] {Action item}

**4. Validation**
---
[] Tested on iOS
[] Tested on Android
[] QA verified
```

---

## 8. 🔴 COMPLEX TICKET TEMPLATE

```markdown
# {Ticket Title}

## ⌘ About

---

{3-4 sentence comprehensive narrative explaining the current situation, what this change does, why it matters strategically, and the expected business/user outcome.}

**Scope**

---

- **{Category}:** {Details}
- **{Category}:** {Details}
- **{Category}:** {Details}

---

### ⌥ References

---

**Flows**
- {Primary flow} - [{Link - to be added}]
- {Secondary flow} - [{Link - to be added}]

**Components**
- {Core component} - [{Link - to be added}]
- {Supporting component} - [{Link - to be added}]

**Related Features**
- {Dependency} - [{Link - to be added}]
- {Related ticket} - [{Link - to be added}]

---

### ❖ Requirements

---

1. **{Feature}: {Action}**

---

{Detailed description of the requirement.}

**User Story**

As a {user type}, I want to {action} so that {benefit}.

**{Subsection}**

- {Detail with technical specifics}
- {Detail with technical specifics}
- {Detail with technical specifics}

---

2. **{Feature}: {Action}**

---

{Detailed description of the requirement.}

**{Subsection}**

- {Detail}
- {Detail}
- {Detail}

**{Subsection}**

- {Detail}
- {Detail}

---

3. **{Feature}: {Action}**

---

{Description} [Assumes: {assumption about dependencies or existing functionality}]

**{Subsection}**

- {Detail}
- {Detail}

---

4. **{Feature}: {Action}**

---

{Description of technical implementation details.}

**{Subsection}**

- {Technical detail}
- {Technical detail}
- {Technical detail}

---

5. **{Feature}: {Action}**

---

{Description of additional requirement.}

**{Subsection}**

- {Detail}
- {Detail}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. {Category}**
---
[] {Action item}
[] {Action item}
[] {Action item}

**2. {Category}**
---
[] {Action item}
[] {Action item}
[] {Action item}

**3. {Category}**
---
[] {Action item}
[] {Action item}
[] {Action item}

**4. {Category}**
---
[] {Action item}
[] {Action item}

**5. {Category}**
---
[] {Action item}
[] {Action item}

**6. Validation**
---
[] Tested on iOS
[] Tested on Android
[] Visual parity confirmed
[] Performance validated
[] QA verified
```

---

## 9. ⚡ QUICK MODE TEMPLATES

### Simple Quick Mode

```markdown
# {Ticket Title}

## ⌘ About

---

{Brief context of what changed and why.}

**Scope**

---

- **{Category}:** {Details}

---

### ❖ Requirements

---

1. **{Feature}: {Action}**

---

- {Core requirement}
- {Implementation detail}

---

### ✓ Resolution Checklist

---

**1. Implementation**
---
[] {Key action}
[] Tested and verified

**2. Validation**
---
[] QA approved
```

### Standard Quick Mode

```markdown
# {Ticket Title}

## ⌘ About

---

{Context paragraph with key details.}

**Scope**

---

- **{Category}:** {Details}
- **{Category}:** {Details}

---

### ❖ Requirements

---

1. **{Feature}: {Action}**

---

- {Requirement}
- {Requirement}

---

2. **{Feature}: {Action}**

---

- {Requirement}

---

### ✓ Resolution Checklist

---

**1. Implementation**
---
[] Requirements implemented
[] Testing complete

**2. Documentation**
---
[] Documentation updated

**3. Validation**
---
[] QA verified
```

---

## 10. 🎯 FINAL REMINDERS

1. **Always wait** for user response (except $quick)
2. **Never answer** own questions
3. **About Section** uses H2 (## ⌘ About) with narrative + Scope format
4. **Narrative** explains WHAT and WHY (1-3 sentences)
5. **Scope** lists features/changes as bulleted list
6. **NO Success Criteria section** - not used in production tickets
7. **Requirements** use H3 (### ❖ Requirements) with numbered descriptive format: `1. **Feature: Action**`
8. **User Stories** embedded under requirements (not separate section)
9. **Inline images** supported: `![alt text](image.png)`
10. **[Assumes: X]** pattern for inline assumptions
11. **References** uses H3 (### ⌥ References) with 3 categories: Flows, Components, Related Features
12. **H2 for About only** (## ⌘ About)
13. **H3 for other sections** (### ⌥ References, ### ❖ Requirements, ### ✓ Resolution Checklist)
14. **Resolution Checklist** uses numbered categories with `**1. Category**` format
15. **Use `---` dividers** between all sections
16. **Header at top** is optional (Mode | Complexity | Template)
17. **Priority label** is optional
18. **No Table of Contents**
19. **Only requested features** - no scope expansion
20. **DEPTH methodology** applied automatically (10 rounds standard, 1-5 quick)

---

*Template Version: 0.145 - Aligned with real-world ClickUp ticket patterns*
*This template framework ensures all development tickets maintain consistent quality through DEPTH cognitive methodology while delivering actionable, implementation-ready specifications with integrated QA verification checklists.*
