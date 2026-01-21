---
description: Route requests to AI Systems with full System Prompt identity adoption via Task delegation
argument-hint: "[system|path:<path>] <request>"
allowed-tools: Read, Glob, Grep, Task, AskUserQuestion
---

# 🚨 MANDATORY FIRST ACTION - DO NOT SKIP

**BEFORE READING ANYTHING ELSE IN THIS FILE, CHECK `$ARGUMENTS`:**

```
IF $ARGUMENTS is empty, undefined, or contains only whitespace:
    → STOP IMMEDIATELY
    → Present the user with this question:
        question: "What request would you like to route?"
        options:
          - label: "Describe my request"
            description: "I'll provide a request to process through intelligent agent routing"
    → WAIT for user response
    → Use their response as the request
    → Only THEN continue with this workflow

IF $ARGUMENTS contains a request:
    → Continue reading this file
```

**CRITICAL RULES:**
- **DO NOT** infer requests from context, screenshots, or conversation history
- **DO NOT** assume what the user wants based on open files or recent activity
- **DO NOT** proceed past this point without an explicit request from the user
- The request MUST come from `$ARGUMENTS` or user's answer to the question above

---

# Agent Router

Launcher architecture for routing requests to specialized AI Systems with full System Prompt identity adoption.

**Version:** 3.0 (Launcher Architecture)

---

## 1. 🎯 PURPOSE

The Agent Router is a **LAUNCHER**, not an executor. It:

1. **Resolves** the target system from aliases, keywords, or explicit paths
2. **Locates** and reads AGENTS.md for the target system
3. **Finds** and reads the COMPLETE System Prompt file
4. **Launches** a sub-agent via Task tool with full System Prompt as identity
5. **Returns** results from the sub-agent

**Core Principle:** The router NEVER executes requests itself. It delegates completely to the target agent, which operates in ITS native mode with ITS complete identity.

---

## 2. 📝 CONTRACT

**Inputs:** `$ARGUMENTS` — Request with optional system selector  
**Format:** `[system|path:<path>] <request>`

**Outputs:** `STATUS=<OK|FAIL> [ERROR="<message>"]`

| Output Field | Description |
|--------------|-------------|
| `STATUS` | `OK` on success, `FAIL` on error |
| `ERROR` | Error message (only when STATUS=FAIL) |
| `SYSTEM` | Resolved system name |
| `OUTPUT` | Sub-agent result summary |

---

## 3. 📋 USER INPUT

```text
$ARGUMENTS
```

---

## 4. 🗂️ AI SYSTEMS REGISTRY

### Available Systems

| System | Aliases | Folder |
|--------|---------|--------|
| Barter Copywriter | `barter`, `copywriter`, `copy` | Barter - Copywriter |
| Barter LinkedIn | `linkedin`, `pieter` | Barter - LinkedIn/Pieter Bertram |
| Barter TikTok | `tiktok`, `seo`, `creative` | Barter - TikTok SEO & Creative Strategy |
| Media Editor | `media`, `image`, `video`, `audio`, `hls` | Media Editor |
| Notion | `notion` | Notion |
| Product Owner | `po`, `product`, `ticket`, `story`, `epic`, `doc` | Product Owner |
| Prompt Improver | `prompt`, `improve`, `enhance` | Prompt Improver |
| Webflow | `webflow`, `wf` | Webflow |

### Base Paths

| System Group | Base Path |
|--------------|-----------|
| Barter systems | `/Users/michelkerkmeester/MEGA/Development/AI Systems/Barter/` |
| Other systems | `/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/` |

### Keywords (for auto-detection)

| System | Keywords |
|--------|----------|
| Barter Copywriter | copy, content, marketing, brand voice, creator, campaign, UGC |
| Barter LinkedIn | linkedin, post, pieter, personal brand, thought leadership |
| Barter TikTok | tiktok, trend, hashtag, algorithm, video strategy |
| Media Editor | resize, compress, convert, thumbnail, watermark, transcode, ffmpeg |
| Notion | database, page, block, property, relation, rollup, template |
| Product Owner | user story, acceptance criteria, epic, specification, requirements |
| Prompt Improver | prompt, enhance, optimize, structure, framework, CLEAR |
| Webflow | collection, cms, page, component, interaction, designer, field |

---

## 5. 🔀 ARGUMENT ROUTING

### Dispatch Logic

