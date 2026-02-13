# Prompt - Templates - Video Mode - v0.121

Specialized mode for optimizing prompts for AI video generators including Runway Gen-4/4.5, Sora, Kling 2.5/2.6, Veo 3.1+, Pika 2.5, Luma Ray3, Minimax, Seedance, OmniHuman, and Wan 2.1.

**Loading Condition:** TRIGGER
**Purpose:** Transform static descriptions into motion-focused prompts using the MOTION framework and VISUAL scoring system.
**Scope:** Video generation prompts, platform-specific optimization, temporal vocabulary, audio integration, anti-pattern detection.

## TABLE OF CONTENTS

  - 1. 🎯 OBJECTIVE
  - 2. 🎬 MOTION FRAMEWORK
  - 3. 📊 VISUAL SCORING (VIDEO)
  - 4. 🎥 PLATFORM OPTIMIZATION
  - 5. 🧠 PLATFORM MENTAL MODELS
  - 6. ⏱️ TEMPORAL CONSISTENCY
  - 7. 🔊 AUDIO INTEGRATION
  - 8. 📚 VOCABULARY BANKS
  - 9. ⚠️ ANTI-PATTERNS
  - 10. ✨ TRANSFORMATION EXAMPLES
  - 11. 🔄 ITERATIVE REFINEMENT FLOW
  - 12. 🏎️ QUICK REFERENCE

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
3. **No negative prompts** - Most video AI ignores them (universal principle)
4. **Shorter is better** - 5-10 seconds for consistency
5. **Platform awareness** - Each generator has unique syntax and strengths
6. **Audio-aware** - Newer models (Veo 3+, Kling 2.6, Seedance 1.5) support native audio

---

## 2. 🎬 MOTION FRAMEWORK

| Element           | Focus                    | Core Question                  | Weight |
| ----------------- | ------------------------ | ------------------------------ | ------ |
| **M**ovement      | Subject & Camera Motion  | "How does everything move?"    | 30%    |
| **O**rigin        | Starting Point/Reference | "What is the visual anchor?"   | 15%    |
| **T**emporal      | Duration & Pacing        | "How does time flow?"          | 15%    |
| **I**ntention     | Narrative Purpose        | "What story is being told?"    | 15%    |
| **O**rchestration | Scene Choreography       | "How do elements interact?"    | 15%    |
| **N**uance        | Subtle Details & Audio   | "What refinements are needed?" | 10%    |

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

## 3. 📊 VISUAL SCORING (VIDEO)

| Dimension       | Points | Threshold | What It Measures                   |
| --------------- | ------ | --------- | ---------------------------------- |
| **V**ivid       | 15     | 12+       | Creates clear mental imagery       |
| **I**ntentional | 10     | 8+        | Clear narrative purpose            |
| **S**tyled      | 10     | 8+        | Defined visual aesthetic           |
| **U**nambiguous | 10     | 8+        | No conflicting motion instructions |
| **A**tmospheric | 10     | 8+        | Environment and mood captured      |
| **L**ayered     | 5      | 4+        | Depth in scene composition         |
| **M**otion      | 10     | 8+        | Clear movement description         |
| **Total**       | **70** | **56+**   | Quality threshold                  |

---

## 4. 🎥 PLATFORM OPTIMIZATION

### Platform Detection & Capabilities

| Platform             | Detection Keywords            | Max Duration | Native Audio | Best Strength                |
| -------------------- | ----------------------------- | ------------ | ------------ | ---------------------------- |
| **Runway Gen-4/4.5** | "runway", "gen-4", "gen-4.5"  | 10 sec       | No           | Camera control, I2V          |
| **Sora**             | "sora", "openai video"        | 20 sec (API) | No           | Cinematography, physics      |
| **Kling 2.5/2.6**    | "kling", "kuaishou"           | 5 min        | Yes (2.6)    | Long duration, I2V           |
| **Veo 3.1+**         | "veo", "google video"         | 148 sec      | Yes          | Native audio, cinematography |
| **Pika 2.5**         | "pika"                        | 10 sec       | No           | Modifications, lip-sync      |
| **Luma Ray3**        | "luma", "dream machine"       | 10 sec       | No           | Speed, keyframes             |
| **Minimax/Hailuo**   | "minimax", "hailuo"           | 6 sec        | No           | Quality, director mode       |
| **Seedance 1.5 Pro** | "seedance", "bytedance video" | 10 sec       | Yes          | Audio-visual sync            |
| **OmniHuman 1.5**    | "omnihuman", "avatar"         | 30 sec       | Audio-driven | Full-body animation          |
| **Wan 2.1/2.2**      | "wan", "alibaba video"        | 5 sec        | No           | Text rendering, FLF2V        |

### Platform-Specific Syntax

---

