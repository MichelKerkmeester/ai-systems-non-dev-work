---
title: "Framework Pattern Library"
description: "Framework matrix, deep dives, advanced combinations and optimization strategies for prompt framework selection."
version: "0.100"
contextType: asset
importance_tier: high
trigger_phrases:
  - "framework library"
  - "framework selection matrix"
  - "RCAF COSTAR RACE"
  - "framework combinations"
  - "framework optimization"
---

# Prompt - Assets - Framework Pattern Library - v0.100

Framework matrix, deep dives, advanced combinations and optimization strategies for prompt framework selection.

**Loading Condition:** TRIGGER (framework selection, framework alternatives, combination or optimization work)
**Purpose:** Lookup library of the eleven frameworks with selection algorithms and combination patterns.
**Scope:** Extracted from Patterns & Evaluation; the evaluation methodology stays in `references/patterns-evaluation.md`.

---

## 1. OVERVIEW

### Purpose

Provide the complete framework lookup set (RCAF, COSTAR, RACE, CIDI, TIDD-EC, CRISPE, CRAFT, VIBE, VIBE-MP, FRAME, MOTION) with selection algorithms, deep dives, combination patterns and optimization strategies.

### Usage

Load when choosing or switching frameworks, combining frameworks or optimizing an existing framework choice. Apply the matrix first, then the deep dive for the selected framework.

---

## 2. FRAMEWORK LIBRARY & SELECTION

### Complete Framework Matrix

- **RCAF**
  - Elements: Role, Context, Action, Format
  - Best For: 80% of prompts, general tasks
  - Avoid When: Over-complex scenarios
  - Success Rate: 92%
- **COSTAR**
  - Elements: Context, Objective, Style, Tone, Audience, Response
  - Best For: Content creation, communication
  - Avoid When: Technical specifications
  - Success Rate: 94%
- **RACE**
  - Elements: Role, Action, Context, Execute
  - Best For: Urgent tasks, quick iterations
  - Avoid When: Detailed requirements
  - Success Rate: 88%
- **CIDI**
  - Elements: Context, Instructions, Details, Input
  - Best For: Process documentation, tutorials
  - Avoid When: Creative exploration
  - Success Rate: 90%
- **TIDD-EC**
  - Elements: Task, Instructions, Do's, Don'ts, Examples, Context
  - Best For: Quality-critical, compliance
  - Avoid When: Brainstorming
  - Success Rate: 93%
- **CRISPE**
  - Elements: Capacity, Insight, Statement, Personality, Experiment
  - Best For: Strategy, exploration
  - Avoid When: Routine tasks
  - Success Rate: 87%
- **CRAFT**
  - Elements: Context, Role, Action, Format, Target
  - Best For: Complex projects, planning
  - Avoid When: Simple queries
  - Success Rate: 91%
- **VIBE**
  - Elements: Vision, Inspiration, Behavior, Experience
  - Best For: Visual UI concepting, design
  - Avoid When: Precision/specification
  - Success Rate: 90%
- **VIBE-MP**
  - Elements: VIBE + MagicPath calibration
  - Best For: MagicPath.ai UI design
  - Avoid When: Non-MagicPath platforms
  - Success Rate: 92%
- **FRAME**
  - Elements: Focus, Rendering, Atmosphere, Modifiers, Exclusions
  - Best For: Image generation optimization
  - Avoid When: Precision/text prompts
  - Success Rate: 90%
- **MOTION**
  - Elements: Movement, Origin, Temporal, Intention, Orchestration, Nuance
  - Best For: Video generation
  - Avoid When: Static/image prompts
  - Success Rate: 90%

### Framework Selection Algorithm

```yaml
select_optimal_framework:
  description: "Enhanced framework selection with pattern recognition"
  input: [task_analysis]

  analyze_characteristics:
    complexity: {scale: 1_to_10}
    urgency: {boolean: true_false}
    audience_specific: {boolean: true_false}
    creative_element: {boolean: true_false}
    precision_critical: {boolean: true_false}
    compliance_needs: {boolean: true_false}

  score_frameworks:
    rcaf:
      base_score: 5
      modifiers:
        - if: "complexity <= 6" → add: 5
        - if: "not audience_specific" → add: 3

    costar:
      base_score: 3
      modifiers:
        - if: "audience_specific" → add: 7
        - if: "creative_element" → add: 5

    race:
      base_score: 2
      modifiers:
        - if: "urgency" → add: 8
        - if: "complexity <= 3" → add: 5
        - if: "precision_critical" → subtract: 5

    tidd_ec:
      base_score: 3
      modifiers:
        - if: "precision_critical" → add: 7
        - if: "compliance_needs" → add: 5

    vibe:
      base_score: 2
      modifiers:
        - if: "visual_ui_concepting" → add: 10
        - if: "precision_critical" → subtract: 10

    vibe_mp:
      base_score: 2
      modifiers:
        - if: "magicpath_detected" → add: 12
        - if: "multi_page_flow" → add: 5
        - if: "user_journey_design" → add: 3
        - if: "precision_critical" → subtract: 10

  select_best:
    method: highest_score
    output: [primary, confidence, alternative, reasoning]
```

