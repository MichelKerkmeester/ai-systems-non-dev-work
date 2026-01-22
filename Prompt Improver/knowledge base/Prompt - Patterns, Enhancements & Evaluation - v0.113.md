# Prompt - Patterns, Enhancements & Evaluation - v0.113

Comprehensive framework library, enhancement patterns, and CLEAR evaluation methodology for systematic prompt engineering excellence.

**Loading Condition:** TRIGGER
**Purpose:** Provides the complete knowledge base for prompt engineering excellence through framework selection, systematic enhancement patterns, and CLEAR evaluation methodology.
**Scope:** Framework library (RCAF, COSTAR, RACE, CIDI, TIDD-EC, CRISPE, CRAFT, VIBE, FRAME, MOTION) with selection algorithms, enhancement patterns, CLEAR/EVOKE/VISUAL scoring methodologies, recovery protocols, and mastery principles.

---

## 📋 TABLE OF CONTENTS

### PART 1: FRAMEWORKS & PATTERNS
1. [🎯 FRAMEWORK LIBRARY & SELECTION](#1--framework-library--selection)
2. [🔧 FRAMEWORK DEEP DIVES](#2--framework-deep-dives)
3. [🧠 ADVANCED PATTERN COMBINATIONS](#3--advanced-pattern-combinations)
4. [🎨 FRAMEWORK OPTIMIZATION STRATEGIES](#4--framework-optimization-strategies)

### PART 2: ENHANCEMENT PATTERNS
5. [🚀 SYSTEMATIC ENHANCEMENT METHODOLOGY](#5--systematic-enhancement-methodology)
6. [🔄 PATTERN-BASED REFINEMENTS](#6--pattern-based-refinements)
7. [💎 EXCELLENCE PATTERNS](#7--excellence-patterns)
8. [🛠️ RECOVERY & REPAIR PROTOCOLS](#8-️-recovery--repair-protocols)

### PART 3: EVALUATION & SCORING
9. [✅ CLEAR EVALUATION MASTERY](#9--clear-evaluation-mastery)
10. [🖼️ VISUAL SCORING FOR IMAGE & VIDEO](#10-️-visual-scoring-for-image--video)
11. [📈 ADVANCED SCORING TECHNIQUES](#11--advanced-scoring-techniques)
12. [🔍 WEAKNESS DETECTION & ANALYSIS](#12--weakness-detection--analysis)

### PART 4: PRACTICAL IMPLEMENTATION
13. [📊 USE CASE TEMPLATES](#13--use-case-templates)
14. [🎓 MASTERY PRINCIPLES](#14--mastery-principles)
15. [🏎️ QUICK REFERENCE CARD](#15-️-quick-reference-card)

---

## PART 1: FRAMEWORKS & PATTERNS

### 1. 🎯 FRAMEWORK LIBRARY & SELECTION

#### Complete Framework Matrix

| Framework | Elements | Best For | Avoid When | Success Rate |
|-----------|----------|----------|------------|--------------|
| **RCAF** | Role, Context, Action, Format | 80% of prompts, general tasks | Over-complex scenarios | 92% |
| **COSTAR** | Context, Objective, Style, Tone, Audience, Response | Content creation, communication | Technical specifications | 94% |
| **RACE** | Role, Action, Context, Execute | Urgent tasks, quick iterations | Detailed requirements | 88% |
| **CIDI** | Context, Instructions, Details, Input | Process documentation, tutorials | Creative exploration | 90% |
| **TIDD-EC** | Task, Instructions, Do's, Don'ts, Examples, Context | Quality-critical, compliance | Brainstorming | 93% |
| **CRISPE** | Capacity, Insight, Statement, Personality, Experiment | Strategy, exploration | Routine tasks | 87% |
| **CRAFT** | Context, Role, Action, Format, Target | Complex projects, planning | Simple queries | 91% |
| **VIBE** | Vision, Inspiration, Behavior, Experience | Visual UI concepting, design | Precision/specification | 90% |
| **FRAME** | Focus, Rendering, Atmosphere, Modifiers, Exclusions | Image generation optimization | Precision/text prompts | 90% |
| **MOTION** | Movement, Origin, Temporal, Intention, Orchestration, Nuance | Video generation | Static/image prompts | 90% |

#### Framework Selection Algorithm

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

  select_best:
    method: highest_score
    output: [primary, confidence, alternative, reasoning]
```

#### Framework Selection Decision Table

| Complexity | Urgency | Audience | Creative | Precision | Recommended |
|------------|---------|----------|----------|-----------|-------------|
| 1-3 | Yes | No | No | No | **RACE** |
| 1-6 | No | No | No | No | **RCAF** |
| Any | No | Yes | Yes | No | **COSTAR** |
| 6+ | No | No | No | Yes | **TIDD-EC** |
| 7-10 | No | Yes | No | Yes | **CRAFT** |
| Visual UI | - | - | Yes | No | **VIBE** |
| Image gen | - | - | Yes | No | **FRAME** |
| Video gen | - | - | Yes | No | **MOTION** |

---

### 2. 🔧 FRAMEWORK DEEP DIVES

#### RCAF Mastery Patterns

**Pattern 1: Layered RCAF**
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

**Pattern 2: RCAF with Embedded Metrics**
```yaml
metric_rcaf:
  role: "[Expert] measured by [KPI]"
  context: "[Situation] with success defined as [metric]"
  action: "[Task] achieving minimum [threshold]"
  format: "[Output] demonstrating [measurable quality]"
```

**Pattern 3: Conditional RCAF**
```yaml
conditional_rcaf:
  role: "[Expert who adapts based on conditions]"
  context:
    if_condition_a: "[context variant A]"
    else: "[context variant B]"
  action:
    when_trigger: "[action variant A]"
    otherwise: "[action variant B]"
  format: "Adapt output based on [criteria]"
```

#### COSTAR Enhancement Techniques

**Audience Layering:**
```yaml
audience_layers:
  primary:
    profile: "[Main reader detailed description]"
    concerns: "[Primary interests]"
    knowledge: "[Technical level]"
  secondary:
    stakeholders: "[Other involved parties]"
    influence: "[Decision power]"
  adaptation:
    content: "Tailor to primary while acknowledging secondary"
    tone: "Balance formality levels"
```

**Style-Tone Matrix:**

| Combination | Use For | Balance |
|-------------|---------|---------|
| Formal + Empathetic | Crisis communication | Authority with understanding |
| Technical + Enthusiastic | Product launches | Expertise with excitement |
| Casual + Authoritative | Educational content | Approachability with credibility |
| Creative + Professional | Marketing materials | Innovation with reliability |

#### TIDD-EC Excellence: Cascading Examples

```yaml
cascading_examples:
  basic:
    description: "Simple case"
    input: "[basic input]"
    output: "[basic output]"
    explanation: "[why this works]"
  intermediate:
    description: "Typical case"
    input: "[standard input]"
    output: "[standard output]"
  advanced:
    description: "Complex case"
    input: "[complex input]"
    output: "[complex output]"
  edge_case:
    description: "Unusual scenario"
    handling: "[special considerations]"
  anti_pattern:
    description: "What not to do"
    explanation: "[why to avoid]"
```

#### FRAME Framework (Image Generation)

| Element | Focus | Core Question |
|---------|-------|---------------|
| **F**ocus | Subject & Composition | "What is the viewer looking at?" |
| **R**endering | Medium & Style | "How should it be visualized?" |
| **A**tmosphere | Lighting & Mood | "What feeling does it evoke?" |
| **M**odifiers | Technical Parameters | "What constraints apply?" |
| **E**xclusions | Negative Prompts | "What should be avoided?" |

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

**FRAME Vocabulary Banks:**

| Category | Terms |
|----------|-------|
| **Shot Types** | Extreme wide, wide, medium, close-up, extreme close-up, macro, portrait |
| **Camera Angles** | Eye-level, low angle, high angle, bird's eye, Dutch angle |
| **Lighting** | Golden hour, Rembrandt, butterfly, rim light, volumetric, god rays |
| **Styles** | Photorealistic, editorial, cinematic, anime, concept art, minimalist |
| **Mood** | Serene, melancholic, energetic, mysterious, ethereal, dramatic |

**Platform Modifiers:**

| Platform | Key Parameters |
|----------|----------------|
| **Midjourney** | `--ar`, `--s`, `--chaos`, `--q`, `--style raw`, `--sref` |
| **DALL-E 3** | Size (1024x1024, 1792x1024), Style (vivid/natural) |
| **Stable Diffusion** | `(weight:1.5)`, negative prompts, CFG scale |
| **Flux** | Guidance scale, aspect ratio (no negatives) |

#### MOTION Framework (Video Generation)

| Element | Focus | Core Question |
|---------|-------|---------------|
| **M**ovement | Subject & Camera Motion | "How does everything move?" |
| **O**rigin | Starting Point/Reference | "What is the visual anchor?" |
| **T**emporal | Duration & Pacing | "How does time flow?" |
| **I**ntention | Narrative Purpose | "What story is being told?" |
| **O**rchestration | Scene Choreography | "How do elements interact?" |
| **N**uance | Subtle Details | "What refinements are needed?" |

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

**Platform Syntax:**

| Platform | Max Duration | Key Features |
|----------|--------------|--------------|
| **Runway Gen-3/4** | 10 sec | 6 camera movement types |
| **Sora** | 60 sec | Natural language, no negatives |
| **Kling 2.5** | 5 min | Motion brush, point-to-point |
| **Luma Ray3** | 10 sec | Start/end keyframes |
| **Veo 3** | 60 sec | Native audio cues |

---

### 3. 🧠 ADVANCED PATTERN COMBINATIONS

#### Framework Fusion Patterns

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
      iteration:
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
    case_2: {input: "[ex2]", output: "[out2]", explanation: "[reinforce]"}
    case_3: {input: "[ex3]", output: "[out3]", explanation: "[variation]"}
  context: "Apply learned patterns to new inputs"
```

#### Framework Fusion Summary

| Combination | Use Case | Key Feature |
|-------------|----------|-------------|
| **RCAF + CoT** | Systematic reasoning | Show reasoning at each step |
| **COSTAR + ReAct** | Iterative content | Thought-action-observation cycles |
| **TIDD-EC + Few-Shot** | Pattern learning | Learn from examples then apply |
| **RACE + ToT** | Quick decisions | Decision trees for speed |
| **CRAFT + All** | Maximum power | Comprehensive with all techniques |

---

### 4. 🎨 FRAMEWORK OPTIMIZATION STRATEGIES

#### Token Optimization

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

| Condition | Switch | Savings |
|-----------|--------|---------|
| token_count > threshold AND complexity < 4 | CRAFT → RCAF | 15-20% |
| token_count > threshold AND complexity < 2 | RCAF → RACE | 5-10% |
| token_count > threshold AND precision not critical | TIDD-EC → RCAF | 12-15% |

---

## PART 2: ENHANCEMENT PATTERNS

### 5. 🚀 SYSTEMATIC ENHANCEMENT METHODOLOGY

#### Enhancement Pipeline

```yaml
enhancement_pipeline:
  stages:
    structural_enhancement:
      description: "Improve organization and framework"
      process:
        apply_framework: {check: has_framework, if_missing: apply_best}
        reorganize_elements: {check: organization_quality, if_poor: reorganize}

    clarity_enhancement:
      description: "Improve expression and understanding"
      process:
        simplify_complex: {find: complex_sentences, action: simplify}
        remove_ambiguity: {find: ambiguous_terms, action: clarify}

    precision_enhancement:
      description: "Improve accuracy and specificity"
      process:
        add_measurability: {check: has_metrics, if_missing: add_success_metrics}
        specify_constraints: {check: has_constraints, if_missing: add_constraints}

    efficiency_enhancement:
      description: "Optimize token usage"
      process:
        remove_redundancy: {find: redundant_elements, action: consolidate}
        compress_verbose: {find: verbose_sections, action: compress}

    reusability_enhancement:
      description: "Make prompt template-ready"
      process:
        extract_parameters: {find: specific_values, action: convert_to_placeholders}
        add_flexibility: {find: rigid_structures, action: add_conditional_logic}
```

---

### 6. 🔄 PATTERN-BASED REFINEMENTS

#### Vague to Specific Transformation

```yaml
vague_to_specific:
  detection:
    triggers:
      - vague_verbs: ["help", "assist", "handle", "deal with"]
      - vague_nouns: ["things", "stuff", "data", "information"]
      - missing_metrics: no_measurable_outcomes
      - missing_scope: no_boundaries_defined

  transformation:
    add_role: "Help analyze" → "Data analyst specializing in [domain]"
    specify_context: "customer data" → "[Platform] data, [Time period], [N] records"
    define_action: "analyze and provide insights" → "Identify [X] patterns, segment by [criteria]"
    clarify_format: "provide results" → "[Format type] with [specific sections]"

  impact:
    clear_score_gain: "+15 to +20"
    primary_dimension: "Expression and Logic"
```

#### Assumption Elimination

```yaml
assumption_elimination:
  detection:
    implicit_references:
      - "our system"      # What system?
      - "the usual format" # What format?
      - "standard approach" # What standard?
      - "as discussed"     # When discussed?

  replacement_map:
    our_system: "[Specific tech stack description]"
    usual_format: "[Exact format specification]"
    standard_approach: "[Specific methodology]"
    as_discussed: "[Reference or full context]"

  impact:
    clear_score_gain: "+3 to +5"
    primary_dimension: "Correctness"
```

#### Scope Boundary Definition

```yaml
scope_boundaries:
  additions:
    included:
      prefix: "This includes:"
      items: "[Explicit list of what's in scope]"
    excluded:
      prefix: "This excludes:"
      items: "[Explicit list of what's out of scope]"
    edge_cases:
      prefix: "Edge cases:"
      handling: "[How to handle boundary scenarios]"

  impact:
    clear_score_gain: "+4 to +6"
    primary_dimension: "Logic/Coverage"
```

---

### 7. 💎 EXCELLENCE PATTERNS

#### Complete Context Layering (45+ CLEAR)

```yaml
complete_context_layering:
  layers:
    environmental:
      description: "Where/when this happens"
      elements: [location, timing, platform, environment]
    historical:
      description: "What led to this"
      elements: [background, previous_attempts, lessons_learned]
    constraints:
      description: "Limitations"
      elements: [technical, resource, time, regulatory]
    resources:
      description: "Available assets"
      elements: [tools, data, team, budget]
    dependencies:
      description: "What this relies on"
      elements: [upstream, downstream, external, internal]
    stakeholders:
      description: "Who's involved"
      elements: [users, approvers, implementers, affected_parties]

  implementation:
    for_each_layer: assess_relevance
    if_relevant: add_to_context
    organize: hierarchical_structure
```

#### Multi-Level Success Criteria

```yaml
multi_level_success:
  levels:
    minimum_viable:
      description: "Baseline acceptability"
      threshold: "[Specific minimum requirements]"
      measurement: "[How to measure]"
    target:
      description: "Expected outcome"
      threshold: "[Standard success level]"
      measurement: "[Metrics and KPIs]"
    excellence:
      description: "Exceptional result"
      threshold: "[Stretch goals]"
      measurement: "[Advanced metrics]"

  timeline:
    immediate: "[Quick wins]"
    short_term: "[30-day goals]"
    long_term: "[90+ day goals]"
```

---

### 8. 🛠️ RECOVERY & REPAIR PROTOCOLS

#### REPAIR Framework

```yaml
repair_framework:
  recognize:
    description: "Identify all issues"
    issue_categories:
      critical: []  # Must fix
      major: []     # Should fix
      minor: []     # Nice to fix
      style: []     # Optional
    process: "Load error patterns, match against prompt, categorize"

  explain:
    description: "Explain impact with examples"
    for_each_issue:
      - what: issue_description
      - why_matters: impact_explanation
      - example_failure: failure_scenario
      - fix_preview: solution_preview

  propose:
    description: "Generate fix proposals"
    for_each_issue:
      - solutions: generate_solution_options
      - effort: estimate_effort_required
      - impact: estimate_improvement_gain
      - priority: calculate_priority_score
    sort_by: priority_descending

  apply:
    description: "Apply fixes based on strategy"
    strategies:
      minimal: {filter: "priority > 8", description: "Critical fixes only"}
      balanced: {filter: "impact/effort > 2", description: "Best ROI fixes"}
      comprehensive: {filter: "priority > 3", description: "All meaningful fixes"}
      critical_only: {filter: "severity == critical", description: "Must-fix only"}

  iterate:
    description: "Iterate until quality target met"
    configuration:
      max_iterations: 5
      target_clear_score: target_score
    process: "while iterations < max AND score < target: calculate → recognize → propose → apply"

  record:
    description: "Record for pattern learning"
    learning_record:
      - original_prompt
      - final_prompt
      - improvement_delta
      - successful_patterns
      - iterations_needed
```

---

## PART 3: EVALUATION & SCORING

### 9. ✅ CLEAR EVALUATION MASTERY

> **Note:** For Visual UI Concepting (`$visual`, `$vibe`), use **EVOKE scoring**. For Image/Video (`$image`, `$video`), use **VISUAL scoring**.

#### CLEAR Dimensions (50 points)

| Dimension | Points | Weight | Assessment Criteria |
|-----------|--------|--------|---------------------|
| **C**orrectness | 10 | 20% | Accuracy, no contradictions, valid assumptions |
| **L**ogic | 10 | 20% | Reasoning flow, cause-effect, conditional handling |
| **E**xpression | 15 | 30% | Clarity, specificity, minimal ambiguity |
| **A**rrangement | 10 | 20% | Structure, organization, logical flow |
| **R**eusability | 5 | 10% | Adaptability, parameterization, flexibility |

#### Context-Aware Scoring

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
      correctness: 0.30  # Precision critical
      expression: 0.20   # Less important

    creative_writing:
      expression: 0.35   # Clarity paramount
      correctness: 0.15  # Less critical

    template_creation:
      reuse: 0.25        # Reusability focus
      logic: 0.15        # Reduced weight
```

#### Dimension Interdependencies

| Relationship | Correlation | Notes |
|--------------|-------------|-------|
| Expression ↔ Arrangement | 0.7 | Clear language needs good structure |
| Logic ↔ Correctness | 0.8 | Complete coverage ensures accuracy |
| Arrangement ↔ Reuse | 0.6 | Good structure enables templates |
| Expression ↔ Correctness | 0.5 | Clarity prevents misinterpretation |

#### CLEAR vs EVOKE vs VISUAL

| Criteria | CLEAR | EVOKE | VISUAL |
|----------|-------|-------|--------|
| **Use When** | Precision prompts | Visual UI concepting | Image/video generation |
| **Modes** | $improve, $refine | $visual, $vibe | $image, $video |
| **Philosophy** | Completeness & logic | Evocativeness | Specificity & atmosphere |
| **Total Points** | 50 | 50 | 60 (image) / 70 (video) |
| **Threshold** | 40+ | 40+ | 48+ / 56+ |

---

### 10. 🖼️ VISUAL SCORING FOR IMAGE & VIDEO

#### VISUAL - Image Mode (60 points)

| Dimension | Points | Threshold | Criteria |
|-----------|--------|-----------|----------|
| **V**ivid | 15 | 12+ | Clear mental imagery, specific details |
| **I**ntentional | 10 | 8+ | Clear purpose, defined composition |
| **S**tyled | 10 | 8+ | Defined aesthetic, consistent references |
| **U**nambiguous | 10 | 8+ | No conflicts, single interpretation |
| **A**tmospheric | 10 | 8+ | Lighting, mood, color defined |
| **L**ayered | 5 | 4+ | Depth, foreground/background |
| **Total** | **60** | **48+** | Quality threshold |

#### VISUAL - Video Mode (70 points)

Adds: **M**otion (10 points, 8+ threshold) - Camera and subject motion described

#### VISUAL Scoring Algorithm

```yaml
calculate_visual_score:
  input: [prompt, mode]  # mode: "image" or "video"

  dimensions:
    vivid: {weight: 15, checks: [specific_subject, concrete_details, sensory_elements]}
    intentional: {weight: 10, checks: [defined_composition, clear_hierarchy, purpose_evident]}
    styled: {weight: 10, checks: [art_style_defined, consistent_aesthetic, technique_mentioned]}
    unambiguous: {weight: 10, checks: [no_conflicting_styles, single_interpretation, consistent_mood]}
    atmospheric: {weight: 10, checks: [lighting_defined, mood_conveyed, color_palette_implied]}
    layered: {weight: 5, checks: [foreground_background, depth_of_field, spatial_relationships]}
    motion: {weight: 10, video_only: true, checks: [camera_movement, subject_motion, temporal_pacing]}

  process:
    - determine_mode
    - score_each_dimension: [0-max_weight]
    - calculate_total
    - apply_threshold: 48 (image) or 56 (video)
```

#### Common VISUAL Fixes

| Issue | Impact | Fix |
|-------|--------|-----|
| Vague subject | -5 Vivid | Specific subject with details |
| No composition | -4 Intentional | Shot type + framing |
| Missing style | -4 Styled | Art style or medium |
| Conflicting terms | -5 Unambiguous | Choose dominant style |
| No lighting | -4 Atmospheric | Lighting direction + quality |
| No motion (video) | -6 Motion | Camera movement + action verbs |

---

### 11. 📈 ADVANCED SCORING TECHNIQUES

#### Multi-Pass Scoring

```yaml
multi_pass_scoring:
  pass_1_surface:
    name: "Surface Evaluation"
    checks: [framework_presence, basic_completeness, obvious_issues]
    depth: shallow
    weight: 0.25

  pass_2_deep:
    name: "Deep Analysis"
    checks: [ambiguity_detection, hidden_assumptions, edge_case_coverage]
    depth: thorough
    weight: 0.40

  pass_3_interaction:
    name: "Interaction Testing"
    checks: [ai_interpretation, failure_modes, output_predictability]
    depth: comprehensive
    weight: 0.35

  aggregation: weighted_average
```

#### Comparative Scoring

```yaml
comparative_scoring:
  input: [prompt_versions]
  process:
    for_each_version:
      - calculate_clear_score
      - identify_strengths
      - identify_weaknesses
      - calculate_improvement_potential
  analysis:
    find_best: max_by_total_score
    extract_patterns: success_factors
    generate_path: optimization_sequence
```

---

### 12. 🔍 WEAKNESS DETECTION & ANALYSIS

```yaml
detect_prompt_weaknesses:
  weakness_detectors:
    vagueness:
      checks:
        - word_list: ["help", "assist", "some", "various"]
        - unmeasurable_outcomes: no_metrics
        - missing_specifics: lacks_detail

    incompleteness:
      checks:
        - missing_framework_elements
        - undefined_terms
        - assumed_knowledge

    ambiguity:
      checks:
        - multiple_interpretations
        - pronoun_clarity
        - modifier_attachment

    structure:
      checks:
        - logical_flow
        - element_organization
        - hierarchy_clarity

    efficiency:
      checks:
        - redundancy
        - token_waste
        - unnecessary_complexity

  output:
    weaknesses: categorized_issues
    severity: calculated_severity
    priority_fixes: prioritized_list
    estimated_improvement: potential_clear_gain
```

---

## PART 4: PRACTICAL IMPLEMENTATION

### 13. 📊 USE CASE TEMPLATES

#### Software Development

```yaml
api_documentation_template:
  framework: TIDD-EC
  task: "Document REST API endpoint for [resource]"
  instructions:
    - "Define endpoint (method, path, version)"
    - "List all parameters with types"
    - "Show request/response examples"
    - "Document error codes"
  dos: ["Consistent formatting", "Include curl examples", "Specify auth"]
  donts: ["Expose internal logic", "Skip error docs"]
  examples: "[Include 3 real examples]"
  context: "[API version, tech stack, audience]"

code_review_template:
  framework: "RCAF + CoT"
  role: "Senior developer reviewing code for production readiness"
  context: "[Language], [Framework], [Project standards]"
  action:
    review_thinking:
      - "Functionality: Does it work as intended?"
      - "Performance: Are there bottlenecks?"
      - "Security: Any vulnerabilities?"
      - "Maintainability: Is it readable?"
      - "Testing: Adequate coverage?"
  format: "Structured feedback with severity levels"
```

#### Data Analysis

```yaml
exploratory_data_analysis:
  framework: COSTAR
  context: "Dataset with [N] records, [M] features, [quality issues]"
  objective: "Understand data patterns and prepare for modeling"
  style: "Technical but accessible to stakeholders"
  tone: "Objective and data-driven"
  audience: "Data team and business analysts"
  response:
    format: "Jupyter notebook"
    sections:
      - "Data quality report"
      - "Statistical summaries"
      - "Visualization gallery"
      - "Next steps recommendations"

ab_test_analysis:
  framework: CRAFT
  context:
    test: "[Control vs variant description]"
    duration: "[Time period]"
    sample_size: "[N per group]"
  role: "Statistical analyst with experimentation expertise"
  action: ["Validate setup", "Check power", "Analyze results", "Segment", "Conclude"]
  format: ["Executive summary (1 page)", "Statistical details", "Recommendations"]
  target: ["95% confidence", "Clear go/no-go decision"]
```

---

### 14. 🎓 MASTERY PRINCIPLES

#### Ten Commandments of Prompt Excellence

```yaml
prompt_excellence_commandments:
  1_start_simple:
    principle: "Start Simple, Enhance Gradually"
    guidelines: ["Begin with RACE/RCAF", "Add complexity only when needed", "Stop when good enough"]

  2_clarity_first:
    principle: "Clarity Trumps Completeness"
    guidelines: ["Better clear about less", "Than comprehensive but confusing", "Expression = 30% of CLEAR"]

  3_right_tool:
    principle: "Framework Fit Over Fancy"
    guidelines: ["Right tool for job", "Not most sophisticated", "RCAF works for 80%"]

  4_measure_everything:
    principle: "Measure, Don't Guess"
    guidelines: ["CLEAR score everything", "Track improvements", "Learn from patterns"]

  5_show_dont_tell:
    principle: "Examples Beat Explanations"
    guidelines: ["One example > paragraph", "Show good and bad", "Include edge cases"]

  6_constraints_liberate:
    principle: "Constraints Liberate Creativity"
    guidelines: ["Define boundaries", "Include what's NOT wanted", "Specify limits"]

  7_token_economy:
    principle: "Token Economy Matters"
    guidelines: ["Every token has cost", "Balance detail/efficiency", "Optimize high-frequency"]

  8_test_pessimistic:
    principle: "Test with Pessimism"
    guidelines: ["Assume misinterpretation", "Check edge cases", "Verify with variations"]

  9_iterate_output:
    principle: "Iterate Based on Output"
    guidelines: ["Start with v1", "Refine based on results", "Stop at diminishing returns"]

  10_document_reuse:
    principle: "Document for Reuse"
    guidelines: ["Build templates not one-offs", "Extract patterns", "Share knowledge"]
```

#### Excellence Formula

```yaml
excellence_formula:
  equation: |
    Prompt Excellence =
      (Right Framework × Clear Requirements)
      × (Complete Coverage × Good Structure)
      × (Concise Expression)
      × (1 + Reasoning Pattern Bonus)
      × (1 - Token Overhead Penalty)
      + DEPTH Processing Bonus

  targets:
    minimum: "CLEAR ≥ 40/50"
    excellence: "CLEAR ≥ 45/50"

  variables:
    framework_fit: [0.8, 1.0]
    requirement_clarity: [0.7, 1.0]
    coverage: [0.6, 1.0]
    structure_quality: [0.7, 1.0]
    expression: [0.8, 1.0]
    reasoning_bonus: [0, 0.2]
    token_penalty: [0, 0.2]
    depth_bonus: 5  # points
```

---

### 15. 🏎️ QUICK REFERENCE CARD

#### Framework Quick Select

| Complexity/Need | Framework |
|-----------------|-----------|
| 1-3, speed | RACE |
| 1-4, balance | RCAF |
| 3-6, audience | COSTAR |
| 4-6, instructions | CIDI |
| 5-7, creative | CRISPE |
| 6-8, precision | TIDD-EC |
| 7-10, comprehensive | CRAFT |
| Visual UI | VIBE |
| Image generation | FRAME |
| Video generation | MOTION |

#### Enhancement Priority

| Score | Action |
|-------|--------|
| < 25 | Complete rewrite (RCAF) |
| 25-30 | Framework switch |
| 30-35 | Fix 2 weakest dimensions |
| 35-40 | Polish weakest dimension |
| 40-45 | Optional refinements |
| 45+ | Ship it! |

#### Common Fixes

| Problem | Solution |
|---------|----------|
| Vague | Add specifics (Role, Context) |
| No structure | Apply RCAF |
| Too complex | Switch to RACE |
| Missing metrics | Add success criteria |
| Poor expression | Simplify language |
| Not reusable | Extract parameters |
| Visual UI | Switch to VIBE |

#### Power Combinations

| Combination | Use Case |
|-------------|----------|
| RCAF + CoT | Systematic thinking |
| COSTAR + ReAct | Iterative content |
| TIDD-EC + Few-Shot | Learning from examples |
| RACE + ToT | Quick decisions |
| CRAFT + All | Maximum power |

#### Unified Severity Scale

| Range | Quality | Action | Urgency |
|-------|---------|--------|---------|
| 80%+ | Excellent | Ready for use | None |
| 70-79% | Good | Minor refinements | Low |
| 60-69% | Adequate | Targeted improvements | Medium |
| <60% | Weak | Significant enhancement | High |

*Applies to CLEAR (50pt), EVOKE (50pt), VISUAL Image (60pt), VISUAL Video (70pt)*

---

*This Patterns, Enhancements & Evaluation framework establishes the comprehensive knowledge base for prompt engineering excellence. It provides the complete framework library, systematic enhancement patterns, CLEAR/EVOKE/VISUAL evaluation methodologies, recovery protocols, and practical implementation templates.*
