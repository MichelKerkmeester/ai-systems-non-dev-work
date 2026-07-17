---
title: "Image Mode Library"
description: "Reusable FRAME banks, platform structures, examples, refinement templates and quick lookups for image prompts."
version: "0.101"
contextType: asset
importance_tier: normal
trigger_phrases:
  - "$image assets"
  - "FRAME vocabulary banks"
  - "image platform structures"
  - "image prompt examples"
  - "image refinement templates"
---

# Image Mode Library - v0.101

Reusable FRAME prompt banks, platform structures, examples, refinement templates and quick lookups for image generation prompts.

---

## 1. OVERVIEW

### Purpose

Provides copyable image-generation vocabulary, platform prompt structures, examples, refinement templates and quick lookup material separated from the Image Mode workflow.

### Usage

Load this with `references/image-mode.md` for `$image` or `$img` work. Copy, adapt or consult the relevant section after the reference workflow identifies the target platform and FRAME needs.

---

## 2. FRAME SUB-CATEGORY BANKS

### F - FOCUS (30%) - 6 Sub-Categories

The Focus component defines WHAT the viewer sees and HOW the scene is composed.

#### F1. Shot Types

- **Extreme Wide**
  - Frame Coverage: Full environment
  - Use Case: Establishing, epic landscapes
  - Example Prompt Fragment: "extreme wide shot of mountain range"
- **Wide Shot**
  - Frame Coverage: Full body + setting
  - Use Case: Context, action, architecture
  - Example Prompt Fragment: "wide shot showing full figure in forest"
- **Medium Wide**
  - Frame Coverage: Knees-up
  - Use Case: Fashion, full outfit display
  - Example Prompt Fragment: "medium wide capturing outfit and pose"
- **Medium Shot**
  - Frame Coverage: Waist-up
  - Use Case: Conversation, portraits
  - Example Prompt Fragment: "medium shot from the waist up"
- **Medium Close-Up**
  - Frame Coverage: Chest-up
  - Use Case: Emotional connection
  - Example Prompt Fragment: "medium close-up emphasizing expression"
- **Close-Up**
  - Frame Coverage: Face or key detail
  - Use Case: Emotion, detail focus
  - Example Prompt Fragment: "close-up portrait focusing on eyes"
- **Extreme Close-Up**
  - Frame Coverage: Single feature/macro
  - Use Case: Dramatic emphasis, texture
  - Example Prompt Fragment: "extreme close-up of eye reflecting light"

#### F2. Camera Angles

- **Eye Level**
  - Visual Effect: Neutral, natural
  - Psychological Impact: Relatability, equality
  - Example Prompt Fragment: "shot at eye level for natural perspective"
- **Low Angle**
  - Visual Effect: Subject appears larger
  - Psychological Impact: Power, dominance, hero
  - Example Prompt Fragment: "low angle shot looking up at subject"
- **High Angle**
  - Visual Effect: Subject appears smaller
  - Psychological Impact: Vulnerability, overview
  - Example Prompt Fragment: "high angle looking down on the scene"
- **Bird's Eye**
  - Visual Effect: Directly overhead
  - Psychological Impact: Omniscient, pattern
  - Example Prompt Fragment: "bird's eye view from directly above"
- **Worm's Eye**
  - Visual Effect: Extreme low from ground
  - Psychological Impact: Drama, monumentality
  - Example Prompt Fragment: "worm's eye view from ground level"
- **Dutch Angle**
  - Visual Effect: Tilted horizon
  - Psychological Impact: Tension, unease, action
  - Example Prompt Fragment: "dutch angle creating dynamic tension"
- **Over-the-Shoulder**
  - Visual Effect: Behind one subject
  - Psychological Impact: Perspective, narrative
  - Example Prompt Fragment: "over-the-shoulder shot framing the subject"
- **POV (First-Person)**
  - Visual Effect: Subject's viewpoint
  - Psychological Impact: Immersion, intimacy
  - Example Prompt Fragment: "first-person POV looking at hands"

#### F3. Subject Hierarchy

- **Primary**
  - Role: Main focus of image
  - Visual Treatment: Sharpest, most detailed
  - Example: "A woman in red dress as the central subject"
- **Secondary**
  - Role: Supporting elements
  - Visual Treatment: In focus but less detailed
  - Example: "Her companion slightly behind, in soft focus"
