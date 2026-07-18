---
title: "Rules - Human Voice - DE - v0.100"
description: "German Human Voice hard blockers and structural rules every deliverable must pass."
---

# Rules - Human Voice - DE - v0.100

The Human Voice Rules - DE (HVR-DE) define the linguistic standards that govern all AI-generated German content across the ecosystem. These rules eliminate detectable AI patterns in German, enforce natural human writing conventions and ensure every piece of output reads as if written by a knowledgeable German-speaking professional. This document is the canonical, system-agnostic German ruleset. Individual content systems inherit these rules and may extend them with system-specific overrides.

**Loading Condition:** Always active for any German content generation, editing or review task. When generating German content, load this document instead of the Dutch or English HVR.
**Purpose:** Eliminate AI-detectable writing patterns in German, enforce punctuation discipline, ban overused German words and phrases, curb compound-noun stacking and Denglisch calques, and establish a consistent human voice across all German output.
**Scope:** Global. Applies to all content systems generating German output. System-specific scoring integrations, register defaults and additional rules are defined in each system's Human Voice Rules Extensions file.
**Language:** This rules document is written in English. Blocker words, phrases and examples are in German.

---

## 0. VOICE DIRECTIVES

These directives define the target voice for German content. They establish what to aim for before the remaining parts define what to avoid.

### 0.1 Voice Principles

```yaml
voice_directives:
  active_voice:
    directive: "Use active voice. Put the subject before the verb. German defaults to passive and impersonal constructions more than English — actively resist this."
    example: { wrong: "Die Besprechung wurde vom Management abgesagt.", right: "Das Management sagte die Besprechung ab." }
    german_trap: "Watch for 'es wird', 'es werden', 'es wurde beschlossen', 'man kann' — these are passive/impersonal tells in German."

  direct_address:
    directive: "Address the reader directly using 'du' and 'dein' (informal) or 'Sie' and 'Ihr' (formal). Pick one register and stick with it throughout the piece."
    example: { wrong: "Nutzer merken, dass die Plattform Zeit spart.", right: "Du merkst, dass die Plattform Zeit spart." }
    register_note: "Register is a system-level decision (set in the system's HVR extension). Webshop and pop-culture/lifestyle contexts usually use 'du'; formal legal or compliance contexts use 'Sie'. Never mix registers in one piece, and keep verb forms and possessives consistent with the chosen register."

  conciseness:
    directive: "Be direct. Cut fluff. Say it in fewer words."
    example: { wrong: "Es ist wichtig zu beachten, dass die Frist am Freitag liegt.", right: "Die Frist ist Freitag." }

  simple_language:
    directive: "Use common words. If a simpler German word exists, use it. Avoid Latinisms and bureaucratic German (Amtsdeutsch)."
    example: { wrong: "Wir müssen die Optimierung unserer Arbeitsprozesse ermöglichen.", right: "Wir müssen unseren Arbeitsablauf verbessern." }
    german_note: "German AI tends toward formal/bureaucratic register and nominal style (Nominalstil). Prefer verbs over noun stacks and everyday German over Behördensprache."

  clarity:
    directive: "Focus on clarity. One idea per sentence when possible."

  conversational_tone:
    directive: "Write naturally. Read it aloud. If it sounds stiff or formal, rewrite it."

  benefit_first:
    directive: "Write from the reader's perspective. State what the product does for the user, not what the company provides."
    example: { wrong: "Wir bieten eine umfassende Plattform.", right: "Du bekommst Zugriff auf eine Plattform, die drei Schritte automatisiert." }
    ban: "Never use 'Wir bieten' or 'Wir liefern' as framing. Use 'Du bekommst' or 'Du erreichst' instead (or the Sie-form equivalents)."

  authenticity:
    directive: "Be honest. If something has problems, say so. No marketing spin. If a claim sounds like a movie trailer, rewrite it to sound like a colleague's recommendation."
    example: { wrong: "Unsere revolutionäre Lösung transformiert jeden Aspekt deines Workflows.", right: "Unser Tool automatisiert drei manuelle Schritte in deinem Rechnungsprozess." }
    modesty_filter: "German readers distrust hype. Aim for understatement. Replace 'Das transformiert deinen Workflow' with 'Das macht deine Arbeit einfacher'."

  practical_focus:
    directive: "Focus on practical, actionable information. Back claims with data or examples."

  sentence_rhythm:
    directive: "Vary sentence lengths to create rhythm."
    guidance:
      - "Mix short sentences (under 8 words) with medium (8-15) and long (15-25)"
      - "Use a short sentence after a complex idea for impact"
      - "German subordinate clauses (Nebensätze) push the verb to the end and create long sentences. Break these up."

  compound_words:
    directive: "Use German compound words naturally, but do not stack three or more nouns into unreadable compounds. Two nouns maximum; beyond that, split with a preposition or a genitive."
    example: { awkward: "Plattformnutzerregistrierungsprozess", better: "Registrierungsprozess für Plattformnutzer" }
    note: "Compound-noun stacking is one of the strongest German AI tells. Prefer a verb or a prepositional phrase over a triple-noun compound."
```

