# Product Owner System - User Guide v0.096

Transforms requests into professional tickets, bugs, stories, epics, and documentation with **concise transparent DEPTH processing**.

## TABLE OF CONTENTS

  - 1. ✨ KEY FEATURES
  - 2. 🌳 SYSTEM ARCHITECTURE
  - 3. 🚀 QUICK SETUP
  - 4. 🎛️ OPERATING MODES
  - 5. 📋 MODE DETAILS
  - 6. 💬 INTERACTIVE MODE
  - 7. 🧠 DEPTH THINKING FRAMEWORK
  - 8. 📊 QUALITY SCORING

---

## 1. ✨ KEY FEATURES

- **📋 Self-Contained Templates**: All rules, quality checks, and formatting embedded (Task v0.205, Bug v0.115, Story v0.152, Doc v0.133)
- **🧠 DEPTH Framework**: Energy-level methodology with two-layer transparency (Raw/Quick/Standard/Deep)
- **🔒 Mandatory Perspectives**: Minimum 3 perspectives (BLOCKING requirement) enforced at multiple validation gates
- **🔬 Enhanced Cognitive Rigor**: 5 techniques with refined enforcement (multi-perspective, assumption audit, perspective inversion, constraint reversal, mechanism-first)
- **📊 Two-Layer Model**: Full rigor internally, concise updates externally with improved transparency guidelines
- **📊 6-Dimension Quality Scoring**: Completeness, Clarity, Actionability, Accuracy, Relevance, Mechanism Depth (all 8+, Accuracy 9+)
- **🚀 Four Modes**: Tickets, Bugs, Stories, Documentation
- **⚡ Quick Mode**: Quick energy level (D → P → H)
- **💬 Single Question**: All info gathered at once
- **🎯 Auto-Complexity**: Smart detection and scaling
- **✅ Quality Gates**: Three-phase validation (pre-creation, creation, post-creation)

---

## 2. 🌳 SYSTEM ARCHITECTURE

```
AGENTS.md → Entry point with routing logic
    ↓
Product Owner - System Prompt.md (System prompt - routing & rules)
    ↓
DEPTH Framework v0.200 (Methodology with energy levels)
    ↓
Interactive Mode v0.400 (Conversation flow)
    ↓
Templates:
├── Task Mode v0.205 (Development tasks)
├── Bug Mode v0.115 (Defect tracking)
├── Story Mode v0.152 (User stories)
└── Doc Mode v0.133 (Documentation)
    ↓
Output → export/[###]-artifact.md
```

### Context Folder
The `context/` directory contains real project artifacts organized by type:
- `1. Tasks & Subtasks/` — Task definitions by project and role
- `2. Epics & Stories/` — Epic and story definitions
- `3. Documentation/` — Product and marketing documentation
- `4. DS Variables/` — Design system tokens (CSS/TypeScript)

Context files are loaded on demand when referenced by the user.

### Export Protocol
All deliverables are saved to `export/[###]-description.md` before being referenced in chat.

---

## 3. 🚀 QUICK SETUP

### Step 1: Create Claude Project
1. Go to claude.ai → Projects → Create "Product Owner"

### Step 2: Add System Instructions
1. Edit project details → Custom instructions
3. Copy and paste: `Product Owner - System Prompt.md` 
4. Save the project

### Step 3: Upload Supporting Documents
Add these documents to your project:

**Core Framework:**
- `Product Owner - DEPTH Thinking Framework - v0.200.md` (two-layer transparency, mandatory perspectives, energy levels)
- `Product Owner - Interactive Mode - v0.400.md` (conversation flow & smart routing)
- `Owner - Rules - Human Voice - v0.101.md` (global voice clarity rules, word blacklists, anti-patterns)

**Self-Contained Templates:**
Each template is fully self-contained with embedded rules, quality checks, and formatting standards:

- **`Product Owner - Template - Task Mode - v0.205.md`**
  - Development tasks with detailed QA Resolution Checklists
  - Auto-scaling: Simple (4-6 items), Standard (8-12), Complex (12-20)
  - Includes mechanism-first validation and scope discipline
  - **Subtask Template:** Dedicated template for parent-child task decomposition (v0.205+)

- **`Product Owner - Template - Bug Mode - v0.115.md`**
  - Bug reports with evidence tracking and reproduction steps
  - Fixed complexity (no scaling - bugs have consistent structure)
  - Evidence section for screenshots/logs/error output
  - Root cause tracking in Resolution Checklist
  - References section with Figma evidence links
   
- **`Product Owner - Template - Story Mode - v0.152.md`**
  - User stories in narrative format (no QA checklist)
  - Focus on user journey and requirements
  - Production-aligned structure with H2 About, H3 Success Criteria
   
- **`Product Owner - Template - Doc Mode - v0.133.md`**
  - Technical and user documentation
  - Complexity levels: Simple (2-3), Standard (4-6), Complex (7+)
  - Tool-agnostic design principles

**Key Advantages:**
- No external rule dependencies - everything embedded in each template
- Automatic complexity scaling based on request keywords
- Complete quality checklists and error recovery built-in
- Consistent DEPTH v0.200 integration across all templates

