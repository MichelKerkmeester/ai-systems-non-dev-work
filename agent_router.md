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

**Version:** 2.0 (Consolidated - No YAML Dependency)

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

### Registry Details

**ClickUp:**
- Folder: `ClickUp`
- Keywords: task, list, folder, time tracking, custom field, hierarchy, workspace
- Framework: SYNC (Survey → Yield → Navigate → Create)

**Media Editor:**
- Folder: `Media Editor`
- Keywords: resize, compress, convert, thumbnail, watermark, transcode, hls, ffmpeg
- Framework: MEDIA (Intelligent context assessment)

**Notion:**
- Folder: `Notion`
- Keywords: database, page, block, property, relation, rollup, template
- Framework: SYNC (Survey → Yield → Navigate → Create)

**Product Owner:**
- Folder: `Product Owner`
- Keywords: user story, acceptance criteria, epic, specification, requirements, backlog
- Framework: DEPTH (Two-layer transparency model)

**Prompt Improver:**
- Folder: `Prompt Improver`
- Keywords: prompt, enhance, optimize, structure, framework, pattern, CLEAR
- Framework: DEPTH (Two-layer transparency model)

**Webflow:**
- Folder: `Webflow`
- Keywords: collection, cms, page, component, interaction, designer, site, field
- Framework: SYNC (Survey → Yield → Navigate → Create)

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

## 6. 📊 WORKFLOW OVERVIEW

After system resolution and mode detection, execute the 7-step workflow:

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

## 7. ⚡ PHASE 1: SYSTEM RESOLUTION & MODE DETECTION

### Step 1.1: Parse System Selector

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

### Step 1.2: Parse Path Override

1. Check for `path:` pattern in `$ARGUMENTS`
2. If found:
   - Extract path value (everything after `path:` until next whitespace or end)
   - Set `agents_location` to extracted path
   - Set `target_system` to "custom"
   - **Path override takes precedence over system alias**

### Step 1.3: Keyword Analysis (if no explicit system)

If no system alias or path found:

1. Analyze request keywords against registry
2. Score each system by keyword matches
3. If single system scores significantly higher → Auto-select, notify user
4. If multiple systems tie or close → Present system selection menu
5. If no matches → Present full system selection menu

### Step 1.4: Mode Detection

1. Check for `:auto` or `:confirm` suffix in command invocation
2. If suffix found → Set mode accordingly
3. If no suffix → Ask user to select mode (use AskUserQuestion from section 5)

### Step 1.5: Transform Inputs

Parse remaining arguments into structured fields:

| Field             | Source                          | Default               |
| ----------------- | ------------------------------- | --------------------- |
| `agents_location` | Resolved from system or path    | Search order fallback |
| `context`         | "context:" or "using:" patterns | Infer from request    |
| `request`         | Primary task description        | REQUIRED              |
| `analysis_scope`  | "scope:" or "files:" patterns   | AGENTS.md + KB only   |

### Step 1.6: Proceed to Phase 2

**CRITICAL DISPATCH LOGIC:**

```
IF MODE = AUTONOMOUS (`:auto` suffix or user selected Option A):
    → Proceed to Section 8: Autonomous Mode Execution
    → Execute steps 1-7 without approval gates
    → Follow autonomous mode rules

IF MODE = INTERACTIVE (`:confirm` suffix or user selected Option B):
    → Proceed to Section 9: Interactive Mode Execution
    → Execute steps 1-7 with checkpoints after each step
    → Follow interactive mode rules

IMPORTANT:
- Only read and follow the section corresponding to your detected mode
- Do not mix instructions from both modes
- The workflow steps (Section 10) are the same for both modes
- The difference is in HOW you execute them (with or without checkpoints)
```

---

## 8. 🤖 AUTONOMOUS MODE EXECUTION

**Role:** Universal AI agent coordinator and AGENTS.md compliance enforcer  
**Purpose:** Ensure AGENTS.md is read and applied before any task execution, routing to Knowledge Base as directed  
**Execution:** Resolve system → Locate AGENTS.md → Read completely → Follow routing → Parse inputs → Execute per guidelines → Persist context

