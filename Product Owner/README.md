# Product Owner System - User Guide v0.096

Transforms requests into professional tasks and bug reports with **concise transparent DEPTH processing**.

---

## 1. KEY FEATURES

- ** Self-Contained Templates**: All rules, quality checks, and formatting embedded (Task v0.223, Bug v0.127)
- ** DEPTH Framework**: Energy-level methodology with two-layer transparency (Raw/Quick/Standard/Deep)
- ** Mandatory Perspectives**: Minimum 3 perspectives (BLOCKING requirement) enforced at multiple validation gates
- ** Enhanced Cognitive Rigor**: 5 techniques with refined enforcement (multi-perspective, assumption audit, perspective inversion, constraint reversal, mechanism-first)
- ** Two-Layer Model**: Full rigor internally, concise updates externally with improved transparency guidelines
- ** 6-Dimension Quality Scoring**: Completeness, Clarity, Actionability, Accuracy, Relevance, Mechanism Depth (all 8+, Accuracy 9+)
- ** Core Modes**: Tasks, Bugs, Interactive, Quick
- ** Quick Mode**: Quick energy level (D → P → H)
- ** Single Question**: All info gathered at once
- ** Structure Fit**: Task shape adapts to the request and the source task structure
- **✅ Quality Gates**: Three-phase validation (pre-creation, creation, post-creation)

---

## 2. SYSTEM ARCHITECTURE

```
AGENTS.md → Entry point and identity handoff
    ↓
skill/SKILL.md (single brain: identity, routing and rules)
    ↓
DEPTH Framework v0.201 (Methodology with energy levels)
    ↓
Interactive Mode v0.402 (Conversation flow)
    ↓
Templates:
├── Task Mode v0.223 (Development tasks)
└── Bug Mode v0.127 (Defect tracking)
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

## 3. QUICK SETUP

### Step 1: Create Claude Project
1. Go to claude.ai → Projects → Create "Product Owner"

### Step 2: Add Project Instructions
1. Edit project details → Custom instructions
3. Copy and paste: `claude project/Custom Instructions.md`
4. Save the project

### Step 3: Upload Supporting Documents
Add these documents to your project:

**Core Framework:**
- `Product Owner - DEPTH Thinking Framework - v0.201.md` (two-layer transparency, mandatory perspectives, energy levels)
- `Product Owner - System - Interactive Mode - v0.402.md` (conversation flow & smart routing)
- `Owner - Rules - Human Voice - EN - v0.210.md` (global voice clarity rules, word blacklists, anti-patterns)

**Self-Contained Templates:**
Each template is fully self-contained with embedded rules, quality checks, and formatting standards:

- **`Product Owner - Template - Task Mode - v0.223.md`**
  - Development tasks with a header-only Resolution Checklist for QA handoff
  - Flexible task structure aligned to the live task corpus
  - Fixed checklist intro text: ` Complete all action items before moving to QA`
  - Fixed User Story format with `**User Story**`, divider, and bold Given / When / Then bullets
  - **Subtask Template:** Dedicated template for parent-child task decomposition (v0.223+)

- **`Product Owner - Template - Bug Mode - v0.127.md`**
  - Bug reports with evidence tracking and reproduction steps
  - Fixed complexity (no scaling - bugs have consistent structure)
  - Evidence section for screenshots/logs/error output
  - Header-only Resolution Checklist — root cause documented in Requirements
  - References section with Figma evidence links
   
**Key Advantages:**
- No external rule dependencies - everything embedded in each template
- Structure guidance that adapts to the request and the source task shape
- Complete quality checklists and error recovery built-in
- Consistent DEPTH v0.201 integration across all templates

### Step 4: Start Creating
```
need user authentication        # Interactive discovery flow
$quick auth task                # Immediate task creation (Quick energy)
$task payment integration       # Direct task mode (Standard energy)
$bug login not working          # Direct bug mode (Standard energy)
```

---

## 4. OPERATING MODES

**Default Mode:** The system defaults to interactive guidance with Standard energy DEPTH unless specified.

| Mode            | Purpose                  | Questions       | DEPTH Energy                   | Transparency | Template Version | Output               |
| --------------- | ------------------------ | --------------- | ------------------------------ | ------------ | ---------------- | -------------------- |
| **Interactive** | Determine what to create | 1 comprehensive | Standard (concise updates)     | Two-layer    | Auto-selected    | Exact request        |
| **$quick**      | Fast creation            | NONE            | Quick (D → P → H)             | Summary      | Auto-selected    | Exact request        |
| **$task**       | Dev tasks                | 1 comprehensive | Standard (concise updates)     | Two-layer    | v0.223           | Requested task only  |
| **$bug**        | Bug reports              | 1 comprehensive | Standard (concise updates)     | Two-layer    | v0.127           | Requested bug only   |

### Interactive Flow (Default)
System asks one comprehensive question gathering all info at once:
- Deliverable type (task/bug)
- Scope/scale
- Brief description

System waits for complete response before proceeding.

**Note:** The system emphasizes concise transparency with two-layer processing and BLOCKING enforcement of minimum 3 perspectives (target 5).

---

## 5. MODE DETAILS

### $task Mode

**Purpose:** Development tasks with detailed QA checklists for implementation tracking

**Format Improvements:**
- **Flexible context block** - Optional References, Epic, Ticket and related sections as needed
- **Structured requirements** - Numbered groups with outcome-focused descriptions and checkbox requirements
- **Fixed checklist intro** - Always uses the exact same Resolution Checklist intro line
- **Header-only Resolution Checklist** - Just the heading, divider, and warning line
- **Fixed User Story format** - Always uses the same heading, divider and bold Given / When / Then bullets
- **Source-aware updates** - Existing task structure can be preserved during sync work
- **Outcome-first structure** - WHY, WHAT and Validation

**Key Feature:** Includes header-only Resolution Checklist for QA handoff

**Structure Fit Guidance:**
| Shape Hint   | Typical Signals                   | Pattern                                      | Use Case                           |
| ------------ | --------------------------------- | -------------------------------------------- | ---------------------------------- |
| **Small**    | bug, fix, typo, update            | Flat or single-category requirement groups   | Quick fixes and minor updates      |
| **Medium**   | feature, page, interface          | Category headings recommended                | Standard features and refinements  |
| **Large**    | platform, system, migration       | Multiple category headings and grouped QA    | Larger multi-area changes          |

---

### $bug Mode (v0.127)

**Purpose:** Bug reports with evidence tracking, reproduction steps, and root cause analysis

**Key Features:**
- **Evidence section ():** Dedicated area for screenshots, logs, and error output
- **Reproduction steps:** Clear steps to reproduce the issue
- **Root cause tracking:** Documented in Requirements
- **Fixed complexity:** No scaling - bugs have consistent structure
- **Resolution Checklist ():** Header-only section for QA handoff

**Structure:**
```
 About          → Context and bug description
 Evidence       → Screenshots, logs, error output
 Requirements   → What needs to be fixed, root cause
 Resolution     → Header-only QA handoff