**Runway Gen-4/4.5:**
```
Six Camera Movement Types (use at prompt start):
- "Dolly forward:" / "Dolly back:"
- "Pan left:" / "Pan right:"
- "Crane up:" / "Crane down:"
- "Static shot:"
- "Tracking shot:"
- "Orbit:"

Key Features:
- Motion Brush: Draw motion paths on reference images
- I2V Mode: 20-40 words, motion description only
- T2V Mode: 50-80 words, full scene + motion
- NO negative prompts (ignored)

Prompt Structure:
[Camera]: [Subject] [Action] in [Setting]. [Atmospheric details].
[Secondary motion]. [Style reference].
```

---

**Sora:**
```
Natural Language Cinematography:
- "The camera follows..."
- "A tracking shot reveals..."
- "Slow zoom into..."
- "The scene transitions from..."
- "The camera orbits around..."

Key Features:
- Physics-aware generation (realistic motion)
- Up to 20 seconds via API (12s common)
- NO negative prompts
- NO camera command prefixes (use natural language)
- Strong world simulation understanding

Optimal Prompt Structure (50-100 words):
[Opening shot description]. [Subject with specific details].
[Primary action with physics cues]. The camera [movement description].
[Environmental interaction]. [Lighting and atmosphere].
[Cinematic style reference].
```

---

**Kling 2.5/2.6:**
```
IMPORTANT - Reversed Terminology from Western Standards:
- "Pan" in Kling = Vertical movement (like "tilt" elsewhere)
- "Tilt" in Kling = Horizontal movement (like "pan" elsewhere)
- Use "move left/right" for horizontal, "move up/down" for vertical

Camera Controls:
- [zoom in] / [zoom out]
- [move left] / [move right] (horizontal)
- [move up] / [move down] (vertical)
- [rotate clockwise] / [rotate counterclockwise]

Key Features:
- Motion Brush: Draw arrows to indicate motion direction
- Point-to-point motion specification
- Up to 5 minutes video duration
- Native audio in Kling 2.6 ("with the sound of...")
- CFG Scale: Higher (0.7+) for prompt adherence
- Image-to-video excels with reference images

Prompt Structure (60-100 words):
[Subject description]. [Primary action with direction].
[Camera movement using Kling terminology].
[Environmental details]. [Mood and atmosphere].
[Audio cue if Kling 2.6]: "with the sound of [description]"
```

---

**Veo 3.1+:**
```
5-Element Prompt Structure:
1. Shot type and framing
2. Subject and action
3. Environment and setting
4. Visual style and mood
5. Audio description (NATIVE SUPPORT)

Audio Integration (Required for full optimization):
- "Audio: [sound description]"
- "with the sound of..."
- "accompanied by..."
- Supports: ambient, dialogue, music, effects

Camera Vocabulary:
- Wide establishing shot
- Medium shot, waist-up framing
- Close-up on [detail]
- Tracking shot following [subject]
- Slow push in / pull back
- Crane up / crane down

Key Features:
- Up to 148 seconds extended generation
- Native audio generation (specify in prompt)
- Strong cinematography understanding
- 8-second clips for consistency (chain for longer)

Prompt Structure (80-120 words):
[Shot type]: [Subject with details] [Action description]
in [Setting with atmosphere]. [Camera movement].
[Secondary elements and motion]. [Lighting conditions].
[Visual style]. Audio: [Sound environment and effects].
```

---

**Pika 2.5:**
```
Scene Ingredients (Structured Input):
- Subject: Main focus with descriptive details
- Action: Specific motion verb + direction
- Setting: Environment and atmosphere
- Style: Visual aesthetic reference

Special Features:
- Pikaswaps: Replace regions in reference images
- Pikadditions: Add elements to existing scenes
- Lip Sync Mode: Upload audio for mouth sync
- Region-based modification for fine control

Prompt Structure:
Subject: [detailed subject description]
Action: [motion verb] [direction/manner]
Setting: [environment] with [atmospheric details]
Style: [aesthetic reference], [mood descriptor]
```

---

**Luma Ray3:**
```
Keyframe Control:
- "Opens on [start frame description]"
- "Ends with [end frame description]"
- System interpolates motion between frames

Camera Commands (in brackets):
- [Camera: orbit left 180°]
- [Camera: push in slowly]
- [Camera: static with slight drift]
- [Camera: dolly forward]
- [Camera: crane up revealing]

Key Features:
- Visual annotations: Draw motion paths on images
- Draft Mode: 4x faster for iteration
- Keyframe-to-keyframe interpolation
- Strong at product shots and reveals

Prompt Structure:
Opens on [starting state]. [Subject] [action verb].
[Camera: movement type and direction].
Ends with [final state]. [Style and mood].
```

---

