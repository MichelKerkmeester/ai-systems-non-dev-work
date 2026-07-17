---
title: "sk-prompt-improver"
description: "Prompt Improver skill for Barter: turns a vague or underpowered request into a scored, export-ready prompt for another AI or tool, across text, JSON, YAML, markdown, visual UI, image and video targets."
trigger_phrases:
  - "prompt improver"
  - "$improve"
  - "$vibe"
  - "$image"
  - "$video"
version: 1.2.0.0
---

# sk-prompt-improver

> Rewrites a vague or underpowered request into a scored, export-ready prompt for another AI to run, never the work that prompt describes.

| Core layer | What it adds |
|---|---|
| 🧭 **Smart Router** | Ten intents behind exact commands, natural-language framing and keyword-weighted scoring |
| ⚡ **DEPTH Energy** | Five energy levels from Raw passthrough to Deep, so a one-line fix and a strategic system prompt get matched rigor |
| 🎯 **Framework Library** | Eleven frameworks, RCAF as the ordinary default, selected by fit rather than complexity for its own sake |
| 🧮 **Triple Scoring Gates** | CLEAR for text, EVOKE for visual UI, VISUAL for image and video, each with dimension floors that block a weak deliverable |
| 🎨 **Grounding-First Creative Modes** | Visual mode names the median default for the category and forces a deviation before a brief can score above zero |
| 📤 **Export-First Delivery** | Every enhanced prompt saves to a file and verifies before the chat response, in Markdown, JSON or YAML |

---

## 1. OVERVIEW

### What This Is

This folder is the CLI packaging of the Prompt Improver system, one skill that turns an underspecified request into a scored, delivery-ready prompt for another AI or tool to execute. `SKILL.md` carries the router, the identity and every rule. `references/` holds the DEPTH thinking framework, the interactive one-question flow and one workflow file per mode family: patterns and evaluation, visual, image and video. `assets/` holds the eleven-framework matrix, the three format guides and the three creative-mode vocabulary libraries the model consults for platform syntax and vocabulary banks. A cold model bootstraps through `../AGENTS.md`, and from that point on it IS Prompt Improver: prompt-only scope, one-question interaction and export-first delivery replace generic assistant behavior.

Everything the skill produces lands as a file in `../export/` before any response is written, and a second packaging of the same brain lives in `../claude project/` for claude.ai.

### How a Request Flows

```text
                      YOUR REQUEST
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│                    SMART ROUTER                    │
│                                                    │
│  1. Exact commands   $text $improve $vibe $image   │
│  2. Natural language weighted intent scoring       │
│  3. Format detect    $json $yaml $markdown         │
│  4. Platform detect  MagicPath, Midjourney, Sora   │
└────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│  MODE REFERENCE + LIBRARY (framework, platform     │
│  syntax and vocabulary banks loaded on demand)     │
└────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│  DEPTH: Discover → Engineer → Prototype            │
│         → Test → Harmonize                         │
│                                                    │
│  Gates: CLEAR / EVOKE / VISUAL, up to 3 repair     │
│         cycles, format-lock validation             │
└────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│        export/ file  +  verified read-back         │
└────────────────────────────────────────────────────┘
                           │
                           ▼
      chat: path, score, gate status, summary
                           │
                           ▼
   creative modes only: invite the generated result
            back for one more refinement pass
```

---

## 2. QUICK START

Point any capable model at `../AGENTS.md` and ask:

```text
$improve tighten this onboarding email prompt
$refine push this API prompt toward CLEAR 45+
$short shorten this support-macro prompt without losing meaning
$deep a multi-stakeholder governance prompt
$vibe design a fintech dashboard concept
$vibe a magicpath onboarding journey flow
$image a midjourney portrait with rim lighting
$video a runway motion clip of rain on a windshield
$json give me an api-ready version of this prompt
$raw just clean up the grammar, nothing else
```

Exact commands win over wording. Natural language routes through keyword-weighted intent scoring, so "make this UI concept more evocative" reaches Visual mode without a command. Two intents that score within one point of each other route to Interactive mode instead of a guess.

