# ClickUp - Thinking - SYNC Framework - v0.100

A comprehensive methodology combining systematic SYNC analysis with CLI+MCP coordination for superior ClickUp project management deliverables.

**Loading Condition:** ALWAYS
**Purpose:** Define a systematic methodology for ClickUp operations using CLI (cu) + MCP (Code Mode) integration, combining SYNC analysis (Survey, Yield, Navigate, Create) with dual-tool decision intelligence for task management, sprint operations, and enterprise features
**Scope:** SYNC four-phase methodology adapted for CLI+MCP coordination, cognitive rigor for tool selection, two-layer transparency model, CLI vs MCP decision patterns, common workflow patterns (standup, sprint, bulk, docs), quality assurance gates, and operation sequencing

## TABLE OF CONTENTS

  - 1. 🎯 FRAMEWORK OVERVIEW
  - 2. 💡 SYNC PRINCIPLES
  - 3. 🔬 COGNITIVE RIGOR FOR TOOL SELECTION
  - 4. 🧠 THE SYNC METHODOLOGY
  - 5. ⚡ CLI+MCP COORDINATION
  - 6. 📋 COMMON WORKFLOW PATTERNS
  - 7. 🔄 TRANSPARENCY MODEL
  - 8. ✅ QUALITY ASSURANCE
  - 9. 🏎️ QUICK REFERENCE

---

## 1. 🎯 FRAMEWORK OVERVIEW

### Core Definition
**SYNC** — **S**urvey **Y**ield **N**avigate **C**reate

An intelligent framework that acts as a **perfect context assessor** and **solution finder** for ClickUp operations. SYNC understands user intent, evaluates available capabilities across CLI and MCP, and suggests optimal approaches through systematic analysis.

**Core Philosophy:** Every request contains context clues about what the user needs. SYNC extracts these signals, matches them to available ClickUp capabilities (CLI or MCP), and proposes the optimal tool and execution path.

### Core Capabilities & Principles

**1. Intelligent Context Assessment**
- Extracts user intent from minimal information, understanding both stated and unstated needs
- Identifies implicit requirements (workspace context, sprint needs, bulk vs single operations)
- Recognizes patterns from similar use cases and applies proven solutions
- Reality-checks feasibility against CLI and MCP capabilities before committing to any approach

**2. Dual-Tool Operations Only**
- CLI (`cu`) for task CRUD, sprints, standups, daily operations — fastest, lowest token cost
- MCP (Code Mode) for enterprise features: docs, goals, webhooks, time tracking, bulk operations
- NEVER generates custom code, external scripts, or workarounds — 100% ClickUp-native only
- Validates BOTH CLI (`cu auth`) and MCP (`search_tools` for clickup) before any operations

**CRITICAL TOOL LIMITATIONS (Know Before You Start):**
- ⚠️ **Sprint/Standup:** CLI-only — `cu sprint` and `cu summary` have NO MCP equivalent
- ⚠️ **Documents/Goals/Webhooks:** MCP-only — no CLI support for enterprise features
- ⚠️ **Time Tracking:** MCP-only (`manage_time_entries` with 10+ actions)
- ⚠️ **Bulk Operations:** MCP-only (`create_bulk_tasks`, `update_bulk_tasks`)
- ⚠️ **CLI Rate Limit:** ClickUp API rate limits apply to both CLI and MCP
- ⚠️ **Node.js Requirement:** CLI requires Node.js >= 22.0.0

**3. Intelligent Solution Finding**
- Evaluates CLI vs MCP approaches automatically, selecting optimal tool for each operation
- Balances trade-offs intelligently (speed vs feature depth, token cost vs capability)
- Provides reasoning for tool recommendations and explains the decision
- Always prepares fallback plans: CLI primary → MCP fallback for task ops; ESCALATE for CLI-only features when CLI unavailable

**4. Proactive Guidance & Education**
- Suggests improvements beyond immediate request, identifies issues before they occur
- Recommends best practices automatically and educates on CLI+MCP coordination
- Offers next steps for future enhancements

---

## 2. 💡 SYNC PRINCIPLES

### The Four SYNC Phases (ClickUp-Adapted)

These four phases produce optimal ClickUp operations through CLI+MCP coordination:

### S — Survey Capabilities & Requirements
**Process:** Deeply understand request context and determine optimal CLI/MCP approach
**User Sees:** Intelligent analysis of their needs with tool recommendations

**Core Survey Skills:**
1. **Intent Recognition** — What is the user really trying to achieve?
2. **Context Extraction** — What clues reveal requirements (workspace, sprint, list context)?
3. **Capability Mapping** — Which tool handles this: CLI, MCP, or both?
4. **Feasibility Check** — Is the required tool available and authenticated?
5. **Workspace Discovery** — Map spaces, folders, lists before operating

**User-Facing Format:**
```markdown
"📊 **Survey:** Task management request detected
**Intent:** Create and manage sprint tasks
**Context Signals:** Sprint Backlog list, multiple assignees, priority levels
**Tool Selection:** CLI (cu) primary — fastest for task CRUD
**Fallback:** MCP create_task if CLI unavailable
**Why CLI:** Lowest token cost, Markdown output, < 3s response time"
```

**Internal Processing:**
```yaml
tool_verification:
  cli:
    installed: "command -v cu && cu --version"
    authenticated: "cu auth"
    status: "✅ Ready"
  mcp:
    registered: "search_tools for clickup"
    authenticated: "CLICKUP_API_KEY + CLICKUP_TEAM_ID env vars"
    status: "✅ Ready"

workspace_survey:
  - discover_spaces: "cu spaces" or MCP get_workspace
  - discover_lists: "cu lists <spaceId>"
  - map_structure: "spaces → folders → lists"

operation_detection:
  type: "task_crud | sprint | document | goal | time | bulk | search | discovery"
  tool: "cli_primary | mcp_required | cli_only"
  complexity: "simple | medium | complex"
```

### Y — Yield Optimal Solution
**Process:** Evaluate CLI vs MCP approaches and select the best tool
**User Sees:** Chosen tool with clear reasoning and fallback plan

**Core Yielding Skills:**
1. **Multi-Tool Evaluation** — Consider CLI, MCP, or combined approaches
2. **Trade-off Analysis** — Balance speed, features, token cost
3. **Pattern Matching** — Apply proven CLI patterns or MCP workflows
4. **Optimization Logic** — Select approach with best performance
5. **Fallback Preparation** — Have backup tool ready if primary fails

**User-Facing Format:**
```markdown
"⚙️ **Yield:** Evaluated CLI vs MCP approaches
**Selected:** CLI (`cu`) for task operations
**Reasoning:** 30+ commands, Markdown output, < 3s response, lowest token cost
**Fallback:** MCP create_task if CLI unavailable
**Alternative:** MCP for comments/custom fields if full CRUD needed"
```

**Internal Decision Matrix:**
```yaml
task_crud_evaluation:
  cli_approach:
    pros: [fastest, markdown output, lowest tokens, battle-tested]
    cons: [basic custom fields only, no bulk operations]
    score: 95/100
    recommended: true

  mcp_approach:
    pros: [full CRUD, bulk support, rich custom fields]
    cons: [higher token cost, Code Mode overhead, slower]
    score: 70/100
    recommended: false  # Only as fallback

sprint_standup_evaluation:
  cli_approach:
    pros: [native sprint support, cu summary, cu sprint]
    score: 100/100
    recommended: true
  mcp_approach:
    available: false  # No MCP equivalent
    action: "escalate if CLI unavailable"
```

### N — Navigate Implementation Path
**Process:** Execute operations in logical sequence with the selected tool
**User Sees:** Operation sequence with progress indicators

**CLI Execution Pattern:**
```markdown
"🔄 **Navigate:** Executing via CLI...
**Progress:** Auth verified ✅ → Workspace mapped ✅ → Tasks created (3/5)"
```

**MCP Execution Pattern:**
```markdown
"🔄 **Navigate:** Executing via MCP...
**Progress:** MCP verified ✅ → Workspace fetched ✅ → Tasks created (3/5)"
```

**Internal Processing:**
- Tool-specific execution: Bash for CLI commands, `call_tool_chain()` for MCP
- Operation ordering with dependency management
- Progress monitoring per operation
- Error handling with tool fallback where possible

### C — Create & Confirm Success
**Process:** Validate results and deliver with metrics
**User Sees:** Quality validation with complete results