- **Tertiary**
  - Role: Environmental context
  - Visual Treatment: Background, establishing scene
  - Example: "Cafe patrons blurred in the background"
- **Background**
  - Role: Setting and atmosphere
  - Visual Treatment: Bokeh, environmental mood
  - Example: "Parisian street scene fading into soft bokeh"

#### F4. Spatial Relationships

- **Foreground**
  - Depth Position: Closest to viewer
  - Purpose: Framing, depth, interest
  - Example Prompt Fragment: "autumn leaves in foreground framing the shot"
- **Midground**
  - Depth Position: Middle distance
  - Purpose: Main subject placement
  - Example Prompt Fragment: "subject positioned in the midground"
- **Background**
  - Depth Position: Furthest from viewer
  - Purpose: Context, atmosphere
  - Example Prompt Fragment: "mountains fading into atmospheric haze"
- **Layered**
  - Depth Position: Multiple distinct planes
  - Purpose: Rich depth, cinematic feel
  - Example Prompt Fragment: "layered composition with fore/mid/background"

#### F5. Composition Techniques

- **Rule of Thirds**
  - Description: Subject at grid intersections
  - Best For: Balanced, classical
- **Center Dominant**
  - Description: Subject dead center
  - Best For: Symmetry, power, formality
- **Golden Ratio**
  - Description: Spiral-based placement
  - Best For: Natural, organic, artistic
- **Leading Lines**
  - Description: Lines draw eye to subject
  - Best For: Dynamic, directional
- **Frame Within Frame**
  - Description: Natural framing elements
  - Best For: Depth, artistic focus
- **Negative Space**
  - Description: Empty space emphasizes subject
  - Best For: Minimalist, editorial
- **Symmetry**
  - Description: Mirror balance
  - Best For: Architecture, formal
- **Dynamic Diagonal**
  - Description: Diagonal lines create energy
  - Best For: Action, movement

#### F6. Subject Specificity

- **Person**
  - Vague: "a woman"
  - Specific: "a woman in her 30s with auburn curly hair"
- **Animal**
  - Vague: "a dog"
  - Specific: "a golden retriever puppy with fluffy coat"
- **Object**
  - Vague: "a car"
  - Specific: "a 1967 Mustang Shelby GT500 in racing green"
- **Place**
  - Vague: "a city"
  - Specific: "rain-slicked Tokyo alley with neon signs"
- **Emotion**
  - Vague: "sad expression"
  - Specific: "melancholic gaze with glistening eyes"

---

### R - RENDERING (20%) - 6 Sub-Categories

The Rendering component defines the visual STYLE and artistic MEDIUM.

#### R1. Photography Styles

- **Editorial**
  - Characteristics: Magazine-quality, polished
  - Technical Markers: High-key lighting, styled, aspirational
  - Use Case: Fashion, lifestyle
- **Documentary**
  - Characteristics: Authentic, unposed
  - Technical Markers: Natural light, candid, raw
  - Use Case: Storytelling, journalism
- **Fashion**
  - Characteristics: Glamorous, artistic
  - Technical Markers: Dramatic lighting, bold composition
  - Use Case: Apparel, beauty
- **Portrait**
  - Characteristics: Subject-focused, flattering
  - Technical Markers: 85mm f/1.4, bokeh, studio or natural light
  - Use Case: Headshots, personal
- **Product**
  - Characteristics: Clean, commercial
  - Technical Markers: White/gradient background, soft boxes
  - Use Case: E-commerce, advertising
- **Street**
  - Characteristics: Urban, spontaneous
  - Technical Markers: 35mm, available light, grain
  - Use Case: Urban life, culture
- **Fine Art**
  - Characteristics: Conceptual, artistic
  - Technical Markers: Intentional, gallery-worthy
  - Use Case: Exhibition, artistic vision
- **Lifestyle**
  - Characteristics: Natural, relatable
  - Technical Markers: Soft natural light, authentic moments
  - Use Case: Branding, social media

#### R2. Illustration Styles

- **Vector**
  - Visual Characteristics: Clean lines, flat colors, scalable
  - Example Prompt Fragment: "vector illustration with clean lines"
- **Hand-Drawn**
  - Visual Characteristics: Organic, imperfect, textured
  - Example Prompt Fragment: "hand-drawn sketch with pencil texture"
- **Cel-Shaded**
  - Visual Characteristics: Hard shadows, anime-influenced
  - Example Prompt Fragment: "cel-shaded illustration style"