### Precedence, By Example

| Request | Routes to |
|---|---|
| "$vibe a magicpath onboarding flow" | Visual mode, VIBE-MP calibration |
| "design a fintech dashboard concept" | Visual mode, standard VIBE |
| "a midjourney portrait, moody lighting" | Image mode, Midjourney platform |
| "a runway clip of rain on a windshield" | Video mode, Runway platform |
| "shorten this without losing meaning" | Short mode, Quick energy |
| "this is a complex, multi-stakeholder prompt" | Deep mode, Deep energy |
| "$raw just fix the grammar" | Raw mode, no DEPTH, no scoring |
| "give me this as yaml" | Format lock: YAML, mode unchanged |
| "improve this" with no other signal | Interactive mode, depth-choice question |

Mode confidence at 80% or higher auto-selects and explains briefly. Confidence between 50% and 79% suggests a mode and asks for confirmation. Below 50% the model asks one clarifying question, up to three attempts, then falls back to smart defaults with the assumptions flagged in the deliverable. A separate set of document-routing confidence bands (0.85 high, 0.60 medium, 0.40 low) governs which reference and asset files load, independent of the user-facing mode bands above.

The response carries the saved path, the routed score when the mode requires one, gate status and a two-to-three sentence summary. The full enhanced prompt never appears in chat once export succeeds.

---

## 3. THE MODES

### Text-Family Modes

| Mode | What it does |
|---|---|
| `$text` / `$t` | Standard energy, RCAF or COSTAR auto-selected, CLEAR scoring |
| `$improve` / `$i` | Standard energy, automatic framework selection, CLEAR scoring |
| `$refine` / `$r` | Standard energy, refinement-focused question when needed, CLEAR scoring |
| `$short` / `$s` | Quick energy, concise enhancement, CLEAR scoring |
| `$deep` / `$d` | Deep energy, complexity-matched framework, CLEAR scoring, all five perspectives |

RCAF (Role, Context, Action, Format) is the ordinary default and fits roughly 80% of requests. The library holds ten more frameworks selected by fit, never by complexity for its own sake.

#### Framework Library

| Framework | Best for |
|---|---|
| **RCAF** | General tasks, 80% of prompts, 92% success |
| **COSTAR** | Content creation, audience-specific tone, 94% success |
| **RACE** | Urgent, quick-iteration tasks, 88% success |
| **CIDI** | Process documentation and tutorials, 90% success |
| **TIDD-EC** | Quality-critical and compliance work, 93% success |
| **CRISPE** | Strategic exploration, 87% success |
| **CRAFT** | Complex, multi-stakeholder projects, 91% success |
| **VIBE** | Visual UI concepting, 90% success |
| **VIBE-MP** | MagicPath.ai multi-page flows, 92% success |
| **FRAME** | Image-generation prompts, 90% success |
| **MOTION** | Video-generation prompts, 90% success |

### Raw Mode (`$raw`)

No framework, no DEPTH, no scoring and no questions. Passthrough cleanup only, for a request that wants the text as-is with light grammar work and nothing structural changed.

### Visual Mode (`$vibe`, `$v`)

Creative energy, grounding-first VIBE framework (VIBE-MP under MagicPath context), EVOKE scoring.

Step 0 grounds the brief before any aesthetic vocabulary loads. The model names a concrete subject, a specific audience and one falsifiable job the screen must accomplish. Skipping this step is not allowed, and an ungrounded pass never reaches scoring.

| Pillar | Core question |
|---|---|
| **V**ision | "What should this look like?" |
| **I**nspiration | "What should this feel like?" |
| **B**ehavior | "How should this move?" |
| **E**xperience | "How should users feel?" |

Eight category defaults exist to name and then deliberately deviate from. They are not a style menu, and a direction set that ships unchanged across different subjects is a preset, which is prohibited.

