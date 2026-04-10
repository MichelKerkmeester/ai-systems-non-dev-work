# Owner - Templates - Task Mode - v0.212

Task templates aligned to the current Product Owner task corpus. This version prioritizes a flexible context block, numbered requirement groups, and grouped verification checklists that match the task's real structure.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides the active task template for `$task` and `$t` requests
**Scope:** Task mode overview, delivery standards, structure rules, checklist logic, error recovery, canonical task template, parent task template, subtask template, quick template
**Output Path:** `/export/[existing-task-name].md` or `/export/[###] - task-[description].md`

## TABLE OF CONTENTS

- 1. 🎫 TASK MODE OVERVIEW
- 2. 📦 DELIVERY STANDARDS
- 3. 🧱 STRUCTURE RULES
- 4. ✅ CHECKLIST LOGIC
- 5. 🔎 QUALITY CHECKLIST
- 6. 🚨 ERROR RECOVERY
- 7. 📝 CANONICAL TASK TEMPLATE
- 8. 🧩 PARENT TASK TEMPLATE
- 9. 🔹 SUBTASK TEMPLATE
- 10. ⚡ QUICK TASK TEMPLATE
- 11. 🎯 FINAL REMINDERS

---

## 1. 🎫 TASK MODE OVERVIEW

### Command: `$task`

- **Short Alias:** `$t`
- **Purpose:** Create or refine Product Owner tasks that define WHAT and WHY
- **Output:** Markdown task artifact
- **Thinking:** DEPTH framework applies automatically
- **Interactive Mode:** Ask one comprehensive question unless the request already contains enough direction or uses an explicit command
- **Key Feature:** Includes a Resolution Checklist for QA and handoff

### Core Rules

- Ask one comprehensive question before drafting unless the request is explicit or uses `$quick`
- Deliver only the requested task, subtask or refinement
- Do not force a fixed metadata block order when the source task already exists
- When syncing or refining an existing task, preserve the source section names, section order and reference labels unless the user asks to standardize them
- Use the same filename when updating an existing task

### Task Types Supported

- **Standalone task:** Full task with About, Requirements and Resolution Checklist
- **Synced task:** Existing task updated to match pasted source material or corpus style
- **Parent task:** Coordination task that links or tracks child subtasks
- **Subtask:** Narrow task covering one area within a parent task

---

## 2. 📦 DELIVERY STANDARDS

### Required Core Sections

Every task must include:

1. Title
2. `## ⌘ About`
3. `### ❖ Requirements`
4. `### ✓ Resolution Checklist`

### Optional Context Sections

Use only when they add value or already exist in the source task:

- `**Scope**`
- `**References**`
- `**Epic**`
- `**Related tasks**`
- `**Related tickets**`
- `**Ticket:** TBD`
- `Flows`
- `Page`
- `Components` or `Component`
- `**User Story**`

### Flexibility Rules

- The task corpus contains both newer clean tasks and older legacy tasks
- The template must support either a minimal context block or a richer context block
- Category headings inside Requirements are optional but recommended for larger tasks
- Category headings may be bold or plain when matching existing source material
- Resolution Checklist groups may mirror higher-level category headings or individual numbered requirements
- Resolution Checklist groups must always be numbered for easy reference
- Add a final `Validation` group unless the user explicitly wants a different ending
- For linked surfaces or sibling-task dependencies, the final checklist group may be `Scope boundaries and validation`

### Requirement Item Standard

Each numbered requirement group should follow this pattern unless the source task must be mirrored more literally:

1. Numbered item title
2. One or more short paragraphs that explain the outcome and context
3. `**Requirements**`
4. `- [ ]` checklist items for literal, actionable requirements

### Assumptions

- Never add `[Assumes: ...]` in task exports
- If dependency uncertainty matters, rewrite it as plain task language without bracketed assumption tags
- A short blockquoted note after a requirement block is acceptable when it clarifies terminology, behavior distinctions or intentionally deferred logic that affects QA

---

## 3. 🧱 STRUCTURE RULES

### Symbol Hierarchy

