---
title: "Patterns and Evaluation"
description: "Enhancement patterns and CLEAR, EVOKE and VISUAL evaluation methods; the framework library lives in assets/framework_pattern_library.md."
version: "0.210"
contextType: reference
importance_tier: high
trigger_phrases:
  - "framework selection"
  - "CLEAR EVOKE VISUAL scoring"
  - "prompt evaluation"
  - "REPAIR protocol"
  - "enhancement patterns"
---

# Prompt - Reference - Patterns & Evaluation - v0.210

Enhancement patterns and CLEAR evaluation methodology for systematic prompt engineering excellence.

---

## 1. OVERVIEW

### Purpose

Provides the evaluation and enhancement reference set: systematic enhancement patterns and the CLEAR, EVOKE and VISUAL evaluation methodology.

### When to Use

- **Loading Condition:** TRIGGER. Loaded when enhancement patterns or scoring methodology are needed.
- Enhancement patterns, CLEAR/EVOKE/VISUAL scoring, recovery protocols, and mastery principles.
- The framework library and selection algorithms live in `assets/framework_pattern_library.md`.

---

## 2. FRAMEWORK PATTERN LIBRARY

Framework matrix, deep dives, combinations and optimization strategies: see [framework_pattern_library](../assets/framework_pattern_library.md).

---

## 3. SYSTEMATIC ENHANCEMENT METHODOLOGY

### Enhancement Pipeline

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

## 4. PATTERN-BASED REFINEMENTS

### Vague to Specific Transformation

- **Vague verbs: help, assist, handle**
  - Transformation: Add specific role
  - Example: "Help analyze" → "Data analyst specializing in [domain]"
- **Vague nouns: things, stuff, data**
  - Transformation: Specify context
  - Example: "customer data" → "[Platform] data, [Time period], [N] records"
- **Missing metrics**
  - Transformation: Define action
  - Example: "analyze" → "Identify [X] patterns, segment by [criteria]"
- **Missing scope**
  - Transformation: Clarify format
  - Example: "provide results" → "[Format type] with [specific sections]"

**Impact:** CLEAR +15 to +20 | Primary: Expression and Logic

### Assumption Elimination

| Implicit Reference  | Replacement                       |
| ------------------- | --------------------------------- |
| "our system"        | [Specific tech stack description] |
| "the usual format"  | [Exact format specification]      |
| "standard approach" | [Specific methodology]            |
| "as discussed"      | [Reference or full context]       |

**Impact:** CLEAR +3 to +5 | Primary: Correctness

### Scope Boundary Definition

```yaml
scope_boundaries:
  included: {prefix: "This includes:", items: "[Explicit list of what's in scope]"}
  excluded: {prefix: "This excludes:", items: "[Explicit list of what's out of scope]"}
  edge_cases: {prefix: "Edge cases:", handling: "[How to handle boundary scenarios]"}
```

**Impact:** CLEAR +4 to +6 | Primary: Logic/Coverage

---

## 5. EXCELLENCE PATTERNS

### Complete Context Layering (45+ CLEAR)

- **Environmental**
  - Description: Where/when this happens
  - Elements: location, timing, platform, environment
- **Historical**
  - Description: What led to this
  - Elements: background, previous_attempts, lessons_learned
- **Constraints**
  - Description: Limitations
  - Elements: technical, resource, time, regulatory
- **Resources**
  - Description: Available assets
  - Elements: tools, data, team, budget
- **Dependencies**
  - Description: What this relies on
  - Elements: upstream, downstream, external, internal
- **Stakeholders**
  - Description: Who's involved
  - Elements: users, approvers, implementers, affected_parties

**Implementation:** For each layer → assess relevance → if relevant, add to context → organize hierarchically

### Multi-Level Success Criteria

- **Minimum Viable**
  - Description: Baseline acceptability
  - Threshold: [Specific minimum requirements]
  - Measurement: [How to measure]
- **Target**
  - Description: Expected outcome
  - Threshold: [Standard success level]
  - Measurement: [Metrics and KPIs]
