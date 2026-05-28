# Owner - Templates - Bug Mode - v0.200

Structured bug report template for isolated defects. The structure captures context, observed behavior, reproduction steps, expected behavior and the QA checklist needed before handoff.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides self-contained bug report templates for isolated defects when `$bug`, `$b`, `bug report`, `defect`, `broken` or similar language is detected
**Scope:** Bug mode overview, delivery standards, quality checklist, error recovery and complete bug template
**Output Path:** `/export/[###] - bug-[description].md`

---

## 1. Bug mode overview

### Command: `$bug`

- **Short Alias:** `$b`
- **Purpose:** Create bug reports with context, reproduction steps and QA checklist
- **Output:** Always as `text/markdown` artifact
- **Thinking:** DEPTH Framework at Standard energy unless the user explicitly requests another mode
- **Interactive Mode:** Handled by Interactive Mode file when the issue details are too ambiguous
- **Structure:** Fixed bug report structure with flexible evidence placement
- **Key Feature:** Uses `About`, `Bug` and optional `BDD Scenarios`

### When to use Bug Mode

Use Bug Mode for:
- Isolated, standalone bug reports
- Bugs requiring detailed reproduction steps
- Bugs with clear observed behavior and expected behavior
- Bugs supported by screenshots, screen recordings, logs or design references

Use Task Mode instead for:
- Grouped bugs or refinement tasks
- Bug consolidation tickets
- Bug fixes combined with feature work
- Tasks titled `Refinement + Bugs`

### Critical rules

- Do not create an artifact until the user responds to the comprehensive question unless the request contains enough bug context to proceed
- Do not answer your own questions when clarification is required
- Do not include a table of contents in generated bug reports
- Keep one bug per report unless the user explicitly requests grouped bugs
- Preserve the fixed template order
- Capture screenshots, screen recordings, logs and references where they fit the reported bug
- Do not invent missing details. Use `Not provided` when a field matters but no value was supplied
- Keep the checklist exactly as defined in the template
- Stay in WHAT and WHY, not HOW

### Difference from Task Mode

| Aspect       | Task Mode                             | Bug Mode                                  |
| ------------ | ------------------------------------- | ----------------------------------------- |
| Structure    | Auto-scaled by task complexity         | Fixed bug structure                       |
| Requirements | Variable feature requirements          | Observed behavior and expected behavior   |
| Evidence     | Optional inline support                | Included where provided                   |
| Checklist    | Task-specific acceptance requirements  | Fixed QA checklist before handoff         |
| Quick Mode   | Supported for quick tasks              | Not supported by default                  |
| BDD          | Often used for feature behavior        | Optional when it clarifies the bug flow   |

### Note on feature requests

For feature development or enhancements, use `$task` and reference **Owner - Templates - Task Mode**.

---

## 2. Delivery standards

### Universal requirements

- **Artifact Type:** Always use `text/markdown`, never `text/plain`
- **Single Artifact:** Deliver the complete bug report as one artifact
- **DEPTH Processing:** Apply the Product Owner DEPTH Framework
- **Template Compliance:** Use the structure exactly
- **No Anchors in Output:** Never include `<!-- ANCHOR -->` comments in generated deliverables. Conditional comments in the template are template-internal only

### Bug-specific standards

- **Fixed Structure:** All bugs use the same About and Bug section structure
- **Output Focus:** Only deliver what the user reported
- **No Scope Expansion:** One bug per report unless the user explicitly asks for a multi-bug artifact
- **Evidence Placement:** Put screen recordings, screenshots and logs inside the Bug section near the reproduction context
- **Root Cause Tracking:** Keep root cause identification as a checklist item before QA handoff

### Mandatory structure elements

#### Section hierarchy

- **H1:** Bug title only
- **H3:** `About`, `Bug` and optional `BDD Scenarios`
- **Bold numbered labels:** `1. Observed Behavior` and `2. Expected Behavior` inside `### Bug`

#### Structure order

1. Title as `# {Bug Title}`
2. `### About` with short description, field table and references
3. `### Bug`
4. `1. Observed Behavior`
5. `Steps to Reproduce:`
6. Screen recording or relevant visual evidence
7. `2. Expected Behavior`
8. Checklist
9. Optional `### BDD Scenarios`