**Minimax/Hailuo:**
```
Director Mode (Camera commands in brackets):
- [Pan left] / [Pan right] - Horizontal rotation
- [Tilt up] / [Tilt down] - Vertical rotation
- [Zoom in] / [Zoom out] - Lens zoom
- [Pedestal up] / [Pedestal down] - Camera rises/lowers
- [Push in] / [Pull back] - Dolly movement

Combination Syntax:
"[Pan left, Tilt up] A dancer leaps across the stage"

Key Features:
- 6-second optimal clip length (maximum consistency)
- Chain clips for longer sequences
- High detail retention
- Strong at character consistency

Prompt Structure:
[Camera commands] [Subject] [action] in [setting].
[Secondary motion]. [Atmospheric details].
[Style: cinematic quality descriptor]
```

---

**Seedance 1.5 Pro (ByteDance):**
```
Native Audio-Visual Synchronization:
- Generates synchronized audio with video
- "Audio: [environmental sounds], [character sounds]"
- Lip-sync in 8+ languages

Multi-Shot Generation:
- Describe scene transitions: "First... Then... Finally..."
- Maintains character consistency across shots
- "camera_fixed" parameter for static camera

Key Features:
- Up to 10 seconds per generation
- Native audio generation
- Dance/movement specialization
- Character consistency tools
- Lip-sync without separate audio file

Prompt Structure (60-90 words):
[Shot 1]: [Camera movement] [Subject] [action].
[Shot 2 if multi-shot]: [Transition], [next action].
[Environmental details]. [Lighting and mood].
Audio: [ambient sounds], [action sounds], [music if applicable].
[Style: visual aesthetic reference].
```

---

**OmniHuman 1.5 (ByteDance):**
```
Audio-Driven Avatar Animation:
- Primary input: Audio file + reference image
- Generates full-body animation from audio
- Supports: speech, singing, music-driven dance

Key Features:
- Full-body motion generation (not just face/lips)
- Multi-character support (up to 2 characters)
- Up to 30 seconds duration
- Strong at: presentations, podcasts, dance videos
- Works with single reference image

Prompt Structure (For text guidance):
[Character description from reference].
[Animation style]: [naturalistic/expressive/dynamic].
[Setting and background]. [Camera: framing type].
[Motion intensity]: [subtle/moderate/energetic].
Audio-driven: [description of expected audio content].
```

---

**Wan 2.1/2.2:**
```
Text Rendering Capability:
- Accurate Chinese and English text in video
- Use for: signs, subtitles, overlays
- Specify text in quotes: "Display text: '[YOUR TEXT]'"

FLF2V (First-Last Frame to Video):
- Provide start AND end frame
- System generates transition between
- Ideal for transformations and reveals

Motion Brush:
- Draw arrows to indicate motion paths
- Works on reference images
- Supports complex motion choreography

Key Features:
- 80-120 words optimal prompt length
- 5-second max per generation
- Strong text rendering
- Motion brush for precise control
- FLF2V for start/end control

Prompt Structure (80-120 words):
[Opening description]. [Subject with specific details].
[Primary motion with clear direction].
[Text if needed]: Display text: "[YOUR TEXT]"
[Camera movement description]. [Environmental motion].
[Lighting and atmosphere]. [Style reference].
[If FLF2V]: Starts as [start state], ends as [end state].
```

---

## 5. 🧠 PLATFORM MENTAL MODELS

Understanding how each AI video platform "thinks" helps craft prompts that align with its internal logic.

| Platform | Metaphor | Thinking Style | Prompt Focus | Example |
|----------|----------|----------------|--------------|---------|
| **Runway Gen-4.5** | Kinetic Sculptor | Physics, forces, motion vectors | Describe forces acting on objects, motion paths | "The car accelerates forward with increasing momentum, wheels gripping the wet asphalt" |
| **Sora 2** | Physics Simulator | Cause-and-effect, world logic, physics | Describe causal chains, realistic interactions | "Water splashes as the ball impacts the surface, ripples spreading outward" |
| **Kling 2.6** | Audio-Visual Choreographer | Timeline, beats, synchronization | Timeline structure, beat markers, audio sync | "On the first beat, the dancer spins. On the second, arms extend outward." |
| **Veo 3.1** | Rendering Engine | Structured data, references, parameters | Clear specifications, reference-style data | "CAMERA: dolly forward. SUBJECT: woman walking. LIGHTING: golden hour. AUDIO: ambient street sounds" |

### Applying Mental Models