### Framework Selection Decision Table

- **1-3**
  - Urgency: Yes
  - Audience: No
  - Creative: No
  - Precision: No
  - Recommended: **RACE**
- **1-6**
  - Urgency: No
  - Audience: No
  - Creative: No
  - Precision: No
  - Recommended: **RCAF**
- **Any**
  - Urgency: No
  - Audience: Yes
  - Creative: Yes
  - Precision: No
  - Recommended: **COSTAR**
- **6+**
  - Urgency: No
  - Audience: No
  - Creative: No
  - Precision: Yes
  - Recommended: **TIDD-EC**
- **7-10**
  - Urgency: No
  - Audience: Yes
  - Creative: No
  - Precision: Yes
  - Recommended: **CRAFT**
- **Visual UI**
  - Urgency: -
  - Audience: -
  - Creative: Yes
  - Precision: No
  - Recommended: **VIBE**
- **MagicPath**
  - Urgency: -
  - Audience: -
  - Creative: Yes
  - Precision: No
  - Recommended: **VIBE-MP**
- **Image gen**
  - Urgency: -
  - Audience: -
  - Creative: Yes
  - Precision: No
  - Recommended: **FRAME**
- **Video gen**
  - Urgency: -
  - Audience: -
  - Creative: Yes
  - Precision: No
  - Recommended: **MOTION**

### Design Directions (8 Total)

Used with VIBE/VIBE-MP frameworks for UI concepting:

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

---

## 3. FRAMEWORK DEEP DIVES

### RCAF Mastery Patterns

**Pattern 1: Layered RCAF** (Representative Example)
```yaml
layered_rcaf:
  role:
    primary: "[Main expertise]"
    secondary: "[Supporting skill]"
    domain: "[Specific knowledge area]"
  context:
    immediate: "[Current situation]"
    historical: "[Relevant background]"
    constraints: "[Limitations and boundaries]"
  action:
    primary: "[Main task]"
    method: "[How to accomplish]"
    outcome: "[Expected result]"
  format:
    structure: "[Organization pattern]"
    style: "[Tone and approach]"
    deliverables: "[Specific outputs]"
```

**RCAF Pattern Summary:**

- **Layered RCAF**
  - Key Feature: Multi-level context stacking
  - When to Use: Complex multi-audience prompts
- **RCAF + Metrics**
  - Key Feature: Embedded success criteria
  - When to Use: Measurable outcome prompts
- **Conditional RCAF**
  - Key Feature: If-then role variations
  - When to Use: Context-dependent responses

### COSTAR Enhancement Techniques

**Style-Tone Matrix:**

- **Formal + Empathetic**
  - Use For: Crisis communication
  - Balance: Authority with understanding
- **Technical + Enthusiastic**
  - Use For: Product launches
  - Balance: Expertise with excitement
- **Casual + Authoritative**
  - Use For: Educational content
  - Balance: Approachability with credibility
- **Creative + Professional**
  - Use For: Marketing materials
  - Balance: Innovation with reliability

### TIDD-EC Excellence: Cascading Examples

- **Basic**
  - Description: Simple case
  - Key Elements: Input → output with explanation
- **Intermediate**
  - Description: Typical case
  - Key Elements: Standard input → output
- **Advanced**
  - Description: Complex case
  - Key Elements: Complex input → output
- **Edge Case**
  - Description: Unusual scenario
  - Key Elements: Special handling considerations
- **Anti-Pattern**
  - Description: What to avoid
  - Key Elements: Why to avoid (explanation)

### FRAME Framework (Image Generation)

- **F**ocus
  - Focus: Subject & Composition
  - Core Question: "What is the viewer looking at?"
- **R**endering
  - Focus: Medium & Style
  - Core Question: "How should it be visualized?"
- **A**tmosphere
  - Focus: Lighting & Mood
  - Core Question: "What feeling does it evoke?"
- **M**odifiers
  - Focus: Technical Parameters
  - Core Question: "What constraints apply?"
- **E**xclusions
  - Focus: Negative Prompts
  - Core Question: "What should be avoided?"

