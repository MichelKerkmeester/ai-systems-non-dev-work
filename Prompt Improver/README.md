# Prompt Engineering Assistant - User Guide  v0.200

Transforms vague requests into clear, effective AI prompts using proven frameworks, systematic evaluation, and **concise transparent DEPTH processing**.

---

## 1. WHAT'S NEW IN V0.980

### MAJOR UPDATE: Visual Mode Grounding-First Reconciliation

Visual Mode (`$vibe`/`$v`) has been reconciled with the upstream anti-default design canon:

- **Step 0 Grounding** — A non-negotiable "Ground the Subject" step (Subject / Audience / Single Job) runs before the VIBE framework.
- **Anti-Default Avoid-List** — Emitted briefs carry a named median avoidance list (generic SaaS gradient, centered hero + three cards, untouched component-library surface, three AI-default clusters) plus one justified aesthetic risk.
- **UX Quality Floor** — Responsive, visible focus, reduced motion, WCAG AA.
- **Eight Category Defaults** — The eight design directions are now *category defaults to name and then deliberately deviate from*, not a pick-one menu. Reusable-across-briefs style sets (presets) are prohibited.
- **EVOKE Grounding Pre-Check** — A brief that lacks subject grounding or reads as a templated default scores 0 regardless of evocative quality. The 50-point dimension weights are unchanged.
- **Pre-Output Critique Gate** — A "would I produce this for any similar brief?" check runs before output; if yes, the brief is revised.
- **Seed-of-Thought Debias** — For N≥2 variations, distinct subject-grounded angles are selected.

### MAJOR UPDATE: Visual Mode for AI Design Tools

**Brand New Mode for UI Concepting** — Transform technical specifications into evocative, inspiration-based prompts optimized for AI design tools like **Lovable**, **Aura**, **Bolt**, and **v0.dev**.

| Feature          | Description                                        |
| ---------------- | -------------------------------------------------- |
| **Commands**     | `$vibe`, `$v`                                           |
| **Framework**    | VIBE / VIBE-MP (MagicPath-calibrated)              |
| **Scoring**      | EVOKE — 50 points, 40+ (42+ for MagicPath)         |
| **DEPTH Rounds** | 5 rounds (creative iteration)                      |
| **Philosophy**   | "Think like a Creative Director briefing a talented UI designer" |


**Key Capabilities:**
-  **MagicPath.ai Specialization** — Creative Director voice, 150-400 word narrative prompts
-  **Screenshot Analysis** — Extract VIBE elements from visual references
-  **Eight Category Defaults** — Name then deviate from: Precision, Warmth, Sophistication, Boldness, Utility, Data, Journey & Flow, Narrative & Story
-  **Technical-to-Evocative Transformation** — Convert specs to feelings
-  **Platform Optimization** — Tailored prompts for MagicPath.ai, Lovable, Aura, Bolt, v0.dev
-  **Quality Spam Detection** — Remove non-directional words (beautiful, modern, trending)
-  **Evocative Vocabulary Banks** — Rich word libraries for spatial, color, motion, typography

---

### NEW: Image Mode for AI Image Generators

**Transform vague descriptions into optimized prompts** for Midjourney, DALL-E, Stable Diffusion, Flux, Flux 2 Pro, Imagen 4, Seedream, and more.

| Feature          | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| **Commands**     | `$image`, `$img`                                            |
| **Framework**    | FRAME (Focus, Rendering, Atmosphere, Modifiers, Exclusions) |
| **Scoring**      | VISUAL (60 points, 48+ threshold)                           |
| **DEPTH Rounds** | 5 rounds (creative iteration)                               |

**Key Capabilities:**
-  **30 FRAME Sub-Categories** — Focus(6), Rendering(6), Atmosphere(7), Modifiers(6), Exclusions(5)
-  **Platform Detection** — Auto-detect Midjourney, DALL-E, SD, Flux, Flux 2 Pro, Imagen 4, Seedream, Leonardo, Ideogram
-  **Anti-Pattern Removal** — Eliminate tag soup, quality spam
-  **Vocabulary Banks** — Rich libraries for lighting, composition, styles
-  **Nano Banana Pro** — Special Six-Factor handling for Google Gemini 3 Pro Image

---

### NEW: Video Mode for AI Video Generators

**Transform static descriptions into motion-focused prompts** for Runway, Sora, Kling, Pika, Luma, Veo, Minimax, Seedance, OmniHuman, Wan, and more.

| Feature          | Description                                                           |
| ---------------- | --------------------------------------------------------------------- |
| **Commands**     | `$video`, `$vid`                                                      |
| **Framework**    | MOTION (Movement, Origin, Temporal, Intention, Orchestration, Nuance) |
| **Scoring**      | VISUAL (70 points, 56+ threshold)                                     |
| **DEPTH Rounds** | 5 rounds (creative iteration)                                         |

**Key Capabilities:**
-  **Motion-First** — Camera movement + subject motion
-  **Platform Mental Models** — Kinetic Sculptor (Runway), Physics Simulator (Sora), Audio-Visual Choreographer (Kling), Rendering Engine (Veo)
-  **Physics Language** — Rigidity, gravity, momentum, impact vocabulary for realistic motion
-  **Platform Syntax** — Runway camera control, Sora cinematography, Veo audio
-  **Temporal Consistency** — Duration, pacing, continuous motion
-  **Static-to-Dynamic** — Transform descriptions into motion