- **Ink**
  - Visual Characteristics: Bold linework, high contrast
  - Example Prompt Fragment: "ink illustration with bold brushwork"
- **Watercolor**
  - Visual Characteristics: Soft washes, translucent layers
  - Example Prompt Fragment: "delicate watercolor with soft washes"
- **Digital Paint**
  - Visual Characteristics: Painterly with digital precision
  - Example Prompt Fragment: "digital painting with visible brushwork"
- **Charcoal**
  - Visual Characteristics: Soft, smudged, dramatic
  - Example Prompt Fragment: "charcoal drawing with dramatic shadows"
- **Gouache**
  - Visual Characteristics: Opaque, matte, illustrative
  - Example Prompt Fragment: "gouache illustration with matte finish"

#### R3. 3D Rendering Styles

- **Pixar/Disney**
  - Visual Characteristics: Stylized, appealing, polished
  - Example Prompt Fragment: "Pixar-style 3D character render"
- **Clay/Claymation**
  - Visual Characteristics: Handmade, textured, tactile
  - Example Prompt Fragment: "clay render with fingerprint textures"
- **Isometric**
  - Visual Characteristics: Fixed 30-degree angle, no perspective
  - Example Prompt Fragment: "isometric 3D view of the scene"
- **Hyperreal**
  - Visual Characteristics: Indistinguishable from photo
  - Example Prompt Fragment: "hyperrealistic 3D render, Octane"
- **Low-Poly**
  - Visual Characteristics: Geometric, faceted, stylized
  - Example Prompt Fragment: "low-poly 3D art with faceted geometry"
- **Octane/Corona**
  - Visual Characteristics: Photorealistic rendering engines
  - Example Prompt Fragment: "rendered in Octane, ray-traced lighting"
- **Voxel**
  - Visual Characteristics: Cube-based, Minecraft-like
  - Example Prompt Fragment: "voxel art style 3D render"
- **Stylized 3D**
  - Visual Characteristics: Exaggerated proportions, artistic
  - Example Prompt Fragment: "stylized 3D with exaggerated features"

#### R4. Movement & Era Aesthetics

- **Cyberpunk**
  - Visual Characteristics: Neon, rain, urban decay, tech
  - Example Prompt Fragment: "cyberpunk aesthetic with neon and rain"
- **Retrofuturism**
  - Visual Characteristics: Past's vision of future
  - Example Prompt Fragment: "retrofuturistic 1960s space age design"
- **Minimalist**
  - Visual Characteristics: Sparse, essential, clean
  - Example Prompt Fragment: "minimalist composition with negative space"
- **Brutalist**
  - Visual Characteristics: Raw concrete, imposing, geometric
  - Example Prompt Fragment: "brutalist architecture aesthetic"
- **Art Nouveau**
  - Visual Characteristics: Organic curves, nature motifs
  - Example Prompt Fragment: "art nouveau style with flowing lines"
- **Art Deco**
  - Visual Characteristics: Geometric, luxurious, bold
  - Example Prompt Fragment: "art deco design with gold accents"
- **1970s Kodachrome**
  - Visual Characteristics: Warm tones, nostalgic grain
  - Example Prompt Fragment: "1970s Kodachrome aesthetic, warm tones"
- **Film Noir**
  - Visual Characteristics: High contrast B&W, dramatic shadows
  - Example Prompt Fragment: "film noir with dramatic chiaroscuro"
- **2000s OVA**
  - Visual Characteristics: Early digital anime aesthetic
  - Example Prompt Fragment: "2000s anime OVA visual style"
- **Vaporwave**
  - Visual Characteristics: 80s/90s nostalgia, pink/cyan/purple
  - Example Prompt Fragment: "vaporwave aesthetic with retro elements"

#### R5. Anime & Manga Sub-Types

- **Standard Anime**
  - Characteristics: Clean lines, large eyes, colorful
  - Example Prompt Fragment: "anime style illustration"
- **Chibi/SD**
  - Characteristics: Super-deformed, cute proportions
  - Example Prompt Fragment: "chibi character with oversized head"
- **Q-Style**
  - Characteristics: Chinese cute style, simplified
  - Example Prompt Fragment: "Q-style character design"
- **Manga Screentone**
  - Characteristics: Black & white with dot patterns
  - Example Prompt Fragment: "manga panel with screentone shading"
