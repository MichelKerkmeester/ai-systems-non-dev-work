---
title: "Owner - Templates - Task Mode - v0.301"
description: "Product Owner task-mode workflow, delivery standards and structure rules for task artifacts."
version: "0.301"
contextType: reference
importance_tier: high
trigger_phrases:
  - "task mode"
  - "$task acceptance criteria"
  - "subtask parent task"
  - "source task sync"
  - "requirements checklist"
---

# Owner - Templates - Task Mode - v0.301

Task-mode guidance aligned to the current Product Owner task corpus. This version prioritizes a flexible context block, numbered requirement groups and H3 section headings.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides task-mode workflow, standards and structure rules for `$task` and `$t` requests
**Scope:** Task mode overview, delivery standards, structure rules, error recovery and task template usage pointer
**Output Path:** `/export/[existing-task-name].md` or `/export/[###] - task-[description].md`

---

## 1. OVERVIEW

### Purpose

Provides the task-mode workflow, delivery standards and structure rules for `$task` and `$t` requests. Task Mode creates or refines Product Owner tasks that define WHAT and WHY, delivered as a markdown task artifact with checklist items inside Requirements for QA and handoff.

### When to Use

Use Task Mode for:
- Standalone tasks with About and Requirements
- Synced tasks updated to match pasted source material or corpus style
- Parent tasks that link or track child subtasks
- Subtasks covering one area within a parent task
- Feature work, enhancements, acceptance criteria and refinement of existing task content

### Command: `$task`

- **Short Alias:** `$t`
- **Purpose:** Create or refine Product Owner tasks that define WHAT and WHY
- **Output:** Markdown task artifact
- **Thinking:** DEPTH framework applies automatically
- **Interactive Mode:** Ask one comprehensive question unless the request already contains enough direction or uses an explicit command
- **Key Feature:** Uses checklist items inside Requirements for QA and handoff

### Core Rules

- Ask one comprehensive question before drafting unless the request is explicit or uses `$quick`
- Deliver only the requested task, subtask or refinement
- Do not force a fixed metadata block order when the source task already exists
- When syncing or refining an existing task, preserve the source section names, section order and reference labels unless the user asks to standardize them
- Use the same filename when updating an existing task

### Task Types Supported

- **Standalone task:** Full task with About and Requirements
- **Synced task:** Existing task updated to match pasted source material or corpus style
- **Parent task:** Coordination task that links or tracks child subtasks
- **Subtask:** Narrow task covering one area within a parent task

---

## 2. DELIVERY STANDARDS

### Required Core Sections

Every task must include:

1. Title
2. `### About`
3. `### Requirements`

### Optional Context Sections

Use only when they add value or already exist in the source task:

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

### Requirement Item Standard

Each numbered requirement group should follow this pattern unless the source task must be mirrored more literally:

1. Numbered item title
2. One or more short paragraphs that explain the outcome and context
3. `**Checklist**`
4. `- [ ]` checklist items for literal, actionable requirements
5. Checklist and bullet items must not end with `.`

### Assumptions

- Never add `[Assumes: ...]` in task exports
- If dependency uncertainty matters, rewrite it as plain task language without bracketed assumption tags
- A short blockquoted note after a requirement block is acceptable when it clarifies terminology, behavior distinctions or intentionally deferred logic that affects QA

---

## 3. STRUCTURE RULES

### Section Hierarchy

- **H3 core sections:** `### About`, `### Requirements`
- **Requirement category headings:** `### **{Group Name}**` or `### {Group Name}` when matching an existing task
- **Bold sub-label:** `**Checklist**`
- **Optional bold labels:** `**References**`, `**Epic**`, `**Related tickets**`

### Divider Rules

- Use `---` after `### About`
- Use `---` after `### Requirements`
- Use `---` after each category heading
- Use `---` after each numbered item title

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

**Checklist**

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

**Checklist**

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

## 4. QUALITY CHECKLIST

### Pre-Creation Validation

- [ ] User request understood clearly?
- [ ] Task type identified correctly?
- [ ] Scope limited to the requested change?
- [ ] Source material preserved when task is a sync or refinement?
- [ ] Latest template version used?

### Structure Validation

- [ ] Title present as H1?
- [ ] About uses `### About`?
- [ ] Requirements uses `### Requirements`?
- [ ] Numbered requirement groups use clear titles?
- [ ] Actionable requirement items use `- [ ]`?
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

## 5. ERROR RECOVERY

### Common Errors

#### Forced metadata block

**Fix:** Remove unneeded `Epic`, `Related tickets` or `Ticket` sections. Keep only what the task needs.

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

Templates: see [task_templates.md](../assets/task_templates.md).

---

## 6. FINAL REMINDERS

1. Keep the core structure fixed and the context block flexible
2. Preserve source structure when syncing an existing task
3. Use category headings when they make the task easier to scan
4. Use `- [ ]` for actionable requirement items
5. Stay in WHAT and WHY, not HOW
6. Deliver only the requested task scope