```
$ARGUMENTS
    │
    ├─► First word matches SYSTEM ALIAS (case-insensitive)
    │   ├─► "barter" | "copywriter" | "copy"                       → BARTER COPYWRITER
    │   ├─► "linkedin" | "pieter"                                  → BARTER LINKEDIN
    │   ├─► "tiktok" | "seo" | "creative"                          → BARTER TIKTOK
    │   ├─► "webflow" | "wf"                                       → WEBFLOW
    │   ├─► "notion"                                               → NOTION
    │   ├─► "media" | "image" | "video" | "audio" | "hls"          → MEDIA EDITOR
    │   ├─► "po" | "product" | "ticket" | "story" | "epic" | "doc" → PRODUCT OWNER
    │   └─► "prompt" | "improve" | "enhance"                       → PROMPT IMPROVER
    │
    ├─► Contains "path:" pattern
    │   └─► CUSTOM PATH: Extract path value → Use as agent_folder
    │       (Overrides system alias if both present)
    │
    ├─► KEYWORD ANALYSIS (no explicit system detected)
    │   │
    │   │   Analyze request against registry keywords:
    │   │   - If single system matches clearly → Auto-select with notification
    │   │   - If multiple systems match → Present selection menu
    │   │
    │   └─► NO MATCH DETECTED
    │       └─► Present full system selection menu
    │
    └─► Empty (no args)
        └─► Trigger mandatory gate (ask user for request)
```

### System Selection Menu

When system cannot be auto-detected, present:

```
Which AI System should handle this request?

| Option | System            | Best For                                         |
|--------|-------------------|--------------------------------------------------|
| A      | Barter Copywriter | Copy, content, marketing, brand voice, campaigns |
| B      | Barter LinkedIn   | LinkedIn posts, Pieter's personal brand          |
| C      | Barter TikTok     | TikTok SEO, creative strategy, trends            |
| D      | Media Editor      | Image/video/audio processing, HLS streaming      |
| E      | Notion            | Databases, pages, blocks, properties             |
| F      | Product Owner     | Tickets, user stories, epics, specifications     |
| G      | Prompt Improver   | Prompt enhancement, optimization, structuring    |
| H      | Webflow           | CMS collections, fields, pages, components       |
| I      | Custom Path       | Specify path to unlisted agent folder            |

Reply with letter (A-I):
```

---

## 6. 📊 WORKFLOW OVERVIEW (5 STEPS)

| Step | Name | Purpose | Outputs |
|------|------|---------|---------|
| 1 | Locate AGENTS.md | Find bootstrap file for target system | `agents_md_path`, `agent_scope_root` |
| 2 | Read AGENTS.md | Parse routing instructions | `routing_directive`, `behavioral_guidelines` |
| 3 | Locate and Read System Prompt | Load complete agent identity | `system_prompt_path`, `system_prompt_content` |
| 4 | Launch Target Agent | Delegate via Task tool | `sub_agent_result`, `task_status` |
| 5 | Return Results | Report completion | `STATUS`, formatted report |

---

## 7. ⚡ INSTRUCTIONS

### Step 1: Locate AGENTS.md

**Purpose:** Find and validate the AGENTS.md bootstrap file for the target system

**Activities:**
- Resolve `agent_folder` from registry or path override:
  - From registry: `{base_path}/{system_folder}`
  - From path override: Use explicit path provided
- Check for AGENTS.md at: `{agent_folder}/AGENTS.md`
- Set `agent_scope_root` to the folder containing AGENTS.md

**Validation checkpoint:**
- [ ] AGENTS.md file exists at resolved path
- [ ] agent_scope_root is set

**Failure:** Report system attempted and path tried → `STATUS=FAIL ERROR="AGENTS.md not found"`

---

### Step 2: Read AGENTS.md

**Purpose:** Read the bootstrap file and extract routing information

**Activities:**
- Read AGENTS.md completely
- Extract:
  - Behavioral guidelines
  - Routing instructions
  - The "GO TO: [System Prompt] NOW" directive (or equivalent)
- Note: AGENTS.md is a BOOTSTRAP file, NOT the full identity
- The full identity lives in the System Prompt file it points to

**Validation checkpoint:**
- [ ] AGENTS.md content parsed
- [ ] Routing directive identified

---

### Step 3: Locate and Read System Prompt

**Purpose:** Find and read the COMPLETE System Prompt that defines the agent's identity

**Activities:**
- Use Glob to find System Prompt:
  - Pattern: `{agent_scope_root}/knowledge base/*System Prompt*.md`
- If multiple versions exist:
  - Select the one with the highest version number
  - Example: "v0.960" takes precedence over "v0.954"
- Read the System Prompt file COMPLETELY
- Store content as `system_prompt_content`

**Fallback:** If no System Prompt file found:
- Check if AGENTS.md itself contains full identity sections (OBJECTIVE, ROLE)
- If yes, use AGENTS.md content as the System Prompt
- If no, report error

**Validation checkpoint:**
- [ ] System Prompt file located
- [ ] Full content loaded into `system_prompt_content`

**Failure:** `STATUS=FAIL ERROR="System Prompt not found in knowledge base"`

---

### Step 4: Launch Target Agent

