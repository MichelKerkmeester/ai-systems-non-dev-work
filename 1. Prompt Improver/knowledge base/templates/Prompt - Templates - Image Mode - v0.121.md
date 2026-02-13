# Prompt - Templates - Image Mode - v0.121

Specialized mode for optimizing prompts for AI image generators including Flux 2 Pro, Google Imagen 4 (Nano Banana Pro), Runway, Midjourney, DALL-E 3, Stable Diffusion, Seedream, Leonardo, and Ideogram.

**Loading Condition:** TRIGGER
**Purpose:** Transform vague visual requests into structured, platform-optimized image prompts using the FRAME framework and VISUAL scoring system.
**Scope:** Image generation prompts, platform-specific optimization, composition vocabulary, style references, anti-pattern detection.

## TABLE OF CONTENTS

  - 1. 🎯 OBJECTIVE
  - 2. 🖼️ FRAME FRAMEWORK
  - 3. 📊 VISUAL SCORING (IMAGE)
  - 4. 🎨 PLATFORM OPTIMIZATION
  - 5. 📐 COMPOSITION & FRAMING
  - 6. 🎭 STYLE & AESTHETICS
  - 7. 📚 VOCABULARY BANKS
  - 8. ⚠️ ANTI-PATTERNS
  - 9. ✨ TRANSFORMATION EXAMPLES
  - 10. 🔄 ITERATIVE REFINEMENT FLOW
  - 11. 🏎️ QUICK REFERENCE

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

---

### F - FOCUS (30%) - 6 Sub-Categories

The Focus component defines WHAT the viewer sees and HOW the scene is composed.

#### F1. Shot Types

| Shot Type            | Frame Coverage       | Use Case                      | Example Prompt Fragment                    |
| -------------------- | -------------------- | ----------------------------- | ------------------------------------------ |
| **Extreme Wide**     | Full environment     | Establishing, epic landscapes | "extreme wide shot of mountain range"      |
| **Wide Shot**        | Full body + setting  | Context, action, architecture | "wide shot showing full figure in forest"  |
| **Medium Wide**      | Knees-up             | Fashion, full outfit display  | "medium wide capturing outfit and pose"    |
| **Medium Shot**      | Waist-up             | Conversation, portraits       | "medium shot from the waist up"            |
| **Medium Close-Up**  | Chest-up             | Emotional connection          | "medium close-up emphasizing expression"   |
| **Close-Up**         | Face or key detail   | Emotion, detail focus         | "close-up portrait focusing on eyes"       |
| **Extreme Close-Up** | Single feature/macro | Dramatic emphasis, texture    | "extreme close-up of eye reflecting light" |

#### F2. Camera Angles

| Angle                  | Visual Effect           | Psychological Impact    | Example Prompt Fragment                      |
| ---------------------- | ----------------------- | ----------------------- | -------------------------------------------- |
| **Eye Level**          | Neutral, natural        | Relatability, equality  | "shot at eye level for natural perspective"  |
| **Low Angle**          | Subject appears larger  | Power, dominance, hero  | "low angle shot looking up at subject"       |
| **High Angle**         | Subject appears smaller | Vulnerability, overview | "high angle looking down on the scene"       |
| **Bird's Eye**         | Directly overhead       | Omniscient, pattern     | "bird's eye view from directly above"        |
| **Worm's Eye**         | Extreme low from ground | Drama, monumentality    | "worm's eye view from ground level"          |
| **Dutch Angle**        | Tilted horizon          | Tension, unease, action | "dutch angle creating dynamic tension"       |
| **Over-the-Shoulder**  | Behind one subject      | Perspective, narrative  | "over-the-shoulder shot framing the subject" |
| **POV (First-Person)** | Subject's viewpoint     | Immersion, intimacy     | "first-person POV looking at hands"          |

#### F3. Subject Hierarchy