- **Excellence**
  - Description: Exceptional result
  - Threshold: [Stretch goals]
  - Measurement: [Advanced metrics]

| Timeline   | Goals           |
| ---------- | --------------- |
| Immediate  | [Quick wins]    |
| Short-term | [30-day goals]  |
| Long-term  | [90+ day goals] |

---

## 6. RECOVERY & REPAIR PROTOCOLS

### REPAIR Framework

```yaml
repair_framework:
  recognize:
    description: "Identify all issues by category (critical, major, minor, style)"
    process: "Load error patterns, match against prompt, categorize"

  explain:
    description: "Explain impact with examples"
    for_each_issue: [what, why_matters, example_failure, fix_preview]

  propose:
    description: "Generate fix proposals"
    for_each_issue: [solutions, effort, impact, priority]
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
    config: {max_iterations: 5, target_clear_score: target_score}
    process: "while iterations < max AND score < target: calculate → recognize → propose → apply"

  record:
    description: "Record for pattern learning"
    learning_record: [original_prompt, final_prompt, improvement_delta, successful_patterns, iterations_needed]
```

---

## 7. ✅ CLEAR EVALUATION MASTERY

> **Note:** For Visual UI Concepting (`$vibe`, `$v`), use **EVOKE scoring**. For Image/Video (`$image`, `$video`), use **VISUAL scoring**.

### CLEAR Dimensions (50 points)

- **C**orrectness
  - Points: 10
  - Weight: 20%
  - Assessment Criteria: Accuracy, no contradictions, valid assumptions
- **L**ogic
  - Points: 10
  - Weight: 20%
  - Assessment Criteria: Reasoning flow, cause-effect, conditional handling
- **E**xpression
  - Points: 15
  - Weight: 30%
  - Assessment Criteria: Clarity, specificity, minimal ambiguity
- **A**rrangement
  - Points: 10
  - Weight: 20%
  - Assessment Criteria: Structure, organization, logical flow
- **R**eusability
  - Points: 5
  - Weight: 10%
  - Assessment Criteria: Adaptability, parameterization, flexibility

### Context-Aware Scoring

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

### Dimension Interdependencies

- **Expression ↔ Arrangement**
  - Correlation: 0.7
  - Notes: Clear language needs good structure
- **Logic ↔ Correctness**
  - Correlation: 0.8
  - Notes: Complete coverage ensures accuracy
- **Arrangement ↔ Reuse**
  - Correlation: 0.6
  - Notes: Good structure enables templates
- **Expression ↔ Correctness**
  - Correlation: 0.5
  - Notes: Clarity prevents misinterpretation

### CLEAR vs EVOKE vs VISUAL

- **Use When**
  - CLEAR: Precision prompts
  - EVOKE: Visual UI concepting
  - EVOKE-MP: MagicPath.ai UI
  - VISUAL: Image/video generation
- **Modes**
  - CLEAR: $improve, $refine
  - EVOKE: $vibe, $v
  - EVOKE-MP: $vibe + magicpath context
  - VISUAL: $image, $video
- **Philosophy**
  - CLEAR: Completeness & logic
  - EVOKE: Evocativeness
  - EVOKE-MP: Creative Director brief
  - VISUAL: Specificity & atmosphere
- **Total Points**
  - CLEAR: 50
  - EVOKE: 50
  - EVOKE-MP: 50
  - VISUAL: 60 (image) / 70 (video)
- **Threshold**
  - CLEAR: 40+
  - EVOKE: 40+
  - EVOKE-MP: 42+
  - VISUAL: 48+ / 56+

**Standard EVOKE Weights (50 points):**
- Evocative: 15pts - Creates vivid mental imagery
- Visual: 10pts - Paints a picture AI can render
- Open: 10pts - Leaves room for creativity
- Kinetic: 10pts - Suggests motion and life
- Emotional: 5pts - Conveys experiential goals

