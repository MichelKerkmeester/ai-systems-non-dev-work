---
title: "Visual Mode"
description: "VIBE and VIBE-MP guidance for evocative UI concept prompts and design-tool routing."
version: "0.201"
contextType: reference
importance_tier: high
trigger_phrases:
  - "$vibe visual mode"
  - "MagicPath UI prompts"
  - "VIBE framework"
  - "EVOKE scoring"
  - "design tool routing"
---

# Prompt - Templates - Visual Mode - v0.201

Visual UI Concepting Mode for transforming technical specifications into evocative, inspiration-based prompts optimized for AI design tools (MagicPath.ai, Lovable, Aura, Bolt, v0.dev).

---

## 1. OVERVIEW

### Purpose

Transform technical/detailed prompts into evocative, creative prompts that maximize AI design tool creativity.

### When to Use

- **Loading Condition:** TRIGGER. Activated by `$vibe` / `$v` commands for AI design tools.
- VIBE framework, EVOKE scoring, and Design Direction detection.
- Vocabulary transformation, platform optimization, and MagicPath.ai specialization.

---

## 2. CORE PHILOSOPHY

> **"Specification constrains. Inspiration liberates."**

Visual concepting prompts should maximize the AI's creative freedom while providing enough directional guidance to ensure relevant, on-brand outputs.

### The Inversion Principle

| Traditional Prompt Improvement | Visual UI Concepting  |
| ------------------------------ | --------------------- |
| Add specificity                | Remove specificity    |
| Include technical details      | Transform to feelings |
| Constrain interpretation       | Enable exploration    |
| Precision = quality            | Evocation = quality   |
| CLEAR scoring                  | EVOKE scoring         |
| RCAF/COSTAR framework          | VIBE framework        |

> **Cross-Reference:** For precision-focused prompts (not visual concepting), use CLEAR scoring from the Patterns & Evaluation guide. Visual Mode is specifically for AI design tools where evocativeness outweighs precision.

### The Creative Director Mindset

> **"For MagicPath.ai and UI tools, think like a Creative Director briefing a talented UI designer, not an algorithm parsing keywords."**

Visual Mode prompts should:
- Read like creative briefs, not search queries
- Flow as natural prose describing UI intent
- Describe user experience and interaction feelings before technical specifications
- Enable conversational iteration after initial generation

### Mode Configuration

| Setting           | Value                                    |
| ----------------- | ---------------------------------------- |
| **Commands**      | `$vibe`, `$v`                            |
| **DEPTH Rounds**  | 5 (creative iteration)                   |
| **Framework**     | VIBE (not RCAF/COSTAR)                   |
| **Scoring**       | EVOKE (not CLEAR)                        |
| **Threshold**     | 40+/50 (MagicPath: 42+/50)               |
| **Output Length** | 100-300 words (MagicPath: 150-400 words) |

---

## 3. THE VIBE FRAMEWORK

### Overview

VIBE captures the essence that makes designs feel alive, coherent, and intentional. Each pillar addresses a distinct dimension of design character.

- **V**ision
  - Focus: Core aesthetic direction
  - Core Question: "What should this look like?"
- **I**nspiration
  - Focus: Reference points
  - Core Question: "What should this feel like?"
- **B**ehavior
  - Focus: Interaction feel
  - Core Question: "How should this move?"
- **E**xperience
  - Focus: Emotional journey
  - Core Question: "How should users feel?"

### V — Vision Pillar

**Definition:** The core aesthetic direction—the fundamental visual personality.

#### Vocabulary Categories

**Mood & Atmosphere:**
| Category     | Vocabulary                                                                            |
| ------------ | ------------------------------------------------------------------------------------- |
| Energy Level | Calm, Energetic, Restful, Dynamic, Serene, Vibrant, Peaceful, Electric                |
| Personality  | Professional, Playful, Serious, Friendly, Approachable, Authoritative, Warm, Cool     |
| Style        | Minimal, Bold, Elegant, Modern, Classic, Editorial, Artsy, Technical, Clean, Polished |

**Spatial Feeling:**
| Category | Vocabulary                                                |
| -------- | --------------------------------------------------------- |
| Openness | Airy, Spacious, Breathing room, Open, Expansive, Generous |
| Density  | Dense, Compact, Tight, Information-rich, Efficient        |
| Balance  | Balanced, Symmetrical, Harmonious, Structured, Organized  |

