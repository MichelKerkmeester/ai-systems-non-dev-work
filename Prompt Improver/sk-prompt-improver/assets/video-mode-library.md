---
title: "Video Mode Library"
description: "Reusable video platform syntax, mental models, temporal banks, examples and refinement templates."
version: "0.101"
contextType: asset
importance_tier: normal
trigger_phrases:
  - "$video assets"
  - "video platform syntax"
  - "MOTION examples"
  - "temporal consistency"
  - "video refinement templates"
---

# Video Mode Library - v0.101

Reusable video platform syntax, mental models, temporal guidance, examples, refinement templates and quick lookups for video prompts.

---

## 1. OVERVIEW

### Purpose

Provides copyable video-generation syntax, platform mental models, duration/audio/vocabulary banks, examples, refinement templates and quick reference material separated from the Video Mode workflow.

### Usage

Load this with `references/video-mode.md` for `$video` or `$vid` work. Copy, adapt or consult the relevant section after the reference workflow identifies the target platform, duration and MOTION needs.

---

## 4. PLATFORM OPTIMIZATION

### Platform Detection & Capabilities

- **Runway Gen-4/4.5**
  - Detection Keywords: "runway", "gen-4", "gen-4.5"
  - Max Duration: 10 sec
  - Native Audio: No
  - Best Strength: Camera control, I2V
- **Sora**
  - Detection Keywords: "sora", "openai video"
  - Max Duration: 20 sec (API)
  - Native Audio: No
  - Best Strength: Cinematography, physics
- **Kling 2.5/2.6**
  - Detection Keywords: "kling", "kuaishou"
  - Max Duration: 5 min
  - Native Audio: Yes (2.6)
  - Best Strength: Long duration, I2V
- **Veo 3.1+**
  - Detection Keywords: "veo", "google video"
  - Max Duration: 148 sec
  - Native Audio: Yes
  - Best Strength: Native audio, cinematography
- **Pika 2.5**
  - Detection Keywords: "pika"
  - Max Duration: 10 sec
  - Native Audio: No
  - Best Strength: Modifications, lip-sync
- **Luma Ray3**
  - Detection Keywords: "luma", "dream machine"
  - Max Duration: 10 sec
  - Native Audio: No
  - Best Strength: Speed, keyframes
- **Minimax/Hailuo**
  - Detection Keywords: "minimax", "hailuo"
  - Max Duration: 6 sec
  - Native Audio: No
  - Best Strength: Quality, director mode
- **Seedance 1.5 Pro**
  - Detection Keywords: "seedance", "bytedance video"
  - Max Duration: 10 sec
  - Native Audio: Yes
  - Best Strength: Audio-visual sync
- **OmniHuman 1.5**
  - Detection Keywords: "omnihuman", "avatar"
  - Max Duration: 30 sec
  - Native Audio: Audio-driven
  - Best Strength: Full-body animation
- **Wan 2.1/2.2**
  - Detection Keywords: "wan", "alibaba video"
  - Max Duration: 5 sec
  - Native Audio: No
  - Best Strength: Text rendering, FLF2V

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

---

## 5. PLATFORM MENTAL MODELS

Understanding how each AI video platform "thinks" helps craft prompts that align with its internal logic.

- **Runway Gen-4.5**
  - Metaphor: Kinetic Sculptor
  - Thinking Style: Physics, forces, motion vectors
  - Prompt Focus: Describe forces acting on objects, motion paths
  - Example: "The car accelerates forward with increasing momentum, wheels gripping the wet asphalt"
- **Sora 2**
  - Metaphor: Physics Simulator
  - Thinking Style: Cause-and-effect, world logic, physics
  - Prompt Focus: Describe causal chains, realistic interactions
  - Example: "Water splashes as the ball impacts the surface, ripples spreading outward"
- **Kling 2.6**
  - Metaphor: Audio-Visual Choreographer
  - Thinking Style: Timeline, beats, synchronization
  - Prompt Focus: Timeline structure, beat markers, audio sync
  - Example: "On the first beat, the dancer spins. On the second, arms extend outward."
- **Veo 3.1**
  - Metaphor: Rendering Engine
  - Thinking Style: Structured data, references, parameters
  - Prompt Focus: Clear specifications, reference-style data
  - Example: "CAMERA: dolly forward. SUBJECT: woman walking. LIGHTING: golden hour. AUDIO: ambient street sounds"

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

- **Action sequences, vehicles, sports**
  - Best Mental Model: Runway (Kinetic Sculptor)
  - Why: Excels at force and momentum