| Category default | Deviation question |
|---|---|
| **Precision & Density** (Linear, Raycast) | "What about this subject makes the compact default wrong?" |
| **Warmth & Approachability** (Notion, Coda) | "Where does the subject demand edge that comfort would blunt?" |
| **Sophistication & Trust** (Stripe, Mercury) | "What about this audience means restraint tips into cold?" |
| **Boldness & Clarity** (Vercel) | "When does bold become brittle for this subject's job?" |
| **Utility & Function** (GitHub, VS Code) | "Where does pure utility hide the insight this audience needs first?" |
| **Data & Analysis** (Mixpanel, Amplitude) | "What story does the data tell that a card grid buries?" |
| **Journey & Flow** (Duolingo, Headspace) | "Where does gamification distract from the single job?" |
| **Narrative & Story** (Apple Pages, Stripe Atlas) | "What if the subject's story reads best in a single glance, not a scroll?" |

| Platform | Best for |
|---|---|
| **MagicPath.ai** | Multi-page flows, 150-400 word Creative Director narrative |
| **Lovable** | Full-stack apps, 100-250 words |
| **Aura** | No-code and no-design contexts, 50-150 words |
| **Bolt** | Rapid prototyping, 50-150 words |
| **v0.dev** | UI components, 100-300 words |

### Image Mode (`$image`, `$img`)

Creative energy, FRAME framework, VISUAL image scoring (60 points, 48+ threshold).

| Pillar | Core question |
|---|---|
| **F**ocus | "What is the viewer looking at?" |
| **R**endering | "How should it be visualized?" |
| **A**tmosphere | "What feeling does it evoke?" |
| **M**odifiers | "What constraints apply?" |
| **E**xclusions | "What should be avoided?" |

Platform detection covers Flux 2 Pro, Imagen 4, Nano Banana Pro, Midjourney, DALL-E, Stable Diffusion, Seedream, Leonardo and Ideogram, each carrying its own negative-prompt support and key strength in `image-mode.md`.

### Video Mode (`$video`, `$vid`)

Creative energy, MOTION framework, VISUAL video scoring (70 points, 56+ threshold, camera or subject motion mandatory).

| Pillar | Core question |
|---|---|
| **M**ovement | "How does everything move?" |
| **O**rigin | "What is the visual anchor?" |
| **T**emporal | "How does time flow?" |
| **I**ntention | "What story is being told?" |
| **O**rchestration | "How do elements interact?" |
| **N**uance | "What refinements are needed?" |

A static description is a hard blocker, never a style choice. Platform detection covers Runway, Sora, Kling, Veo, Pika, Luma, Minimax, Hailuo, Seedance, OmniHuman and Wan.

### Interactive Mode (fallback, no command)

Runs when intent is genuinely unclear. It asks one consolidated question rather than an interview. For an ambiguous request with no command, the question leads with a depth choice, quick versus think longer, defaulting to Standard, before asking for the prompt itself. The model never answers its own question and never proceeds without a response, except under `$raw`.

### Energy Levels

| Energy | What runs |
|---|---|
| **Raw** | No DEPTH, passthrough cleanup only |
| **Quick** (`$short`, `$s`) | D → P → H, 1-2 perspectives, one technique |
| **Standard** (default) | D → E → P → T → H, 3+ perspectives |
| **Deep** (`$deep`, `$d`) | D (extended) → E → P → T → H, all 5 perspectives |
| **Creative** (`$vibe`, `$image`, `$video`) | Abbreviated D → E → P → T → H, mode-specific perspectives |

### The DEPTH Phases

| Phase | What it does |
|---|---|
| **D**iscover | Understands the prompt, surfaces weaknesses, selects the framework |
| **E**ngineer | Evaluates eight or more enhancement approaches and picks the best fit |
| **P**rototype | Builds the enhanced prompt against the selected framework or template |
| **T**est | Scores with the mode-correct gate: CLEAR, EVOKE or VISUAL |
| **H**armonize | Final polish, format verification, export and the reported summary |

DEPTH runs on a two-layer transparency model. Internally, the full rigor applies every time: multi-perspective analysis at the required count, every cognitive technique the energy level calls for and a quality self-rating. Externally, the chat only sees concise progress updates, key insights and flagged assumptions, never the full internal reasoning trace.