**Color Vibes:**
| Palette Type | Vocabulary                                                           |
| ------------ | -------------------------------------------------------------------- |
| Warm         | Warm earth tones, Sunset gradients, Golden warmth, Cozy amber        |
| Cool         | Cool tech blues, Ocean depths, Slate professionalism, Arctic clarity |
| Neutral      | Monochrome elegance, Grayscale sophistication, Pure black and white  |
| Vibrant      | Vibrant accents, Bold pops of color, Electric highlights             |

**Typography Feel:**
| Style    | Vocabulary                                                |
| -------- | --------------------------------------------------------- |
| Modern   | Clean sans-serif, Geometric precision, Technical clarity  |
| Classic  | Editorial serif, Timeless elegance, Literary refinement   |
| Friendly | Friendly rounded, Approachable lettering, Soft shapes     |
| Bold     | Statement typography, Confident headlines, Impactful text |

---

### I — Inspiration Pillar

**Definition:** Reference points that communicate design intent through shared touchstones.

#### The Inspiration Template

**Pattern:** `"Like [reference] but [modifier]"`

#### Reference Categories

**Product References:**
- **Minimal/Clean**: Notion, Linear, Stripe, Apple, Vercel, Raycast
- **Bold/Expressive**: Spotify, Discord, Figma, Framer, Arc Browser
- **Professional**: Slack, Salesforce, HubSpot, Atlassian
- **Playful**: Duolingo, Headspace, Robinhood, Cash App
- **Creative**: Dribbble, Behance, Squarespace, Webflow

**Era References:**
| Era         | Visual Characteristics                              |
| ----------- | --------------------------------------------------- |
| 1980s       | Neon, grid systems, bold geometry, high contrast    |
| 2010s       | Flat design, clean geometry, card-based layouts     |
| 2020s       | Soft gradients, dark modes, glass morphism          |
| Near-future | Spatial computing, ambient interfaces, subtle depth |

**Physical Analogies:**
| Reference                | Design Translation                                         |
| ------------------------ | ---------------------------------------------------------- |
| "Japanese zen garden"    | Minimal, intentional spacing, natural balance              |
| "Industrial loft"        | Exposed structure, raw materials, honest design            |
| "Scandinavian furniture" | Functional beauty, clean lines, warm wood tones            |
| "Art gallery"            | White space as feature, content focus, quiet framing       |
| "Luxury boutique"        | Premium details, restrained palette, considered typography |

---

### B — Behavior Pillar

**Definition:** How the interface responds, moves, and acknowledges user action.

#### Animation Character

- **Snappy**
  - Description: Immediate response, quick resolution
  - Use When: Productivity tools, efficiency-focused
- **Smooth**
  - Description: Gradual transitions, polished flow
  - Use When: Premium experiences, luxury positioning
- **Bouncy**
  - Description: Playful physics, energetic
  - Use When: Consumer apps, playful brands
- **Subtle**
  - Description: Nearly imperceptible motion
  - Use When: Minimal designs, professional contexts
- **Dramatic**
  - Description: Bold entrances, statement transitions
  - Use When: Hero sections, emotional peaks
- **Fluid**
  - Description: Continuous motion, flowing
  - Use When: Creative tools, gesture-driven

#### Technical-to-Evocative Mappings

| Technical           | Evocative                      |
| ------------------- | ------------------------------ |
| `duration: 100ms`   | "Instant snap"                 |
| `duration: 200ms`   | "Quick and responsive"         |
| `duration: 300ms`   | "Noticeable but brisk"         |
| `duration: 400ms`   | "Leisurely reveal"             |
| `ease: linear`      | "Mechanical, robotic"          |
| `ease: ease-out`    | "Natural deceleration"         |
| `ease: ease-in-out` | "Smooth, polished, considered" |

---

### E — Experience Pillar

**Definition:** The emotional journey—what users should feel at different stages.

#### Emotional Journey Vocabulary

