---
title: "Visual Mode Library"
description: "Reusable visual UI vocabulary, transformation tables, platform templates and refinement examples."
version: "0.110"
contextType: asset
importance_tier: normal
trigger_phrases:
  - "$vibe assets"
  - "visual vocabulary"
  - "MagicPath templates"
  - "UI transformation examples"
  - "design refinement templates"
---

# Visual Mode Library - v0.110

Reusable visual UI vocabulary, transformation tables, platform templates, MagicPath examples and refinement templates for design prompts.

---

## 1. OVERVIEW

### Purpose

Provides copyable vocabulary banks, transformation tables, platform templates, MagicPath prompt templates, examples and refinement templates separated from the Visual Mode workflow.

### Usage

Load this with `references/visual-mode.md` for `$vibe`, `$v` or design-tool work. Copy, adapt or consult the relevant section after the reference workflow grounds the subject, names the category default to deviate from, and identifies the target platform.

---

## 2. VOCABULARY BANKS AND TRANSFORMATION TABLES

### 5.3 Evocative Vocabulary Banks

#### Spatial Feelings
```
intimate    cozy        breathing room    generous      expansive
airy        spacious    comfortable       tight         dense
compact     efficient   gallery-like      editorial     cinematic
architectural   theatrical   museum-quality    deliberate
```

#### Color & Mood
```
warm        cool        muted        vibrant       earthy
electric    soft        bold         professional  playful
calming     energetic   sophisticated   approachable  dramatic
confident   subtle      rich         restrained    fresh
```

#### Motion & Animation
```
snappy      smooth      bouncy       fluid         crisp
leisurely   dramatic    subtle       responsive    gentle
organic     mechanical  considered   playful       refined
instant     gradual     natural      surprising    satisfying
```

#### Surface & Depth
```
lifted      grounded    floating     layered       flat
dimensional tactile     frosted      translucent   solid
elevated    pressed     embossed     soft          sharp
```

#### Typography Voice
```
confident   whispered   bold         elegant       friendly
authoritative   approachable   refined   playful   serious
commanding  subtle      expressive   restrained    warm
```

#### Interaction Feel
```
responsive  tactile     satisfying   immediate     considered
welcoming   guiding     reassuring   delightful    effortless
intuitive   forgiving   precise      accommodating smooth
```

### 5.4 UI Component Vocabulary (MagicPath)

#### Navigation Patterns
```
sticky-header       transparent-header      shrinking-header      reveal-on-scroll
horizontal-nav      vertical-nav           hamburger-menu        dropdown-cascade
tab-bar             bottom-nav             floating-action       gesture-nav
```

#### Card Personalities
```
Structure: contained-card, borderless-card, outlined-card, filled-card, image-card
Elevation: flat-card, raised-card, floating-card, stacked-card, layered-card
Interactive: clickable-card, expandable-card, flip-card, swipeable-card
```

#### Button Tones
```
Primary: solid-button, filled-button, prominent-button, call-to-action, hero-button
Secondary: outlined-button, ghost-button, text-button, subtle-button
Shape: rectangular, rounded, pill, circular, icon-button
Personality: confident, friendly, urgent, calm, playful, professional, minimal
```

#### Animation Character
```
Smooth: buttery, silky, fluid, seamless, continuous, flowing
Bouncy: springy, elastic, playful, energetic, snappy
Sharp: crisp, instant, decisive, immediate, responsive
Gentle: soft, subtle, gradual, eased, cushioned
Dramatic: theatrical, sweeping, cinematic, grand, bold
Natural: organic, physics-based, realistic, weighted, momentum-driven
```

### 5.5 Transformation Principles

#### Principle 1: Dimensions → Spatial Feelings

Don't describe SIZE. Describe the FEELING of space.

| Instead of...   | Transform to...                               |
| --------------- | --------------------------------------------- |
| "240px sidebar" | "navigation that guides without overwhelming" |
| "16px padding"  | "comfortable breathing room"                  |
| "64px gap"      | "gallery-style separation between cards"      |