- **Cel Shading**
  - Characteristics: Hard-edged shadows, flat colors
  - Example Prompt Fragment: "cel-shaded anime with bold shadows"
- **Painterly Anime**
  - Characteristics: Anime meets digital painting
  - Example Prompt Fragment: "painterly anime style illustration"
- **90s Anime**
  - Characteristics: Softer colors, distinctive eye style
  - Example Prompt Fragment: "90s anime aesthetic"
- **Studio Ghibli**
  - Characteristics: Soft, detailed backgrounds, warm
  - Example Prompt Fragment: "Studio Ghibli inspired illustration"

#### R6. Fine Art Movements

- **Impressionism**
  - Characteristics: Visible brushstrokes, light focus
  - Example Prompt Fragment: "impressionist painting with visible brush"
- **Surrealism**
  - Characteristics: Dreamlike, impossible, symbolic
  - Example Prompt Fragment: "surrealist scene in style of Dali"
- **Pop Art**
  - Characteristics: Bold colors, commercial imagery
  - Example Prompt Fragment: "pop art style with Warhol influence"
- **Baroque**
  - Characteristics: Dramatic, ornate, rich colors
  - Example Prompt Fragment: "baroque painting with dramatic lighting"
- **Renaissance**
  - Characteristics: Classical proportions, realism
  - Example Prompt Fragment: "renaissance painting technique"
- **Expressionism**
  - Characteristics: Emotional, distorted, vivid
  - Example Prompt Fragment: "expressionist style with bold emotion"

---

### A - ATMOSPHERE (20%) - 7 Sub-Categories

The Atmosphere component defines the FEELING and MOOD of the image.

#### A1. Lighting with Color Temperature (Kelvin)

- **Candlelight**
  - Kelvin Range: 1800-2000K
  - Visual Quality: Warm orange, intimate
  - Mood: Romantic, cozy, historical
- **Golden Hour**
  - Kelvin Range: 2700-3500K
  - Visual Quality: Warm, soft, directional
  - Mood: Romantic, dreamy, cinematic
- **Tungsten Indoor**
  - Kelvin Range: 3000-3500K
  - Visual Quality: Warm artificial, yellow-orange
  - Mood: Cozy, domestic, nostalgic
- **Sunrise/Sunset**
  - Kelvin Range: 3500-4500K
  - Visual Quality: Warm to neutral transition
  - Mood: Hopeful, transitional
- **Studio Softbox**
  - Kelvin Range: 5000-5500K
  - Visual Quality: Neutral, balanced, clean
  - Mood: Professional, commercial
- **Daylight**
  - Kelvin Range: 5500-6500K
  - Visual Quality: Neutral to cool, clear
  - Mood: Natural, fresh, honest
- **Harsh Midday**
  - Kelvin Range: 5500-6000K
  - Visual Quality: Direct, high contrast
  - Mood: Documentary, intense
- **Blue Hour**
  - Kelvin Range: 5600-9000K+
  - Visual Quality: Cool blue, twilight
  - Mood: Mysterious, melancholic
- **Overcast**
  - Kelvin Range: 6500-7500K
  - Visual Quality: Soft, diffused, cool
  - Mood: Subdued, peaceful, even
- **Shade**
  - Kelvin Range: 7000-8000K
  - Visual Quality: Cool, soft, open
  - Mood: Gentle, calm
- **Chiaroscuro**
  - Kelvin Range: Variable
  - Visual Quality: Dramatic light/shadow
  - Mood: Dramatic, classical, moody
- **Volumetric**
  - Kelvin Range: Variable
  - Visual Quality: Visible light rays/god rays
  - Mood: Atmospheric, divine, epic
- **Neon**
  - Kelvin Range: Variable
  - Visual Quality: Colorful artificial
  - Mood: Cyberpunk, urban, edgy

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

- **Warm Earth**
  - Color Composition: Terracotta, ochre, sienna, umber
  - Mood/Application: Organic, natural, grounded
  - HEX Examples: #CC7351, #D4A574, #8B4513
- **Cool Nordic**
  - Color Composition: Slate, ice blue, white, grey
  - Mood/Application: Clean, minimal, Scandinavian
  - HEX Examples: #708090, #B0E0E6, #F5F5F5
- **Sunset**
  - Color Composition: Orange, coral, pink, purple
  - Mood/Application: Romantic, dramatic, warm
  - HEX Examples: #FF6B6B, #FF8C69, #C06C84