```yaml
runway_gen4.5:
  metaphor: "Kinetic Sculptor"
  thinking: "Physics, forces, motion vectors"
  prompt_strategy:
    - Lead with force descriptions (acceleration, momentum, resistance)
    - Describe how objects interact with their environment
    - Specify material properties that affect motion
    - Use physical verbs: grips, propels, resists, rebounds
  example_application: |
    Instead of: "Car drives fast"
    Use: "The car accelerates forward with increasing momentum,
    wheels gripping the wet asphalt, suspension compressing through the turn"

sora_2:
  metaphor: "Physics Simulator"
  thinking: "Cause-and-effect, world logic, physics"
  prompt_strategy:
    - Describe causal chains (action leads to reaction)
    - Emphasize realistic world interactions
    - Let physics drive the narrative
    - Describe consequences of actions
  example_application: |
    Instead of: "Ball falls in water"
    Use: "Water splashes as the ball impacts the surface,
    ripples spreading outward, droplets arcing upward momentarily
    before gravity pulls them back down"

kling_2.6:
  metaphor: "Audio-Visual Choreographer"
  thinking: "Timeline, beats, synchronization"
  prompt_strategy:
    - Structure prompts with timeline markers
    - Align visual actions to audio beats
    - Use sequential phrasing (first, then, finally)
    - Describe rhythm and timing explicitly
  example_application: |
    Instead of: "Dancer performs routine"
    Use: "On the first beat, the dancer spins. On the second,
    arms extend outward. On the third, a dramatic leap,
    landing precisely as the bass drops"

veo_3.1:
  metaphor: "Rendering Engine"
  thinking: "Structured data, references, parameters"
  prompt_strategy:
    - Use clear categorical labels (CAMERA, SUBJECT, LIGHTING)
    - Provide specification-style descriptions
    - Structure data hierarchically
    - Include all rendering parameters explicitly
  example_application: |
    Instead of: "Woman walking at sunset with city sounds"
    Use: "CAMERA: dolly forward. SUBJECT: woman walking,
    mid-30s, navy coat. LIGHTING: golden hour, warm.
    SETTING: cobblestone street. AUDIO: ambient street sounds,
    distant traffic, footsteps on stone"
```

### Mental Model Selection Guide

| Scenario | Best Mental Model | Why |
|----------|-------------------|-----|
| Action sequences, vehicles, sports | Runway (Kinetic Sculptor) | Excels at force and momentum |
| Natural phenomena, cause-effect chains | Sora (Physics Simulator) | Strong world simulation |
| Music videos, dance, rhythmic content | Kling (Audio-Visual Choreographer) | Timeline-based thinking |
| Structured scenes, multi-element shots | Veo (Rendering Engine) | Handles complex specifications |

---

## 6. ⏱️ TEMPORAL CONSISTENCY

### Duration Guidelines by Platform

| Platform      | Optimal Clip | Extended         | Word Count               |
| ------------- | ------------ | ---------------- | ------------------------ |
| Runway Gen-4  | 5-10 sec     | Chain clips      | 50-80 (T2V), 20-40 (I2V) |
| Sora          | 8-12 sec     | Up to 20 sec     | 50-100                   |
| Kling 2.5/2.6 | 5-10 sec     | Up to 5 min      | 60-100                   |
| Veo 3.1+      | 8 sec        | Up to 148 sec    | 80-120                   |
| Pika 2.5      | 3-5 sec      | Up to 10 sec     | 30-60                    |
| Luma Ray3     | 5-10 sec     | Chain clips      | 40-70                    |
| Minimax       | 6 sec        | Chain clips      | 40-70                    |
| Seedance      | 5-10 sec     | Chain clips      | 60-90                    |
| OmniHuman     | 10-30 sec    | Audio-determined | 30-50 + audio            |
| Wan           | 3-5 sec      | Chain clips      | 80-120                   |

### Maintaining Consistency

```yaml
temporal_consistency:
  principles:
    - single_action_per_clip: true
    - continuous_camera_motion: true
    - consistent_lighting: true
    - no_scene_changes: true
    - audio_visual_sync: true (for audio-enabled platforms)

  techniques:
    - specify_pacing: "slow", "gradual", "sudden", "smooth"
    - use_present_tense: "walks" not "walked"
    - describe_continuous_motion: not discrete states
    - anchor_to_reference: use I2V when possible
    - chain_strategically: plan clip transitions for longer videos
```

### Common Temporal Issues

| Issue               | Cause              | Fix                               |
| ------------------- | ------------------ | --------------------------------- |
| Subject morphing    | Too many details   | Focus on motion, not appearance   |
| Scene changing      | Multiple locations | One setting per clip              |
| Speed inconsistency | Vague pacing       | Specify "slowly", "gradually"     |
| Abrupt endings      | No end state       | Describe through-motion           |
| Audio desync        | Timing mismatch    | Match audio cues to visual beats  |
| Character drift     | Long duration      | Use shorter clips, chain together |

---

## 7. 🔊 AUDIO INTEGRATION

### Platforms with Native Audio

