# Product Owner System - User Guide v0.952

Transforms requests into professional tickets, bugs, stories, epics, and documentation with **concise transparent DEPTH processing**.

## 📋 TABLE OF CONTENTS

1. [🆕 WHAT'S NEW IN V0.952](#1-whats-new-in-v0952)
2. [✨ KEY FEATURES](#2-key-features)
3. [🌳 SYSTEM ARCHITECTURE](#3-system-architecture)
4. [🚀 QUICK SETUP](#4-quick-setup)
5. [🎛️ OPERATING MODES](#5-operating-modes)
6. [📋 MODE DETAILS](#6-mode-details)
7. [💬 INTERACTIVE MODE](#7-interactive-mode)
8. [🧠 DEPTH THINKING FRAMEWORK](#8-depth-thinking-framework)
9. [🏗️ RICCE FRAMEWORK](#9-ricce-framework)

---

<a id="1-whats-new-in-v0952"></a>
## 1. 🆕 WHAT'S NEW IN V0.952

### Major Additions

**Epic & Story Template Alignment - v0.952:**
- Complete rewrite of Epic Template (v0.140 → v0.150) based on production patterns
- Complete rewrite of Story Template (v0.143 → v0.150) based on production patterns
- New symbol hierarchy matching ClickUp production usage
- Removed Initiative/Program/Strategic scale variants from Epic
- Simplified Story structure (removed Features, User Need, Business Value, Change Summary sections)
- Added Human Voice Rules v0.100 (eliminates AI-detectable patterns)

**System Prompt v0.952:**
- Updated Epic template description (removed scale variants)
- All template version references updated

**Key Structural Changes:**
- **Symbol Hierarchy:** H1 for title only, H2 for About/Requirements, H3 for subsections
- **Success Criteria:** Now bold text (not H2 section)
- **Dividers:** After headers AND between numbered items
- **Epic:** Single unified template (no more scale variants)
- **Story:** Streamlined structure matching production patterns

**Template Updates:**
- Epic Mode: v0.140 → v0.150 (production alignment, scale variants removed)
- Story Mode: v0.143 → v0.150 (production alignment, sections simplified)

### 📊 Evolution: v0.952 → v0.951 → v0.950 → v0.922 → v0.921 → v0.920 → v0.915

**v0.952:** Epic & Story production alignment, new symbol hierarchy, simplified templates
**v0.951:** Ticket→Task rename, BDD User Story format (Given/When/Then), all path references aligned
**v0.950:** Bug Mode addition, 5-mode architecture, comprehensive version updates
**v0.922:** Refined cognitive rigor enforcement and quality validation structure  
**v0.921:** RICCE framework integration and comprehensive definition  
**v0.920:** Readability improvements and transparency model alignment  
**v0.915:** Template separation (dedicated story mode)

---

<a id="2-key-features"></a>
## 2. ✨ KEY FEATURES

- **📋 Self-Contained Templates**: All rules, quality checks, and formatting embedded (Task v0.200, Bug v0.110, Story v0.150, Epic v0.150, Doc v0.129)
- **🧠 DEPTH Framework v0.118**: 10-round methodology with two-layer transparency and RICCE integration
- **🔒 Mandatory Perspectives**: Minimum 3 perspectives (BLOCKING requirement) enforced at multiple validation gates
- **🔬 Enhanced Cognitive Rigor**: 6 techniques with refined enforcement (multi-perspective, assumption audit, perspective inversion, constraint reversal, mechanism-first, RICCE compliance)
- **📊 Two-Layer Model**: Full rigor internally, concise updates externally with improved transparency guidelines
- **🎯 RICCE Framework**: Role, Instructions, Context, Constraints, Examples validation integrated throughout DEPTH
- **🚀 Five Modes**: Tickets, Bugs, Stories, Epics, Documentation
- **⚡ Quick Mode**: Auto-scaled 1-5 rounds
- **💬 Single Question**: All info gathered at once
- **🎯 Auto-Complexity**: Smart detection and scaling
- **✅ Quality Gates**: Three-phase validation (pre-creation, creation, post-creation)

---

<a id="3-system-architecture"></a>
## 3. 🌳 SYSTEM ARCHITECTURE

```
AGENTS.md → Entry point with routing logic
    ↓
Product Owner - System Prompt.md (System prompt - routing & rules)
    ↓
DEPTH Framework v0.118 (Methodology with RICCE)
    ↓
Interactive Mode v0.317 (Conversation flow)
    ↓
Templates:
├── Task Mode v0.200 (Development tasks)
├── Bug Mode v0.110 (Defect tracking) ← NEW
├── Story Mode v0.150 (User stories)
├── Epic Mode v0.150 (Initiatives)
└── Doc Mode v0.129 (Documentation)
    ↓
Output → /export/[###]-artifact.md
```

---

<a id="4-quick-setup"></a>
## 4. 🚀 QUICK SETUP

### Step 1: Create Claude Project
1. Go to claude.ai → Projects → Create "Product Owner"

### Step 2: Add System Instructions
1. Edit project details → Custom instructions
3. Copy and paste: `Product Owner - System Prompt.md` 
4. Save the project

### Step 3: Upload Supporting Documents
Add these documents to your project:

**Core Framework:**
- `Product Owner - DEPTH Thinking Framework - v0.118.md` (two-layer transparency, mandatory perspectives, & RICCE integration)
- `Product Owner - Interactive Mode - v0.317.md` (conversation flow & smart routing)
- `Owner - Human Voice Rules - v0.100.md` (eliminates AI-detectable patterns, enforced at DEPTH Test phase)

**Self-Contained Templates:**
Each template is fully self-contained with embedded rules, quality checks, and formatting standards:

- **`Product Owner - Template - Task Mode - v0.200.md`**
  - Development tasks with detailed QA Resolution Checklists
  - Auto-scaling: Simple (4-6 items), Standard (8-12), Complex (12-20)
  - Includes mechanism-first validation and scope discipline

- **`Product Owner - Template - Bug Mode - v0.110.md`** ← NEW
  - Bug reports with evidence tracking and reproduction steps
  - Fixed complexity (no scaling - bugs have consistent structure)
  - Evidence section for screenshots/logs/error output
  - Root cause tracking in Resolution Checklist
  
- **`Product Owner - Template - Story Mode - v0.150.md`**
  - User stories in narrative format (no QA checklist)
  - Focus on user journey and requirements
  - Production-aligned structure with H2 About, H3 Success Criteria
   
- **`Product Owner - Template - Epic Mode - v0.150.md`**
  - High-level summaries with links to stories/tasks
  - Single unified template (production-aligned)
  - Includes success criteria and requirements structure
  
- **`Product Owner - Template - Doc Mode - v0.129.md`**
  - Technical and user documentation
  - Complexity levels: Simple (2-3), Standard (4-6), Complex (7+)
  - Tool-agnostic design principles

**Key Advantages:**
- No external rule dependencies - everything embedded in each template
- Automatic complexity scaling based on request keywords
- Complete quality checklists and error recovery built-in
- Consistent DEPTH v0.118 integration across all templates

### Step 4: Start Creating
```
need user authentication        # Interactive discovery flow
$quick auth epic                # Immediate epic creation (1-5 rounds auto)
$epic payment platform          # Direct epic mode (10 rounds auto)
$task payment integration       # Direct task mode (10 rounds auto)
$bug login not working          # Direct bug mode (10 rounds auto) ← NEW
$story user login               # Direct story mode (10 rounds auto)
```

---

<a id="5-operating-modes"></a>
## 5. 🎛️ OPERATING MODES

**Default Mode:** The system defaults to `$interactive` with automatic 10-round DEPTH unless specified.

| Mode            | Purpose                  | Questions       | DEPTH Processing            | Transparency | Template Version | Output                |
| --------------- | ------------------------ | --------------- | --------------------------- | ------------ | ---------------- | --------------------- |
| **Interactive** | Determine what to create | 1 comprehensive | 10 rounds (concise updates) | Two-layer    | Auto-selected    | Exact request         |
| **$quick**      | Fast creation            | NONE            | 1-5 auto-scaled             | Summary      | Auto-selected    | Exact request         |
| **$task**       | Dev tasks                | 1 comprehensive | 10 rounds (concise updates) | Two-layer    | v0.200           | Requested task only   |
| **$bug**        | Bug reports              | 1 comprehensive | 10 rounds (concise updates) | Two-layer    | v0.110           | Requested bug only    |
| **$story**      | User stories             | 1 comprehensive | 10 rounds (concise updates) | Two-layer    | v0.150           | Requested story only  |
| **$epic**       | Epics                    | 1 comprehensive | 10 rounds (concise updates) | Two-layer    | v0.150           | Requested epic only   |
| **$doc**        | Documentation            | 1 comprehensive | 10 rounds (concise updates) | Two-layer    | v0.129           | Requested doc only    |

### Interactive Flow (Default)
System asks one comprehensive question gathering all info at once:
- Deliverable type (ticket/bug/story/epic/doc)
- Scope/scale
- Brief description

System waits for complete response before proceeding.

**Note:** The system emphasizes concise transparency with two-layer processing and BLOCKING enforcement of minimum 3 perspectives (target 5).

---

<a id="6-mode-details"></a>
## 6. 📋 MODE DETAILS

### 🎫 $task Mode

**Purpose:** Development tasks with detailed QA checklists for implementation tracking

**Format Improvements:**
- **Compressed About sections** - 1-2 lines with bold key-value pairs
- **Streamlined requirements** - Bullet format with inline descriptions
- **Tighter success criteria** - Essential metrics only
- **Detailed QA checklist** - Resolution items for verification
- **Mechanism explanations** - WHY before WHAT structure

**Key Feature:** Includes Resolution Checklist for QA verification (differentiates from stories)

**Complexity Levels:**
| Level        | Indicators                        | Sections | Resolution Items | Use Case                           |
| ------------ | --------------------------------- | -------- | ---------------- | ---------------------------------- |
| **Simple**   | bug, fix, typo, update            | 2-3      | 4-6              | Quick fixes and minor updates      |
| **Standard** | feature, dashboard, api           | 4-5      | 8-12             | Standard features and enhancements |
| **Complex**  | platform, architecture, migration | 6-8      | 12-20            | System-wide changes and migrations |

---

### 🐛 $bug Mode (v0.110)

**Purpose:** Bug reports with evidence tracking, reproduction steps, and root cause analysis

**Key Features:**
- **Evidence section (⌥):** Dedicated area for screenshots, logs, and error output
- **Reproduction steps:** Clear steps to reproduce the issue
- **Root cause tracking:** Included in Resolution Checklist
- **Fixed complexity:** No scaling - bugs have consistent structure
- **Resolution Checklist (✓):** QA verification items with root cause field

**Structure:**
```
⌘ About          → Context and bug description
⌥ Evidence       → Screenshots, logs, error output
❖ Requirements   → What needs to be fixed
✓ Resolution     → QA checklist with root cause
```

**Bug vs Task Comparison:**
| Feature              | Bug (v0.110)             | Task (v0.200)            |
| -------------------- | ------------------------ | ------------------------ |
| **Command**          | `$bug` or `$b`           | `$task` or `$t`          |
| **Purpose**          | Defect tracking          | Feature development      |
| **Evidence Section** | ✅ Yes (⌥)                | ❌ No                     |
| **Root Cause**       | ✅ Yes (in checklist)     | ❌ No                     |
| **Complexity**       | Fixed (no scaling)       | Auto-scaled (3 levels)   |
| **Resolution List**  | ✅ Yes (✓)                | ✅ Yes (✓)                |
| **Use Case**         | Bug fixes, defects       | New features, tasks      |

**When to Use Bug Mode:**
- Reporting defects or unexpected behavior
- Tracking issues that need investigation
- When evidence (screenshots/logs) is important
- When root cause analysis is needed

---

### 📖 Story Mode (v0.150)

**Purpose:** User stories in narrative format focusing on user journey and experience

**Key Features:**
- **User-centric format:** "As a [user], I want to [action] so that [benefit]"
- **User journey focus:** Emphasizes user perspective and experience throughout
- **Given-When-Then criteria:** Acceptance criteria in standard user story format
- **No Resolution Checklist:** Stories end with acceptance criteria (key differentiator)
- **Business value clear:** Explicit articulation of user and business value

**Complexity Levels:**
| Level        | Indicators                  | Sections | Focus                 | Use Case                 |
| ------------ | --------------------------- | -------- | --------------------- | ------------------------ |
| **Simple**   | simple, basic, quick        | 2-3      | Single user action    | Simple user interactions |
| **Standard** | feature, capability, flow   | 4-5      | Complete user journey | Standard user features   |
| **Complex**  | platform, system, ecosystem | 6-8      | Multi-step scenarios  | Complex user workflows   |

**Story vs Task vs Bug Comparison:**
| Feature          | Story (v0.150)             | Task (v0.200)            | Bug (v0.110)             |
| ---------------- | -------------------------- | ------------------------ | ------------------------ |
| **Command**      | `$story`                   | `$task`                  | `$bug`                   |
| **Focus**        | User journey & experience  | Technical implementation | Defect tracking          |
| **Evidence**     | ❌ No                       | ❌ No                     | ✅ Yes (⌥)                |
| **Root Cause**   | ❌ No                       | ❌ No                     | ✅ Yes                    |
| **Checklist**    | ❌ No Resolution Checklist  | ✅ Detailed QA Checklist  | ✅ Resolution + Root Cause|
| **Complexity**   | Auto-scaled (3 levels)     | Auto-scaled (3 levels)   | Fixed                    |
| **Use Case**     | Requirements definition    | Implementation tracking  | Bug fixes, defects       |

---

### 🚀 Epic Mode (v0.150)

**Purpose:** Epics as high-level overviews with links to stories and tasks

**Self-Contained Features:**
- Production-aligned structure
- Complete symbol hierarchy (H1 title, H2 About, H3 Requirements)
- Quality checks embedded
- Links to related stories and tasks

**Structure (Production-Aligned):**
- **Title** - H1 header
- **About** - H2 with ⌘ symbol, 2-3 paragraph narrative
- **Success Criteria** - Bold text (not separate section)
- **References** - Bold text with Flows/Components subsections (optional)
- **Requirements** - H3 with ❖ symbol, feature areas with numbered items

**Complexity Levels:**
| Level        | Feature Areas | Features | Focus                    | Use Case                     |
| ------------ | ------------- | -------- | ------------------------ | ---------------------------- |
| **Simple**   | 1-2           | 5-10     | Single team deliverables | Focused features             |
| **Standard** | 2-4           | 10-20    | Multi-area coordination  | Cross-area initiatives       |
| **Complex**  | 4+            | 20+      | Platform transformation  | Company-wide changes         |

---

### 📄 Doc Mode (v0.129)

**Purpose:** Technical documentation and user guides

**Self-Contained Features:**
- Complete formatting rules embedded
- Self-contained quality checks
- Standalone operation
- No external dependencies

**Complexity Levels:**
| Type         | Main Sections | Depth           | Use Case                   | Examples                                 |
| ------------ | ------------- | --------------- | -------------------------- | ---------------------------------------- |
| **Simple**   | 2-3           | Quick reference | Product briefs, overviews  | Feature announcements, quick guides      |
| **Standard** | 4-6           | Detailed guide  | Feature specs, user guides | API documentation, user manuals          |
| **Complex**  | 7+            | Comprehensive   | Strategy docs, platforms   | Architecture docs, system specifications |

**Common Documentation Types:**
- **Feature Documentation** - How features work and how to use them
- **API Documentation** - Endpoint specifications and examples
- **User Guides** - Step-by-step instructions for end users
- **Technical Specifications** - System architecture and design
- **Strategy Documents** - Product vision and roadmaps
- **Process Documentation** - Workflows and procedures

---

<a id="7-interactive-mode"></a>
## 7. 💬 INTERACTIVE MODE

### Conversational Guidance Flow

**Default behavior** when no mode specified ($task, $bug, $story, $epic, $doc, $quick)

**Process:**
```
User Request
     ↓
Single Comprehensive Question
(What to create? Scope? Brief description?)
     ↓
Wait for Complete User Response
     ↓
Apply DEPTH v0.118 (10 rounds with concise updates)
     ↓
Deliver Exact Request
```

**Key Features:**
- ONE question gathering ALL needed info
- Never answers own questions
- Always waits for user response
- Applies full DEPTH with two-layer transparency
- Routes to appropriate template based on user's answer

**Full details:** `Product Owner - Interactive Mode - v0.317.md`

---

<a id="8-depth-thinking-framework"></a>
## 8. 🧠 DEPTH THINKING FRAMEWORK

### Two-Layer Transparency Model

**DEPTH** = **D**iscover **E**ngineer **P**rototype **T**est **H**armonize

A structured 5-phase methodology ensuring comprehensive analysis through **concise transparent excellence** - full rigor applied internally, meaningful updates shown to users.

**Processing Depth:**
| Mode         | Rounds          | User Visibility          | Application            |
| ------------ | --------------- | ------------------------ | ---------------------- |
| **Standard** | 10 rounds       | Concise progress updates | Real-time transparency |
| **$Quick**   | 1-5 auto-scaled | Summary at completion    | Complexity-based       |

### DEPTH Phases (v0.118 with RICCE Integration)

| Phase         | Purpose             | Internal Processing                                                         | User Sees                             |
| ------------- | ------------------- | --------------------------------------------------------------------------- | ------------------------------------- |
| **D**iscover  | Deep understanding  | 5 perspectives, assumption audit, opposition analysis, RICCE Role & Context | "🔍 Analyzing (5 perspectives)"        |
| **E**ngineer  | Solution generation | 8 approaches, constraint reversal, RICCE Constraints & Instructions         | "⚙️ Engineering (optimal selected)"    |
| **P**rototype | Build framework     | Template application, RICCE validation, mechanism-first                     | "🔨 Building (RICCE-compliant)"        |
| **T**est      | Validate quality    | 6-dimension rating, quality gates, RICCE Examples                           | "✅ Validating (excellence confirmed)" |
| **H**armonize | Final polish        | Final validation, cognitive rigor check, RICCE verification                 | "✨ Finalizing (ready for delivery)"   |

### What Users Actually See

**Example DEPTH Progress Updates:**
```markdown
🔍 **Analyzing from 5 perspectives:** Technical, UX, Business, QA, Strategic
**Key Insight:** Payment flow requires multi-tenant isolation

⚙️ **Engineering solution** (8 approaches evaluated)
**Selected:** Microservice architecture with event-driven sync

🔨 **Building** (Template v0.145, RICCE-compliant)
**Structure:** 5 sections, 12 acceptance criteria

✅ **Quality validation complete**
All dimensions 8+ (Completeness: 94%, Clarity: 91%, Actionability: 93%)

✨ **Finalizing** (Excellence confirmed, RICCE verified)
Ready for delivery
```

### Cognitive Rigor (Applied Automatically)

Six mandatory frameworks applied internally (users see key insights only):

1. **Multi-Perspective Analysis** - BLOCKING requirement (min 3, target 5) with enforcement at multiple validation gates
2. **Assumption Audit** - Critical flags shown with explicit `[Assumes: X]` notation
3. **Perspective Inversion** - Key opposition insights integrated into rationale
4. **Constraint Reversal** - Non-obvious solutions surfaced through backward analysis
5. **Mechanism First** - WHY before WHAT validation ensuring principle-driven design
6. **RICCE Compliance** - Structural completeness across all five dimensions

**Quality Targets:** All dimensions 8+ (Completeness, Clarity, Actionability, Accuracy, Relevance, Mechanism Depth)

**Validation Gates:** Three-phase enforcement (pre-creation, during creation, post-creation) ensures consistent excellence

**Full details:** `Product Owner - DEPTH Thinking Framework - v0.118.md`

---

<a id="9-ricce-framework"></a>
## 9. 🏗️ RICCE FRAMEWORK

### Structural Validation Checklist

**RICCE** ensures every deliverable contains essential elements for complete understanding:

**R**ole - Perspectives Defined
- ✅ Minimum 3 perspectives analyzed (target 5)
- ✅ Stakeholders identified
- ✅ Target users defined

**I**nstructions - Tasks Broken Down
- ✅ Clear action items
- ✅ Execution sequence logical
- ✅ Dependencies identified

**C**ontext - Layers Comprehensive
- ✅ Technical context provided
- ✅ Business context included
- ✅ User context explained

**C**onstraints - Metrics Established
- ✅ Scope boundaries clear
- ✅ Success metrics defined
- ✅ Quality thresholds set

**E**xamples - Validation Included
- ✅ Use cases provided
- ✅ Expected outcomes shown
- ✅ Validation steps included

### RICCE-DEPTH Integration

**How They Work Together:**
- **DEPTH** = The **HOW** (process methodology)
- **RICCE** = The **WHAT** (structural checklist)
- **Together** = Rigorous process + Complete structure = Superior deliverables

**Integration Points:**
- Discover Phase → Populates RICCE Role & Context
- Engineer Phase → Validates RICCE Constraints & Instructions
- Prototype Phase → Applies full RICCE structure
- Test Phase → Validates RICCE Examples
- Harmonize Phase → Final RICCE verification

### What Users See for RICCE

**Example RICCE Communication:**
```markdown
✅ **RICCE validation complete:**
- Role: 5 perspectives analyzed (Technical, UX, Business, QA, Strategic)
- Instructions: 12 clear action items with dependencies mapped
- Context: Technical stack, business constraints, user needs defined
- Constraints: Scope boundaries set, success metrics established
- Examples: 8 use cases with validation steps

**Assumption Flagged:** [Assumes: SSO integration available by Sprint 3]
```

**Full details:** `Product Owner - DEPTH Thinking Framework - v0.118.md` (Section 5-6)