- **Natural phenomena, cause-effect chains**
  - Best Mental Model: Sora (Physics Simulator)
  - Why: Strong world simulation
- **Music videos, dance, rhythmic content**
  - Best Mental Model: Kling (Audio-Visual Choreographer)
  - Why: Timeline-based thinking
- **Structured scenes, multi-element shots**
  - Best Mental Model: Veo (Rendering Engine)
  - Why: Handles complex specifications

---

---

## 6. TEMPORAL CONSISTENCY

### Duration Guidelines by Platform

- **Runway Gen-4**
  - Optimal Clip: 5-10 sec
  - Extended: Chain clips
  - Word Count: 50-80 (T2V), 20-40 (I2V)
- **Sora**
  - Optimal Clip: 8-12 sec
  - Extended: Up to 20 sec
  - Word Count: 50-100
- **Kling 2.5/2.6**
  - Optimal Clip: 5-10 sec
  - Extended: Up to 5 min
  - Word Count: 60-100
- **Veo 3.1+**
  - Optimal Clip: 8 sec
  - Extended: Up to 148 sec
  - Word Count: 80-120
- **Pika 2.5**
  - Optimal Clip: 3-5 sec
  - Extended: Up to 10 sec
  - Word Count: 30-60
- **Luma Ray3**
  - Optimal Clip: 5-10 sec
  - Extended: Chain clips
  - Word Count: 40-70
- **Minimax**
  - Optimal Clip: 6 sec
  - Extended: Chain clips
  - Word Count: 40-70
- **Seedance**
  - Optimal Clip: 5-10 sec
  - Extended: Chain clips
  - Word Count: 60-90
- **OmniHuman**
  - Optimal Clip: 10-30 sec
  - Extended: Audio-determined
  - Word Count: 30-50 + audio
- **Wan**
  - Optimal Clip: 3-5 sec
  - Extended: Chain clips
  - Word Count: 80-120

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

- **Subject morphing**
  - Cause: Too many details
  - Fix: Focus on motion, not appearance
- **Scene changing**
  - Cause: Multiple locations
  - Fix: One setting per clip
- **Speed inconsistency**
  - Cause: Vague pacing
  - Fix: Specify "slowly", "gradually"
- **Abrupt endings**
  - Cause: No end state
  - Fix: Describe through-motion
- **Audio desync**
  - Cause: Timing mismatch
  - Fix: Match audio cues to visual beats
- **Character drift**
  - Cause: Long duration
  - Fix: Use shorter clips, chain together

---

## 7. AUDIO INTEGRATION

### Platforms with Native Audio

- **Veo 3.1+**
  - Audio Type: Full audio (ambient, speech, music)
  - Integration Method: "Audio: [description]" at end
- **Kling 2.6**
  - Audio Type: Ambient and effects
  - Integration Method: "with the sound of..."
- **Seedance 1.5 Pro**
  - Audio Type: Full audio + lip-sync
  - Integration Method: Inline descriptions + Audio: section
- **OmniHuman 1.5**
  - Audio Type: Audio-driven (input required)
  - Integration Method: Upload audio file

### Platform-Specific Audio Syntax

- **Veo 3.1+**
  - Syntax Style: Labeled section
  - Position: End of prompt
  - Example: `Audio: Deep rumble of thunder, rain pattering on windows, distant traffic`
- **Kling 2.6**
  - Syntax Style: Natural language inline
  - Position: End of scene description
  - Example: `...with the sound of coffee grinding, milk frothing, and soft jazz playing`
- **Seedance 1.5 Pro**
  - Syntax Style: Labeled section
  - Position: After visual description
  - Example: `Audio: Piano melody, dancer's footfalls on wood, fabric rustling with movement`

### Audio Categories & Best Practices

- **Ambient**
  - Description: Environmental background sounds
  - Prompt Examples: "gentle wind rustling through leaves", "distant city traffic hum", "ocean waves lapping against shore", "quiet office with keyboard typing"
- **Action**
  - Description: Sounds triggered by visual events
  - Prompt Examples: "footsteps on gravel path", "door creaking open slowly", "car engine revving", "glass clinking"
- **Music**
  - Description: Background or featured music
  - Prompt Examples: "soft piano melody", "upbeat electronic music", "orchestral crescendo", "lo-fi beats"
- **Speech**
  - Description: Dialogue or vocal elements
  - Prompt Examples: "character speaks with [emotion]", "narrator describes scene", "crowd murmurs in background"