#### Principle 2: Colors → Mood & Atmosphere

Don't describe HEX CODES. Describe the EMOTIONAL IMPACT.

| Instead of...     | Transform to...                            |
| ----------------- | ------------------------------------------ |
| "#3B82F6"         | "professional blue that builds trust"      |
| "red button"      | "action that demands attention"            |
| "gray background" | "neutral canvas that lets content breathe" |

#### Principle 3: Animation → Motion Character

Don't describe DURATION. Describe the PERSONALITY of movement.

| Instead of...       | Transform to...                         |
| ------------------- | --------------------------------------- |
| "300ms ease-out"    | "smooth, considered motion"             |
| "hover:scale-105"   | "subtle lift that welcomes interaction" |
| "transition: 200ms" | "responsive feedback that feels alive"  |

#### Principle 4: Components → Personality & Role

Don't describe ELEMENTS. Describe their PURPOSE and CHARACTER.

| Instead of...     | Transform to...                                 |
| ----------------- | ----------------------------------------------- |
| "modal dialog"    | "focused moment that demands attention"         |
| "navigation menu" | "wayfinding system that orients users"          |
| "loading spinner" | "patient indicator that something is happening" |

### 5.6 Component Language by Category Default

> **Not a direction chooser.** Each entry below names the vocabulary a recognizable category default speaks — use it to RECOGNIZE the expected cliche, then articulate deliberate deviations. Reusing any direction unchanged across briefs is a preset and must not ship.

- **Button**
  - Precision & Density: commanding control
  - Warmth & Approachability: friendly invitation
  - Sophistication & Trust: confident step forward
- **Card**
  - Precision & Density: compact data container
  - Warmth & Approachability: cozy content home
  - Sophistication & Trust: elegant content frame
- **Navigation**
  - Precision & Density: efficient route system
  - Warmth & Approachability: friendly wayfinding
  - Sophistication & Trust: refined orientation
- **Form**
  - Precision & Density: structured input
  - Warmth & Approachability: friendly conversation
  - Sophistication & Trust: refined data collection

### 5.7 Terms to Strip Entirely

**Framework & Library Names:**
React, Vue, Angular, Next.js, Tailwind, Bootstrap, shadcn/ui, Material UI, Chakra

**Database & Backend Terms:**
PostgreSQL, MongoDB, Supabase, Firebase, REST API, GraphQL, authentication

**Build & DevOps Terms:**
Webpack, Vite, Docker, CI/CD, deployment, npm, yarn

**Programming Concepts:**
useState, useEffect, component lifecycle, TypeScript, props, state management

**The Rule:** If a term is about HOW to build rather than WHAT to experience, remove it.

### 5.8 Anti-Patterns to Detect & Correct

- **Pixel values in output**
  - Why It Fails: Too specific, constrains AI
  - Evocative Correction: Describe spatial feeling instead
- **Hex codes in output**
  - Why It Fails: Technical, not inspirational
  - Evocative Correction: Describe color mood instead
- **Framework names**
  - Why It Fails: Irrelevant to visual design
  - Evocative Correction: Remove entirely
- **CSS property names**
  - Why It Fails: Implementation detail
  - Evocative Correction: Describe the experience instead
- **"beautiful, modern"**
  - Why It Fails: Quality spam, no direction
  - Evocative Correction: Describe specific qualities
- **Comma-separated lists**
  - Why It Fails: Reads as search query
  - Evocative Correction: Transform to narrative prose
- **"Make it responsive"**
  - Why It Fails: Technical requirement
  - Evocative Correction: "Intimate on mobile, expansive on desktop"

---

## 7. VISUAL STYLE KEYWORDS

### The 10 Core Visual Styles

> **Not a style chooser.** These are the named cliches and recognizable defaults to identify, so you can deliberately deviate from or subvert them — not a menu to pick from. A direction/style set reused across briefs unchanged is a preset and must not ship.

- **Glassmorphism**
  - Description: Frosted glass with blur
  - Recognizable Default For: Modern SaaS, fintech generic