| Emotion        | Design Signals                                            |
| -------------- | --------------------------------------------------------- |
| **Trust**      | Consistent behavior, clear feedback, professional polish  |
| **Delight**    | Thoughtful details, micro-interactions, unexpected polish |
| **Efficiency** | Clear hierarchy, fast response, minimal friction          |
| **Calm**       | Generous spacing, muted colors, gentle motion             |
| **Energy**     | Bold colors, dynamic motion, confident design             |
| **Focus**      | Minimal chrome, content-forward, quiet interface          |

#### "The Kind Of" Templates

```
"The kind of interface that makes you feel like an expert"
"The kind of dashboard that makes complexity feel manageable"
"The kind of tool that makes mundane tasks satisfying"
"The kind of experience that makes you tell your friends"
```

---

### VIBE Completeness Check

When dimensions are incomplete, ask:

| Dimension       | Discovery Question                                            |
| --------------- | ------------------------------------------------------------- |
| **Vision**      | "What feeling should someone have the moment they see this?"  |
| **Inspiration** | "What existing product captures a similar spirit?"            |
| **Behavior**    | "How should interactions feel—snappy, smooth, or surprising?" |
| **Experience**  | "What should users feel after 30 seconds? After 5 minutes?"   |

### VIBE-MP: MagicPath.ai Enhanced Questions

- **Vision**
  - Standard VIBE: "What should this look like?"
  - MagicPath UI Enhancement: "What story does the first glance tell? What feeling should linger?"
- **Inspiration**
  - Standard VIBE: "What should this feel like?"
  - MagicPath UI Enhancement: "If this UI were a place, where would you be? What product's spirit should echo here?"
- **Behavior**
  - Standard VIBE: "How should this move?"
  - MagicPath UI Enhancement: "How does the interface acknowledge the user? What's the character of each response?"
- **Experience**
  - Standard VIBE: "How should users feel?"
  - MagicPath UI Enhancement: "What should users believe about themselves after using this? What capability should they feel?"

---

## 4. DESIGN DIRECTION DETECTION

### The Eight Directions

- **Precision & Density**
  - Reference Products: Linear, Raycast
  - Emotional Core: Efficiency, power, mastery
- **Warmth & Approachability**
  - Reference Products: Notion, Coda
  - Emotional Core: Comfort, collaboration
- **Sophistication & Trust**
  - Reference Products: Stripe, Mercury
  - Emotional Core: Trust, security, professionalism
- **Boldness & Clarity**
  - Reference Products: Vercel
  - Emotional Core: Decisiveness, modernity
- **Utility & Function**
  - Reference Products: GitHub, VS Code
  - Emotional Core: Focus, productivity
- **Data & Analysis**
  - Reference Products: Mixpanel, Amplitude
  - Emotional Core: Understanding, insight
- **Journey & Flow**
  - Reference Products: Duolingo, Headspace
  - Emotional Core: Progress, achievement, discovery
- **Narrative & Story**
  - Reference Products: Apple Pages, Stripe Atlas
  - Emotional Core: Storytelling, revelation

### Detection Keywords

| Detection Signal                          | Direction                |
| ----------------------------------------- | ------------------------ |
| "dashboard", "analytics", "power user"    | Precision & Density      |
| "collaboration", "team", "workspace"      | Warmth & Approachability |
| "payment", "banking", "security"          | Sophistication & Trust   |
| "startup", "developer", "modern"          | Boldness & Clarity       |
| "code", "repository", "tool"              | Utility & Function       |
| "charts", "metrics", "insights"           | Data & Analysis          |
| "onboarding", "wizard", "flow", "journey" | Journey & Flow           |
| "landing", "story", "narrative", "reveal" | Narrative & Story        |

### Direction Vocabulary Samples

**Precision & Density:**
- Spatial: "tight", "dense", "compact", "efficient", "zero-waste"
- Aesthetic: "sharp", "crisp", "clean lines", "pixel-perfect"
- Philosophy: "every pixel earned", "nothing decorative"

**Warmth & Approachability:**
- Spatial: "generous", "breathing room", "comfortable", "inviting"
- Aesthetic: "soft", "rounded", "gentle", "friendly"
- Philosophy: "comfortable complexity", "collaboration-first"

**Sophistication & Trust:**
- Spatial: "deliberate", "restrained", "premium"
- Aesthetic: "refined", "elegant", "understated"
- Philosophy: "quiet confidence", "trust through design"