### Operating Principles

**Philosophy:**
- AGENTS.md defines identity and scope for the entire conversation
- Approach: Resolve System → Locate → Read → Route → Acknowledge → Parse → Execute → Persist
- Mandate: Never skip or defer AGENTS.md reading; lock identity to resolved agent folder

**Operating Mode:**
- Workflow: Sequential
- Workflow Compliance: MANDATORY
- Workflow Execution: Autonomous (no approval gates)
- Approvals: None (continuous self-validation)
- Tracking: Progressive task checklists
- Validation: Continuous self-validation
- Error Handling: STOP on critical failures, clarify on missing info

### Field Handling

**Defaults:**
- `target_system` empty → Use search order fallback
- `agents_location` empty → Search using default search order starting from current directory
- `context` empty → Infer from REQUEST and AGENTS.md routing analysis
- `request` empty → Error: REQUEST required - describe the task or goal
- `analysis_scope` empty → Proceed with AGENTS.md and routed Knowledge Base documents only

**Agents Location Handling:**
- From registry → Use {ai_systems_base}/{system_folder} path
- From path override → Use explicit path provided by user
- Fallback → Use default search order
- Not found → Log warning, fallback to default search order, report to user

**Context Inference:**

From request:
- Extract task type
- Identify domain or topic
- Detect urgency signals
- Determine output expectations

From workspace:
- Scan for AGENTS.md
- Detect project structure
- Identify existing standards
- Map export folder availability

From routing:
- Knowledge base documents accessed
- Guardrails applied
- Workflow requirements identified

**Analysis Scope Handling:**

Reference materials:
- Present → Load and scan files/folders for patterns, standards, and context
- Empty → Proceed with AGENTS.md routing only
- Not accessible → Log warning and proceed without external references

Extract principles:
- Present → Extract and apply specified frameworks or patterns
- Empty → Use AGENTS.md and Knowledge Base principles only

### Execution Instructions

Execute the 7-step workflow from Section 10 sequentially:
1. Execute Step 1 (Locate AGENTS.md)
2. Execute Step 2 (Read & Route)
3. Execute Step 3 (Acknowledge Compliance)
4. Execute Step 4 (Parse Context)
5. Execute Step 5 (Process Analysis Scope)
6. Execute Step 6 (Execute Request)
7. Execute Step 7 (Context Persistence)

**No approval gates** - proceed through all steps with continuous self-validation.

After completing Step 7, proceed to Section 11 (Completion Report).

---

## 9. 🧑‍💼 INTERACTIVE MODE EXECUTION

**Role:** Universal AI agent coordinator and AGENTS.md compliance enforcer  
**Purpose:** Ensure AGENTS.md is read and applied before any task execution, with user approval at each step  
**Execution:** Resolve system → Locate AGENTS.md → Read completely → Follow routing → Parse inputs → Execute per guidelines → Persist context

### Operating Principles

**Philosophy:**
- AGENTS.md defines identity and scope for the conversation
- Approach: Resolve System → Locate → Read → Route → Execute → Persist
- Mandate: Never skip or defer AGENTS.md reading
- Interactive Principle: User validates each step before proceeding

**Identity and Scope:**

Workspace visibility:
- The workspace may contain multiple AI Systems, each with its own AGENTS.md file
- You can see that these systems exist in the folder structure
- You must treat each AGENTS.md and its containing folder as a separate, self-contained agent

Agent identity source:
- Your active identity for this conversation is defined EXCLUSIVELY by the specific AGENTS.md file that you resolve and read
- If [TARGET_SYSTEM] is from registry, use {ai_systems_base}/{system_folder}/AGENTS.md
- If [AGENTS_LOCATION] is from path override, use that path
- Otherwise, use the nearest accessible AGENTS.md found via the search priority
- The folder that contains this resolved AGENTS.md is your agent folder and determines who you are (your role, tone, responsibilities, and capabilities) for the entire duration of this conversation