| Platform             | Audio Type                          | Integration Method                   |
| -------------------- | ----------------------------------- | ------------------------------------ |
| **Veo 3.1+**         | Full audio (ambient, speech, music) | "Audio: [description]" at end        |
| **Kling 2.6**        | Ambient and effects                 | "with the sound of..."               |
| **Seedance 1.5 Pro** | Full audio + lip-sync               | Inline descriptions + Audio: section |
| **OmniHuman 1.5**    | Audio-driven (input required)       | Upload audio file                    |

### Platform-Specific Audio Syntax

| Platform | Syntax Style | Position | Example |
|----------|--------------|----------|---------|
| **Veo 3.1+** | Labeled section | End of prompt | `Audio: Deep rumble of thunder, rain pattering on windows, distant traffic` |
| **Kling 2.6** | Natural language inline | End of scene description | `...with the sound of coffee grinding, milk frothing, and soft jazz playing` |
| **Seedance 1.5 Pro** | Labeled section | After visual description | `Audio: Piano melody, dancer's footfalls on wood, fabric rustling with movement` |

### Audio Categories & Best Practices

| Category | Description | Prompt Examples |
|----------|-------------|-----------------|
| **Ambient** | Environmental background sounds | "gentle wind rustling through leaves", "distant city traffic hum", "ocean waves lapping against shore", "quiet office with keyboard typing" |
| **Action** | Sounds triggered by visual events | "footsteps on gravel path", "door creaking open slowly", "car engine revving", "glass clinking" |
| **Music** | Background or featured music | "soft piano melody", "upbeat electronic music", "orchestral crescendo", "lo-fi beats" |
| **Speech** | Dialogue or vocal elements | "character speaks with [emotion]", "narrator describes scene", "crowd murmurs in background" |
| **Silence** | Intentional absence of sound | "quiet tension", "muffled world", "vacuum of space" |

### Audio Prompt Examples

**Veo 3.1+:**
```
Crane down: Camera descends alongside a thundering waterfall,
mist swirling as it catches golden afternoon light.
Rainbow fragments appear and disappear in the spray.
Audio: Deep rumble of falling water, birds calling in distance,
gentle wind carrying mist droplets.
```

**Kling 2.6:**
```
A vintage cafe at morning, barista preparing espresso,
steam rising from the machine, with the sound of
coffee grinding, milk frothing, and soft jazz playing.
```

**Seedance 1.5 Pro:**
```
[Shot 1]: Close-up on musician's hands on piano keys.
[Shot 2]: Camera pulls back revealing full concert hall.
Warm stage lighting, audience silhouettes visible.
Audio: Piano melody in foreground, subtle audience presence,
concert hall acoustics with natural reverb.
```

---

## 8. 📚 VOCABULARY BANKS

### Physics Descriptors

| Descriptor | Description | Example |
|------------|-------------|---------|
| **Rigidity** | Object maintains shape during motion | "The car remains rigid and solid throughout the turn" |
| **Gravity** | Objects obey gravitational physics | "No floating, no defiance of gravity" |
| **Impact** | Collision effects are realistic | "Collision creates debris, dust, appropriate sound" |
| **Momentum** | Motion continues naturally | "Gradual acceleration, natural deceleration" |
| **Inertia** | Objects resist changes in motion | "The cape continues swinging after she stops" |
| **Friction** | Surface interaction affects motion | "Tires grip the wet asphalt, slight skid on corners" |
| **Elasticity** | Bounce and deformation behavior | "The ball compresses slightly on impact, rebounds" |
| **Fluid dynamics** | Liquid and gas motion behavior | "Smoke billows and disperses naturally, water flows around obstacles" |

### Motion Troubleshooting Guide

| Issue | Cause | Solution |
|-------|-------|----------|
| **Object morphing** | Insufficient rigidity description | Add rigidity descriptors, specify material properties ("solid metal frame", "rigid structure") |
| **Floating objects** | Missing gravity anchoring | Add gravity cues, ground contact descriptions ("feet planted firmly", "tires gripping road") |
| **Jittery motion** | Too many rapid changes | Add smooth motion qualifiers, longer transitions ("smoothly", "continuously", "fluid motion") |
| **Unrealistic physics** | Missing cause-effect chain | Describe physical consequences ("impact creates dust", "momentum carries forward") |
| **Limbs/parts detaching** | Body coherence not specified | Add structural integrity cues ("body moves as one unit", "connected, coordinated movement") |
| **Unnatural speed** | Vague pacing instructions | Add explicit timing ("over 3 seconds", "gradually accelerating") |
| **Objects passing through** | Missing collision description | Describe physical interaction ("bounces off", "deflects", "stops against") |

### Camera Movement