**FRAME Structure:**
```yaml
frame_structure:
  focus:
    subject: "[Primary subject with descriptive adjectives]"
    composition: "[Shot type, framing, perspective]"
  rendering:
    medium: "[Photography, digital art, oil painting, etc.]"
    style: "[Art movement, aesthetic, technique]"
  atmosphere:
    lighting: "[Natural, studio, dramatic, etc.]"
    mood: "[Emotional quality of the scene]"
    color: "[Color palette, temperature]"
  modifiers:
    platform_specific: "[--ar, --s for MJ; weights for SD]"
  exclusions:
    negative: "[Elements to avoid]"
```

**FRAME Vocabulary Banks (30 Sub-Categories):**

- **F - Focus**
  - Sub-Categories: Shot Types, Camera Angles, Subject Hierarchy, Spatial Relationships, Composition Techniques, Subject Specificity
  - Examples: Extreme wide, eye-level, primary/secondary/background, rule of thirds
- **R - Rendering**
  - Sub-Categories: Photography Styles, Illustration Styles, 3D Rendering, Movement & Era Aesthetics, Anime Sub-Types, Fine Art
  - Examples: Editorial, cel-shaded, Pixar, cyberpunk, chibi, impressionist
- **A - Atmosphere**
  - Sub-Categories: Lighting (Kelvin), Mood Vocabulary, Color Temperature, Weather/Environmental, Time of Day, Lighting Techniques, Depth of Field
  - Examples: Golden hour (2700K), ethereal, warm earth palette, volumetric fog
- **M - Modifiers**
  - Sub-Categories: Aspect Ratios, Quality Markers, Emphasis Syntax, Reference Parameters, Camera Settings, Render Settings
  - Examples: 16:9, --sref, (element:1.4), f/1.4
- **E - Exclusions**
  - Sub-Categories: Negative Categories, Universal Foundation, Platform Handling, Positive Rephrasing, Style-Specific
  - Examples: Quality issues, anatomical flaws, DALL-E rephrasing

**See Prompt - Templates - Image Mode for complete sub-category details and examples.**

**Platform Modifiers:**

- **Midjourney**
  - Key Parameters: `--ar`, `--s`, `--chaos`, `--sref`, `--cref`, `--no`
  - Negatives: Partial (`--no`)
- **DALL-E 3**
  - Key Parameters: Size, Style (vivid/natural)
  - Negatives: No (rephrase positively)
- **Stable Diffusion**
  - Key Parameters: `(weight:1.5)`, CFG scale, steps
  - Negatives: Yes (dedicated field)
- **Flux**
  - Key Parameters: Guidance scale, HEX colors
  - Negatives: No (ignored)
- **Imagen 4**
  - Key Parameters: Aspect ratio, multi-reference
  - Negatives: No
- **Ideogram**
  - Key Parameters: Text rendering focus
  - Negatives: No
- **Leonardo**
  - Key Parameters: Style presets
  - Negatives: Yes
- **Seedream**
  - Key Parameters: Speed optimization
  - Negatives: No

### MOTION Framework (Video Generation)

- **M**ovement
  - Focus: Subject & Camera Motion
  - Core Question: "How does everything move?"
- **O**rigin
  - Focus: Starting Point/Reference
  - Core Question: "What is the visual anchor?"
- **T**emporal
  - Focus: Duration & Pacing
  - Core Question: "How does time flow?"
- **I**ntention
  - Focus: Narrative Purpose
  - Core Question: "What story is being told?"
- **O**rchestration
  - Focus: Scene Choreography
  - Core Question: "How do elements interact?"
- **N**uance
  - Focus: Subtle Details
  - Core Question: "What refinements are needed?"

**MOTION Structure:**
```yaml
motion_structure:
  movement:
    camera: "[Static, pan, tilt, dolly, crane, handheld, drone]"
    subject: "[Walking, running, floating, spinning, swaying]"
    direction: "[Left to right, ascending, approaching, retreating]"
  origin:
    reference_type: "[Text-to-video, image-to-video]"
    establishing: "[Opening shot description]"
  temporal:
    duration: "[5 sec, 10 sec - platform dependent]"
    pacing: "[Slow motion, real-time, time-lapse]"
  intention:
    narrative: "[What story or feeling to convey]"
    purpose: "[Commercial, artistic, documentary]"
  orchestration:
    choreography: "[How elements move together]"
    transitions: "[Cut, dissolve, continuous shot]"
  nuance:
    details: "[Atmospheric effects, subtle movements]"
    physics: "[Realistic, stylized, dream-like]"
```

**Critical Video Principles:**
1. Describe motion, not static scenes ("walks slowly" not "is walking")
2. No negative prompts (most video AI ignores them)
3. Shorter is better (5-10 seconds for consistency)
4. Camera movement first
5. Image-to-video: 20-40 words; Text-to-video: 50-80 words

