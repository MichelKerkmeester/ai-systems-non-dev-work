---
description: Route requests to AI Systems with intelligent system detection and AGENTS.md compliance. Supports :auto and :confirm modes.
argument-hint: "[system|path:<path>] <request> [:auto|:confirm]"
allowed-tools: Read, Write, Edit, Glob, Grep, Task, AskUserQuestion
---

# 🚨 MANDATORY FIRST ACTION - DO NOT SKIP

**BEFORE READING ANYTHING ELSE IN THIS FILE, CHECK `$ARGUMENTS`:**

```
IF $ARGUMENTS is empty, undefined, or contains only whitespace (ignoring mode flags):
    → STOP IMMEDIATELY
    → Use AskUserQuestion tool with this exact question:
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

Intelligent request routing to AI Systems with automatic system detection, keyword analysis, and AGENTS.md compliance enforcement.

---

## 1. 🎯 PURPOSE

Enable users to route requests to specialized AI Systems through intelligent detection and routing. The command:

1. **Detects target system** from explicit selection, aliases, or keyword analysis
2. **Resolves AGENTS.md location** from registry or custom path
3. **Enforces AGENTS.md compliance** by reading and applying agent-specific rules
4. **Executes requests** according to agent guidelines and knowledge base routing

---

## 2. 📝 CONTRACT

**Inputs:**
- `$ARGUMENTS` — Request with optional system selector and mode flag
- Format: `[system|path:<path>] <request> [:auto|:confirm]`

**Outputs:**
- Executed request per AGENTS.md guidelines
- `STATUS=OK|FAIL|CANCELLED`

**User Input:**
```text
$ARGUMENTS
```

---

## 3. 🗂️ AI SYSTEMS REGISTRY

Available AI Systems for intelligent routing:

| System              | Aliases                                           | Role                                                        | MCP |
| ------------------- | ------------------------------------------------- | ----------------------------------------------------------- | --- |
| **ClickUp**         | `clickup`, `cu`                                   | Workspace management via native MCP (tasks, lists, folders) | Yes |
| **Media Editor**    | `media`, `image`, `video`, `audio`, `hls`         | Image/video/audio processing via MCP tools                  | Yes |
| **Notion**          | `notion`                                          | Workspace management via native MCP (databases, pages)      | Yes |
| **Product Owner**   | `po`, `product`, `ticket`, `story`, `epic`, `doc` | Write tickets, stories, epics focusing on WHAT and WHY      | No  |
| **Prompt Improver** | `prompt`, `improve`, `enhance`                    | Enhance, optimize, and structure prompts                    | No  |
| **Webflow**         | `webflow`, `wf`                                   | Site management via Data API and Designer API               | Yes |

### Registry Configuration

```yaml
ai_systems_base: "{AI_SYSTEMS_PATH}"

systems:
  clickup:
    folder: "ClickUp"
    keywords: [task, list, folder, time tracking, custom field, hierarchy, workspace]
    framework: "SYNC"

  media_editor:
    folder: "Media Editor"  
    keywords: [resize, compress, convert, thumbnail, watermark, transcode, hls, ffmpeg]
    framework: "MEDIA"

  notion:
    folder: "Notion"
    keywords: [database, page, block, property, relation, rollup, template]
    framework: "SYNC"

  product_owner:
    folder: "Product Owner"
    keywords: [user story, acceptance criteria, epic, specification, requirements, backlog]
    framework: "DEPTH"

  prompt_improver:
    folder: "Prompt Improver"
    keywords: [prompt, enhance, optimize, structure, framework, pattern, CLEAR]
    framework: "DEPTH"

  webflow:
    folder: "Webflow"
    keywords: [collection, cms, page, component, interaction, designer, site, field]
    framework: "SYNC"
```

---

## 4. 🔀 SYSTEM RESOLUTION (ARGUMENT DISPATCH)

```
$ARGUMENTS
    │
    ├─► First word matches SYSTEM ALIAS (case-insensitive)
    │   ├─► "clickup" | "cu"                    → CLICKUP SYSTEM
    │   ├─► "webflow" | "wf"                    → WEBFLOW SYSTEM  
    │   ├─► "notion"                            → NOTION SYSTEM
    │   ├─► "media" | "image" | "video" | "audio" | "hls" → MEDIA EDITOR
    │   ├─► "po" | "product" | "ticket" | "story" | "epic" | "doc" → PRODUCT OWNER
    │   └─► "prompt" | "improve" | "enhance"    → PROMPT IMPROVER
    │
    ├─► Contains "path:" pattern
    │   └─► CUSTOM PATH: Extract path value → Use as agents_location
    │       (Overrides system alias if both present)
    │
    ├─► KEYWORD ANALYSIS (no explicit system detected)
    │   │
    │   │   Analyze request against registry keywords:
    │   │
    │   ├─► "task", "list", "folder", "time track"     → Suggest CLICKUP
    │   ├─► "collection", "cms", "field", "designer"   → Suggest WEBFLOW
    │   ├─► "database", "block", "relation", "page"    → Suggest NOTION
    │   ├─► "resize", "compress", "convert", "hls"     → Suggest MEDIA EDITOR
    │   ├─► "user story", "epic", "acceptance"         → Suggest PRODUCT OWNER
    │   └─► "enhance prompt", "optimize prompt"        → Suggest PROMPT IMPROVER
    │
    │   If single system matches clearly → Auto-select with notification
    │   If multiple systems match → Present selection menu
    │
    └─► NO MATCH DETECTED
        └─► Present full system selection menu (see below)