#### Formatting standards

- Use `---` between major sections and template blocks
- Use `-` for bullets
- Use `- [ ]` for checklist items
- Use numbered lists for reproduction steps
- Use fenced code blocks for logs or error messages when needed
- Use inline images for screenshots when available
- Do not include a generated table of contents
- Do not end checklist or bulleted list items with `.`

### Content guidelines

**About section:**
- Describe the bug and where it occurs in 1-2 sentences
- Include the field table with frequency, severity, platform, device, OS, browser and browser version
- Add flow and component references when provided

**Bug section:**
- Describe what happens when the bug is triggered
- List what the user sees, error messages and incorrect data or behavior
- Include reproducible steps
- Include screen recording, screenshots or logs when provided
- Describe what should happen instead
- Include design specifications, previous working behavior and user expectations when known

**Checklist:**
- Keep the four fixed checklist items exactly as written
- Do not add implementation tasks to the checklist
- Treat the checklist as the QA handoff gate

**BDD Scenarios:**
- Include this section only when it clarifies the user flow or expected state
- Remove the conditional comments from generated bug reports
- Use Given/When/Then format

### Assumptions

- Never add `[Assumes: ...]` in bug exports
- If uncertainty matters, write it plainly as `Not provided` or place it in the relevant field

---

## 3. Quality checklist

### Pre-creation validation

- [ ] DEPTH Framework applied at the selected energy level?
- [ ] User provided enough issue context or responded to the comprehensive question?
- [ ] Bug description clear and specific?
- [ ] Location, screen or flow identified when available?
- [ ] Scope limited to the reported defect?

### Structure validation

- [ ] Title uses H1 and appears first?
- [ ] About section uses `### About`?
- [ ] About section includes the field table?
- [ ] References appear under About when provided?
- [ ] Bug section uses `### Bug`?
- [ ] Observed Behavior appears before Expected Behavior?
- [ ] Steps to Reproduce uses a numbered list?
- [ ] Checklist includes the exact four required items?
- [ ] Optional BDD section is included only when useful?

### Format validation

- [ ] Using `text/markdown` artifact type?
- [ ] Lists use `-` bullets?
- [ ] Checkboxes use `- [ ]` format?
- [ ] Dividers use `---`?
- [ ] No generated table of contents?
- [ ] No template-internal comments remain in generated output?

### Bug-specific validation

- [ ] Observed behavior describes what happens when the bug is triggered?
- [ ] Observed behavior describes what the user sees?
- [ ] Error messages are included or marked as not provided?
- [ ] Incorrect data or behavior is described?
- [ ] Steps are numbered and reproducible?
- [ ] Screen recording, screenshots or logs are included when provided?
- [ ] Expected behavior states what should happen instead?
- [ ] Design specifications are included when provided?
- [ ] Previous working behavior is included when known?
- [ ] User expectations are included?
- [ ] Root cause tracking remains in the checklist?

---

## 4. Error recovery

### Missing steps to reproduce

Add a numbered list of exact steps to trigger the bug. If the user did not provide every step, use only the steps directly supported by the reported flow.

### Vague observed behavior

Replace vague wording with specific user-visible behavior. Describe the screen state, missing data, stale state, incorrect action or error message.

### Missing screen recording

Write `Not provided` in the screen recording area when a recording matters but was not supplied.

### Missing screenshots or logs

Include screenshots or logs when provided. Do not create a separate Evidence section. Place evidence in the Bug section near the reproduction context.

### Wrong section structure

Update the report to use `### About`, `### Bug` and optional `### BDD Scenarios`.

### Missing environment table values

Use `Not provided` for unknown field table values. Do not invent platform, device, OS or browser data.

### Implementation drift

Remove solution instructions. Keep the report focused on what is broken, how to reproduce it and what outcome must be true after the fix.

---

## 5. 📝 BUG REPORT TEMPLATE

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

---

## 6. Final reminders

1. Keep the About and Bug structure fixed
2. Preserve user-provided screenshots, screen recordings, logs and Figma references
3. Use `Not provided` for unknown field values instead of inventing details
4. Keep the checklist as the fixed QA handoff gate
5. Remove template comments from generated bug reports
6. Stay in WHAT and WHY, not HOW