- **Forest**
  - Color Composition: Deep green, brown, gold
  - Mood/Application: Natural, grounded, organic
  - HEX Examples: #228B22, #8B4513, #DAA520
- **Ocean**
  - Color Composition: Teal, navy, seafoam
  - Mood/Application: Calm, depth, serene
  - HEX Examples: #008080, #000080, #98FF98
- **Neon Cyber**
  - Color Composition: Hot pink, electric blue, lime
  - Mood/Application: Futuristic, edgy, urban
  - HEX Examples: #FF00FF, #00FFFF, #39FF14
- **Vintage Muted**
  - Color Composition: Faded tones, sepia hints, cream
  - Mood/Application: Nostalgic, timeless, soft
  - HEX Examples: #D4C5B2, #A89F91, #F5F0E6
- **Pastel Dream**
  - Color Composition: Soft pink, lavender, mint, peach
  - Mood/Application: Gentle, whimsical, delicate
  - HEX Examples: #FFB6C1, #E6E6FA, #98FB98
- **Monochromatic**
  - Color Composition: Single hue variations
  - Mood/Application: Unified, artistic, bold
  - HEX Examples: Various single-hue ranges
- **Complementary**
  - Color Composition: Opposite color wheel pairs
  - Mood/Application: Vibrant, high contrast
  - HEX Examples: Blue/Orange, Purple/Yellow

#### A4. Weather & Environmental Conditions

- **Volumetric Fog**
  - Visual Effect: Visible atmosphere, depth
  - Mood: Mysterious, ethereal
  - Example Prompt Fragment: "volumetric fog diffusing light"
- **Rain-Soaked**
  - Visual Effect: Wet surfaces, reflections
  - Mood: Moody, cinematic, urban
  - Example Prompt Fragment: "rain-soaked streets reflecting neon"
- **Sun-Dappled**
  - Visual Effect: Light through foliage
  - Mood: Peaceful, natural, dreamy
  - Example Prompt Fragment: "sun-dappled forest floor"
- **Stormy**
  - Visual Effect: Dark clouds, dramatic light
  - Mood: Tension, drama, power
  - Example Prompt Fragment: "stormy sky with dramatic clouds"
- **Mist/Haze**
  - Visual Effect: Soft atmospheric diffusion
  - Mood: Dreamy, mysterious
  - Example Prompt Fragment: "morning mist hanging low"
- **Snow**
  - Visual Effect: White, reflective, cold
  - Mood: Pure, quiet, isolating
  - Example Prompt Fragment: "fresh snow covering landscape"
- **Dust/Sand**
  - Visual Effect: Warm particulates, haze
  - Mood: Desert, apocalyptic, harsh
  - Example Prompt Fragment: "dust particles in sunbeam"
- **Clear**
  - Visual Effect: Crisp, sharp visibility
  - Mood: Clean, honest, vibrant
  - Example Prompt Fragment: "crystal clear atmosphere"

#### A5. Time of Day

- **Pre-Dawn**
  - Light Quality: Deep blue, minimal light
  - Color Cast: Cool blue to purple
  - Mood: Quiet, anticipatory
- **Dawn**
  - Light Quality: Soft, pink to orange emerging
  - Color Cast: Pink, peach, gold
  - Mood: Hopeful, fresh, new
- **Golden Hour AM**
  - Light Quality: Warm, soft, directional
  - Color Cast: Warm gold, amber
  - Mood: Romantic, flattering
- **Morning**
  - Light Quality: Bright, clean, energetic
  - Color Cast: Neutral to warm
  - Mood: Fresh, productive, clear
- **Midday**
  - Light Quality: Harsh, overhead, high contrast
  - Color Cast: Neutral, desaturated
  - Mood: Intense, documentary
- **Afternoon**
  - Light Quality: Warm, angled light
  - Color Cast: Warm, amber tones
  - Mood: Relaxed, golden
- **Golden Hour PM**
  - Light Quality: Rich, warm, long shadows
  - Color Cast: Deep gold, orange
  - Mood: Romantic, cinematic
- **Blue Hour**
  - Light Quality: Cool, twilight, ethereal
  - Color Cast: Deep blue, purple
  - Mood: Mysterious, magical
- **Night**
  - Light Quality: Artificial or moonlight
  - Color Cast: Variable by source
  - Mood: Dramatic, intimate, urban

#### A6. Lighting Techniques

