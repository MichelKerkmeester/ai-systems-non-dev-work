# Owner - Template - Bug Mode - v0.114

Structured bug report templates for defect tracking and resolution. Fixed structure with Evidence capture, reproduction steps, and root cause analysis requirements.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides self-contained bug report templates for filing ISOLATED defects when $bug or $b command is detected
**Scope:** Bug mode overview, delivery standards, quality checklists, error recovery, complete bug template, DEPTH methodology integration
**Output Path:** `/export/[###]-artifact.md`

---

## 📋 TABLE OF CONTENTS
1. [🐛 BUG MODE OVERVIEW](#1--bug-mode-overview)
2. [📦 DELIVERY STANDARDS](#2--delivery-standards)
3. [✅ QUALITY CHECKLIST](#3--quality-checklist)
4. [🚨 ERROR RECOVERY](#4--error-recovery)
5. [📝 BUG REPORT TEMPLATE](#5--bug-report-template)
6. [🎯 FINAL REMINDERS](#6--final-reminders)

---

## 1. 🐛 BUG MODE OVERVIEW

### Command: `$bug`

- **Short Alias:** `$b`
- **Purpose:** Create bug reports with reproduction steps and evidence capture
- **Output:** Always as `text/markdown` artifact
- **Thinking:** 10 rounds automatic (DEPTH Framework)
- **Interactive Mode:** Handled by Interactive Mode file (all question logic lives there)
- **Structure:** Fixed (no complexity scaling like Task Mode)
- **Key Feature:** Includes Evidence section and Root Cause tracking in Resolution Checklist

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
| Checklist    | Categories mirror requirements        | Bug-specific with root cause   |
| Quick Mode   | Supported ($quick task)               | Not supported                  |
| User Stories | Given/When/Then for features          | Not typically used             |

### Note on Feature Requests
For feature development (new functionality, enhancements), use `$task` command which references **Owner - Template - Task Mode**

---

## 2. 📦 DELIVERY STANDARDS

### Universal Requirements
- **Artifact Type:** Always use `text/markdown` (never `text/plain`)
- **Single Artifact:** All content delivered as one artifact
- **DEPTH Processing:** 10 rounds automatic (not user choice)
- **Wait for Input:** NEVER proceed without user response to questions
- **Template Compliance:** Use structure exactly

### Bug-Specific Standards
- **Fixed Structure:** All bugs use same 4-section template
- **Output Focus:** ONLY deliver what user reported
- **No Scope Expansion:** Single bug per report (unless explicitly multi-bug)
- **Evidence Focus:** Screenshots and logs are expected (logs optional)
- **Root Cause Tracking:** Required before marking resolved

### Mandatory Structure Elements

#### Symbol Hierarchy
- **H2:** (About)
- **H3:** (Evidence), (Requirements), (Resolution Checklist)
- **H4:** NOT used in Bug mode

#### Structure Order
1. Title (# Bug Title) - FIRST LINE
2. About (##) - Bug description and location
3. Evidence (###) - Screenshots and Logs (logs optional)
4. Requirements (###) - Observed/Expected/Steps to Reproduce (FIXED)
5. Resolution Checklist (###) - Fix/Regression Prevention/Validation

#### Formatting Standards
- **Dividers:** Use `---` between all major sections
- **Lists:** Always use `-` for bullets, `- [ ]` for checkboxes
- **Images:** Inline using `![alt text](image.png)` in Evidence section
- **Code Blocks:** Use fenced code blocks for error messages and logs
- **Steps:** Numbered list for reproduction steps

### Visual Hierarchy Rules
- Use `---` as major section separators
- Blank line before and after `---` separators
- H2 for About section (## About)
- H3 for other sections (### Evidence, ### Requirements, ### Resolution Checklist)
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
- Fix category with root cause identification
- Regression prevention steps
- Validation requirements

### User Story Format (If Used)

If a bug fix requires user story context, use Given/When/Then format for consistency with Task Mode:

```markdown
**User Story**
- **Given:** {current buggy state}
- **When:** {user action that triggers bug}
- **Then:** {expected correct behavior after fix}
```

---

## 3. ✅ QUALITY CHECKLIST

### Pre-Creation Validation
- [ ] DEPTH Framework applied (10 rounds)?
- [ ] User responded to comprehensive question?
- [ ] System waited for response (never answered own questions)?
- [ ] Bug description clear and specific?
- [ ] Location of bug identified?

### Structure Validation
- [ ] About section uses H2 (## About)?
- [ ] Evidence section uses H3 (### Evidence)?
- [ ] Requirements section uses H3 (### Requirements)?
- [ ] Resolution Checklist uses H3 (### Resolution Checklist)?
- [ ] Correct symbol hierarchy applied (H2 for About, H3 for others)?
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
- [ ] Resolution Checklist includes root cause item?
- [ ] Resolution Checklist has Fix category?
- [ ] Resolution Checklist has Regression Prevention?
- [ ] Resolution Checklist has Validation?

---

## 4. 🚨 ERROR RECOVERY

### Common Errors & Fixes

#### Missing Steps to Reproduce
**Fix:** Add numbered list of exact steps to trigger the bug. Steps must be specific and reproducible.

#### Vague Observed Behavior
**Fix:** Replace "it doesn't work" with specific description of what happens (error message, incorrect output, crash, etc.)

#### Missing Evidence
**Fix:** Add `### Evidence` section with screenshots and/or error logs (logs optional if not applicable)

#### Wrong Symbol Hierarchy
**Fix:** Update to H2: (About), H3: (Evidence, Requirements, Checklist)

#### Using H1 for About Section
**Fix:** Change `# About` to `## About` - H1 reserved for bug title only

#### Missing Root Cause Item
**Fix:** Add "Root cause identified" checkbox in Fix category

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
3. Verify symbol hierarchy (H2 for About, H3 for Evidence/Requirements/Checklist)
4. Ensure Evidence section exists (logs optional)
5. Use FIXED Requirements structure (Observed/Expected/Steps)
6. Include Frequency, Severity, and Priority fields
7. Include Environment fields (Platform, OS, Browser, Browser Version)
8. Include root cause in Resolution Checklist
9. Use numbered steps for reproduction
10. Use correct artifact type
11. Include screenshots where available
12. NEVER answer own questions
13. Redirect grouped bugs to Task Mode

---

## 5. 📝 BUG REPORT TEMPLATE

````markdown
# {Bug Title}

## About

---

{1-2 sentence description of the bug and where it occurs in the application.}

**Location:** {Screen/Component/Flow where bug appears}

---

### Evidence

---

**Screenshots**

![{Description of screenshot}](image.png)

{Add additional screenshots as needed}

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

---

### Resolution Checklist

---

Complete all items below before moving to QA

**1. Fix**

---

- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Fix addresses root cause (not just symptom)
- [ ] Code reviewed

**2. Regression Prevention**

---

- [ ] Related areas reviewed for similar issues
- [ ] Test case added for this bug
- [ ] Edge cases considered

**3. Validation**

---

- [ ] Fix verified in development environment
- [ ] Tested on iOS
- [ ] Tested on Android
- [ ] No new issues introduced
- [ ] QA verified
````

---

## 6. 🎯 FINAL REMINDERS

1. **Always wait** for user response before creating artifact
2. **Never answer** own questions
3. **Use Task Mode** for grouped bugs or refinement tasks
4. **About Section** uses H2 (## About) with bug description + location
5. **Evidence Section** uses H3 (### Evidence) - ALWAYS INCLUDE
6. **Screenshots** support diagnosis - request if not provided
7. **Logs/Error Messages** are OPTIONAL - include when relevant
8. **Requirements** uses H3 (### Requirements) with FIXED structure
9. **FIXED structure:** Observed Behavior, Expected Behavior, Steps to Reproduce
10. **Steps to Reproduce** must be numbered and specific
11. **Frequency** indicates how often bug occurs (Always/Sometimes/Rarely)
12. **Severity** indicates impact level (Critical/High/Medium/Low)
13. **Priority** indicates fix urgency (P1/P2/P3/P4)
14. **Environment** specifies platform, device, OS, browser when relevant
15. **Resolution Checklist** uses H3 (### Resolution Checklist)
16. **Root cause** must be identified before marking resolved
17. **H2 for About only** (## About)
18. **H3 for other sections** (### Evidence, ### Requirements, ### Resolution Checklist)
19. **Use `---` dividers** between all sections
20. **No Table of Contents** - rely on ClickUp native TOC
21. **No complexity scaling** - bugs use single fixed template
22. **No Quick mode** - bugs require full DEPTH Framework analysis
23. **Checkbox format:** `- [ ]` (standard markdown)
24. **DEPTH Framework** applied automatically (10 rounds)
25. **One bug per report** - unless explicitly reporting multiple related bugs
26. **User Stories** use Given/When/Then format if included

---

*This template ensures all bug reports maintain consistent quality through DEPTH Framework cognitive methodology while capturing evidence, reproduction steps, and root cause analysis for effective defect resolution.*