| Level          | Role                   | Visual Treatment               | Example                                        |
| -------------- | ---------------------- | ------------------------------ | ---------------------------------------------- |
| **Primary**    | Main focus of image    | Sharpest, most detailed        | "A woman in red dress as the central subject"  |
| **Secondary**  | Supporting elements    | In focus but less detailed     | "Her companion slightly behind, in soft focus" |
| **Tertiary**   | Environmental context  | Background, establishing scene | "Cafe patrons blurred in the background"       |
| **Background** | Setting and atmosphere | Bokeh, environmental mood      | "Parisian street scene fading into soft bokeh" |

#### F4. Spatial Relationships

| Plane          | Depth Position           | Purpose                    | Example Prompt Fragment                        |
| -------------- | ------------------------ | -------------------------- | ---------------------------------------------- |
| **Foreground** | Closest to viewer        | Framing, depth, interest   | "autumn leaves in foreground framing the shot" |
| **Midground**  | Middle distance          | Main subject placement     | "subject positioned in the midground"          |
| **Background** | Furthest from viewer     | Context, atmosphere        | "mountains fading into atmospheric haze"       |
| **Layered**    | Multiple distinct planes | Rich depth, cinematic feel | "layered composition with fore/mid/background" |

#### F5. Composition Techniques

| Technique              | Description                    | Best For                   |
| ---------------------- | ------------------------------ | -------------------------- |
| **Rule of Thirds**     | Subject at grid intersections  | Balanced, classical        |
| **Center Dominant**    | Subject dead center            | Symmetry, power, formality |
| **Golden Ratio**       | Spiral-based placement         | Natural, organic, artistic |
| **Leading Lines**      | Lines draw eye to subject      | Dynamic, directional       |
| **Frame Within Frame** | Natural framing elements       | Depth, artistic focus      |
| **Negative Space**     | Empty space emphasizes subject | Minimalist, editorial      |
| **Symmetry**           | Mirror balance                 | Architecture, formal       |
| **Dynamic Diagonal**   | Diagonal lines create energy   | Action, movement           |

#### F6. Subject Specificity

| Category    | Vague            | Specific                                      |
| ----------- | ---------------- | --------------------------------------------- |
| **Person**  | "a woman"        | "a woman in her 30s with auburn curly hair"   |
| **Animal**  | "a dog"          | "a golden retriever puppy with fluffy coat"   |
| **Object**  | "a car"          | "a 1967 Mustang Shelby GT500 in racing green" |
| **Place**   | "a city"         | "rain-slicked Tokyo alley with neon signs"    |
| **Emotion** | "sad expression" | "melancholic gaze with glistening eyes"       |

---

### R - RENDERING (20%) - 6 Sub-Categories

The Rendering component defines the visual STYLE and artistic MEDIUM.

#### R1. Photography Styles

| Style           | Characteristics             | Technical Markers                          | Use Case                    |
| --------------- | --------------------------- | ------------------------------------------ | --------------------------- |
| **Editorial**   | Magazine-quality, polished  | High-key lighting, styled, aspirational    | Fashion, lifestyle          |
| **Documentary** | Authentic, unposed          | Natural light, candid, raw                 | Storytelling, journalism    |
| **Fashion**     | Glamorous, artistic         | Dramatic lighting, bold composition        | Apparel, beauty             |
| **Portrait**    | Subject-focused, flattering | 85mm f/1.4, bokeh, studio or natural light | Headshots, personal         |
| **Product**     | Clean, commercial           | White/gradient background, soft boxes      | E-commerce, advertising     |
| **Street**      | Urban, spontaneous          | 35mm, available light, grain               | Urban life, culture         |
| **Fine Art**    | Conceptual, artistic        | Intentional, gallery-worthy                | Exhibition, artistic vision |
| **Lifestyle**   | Natural, relatable          | Soft natural light, authentic moments      | Branding, social media      |

#### R2. Illustration Styles