### 0.2 Certainty Principle

```yaml
certainty_principle:
  directive: "Prefer certainty when facts support it"
  rationale: "Hedging weakens claims. When you know something is true, state it directly."
  examples:
    - { hedging: "Dieser Ansatz könnte die Ergebnisse verbessern.", direct: "Dieser Ansatz verbessert die Ergebnisse." }
    - { hedging: "Nutzer sparen möglicherweise Zeit.", direct: "Nutzer sparen durchschnittlich 2 Stunden pro Woche." }
  note: "Hedging is acceptable when genuine uncertainty exists. The rule targets unnecessary hedging."
```

### 0.3 Voice Personality

Avoiding AI patterns is only half the job. Sterile, voiceless writing that follows every rule can still read as AI-generated. Clean writing needs personality.

```yaml
voice_personality:
  directive: "Clean writing is not enough. Add personality."
  note: "Weighted lower than system-specific voice extensions. Systems requiring formal tone may suppress these."

  have_opinions:
    directive: "React to facts. Don't just report them neutrally."
    example: { flat: "Die Ergebnisse waren gemischt.", voiced: "Die Ergebnisse überraschen mich. Die Hälfte wurde besser, der Rest schlechter." }

  acknowledge_complexity:
    directive: "Express mixed feelings. Real people don't sort everything into neat categories."

  controlled_imperfection:
    directive: "Perfect structure feels algorithmic. Allow occasional tangents and asides when they add authenticity. Allow occasional sentence fragments for impact."
    note: "Does not override conciseness or clarity. Means choosing natural flow over mechanical symmetry."

  emotional_specificity:
    directive: "Name specific feelings and images, not abstract labels."
    example: { abstract: "Die Ergebnisse waren enttäuschend.", specific: "Wir hatten mit mindestens 10% Wachstum gerechnet. Es wurden 2%. Das ist ein Rückschlag." }

  use_first_person:
    directive: "Use 'ich' when appropriate. First person is honest, not unprofessional."
    note: "Not appropriate for all content types. Avoid in formal reports, legal content and compliance documentation."
```

---

## 1. HVR RUNTIME MODEL

All German content generation, editing and review tasks must follow the two-pass self-audit loop. A single pass is not sufficient because first-pass rewrites routinely introduce new AI patterns while fixing old ones.

### 1.1 Two-Pass Self-Audit Loop

```yaml
hvr_runtime:
  execution_model: "two-pass-self-audit"

  phase_1_draft:
    description: "Generate or rewrite German content applying all HVR-DE rules (Sections 0-13)"
    apply: [voice_directives, punctuation_standards, structural_pattern_checks, content_pattern_detection, hard_blocker_checks, context_dependent_checks, soft_deduction_checks, context_flag_checks]
    output: draft_text

  phase_2_audit:
    description: "Audit draft for residual AI patterns that survived the first pass"
    prompt: "Lies den Text als skeptischer deutscher Leser. Was klingt noch nach KI?"
    focus_areas:
      - "Residual German blocker words or phrases"
      - "Structural patterns (triads, 'nicht nur X, sondern auch Y', setup language, copula avoidance, synonym cycling)"
      - "Tonal flatness, excessive hedging or robotic cadence"
      - "Sentence rhythm monotony and generic claims"
      - "Significance inflation and generic positive conclusions"
      - "Formatting tells (emoji, title case, curly quotes, inline-header lists)"
      - "Excessive passive/impersonal voice ('es wird', 'es werden', 'man kann', 'wurde ... durch')"
      - "Compound-noun stacking (three or more nouns chained into one word)"
      - "du/Sie register inconsistency within the piece"
      - "Denglisch and literal English calques (Section 5.8)"
      - "Supply-side framing ('Wir bieten') instead of benefit-first ('Du bekommst')"

  phase_3_final:
    description: "Rewrite draft using audit findings"
    constraints:
      - "Preserve all factual claims and meaning"
      - "Address every residual tell identified"
      - "Do not introduce new AI patterns while fixing existing ones"
      - "Do not add new dates, percentages or named entities not present in the source"
```

### 1.2 Runtime Constraints

```yaml
runtime_constraints:
  skip_conditions: "Phase 2 audit may be skipped ONLY for content under 2 sentences (e.g. subject lines, button labels, slugs, meta titles)"
  token_budget: "Keep two-pass overhead under 20% of the single-pass token budget."
  observability: "When debugging, surface phase_1 draft and phase_2 residual_ai_tells as separate artifacts."
```

---

## 2. RULE PRECEDENCE MODEL

When a word or phrase appears in multiple rule categories, apply exactly one penalty using the hierarchy below.