---

### System-Wide Improvements (v0.972)

**Bug Fixes & Alignments (27 fixes across 6 files):**
- ✅ Implemented `detect_complexity()` function (was empty stub)
- ✅ Fixed perspective requirement (now enforces minimum 3)
- ✅ Added 5 missing state definitions in Interactive Mode
- ✅ Removed circular fallback references
- ✅ Added infinite loop protection with `max_total_iterations`
- ✅ Fixed RICCE timing paradox with progressive population
- ✅ Added unified severity scale across CLEAR and EVOKE

**Version Updates:**
| Component             | Previous | Current          |
| --------------------- | -------- | ---------------- |
| System Skill          | v1.0.1   | **v1.1.0**       |
| DEPTH Framework       | v0.199   | **v0.200**       |
| Interactive Mode      | v0.690   | **v0.700**       |
| Patterns & Evaluation | v0.200   | **v0.201**       |
| Format Guides         | v0.140   | **v0.141**       |
| Visual Mode           | v0.200   | **v0.201** (MagicPath.ai) |
| Image Mode            | v0.121   | **v0.122**       |
| Video Mode            | v0.121   | **v0.122**       |

---

## 2. KEY FEATURES

- ** Ten Frameworks**: RCAF, COSTAR, RACE, CIDI, TIDD-EC, CRISPE, CRAFT, **VIBE** (visual), **FRAME** (image), **MOTION** (video) with intelligent auto-selection
- ** Visual Mode (NEW)**: Transform technical specs into evocative prompts for AI design tools (Lovable, Aura, Bolt, v0.dev)
- ** Image Mode (NEW)**: Transform descriptions into optimized prompts for AI image generators (FRAME framework, VISUAL scoring)
- ** Video Mode (NEW)**: Transform static descriptions into motion-focused prompts for AI video generators (MOTION framework, VISUAL scoring)
- ** DEPTH Framework**: 10-round methodology with two-layer transparency and RICCE integration (5 rounds for Visual, Image, and Video Modes)
- ** Signal-Based Routing**: Auto-detect mode from keywords (80%+ confidence auto-routes, <80% triggers clarifying questions)
- ** Mandatory Perspectives**: Minimum 3 perspectives (BLOCKING requirement), target 5
- ** Enhanced Cognitive Rigor**: 6 techniques (multi-perspective, assumption audit, perspective inversion, constraint reversal, mechanism-first, RICCE compliance)
- ** Two-Layer Model**: Full rigor internally, concise updates externally
- ** RICCE Framework**: Role, Instructions, Context, Constraints, Examples validation integrated throughout
- ** Ten Operating Modes**: Interactive (default), **Text**, Short, Improve, Refine, JSON, YAML, **Visual**, **Image**, **Video**
- ** Single Question**: All info gathered at once
- ** $raw Mode**: Skip DEPTH processing for fast pass-through
- ** Triple Scoring Systems**: CLEAR (precision) + EVOKE (UI concepting) + VISUAL (image/video) — context-appropriate thresholds
- ** Three Output Formats**: Standard/Markdown, JSON, YAML with format-specific optimization
- ** REPAIR+ Protocol**: Advanced error detection and recovery
- **✅ Quality Gates**: Multi-phase validation ensuring consistent excellence

---

## 3. SYSTEM ARCHITECTURE

```
AGENTS.md → Entry point with intelligent routing logic
    ↓
System Skill v1.1.0 (single brain for identity, routing, rules, fallback chains and delivery)
    ↓
┌─────────────────────────────────────────────────────────────┐
│                    SUPPORTING DOCUMENTS                     │
├─────────────────────────────────────────────────────────────┤
│  DEPTH Framework v0.200    │  Interactive Mode v0.700       │
│  (Methodology, RICCE)      │  (Conversation flow)            │
├─────────────────────────────────────────────────────────────┤
│  Patterns v0.201           │  🎨 Visual Mode v0.201         │
│  (11 frameworks, CLEAR)    │  (VIBE/VIBE-MP, MagicPath.ai)  │
├─────────────────────────────────────────────────────────────┤
│  🖼️ Image Mode v0.122       │  🎬 Video Mode v0.122          │
│  (FRAME framework, VISUAL)   │  (MOTION framework, VISUAL)  │
├─────────────────────────────────────────────────────────────┤
│  Format Guides v0.141 (Markdown, JSON, YAML)                │
└─────────────────────────────────────────────────────────────┘
    ↓
Output → ./export/[###]-enhanced-prompt.[md|json|yaml]
```

---

## 4. QUICK SETUP

### Step 1: Create Claude Project
1. Go to claude.ai → Projects → Create "Prompt Engineering Assistant"

### Step 2: Add System Instructions
1. Edit project details → Custom instructions
2. Copy and paste: `./claude project/Custom Instructions.md`
3. Save the project

### Step 3: Upload Supporting Documents

Add these documents to your project:

**Core Framework:**
- `./claude project/knowledge/Prompt Improver - System - Skill - v1.1.0.md` (single brain: identity, routing, rules, fallback chains and delivery)
- `./claude project/knowledge/Prompt Improver - DEPTH Thinking Framework - v0.200.md` (two-layer transparency, mandatory perspectives, RICCE integration, **signal-based routing**)
- `./claude project/knowledge/Prompt Improver - Interactive Mode - v0.700.md` (conversation flow, state management, smart routing, MagicPath support)
- `./claude project/knowledge/Prompt Improver - Patterns and Evaluation - v0.211.md` (complete framework library, CLEAR scoring, 8 category defaults)
- `./claude project/knowledge/Prompt Improver - Visual Mode - v0.300.md` — VIBE/VIBE-MP framework, EVOKE scoring, **MagicPath.ai specialization**
- `./claude project/knowledge/Prompt Improver - Image Mode - v0.122.md` — FRAME framework (30 sub-categories), VISUAL scoring, platform optimization
- `./claude project/knowledge/Prompt Improver - Video Mode - v0.122.md` — MOTION framework, platform mental models, physics language, audio integration

**Format Specifications:**
Each format guide (v0.141) is fully self-contained with pure format focus:

- **`./claude project/knowledge/Prompt Improver - Format Guide Markdown - v0.141.md`**
  - Natural language prompt structure (DEFAULT FORMAT)
  - RCAF/CRAFT framework integration
  - Baseline token usage, optimal human readability

- **`./claude project/knowledge/Prompt Improver - Format Guide JSON - v0.141.md`**
  - Structured data for API/system integration
  - Schema validation and type safety
  - Token overhead: +5-10%

- **`./claude project/knowledge/Prompt Improver - Format Guide YAML - v0.141.md`**
  - Human-friendly configuration format
  - Minimal syntax overhead, clear hierarchy
  - Token overhead: +3-7%

### Step 4: Start Enhancing
```
analyze customer data            # Interactive mode with full transparency
$text improve my chatbot        # Explicit text mode
$raw fix grammar                # Skip DEPTH, fast pass-through
$improve generate report        # Standard 10-round DEPTH processing
$json api endpoint              # JSON format with structure optimization
$yaml config template           # YAML format with hierarchy optimization
$vibe dashboard concept         # 🎨 Visual mode for AI design tools
$v landing page                # 🎨 Evocative prompts for Lovable/v0.dev/MagicPath.ai
$image portrait lighting       # 🖼️ NEW: Image mode for AI image generators
$img landscape midjourney     # 🖼️ NEW: Optimized for Midjourney
$video car chase action       # 🎬 NEW: Video mode for AI video generators
$vid dance sequence runway    # 🎬 NEW: Optimized for Runway
```

---

## 5. OPERATING MODES

**Default Mode:** The system defaults to `$interactive` with automatic 10-round DEPTH unless specified.

| Mode            | Command                | Purpose                    | Questions       | DEPTH Rounds | Scoring    | Output       |
| --------------- | ---------------------- | -------------------------- | --------------- | ------------ | ---------- | ------------ |
| **Interactive** | (default)              | Guided enhancement         | 1 comprehensive | 10 rounds    | CLEAR      | User choice  |
| **$text**       | `$text` / `$t`         | Standard text prompt       | 1 comprehensive | 10 rounds    | CLEAR      | User choice  |
| **$raw**        | `$raw`                 | Skip DEPTH                 | NONE            | 0 rounds     | —          | Pass-through |
| **$short**      | `$short` / `$s`        | Minimal refinement         | 1 comprehensive | 3 rounds     | CLEAR      | Auto-format  |
| **$improve**    | `$improve` / `$i`      | Standard enhancement       | 1 comprehensive | 10 rounds    | CLEAR      | Auto-format  |
| **$refine**     | `$refine` / `$r`       | Maximum optimization       | 1 comprehensive | 10 rounds    | CLEAR      | Auto-format  |
| **$json**       | `$json` / `$j`         | API format                 | 1 comprehensive | 10 rounds    | CLEAR      | JSON only    |
| **$yaml**       | `$yaml` / `$y`         | Config format              | 1 comprehensive | 10 rounds    | CLEAR      | YAML only    |
|  **$vibe**     | `$vibe`/`$v`           | **UI concepting**          | 1 comprehensive | **5 rounds** | **EVOKE 40+**  | Evocative    |
|  **$image**    | `$image`/`$img`        | **Image generation (NEW)** | 1 comprehensive | **5 rounds** | **VISUAL** | Platform-opt |
|  **$video**    | `$video`/`$vid`        | **Video generation (NEW)** | 1 comprehensive | **5 rounds** | **VISUAL** | Platform-opt |

### Interactive Flow (Default)
System asks one comprehensive question to understand your enhancement needs:
- What prompt needs enhancement?
- What's the use case/goal?
- Any specific requirements?

System waits for complete response before proceeding with full DEPTH processing.

**Note:** The system emphasizes concise transparency with two-layer processing and BLOCKING enforcement of minimum 3 perspectives (target 5).

### Visual Mode Highlights
Visual Mode (`$vibe`, `$v`) uses a completely different approach:
- **VIBE Framework** instead of RCAF/COSTAR — focuses on Vision, Inspiration, Behavior, Experience
- **Step 0 Grounding** — Non-negotiable Subject/Audience/Single Job before VIBE; avoids generic defaults
- **EVOKE Scoring** instead of CLEAR — measures evocativeness with non-skippable grounding pre-check (templated/default briefs score 0)
- **5 DEPTH Rounds** instead of 10 — optimized for creative iteration with pre-output critique gate
- **Avoid-List + UX Floor** — Enforces anti-default guardrails (gradients, hero+cards, component-library defaults) and WCAG AA
- **Target Platforms** — Lovable, Aura, Bolt, v0.dev and other AI design tools