| Style             | Visual Characteristics             | Example Prompt Fragment                   |
| ----------------- | ---------------------------------- | ----------------------------------------- |
| **Vector**        | Clean lines, flat colors, scalable | "vector illustration with clean lines"    |
| **Hand-Drawn**    | Organic, imperfect, textured       | "hand-drawn sketch with pencil texture"   |
| **Cel-Shaded**    | Hard shadows, anime-influenced     | "cel-shaded illustration style"           |
| **Ink**           | Bold linework, high contrast       | "ink illustration with bold brushwork"    |
| **Watercolor**    | Soft washes, translucent layers    | "delicate watercolor with soft washes"    |
| **Digital Paint** | Painterly with digital precision   | "digital painting with visible brushwork" |
| **Charcoal**      | Soft, smudged, dramatic            | "charcoal drawing with dramatic shadows"  |
| **Gouache**       | Opaque, matte, illustrative        | "gouache illustration with matte finish"  |

#### R3. 3D Rendering Styles

| Style               | Visual Characteristics                | Example Prompt Fragment                   |
| ------------------- | ------------------------------------- | ----------------------------------------- |
| **Pixar/Disney**    | Stylized, appealing, polished         | "Pixar-style 3D character render"         |
| **Clay/Claymation** | Handmade, textured, tactile           | "clay render with fingerprint textures"   |
| **Isometric**       | Fixed 30-degree angle, no perspective | "isometric 3D view of the scene"          |
| **Hyperreal**       | Indistinguishable from photo          | "hyperrealistic 3D render, Octane"        |
| **Low-Poly**        | Geometric, faceted, stylized          | "low-poly 3D art with faceted geometry"   |
| **Octane/Corona**   | Photorealistic rendering engines      | "rendered in Octane, ray-traced lighting" |
| **Voxel**           | Cube-based, Minecraft-like            | "voxel art style 3D render"               |
| **Stylized 3D**     | Exaggerated proportions, artistic     | "stylized 3D with exaggerated features"   |

#### R4. Movement & Era Aesthetics

| Movement/Era         | Visual Characteristics              | Example Prompt Fragment                      |
| -------------------- | ----------------------------------- | -------------------------------------------- |
| **Cyberpunk**        | Neon, rain, urban decay, tech       | "cyberpunk aesthetic with neon and rain"     |
| **Retrofuturism**    | Past's vision of future             | "retrofuturistic 1960s space age design"     |
| **Minimalist**       | Sparse, essential, clean            | "minimalist composition with negative space" |
| **Brutalist**        | Raw concrete, imposing, geometric   | "brutalist architecture aesthetic"           |
| **Art Nouveau**      | Organic curves, nature motifs       | "art nouveau style with flowing lines"       |
| **Art Deco**         | Geometric, luxurious, bold          | "art deco design with gold accents"          |
| **1970s Kodachrome** | Warm tones, nostalgic grain         | "1970s Kodachrome aesthetic, warm tones"     |
| **Film Noir**        | High contrast B&W, dramatic shadows | "film noir with dramatic chiaroscuro"        |
| **2000s OVA**        | Early digital anime aesthetic       | "2000s anime OVA visual style"               |
| **Vaporwave**        | 80s/90s nostalgia, pink/cyan/purple | "vaporwave aesthetic with retro elements"    |

#### R5. Anime & Manga Sub-Types

| Style                | Characteristics                      | Example Prompt Fragment               |
| -------------------- | ------------------------------------ | ------------------------------------- |
| **Standard Anime**   | Clean lines, large eyes, colorful    | "anime style illustration"            |
| **Chibi/SD**         | Super-deformed, cute proportions     | "chibi character with oversized head" |
| **Q-Style**          | Chinese cute style, simplified       | "Q-style character design"            |
| **Manga Screentone** | Black & white with dot patterns      | "manga panel with screentone shading" |
| **Cel Shading**      | Hard-edged shadows, flat colors      | "cel-shaded anime with bold shadows"  |
| **Painterly Anime**  | Anime meets digital painting         | "painterly anime style illustration"  |
| **90s Anime**        | Softer colors, distinctive eye style | "90s anime aesthetic"                 |
| **Studio Ghibli**    | Soft, detailed backgrounds, warm     | "Studio Ghibli inspired illustration" |

