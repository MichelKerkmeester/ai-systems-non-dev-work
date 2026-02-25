# Rules - Human Voice - NL - v0.220

The Human Voice Rules - NL (HVR-NL) define the linguistic standards that govern all AI-generated Dutch content across the ecosystem. These rules eliminate detectable AI patterns in Dutch, enforce natural human writing conventions and ensure every piece of output reads as if written by a knowledgeable Dutch-speaking professional. This document is the canonical, system-agnostic Dutch ruleset. Individual content systems inherit these rules and may extend them with system-specific overrides.

**Loading Condition:** Always active for any Dutch content generation, editing or review task. When generating Dutch content, load this document instead of the English HVR.
**Purpose:** Eliminate AI-detectable writing patterns in Dutch, enforce punctuation discipline, ban overused Dutch words and phrases, and establish a consistent human voice across all Dutch output.
**Scope:** Global. Applies to all content systems generating Dutch output. System-specific scoring integrations and additional rules are defined in each system's Human Voice Rules Extensions file.
**Language:** This rules document is written in English. Blocker words, phrases and examples are in Dutch.

## 📑 TABLE OF CONTENTS

  - 0. 🎯 VOICE DIRECTIVES
  - 1. 🔄 HVR RUNTIME MODEL
  - 2. ⚙️ RULE PRECEDENCE MODEL
  - 3. ✏️ PUNCTUATION & FORMATTING STANDARDS
  - 4. 🏗️ AI STRUCTURAL PATTERNS TO AVOID
  - 5. 🔍 CONTENT PATTERN DETECTION
  - 6. 🚫 HARD BLOCKER WORDS (-5 POINTS EACH)
  - 7. ⛔ PHRASE HARD BLOCKERS (-5 POINTS EACH)
  - 8. ⚖️ CONTEXT-DEPENDENT BLOCKERS
  - 9. 📉 SOFT DEDUCTIONS (-2 POINTS EACH)
  - 10. 📊 SOFT DEDUCTIONS (-1 POINT EACH)
  - 11. 🏁 CONTEXT-DEPENDENT FLAGS
  - 12. ✅ PRE-PUBLISH CHECKLIST
  - 13. 📊 QUALITY KPIs

---

## 0. 🎯 VOICE DIRECTIVES

These directives define the target voice for Dutch content. They establish what to aim for before the remaining parts define what to avoid.

### 0.1 Voice Principles

```yaml
voice_directives:
  active_voice:
    directive: "Use active voice. Put the subject before the verb. Dutch defaults to passive constructions more than English — actively resist this."
    example: { wrong: "De vergadering werd geannuleerd door het management.", right: "Het management annuleerde de vergadering." }
    dutch_trap: "Watch for 'er wordt', 'er worden', 'er is besloten' — these are passive-voice tells in Dutch."

  direct_address:
    directive: "Address the reader directly using 'je' and 'jouw' (informal) or 'u' and 'uw' (formal). Pick one register and stick with it throughout the piece."
    example: { wrong: "Gebruikers zullen merken dat het platform tijd bespaart.", right: "Je merkt dat het platform tijd bespaart." }
    register_note: "Sales context: use 'je/jij' for most partner communication. Use 'u' only for formal legal or compliance contexts. Never mix registers in one piece."

  conciseness:
    directive: "Be direct. Cut fluff. Say it in fewer words."
    example: { wrong: "Het is belangrijk om op te merken dat de deadline op vrijdag valt.", right: "De deadline is vrijdag." }

  simple_language:
    directive: "Use common words. If a simpler Dutch word exists, use it. Avoid Latinisms and bureaucratic Dutch."
    example: { wrong: "We dienen de optimalisatie van onze werkprocessen te faciliteren.", right: "We moeten ons werkproces verbeteren." }
    dutch_note: "Dutch AI tends toward formal/bureaucratic register. Prefer everyday Dutch over ambtelijk taalgebruik."

  clarity:
    directive: "Focus on clarity. One idea per sentence when possible."

  conversational_tone:
    directive: "Write naturally. Read it aloud. If it sounds stiff or formal, rewrite it."

  benefit_first:
    directive: "Write from the reader's perspective. State what the tool does for the user, not what the company provides."
    example: { wrong: "Wij bieden een uitgebreid platform.", right: "Je krijgt toegang tot een platform dat drie stappen automatiseert." }
    ban: "Never use 'Wij bieden' or 'Wij leveren' as framing. Use 'Je krijgt' or 'Je bereikt' instead."

  authenticity:
    directive: "Be honest. If something has problems, say so. No marketing spin. If a claim sounds like a movie trailer, rewrite it to sound like a colleague's recommendation."
    example: { wrong: "Onze revolutionaire oplossing transformeert elk aspect van je workflow.", right: "Onze tool automatiseert drie handmatige stappen in je facturatieproces." }
    modesty_filter: "Dutch B2B readers distrust hype. Aim for understatement. Replace 'Dit transformeert je workflow' with 'Dit maakt je werk makkelijker'."

  practical_focus:
    directive: "Focus on practical, actionable information. Back claims with data or examples."

  sentence_rhythm:
    directive: "Vary sentence lengths to create rhythm."
    guidance:
      - "Mix short sentences (under 8 words) with medium (8-15) and long (15-25)"
      - "Use a short sentence after a complex idea for impact"
      - "Dutch subordinate clauses (bijzinnen) push verbs to the end and create long sentences. Break these up."

  compound_words:
    directive: "Use Dutch compound words naturally. Don't avoid them, but don't stack three or more nouns into unreadable compounds."
    example: { awkward: "platformgebruikersregistratieproces", better: "registratieproces voor platformgebruikers" }
```