- **H2:** `## ⌘ About`
- **H3:** `### ❖ Requirements`, `### ✓ Resolution Checklist`
- **Requirement category headings:** `### **{Group Name}**` or `### {Group Name}` when matching an existing task
- **Bold sub-label:** `**Requirements**`
- **Optional bold labels:** `**Scope**`, `**References**`, `**Epic**`, `**Related tickets**`

### Divider Rules

- Use `---` after `## ⌘ About`
- Use `---` after `### ❖ Requirements` and `### ✓ Resolution Checklist`
- Use `---` after each category heading
- Use `---` after each numbered item title
- Use `---` between checklist groups

### References Block

The references block is flexible. Use only the subsections that matter.

Allowed reference labels include:

- `Flows`
- `Page`
- `Components`
- `Component`
- `Changed`
- `Impacted`

These labels may be bold or plain when syncing an existing task. Do not auto-normalize them unless the user asks.

### Requirement Group Variants

The active template supports three valid patterns:

#### Pattern A: Flat numbered groups

Use when the task is small.

```markdown
1.  **{Item Title}**

---

{Short description.}

**Requirements**

- [ ] {Requirement}
- [ ] {Requirement}
```

#### Pattern B: Category heading plus numbered groups

Use when the task spans multiple areas.

```markdown
### **{Category Name}**

---

1.  **{Item Title}**

---

{Short description.}

**Requirements**

- [ ] {Requirement}
- [ ] {Requirement}
```

#### Pattern C: Nested sub-blocks inside a numbered group

Use when one numbered requirement needs several sub-areas.

```markdown
1.  **{Item Title}**

---

{Short description.}

**Sub-area A**

- [ ] {Requirement}
- [ ] {Requirement}

**Sub-area B**

- [ ] {Requirement}
```

### User Story Usage

- User Story is optional
- Include it only when it clarifies the user flow or business value
- Place it inside the relevant numbered requirement block
- Use Given / When / Then format
- Use this exact structure only

```markdown
**User Story**

---

- **Given** {context}
- **When** {action}
- **Then** {outcome}
```

---

## 4. ✅ CHECKLIST LOGIC

### Default Rule

The Resolution Checklist should mirror the task at the same level that best supports QA.

### Preferred Order

1. Mirror category headings when the task has category headings
2. Mirror numbered requirement groups when the task has no category headings
3. Number every checklist group for easy reference
4. Add `Validation` as the last checklist group
5. Use `Scope boundaries and validation` instead of plain `Validation` when sibling-task alignment is a core QA concern

### Allowed Checklist Shapes

#### Category-mirrored checklist

```markdown
**1. Page**

---

- [ ] {Checklist item}

**2. Menu**

---

- [ ] {Checklist item}
```

#### Requirement-mirrored checklist

```markdown
**1. Empty state**

---

- [ ] {Checklist item}

**2. Search**

---

- [ ] {Checklist item}
```

#### Independently numbered checklist

```markdown
**1. Page behavior**

---

- [ ] {Checklist item}

**2. Menu behavior**

---

- [ ] {Checklist item}

**3. Validation**

---

- [ ] {Checklist item}
```

#### Alignment-aware final checklist

```markdown
**11. Scope boundaries and validation**

---

- [ ] Behavior aligned with related sibling tasks
- [ ] Shared states match approved evidence and Figma
- [ ] Cross-browser QA
```

### Checklist Rules

- Checklist groups must always use numbered bold labels such as `**1. Page**`
- Checklist numbering is for reference only and does not need to match the requirement numbering
- The Resolution Checklist intro line must always be exactly: `⚠️ Complete all items above AND below before moving to QA`
- Checklist groups do not need to mirror every numbered requirement 1:1 when a grouped category checklist is clearer
- Checklist items may consolidate related requirement items when the verification outcome is the same
- Do not create checklist sections that invent new scope
- Keep `Validation` or `Scope boundaries and validation` last

---

## 5. 🔎 QUALITY CHECKLIST

### Pre-Creation Validation

- [ ] User request understood clearly?
- [ ] Task type identified correctly?
- [ ] Scope limited to the requested change?
- [ ] Source material preserved when task is a sync or refinement?
- [ ] Latest template version used?