### 2.1 Precedence Hierarchy

```yaml
rule_precedence:
  strategy: "first-match-wins"
  order:
    1: phrase_hard_blocker       # -5 per occurrence (Section 7)
    2: hard_word_blocker         # -5 per occurrence (Section 6)
    3: context_dependent_blocker # -5 when metaphorical, 0 when literal (Section 8)
    4: soft_deduction_minus_2    # -2 per occurrence (Section 9)
    5: soft_deduction_minus_1    # -1 per occurrence (Section 10)
    6: context_flag              # 0, advisory only (Section 11)
  notes:
    - "A term listed in both hard_blocker and soft_deduction is evaluated only as hard_blocker"
    - "Context-dependent blockers require context evaluation before scoring"
    - "If context evaluation clears a term (literal usage), no lower-tier penalty applies"
    - "cut_always directives (Section 5.3) are structural removals, not scored penalties — they apply independently"
```

### 2.2 Structural Directives vs Scored Penalties

Structural directives (Sections 3, 4, 5.3, 5.4) are remove/replace with no point penalty (compliance is binary). Scored penalties (Sections 6-10) assign explicit point deductions. A word in both categories is handled by the structural directive only.

### 2.3 Resolved Conflicts

Terms that could fall into multiple categories are placed in exactly one:

- **Reise (journey)**: context_dependent only (Section 8). Metaphorical blocked at -5, literal travel allowed.
- **Ökosystem (ecosystem)**: context_dependent (Section 8). Startup/partner metaphor blocked, biological allowed.
- **Landschaft (landscape)**: context_dependent (Section 8) for the word. Phrase "die Landschaft von" stays in banned_metaphors (Section 5.1).
- **eintauchen (deep dive)**: hard_blocker (Section 6) as metaphor. Literal "ins Wasser eintauchen" is not the AI pattern.
- **"Du bist nicht allein"**: phrase_hard_blocker only (Section 7). -5 takes precedence.
- **eigentlich, einfach, buchstäblich, schlichtweg**: cut_always only (Section 5.3). Structural removal supersedes scoring.

---

## 3. PUNCTUATION & FORMATTING STANDARDS

All AI-generated German content must follow these punctuation rules without exception.

```yaml
formatting_rules:
  em_dash:        { action: "NEVER use (—)", replace_with: "comma, full stop or colon" }
  semicolon:      { action: "NEVER use (;)", replace_with: "two sentences or conjunction" }
  inline_emphasis: { action: "NEVER use bold or italic for emphasis in output. Use sentence structure to create impact. OK for structural Markdown (headers, links)." }
  ellipsis:       { action: "Max 1 per piece. Trailing thought only. No dramatic pauses." }
  heading_case:   { action: "Sentence case only (German nouns stay capitalised). Title case is an AI pattern." }
  emoji:          { action: "Max 1 per piece. Must add clarity or tone, not decoration." }
  quotation_marks: { action: "Straight quotes only (\") for web and SEO output. Do not use German typographic quotes („ “) or guillemets (» «) in body copy, slugs or metadata." }
  comma_rules:    { action: "Follow standard German comma rules. A comma always precedes a subordinate clause introduced by 'dass', 'weil', 'der/die/das' (relative). Do not drop required commas to look casual." }
  noun_capitalisation: { action: "Capitalise all nouns (standard German orthography). Never lowercase nouns for stylistic effect." }
  slug_transliteration: { action: "In URL slugs, transliterate umlauts and eszett: äae, öoe, üue, ßss. Lowercase ASCII, hyphen-separated.", example: { name: "Größe & Qualität", slug: "groesse-qualitaet" } }
```

---

## 4. AI STRUCTURAL PATTERNS TO AVOID

### 4.1 "Nicht nur X, sondern auch Y" Ban

Never use this construction or any variant.

```yaml
nicht_nur_x_sondern_auch_y:
  action: "NEVER use"
  banned_variants:
    - "Nicht nur X, sondern auch Y"
    - "Nicht nur X, sondern Y"
    - "Es ist nicht X, es ist Y"
    - "Es geht nicht nur um X, es geht um Y"
    - "Das ist nicht einfach X, das ist Y"
    - "Mehr als nur X"
  replacements: ["State X. State Y as a separate sentence.", "Use 'und' to combine.", "Lead with the stronger point."]
```

### 4.2 Three-Item Enumeration Signal

AI defaults to lists of exactly three items. Vary enumerations.

```yaml
enumeration_rule:
  score: -1
  threshold: "Apply when 2+ triads appear per 250 words"
  preferred_counts: [2, 4, 5]
  guidance: "Force the use of pairs (2) or longer lists (4+) to break the algorithmic rhythm of groups of three."
  exemptions: ["Legal/compliance lists with exactly 3 factual items", "Step-by-step procedures with exactly 3 steps", "Factual grouped data such as size/colour/material"]
  note: "A single natural triad is acceptable. Penalty targets the AI habit of defaulting to three items repeatedly."
```