- **Neumorphism**
  - Description: Soft extruded surfaces
  - Recognizable Default For: Premium, meditative app cliche
- **Brutalism**
  - Description: Harsh, raw layouts
  - Recognizable Default For: Bold agency/startup cliche
- **Hyper-minimalism**
  - Description: Maximum restraint
  - Recognizable Default For: Productivity, premium tool cliche
- **Material Design**
  - Description: Layered surfaces, shadows
  - Recognizable Default For: Professional, utility app cliche
- **Flat Design**
  - Description: Bold color blocks, no shadows
  - Recognizable Default For: Bright, straightforward app cliche
- **Claymorphism**
  - Description: Soft, chunky, clay-like
  - Recognizable Default For: Friendly, consumer app cliche
- **Retro/Vaporwave**
  - Description: Neon gradients, 80s-90s energy
  - Recognizable Default For: Creative, entertainment cliche
- **Cyberpunk**
  - Description: Neon against black
  - Recognizable Default For: Gaming, AI tool cliche
- **Skeuomorphism**
  - Description: Real-world textures
  - Recognizable Default For: Nostalgic, cozy app cliche

### Design Persona Buzzwords

> **Not a style chooser.** These personas and their buzzwords are recognizable defaults to identify and deviate from — not a menu to pick from.

| Persona                    | Buzzwords                                             |
| -------------------------- | ----------------------------------------------------- |
| **Expressive & Fun**       | lively, cheerful curves, saturated tones, bouncy      |
| **Premium & Sleek**        | refined, translucent, soft blur, frosted glass        |
| **Futuristic & Cinematic** | cosmic gradient, dark UI, neon glow, orbital layout   |
| **Minimal & Focused**      | whitespace-driven, frictionless, single-column, quiet |
| **Bold & Disruptive**      | grid-heavy, brutalist, oversized headlines, contrast  |

---

---

## 8. PLATFORM TEMPLATES

### Platform-Specific Templates

**MagicPath Template:**
```
Create a [product type] interface that feels like [emotional descriptor].

The design should embody [primary Design Direction] energy—think [reference
product]'s [specific quality] but with [differentiator]. [Inspiration analogy].

Layout: [Spatial description—how elements relate, breathe, flow]

The interface speaks through [typography voice]—[font feeling] that [emotional
effect]. Colors: [color mood as atmosphere, not hex codes].

Interactions should feel [motion character]—[specific timing feeling]. When
users [key interaction], they should feel [emotional response].

The kind of [product type] that [experiential outcome statement].
```

**Lovable Template:**
```
Design a [component/page] that feels [design persona].
Use [surface effect] with [motion style].
[Color mood] with [typography personality].
The kind of [experience] that [emotional outcome].
Library: [product comparison].
```

**Aura Template:**
```
What: [Section type] with [layout]
Content: [Elements, hierarchy, CTAs]
Style: [Colors, shadows, spacing]
Behavior: [Animations, responsiveness]
```

**v0.dev Template:**
```
Build [product surface: components, data, actions].
Used by [who], in [moment], to [outcome].
Constraints: [device], [tone], [layout assumptions].
```

---

## 9. MAGICPATH TEMPLATES AND EXAMPLES

### MagicPath Prompt Templates

**Template A: Dashboard/App Interface**
```
Create a [product type] interface that feels like [emotional descriptor].

The design should embody [primary Design Direction] energy—think [reference
product]'s [specific quality] but with [differentiator]. [Inspiration analogy
using physical space or known product].

Layout: [Spatial description—how elements relate, breathe, flow]

The interface speaks through [typography voice]—[font feeling] that [emotional
effect]. Colors: [color mood as atmosphere, not hex codes].

Interactions should feel [motion character]—[specific timing feeling]. When
users [key interaction], they should feel [emotional response].

The kind of [product type] that [experiential outcome statement].
```