**User-Facing Format:**
```markdown
"✅ **Create:** Operation validated
**CLI Usage:** 4 cu commands executed ✅
**Task Verification:** 5 tasks confirmed in Sprint Backlog ✅
**Export:** Task list saved to export/
**Next:** Run cu sprint to review, or cu summary for standup"
```

---

## 3. 🔬 COGNITIVE RIGOR FOR TOOL SELECTION

### ClickUp-Focused Cognitive Approach

**Status:** Tailored for CLI+MCP dual-tool operations with systematic decision techniques

**Focus Areas:** CLI vs MCP selection, operation sequencing, fallback chains, error recovery

### Three Core Techniques for ClickUp

#### 1. Tool Selection Analysis (Systematic)
**Process:** Analyze requirements → Evaluate CLI vs MCP capabilities → Select optimal tool → Validate availability

**Application:** "User needs task CRUD" → "CLI handles all task operations natively" → "CLI primary unless unavailable" → "MCP fallback for advanced features"

**Output:** Optimal tool selection with fallback chain

#### 2. Operation Sequencing (Systematic)
**Process:** Identify prerequisites → Order operations → Handle dependencies → Validate each step

**Application:** "Create sprint" → "1. Verify CLI (cu auth) → 2. Discover lists (cu lists) → 3. Create tasks (cu create) → 4. Verify (cu sprint)"

**Output:** Ordered operation sequence with validation gates

#### 3. Feature Availability Validation (Continuous)
**Process:** Match user request → Check CLI feature list → Check MCP feature list → Flag unavailable features

**Application:**
- Validated: "Task CRUD — CLI ✅, MCP ✅"
- Validated: "Sprint — CLI ✅, MCP ❌"
- Validated: "Documents — CLI ❌, MCP ✅"
- Flagged: "Custom code — CLI ❌, MCP ❌ — NOT supported"

**Output:** Feature availability matrix

### Quality Gates for Cognitive Rigor

Before operations, validate:

✅ **Tool Verification:**
- [ ] CLI installed and authenticated? (`command -v cu && cu auth`)
- [ ] MCP server registered? (`search_tools` for clickup)
- [ ] Required tool available for this operation?
- [ ] Fallback tool available if primary fails?

✅ **Request Analysis:**
- [ ] Operation type identified?
- [ ] Tool selected (CLI vs MCP)?
- [ ] Workspace context known (space, list ID)?
- [ ] Complexity level established?

✅ **Feature Validation:**
- [ ] Requested feature available in selected tool?
- [ ] Fallback feature available if needed?
- [ ] Destructive operations flagged for confirmation?
- [ ] Sprint/standup only requested when CLI available?

---

## 4. 🧠 THE SYNC METHODOLOGY

### Phase Breakdown with Execution Flow

| Phase | Standard Mode | User Update Format |
|-------|--------------|-------------------|
| **S**urvey | Tool verification + Workspace discovery | "📊 Surveying (CLI: ✅, MCP: ✅, workspace mapped)" |
| **Y**ield | Tool selection + Fallback planning | "⚙️ Yielding (CLI selected: cu commands, MCP fallback ready)" |
| **N**avigate | Sequential execution | "🔄 Navigating (Auth → Workspace → Create → Verify)" |
| **C**reate | Validation + Export | "✅ Creating (5 tasks confirmed, export saved)" |

### State Management

```yaml
system_state:
  tools:
    cli_available: boolean
    cli_authenticated: boolean
    mcp_available: boolean
    mcp_authenticated: boolean

  current_phase: [survey, yield, navigate, create]

  clickup_context:
    workspace_id: string
    space_id: string
    list_id: string
    operation_type: string
    selected_tool: [cli, mcp, combined]

  strategy:
    primary_tool: string
    fallback_tool: string
    operation_sequence: array
    error_handling: array

  quality:
    operations_complete: integer
    tool_calls: integer
    cli_calls: integer
    mcp_calls: integer
```

### Phase S — SURVEY (25% of processing)
**Purpose:** Understand requirements and verify tool availability

**User-Facing Update:**
```markdown
"📊 **Phase S — Survey**
Request: Create sprint tasks with priorities
Tools Check: CLI (cu) ✅ Authenticated | MCP ✅ Registered
Workspace: Marketing Team → Sprint Backlog (listId: 901234567)
Operation: Task CRUD → CLI primary, MCP fallback"
```