**EVOKE-MP Weight Calibration (MagicPath.ai):**
- Kinetic: 13pts (vs 10 standard) - Critical for pathfinding
- Visual: 12pts (vs 10 standard) - Higher spatial clarity
- Evocative: 12pts (vs 15 standard) - Clear directional language
- Open: 8pts (vs 10 standard) - More structured flows
- Emotional: 5pts (same)

---

## 8. VISUAL SCORING FOR IMAGE & VIDEO

### VISUAL - Image Mode (60 points)

- **V**ivid
  - Points: 15
  - Threshold: 12+
  - Criteria: Clear mental imagery, specific details
- **I**ntentional
  - Points: 10
  - Threshold: 8+
  - Criteria: Clear purpose, defined composition
- **S**tyled
  - Points: 10
  - Threshold: 8+
  - Criteria: Defined aesthetic, consistent references
- **U**nambiguous
  - Points: 10
  - Threshold: 8+
  - Criteria: No conflicts, single interpretation
- **A**tmospheric
  - Points: 10
  - Threshold: 8+
  - Criteria: Lighting, mood, color defined
- **L**ayered
  - Points: 5
  - Threshold: 4+
  - Criteria: Depth, foreground/background
- **Total**
  - Points: **60**
  - Threshold: **48+**
  - Criteria: Quality threshold

### VISUAL - Video Mode (70 points)

Adds: **M**otion (10 points, 8+ threshold) - Camera and subject motion described

### VISUAL Scoring Algorithm

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

### Common VISUAL Fixes

- **Vague subject**
  - Impact: -5 Vivid
  - Fix: Specific subject with details
- **No composition**
  - Impact: -4 Intentional
  - Fix: Shot type + framing
- **Missing style**
  - Impact: -4 Styled
  - Fix: Art style or medium
- **Conflicting terms**
  - Impact: -5 Unambiguous
  - Fix: Choose dominant style
- **No lighting**
  - Impact: -4 Atmospheric
  - Fix: Lighting direction + quality
- **No motion (video)**
  - Impact: -6 Motion
  - Fix: Camera movement + action verbs

---

## 9. ADVANCED SCORING TECHNIQUES

### Multi-Pass Scoring

- **1**
  - Name: Surface Evaluation
  - Checks: Framework presence, basic completeness, obvious issues
  - Depth: Shallow
  - Weight: 0.25
- **2**
  - Name: Deep Analysis
  - Checks: Ambiguity detection, hidden assumptions, edge case coverage
  - Depth: Thorough
  - Weight: 0.40
- **3**
  - Name: Interaction Testing
  - Checks: AI interpretation, failure modes, output predictability
  - Depth: Comprehensive
  - Weight: 0.35

**Aggregation:** Weighted average of pass scores

### Comparative Scoring

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

## 10. WEAKNESS DETECTION & ANALYSIS

```yaml
detect_prompt_weaknesses:
  weakness_detectors:
    vagueness:
      - word_list: ["help", "assist", "some", "various"]
      - unmeasurable_outcomes
      - missing_specifics

    incompleteness:
      - missing_framework_elements
      - undefined_terms
      - assumed_knowledge

    ambiguity:
      - multiple_interpretations
      - pronoun_clarity
      - modifier_attachment

    structure:
      - logical_flow
      - element_organization
      - hierarchy_clarity

    efficiency:
      - redundancy
      - token_waste
      - unnecessary_complexity

  output: [categorized_issues, severity_scores, priority_fixes, estimated_improvement]
```

---

## 11. USE CASE TEMPLATES

### Software Development

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

### Data Analysis

```yaml
exploratory_data_analysis:
  framework: COSTAR
  context: "Dataset: [N] records, [M] features, [quality issues]"
  objective: "Understand patterns, prepare for modeling"
  style: "Technical but stakeholder-accessible"
  audience: "Data team and business analysts"
  response: "Jupyter notebook with: data quality, stats, visualizations, recommendations"
```

---

## 12. MASTERY PRINCIPLES

### Ten Commandments of Prompt Excellence