### 0.2 Certainty Principle

```yaml
certainty_principle:
  directive: "Prefer certainty when facts support it"
  rationale: "Hedging weakens claims. When you know something is true, state it directly."
  examples:
    - { hedging: "Deze aanpak zou de resultaten kunnen verbeteren.", direct: "Deze aanpak verbetert de resultaten." }
    - { hedging: "Gebruikers besparen mogelijk tijd.", direct: "Gebruikers besparen gemiddeld 2 uur per week." }
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
    example: { flat: "De resultaten waren wisselend.", voiced: "De resultaten verrassen me. De helft verbeterde, de rest ging achteruit." }

  acknowledge_complexity:
    directive: "Express mixed feelings. Real people don't sort everything into neat categories."

  controlled_imperfection:
    directive: "Perfect structure feels algorithmic. Allow occasional tangents and asides when they add authenticity. Allow occasional sentence fragments for impact."
    note: "Does not override conciseness or clarity. Means choosing natural flow over mechanical symmetry. Do not enforce perfect grammatical symmetry if it makes the text sound like a textbook."

  emotional_specificity:
    directive: "Name specific feelings and images, not abstract labels."
    example: { abstract: "De resultaten waren teleurstellend.", specific: "We rekenden op minstens 10% groei. Het werd 2%. Dat is een tegenvaller." }

  use_first_person:
    directive: "Use 'ik' when appropriate. First person is honest, not unprofessional."
    note: "Not appropriate for all content types. Avoid in formal reports, legal content and compliance documentation."
```

---

## 1. 🔄 HVR RUNTIME MODEL

All Dutch content generation, editing and review tasks must follow the two-pass self-audit loop. A single pass is not sufficient because first-pass rewrites routinely introduce new AI patterns while fixing old ones.

### 1.1 Two-Pass Self-Audit Loop

```yaml
hvr_runtime:
  execution_model: "two-pass-self-audit"

  phase_1_draft:
    description: "Generate or rewrite Dutch content applying all HVR-NL rules (Sections 0-13)"
    apply: [voice_directives, punctuation_standards, structural_pattern_checks, content_pattern_detection, hard_blocker_checks, context_dependent_checks, soft_deduction_checks, context_flag_checks]
    output: draft_text

  phase_2_audit:
    description: "Audit draft for residual AI patterns that survived the first pass"
    prompt: "Lees de tekst als een sceptische Nederlandse lezer. Wat klinkt nog als AI?"
    focus_areas:
      - "Residual Dutch blocker words or phrases"
      - "Structural patterns (triads, 'niet alleen X maar ook Y', setup language, copula avoidance, synonym cycling)"
      - "Tonal flatness, excessive hedging or robotic cadence"
      - "Sentence rhythm monotony and generic claims"
      - "Significance inflation and generic positive conclusions"
      - "Formatting tells (emoji, title case, curly quotes, inline-header lists)"
      - "Voiceless writing that is technically clean but lacks personality (Section 0.3)"
      - "Excessive passive voice ('er wordt', 'er worden', 'werd besloten')"
      - "je/u register inconsistency within the piece"
      - "Unnatural Anglicisms or calques from English AI patterns (Section 5.8)"
      - "Supply-side framing ('Wij bieden') instead of benefit-first ('Je krijgt')"
      - "Accent marks used for emphasis rather than disambiguation"

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
  skip_conditions: "Phase 2 audit may be skipped ONLY for content under 2 sentences (e.g. subject lines, button labels)"
  token_budget: "Keep two-pass overhead under 20% of the single-pass token budget."
  observability: "When debugging, surface phase_1 draft and phase_2 residual_ai_tells as separate artifacts."
```