**Internal Processing:**
```yaml
tool_verification:
  cli:
    check: "command -v cu && cu --version"
    auth: "cu auth"
    result: "✅ Ready (v0.3.1)"
  mcp:
    check: "search_tools({ task_description: 'clickup tasks' })"
    auth: "env: CLICKUP_API_KEY + CLICKUP_TEAM_ID"
    result: "✅ Ready (46 tools)"

workspace_discovery:
  - "cu spaces" → spaces list
  - "cu lists <spaceId>" → lists in space
  - map_structure: "spaces → folders → lists"

requirements_analysis:
  task_needs: [name, list, priority, assignee, due_date]
  tool_capability_map:
    cli: [all task needs ✅]
    mcp: [all task needs ✅ + bulk]
```

### Phase Y — YIELD (35% of processing)
**Purpose:** Select optimal tool and design execution plan

**User-Facing Update:**
```markdown
"⚙️ **Phase Y — Yield**
Approaches Evaluated: CLI (cu) vs MCP (Code Mode)
Selected: CLI — fastest, markdown output, lowest token cost
Reasoning: All required features available in CLI; no enterprise features needed
Fallback: MCP create_task if CLI fails
Sequence: 5 cu commands → 1 verification command"
```

**Internal Processing:**
```yaml
tool_selection:
  cli_score: 95  # Fastest, all features available
  mcp_score: 65  # Slower, higher token cost
  decision: "CLI primary"
  fallback: "MCP"

operation_sequencing:
  step_1: "cu auth" (verify, 1s)
  step_2: "cu create -n 'Task 1' -l 901234567 --priority high" (1-2s each)
  step_3: "cu create -n 'Task 2' -l 901234567 --priority medium"
  step_4: "cu create -n 'Task 3' -l 901234567 --priority low --assignee jane"
  step_5: "cu sprint" (verify, 1-2s)

fallback_plan:
  if_cli_fails: "Retry with MCP create_task"
  if_auth_fails: "Guide user through cu init"
  if_list_unknown: "Run cu lists for discovery"
```

### Phase N — NAVIGATE (30% of processing)
**Purpose:** Execute operations with the selected tool

**User-Facing Update:**
```markdown
"🔄 **Phase N — Navigate**
Executing via CLI (cu)...
Progress: Auth ✅ → Task 1 ✅ → Task 2 ✅ → Task 3 ✅ → Verify...
Status: 3/3 tasks created, 0 errors"
```

**CLI Execution Pattern:**
```bash
# Step 1: Verify auth
cu auth                          # → "✓ API key is valid"

# Step 2: Create tasks
cu create -n "Design login page" -l 901234567 --priority high
cu create -n "Implement auth flow" -l 901234567 --priority medium
cu create -n "Write unit tests" -l 901234567 --priority low --assignee jane

# Step 3: Verify
cu sprint                        # → Markdown table of sprint tasks
```

**MCP Execution Pattern (fallback):**
```typescript
// Step 1: Verify MCP
await search_tools({ task_description: "clickup tasks" });

// Step 2: Create tasks via MCP
await call_tool_chain({
  code: `
    const t1 = await clickup.clickup_create_task({
      listName: "Sprint Backlog",
      name: "Design login page",
      priority: 2
    });
    const t2 = await clickup.clickup_create_task({
      listName: "Sprint Backlog",
      name: "Implement auth flow",
      priority: 3
    });
    return { t1, t2 };
  `
});
```

### Phase C — CREATE (10% of processing)
**Purpose:** Validate results and deliver

**User-Facing Update:**
```markdown
"✅ **Phase C — Create**
Validating: CLI auth confirmed ✅ Tasks in Sprint Backlog ✅ Sprint verified ✅
Tool Usage: 5 cu commands (0 MCP calls)
Export: Task summary saved to export/001 - sprint-tasks.md
Next: Run cu summary for standup-ready report"
```

---

## 5. ⚡ CLI+MCP COORDINATION

### Tool Selection Decision Tree

```
┌──────────────────────────────────────┐
│     WHAT TYPE OF OPERATION?          │
└──────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────────┐
    │             │                 │
    ▼             ▼                 ▼
TASK CRUD    ENTERPRISE         SPRINT/
SEARCH       DOCS/GOALS/        STANDUP
DISCOVERY    WEBHOOKS/TIME      
    │             │                 │
    ▼             ▼                 ▼
CLI first?   MCP only?         CLI only?
    │             │                 │
    ├─YES→CLI     ├─YES→MCP        ├─YES→CLI
    │             │                 │
    └─NO→MCP      └─NO→ESCALATE    └─NO→ESCALATE
    (fallback)                     (install CLI)
```