#### R6. Fine Art Movements

| Movement          | Characteristics                   | Example Prompt Fragment                     |
| ----------------- | --------------------------------- | ------------------------------------------- |
| **Impressionism** | Visible brushstrokes, light focus | "impressionist painting with visible brush" |
| **Surrealism**    | Dreamlike, impossible, symbolic   | "surrealist scene in style of Dali"         |
| **Pop Art**       | Bold colors, commercial imagery   | "pop art style with Warhol influence"       |
| **Baroque**       | Dramatic, ornate, rich colors     | "baroque painting with dramatic lighting"   |
| **Renaissance**   | Classical proportions, realism    | "renaissance painting technique"            |
| **Expressionism** | Emotional, distorted, vivid       | "expressionist style with bold emotion"     |

---

### A - ATMOSPHERE (20%) - 7 Sub-Categories

The Atmosphere component defines the FEELING and MOOD of the image.

#### A1. Lighting with Color Temperature (Kelvin)

| Lighting Type       | Kelvin Range | Visual Quality                 | Mood                        |
| ------------------- | ------------ | ------------------------------ | --------------------------- |
| **Candlelight**     | 1800-2000K   | Warm orange, intimate          | Romantic, cozy, historical  |
| **Golden Hour**     | 2700-3500K   | Warm, soft, directional        | Romantic, dreamy, cinematic |
| **Tungsten Indoor** | 3000-3500K   | Warm artificial, yellow-orange | Cozy, domestic, nostalgic   |
| **Sunrise/Sunset**  | 3500-4500K   | Warm to neutral transition     | Hopeful, transitional       |
| **Studio Softbox**  | 5000-5500K   | Neutral, balanced, clean       | Professional, commercial    |
| **Daylight**        | 5500-6500K   | Neutral to cool, clear         | Natural, fresh, honest      |
| **Harsh Midday**    | 5500-6000K   | Direct, high contrast          | Documentary, intense        |
| **Blue Hour**       | 5600-9000K+  | Cool blue, twilight            | Mysterious, melancholic     |
| **Overcast**        | 6500-7500K   | Soft, diffused, cool           | Subdued, peaceful, even     |
| **Shade**           | 7000-8000K   | Cool, soft, open               | Gentle, calm                |
| **Chiaroscuro**     | Variable     | Dramatic light/shadow          | Dramatic, classical, moody  |
| **Volumetric**      | Variable     | Visible light rays/god rays    | Atmospheric, divine, epic   |
| **Neon**            | Variable     | Colorful artificial            | Cyberpunk, urban, edgy      |

#### A2. Mood Vocabulary Bank

| Mood Category     | Descriptors                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| **Warm/Positive** | Sun-kissed, warm, intimate, cozy, inviting, joyful, hopeful, serene    |
| **Ethereal**      | Ethereal, dreamy, otherworldly, mystical, transcendent, floating       |
| **Cinematic**     | Cinematic, dramatic, epic, sweeping, theatrical, larger-than-life      |
| **Dark/Moody**    | Ominous, melancholic, moody, noir-inspired, brooding, somber, haunting |
| **Energetic**     | Dynamic, vibrant, electric, pulsing, energetic, explosive              |
| **Peaceful**      | Tranquil, calm, meditative, still, quiet, restful, harmonious          |
| **Mysterious**    | Enigmatic, secretive, hidden, veiled, cryptic, alluring                |
| **Nostalgic**     | Vintage, retro, wistful, sentimental, timeless, classic                |

#### A3. Color Temperature Systems

