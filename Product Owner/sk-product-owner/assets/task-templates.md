---
title: "Product Owner Task Templates - v0.101"
description: "Copy/apply templates for Product Owner standalone tasks, parent tasks, subtasks and quick tasks."
version: "0.101"
contextType: asset
importance_tier: high
trigger_phrases:
  - "task templates"
  - "standalone task template"
  - "parent task template"
  - "subtask template"
  - "quick task template"
---

# Product Owner Task Templates - v0.101

Copy/apply templates for Product Owner task deliverables.

---

## 1. OVERVIEW

### Purpose

Provides reusable markdown scaffolds for standalone tasks, parent tasks, subtasks and quick tasks.

### Usage

Load this asset with Task Mode. Copy the matching template, remove optional sections that do not apply and preserve source structure when the user asks for sync or refinement.

---

## 2. CANONICAL TASK TEMPLATE

Worked example: [`examples/task/task-example-ui-refinement.md`](examples/task/task-example-ui-refinement.md) shows the full task shape applied to design-parity work, with functional scope protected and accessibility verification included.

```markdown
# {Task Title}

### About

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

### Requirements

---

### **{Category Name}**

---

1.  **{Item Title}**

---

{1-2 short paragraphs describing the expected outcome and why it matters.}

**Checklist**

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

**Checklist**

- [ ] {Actionable requirement}
- [ ] {Actionable requirement}

---

### **{Next Category Name}**

---

3.  **{Item Title}**

---

{Short description.}

**Checklist**

- [ ] {Actionable requirement}
- [ ] {Actionable requirement}

```

### Notes For Use

- Remove any optional section that does not apply
- If the user provides source content, preserve it and only normalize what the user asked to normalize
- When the task shares behavior with sibling tasks, add `Related tasks`

---

## 3. PARENT TASK TEMPLATE

Use this when one parent task coordinates several subtasks.

Worked example: [`examples/task/task-example-standard-feature.md`](examples/task/task-example-standard-feature.md) shows shared feature scope stated once while independent child tasks retain their own implementation detail.

```markdown
# {Parent Task Title}

### About

---

{Short overview of the initiative and why the subtasks exist.}

**References**

---

Flows

- [{Flow name}](figma-url)

### Requirements

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

```

---

## 4. SUBTASK TEMPLATE

Use this when the work belongs to a larger parent task.

Worked example: [`examples/task/task-example-subtask.md`](examples/task/task-example-subtask.md) shows a bounded child task that separates zero-result recovery from request failure without leaking permission state.

```markdown
# {Subtask Title}

### About

---

{1-2 short paragraphs describing this subtask's scope within the parent task.}

**References**

---

Components

- [{Component name}](figma-url)

### Requirements

---

### **{Area Name}**

---

1.  **{Item Title}**

---

{Short description.}

**Checklist**

- [ ] {Actionable requirement}
- [ ] {Actionable requirement}

```

---

## 5. QUICK TASK TEMPLATE

Use this for direct small updates when the request is explicit.

Worked example: [`examples/task/task-example-quick.md`](examples/task/task-example-quick.md) shows exact replacement copy, a zero-day edge and an explicit no-layout-change boundary in the compact shape.

```markdown
# {Task Title}

### About

---

{Brief explanation of the change and why it matters.}

### Requirements

---

**{Item Title}**

---

{Short description.}

**Checklist**

- [ ] {Actionable requirement}
- [ ] {Actionable requirement}

```

Number requirement groups only when the task carries two or more. A single group keeps its bold title without a number, as above. The moment a second group appears, number them `1.`, `2.` in order.