```

**Bug vs Task Comparison:**
| Feature              | Bug (v0.127)         | Task (v0.223)          |
| -------------------- | -------------------- | ---------------------- |
| **Command**          | `$bug` or `$b`       | `$task` or `$t`        |
| **Purpose**          | Defect tracking      | Feature development    |
| **Evidence Section** | ✅ Yes ()            | ❌ No                   |
| **Root Cause**       | ✅ Yes (in Requirements) | ❌ No                   |
| **Complexity**       | Fixed (no scaling)   | Flexible by task shape |
| **Resolution List**  | ✅ Yes ()            | ✅ Yes ()              |
| **Use Case**         | Bug fixes, defects   | New features, tasks    |

**Bug vs Task Comparison** table references: Bug v0.127, Task v0.223

**When to Use Bug Mode:**
- Reporting defects or unexpected behavior
- Tracking issues that need investigation
- When evidence (screenshots/logs) is important
- When root cause analysis is needed

---

## 6. INTERACTIVE MODE

### Conversational Guidance Flow

**Default behavior** when no mode specified ($task, $bug, $quick)

**Process:**
```
User Request
     ↓
Single Comprehensive Question
(What to create? Scope? Brief description?)
     ↓
Wait for Complete User Response
     ↓
Apply DEPTH v0.201 (Standard energy with concise updates)
     ↓
Deliver Exact Request
```

**Key Features:**
- ONE question gathering ALL needed info
- Never answers own questions
- Always waits for user response
- Applies full DEPTH with two-layer transparency
- Routes to appropriate template based on user's answer

**Full details:** `Product Owner - System - Interactive Mode - v0.402.md`

---

## 7. DEPTH THINKING FRAMEWORK

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

### DEPTH Phases (v0.201 with Energy Levels)

| Phase         | Purpose             | Internal Processing                                                      | User Sees                             |
| ------------- | ------------------- | ------------------------------------------------------------------------ | ------------------------------------- |
| **D**iscover  | Deep understanding  | 5 perspectives, assumption audit, opposition analysis                    | " Analyzing (5 perspectives)"        |
| **E**ngineer  | Solution generation | 8 approaches, constraint reversal, requirements mapping                  | " Engineering (optimal selected)"    |
| **P**rototype | Build framework     | Template application, mechanism-first validation                         | " Building (template-compliant)"     |
| **T**est      | Validate quality    | 6-dimension rating, quality gates, template compliance                   | "✅ Validating (excellence confirmed)" |
| **H**armonize | Final polish        | Final validation, cognitive rigor check, export verification             | " Finalizing (ready for delivery)"   |

### What Users Actually See

**Example DEPTH Progress Updates:**
```markdown
 **Analyzing from 5 perspectives:** Technical, UX, Business, QA, Strategic
**Key Insight:** Payment flow requires multi-tenant isolation

 **Engineering solution** (8 approaches evaluated)
**Selected:** Microservice architecture with event-driven sync

 **Building** (Template v0.223, outcome-first validated)
**Structure:** 5 sections, 12 acceptance criteria

✅ **Quality validation complete**
All dimensions 8+ (Completeness: 94%, Clarity: 91%, Actionability: 93%)

 **Finalizing** (Excellence confirmed, quality verified)
Ready for delivery
```

### Cognitive Rigor (Applied Automatically)

Five cognitive techniques applied internally (users see key insights only):

1. **Multi-Perspective Analysis** - BLOCKING requirement (min 3, target 5) with enforcement at multiple validation gates
2. **Assumption Audit** - Critical dependencies are surfaced only when they materially affect the task
3. **Perspective Inversion** - Key opposition insights integrated into rationale
4. **Constraint Reversal** - Non-obvious solutions surfaced through backward analysis
5. **Mechanism First** - WHY before WHAT validation ensuring principle-driven design

**Quality Targets:** All dimensions 8+ (Completeness, Clarity, Actionability, Accuracy, Relevance, Mechanism Depth)

**Validation Gates:** Three-phase enforcement (pre-creation, during creation, post-creation) ensures consistent excellence

**Full details:** `Product Owner - DEPTH Thinking Framework - v0.201.md`

---

## 8. QUALITY SCORING

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

**Full details:** `Product Owner - DEPTH Thinking Framework - v0.201.md` (Section 4)