**See Prompt - Templates - Video Mode for complete platform mental models, physics vocabulary, and audio integration guidance.**

**Platform Syntax (Top 5):**

- **Runway Gen-4/4.5**
  - Max Duration: 10 sec
  - Key Features: 6 camera movement types, Motion Brush
  - Audio: No
- **Sora**
  - Max Duration: 20 sec
  - Key Features: Natural language, physics simulation
  - Audio: No
- **Kling 2.5/2.6**
  - Max Duration: 5 min
  - Key Features: Motion brush, reversed pan/tilt terminology
  - Audio: Yes (2.6)
- **Veo 3.1+**
  - Max Duration: 148 sec
  - Key Features: Native audio, cinematography
  - Audio: Yes
- **Pika 2.5**
  - Max Duration: 10 sec
  - Key Features: Pikaswaps, lip sync
  - Audio: No

**Master Prompt Formula:**

| Mode      | Formula                                                                   |
| --------- | ------------------------------------------------------------------------- |
| **Image** | Subject → Setting → Lighting → Style → Camera → Technical                 |
| **Video** | Camera Movement → Subject → Action → Setting → Atmosphere → Style → Audio |

---

## 4. ADVANCED PATTERN COMBINATIONS

### Framework Fusion Patterns

**RCAF + CoT (Chain of Thought)**
```yaml
rcaf_cot_fusion:
  role: "[Expert] who thinks systematically"
  context: "[Situation requiring reasoning]"
  action:
    solve_by:
      step_1: {decompose: "[Break down]", reasoning: "[Why]"}
      step_2: {analyze: "[Examine]", reasoning: "[Approach]"}
      step_3: {synthesize: "[Combine]", reasoning: "[Logic]"}
      step_4: {validate: "[Verify]", reasoning: "[Criteria]"}
  format: "Show reasoning at each step with final answer highlighted"
```

**COSTAR + ReAct (Reasoning-Action)**
```yaml
costar_react_fusion:
  context: "[Initial situation]"
  objective: "[Goal requiring iteration]"
  style: "Analytical with visible reasoning"
  tone: "Professional problem-solver"
  audience: "[Stakeholders needing transparency]"
  response:
    cycle_format:
      thought: "[Current reasoning]"
      action: "[What to do]"
      observation: "[Result]"
    repeat_until: "[Success criteria met]"
    max_iterations: 5
```

**TIDD-EC + Few-Shot**
```yaml
tidd_ec_fewshot:
  task: "[Primary objective]"
  instructions: "Learn from examples then apply"
  dos: ["Follow patterns", "Maintain consistency", "Adapt to context"]
  donts: ["Deviate from patterns", "Ignore edge cases"]
  examples:
    case_1: {input: "[ex1]", output: "[out1]", explanation: "[pattern]"}
    case_2: {input: "[ex2]", output: "[out2]"}
    case_3: {input: "[ex3]", output: "[out3]"}
  context: "Apply learned patterns to new inputs"
```

### Framework Fusion Summary

- **RCAF + CoT**
  - Use Case: Systematic reasoning
  - Key Feature: Show reasoning at each step
- **COSTAR + ReAct**
  - Use Case: Iterative content
  - Key Feature: Thought-action-observation cycles
- **TIDD-EC + Few-Shot**
  - Use Case: Pattern learning
  - Key Feature: Learn from examples then apply
- **RACE + ToT**
  - Use Case: Quick decisions
  - Key Feature: Decision trees for speed
- **CRAFT + All**
  - Use Case: Maximum power
  - Key Feature: Comprehensive with all techniques

---

## 5. FRAMEWORK OPTIMIZATION STRATEGIES

### Token Optimization

```yaml
optimize_framework_tokens:
  strategies:
    rcaf_optimization:
      role: {method: extract_key_expertise, remove: redundant_qualifiers}
      context: {method: filter_essential_only, remove: non_critical_details}
      action: {method: single_clear_verb, remove: multiple_actions}
      format: {method: structure_only, remove: style_descriptions}
    costar_optimization:
      merge_overlapping: {combine: [style, tone], into: style_tone}
      audience: {limit: 3_essential_characteristics}
      response: {remove: redundant_specifications}
    race_optimization:
      ultra_minimal: true
      single_line_per_element: true
      max_tokens_per_element: 10
```

**Efficiency Switching Rules:**

- **token_count > threshold AND complexity < 4**
  - Switch: CRAFT → RCAF
  - Savings: 15-20%
- **token_count > threshold AND complexity < 2**
  - Switch: RCAF → RACE
  - Savings: 5-10%
- **token_count > threshold AND precision not critical**
  - Switch: TIDD-EC → RCAF
  - Savings: 12-15%