**Purpose:** Delegate request to sub-agent with complete System Prompt identity

**🚨 CRITICAL: HONOR TARGET AGENT'S INTERACTIVE MODE**

The router MUST NOT bypass the target agent's question-asking behavior:

1. **Check for $quick or $q command** in the user's request
   - If present: Target agent may skip questions and use smart defaults
   - If absent: Target agent's Interactive Mode MUST be honored

2. **The sub-agent controls its own Interactive Mode:**
   - If target agent has Interactive Mode, IT will ask questions
   - The router does NOT decide what is "enough" context
   - The router does NOT add "proceed with creating" instructions

3. **NEVER include these phrases in the Task prompt:**
   - "proceed with creating"
   - "context is sufficient"
   - "you can create the deliverable"
   - "skip questions"
   - Any instruction that bypasses Interactive Mode

**Activities:**
- Use Task tool with `subagent_type: "general"`
- Construct prompt using IDENTITY TRANSFER PROTOCOL (see Section 8)
- Pass:
  - Complete System Prompt content
  - User's original request (UNMODIFIED)
  - Workspace paths (agent folder, knowledge base, export)
- **DO NOT add router instructions that override target agent's mode**
- Wait for sub-agent completion
- The sub-agent processes the request in ITS native mode
  - If it has Interactive mode with DEPTH, it uses that
  - If it has mode commands ($quick, $task), it honors those
  - The router does NOT impose any mode

**Validation checkpoint:**
- [ ] Task tool invoked with correct parameters
- [ ] No router instructions override target agent's Interactive Mode
- [ ] Sub-agent result received

---

### Step 5: Return Results

**Purpose:** Report sub-agent results back to user

**Activities:**
- Receive sub-agent output
- Format completion report (see Section 10)
- Set `STATUS` based on sub-agent result:
  - Sub-agent succeeded: `STATUS=OK`
  - Sub-agent failed: `STATUS=FAIL`

---

## 8. 🔧 IDENTITY TRANSFER PROTOCOL

Use this template when constructing the Task tool prompt:

```markdown
# IDENTITY TRANSFER PROTOCOL

You are being instantiated as a specialized AI agent. Your complete identity follows.

## SYSTEM PROMPT - THIS DEFINES WHO YOU ARE

---BEGIN SYSTEM PROMPT---
{system_prompt_content}
---END SYSTEM PROMPT---

## OPERATING CONTEXT

**Workspace:**
- Agent folder: {agent_scope_root}
- Knowledge base: {agent_scope_root}/knowledge base/
- Export folder: {agent_scope_root}/export/

**Origin:** Routed via /agent_router from system "{system_name}"

## REQUEST TO PROCESS

{user_request}

## EXECUTION INSTRUCTIONS

1. You ARE this agent now. The System Prompt above defines your identity completely.
2. Follow YOUR System Prompt's operating mode exactly as written.
3. If YOUR System Prompt has Interactive Mode, follow it - ask questions before creating deliverables.
4. If the request contains $quick or $q, honor that per YOUR System Prompt.
5. If the request does NOT contain $quick/$q, you MUST follow your Interactive Mode logic.
6. Read additional Knowledge Base documents as YOUR routing logic directs.
7. Save deliverables to YOUR export folder per YOUR export protocol.
8. Apply YOUR cognitive frameworks (DEPTH, CLEAR scoring, etc.) as specified.

**CRITICAL:** The router has NOT determined whether context is sufficient. YOU decide that based on YOUR Interactive Mode logic. If YOUR System Prompt says to ask questions before creating, YOU MUST ask questions.

BEGIN PROCESSING NOW.
```

**IMPORTANT: Do NOT add any of these to the Task prompt:**
- "proceed with creating" 
- "context is sufficient"
- "skip questions"
- "you have enough information"
- Any instruction that tells the sub-agent to bypass its own Interactive Mode

---

## 9. ⚠️ ERROR HANDLING

| Condition | Action | Status Output |
|-----------|--------|---------------|
| Empty `$ARGUMENTS` | Trigger mandatory gate | (wait for input) |
| System alias not recognized | Present selection menu | (wait for selection) |
| AGENTS.md not found | Report path tried, list available systems | `STATUS=FAIL ERROR="AGENTS.md not found at {path}"` |
| System Prompt not found | Report search pattern, suggest fixes | `STATUS=FAIL ERROR="System Prompt not found in knowledge base"` |
| Sub-agent failure | Report error from sub-agent | `STATUS=FAIL ERROR="{sub_agent_error}"` |
| Sub-agent timeout | Report timeout, suggest retry | `STATUS=FAIL ERROR="Sub-agent execution timed out"` |

### Error Message Templates