---

## 6. MODE DETAILS

### Interactive Mode (Default)

**Purpose:** Conversational enhancement with guided framework selection

**Process:**
1. System asks comprehensive question
2. Waits for user response
3. Analyzes request (complexity, frameworks, format)
4. Presents options if needed
5. Applies DEPTH with concise updates
6. Delivers enhanced prompt

**Key Features:**
- ONE question gathering ALL needed info
- Framework intelligence with confidence scores
- Format selection (Markdown/JSON/YAML)
- Full 10-round DEPTH processing
- Complete transparency report after delivery

**Full details:** `./claude project/knowledge/Prompt Improver - Interactive Mode - v0.700.md`

---

### $raw Mode

**Purpose:** Skip DEPTH processing for fast pass-through

**Process:**
- No questions asked (immediate processing)
- Skips all DEPTH rounds
- Basic formatting and light cleanup only
- Fastest possible turnaround

**Example:** `$raw enhance my chatbot prompt`

---

### $short Mode

**Purpose:** Minimal refinement with focused 3-round DEPTH

**Process:**
- Asks ONE comprehensive question
- Applies focused 3-round DEPTH
- Key changes highlighted
- Quick turnaround

**Use Case:** When you need light polish without full analysis

**Example:** `$short improve clarity of this prompt`

---

### $improve Mode

**Purpose:** Standard comprehensive enhancement with full DEPTH

**Process:**
- Asks ONE comprehensive question
- Full 10-round DEPTH processing
- Two-layer transparency (concise updates)
- Complete enhancement report
- Framework intelligence applied

**Use Case:** Default enhancement mode for most prompts

**Example:** `$improve help me write a data analysis prompt`

---

### $refine Mode

**Purpose:** Maximum optimization for already-good prompts

**Process:**
- Asks ONE comprehensive question
- Full 10-round DEPTH with deep analysis
- Detailed optimization report
- Multiple improvement iterations considered
- Excellence-level targeting (CLEAR 45+)

**Use Case:** Taking good prompts to excellence

**Example:** `$refine optimize this high-performing prompt further`

---

### $json Mode

**Purpose:** Structured JSON output for API/system integration

**Key Features:**
- Valid JSON syntax only (no markdown)
- Schema-based structure
- Field consistency and type safety
- API-ready format
- Token overhead: +5-10%

**Best For:**
- API integrations
- System-to-system communication
- Programmatic parsing
- Data pipelines

**Average CLEAR:** 41/50 (lower expression, higher correctness weighting)

**Full details:** `./claude project/knowledge/Prompt Improver - Format Guide JSON - v0.141.md`

---

### $yaml Mode

**Purpose:** Human-friendly YAML configuration format

**Key Features:**
- Minimal syntax (no brackets/quotes)
- Clear indentation-based hierarchy
- Comment support for documentation
- Multi-line string handling
- Token overhead: +3-7%

**Best For:**
- Configuration templates
- Documentation with structure
- Human-readable data
- Multi-level hierarchies

**Average CLEAR:** 42/50 (balanced readability and structure)

**Full details:** `./claude project/knowledge/Prompt Improver - Format Guide YAML - v0.141.md`

---

## 7. VISUAL MODE (NEW)

### Transform Technical Specs into Evocative Prompts

**Purpose:** Create inspiration-based prompts for AI design tools that maximize creative output.

**Commands:** `$vibe`, `$v`

**Key Difference:** Visual Mode inverts traditional prompt engineering — instead of adding specificity, it removes constraints to inspire AI creativity.

| Traditional Prompts       | Visual Mode           |
| ------------------------- | --------------------- |
| Add specificity           | Remove specificity    |
| Include technical details | Transform to feelings |
| Constrain interpretation  | Enable exploration    |
| CLEAR scoring             | EVOKE scoring         |
| RCAF/COSTAR framework     | VIBE framework        |

### The VIBE Framework

| Element         | Focus                    | Core Question                 |
| --------------- | ------------------------ | ----------------------------- |
| **V**ision      | Core aesthetic direction | "What should this look like?" |
| **I**nspiration | Reference points         | "What should this feel like?" |
| **B**ehavior    | Interaction feel         | "How should this move?"       |
| **E**xperience  | Emotional journey        | "How should users feel?"      |

### The EVOKE Scoring System

**Grounding Pre-Check (non-skippable):** A brief that lacks subject-grounding or reads as a templated default scores 0 regardless of evocative quality. The 50-point dimension weights are unchanged.

| Dimension     | Points | Threshold | What It Measures               |
| ------------- | ------ | --------- | ------------------------------ |
| **E**vocative | 15     | 12+       | Creates vivid mental imagery   |
| **V**isual    | 10     | 8+        | Paints a picture AI can render |
| **O**pen      | 10     | 8+        | Leaves room for creativity     |
| **K**inetic   | 10     | 8+        | Suggests motion and life       |
| **E**motional | 5      | 4+        | Conveys experiential goals     |
| **Total**     | 50     | 40+       | Quality threshold              |

### Eight Category Defaults (Name, Then Deviate)

Visual Mode recognizes eight category defaults and deliberately deviates from them — they are **not a pick-one menu**. A reusable-across-briefs style set is a preset and is prohibited.