### 4.3 Setup Language Removal

Remove filler phrases that signal what is coming next rather than stating it directly.

```yaml
banned_setup_phrases: ["Zum Schluss", "Zusammenfassend", "Abschließend", "Es ist erwähnenswert", "Es ist wichtig zu beachten", "Schauen wir uns an", "Tauchen wir ein", "Werfen wir einen Blick auf", "Wenn es um ... geht", "In der Welt von", "In der heutigen Zeit", "Der Kern ist", "Am Ende des Tages", "Ohne weitere Umschweife", "Wie wir alle wissen", "Es versteht sich von selbst", "Zunächst einmal", "Last but not least", "In diesem Sinne", "Was das betrifft", "Das gesagt"]
```

### 4.4 Copula Avoidance Ban

When "ist" or "sind" works, use it. Don't substitute elaborate constructions.

```yaml
copula_avoidance:
  banned_substitutes:
    - "dient als"          # use "ist"
    - "fungiert als"       # use "ist"
    - "stellt ... dar"     # use "ist" or "zeigt"
    - "fungiert als"       # use "ist"
    - "verfügt über"       # use "hat" (when describing attributes)
    - "zeichnet sich aus durch" # use "hat" or "ist"
    - "bietet"             # use "hat" or "gibt" (when describing attributes)
  note: "Acceptable when they add genuine meaning (e.g. 'Die Firewall fungiert als Barriere')."
```

### 4.5 Synonym Cycling

When referring to the same thing, use the same word. AI models cycle through synonyms due to repetition penalties. Signal: 3+ different words for the same entity in one piece. Natural variation (e.g. a name and "es/sie/er") is acceptable.

### 4.6 False Ranges

Remove "von X bis Y" constructions where the endpoints are not on a meaningful scale. Genuine ranges with meaningful endpoints are acceptable (e.g. "Temperaturen von -10 °C bis 40 °C").

### 4.7 Inline-Header Vertical Lists

Restructure bolded-header bullet lists (bold + colon pattern) into flowing prose or simpler lists. Acceptable for glossaries, API docs and config guides.

### 4.8 Generic Positive Conclusions and Conclusion Trap

End with specifics, not sentiments. Banned phrases: "Die Zukunft sieht rosig aus", "Spannende Zeiten liegen vor uns", "Das ist ein großer Schritt nach vorn", "Die Möglichkeiten sind endlos", "Wir freuen uns auf das, was kommt", "Das ist erst der Anfang", "Das Beste kommt noch".

```yaml
conclusion_trap:
  banned_headers: ["Fazit", "Kurz gesagt", "Zusammenfassung"]
  note: "These are banned as section headers or sentence openers. 'Kurz gesagt' is acceptable mid-sentence when it genuinely summarises a specific point."
  short_content_rule: "If content is under 400 words, a concluding paragraph is prohibited unless it introduces a new, specific call to action."
```

### 4.9 Fragmented Headers

Remove generic sentences that restate the heading. Jump straight to substance.

### 4.10 Excessive Passive and Impersonal Constructions

German AI defaults to passive and impersonal voice more than human German writers. Flag and rewrite excessive "es wird" / "es werden" / "man" constructions.

```yaml
passive_voice_check:
  action: "Flag when more than 2 passive/impersonal constructions per 150 words"
  common_german_tells: ["es wird", "es werden", "es wurde", "es kann ... werden", "es muss ... werden", "es sollte ... werden", "man kann", "man muss", "wird ... durch"]
  replacement_strategy: "Identify the actor and make them the subject. 'Es wird eine Besprechung geplant' becomes 'Wir planen eine Besprechung'."
```

---

## 5. CONTENT PATTERN DETECTION

### 5.1 Banned Metaphors and Cliches

```yaml
banned_metaphors:
  - "die Brücke schlagen"            -> "verbinden"
  - "die Spitze des Eisbergs"        -> "ein Beispiel"
  - "den Weg ebnen"                  -> "ermöglichen"
  - "eine Welt, in der"              -> remove or rephrase directly
  - "die Landschaft von"             -> remove or use a specific noun
  - "der Kern von"                   -> "zentral für" or state directly
  - "ein zweischneidiges Schwert"    -> "ein Kompromiss" or "hat Nachteile"
  - "ein Gamechanger"                -> state the specific change
  - "die Nadel bewegen"              -> state the specific metric improvement
  - "niedrig hängende Früchte"       -> "schneller Gewinn" or state the specific action
  - "über den Tellerrand denken"     -> remove or "kreativ denken"
  - "die Messlatte höher legen"      -> "verbessern" or "einen höheren Standard setzen"
  - "gleiche Wettbewerbsbedingungen schaffen" -> "gleichen Zugang schaffen"
  - "ein perfekter Sturm"            -> state the specific factors
  - "der Elefant im Raum"            -> state the issue directly
  - "ein tiefer Einblick"            -> "eine detaillierte Analyse"
  - "unterm Strich"                  -> state the conclusion directly
  - "Stoff zum Nachdenken"           -> remove entirely
  - "frischer Wind"                  -> state what is different or better
  - "Licht am Ende des Tunnels"      -> state the specific positive outcome
  - "der Ball liegt bei"             -> state who needs to act
  - "einen Beitrag leisten"          -> "helfen" or state the specific action
  - "alle an einem Strang ziehen"    -> state the alignment specifically
  - "ein Leuchtturm für"             -> remove or state specifically (English-to-German AI artifact "beacon of")
  - "den Grundstein legen"           -> state what is built
```

