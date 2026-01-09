# Owner - Template - Story Mode - v0.152

User story templates with integrated formatting rules and quality standards. All delivery logic consolidated for self-contained operation.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides self-contained user story templates in narrative format for creating user-centered requirements when $story or $s command is detected
**Scope:** Story Mode command structure, delivery standards, complexity auto-scaling rules, quality validation checklists, error recovery protocols, template formats (Simple/Standard/Complex/Quick), formatting standards, and story-specific requirements
**Output Path:** `/export/[###]-artifact.md`

---

## 📋 TABLE OF CONTENTS
1. [📖 STORY MODE OVERVIEW](#1-story-mode-overview)
2. [📦 DELIVERY STANDARDS](#2-delivery-standards)
3. [📏 COMPLEXITY AUTO-SCALING](#3-complexity-auto-scaling)
4. [✅ QUALITY CHECKLIST](#4-quality-checklist)
5. [🚨 ERROR RECOVERY](#5-error-recovery)
6. [🔵 SIMPLE STORY TEMPLATE](#6-simple-story-template)
7. [🟠 STANDARD STORY TEMPLATE](#7-standard-story-template)
8. [🔴 COMPLEX STORY TEMPLATE](#8-complex-story-template)
9. [⚡ QUICK MODE TEMPLATE](#9-quick-mode-template)
10. [📄 TEMPLATE EXAMPLE](#10-template-example-production-style)
11. [🎯 FINAL REMINDERS](#11-final-reminders)
12. [📚 CROSS-REFERENCES](#12-cross-references)
13. [📝 VERSION HISTORY](#13-version-history)

---

## 1. 📖 STORY MODE OVERVIEW

### Command Aliases

| Command        | Alias      | Description                            |
| -------------- | ---------- | -------------------------------------- |
| `$story`       | `$s`       | Create user story in narrative format  |
| `$quick story` | `$q story` | Quick mode - no questions, auto-scaled |

### Command: `$story`

- **Purpose:** Create user stories in narrative format that auto-scale complexity
- **Output:** Always as `text/markdown` artifact
- **Thinking:** 10 rounds automatic (DEPTH Framework), 1-5 auto-scaled for $quick
- **Interactive Mode:** Single comprehensive question gathering ALL requirements (see Interactive Mode)
- **Key Focus:** User journey, narrative context, and implementation requirements
- **Output Constraints:** Story contains ONLY the requested feature/capability

### Critical Rules
- **NEVER create artifact until user responds to comprehensive questions**
- **NEVER answer own questions - always wait for user response**
- **NO TABLE OF CONTENTS** - ClickUp/Jira provide native TOC functionality
- **NARRATIVE ABOUT:** About section tells the story of what and why
- **INTERACTIVE QUESTIONS:** Handled by Interactive Mode file, not in template

### Symbol Hierarchy (Production-Aligned)
- **H1 (#):** Title only (e.g., `# Story Name`)
- **H2 (##):** `## ⌘ About`, `## ❖ Requirements`
- **H3 (###):** `### **Success Criteria**`, requirement section headers
- **Numbered bold:** Success criteria items, requirement items (e.g., `1. **Item Name**`)

### Note on Development Tasks
For development tasks with QA checklists and resolution tracking, use `$task` command which references **Owner - Template - Task Mode**

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

### Story-Specific Standards
- **Structure:** Single unified template that scales with complexity
- **Output Focus:** ONLY deliver what user requested
- **No Scope Expansion:** Template scaling affects structure depth, not content scope
- **Multiple Perspectives:** All analyze the SAME requirement
- **Convergent Output:** Many approaches considered, ONE delivered
- **User Journey Focus:** Emphasize user perspective and experience

### Structure Order
1. Title (`# Story Name`) - First line
2. User Story Statement - Traditional Agile format
3. About (`## ⌘ About`) - Context narrative with `---` divider after header
4. Success Criteria (`### **Success Criteria**`) - Numbered items with sub-bullets
5. Acceptance Criteria (`### **Acceptance Criteria**`) - Testable requirements
6. Acceptance Scenarios (BDD) (`### **Acceptance Scenarios (BDD)**`) - Given/When/Then
7. Requirements (`## ❖ Requirements`) - Section headers with numbered items

### Mandatory Structure Elements

#### Traditional User Story Format
Every story MUST include the classic Agile user story statement immediately after the title:

```
**As a** [role/persona]
**I want** [feature/capability]
**So that** [benefit/value]
```

#### Acceptance Criteria
Testable, specific conditions that must be met for the story to be considered complete:

```
### **Acceptance Criteria**

---

- [ ] [Specific testable requirement]
- [ ] [Specific testable requirement]
- [ ] [Specific testable requirement]
```

#### BDD Acceptance Scenarios
Behavior-Driven Development scenarios using Given/When/Then syntax:

```
### **Acceptance Scenarios (BDD)**

---

**Scenario 1:** [Scenario Name]
- **Given** [initial context/precondition]
- **When** [action taken by user/system]
- **Then** [expected outcome/result]

---

**Scenario 2:** [Scenario Name]
- **Given** [initial context]
- **When** [action taken]
- **Then** [expected outcome]
```

#### Symbol Hierarchy (Production-Aligned)
- **H1 (#):** Title only - `# Story Name`
- **H2 (##):** About and Requirements - `## ⌘ About`, `## ❖ Requirements`
- **H3 (###):** Success Criteria, Acceptance Criteria, BDD Scenarios, and requirement sections - `### **Success Criteria**`, `### Section Name`
- **Numbered bold:** Individual items - `1. **Item Name**`

#### Formatting Standards
- **Dividers:** Use `---` after section headers AND after each numbered item
- **Lists:** Always use `-` for bullets
- **Checkboxes:** Always use `- [ ]` format (with space inside brackets)
- **Links:** Use `[Description](URL)` format with actual URLs
- **About:** 2-3 paragraphs narrative describing context, what changed, and value
- **Success Criteria:** Numbered items with bold titles and sub-bullets
- **Acceptance Criteria:** Checkbox list of testable requirements
- **BDD Scenarios:** Named scenarios with Given/When/Then structure
- **Requirements:** H3 section headers with numbered bold items inside

### Visual Hierarchy Rules
- Use `---` after section headers
- Use `---` after each numbered success criterion
- Use `---` after each numbered requirement
- Use `---` after each BDD scenario
- H2 for About and Requirements sections
- H3 for Success Criteria, Acceptance Criteria, BDD Scenarios, and requirement area headers
- One blank line before divider, one blank line after divider

### Content Integration
- **User Story Statement:** Classic Agile format at top
- **About Section:** Context narrative explaining the change and its value
- **Success Criteria:** Numbered categories with measurable sub-bullets
- **Acceptance Criteria:** Checkbox list of testable requirements
- **BDD Scenarios:** Given/When/Then acceptance scenarios
- **Requirements:** Grouped by area with numbered items and descriptions
- Story covers ONLY requested feature
- Emphasis on practical implementation details

### Never:
- Use `text/plain` - Causes raw markdown display
- Use H1 for anything other than title
- Put Success Criteria as H2 with ✦ symbol (use H3 with bold text)
- Include separate Features list
- Include separate User Need / Business Value sections
- Include Change Summary section
- Include Designs & References as separate section
- Answer own questions
- Add unrequested features
- Expand scope beyond request
- Use `- []` format (must be `- [ ]` with space)

### Always:
- Include traditional user story format (As a/I want/So that)
- Include Acceptance Criteria section
- Include BDD Scenarios (Given/When/Then)
- Use proper `text/markdown` type
- Use H2 for About (with ⌘) and Requirements (with ❖)
- Use H3 for Success Criteria (with bold text) and requirement sections
- Use numbered bold for individual items
- Use `- [ ]` for checkboxes (with space inside brackets)
- Add `---` dividers after headers and after each numbered item
- Wait for user input on ALL content questions
- Deliver exactly what was requested

---

## 3. 📏 COMPLEXITY AUTO-SCALING

| Keywords                    | Complexity | Sections | Focus                   | DEPTH Processing          |
| --------------------------- | ---------- | -------- | ----------------------- | ------------------------- |
| simple, basic, quick        | Simple     | 2-3      | Single component update | 10 rounds (1-2 if $quick) |
| feature, capability, page   | Standard   | 4-5      | Complete page/feature   | 10 rounds (3 if $quick)   |
| platform, system, ecosystem | Complex    | 6-8      | Multi-component system  | 10 rounds (5 if $quick)   |

**Important:** Complexity determines TEMPLATE DEPTH, not content scope
- User requests "simple button update" - Simple template for THAT button only
- NOT: Simple template with multiple button variations or extra features

### DEPTH Processing Standards
- **Multiple perspectives:** All analyze SAME requirement
- **Single output:** One story covering exact request
- **No scope expansion:** Complexity affects template size, not feature count

---

## 4. ✅ QUALITY CHECKLIST

### Pre-Creation Validation
- [ ] DEPTH Framework methodology applied (10 rounds standard, 1-5 quick)?
- [ ] User responded to comprehensive question?
- [ ] System waited for response (never answered own questions)?
- [ ] Complexity determined correctly?
- [ ] Template version confirmed?
- [ ] Output scope limited to user request?

### Structure Validation
- [ ] Title as H1 first line?
- [ ] User Story statement present (As a/I want/So that)?
- [ ] About section as H2 with ⌘ symbol?
- [ ] About is 2-3 paragraphs narrative?
- [ ] Success Criteria as H3 with bold text?
- [ ] Success Criteria has numbered items with sub-bullets?
- [ ] Acceptance Criteria section present with checkboxes?
- [ ] BDD Scenarios present with Given/When/Then?
- [ ] Requirements as H2 with ❖ symbol?
- [ ] Requirement sections as H3 headers?
- [ ] Numbered bold for individual items?
- [ ] Dividers after headers and after numbered items?

### Format Validation
- [ ] Using `text/markdown` artifact type?
- [ ] Lists use `-` bullets?
- [ ] Checkboxes use `- [ ]` format (with space)?
- [ ] Dividers (`---`) after headers and items?
- [ ] Actual links included (not placeholders)?
- [ ] No Table of Contents?
- [ ] No unrequested features?
- [ ] Content limited to requested feature?
- [ ] Status notes use format `[Status note: "description"]` with quotes?

### Story-Specific Validation
- [ ] User Story format included at top?
- [ ] Acceptance Criteria are testable?
- [ ] BDD Scenarios cover key behaviors?
- [ ] About section is narrative only (no bold labels)?
- [ ] Success Criteria has numbered categories?
- [ ] Requirements grouped by area?
- [ ] Inline images used where needed (no separate Designs section)?
- [ ] Implementation focus maintained?
- [ ] Practical details included?

---

## 5. 🚨 ERROR RECOVERY

### Common Errors & Fixes

#### Missing User Story Statement
**Error:** Story lacks "As a / I want / So that" format
**Fix:** Add user story statement immediately after title

#### Missing Acceptance Criteria
**Error:** No testable acceptance criteria section
**Fix:** Add `### **Acceptance Criteria**` with checkbox items

#### Missing BDD Scenarios
**Error:** No Given/When/Then scenarios
**Fix:** Add `### **Acceptance Scenarios (BDD)**` with structured scenarios

#### Wrong Checkbox Syntax
**Error:** Using `- []` instead of `- [ ]`
**Fix:** Ensure space inside brackets: `- [ ]`

#### Wrong Symbol Hierarchy
**Error:** Using H1 for About or Requirements
**Fix:** H1 for title only, H2 for About/Requirements, H3 for Success Criteria/sections

#### Success Criteria as H2 with ✦
**Error:** Using `## ✦ Success Criteria`
**Fix:** Use `### **Success Criteria**` (H3 with bold text)

#### Using H4 for Subsections
**Error:** Using `#### **1. Item**`
**Fix:** Use numbered bold directly under H3 headers (no H4)

#### Including Separate Designs Section
**Error:** Using `## ⌥ Designs & References`
**Fix:** Use inline images in Requirements, or add **References** bold subsection if needed

#### Including Features List
**Error:** Adding separate `**Features**` bulleted list
**Fix:** Remove - About narrative and Requirements cover this

#### Including User Need / Business Value Sections
**Error:** Adding numbered `1. **User Need**` and `2. **Business Value**` sections
**Fix:** Remove - weave these concepts into the About narrative

#### Including Change Summary
**Error:** Adding `# ❖ Change Summary` section at bottom
**Fix:** Remove entirely - not used in production stories

#### Missing Dividers After Items
**Fix:** Add `---` after EACH numbered success criterion and requirement

#### Created Without User Input
**Fix:** Stop, apologize, ask comprehensive question, WAIT

#### Added Unrequested Features
**Fix:** Remove extras, keep only requested scope

#### Wrong Artifact Type
**Fix:** Recreate with `text/markdown`

### Prevention Strategies
1. Apply DEPTH Framework automatically (10 rounds standard, 1-5 quick)
2. Wait for comprehensive response
3. Check template version
4. Include user story statement (As a/I want/So that)
5. Include Acceptance Criteria with checkboxes
6. Include BDD Scenarios (Given/When/Then)
7. Verify symbol hierarchy (H1 title, H2 About/Requirements, H3 Success Criteria/sections)
8. Position sections correctly
9. Add dividers after headers AND after each numbered item
10. Use `- [ ]` for checkboxes (with space)
11. Limit output to request
12. Use correct artifact type
13. NEVER answer own questions

---

## 6. 🔵 SIMPLE STORY TEMPLATE

```markdown
# [Story Title]

**As a** [role/persona]
**I want** [feature/capability]
**So that** [benefit/value]

## ⌘ About

---

[Narrative paragraph describing the context, what is being changed or built, and why it matters. This should tell the story of the feature from the user's perspective.]

[Second paragraph expanding on the approach, expected value, or additional context as needed.]

### **Success Criteria**

---

1. **[Criterion Category]**

---

- [Specific measurable criterion]
- [Specific measurable criterion]

---

2. **[Criterion Category]**

---

- [Specific measurable criterion]
- [Specific measurable criterion]

---

### **Acceptance Criteria**

---

- [ ] [Specific testable requirement]
- [ ] [Specific testable requirement]
- [ ] [Specific testable requirement]

---

### **Acceptance Scenarios (BDD)**

---

**Scenario 1:** [Scenario Name]
- **Given** [initial context]
- **When** [action taken]
- **Then** [expected outcome]

---

## ❖ Requirements

### [Requirement Section]

---

[Optional intro paragraph if needed]

1. **[Requirement Name]**

---

[Description of the requirement - what it does and any implementation details]

- [Detail point if needed]
- [Detail point if needed]

---

2. **[Requirement Name]**

---

[Description]

---
```

---

## 7. 🟠 STANDARD STORY TEMPLATE

```markdown
# [Story Title]

**As a** [role/persona]
**I want** [feature/capability]
**So that** [benefit/value]

## ⌘ About

---

[First paragraph: Context about the current situation and what prompted this change. Describe the user need or problem being addressed.]

[Second paragraph: What is being built or changed and why it matters. The approach and expected value.]

[Optional third paragraph: Additional context about scope, timeline, or strategic alignment if needed.]

### **Success Criteria**

---

1. **[Criterion Category]**

---

- [Specific measurable criterion]
- [Specific measurable criterion]
- [Specific measurable criterion]

---

2. **[Criterion Category]**

---

- [Specific measurable criterion]
- [Specific measurable criterion]

---

3. **[Criterion Category]**

---

- [Specific measurable criterion]
- [Specific measurable criterion]

---

### **Acceptance Criteria**

---

- [ ] [Specific testable requirement]
- [ ] [Specific testable requirement]
- [ ] [Specific testable requirement]
- [ ] [Specific testable requirement]
- [ ] [Specific testable requirement]

---

### **Acceptance Scenarios (BDD)**

---

**Scenario 1:** [Happy Path - Primary Use Case]
- **Given** [initial context/precondition]
- **When** [action taken by user]
- **Then** [expected outcome]

---

**Scenario 2:** [Alternative Path]
- **Given** [different initial context]
- **When** [alternative action]
- **Then** [expected outcome]

---

**Scenario 3:** [Edge Case/Error Handling]
- **Given** [edge case context]
- **When** [triggering action]
- **Then** [expected behavior]

---

## ❖ Requirements

### [Requirement Section Name]

---

[Optional overview paragraph describing what this section covers]

1. **[Requirement Name]**

---

[Description of the requirement with implementation details]

- [Detail point]
- [Detail point]

![](image-url-if-needed)

---

2. **[Requirement Name]**

---

[Description paragraph]

**[Subsection if needed]**

- [Detail point]
- [Detail point]

---

3. **[Requirement Name]**

---

[Description]

---

### [Another Requirement Section]

---

1. **[Requirement Name]**

---

[Description]

---

2. **[Requirement Name]**

---

[Description]

---
```

---

## 8. 🔴 COMPLEX STORY TEMPLATE

```markdown
# [Story Title]

**As a** [role/persona]
**I want** [feature/capability]
**So that** [benefit/value]

## ⌘ About

---

[First paragraph: Comprehensive context about the current situation, user impact, and what prompted this initiative. Describe the challenges and user needs being addressed.]

[Second paragraph: What is being built or changed, the approach being taken, and the expected outcomes. How this addresses the identified needs.]

[Third paragraph: Additional context about scope, strategic alignment, timeline considerations, or related initiatives. Dependencies and relationships to other work.]

### **Success Criteria**

---

1. **[Criterion Category]**

---

- [Specific measurable criterion]
- [Specific measurable criterion]
- [Specific measurable criterion]

---

2. **[Criterion Category]**

---

- [Specific measurable criterion]
- [Specific measurable criterion]
- [Specific measurable criterion]

---

3. **[Criterion Category]**

---

- [Specific measurable criterion]
- [Specific measurable criterion]

---

4. **[Criterion Category]**

---

- [Specific measurable criterion]
- [Specific measurable criterion]

---

### **Acceptance Criteria**

---

- [ ] [Specific testable requirement - functional]
- [ ] [Specific testable requirement - functional]
- [ ] [Specific testable requirement - performance]
- [ ] [Specific testable requirement - accessibility]
- [ ] [Specific testable requirement - edge case]
- [ ] [Specific testable requirement - integration]

---

### **Acceptance Scenarios (BDD)**

---

**Scenario 1:** [Happy Path - Primary Use Case]
- **Given** [initial context/precondition]
- **When** [primary action taken by user]
- **Then** [expected successful outcome]

---

**Scenario 2:** [Happy Path - Secondary Use Case]
- **Given** [different valid context]
- **When** [alternative valid action]
- **Then** [expected outcome]

---

**Scenario 3:** [Edge Case - Boundary Condition]
- **Given** [boundary condition context]
- **When** [action at boundary]
- **Then** [expected boundary behavior]

---

**Scenario 4:** [Error Handling - Invalid Input]
- **Given** [context with potential for error]
- **When** [invalid action attempted]
- **Then** [graceful error handling]

---

**Scenario 5:** [Performance - Under Load]
- **Given** [high-load context]
- **When** [action under load]
- **Then** [acceptable performance]

---

## ❖ Requirements

### [Major Requirement Area 1]

---

[Overview paragraph describing what this section covers and any key context]

1. **[Requirement Name]**

---

[Description of the requirement]

**[Subsection A]**

- [Detail point]
- [Detail point]
- [Detail point]

**[Subsection B]**

- [Detail point]
- [Detail point]

![](image-url-if-applicable)

---

2. **[Requirement Name]**

---

[Description]

- [Detail point]
- [Detail point]

---

3. **[Requirement Name]**

---

[Description]

**Implement [specific logic]:**

- [Condition 1]: [Behavior]
- [Condition 2]: [Behavior]
- [Condition 3]: [Behavior]

---

### [Major Requirement Area 2]

---

[Overview paragraph]

1. **[Requirement Name]**

---

[Description]

**[Sub-feature A]**

- [Detail point]
- [Detail point]

**[Sub-feature B]**

- [Detail point]
- [Detail point]

---

2. **[Requirement Name]**

---

[Description]

---

### [Major Requirement Area 3]

---

1. **[Requirement Name]**

---

[Description with technical details as needed]

---

2. **[Requirement Name]**

---

[Description]

- [Detail point]
- [Detail point]
- [Detail point]

---
```

---

## 9. ⚡ QUICK MODE TEMPLATE

### Quick Mode Rules
- **NO questions asked** - System proceeds immediately
- **Auto-detection** - Complexity determined from keywords
- **1-5 round scaling** - Based on detected complexity
- **Minimal format** - Essential sections only
- **Same scope discipline** - Only requested content

### $quick story
```markdown
# [Story Title]

**As a** [role/persona]
**I want** [feature/capability]
**So that** [benefit/value]

## ⌘ About

---

[1-2 paragraphs describing the context, what is being changed, and why it matters]

### **Success Criteria**

---

1. **[Category]**

---

- [Primary criterion]
- [Secondary criterion]

---

### **Acceptance Criteria**

---

- [ ] [Primary testable requirement]
- [ ] [Secondary testable requirement]

---

### **Acceptance Scenarios (BDD)**

---

**Scenario 1:** [Primary Use Case]
- **Given** [initial context]
- **When** [action taken]
- **Then** [expected outcome]

---

## ❖ Requirements

### [Section Name]

---

1. **[Requirement]**

---

[Description]

---

2. **[Requirement]**

---

[Description]

---
```

---

## 10. 📄 TEMPLATE EXAMPLE (Production-Style)

```markdown
# Chat v2 - P.2 - Navigation

**As a** Partner App user
**I want** a resizable sidebar navigation system
**So that** I can efficiently navigate between features while maintaining visibility of my Barter deals

## ⌘ About

---

The Partner App is transitioning from a top-header navigation to a robust, resizable sidebar system to improve scalability and multi-company management.

This new sidebar provides a persistent workspace for partners to navigate core features while maintaining a real-time overview of their Barter deals. It supports dynamic resizing and collapsed states to give users control over their screen real estate.

### **Success Criteria**

---

1. **Navigation**

---

- Navigation items align with the updated Design System specifications, and defined width constraints enforced
- Deactivate the existing top header navigation, and integrate the Sidebar as the primary navigation for the Partner App
- Sidebar transition between collapsed and expanded states is smooth and performance-optimized

---

2. **State Management**

---

- Enable local storage persistence for sidebar width and collapse state
- Implement real-time updates for company count and status bullets

---

3. **Live data**

---

- Accordion shows active and draft Barter deals per company
- Implement the "Go Live" publication animation logic

---

### **Acceptance Criteria**

---

- [ ] Sidebar renders correctly in expanded state (224px-320px width)
- [ ] Sidebar renders correctly in collapsed state (56px-80px width)
- [ ] Resize handle allows smooth width adjustment within constraints
- [ ] Sidebar state persists across browser sessions via local storage
- [ ] Navigation items are keyboard accessible
- [ ] "Go Live" animation triggers correctly when deal status changes
- [ ] Company count updates in real-time
- [ ] All navigation links route to correct destinations

---

### **Acceptance Scenarios (BDD)**

---

**Scenario 1:** User expands collapsed sidebar
- **Given** the sidebar is in collapsed state
- **When** the user clicks the expand toggle
- **Then** the sidebar smoothly expands to the last saved width

---

**Scenario 2:** User resizes sidebar
- **Given** the sidebar is in expanded state
- **When** the user drags the resize handle
- **Then** the sidebar width adjusts within 224px-320px constraints and the new width is saved

---

**Scenario 3:** Deal goes live
- **Given** a Barter deal is in Draft status and the Accordion is closed
- **When** the deal status changes to Live
- **Then** the Accordion opens and the "Go Live" animation plays with 600ms easeInOut

---

**Scenario 4:** User navigates with keyboard
- **Given** the user is using keyboard navigation
- **When** the user tabs through the sidebar
- **Then** all navigation items receive focus in logical order

---

## ❖ Requirements

### Layout & Logic

---

The sidebar features a flexible design that adapts to any page architecture, remaining stable and accessible whether the content is fixed or scrollable, all while supporting customizable logic that empowers users to define how the component interacts with their workspace.

1. **Layout Structure**

---

![Layout diagram - see Figma designs for reference]

**Top**

- Core navigation items
- (Home, Chat, Companies, Barter Deals)

**Middle**

- Showcase section containing an accordion for Live and Draft deals

**Bottom**

- Account management component
- Displays avatar and full name
- Shows total company count indicator
- Triggers a dropdown menu with: Account settings, Help & Support, and Logout

---

2. **States & Dimensions**

---

- **Expanded State**
- Width must be adjustable between **224px** (min) and **320px** (max)
- **Collapsed State**
- Width must be adjustable between **56px** (min) and **80px** (max)
- **Resize Handle**
- A dedicated hit area on the right edge of the sidebar allows users to drag and resize

---

3. **State Persistence**

---

The app must remember the user's preferred width and state (open/collapsed) across sessions.

---

### Content & Interactions

---

1. **Barter Deal Showcase**

---

Barter deals are grouped by company and status (Live or Drafts).

The different statuses are indicated by separate accordions.

**Animation "Go Live"**

- Implement a specific visual trigger when a deal moves to "Live" state for the first time to draw the user's eye to the navigation sidebar
- Animation "easeInOut" with a duration of 600ms
- When Accordion is closed, the accordion should open first before the animation is triggered
- "New" label should be removed when user clicks on it or after 1 week

---

2. **Account Component**

---

- Displays user avatar and full name
- Shows total company count indicator
- Triggers a dropdown menu with: Account settings, Help & Support, and Logout

---
```

---

## 11. 🎯 FINAL REMINDERS

1. **Always include** user story statement (As a/I want/So that)
2. **Always include** Acceptance Criteria with testable checkboxes
3. **Always include** BDD Scenarios with Given/When/Then
4. **Always wait** for user response (except $quick)
5. **Never answer** own questions
6. **Title as H1** - First line, no metadata header
7. **User Story** - Traditional Agile format immediately after title
8. **About as H2** with ⌘ symbol - 2-3 paragraphs narrative
9. **Success Criteria as H3** with bold text - Numbered items with sub-bullets
10. **Acceptance Criteria as H3** - Checkbox list of testable requirements
11. **BDD Scenarios as H3** - Given/When/Then format
12. **Requirements as H2** with ❖ symbol
13. **Requirement sections as H3** - With numbered bold items inside
14. **Dividers after headers** - `---` after each section header
15. **Dividers after items** - `---` after each numbered success criterion and requirement
16. **Checkbox format** - Always use `- [ ]` (with space inside brackets)
17. **No Table of Contents** (ClickUp/Jira provide native TOC)
18. **No Features list** - About and Requirements cover this
19. **No User Need / Business Value sections** - Weave into About narrative
20. **No Change Summary** - Not used in production stories
21. **No separate Designs section** - Use inline images in Requirements
22. **Only requested features** - No scope expansion
23. **DEPTH Framework** applied automatically (10 rounds standard, 1-5 quick)
24. **Interactive questions** handled by Interactive Mode file

---

## 12. 📚 CROSS-REFERENCES

### Related Templates

| Mode          | Template                     | Command        | Purpose                                 |
| ------------- | ---------------------------- | -------------- | --------------------------------------- |
| **Bug Mode**  | Owner - Template - Bug Mode  | `$bug` / `$b`  | Bug reports with reproduction steps     |
| **Epic Mode** | Owner - Template - Epic Mode | `$epic` / `$e` | Large initiatives with multiple stories |
| **Doc Mode**  | Owner - Template - Doc Mode  | `$doc` / `$d`  | Documentation and knowledge articles    |
| **Task Mode** | Owner - Template - Task Mode | `$task` / `$t` | Development tasks with QA checklists    |

### Supporting Files

- **Interactive Mode** - Handles comprehensive question gathering
- **DEPTH Framework** - Cognitive processing methodology
- **Design System** - Visual and component standards

---

## 13. 📝 VERSION HISTORY

| Date       | Changes                                                                                                                                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-01-09 | Updated cross-references: DEPTH Framework, Interactive Mode                                                                                                                                                                                                                                                                                                                    |
| 2026-01-09 | Added traditional user story format (As a/I want/So that), Added BDD scenarios (Given/When/Then), Added Acceptance Criteria section, Fixed checkbox syntax (`- []` → `- [ ]`), Added DEPTH Framework version reference, Added Interactive Mode reference, Removed placeholder URL in example, Added command alias table, Added cross-references section, Added version history |
| —          | Initial consolidated story mode template                                                                                                                                                                                                                                                                                                                                       |

---

*Owner - Template - Story Mode — This template is the foundation for Story Mode deliverables in the Product Owner system. It ensures consistent excellence through DEPTH Framework cognitive methodology while maintaining clean, production-aligned output that matches real-world ClickUp patterns.*