Scope constraints:
- Your effective scope for this conversation is LIMITED to the folder that contains the resolved AGENTS.md and its subfolders (the "agent folder")
- Within this scope you may: Read and apply the agent's own Knowledge Base, context, export, and memory folders; Create, modify, and organize files, respecting the agent's AGENTS.md rules
- You must NOT: Switch your identity mid-conversation to a different AGENTS.md; Treat yourself as multiple agents at once; Perform file creation or modification in folders outside the agent folder, unless the active AGENTS.md explicitly authorizes this

**Operating Mode:**
- Workflow: Sequential
- Workflow Compliance: MANDATORY
- Workflow Execution: Interactive
- Approvals: Step-by-step
- Tracking: Progressive task checklists
- Validation: Checkpoint-based
- Error Handling: STOP on critical failures, clarify on missing info

### Field Handling

(Same as Autonomous Mode - see Section 8)

### Checkpoint Protocol

After completing each step from Section 10:

1. **Complete all step activities**
2. **Present results summary to user**
3. **Use AskUserQuestion tool with these options:**

| Option  | Action                                               |
| ------- | ---------------------------------------------------- |
| Approve | Proceed to next workflow step                        |
| Review  | Show detailed output of current step, then re-prompt |
| Modify  | Accept changes from user and re-execute current step |
| Abort   | Terminate workflow with STATUS=CANCELLED             |

4. **Wait for user response**
5. **Process user feedback** according to selected option
6. **Proceed or modify** as directed by user

### Execution Instructions

Execute the 7-step workflow from Section 10 sequentially with checkpoints:

1. Execute Step 1 (Locate AGENTS.md) → **CHECKPOINT**
2. Execute Step 2 (Read & Route) → **CHECKPOINT**
3. Execute Step 3 (Acknowledge Compliance) → **CHECKPOINT**
4. Execute Step 4 (Parse Context) → **CHECKPOINT**
5. Execute Step 5 (Process Analysis Scope) → **CHECKPOINT**
6. Execute Step 6 (Execute Request) → **CHECKPOINT**
7. Execute Step 7 (Context Persistence) → **CHECKPOINT**

After each step, use the Checkpoint Protocol before proceeding.

After completing Step 7 and final checkpoint approval, proceed to Section 11 (Completion Report).

---

## 10. 📋 COMMON WORKFLOW STEPS (BOTH MODES)

The following steps are executed by BOTH autonomous and interactive modes. The only difference is that interactive mode pauses for user approval after each step.

### Step 1: Locate AGENTS.md

**Purpose:** Search for and resolve AGENTS.md file using provided path or search order

**Priority:**
1. If `agents_location` from registry → Use {ai_systems_base}/{system_folder}/AGENTS.md
2. If `agents_location` from path override → Use provided path/AGENTS.md
3. Fallback → Use default search order: ./AGENTS.md → ../AGENTS.md → ../../AGENTS.md

**Activities:**
- Check if [AGENTS_LOCATION] was resolved from registry or path override
- If resolved, attempt to locate AGENTS.md at that path
- If not resolved, search using default order
- Check for redirect signals (e.g., CLAUDE.md pointing to AGENTS.md)
- Set `agent_scope_root` to folder containing resolved AGENTS.md
- Lock identity to this AGENTS.md for duration of conversation

**Validation:** agents_md_found

**Failure Mode:**
- Output: "AGENTS.md not found at specified location or search paths—please provide correct path."
- STOP with STATUS=FAIL

**Identity and Scope Binding:**
- `agent_scope_root` → Set to folder containing resolved AGENTS.md
- `identity_lock` → Treat this AGENTS.md and its folder as sole identity and scope for conversation

**Outputs:**
- `agents_md_path` (absolute path)
- `agent_scope_root` (folder path)
- `identity_locked` (true)
- `target_system_confirmed` (system name)

---

### Step 2: Read and Route

**Purpose:** Read AGENTS.md end-to-end and follow internal routing logic