### 5.2 Generalisation Fixes

Replace vague generalisations with specific, verifiable claims:

- "Viele Unternehmen" -> name the company or number
- "Studien zeigen" -> name the study, year
- "Experten sind sich einig" -> name the expert
- "In den letzten Jahren" -> specific year or timeframe
- "Eine wachsende Zahl" -> state the number or percentage
- "Untersuchungen belegen" -> name the research, institution, year
- "Marktführer" -> name the companies or people
- "Branchenweit" -> name the industries
- "Immer wieder" -> state when and how often
- "Manche Menschen" -> state who specifically or give a number

### 5.3 Unnecessary Modifiers

Cut these words. They add no meaning. This is a structural removal directive, not a scored penalty (see Section 2.2).

```yaml
unnecessary_modifiers:
  cut_always: [sehr, wirklich, tatsächlich, absolut, unglaublich, äußerst, ziemlich, etwas, ganz, einfach, eigentlich, buchstäblich, schlichtweg, selbstverständlich, sicherlich, zweifellos, "im Grunde", "im Wesentlichen"]
  note: "If any of these also appear in a scored penalty section, the structural removal takes priority (Section 2.2)."
```

### 5.4 Output Warnings

```yaml
output_warnings:
  - "Do not include meta-commentary about the writing process in output."
  - "Do not add disclaimers or notes about tone choices."
  - "Do not reference these rules in output."
  - "Do not explain why a word was avoided or replaced."
  - "Do not include phrases like 'Ich habe das kurz gehalten' or 'Ich habe Fachjargon vermieden'."
  - "Do not include knowledge-cutoff disclaimers or date-hedging phrases ('soweit ich weiß', 'auf Basis der verfügbaren Informationen', 'obwohl spezifische Details begrenzt sind')."
  - "Do not include training-data hedging ('Bis zu meinem letzten Trainingsstand', 'Ich habe keinen Zugriff auf Echtzeitdaten')."
```

### 5.5 Significance Inflation

State what happened without editorialising its importance. If something genuinely is a turning point, provide evidence rather than stating it declaratively.

```yaml
significance_inflation_banned: ["markiert einen entscheidenden Moment in", "den Grundstein legen für", "einen bleibenden Eindruck", "ist ein Beweis für", "unterstreicht die Bedeutung von", "spiegelt breitere Trends wider in", "stellt einen Wandel dar in", "ein wichtiger Wendepunkt", "die Zukunft gestalten von", "tief verwurzelt in", "symbolisiert die anhaltende", "trägt bei zur"]
```

### 5.6 Notability and Media Emphasis

Don't claim notability by listing media outlets or followers. Cite specific coverage with specific claims. Banned: listing 3+ outlets without specific claims, "aktive Präsenz in den sozialen Medien mit mehr als X Followern", "wurde vorgestellt in", "von großen Publikationen besprochen".

### 5.7 Formulaic Challenges Sections

Replace formulaic "trotz Herausforderungen floriert weiterhin" structures with specific facts. Banned: "Trotz seiner [Qualität] steht [Thema] vor den typischen Herausforderungen von", "Trotz dieser Herausforderungen floriert [Thema] weiterhin", "Herausforderungen und Vermächtnis", "Zukunftsausblick", "steht vor verschiedenen Herausforderungen, darunter".

### 5.8 Anglizismen and Denglisch (Literal English Calques)

German AI frequently translates English idioms literally or reaches for gratuitous Denglisch. These calques do not exist in natural German and are immediate AI tells.

```yaml
anglizismen:
  directive: "If an idiom doesn't exist in natural German, don't translate it. Rephrase the meaning."
  banned_calques:
    - "Sinn machen"                  -> "Sinn ergeben"
    - "die extra Meile gehen"        -> "sich besonders anstrengen"
    - "das große Bild"               -> "das Gesamtbild" or "der Gesamtzusammenhang"
    - "auf der gleichen Seite sein"  -> "einer Meinung sein"
    - "über den Tellerrand hinaus"   -> remove or "kreativ"
    - "einen Unterschied machen"     -> "etwas bewirken" or state the specific impact
    - "ein No-Brainer"               -> "eine klare Sache"
    - "das nächste Level"            -> "die nächste Stufe" or state what improves
    - "am Ende des Tages"            -> "letztlich" or "unterm Strich"
    - "nicht wirklich"               -> "eigentlich nicht"
    - "in 2026"                      -> "im Jahr 2026" or "2026"
  note: "Naturalised loanwords are fine and often correct for this catalogue (Download, Feedback, Deadline, Hoodie, T-Shirt, Beanie, Cap, Patch, Sticker, Gaming, Merchandise). This rule targets literally translated idioms and forced Denglisch, not established loanwords."
```