**Boldness & Clarity:**
- Spatial: "dramatic", "commanding", "striking"
- Aesthetic: "high-contrast", "sharp", "electric"
- Philosophy: "unapologetic statements", "standing out as strategy"

**Utility & Function:**
- Spatial: "workspace", "toolbox-like", "functional zones"
- Aesthetic: "purposeful", "no-frills", "tool-first"
- Philosophy: "form follows function", "everything has purpose"

**Data & Analysis:**
- Spatial: "dashboard-driven", "visualization-forward", "grid-organized"
- Aesthetic: "clear metrics", "scannable", "information-hierarchy"
- Philosophy: "data speaks first", "insight over decoration"

**Journey & Flow:**
- Spatial: "progressive", "stepped", "guided pathways"
- Aesthetic: "celebratory", "milestone-marked", "achievement-oriented"
- Philosophy: "progress made visible", "every step rewarded"

**Narrative & Story:**
- Spatial: "cinematic", "chapter-like", "revelation-paced"
- Aesthetic: "theatrical", "story-driven", "scroll-choreographed"
- Philosophy: "information as narrative", "understanding through story"

### Handling Ambiguous Design Direction

```yaml
when_direction_unclear:
  strategy: "Ask clarifying question OR use hybrid approach"

  clarifying_question:
    template: |
      "I notice your prompt could work with different design directions:
      - **Option A:** [Direction 1] - [brief description]
      - **Option B:** [Direction 2] - [brief description]
      Which direction resonates more with your vision?"

  hybrid_approach:
    when_to_use: "When multiple directions are equally valid"
    method: "Blend vocabulary from both directions"
    example: "Precision-meets-Warmth: 'efficient yet approachable, dense but not overwhelming'"

  default_fallback:
    direction: "Warmth & Approachability"
    reason: "Most versatile for general UI concepting"
```

---

## 5. EVOKE SCORING SYSTEM

### Overview

- **Total Points**
  - Standard: 50
  - MagicPath.ai: 50
- **Quality Threshold**
  - Standard: 40+
  - MagicPath.ai: 42+
- **Primary Use**
  - Standard: Visual Mode
  - MagicPath.ai: Visual Mode
- **Alternative To**
  - Standard: CLEAR
  - MagicPath.ai: CLEAR

### Dimensions

**Standard EVOKE (50 points):**

- **E**vocative
  - Points: 15
  - Threshold: 12+
  - Core Question: Creates vivid mental imagery?
- **V**isual
  - Points: 10
  - Threshold: 8+
  - Core Question: Paints a picture AI can render?
- **O**pen
  - Points: 10
  - Threshold: 8+
  - Core Question: Leaves room for creativity?
- **K**inetic
  - Points: 10
  - Threshold: 8+
  - Core Question: Suggests motion and life?
- **E**motional
  - Points: 5
  - Threshold: 4+
  - Core Question: Conveys experiential goals?

**MagicPath-Calibrated EVOKE (50 points):**

- **E**vocative
  - Points: 12
  - Threshold: 9+
  - MagicPath Focus: Journey narrative; destination clarity
- **V**isual
  - Points: 12
  - Threshold: 9+
  - MagicPath Focus: Spatial relationships; layout hierarchy
- **O**pen
  - Points: 8
  - Threshold: 6+
  - MagicPath Focus: Implementation flexibility
- **K**inetic
  - Points: 13
  - Threshold: 10+
  - MagicPath Focus: Transitions; navigation flow; interactions
- **E**motional
  - Points: 5
  - Threshold: 4+
  - MagicPath Focus: User feeling; experiential goals

### MagicPath Weight Rationale

- **Kinetic (+3)**: Critical for pathfinding; motion, transitions, navigation flow are core
- **Visual (+2)**: Higher for spatial/visual clarity; pathways need precise visual anchors
- **Evocative (-3)**: Less emphasis on abstract imagery; MagicPath benefits from clear directional language
- **Open (-2)**: Less openness needed; MagicPath requires more structured flow definitions

### Scoring Signals

**Evocative (+):**
- Sensory language present
- Metaphors and analogies used
- Abstract concepts invoked
- Emotional textures described