---

## 2. ⚙️ RULE PRECEDENCE MODEL

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

Terms previously assigned to multiple categories are now in exactly one:

- **reis (journey)**: context_dependent only (Section 8). Metaphorical blocked at -5, literal allowed.
- **ecosysteem (ecosystem)**: context_dependent (Section 8). Startup/partner metaphor blocked, biological allowed.
- **landschap (landscape)**: context_dependent (Section 8) for the word. Phrase "het landschap van" stays in banned_metaphors (Section 5.1).
- **verdieping (deep dive)**: context_dependent (Section 8) for noun. Verb "diep duiken in" remains hard_blocker (Section 6).
- **"Je bent niet de enige"**: phrase_hard_blocker only (Section 7). -5 takes precedence.
- **eigenlijk, gewoonweg, letterlijk, eenvoudigweg**: cut_always only (Section 5.3). Structural removal supersedes scoring.

---

## 3. ✏️ PUNCTUATION & FORMATTING STANDARDS

All AI-generated Dutch content must follow these punctuation rules without exception.

```yaml
formatting_rules:
  em_dash:        { action: "NEVER use (—)", replace_with: "comma, full stop or colon" }
  semicolon:      { action: "NEVER use (;)", replace_with: "two sentences or conjunction" }
  inline_emphasis: { action: "NEVER use bold or italic for emphasis in output. Use sentence structure to create impact. OK for structural Markdown (headers, links)." }
  ellipsis:       { action: "Max 1 per piece. Trailing thought only. No dramatic pauses." }
  heading_case:   { action: "Sentence case only. Title case is an AI pattern." }
  emoji:          { action: "Max 1 per piece. Must add clarity or tone, not decoration." }
  quotation_marks: { action: "Straight quotes only (\"). Never curly quotes." }
  dutch_comma:    { action: "No comma before 'dat' or 'of' in subordinate clauses. Follow standard Dutch comma rules." }
  oxford_comma:   { action: "Not applicable in Dutch. Dutch does not use a comma before 'en'/'of' in lists." }
  accent_marks:   { action: "Accents (één, hét) only where grammatical ambiguity exists. Never for emphasis.", example: { allowed: "voor één persoon", banned: "hét platform voor..." } }
```

---

## 4. 🏗️ AI STRUCTURAL PATTERNS TO AVOID

### 4.1 "Niet alleen X, maar ook Y" Ban

Never use this construction or any variant.

```yaml
niet_alleen_x_maar_ook_y:
  action: "NEVER use"
  banned_variants:
    - "Niet alleen X, maar ook Y"
    - "Niet alleen X, maar Y"
    - "Niet slechts X, maar Y"
    - "Niet slechts X, maar ook Y"
    - "Het is niet X, het is Y"
    - "Het gaat niet alleen om X, het gaat om Y"
    - "Het is niet zomaar X, het is Y"
    - "Meer dan alleen X"
  replacements: ["State X. State Y as separate sentence.", "Use 'en' to combine.", "Lead with the stronger point."]
```

### 4.2 Three-Item Enumeration Signal

AI defaults to lists of exactly three items. Vary enumerations.

```yaml
enumeration_rule:
  score: -1
  threshold: "Apply when 2+ triads appear per 300 words"
  preferred_counts: [2, 4, 5]
  guidance: "Force the use of pairs (2) or longer lists (4+) to break the algorithmic rhythm of groups of three."
  exemptions: ["Legal/compliance lists with exactly 3 factual items", "Step-by-step procedures with exactly 3 steps", "Factual grouped data"]
  note: "A single natural triad is acceptable. Penalty targets the AI habit of defaulting to three items repeatedly."
```

### 4.3 Setup Language Removal

Remove filler phrases that signal what is coming next rather than stating it directly.