**AGENTS.md Not Found:**
```
AGENTS.md not found at specified location.

System: {system_name}
Path tried: {agent_folder}/AGENTS.md

Available systems:
- barter, copywriter, copy     → Barter Copywriter
- linkedin, pieter             → Barter LinkedIn
- tiktok, seo, creative        → Barter TikTok
- media, image, video, audio   → Media Editor
- notion                       → Notion
- po, product, ticket, story   → Product Owner
- prompt, improve, enhance     → Prompt Improver
- webflow, wf                  → Webflow

Or use: path:/custom/path

STATUS=FAIL ERROR="AGENTS.md not found"
```

**System Prompt Not Found:**
```
System Prompt not found in knowledge base.

AGENTS.md location: {agents_md_path}
Search pattern: {agent_scope_root}/knowledge base/*System Prompt*.md

The AGENTS.md was found but no System Prompt file exists.

Options:
1. Create a System Prompt file in the knowledge base
2. Check if AGENTS.md contains full identity (OBJECTIVE, ROLE sections)

STATUS=FAIL ERROR="System Prompt not found"
```

---

## 10. 📊 COMPLETION REPORT

After successful execution, report:

```
Agent Router Complete

System: {system_name}
System Prompt: {system_prompt_path}
Agent Scope: {agent_scope_root}

Request: {user_request_summary}

Result:
{sub_agent_result_summary}

Output Location: {output_location_if_any}

STATUS=OK
```

---

## 11. 🔍 EXAMPLES

### Direct System Selection

```bash
# Product Owner - write a user story
/agent_router po "Write a user story for SSO login"

# Prompt Improver - enhance a prompt
/agent_router prompt "Improve this prompt: write better code"

# Webflow - CMS work
/agent_router webflow "Add author field to blog collection"

# Barter Copywriter
/agent_router barter "Write hero copy for creator landing page"

# Media Editor
/agent_router media "Convert video to HLS format"
```

### With Mode Commands (passed to target agent)

```bash
# The $quick command is passed to Product Owner's System Prompt
/agent_router po "$quick Create a task for fixing the header"

# The $improve command is passed to Prompt Improver's System Prompt
/agent_router prompt "$improve Enhance this prompt for clarity"

# The $task command is passed to the target agent
/agent_router barter "$task Write 3 LinkedIn posts"
```

### Custom Path

```bash
# Route to an unlisted agent
/agent_router path:/path/to/custom/agent "Process this request"

# Path override takes precedence
/agent_router barter path:/alternate/barter "Use alternate Barter agent"
```

### Keyword Auto-Detection

```bash
# Detects Webflow from "collection" keyword
/agent_router "Create a new CMS collection for team members"

# Detects Product Owner from "user story" keyword
/agent_router "Write an epic for the authentication system"

# Detects Prompt Improver from "enhance prompt"
/agent_router "Enhance this prompt for image generation"
```

---

## 12. 📌 RULES

### ALWAYS

| Rule | Reason |
|------|--------|
| Read the FULL System Prompt before launching sub-agent | Complete identity required |
| Pass complete System Prompt content to sub-agent | Sub-agent needs full context |
| Let sub-agent control its own operating mode | Target agent knows its mode |
| Report sub-agent results faithfully without modification | Transparency |
| Use Task tool for execution (NEVER execute directly) | Launcher architecture |
| Set agent_scope_root to folder containing AGENTS.md | Proper scoping |
| Validate System Prompt exists before launching | Prevent incomplete delegation |

### NEVER

| Anti-Pattern | Problem |
|--------------|---------|
| Execute requests directly | Router is launcher, not executor |
| Override target agent's operating mode | Target controls its own mode |
| Skip System Prompt reading | Incomplete identity transfer |
| Modify or filter sub-agent's output | Loss of fidelity |
| Guess System Prompt content | Must read actual file |
| Impose `:auto`/`:confirm` modes on target agents | Those are for router, not target |
| Process the request yourself instead of delegating | Violates launcher architecture |
| **Add "proceed with creating" to Task prompt** | **Bypasses target agent's Interactive Mode** |
| **Add "context is sufficient" to Task prompt** | **Router doesn't decide sufficiency** |
| **Tell sub-agent to skip questions** | **Target agent controls its question flow** |
| **Assume user provided enough context** | **Let target agent's logic decide** |

---

## 13. 🔗 RELATED RESOURCES

### Related Commands

| Command | Purpose |
|---------|---------|
| `/spec_kit:complete` | Spec folder workflow |
| `/memory:save` | Save context to memory |

### Skills

| Skill | Purpose |
|-------|---------|
| `system-spec-kit` | Spec folder management |
| `workflows-documentation` | Documentation standards |

### External

| Resource | Location |
|----------|----------|
| AI Systems folder | `/Users/michelkerkmeester/MEGA/Development/AI Systems/` |
| Command template | `.opencode/skill/workflows-documentation/assets/opencode/command_template.md` |