---

## 4. OUTPUT FORMAT

Default format is Markdown. `$json` and `$yaml` lock the output to that syntax and load the matching format guide, `$markdown` / `$md` / `$m` locks back to Markdown. A locked file contains nothing but a single-line header and the enhanced prompt body. Scoring breakdowns, processing notes and explanations stay in chat and never enter the file.

| Format | Header line |
|---|---|
| Markdown | `Mode: $[mode] \| Complexity: [level] \| Framework: [RCAF/CRAFT]` |
| JSON | `Mode: $json \| Complexity: [level] \| Framework: [RCAF/CRAFT]` |
| YAML | `Mode: $yaml \| Complexity: [level] \| Framework: [RCAF/CRAFT]` |

The correct shape, header plus body and nothing else:

```markdown
Mode: $improve | Complexity: Medium | Framework: RCAF

**Role:** Data analyst with expertise in SaaS metrics.
**Context:** Q4 revenue data from B2B platform with 10K customers.
**Action:** Calculate MRR growth and identify top 3 revenue trends.
**Format:** Executive summary (500 words) with metrics, charts, and recommendations.
```

| Format | Token overhead vs Markdown baseline |
|---|---|
| Markdown | Baseline (100%) |
| JSON | +5-10% |
| YAML | +3-7% |

---

## 5. SCORING GATES

### CLEAR (text-family modes)

| Dimension | Points, floor |
|---|---|
| **C**orrectness | 10 pts, floor 7 |
| **L**ogic | 10 pts, floor 7 |
| **E**xpression | 15 pts, floor 10 |
| **A**rrangement | 10 pts, floor 7 |
| **R**eusability | 5 pts, floor 3 |

CLEAR passes at 40+/50 and targets 45+ for excellence. A total below 40, or any single dimension under its floor, triggers a targeted revision. Repair is capped at three cycles, after which the best version ships with a transparent quality note.

### EVOKE (Visual mode)

The grounding pre-check runs first and cannot be skipped.

| Check | Blocks on |
|---|---|
| **Subject** | A category label instead of a named, concrete thing |
| **Audience** | A generic "users" instead of a role in a specific moment |
| **Single Job** | No single falsifiable primary action |
| **Anti-Default** | No named deviation from the category default |

A failed check scores the brief 0 regardless of how evocative the writing reads. Once grounding passes, five dimensions carry the 50 points:

| Dimension | Points, floor |
|---|---|
| **E**vocative | 15 pts, floor 12 |
| **V**isual | 10 pts, floor 8 |
| **O**pen | 10 pts, floor 8 |
| **K**inetic | 10 pts, floor 8 |
| **E**motional | 5 pts, floor 4 |

Standard EVOKE passes at 40+/50. MagicPath reweights toward Kinetic (13) and Visual (12) and passes at 42+/50.

### VISUAL (Image and Video modes)

| Dimension | Points, floor |
|---|---|
| **V**ivid | 15 pts, floor 12 |
| **I**ntentional | 10 pts, floor 8 |
| **S**tyled | 10 pts, floor 8 |
| **U**nambiguous | 10 pts, floor 8 |
| **A**tmospheric | 10 pts, floor 8 |
| **L**ayered | 5 pts, floor 4 |
| **Motion** (video only) | 10 pts, floor 8 |

Image totals 60 points and passes at 48+. Video adds Motion for 70 points and passes at 56+. A video prompt with no camera or subject motion fails regardless of its other scores, a static prompt is a hard blocker rather than a style preference.

---

## 6. EXPORT AND DELIVERY

CLI delivery is export-first:

```text
export/[###] - enhanced-[description].md
export/[###] - enhanced-[description].json
export/[###] - enhanced-[description].yaml
```

The sequence number is the next unused zero-padded number in `export/`, starting at `001` when the folder is empty. A planned path or a remembered draft never counts as delivery. The file must exist on disk before the response mentions it.

The chat response carries:

- The path to the saved file
- The routed score when the mode requires one, CLEAR, EVOKE or VISUAL
- Gate status and any flagged assumptions
- A two-to-three sentence summary, never the full prompt text

Creative modes (`$vibe`, `$image`, `$video`) close with an invitation to share the generated result back for one more refinement pass. The loop is not considered finished at export for these three modes the way it is for the text-family modes.

In a claude.ai Project, where no filesystem exists, `claude project/Custom Instructions.md` replaces file export with a Deliverable Block carrying the same header and content rules.

### Progress and Delivery Line Formats

The concise external layer prints in fixed shapes so a chat transcript stays scannable:

| Line | Format |
|---|---|
| Progress update | `Phase [D/E/P/T/H] - [name]: [concise finding]` |
| Validation | `[CLEAR\|EVOKE\|VISUAL] [score]/[max] \| Gate: [passed/revising/best-effort]` |
| Assumption | `[Assumes: description]` |
| Delivery | `Saved: export/[###] - enhanced-[description].[md/json/yaml]` |
| Creative follow-up | `Share the generated result when you want refinement.` |

---

## 7. REFERENCE AND ASSET INVENTORY

There is no separate worked-examples folder for this system. The mode libraries below carry transformation examples and quick lookups inline, alongside the vocabulary banks and platform templates.

### Always Loaded

| File | Carries |
|---|---|
| [`references/depth-framework.md`](./references/depth-framework.md) | DEPTH phases, energy levels, cognitive rigor and CLEAR gates (v0.200) |
| [`references/interactive-mode.md`](./references/interactive-mode.md) | One-question flow, state machine, response templates, error recovery (v0.700) |

### Conditional References

| File | Carries |
|---|---|
| [`references/patterns-evaluation.md`](./references/patterns-evaluation.md) | CLEAR, EVOKE, VISUAL and REPAIR scoring detail (v0.212) |
| [`references/visual-mode.md`](./references/visual-mode.md) | Grounding-first VIBE/VIBE-MP workflow, EVOKE scoring, MagicPath routing (v0.301) |
| [`references/image-mode.md`](./references/image-mode.md) | FRAME workflow, VISUAL image scoring, platform routing (v0.123) |
| [`references/video-mode.md`](./references/video-mode.md) | MOTION workflow, VISUAL video scoring, temporal rules (v0.123) |

### Framework and Format Assets

| File | Carries |
|---|---|
| [`assets/framework-pattern-library.md`](./assets/framework-pattern-library.md) | Eleven-framework matrix, deep dives, combination patterns (v0.100) |
| [`assets/format-guide-markdown.md`](./assets/format-guide-markdown.md) | Markdown header contract and RCAF/CRAFT structure (v0.141) |
| [`assets/format-guide-json.md`](./assets/format-guide-json.md) | JSON header contract and syntax validation (v0.142) |
| [`assets/format-guide-yaml.md`](./assets/format-guide-yaml.md) | YAML header contract and syntax validation (v0.142) |

### Creative Mode Libraries

| File | Carries |
|---|---|
| [`assets/visual-mode-library.md`](./assets/visual-mode-library.md) | Vocabulary banks, platform templates, MagicPath examples (v0.110) |
| [`assets/image-mode-library.md`](./assets/image-mode-library.md) | FRAME banks, platform structures, quick lookups (v0.101) |
| [`assets/video-mode-library.md`](./assets/video-mode-library.md) | Platform syntax, mental models, temporal banks (v0.101) |

---

## 8. DUAL PACKAGING

This folder is authoritative. A second packaging lives in `../claude project/` for upload to a claude.ai Project. `Custom Instructions.md` hand-synthesizes the router and rules in compact form, and `knowledge/` mirrors `SKILL.md` plus every file in `references/` and `assets/`, byte-identical. `../SYNC.md` holds the manual sync contract. There is no automated derive script for this system, so the mirror copy stays a manual or shell-copy step.

Related skills: `sk-prompt` for general prompt craft, `sk-prompt-small-model` for small-model prompt profiles and `sk-doc` for documentation packaging.

---

## 9. FAQ

