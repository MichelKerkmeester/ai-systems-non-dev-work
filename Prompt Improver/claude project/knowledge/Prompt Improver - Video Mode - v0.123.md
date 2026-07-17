---
title: "Video Mode"
description: "MOTION framework, temporal consistency and platform guidance for video generators."
version: "0.123"
contextType: reference
importance_tier: high
trigger_phrases:
  - "$video video prompts"
  - "MOTION framework"
  - "VISUAL video scoring"
  - "video platform routing"
  - "Runway Sora Kling Veo"
---

# Prompt - Templates - Video Mode - v0.123

Specialized mode for optimizing prompts for AI video generators including Runway Gen-4/4.5, Sora, Kling 2.5/2.6, Veo 3.1+, Pika 2.5, Luma Ray3, Minimax, Seedance, OmniHuman, and Wan 2.1.

---

## 1. OVERVIEW

### Purpose

Transform static descriptions into motion-focused prompts using the MOTION framework and VISUAL scoring system.

### When to Use

- **Loading Condition:** TRIGGER. Activated by `$video` / `$vid` commands.
- Video generation prompts and platform-specific optimization.
- Temporal vocabulary, audio integration, and anti-pattern detection.

---

## 2. OBJECTIVE

Transform static scene descriptions into dynamic, motion-focused prompts optimized for AI video generators.

**Commands:** `$video`, `$vid`
**DEPTH Rounds:** 5 (creative iteration)
**Framework:** MOTION
**Scoring:** VISUAL (70 points, 56+ threshold)

**Core Philosophy:**
> "Describe what moves, not what exists."

**Key Principles:**
1. **Motion first** - Start with camera movement, then subject motion
2. **Temporal thinking** - Consider the entire duration, not just a frame
3. **No negative prompts** - Most video AI ignores them (universal principle)
4. **Shorter is better** - 5-10 seconds for consistency
5. **Platform awareness** - Each generator has unique syntax and strengths
6. **Audio-aware** - Newer models (Veo 3+, Kling 2.6, Seedance 1.5) support native audio

---

## 3. MOTION FRAMEWORK

- **M**ovement
  - Focus: Subject & Camera Motion
  - Core Question: "How does everything move?"
  - Weight: 30%
- **O**rigin
  - Focus: Starting Point/Reference
  - Core Question: "What is the visual anchor?"
  - Weight: 15%
- **T**emporal
  - Focus: Duration & Pacing
  - Core Question: "How does time flow?"
  - Weight: 15%
- **I**ntention
  - Focus: Narrative Purpose
  - Core Question: "What story is being told?"
  - Weight: 15%
- **O**rchestration
  - Focus: Scene Choreography
  - Core Question: "How do elements interact?"
  - Weight: 15%
- **N**uance
  - Focus: Subtle Details & Audio
  - Core Question: "What refinements are needed?"
  - Weight: 10%

### MOTION Application Process

```yaml
motion_process:
  round_1_discover:
    - Extract static scene from input
    - Identify what should move
    - Detect platform hints
    - Check for audio requirements

  round_2_engineer:
    - Add camera movement (platform-specific syntax)
    - Add subject motion verbs
    - Define temporal scope (duration, pacing)
    - Add audio cues if platform supports

  round_3_prototype:
    - Build complete prompt
    - Apply platform-specific syntax
    - Ensure motion throughout duration
    - Integrate audio descriptions (if applicable)

  round_4_test:
    - Score with VISUAL (70pt)
    - Check for static descriptions
    - Verify motion continuity
    - Validate platform compatibility

  round_5_harmonize:
    - Final polish
    - Optimize for target duration
    - Format for delivery
    - Add platform-specific parameters
```

---

## 4. VISUAL SCORING (VIDEO)

- **V**ivid
  - Points: 15
  - Threshold: 12+
  - What It Measures: Creates clear mental imagery
- **I**ntentional
  - Points: 10
  - Threshold: 8+
  - What It Measures: Clear narrative purpose
- **S**tyled
  - Points: 10
  - Threshold: 8+
  - What It Measures: Defined visual aesthetic
- **U**nambiguous
  - Points: 10
  - Threshold: 8+
  - What It Measures: No conflicting motion instructions
- **A**tmospheric
  - Points: 10
  - Threshold: 8+
  - What It Measures: Environment and mood captured
- **L**ayered
  - Points: 5
  - Threshold: 4+
  - What It Measures: Depth in scene composition
- **M**otion
  - Points: 10
  - Threshold: 8+
  - What It Measures: Clear movement description
- **Total**
  - Points: **70**
  - Threshold: **56+**
  - What It Measures: Quality threshold

---

## 5. PLATFORM OPTIMIZATION

Templates: see the video-mode-library asset

---