| Movement      | Description           | Best For                | Platform Notes            |
| ------------- | --------------------- | ----------------------- | ------------------------- |
| **Static**    | Camera doesn't move   | Dialogue, detail shots  | All platforms             |
| **Pan**       | Horizontal rotation   | Reveal, follow action   | Note: Kling reverses this |
| **Tilt**      | Vertical rotation     | Height reveal           | Note: Kling reverses this |
| **Dolly**     | Forward/backward      | Approach, intensity     | Runway, Luma, Veo         |
| **Truck**     | Sideways move         | Parallel to action      | Natural language          |
| **Crane**     | Up/down on arm        | Dramatic reveal         | Veo, Runway               |
| **Orbit**     | Circle around subject | 360° view, products     | Runway, Luma              |
| **Push in**   | Slow forward movement | Emphasis, tension       | Minimax, Luma             |
| **Pull back** | Slow backward         | Reveal context          | Minimax, Luma             |
| **Drone**     | Aerial movement       | Establishing, landscape | Natural language          |
| **Handheld**  | Intentional shake     | Documentary, tension    | Natural language          |

### Subject Motion Verbs

| Type              | Verbs                                                         |
| ----------------- | ------------------------------------------------------------- |
| **Locomotion**    | walks, runs, crawls, floats, flies, glides, strides, shuffles |
| **Gesture**       | reaches, points, waves, grasps, lifts, sets down, touches     |
| **Expression**    | smiles slowly, eyes widen, brows furrow, head turns           |
| **Interaction**   | picks up, places down, exchanges, catches, throws             |
| **Natural**       | breathes, blinks, shifts weight, adjusts posture              |
| **Environmental** | leaves fall, water flows, clouds drift, flames dance          |
| **Dance**         | spins, leaps, twirls, sways, steps, pirouettes                |

### Pacing & Speed Descriptors

| Term | Speed | Use Case |
|------|-------|----------|
| **Slow motion** | 0.25-0.5x | Dramatic emphasis, beauty shots, action highlights |
| **Gradually** | Natural progression | Smooth transitions, environmental changes |
| **Slowly** | Deliberate pace | Contemplative mood, reveal shots |
| **Briskly** | Quick but controlled | Energetic scenes, urgency |
| **Suddenly** | Abrupt | Surprise, action beats, impact moments |
| **Seamlessly** | Invisible transition | Professional flow, continuous motion |
| **Rhythmically** | To beat | Music-driven content, dance, synchronized action |
| **Accelerating** | Building speed | Tension building, pursuit sequences |
| **Decelerating** | Slowing down | Resolution, landing moments, dramatic pause |
| **Continuously** | Unbroken flow | Long takes, uninterrupted motion |
| **Intermittently** | Start-stop | Flickering, pulsing, rhythmic pauses |

### Atmospheric Descriptors

| Category     | Terms                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| **Lighting** | golden hour, blue hour, harsh midday, soft diffused, dramatic shadows, rim lighting, volumetric rays |
| **Weather**  | misty, foggy, rain-soaked, sun-dappled, stormy, clear blue, overcast                                 |
| **Mood**     | serene, tense, mysterious, joyful, melancholic, energetic, dreamlike                                 |
| **Texture**  | crisp, soft, gritty, polished, organic, industrial                                                   |

---

## 9. ⚠️ ANTI-PATTERNS

### Universal Anti-Patterns (All Platforms)

| Anti-Pattern             | Problem                       | Transform To                        |
| ------------------------ | ----------------------------- | ----------------------------------- |
| **Static description**   | "A car on a road"             | "A car drives along a winding road" |
| **Negative prompts**     | "no blur, no grain"           | Remove entirely                     |
| **Multiple scenes**      | "forest then city"            | One continuous scene                |
| **Discrete states**      | "happy, then sad"             | "Expression gradually shifts"       |
| **Missing camera**       | "Person walking"              | "Tracking shot follows person"      |
| **Too long**             | 30-second description         | Break into 5-10 second clips        |
| **Quality keywords**     | "4K, 8K, ultra HD"            | Remove entirely                     |
| **Contradicting motion** | "zooms in while pulling back" | Choose one direction                |
| **Vague timing**         | "eventually"                  | "over 5 seconds"                    |

### Platform-Specific Anti-Patterns

| Platform      | Avoid                      | Use Instead                     |
| ------------- | -------------------------- | ------------------------------- |
| **Runway**    | Natural language camera    | "Dolly forward:" prefix         |
| **Sora**      | Camera command prefixes    | Natural language description    |
| **Kling**     | "pan left/right"           | "move left/right" or "tilt"     |
| **Veo**       | Skipping audio description | Always include "Audio:" section |
| **Minimax**   | Prompts over 6 seconds     | Chain shorter clips             |
| **Wan**       | Prompts under 80 words     | Expand to 80-120 words          |
| **OmniHuman** | Text-only prompts          | Provide audio input             |

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

