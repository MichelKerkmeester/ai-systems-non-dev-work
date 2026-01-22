# Prompt - Video Mode - v0.100

Specialized mode for optimizing prompts for AI video generators including Runway, Sora, Kling, Pika, Luma, Veo, and Minimax.

**Loading Condition:** TRIGGER
**Purpose:** Transform static descriptions into motion-focused prompts using the MOTION framework and VISUAL scoring system.
**Scope:** Video generation prompts, platform-specific optimization, temporal vocabulary, anti-pattern detection.

---

## 📋 TABLE OF CONTENTS

1. [🎯 OBJECTIVE](#1--objective)
2. [🎬 MOTION FRAMEWORK](#2--motion-framework)
3. [📊 VISUAL SCORING (VIDEO)](#3--visual-scoring-video)
4. [🎥 PLATFORM OPTIMIZATION](#4--platform-optimization)
5. [⏱️ TEMPORAL CONSISTENCY](#5-️-temporal-consistency)
6. [📚 VOCABULARY BANKS](#6--vocabulary-banks)
7. [⚠️ ANTI-PATTERNS](#7-️-anti-patterns)
8. [✨ TRANSFORMATION EXAMPLES](#8--transformation-examples)
9. [🏎️ QUICK REFERENCE](#9-️-quick-reference)

---

## 1. 🎯 OBJECTIVE

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
3. **No negative prompts** - Most video AI ignores them
4. **Shorter is better** - 5-10 seconds for consistency
5. **Platform awareness** - Each generator has unique syntax

---

## 2. 🎬 MOTION FRAMEWORK

| Element | Focus | Core Question | Weight |
|---------|-------|---------------|--------|
| **M**ovement | Subject & Camera Motion | "How does everything move?" | 30% |
| **O**rigin | Starting Point/Reference | "What is the visual anchor?" | 15% |
| **T**emporal | Duration & Pacing | "How does time flow?" | 15% |
| **I**ntention | Narrative Purpose | "What story is being told?" | 15% |
| **O**rchestration | Scene Choreography | "How do elements interact?" | 15% |
| **N**uance | Subtle Details | "What refinements are needed?" | 10% |

### MOTION Application Process

```yaml
motion_process:
  round_1_discover:
    - Extract static scene from input
    - Identify what should move
    - Detect platform hints

  round_2_engineer:
    - Add camera movement
    - Add subject motion
    - Define temporal scope

  round_3_prototype:
    - Build complete prompt
    - Add platform syntax
    - Ensure motion throughout

  round_4_test:
    - Score with VISUAL (70pt)
    - Check for static descriptions
    - Verify motion continuity

  round_5_harmonize:
    - Final polish
    - Optimize for duration
    - Format for delivery
```

---

## 3. 📊 VISUAL SCORING (VIDEO)

| Dimension | Points | Threshold | What It Measures |
|-----------|--------|-----------|------------------|
| **V**ivid | 15 | 12+ | Creates clear mental imagery |
| **I**ntentional | 10 | 8+ | Clear narrative purpose |
| **S**tyled | 10 | 8+ | Defined visual aesthetic |
| **U**nambiguous | 10 | 8+ | No conflicting motion instructions |
| **A**tmospheric | 10 | 8+ | Environment and mood captured |
| **L**ayered | 5 | 4+ | Depth in scene composition |
| **M**otion | 10 | 8+ | Clear movement description |
| **Total** | **70** | **56+** | Quality threshold |

---

## 4. 🎥 PLATFORM OPTIMIZATION

### Platform Detection

| Platform | Detection Keywords | Max Duration | Strength |
|----------|-------------------|--------------|----------|
| **Runway Gen-3/4** | "runway", "gen-3", "gen-4" | 10 sec | Camera control |
| **Sora** | "sora", "openai video" | 60 sec | Cinematography |
| **Kling 2.5/2.6** | "kling", "kuaishou" | 5 min | Long duration |
| **Pika 2.5** | "pika" | 10 sec | Modifications |
| **Luma Ray2/3** | "luma", "dream machine" | 10 sec | Speed |
| **Veo 3** | "veo", "google video" | 60 sec | Native audio |
| **Minimax/Hailuo** | "minimax", "hailuo" | 6 sec | Quality |

### Platform-Specific Syntax

**Runway Gen-3/4:**
```
Camera control at start of prompt:
- "Dolly forward:"
- "Pan left:"
- "Crane up:"
- "Static shot:"
- "Tracking shot:"
- "Orbit:"

Turbo mode: Faster, fewer details
Standard: Better quality, more control
```

**Sora:**
```
Natural language cinematography:
- "The camera follows..."
- "A tracking shot reveals..."
- "Slow zoom into..."
- "The scene transitions from..."

Supports long-form (60 sec)
No parameters needed
```

**Kling 2.5/2.6:**
```
Motion brush compatible
Point-to-point motion specification
Supports very long videos (5 min)
Image-to-video excels
```

**Veo 3:**
```
Native audio generation
Can specify sound cues:
- "with the sound of..."
- "accompanied by..."
- "audio: footsteps on gravel"
```

**Pika 2.5:**
```
Scene Ingredients (structured input):
- Subject: Main focus of the scene
- Action: What the subject does
- Setting: Environment/background
- Style: Visual aesthetic

Pikaswaps (modify regions):
- Select region in reference image
- Describe replacement content
- Maintains surrounding context

Pikadditions (add elements):
- Add objects/effects to existing scene
- Specify placement and behavior
- "Add floating particles near the subject"

Lip Sync Mode:
- Upload audio track
- Matches mouth movement to speech
```

**Luma Ray3:**
```
Keyframe Control:
- Start frame: "Opens on [description]"
- End frame: "Ends with [description]"
- System interpolates motion between

Visual Annotations:
- Draw motion paths on reference image
- Arrow indicates direction of movement
- Length suggests speed/distance

Draft Mode:
- Fast preview at lower quality
- Iterate quickly before final render
- 4x faster generation

Camera Commands:
- [Camera: orbit left 180°]
- [Camera: push in slowly]
- [Camera: static with slight drift]
```

**Minimax/Hailuo:**
```
Director Mode (camera commands in brackets):
- [Pan left] - Horizontal camera movement
- [Pan right]
- [Tilt up] - Vertical camera rotation
- [Tilt down]
- [Zoom in] - Lens zoom
- [Zoom out]
- [Pedestal up] - Camera rises vertically
- [Pedestal down]

Combination Example:
"[Pan left, Tilt up] A dancer leaps across the stage"

6-Second Optimal Length:
- Maximum consistency in 6-sec clips
- Chain clips for longer sequences
- High detail retention
```

---

## 5. ⏱️ TEMPORAL CONSISTENCY

### Duration Guidelines

| Generation Type | Optimal Duration | Word Count |
|-----------------|------------------|------------|
| Text-to-video | 5-10 seconds | 50-80 words |
| Image-to-video | 3-5 seconds | 20-40 words |
| Video extension | 3-5 seconds | 15-30 words |

### Maintaining Consistency

```yaml
temporal_consistency:
  principles:
    - single_action_per_clip: true
    - continuous_camera_motion: true
    - consistent_lighting: true
    - no_scene_changes: true

  techniques:
    - specify_pacing: "slow", "gradual", "sudden"
    - use_present_tense: "walks" not "walked"
    - describe_continuous_motion: not discrete states
    - anchor_to_reference: use image-to-video when possible
```

### Common Temporal Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Subject morphing | Too many details | Focus on motion, not appearance |
| Scene changing | Multiple locations | One setting per clip |
| Speed inconsistency | Vague pacing | Specify "slowly", "gradually" |
| Abrupt endings | No end state | Describe through-motion |

---

## 6. 📚 VOCABULARY BANKS

### Camera Movement

| Movement | Description | Best For |
|----------|-------------|----------|
| **Static** | Camera doesn't move | Dialogue, detail shots |
| **Pan** | Horizontal rotation | Reveal, follow action |
| **Tilt** | Vertical rotation | Height reveal, look up/down |
| **Dolly** | Forward/backward | Approach, intensity |
| **Truck** | Sideways move | Parallel to action |
| **Crane** | Up/down on arm | Dramatic reveal |
| **Orbit** | Circle around subject | 360° view, product shots |
| **Handheld** | Intentional shake | Documentary, tension |
| **Steadicam** | Smooth follow | Walking, flowing motion |
| **Drone** | Aerial movement | Establishing, landscape |

### Subject Motion

| Type | Examples |
|------|----------|
| **Locomotion** | Walking, running, crawling, floating, flying |
| **Gesture** | Reaching, pointing, waving, grasping |
| **Expression** | Smiling slowly, eyes widening, turning head |
| **Interaction** | Picking up, placing down, exchanging |
| **Natural** | Hair blowing, clothes rippling, breathing |
| **Environmental** | Leaves falling, water flowing, clouds drifting |

### Pacing & Speed

| Term | Effect |
|------|--------|
| **Slow motion** | Dramatic emphasis, beauty shots |
| **Real-time** | Natural, documentary feel |
| **Time-lapse** | Passage of time, transformation |
| **Speed ramp** | Dramatic acceleration/deceleration |
| **Hyperlapse** | Moving time-lapse |

### Cinematic Terms

| Term | Meaning |
|------|---------|
| **Establishing shot** | Wide shot showing location |
| **Medium shot** | Waist-up framing |
| **Close-up** | Face or detail |
| **Over-the-shoulder** | Behind one subject toward another |
| **POV** | Point of view shot |
| **Tracking** | Following a moving subject |

---

## 7. ⚠️ ANTI-PATTERNS

### Patterns to Transform

| Anti-Pattern | Problem | Transform To |
|--------------|---------|--------------|
| **Static description** | "A car on a road" | "A car drives along a winding mountain road" |
| **Negative prompts** | "no blur, no grain" | Remove entirely (video AI ignores negatives) |
| **Multiple scenes** | "forest then city then ocean" | One continuous scene per generation |
| **Discrete states** | "happy, then sad, then angry" | "Expression gradually shifts from joy to contemplation" |
| **Missing camera** | "Person walking" | "Tracking shot follows person as they walk" |
| **Too long** | 30-second description | Break into 5-10 second clips |
| **Quality keywords** | "4K, 8K, ultra HD, cinematic quality" | Remove entirely (quality through description) |
| **Abstract timing** | "Some time passes" or "eventually" | "Over 5 seconds" or "gradually across the clip" |
| **Contradicting motion** | "zooms in while pulling back" | Choose one clear movement direction |
| **Overcomplicated subject** | "Multiple characters with costume changes" | Focus on one subject with one action |

### Static-to-Dynamic Transformation

```yaml
static_to_dynamic:
  technique: "add_motion_verbs"

  transformations:
    "person standing" → "person shifts weight, breathing visible"
    "car parked" → "car idles, exhaust visible, lights on"
    "tree" → "tree sways gently, leaves rustle"
    "water" → "water ripples, light reflections shift"
    "fire" → "flames dance, embers float upward"

  always_add:
    - camera_movement: "Even for still subjects, camera moves"
    - atmospheric_motion: "Wind, light changes, particles"
    - subtle_motion: "Breathing, blinking, shifting"
```

---

## 8. ✨ TRANSFORMATION EXAMPLES

### Example 1: Basic Scene (Runway)

**Input:**
```
woman walking in forest
```

**Output:**
```
Dolly forward: A woman in a flowing white dress walks slowly through
an ancient redwood forest. Dappled sunlight filters through the canopy,
creating shifting patterns on the forest floor. Her bare feet step
carefully over moss-covered roots.

Camera follows at waist height, maintaining medium shot distance.
Soft morning mist drifts between the massive tree trunks.
Her hair sways gently with each step. Cinematic, dreamlike atmosphere.
```

**VISUAL Score:** 62/70
```
V: 14/15 | I: 9/10 | S: 9/10 | U: 9/10 | A: 9/10 | L: 4/5 | M: 8/10 = 62/70
```

### Example 2: Action Scene (Sora)

**Input:**
```
car driving mountain road
```

**Output:**
```
Aerial tracking shot following a vintage red convertible as it winds
along a dramatic coastal mountain road at golden hour. The Pacific Ocean
glitters hundreds of feet below.

Camera orbits slowly from behind to profile view. The driver's scarf
billows in the wind. Waves crash against rocky cliffs far below.
Long shadows stretch across the asphalt. The car hugs the curves
with confident precision.

Cinematic wide-screen composition. Film grain. Nostalgic summer
adventure feeling.
```

**VISUAL Score:** 64/70

### Example 3: Product Shot (Luma)

**Input:**
```
watch on display
```

**Output:**
```
Orbit shot: A luxury watch rotates slowly on a black velvet surface.
Soft studio lighting catches the brushed steel case and sapphire crystal.

Camera circles 180 degrees, revealing the intricate dial details
and leather strap texture. Subtle reflections shift across the surface.
The second hand sweeps smoothly. Premium product photography aesthetic.
```

**VISUAL Score:** 58/70

### Example 4: Emotional Scene (Kling)

**Input:**
```
person receiving good news
```

**Output:**
```
Close-up on a woman's face as realization slowly dawns. Her eyes widen
almost imperceptibly, then a smile spreads gradually from the corners
of her mouth.

Static camera, natural window light. The smile reaches her eyes as they
begin to glisten. She covers her mouth with her hand, overwhelmed.
Slight camera push in emphasizes the emotional moment.

Documentary authenticity, intimate and raw.
```

**VISUAL Score:** 60/70

### Example 5: Nature Scene (Veo)

**Input:**
```
waterfall nature beautiful
```

**Output:**
```
Crane down: Camera descends alongside a thundering waterfall, mist
swirling as it catches golden afternoon light. Rainbow fragments
appear and disappear in the spray.

Audio: Deep rumble of falling water, birds calling in the distance.

The camera levels out at the pool below, water churning white before
flowing into a serene river. Ferns and moss cover the surrounding rocks.
Slow motion captures individual water droplets catching light.

Epic nature documentary style, pristine wilderness atmosphere.
```

**VISUAL Score:** 66/70

---

## 9. 🏎️ QUICK REFERENCE

### MOTION Checklist
- [ ] **M**ovement: Camera AND subject motion defined?
- [ ] **O**rigin: Starting visual established?
- [ ] **T**emporal: Duration and pacing specified?
- [ ] **I**ntention: Narrative purpose clear?
- [ ] **O**rchestration: Multiple elements coordinated?
- [ ] **N**uance: Atmospheric details included?

### Platform Quick Guide

| Platform | Max | Camera Start | Negatives | Audio |
|----------|-----|--------------|-----------|-------|
| Runway | 10s | Yes (required) | No | No |
| Sora | 60s | Natural language | No | No |
| Kling | 5min | Motion brush | No | No |
| Pika | 10s | Optional | No | No |
| Luma | 10s | Keyframes | No | No |
| Veo | 60s | Natural language | No | **Yes** |

### Generation Type Guidelines

| Type | Approach | Words |
|------|----------|-------|
| **Text-to-video** | Full scene + motion description | 50-80 |
| **Image-to-video** | Motion only (scene exists) | 20-40 |
| **Extension** | Continue existing motion | 15-30 |

### Score Targets
- **VISUAL 56+**: Ready for generation
- **VISUAL 49-55**: Minor refinements needed
- **VISUAL <49**: Significant enhancement required

---

*Video Mode transforms static descriptions into dynamic, motion-focused prompts that produce consistent, cinematic results.*
