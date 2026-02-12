# Barter - System - Token Budget - v0.100

Defines token budget allocation rules, loading tier definitions, and optimisation strategies for all Barter AI agents using the DEPTH processing framework.

**Loading Condition:** REFERENCE - Never auto-loaded into agent context
**Purpose:** Serves as the single source of truth for how knowledge base files consume context window capacity across agent sessions
**Scope:** Token budget allocation, loading tier definitions (ALWAYS, ON_COMMAND, ON_CREATION, INTERACTIVE, REFERENCE), optimization strategies, DEPTH energy level impact, file size monitoring, and budget ceiling recommendations for all DEPTH framework agents

---

## 📋 TABLE OF CONTENTS

- [1. 🎯 SCOPE & CONVENTIONS](#1--scope--conventions)
- [2. 📊 LOADING TIER DEFINITIONS](#2--loading-tier-definitions)
- [3. 💰 TOKEN BUDGET BY AGENT](#3--token-budget-by-agent)
- [4. 🌐 GLOBAL SHARED FILES](#4--global-shared-files)
- [5. 📏 BUDGET GUIDELINES](#5--budget-guidelines)
- [6. ⚡ DEPTH ENERGY LEVEL IMPACT](#6--depth-energy-level-impact)
- [7. 🔧 OPTIMISATION STRATEGIES](#7--optimisation-strategies)
- [8. 🛠️ MAINTENANCE](#8-️-maintenance)

---

## 1. 🎯 SCOPE & CONVENTIONS

### Scope

**In scope:**
- All agents using the DEPTH framework (currently 7 agents)
- Token budget allocation and loading tier management
- DEPTH energy level impact analysis

**Out of scope:**
- Agents using MEDIA, SYNC, or VIDEO frameworks (Media Editor, Notion, CapCut) — these have separate context management strategies

### Conventions

- All sizes in this document are approximate and measured in kilobytes (KB)
- 1 KB ≈ 250 tokens (conservative estimate for markdown content)
- Token counts are estimates; actual tokenisation varies by model

---

## 2. 📊 LOADING TIER DEFINITIONS

### Tier Overview

| Tier            | Code          | When Loaded                         | Budget Impact                      | Description                                                                                       |
| --------------- | ------------- | ----------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Always**      | `ALWAYS`      | Every session start                 | Permanent — always consumes budget | Core identity files loaded on every interaction. These define voice, rules, and system behaviour. |
| **On Command**  | `ON_COMMAND`  | When user triggers specific command | Temporary — loaded per request     | Context files loaded when a specific `$command` is invoked. Unloaded after response.              |
| **On Creation** | `ON_CREATION` | When generating new content         | Temporary — loaded during creation | Standards and framework files loaded during content generation mode.                              |
| **Interactive** | `INTERACTIVE` | During multi-turn conversations     | Temporary — loaded on mode entry   | Conversation management files for interactive sessions.                                           |
| **Reference**   | `REFERENCE`   | Never auto-loaded                   | Zero — manual reference only       | Documentation files consulted by maintainers, not loaded into agent context.                      |

---

## 3. 💰 TOKEN BUDGET BY AGENT

### 3.1 LinkedIn — Nigel de Lange

| Loading Tier            | Files                                                                                                                | Size (KB) | Est. Tokens |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| **ALWAYS**              | System Prompt (v0.100), Voice DNA (v0.100), Quality Validators (v0.100), Rules - Human Voice (v0.101)                | ~116 KB   | ~29,000     |
| **ON COMMAND**          | Human Voice Extensions, Context - Brand (v0.110), Context - Industry (v0.110), Rules - Engagement, Platform Strategy | ~90 KB    | ~22,500     |
| **ON CREATION**         | Content Standards, DEPTH Framework                                                                                   | ~50 KB    | ~12,500     |
| **INTERACTIVE**         | Interactive Mode (v0.101)                                                                                            | ~50 KB    | ~12,500     |
| **Typical session**     | ALWAYS + 1-2 ON COMMAND files                                                                                        | ~150 KB   | ~37,500     |
| **Maximum theoretical** | All files loaded simultaneously                                                                                      | ~306 KB   | ~76,500     |

### 3.2 LinkedIn — Pieter Bertram

| Loading Tier            | Files                                                                                                                                  | Size (KB) | Est. Tokens |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| **ALWAYS**              | System Prompt (v0.130), Voice DNA (v0.122), Quality Validators (v0.122), Rules - Human Voice (v0.101)                                  | ~104 KB   | ~26,000     |
| **ON COMMAND**          | Human Voice Extensions, Context - Brand (v0.110), Context - Industry (v0.110), Rules - Engagement (v0.110), Platform Strategy (v0.110) | ~85 KB    | ~21,250     |
| **ON CREATION**         | Content Standards (v0.122), DEPTH Framework (v0.121)                                                                                   | ~48 KB    | ~12,000     |
| **INTERACTIVE**         | Interactive Mode (v0.121)                                                                                                              | ~48 KB    | ~12,000     |
| **Typical session**     | ALWAYS + 1-2 ON COMMAND files                                                                                                          | ~140 KB   | ~35,000     |
| **Maximum theoretical** | All files loaded simultaneously                                                                                                        | ~285 KB   | ~71,250     |

### 3.3 TikTok — Danique Tiggelman

| Loading Tier            | Files                                                                                                       | Size (KB) | Est. Tokens |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| **ALWAYS**              | System Prompt, DEPTH, Interactive Mode, Human Voice, HV Extensions, Brand, Brand Extensions, Stats Registry | ~193 KB   | ~48,250     |
| **ON COMMAND**          | Context - Market (v0.110)                                                                                   | ~38 KB    | ~9,500      |
| **Typical session**     | ALWAYS (all 8 files)                                                                                        | ~193 KB   | ~48,250     |
| **Maximum theoretical** | All files                                                                                                   | ~231 KB   | ~57,750     |

> **Note**: TikTok has the heaviest ALWAYS-load set. This front-loading strategy prioritises consistency but consumes significant context budget upfront.

### 3.4 Other DEPTH Agents

| Agent           | ALWAYS (KB) | Est. ALWAYS Tokens | Max Theoretical (KB) | Framework |
| --------------- | ----------- | ------------------ | -------------------- | --------- |
| Copywriter      | ~168 KB     | ~42,000            | ~233 KB              | DEPTH     |
| Barter Deals    | ~122 KB     | ~30,500            | ~280 KB              | DEPTH     |
| Product Owner   | ~85 KB      | ~21,250            | ~202 KB              | DEPTH     |
| Prompt Improver | ~90 KB      | ~22,500            | ~180 KB              | DEPTH     |

### 3.5 Non-DEPTH Agents

| Agent        | Framework         | Notes                                  |
| ------------ | ----------------- | -------------------------------------- |
| Media Editor | MEDIA (10 rounds) | Context management via MEDIA framework |
| Notion       | SYNC (4 phases)   | Context management via SYNC framework  |
| CapCut       | VIDEO (4 phases)  | Context management via VIDEO framework |

**Note:** These agents do not use DEPTH processing and are excluded from DEPTH token budget rules. They have their own framework-specific context management.

---

## 4. 🌐 GLOBAL SHARED FILES

### Cross-Agent Token Accounting

Global shared files are symlinked into each agent's knowledge base. Their token cost applies to EVERY agent that links them.

| Global File                                 | Size (KB) | Est. Tokens | Agents Using                                                   | Loading Tier |
| ------------------------------------------- | --------- | ----------- | -------------------------------------------------------------- | ------------ |
| Rules - Human Voice (v0.101)                | 25 KB     | ~6,250      | Nigel, Pieter, TikTok, Copywriter, Barter Deals, Product Owner | ALWAYS       |
| Context - Brand (v0.110)                    | 24 KB     | ~6,000      | Nigel, Pieter, TikTok, Copywriter, Barter Deals                | ON_COMMAND   |
| Context - Industry (v0.110)                 | 28 KB     | ~7,000      | Nigel, Pieter                                                  | ON_COMMAND   |
| Context - Market (v0.110)                   | 38 KB     | ~9,500      | Nigel, Pieter, TikTok                                          | ON_COMMAND   |
| Context - Canonical Stats Registry (v0.110) | 28 KB     | ~7,000      | Nigel, Pieter, TikTok                                          | ON_COMMAND   |

**Total Global shared footprint:** ~143 KB (~35,750 tokens) if all loaded simultaneously.

### Loading Principle

Global shared files use ON_COMMAND loading where possible to minimise baseline token consumption. Only Human Voice base rules are ALWAYS-loaded (because Extensions depend on the base being present).

---

## 5. 📏 BUDGET GUIDELINES

### 5.1 Recommended Ceilings

| Budget Category            | Ceiling                   | Rationale                                                                         |
| -------------------------- | ------------------------- | --------------------------------------------------------------------------------- |
| ALWAYS-load budget         | ≤ 130 KB (~32,500 tokens) | Leaves sufficient context for conversation, ON COMMAND files, and model reasoning |
| Single ON COMMAND addition | ≤ 40 KB (~10,000 tokens)  | Prevents single-command context spikes                                            |
| Maximum session load       | ≤ 250 KB (~62,500 tokens) | Conservative ceiling for 128K context models                                      |
| DEPTH processing overhead  | ~10-20 KB per round       | DEPTH's thinking rounds consume additional context                                |

### 5.2 When to Split vs Combine Files

| Condition                                         | Action                                           |
| ------------------------------------------------- | ------------------------------------------------ |
| File exceeds 50 KB                                | Consider splitting into base + extensions        |
| File is loaded conditionally with other files     | Keep separate for granular loading               |
| Two files are ALWAYS loaded together              | Consider combining to reduce file count overhead |
| File contains both ALWAYS and conditional content | Split into ALWAYS core + ON COMMAND detail       |

### 5.3 Loading Priority Rules

1. **ALWAYS files load first** — these establish agent identity and core rules
2. **Human Voice base loads before Extensions** — Extensions override the base
3. **ON_COMMAND files load only when triggered** — prevents unnecessary context consumption
4. **ON_CREATION files load during generation mode** — standards and frameworks
5. **Multiple ON_COMMAND files may load simultaneously** — budget must account for overlap

---

## 6. ⚡ DEPTH ENERGY LEVEL IMPACT

### Energy Level Impact on Token Consumption

The DEPTH framework processes at different energy levels, each affecting token consumption:

| Energy Level | DEPTH Rounds | Additional Token Overhead         | Use Case                            |
| ------------ | ------------ | --------------------------------- | ----------------------------------- |
| **Raw**      | 0            | None — direct response            | Quick replies, simple questions     |
| **Quick**    | 1            | ~10 KB (~2,500 tokens)            | Standard posts, replies             |
| **Standard** | 2-3          | ~20-30 KB (~5,000-7,500 tokens)   | Feature posts, thought leadership   |
| **Deep**     | 4-5          | ~40-50 KB (~10,000-12,500 tokens) | Complex analysis, long-form content |

### Impact Analysis

An agent with 130 KB ALWAYS-load running at Deep energy may consume ~180 KB total — well within 128K model limits but approaching budget ceilings. Agents with heavy ALWAYS loads (e.g., TikTok at 193 KB) should be cautious with Deep energy.

---

## 7. 🔧 OPTIMISATION STRATEGIES

### 7.1 Currently Implemented

| Strategy                    | Description                                                          | Agents Using              |
| --------------------------- | -------------------------------------------------------------------- | ------------------------- |
| **Smart routing**           | System Prompt routes to conditional files based on command detection | Nigel, Pieter, Copywriter |
| **Conditional loading**     | ON COMMAND / ON CREATION tiers defer loading until needed            | All agents                |
| **Symlinks**                | Global shared files linked, not duplicated, across agents            | All agents                |
| **Extensions architecture** | Base rules (Global) + agent-specific overrides (Extensions)          | Human Voice, Brand        |

### 7.2 Recommended Future Optimisations

| Strategy                        | Description                                                            | Impact                                    |
| ------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| **ALWAYS-load audit**           | Review TikTok's 8 ALWAYS files — some may be candidates for ON COMMAND | Could reduce TikTok baseline by ~30-50 KB |
| **File size monitoring**        | Track file sizes across versions to catch growth                       | Prevents gradual budget creep             |
| **Loading condition alignment** | Ensure AGENTS.md and System Prompt agree on loading conditions         | Prevents phantom loads                    |
| **Context recycling**           | For multi-turn sessions, unload ON COMMAND files after use             | Frees context for subsequent commands     |

---

## 8. 🛠️ MAINTENANCE

### 8.1 Version History

| Version | Date       | Changes                                                               |
| ------- | ---------- | --------------------------------------------------------------------- |
| v0.100  | 2026-02-10 | Initial creation — baseline budget documentation for all DEPTH agents |

### 8.2 Update Triggers

This document should be updated when:

- A new agent is created that uses DEPTH
- An existing agent's loading conditions change
- File sizes change significantly (>20% growth)
- New loading tiers are introduced
- Context window model limits change

### 8.3 Validation

To verify token budget accuracy:

1. List all files in an agent's knowledge base directory
2. Sum file sizes by loading tier
3. Compare against this document's tables
4. Flag any discrepancies

---

*This document establishes token budget standards for all DEPTH framework agents to ensure efficient context window utilization and prevent budget ceiling violations. Loading tier definitions and file size monitoring enable proactive budget management across the agent ecosystem.*