**Evocative (-):**
- Literal descriptions only
- Technical jargon present
- Specification-heavy language

**Visual (+):**
- Color mood described
- Spatial relationships implied
- Visual metaphors used

**Visual (-):**
- Vague terms ("nice", "good")
- Contradictory elements

**Open (+):**
- Suggestive rather than prescriptive
- Multiple valid interpretations possible
- Direction without destination

**Open (-):**
- Overly specific constraints
- Implementation prescriptions

**Kinetic (+):**
- Interaction feelings described
- State transitions mentioned
- Dynamic qualities present
- Navigation flow articulated (MagicPath bonus)

**Kinetic (-):**
- Static-only description
- Mechanical language

**Emotional (+):**
- User feelings articulated
- Mood atmosphere defined
- Experiential outcomes stated

**Emotional (-):**
- Emotionally neutral language

### MagicPath-Specific Positive Signals

- **Navigation**
  - Signal Vocabulary: "flows to," "leads toward," "guides into"
  - EVOKE Impact: K +2-3
- **Spatial**
  - Signal Vocabulary: "left panel connects to," "main canvas above"
  - EVOKE Impact: V +2-3
- **Progressive**
  - Signal Vocabulary: "reveals progressively," "unlocks upon"
  - EVOKE Impact: K +2, O +1
- **Journey**
  - Signal Vocabulary: "user arrives at," "destination screen"
  - EVOKE Impact: E +2, E(motional) +1
- **Responsive**
  - Signal Vocabulary: "adapts as," "responds to," "shifts based on"
  - EVOKE Impact: K +1, O +1

### Gate Checks for MagicPath UI

- **Kinetic Minimum**
  - Condition: K >= 8/13
  - Failure Action: Block; prompt lacks pathway/transition language
- **Visual Minimum**
  - Condition: V >= 8/12
  - Failure Action: Block; spatial relationships unclear
- **Combined K+V**
  - Condition: K + V >= 18/25
  - Failure Action: Block; core MagicPath requirements unmet
- **Total Score**
  - Condition: >= 42/50
  - Failure Action: Block; general quality insufficient

### Score Interpretation

- **45-50**
  - Assessment: Excellent
  - Action: Output immediately
- **42-44**
  - Assessment: Good
  - Action: Output with minor suggestions
- **38-41**
  - Assessment: Adequate
  - Action: Offer refinement options
- **30-37**
  - Assessment: Weak
  - Action: Require iteration
- **0-29**
  - Assessment: Insufficient
  - Action: Block, request more input

---

## 6. EVOCATIVE VOCABULARY & TRANSFORMATION

> **Philosophy:** Don't map technical specs to feelings. Generate evocative language naturally. Think like a Creative Director, not a lookup table.

### 5.1 The Transformation Mindset

**Wrong Approach:** Build a dictionary of "8px → minimal breathing room"
**Right Approach:** Think in feelings, describe experiences, evoke imagery

### 5.2 Quality Spam Detection

**Words that provide NO UI direction (remove entirely):**
```
beautiful, modern, trending, amazing, professional
nice, good, cool, awesome, high quality, best
stunning, gorgeous, sleek, cutting-edge
```

**Why they fail:** These words are subjective praise, not design direction. "Beautiful modern dashboard" tells the AI nothing about spatial relationships, interaction patterns, or emotional tone.

### Reusable Vocabulary and Transformation Material

Templates: see [visual_mode_library](../assets/visual_mode_library.md)

---


---

## 7. TRANSFORMATION PIPELINE

### Processing Flow