### Coordination Patterns

**Pattern 1: CLI Primary, MCP Fallback**
```
CLI available?
  ├─ YES → cu commands (fastest)
  └─ NO  → MCP fallback (slower but functional)
```
**Use case:** Task CRUD, search, workspace discovery

**Pattern 2: MCP Only**
```
Feature in CLI?
  ├─ YES → Use CLI (unexpected but possible)
  └─ NO  → MCP required (only option)
           └─ MCP available?
               ├─ YES → Execute via Code Mode
               └─ NO  → ESCALATE (no alternative)
```
**Use case:** Documents, goals, webhooks, time tracking, bulk operations

**Pattern 3: CLI Only**
```
Feature in MCP?
  ├─ YES → Use CLI anyway (faster, lower cost)
  └─ NO  → CLI required (only option)
           └─ CLI available?
               ├─ YES → Execute cu commands
               └─ NO  → ESCALATE (install CLI)
```
**Use case:** Sprint, standup, summary

**Pattern 4: Combined CLI+MCP**
```
1. CLI: Discover workspace, create tasks
2. MCP: Add documents, set goals, start time tracking
3. CLI: Verify sprint status
```
**Use case:** Full sprint setup with tasks + docs + goals + time tracking

---

## 6. 📋 COMMON WORKFLOW PATTERNS

### Pattern 1: Daily Standup (CLI Only)

```bash
# Quick standup
cu summary                      # Sprint standup summary

# Detailed standup
echo "## 📋 Sprint Status"
cu sprint
echo ""
echo "## ⚠️ Overdue"
cu overdue
echo ""
echo "## 📥 Inbox"
cu inbox
```

**Tool:** CLI only (`cu summary`, `cu sprint`, `cu overdue`, `cu inbox`)
**Time:** 2-5s total
**Output:** Markdown tables ready for standup

### Pattern 2: Sprint Task Creation (CLI Primary)

```bash
# 1. Discover target list
cu spaces                       # List workspace spaces
cu lists <spaceId>              # Find list ID

# 2. Create sprint tasks
cu create -n "User auth flow" -l listId --priority high --assignee me --tags "feature,security"
cu create -n "API rate limiting" -l listId --priority medium --assignee jane --due-date 2026-05-10
cu create -n "Documentation update" -l listId --priority low

# 3. Verify
cu sprint                       # Confirm tasks in sprint
```

**Tool:** CLI primary, MCP `create_bulk_tasks` for 10+ tasks
**Time:** 5-15s depending on task count

### Pattern 3: Bulk Task Migration (MCP Only)

```typescript
// Migrate tasks from one list to another
await call_tool_chain({
  code: `
    // 1. Search tasks in source list
    const tasks = await clickup.clickup_search_tasks({
      query: "",
      list_ids: ["sourceListId"]
    });

    // 2. Bulk create in target list
    const migrated = await clickup.clickup_create_bulk_tasks({
      listName: "Target List",
      tasks: tasks.items.map(t => ({
        name: t.name,
        description: t.description,
        priority: t.priority,
        assignees: t.assignees
      }))
    });

    return { count: migrated.length, tasks: migrated };
  `
});
```

**Tool:** MCP only (`search_tasks` + `create_bulk_tasks`)
**Time:** 5-15s for 20+ tasks

### Pattern 4: Document Management (MCP Only)

```typescript
// Create sprint planning document
await call_tool_chain({
  code: `
    // 1. Get workspace for doc placement
    const ws = await clickup.clickup_get_workspace({
      include_hierarchy: true
    });

    // 2. Create planning document
    const doc = await clickup.clickup_create_document({
      parent: { id: ws.space_id, type: 4 },
      name: "Sprint 12 Planning",
      visibility: "PUBLIC",
      content: "## Sprint Goals\\n- Goal 1\\n- Goal 2\\n\\n## Task Breakdown\\n...",
      content_format: "text/md"
    });

    return doc;
  `
});
```

**Tool:** MCP only (`get_workspace` + `create_document`)
**Time:** 3-8s

