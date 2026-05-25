# Owner - Templates - Bug Mode - v0.200

Structured bug report templates for defect tracking and resolution. Fixed structure with Evidence capture, reproduction steps, and root cause analysis requirements.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides self-contained bug report templates for filing ISOLATED defects when $bug or $b command is detected
**Scope:** Bug mode overview, delivery standards, quality checklists, error recovery, complete bug template, DEPTH Framework integration
**Output Path:** `/export/[###]-artifact.md`

## TABLE OF CONTENTS

  - 1. 🐛 BUG MODE OVERVIEW
  - 2. 📦 DELIVERY STANDARDS
  - 3. ✅ QUALITY CHECKLIST
  - 4. 🚨 ERROR RECOVERY
  - 5. 📝 BUG REPORT TEMPLATE
  - 6. 🎯 FINAL REMINDERS

---

## 1. 🐛 BUG MODE OVERVIEW

### Command: `$bug`

- **Short Alias:** `$b`
- **Purpose:** Create bug reports with reproduction steps and evidence capture
- **Output:** Always as `text/markdown` artifact
- **Thinking:** 10 rounds automatic (DEPTH Framework)
- **Interactive Mode:** Handled by Interactive Mode file (all question logic lives there)
- **Structure:** Fixed (no complexity scaling like Task Mode)
- **Key Feature:** Includes Evidence section and a final Resolution Checklist warning quote for QA handoff

### When to Use Bug Mode

**USE Bug Mode for:**
- Isolated, standalone bug reports
- Bugs requiring detailed reproduction steps
- Bugs with clear observed vs expected behavior
- Bugs that need evidence capture (screenshots, logs)

**USE Task Mode instead for:**
- Grouped bugs or refinement tasks
- Bug consolidation tickets
- Bug fixes combined with feature work
- Tasks titled "Refinement + Bugs"

### Critical Rules
- **NEVER create artifact until user responds to comprehensive question**
- **NEVER answer own questions - always wait for user response**
- **NO TABLE OF CONTENTS** - ClickUp provides native TOC functionality
- **FIXED STRUCTURE** - All bugs use same template (no Simple/Standard/Complex scaling)
- **EVIDENCE IS CRITICAL** - Screenshots and logs support bug diagnosis
- **ROOT CAUSE REQUIRED** - Resolution requires identifying root cause

### Difference from Task Mode
Bug Mode differs from Task Mode in several key ways:

| Aspect       | Task Mode                             | Bug Mode                       |
| ------------ | ------------------------------------- | ------------------------------ |
| Structure    | Auto-scaled (Simple/Standard/Complex) | Fixed structure                |
| Requirements | Variable features                     | Fixed: Observed/Expected/Steps |
| Evidence     | Optional (inline images)              | Dedicated section              |
| Checklist    | Final warning quote                  | Final warning quote       |
| Quick Mode   | Supported ($quick task)               | Not supported                  |
| User Stories | Given/When/Then for features          | Not typically used             |

### Note on Feature Requests
For feature development (new functionality, enhancements), use `$task` command which references **Owner - Templates - Task Mode**

---

## 2. 📦 DELIVERY STANDARDS

### Universal Requirements
- **Artifact Type:** Always use `text/markdown` (never `text/plain`)
- **Single Artifact:** All content delivered as one artifact
- **DEPTH Processing:** 10 rounds automatic (not user choice)
- **Wait for Input:** NEVER proceed without user response to questions
- **Template Compliance:** Use structure exactly
- **No Anchors in Output:** NEVER include `<!-- ANCHOR -->` comments in generated deliverables — anchors are template-internal only

### Bug-Specific Standards
- **Fixed Structure:** All bugs use same 4-section template
- **Output Focus:** ONLY deliver what user reported
- **No Scope Expansion:** Single bug per report (unless explicitly multi-bug)
- **Evidence Focus:** Screenshots and logs are expected (logs optional)
- **Root Cause Tracking:** Required before marking resolved

> Requirements can be tagged `[Optional for MVP]` to indicate items not required for initial release.

### Mandatory Structure Elements

#### Section Hierarchy
- **H3:** (About), (Evidence), (Requirements), (Resolution Checklist)
- **H4:** NOT used in Bug mode