```

### System Selection Menu

When system cannot be auto-detected, present:

```
Which AI System should handle this request?

| Option | System          | Best For                                                   |
| ------ | --------------- | ---------------------------------------------------------- |
| A      | ClickUp         | Tasks, lists, folders, time tracking, project management   |
| B      | Media Editor    | Image resize/compress, video convert, audio, HLS streaming |
| C      | Notion          | Databases, pages, blocks, properties, relations            |
| D      | Product Owner   | Tickets, user stories, epics, specifications               |
| E      | Prompt Improver | Prompt enhancement, optimization, structuring              |
| F      | Webflow         | CMS collections, fields, pages, components                 |
| G      | Custom Path     | Specify path to unlisted agent folder                      |

Reply with letter (A-G):
```

---

## 5. ⚙️ MODE DETECTION

### Parse Mode Suffix

| Pattern                              | Mode        | Behavior                                 |
| ------------------------------------ | ----------- | ---------------------------------------- |
| `/agent_router:workflow:auto`        | AUTONOMOUS  | Execute all steps without approval gates |
| `/agent_router:workflow:confirm`     | INTERACTIVE | Pause at each step for user approval     |
| `/agent_router:workflow` (no suffix) | PROMPT      | Ask user to choose mode                  |

### Mode Selection (when no suffix detected)

If no `:auto` or `:confirm` suffix is present, use AskUserQuestion:

**Question**: "How would you like to execute this workflow?"

| Option | Mode        | Description                                                             |
| ------ | ----------- | ----------------------------------------------------------------------- |
| **A**  | Autonomous  | Execute all steps without approval gates. Best for routine tasks.       |
| **B**  | Interactive | Pause at each step for approval. Best for complex or unfamiliar agents. |

**Wait for user response before proceeding.**

---

## 6. 📊 WORKFLOW OVERVIEW (7 STEPS)

| Step | Name                   | Purpose                                          |
| ---- | ---------------------- | ------------------------------------------------ |
| 1    | Locate AGENTS.md       | Find AGENTS.md at resolved system path           |
| 2    | Read & Route           | Read AGENTS.md, follow routing to Knowledge Base |
| 3    | Acknowledge Compliance | Confirm AGENTS.md compliance to user             |
| 4    | Parse Context          | Extract environment, state, constraints          |
| 5    | Process Analysis Scope | Load reference materials if provided             |
| 6    | Execute Request        | Process request per AGENTS.md guidelines         |
| 7    | Context Persistence    | Save execution context for future sessions       |

---

## 7. ⚡ INSTRUCTIONS

### Phase 1: System Resolution & Mode Detection

#### Step 1.1: Parse System Selector

1. Check if first word of `$ARGUMENTS` matches a system alias:
   - `clickup` or `cu` → ClickUp system
   - `webflow` or `wf` → Webflow system
   - `notion` → Notion system
   - `media`, `image`, `video`, `audio`, or `hls` → Media Editor system
   - `po`, `product`, `ticket`, `story`, `epic`, or `doc` → Product Owner system
   - `prompt`, `improve`, or `enhance` → Prompt Improver system

2. If system alias found:
   - Set `target_system` to matched system
   - Remove alias from request (rest becomes the actual request)
   - Set `agents_location` to: `{ai_systems_base}/{system_folder}`

#### Step 1.2: Parse Path Override

1. Check for `path:` pattern in `$ARGUMENTS`
2. If found:
   - Extract path value (everything after `path:` until next whitespace or end)
   - Set `agents_location` to extracted path
   - Set `target_system` to "custom"
   - **Path override takes precedence over system alias**

#### Step 1.3: Keyword Analysis (if no explicit system)

If no system alias or path found:

1. Analyze request keywords against registry
2. Score each system by keyword matches
3. If single system scores significantly higher → Auto-select, notify user
4. If multiple systems tie or close → Present system selection menu
5. If no matches → Present full system selection menu

#### Step 1.4: Mode Detection

1. Check for `:auto` or `:confirm` suffix
2. If suffix found → Set mode accordingly
3. If no suffix → Ask user to select mode

#### Step 1.5: Transform Inputs

Parse remaining arguments into structured fields:

| Field             | Source                          | Default               |
| ----------------- | ------------------------------- | --------------------- |
| `agents_location` | Resolved from system or path    | Search order fallback |
| `context`         | "context:" or "using:" patterns | Infer from request    |
| `request`         | Primary task description        | REQUIRED              |
| `analysis_scope`  | "scope:" or "files:" patterns   | AGENTS.md + KB only   |

#### Step 1.6: Load & Execute Workflow Prompt

Based on detected/selected mode:
- **AUTONOMOUS**: Load `.opencode/command/agent_router/assets/route_auto.yaml`
- **INTERACTIVE**: Load `.opencode/command/agent_router/assets/route_confirm.yaml`

Pass resolved `agents_location` to YAML workflow.

### Phase 2: Workflow Execution

Execute the 7-step workflow defined in the YAML prompt. See YAML files for detailed step-by-step instructions.

---

## 8. 🔧 FAILURE RECOVERY

| Failure Type                  | Recovery Action                           |
| ----------------------------- | ----------------------------------------- |
| System alias not recognized   | Present system selection menu             |
| Path not found                | STOP with error, suggest valid paths      |
| AGENTS.md not found at path   | STOP with error, show path tried          |
| Request empty                 | Prompt user for request description       |
| Keyword analysis inconclusive | Present system selection menu             |
| Routing fails                 | Continue with AGENTS.md only, log warning |

---

## 9. ⚠️ ERROR HANDLING

| Condition            | Action                                              |
| -------------------- | --------------------------------------------------- |
| Empty `$ARGUMENTS`   | Prompt: "What request would you like to route?"     |
| Invalid system alias | Show valid aliases, present menu                    |
| Invalid path format  | Show correct format: `path: /absolute/path`         |
| AGENTS.md missing    | `STATUS=FAIL ERROR="AGENTS.md not found at {path}"` |

---

## 10. 💡 EXAMPLES

### Direct System Selection

```bash
# ClickUp task creation
/agent_router:workflow clickup "Create a bug fix task for login timeout"