- **Rembrandt**
  - Setup Description: 45-degree key light
  - Effect: Triangle under eye shadow
  - Best For: Dramatic portraits
- **Butterfly**
  - Setup Description: Overhead frontal light
  - Effect: Shadow under nose
  - Best For: Beauty, glamour
- **Split**
  - Setup Description: Light from one side only
  - Effect: Half face lit/dark
  - Best For: Dramatic, mysterious
- **Rim/Edge**
  - Setup Description: Backlight creating outline
  - Effect: Subject separation
  - Best For: Cinematic, dramatic
- **Loop**
  - Setup Description: Slight side angle
  - Effect: Small nose shadow
  - Best For: Flattering portraits
- **Broad**
  - Setup Description: Light on face side toward camera
  - Effect: Face appears wider
  - Best For: Thinner subjects
- **Short**
  - Setup Description: Light on face side away from camera
  - Effect: Face appears narrower
  - Best For: Rounder subjects
- **High Key**
  - Setup Description: Bright, minimal shadows
  - Effect: Airy, optimistic
  - Best For: Fashion, commercial
- **Low Key**
  - Setup Description: Predominantly dark, shadows
  - Effect: Dramatic, moody
  - Best For: Film noir, drama

#### A7. Depth of Field & Focus

- **Ultra Shallow**
  - Aperture Equivalent: f/1.2 - f/1.8
  - Visual Effect: Extreme bokeh, dreamy
  - Use Case: Intimate portraits, detail
- **Shallow**
  - Aperture Equivalent: f/2 - f/2.8
  - Visual Effect: Soft background blur
  - Use Case: Portraits, products
- **Moderate**
  - Aperture Equivalent: f/4 - f/5.6
  - Visual Effect: Subject sharp, background soft
  - Use Case: Environmental portraits
- **Deep**
  - Aperture Equivalent: f/8 - f/11
  - Visual Effect: Most elements sharp
  - Use Case: Landscapes, group shots
- **Maximum**
  - Aperture Equivalent: f/16 - f/22
  - Visual Effect: Everything sharp, starburst
  - Use Case: Architecture, landscapes
- **Tilt-Shift**
  - Aperture Equivalent: Variable selective
  - Visual Effect: Miniature/toy effect
  - Use Case: Cityscapes, creative

---

### M - MODIFIERS (15%) - 6 Sub-Categories

The Modifiers component defines TECHNICAL PARAMETERS and platform-specific controls.

#### M1. Aspect Ratio Presets

- **1:1**
  - Dimensions Example: 1024x1024
  - Platform/Use Case: Instagram, social media square
  - Best For: Profiles, product shots
- **4:5**
  - Dimensions Example: 1080x1350
  - Platform/Use Case: Instagram portrait, Pinterest
  - Best For: Portraits, fashion
- **3:2**
  - Dimensions Example: 1536x1024
  - Platform/Use Case: Standard photography (DSLR native)
  - Best For: Photography, prints
- **16:9**
  - Dimensions Example: 1920x1080
  - Platform/Use Case: Cinematic, video, widescreen
  - Best For: Film stills, banners
- **9:16**
  - Dimensions Example: 1080x1920
  - Platform/Use Case: Stories, Reels, TikTok, mobile
  - Best For: Vertical video, stories
- **2:3**
  - Dimensions Example: 1024x1536
  - Platform/Use Case: Portrait orientation, posters
  - Best For: Portraits, book covers
- **21:9**
  - Dimensions Example: 2560x1080
  - Platform/Use Case: Ultra-widescreen, cinematic
  - Best For: Epic landscapes, banners
- **4:3**
  - Dimensions Example: 1024x768
  - Platform/Use Case: Traditional screen ratio
  - Best For: Presentations, classic

#### M2. Platform-Specific Quality Markers

- **Flux 2 Pro**
  - Quality Markers: Not needed (understood inherently)
  - Avoid: "4K, 8K, masterpiece"
- **Imagen 4**
  - Quality Markers: Not needed (quality is automatic)
  - Avoid: Quality keywords
- **Midjourney**
  - Quality Markers: `--q 2` for max, `--style raw` for realism
  - Avoid: Excessive quality words
- **DALL-E 3**
  - Quality Markers: Describe detail level naturally
  - Avoid: Tag-style quality boosters
- **SD/SDXL**
  - Quality Markers: "masterpiece, best quality, highly detailed"
  - Avoid: Nothing (these help)