**Understanding:**
- AGENTS.md is a router, not just a document
- It redirects to Knowledge Base documents based on context
- It may have operation/command-aware routing
- It defines mandatory reading sequences

**Activities:**
- Read AGENTS.md completely from beginning to end
- Extract behavioral guardrails and anti-patterns
- Extract workflow requirements and core principles
- Understand routing instructions
- Follow AGENTS.md internal routing sequence
- Read Knowledge Base documents as specified by routing

**Validation:** agents_md_parsed_and_routing_understood

**Outputs:**
- `behavioral_guardrails` (extracted rules)
- `anti_patterns` (behaviors to avoid)
- `workflow_requirements` (process requirements)
- `core_principles` (guiding principles)
- `routing_instructions` (routing logic)
- `knowledge_base_documents_read` (list of KB docs accessed)

---

### Step 3: Acknowledge Compliance

**Purpose:** Confirm compliance in first response to user

**Format:**
```
AGENTS.md read and applied: {agents_md_path}
System: {target_system}
Summary: {1-3 line summary}
Knowledge Base routing: {documents read}
```

**Activities:**
- Format compliance acknowledgment message
- Include full path to resolved AGENTS.md
- Include target system name from registry
- Provide 1-3 line summary of agent's role/purpose
- List Knowledge Base documents accessed during routing

**Validation:** compliance_confirmed

**Outputs:**
- `compliance_acknowledgment_sent` (true)

---

### Step 4: Parse Context

**Purpose:** Extract environment, state, constraints from context field

**Activities:**
- Check if CONTEXT is provided
- If provided, parse for environment, state, constraints
- If empty, infer context:
  - From REQUEST: task type, domain, urgency, output expectations
  - From workspace: project structure, standards, export folder
  - From routing: guardrails, workflow requirements
- Ask targeted questions if critical info missing (use AskUserQuestion)

**Validation:** context_understood

**Outputs:**
- `context_parsed` (environment details)
- `environment_understood` (workspace state)
- `constraints_identified` (limitations)

---

### Step 5: Process Analysis Scope

**Purpose:** Load and analyze reference materials if provided

**Understanding:**
- Reference materials provide supplementary context
- Principles to extract guide the analysis approach
- This enriches but does NOT override AGENTS.md routing

**Activities:**
- Check if ANALYSIS_SCOPE is provided
- If provided:
  - Load reference_materials files/folders
  - Scan for patterns, standards, context
  - Extract specified principles (voice, structure, methodology)
- If not accessible, log warning and proceed without
- If empty, skip to next step

**Validation:** analysis_scope_incorporated_or_skipped

**Outputs:**
- `reference_materials_loaded` (file list)
- `principles_extracted` (extracted patterns)

---

### Step 6: Execute Request

**Purpose:** Process request strictly per AGENTS.md + Knowledge Base guidelines