| Category Default            | Reference Products       | Emotional Core                   |
| --------------------------- | ------------------------ | -------------------------------- |
| **Precision & Density**     | Linear, Raycast          | Efficiency, power, mastery       |
| **Warmth & Approachability**| Notion, Coda             | Comfort, collaboration           |
| **Sophistication & Trust**  | Stripe, Mercury          | Trust, security, professionalism |
| **Boldness & Clarity**      | Vercel                   | Decisiveness, modernity          |
| **Utility & Function**      | GitHub, VS Code          | Focus, productivity              |
| **Data & Analysis**         | Mixpanel, Amplitude      | Understanding, insight           |
| **Journey & Flow**          | Duolingo, Headspace      | Progress, achievement, discovery |
| **Narrative & Story**       | Apple Pages, Stripe Atlas| Storytelling, revelation         |

### Screenshot Analysis

Visual Mode can analyze screenshots and images to extract VIBE elements:

```
FIRST IMPRESSION (3 seconds):
"Clean, professional, data-focused. Feels like a power tool for experts."

VIBE EXTRACTION:
- Vision: Dense but organized. Cool blue-gray palette. Sharp, precise aesthetic.
- Inspiration: "Like Linear meets a Bloomberg terminal—efficient but beautiful"
- Behavior: Likely snappy interactions, minimal animation, immediate feedback
- Experience: Makes users feel capable and in control. Expert tool energy.

CATEGORY DEFAULT RECOGNIZED (then deviate):
Precision & Density, Data & Analysis — start here then depart deliberately
```

### Target Platform Optimization

| Platform       | Strength          | Prompt Length | Key Approach                              |
| -------------- | ----------------- | ------------- | ----------------------------------------- |
| **MagicPath.ai** | Multi-page flows | 150-400 words | Creative Director voice, journey mapping  |
| **Lovable**    | Full-stack apps   | 100-250 words | glassmorphism, micro-interactions, bouncy |
| **Aura**       | No-code/no-design | 50-150 words  | modern SaaS, rounded-xl, soft shadows     |
| **Bolt**       | Rapid prototyping | 50-150 words  | neumorphism, cyberpunk, material design   |
| **v0.dev**     | UI components     | 100-300 words | shadcn components, Tailwind classes       |

### Visual Mode Process (5 DEPTH Rounds + Step 0 Grounding)

```
Step 0 (Ground): Subject / Audience / Single Job — non-negotiable grounding before VIBE
Round 1 (Discover): Screenshot Analysis + Technical Constraint Detection + Category Default Recognition
Round 2 (Engineer): VIBE Extraction (Vision, Inspiration, Behavior, Experience) + Avoid-List Application
Round 3 (Prototype): Vocabulary Transformation + Evocative Prompt Construction + UX Floor (responsive, visible focus, reduced motion, WCAG AA)
Round 4 (Test): EVOKE Scoring (all 5 dimensions, 40+ threshold) + Grounding Pre-Check
Round 5 (Harmonize): Pre-Output Critique Gate ("would I produce this for any similar brief?") → Revise if yes → Final Polish + Platform Optimization
```

**Example Usage:**
```
$vibe Create a dashboard for monitoring server health metrics
$vibe Design a landing page for a meditation app
$v Build a settings panel for a developer tool
```

**Full details:** `./claude project/knowledge/Prompt Improver - Visual Mode - v0.300.md`

---

## 8. INTERACTIVE MODE

### Conversational Guidance Flow

**Default behavior** when no mode specified ($improve, $json, etc.)

**Process:**
```
User Request
     ↓
Single Comprehensive Question
(What needs enhancement? Use case? Requirements?)
     ↓
Wait for Complete User Response
     ↓
Apply DEPTH v0.200 (10 rounds with concise updates)
     ↓
Deliver Enhanced Prompt + Transparency Report
```

**Key Features:**
- ONE question gathering ALL needed info
- Never answers own questions
- Always waits for user response
- Applies full DEPTH with two-layer transparency
- Framework intelligence with selection reasoning
- Format choice presented (Markdown/JSON/YAML)
- Complete transparency report after delivery

**What Users See:**
```markdown
I'll enhance your prompt using comprehensive DEPTH processing.

To create the best enhancement, please provide:
1. **Current prompt or description:** What needs enhancement?
2. **Use case/goal:** What will this prompt accomplish?
3. **Any specific requirements:** Format, framework, constraints?

[System waits for response]

[After response, DEPTH processing begins with concise updates]

 **Analyzing from 5 perspectives:** Prompt Engineering, AI Interpretation, 
    User Clarity, Framework Selection, Token Efficiency
**Key Insight:** Technical documentation needs precision framework

 **Engineering solution** (8 frameworks evaluated)
**Selected:** TIDD-EC (93% success rate, precision-critical tasks)

 **Building** (TIDD-EC structure, RICCE-compliant)
**Structure:** Task, Instructions, Do's, Don'ts, Examples, Context

✅ **Quality validation complete**
**CLEAR Score:** 44/50 (Correctness: 9, Logic: 9, Expression: 13, 
                        Arrangement: 9, Reuse: 4)

 **Finalizing** (Excellence confirmed, RICCE verified)
Ready for delivery

[Enhanced prompt delivered + full transparency report]
```

**Full details:** `./claude project/knowledge/Prompt Improver - Interactive Mode - v0.700.md`

---

## 9. DEPTH THINKING FRAMEWORK

### Two-Layer Transparency Model

