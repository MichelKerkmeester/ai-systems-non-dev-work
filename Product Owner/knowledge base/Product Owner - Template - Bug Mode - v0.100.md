# Product Owner - Template - Bug Mode

Structured bug report templates for defect tracking and resolution. Fixed structure with Evidence capture, reproduction steps, and root cause analysis requirements.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides self-contained bug report templates for filing defects when $bug or $b command is detected
**Scope:** Bug mode overview, delivery standards, quality checklists, error recovery, complete bug template, DEPTH methodology integration

---

## 📋 TABLE OF CONTENTS
1. [🐛 BUG MODE OVERVIEW](#1-bug-mode-overview)
2. [📦 DELIVERY STANDARDS](#2-delivery-standards)
3. [✅ QUALITY CHECKLIST](#3-quality-checklist)
4. [🚨 ERROR RECOVERY](#4-error-recovery)
5. [🔴 BUG REPORT TEMPLATE](#5-bug-report-template)
6. [🎯 FINAL REMINDERS](#6-final-reminders)

---

## 1. 🐛 BUG MODE OVERVIEW

### Command: `$bug`

- **Short Alias:** `$b`
- **Purpose:** Create bug reports with reproduction steps and evidence capture
- **Output:** Always as `text/markdown` artifact
- **Thinking:** 10 rounds automatic (DEPTH methodology)
- **Interactive Mode:** Handled by Interactive Mode file (all question logic lives there)
- **Structure:** Fixed (no complexity scaling like Ticket Mode)
- **Key Feature:** Includes Evidence section and Root Cause tracking in Resolution Checklist

### Critical Rules
- **NEVER create artifact until user responds to comprehensive question**
- **NEVER answer own questions - always wait for user response**
- **NO TABLE OF CONTENTS** - ClickUp provides native TOC functionality
- **FIXED STRUCTURE** - All bugs use same template (no Simple/Standard/Complex scaling)
- **EVIDENCE IS CRITICAL** - Screenshots and logs support bug diagnosis
- **ROOT CAUSE REQUIRED** - Resolution requires identifying root cause

### Difference from Ticket Mode
Bug Mode differs from Ticket Mode in several key ways:

| Aspect | Ticket Mode | Bug Mode |
|--------|-------------|----------|
| Structure | Auto-scaled (Simple/Standard/Complex) | Fixed structure |
| Requirements | Variable features | Fixed: Observed/Expected/Steps |
| Evidence | Optional (References section) | Mandatory section |
| Checklist | Generic resolution | Bug-specific with root cause |
| Quick Mode | Supported ($quick ticket) | Not supported |

### Note on Feature Requests
For feature development (new functionality, enhancements), use `$ticket` command which references **Product Owner - Template - Ticket Mode**

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
- **Evidence Focus:** Screenshots and logs are expected
- **Root Cause Tracking:** Required before marking resolved

### Mandatory Structure Elements

#### Symbol Hierarchy
- **H2:** ⌘ (About)
- **H3:** ⌥ (Evidence), ❖ (Requirements), ✓ (Resolution Checklist)
- **H4:** NOT used in Bug mode

#### Structure Order
1. Title (# Bug Title) - FIRST LINE
2. About (## ⌘) - Bug description and location
3. Evidence (### ⌥) - Screenshots and Logs
4. Requirements (### ❖) - Observed/Expected/Steps to Reproduce (FIXED)
5. Resolution Checklist (### ✓) - Fix/Regression Prevention/Validation

#### Formatting Standards
- **Dividers:** Use `---` between all major sections
- **Lists:** Always use `-` for bullets, `[]` for checkboxes
- **Images:** Inline using `![alt text](image.png)` in Evidence section
- **Code Blocks:** Use fenced code blocks for error messages and logs
- **Steps:** Numbered list for reproduction steps

### Visual Hierarchy Rules
- Use `---` as major section separators
- No blank lines between dividers and section headers
- H2 for About section (## ⌘ About)
- H3 for other sections (### ⌥ Evidence, ### ❖ Requirements, ### ✓ Resolution Checklist)
- H4 NOT used in Bug mode
- Consistent spacing throughout

### Content Guidelines

**About Section:**
- Brief description of the bug (1-2 sentences)
- Where the bug occurs (screen, flow, component)
- Impact on user (if relevant)

**Evidence Section:**
- Screenshots showing the issue
- Console logs or error messages
- Network responses (if applicable)
- Stack traces (for crashes)

**Requirements Section (FIXED):**
1. **Observed Behavior** - What actually happens
2. **Expected Behavior** - What should happen
3. **Steps to Reproduce** - Numbered steps to trigger the bug

**Resolution Checklist:**
- Fix category with root cause identification
- Regression prevention steps
- Validation requirements

---

## 3. ✅ QUALITY CHECKLIST

### Pre-Creation Validation
[] DEPTH methodology applied (10 rounds)?
[] User responded to comprehensive question?
[] System waited for response (never answered own questions)?
[] Bug description clear and specific?
[] Location of bug identified?

### Structure Validation
[] About section uses H2 (## ⌘ About)?
[] Evidence section uses H3 (### ⌥ Evidence)?
[] Requirements section uses H3 (### ❖ Requirements)?
[] Resolution Checklist uses H3 (### ✓ Resolution Checklist)?
[] Correct symbol hierarchy applied (H2 for About, H3 for others)?
[] Dividers (---) between all sections?
[] No H1 headers except bug title?

### Format Validation
[] Using `text/markdown` artifact type?
[] Lists use `-` bullets?
[] Checkboxes use `[]` format?
[] Steps use numbered list?
[] Code blocks for error messages?
[] Inline images for screenshots?
[] No Table of Contents?

### Bug-Specific Validation
[] Evidence section has Screenshots subsection?
[] Evidence section has Logs/Error Messages subsection?
[] Requirements has Observed Behavior?
[] Requirements has Expected Behavior?
[] Requirements has Steps to Reproduce?
[] Steps are numbered and reproducible?
[] Resolution Checklist includes root cause item?
[] Resolution Checklist has Fix category?
[] Resolution Checklist has Regression Prevention?
[] Resolution Checklist has Validation?

---

## 4. 🚨 ERROR RECOVERY

### Common Errors & Fixes

#### Missing Steps to Reproduce
**Fix:** Add numbered list of exact steps to trigger the bug. Steps must be specific and reproducible.

#### Vague Observed Behavior
**Fix:** Replace "it doesn't work" with specific description of what happens (error message, incorrect output, crash, etc.)

#### Missing Evidence
**Fix:** Add `### ⌥ Evidence` section with screenshots and/or error logs

#### Wrong Symbol Hierarchy
**Fix:** Update to H2: ⌘ (About), H3: ⌥/❖/✓ (Evidence, Requirements, Checklist)

#### Using H1 for About Section
**Fix:** Change `# ⌘ About` to `## ⌘ About` - H1 reserved for bug title only

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

### Prevention Strategies
1. Apply DEPTH automatically (10 rounds)
2. Wait for comprehensive response
3. Verify symbol hierarchy (H2 for About, H3 for Evidence/Requirements/Checklist)
4. Ensure Evidence section exists
5. Use FIXED Requirements structure (Observed/Expected/Steps)
6. Include root cause in Resolution Checklist
7. Use numbered steps for reproduction
8. Use correct artifact type
9. Include screenshots/logs where available
10. NEVER answer own questions

---

## 5. 🔴 BUG REPORT TEMPLATE

```markdown
# {Bug Title}

## ⌘ About

---

{1-2 sentence description of the bug and where it occurs in the application.}

**Location:** {Screen/Component/Flow where bug appears}

---

### ⌥ Evidence

---

**Screenshots**

![{Description of screenshot}](image.png)

{Add additional screenshots as needed}

**Logs/Error Messages**

```
{Paste error message, console log, or stack trace here}
```

{Additional logs if applicable}

---

### ❖ Requirements

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

**Frequency:** {Always / Sometimes / Rarely}
**Environment:** {If relevant: iOS/Android/Web, device, OS version}

---

### ✓ Resolution Checklist

---

⚠️ Complete all items below before moving to QA

**1. Fix**
---
[] Root cause identified
[] Fix implemented
[] Fix addresses root cause (not just symptom)
[] Code reviewed

**2. Regression Prevention**
---
[] Related areas reviewed for similar issues
[] Test case added for this bug
[] Edge cases considered

**3. Validation**
---
[] Fix verified in development environment
[] Tested on iOS
[] Tested on Android
[] No new issues introduced
[] QA verified
```

---

## 6. 🎯 FINAL REMINDERS

1. **Always wait** for user response before creating artifact
2. **Never answer** own questions
3. **About Section** uses H2 (## ⌘ About) with bug description + location
4. **Evidence Section** uses H3 (### ⌥ Evidence) - ALWAYS INCLUDE
5. **Screenshots** support diagnosis - request if not provided
6. **Logs/Error Messages** capture technical details
7. **Requirements** uses H3 (### ❖ Requirements) with FIXED structure
8. **FIXED structure:** Observed Behavior, Expected Behavior, Steps to Reproduce
9. **Steps to Reproduce** must be numbered and specific
10. **Resolution Checklist** uses H3 (### ✓ Resolution Checklist)
11. **Root cause** must be identified before marking resolved
12. **H2 for About only** (## ⌘ About)
13. **H3 for other sections** (### ⌥ Evidence, ### ❖ Requirements, ### ✓ Resolution Checklist)
14. **Use `---` dividers** between all sections
15. **No Table of Contents** - rely on ClickUp native TOC
16. **No complexity scaling** - bugs use single fixed template
17. **No Quick mode** - bugs require full DEPTH analysis
18. **Checkbox format:** `[]` (not `- [ ]`)
19. **DEPTH methodology** applied automatically (10 rounds)
20. **One bug per report** - unless explicitly reporting multiple related bugs

---

*Template Version: 0.100 - Initial Bug Mode template aligned with ClickUp bug reporting patterns*
*This template ensures all bug reports maintain consistent quality through DEPTH cognitive methodology while capturing evidence, reproduction steps, and root cause analysis for effective defect resolution.*