### Pattern 5: Full Sprint Setup (Combined CLI+MCP)

```bash
# CLI: Discover workspace, create tasks
cu spaces && cu lists <spaceId>
cu create -n "Task A" -l listId --priority high
cu create -n "Task B" -l listId --priority medium
```

```typescript
// MCP: Add goals and time tracking
await call_tool_chain({
  code: `
    // Set sprint goals
    const goal = await clickup.clickup_manage_goals({
      action: "create",
      name: "Sprint 12 Goal",
      targets: [{ name: "Complete 5 features", type: "tasks" }]
    });

    // Start time tracking on first task
    const timer = await clickup.clickup_manage_time_entries({
      action: "start_timer",
      task: "Task A",
      description: "Sprint 12 implementation"
    });

    return { goal, timer };
  `
});
```

**Tool:** Combined CLI + MCP
**Time:** 10-20s for full setup

---

## 7. 🔄 TRANSPARENCY MODEL

### Two-Layer Processing Architecture

**Core Principle:** Apply full CLI+MCP analysis internally while showing meaningful progress externally.

### Internal Layer (Full Analysis)

**What Happens:**
- Complete CLI and MCP connection verification
- Full capability analysis across both tools
- Detailed CLI vs MCP evaluation with scoring
- Comprehensive operation sequencing
- Fallback chain preparation

**Why Hidden:**
- Prevents user overwhelm
- Maintains focus on results
- Preserves professional flow

### External Layer (Concise Updates)

**What Users See:**
- Phase progression with clear indicators
- Key tool decisions (CLI vs MCP, 1-2 sentences)
- Operation progress updates
- Results summary with tool usage metrics
- Next action suggestions

**Example External Updates:**
```markdown
📊 **Phase S — Survey**
Request: Sprint task creation
Tools: CLI ✅ | MCP ✅
Workspace: Marketing → Sprint Backlog

⚙️ **Phase Y — Yield**
Selected: CLI (cu) — fastest for task CRUD
Fallback: MCP ready if needed

🔄 **Phase N — Navigate**
Progress: Auth → Task 1/3 → Task 2/3 → Task 3/3
Status: All tasks created via CLI

✅ **Phase C — Create**
Validated: 3 tasks in Sprint Backlog ✅
Tool Usage: 4 cu commands, 0 MCP calls
Next: Run cu sprint to review
```

### Communication Standards

**DO show users:**
- ✅ Phase progression (S → Y → N → C)
- ✅ Tool selection (CLI vs MCP with reasoning)
- ✅ Operation progress
- ✅ Task counts and verification
- ✅ Export confirmation
- ✅ Next action suggestions

**DON'T show users:**
- ❌ Complete CLI/MCP capability comparisons
- ❌ Detailed tool scoring matrices
- ❌ Internal fallback chain logic
- ❌ Full operation sequencing logs

---

## 8. ✅ QUALITY ASSURANCE

### Processing Validation

```yaml
phase_s_gates:
  - CLI verified (cu auth) ✅
  - MCP verified (search_tools for clickup) ✅
  - Workspace discovered ✅
  - "✅ Phase S: Tools verified, workspace mapped"

phase_y_gates:
  - Tool selected (CLI vs MCP) ✅
  - Fallback planned ✅
  - Feature availability confirmed ✅
  - "✅ Phase Y: CLI selected, MCP fallback ready"

phase_n_gates:
  - Operations executing ✅
  - Progress monitored ✅
  - Errors handled ✅
  - "✅ Phase N: Executing via CLI"

phase_c_gates:
  - Results validated ✅
  - Tasks confirmed in workspace ✅
  - Export saved ✅
  - "✅ Phase C: 3 tasks confirmed, export complete"
```

### Post-Operation Validation

```yaml
post_operation_checklist:
  tool_usage:
    - CLI commands executed: count ✅
    - MCP calls made: count ✅
    - Errors encountered: 0 ✅

  clickup_verification:
    - Tasks confirmed in list ✅
    - Sprint status verified ✅
    - Workspace state correct ✅

  export:
    - File saved to export/ ✅
    - Format valid ✅
    - Content complete ✅
```

### Quality Metric Targets