**DEPTH** = **D**iscover **E**ngineer **P**rototype **T**est **H**armonize

A structured 5-phase methodology ensuring comprehensive prompt enhancement through **concise transparent excellence** - full rigor applied internally, meaningful updates shown to users.

**Processing Depth:**
| Mode         | Rounds    | User Visibility          | Application            |
| ------------ | --------- | ------------------------ | ---------------------- |
| **Standard** | 10 rounds | Concise progress updates | Real-time transparency |
| **Visual/Image/Video** | 5 rounds | Creative iteration | Creative modes |
| **$raw**     | 0 rounds  | Pass-through             | Skip DEPTH             |
| **$short**   | 3 rounds  | Key changes only         | Focused refinement     |

### Signal-Based Routing (v0.200)

DEPTH now includes automatic mode detection in Round 1:

| Confidence | Action | Example |
|------------|--------|---------|
| **≥80%** | Auto-select mode | "midjourney portrait" → Image Mode |
| **50-79%** | Suggest with confirmation | "animated logo" → "Did you mean Video Mode?" |
| **<50%** | Ask clarifying questions | "make it better" → "What type of content?" |

**Signal Categories:** use_case, style, platform, motion, temporal

### DEPTH Phases (v0.200 with RICCE Integration + Signal Routing)

| Phase         | Purpose             | Internal Processing                                                           | User Sees                                    |
| ------------- | ------------------- | ----------------------------------------------------------------------------- | -------------------------------------------- |
| **D**iscover  | Deep understanding  | Signal detection, 5 perspectives, assumption audit, RICCE Role & Context      | " Analyzing (5 perspectives)"               |
| **E**ngineer  | Solution generation | 8 frameworks evaluated, constraint analysis, RICCE Constraints & Instructions | " Engineering (optimal framework selected)" |
| **P**rototype | Build framework     | Template application, RICCE validation, mechanism-first structure             | " Building (RCAF/framework structure)"      |
| **T**est      | Validate quality    | CLEAR scoring (5 dimensions), quality gates, RICCE Examples validation        | "✅ Validating (CLEAR 42/50)"                 |
| **H**armonize | Final polish        | Final verification, cognitive rigor check, RICCE completeness                 | " Finalizing (excellence confirmed)"        |

### What Users Actually See

**Example DEPTH Progress Updates:**
```markdown
 **Analyzing from 5 perspectives:** Prompt Engineering, AI Interpretation,
    User Clarity, Framework Specialist, Token Efficiency
**Key Insight:** Content creation task benefits from audience-focused approach

 **Engineering solution** (8 frameworks evaluated)
**Selected:** COSTAR (94% success rate, content creation champion)
**Alternative:** RCAF (92% - considered for simpler approach)

 **Building** (COSTAR structure, RICCE-compliant)
**Structure:** Context, Objective, Style, Tone, Audience, Response format

✅ **Quality validation complete**
**CLEAR Score:** 43/50 breakdown:
- Correctness: 9/10 (accurate requirements, valid assumptions)
- Logic: 8/10 (clear reasoning flow, edge cases covered)
- Expression: 13/15 (high clarity, minimal ambiguity)
- Arrangement: 9/10 (excellent structure, logical sections)
- Reuse: 4/5 (adaptable with minor adjustments)

 **Finalizing** (Excellence confirmed, RICCE verified)
**Assumptions flagged:** [Assumes: Target audience has technical background]
Ready for delivery
```

### Cognitive Rigor (Applied Automatically)

Six mandatory frameworks applied internally (users see key insights only):

1. **Multi-Perspective Analysis** - BLOCKING requirement (min 3, target 5) with enforcement at validation gates
2. **Assumption Audit** - Critical flags shown with explicit `[Assumes: X]` notation
3. **Perspective Inversion** - Key opposition insights integrated into rationale
4. **Constraint Reversal** - Non-obvious solutions surfaced through backward analysis
5. **Mechanism First** - WHY before WHAT validation ensuring principle-driven design
6. **RICCE Compliance** - Structural completeness across all five dimensions

**Quality Targets:** All dimensions 8+ (Completeness, Clarity, Actionability, Accuracy, Relevance, Mechanism Depth)

**Validation Gates:** Multi-phase enforcement (pre-enhancement, during enhancement, post-enhancement) ensures consistent excellence

**Full details:** `./claude project/knowledge/Prompt Improver - DEPTH Thinking Framework - v0.200.md`

---

## 10. RICCE FRAMEWORK

### Structural Validation Checklist

**RICCE** ensures every enhanced prompt contains essential elements for complete understanding:

**R**ole - Perspectives Defined
- ✅ Minimum 3 perspectives analyzed (target 5)
- ✅ Target AI role/expertise defined
- ✅ User context understood

**I**nstructions - Tasks Broken Down
- ✅ Clear action items specified
- ✅ Execution sequence logical
- ✅ Success criteria defined

**C**ontext - Layers Comprehensive
- ✅ Domain background provided
- ✅ Constraints specified
- ✅ Dependencies identified

**C**onstraints - Boundaries Established
- ✅ Scope boundaries clear
- ✅ Format requirements defined
- ✅ Quality thresholds set

**E**xamples - Validation Included
- ✅ Use cases provided
- ✅ Expected outputs shown
- ✅ Edge cases considered

### RICCE-DEPTH Integration