#### Structure Order
1. Title (# Bug Title) - FIRST LINE
2. About (###) - Bug description and location
3. Evidence (###) - Screenshots and Logs (logs optional)
4. Requirements (###) - Observed/Expected/Steps to Reproduce (FIXED)
5. Resolution Checklist (###) - Warning quote only for QA handoff

#### Formatting Standards
- **Dividers:** Use `---` between all major sections, with a blank line before and after the `---`
- **Lists:** Always use `-` for bullets, `- [ ]` for checkboxes
- **Images:** Inline using `![alt text](image.png)` in Evidence section
- **Code Blocks:** Use fenced code blocks for error messages and logs
- **Steps:** Numbered list for reproduction steps

### Visual Hierarchy Rules
- Use `---` as major section separators
- Blank line before and after `---` separators
- H3 for all core sections (### About, ### Evidence, ### Requirements, )
- H4 NOT used in Bug mode
- Consistent spacing throughout

### Content Guidelines

**About Section:**
- Brief description of the bug (1-2 sentences)
- Where the bug occurs (screen, flow, component)
- Impact on user (if relevant)

**Evidence Section:**
- Screenshots showing the issue (required when available)
- Console logs or error messages (optional - include when relevant)
- Network responses (if applicable)
- Stack traces (for crashes)

**Requirements Section (FIXED):**
1. **Observed Behavior** - What actually happens
2. **Expected Behavior** - What should happen
3. **Steps to Reproduce** - Numbered steps to trigger the bug
4. **Frequency** - Always / Sometimes / Rarely
5. **Severity** - Critical / High / Medium / Low
6. **Priority** - P1 / P2 / P3 / P4
7. **Environment** - Platform, device, OS version, Browser, Browser version (when relevant)

**Resolution Checklist:**
- Heading `` and the warning quote only

### User Story Format (If Used)

If a bug fix needs user-flow context, use Given/When/Then format for consistency with Task Mode:

```markdown
**User Story**

---

- **Given:** {current buggy state}
- **When:** {user action that triggers bug}
- **Then:** {expected correct behavior after fix}
```

### Assumptions

- Never add `[Assumes: ...]` in bug exports
- If uncertainty matters, describe it in plain language under the relevant section

---

## 3. ✅ QUALITY CHECKLIST

### Pre-Creation Validation
- [ ] DEPTH Framework applied (10 rounds)?
- [ ] User responded to comprehensive question?
- [ ] System waited for response (never answered own questions)?
- [ ] Bug description clear and specific?
- [ ] Location of bug identified?

### Structure Validation
- [ ] About section uses H3 (### About)?
- [ ] Evidence section uses H3 (### Evidence)?
- [ ] Requirements section uses H3 (### Requirements)?
- [ ] Resolution Checklist uses H3 ()?
- [ ] Correct section hierarchy applied (H3 for all core sections)?
- [ ] Dividers (---) between all sections?
- [ ] No H1 headers except bug title?

### Format Validation
- [ ] Using `text/markdown` artifact type?
- [ ] Lists use `-` bullets?
- [ ] Checkboxes use `- [ ]` format?
- [ ] Steps use numbered list?
- [ ] Code blocks for error messages (if applicable)?
- [ ] Inline images for screenshots?
- [ ] No Table of Contents?

### Bug-Specific Validation
- [ ] Evidence section has Screenshots (when available)?
- [ ] Evidence section has Logs/Error Messages (if applicable)?
- [ ] Requirements has Observed Behavior?
- [ ] Requirements has Expected Behavior?
- [ ] Requirements has Steps to Reproduce?
- [ ] Steps are numbered and reproducible?
- [ ] Frequency indicated?
- [ ] Severity indicated (Critical/High/Medium/Low)?
- [ ] Priority indicated (P1/P2/P3/P4)?
- [ ] Environment specified (when relevant)?
- [ ] Browser/Browser Version specified (for web bugs)?
- [ ] Resolution Checklist uses correct heading and warning quote?
- [ ] Root cause identification addressed in Requirements?
- [ ] Platform-appropriate validation items included in Requirements (mobile AND/OR web)?

---

## 4. 🚨 ERROR RECOVERY

### Common Errors & Fixes

#### Missing Steps to Reproduce
**Fix:** Add numbered list of exact steps to trigger the bug. Steps must be specific and reproducible.

#### Vague Observed Behavior
**Fix:** Replace "it doesn't work" with specific description of what happens (error message, incorrect output, crash, etc.)

#### Missing Evidence
**Fix:** Add `### Evidence` section with screenshots and/or error logs (logs optional if not applicable)

#### Wrong Section Heading Level
**Fix:** Update all core sections to H3: (About, Evidence, Requirements, Resolution Checklist)

#### Using Wrong About Section Level
**Fix:** Change any non-H3 About heading to `### About` - H1 is reserved for the bug title only

#### Missing Root Cause Item
**Fix:** Add root cause identification in the Requirements section.

#### Steps Not Numbered
**Fix:** Convert bullets to numbered list: `1. Step one`, `2. Step two`, etc.

#### Pattern: Sequential Questions
**Fix:** Stop, apologize, ask comprehensive question (in Interactive Mode), WAIT

#### Wrong Artifact Type
**Fix:** Recreate with `text/markdown`

#### Missing Separators
**Fix:** Add `---` between major sections

#### Using Bug Mode for Grouped Bugs
**Fix:** Use Task Mode instead for grouped bugs or refinement tasks

#### Missing Severity/Priority
**Fix:** Add Severity (Critical/High/Medium/Low) and Priority (P1/P2/P3/P4) fields

### Prevention Strategies
1. Apply DEPTH Framework automatically (10 rounds)
2. Wait for comprehensive response
3. Verify section hierarchy (H3 for About/Evidence/Requirements/Checklist)
4. Ensure Evidence section exists (logs optional)
5. Use FIXED Requirements structure (Observed/Expected/Steps)
6. Include Frequency, Severity, and Priority fields
7. Include Environment fields (Platform, OS, Browser, Browser Version)
8. Include root cause in Requirements
9. Use numbered steps for reproduction
10. Use correct artifact type
11. Include screenshots where available
12. NEVER answer own questions
13. Redirect grouped bugs to Task Mode

---

## 5. 📝 BUG REPORT TEMPLATE

````markdown
# {Bug Title}

### About

---

{1-2 sentence description of the bug and where it occurs in the application.}

**Location:** {Screen/Component/Flow where bug appears}


**References:**

**Flows**
- [{Flow name}]({figma-url})

**Components**
- [{Component name}]({figma-url})

---

### Evidence

---

**Screenshots**

![{Description of screenshot}](image.png)

{Add additional screenshots as needed}

**Figma Reference:** [{Description}]({figma-url})

**Logs/Error Messages** (if applicable)

```
{Paste error message, console log, or stack trace here}
```

{Additional logs if applicable}

---

### Requirements

---

**1. Observed Behavior**

---

{Describe exactly what happens when the bug is triggered. Be specific about:
- What the user sees
- Any error messages displayed
- Incorrect data or behavior}

---

**2. Expected Behavior**

---

{Describe what should happen instead. Reference:
- Design specifications
- Previous working behavior
- User expectations}

---

**3. Steps to Reproduce**

---

1. {First action to take}
2. {Second action to take}
3. {Third action to take}
4. {Continue until bug is triggered}
5. {Observe the bug}

| Field           | Value                         |
| --------------- | ----------------------------- |
| Frequency       | {Always / Sometimes / Rarely} |
| Severity        | {Critical/High/Medium/Low}    |
| Priority        | {P1/P2/P3/P4}                 |
| Platform        | {iOS/Android/Web}             |
| Device          | {Device name/model}           |
| OS Version      | {OS version}                  |
| Browser         | {Browser name - if web}       |
| Browser Version | {Browser version - if web}    |

**Related Issues:** {ClickUp ID or "None"}

**Workaround:** {Describe interim mitigation, or "None"}

---

<!-- IF BDD applicable -->
### BDD Scenarios

---

**Scenario:** [Bug behavior scenario]
- **Given** [precondition describing the buggy state]
- **When** [action that triggers the bug]
- **Then** [expected correct behavior after fix]

<!-- END IF -->

---

> ⚠️ Complete all **Checklist items** before moving to QA
````

---

## 6. 🎯 FINAL REMINDERS

1. Keep the core structure fixed and the context block flexible
2. Preserve source structure when syncing an existing task
3. Use category headings when they make the task easier to scan
4. Use `- [ ]` for actionable requirement items
5. Stay in WHAT and WHY, not HOW
6. Deliver only the requested task scope