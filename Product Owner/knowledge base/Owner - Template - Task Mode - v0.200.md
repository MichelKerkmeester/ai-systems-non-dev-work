# Owner - Template - Task Mode - v0.200

Streamlined task templates aligned with real-world ClickUp usage patterns. Concise, practical format with integrated formatting rules and quality standards.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides self-contained task templates with resolution checklists for creating development tasks when $task or $t command is detected
**Scope:** Task mode overview, delivery standards, complexity auto-scaling (Simple/Standard/Complex), quality checklists, error recovery, complete task templates, parent task pattern, quick mode variants, DEPTH methodology integration

---

## 📋 TABLE OF CONTENTS
1. [🎫 TASK MODE OVERVIEW](#1-task-mode-overview)
2. [📦 DELIVERY STANDARDS](#2-delivery-standards)
3. [📏 COMPLEXITY AUTO-SCALING](#3-complexity-auto-scaling)
4. [✅ QUALITY CHECKLIST](#4-quality-checklist)
5. [🚨 ERROR RECOVERY](#5-error-recovery)
6. [🔵 SIMPLE TASK TEMPLATE](#6-simple-task-template)
7. [🟠 STANDARD TASK TEMPLATE](#7-standard-task-template)
8. [🔴 COMPLEX TASK TEMPLATE](#8-complex-task-template)
9. [👨‍👩‍👧‍👦 PARENT TASK TEMPLATE](#9-parent-task-template)
10. [⚡ QUICK MODE TEMPLATES](#10-quick-mode-templates)
11. [🎯 FINAL REMINDERS](#11-final-reminders)

---

## 1. 🎫 TASK MODE OVERVIEW

### Command: `$task`

- **Short Alias:** `$t`
- **Purpose:** Create development tasks with resolution checklists that auto-scale complexity
- **Output:** Always as `text/markdown` artifact
- **Thinking:** 10 rounds automatic (DEPTH methodology), 1-5 auto-scaled for $quick
- **Interactive Mode:** Handled by Interactive Mode file (all question logic lives there)
- **Header Position:** Optional - at top as first line when included
- **Output Constraints:** Task contains ONLY the requested feature/fix/change
- **Key Feature:** Includes Resolution Checklist for QA verification

### Critical Rules
- **NEVER create artifact until user responds to comprehensive question**
- **NEVER answer own questions - always wait for user response**
- **NO TABLE OF CONTENTS** - ClickUp/Jira provide native TOC functionality
- **HEADER AT TOP:** System metadata appears as first line of artifact (optional)
- **INTERACTIVE QUESTIONS:** All question logic is in Interactive Mode (not duplicated here)

### Note on User Stories
For user story format (narrative without resolution checklists), use `$story` command which references **Owner - Template - Story Mode**

### Note on Bugs
For isolated bug reports with reproduction steps and evidence, use `$bug` command which references **Owner - Template - Bug Mode**. For grouped bugs or refinement tasks, use this Task Mode template.

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

### Task-Specific Standards
- **Scaling:** 
  - Simple: 2-3 sections, 4-6 resolution items
  - Standard: 4-5 sections, 8-12 items
  - Complex: 6-8 sections, 12-20 items
- **Output Focus:** ONLY deliver what user requested
- **No Scope Expansion:** Template scaling affects structure, not content scope
- **Multiple Perspectives:** All analyze the SAME requirement
- **Convergent Output:** Many approaches considered, ONE delivered
- **Resolution Checklist:** Mandatory for all task templates

### Mandatory Structure Elements

#### Symbol Hierarchy
- **H2:** ⌘ (About)
- **H3:** ⌥ (References), ❖ (Requirements), ✓ (Resolution Checklist)
- **H4:** NOT used in Task mode

#### Structure Order
1. Title (# Task Title) - FIRST LINE
2. About (## ⌘) - Narrative description + Scope (optional for simple tasks)
3. References (### ⌥) - Flows, Components (OPTIONAL)
4. Requirements (### ❖) - Numbered descriptive format with embedded User Stories
5. Resolution Checklist (### ✓) - Numbered categories with checkbox items

#### Formatting Standards
- **Dividers:** Use `---` between all major sections
- **Lists:** Always use `-` for bullets, `[]` for checkboxes
- **References:** Two patterns supported:
  - Standard: Flows, Components (for feature development)
  - Component Updates: Changed, Impacted (for design system changes)
- **Inline Images:** Supported throughout using `![alt text](image.png)`
- **Links:** Use `[Description](URL)` format with actual URLs
- **Assumptions:** Format as `[Assumes: X]` inline within requirements

### Visual Hierarchy Rules
- Use `---` as major section separators
- No blank lines between dividers and section headers
- H2 for About section (## ⌘ About)
- H3 for other sections (### ⌥ References, ### ❖ Requirements, ### ✓ Resolution Checklist)
- H4 NOT used in Task mode
- Consistent spacing throughout

### User Story Format (BDD Style)

**CRITICAL:** User Stories use Given/When/Then format (Behavior-Driven Development), NOT traditional "As a user, I want..." format.

```markdown
**User Story**
- **Given:** {context or precondition}
- **When:** {user action or trigger}
- **Then:** {expected outcome or behavior}
```

**Example:**
```markdown
**User Story**
- **Given:** Creator is viewing a Barter deal detail page
- **When:** They scroll to bottom of page
- **Then:** Share section is visible after hashtags, before main CTA
```

**When to include User Stories:**
- Feature development tasks: YES
- Technical/infrastructure tasks: NO
- Bug fix consolidation tasks: NO
- Design system component updates: NO

### Content Integration
- **About Section:** Contains narrative description + Scope (optional)
- **Narrative:** 1-3 sentences explaining what and why
- **Scope:** Bulleted list of deliverables and changes (optional for simple tasks)
- **Practical Focus:** Implementation-ready, concise, actionable

### Task Focus Areas

**Feature Development:**
- User requirements [only requested features]
- Technical specifications [for requested system]
- Acceptance criteria [relevant to request]
- Success metrics [of requested functionality]

**Component Updates:**
- Changed components
- Impacted components
- Visual/behavior changes

**Technical Tasks:**
- Token architecture
- Integration requirements
- Validation requirements

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
- **Single output:** One task covering exact request
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
[] About contains narrative + Scope (if standard/complex)?
[] Requirements section uses H3 (### ❖ Requirements)?
[] Requirements use numbered descriptive format (1. **Feature: Action**)?
[] Resolution Checklist uses H3 (### ✓ Resolution Checklist)?
[] Resolution Checklist categories mirror requirements?
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

### User Story Validation (if applicable)
[] User Stories use Given/When/Then format?
[] Given states the context or precondition?
[] When states the user action or trigger?
[] Then states the expected outcome?

### Mode-Specific Validation
[] About uses narrative format?
[] Scope uses bulleted list (if included)?
[] Requirements use numbered descriptive format?
[] User Stories embedded under requirements (Given/When/Then)?
[] Resolution checklist scaled (4-6/8-12/12-20)?
[] Checklist categories mirror requirements structure?
[] Separators used correctly?
[] 10-round DEPTH applied?
[] Only requested feature covered?

---

## 5. 🚨 ERROR RECOVERY

### Common Errors & Fixes

#### Wrong User Story Format
**Fix:** Change from "As a user, I want..." to Given/When/Then format

#### Wrong Symbol Hierarchy
**Fix:** Update to H2: ⌘ (About), H3: ⌥/❖/✓ (References, Requirements, Checklist)

#### Using H1 for About Section
**Fix:** Change `# ⌘ About` to `## ⌘ About` - H1 reserved for document title only

#### Requirements or Checklist Using H2
**Fix:** Change `## ❖ Requirements` to `### ❖ Requirements` and `## ✓ Resolution Checklist` to `### ✓ Resolution Checklist` - H3 for these sections

#### Missing Scope Section (Standard/Complex)
**Fix:** Add `**Scope**` with bulleted list after narrative in About section

#### Checklist Categories Don't Match Requirements
**Fix:** Rename checklist categories to mirror requirement section names

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
5. Use narrative + Scope format in About (optional for simple)
6. Use numbered descriptive format in Requirements
7. Use Given/When/Then for User Stories
8. Mirror requirement structure in Resolution Checklist categories
9. Limit output to request
10. Use correct artifact type
11. Include inline images where relevant
12. NEVER answer own questions

---

## 6. 🔵 SIMPLE TASK TEMPLATE

```markdown
# {Task Title}

## ⌘ About

---

{1-2 sentence narrative explaining what this change does and why it matters.}

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

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. {Category matching Requirement 1}**
---
[] {Action item}
[] {Action item}

**2. Validation**
---
[] Tested on iOS
[] Tested on Android
[] QA verified
```

---

## 7. 🟠 STANDARD TASK TEMPLATE

```markdown
# {Task Title}

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

- [{Flow name}](figma-url)

**Components**

- [{Component name}](figma-url)

---

### ❖ Requirements

---

1. **{Feature}: {Action}**

---

{Description of what needs to be done.}

**User Story**

- **Given:** {context or precondition}
- **When:** {user action or trigger}
- **Then:** {expected outcome}

![](image-url.png)

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

3. **Functional Requirements**

---

**{Category}**

- {Technical detail}
- {Technical detail}

**Error Handling**

- {Error case and handling}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. {Category matching Requirement 1}**
---
[] {Action item}
[] {Action item}
[] Design & Layout matches Figma specifications

**2. {Category matching Requirement 2}**
---
[] {Action item}
[] {Action item}

**3. Functionality**
---
[] {Functional requirement item}
[] {Error handling verified}

**4. Validation**
---
[] Tested on iOS
[] Tested on Android
[] QA verified
```

---

## 8. 🔴 COMPLEX TASK TEMPLATE

```markdown
# {Task Title}

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

- [{Primary flow}](figma-url)
- [{Secondary flow}](figma-url)

**Components**

- [{Core component}](figma-url)
- [{Supporting component}](figma-url)

---

### ❖ Requirements

---

### **{Section Name}**

---

1. **{Feature}: {Action}**

---

{Detailed description of the requirement.}

**User Story**

- **Given:** {context or precondition}
- **When:** {user action or trigger}
- **Then:** {expected outcome}

![](image-url.png)

**{Subsection}**

- {Detail with technical specifics}
- {Detail with technical specifics}
- {Detail with technical specifics}

---

2. **{Feature}: {Action}**

---

{Detailed description of the requirement.}

**User Story**

- **Given:** {context}
- **When:** {action}
- **Then:** {outcome}

**{Subsection}**

- {Detail}
- {Detail}

---

### **{Another Section Name}**

---

3. **{Feature}: {Action}**

---

{Description} [Assumes: {assumption about dependencies or existing functionality}]

**{Subsection}**

- {Detail}
- {Detail}

---

4. **Functional Requirements**

---

**{Category}**

- {Technical detail}
- {Technical detail}

**{Another Category}**

- {Technical detail}

**Error Handling**

- {Error case handling}
- {Graceful fallback behavior}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. {Section 1 - Category}**
---
[] {Action item}
[] {Action item}
[] Design & Layout matches Figma specifications

**2. {Section 1 - Another Category}**
---
[] {Action item}
[] {Action item}

**3. {Section 2 - Category}**
---
[] {Action item}
[] {Action item}

**4. Functionality**
---
[] {Functional requirement}
[] {Error handling verified}
[] {Edge cases handled}

**5. Validation**
---
[] Tested on iOS
[] Tested on Android
[] Visual parity confirmed
[] Performance validated
[] QA verified
```

---

## 9. 👨‍👩‍👧‍👦 PARENT TASK TEMPLATE

Use this template when a task breaks down into multiple subtasks. The parent task coordinates subtasks and tracks their completion.

```markdown
# {Parent Task Title}

## ⌘ About

---

{Overview description of the full initiative and its components.}

**Scope**

---

- **{Subtask Area 1}:** {Brief description}
- **{Subtask Area 2}:** {Brief description}
- **{Subtask Area 3}:** {Brief description}

---

### ⌥ References

---

**Flows**

- [{Flow name}](figma-url)

**Components**

- [{Component name}](figma-url)

---

### ❖ Requirements

---

1. **{Subtask 1 Name}**

---

[{Subtask Title}](clickup-url)

---

2. **{Subtask 2 Name}**

---

[{Subtask Title}](clickup-url)

---

3. **{Subtask 3 Name}**

---

[{Subtask Title}](clickup-url)

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**Subtasks**
---
[] Subtask 1 → {Name} = Completed
[] Subtask 2 → {Name} = Completed
[] Subtask 3 → {Name} = Completed
[] QA verified
```

---

## 10. ⚡ QUICK MODE TEMPLATES

### Simple Quick Mode

```markdown
# {Task Title}

## ⌘ About

---

{Brief context of what changed and why.}

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
# {Task Title}

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

## 11. 🎯 FINAL REMINDERS

1. **Always wait** for user response (except $quick)
2. **Never answer** own questions
3. **About Section** uses H2 (## ⌘ About) with narrative + optional Scope
4. **Narrative** explains WHAT and WHY (1-3 sentences)
5. **Scope** lists deliverables/changes as bulleted list (optional for simple tasks)
6. **References** is OPTIONAL - use when Figma links available
7. **Two Reference patterns:** Flows/Components OR Changed/Impacted
8. **Requirements** use H3 (### ❖ Requirements) with numbered descriptive format: `1. **Feature: Action**`
9. **User Stories** use **Given/When/Then** format (BDD style)
10. **User Stories** are for FEATURE tasks, not technical/bug tasks
11. **Inline images** supported: `![alt text](image.png)`
12. **[Assumes: X]** pattern for inline assumptions
13. **Functional Requirements** is optional final requirement grouping
14. **Resolution Checklist** categories MIRROR requirement structure
15. **H2 for About only** (## ⌘ About)
16. **H3 for other sections** (### ⌥ References, ### ❖ Requirements, ### ✓ Resolution Checklist)
17. **Use `---` dividers** between all sections
18. **Validation is always last** category in checklist
19. **Mobile validation:** Tested on iOS, Tested on Android, QA verified
20. **Web validation:** Cross-browser testing, QA verified
21. **No Table of Contents**
22. **Only requested features** - no scope expansion
23. **DEPTH methodology** applied automatically (10 rounds standard, 1-5 quick)
24. **Parent Task pattern** available for tasks with subtasks

---

*Template Version: 0.200 - Major update aligned with real-world ClickUp task patterns*
*Key changes: Renamed from Ticket to Task Mode, Given/When/Then User Story format, Scope replaces Success Criteria, Resolution categories mirror requirements*