## 10. ✨ TRANSFORMATION EXAMPLES

### Example 1: Basic Scene (Runway Gen-4)

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

---

### Example 2: Action Scene (Sora)

**Input:**
```
car driving mountain road
```

**Output:**
```
The camera tracks a vintage red convertible as it winds along a dramatic
coastal mountain road at golden hour. The Pacific Ocean glitters hundreds
of feet below the winding asphalt.

The camera smoothly orbits from behind to profile view, maintaining pace
with the vehicle. The driver's silk scarf billows in the warm wind.
Waves crash against rocky cliffs visible in the distance.
Long shadows stretch across the road surface as the car hugs each curve
with confident precision.

Cinematic wide-screen composition with subtle film grain.
The atmosphere evokes nostalgic summer adventure.
```

**VISUAL Score:** 64/70

---

### Example 3: Audio-Enabled Scene (Veo 3.1+)

**Input:**
```
waterfall nature beautiful
```

**Output:**
```
Crane down: Camera descends alongside a thundering waterfall, mist
swirling as it catches golden afternoon light. Rainbow fragments
appear and dissolve in the spray with each passing second.

The camera levels out at the churning pool below, water frothing white
before flowing into a serene river downstream. Ancient ferns and
emerald moss blanket the surrounding volcanic rocks.
Slow motion captures individual water droplets catching prismatic light.

Epic nature documentary aesthetic, pristine wilderness atmosphere.

Audio: Deep resonant rumble of cascading water, subtle bird calls echoing
through the canyon, gentle wind carrying fine mist, occasional splash
of water against rocks.
```

**VISUAL Score:** 68/70

---

### Example 4: Avatar Animation (OmniHuman)

**Input:**
```
podcast host talking to camera
```

**Output:**
```
Professional podcast host seated at modern desk, natural posture
and engaging presence. Medium shot framing from chest up.

Animation style: naturalistic with subtle expressiveness.
Setting: Contemporary studio with soft ring light, blurred
background showing audio equipment.
Camera: Static medium shot with slight depth of field.
Motion intensity: moderate - natural gestures and head movement.

Audio-driven: Conversational speech with occasional emphasis,
natural pauses and listening expressions between statements.
```

**VISUAL Score:** 58/70

---

### Example 5: Multi-Shot Sequence (Seedance 1.5 Pro)

**Input:**
```
dancer performing on stage
```

**Output:**
```
[Shot 1]: Close-up on dancer's face, eyes closed in concentration,
spotlight creating rim light on features. Subtle breath visible.

[Shot 2]: Camera pulls back revealing full figure as dancer begins
first movement, arms extending gracefully upward.

[Shot 3]: Wide shot of full stage, dancer spinning center stage,
flowing costume creating motion blur, theatrical lighting.

Warm amber stage lighting against dark background.
Dust particles visible in light beams.
Audience silhouettes barely visible in foreground.

Audio: Orchestral strings building in intensity, dancer's
soft footfalls on wood floor, fabric rustling with movement,
subtle audience presence.

Style: Cinematic dance documentary, emotional and intimate.
```

**VISUAL Score:** 66/70

---

### Example 6: Text-in-Video (Wan 2.1)

**Input:**
```
countdown timer for new year
```

**Output:**
```
Dramatic close-up of ornate vintage clock face, golden hands
approaching midnight. Rich wood grain visible on clock body.
Soft warm lighting creates intimate atmosphere.

The second hand sweeps smoothly toward twelve.
Camera slowly pushes in as tension builds.
Background bokeh of celebration lights twinkles.

Display text: "2025" appears as golden overlay,
then transforms to "HAPPY NEW YEAR" as clock strikes.

Confetti begins falling in slow motion,
catching light with metallic shimmer.
Rich color grade with deep shadows and warm highlights.

Starts as: Clock showing 11:59:55
Ends as: Clock at 12:00:00 with celebration text overlay.
```

**VISUAL Score:** 62/70

---

## 11. 🔄 ITERATIVE REFINEMENT FLOW

### Post-Delivery Question (MANDATORY)

After delivering the enhanced prompt, **always ask the user to share their result** for iterative refinement:

```markdown
---

**🎬 Share Your Generated Video for Refinement**

Try this prompt in your AI video generator and share the result with me!

Upload the video, share a link, or describe what was generated, and I can help you:
- **Refine motion** if camera movement or subject action isn't right
- **Adjust pacing** if the temporal flow needs tweaking
- **Fix consistency** if there are visual artifacts or style drift
- **Enhance atmosphere** if lighting, mood, or audio needs work

Just share the result and tell me what you'd like to change.
```

### Refinement Conversation Patterns

