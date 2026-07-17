# Prompt Improver - Claude Project Packaging

Hand-maintained claude.ai **Projects** copy of the Prompt Improver system. This `claude project/` folder is the editing surface; the live claude.ai Project is push-only from here because the claude.ai UI has no repository lock.

## Structure

```text
claude project/
|-- Custom Instructions.md        <- full synthesized Project kernel, Skill v1.2.1 aligned
|-- README.md                     <- this manifest and sync contract
`-- knowledge/                    <- upload every file below as Project Knowledge
    |-- Prompt Improver - System - Skill - v1.2.1.md
    |-- Prompt Improver - DEPTH Thinking Framework - v0.200.md
    |-- Prompt Improver - Interactive Mode - v0.700.md
    |-- Prompt Improver - Patterns and Evaluation - v0.212.md
    |-- Prompt Improver - Assets - Framework Pattern Library - v0.100.md
    |-- Prompt Improver - Format Guide Markdown - v0.141.md
    |-- Prompt Improver - Format Guide JSON - v0.142.md
    |-- Prompt Improver - Format Guide YAML - v0.142.md
    |-- Prompt Improver - Visual Mode - v0.301.md
    |-- Prompt Improver - Assets - Visual Mode Library - v0.110.md
    |-- Prompt Improver - Image Mode - v0.123.md
    |-- Prompt Improver - Assets - Image Mode Library - v0.101.md
    |-- Prompt Improver - Video Mode - v0.123.md
    `-- Prompt Improver - Assets - Video Mode Library - v0.101.md
```

## Custom Instructions = Skill Kernel, Project-Adapted

`Custom Instructions.md` is the synthesized claude.ai Project kernel aligned to **Prompt Improver Skill v1.2.1**. It preserves prompt-only scope, DEPTH energy, smart routing, framework selection, CLEAR/EVOKE/VISUAL scoring, format locks and delivery rules.

CLI-only mechanics are removed or adapted: filesystem export becomes the **Deliverable Block**, direct file loading becomes Project Knowledge consultation and `export/NNN - enhanced-[description].[md|json|yaml]` is reported as an export-equivalent path.

## Paired-Version + Checksum Table

| Doc | Sync stamp |
| --- | --- |
| **Custom Instructions** | project kernel v1.2.1 -> Skill v1.2.1, sha16 `5a89cd9b68de10c0` |
| knowledge/ System - Skill | v1.2.1 -> v1.2.1, sha16 `472acf65c692603c` |
| knowledge/ DEPTH Thinking Framework | v0.200 -> v0.200, sha16 `499a460deaaa1d82` |
| knowledge/ Interactive Mode | v0.700 -> v0.700, sha16 `0b269af389d05bac` |
| knowledge/ Patterns and Evaluation | v0.212 -> v0.212, sha16 `597f92948c417835` |
| knowledge/ Assets - Framework Pattern Library | v0.100 -> v0.100, sha16 `4b2c7f2779df6416` |
| knowledge/ Format Guide Markdown | v0.141 -> v0.141, sha16 `72979486f08d6697` |
| knowledge/ Format Guide JSON | v0.142 -> v0.142, sha16 `8b0cd638fe0b1f14` |
| knowledge/ Format Guide YAML | v0.142 -> v0.142, sha16 `3755c963a16dc2f0` |
| knowledge/ Visual Mode | v0.301 -> v0.301, sha16 `8adeaad4a734646a` |
| knowledge/ Image Mode | v0.123 -> v0.123, sha16 `b78e38d475439aec` |
| knowledge/ Video Mode | v0.123 -> v0.123, sha16 `76e2c6c6a6835b95` |
| knowledge/ Assets - Visual Mode Library | v0.110 -> v0.110, sha16 `a99397aa2d2331c8` |
| knowledge/ Assets - Image Mode Library | v0.101 -> v0.101, sha16 `4ab3ed815420982f` |
| knowledge/ Assets - Video Mode Library | v0.101 -> v0.101, sha16 `c931858e5faa3424` |

Full hashes can be recomputed with `shasum -a 256`.

## Set Up The Live Project

1. Create or open the claude.ai Project named **Prompt Improver**.
2. Paste `Custom Instructions.md` into the Project custom instructions field.
3. Upload every file in `knowledge/` as Project Knowledge.
4. Keep filenames unchanged so the kernel can reference the documents clearly.
5. Run a smoke prompt for all ten routed intents (Raw, Text, Improve, Refine, Short, Deep, Visual, MagicPath, Image, Video) plus Interactive fallback, a false-command case, MagicPath-over-Visual precedence and format-lock independence from mode.
6. Confirm the Deliverable Block, attestation footer and export-equivalent path appear, and the routed score appears for every mode except Raw, which carries no score.

## Change Checklist

- Re-copy changed source files from `../sk-prompt-improver/SKILL.md`, `../sk-prompt-improver/references/` and `../sk-prompt-improver/assets/` into `knowledge/`.
- If identity, routing, scoring, format handling or delivery behavior changes, re-derive `Custom Instructions.md` from the Skill kernel.
- On a version bump, rename the mirror to the new version suffix and remove the superseded versioned mirror. Never retain old and new filenames together.
- Update this README with the new version stamps and sha256-16 values.
- Re-upload changed files to the live Project and confirm the upload took.

## Known Notes

- Project Knowledge may be retrieved as chunks rather than full files, so the Project kernel repeats the core gates and routing contract.
- `knowledge/Prompt Improver - System - Skill - v1.2.1.md` remains a source mirror for RAG consistency.
- Largest mirrors by byte count: Image Mode Library 48614 bytes, Visual Mode 40363 bytes, System Skill 35578 bytes, Video Mode Library 35063 bytes. Advisory only. Review chunking behavior if any mirror grows meaningfully past this range.
- No compact fallback instructions file exists yet. Add one only if paste-testing shows the full kernel does not fit.