---

## 6. HARD BLOCKER WORDS (-5 POINTS EACH)

These words trigger AUTOMATIC FAILURE in German content. Never use them. Words requiring context checking are in Section 8.

```yaml
hard_blockers:
  # Core German AI tells (high-confidence indicators of AI-generated German)
  core:
    - bahnbrechend         # use "neu" or "das erste"
    - nahtlos              # use "reibungslos" or describe the experience
    - robust               # use "stabil" or "zuverlässig" (when buzzword)
    - ganzheitlich         # use "vollständig" or "umfassend"
    - holistisch           # use "vollständig" or "umfassend"
    - Synergie             # use "Zusammenspiel" or state what works together
    - Paradigma            # use "Modell" or "Ansatz"
    - enthüllen            # use "zeigen" or "bekanntgeben"
    - revolutionieren      # use "verändern" or "erneuern"
    - revolutionär         # use "neuartig" or "neu"
    - transformativ        # describe the specific effect
    - transformieren       # use "verändern" or "verbessern" (when hype verb)
    - modernste            # use "modern" or "neu" (when buzzword)
    - hochmodern           # use "modern" (when buzzword)
    - sich ständig weiterentwickelnd # use "verändernd" or remove
    - "Licht ins Dunkel bringen"     # use "erklären" or "zeigen"
    - eintauchen           # use "ansehen" or "untersuchen" (metaphorical dive)

  # Extended German AI tells
  extended:
    - fördern              # use "unterstützen" or "stärken" (when filler)
    - pflegen              # use "entwickeln" or "wachsen lassen" (when metaphorical nurture)
    - resonieren           # use "ansprechen" or "anschließen bei"
    - befähigen            # use "ermöglichen" or state the specific ability
    - empowern             # use "ermöglichen" or "stärken"
    - kuratieren           # use "auswählen" or "zusammenstellen"
    - erheben              # use "verbessern" or "steigern" (when elevate buzzword)
    - bewerkstelligen      # use "erreichen" or "schaffen"
    - Wandteppich          # use "Mix" or "Kombination" (when metaphorical tapestry)
    - Geflecht             # use "Mix" or "Gesamtheit" (when metaphorical fabric)
    - beleuchten           # use "erklären" or "besprechen" (when metaphorical illuminate)
    - Abgrund              # remove or use "Kluft" (when metaphorical abyss)
    - geschätzt            # use "respektiert" or remove (when esteemed)
    - bemerkenswert        # use "auffällig" or state the specific quality
    - "die Kraft von"      # use "die Vorteile von" or state specifically
    - "die Macht von"      # use "die Vorteile von" or state specifically
    - Leuchtturm           # remove or use a specific noun (when metaphorical beacon)
    - "leuchtendes Beispiel" # use "gutes Beispiel" or state what makes it exemplary
    - gestützt             # use "auf Basis von" or "mit" (e.g. "KI-gestützt" -> "auf Basis von KI")
    - getrieben            # use "auf Basis von" or "mit" (e.g. "KI-getrieben")
```

## 7. PHRASE HARD BLOCKERS (-5 POINTS EACH)

These phrases trigger AUTOMATIC FAILURE in German content. Never use them.

```yaml
phrase_blockers:
  # German AI setup and filler phrases
  - "Es ist wichtig zu beachten..."
  - "Es ist erwähnenswert..."
  - "Am Ende des Tages..."
  - "In der heutigen Welt..."
  - "In der heutigen digitalen Welt..."
  - "In der heutigen schnelllebigen Welt..."
  - "Wenn es um ... geht"
  - "Tauche ein..."
  - "Tauchen wir ein..."
  - "Das gesagt..."
  - "Lass mich klarstellen..."
  - "Die Realität ist..."
  - "Der Punkt ist..."
  - "In einer Welt, in der..."
  - "Du bist nicht allein..."
  - "Die eigentliche Frage ist..."
  - "Das musst du wissen..."
  - "Was die meisten Menschen nicht wissen..."
  - "Die Wahrheit ist..."
  # German AI customer service tells
  - "Ich helfe dir gerne weiter!"
  - "Zögere nicht, uns zu kontaktieren!"
  - "Bei weiteren Fragen stehe ich gerne zur Verfügung!"
  - "Ich hoffe, diese E-Mail erreicht dich gut."
  # German AI formality / bureaucratic tells
  - "Bezüglich..."
  - "Im Rahmen von..."
  - "Hinsichtlich..."
  - "Im Hinblick auf..."
  # German AI supply-side and hype phrases
  - "Wir bieten..."
  - "Wir liefern..."
  - "Maßgeschneidert für deine Bedürfnisse"
  - "Dies transformiert dein..."
  - "Die extra Meile gehen"
```