| Palette           | Color Composition                | Mood/Application             | HEX Examples               |
| ----------------- | -------------------------------- | ---------------------------- | -------------------------- |
| **Warm Earth**    | Terracotta, ochre, sienna, umber | Organic, natural, grounded   | #CC7351, #D4A574, #8B4513  |
| **Cool Nordic**   | Slate, ice blue, white, grey     | Clean, minimal, Scandinavian | #708090, #B0E0E6, #F5F5F5  |
| **Sunset**        | Orange, coral, pink, purple      | Romantic, dramatic, warm     | #FF6B6B, #FF8C69, #C06C84  |
| **Forest**        | Deep green, brown, gold          | Natural, grounded, organic   | #228B22, #8B4513, #DAA520  |
| **Ocean**         | Teal, navy, seafoam              | Calm, depth, serene          | #008080, #000080, #98FF98  |
| **Neon Cyber**    | Hot pink, electric blue, lime    | Futuristic, edgy, urban      | #FF00FF, #00FFFF, #39FF14  |
| **Vintage Muted** | Faded tones, sepia hints, cream  | Nostalgic, timeless, soft    | #D4C5B2, #A89F91, #F5F0E6  |
| **Pastel Dream**  | Soft pink, lavender, mint, peach | Gentle, whimsical, delicate  | #FFB6C1, #E6E6FA, #98FB98  |
| **Monochromatic** | Single hue variations            | Unified, artistic, bold      | Various single-hue ranges  |
| **Complementary** | Opposite color wheel pairs       | Vibrant, high contrast       | Blue/Orange, Purple/Yellow |

#### A4. Weather & Environmental Conditions

| Condition          | Visual Effect               | Mood                       | Example Prompt Fragment               |
| ------------------ | --------------------------- | -------------------------- | ------------------------------------- |
| **Volumetric Fog** | Visible atmosphere, depth   | Mysterious, ethereal       | "volumetric fog diffusing light"      |
| **Rain-Soaked**    | Wet surfaces, reflections   | Moody, cinematic, urban    | "rain-soaked streets reflecting neon" |
| **Sun-Dappled**    | Light through foliage       | Peaceful, natural, dreamy  | "sun-dappled forest floor"            |
| **Stormy**         | Dark clouds, dramatic light | Tension, drama, power      | "stormy sky with dramatic clouds"     |
| **Mist/Haze**      | Soft atmospheric diffusion  | Dreamy, mysterious         | "morning mist hanging low"            |
| **Snow**           | White, reflective, cold     | Pure, quiet, isolating     | "fresh snow covering landscape"       |
| **Dust/Sand**      | Warm particulates, haze     | Desert, apocalyptic, harsh | "dust particles in sunbeam"           |
| **Clear**          | Crisp, sharp visibility     | Clean, honest, vibrant     | "crystal clear atmosphere"            |

#### A5. Time of Day

| Time               | Light Quality                  | Color Cast           | Mood                      |
| ------------------ | ------------------------------ | -------------------- | ------------------------- |
| **Pre-Dawn**       | Deep blue, minimal light       | Cool blue to purple  | Quiet, anticipatory       |
| **Dawn**           | Soft, pink to orange emerging  | Pink, peach, gold    | Hopeful, fresh, new       |
| **Golden Hour AM** | Warm, soft, directional        | Warm gold, amber     | Romantic, flattering      |
| **Morning**        | Bright, clean, energetic       | Neutral to warm      | Fresh, productive, clear  |
| **Midday**         | Harsh, overhead, high contrast | Neutral, desaturated | Intense, documentary      |
| **Afternoon**      | Warm, angled light             | Warm, amber tones    | Relaxed, golden           |
| **Golden Hour PM** | Rich, warm, long shadows       | Deep gold, orange    | Romantic, cinematic       |
| **Blue Hour**      | Cool, twilight, ethereal       | Deep blue, purple    | Mysterious, magical       |
| **Night**          | Artificial or moonlight        | Variable by source   | Dramatic, intimate, urban |

#### A6. Lighting Techniques