```yaml
banned_setup_phrases: ["Tot slot", "Samengevat", "Het is het vermelden waard", "Het is belangrijk om op te merken", "Laten we eens kijken naar", "Laten we erin duiken", "Laten we eens bekijken", "Als het gaat om", "In de wereld van", "In de huidige", "De kern is", "Aan het einde van de dag", "Zonder verder oponthoud", "Zoals we allemaal weten", "Het spreekt voor zich", "Allereerst", "Last but not least", "Met dat in gedachten", "Wat dat betreft", "Dat gezegd hebbende"]
```

### 4.4 Copula Avoidance Ban

When "is" or "zijn" works, use it. Don't substitute elaborate constructions.

```yaml
copula_avoidance:
  banned_substitutes:
    - "dient als"     # use "is"
    - "staat voor"    # use "is" or "betekent"
    - "fungeert als"  # use "is"
    - "treedt op als" # use "is" (when not literal)
    - "beschikt over" # use "heeft" (when describing attributes)
    - "kenmerkt zich door" # use "heeft" or "is"
    - "biedt"         # use "heeft" or "geeft" (when describing attributes)
  note: "Acceptable when they add genuine meaning (e.g. 'De firewall fungeert als barrière')."
```

### 4.5 Synonym Cycling

When referring to the same thing, use the same word. AI models cycle through synonyms due to repetition penalties. Signal: 3+ different words for the same entity in one piece. Natural variation (e.g. name and "hij/zij") is acceptable.

### 4.6 False Ranges

Remove "van X tot Y" constructions where the endpoints are not on a meaningful scale. Genuine ranges with meaningful endpoints are acceptable (e.g. "temperaturen van -10C tot 40C").

### 4.7 Inline-Header Vertical Lists

Restructure bolded-header bullet lists (bold + colon pattern) into flowing prose or simpler lists. Acceptable for glossaries, API docs and config guides.

### 4.8 Generic Positive Conclusions and Conclusion Trap

End with specifics, not sentiments. Banned phrases: "De toekomst ziet er rooskleurig uit", "Spannende tijden liggen in het verschiet", "Dit is een grote stap voorwaarts", "De mogelijkheden zijn eindeloos", "We kijken uit naar wat komen gaat", "Dit is nog maar het begin", "Het beste moet nog komen", "hun/onze reis naar excellentie voortzetten".

```yaml
conclusion_trap:
  banned_headers: ["Conclusie", "Kortom"]
  note: "These are banned as section headers or sentence openers. 'Kortom' is acceptable mid-sentence when it genuinely summarises a specific point."
  short_content_rule: "If content is under 400 words, a concluding paragraph is prohibited unless it introduces a new, specific call to action."
```

### 4.9 Fragmented Headers

Remove generic sentences that restate the heading. Jump straight to substance.

### 4.10 Excessive Passive Constructions

Dutch AI defaults to passive voice more than human Dutch writers. Flag and rewrite excessive "er wordt" / "er worden" constructions.

```yaml
passive_voice_check:
  action: "Flag when more than 2 passive constructions per 150 words"
  common_dutch_passive_tells: ["er wordt", "er worden", "er werd", "er werden", "er is besloten", "er kan worden", "er dient te worden", "er zal worden"]
  replacement_strategy: "Identify the actor and make them the subject. 'Er wordt een vergadering gepland' becomes 'We plannen een vergadering'."
```

---

## 5. 🔍 CONTENT PATTERN DETECTION

### 5.1 Banned Metaphors and Cliches

```yaml
banned_metaphors:
  - "de brug slaan"              -> "verbinden"
  - "het topje van de ijsberg"   -> "een voorbeeld"
  - "de weg vrijmaken"           -> "mogelijk maken"
  - "een wereld waarin"          -> remove or rephrase directly
  - "het landschap van"          -> remove or use specific noun
  - "de kern van"                -> "centraal in" or state directly
  - "een tweesnijdend zwaard"    -> "een afweging" or "heeft nadelen"
  - "een gamechanger"            -> state the specific change
  - "de naald bewegen"           -> state the specific metric improvement
  - "laaghangend fruit"          -> "snelle winst" or state the specific action
  - "out of the box denken"      -> remove entirely
  - "de lat hoger leggen"        -> "verbeteren" or "een hogere standaard stellen"
  - "het speelveld gelijktrekken" -> "gelijke toegang creeren" or state the change
  - "een perfecte storm"         -> state the specific factors
  - "de olifant in de kamer"     -> state the issue directly
  - "een diepe duik"             -> "een gedetailleerde analyse"
  - "de bottom line"             -> state the conclusion directly
  - "stof tot nadenken"          -> remove entirely
  - "een frisse wind"            -> state what is different or better
  - "licht aan het einde van de tunnel" -> state the specific positive outcome
  - "de bal ligt bij"            -> state who needs to act
  - "een steentje bijdragen"     -> "helpen" or state the specific action
  - "alle neuzen dezelfde kant op" -> state alignment specifically
  - "baken van"                   -> remove or state specifically (pure English-to-Dutch AI artifact "beacon of hope/change")
```