# Webflow CMS work (using alias)
/agent_router:workflow wf "Add author field to blog collection"

# Product Owner story (using shortcut)
/agent_router:workflow story "User authentication with SSO"

# Media processing
/agent_router:workflow image "Resize hero images to 1920x1080"
```

### Keyword-Based Auto-Detection

```bash
# Detects Webflow from "collection" keyword
/agent_router:workflow "Create a new CMS collection for team members"

# Detects ClickUp from "task" keyword
/agent_router:workflow "Create a task for the API integration work"

# Detects Product Owner from "epic" keyword
/agent_router:workflow "Write an epic for the authentication system"
```

### Custom Path

```bash
# Use custom agent not in registry
/agent_router:workflow path: ./my-custom-agent "Process this request"

# Override system with custom path
/agent_router:workflow clickup path: ./custom-clickup "Use custom ClickUp agent"
```

### With Mode Selection

```bash
# Autonomous mode (no approvals)
/agent_router:workflow:auto webflow "Update all collection fields"

# Interactive mode (step-by-step approval)
/agent_router:workflow:confirm notion "Restructure database schema"

# Prompt for mode selection
/agent_router:workflow media "Convert videos to HLS"
```

### With Context

```bash
/agent_router:workflow po "Create ticket for payment bug" context: Using Stripe, affecting checkout
```

---

## 11. 📊 COMPLETION REPORT

After workflow completion, report:

```
Agent Router Complete

System: {target_system}
AGENTS.md: {agents_md_path}
Mode: {AUTONOMOUS|INTERACTIVE}
Request: {request_summary}

Routing:
- Knowledge Base: {documents_read}
- Output: {output_location}

STATUS=OK
```

---

## 12. 📌 NOTES

- **System Priority**: Explicit alias > path: override > keyword detection > user selection
- **Path Format**: Use absolute paths or relative to current workspace
- **Mode Behaviors**:
  - **Autonomous (`:auto`)**: Self-validates, makes informed decisions, documents all choices
  - **Interactive (`:confirm`)**: Pauses after each step, presents Approve/Review/Modify/Abort options
- **Identity Lock**: Agent identity locked to resolved AGENTS.md for entire conversation
- **Scope Restriction**: File operations restricted to agent folder unless AGENTS.md permits otherwise