## 6. PLATFORM MENTAL MODELS

Templates: see the video-mode-library asset

---


## 7. TEMPORAL CONSISTENCY

Templates: see the video-mode-library asset

---


## 10. ANTI-PATTERNS

### Universal Anti-Patterns (All Platforms)

- **Static description**
  - Problem: "A car on a road"
  - Transform To: "A car drives along a winding road"
- **Negative prompts**
  - Problem: "no blur, no grain"
  - Transform To: Remove entirely
- **Multiple scenes**
  - Problem: "forest then city"
  - Transform To: One continuous scene
- **Discrete states**
  - Problem: "happy, then sad"
  - Transform To: "Expression gradually shifts"
- **Missing camera**
  - Problem: "Person walking"
  - Transform To: "Tracking shot follows person"
- **Too long**
  - Problem: 30-second description
  - Transform To: Break into 5-10 second clips
- **Quality keywords**
  - Problem: "4K, 8K, ultra HD"
  - Transform To: Remove entirely
- **Contradicting motion**
  - Problem: "zooms in while pulling back"
  - Transform To: Choose one direction
- **Vague timing**
  - Problem: "eventually"
  - Transform To: "over 5 seconds"

### Platform-Specific Anti-Patterns

- **Runway**
  - Avoid: Natural language camera
  - Use Instead: "Dolly forward:" prefix
- **Sora**
  - Avoid: Camera command prefixes
  - Use Instead: Natural language description
- **Kling**
  - Avoid: "pan left/right"
  - Use Instead: "move left/right" or "tilt"
- **Veo**
  - Avoid: Skipping audio description
  - Use Instead: Always include "Audio:" section
- **Minimax**
  - Avoid: Prompts over 6 seconds
  - Use Instead: Chain shorter clips
- **Wan**
  - Avoid: Prompts under 80 words
  - Use Instead: Expand to 80-120 words
- **OmniHuman**
  - Avoid: Text-only prompts
  - Use Instead: Provide audio input

### Static-to-Dynamic Transformation

```yaml
static_to_dynamic:
  technique: "add_motion_verbs"

  transformations:
    "person standing" → "person shifts weight, breathing visible"
    "car parked" → "car idles, exhaust wisps, lights reflect"
    "tree" → "tree sways gently, leaves rustle in breeze"
    "water" → "water ripples, reflections shift and dance"
    "fire" → "flames dance and flicker, embers float upward"
    "city skyline" → "lights twinkle, traffic flows below"
    "portrait" → "subtle breath, eyes scanning, hair stirring"

  always_add:
    - camera_movement: "Even for still subjects, camera moves"
    - atmospheric_motion: "Wind, light changes, particles"
    - subtle_motion: "Breathing, blinking, shifting"
    - audio_if_supported: "Environmental sounds, subtle effects"
```

---

## 11. TRANSFORMATION EXAMPLES

Templates: see the video-mode-library asset

---


## 12. ITERATIVE REFINEMENT FLOW

### Post-Delivery Question (MANDATORY)

Templates: see the video-mode-library asset


### Iteration Best Practices

- **1st**
  - Focus: Motion validation
  - Typical Adjustments: Camera type, movement direction
- **2nd**
  - Focus: Temporal calibration
  - Typical Adjustments: Pacing, duration, keyframes
- **3rd**
  - Focus: Consistency polish
  - Typical Adjustments: Subject stability, style coherence
- **4th+**
  - Focus: Detail refinement
  - Typical Adjustments: Atmosphere, audio, nuances

**Platform-Specific Refinement Tips:**

| Platform | Common Refinements |
|----------|-------------------|
| Runway | Change camera prefix, adjust motion intensity |
| Sora | Add temporal markers, clarify physics |
| Kling | Modify bracket syntax, adjust I2V motion words |
| Veo | Enhance audio cues, add cinematography terms |
| Luma | Refine keyframe descriptions, camera tags |

**Common Video Issues & Fixes:**

| Issue | Refinement Approach |
|-------|---------------------|
| Jittery motion | Add "smooth", "continuous", reduce action complexity |
| Wrong camera | Explicitly state camera type with platform syntax |
| Too fast/slow | Add temporal markers ("slowly", "over 3 seconds") |
| Style drift | Strengthen style anchors, reduce duration |
| No motion | Add action verbs, describe movement explicitly |

**Convergence Signal:** When user expresses satisfaction:

```markdown
The video matches your vision! 🎬

Save this final prompt for future use:
[Final optimized prompt]

Need another video prompt? Just share your next concept.
```

---

## 13. QUICK REFERENCE

Templates: see the video-mode-library asset


---

*Video Mode transforms static descriptions into dynamic, motion-focused prompts optimized for 2025-2026 generation AI video platforms with full audio integration support.*
