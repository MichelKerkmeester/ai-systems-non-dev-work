# Prompt Improver - Claude Project Packaging

Hand-maintained claude.ai **Projects** copy of the Prompt Improver system. This `claude project/` folder is the editing surface; the live claude.ai Project is push-only from here because the claude.ai UI has no repository lock.

## Structure

```text
claude project/
|-- Custom Instructions.md        <- full synthesized Project kernel, Skill v1.2.0 aligned
|-- README.md                     <- this manifest and sync contract
`-- knowledge/                    <- upload every file below as Project Knowledge
    |-- Prompt Improver - System - Skill - v1.2.0.md
    |-- Prompt Improver - DEPTH Thinking Framework - v0.200.md
    |-- Prompt Improver - Interactive Mode - v0.700.md
    |-- Prompt Improver - Patterns and Evaluation - v0.211.md
    |-- Prompt Improver - Assets - Framework Pattern Library - v0.100.md
    |-- Prompt Improver - Format Guide Markdown - v0.141.md
    |-- Prompt Improver - Format Guide JSON - v0.141.md
    |-- Prompt Improver - Format Guide YAML - v0.141.md
    |-- Prompt Improver - Visual Mode - v0.300.md
    |-- Prompt Improver - Assets - Visual Mode Library - v0.110.md
    |-- Prompt Improver - Image Mode - v0.122.md
    |-- Prompt Improver - Assets - Image Mode Library - v0.101.md
    |-- Prompt Improver - Video Mode - v0.122.md
    `-- Prompt Improver - Assets - Video Mode Library - v0.101.md
```

## Custom Instructions = Skill Kernel, Project-Adapted

`Custom Instructions.md` is the synthesized claude.ai Project kernel aligned to **Prompt Improver Skill v1.2.0**. It preserves prompt-only scope, DEPTH energy, smart routing, framework selection, CLEAR/EVOKE/VISUAL scoring, format locks and delivery rules.

CLI-only mechanics are removed or adapted: filesystem export becomes the **Deliverable Block**, direct file loading becomes Project Knowledge consultation and `export/NNN - enhanced-[description].[md|json|yaml]` is reported as an export-equivalent path.

## Paired-Version + Checksum Table

| Doc | Sync stamp |
| --- | --- |
| **Custom Instructions** | project kernel v1.2.0 -> Skill v1.2.0, sha16 `e6e119053693e80b` |
| knowledge/ System - Skill | v1.2.0 -> v1.2.0, sha16 `5f93c48b86dbd1aa` |
| knowledge/ DEPTH Thinking Framework | v0.200 -> v0.200, sha16 `499a460deaaa1d82` |
| knowledge/ Interactive Mode | v0.700 -> v0.700, sha16 `0b269af389d05bac` |
| knowledge/ Patterns and Evaluation | v0.211 -> v0.211, sha16 `9315a45541d36b77` |
| knowledge/ Assets - Framework Pattern Library | v0.100 -> v0.100, sha16 `4b2c7f2779df6416` |
| knowledge/ Format Guide Markdown | v0.141 -> v0.141, sha16 `72979486f08d6697` |
| knowledge/ Format Guide JSON | v0.141 -> v0.141, sha16 `c99e60f3775cd4a2` |
| knowledge/ Format Guide YAML | v0.141 -> v0.141, sha16 `ace397aab6220a69` |
| knowledge/ Visual Mode | v0.300 -> v0.300, sha16 `5b062c90b785e4d7` |
| knowledge/ Image Mode | v0.122 -> v0.122, sha16 `141ae5a4515d4e99` |
| knowledge/ Video Mode | v0.122 -> v0.122, sha16 `dbd28f8813b7c1df` |
| knowledge/ Assets - Visual Mode Library | v0.110 -> v0.110, sha16 `a99397aa2d2331c8` |
| knowledge/ Assets - Image Mode Library | v0.101 -> v0.101, sha16 `4ab3ed815420982f` |
| knowledge/ Assets - Video Mode Library | v0.101 -> v0.101, sha16 `c931858e5faa3424` |

Full hashes can be recomputed with `shasum -a 256`.

## Set Up The Live Project

1. Create or open the claude.ai Project named **Prompt Improver**.
2. Paste `Custom Instructions.md` into the Project custom instructions field.
3. Upload every file in `knowledge/` as Project Knowledge.
4. Keep filenames unchanged so the kernel can reference the documents clearly.
5. Run one smoke prompt per mode: text, raw, visual UI, image, video, JSON and YAML.
6. Confirm the Deliverable Block, attestation footer, export-equivalent path and routed score appear.

## Change Checklist

- Re-copy changed source files from `../sk-prompt-improver/SKILL.md`, `../sk-prompt-improver/references/` and `../sk-prompt-improver/assets/` into `knowledge/`.
- If identity, routing, scoring, format handling or delivery behavior changes, re-derive `Custom Instructions.md` from the Skill kernel.
- Update this README with the new version stamps and sha256-16 values.
- Re-upload changed files to the live Project and confirm the upload took.

## Known Notes

- Project Knowledge may be retrieved as chunks rather than full files, so the Project kernel repeats the core gates and routing contract.
- `knowledge/Prompt Improver - System - Skill - v1.2.0.md` remains a source mirror for RAG consistency.
- No compact fallback instructions file exists yet. Add one only if paste-testing shows the full kernel does not fit.