| Technique     | Setup Description                   | Effect                    | Best For             |
| ------------- | ----------------------------------- | ------------------------- | -------------------- |
| **Rembrandt** | 45-degree key light                 | Triangle under eye shadow | Dramatic portraits   |
| **Butterfly** | Overhead frontal light              | Shadow under nose         | Beauty, glamour      |
| **Split**     | Light from one side only            | Half face lit/dark        | Dramatic, mysterious |
| **Rim/Edge**  | Backlight creating outline          | Subject separation        | Cinematic, dramatic  |
| **Loop**      | Slight side angle                   | Small nose shadow         | Flattering portraits |
| **Broad**     | Light on face side toward camera    | Face appears wider        | Thinner subjects     |
| **Short**     | Light on face side away from camera | Face appears narrower     | Rounder subjects     |
| **High Key**  | Bright, minimal shadows             | Airy, optimistic          | Fashion, commercial  |
| **Low Key**   | Predominantly dark, shadows         | Dramatic, moody           | Film noir, drama     |

#### A7. Depth of Field & Focus

| DOF Type          | Aperture Equivalent | Visual Effect                  | Use Case                   |
| ----------------- | ------------------- | ------------------------------ | -------------------------- |
| **Ultra Shallow** | f/1.2 - f/1.8       | Extreme bokeh, dreamy          | Intimate portraits, detail |
| **Shallow**       | f/2 - f/2.8         | Soft background blur           | Portraits, products        |
| **Moderate**      | f/4 - f/5.6         | Subject sharp, background soft | Environmental portraits    |
| **Deep**          | f/8 - f/11          | Most elements sharp            | Landscapes, group shots    |
| **Maximum**       | f/16 - f/22         | Everything sharp, starburst    | Architecture, landscapes   |
| **Tilt-Shift**    | Variable selective  | Miniature/toy effect           | Cityscapes, creative       |

---

### M - MODIFIERS (15%) - 6 Sub-Categories

The Modifiers component defines TECHNICAL PARAMETERS and platform-specific controls.

#### M1. Aspect Ratio Presets

| Ratio    | Dimensions Example | Platform/Use Case                  | Best For                 |
| -------- | ------------------ | ---------------------------------- | ------------------------ |
| **1:1**  | 1024x1024          | Instagram, social media square     | Profiles, product shots  |
| **4:5**  | 1080x1350          | Instagram portrait, Pinterest      | Portraits, fashion       |
| **3:2**  | 1536x1024          | Standard photography (DSLR native) | Photography, prints      |
| **16:9** | 1920x1080          | Cinematic, video, widescreen       | Film stills, banners     |
| **9:16** | 1080x1920          | Stories, Reels, TikTok, mobile     | Vertical video, stories  |
| **2:3**  | 1024x1536          | Portrait orientation, posters      | Portraits, book covers   |
| **21:9** | 2560x1080          | Ultra-widescreen, cinematic        | Epic landscapes, banners |
| **4:3**  | 1024x768           | Traditional screen ratio           | Presentations, classic   |

#### M2. Platform-Specific Quality Markers

| Platform       | Quality Markers                              | Avoid                      |
| -------------- | -------------------------------------------- | -------------------------- |
| **Flux 2 Pro** | Not needed (understood inherently)           | "4K, 8K, masterpiece"      |
| **Imagen 4**   | Not needed (quality is automatic)            | Quality keywords           |
| **Midjourney** | `--q 2` for max, `--style raw` for realism   | Excessive quality words    |
| **DALL-E 3**   | Describe detail level naturally              | Tag-style quality boosters |
| **SD/SDXL**    | "masterpiece, best quality, highly detailed" | Nothing (these help)       |
| **Leonardo**   | Built-in quality presets                     | Redundant quality terms    |
| **Ideogram**   | Not needed                                   | Quality keywords           |

#### M3. Emphasis Syntax by Platform