**How They Work Together:**
- **DEPTH** = The **HOW** (process methodology)
- **RICCE** = The **WHAT** (structural checklist)
- **Together** = Rigorous process + Complete structure = Superior prompts

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
- Role: 5 perspectives analyzed (Prompt Eng., AI Interpretation, User Clarity,
        Framework Selection, Token Efficiency)
- Instructions: Clear action items with execution sequence defined
- Context: Domain background, constraints, and dependencies specified
- Constraints: Scope boundaries set, format requirements defined
- Examples: Use cases with expected outputs and edge cases

**Assumption Flagged:** [Assumes: API supports async requests]
```

**Full details:** `./claude project/knowledge/Prompt Improver - DEPTH Thinking Framework - v0.200.md` (Sections 5-6)

---

## 11. FRAMEWORK INTELLIGENCE

### Automatic Framework Selection

The system analyzes your request across 8 dimensions using structured logic:

```yaml
framework_selection:
  analyze_characteristics:
    - complexity: [1-10 scale]
    - urgency: [boolean]
    - audience_specific: [boolean]
    - creative_element: [boolean]
    - precision_critical: [boolean]
    - compliance_needs: [boolean]
    - multi_stakeholder: [boolean]
  
  select_best:
    method: highest_score
    output:
      primary: [selected_framework]
      confidence: [normalized_score]
      alternative: [second_best]
      reasoning: [explanation]
```

### Framework Selection Matrix

| Complexity | Primary Need  | Framework  | Success Rate | Use Cases                           |
| ---------- | ------------- | ---------- | ------------ | ----------------------------------- |
| **1-3**    | Speed         | RACE       | 88%          | Urgent tasks, quick iterations      |
| **1-4**    | Clarity       | RCAF       | 92%          | General prompts, balanced needs     |
| **3-6**    | Audience      | COSTAR     | 94%          | Content creation, communication     |
| **4-6**    | Instructions  | CIDI       | 90%          | Documentation, tutorials            |
| **5-7**    | Creativity    | CRISPE     | 87%          | Strategy, exploration               |
| **6-8**    | Precision     | TIDD-EC    | 93%          | Compliance, quality-critical        |
| **7-10**   | Comprehensive | CRAFT      | 91%          | Complex projects, planning          |
|  **Any**  | Visual/UI     | **VIBE**   | 90%          | AI design tools, UI concepting      |
|  **Any**  | Image         | **FRAME**  | 90%          | AI image generators, visual prompts |
|  **Any**  | Video         | **MOTION** | 90%          | AI video generators, motion prompts |

### Framework Descriptions

**RCAF (Role, Context, Action, Format)** - 92% Success
- **Best for:** 80% of prompts, general-purpose tasks
- **Strengths:** Balanced, clear structure, high adaptability
- **Use when:** Unsure which framework to use

**COSTAR (Context, Objective, Style, Tone, Audience, Response)** - 94% Success
- **Best for:** Content creation, communication tasks
- **Strengths:** Audience focus, style control, highest success rate
- **Use when:** Output needs specific tone or audience targeting

**RACE (Role, Action, Context, Execute)** - 88% Success
- **Best for:** Urgent tasks requiring quick iterations
- **Strengths:** Speed, simplicity, action-oriented
- **Use when:** Time-sensitive or simple requests

**CIDI (Context, Instructions, Details, Input)** - 90% Success
- **Best for:** Process documentation, tutorials, step-by-step guides
- **Strengths:** Instruction clarity, detail orientation
- **Use when:** Creating instructional content

**TIDD-EC (Task, Instructions, Do's, Don'ts, Examples, Context)** - 93% Success
- **Best for:** Quality-critical tasks, compliance requirements
- **Strengths:** Precision, explicit constraints, second-highest success
- **Use when:** Accuracy and compliance are paramount

**CRISPE (Capacity, Role, Insight, Statement, Personality, Experiment)** - 87% Success
- **Best for:** Strategic planning, creative exploration
- **Strengths:** Adaptability, experimental approach
- **Use when:** Exploring new directions or strategies

**CRAFT (Context, Role, Action, Format, Target)** - 91% Success
- **Best for:** Complex multi-faceted projects
- **Strengths:** Comprehensive coverage, planning depth
- **Use when:** High complexity (7+) with multiple stakeholders

 **VIBE (Vision, Inspiration, Behavior, Experience)** - 90% Success
- **Best for:** Visual UI concepting, AI design tool prompts
- **Strengths:** Evocative language, creative freedom, platform-optimized
- **Use when:** Creating prompts for Lovable, Aura, Bolt, v0.dev
- **Note:** Uses EVOKE scoring (40+ threshold)

 **VIBE-MP (MagicPath-Calibrated VIBE)** - 92% Success
- **Best for:** MagicPath.ai UI design with multi-page flows
- **Strengths:** Creative Director voice, journey mapping, iterative refinement
- **Use when:** `$vibe` with MagicPath context (e.g., "magicpath", "multi-page flow")
- **Note:** Uses EVOKE scoring with higher threshold (42+) and reweighted dimensions (K=13, V=12)

 **FRAME (Focus, Rendering, Atmosphere, Modifiers, Exclusions)** - 90% Success
- **Best for:** AI image generators (Midjourney, DALL-E, SD, Flux, Flux 2 Pro, Imagen 4, Seedream, Leonardo, Ideogram)
- **Strengths:** Platform-aware, anti-pattern detection, vocabulary banks
- **Use when:** Creating prompts for image generation

 **MOTION (Movement, Origin, Temporal, Intention, Orchestration, Nuance)** - 90% Success
- **Best for:** AI video generators (Runway, Sora, Kling, Pika, Luma, Veo, Minimax, Seedance, OmniHuman, Wan)
- **Strengths:** Motion-first, temporal consistency, platform syntax
- **Use when:** Creating prompts for video generation

### Power Combinations

**For Complex Scenarios:**
- **RCAF + CoT (Chain of Thought)**: Systematic thinking structure
- **COSTAR + ReAct (Reasoning + Acting)**: Iterative content refinement
- **TIDD-EC + Few-Shot**: Learning from examples with precision
- **RACE + ToT (Tree of Thoughts)**: Rapid decision trees
- **Master-Detail Pattern**: Nested framework hierarchies

**Full details:** `./claude project/knowledge/Prompt Improver - Patterns and Evaluation - v0.211.md` (Sections 1-4)

---

## 12. ENHANCEMENT SYSTEM

### Systematic Enhancement Pipeline

```yaml
enhancement_pipeline:
  stages:
    - structural_enhancement:
        actions: [apply_framework, reorganize_sections]
    - clarity_enhancement:
        actions: [simplify_language, disambiguate_terms]
    - precision_enhancement:
        actions: [add_metrics, specify_constraints, define_scope]
    - efficiency_enhancement:
        actions: [remove_redundancy, compress_verbose, optimize_tokens]
    - reusability_enhancement:
        actions: [parameterize_variables, add_flexibility, generalize_patterns]