## 8. CONTEXT-DEPENDENT BLOCKERS

Words blocked in most contexts but acceptable in specific technical or literal usage. When literal usage is confirmed, no penalty applies (see Section 2.1).

```yaml
context_dependent:  # -5 when metaphorical, 0 when literal
  - "navigieren"    # blocked: Herausforderungen navigieren, den Markt navigieren | allowed: Website, GPS, App-Oberfläche
  - "Landschaft"    # blocked: Marketinglandschaft, Wettbewerbslandschaft | allowed: Fotografie, Geografie (e.g. a landscape poster)
  - "erschließen"   # blocked: Potenzial erschließen, Wachstum erschließen | allowed: Gebiet, Datenbank, Markt (literal development)
  - "Ökosystem"     # blocked: Startup-Ökosystem, Partner-Ökosystem | allowed: biologisch, ökologisch
  - "Reise"         # blocked: Kundenreise, Lernreise | allowed: tatsächliches Reisen, in-world journey/quest in lore
  - "Vertiefung"    # blocked: eine Vertiefung in die Analytik (metaphor) | allowed: literal recess/specialisation
  - "Spielfeld"     # blocked: das Spielfeld verändern, gleiches Spielfeld | allowed: literal playing field
  - "Plattform"     # blocked: metaphorical "Plattform für Wachstum" | allowed: software platform, train platform
  - "Bedürfnisse"   # blocked: "abgestimmt auf deine Bedürfnisse" generic needs language | allowed: needs analysis, user research
```

---

## 9. SOFT DEDUCTIONS (-2 POINTS EACH)

Use sparingly or replace. Words resolved to a higher-priority category via precedence (Section 2) have been removed.

```yaml
soft_deductions_minus_2:
  - "handgefertigt"        # when buzzword for "create". OK as literal handcraft (relevant for some products)
  - "entscheidend"         # use "wichtig" or "nötig"
  - "kompliziert"          # use "komplex" or "detailliert"
  - "Zeugnis"              # use "Beleg" or "Beispiel" (when "testimony")
  - "disruptiv"            # use "neu" or describe the specific change
  - "innovativ"            # use "neu" or describe what is different
  - "strategisch"          # filler adjective. OK in genuine strategy contexts
  - "wirkungsvoll"         # use "effektiv" or "stark"
  - "skalierbar"           # buzzword. OK in genuine technical contexts
  - "handlungsorientiert"  # buzzword. OK in genuine instruction contexts
  - "entdecken"            # when hype. OK in factual discovery contexts
  - "bleibt abzuwarten"    # AI hedging. Use "das wissen wir noch nicht"
  - "ein Blick auf"        # use "ein Überblick über"
```

## 10. SOFT DEDUCTIONS (-1 POINT EACH)

Words overlapping with cut_always (Section 5.3) have been removed because the structural removal takes priority.

```yaml
soft_deductions_minus_1:
  hedging: ["ich denke", "ich glaube", "vielleicht", "möglicherweise", "könnte", "wahrscheinlich"]
  filler_words: ["ehrlich gesagt", "um ehrlich zu sein"]  # eigentlich, einfach, schlichtweg, buchstäblich covered by cut_always (Section 5.3)
  unnecessary_transitions: ["jedoch", "außerdem", "darüber hinaus", "des Weiteren", "zudem"]  # jedoch: max 2 per piece; penalty on 3rd+

  weak_adjectives: ["schön", "gut", "toll", "großartig", "unglaublich", "wunderschön", "fantastisch", "herrlich"]
  weak_adjectives_contextual:
    - "enorm"          # use "groß" or "viel" or state specific scale
    - "kraftvoll"      # when filler; use "effektiv" or state specific capability
    - "mächtig"        # when filler; use "effektiv" or state specific capability

  vague_verbs: ["bekommen", "machen", "tun", "setzen", "nehmen", "sorgen für"]  # replace with specific verbs

  ai_phrases: ["Gute Frage!", "Das ist ein guter Punkt", "Ich helfe dir gerne dabei", "Schön, dass du fragst"]
  ai_phrases_contextual:
    - "stell dir vor"  # as setup phrase. State directly instead
    - "begeistert"     # AI enthusiasm. State the specific reason for interest

  buzzwords: ["synergetisieren", "operationalisieren", "incentivieren", "die Nadel bewegen", "niedrig hängende Früchte"]
  buzzwords_contextual:
    - "Onboarding"     # OK once per piece in HR/SaaS context
    - "Bandbreite"     # metaphorical only. OK in networking context
    - "boosten"        # hype filler. Use "erhöhen" or "verbessern"
```

