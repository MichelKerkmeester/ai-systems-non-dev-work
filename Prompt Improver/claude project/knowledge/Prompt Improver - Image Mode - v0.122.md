---
title: "Image Mode"
description: "FRAME framework, visual prompt vocabulary and platform guidance for image generators."
version: "0.122"
contextType: reference
importance_tier: high
trigger_phrases:
  - "$image image prompts"
  - "FRAME framework"
  - "VISUAL image scoring"
  - "image platform routing"
  - "Flux Midjourney Imagen"
---

# Prompt - Templates - Image Mode - v0.122

Specialized mode for optimizing prompts for AI image generators including Flux 2 Pro, Google Imagen 4 (Nano Banana Pro), Runway, Midjourney, DALL-E 3, Stable Diffusion, Seedream, Leonardo, and Ideogram.

---

## 1. OVERVIEW

### Purpose

Transform vague visual requests into structured, platform-optimized image prompts using the FRAME framework and VISUAL scoring system.

### When to Use

- **Loading Condition:** TRIGGER. Activated by `$image` / `$img` commands.
- Image generation prompts and platform-specific optimization.
- Composition vocabulary, style references, and anti-pattern detection.

---

## 2. OBJECTIVE

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

## 3. FRAME FRAMEWORK

- **F**ocus
  - Focus: Subject & Composition
  - Core Question: "What is the viewer looking at?"
  - Weight: 30%
- **R**endering
  - Focus: Medium & Style
  - Core Question: "How should it be visualized?"
  - Weight: 20%
- **A**tmosphere
  - Focus: Lighting & Mood
  - Core Question: "What feeling does it evoke?"
  - Weight: 20%
- **M**odifiers
  - Focus: Technical Parameters
  - Core Question: "What constraints apply?"
  - Weight: 15%
- **E**xclusions
  - Focus: Negative Guidance
  - Core Question: "What should be avoided?"
  - Weight: 15%

---

Templates: see [image_mode_library](../assets/image_mode_library.md)

---


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

## 4. VISUAL SCORING (IMAGE)

- **V**ivid
  - Points: 15
  - Threshold: 12+
  - What It Measures: Creates clear mental imagery
- **I**ntentional
  - Points: 10
  - Threshold: 8+
  - What It Measures: Clear compositional purpose
- **S**tyled
  - Points: 10
  - Threshold: 8+
  - What It Measures: Defined visual aesthetic
- **U**nambiguous
  - Points: 10
  - Threshold: 8+
  - What It Measures: No conflicting style instructions
- **A**tmospheric
  - Points: 10
  - Threshold: 8+
  - What It Measures: Lighting, mood, color defined
- **L**ayered
  - Points: 5
  - Threshold: 4+
  - What It Measures: Depth in scene composition
- **Total**
  - Points: **60**
  - Threshold: **48+**
  - What It Measures: Quality threshold

---

## 5. PLATFORM OPTIMIZATION

### Platform Detection & Capabilities

- **Flux 2 Pro**
  - Detection Keywords: "flux", "bfl"
  - Negative Prompts: No (ignored)
  - Key Strength: Photorealism, natural language
- **Imagen 4 / Nano Banana Pro**
  - Detection Keywords: "imagen", "nano banana", "gemini image"
  - Negative Prompts: No (ignored)
  - Key Strength: Text accuracy (95%), multi-reference
- **Runway**
  - Detection Keywords: "runway", "gen-4 image"
  - Negative Prompts: No
  - Key Strength: Video frame consistency
- **Midjourney v6.1**
  - Detection Keywords: "midjourney", "mj", "--ar"
  - Negative Prompts: Partial
  - Key Strength: Artistic, stylized
- **DALL-E 3**
  - Detection Keywords: "dall-e", "dalle", "openai"
  - Negative Prompts: No
  - Key Strength: Prompt following, text
- **Stable Diffusion 3**
  - Detection Keywords: "sd", "sdxl", "stable diffusion"
  - Negative Prompts: Yes (effective)
  - Key Strength: Control, LoRA, customization
- **Seedream**
  - Detection Keywords: "seedream", "bytedance image"
  - Negative Prompts: No
  - Key Strength: Speed, consistency