```

### Common Pattern Transformations

| Pattern                    | Impact                       | CLEAR Gain       | Example                                                                 |
| -------------------------- | ---------------------------- | ---------------- | ----------------------------------------------------------------------- |
| **Vague→Specific**         | Add role, context, metrics   | +15-20 points    | "Analyze text" → "Analyze sentiment in customer reviews with 1-5 scale" |
| **Assumption Elimination** | Make implicit explicit       | +3-5 Correctness | Add: "[Assumes: data in CSV format with header row]"                    |
| **Scope Boundaries**       | Define included/excluded     | +4-6 Logic       | "Analyze reviews (exclude ratings <3 stars)"                            |
| **Example Injection**      | Clarify format expectations  | +3-5 Expression  | Add 2-3 input/output examples                                           |
| **Success Layering**       | Min/target/excellence levels | +4-5 Arrangement | Define minimum viable, target, and excellence criteria                  |

### Enhancement Priority Matrix

```yaml
by_score:
  "< 25": "Complete rewrite with RCAF baseline"
  "25-30": "Framework switch evaluation (try COSTAR or TIDD-EC)"
  "30-35": "Fix 2 weakest CLEAR dimensions"
  "35-40": "Polish weakest dimension"
  "40-45": "Optional refinements for excellence"
  "45+": "Excellence achieved - ship it!"
```

### Excellence Patterns (45+ CLEAR)
- Complete context layering (environmental, historical, constraints, resources)
- Multi-level success criteria (minimum, target, excellence)
- Adaptive response formats (quick review vs comprehensive)
- Self-documenting structure (what, why, how, example)

**Full details:** `./claude project/knowledge/Prompt Improver - Patterns and Evaluation - v0.211.md` (Sections 5-7)

---

## 13. CLEAR EVALUATION

### Context-Aware Scoring System

```yaml
contextual_clear_scoring:
  base_weights:
    correctness: 0.20
    logic: 0.20
    expression: 0.30
    arrangement: 0.20
    reuse: 0.10
  
  context_adjustments:
    api_integration:
      correctness: 0.30  # Higher accuracy requirement
      expression: 0.20   # Lower language priority
    creative_writing:
      expression: 0.35   # Higher clarity priority
      correctness: 0.15  # Lower accuracy requirement
    template_creation:
      reuse: 0.25        # Higher adaptability priority
      logic: 0.15        # Lower reasoning priority
```

### CLEAR Dimensions (50-point scale)

| Dimension       | Points | Assessment Criteria                                |
| --------------- | ------ | -------------------------------------------------- |
| **Correctness** | 10     | Accuracy, no contradictions, valid assumptions     |
| **Logic**       | 10     | Reasoning flow, cause-effect, conditional handling |
| **Expression**  | 15     | Clarity, specificity, minimal ambiguity            |
| **Arrangement** | 10     | Structure, organization, logical flow              |
| **Reusability** | 5      | Adaptability, parameterization, flexibility        |

### Score Interpretation

| Score     | Grade | Quality Level | Action                           |
| --------- | ----- | ------------- | -------------------------------- |
| **45-50** | A+    | Excellence    | Ship immediately                 |
| **40-44** | A     | Professional  | Ready to use                     |
| **35-39** | B     | Good          | Minor refinements optional       |
| **30-34** | C     | Adequate      | Consider improvements            |
| **<30**   | D/F   | Needs work    | Significant enhancement required |

### Multi-Pass Evaluation
1. **Surface Pass**: Framework presence, basic completeness
2. **Deep Pass**: Ambiguity detection, assumption analysis
3. **Interaction Pass**: AI interpretation testing, failure mode analysis

**Full details:** `./claude project/knowledge/Prompt Improver - Patterns and Evaluation - v0.211.md` (Sections 9-11)