```
Input (Text OR Screenshot)
     │
     ▼
[0. Quality Spam Detection] ← Remove: beautiful, modern, trending, etc.
     │
     ▼
[1. Screenshot Analysis] ← If visual input detected
     │ Extract: VIBE elements, design direction, mood
     ▼
[2. Technical Constraint Detection]
     │ Flag: pixels, hex codes, framework names
     ▼
[3. Design Direction Detection]
     │ Identify: which of 8 directions
     ▼
[4. Platform Detection]
     │ Detect: MagicPath, Lovable, Aura, Bolt, v0.dev
     ▼
[5. Component Library Question] ← MANDATORY: Ask user
     │ Options: Untitled UI, shadcn/ui, or None
     ▼
[6. VIBE Extraction]
     │ Populate: Vision, Inspiration, Behavior, Experience
     ▼
[7. Completeness Check]
     │ If incomplete → Context Questions
     ▼
[8. Vocabulary Transformation]
     │ Apply: direction-specific and platform-specific vocabulary
     ▼
[9. UI Structure Application] (MagicPath)
     │ Organize: Product, Layout, Interactions, Context, Style, Constraints
     ▼
[10. Component Library Injection]
     │ If selected → Add library instruction to prompt
     ▼
[11. Creative Director Voice]
     │ Verify: reads like brief, not query
     ▼
[12. EVOKE Scoring]
     │ Validate: 40+ threshold (42+ for MagicPath)
     ▼
[13. Output or Iterate]
     │ If below threshold → improve and rescore
     ▼
Transformed Prompt
```

### DEPTH Round Integration

```yaml
visual_depth_mapping:
  description: "How transformation pipeline maps to 5 Visual Mode DEPTH rounds"

  round_1_discover:
    pipeline_steps: [0, 1, 2, 3, 4, 5]
    actions:
      - "Quality Spam Detection"
      - "Screenshot Analysis (if applicable)"
      - "Technical Constraint Detection"
      - "Design Direction Detection"
      - "Platform Detection"
      - "Component Library Question (MANDATORY)"
    output: "Foundation identified, platform selected, library chosen"

  round_2_engineer:
    pipeline_steps: [6, 7]
    actions:
      - "VIBE Extraction (Vision, Inspiration, Behavior, Experience)"
      - "Completeness Check with context questions if needed"
    output: "Full VIBE framework populated"

  round_3_prototype:
    pipeline_steps: [8, 9, 10, 11]
    actions:
      - "Vocabulary Transformation (direction + platform specific)"
      - "UI Structure Application (MagicPath)"
      - "Component Library Injection (if selected)"
      - "Creative Director Voice verification"
    output: "Transformed prompt draft with library instruction"

  round_4_test:
    pipeline_steps: [12]
    actions:
      - "EVOKE Scoring (all 5 dimensions)"
      - "Threshold validation (40+/50, 42+ MagicPath)"
      - "Gate checks (K+V minimum for MagicPath)"
    output: "Scored and validated prompt"

  round_5_harmonize:
    pipeline_steps: [13]
    actions:
      - "Output or Iterate decision"
      - "Final polish and platform optimization"
      - "Add iteration hooks for conversational follow-up"
    output: "Deliverable visual prompt"
```

---

### 6.1 Screenshot Analysis Protocol

> **Core Principle:** Feel first, analyze second. Capture the emotional response before breaking down elements.

#### Phase 1: First Impression (3-Second Rule)

| Question                                | Purpose                           |
| --------------------------------------- | --------------------------------- |
| What's the **overall vibe**?            | Single word or phrase             |
| What **emotion** hits first?            | Trust, excitement, focus, delight |
| What's the **dominant characteristic**? | Whitespace, color, typography     |

#### Phase 2: Visual VIBE Extraction

**V — Vision:** Overall aesthetic, spatial feeling, color impression, surface treatment
**I — Inspiration:** Product similarity, era/period, physical analogy
**B — Behavior:** Likely hover behavior, interaction response, transition style
**E — Experience:** Cognitive load, visual hierarchy, personality, user relationship

#### Phase 3: Design Direction Identification

Match screenshot to one or more of the eight directions. Note primary, secondary, and confidence level.

#### Phase 4: Evocative Description

Transform observations into evocative language. DO NOT estimate pixels or guess hex codes. Describe feelings and impressions.

---

## 8. VISUAL STYLE KEYWORDS

Templates: see [visual_mode_library](../assets/visual_mode_library.md)

---


## 9. TARGET PLATFORM OPTIMIZATION

### Platform Hierarchy

- **1**
  - Platform: **MagicPath.ai**
  - Commands: `$vibe` + context detection
  - Specialty: Multi-page flows, iteration
- **2**
  - Platform: **Lovable**
  - Commands: (context detection)
  - Specialty: Full-stack apps
- **2**
  - Platform: **Aura**
  - Commands: (context detection)
  - Specialty: No-code/no-design