## 11. CONTEXT-DEPENDENT FLAGS

Not penalised automatically but should be checked for clarity and precision.

```yaml
context_flags:
  - "es"        # check for clear antecedent; replace with a specific noun if ambiguous
  - "dies"      # check for clear referent; replace with "dieses [Nomen]" if vague
  - "diese"     # check for clear referent; replace with "diese [Nomen]" if vague
  - "Dinge"     # replace with a specific noun; almost always too vague
  - "Sachen"    # replace with a specific noun; OK only in very casual content
  - "Lösung"    # overused in B2B; replace with Plattform, Tool, Produkt, Dienst
  - "begeistert" # AI enthusiasm; replace with a specific reason for interest
```

---

## 12. ✅ PRE-PUBLISH CHECKLIST

Run through this checklist before finalising any German content.

```yaml
pre_publish_checklist:
  runtime:
    - "Two-pass self-audit loop completed (Section 1)"
    - "Phase 2 audit findings addressed in final output"
    - "No new AI patterns introduced during revision"

  punctuation_and_formatting:
    - "No em dashes, semicolons, inline bold/italic emphasis"
    - "Max 1 ellipsis per piece"
    - "Sentence case headings (nouns stay capitalised)"
    - "Max 1 emoji per piece (must add clarity or tone, not decoration)"
    - "Straight quotation marks only (no „ “ or » «)"
    - "Standard German comma rules followed (commas before dass/weil/relative clauses)"
    - "Slugs transliterate umlauts and ß (ae/oe/ue/ss)"

  structure:
    - "No 'nicht nur X, sondern auch Y' patterns"
    - "No excessive three-item enumerations (2+ triads per 250 words)"
    - "No setup language (Section 4.3)"
    - "No copula avoidance ('dient als', 'fungiert als' — use 'ist')"
    - "No synonym cycling (same entity = same word)"
    - "No false ranges, inline-header lists, generic conclusions or fragmented headers"
    - "No generic conclusion headers ('Fazit', 'Kurz gesagt', 'Zusammenfassung') as section headers"
    - "Under 400 words: no concluding paragraph unless it adds a specific CTA"
    - "No excessive passive/impersonal constructions (max 2 per 150 words)"

  content:
    - "No banned metaphors (Section 5.1)"
    - "No vague generalisations without specifics"
    - "No unnecessary modifiers (cut_always words removed)"
    - "No meta-commentary, knowledge-cutoff disclaimers or training-data hedging"
    - "No significance inflation, notability emphasis or formulaic challenges"

  words:
    - "No hard blocker words (Section 6) or phrase blockers (Section 7)"
    - "Context-dependent words checked (Section 8)"
    - "No scoring conflicts — each term penalised once per precedence model (Section 2)"

  clarity:
    - "Pronouns have clear antecedents"
    - "Every claim is specific, not vague"
    - "'Dies'/'diese' always followed by a noun"

  voice:
    - "Active voice used throughout"
    - "Reader addressed directly where appropriate (du/dein or Sie/Ihr)"
    - "du/Sie register consistent throughout the piece"
    - "Sentences vary in length"
    - "No hedging when certainty is possible"
    - "Claims backed by data or examples where possible"
    - "Writing has personality, not just correctness (Section 0.3)"
    - "Opinions and reactions present where appropriate"
    - "Complexity acknowledged, not flattened into neat categories"

  german_specific:
    - "No excessive passive/impersonal voice ('es wird', 'es werden', 'man kann')"
    - "No compound-noun stacking (never 3+ nouns chained into one word)"
    - "No Denglisch or literally translated English idioms (Section 5.8)"
    - "'Sinn ergeben', never 'Sinn machen'"
    - "No bureaucratic register (Amtsdeutsch) unless context demands it"
    - "No German AI customer service phrases (Section 7)"
    - "No inline bolding for emphasis — use sentence structure"
    - "No supply-side framing ('Wir bieten') — use benefit-first ('Du bekommst')"
    - "Naturalised loanwords kept; forced Denglisch removed"
```

---

## 13. QUALITY KPIs

Measurable targets for German content quality. Use these to evaluate content during the Phase 2 audit (Section 1).

```yaml
quality_kpis:
  anglizismus_rate:     { metric: "Percentage of idioms literally translated from English", target: "0%" }
  triad_density:        { metric: "Ratio of three-item lists per 100 words", target: "< 0.3" }
  active_voice_ratio:   { metric: "Percentage of sentences in active voice", target: ">= 90%" }
  passive_construction: { metric: "Passive/impersonal constructions ('es wird', 'man kann') per 150 words", target: "<= 2" }
  compound_noun_stacking: { metric: "Compounds chaining 3 or more nouns into one word", target: "0" }
```
