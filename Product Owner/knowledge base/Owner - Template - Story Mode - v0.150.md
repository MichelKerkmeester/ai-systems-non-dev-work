# Owner - Template - Story Mode - v0.150

User story templates with integrated formatting rules and quality standards. All delivery logic consolidated for self-contained operation.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides self-contained user story templates in narrative format for creating user-centered requirements when $story or $s command is detected
**Scope:** Story Mode command structure, delivery standards, complexity auto-scaling rules, quality validation checklists, error recovery protocols, template formats (Simple/Standard/Complex/Quick), formatting standards, and story-specific requirements

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

---

## 1. 📖 STORY MODE OVERVIEW

### Command: `$story`

- **Purpose:** Create user stories in narrative format that auto-scale complexity
- **Output:** Always as `text/markdown` artifact
- **Thinking:** 10 rounds automatic (DEPTH methodology), 1-5 auto-scaled for $quick
- **Interactive Mode:** Single comprehensive question gathering ALL requirements
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
2. About (`## ⌘ About`) - Context narrative with `---` divider after header
3. Success Criteria (`### **Success Criteria**`) - Numbered items with sub-bullets
4. Requirements (`## ❖ Requirements`) - Section headers with numbered items

### Mandatory Structure Elements

#### Symbol Hierarchy (Production-Aligned)
- **H1 (#):** Title only - `# Story Name`
- **H2 (##):** About and Requirements - `## ⌘ About`, `## ❖ Requirements`
- **H3 (###):** Success Criteria and requirement sections - `### **Success Criteria**`, `### Section Name`
- **Numbered bold:** Individual items - `1. **Item Name**`

#### Formatting Standards
- **Dividers:** Use `---` after section headers AND after each numbered item
- **Lists:** Always use `-` for bullets
- **Links:** Use `[Description](URL)` format with actual URLs
- **About:** 2-3 paragraphs narrative describing context, what changed, and value
- **Success Criteria:** Numbered items with bold titles and sub-bullets
- **Requirements:** H3 section headers with numbered bold items inside

### Visual Hierarchy Rules
- Use `---` after section headers
- Use `---` after each numbered success criterion
- Use `---` after each numbered requirement
- H2 for About and Requirements sections
- H3 for Success Criteria and requirement area headers
- One blank line before divider, one blank line after divider

### Content Integration
- **About Section:** Context narrative explaining the change and its value
- **Success Criteria:** Numbered categories with measurable sub-bullets
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

### Always:
- Use proper `text/markdown` type
- Use H2 for About (with ⌘) and Requirements (with ❖)
- Use H3 for Success Criteria (with bold text) and requirement sections
- Use numbered bold for individual items
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
- [] DEPTH methodology applied (10 rounds standard, 1-5 quick)?
- [] User responded to comprehensive question?
- [] System waited for response (never answered own questions)?
- [] Complexity determined correctly?
- [] Template version confirmed (v0.150)?
- [] Output scope limited to user request?

### Structure Validation
- [] Title as H1 first line?
- [] About section as H2 with ⌘ symbol?
- [] About is 2-3 paragraphs narrative?
- [] Success Criteria as H3 with bold text?
- [] Success Criteria has numbered items with sub-bullets?
- [] Requirements as H2 with ❖ symbol?
- [] Requirement sections as H3 headers?
- [] Numbered bold for individual items?
- [] Dividers after headers and after numbered items?

### Format Validation
- [] Using `text/markdown` artifact type?
- [] Lists use `-` bullets?
- [] Dividers (`---`) after headers and items?
- [] Actual links included (not placeholders)?
- [] No Table of Contents?
- [] No unrequested features?
- [] Content limited to requested feature?
- [] Status notes use format `[Status note: "description"]` with quotes?

### Story-Specific Validation
- [] About section is narrative only (no bold labels)?
- [] Success Criteria has numbered categories?
- [] Requirements grouped by area?
- [] Inline images used where needed (no separate Designs section)?
- [] Implementation focus maintained?
- [] Practical details included?

---

## 5. 🚨 ERROR RECOVERY

### Common Errors & Fixes

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
1. Apply DEPTH automatically (10 rounds standard, 1-5 quick)
2. Wait for comprehensive response
3. Check template version (v0.150)
4. Verify symbol hierarchy (H1 title, H2 About/Requirements, H3 Success Criteria/sections)
5. Position sections correctly
6. Add dividers after headers AND after each numbered item
7. Limit output to request
8. Use correct artifact type
9. NEVER answer own questions

---

## 6. 🔵 SIMPLE STORY TEMPLATE

```markdown
# [Story Title]

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

## ❖ Requirements

### Layout & Logic

---

The sidebar features a flexible design that adapts to any page architecture, remaining stable and accessible whether the content is fixed or scrollable, all while supporting customizable logic that empowers users to define how the component interacts with their workspace.

1. **Layout Structure**

---

![](https://attachments.clickup.com/image.png)

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

1. **Always wait** for user response (except $quick)
2. **Never answer** own questions
3. **Title as H1** - First line, no metadata header
4. **About as H2** with ⌘ symbol - 2-3 paragraphs narrative
5. **Success Criteria as H3** with bold text - Numbered items with sub-bullets
6. **Requirements as H2** with ❖ symbol
7. **Requirement sections as H3** - With numbered bold items inside
8. **Dividers after headers** - `---` after each section header
9. **Dividers after items** - `---` after each numbered success criterion and requirement
10. **No Table of Contents** (ClickUp/Jira provide native TOC)
11. **No Features list** - About and Requirements cover this
12. **No User Need / Business Value sections** - Weave into About narrative
13. **No Change Summary** - Not used in production stories
14. **No separate Designs section** - Use inline images in Requirements
15. **Only requested features** - No scope expansion
16. **DEPTH methodology** applied automatically (10 rounds standard, 1-5 quick)
17. **Interactive questions** handled by Interactive Mode file

---

*This template is the foundation for Story Mode deliverables in the Product Owner system. It ensures consistent excellence through DEPTH cognitive methodology while maintaining clean, production-aligned output that matches real-world ClickUp patterns.*