- **2**
  - Platform: **Bolt**
  - Commands: (context detection)
  - Specialty: Rapid prototyping
- **2**
  - Platform: **v0.dev**
  - Commands: (context detection)
  - Specialty: UI components

### Platform Characteristics

- **MagicPath**
  - Strength: Multi-page flows
  - Prompt Length: 150-400 words
  - Focus: Journey, narrative, iteration
- **Lovable**
  - Strength: Full-stack apps
  - Prompt Length: 100-250 words
  - Focus: User journey, experience
- **Aura**
  - Strength: No-code/no-design
  - Prompt Length: 50-150 words
  - Focus: Simple language, emotional
- **Bolt**
  - Strength: Rapid prototyping
  - Prompt Length: 50-150 words
  - Focus: Brief, action-oriented
- **v0.dev**
  - Strength: UI components
  - Prompt Length: 100-300 words
  - Focus: Component behavior, style

### Platform-Specific Templates

Templates: see [visual_mode_library](../assets/visual_mode_library.md)


### Platform Anti-Patterns

- **MagicPath**
  - Avoid: Quality spam ("beautiful, modern")
  - Why: No design direction
- **MagicPath**
  - Avoid: Keyword lists
  - Why: Reads as query, not brief
- **Lovable**
  - Avoid: Multi-task prompts (5+ tasks)
  - Why: Context overload
- **Aura**
  - Avoid: Overly long instructions
  - Why: Exceeds context limits
- **Bolt**
  - Avoid: Building everything at once
  - Why: Overwhelming the LLM
- **v0**
  - Avoid: Underspecified prompts
  - Why: Generic output

---

## 10. MAGICPATH.AI SPECIALIZATION

### Platform Context

| Aspect             | Details                                       |
| ------------------ | --------------------------------------------- |
| **Creator**        | Pietro Schirano (formerly Uber, Facebook)     |
| **Positioning**    | "The Cursor moment for design"                |
| **Core Value**     | Natural language UI generation with iteration |
| **Canvas**         | Infinite canvas for multi-page exploration    |
| **Output**         | Clean HTML/CSS, React code, Figma export      |
| **Optimal Length** | 150-400 words                                 |

### UI Structure Elements (Mandatory for MagicPath)

Every MagicPath prompt should address these six elements:

- **Product Type**
  - Description: What kind of UI with character adjectives
  - Example: "A task management dashboard that feels like a calm productivity companion"
- **Layout**
  - Description: Spatial arrangement and breathing room
  - Example: "Sidebar that guides without overwhelming, main content where data takes center stage"
- **Interactions**
  - Description: How users engage, real-time behaviors
  - Example: "Interactions respond with quiet confidence—never jarring, never sluggish"
- **User Context**
  - Description: Who uses it and when
  - Example: "For creative professionals who need to track multiple projects"
- **Visual Style**
  - Description: Aesthetic direction and references
  - Example: "Think Linear's precision meets Notion's warmth"
- **Constraints**
  - Description: Specific requirements and limitations
  - Example: "Must work beautifully on both desktop and tablet"

### Component Library Selection (MANDATORY QUESTION)

**Always ask the user** whether their prompt should specify a component library for consistent, production-ready UI output.

```yaml
component_library_question:
  trigger: visual_or_magicpath_mode_detected
  question: |
    Should the prompt specify a component library for consistent UI?

    **Option A: Untitled UI** (Recommended for polished, production-ready)
    - Premium React components with Figma alignment
    - URL: https://www.untitledui.com/react/components

    **Option B: shadcn/ui** (Recommended for developer-friendly)
    - Accessible, customizable components built on Radix
    - URL: https://ui.shadcn.com/docs/components

    **Option C: No library**
    - Let the AI choose freely

    Your choice? (A, B, or C)

  prompt_injection:
    option_a: |
      Use Untitled UI React components (https://www.untitledui.com/react/components)
      for all UI elements to ensure polished, production-ready output.
    option_b: |
      Use shadcn/ui components (https://ui.shadcn.com/docs/components)
      for all UI elements to ensure accessible, customizable output.
    option_c: null  # No injection
```

**When to Recommend Each:**

- **Untitled UI**
  - Best For: Polished apps, enterprise, premium feel
  - Characteristics: Figma-aligned, consistent styling, professional