### Structure Validation

- [ ] Title present as H1?
- [ ] About uses `## ⌘ About`?
- [ ] Requirements uses `### ❖ Requirements`?
- [ ] Resolution Checklist uses `### ✓ Resolution Checklist`?
- [ ] Numbered requirement groups use clear titles?
- [ ] Actionable requirement items use `- [ ]`?
- [ ] Resolution Checklist groups use numbered bold labels?
- [ ] Resolution Checklist numbering is clear and reference-friendly?
- [ ] Resolution Checklist intro line uses the exact fixed wording?
- [ ] Resolution Checklist groups mirror categories or numbered items logically?
- [ ] Validation or scope-boundary validation group is last?
- [ ] Cross-task alignment is captured when sibling tasks constrain the same behavior?
- [ ] `---` dividers used consistently?

### Content Validation

- [ ] About explains the task outcome and value?
- [ ] Requirements describe WHAT and WHY, not HOW?
- [ ] Requirement wording is concrete and testable?
- [ ] No unrequested scope added?
- [ ] Optional sections included only when useful?
- [ ] User Story included only when it adds value?

### Source Sync Validation

- [ ] Existing headings preserved when user asked for a sync?
- [ ] Existing section order preserved when user asked for a sync?
- [ ] Existing reference labels preserved when user asked for a sync?
- [ ] Legacy `[]` or plain bullets converted to proper checklists only when the user asked to normalize them?

---

## 6. 🚨 ERROR RECOVERY

### Common Errors

#### Forced metadata block

**Fix:** Remove unneeded `Scope`, `Epic`, `Related tickets` or `Ticket` sections. Keep only what the task needs.

#### Checklist mirrors the wrong level

**Fix:** Regroup the checklist to match the category headings when the task is organized by categories.

#### Checklist groups are not numbered

**Fix:** Convert every Resolution Checklist group label to numbered bold format such as `**1. Page**`, `**2. Menu**`, `**3. Validation**`.

#### Checklist intro line is wrong

**Fix:** Replace the intro text with exactly `⚠️ Complete all items above AND below before moving to QA`.

#### Cross-task alignment is missing

**Fix:** Add a final `Scope boundaries and validation` checklist group when the task must stay aligned with sibling tasks or adjacent surfaces.

#### Plain bullets used for actionable requirements

**Fix:** Convert requirement bullets to `- [ ]` checklists.

#### Source task was standardized when it should have been synced

**Fix:** Restore the source section names, order and wording, then update only the checklist or requested parts.

#### User Story added by default

**Fix:** Remove it unless it adds clear value or the user requested it.

#### Assumption tags appear in export

**Fix:** Remove `[Assumes: ...]` and rewrite the point in plain task language or remove it if it is not required.

### Prevention Rules

1. Start from the source task when one exists
2. Keep the core sections fixed and the context block flexible
3. Group the checklist at the level that best supports verification
4. Use `- [ ]` for actionable items
5. Add only the sections the task actually needs

---

## 7. 📝 CANONICAL TASK TEMPLATE

```markdown
# {Task Title}

## ⌘ About

---

{1-3 short paragraphs describing the task, why it matters and what outcome it should create.}

**References**

---

Flows

- [{Flow name}](figma-url)

Page

- [{Page name}](figma-url)

Components

- [{Component name}](figma-url)

**Epic**

---

- `{Epic name}`

**Related tasks**

---

- [{Related task title}](url)

**Related tickets**

---

- [{Related ticket}](url)

### ❖ Requirements

---

### **{Category Name}**

---

1.  **{Item Title}**

---

{1-2 short paragraphs describing the expected outcome and why it matters.}

**Requirements**

- [ ] {Actionable requirement}
- [ ] {Actionable requirement}

**User Story**

- **Given:** {context}
- **When:** {action}
- **Then:** {outcome}

---

2.  **{Item Title}**

---

{1-2 short paragraphs describing the expected outcome and why it matters.}

**Requirements**

- [ ] {Actionable requirement}
- [ ] {Actionable requirement}

---

### **{Next Category Name}**

---

3.  **{Item Title}**

---

{Short description.}

**Requirements**

- [ ] {Actionable requirement}
- [ ] {Actionable requirement}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items above AND below before moving to QA

**1. {Category Name}**

---

- [ ] {Verification item}
- [ ] {Verification item}

---

**2. {Next Category Name}**

---

- [ ] {Verification item}
- [ ] {Verification item}

---

**3. Validation**

---

- [ ] Verified: Visual alignment to Figma where applicable
- [ ] Verified: Empty, error and edge states where applicable
- [ ] Verified: Platform-appropriate QA
```

