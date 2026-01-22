# Prompt - Image Mode - v0.100

Specialized mode for optimizing prompts for AI image generators including Midjourney, DALL-E, Stable Diffusion, Flux, Nano Banana Pro, Leonardo, Ideogram, and Firefly.

**Loading Condition:** TRIGGER
**Purpose:** Transform vague image descriptions into platform-optimized prompts using the FRAME framework and VISUAL scoring system.
**Scope:** Image generation prompts, platform-specific optimization, vocabulary banks, anti-pattern detection.

---

## 📋 TABLE OF CONTENTS

1. [🎯 OBJECTIVE](#1--objective)
2. [🖼️ FRAME FRAMEWORK](#2-️-frame-framework)
3. [📊 VISUAL SCORING (IMAGE)](#3--visual-scoring-image)
4. [🎨 PLATFORM OPTIMIZATION](#4--platform-optimization)
5. [🍌 NANO BANANA PRO](#5--nano-banana-pro)
6. [📚 VOCABULARY BANKS](#6--vocabulary-banks)
7. [⚠️ ANTI-PATTERNS](#7-️-anti-patterns)
8. [✨ TRANSFORMATION EXAMPLES](#8--transformation-examples)
9. [🏎️ QUICK REFERENCE](#9-️-quick-reference)

---

## 1. 🎯 OBJECTIVE

Transform vague, tag-soup, or incomplete image descriptions into structured, evocative prompts optimized for AI image generators.

**Commands:** `$image`, `$img`
**DEPTH Rounds:** 5 (creative iteration)
**Framework:** FRAME
**Scoring:** VISUAL (60 points, 48+ threshold)

**Core Philosophy:**
> "Describe what you see in your mind, not keywords for an algorithm."

**Key Principles:**
1. **Specificity over keywords** - "woman with windswept auburn hair" > "beautiful woman, flowing hair"
2. **Scene over tags** - Describe a complete scene, not a list of attributes
3. **Platform awareness** - Different generators need different syntax
4. **Quality through description** - Let vivid language replace "4k, masterpiece, trending"

---

## 2. 🖼️ FRAME FRAMEWORK

| Element | Focus | Core Question | Weight |
|---------|-------|---------------|--------|
| **F**ocus | Subject & Composition | "What is the viewer looking at?" | 30% |
| **R**endering | Medium & Style | "How should it be visualized?" | 25% |
| **A**tmosphere | Lighting & Mood | "What feeling does it evoke?" | 25% |
| **M**odifiers | Technical Parameters | "What constraints apply?" | 15% |
| **E**xclusions | Negative Prompts | "What should be avoided?" | 5% |

### FRAME Application Process

```yaml
frame_process:
  round_1_discover:
    - Extract subject from input
    - Identify intended composition
    - Detect platform hints

  round_2_engineer:
    - Apply FRAME structure
    - Select appropriate vocabulary
    - Match platform syntax

  round_3_prototype:
    - Build complete prompt
    - Add platform modifiers
    - Include exclusions if supported

  round_4_test:
    - Score with VISUAL (60pt)
    - Check for anti-patterns
    - Verify platform compatibility

  round_5_harmonize:
    - Final polish
    - Optimize token usage
    - Format for delivery
```

---

## 3. 📊 VISUAL SCORING (IMAGE)

| Dimension | Points | Threshold | What It Measures |
|-----------|--------|-----------|------------------|
| **V**ivid | 15 | 12+ | Creates clear mental imagery |
| **I**ntentional | 10 | 8+ | Clear purpose and composition |
| **S**tyled | 10 | 8+ | Defined aesthetic direction |
| **U**nambiguous | 10 | 8+ | No conflicting instructions |
| **A**tmospheric | 10 | 8+ | Lighting and mood captured |
| **L**ayered | 5 | 4+ | Depth and scene complexity |
| **Total** | **60** | **48+** | Quality threshold |

---

## 4. 🎨 PLATFORM OPTIMIZATION

### Platform Detection

| Platform | Detection Keywords | Syntax Style |
|----------|-------------------|--------------|
| **Midjourney** | "midjourney", "mj", "--ar" | Concise + parameters |
| **DALL-E 3** | "dall-e", "dalle", "openai" | Natural language |
| **Stable Diffusion** | "sd", "sdxl", "stable diffusion" | Weighted keywords |
| **Flux** | "flux", "bfl" | Technical detail |
| **Nano Banana Pro** | "nano banana", "gemini image" | Six-Factor |
| **Leonardo** | "leonardo" | Style presets |
| **Ideogram** | "ideogram" | Typography focus |
| **Firefly** | "firefly", "adobe" | Natural language |

### Platform-Specific Parameters

**Midjourney v7:**
```
--ar [ratio]     Aspect ratio (16:9, 4:5, 1:1, etc.)
--s [0-1000]     Stylize (higher = more artistic)
--chaos [0-100]  Variation in results
--q [0.25-2]     Quality/detail level
--style raw      Literal interpretation
--sref [url]     Style reference image
```

**Stable Diffusion:**
```
(term:weight)    Emphasis (1.0 = normal, 1.5 = strong)
[term]           De-emphasis
Negative prompt: Separate field for exclusions
CFG Scale:       Prompt adherence (7-12 typical)
```

**DALL-E 3:**
```
Size: 1024x1024, 1792x1024, 1024x1792
Style: vivid (dramatic) or natural (realistic)
No parameters in prompt - natural language only
```

---

## 5. 🍌 NANO BANANA PRO

Nano Banana Pro (Google Gemini 3 Pro Image) requires special handling.

### Six-Factor Structure

```
[Subject + Adjectives] doing [Action] in [Location/Context].
[Composition/Camera]. [Lighting/Atmosphere]. [Style]. [Text/Constraints].
```

### Key Principles

1. **Think Like a Creative Director** - Describe intent, not keywords
2. **No Tag Soup** - Remove quality spam (4k, masterpiece, trending)
3. **Edit, Don't Re-roll** - Use conversational refinement
4. **Be Specific with Text** - Quote exact text: `"HELLO WORLD"`

### Transformation Example

Before (tag soup):
```
futuristic city, neon lights, cyberpunk, 4k, ultra realistic, trending on artstation, 8k
```

After (Six-Factor):
```
A sprawling metropolis at twilight with towering skyscrapers
reflecting neon advertisements in Japanese and English.

Low angle shot looking up at the buildings, rain-slicked streets
below. Pink and blue neon glow dominates, contrasting with the
deep blue evening sky.

Cinematic cyberpunk aesthetic inspired by Blade Runner 2049.
```

---

## 6. 📚 VOCABULARY BANKS

### Shot Types & Composition

| Category | Options |
|----------|---------|
| **Shot Scale** | Extreme wide, wide, medium wide, medium, medium close-up, close-up, extreme close-up, macro |
| **Framing** | Centered, rule of thirds, golden ratio, symmetrical, asymmetrical, off-center |
| **Angle** | Eye-level, low angle, high angle, bird's eye, worm's eye, Dutch angle |
| **Perspective** | Forced perspective, shallow DOF, deep focus, tilt-shift, fisheye |

### Lighting

| Type | Options |
|------|---------|
| **Natural** | Golden hour, blue hour, overcast, harsh midday, dappled sunlight, moonlit |
| **Studio** | Rembrandt, butterfly, split, rim light, high-key, low-key, broad, short |
| **Atmospheric** | Volumetric, god rays, neon glow, candlelit, foggy, hazy |
| **Color** | Warm tungsten, cool daylight, mixed lighting, color gel |

### Art Styles & Media

| Category | Options |
|----------|---------|
| **Photography** | Editorial, portrait, documentary, fashion, street, landscape, product |
| **Digital Art** | Concept art, matte painting, 3D render, digital illustration |
| **Traditional** | Oil painting, watercolor, charcoal, pencil sketch, ink wash |
| **Movements** | Art Nouveau, Art Deco, Impressionism, Surrealism, Minimalism |
| **Contemporary** | Cyberpunk, vaporwave, dark academia, cottagecore, solarpunk |

### Mood & Atmosphere

| Mood | Descriptors |
|------|-------------|
| **Serene** | Peaceful, calm, tranquil, meditative, zen |
| **Dramatic** | Intense, powerful, striking, bold, dynamic |
| **Mysterious** | Enigmatic, ethereal, otherworldly, haunting |
| **Energetic** | Vibrant, lively, dynamic, explosive, kinetic |
| **Melancholic** | Wistful, nostalgic, somber, contemplative |

---

## 7. ⚠️ ANTI-PATTERNS

### Patterns to Transform

| Anti-Pattern | Problem | Transform To |
|--------------|---------|--------------|
| **Tag soup** | "4k, masterpiece, trending on artstation" | Remove entirely - describe quality through scene |
| **Vague subject** | "beautiful woman" | "A woman in her thirties with silver-streaked hair and laugh lines" |
| **Conflicting styles** | "photorealistic cartoon watercolor" | Choose ONE dominant style |
| **Quality keywords** | "ultra HD, 8k, best quality" | Let the image speak through description |
| **Missing composition** | "portrait" | "Medium close-up portrait, rule of thirds framing" |
| **No lighting** | "person indoors" | "Soft window light from the left, afternoon glow" |

### Detection and Removal

```yaml
anti_pattern_detection:
  tag_soup_keywords:
    - "4k", "8k", "ultra hd", "high resolution"
    - "masterpiece", "best quality", "highly detailed"
    - "trending on artstation", "award winning"
    - "unreal engine", "octane render" (unless specifically needed)

  action: remove_or_transform

  exception: Keep technical terms if platform-specific and useful
```

---

## 8. ✨ TRANSFORMATION EXAMPLES

### Example 1: Portrait (Midjourney)

**Input:**
```
portrait beautiful woman 4k realistic
```

**Output:**
```
Portrait of a woman in her late twenties with a thoughtful expression.
Soft window light from the left creates gentle shadows across her face.
Her dark hair falls naturally, wearing a simple cream sweater.
Blurred cozy interior background. Shot at f/2.8 on 85mm lens.
Editorial portrait style with warm, natural color grading.

--ar 4:5 --s 250 --style raw
```

**VISUAL Score:** 52/60
```
V: 13/15 | I: 9/10 | S: 8/10 | U: 9/10 | A: 9/10 | L: 4/5 = 52/60
```

### Example 2: Landscape (DALL-E)

**Input:**
```
mountain landscape sunset pretty
```

**Output:**
```
A dramatic mountain range at sunset with jagged peaks silhouetted
against a gradient sky shifting from deep orange to purple.
A mirror-still alpine lake in the foreground reflects the mountains
and sky perfectly. Thin wisps of cloud catch the last golden light.
Landscape photography style, epic scale with intimate foreground detail.
```

**VISUAL Score:** 49/60

### Example 3: Product (Stable Diffusion)

**Input:**
```
watch product photo white background
```

**Output:**
```
(luxury wristwatch:1.3) with brushed steel case and midnight blue dial,
Roman numeral markers in silver, brown leather strap with visible stitching.
(pure white background:1.4), (soft even lighting:1.2) with subtle shadows
beneath. (Product photography:1.3), sharp focus throughout,
8k commercial quality

Negative: cluttered background, harsh shadows, distortion, text
```

**VISUAL Score:** 54/60

### Example 4: Fantasy (Nano Banana Pro)

**Input:**
```
dragon castle fantasy epic
```

**Output:**
```
A massive obsidian dragon perched atop a crumbling gothic castle,
wings spread wide against a stormy twilight sky.

Low angle perspective looking up at the creature, lightning
illuminating its scales. The castle's broken spires frame the
composition. Embers and ash drift through the purple-grey atmosphere.

Epic dark fantasy illustration style, inspired by Wayne Barlowe
meets classical romanticism.
```

**VISUAL Score:** 56/60

### Example 5: Abstract (Flux)

**Input:**
```
abstract colorful flowing shapes
```

**Output:**
```
Fluid abstract composition of interweaving ribbons in electric blue,
coral pink, and deep purple. The shapes flow and twist through a
gradient background that shifts from cream to soft grey.

Some ribbons appear translucent where they overlap, creating
secondary colors. Soft gradients within each shape give them
three-dimensional volume. Contemporary digital art aesthetic
with a sense of movement frozen in time.
```

**VISUAL Score:** 48/60

### Example 6: Typography (Ideogram)

**Input:**
```
coffee shop sign
```

**Output:**
```
A rustic wooden sign for a coffee shop displaying "BREW & BLOOM" in
hand-painted serif lettering. Cream-colored text with dark brown
outlines and subtle gold leaf accents on the ampersand.

Weathered wood texture with visible grain. Decorative coffee bean
and flower motifs frame the text. Warm morning light catches the
dimensional letters. Mounted on exposed brick wall.

Artisanal signage photography, shallow depth of field on background.
```

**VISUAL Score:** 51/60

### Example 7: Commercial (Firefly)

**Input:**
```
tech startup office
```

**Output:**
```
A modern tech startup office space bathed in natural light from
floor-to-ceiling windows. Open floor plan with clusters of standing
desks and collaborative seating areas featuring mid-century modern
furniture in muted earth tones.

Living green walls and potted plants soften the industrial concrete
ceiling with exposed ductwork. Large monitors display colorful data
visualizations. A few team members work casually in the background,
intentionally soft focus.

Editorial interior photography style for architectural digest.
Clean, aspirational, human-centered technology workspace aesthetic.
```

**VISUAL Score:** 50/60

### Example 8: Character (Leonardo)

**Input:**
```
elf warrior fantasy
```

**Output:**
```
A regal elven warrior with sharp angular features and pale silver
hair braided with mithril threads. Pointed ears adorned with
delicate golden cuffs. Eyes that shimmer between green and gold.

Wearing ornate leaf-patterned armor of burnished bronze and deep
forest green leather. A curved elven blade with glowing runic
inscriptions rests at their hip. Autumn forest backdrop with
shafts of golden light filtering through ancient trees.

High fantasy character portrait, detailed concept art style
inspired by Alan Lee and John Howe. Rich, painterly rendering
with sharp focus on the face and armor details.
```

**VISUAL Score:** 54/60

---

## 9. 🏎️ QUICK REFERENCE

### FRAME Checklist
- [ ] **F**ocus: Subject clear? Composition defined?
- [ ] **R**endering: Medium/style specified?
- [ ] **A**tmosphere: Lighting and mood described?
- [ ] **M**odifiers: Platform parameters added?
- [ ] **E**xclusions: Negatives included (if supported)?

### Platform Quick Guide

| Platform | Length | Style | Parameters |
|----------|--------|-------|------------|
| Midjourney | Short-medium | Evocative | Yes (--ar, --s) |
| DALL-E | Medium-long | Natural language | No |
| Stable Diffusion | Medium | Weighted keywords | Yes (weights) |
| Flux | Medium | Technical | Limited |
| Nano Banana Pro | Medium | Creative Director | No |

### Score Targets
- **VISUAL 48+**: Ready for generation
- **VISUAL 42-47**: Minor refinements needed
- **VISUAL <42**: Significant enhancement required

---

*Image Mode transforms vague descriptions into vivid, platform-optimized prompts that produce better results on the first generation.*