### 5.2 Generalisation Fixes

Replace vague generalisations with specific, verifiable claims:

- "Veel bedrijven" -> name the company or number
- "Onderzoek toont aan" -> name the study, year
- "Experts zijn het erover eens" -> name the expert
- "De afgelopen jaren" -> specific year or timeframe
- "Een groeiend aantal" -> state the number or percentage
- "Uit onderzoek blijkt" -> name the research, institution, year
- "Marktleiders" -> name the companies or people
- "Branchebreed" -> name the industries
- "Keer op keer" -> state when and how often
- "Sommige mensen" -> state who specifically or give a number

### 5.3 Unnecessary Modifiers

Cut these words. They add no meaning. This is a structural removal directive, not a scored penalty (see Section 2.2).

```yaml
unnecessary_modifiers:
  cut_always: [heel, echt, werkelijk, absoluut, ongelooflijk, uiterst, behoorlijk, enigszins, redelijk, tamelijk, gewoon, eigenlijk, gewoonweg, letterlijk, eenvoudigweg, uiteraard, zeker, beslist, ongetwijfeld, "in wezen"]
  note: "If any of these also appear in a scored penalty section, the structural removal takes priority (Section 2.2)."
```

### 5.4 Output Warnings

```yaml
output_warnings:
  - "Do not include meta-commentary about the writing process in output."
  - "Do not add disclaimers or notes about tone choices."
  - "Do not reference these rules in output."
  - "Do not explain why a word was avoided or replaced."
  - "Do not include phrases like 'Ik heb dit bondig gehouden' or 'Ik heb jargon vermeden'."
  - "Do not include knowledge-cutoff disclaimers or date-hedging phrases ('voor zover ik weet', 'op basis van beschikbare informatie', 'hoewel specifieke details beperkt zijn')."
  - "Do not include training-data hedging ('Tot mijn laatste trainingsupdate', 'Ik heb geen toegang tot real-time data')."
```

### 5.5 Significance Inflation

State what happened without editorialising its importance. If something genuinely is a turning point, provide evidence rather than stating it declaratively.

```yaml
significance_inflation_banned: ["markeert een cruciaal moment in", "de basis leggen voor", "onuitwisbare indruk", "is een bewijs van", "onderstreept het belang van", "weerspiegelt bredere trends in", "vertegenwoordigt een verschuiving in", "een belangrijk keerpunt", "de toekomst vormgeven van", "diep geworteld in", "symboliseert de voortdurende", "bijdragen aan de"]
```

### 5.6 Notability and Media Emphasis

Don't claim notability by listing media outlets or followers. Cite specific coverage with specific claims. Banned: listing 3+ outlets without specific claims, "actieve aanwezigheid op social media met meer dan X volgers", "is verschenen in", "besproken door grote publicaties".

### 5.7 Formulaic Challenges Sections

Replace formulaic "ondanks uitdagingen, blijft floreren" structures with specific facts. Banned: "Ondanks zijn [kwaliteit], staat [onderwerp] voor de typische uitdagingen van", "Ondanks deze uitdagingen blijft [onderwerp] floreren", "Uitdagingen en Nalatenschap", "Toekomstperspectief", "staat voor verschillende uitdagingen, waaronder".

### 5.8 Amerikanismen (Literal English Calques)

Dutch AI frequently translates English idioms literally. These calques do not exist in natural Dutch and are immediate AI tells.

```yaml
amerikanismen:
  directive: "If an idiom doesn't exist in natural Dutch, don't translate it. Rephrase the meaning."
  banned_calques:
    - "de extra mijl gaan"           -> "extra moeite doen"
    - "het grote plaatje"            -> "het totaalbeeld" or "het geheel"
    - "op dezelfde pagina zitten"    -> "het eens zijn"
    - "buiten de doos denken"        -> remove or "creatief denken"
    - "de bal in iemands kamp leggen" -> "de verantwoordelijkheid bij iemand leggen"
    - "een no-brainer"               -> "een makkelijke keuze" or "logisch"
    - "het verschil maken"           -> "bijdragen" or state the specific impact
    - "naar het volgende niveau tillen" -> "verbeteren" or state what improves
  note: "Some English loanwords are naturalised in Dutch (e.g. 'deadline', 'feedback'). This rule targets literally translated idioms, not established loanwords."
```