### Notes For Use

- Remove any optional section that does not apply
- If the task has no category headings, mirror the numbered requirements in the checklist instead
- If the user provides source content, preserve it and only normalize what the user asked to normalize
- When the task shares behavior with sibling tasks, add `Related tasks` and consider `Scope boundaries and validation` as the final checklist group

---

## 8. 🧩 PARENT TASK TEMPLATE

Use this when one parent task coordinates several subtasks.

```markdown
# {Parent Task Title}

## ⌘ About

---

{Short overview of the initiative and why the subtasks exist.}

**References**

---

Flows

- [{Flow name}](figma-url)

### ❖ Requirements

---

1.  **{Subtask Name}**

---

[{Subtask Title}](url)

2.  **{Subtask Name}**

---

[{Subtask Title}](url)

3.  **{Subtask Name}**

---

[{Subtask Title}](url)

---

### ✓ Resolution Checklist

---

⚠️ Complete all items above AND below before moving to QA

**1. Subtasks**

---

- [ ] {Subtask 1} complete
- [ ] {Subtask 2} complete
- [ ] {Subtask 3} complete

---

**2. Validation**

---

- [ ] Verified: Child tasks cover the full parent scope
- [ ] Verified: No duplicated child scope
- [ ] Verified: QA ready for handoff
```

---

## 9. 🔹 SUBTASK TEMPLATE

Use this when the work belongs to a larger parent task.

```markdown
# {Subtask Title}

## ⌘ About

---

{1-2 short paragraphs describing this subtask's scope within the parent task.}

**References**

---

Components

- [{Component name}](figma-url)

### ❖ Requirements

---

### **{Area Name}**

---

1.  **{Item Title}**

---

{Short description.}

**Requirements**

- [ ] {Actionable requirement}
- [ ] {Actionable requirement}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items above AND below before moving to QA

**1. {Area Name}**

---

- [ ] {Verification item}
- [ ] {Verification item}

---

**2. Validation**

---

- [ ] Verified: Subtask scope matches parent task
- [ ] Verified: Relevant design and behavior states covered
- [ ] Verified: QA ready for handoff
```

---

## 10. ⚡ QUICK TASK TEMPLATE

Use this for direct small updates when the request is explicit.

```markdown
# {Task Title}

## ⌘ About

---

{Brief explanation of the change and why it matters.}

### ❖ Requirements

---

1.  **{Item Title}**

---

{Short description.}

**Requirements**

- [ ] {Actionable requirement}
- [ ] {Actionable requirement}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items above AND below before moving to QA

**1. {Item Title}**

---

- [ ] {Verification item}
- [ ] {Verification item}

---

**2. Validation**

---

- [ ] Verified: Requested change complete
- [ ] Verified: QA ready for handoff
```

---

## 11. 🎯 FINAL REMINDERS

1. Keep the core structure fixed and the context block flexible
2. Preserve source structure when syncing an existing task
3. Use category headings when they make the task easier to scan
4. Use `- [ ]` for actionable requirement items
5. Group the Resolution Checklist by category headings by default
6. Number every Resolution Checklist group for reference
7. Checklist numbering does not need to match requirement numbering
8. Add `Validation` last
9. Do not require `Scope`, `Ticket`, `Epic`, `Related tickets` or `Components` in every task
10. Do not add User Stories or assumption tags by default
11. Stay in WHAT and WHY, not HOW
12. Deliver only the requested task scope