**What does Prompt Improver actually deliver?**
A scored, exported prompt file. It never performs the work that prompt describes. It writes the instructions another AI or tool should follow to do that work.

**What happens if I give it no command and an unclear request?**
Interactive mode asks one consolidated question, leading with a depth choice between quick and think longer, and waits. It never answers its own question.

**Can `$short` or Quick energy skip the scoring gate?**
No. Quick energy shortens the DEPTH flow and the perspective count. It never skips CLEAR, EVOKE or VISUAL, and it never skips the export step.

**Why did my Visual Mode brief score 0 even though it reads well?**
A grounding check failed. A brief without a named concrete subject, a specific audience, a single falsifiable job, or a named deviation from its category default scores 0, regardless of how evocative the language is.

**Does it write the actual code, design or content the prompt is for?**
No. That work is out of scope by design. The deliverable is always the prompt, never the downstream work.

**Do I need the claude.ai Project packaging?**
No. The CLI packaging is complete on its own. The Project exists for people who work inside claude.ai and want the same brain there.

---

## 10. TROUBLESHOOTING

| What you see | What to do |
|---|---|
| No path or score in the response | Export did not verify. Treat the prompt as undelivered and rerun the request |
| Visual brief scores 0 despite strong writing | A grounding check failed. Name the concrete subject, the specific audience, the single job and the deviation from the category default |
| Video prompt fails scoring | No camera or subject motion was described. Add explicit movement, since a static description cannot pass VISUAL video scoring |
| A JSON or YAML file contains markdown syntax | The wrong format guide ran. Re-request with the explicit `$json` or `$yaml` command |
| The model answers the underlying request instead of improving the prompt | Reframe once as "write me a prompt that asks an AI to do X" and refuse further scope creep if it recurs |
| Two commands conflict, like `$image` and `$video` in one request | Resend with one command, or wait for the consolidated clarification question |

---

## 11. RELATED DOCUMENTS

| Document | Purpose |
|---|---|
| [`SKILL.md`](./SKILL.md) | Executable router, DEPTH methodology, rules and export protocol |
| [`../AGENTS.md`](../AGENTS.md) | CLI bootstrap, context override and manual-load handoff for a cold model |
| [`../SYNC.md`](../SYNC.md) | Manual sync contract between this skill and the Claude Project mirror |
| [`references/depth-framework.md`](./references/depth-framework.md) | DEPTH phases, energy levels and cognitive rigor |
| [`references/interactive-mode.md`](./references/interactive-mode.md) | One-question flow, state machine and response templates |
| [`references/patterns-evaluation.md`](./references/patterns-evaluation.md) | CLEAR, EVOKE, VISUAL and REPAIR scoring detail |
| [`references/visual-mode.md`](./references/visual-mode.md) | Grounding-first VIBE/VIBE-MP workflow and EVOKE scoring |
| [`references/image-mode.md`](./references/image-mode.md) | FRAME workflow and VISUAL image scoring |
| [`references/video-mode.md`](./references/video-mode.md) | MOTION workflow and VISUAL video scoring |
| [`assets/framework-pattern-library.md`](./assets/framework-pattern-library.md) | Eleven-framework matrix and combination patterns |
| [`assets/format-guide-markdown.md`](./assets/format-guide-markdown.md) | Markdown header contract and RCAF/CRAFT structure |
| [`assets/format-guide-json.md`](./assets/format-guide-json.md) | JSON header contract and syntax validation |
| [`assets/format-guide-yaml.md`](./assets/format-guide-yaml.md) | YAML header contract and syntax validation |
| [`assets/visual-mode-library.md`](./assets/visual-mode-library.md) | Visual UI vocabulary, platform templates, MagicPath examples |
| [`assets/image-mode-library.md`](./assets/image-mode-library.md) | FRAME banks, image platform structures, quick lookups |
| [`assets/video-mode-library.md`](./assets/video-mode-library.md) | Video platform syntax, mental models, temporal banks |
| [`../claude project/README.md`](../claude%20project/README.md) | Upload and integrity manifest for the Claude Project packaging |