| Platform       | Emphasis Method                             | Example                         |
| -------------- | ------------------------------------------- | ------------------------------- |
| **Midjourney** | `::2` weight, `--sref` style, `--cref` char | `dragon::2 castle::1`           |
| **SD/SDXL**    | `(element:1.4)` weight syntax               | `(golden hair:1.3)`             |
| **FLUX**       | "with emphasis on", "focusing on"           | "with emphasis on her eyes"     |
| **DALL-E 3**   | Descriptive emphasis, word order            | "The most prominent feature..." |
| **Imagen 4**   | Natural language priority                   | "primarily featuring..."        |

#### M4. Reference Parameters

| Platform       | Style Reference            | Character Reference          | Usage                     |
| -------------- | -------------------------- | ---------------------------- | ------------------------- |
| **Midjourney** | `--sref [URL]`             | `--cref [URL]`               | Append to prompt end      |
| **Flux 2 Pro** | Upload reference images    | Multi-reference (up to 10)   | API/interface supported   |
| **Imagen 4**   | Upload up to 14 references | Character consistency mode   | Multi-reference supported |
| **SD/SDXL**    | ControlNet, IP-Adapter     | LoRA for specific characters | External tools required   |

#### M5. Technical Camera Settings

| Setting        | Options                             | Effect                       | Example                      |
| -------------- | ----------------------------------- | ---------------------------- | ---------------------------- |
| **Lens**       | 14mm, 24mm, 35mm, 50mm, 85mm, 200mm | FOV, compression, distortion | "shot with 85mm lens"        |
| **Aperture**   | f/1.4, f/2.8, f/8, f/16             | Depth of field               | "f/1.4 shallow depth"        |
| **Camera**     | Canon, Nikon, Sony, Hasselblad      | Image character              | "shot on Hasselblad"         |
| **Film Stock** | Kodak Portra, Fuji Pro, Cinestill   | Color rendering              | "Kodak Portra 400 aesthetic" |
| **Format**     | 35mm, Medium Format, Large Format   | Detail, aspect, look         | "medium format photography"  |

#### M6. Render Settings (3D/CGI)

| Setting         | Options                       | Effect                        |
| --------------- | ----------------------------- | ----------------------------- |
| **Renderer**    | Octane, Corona, Arnold, V-Ray | Render quality and style      |
| **Samples**     | High sample count             | Noise reduction, clarity      |
| **GI**          | Global illumination           | Realistic light bounce        |
| **Ray Tracing** | RTX, path tracing             | Realistic reflections/shadows |
| **Subsurface**  | SSS, translucency             | Skin, wax, organic materials  |

---

### E - EXCLUSIONS (15%) - 5 Sub-Categories

The Exclusions component defines what to AVOID (platform-dependent).

#### E1. Structured Negative Categories

| Category              | Common Issues                       | Negative Prompt Terms                           |
| --------------------- | ----------------------------------- | ----------------------------------------------- |
| **Quality Issues**    | Blur, noise, artifacts, compression | blurry, low quality, jpeg artifacts, pixelated  |
| **Anatomical**        | Wrong fingers, limbs, proportions   | bad anatomy, extra fingers, deformed hands      |
| **Face/Body**         | Distorted features, asymmetry       | ugly, disfigured, bad proportions, asymmetric   |
| **Stylistic**         | Unwanted artistic elements          | cartoon (if photorealistic), anime (if photo)   |
| **Unwanted Elements** | Watermarks, text, logos, borders    | watermark, signature, text, logo, frame, border |
| **Composition**       | Bad framing, cropping issues        | cropped, out of frame, bad composition          |

#### E2. Universal Negative Foundation Template

For platforms supporting negative prompts (SD/SDXL, Leonardo):

```
BASIC FOUNDATION:
lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit,
fewer digits, cropped, worst quality, low quality, normal quality,
jpeg artifacts, signature, watermark, username, blurry

EXTENDED FOUNDATION:
lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit,
fewer digits, cropped, worst quality, low quality, normal quality,
jpeg artifacts, signature, watermark, username, blurry, bad feet,
poorly drawn hands, poorly drawn face, mutation, deformed, ugly,
duplicate, morbid, mutilated, extra fingers, fused fingers, long neck,
bad proportions, malformed limbs, missing arms, missing legs, extra arms,
extra legs, mutated hands, disfigured, gross proportions
```