---

## 6. 🚫 HARD BLOCKER WORDS (-5 POINTS EACH)

These words trigger AUTOMATIC FAILURE in Dutch content. Never use them. Words requiring context checking are in Section 8.

```yaml
hard_blockers:
  # Core Dutch AI tells (high-confidence indicators of AI-generated Dutch)
  core:
    - baanbrekend       # use "nieuw" or "de eerste"
    - naadloos          # use "soepel" or describe the experience
    - robuust           # use "sterk" or "betrouwbaar"
    - holistisch        # use "volledig" or "compleet"
    - synergie          # use "gecombineerd effect" or state what works together
    - paradigma         # use "model" or "aanpak"
    - onthullen         # use "bekendmaken" or "laten zien"
    - verduidelijken    # use "uitleggen" or "toelichten"
    - revolutioneren    # use "veranderen" or "vernieuwen"
    - revolutionair     # use "vernieuwend" or "nieuw"
    - geavanceerd       # use "modern" or "de nieuwste" (when buzzword, not literal)
    - voortdurend evoluerend # use "veranderend" or remove
    - licht werpen op   # use "uitleggen" or "laten zien"
    - diep duiken in    # use "onderzoeken" or "goed bekijken"

  # Extended Dutch AI tells
  extended:
    - bevorderen        # use "ondersteunen" or "stimuleren"
    - koesteren         # use "ontwikkelen" or "laten groeien" (when metaphorical nurture)
    - resoneren         # use "aanspreken" or "aansluiten bij"
    - empoweren         # use "in staat stellen" or specific ability
    - bekrachtigen      # use "versterken" (when empowering buzzword)
    - disrupten         # use "veranderen" or state the specific change
    - cureren           # use "selecteren" or "kiezen"
    - benutten          # use "gebruiken"
    - verheffen         # use "verbeteren" or "verhogen"
    - uitpakken         # use "uitleggen" or "uiteenzetten" (when metaphorical)
    - bewerkstelligen   # use "bereiken" or "voor elkaar krijgen"
    - faciliteren       # use "mogelijk maken" or "regelen"
    - inzetten          # use "gebruiken" (when leverage buzzword, not literal deployment)
    - tapijt            # use "mix" or "combinatie" (when metaphorical tapestry)
    - weefsel           # use "mix" or "geheel" (when metaphorical fabric)
    - belichten         # use "uitleggen" or "bespreken" (when metaphorical illuminate)
    - afgrond           # remove or use "kloof" (when metaphorical abyss)
    - geeerd            # use "gerespecteerd" or remove
    - opmerkelijk       # use "opvallend" or state the specific quality
    - optimaliseren     # use "verbeteren" (when buzzword, not genuine technical optimization)
    - de kracht van     # use "de voordelen van" or state specifically
    - bieden            # use "geven" or "hebben" (when used as generic AI verb)
    - baken             # remove or use specific noun (when metaphorical beacon)
    - aangedreven       # use "op basis van" or "met" (e.g., "AI-aangedreven" -> "op basis van AI")
    - lichtend voorbeeld # use "goed voorbeeld" or state what makes it exemplary
    - transformeren     # use "veranderen" or "verbeteren" (when hype verb, not genuine transformation)
```

## 7. ⛔ PHRASE HARD BLOCKERS (-5 POINTS EACH)

These phrases trigger AUTOMATIC FAILURE in Dutch content. Never use them.

```yaml
phrase_blockers:
  # Dutch AI setup and filler phrases
  - "Het is belangrijk om..."
  - "Het is het vermelden waard..."
  - "Aan het einde van de dag..."
  - "In de wereld van vandaag..."
  - "In het huidige digitale landschap..."
  - "Als het gaat om..."
  - "Duik in..."
  - "Dat gezegd hebbende..."
  - "Laat me duidelijk zijn..."
  - "De realiteit is..."
  - "Het punt is..."
  - "In een wereld waarin..."
  - "Je bent niet de enige..."
  - "De echte vraag is..."
  - "Dit is wat je moet weten..."
  - "Wat de meeste mensen niet beseffen is..."
  - "De waarheid is..."
  # Dutch AI customer service tells
  - "Ik help je graag verder!"
  - "Aarzel niet om contact op te nemen!"
  - "Mocht je nog vragen hebben, dan hoor ik het graag!"
  - "Ik hoop dat deze e-mail je goed bereikt."
  # Dutch AI formality / bureaucratic tells
  - "Met betrekking tot..."
  - "In het kader van..."
  - "Ten aanzien van..."
  - "Naar aanleiding van uw vraag..."
  # Dutch AI supply-side and hype phrases
  - "Wij bieden..."
  - "Wij leveren..."
  - "Sluit aan bij jouw behoeften"
  - "Dit transformeert je..."
  - "De extra mijl gaan"
```