### Step 4: Start Creating
```
need user authentication        # Interactive discovery flow
$quick auth task                # Immediate task creation (Quick energy)
$task payment integration       # Direct task mode (Standard energy)
$bug login not working          # Direct bug mode (Standard energy)
$story user login               # Direct story mode (Standard energy)
```

---

## 4. 🎛️ OPERATING MODES

**Default Mode:** The system defaults to `$interactive` with Standard energy DEPTH unless specified.

| Mode            | Purpose                  | Questions       | DEPTH Energy                   | Transparency | Template Version | Output               |
| --------------- | ------------------------ | --------------- | ------------------------------ | ------------ | ---------------- | -------------------- |
| **Interactive** | Determine what to create | 1 comprehensive | Standard (concise updates)     | Two-layer    | Auto-selected    | Exact request        |
| **$quick**      | Fast creation            | NONE            | Quick (D → P → H)             | Summary      | Auto-selected    | Exact request        |
| **$task**       | Dev tasks                | 1 comprehensive | Standard (concise updates)     | Two-layer    | v0.205           | Requested task only  |
| **$bug**        | Bug reports              | 1 comprehensive | Standard (concise updates)     | Two-layer    | v0.115           | Requested bug only   |
| **$story**      | User stories             | 1 comprehensive | Standard (concise updates)     | Two-layer    | v0.152           | Requested story only |
| **$doc**        | Documentation            | 1 comprehensive | Standard (concise updates)     | Two-layer    | v0.133           | Requested doc only   |

### Interactive Flow (Default)
System asks one comprehensive question gathering all info at once:
- Deliverable type (ticket/bug/story/epic/doc)
- Scope/scale
- Brief description

System waits for complete response before proceeding.

**Note:** The system emphasizes concise transparency with two-layer processing and BLOCKING enforcement of minimum 3 perspectives (target 5).

---

## 5. 📋 MODE DETAILS

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

### 🐛 $bug Mode (v0.115)

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
| Feature              | Bug (v0.115)         | Task (v0.205)          |
| -------------------- | -------------------- | ---------------------- |
| **Command**          | `$bug` or `$b`       | `$task` or `$t`        |
| **Purpose**          | Defect tracking      | Feature development    |
| **Evidence Section** | ✅ Yes (⌥)            | ❌ No                   |
| **Root Cause**       | ✅ Yes (in checklist) | ❌ No                   |
| **Complexity**       | Fixed (no scaling)   | Auto-scaled (3 levels) |
| **Resolution List**  | ✅ Yes (✓)            | ✅ Yes (✓)              |
| **Use Case**         | Bug fixes, defects   | New features, tasks    |

**Bug vs Task Comparison** table references: Bug v0.115, Task v0.205

**When to Use Bug Mode:**
- Reporting defects or unexpected behavior
- Tracking issues that need investigation
- When evidence (screenshots/logs) is important
- When root cause analysis is needed

---

### 📖 Story Mode (v0.152)

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
| Feature        | Story (v0.152)            | Task (v0.205)            | Bug (v0.115)              |
| -------------- | ------------------------- | ------------------------ | ------------------------- |
| **Command**    | `$story`                  | `$task`                  | `$bug`                    |
| **Focus**      | User journey & experience | Technical implementation | Defect tracking           |
| **Evidence**   | ❌ No                      | ❌ No                     | ✅ Yes (⌥)                 |
| **Root Cause** | ❌ No                      | ❌ No                     | ✅ Yes                     |
| **Checklist**  | ❌ No Resolution Checklist | ✅ Detailed QA Checklist  | ✅ Resolution + Root Cause |
| **Complexity** | Auto-scaled (3 levels)    | Auto-scaled (3 levels)   | Fixed                     |
| **Use Case**   | Requirements definition   | Implementation tracking  | Bug fixes, defects        |

**Story vs Task vs Bug Comparison** table references: Story v0.152, Task v0.205, Bug v0.115

---

### 📄 Doc Mode (v0.133)

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

## 6. 💬 INTERACTIVE MODE

### Conversational Guidance Flow

**Default behavior** when no mode specified ($task, $bug, $story, $doc, $quick)

**Process:**
```
User Request
     ↓
Single Comprehensive Question
(What to create? Scope? Brief description?)
     ↓
Wait for Complete User Response
     ↓
Apply DEPTH v0.200 (Standard energy with concise updates)
     ↓
Deliver Exact Request
```

**Key Features:**
- ONE question gathering ALL needed info
- Never answers own questions
- Always waits for user response
- Applies full DEPTH with two-layer transparency
- Routes to appropriate template based on user's answer

**Full details:** `Product Owner - Interactive Mode - v0.400.md`

---

## 7. 🧠 DEPTH THINKING FRAMEWORK

### Two-Layer Transparency Model

**DEPTH** = **D**iscover **E**ngineer **P**rototype **T**est **H**armonize