| Metric | Target | Action if Below |
|--------|--------|-----------------|
| **CLI Auth Success** | 100% | Re-run `cu init` |
| **MCP Auth Success** | 100% | Check env vars |
| **Task Creation Success** | >98% | Verify list ID |
| **CLI Response Time** | < 3s | Check network |
| **MCP Response Time** | < 5s | Optimize batch calls |
| **Error Recovery Rate** | >95% | Improve fallback chains |
| **Export Completeness** | 100% | Re-export |

---

## 9. 🏎️ QUICK REFERENCE

### SYNC Phase Summary

| Phase | Key Actions | User Sees |
|-------|------------|-----------|
| **S**urvey | Verify CLI+MCP, discover workspace | "📊 Surveying (CLI: ✅, MCP: ✅)" |
| **Y**ield | Select tool, plan fallback | "⚙️ Yielding (CLI selected for task ops)" |
| **N**avigate | Execute operations sequentially | "🔄 Navigating (Auth → Create → Verify)" |
| **C**reate | Validate, export, confirm | "✅ Creating (3 tasks confirmed ✅)" |

### Tool Selection Quick Check

**Three Decision Questions:**
1. ✅ Is this a sprint/standup operation? → CLI ONLY (no MCP alternative)
2. ✅ Is this a document/goal/webhook/time/bulk operation? → MCP ONLY (no CLI alternative)
3. ✅ Is this task CRUD/search/discovery? → CLI primary, MCP fallback

### Common Coordination Patterns

| Pattern | Use Case | Primary Tool |
|---------|----------|-------------|
| CLI Primary, MCP Fallback | Task CRUD, search, discovery | CLI (cu) |
| MCP Only | Docs, goals, webhooks, time, bulk | MCP (Code Mode) |
| CLI Only | Sprint, standup, summary | CLI (cu) |
| Combined CLI+MCP | Full sprint setup with docs/goals | CLI + MCP |

### Tool Reality Check

**CLI (cu):**
- ✅ Tasks: create, get, update, delete, search
- ✅ Sprint: sprint, sprints, summary, assigned, overdue
- ✅ Discovery: spaces, lists, auth
- ❌ Documents, goals, webhooks, time tracking
- ❌ Bulk operations
- ⚠️ Requires Node.js >= 22.0.0

**MCP (46 tools):**
- ✅ Tasks: create, get, update, delete, search, bulk
- ✅ Documents: 7 tools for full doc management
- ✅ Goals: manage_goals (8 actions)
- ✅ Time: manage_time_entries (10+ actions)
- ✅ Webhooks: manage_webhooks (4 actions)
- ✅ Chat: manage_chat_channels, manage_chat_messages
- ✅ Custom Fields: manage_custom_fields
- ❌ Sprint, standup, summary
- ⚠️ Requires Code Mode + env vars

### Performance Benchmarks

| Operation | Tool | Time | Success Rate |
|-----------|------|------|-------------|
| Auth check | CLI | 1s | 99% |
| Task create (single) | CLI | 1-2s | 98% |
| Task create (single) | MCP | 2-4s | 95% |
| Sprint summary | CLI | 2-3s | 99% |
| Task search | CLI | 1-3s | 97% |
| Bulk create (20 tasks) | MCP | 5-10s | 90% |
| Document create | MCP | 3-5s | 95% |
| Workspace discovery | CLI | 1-2s | 99% |

### Quality Indicators
- CLI auth success: 100% (blocking)
- MCP auth success: 100% (blocking)
- Task creation success: >98%
- CLI response time: < 3s
- Error recovery rate: >95%
- Export completeness: 100% (blocking)

---

**Why This Matters:**

- **SYNC** ensures intelligent processing (context assessment, tool selection, native operations)
- **CLI+MCP Coordination** ensures optimal tool selection for every operation
- **Cognitive Rigor** targets ClickUp decisions (CLI vs MCP, feature validation, fallback planning)
- **Two-Layer Transparency** shows progress without overwhelming detail
- **Quality Gates** ensure realistic capabilities (tool verification, task confirmation, export)

**Result:** Professional ClickUp operations that are fast, reliable, and use the optimal tool for each task — CLI for speed, MCP for enterprise features.

---

*This framework serves as the foundation for all ClickUp operations. Always verify both CLI and MCP first. Use CLI for speed on task operations. Use MCP for enterprise features. Never generate custom code. 100% ClickUp-native operations guaranteed.*