## 8. ⚖️ CONTEXT-DEPENDENT BLOCKERS

Words blocked in most contexts but acceptable in specific technical or literal usage. When literal usage is confirmed, no penalty applies (see Section 2.1).

```yaml
context_dependent:  # -5 when metaphorical, 0 when literal
  - "navigeren"     # blocked: uitdagingen navigeren, markt navigeren | allowed: website, GPS, app interface
  - "landschap"     # blocked: marketinglandschap, concurrentielandschap | allowed: fotografie, geografie
  - "ontsluiten"    # blocked: potentieel ontsluiten, groei ontsluiten | allowed: deur, database, archief
  - "ecosysteem"    # blocked: startup ecosysteem, partner ecosysteem | allowed: biologisch, ecologisch
  - "reis"          # blocked: klantreis, leerreis | allowed: letterlijk reizen
  - "verdieping"    # blocked: een verdieping in analytics, als metafoor | allowed: verdieping van een gebouw
  - "traject"       # blocked: groeitraject, ontwikkelingstraject (buzzword) | allowed: reisroute, medisch traject
  - "speelveld"     # blocked: het speelveld veranderen, gelijk speelveld | allowed: literal playing field
  - "behoeften"     # blocked: "sluit aan bij jouw behoeften", generic needs language | allowed: needs-analysis, user research contexts
```

---

## 9. 📉 SOFT DEDUCTIONS (-2 POINTS EACH)

Use sparingly or replace. Words resolved to a higher-priority category via precedence (Section 2) have been removed.

```yaml
soft_deductions_minus_2:
  - "ambachtelijk"         # when buzzword for "create". OK as literal craft
  - "cruciaal"             # use "belangrijk" or "nodig"
  - "ingewikkeld"          # use "complex" or "gedetailleerd"
  - "getuigenis"           # use "bewijs" or "voorbeeld"
  - "disruptief"           # use "nieuw" or describe the specific change
  - "transformatief"       # use "ingrijpend" or describe the specific effect
  - "innovatief"           # use "nieuw" or describe what is different
  - "strategisch"          # filler adjective. OK in genuine strategy contexts
  - "impactvol"            # use "effectief" or "krachtig"
  - "schaalbaar"           # buzzword. OK in genuine technical contexts
  - "actiegerichte"        # buzzword. OK in genuine instruction contexts
  - "ontdekken"            # when hype. OK in factual discovery contexts
  - "staat nog te bezien"  # AI hedging. Use "dat weten we nog niet"
  - "een blik op"          # use "een overzicht van"
```

## 10. 📊 SOFT DEDUCTIONS (-1 POINT EACH)

Words overlapping with cut_always (Section 5.3) have been removed because the structural removal takes priority.

```yaml
soft_deductions_minus_1:
  hedging: ["Ik denk", "Ik geloof", "misschien", "wellicht", "mogelijk", "zou kunnen", "waarschijnlijk"]
  filler_words: ["eerlijk gezegd", "om eerlijk te zijn"]  # eigenlijk, gewoonweg, eenvoudigweg, letterlijk covered by cut_always (Section 5.3)
  unnecessary_transitions: ["echter", "bovendien", "daarnaast", "desalniettemin", "tevens"]  # echter: max 2 per piece; penalty on 3rd+

  weak_adjectives: ["leuk", "goed", "geweldig", "fantastisch", "ongelofelijk", "prachtig", "schitterend", "wonderbaarlijk"]
  weak_adjectives_contextual:
    - "enorm"          # use "groot" or "veel" or state specific scale
    - "krachtig"       # when filler; use "effectief" or state specific capability

  vague_verbs: ["krijgen", "doen", "maken", "zetten", "nemen", "zorgen voor"]  # replace with specific verbs

  ai_phrases: ["Ik help je graag", "Goede vraag!", "Dat is een goed punt", "Ik waardeer dat je dit deelt", "Laat me je daarbij helpen"]
  ai_phrases_contextual:
    - "stel je voor"   # as setup phrase. State directly instead
    - "enthousiast"    # AI enthusiasm. State specific reason for interest

  buzzwords: ["synergiseren", "operationaliseren", "incentiveren", "terugkoppelen", "de naald bewegen", "laaghangend fruit"]
  buzzwords_contextual:
    - "onboarding"     # OK once per piece in HR/SaaS context
    - "bandbreedte"    # metaphorical only. OK in networking context
    - "boosten"        # hype filler. Use "verhogen" or "verbeteren"
    - "vragen"         # OK as noun. "Heb je vragen?" not "Eventuele vragen?"
```