**Template B: Landing Page/Marketing**
```
Design a landing page that tells the story of [product/brand].

First impression: [3-second emotional hit]. The visitor should immediately
feel [trust/excitement/curiosity marker].

The narrative unfolds through [scroll behavior description]—each section a
chapter that [builds/reveals/deepens] understanding.

Visual language: [Style description using era, physical analogy, or product
reference]. Like [inspiration] but [modifier that makes it unique].

Call-to-action energy: [CTA personality—commanding/inviting/confident]. The
button should feel like [emotional metaphor], not a demand.

Mobile: [How the story adapts—not just responsive, but how the narrative shifts].
```

**Template C: Iterative Refinement**
```
The overall direction is right, but let's refine:
- [Specific element]: Make it feel more [adjustment]
- [Color/spatial/motion element]: Currently feels [current], shift toward [desired]
- [Keep what's working]: The [specific element] captures exactly the [quality] I wanted

Don't regenerate from scratch—adjust the [specific percentages or elements]
while preserving the [qualities to maintain].
```

### Transformation Example

**INPUT (Technical Tag Soup):**
```
dashboard, beautiful, modern, trending, professional, 240px sidebar,
64px header, React, Tailwind CSS, #3B82F6 primary, 8px border-radius
```

**OUTPUT (MagicPath Narrative):**
```
Design a marketing analytics dashboard that feels like mission control for
growth teams—powerful without being intimidating.

The layout breathes: a sidebar that guides without overwhelming, main content
area where data visualization takes center stage with charts that tell stories
rather than just display numbers.

Think Linear's precision meets Notion's warmth—information-dense but never
cluttered. Every element earns its place.

Colors: Professional blues that build trust against a neutral canvas that
lets the data speak. Typography that's crisp and confident—here to inform,
not to impress.

Interactions respond with quiet confidence. Hover states that acknowledge
without demanding. Transitions smooth enough to feel considered, quick enough
to respect the user's time.

The kind of dashboard you'd actually enjoy opening each morning—where complex
data feels manageable and progress feels visible.
```

**EVOKE Score: 46/50** (MagicPath calibration)
- Evocative: 11/12 (narrative flow, metaphors)
- Visual: 11/12 (clear spatial relationships)
- Open: 7/8 (direction with flexibility)
- Kinetic: 12/13 (strong motion/interaction language)
- Emotional: 5/5 (clear experiential goals)

---

## 10. ITERATIVE REFINEMENT FLOW

### Post-Delivery Question (MANDATORY)

After delivering the enhanced prompt, **always ask the user to share their result** for iterative refinement:

```markdown
---

**📸 Share Your Result for Refinement**

Try this prompt in your AI design tool and share the result with me!

Upload a screenshot or describe what was generated, and I can help you:
- **Refine the prompt** if the output isn't quite right
- **Adjust the direction** if you want to explore variations
- **Dial in specifics** that the AI interpreted differently than intended

Just paste or upload the result and tell me what you'd like to change.
```

### Refinement Conversation Patterns

**When user shares result:**

```yaml
refinement_triggers:
  visual_feedback:
    - "Here's what it generated"
    - "This is the result"
    - "[screenshot/image uploaded]"
    - "It made this but I wanted..."

  refinement_actions:
    analyze_result:
      - Compare output to original intent
      - Identify gaps between prompt and result
      - Note what AI interpreted correctly vs incorrectly

    propose_adjustments:
      - Specific vocabulary changes
      - Direction shifts (more/less of X)
      - Added constraints or clarity

    generate_refined_prompt:
      - Apply VIBE framework adjustments
      - Re-score with EVOKE
      - Deliver updated prompt
```

**Refinement Response Template:**

```markdown
**🔍 Analysis of Result:**
- **What worked:** [Elements that matched intent]
- **Gap identified:** [Where output diverged from vision]
- **Root cause:** [Why the AI interpreted it this way]

**🔧 Prompt Adjustment:**
[Specific changes to address the gap]

**✨ Refined Prompt:**
[Updated prompt with modifications]

---
Try this refined version and share the new result!
```
