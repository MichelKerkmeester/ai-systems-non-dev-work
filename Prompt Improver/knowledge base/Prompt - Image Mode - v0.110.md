# Prompt - Image Mode - v0.110

Specialized mode for optimizing prompts for AI image generators including Flux 2 Pro, Google Imagen 4 (Nano Banana Pro), Runway, Midjourney, DALL-E 3, Stable Diffusion, Seedream, Leonardo, and Ideogram.

**Loading Condition:** TRIGGER
**Purpose:** Transform vague visual requests into structured, platform-optimized image prompts using the FRAME framework and VISUAL scoring system.
**Scope:** Image generation prompts, platform-specific optimization, composition vocabulary, style references, anti-pattern detection.

---

## 📋 TABLE OF CONTENTS

1. [🎯 OBJECTIVE](#1--objective)
2. [🖼️ FRAME FRAMEWORK](#2-️-frame-framework)
3. [📊 VISUAL SCORING (IMAGE)](#3--visual-scoring-image)
4. [🎨 PLATFORM OPTIMIZATION](#4--platform-optimization)
5. [📐 COMPOSITION & FRAMING](#5--composition--framing)
6. [🎭 STYLE & AESTHETICS](#6--style--aesthetics)
7. [📚 VOCABULARY BANKS](#7--vocabulary-banks)
8. [⚠️ ANTI-PATTERNS](#8-️-anti-patterns)
9. [✨ TRANSFORMATION EXAMPLES](#9--transformation-examples)
10. [🔄 ITERATIVE REFINEMENT FLOW](#10--iterative-refinement-flow)
11. [🏎️ QUICK REFERENCE](#11-️-quick-reference)

---

## 1. 🎯 OBJECTIVE

Transform vague visual descriptions into detailed, evocative prompts optimized for AI image generators.

**Commands:** `$image`, `$img`
**DEPTH Rounds:** 5 (creative iteration)
**Framework:** FRAME
**Scoring:** VISUAL (60 points, 48+ threshold)

**Core Philosophy:**
> "Describe what you see, feel, and sense—not what you want the AI to figure out."

**Key Principles:**
1. **Subject first** - Lead with the main focus, add context after
2. **Specificity over abstraction** - "Golden retriever puppy" not "dog"
3. **No negative prompts on newer models** - Flux 2 Pro, Imagen 4 ignore them
4. **Natural language** - Modern models prefer conversational prompts
5. **Platform awareness** - Each generator has unique syntax and strengths
6. **Reference images** - Use when available for consistency (multi-reference supported)

---

## 2. 🖼️ FRAME FRAMEWORK

| Element        | Focus                 | Core Question                    | Weight |
| -------------- | --------------------- | -------------------------------- | ------ |
| **F**ocus      | Subject & Composition | "What is the viewer looking at?" | 30%    |
| **R**endering  | Medium & Style        | "How should it be visualized?"   | 20%    |
| **A**tmosphere | Lighting & Mood       | "What feeling does it evoke?"    | 20%    |
| **M**odifiers  | Technical Parameters  | "What constraints apply?"        | 15%    |
| **E**xclusions | Negative Guidance     | "What should be avoided?"        | 15%    |

### FRAME Application Process

```yaml
frame_process:
  round_1_discover:
    - Identify primary subject
    - Detect platform hints
    - Note style references
    - Check for reference images

  round_2_engineer:
    - Define composition (shot type, framing)
    - Specify rendering style (medium, aesthetic)
    - Establish atmosphere (lighting, mood)
    - Identify platform-specific parameters

  round_3_prototype:
    - Build complete prompt
    - Apply platform-specific syntax
    - Add technical modifiers
    - Handle exclusions appropriately

  round_4_test:
    - Score with VISUAL (60pt)
    - Check for vague descriptions
    - Verify platform compatibility
    - Validate no anti-patterns

  round_5_harmonize:
    - Final polish
    - Optimize token usage
    - Format for delivery
    - Add platform parameters
```

---

## 3. 📊 VISUAL SCORING (IMAGE)

| Dimension       | Points | Threshold | What It Measures                  |
| --------------- | ------ | --------- | --------------------------------- |
| **V**ivid       | 15     | 12+       | Creates clear mental imagery      |
| **I**ntentional | 10     | 8+        | Clear compositional purpose       |
| **S**tyled      | 10     | 8+        | Defined visual aesthetic          |
| **U**nambiguous | 10     | 8+        | No conflicting style instructions |
| **A**tmospheric | 10     | 8+        | Lighting, mood, color defined     |
| **L**ayered     | 5      | 4+        | Depth in scene composition        |
| **Total**       | **60** | **48+**   | Quality threshold                 |

---

## 4. 🎨 PLATFORM OPTIMIZATION

### Platform Detection & Capabilities

| Platform                       | Detection Keywords                      | Negative Prompts | Key Strength                         |
| ------------------------------ | --------------------------------------- | ---------------- | ------------------------------------ |
| **Flux 2 Pro**                 | "flux", "bfl"                           | No (ignored)     | Photorealism, natural language       |
| **Imagen 4 / Nano Banana Pro** | "imagen", "nano banana", "gemini image" | No (ignored)     | Text accuracy (95%), multi-reference |
| **Runway**                     | "runway", "gen-4 image"                 | No               | Video frame consistency              |
| **Midjourney v6.1**            | "midjourney", "mj", "--ar"              | Partial          | Artistic, stylized                   |
| **DALL-E 3**                   | "dall-e", "dalle", "openai"             | No               | Prompt following, text               |
| **Stable Diffusion 3**         | "sd", "sdxl", "stable diffusion"        | Yes (effective)  | Control, LoRA, customization         |
| **Seedream**                   | "seedream", "bytedance image"           | No               | Speed, consistency                   |
| **Leonardo**                   | "leonardo"                              | Yes              | Stylized art, characters             |
| **Ideogram 3.0**               | "ideogram"                              | No               | Text rendering, logos                |

### Platform-Specific Syntax

---

**Flux 2 Pro (Black Forest Labs):**
```
Key Characteristics:
- 32 billion parameters
- Natural language understanding (no keyword stuffing)
- NO negative prompts (completely ignored)
- Supports HEX color codes directly: "dress in #FF6B6B coral"
- Multi-reference images: up to 10 reference images
- JSON prompting for structured control

Optimal Prompt Structure (15-75 words):
[Subject with specific details]. [Action or pose].
[Setting with atmosphere]. [Lighting description].
[Color palette or specific colors]. [Style reference].
[Composition/framing].

Example:
A young woman with auburn hair in a vintage emerald dress,
sitting at a Parisian cafe terrace at golden hour.
Dappled sunlight through plane trees, soft bokeh background.
Editorial fashion photography, Kodak Portra 400 aesthetic.
Medium shot, shallow depth of field.

Pro Tips:
- Use natural sentences, not keyword lists
- Specify exact colors with HEX when precision needed
- Reference specific film stocks or photography styles
- Avoid: weighted syntax, negative prompts, quality keywords
```

---

**Imagen 4 / Nano Banana Pro (Google):**
```
Key Characteristics:
- 95% text rendering accuracy (best in class)
- Up to 14 reference images for consistency
- "Thinking" capability for complex prompts
- Native aspect ratio selection
- Strong photorealism and illustration

Optimal Prompt Structure (30-100 words):
[Detailed subject description]. [Pose or action].
[Environment with specific details]. [Lighting conditions].
[Style: photorealistic/illustration/artistic].
[Mood and atmosphere]. [Any text to render in quotes].

Text Rendering:
- Place text in quotes: 'Sign reads "OPEN"'
- Specify font style: "bold sans-serif text"
- Indicate placement: "text overlay at bottom"

Example:
Professional product photograph of a minimalist watch
on a black marble surface. The watch face displays "APEX"
in elegant serif typography. Dramatic side lighting creates
long shadows. Sharp focus, luxury advertisement aesthetic.
Clean composition with negative space.

Pro Tips:
- Strong at text rendering - use for logos, signs, labels
- Leverage multi-reference for character consistency
- Specify aspect ratio explicitly when needed
- Avoid: negative prompts, complex multi-scene requests
```

---

**Midjourney v6.1:**
```
Key Parameters:
--ar [ratio]     : Aspect ratio (16:9, 3:2, 1:1, 9:16)
--s [0-1000]     : Stylization (0=accurate, 1000=artistic)
--c [0-100]      : Chaos/variety (higher=more variation)
--q [.25,1,2]    : Quality (affects generation time)
--style raw      : Less Midjourney aesthetic influence
--sref [url]     : Style reference image
--cref [url]     : Character reference image
--no [item]      : Partial negative support

Optimal Prompt Structure:
[Subject], [action/pose], [setting], [lighting],
[art style], [mood], [composition] --ar [ratio] --s [value]

Example:
Portrait of a cyberpunk hacker, neon-lit Tokyo alley,
rain-slicked streets reflecting holographic advertisements,
blade runner aesthetic, dramatic rim lighting,
cinematic composition --ar 16:9 --s 500 --style raw

Pro Tips:
- Use --style raw for photorealism
- --sref for consistent style across images
- --cref for character consistency
- Lower --s for accuracy, higher for artistic interpretation
```

---

**DALL-E 3:**
```
Key Characteristics:
- Excellent prompt following
- Good text rendering capability
- Natural language preferred
- No negative prompts
- Two sizes: 1024x1024, 1792x1024 (or 1024x1792)
- Two styles: "vivid" (dramatic) or "natural" (realistic)

Optimal Prompt Structure (50-150 words):
[Detailed subject description with specific attributes].
[Setting with environmental details].
[Lighting and atmosphere]. [Art style or medium].
[Composition and framing]. [Mood and emotional quality].

Example:
A whimsical illustration of a fox librarian wearing
round spectacles and a cozy cardigan, surrounded by
towering stacks of ancient books in a warm, candlelit
study. Dust motes float in shafts of amber light from
a stained glass window. Children's book illustration style
with soft watercolor textures and gentle linework.
Wide shot showing the cozy atmosphere of the space.

Pro Tips:
- Be explicit about what you want to see
- Include emotional and atmospheric details
- Specify art medium for stylized results
- Avoid: negative phrasing, complex multi-panel requests
```

---

**Stable Diffusion 3 / SDXL:**
```
Key Characteristics:
- Negative prompts EFFECTIVE (use them)
- Weighted syntax supported: (important:1.5)
- LoRA fine-tuning available
- CFG Scale control (7-11 typical)
- Extensive community models and tools

Syntax Features:
(keyword:weight)     : Weight 0.5-1.5 typical
[keyword]            : Reduce emphasis
(keyword:1.0:0.5)    : Scheduled weights

Optimal Prompt Structure:
[quality boosters], [subject with details],
[setting], [lighting], [style], [composition]

Negative Prompt (ALWAYS INCLUDE):
blurry, low quality, distorted, deformed,
bad anatomy, bad hands, extra fingers,
watermark, signature, text, logo

Example:
masterpiece, best quality, highly detailed,
young woman in flowing white summer dress,
standing in lavender field at sunset,
golden hour lighting, soft bokeh background,
fashion photography, Canon 5D, 85mm lens

Negative: blurry, low quality, distorted hands,
extra fingers, bad anatomy, oversaturated

Pro Tips:
- Always use negative prompts
- Weights help emphasize important elements
- Reference specific camera/lens for photorealism
- Community LoRAs can dramatically improve specific subjects
```

---

**Seedream (ByteDance):**
```
Key Characteristics:
- Fast generation speed
- Good consistency across generations
- Natural language prompts
- No negative prompts
- Strong at Asian aesthetics and subjects

Optimal Prompt Structure (30-80 words):
[Subject with descriptive details]. [Setting].
[Lighting and atmosphere]. [Style reference].
[Composition and mood].

Example:
Elegant portrait of a young woman in traditional
hanfu dress, standing in a misty bamboo forest
at dawn. Soft diffused lighting, ethereal atmosphere.
Classical Chinese painting meets modern photography.
Medium shot with shallow depth of field.

Pro Tips:
- Works well with cultural and artistic references
- Specify lighting conditions clearly
- Good for portrait and fashion content
- Avoid: complex multi-subject scenes
```

---

**Ideogram 3.0:**
```
Key Characteristics:
- Best-in-class text rendering
- Logo and typography specialty
- Clean graphic design output
- Natural language prompts
- No negative prompts

Optimal for:
- Logos and branding
- Posters with text
- Product mockups with labels
- Signs and typography

Example:
Minimalist logo design for a coffee shop called "BREW LAB"
on a clean white background. The text is in a modern
sans-serif font with a subtle coffee bean icon integrated
into the letter O. Professional, contemporary aesthetic.
Vector-style flat design with muted earth tones.

Pro Tips:
- Excellent for anything requiring accurate text
- Specify font styles explicitly
- Good for graphic design and branding work
- Clear text in quotes: "YOUR TEXT HERE"
```

---

**Runway (Image Generation):**
```
Key Characteristics:
- Optimized for video frame consistency
- Strong at reference-based generation
- Natural language prompts
- No negative prompts
- Good for I2V starting frames

Optimal for:
- Video-ready stills
- Character consistency
- Scene establishment
- Reference-based generation

Example:
A confident businesswoman in a navy blazer,
standing in a modern glass office with city
skyline visible behind. Soft natural light
from floor-to-ceiling windows. Professional
corporate aesthetic, medium shot at eye level.
Clean composition suitable for motion.

Pro Tips:
- Consider motion potential when creating
- Avoid complex backgrounds that may morph
- Strong subject focus for video consistency
- Clear spatial relationships
```

---

## 5. 📐 COMPOSITION & FRAMING

### Shot Types

| Shot Type            | Description                     | Use Case                 |
| -------------------- | ------------------------------- | ------------------------ |
| **Extreme Wide**     | Full environment, subject small | Establishing, landscapes |
| **Wide Shot**        | Full body with environment      | Context, action scenes   |
| **Medium Shot**      | Waist-up                        | Conversation, portraits  |
| **Medium Close-Up**  | Chest-up                        | Emotional connection     |
| **Close-Up**         | Face or detail                  | Emotion, detail focus    |
| **Extreme Close-Up** | Specific feature                | Macro, dramatic emphasis |

### Camera Angles

| Angle                 | Effect                  | Best For                  |
| --------------------- | ----------------------- | ------------------------- |
| **Eye Level**         | Neutral, relatable      | Portraits, natural scenes |
| **Low Angle**         | Power, dominance        | Heroes, architecture      |
| **High Angle**        | Vulnerability, overview | Maps, subordination       |
| **Bird's Eye**        | Omniscient, pattern     | Flat lays, maps           |
| **Dutch Angle**       | Tension, unease         | Horror, action            |
| **Over-the-Shoulder** | Perspective, connection | Dialogue, narrative       |

### Composition Rules

```yaml
composition_techniques:
  rule_of_thirds:
    description: "Subject at intersection points"
    trigger: "balanced, classical composition"

  centered:
    description: "Subject dead center"
    trigger: "symmetrical, formal, powerful"

  leading_lines:
    description: "Lines draw eye to subject"
    trigger: "dynamic, directional"

  frame_within_frame:
    description: "Natural framing elements"
    trigger: "depth, focus, artistic"

  negative_space:
    description: "Empty space emphasizes subject"
    trigger: "minimalist, editorial, clean"

  golden_ratio:
    description: "Spiral composition"
    trigger: "natural, organic, artistic"
```

---

## 6. 🎭 STYLE & AESTHETICS

### Art Styles Reference

| Style              | Characteristics          | Keywords                                 |
| ------------------ | ------------------------ | ---------------------------------------- |
| **Photorealistic** | True to life, believable | photorealistic, hyperrealistic, lifelike |
| **Cinematic**      | Movie-like quality       | cinematic, film still, anamorphic        |
| **Editorial**      | Magazine quality         | editorial, fashion photography, high-end |
| **Anime/Manga**    | Japanese animation       | anime style, Studio Ghibli, manga        |
| **Oil Painting**   | Classical painted        | oil painting, impasto, brush strokes     |
| **Watercolor**     | Soft, flowing            | watercolor, soft washes, delicate        |
| **Digital Art**    | Modern rendered          | digital art, concept art, ArtStation     |
| **Minimalist**     | Simple, clean            | minimalist, clean, simple, sparse        |
| **Surrealist**     | Dream-like, impossible   | surreal, dreamlike, Dalí-esque           |
| **Pop Art**        | Bold, graphic            | pop art, Warhol, bold colors             |

### Photography Styles

| Style           | Characteristics   | Technical Terms                     |
| --------------- | ----------------- | ----------------------------------- |
| **Portrait**    | Subject focus     | 85mm, f/1.4, bokeh, studio lighting |
| **Landscape**   | Scenic vistas     | wide angle, f/11, golden hour       |
| **Street**      | Urban candid      | 35mm, black and white, grain        |
| **Fashion**     | Editorial beauty  | high-key, rim lighting, editorial   |
| **Product**     | Commercial clean  | white background, soft boxes        |
| **Documentary** | Authentic reality | natural light, candid, raw          |

### Film Stock References

| Film Stock            | Look               | Best For                 |
| --------------------- | ------------------ | ------------------------ |
| **Kodak Portra 400**  | Warm, natural skin | Portraits, fashion       |
| **Kodak Ektar 100**   | Vivid, saturated   | Landscapes, travel       |
| **Fujifilm Pro 400H** | Soft, pastel       | Weddings, soft portraits |
| **Cinestill 800T**    | Tungsten, halation | Night, neon, moody       |
| **Ilford HP5**        | Classic B&W grain  | Street, documentary      |
| **Kodachrome**        | Vintage, nostalgic | Retro, 1970s aesthetic   |

---

## 7. 📚 VOCABULARY BANKS

### Subject Descriptors

| Category       | Examples                                            |
| -------------- | --------------------------------------------------- |
| **Age**        | young, elderly, middle-aged, teenage, child         |
| **Expression** | serene, joyful, pensive, intense, peaceful          |
| **Pose**       | standing, seated, reclining, dynamic, contemplative |
| **Attire**     | elegant, casual, formal, bohemian, vintage          |
| **Features**   | sharp cheekbones, soft features, striking eyes      |

### Lighting Vocabulary

| Type               | Description              | Mood                 |
| ------------------ | ------------------------ | -------------------- |
| **Golden Hour**    | Warm, soft, directional  | Romantic, dreamy     |
| **Blue Hour**      | Cool, ethereal, twilight | Mysterious, calm     |
| **Harsh Midday**   | Direct, high contrast    | Documentary, intense |
| **Soft Diffused**  | Even, flattering         | Studio, commercial   |
| **Rembrandt**      | Triangle under eye       | Dramatic, classic    |
| **Rim/Back Light** | Edge separation          | Dramatic, cinematic  |
| **Volumetric**     | Visible light rays       | Atmospheric, divine  |
| **Neon**           | Colorful artificial      | Cyberpunk, urban     |

### Color Palettes

| Palette           | Colors                    | Mood                |
| ----------------- | ------------------------- | ------------------- |
| **Warm Earth**    | Terracotta, ochre, sienna | Organic, natural    |
| **Cool Nordic**   | Slate, ice blue, white    | Clean, minimal      |
| **Sunset**        | Orange, pink, purple      | Romantic, dramatic  |
| **Forest**        | Deep green, brown, gold   | Natural, grounded   |
| **Ocean**         | Teal, navy, seafoam       | Calm, depth         |
| **Neon Cyber**    | Hot pink, electric blue   | Futuristic, edgy    |
| **Vintage Muted** | Faded tones, sepia hints  | Nostalgic, timeless |
| **Pastel Dream**  | Soft pink, lavender, mint | Gentle, whimsical   |

### Texture & Material

| Material    | Descriptors                                |
| ----------- | ------------------------------------------ |
| **Metal**   | Brushed, polished, oxidized, chrome, matte |
| **Fabric**  | Silk, velvet, linen, denim, sheer          |
| **Natural** | Weathered wood, moss, stone, bark          |
| **Glass**   | Frosted, clear, reflective, stained        |
| **Organic** | Petal-soft, rough bark, smooth skin        |

---

## 8. ⚠️ ANTI-PATTERNS

### Universal Anti-Patterns

| Anti-Pattern                   | Problem                      | Transform To                                |
| ------------------------------ | ---------------------------- | ------------------------------------------- |
| **Vague subject**              | "A person"                   | "A woman in her 30s with curly auburn hair" |
| **Missing style**              | No aesthetic direction       | Add specific style reference                |
| **Quality keywords**           | "4K, 8K, masterpiece"        | Remove on modern platforms                  |
| **Contradicting styles**       | "Photorealistic cartoon"     | Choose dominant style                       |
| **Missing lighting**           | No atmosphere                | Specify lighting conditions                 |
| **Keyword stuffing**           | "Beautiful amazing stunning" | One strong descriptor                       |
| **Negative on wrong platform** | Flux negatives               | Remove entirely                             |
| **Missing composition**        | No framing                   | Add shot type and angle                     |
| **Tag soup**                   | "trending on artstation, 8k" | Remove entirely                             |

### Platform-Specific Anti-Patterns

| Platform             | Avoid                      | Use Instead                    |
| -------------------- | -------------------------- | ------------------------------ |
| **Flux 2 Pro**       | Weighted syntax, negatives | Natural sentences              |
| **Imagen 4**         | Complex negatives          | Clear positive description     |
| **Midjourney**       | Overly long prompts        | Concise, comma-separated       |
| **DALL-E 3**         | Keyword lists              | Natural paragraphs             |
| **Stable Diffusion** | Missing negatives          | Always include negative prompt |

### Vague-to-Specific Transformation

```yaml
vague_to_specific:
  "portrait" → "medium close-up portrait, soft natural lighting, shallow depth of field"
  "landscape" → "wide shot landscape at golden hour, dramatic clouds, leading lines"
  "product" → "product photography on white seamless, soft box lighting, sharp focus"
  "fantasy" → "epic fantasy illustration, dramatic lighting, detailed environment"
  "modern" → "contemporary minimalist aesthetic, clean lines, muted color palette"
  "vintage" → "1970s Kodachrome aesthetic, warm tones, subtle grain"
```

---

## 9. ✨ TRANSFORMATION EXAMPLES

### Example 1: Portrait (Flux 2 Pro)

**Input:**
```
portrait of a woman
```

**Output:**
```
Portrait of a woman in her late 20s with striking green eyes
and shoulder-length dark hair, wearing a simple ivory linen
blouse. Natural window light falling from camera left creates
soft shadows on her face. She gazes slightly past camera
with a contemplative expression.

Warm neutral background with soft bokeh. Editorial fashion
photography style inspired by Peter Lindbergh. Medium shot
framing at eye level, shallow depth of field.
```

**VISUAL Score:** 52/60

---

### Example 2: Product Shot (Imagen 4)

**Input:**
```
coffee mug photo
```

**Output:**
```
Professional product photograph of a handcrafted ceramic
coffee mug in matte sage green. The mug sits on a light
oak wooden table surface with visible grain texture.

Steam rises gently from fresh coffee inside. The mug features
subtle speckled glaze texture and an organic curved handle.
Text on the mug reads "MORNING RITUAL" in minimal sans-serif.

Soft window light from the right, creating gentle shadows.
Clean, minimalist composition with negative space on left.
Warm, inviting atmosphere. Shot at eye level with shallow
depth of field blurring the background slightly.
```

**VISUAL Score:** 54/60

---

### Example 3: Fantasy Art (Midjourney)

**Input:**
```
dragon
```

**Output:**
```
Ancient dragon perched atop a crumbling stone tower,
wings folded against storm clouds at twilight,
scales gleaming with deep emerald and gold iridescence,
piercing amber eyes surveying the misty valley below,
epic fantasy illustration, dramatic volumetric lighting,
rain falling through god rays, detailed environment
--ar 16:9 --s 500 --style raw
```

**VISUAL Score:** 50/60

---

### Example 4: Street Photography (Stable Diffusion)

**Input:**
```
city scene
```

**Output:**
```
Prompt:
masterpiece, best quality, street photography,
rainy Tokyo alley at night, neon signs reflecting
on wet pavement, lone figure with umbrella walking away,
steam rising from street vents, Blade Runner atmosphere,
shot on Leica M10, 35mm lens, high ISO grain,
cinematic color grading, moody and atmospheric

Negative:
blurry, low quality, distorted, oversaturated,
cartoon, anime, illustration, watermark, signature,
bad composition, centered subject
```

**VISUAL Score:** 51/60

---

### Example 5: Logo Design (Ideogram 3.0)

**Input:**
```
logo for tech startup
```

**Output:**
```
Minimalist logo design for a technology startup called
"NEXUS AI" on a clean white background.

The design features the word "NEXUS" in a bold,
geometric sans-serif font with "AI" in a lighter weight.
A subtle neural network pattern forms a circular icon
integrated with the letter N.

Color scheme: Deep navy blue (#1A365D) with electric
blue accent (#3182CE). Professional, contemporary,
trustworthy aesthetic. Vector-style flat design
suitable for both digital and print applications.
Clean negative space around the mark.
```

**VISUAL Score:** 48/60

---

### Example 6: Food Photography (DALL-E 3)

**Input:**
```
pasta dish
```

**Output:**
```
Overhead food photography of fresh homemade tagliatelle
pasta in a rustic ceramic bowl. The pasta is tossed in
a rich, glossy porcini mushroom sauce with visible herbs
and shaved parmesan scattered on top.

The bowl sits on a weathered wooden farmhouse table with
a linen napkin and vintage silver fork beside it. Fresh
basil leaves and a small dish of flaky sea salt complete
the scene. Natural window light streams from the upper left,
creating soft shadows and highlighting the sauce's sheen.

Warm, appetizing color palette with creamy pasta against
earthy browns. Shallow depth of field with slight blur
at frame edges. Food magazine editorial style with
an inviting, homemade atmosphere.
```

**VISUAL Score:** 56/60

---

### Example 7: Character (Seedream)

**Input:**
```
anime character
```

**Output:**
```
Portrait of a young woman in traditional hanfu-inspired
fantasy costume with flowing sleeves in deep teal silk
embroidered with silver cherry blossoms. Long black hair
styled in an elegant updo with jade hair pins.

Soft, ethereal expression with delicate features.
Standing in a moonlit bamboo grove with mist curling
around the base of the stalks. Cool blue-green color
palette with touches of silver moonlight.

Anime-influenced digital art style with painterly
rendering. Three-quarter portrait composition with
soft background blur. Mystical, serene atmosphere.
```

**VISUAL Score:** 52/60

---

## 10. 🔄 ITERATIVE REFINEMENT FLOW

### Post-Delivery Question (MANDATORY)

After delivering the enhanced prompt, **always ask the user to share their result** for iterative refinement:

```markdown
---

**🖼️ Share Your Generated Image for Refinement**

Try this prompt in your AI image generator and share the result with me!

Upload the generated image or describe what you got, and I can help you:
- **Refine the prompt** if the composition, style, or details aren't right
- **Adjust atmosphere** if lighting, mood, or colors need tweaking
- **Fix specific elements** that the AI interpreted differently

Just paste or upload the image and tell me what you'd like to change.
```

### Refinement Conversation Patterns

**When user shares result:**

```yaml
refinement_triggers:
  image_feedback:
    - "Here's what it generated"
    - "This is the result"
    - "[image uploaded]"
    - "It made this but I wanted..."
    - "The [element] isn't right"

  refinement_actions:
    analyze_result:
      - Compare output to FRAME elements
      - Identify misinterpretations
      - Note successful vs problematic elements

    propose_adjustments:
      - Subject/composition changes (F)
      - Style/rendering adjustments (R)
      - Atmosphere/lighting tweaks (A)
      - Parameter modifications (M)
      - Exclusion additions (E)

    generate_refined_prompt:
      - Apply FRAME framework adjustments
      - Re-score with VISUAL
      - Deliver updated prompt
```

**Refinement Response Template:**

```markdown
**🔍 Analysis of Generated Image:**
- **What worked:** [Elements that matched intent]
- **Gap identified:** [Where output diverged]
- **Likely cause:** [Prompt interpretation issue]

**🔧 FRAME Adjustment:**
- **F** (Focus): [Any subject/composition changes]
- **R** (Rendering): [Style adjustments]
- **A** (Atmosphere): [Lighting/mood changes]
- **M** (Modifiers): [Parameter tweaks]
- **E** (Exclusions): [What to avoid]

**✨ Refined Prompt:**
[Updated prompt with modifications]

---
Generate with this refined prompt and share the new result!
```

### Iteration Best Practices

| Iteration | Focus | Typical Adjustments |
|-----------|-------|---------------------|
| 1st | Composition validation | Subject, framing, perspective |
| 2nd | Style calibration | Medium, aesthetic, technique |
| 3rd | Atmosphere polish | Lighting, color, mood |
| 4th+ | Detail refinement | Specific elements, fine-tuning |

**Platform-Specific Refinement Tips:**

| Platform | Common Refinements |
|----------|-------------------|
| Midjourney | Adjust `--s` value, add `--style raw`, change `--ar` |
| Flux | Increase specificity, add scene details |
| DALL-E | Restructure paragraph flow, emphasize key elements |
| SD | Adjust weights `(element:1.3)`, expand negative prompt |

**Convergence Signal:** When user expresses satisfaction:

```markdown
The image matches your vision! 🎯

Save this final prompt for future use:
[Final optimized prompt]

Need another image prompt? Just share your next concept.
```

---

## 11. 🏎️ QUICK REFERENCE

### FRAME Checklist
- [ ] **F**ocus: Subject clearly defined with specific details?
- [ ] **R**endering: Art style or medium specified?
- [ ] **A**tmosphere: Lighting and mood established?
- [ ] **M**odifiers: Platform parameters included?
- [ ] **E**xclusions: Handled appropriately for platform?

### Platform Quick Guide

| Platform         | Negatives | Best Syntax          | Key Strength     |
| ---------------- | --------- | -------------------- | ---------------- |
| Flux 2 Pro       | No        | Natural sentences    | Photorealism     |
| Imagen 4         | No        | Detailed description | Text rendering   |
| Midjourney       | Partial   | Keywords + params    | Artistic styles  |
| DALL-E 3         | No        | Natural paragraphs   | Prompt following |
| Stable Diffusion | **Yes**   | Keywords + negative  | Control, LoRA    |
| Ideogram 3.0     | No        | Natural sentences    | Typography       |
| Seedream         | No        | Concise sentences    | Speed            |
| Runway           | No        | Natural sentences    | Video frames     |

### Word Count Guidelines

| Platform         | Optimal Range        |
| ---------------- | -------------------- |
| Flux 2 Pro       | 15-75 words          |
| Imagen 4         | 30-100 words         |
| Midjourney       | 20-60 words + params |
| DALL-E 3         | 50-150 words         |
| Stable Diffusion | 20-75 + negative     |
| Ideogram         | 30-80 words          |
| Seedream         | 30-80 words          |
| Runway           | 30-80 words          |

### Score Targets
- **VISUAL 48+**: Ready for generation
- **VISUAL 40-47**: Minor refinements needed
- **VISUAL <40**: Significant enhancement required

### Quick Fixes

| Problem              | Fix                                          |
| -------------------- | -------------------------------------------- |
| Vague subject        | Add specific details (age, features, attire) |
| No style             | Add art style or photography reference       |
| Missing lighting     | Specify time of day or light source          |
| No composition       | Add shot type and camera angle               |
| Conflicting elements | Choose dominant aesthetic                    |
| Platform mismatch    | Check negative prompt support                |

---

*Image Mode transforms vague visual requests into detailed, platform-optimized prompts for 2025-2026 AI image generators with full FRAME framework integration.*