- **shadcn/ui**
  - Best For: Developer projects, customization needs
  - Characteristics: Radix-based, accessible, highly customizable
- **No library**
  - Best For: Exploration, unique designs, creative freedom
  - Characteristics: Maximum AI creativity, less consistency

### MagicPath Detection Patterns

**Primary Triggers:**
```
"magicpath", "magicpath.ai", "magic path"
"for magicpath", "using magicpath", "magicpath project"
```

**Context Clues (MagicPath specialty signals):**
```
"multi-page flow", "page-by-page", "screen-by-screen"
"user journey", "user flow design"
"design exploration", "design variants"
"full app design", "complete app flow"
```

### MagicPath Prompt Templates

Templates: see [visual_mode_library](../assets/visual_mode_library.md)

---


---

## 11. ITERATIVE REFINEMENT FLOW

Templates: see [visual_mode_library](../assets/visual_mode_library.md)


### Iteration Best Practices

- **1st**
  - Focus: Direction validation
  - Typical Adjustments: Major VIBE element shifts
- **2nd**
  - Focus: Detail calibration
  - Typical Adjustments: Spatial, color, typography refinement
- **3rd**
  - Focus: Polish
  - Typical Adjustments: Micro-adjustments, edge cases
- **4th+**
  - Focus: Variations
  - Typical Adjustments: Exploring alternatives within direction

**Convergence Signal:** When user expresses satisfaction or output matches intent, close the loop:

```markdown
Looks like we've dialed it in! 🎯

Save this final prompt for future use:
[Final optimized prompt]

Need another UI concept? Just share your next idea.
```

---

## 12. QUICK REFERENCE

### Commands

```
$vibe     - Primary command
$v        - Quick shorthand
```

### VIBE Framework

```
V - Vision      → What it looks like
I - Inspiration → What it's inspired by
B - Behavior    → How it feels to use
E - Experience  → How it makes you feel
```

### EVOKE Scoring

```
Standard (50pt, 40+ threshold):
E - Evocative   (15pts) → Stirs imagination
V - Visual      (10pts) → Paints a picture
O - Open        (10pts) → Leaves creative room
K - Kinetic     (10pts) → Suggests motion/life
E - Emotional   (5pts)  → Conveys feeling

MagicPath (50pt, 42+ threshold):
E - Evocative   (12pts) → Journey narrative
V - Visual      (12pts) → Spatial relationships
O - Open        (8pts)  → Implementation flexibility
K - Kinetic     (13pts) → Transitions & flow
E - Emotional   (5pts)  → User feeling
```

### Design Directions

```
Precision & Density      → Linear, Raycast (efficiency, power)
Warmth & Approachability → Notion, Coda (comfort, collaboration)
Sophistication & Trust   → Stripe, Mercury (trust, professionalism)
Boldness & Clarity       → Vercel (decisiveness, modernity)
Utility & Function       → GitHub, VS Code (focus, productivity)
Data & Analysis          → Mixpanel, Amplitude (understanding, insight)
Journey & Flow           → Duolingo, Headspace (progress, discovery)
Narrative & Story        → Apple Pages, Stripe Atlas (storytelling)
```

### Quality Spam (Remove Entirely)

```
beautiful, modern, trending, amazing, professional
nice, good, cool, awesome, high quality, stunning
```

### Transformation Quick Fixes

| Problem           | Solution                                     |
| ----------------- | -------------------------------------------- |
| Quality spam      | Remove entirely; describe specific qualities |
| Keyword lists     | Transform to narrative prose                 |
| Too technical     | Remove framework/database terms              |
| Low kinetic score | Add motion/flow language                     |
| Low visual score  | Add spatial relationships                    |
| Missing context   | Add user context and use case                |

### MagicPath Checklist

```
□ Product type with character adjectives
□ Layout with spatial relationships
□ Interactions with motion character
□ User context (who, when, why)
□ Visual style with references
□ Constraints and requirements
□ Narrative prose (not keyword list)
□ No quality spam words
□ EVOKE 42+/50
```

---

*This mode transforms technical specifications into evocative prompts that inspire AI design tools. For MagicPath.ai, think like a Creative Director briefing a talented designer.*