- **Silence**
  - Description: Intentional absence of sound
  - Prompt Examples: "quiet tension", "muffled world", "vacuum of space"

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

## 8. VOCABULARY BANKS

### Physics Descriptors

- **Rigidity**
  - Description: Object maintains shape during motion
  - Example: "The car remains rigid and solid throughout the turn"
- **Gravity**
  - Description: Objects obey gravitational physics
  - Example: "No floating, no defiance of gravity"
- **Impact**
  - Description: Collision effects are realistic
  - Example: "Collision creates debris, dust, appropriate sound"
- **Momentum**
  - Description: Motion continues naturally
  - Example: "Gradual acceleration, natural deceleration"
- **Inertia**
  - Description: Objects resist changes in motion
  - Example: "The cape continues swinging after she stops"
- **Friction**
  - Description: Surface interaction affects motion
  - Example: "Tires grip the wet asphalt, slight skid on corners"
- **Elasticity**
  - Description: Bounce and deformation behavior
  - Example: "The ball compresses slightly on impact, rebounds"
- **Fluid dynamics**
  - Description: Liquid and gas motion behavior
  - Example: "Smoke billows and disperses naturally, water flows around obstacles"

### Motion Troubleshooting Guide

- **Object morphing**
  - Cause: Insufficient rigidity description
  - Solution: Add rigidity descriptors, specify material properties ("solid metal frame", "rigid structure")
- **Floating objects**
  - Cause: Missing gravity anchoring
  - Solution: Add gravity cues, ground contact descriptions ("feet planted firmly", "tires gripping road")
- **Jittery motion**
  - Cause: Too many rapid changes
  - Solution: Add smooth motion qualifiers, longer transitions ("smoothly", "continuously", "fluid motion")
- **Unrealistic physics**
  - Cause: Missing cause-effect chain
  - Solution: Describe physical consequences ("impact creates dust", "momentum carries forward")
- **Limbs/parts detaching**
  - Cause: Body coherence not specified
  - Solution: Add structural integrity cues ("body moves as one unit", "connected, coordinated movement")
- **Unnatural speed**
  - Cause: Vague pacing instructions
  - Solution: Add explicit timing ("over 3 seconds", "gradually accelerating")
- **Objects passing through**
  - Cause: Missing collision description
  - Solution: Describe physical interaction ("bounces off", "deflects", "stops against")

### Camera Movement

- **Static**
  - Description: Camera doesn't move
  - Best For: Dialogue, detail shots
  - Platform Notes: All platforms
- **Pan**
  - Description: Horizontal rotation
  - Best For: Reveal, follow action
  - Platform Notes: Note: Kling reverses this
- **Tilt**
  - Description: Vertical rotation
  - Best For: Height reveal
  - Platform Notes: Note: Kling reverses this
- **Dolly**
  - Description: Forward/backward
  - Best For: Approach, intensity
  - Platform Notes: Runway, Luma, Veo
- **Truck**
  - Description: Sideways move
  - Best For: Parallel to action
  - Platform Notes: Natural language
- **Crane**
  - Description: Up/down on arm
  - Best For: Dramatic reveal
  - Platform Notes: Veo, Runway
- **Orbit**
  - Description: Circle around subject
  - Best For: 360° view, products
  - Platform Notes: Runway, Luma
- **Push in**
  - Description: Slow forward movement
  - Best For: Emphasis, tension
  - Platform Notes: Minimax, Luma
- **Pull back**
  - Description: Slow backward
  - Best For: Reveal context
  - Platform Notes: Minimax, Luma
- **Drone**
  - Description: Aerial movement
  - Best For: Establishing, landscape
  - Platform Notes: Natural language
- **Handheld**
  - Description: Intentional shake
  - Best For: Documentary, tension
  - Platform Notes: Natural language

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

- **Slow motion**
  - Speed: 0.25-0.5x
  - Use Case: Dramatic emphasis, beauty shots, action highlights
- **Gradually**
  - Speed: Natural progression
  - Use Case: Smooth transitions, environmental changes
- **Slowly**
  - Speed: Deliberate pace
  - Use Case: Contemplative mood, reveal shots
- **Briskly**
  - Speed: Quick but controlled
  - Use Case: Energetic scenes, urgency
- **Suddenly**
  - Speed: Abrupt
  - Use Case: Surprise, action beats, impact moments
- **Seamlessly**
  - Speed: Invisible transition
  - Use Case: Professional flow, continuous motion