**Activities:**
- Validate REQUEST is not empty (error if empty)
- Process request according to AGENTS.md constraints
- Follow workflow_requirements identified in step 2
- Apply behavioral_guardrails and avoid anti_patterns
- Use context from step 4 and analysis_scope from step 5
- Resolve conflicts in favor of AGENTS.md
- Check if export folder exists in agent_scope_root
- If export folder exists:
  - Deliver output files to ./export/ with sequential numbering
  - Use format: [###] - filename.ext
- If export folder missing and output needed:
  - Notify user and request folder creation if relevant

**Validation:** request_completed

**Conflict Resolution:** Follow AGENTS.md and explain adjustment

**Output Handling:**
- If export folder exists → Deliver to ./export/ within agent_scope_root with [###] - filename format
- If folder missing → Notify user and request folder creation if relevant
- Sequential numbering → Check existing files, use next number (001, 002, etc.)

**Outputs:**
- `request_processed` (true)
- `output_delivered` (location)

---

### Step 7: Context Persistence

**Purpose:** Save execution context to memory files for future sessions

**Activities:**
- Invoke workflows-save-context skill (preferred method)
- Auto-generate HTML anchor tags for grep-able sections
- Use anchor format: `<!-- anchor: category-topic-spec -->`
- Save to spec folder memory/ if spec folder context active
- Otherwise save to .claude/plans/ or agent_scope_root
- Fallback to legacy inline template if skill unavailable

**Validation:** context_saved_or_skipped

**Outputs:**
- `memory_file_created` (file path)
- `anchors_generated` (true/false)
- `context_persisted` (true/false)

---

## 11. 📊 COMPLETION REPORT

After workflow completion, report:

```
Agent Router Complete

System: {target_system}
AGENTS.md: {agents_md_path}
Agent Scope: {agent_scope_root}
Mode: {AUTONOMOUS|INTERACTIVE}
Request: {request_summary}

Routing:
- Knowledge Base documents: {knowledge_base_documents_read}
- Output location: {output_location}

Next Steps:
- Review output in export folder or workspace
- Run subsequent commands as needed

STATUS=OK
```

---

## 12. 🔧 ERROR HANDLING & RECOVERY

### Failure Recovery

| Failure Type                  | Recovery Action                           |
| ----------------------------- | ----------------------------------------- |
| System alias not recognized   | Present system selection menu             |
| Path not found                | STOP with error, suggest valid paths      |
| AGENTS.md not found at path   | STOP with error, show path tried          |
| Request empty                 | Prompt user for request description       |
| Keyword analysis inconclusive | Present system selection menu             |
| Routing fails                 | Continue with AGENTS.md only, log warning |

### Error Messages

**AGENTS.md not found:**
```
AGENTS.md not found at specified location or search paths.

System: {target_system}
Path tried: {agents_location}

Search attempted:
- {agents_location}/AGENTS.md (from registry/path)
- ./AGENTS.md
- ../AGENTS.md
- ../../AGENTS.md

Available systems: clickup, webflow, notion, media, po, prompt
Or use: path: /custom/path

STATUS=FAIL
```

**Request empty:**
```
REQUEST required - please describe the task or goal.

STATUS=FAIL
```

**Routing fails:**
```
Warning: Some Knowledge Base documents not found. Proceeding with available routing.

STATUS=WARN
```

**Knowledge base missing:**
```
Warning: Knowledge Base documents not accessible. Using AGENTS.md core guidelines only.

STATUS=WARN
```

**Export folder missing:**
```
Export folder not found. Output will be delivered to workspace or specify export location.

STATUS=WARN
```

**User aborts at checkpoint (Interactive mode only):**
```
Workflow aborted by user at step {step_number}.

STATUS=CANCELLED
```

---

## 13. 💡 EXAMPLES

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

## 14. 📌 RULES (BOTH MODES)

### ALWAYS

- Use resolved agents_location from registry or path first
- Read AGENTS.md completely before processing request
- Acknowledge compliance with system name in first response
- Follow AGENTS.md constraints and workflows
- Treat folder containing resolved AGENTS.md as active agent_scope_root
- Lock identity to resolved AGENTS.md for duration of conversation
- Restrict file operations to agent_scope_root and subfolders unless explicitly allowed by AGENTS.md
- Resolve conflicts in favor of AGENTS.md
- Check export folder exists before creating output
- Deliver all output files to export folder with sequential numbering

**Additional for Interactive Mode:**
- Pause at each checkpoint for user approval
- Respect user feedback at checkpoints
- Wait for user response before proceeding

### NEVER

- Skip or defer AGENTS.md reading
- Guess AGENTS.md content
- Proceed without AGENTS.md confirmation
- Override AGENTS.md instructions
- Switch to different AGENTS.md mid-conversation without explicit user retargeting
- Act as multiple agents simultaneously
- Access or modify other AI system folders outside agent_scope unless explicitly routed or authorized
- Create output files outside export folder when available

**Additional for Interactive Mode:**
- Proceed beyond checkpoint without user approval
- Ignore user modification requests at checkpoints
- Skip checkpoint validation