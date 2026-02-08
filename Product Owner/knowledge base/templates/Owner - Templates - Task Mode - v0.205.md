# Owner - Templates - Task Mode - v0.205

Streamlined task templates aligned with real-world ClickUp usage patterns. Concise, practical format with integrated formatting rules and quality standards.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides self-contained task templates with resolution checklists for creating development tasks when $task or $t command is detected
**Scope:** Task mode overview, delivery standards, complexity auto-scaling (Simple/Standard/Complex), quality checklists, error recovery, complete task templates, parent task pattern, quick mode variants, DEPTH Framework integration
**Output Path:** `/export/[###]-artifact.md`

---

## 📋 TABLE OF CONTENTS
- [1. 🎫 TASK MODE OVERVIEW](#1-task-mode-overview)
- [2. 📦 DELIVERY STANDARDS](#2-delivery-standards)
- [3. 📏 COMPLEXITY AUTO-SCALING](#3-complexity-auto-scaling)
- [4. ✅ QUALITY CHECKLIST](#4-quality-checklist)
- [5. 🚨 ERROR RECOVERY](#5-error-recovery)
- [6. 🔵 SIMPLE TASK TEMPLATE](#6-simple-task-template)
- [7. 🟠 STANDARD TASK TEMPLATE](#7-standard-task-template)
- [8. 🔴 COMPLEX TASK TEMPLATE](#8-complex-task-template)
- [9. 👨‍👩‍👧‍👦 PARENT TASK TEMPLATE](#9-parent-task-template)
- [10. 🧩 SUBTASK TEMPLATE](#10-subtask-template)
- [11. ⚡ QUICK MODE TEMPLATES](#11-quick-mode-templates)
- [12. 🎯 FINAL REMINDERS](#12-final-reminders)

---

## 1. 🎫 TASK MODE OVERVIEW

### Command: `$task`

- **Short Alias:** `$t`
- **Purpose:** Create development tasks with resolution checklists that auto-scale complexity
- **Output:** Always as `text/markdown` artifact
- **Thinking:** 10 rounds automatic (DEPTH Framework), 1-5 auto-scaled for $quick
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
For user story format (narrative without resolution checklists), use `$story` command which references **Owner - Templates - Story Mode**

### Note on Bugs
For isolated bug reports with reproduction steps and evidence, use `$bug` command which references **Owner - Templates - Bug Mode**. For grouped bugs or refinement tasks, use this Task Mode template.

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

> Requirements can be tagged `[Optional for MVP]` to indicate items not required for initial release but desired for completeness.

> When citing design specifications, use exact token values: rem units for spacing (e.g., `0.75rem`), color tokens (e.g., `Content/Primary`), and typography tokens (e.g., `bold`, `base`). Reference the design system as the source of truth.

> **Checkbox Requirement Rule:** All literal, actionable requirement items MUST use `- [ ]` checkbox syntax. Each numbered requirement item includes a `**Requirements**` bold sub-label followed by checkbox items. Plain text bullets or numbered sub-lists are NOT acceptable for specific implementation items.

### Mandatory Structure Elements

#### Symbol Hierarchy
- **H2:** ⌘ (About)
- **H3:** ❖ (Requirements), ✓ (Resolution Checklist)
- **H3 Bold:** `### **{Group Name}**` — Area/group headings within Requirements
- **Bold:** — (References, Scope, Flows, Components, User Story)
- **Bold Sub-label:** `**Requirements**` — Before each checkbox group (not a heading)
- **Bold Numbered:** `**N. {Group Name}**` — Resolution Checklist group labels
- **H4:** NOT used in Task mode

#### Structure Order
1. Title (# Task Title) - FIRST LINE
2. About (## ⌘) - Narrative description + Scope (bold label, optional)
3. References (**bold**) - Flows, Components (after Scope, OPTIONAL)
4. Requirements (### ❖) - Numbered items with `**Requirements**` checkbox groups
5. Resolution Checklist (### ✓) - Numbered bold groups with checkbox items mirroring requirements

#### Formatting Standards
- **Dividers:** Use `---` after every heading, after every numbered item title, and between groups
- **Lists:** Always use `-` for bullets, `- [ ]` for checkboxes
- **Numbered Items:** Use `1.   **{Item Title}**` (3 spaces after period, bold title)
- **Requirements Sub-label:** Use `**Requirements**` (bold, not a heading) before each checkbox group
- **Bold Labels:** Use `**Label**` followed by `---` for: Scope, References, Flows, Components, User Story, Checklist Categories
- **Separators:** Use `---` after H2/H3 headers, after bold section labels, after numbered item titles, and between groups. Always include a blank line before and after `---`
- **References:** Bold label (`**References**`) with subsections **Flows** and **Components**, each followed by `---`
- **Inline Images:** Supported throughout using `![alt text](image.png)` — placed after requirements checkboxes
- **Links:** Use `[Description](URL)` format with actual URLs
- **Assumptions:** Format as `[Assumes: X]` inline within requirements

### Visual Hierarchy Rules
- Use `---` as section separators after headings, numbered items, and between groups
- One blank line before and one blank line after `---` dividers
- H2 for About section (## ⌘ About)
- H3 for Requirements and Checklist (### ❖ Requirements, ### ✓ Resolution Checklist)
- `### **{Group Name}**` for area/group headings within Requirements
- `**Requirements**` bold sub-label (not a heading) before each checkbox group
- `**N. {Group Name}**` bold numbered label for Resolution Checklist groups
- Bold labels for References, Scope, Flows, Components, Checklist Categories (followed by `---`)
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
- [ ] DEPTH Framework applied (10 rounds standard, 1-5 quick)?
- [ ] User responded to comprehensive question?
- [ ] System waited for response (never answered own questions)?
- [ ] Complexity determined correctly?
- [ ] Template version confirmed?
- [ ] Output scope limited to user request?

### Structure Validation
- [ ] About section uses H2 (## ⌘ About)?
- [ ] About contains narrative + Scope (if standard/complex)?
- [ ] References uses bold label format (**References**)?
- [ ] Bold labels (Scope, References, Flows, etc.) followed by ---?
- [ ] Requirements section uses H3 (### ❖ Requirements)?
- [ ] Requirements use numbered format: `1.   **{Item Title}**` (3 spaces after period)?
- [ ] Each numbered item has a `**Requirements**` sub-label with checkboxes?
- [ ] All literal requirement items use `- [ ]` checkbox format?
- [ ] Resolution Checklist uses H3 (### ✓ Resolution Checklist)?
- [ ] Resolution Checklist mirrors requirement checkbox items?
- [ ] Resolution Checklist begins with `⚠️ Complete all items below before moving to QA`?
- [ ] `---` dividers present after headings and between items?
- [ ] Correct symbol hierarchy applied (H2 for About, H3 for others)?
- [ ] No H1 headers except document title?

### Format Validation
- [ ] Using `text/markdown` artifact type?
- [ ] Lists use `-` bullets?
- [ ] Checkboxes use `- [ ]` format?
- [ ] Numbered items use production format with checkboxes?
- [ ] Inline images supported where relevant?
- [ ] No Table of Contents?
- [ ] No unrequested features?
- [ ] Content limited to requested feature?

### User Story Validation (if applicable)
- [ ] User Stories use Given/When/Then format?
- [ ] Given states the context or precondition?
- [ ] When states the user action or trigger?
- [ ] Then states the expected outcome?

### Mode-Specific Validation
- [ ] About uses narrative format?
- [ ] Scope uses bulleted list (if included)?
- [ ] Requirements use numbered checkbox format with `**Requirements**` sub-labels?
- [ ] User Stories embedded under requirements (Given/When/Then)?
- [ ] Resolution checklist scaled (4-6/8-12/12-20)?
- [ ] Checklist categories mirror requirements structure?
- [ ] Separators used correctly?
- [ ] 10-round DEPTH applied?
- [ ] Only requested feature covered?

### References & Platform Validation
- [ ] References section includes Figma flow and component links (if applicable)?
- [ ] Platform-appropriate validation items included (mobile AND/OR web)?
- [ ] Subtask naming follows convention: `Subtask - {Prefix} - {Context} - {Parent}: {Area}`?
- [ ] Design token values use exact specifications (rem, color tokens, typography tokens)?

---

## 5. 🚨 ERROR RECOVERY

### Common Errors & Fixes

#### Wrong User Story Format
**Fix:** Change from "As a user, I want..." to Given/When/Then format

#### Wrong Symbol Hierarchy
**Fix:** Update to H2: ⌘ (About), H3: ❖/✓ (Requirements, Checklist), Bold: References

#### Wrong References Format
**Fix:** Change from `### ⌥ References` to `**References**` with `---` separator

#### Using H1 for About Section
**Fix:** Change `# ⌘ About` to `## ⌘ About` - H1 reserved for document title only

#### Requirements or Checklist Using H2
**Fix:** Change `## ❖ Requirements` to `### ❖ Requirements` and `## ✓ Resolution Checklist` to `### ✓ Resolution Checklist` - H3 for these sections

#### Missing Scope Section (Standard/Complex)
**Fix:** Add `**Scope**` with bulleted list after narrative in About section

#### Checklist Categories Don't Match Requirements
**Fix:** Rename checklist categories to mirror requirement section names

#### Requirements Without Checkboxes
**Fix:** All literal requirements must use `- [ ]` format. Convert plain text items to checkboxes. Each numbered item must include a `**Requirements**` bold sub-label followed by `- [ ]` checkbox items.

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
4. Verify symbol hierarchy (H2 for About, H3 for Requirements/Checklist, Bold for References)
5. Use narrative + Scope format in About (optional for simple)
6. Use numbered checkbox format in Requirements with `**Requirements**` sub-labels
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

{1-2 sentence narrative explaining what this change does and why it matters.}

**Ticket:** {ClickUp ID}

**References**

---

**Flows**

- [{Flow name}](figma-url)

---

**Components**

- [{Component name}](figma-url)

---

### ❖ Requirements

---

1.   **{Item Title}**

---

{1-2 sentence description of what needs to happen.}

**Requirements**

- [ ] {Specific actionable item}
- [ ] {Specific actionable item}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. {Item Title}**

---

- [ ] {Mirrors requirement checkbox items above}

---

**2. Validation**

---

- [ ] Verified: Visual comparison to Figma (iOS)
- [ ] Verified: Visual comparison to Figma (Android)
- [ ] Verified: Cross-browser (Chrome, Safari, Firefox)
- [ ] Verified: QA
```

---

## 7. 🟠 STANDARD TASK TEMPLATE

```markdown
# {Task Title}

## ⌘ About

{2-3 sentence narrative explaining what this change does, why it matters, and the expected outcome.}

**Ticket:** {ClickUp ID}

**Scope**

---

- **{Category}:** {Details}
- **{Category}:** {Details}

---

**References**

---

**Flows**

- [{Flow name}](figma-url)

---

**Components**

- [{Component name}](figma-url)

---

### ❖ Requirements

---

1.   **{Item Title}**

---

{1-2 sentence description of what needs to happen.}

**Requirements**

- [ ] {Specific actionable item}
- [ ] {Specific actionable item}

> **User Story (If Used)**
> Given {context or precondition}
> When {user action or trigger}
> Then {expected outcome}

![](image-url.png)

---

2.   **{Item Title}**

---

{Description of what needs to happen.}

**Requirements**

- [ ] {Specific actionable item}
- [ ] {Specific actionable item}

---

3.   **{Item Title}**

---

{Description of functional requirements.}

**Requirements**

- [ ] {Specific actionable item}
- [ ] {Specific actionable item}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. {Group Name}**

---

- [ ] {Mirrors requirement items}
- [ ] {Mirrors requirement items}

---

**2. {Group Name}**

---

- [ ] {Mirrors requirement items}

---

**3. Functionality**

---

- [ ] {Functional requirement item}
- [ ] {Error handling verified}

---

**4. Validation**

---

- [ ] Verified: Visual comparison to Figma (iOS)
- [ ] Verified: Visual comparison to Figma (Android)
- [ ] Verified: Cross-browser (Chrome, Safari, Firefox)
- [ ] Verified: QA
```

---

## 8. 🔴 COMPLEX TASK TEMPLATE

```markdown
# {Task Title}

## ⌘ About

{3-4 sentence comprehensive narrative explaining the current situation, what this change does, why it matters strategically, and the expected business/user outcome.}

**Ticket:** {ClickUp ID}

**Scope**

---

- **{Category}:** {Details}
- **{Category}:** {Details}
- **{Category}:** {Details}

---

**References**

---

**Flows**

- [{Primary flow}](figma-url)
- [{Secondary flow}](figma-url)

---

**Components**

- [{Core component}](figma-url)
- [{Supporting component}](figma-url)

---

### ❖ Requirements

---

### **{Group/Area Name}**

---

1.   **{Item Title}**

---

{Detailed description of the requirement.}

**Requirements**

- [ ] {Specific actionable item}
- [ ] {Specific actionable item}
- [ ] {Specific actionable item}

> **User Story (If Used)**
> Given {context or precondition}
> When {user action or trigger}
> Then {expected outcome}

![](image-url.png)

---

2.   **{Item Title}**

---

{Detailed description of the requirement.}

**Requirements**

- [ ] {Specific actionable item}
- [ ] {Specific actionable item}

> **User Story (If Used)**
> Given {context}
> When {action}
> Then {outcome}

---

### **{Next Group/Area Name}**

---

3.   **{Item Title}**

---

{Description.} [Assumes: {assumption about dependencies or existing functionality}]

**Requirements**

- [ ] {Specific actionable item}
- [ ] {Specific actionable item}

---

4.   **{Item Title}**

---

{Description of functional requirements.}

**Requirements**

- [ ] {Specific actionable item}
- [ ] {Specific actionable item}
- [ ] {Error handling item}
- [ ] {Graceful fallback item}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. {Group/Area Name}**

---

- [ ] {Mirrors requirement items}
- [ ] {Mirrors requirement items}
- [ ] Design & Layout matches Figma specifications

---

**2. {Group/Area Name}**

---

- [ ] {Mirrors requirement items}
- [ ] {Mirrors requirement items}

---

**3. {Group/Area Name}**

---

- [ ] {Mirrors requirement items}
- [ ] {Mirrors requirement items}

---

**4. Functionality**

---

- [ ] {Functional requirement}
- [ ] {Error handling verified}
- [ ] {Edge cases handled}

---

**5. Validation**

---

- [ ] Verified: Visual comparison to Figma (iOS)
- [ ] Verified: Visual comparison to Figma (Android)
- [ ] Verified: Cross-browser (Chrome, Safari, Firefox)
- [ ] Verified: QA
```

---

## 9. 👨‍👩‍👧‍👦 PARENT TASK TEMPLATE

Use this template when a task breaks down into multiple subtasks. The parent task coordinates subtasks and tracks their completion.

```markdown
# {Parent Task Title}

## ⌘ About

{Overview description of the full initiative and its components.}

**Ticket:** {ClickUp ID}

**Scope**

---

- **{Subtask Area 1}:** {Brief description}
- **{Subtask Area 2}:** {Brief description}
- **{Subtask Area 3}:** {Brief description}

---

**References**

---

**Flows**

- [{Flow name}](figma-url)

---

**Components**

- [{Component name}](figma-url)

---

### ❖ Requirements

1. **{Subtask 1 Name}**

[{Subtask Title}](clickup-url)

2. **{Subtask 2 Name}**

[{Subtask Title}](clickup-url)

3. **{Subtask 3 Name}**

[{Subtask Title}](clickup-url)

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. Subtasks**

---

- [ ] Subtask 1 → {Subtask Name} = Completed
- [ ] Subtask 2 → {Subtask Name} = Completed
- [ ] Subtask 3 → {Subtask Name} = Completed

---

**2. Validation**

---

- [ ] Visual parity confirmed against Figma
- [ ] Cross-browser testing completed (Chrome, Safari, Firefox)
- [ ] QA verified
```

> **Decomposition Guidance:**
> - Decompose when a task spans 3+ distinct UI areas or components
> - Recommended subtask count: 3-7 per parent
> - Subtask naming convention: `Subtask - {Prefix} - {Context} - {Parent}: {Area}`
>   Example: `Subtask - FE - Chat v2 P.1 - Feedback - Partner: Chat Menu`
> - Parent Resolution Checklist should reference subtask completion, not duplicate their items

---

## 10. 🧩 SUBTASK TEMPLATE

Use this template for individual subtasks that belong to a parent task. Each subtask covers a specific UI area or component within the parent scope.

```markdown
# {Subtask Title}

## ⌘ About

{1-2 sentence description of this subtask's scope within the parent task.}

**Ticket:** {ClickUp ID}

**References**

---

**Flows**

- [{Flow name}](figma-url)

---

**Components**

- [{Component name}](figma-url)

---

### ❖ Requirements

---

### **{Area Name}**

---

1.   **{Item Title}**

---

{1-2 sentence description of what needs to happen.}

**Requirements**

- [ ] {Specific actionable item}
- [ ] {Specific actionable item}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. {Area Name}**

---

- [ ] {Mirrors requirement items above}

---

**2. Validation**

---

- [ ] Verified: Visual comparison to Figma (iOS)
- [ ] Verified: Visual comparison to Figma (Android)
- [ ] Verified: Cross-browser (Chrome, Safari, Firefox)
- [ ] Verified: QA
```

---

## 11. ⚡ QUICK MODE TEMPLATES

### Simple Quick Mode

```markdown
# {Task Title}

## ⌘ About

{Brief context of what changed and why.}

---

### ❖ Requirements

---

1.   **{Item Title}**

---

{Brief description.}

**Requirements**

- [ ] {Core requirement}
- [ ] {Implementation detail}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. Implementation**

---

- [ ] {Key action}
- [ ] Tested and verified

---

**2. Validation**

---

- [ ] QA approved
```

### Standard Quick Mode

```markdown
# {Task Title}

## ⌘ About

{Context paragraph with key details.}

**Scope**

---

- **{Category}:** {Details}
- **{Category}:** {Details}

---

### ❖ Requirements

---

1.   **{Item Title}**

---

{Description.}

**Requirements**

- [ ] {Specific actionable item}
- [ ] {Specific actionable item}

---

2.   **{Item Title}**

---

{Description.}

**Requirements**

- [ ] {Specific actionable item}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. Implementation**

---

- [ ] Requirements implemented
- [ ] Testing complete

---

**2. Documentation**

---

- [ ] Documentation updated

---

**3. Validation**

---

- [ ] QA verified
```

---

## 12. 🎯 FINAL REMINDERS

1. **Always wait** for user response (except $quick)
2. **Never answer** own questions
3. **About Section** uses H2 (## ⌘ About) with narrative + optional Scope
4. **Narrative** explains WHAT and WHY (1-3 sentences)
5. **Scope** lists deliverables/changes as bulleted list (optional for simple tasks)
6. **References** uses bold label format (`**References**`), not a heading - OPTIONAL
7. **Two Reference patterns:** Flows/Components OR Changed/Impacted
8. **Bold labels** (Scope, References, Flows, Components, Checklist Categories) use `---` separator after each
9. **Requirements** use H3 (### ❖ Requirements) with numbered format: `1.   **{Item Title}**` and `**Requirements**` checkbox groups
10. **User Stories** use **Given/When/Then** format (BDD style)
11. **User Stories** are for FEATURE tasks, not technical/bug tasks
12. **Inline images** supported: `![alt text](image.png)`
13. **[Assumes: X]** pattern for inline assumptions
14. **Functional Requirements** is optional final requirement grouping
15. **Resolution Checklist** categories MIRROR requirement structure
16. **H2 for About only** (## ⌘ About)
17. **H3 for Requirements/Checklist** (### ❖ Requirements, ### ✓ Resolution Checklist)
18. **Use `---` dividers** after headings, numbered items, and between groups
19. **Validation is always last** category in checklist
20. **Mobile validation:** Tested on iOS, Tested on Android, QA verified
21. **Web validation:** Cross-browser testing, QA verified
22. **No Table of Contents**
23. **Only requested features** - no scope expansion
24. **DEPTH Framework** applied automatically (10 rounds standard, 1-5 quick)
25. **Parent Task pattern** available for tasks with subtasks
26. All literal, actionable requirements MUST use `- [ ]` checkbox syntax — never plain bullets or numbered sub-lists.

---