- **Leonardo**
  - Quality Markers: Built-in quality presets
  - Avoid: Redundant quality terms
- **Ideogram**
  - Quality Markers: Not needed
  - Avoid: Quality keywords

#### M3. Emphasis Syntax by Platform

- **Midjourney**
  - Emphasis Method: `::2` weight, `--sref` style, `--cref` char
  - Example: `dragon::2 castle::1`
- **SD/SDXL**
  - Emphasis Method: `(element:1.4)` weight syntax
  - Example: `(golden hair:1.3)`
- **FLUX**
  - Emphasis Method: "with emphasis on", "focusing on"
  - Example: "with emphasis on her eyes"
- **DALL-E 3**
  - Emphasis Method: Descriptive emphasis, word order
  - Example: "The most prominent feature..."
- **Imagen 4**
  - Emphasis Method: Natural language priority
  - Example: "primarily featuring..."

#### M4. Library Parameters

- **Midjourney**
  - Style Reference: `--sref [URL]`
  - Character Reference: `--cref [URL]`
  - Usage: Append to prompt end
- **Flux 2 Pro**
  - Style Reference: Upload reference images
  - Character Reference: Multi-reference (up to 10)
  - Usage: API/interface supported
- **Imagen 4**
  - Style Reference: Upload up to 14 references
  - Character Reference: Character consistency mode
  - Usage: Multi-reference supported
- **SD/SDXL**
  - Style Reference: ControlNet, IP-Adapter
  - Character Reference: LoRA for specific characters
  - Usage: External tools required

#### M5. Technical Camera Settings

- **Lens**
  - Options: 14mm, 24mm, 35mm, 50mm, 85mm, 200mm
  - Effect: FOV, compression, distortion
  - Example: "shot with 85mm lens"
- **Aperture**
  - Options: f/1.4, f/2.8, f/8, f/16
  - Effect: Depth of field
  - Example: "f/1.4 shallow depth"
- **Camera**
  - Options: Canon, Nikon, Sony, Hasselblad
  - Effect: Image character
  - Example: "shot on Hasselblad"
- **Film Stock**
  - Options: Kodak Portra, Fuji Pro, Cinestill
  - Effect: Color rendering
  - Example: "Kodak Portra 400 aesthetic"
- **Format**
  - Options: 35mm, Medium Format, Large Format
  - Effect: Detail, aspect, look
  - Example: "medium format photography"

#### M6. Render Settings (3D/CGI)

- **Renderer**
  - Options: Octane, Corona, Arnold, V-Ray
  - Effect: Render quality and style
- **Samples**
  - Options: High sample count
  - Effect: Noise reduction, clarity
- **GI**
  - Options: Global illumination
  - Effect: Realistic light bounce
- **Ray Tracing**
  - Options: RTX, path tracing
  - Effect: Realistic reflections/shadows
- **Subsurface**
  - Options: SSS, translucency
  - Effect: Skin, wax, organic materials

---

### E - EXCLUSIONS (15%) - 5 Sub-Categories

The Exclusions component defines what to AVOID (platform-dependent).

#### E1. Structured Negative Categories

- **Quality Issues**
  - Common Issues: Blur, noise, artifacts, compression
  - Negative Prompt Terms: blurry, low quality, jpeg artifacts, pixelated
- **Anatomical**
  - Common Issues: Wrong fingers, limbs, proportions
  - Negative Prompt Terms: bad anatomy, extra fingers, deformed hands
- **Face/Body**
  - Common Issues: Distorted features, asymmetry
  - Negative Prompt Terms: ugly, disfigured, bad proportions, asymmetric
- **Stylistic**
  - Common Issues: Unwanted artistic elements
  - Negative Prompt Terms: cartoon (if photorealistic), anime (if photo)
- **Unwanted Elements**
  - Common Issues: Watermarks, text, logos, borders
  - Negative Prompt Terms: watermark, signature, text, logo, frame, border
- **Composition**
  - Common Issues: Bad framing, cropping issues
  - Negative Prompt Terms: cropped, out of frame, bad composition

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

- **Flux 2 Pro**
  - Negative Support: None (ignored)
  - Handling Strategy: Describe what you WANT positively
- **Imagen 4**
  - Negative Support: None (ignored)
  - Handling Strategy: Use positive descriptors only
- **Midjourney**
  - Negative Support: Partial (`--no`)
  - Handling Strategy: `--no text, watermark` for simple exclusions
