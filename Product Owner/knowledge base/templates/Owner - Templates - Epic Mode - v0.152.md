# Owner - Templates - Epic Mode - v0.152

Epic templates with integrated formatting rules and quality standards. All delivery logic consolidated for self-contained operation.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides self-contained epic templates for creating high-level initiative documentation when $epic or $e command is detected
**Scope:** Epic mode overview and command syntax, artifact delivery standards and DEPTH Framework application, complexity auto-scaling based on project keywords, symbol hierarchy and formatting rules, quality validation checklists and error recovery protocols, unified epic template with example structure
**Output Path:** `/export/[###]-artifact.md`

---

## 📋 TABLE OF CONTENTS
- [1. 📝 EPIC MODE OVERVIEW](#1-epic-mode-overview)
- [2. 📦 DELIVERY STANDARDS](#2-delivery-standards)
- [3. 📊 COMPLEXITY AUTO-SCALING](#3-complexity-auto-scaling)
- [4. ✨ FORMATTING RULES & STANDARDS](#4-formatting-rules--standards)
- [5. ✅ QUALITY CHECKLIST](#5-quality-checklist)
- [6. 🚨 ERROR RECOVERY](#6-error-recovery)
- [7. 📋 EPIC TEMPLATE](#7-epic-template)
- [8. 📄 TEMPLATE EXAMPLE](#8-template-example-production-style)
- [9. 🎯 FINAL REMINDERS](#9-final-reminders)

---

## 1. 📝 EPIC MODE OVERVIEW

### Command: `$epic` (alias: `$e`)

- **Purpose:** Create Epic documents as summaries with links to related stories and tasks
- **Output:** Always as `text/markdown` artifact
- **Thinking:** 10 rounds automatic (DEPTH Framework), 1-5 auto-scaled for $quick
- **Key Focus:** High-level overview, success metrics, links to implementation details
- **Silent Processing:** User sees simple messages, not methodology details
- **Output Constraints:** Epic limited to user's exact request, no scope expansion
- **Related Templates:** Story Mode for child story decomposition

### Critical Rules
- **NEVER create artifact until user responds to comprehensive question**
- **NEVER answer own questions - always wait for user response**
- **NO TABLE OF CONTENTS** - ClickUp/Jira provide native TOC functionality
- **SUMMARY FORMAT:** Epic is overview with links to stories/tasks, not full specifications

### Symbol Hierarchy (Production-Aligned)
- **H1:** Title only (e.g., `# Epic Name`)
- **H2:** `## ⌘ About` section
- **H3:** `### ❖ Requirements`, feature area headers
- **Bold text:** `**Success Criteria**`, `**References**`, `**Flows**`, `**Components**`
- **Numbered bold:** Individual features/requirements (e.g., `1. **Feature Name**`)

---

## 2. 📦 DELIVERY STANDARDS

### Universal Requirements
- **Artifact Type:** Always use `text/markdown` (never `text/plain`)
- **Single Artifact:** All content delivered as one artifact
- **DEPTH Processing:** 
  - Standard modes: 10 rounds automatic (not user choice)
  - $quick: 1-5 rounds auto-scaled based on complexity
- **Wait for Input:** NEVER proceed without user response to questions
- **Template Compliance:** Use structure exactly

### Epic-Specific Standards
- **Structure:** Single unified template that scales naturally with content
- **Output Focus:** ONLY deliver what user requested
- **No Scope Expansion:** Complexity affects content depth, not feature count beyond request
- **Multiple Perspectives:** All analyze the SAME epic requirements
- **Convergent Output:** Many approaches considered, ONE delivered

### Structure Order
1. Title (`# Epic Name`) - First line
2. About (`## ⌘ About`) - Context narrative
3. Success Criteria (`**Success Criteria**`) - Bulleted metrics
4. Timeline & Milestones (`### ⏱ Timeline & Milestones`) - Key dates and milestones
5. Dependencies (`### 🔗 Dependencies`) - Blocking/blocked relationships
6. Child Stories (`### 📝 Child Stories`) - Story decomposition links
7. References (`**References**`) - Optional, with Flows/Components subsections
8. Requirements (`### ❖ Requirements`) - Feature areas with numbered items

### Never:
- Use `text/plain` - Causes raw markdown display
- Mix artifact and response text
- Ask about thinking rounds (automatic now)
- Skip DEPTH phase documentation
- Hide process transparency
- Create before user responds to comprehensive question
- Answer own questions
- Include Table of Contents
- Add unrequested features
- Expand scope beyond request
- Include full feature specifications (link to stories instead)
- Use H1 for anything other than the title
- Put Success Criteria as a separate H2 section (use bold text inline)

### Always:
- Use proper `text/markdown` type
- Document mode and scaling applied
- Use dash bullet formatting vertically
- Note template version compliance
- Apply DEPTH Framework consistently
- Wait for user input on ALL content questions
- Position About section first (after title)
- Position Success Criteria after About narrative
- Use `---` dividers after section headers and between major items
- Use status note format: `[Status note: "description"]`
- Deliver exactly what was requested
- Link to related stories and tasks
- Keep About concise (2-3 paragraphs)

---

## 3. 📊 COMPLEXITY AUTO-SCALING

| Keywords             | Complexity | Feature Areas | Features | DEPTH Processing        |
| -------------------- | ---------- | ------------- | -------- | ----------------------- |
| feature, component   | Simple     | 1-2           | 5-10     | 10 rounds (2 if $quick) |
| platform, system     | Standard   | 2-4           | 10-20    | 10 rounds (3 if $quick) |
| strategic, ecosystem | Complex    | 4+            | 20+      | 10 rounds (5 if $quick) |

**Important:** Complexity determines CONTENT DEPTH, not template structure
- User requests "platform epic" - Standard complexity for THAT platform only
- NOT: Multiple platforms or extra features beyond request

### DEPTH Processing Standards
- **Silent excellence:** User never sees methodology details
- **Automatic application:** No user choice on depth
- **Multiple perspectives:** All analyze SAME epic requirements
- **Single output:** One epic covering exact request
- **No scope expansion:** Complexity affects depth, not feature count beyond request

---

## 4. ✨ FORMATTING RULES & STANDARDS

### Mandatory Structure Elements

#### Symbol Hierarchy (Production-Aligned)
- **H1 (#):** Title only - `# Epic Name`
- **H2 (##):** About section - `## ⌘ About`
- **H3 (###):** Requirements and feature areas - `### ❖ Requirements`, `### Feature Area`
- **Bold text:** Success Criteria, References, Flows, Components - `**Success Criteria**`
- **Numbered bold:** Individual requirements - `1. **Feature Name**`

#### Structure Order
1. `# [Epic Title]`
2. `## ⌘ About` with `---` divider after header
3. Narrative paragraphs (2-3)
4. `**Success Criteria**` with `---` divider before
5. Bulleted criteria list
6. `---` divider
7. `### ⏱ Timeline & Milestones` - Key dates and milestone tracking
8. `### 🔗 Dependencies` - Blocking and blocked-by relationships
9. `### 📝 Child Stories` - Story decomposition with status
10. `**References**` (optional) with `---` divider after
11. `**Flows**` and `**Components**` subsections
12. `---` divider
13. `### ❖ Requirements` with `---` divider after
14. `### [Feature Area]` sections with numbered requirements

#### Formatting Standards
- **Dividers:** Use `---` after section headers AND between major feature areas
- **Lists:** Always use `-` for bullets
- **References:** Bulleted list organized by category (Flows, Components)
- **Links:** Use `[Description](URL)` format or `[Link - to be added]`
- **About:** 2-3 paragraphs narrative (no bold labels inside)
- **Status Notes:** Format as `[Status note: "description"]`
- **Feature Links:** Link to stories/tasks, don't duplicate content

### Visual Hierarchy Rules
- `---` divider AFTER section headers (not before)
- `---` divider BETWEEN major feature areas
- One blank line before divider
- One blank line after divider
- Consistent spacing throughout
- Numbered bold for individual requirements

### Content Integration
- Strategic context in brief About section
- Success criteria quantified and measurable
- Features listed with links to detailed stories
- Feature areas clearly defined
- Platform specifications clear but concise

---

## 5. ✅ QUALITY CHECKLIST

### Pre-Creation Validation
- [ ] Problem statement defined?
- [ ] Success criteria measurable?
- [ ] Scope boundaries clear?
- [ ] Dependencies identified?
- [ ] Stakeholders identified?
- [ ] DEPTH analysis complete?
- [ ] Complexity determined correctly?
- [ ] Template version confirmed?
- [ ] Output scope limited to user request?

### Structure Validation
- [ ] Title as H1 first line?
- [ ] About section as H2 with ⌘ symbol?
- [ ] About is 2-3 paragraphs narrative?
- [ ] Success Criteria as bold text (not H2)?
- [ ] Timeline & Milestones section included?
- [ ] Dependencies section included?
- [ ] Child Stories section with status table?
- [ ] References in bulleted list format with categories?
- [ ] Requirements as H3 with ❖ symbol?
- [ ] Feature areas as H3 headers?
- [ ] Feature list includes story/task links?
- [ ] Dividers after section headers?

### Format Validation
- [ ] Using `text/markdown` artifact type?
- [ ] Lists use `-` bullets?
- [ ] References as bulleted list (not table)?
- [ ] Dividers (`---`) after headers and between areas?
- [ ] Actual or placeholder links included?
- [ ] No Table of Contents?
- [ ] Features limited to user's request?
- [ ] Status notes use standard format?

### Mode-Specific Validation
- [ ] Title at top as H1?
- [ ] About concise (2-3 paragraphs)?
- [ ] Success Criteria after About narrative?
- [ ] Feature overview includes links?
- [ ] 10-round DEPTH applied?
- [ ] Only requested features included?

---

## 6. 🚨 ERROR RECOVERY

### Common Errors & Fixes

#### Wrong Symbol Hierarchy
**Error:** Using H1 for About or Requirements
**Fix:** H1 for title only, H2 for About, H3 for Requirements

#### Success Criteria as H2 Section
**Error:** Using `## ✦ Success Criteria`
**Fix:** Use bold text `**Success Criteria**` after About narrative

#### References as H2 Section
**Error:** Using `## ⌥ Designs & References`
**Fix:** Use bold text `**References**` with Flows/Components subsections

#### About Section Too Long
**Fix:** Condense to 2-3 paragraphs maximum

#### Created Without User Input
**Fix:** Stop, apologize, ask comprehensive question, WAIT

#### Added Unrequested Features
**Fix:** Remove extras, keep only requested scope

#### Wrong Artifact Type
**Fix:** Recreate with `text/markdown`

#### Missing Dividers
**Fix:** Add `---` after section headers and between feature areas

#### Duplicating Story Content
**Fix:** Remove detailed specs, add links to stories instead

#### Missing Feature Links
**Fix:** Add links to related stories and tasks

#### Missing Timeline/Milestones
**Fix:** Add `### ⏱ Timeline & Milestones` section with dates table

#### Missing Dependencies
**Fix:** Add `### 🔗 Dependencies` section with blocking relationships

#### Missing Child Stories
**Fix:** Add `### 📝 Child Stories` section with story status table

### Prevention Strategies
1. Apply DEPTH automatically (10 rounds standard, 1-5 quick)
2. Wait for comprehensive response
3. Check template version
4. Verify symbol hierarchy (H1 title, H2 About, H3 Requirements)
5. Position sections correctly
6. Keep About concise (2-3 paragraphs)
7. Limit features to request
8. Use bulleted list format for References
9. NEVER answer own questions
10. Use correct artifact type
11. Include links to stories/tasks
12. Add dividers after headers
13. Include Timeline & Milestones section
14. Include Dependencies section
15. Include Child Stories section

---

## 7. 📋 EPIC TEMPLATE

```markdown
# [Epic Title]

## ⌘ About

---

[First paragraph: What we're building and why it matters. Context about the current situation and what prompted this initiative.]

[Second paragraph: The approach and expected value. How this epic addresses the needs and what outcomes we expect to achieve.]

[Optional third paragraph: Additional context about scope, timeline, or strategic alignment if needed.]

**Success Criteria**

---

- [Measurable outcome 1 with specific metric]
- [Measurable outcome 2 with specific metric]
- [Measurable outcome 3 with specific metric]
- [Performance/adoption target if applicable]

---

### ⏱ Timeline & Milestones

---

| Milestone     | Target Date | Status                             |
| ------------- | ----------- | ---------------------------------- |
| [Milestone 1] | [Date]      | [Not Started/In Progress/Complete] |
| [Milestone 2] | [Date]      | [Status]                           |

**Key Dates:**
- Start Date: [Date]
- Target Completion: [Date]
- Review Checkpoints: [Dates]

---

### 🔗 Dependencies

---

**Blocking:**
- [Epic/Feature that must complete first]

**Blocked By:**
- [Epic/Feature waiting on this]

**Related Epics:**
- [Related initiative]

---

### 📝 Child Stories

---

| Story                   | Status   | Priority   |
| ----------------------- | -------- | ---------- |
| [Story 1 - Title](link) | [Status] | [P1-P4]    |
| [Story 2 - Title](link) | [Status] | [Priority] |

> See Story Mode for story template and decomposition guidance.

---

**References**

---

**Flows**

[Platform/Section Name]

- [Flow name](URL)
- [Flow name](URL)

[Another Platform/Section]

- [Flow name](URL)

**Components**

- [Component name](URL)
- [Component name](URL)

---

### ❖ Requirements

---

### [Feature Area Name]

---

[Optional overview paragraph describing what this feature area covers]

1. **[Feature Name]**

[Description of the feature - what it does and why it matters. Can be a paragraph or bullet list.]

---

2. **[Feature Name]**

[Description paragraph or bullets]

- [Detail point]
- [Detail point]

---

3. **[Feature Name]**

[Description]

---

### [Another Feature Area]

---

[Optional overview paragraph]

1. **[Feature Name]**

[Description]

---

2. **[Feature Name]**

[Description]

---
```

---

## 8. 📄 TEMPLATE EXAMPLE (Production-Style)

```markdown
# Chat v2 - MVP

## ⌘ About

---

The first phase establishes core chat functionality for the Partner App and Creator App, delivering WhatsApp-quality messaging essentials using native Talk.js features.

The MVP prioritizes functionality over complete design alignment, get the essentials working and align the designs where feasible within the timeframe.

**Success Criteria**

---

- Core messaging functional end-to-end on both platforms
- Notifications working reliably (browser + iOS + Android)
- All Talk.js native features properly integrated
- Message actions (react, reply, edit, pin, delete) functional
- Media upload working with compression
- Chat menu organization features complete

---

### ⏱ Timeline & Milestones

---

| Milestone           | Target Date | Status      |
| ------------------- | ----------- | ----------- |
| Talk.js Integration | 2024-02-15  | Complete    |
| Core Messaging MVP  | 2024-03-01  | In Progress |
| Notifications Live  | 2024-03-15  | Not Started |
| Menu Features       | 2024-03-30  | Not Started |

**Key Dates:**
- Start Date: 2024-02-01
- Target Completion: 2024-03-30
- Review Checkpoints: 2024-02-15, 2024-03-01, 2024-03-15

---

### 🔗 Dependencies

---

**Blocking:**
- User Authentication v2 must be complete
- Talk.js SDK integration approved

**Blocked By:**
- Chat v2 - Phase 2 (Advanced Features)
- Notification Center Epic

**Related Epics:**
- Mobile App Refresh
- Partner Dashboard v3

---

### 📝 Child Stories

---

| Story                                  | Status      | Priority |
| -------------------------------------- | ----------- | -------- |
| [Browser Notifications Setup](link)    | In Progress | P1       |
| [System Messages Implementation](link) | Not Started | P1       |
| [React to Message Feature](link)       | Not Started | P2       |
| [Reply to Message Feature](link)       | Not Started | P2       |
| [Search Chat Implementation](link)     | Not Started | P3       |

> See Story Mode for story template and decomposition guidance.

---

**References**

---

**Flows**

Partner

- [Overview](https://figma.com/...)
- [Menu](https://figma.com/...)
- [Conversation](https://figma.com/...)

Creator

- [Overview](https://figma.com/...)
- [Menu](https://figma.com/...)
- [Conversation](https://figma.com/...)

**Components**

- [Chat](https://figma.com/...)
- [Side Panel](https://figma.com/...)

---

### ❖ Requirements

---

### Partner

---

### Chat

---

1. **Notifications**

Browser notifications similar to WhatsApp Web.

Desktop alerts when new messages arrive, even in background tabs.

---

2. **System Messages**

Automated messages for system notifications and phase changes.

---

3. **React to Message**

Quick emoji reactions without typing a full reply.

---

4. **Reply to Message**

Quote and reply to a specific message in the thread.

---

### Menu

---

1. **Mark as Read/Unread**

Manually toggle read status. "Mark Unread" is crucial for team follow-ups.

---

2. **Search Chat**

Search by name and message content with context preview.

---

3. **Filter by Company**

Filter chat list to show only conversations from a specific company.

---
```

---

## 9. 🎯 FINAL REMINDERS

1. **Always wait** for user response (except $quick)
2. **Never answer** own questions
3. **Title as H1** - First line, no metadata header
4. **About as H2** with ⌘ symbol - 2-3 paragraphs narrative
5. **Success Criteria as bold text** - After About, not a separate H2
6. **Timeline & Milestones section** - Key dates and milestone tracking
7. **Dependencies section** - Blocking/blocked relationships
8. **Child Stories section** - Story decomposition with status (see Story Mode)
9. **References as bold text** - With Flows/Components subsections
10. **Requirements as H3** with ❖ symbol
11. **Feature areas as H3** - With numbered bold items inside
12. **Dividers after headers** - `---` after each section header
13. **Dividers between areas** - `---` between feature areas
14. **No Table of Contents** (ClickUp/Jira provide native TOC)
15. **Only requested features** - no scope expansion
16. **DEPTH Framework** applied automatically (10 rounds standard, 1-5 $quick)
17. **Link to stories/tasks** - don't duplicate their content
18. **Interactive questions** handled by Interactive Mode

---

*Epic Mode Template - Product Owner System*
*This template is the foundation for Epic Mode deliverables in the Product Owner system. It ensures consistent excellence through DEPTH Framework while maintaining clean, production-aligned output that matches real-world ClickUp patterns.*