A structured 5-phase methodology ensuring comprehensive analysis through **concise transparent excellence** - full rigor applied internally, meaningful updates shown to users.

**Energy Levels:**
| Energy Level | Phases             | User Visibility          | Application            |
| ------------ | ------------------ | ------------------------ | ---------------------- |
| **Raw**      | Skip DEPTH         | None                     | Explicit "skip depth"  |
| **Quick**    | D → P → H          | Summary at completion    | `$quick/$q` command    |
| **Standard** | D → E → P → T → H | Concise progress updates | Default for all modes  |
| **Deep**     | D(ext) → E → P → T → H | Full progress updates | Explicit or complex    |

### DEPTH Phases (v0.200 with Energy Levels)

| Phase         | Purpose             | Internal Processing                                                      | User Sees                             |
| ------------- | ------------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| **D**iscover  | Deep understanding  | 5 perspectives, assumption audit, opposition analysis                    | "🔍 Analyzing (5 perspectives)"        |
| **E**ngineer  | Solution generation | 8 approaches, constraint reversal, requirements mapping                  | "⚙️ Engineering (optimal selected)"    |
| **P**rototype | Build framework     | Template application, mechanism-first validation                         | "🔨 Building (template-compliant)"     |
| **T**est      | Validate quality    | 6-dimension rating, quality gates, template compliance                   | "✅ Validating (excellence confirmed)" |
| **H**armonize | Final polish        | Final validation, cognitive rigor check, export verification             | "✨ Finalizing (ready for delivery)"   |

### What Users Actually See

**Example DEPTH Progress Updates:**
```markdown
🔍 **Analyzing from 5 perspectives:** Technical, UX, Business, QA, Strategic
**Key Insight:** Payment flow requires multi-tenant isolation

⚙️ **Engineering solution** (8 approaches evaluated)
**Selected:** Microservice architecture with event-driven sync

🔨 **Building** (Template v0.205, mechanism-first validated)
**Structure:** 5 sections, 12 acceptance criteria

✅ **Quality validation complete**
All dimensions 8+ (Completeness: 94%, Clarity: 91%, Actionability: 93%)

✨ **Finalizing** (Excellence confirmed, quality verified)
Ready for delivery
```

### Cognitive Rigor (Applied Automatically)

Five cognitive techniques applied internally (users see key insights only):

1. **Multi-Perspective Analysis** - BLOCKING requirement (min 3, target 5) with enforcement at multiple validation gates
2. **Assumption Audit** - Critical flags shown with explicit `[Assumes: X]` notation
3. **Perspective Inversion** - Key opposition insights integrated into rationale
4. **Constraint Reversal** - Non-obvious solutions surfaced through backward analysis
5. **Mechanism First** - WHY before WHAT validation ensuring principle-driven design

**Quality Targets:** All dimensions 8+ (Completeness, Clarity, Actionability, Accuracy, Relevance, Mechanism Depth)

**Validation Gates:** Three-phase enforcement (pre-creation, during creation, post-creation) ensures consistent excellence

**Full details:** `Product Owner - DEPTH Thinking Framework - v0.200.md`

---

## 8. 📊 QUALITY SCORING

### 6-Dimension Quality System

Every deliverable is scored against six dimensions before delivery. This replaces the previous RICCE validation framework.

| Dimension | Target | Measures |
|---|---|---|
| **Completeness** | 8+ | All sections present, edge cases covered, dependencies mapped |
| **Clarity** | 8+ | Unambiguous language, actionable acceptance criteria |
| **Actionability** | 8+ | Concrete steps, clear sequence, success states defined |
| **Accuracy** | 9+ | Technically verified, assumptions validated, feasibility confirmed |
| **Relevance** | 8+ | Precisely scoped, stakeholder-aligned, no padding |
| **Mechanism Depth** | 8+ | WHY before WHAT structure, principles enable tactic derivation |

### Quality-DEPTH Integration

**How They Work Together:**
- **DEPTH** = The **HOW** (5-phase process methodology with energy levels)
- **6-Dimension Scoring** = The **WHAT** (quality validation checklist)
- **Together** = Rigorous process + Quality validation = Superior deliverables

**Integration Points:**
- Discover Phase → Completeness, Relevance
- Engineer Phase → Actionability, Accuracy
- Prototype Phase → Clarity, Mechanism Depth
- Test Phase → All 6 dimensions scored (8+, Accuracy 9+)
- Harmonize Phase → Final quality confirmation

### What Users See for Quality

**Example Quality Communication:**
```markdown
✅ **Quality validation complete:**
- Completeness: 9/10 (all sections, edge cases covered)
- Clarity: 9/10 (unambiguous, actionable)
- Actionability: 9/10 (concrete steps, clear sequence)
- Accuracy: 9/10 (verified, assumptions validated)
- Relevance: 8/10 (precisely scoped)
- Mechanism Depth: 9/10 (WHY before WHAT confirmed)

**Assumption Flagged:** [Assumes: SSO integration available by Sprint 3]
```

**Full details:** `Product Owner - DEPTH Thinking Framework - v0.200.md` (Section 4)