- **DALL-E 3**
  - Negative Support: None
  - Handling Strategy: Rephrase negatives as positives
- **SD/SDXL**
  - Negative Support: Full support
  - Handling Strategy: Use comprehensive negative prompt
- **Leonardo**
  - Negative Support: Full support
  - Handling Strategy: Use structured negative prompt
- **Ideogram**
  - Negative Support: None
  - Handling Strategy: Positive descriptions only

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

- **Photorealistic**
  - Exclude These: illustration, cartoon, anime, painting, drawing
  - Why: Prevent stylization
- **Clean Product**
  - Exclude These: background elements, shadows, distractions
  - Why: Maintain focus
- **Portrait**
  - Exclude These: full body, environment, wide shot
  - Why: Keep intimacy
- **Minimalist**
  - Exclude These: clutter, busy, detailed background, ornate
  - Why: Preserve simplicity
- **Professional**
  - Exclude These: amateur, casual, messy, candid
  - Why: Maintain polish

---

### FRAME Sub-Category Summary

- **F - Focus**
  - Sub-Categories: Shot Types, Camera Angles, Subject Hierarchy, Spatial Relationships, Composition Techniques, Subject Specificity
  - Count: 6
- **R - Rendering**
  - Sub-Categories: Photography Styles, Illustration Styles, 3D Rendering, Movement/Era Aesthetics, Anime/Manga Sub-Types, Fine Art Movements
  - Count: 6
- **A - Atmosphere**
  - Sub-Categories: Lighting (Kelvin), Mood Vocabulary, Color Temperature, Weather/Environmental, Time of Day, Lighting Techniques, Depth of Field
  - Count: 7
- **M - Modifiers**
  - Sub-Categories: Aspect Ratios, Quality Markers, Emphasis Syntax, Reference Parameters, Camera Settings, Render Settings
  - Count: 6
- **E - Exclusions**
  - Sub-Categories: Structured Negatives, Universal Foundation, Platform Handling, Positive Rephrasing, Style-Specific
  - Count: 5
- **TOTAL**
  - Count: **30**

---

---

## 3. PLATFORM PROMPT STRUCTURES

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

---

## 9. TRANSFORMATION EXAMPLES

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

---

## 10. ITERATIVE REFINEMENT FLOW

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

---

## 11. QUICK REFERENCE

### FRAME Checklist
- [ ] **F**ocus: Subject clearly defined with specific details?
- [ ] **R**endering: Art style or medium specified?
- [ ] **A**tmosphere: Lighting and mood established?
- [ ] **M**odifiers: Platform parameters included?
- [ ] **E**xclusions: Handled appropriately for platform?

### Platform Quick Guide

- **Flux 2 Pro**
  - Negatives: No
  - Best Syntax: Natural sentences
  - Key Strength: Photorealism
- **Imagen 4**
  - Negatives: No
  - Best Syntax: Detailed description
  - Key Strength: Text rendering
- **Midjourney**
  - Negatives: Partial
  - Best Syntax: Keywords + params
  - Key Strength: Artistic styles
- **DALL-E 3**
  - Negatives: No
  - Best Syntax: Natural paragraphs
  - Key Strength: Prompt following
- **Stable Diffusion**
  - Negatives: **Yes**
  - Best Syntax: Keywords + negative
  - Key Strength: Control, LoRA
- **Ideogram 3.0**
  - Negatives: No
  - Best Syntax: Natural sentences
  - Key Strength: Typography
- **Seedream**
  - Negatives: No
  - Best Syntax: Concise sentences
  - Key Strength: Speed
- **Runway**
  - Negatives: No
  - Best Syntax: Natural sentences
  - Key Strength: Video frames

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

- **54-60**
  - Grade: Excellent
  - Action: Ship immediately
- **48-53**
  - Grade: Good
  - Action: Ready for generation
- **40-47**
  - Grade: Adequate
  - Action: Minor refinements needed
- **<40**
  - Grade: Needs work
  - Action: Significant enhancement required

### Quick Fixes

| Problem              | Fix                                          |
| -------------------- | -------------------------------------------- |
| Vague subject        | Add specific details (age, features, attire) |
| No style             | Add art style or photography reference       |
| Missing lighting     | Specify time of day or light source          |
| No composition       | Add shot type and camera angle               |
| Conflicting elements | Choose dominant aesthetic                    |
| Platform mismatch    | Check negative prompt support                |