- **Rhythmically**
  - Speed: To beat
  - Use Case: Music-driven content, dance, synchronized action
- **Accelerating**
  - Speed: Building speed
  - Use Case: Tension building, pursuit sequences
- **Decelerating**
  - Speed: Slowing down
  - Use Case: Resolution, landing moments, dramatic pause
- **Continuously**
  - Speed: Unbroken flow
  - Use Case: Long takes, uninterrupted motion
- **Intermittently**
  - Speed: Start-stop
  - Use Case: Flickering, pulsing, rhythmic pauses

### Atmospheric Descriptors

| Category     | Terms                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| **Lighting** | golden hour, blue hour, harsh midday, soft diffused, dramatic shadows, rim lighting, volumetric rays |
| **Weather**  | misty, foggy, rain-soaked, sun-dappled, stormy, clear blue, overcast                                 |
| **Mood**     | serene, tense, mysterious, joyful, melancholic, energetic, dreamlike                                 |
| **Texture**  | crisp, soft, gritty, polished, organic, industrial                                                   |

---

---

## 10. TRANSFORMATION EXAMPLES

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

---

## 11. ITERATIVE REFINEMENT FLOW

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

---

## 12. QUICK REFERENCE

### MOTION Checklist
- [ ] **M**ovement: Camera AND subject motion defined?
- [ ] **O**rigin: Starting visual established?
- [ ] **T**emporal: Duration and pacing specified?
- [ ] **I**ntention: Narrative purpose clear?
- [ ] **O**rchestration: Multiple elements coordinated?
- [ ] **N**uance: Atmospheric details + audio (if supported)?

### Platform Quick Guide

- **Runway Gen-4**
  - Max: 10s
  - Camera Syntax: Prefix required
  - Negatives: No
  - Audio: No
  - Key Strength: Camera control
- **Sora**
  - Max: 20s
  - Camera Syntax: Natural language
  - Negatives: No
  - Audio: No
  - Key Strength: Physics, cinematography
- **Kling 2.5/2.6**
  - Max: 5min
  - Camera Syntax: Brackets, reversed
  - Negatives: No
  - Audio: 2.6 only
  - Key Strength: Duration, I2V
- **Veo 3.1+**
  - Max: 148s
  - Camera Syntax: Natural language
  - Negatives: No
  - Audio: **Yes**
  - Key Strength: Audio, cinematography
- **Pika 2.5**
  - Max: 10s
  - Camera Syntax: Scene ingredients
  - Negatives: No
  - Audio: No
  - Key Strength: Modifications
- **Luma Ray3**
  - Max: 10s
  - Camera Syntax: Keyframes + [Camera:]
  - Negatives: No
  - Audio: No
  - Key Strength: Speed, keyframes
- **Minimax**
  - Max: 6s
  - Camera Syntax: [Brackets]
  - Negatives: No
  - Audio: No
  - Key Strength: Quality, consistency
- **Seedance**
  - Max: 10s
  - Camera Syntax: Multi-shot syntax
  - Negatives: No
  - Audio: **Yes**
  - Key Strength: Audio-visual sync
- **OmniHuman**
  - Max: 30s
  - Camera Syntax: Audio-driven
  - Negatives: No
  - Audio: **Input**
  - Key Strength: Avatar animation
- **Wan**
  - Max: 5s
  - Camera Syntax: Natural language
  - Negatives: No
  - Audio: No
  - Key Strength: Text, FLF2V

### Word Count by Generation Type

- **Text-to-video**
  - Platform Range: 50-120 words
  - Recommended: Match platform spec
- **Image-to-video**
  - Platform Range: 20-40 words
  - Recommended: Motion description only
- **Video extension**
  - Platform Range: 15-30 words
  - Recommended: Continue existing motion
- **Audio-driven**
  - Platform Range: 30-50 words + audio
  - Recommended: OmniHuman, audio input

### Score Targets

- **63-70**
  - Grade: Excellent
  - Action: Ship immediately
- **56-62**
  - Grade: Good
  - Action: Ready for generation
- **49-55**
  - Grade: Adequate
  - Action: Minor refinements needed
- **<49**
  - Grade: Needs work
  - Action: Significant enhancement required

### Audio Integration Checklist (Audio-Enabled Platforms)
- [ ] Platform supports native audio? (Veo 3.1+, Kling 2.6, Seedance)
- [ ] Audio section included at prompt end?
- [ ] Ambient sounds described?
- [ ] Action-synchronized sounds included?
- [ ] Music/atmosphere specified if relevant?