## 11. 🏁 CONTEXT-DEPENDENT FLAGS

Not penalised automatically but should be checked for clarity and precision.

```yaml
context_flags:
  - "het"       # check for clear antecedent; replace with specific noun if ambiguous
  - "dit"       # check for clear referent; replace with "dit [noun]" if vague
  - "deze"      # check for clear referent; replace with "deze [noun]" if vague
  - "dingen"    # replace with specific noun; almost always too vague
  - "spullen"   # replace with specific noun; OK only in very casual content
  - "oplossing" # overused in B2B; replace with platform, tool, dienst
  - "enthousiast" # AI enthusiasm; replace with specific reason for interest
```

---

## 12. ✅ PRE-PUBLISH CHECKLIST

Run through this checklist before finalising any Dutch content.

```yaml
pre_publish_checklist:
  runtime:
    - "Two-pass self-audit loop completed (Section 1)"
    - "Phase 2 audit findings addressed in final output"
    - "No new AI patterns introduced during revision"

  punctuation_and_formatting:
    - "No em dashes, semicolons, inline bold/italic emphasis"
    - "Max 1 ellipsis per piece"
    - "Sentence case headings"
    - "Max 1 emoji per piece (must add clarity or tone, not decoration)"
    - "Straight quotation marks only"
    - "Dutch comma rules followed (no comma before 'dat'/'of' in subordinate clauses)"

  structure:
    - "No 'niet alleen X, maar ook Y' patterns"
    - "No excessive three-item enumerations (2+ triads per 300 words)"
    - "No setup language (Section 4.3)"
    - "No copula avoidance ('dient als', 'fungeert als' — use 'is')"
    - "No synonym cycling (same entity = same word)"
    - "No false ranges, inline-header lists, generic conclusions or fragmented headers"
    - "No generic conclusion headers ('Conclusie', 'Kortom') as section headers"
    - "Under 400 words: no concluding paragraph unless it adds a specific CTA"
    - "No excessive passive constructions (max 2 per 150 words)"

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
    - "'Dit'/'deze' always followed by a noun"

  voice:
    - "Active voice used throughout"
    - "Reader addressed directly where appropriate (je/jouw or u/uw)"
    - "je/u register consistent throughout the piece"
    - "Sentences vary in length"
    - "No hedging when certainty is possible"
    - "Claims backed by data or examples where possible"
    - "Writing has personality, not just correctness (Section 0.3)"
    - "Opinions and reactions present where appropriate"
    - "Complexity acknowledged, not flattened into neat categories"

  dutch_specific:
    - "No excessive passive voice ('er wordt', 'er worden' constructions)"
    - "No unnatural Anglicisms or calques"
    - "Compound words used naturally (not stacking 3+ nouns)"
    - "No bureaucratic register (ambtelijk taalgebruik) unless context demands it"
    - "No Dutch AI customer service phrases (Section 7)"
    - "No literally translated English idioms — Amerikanismen (Section 5.8)"
    - "Accents only for grammatical disambiguation, not emphasis"
    - "No inline bolding for emphasis — use sentence structure"
    - "No supply-side framing ('Wij bieden') — use benefit-first ('Je krijgt')"
```

---

## 13. 📊 QUALITY KPIs

Measurable targets for Dutch content quality. Use these to evaluate content during the Phase 2 audit (Section 1).

```yaml
quality_kpis:
  amerikanisme_rate:    { metric: "Percentage of idioms literally translated from English", target: "0%" }
  triad_density:        { metric: "Ratio of three-item lists per 100 words", target: "< 0.3" }
  active_voice_ratio:   { metric: "Percentage of sentences in active voice", target: ">= 90%" }
  passive_construction: { metric: "Passive constructions ('er wordt', 'er worden') per 150 words", target: "<= 2" }
```