- **Leonardo**
  - Detection Keywords: "leonardo"
  - Negative Prompts: Yes
  - Key Strength: Stylized art, characters
- **Ideogram 3.0**
  - Detection Keywords: "ideogram"
  - Negative Prompts: No
  - Key Strength: Text rendering, logos

### Platform-Specific Syntax

Templates: see [image_mode_library](../assets/image_mode_library.md)

---


## 6. COMPOSITION & FRAMING

### Shot Types

- **Extreme Wide**
  - Description: Full environment, subject small
  - Use Case: Establishing, landscapes
- **Wide Shot**
  - Description: Full body with environment
  - Use Case: Context, action scenes
- **Medium Shot**
  - Description: Waist-up
  - Use Case: Conversation, portraits
- **Medium Close-Up**
  - Description: Chest-up
  - Use Case: Emotional connection
- **Close-Up**
  - Description: Face or detail
  - Use Case: Emotion, detail focus
- **Extreme Close-Up**
  - Description: Specific feature
  - Use Case: Macro, dramatic emphasis

### Camera Angles

- **Eye Level**
  - Effect: Neutral, relatable
  - Best For: Portraits, natural scenes
- **Low Angle**
  - Effect: Power, dominance
  - Best For: Heroes, architecture
- **High Angle**
  - Effect: Vulnerability, overview
  - Best For: Maps, subordination
- **Bird's Eye**
  - Effect: Omniscient, pattern
  - Best For: Flat lays, maps
- **Dutch Angle**
  - Effect: Tension, unease
  - Best For: Horror, action
- **Over-the-Shoulder**
  - Effect: Perspective, connection
  - Best For: Dialogue, narrative

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

## 7. STYLE & AESTHETICS

### Art Styles Reference

- **Photorealistic**
  - Characteristics: True to life, believable
  - Keywords: photorealistic, hyperrealistic, lifelike
- **Cinematic**
  - Characteristics: Movie-like quality
  - Keywords: cinematic, film still, anamorphic
- **Editorial**
  - Characteristics: Magazine quality
  - Keywords: editorial, fashion photography, high-end
- **Anime/Manga**
  - Characteristics: Japanese animation
  - Keywords: anime style, Studio Ghibli, manga
- **Oil Painting**
  - Characteristics: Classical painted
  - Keywords: oil painting, impasto, brush strokes
- **Watercolor**
  - Characteristics: Soft, flowing
  - Keywords: watercolor, soft washes, delicate
- **Digital Art**
  - Characteristics: Modern rendered
  - Keywords: digital art, concept art, ArtStation
- **Minimalist**
  - Characteristics: Simple, clean
  - Keywords: minimalist, clean, simple, sparse
- **Surrealist**
  - Characteristics: Dream-like, impossible
  - Keywords: surreal, dreamlike, Dalí-esque
- **Pop Art**
  - Characteristics: Bold, graphic
  - Keywords: pop art, Warhol, bold colors

### Photography Styles

- **Portrait**
  - Characteristics: Subject focus
  - Technical Terms: 85mm, f/1.4, bokeh, studio lighting
- **Landscape**
  - Characteristics: Scenic vistas
  - Technical Terms: wide angle, f/11, golden hour
- **Street**
  - Characteristics: Urban candid
  - Technical Terms: 35mm, black and white, grain
- **Fashion**
  - Characteristics: Editorial beauty
  - Technical Terms: high-key, rim lighting, editorial
- **Product**
  - Characteristics: Commercial clean
  - Technical Terms: white background, soft boxes
- **Documentary**
  - Characteristics: Authentic reality
  - Technical Terms: natural light, candid, raw

### Film Stock References

- **Kodak Portra 400**
  - Look: Warm, natural skin
  - Best For: Portraits, fashion
- **Kodak Ektar 100**
  - Look: Vivid, saturated
  - Best For: Landscapes, travel
- **Fujifilm Pro 400H**
  - Look: Soft, pastel
  - Best For: Weddings, soft portraits
- **Cinestill 800T**
  - Look: Tungsten, halation
  - Best For: Night, neon, moody
- **Ilford HP5**
  - Look: Classic B&W grain
  - Best For: Street, documentary
- **Kodachrome**
  - Look: Vintage, nostalgic
  - Best For: Retro, 1970s aesthetic