#### E3. Platform Exclusion Handling

| Platform       | Negative Support | Handling Strategy                            |
| -------------- | ---------------- | -------------------------------------------- |
| **Flux 2 Pro** | None (ignored)   | Describe what you WANT positively            |
| **Imagen 4**   | None (ignored)   | Use positive descriptors only                |
| **Midjourney** | Partial (`--no`) | `--no text, watermark` for simple exclusions |
| **DALL-E 3**   | None             | Rephrase negatives as positives              |
| **SD/SDXL**    | Full support     | Use comprehensive negative prompt            |
| **Leonardo**   | Full support     | Use structured negative prompt               |
| **Ideogram**   | None             | Positive descriptions only                   |

#### E4. Positive Rephrasing Guide

For platforms without negative prompts, rephrase exclusions as positive descriptions:

| Instead of (Negative)        | Use (Positive)                                 |
| ---------------------------- | ---------------------------------------------- |
| "No blur"                    | "Sharp focus, crisp details"                   |
| "No watermark"               | "Clean, unobstructed image"                    |
| "Avoid cartoon style"        | "Photorealistic rendering"                     |
| "No extra fingers"           | "Anatomically correct hands with five fingers" |
| "Not crowded"                | "Minimalist composition with breathing room"   |
| "No harsh lighting"          | "Soft, diffused lighting"                      |
| "Avoid cluttered background" | "Clean, simple background with subtle bokeh"   |

#### E5. Style-Specific Exclusions

| Target Style       | Exclude These                                   | Why                 |
| ------------------ | ----------------------------------------------- | ------------------- |
| **Photorealistic** | illustration, cartoon, anime, painting, drawing | Prevent stylization |
| **Clean Product**  | background elements, shadows, distractions      | Maintain focus      |
| **Portrait**       | full body, environment, wide shot               | Keep intimacy       |
| **Minimalist**     | clutter, busy, detailed background, ornate      | Preserve simplicity |
| **Professional**   | amateur, casual, messy, candid                  | Maintain polish     |

---

### FRAME Sub-Category Summary

| Component          | Sub-Categories                                                                                                                 | Count  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ------ |
| **F - Focus**      | Shot Types, Camera Angles, Subject Hierarchy, Spatial Relationships, Composition Techniques, Subject Specificity               | 6      |
| **R - Rendering**  | Photography Styles, Illustration Styles, 3D Rendering, Movement/Era Aesthetics, Anime/Manga Sub-Types, Fine Art Movements      | 6      |
| **A - Atmosphere** | Lighting (Kelvin), Mood Vocabulary, Color Temperature, Weather/Environmental, Time of Day, Lighting Techniques, Depth of Field | 7      |
| **M - Modifiers**  | Aspect Ratios, Quality Markers, Emphasis Syntax, Reference Parameters, Camera Settings, Render Settings                        | 6      |
| **E - Exclusions** | Structured Negatives, Universal Foundation, Platform Handling, Positive Rephrasing, Style-Specific                             | 5      |
| **TOTAL**          |                                                                                                                                | **30** |

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

| Iteration | Focus                  | Typical Adjustments            |
| --------- | ---------------------- | ------------------------------ |
| 1st       | Composition validation | Subject, framing, perspective  |
| 2nd       | Style calibration      | Medium, aesthetic, technique   |
| 3rd       | Atmosphere polish      | Lighting, color, mood          |
| 4th+      | Detail refinement      | Specific elements, fine-tuning |

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

| Score     | Grade      | Action                           |
| --------- | ---------- | -------------------------------- |
| **54-60** | Excellent  | Ship immediately                 |
| **48-53** | Good       | Ready for generation             |
| **40-47** | Adequate   | Minor refinements needed         |
| **<40**   | Needs work | Significant enhancement required |

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