**When user shares result:**

```yaml
refinement_triggers:
  video_feedback:
    - "Here's what it generated"
    - "This is the result"
    - "[video uploaded/link shared]"
    - "The motion isn't right"
    - "It's too fast/slow"
    - "The camera movement is wrong"

  refinement_actions:
    analyze_result:
      - Compare output to MOTION elements
      - Identify temporal/movement issues
      - Note consistency problems
      - Check audio sync (if applicable)

    propose_adjustments:
      - Camera movement changes (M)
      - Starting frame adjustments (O)
      - Duration/pacing tweaks (T)
      - Narrative clarity (I)
      - Choreography refinement (O)
      - Atmospheric details (N)

    generate_refined_prompt:
      - Apply MOTION framework adjustments
      - Re-score with VISUAL (70pt)
      - Deliver updated prompt
```

**Refinement Response Template:**

```markdown
**🔍 Analysis of Generated Video:**
- **What worked:** [Elements that matched intent]
- **Gap identified:** [Motion/temporal issues]
- **Likely cause:** [Prompt interpretation issue]

**🔧 MOTION Adjustment:**
- **M** (Movement): [Camera/subject motion changes]
- **O** (Origin): [Starting frame adjustments]
- **T** (Temporal): [Duration/pacing changes]
- **I** (Intention): [Narrative clarity]
- **O** (Orchestration): [Element coordination]
- **N** (Nuance): [Atmosphere/audio adjustments]

**✨ Refined Prompt:**
[Updated prompt with modifications]

---
Generate with this refined prompt and share the new result!
```

### Iteration Best Practices

| Iteration | Focus | Typical Adjustments |
|-----------|-------|---------------------|
| 1st | Motion validation | Camera type, movement direction |
| 2nd | Temporal calibration | Pacing, duration, keyframes |
| 3rd | Consistency polish | Subject stability, style coherence |
| 4th+ | Detail refinement | Atmosphere, audio, nuances |

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

## 12. 🏎️ QUICK REFERENCE

### MOTION Checklist
- [ ] **M**ovement: Camera AND subject motion defined?
- [ ] **O**rigin: Starting visual established?
- [ ] **T**emporal: Duration and pacing specified?
- [ ] **I**ntention: Narrative purpose clear?
- [ ] **O**rchestration: Multiple elements coordinated?
- [ ] **N**uance: Atmospheric details + audio (if supported)?

### Platform Quick Guide

| Platform      | Max  | Camera Syntax         | Negatives | Audio     | Key Strength            |
| ------------- | ---- | --------------------- | --------- | --------- | ----------------------- |
| Runway Gen-4  | 10s  | Prefix required       | No        | No        | Camera control          |
| Sora          | 20s  | Natural language      | No        | No        | Physics, cinematography |
| Kling 2.5/2.6 | 5min | Brackets, reversed    | No        | 2.6 only  | Duration, I2V           |
| Veo 3.1+      | 148s | Natural language      | No        | **Yes**   | Audio, cinematography   |
| Pika 2.5      | 10s  | Scene ingredients     | No        | No        | Modifications           |
| Luma Ray3     | 10s  | Keyframes + [Camera:] | No        | No        | Speed, keyframes        |
| Minimax       | 6s   | [Brackets]            | No        | No        | Quality, consistency    |
| Seedance      | 10s  | Multi-shot syntax     | No        | **Yes**   | Audio-visual sync       |
| OmniHuman     | 30s  | Audio-driven          | No        | **Input** | Avatar animation        |
| Wan           | 5s   | Natural language      | No        | No        | Text, FLF2V             |

### Word Count by Generation Type

| Type                | Platform Range      | Recommended              |
| ------------------- | ------------------- | ------------------------ |
| **Text-to-video**   | 50-120 words        | Match platform spec      |
| **Image-to-video**  | 20-40 words         | Motion description only  |
| **Video extension** | 15-30 words         | Continue existing motion |
| **Audio-driven**    | 30-50 words + audio | OmniHuman, audio input   |

### Score Targets

| Score | Grade | Action |
|-------|-------|--------|
| **63-70** | Excellent | Ship immediately |
| **56-62** | Good | Ready for generation |
| **49-55** | Adequate | Minor refinements needed |
| **<49** | Needs work | Significant enhancement required |

### Audio Integration Checklist (Audio-Enabled Platforms)
- [ ] Platform supports native audio? (Veo 3.1+, Kling 2.6, Seedance)
- [ ] Audio section included at prompt end?
- [ ] Ambient sounds described?
- [ ] Action-synchronized sounds included?
- [ ] Music/atmosphere specified if relevant?

---

*Video Mode transforms static descriptions into dynamic, motion-focused prompts optimized for 2025-2026 generation AI video platforms with full audio integration support.*