---

## 8. VOCABULARY BANKS

### Subject Descriptors

| Category       | Examples                                            |
| -------------- | --------------------------------------------------- |
| **Age**        | young, elderly, middle-aged, teenage, child         |
| **Expression** | serene, joyful, pensive, intense, peaceful          |
| **Pose**       | standing, seated, reclining, dynamic, contemplative |
| **Attire**     | elegant, casual, formal, bohemian, vintage          |
| **Features**   | sharp cheekbones, soft features, striking eyes      |

### Texture & Material

| Material    | Descriptors                                |
| ----------- | ------------------------------------------ |
| **Metal**   | Brushed, polished, oxidized, chrome, matte |
| **Fabric**  | Silk, velvet, linen, denim, sheer          |
| **Natural** | Weathered wood, moss, stone, bark          |
| **Glass**   | Frosted, clear, reflective, stained        |
| **Organic** | Petal-soft, rough bark, smooth skin        |

---

## 9. ANTI-PATTERNS

### Universal Anti-Patterns

- **Vague subject**
  - Problem: "A person"
  - Transform To: "A woman in her 30s with curly auburn hair"
- **Missing style**
  - Problem: No aesthetic direction
  - Transform To: Add specific style reference
- **Quality keywords**
  - Problem: "4K, 8K, masterpiece"
  - Transform To: Remove on modern platforms
- **Contradicting styles**
  - Problem: "Photorealistic cartoon"
  - Transform To: Choose dominant style
- **Missing lighting**
  - Problem: No atmosphere
  - Transform To: Specify lighting conditions
- **Keyword stuffing**
  - Problem: "Beautiful amazing stunning"
  - Transform To: One strong descriptor
- **Negative on wrong platform**
  - Problem: Flux negatives
  - Transform To: Remove entirely
- **Missing composition**
  - Problem: No framing
  - Transform To: Add shot type and angle
- **Tag soup**
  - Problem: "trending on artstation, 8k"
  - Transform To: Remove entirely

### Platform-Specific Anti-Patterns

- **Flux 2 Pro**
  - Avoid: Weighted syntax, negatives
  - Use Instead: Natural sentences
- **Imagen 4**
  - Avoid: Complex negatives
  - Use Instead: Clear positive description
- **Midjourney**
  - Avoid: Overly long prompts
  - Use Instead: Concise, comma-separated
- **DALL-E 3**
  - Avoid: Keyword lists
  - Use Instead: Natural paragraphs
- **Stable Diffusion**
  - Avoid: Missing negatives
  - Use Instead: Always include negative prompt

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

## 10. TRANSFORMATION EXAMPLES

Templates: see [image_mode_library](../assets/image_mode_library.md)

---


## 11. ITERATIVE REFINEMENT FLOW

### Post-Delivery Question (MANDATORY)

Templates: see [image_mode_library](../assets/image_mode_library.md)


### Iteration Best Practices

- **1st**
  - Focus: Composition validation
  - Typical Adjustments: Subject, framing, perspective
- **2nd**
  - Focus: Style calibration
  - Typical Adjustments: Medium, aesthetic, technique
- **3rd**
  - Focus: Atmosphere polish
  - Typical Adjustments: Lighting, color, mood
- **4th+**
  - Focus: Detail refinement
  - Typical Adjustments: Specific elements, fine-tuning

**Platform-Specific Refinement Tips:**

| Platform   | Common Refinements                                     |
| ---------- | ------------------------------------------------------ |
| Midjourney | Adjust `--s` value, add `--style raw`, change `--ar`   |
| Flux       | Increase specificity, add scene details                |
| DALL-E     | Restructure paragraph flow, emphasize key elements     |
| SD         | Adjust weights `(element:1.3)`, expand negative prompt |

**Convergence Signal:** When user expresses satisfaction:

```markdown
The image matches your vision! 🎯

Save this final prompt for future use:
[Final optimized prompt]

Need another image prompt? Just share your next concept.
```

---

## 12. QUICK REFERENCE

Templates: see [image_mode_library](../assets/image_mode_library.md)


---

*Image Mode transforms vague visual requests into detailed, platform-optimized prompts for 2025-2026 AI image generators with full FRAME framework integration.*