- **1**
  - Principle: Start Simple, Enhance Gradually
  - Key Guidance: Begin RACE/RCAF → Add complexity only when needed → Stop when good enough
- **2**
  - Principle: Clarity Trumps Completeness
  - Key Guidance: Better clear about less than comprehensive but confusing → Expression = 30% of CLEAR
- **3**
  - Principle: Framework Fit Over Fancy
  - Key Guidance: Right tool for job, not most sophisticated → RCAF works for 80%
- **4**
  - Principle: Measure, Don't Guess
  - Key Guidance: CLEAR score everything → Track improvements → Learn from patterns
- **5**
  - Principle: Examples Beat Explanations
  - Key Guidance: One example > paragraph → Show good and bad → Include edge cases
- **6**
  - Principle: Constraints Liberate Creativity
  - Key Guidance: Define boundaries → Include what's NOT wanted → Specify limits
- **7**
  - Principle: Token Economy Matters
  - Key Guidance: Every token has cost → Balance detail/efficiency → Optimize high-frequency
- **8**
  - Principle: Test with Pessimism
  - Key Guidance: Assume misinterpretation → Check edge cases → Verify with variations
- **9**
  - Principle: Iterate Based on Output
  - Key Guidance: Start with v1 → Refine based on results → Stop at diminishing returns
- **10**
  - Principle: Document for Reuse
  - Key Guidance: Build templates not one-offs → Extract patterns → Share knowledge

### Excellence Formula

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

## 13. QUICK REFERENCE CARD

### Framework Quick Select

| Complexity/Need     | Framework |
| ------------------- | --------- |
| 1-3, speed          | RACE      |
| 1-4, balance        | RCAF      |
| 3-6, audience       | COSTAR    |
| 4-6, instructions   | CIDI      |
| 5-7, creative       | CRISPE    |
| 6-8, precision      | TIDD-EC   |
| 7-10, comprehensive | CRAFT     |
| Visual UI           | VIBE      |
| MagicPath.ai        | VIBE-MP   |
| Image generation    | FRAME     |
| Video generation    | MOTION    |

### Enhancement Priority

| Score | Action                   |
| ----- | ------------------------ |
| < 25  | Complete rewrite (RCAF)  |
| 25-30 | Framework switch         |
| 30-35 | Fix 2 weakest dimensions |
| 35-40 | Polish weakest dimension |
| 40-45 | Optional refinements     |
| 45+   | Ship it!                 |

### Common Fixes

| Problem         | Solution                      |
| --------------- | ----------------------------- |
| Vague           | Add specifics (Role, Context) |
| No structure    | Apply RCAF                    |
| Too complex     | Switch to RACE                |
| Missing metrics | Add success criteria          |
| Poor expression | Simplify language             |
| Not reusable    | Extract parameters            |
| Visual UI       | Switch to VIBE                |

### Power Combinations

| Combination        | Use Case               |
| ------------------ | ---------------------- |
| RCAF + CoT         | Systematic thinking    |
| COSTAR + ReAct     | Iterative content      |
| TIDD-EC + Few-Shot | Learning from examples |
| RACE + ToT         | Quick decisions        |
| CRAFT + All        | Maximum power          |

### Unified Severity Scale

- **80%+**
  - Quality: Excellent
  - Action: Ready for use
  - Urgency: None
- **70-79%**
  - Quality: Good
  - Action: Minor refinements
  - Urgency: Low
- **60-69%**
  - Quality: Adequate
  - Action: Targeted improvements
  - Urgency: Medium
- **<60%**
  - Quality: Weak
  - Action: Significant enhancement
  - Urgency: High

*Applies to CLEAR (50pt), EVOKE (50pt), VISUAL Image (60pt), VISUAL Video (70pt)*

---

*This Patterns, Enhancements & Evaluation framework establishes the comprehensive reference set for prompt engineering excellence. It provides the complete framework library, systematic enhancement patterns, CLEAR/EVOKE/VISUAL evaluation methodologies, recovery protocols, and practical implementation templates.*
