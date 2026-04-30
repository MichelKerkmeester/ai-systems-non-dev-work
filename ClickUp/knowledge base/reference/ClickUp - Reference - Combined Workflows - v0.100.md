# ClickUp - Reference - Combined Workflows - v0.100

Reference patterns combining ClickUp CLI (`cu`) and MCP tools for complex project management workflows, cross-tool integrations, and error recovery.

**Loading Condition:** ON-DEMAND
**Purpose:** Practical workflow reference documenting combined CLI+MCP patterns for daily standups, sprint setup, project migration, document-driven tasks, time tracking, cross-tool integrations (Figma, Git), error recovery, and decision guidance for tool selection.
**Scope:** Eight core workflow patterns (Daily Standup, Sprint Setup, Project Migration, Document-Driven Tasks, Time Tracking, Cross-Tool Integration, Error Recovery, Best Practices) with step-by-step TypeScript and Bash examples, CLI-vs-MCP decision matrices, and real-world usage patterns.

## TABLE OF CONTENTS

  - 1. 🔌 OVERVIEW
  - 2. 📋 DAILY STANDUP WORKFLOW
  - 3. 🏃 SPRINT SETUP WORKFLOW
  - 4. 📦 PROJECT MIGRATION WORKFLOW
  - 5. 📄 DOCUMENT-DRIVEN TASK WORKFLOW
  - 6. ⏱️ TIME TRACKING WORKFLOW
  - 7. 🔗 CROSS-TOOL INTEGRATION
  - 8. 🚨 ERROR RECOVERY PATTERNS
  - 9. ✅ BEST PRACTICES
  - 10. 🧭 DECISION GUIDE: CLI vs MCP
  - 11. 🏎️ QUICK REFERENCE

---

## 1. 🔌 OVERVIEW

### Purpose

Ready-to-use workflow patterns combining CLI speed and MCP enterprise capabilities for common ClickUp project management scenarios. Each pattern includes step-by-step examples with both Bash (CLI) and TypeScript (MCP) code.

### Core Principle

**Use CLI for speed on single operations; use MCP for bulk, multi-step, and enterprise workflows.**

```yaml
tool_selection_heuristic:
  cli_best_for:
    - "Single task operations (create, update, read)"
    - "Quick workspace discovery (spaces, lists)"
    - "Sprint standups and summaries"
    - "Task search and filtering"
    - "Fast status updates"
    
  mcp_best_for:
    - "Bulk task creation (5+ tasks)"
    - "Document creation and management"
    - "Time tracking (start/stop/log)"
    - "Goals and key results"
    - "Webhooks and integrations"
    - "Chat and collaboration"
    - "Enterprise admin (guests, audit logs)"
    
  combined_pattern:
    - "CLI for discovery → MCP for execution"
    - "MCP for creation → CLI for verification"
    - "CLI for quick checks during MCP workflows"
```

---

## 2. 📋 DAILY STANDUP WORKFLOW

### Quick Sprint Status (CLI-Only)

```bash
# Full standup summary - ready-made format
cu summary

# Current sprint task breakdown
cu sprint

# Overdue items needing attention
cu overdue

# Combined standup report
echo "## Standup Report - $(date +%Y-%m-%d)"
echo ""
echo "### Sprint Status"
cu sprint
echo ""
echo "### Overdue Items"
cu overdue
echo ""
echo "### My Open Tasks"
cu tasks
```

**Best approach:** CLI-only. `cu summary` provides a ready-made standup format with sprint progress, completed items, and blockers. No MCP needed for daily standup reads.

### Enhanced Standup with MCP Time Data

When time tracking data adds value to the standup:

```typescript
call_tool_chain({
  code: `
    // Get current time tracking state
    const currentTimer = await clickup.clickup_manage_time_entries({
      action: "get_current"
    });
    
    // Get recent time entries
    const entries = await clickup.clickup_manage_time_entries({
      action: "get_entries",
      task: "abc123def"
    });
    
    const totalMinutes = entries.reduce((sum, e) => {
      const match = e.duration?.match(/(\\d+)h\\s*(\\d+)m/);
      if (match) return sum + parseInt(match[1]) * 60 + parseInt(match[2]);
      return sum;
    }, 0);
    
    console.log("⏱️  Sprint time log:");
    console.log("  Total logged:", Math.round(totalMinutes / 60 * 10) / 10, "hours");
    if (currentTimer) {
      console.log("  🔴 Timer running:", currentTimer.task);
    }
    
    return { totalHours: totalMinutes / 60, currentTimer };
  `
});
```

---

## 3. 🏃 SPRINT SETUP WORKFLOW

### Full Sprint Planning Pipeline

```yaml
workflow:
  step_1:
    tool: MCP
    action: "Bulk create sprint tasks"
    code_type: typescript
    description: "Create all sprint tasks in one MCP call"
    
  step_2:
    tool: CLI
    action: "Verify sprint composition"
    code_type: bash
    description: "Use cu sprint to confirm all tasks appear"
    
  step_3:
    tool: MCP
    action: "Set dependencies between tasks"
    code_type: typescript
    description: "Create blocking relationships"
    
  step_4:
    tool: CLI
    action: "Final review in browser"
    code_type: bash
    description: "Open sprint in ClickUp web UI"
```

**Step 1: Bulk Create Sprint Tasks (MCP)**

```typescript
call_tool_chain({
  code: `
    const sprintTasks = await clickup.clickup_create_bulk_tasks({
      listName: "Sprint 12",
      tasks: [
        { name: "Design login page", priority: 2, assignees: ["designer@team.com"], tags: ["feature"] },
        { name: "Build login API endpoint", priority: 2, assignees: ["dev@team.com"], tags: ["feature", "backend"] },
        { name: "Write login integration tests", priority: 3, assignees: ["qa@team.com"], tags: ["testing"] },
        { name: "Deploy login to staging", priority: 1, assignees: ["devops@team.com"], tags: ["devops"] },
        { name: "Update API documentation", priority: 3, assignees: ["dev@team.com"], tags: ["docs"] },
        { name: "Security review for OAuth2 flow", priority: 1, assignees: ["security@team.com"], tags: ["security"] }
      ]
    });
    
    console.log("✅ Created", sprintTasks.length, "tasks for Sprint 12");
    sprintTasks.forEach((t, i) => console.log("  ", i+1+".", t.name, "-", t.id));
    return sprintTasks;
  `
});
```

**Step 2: Verify Sprint (CLI)**

```bash
# Confirm sprint composition
cu sprint

# Check specific task
cu task abc123def

# Review assignee distribution
cu tasks --json | jq -r 'group_by(.assignees[0]) | .[] | "\(.[0].assignees[0]): \(length) tasks"'
```

**Step 3: Set Dependencies (MCP)**

```typescript
call_tool_chain({
  code: `
    // Design must complete before Build starts
    await clickup.clickup_create_dependency({
      task: "build-login-api-id",
      depends_on: "design-login-id"
    });
    console.log("✅ Design → Build dependency set");
    
    // Build must complete before Testing starts
    await clickup.clickup_create_dependency({
      task: "test-login-id",
      depends_on: "build-login-api-id"
    });
    console.log("✅ Build → Test dependency set");
    
    // Security review blocks deployment
    await clickup.clickup_create_dependency({
      task: "deploy-login-id",
      depends_on: "security-review-id"
    });
    console.log("✅ Security → Deploy dependency set");
  `
});
```

**Step 4: Review in Browser (CLI)**

```bash
# Open spring board in ClickUp UI for visual review
cu open sprint12

# Or open individual tasks
cu open build-login-api-id
```

---

## 4. 📦 PROJECT MIGRATION WORKFLOW

### Migrating Tasks Between Workspaces

```yaml
workflow:
  step_1:
    tool: MCP
    action: "Map source workspace structure"
    description: "Get full hierarchy with spaces, folders, lists"
    
  step_2:
    tool: MCP
    action: "Create destination structure"
    description: "Create matching spaces, folders, lists"
    
  step_3:
    tool: MCP
    action: "Bulk create tasks in destination"
    description: "Create all tasks with assignments"
    
  step_4:
    tool: CLI
    action: "Verify migrated tasks"
    description: "Spot-check migrated tasks exist"
```

**Step 1: Map Source Structure (MCP)**

```typescript
call_tool_chain({
  code: `
    const source = await clickup.clickup_get_workspace({
      include_hierarchy: true,
      include_members: true
    });
    
    // Build structure map
    const structureMap = { spaces: [] };
    source.spaces?.forEach(space => {
      const spaceEntry = { name: space.name, folders: [], lists: [] };
      
      space.folders?.forEach(folder => {
        const folderEntry = { name: folder.name, lists: [] };
        folder.lists?.forEach(list => {
          folderEntry.lists.push({ name: list.name, id: list.id });
        });
        spaceEntry.folders.push(folderEntry);
      });
      
      space.lists?.forEach(list => {
        spaceEntry.lists.push({ name: list.name, id: list.id });
      });
      
      structureMap.spaces.push(spaceEntry);
    });
    
    console.log("📋 Mapped structure:");
    console.log(JSON.stringify(structureMap, null, 2));
    return structureMap;
  `
});
```

**Step 2: Create Destination Structure (MCP)**

```typescript
call_tool_chain({
  code: `
    // Create destination spaces
    const engineering = await clickup.clickup_manage_spaces({
      action: "create",
      name: "Engineering"
    });
    
    // Create folders and lists
    const backlogList = await clickup.clickup_manage_lists({
      action: "create",
      spaceId: engineering.id,
      name: "Backlog"
    });
    
    console.log("✅ Destination structure created");
    return { spaceId: engineering.id, listId: backlogList.id };
  `
});
```

**Step 3: Bulk Migrate Tasks (MCP)**

```typescript
call_tool_chain({
  code: `
    // Get tasks from source list
    const sourceTasks = [/* task data from source */];
    
    // Bulk create in destination
    const migrated = await clickup.clickup_create_bulk_tasks({
      listName: "Backlog",
      tasks: sourceTasks.map(t => ({
        name: t.name,
        description: t.description + "\\n\\n[Originally: " + t.id + "]",
        status: t.status,
        priority: t.priority,
        assignees: t.assignees,
        tags: t.tags
      }))
    });
    
    console.log("✅ Migrated", migrated.length, "tasks");
    return migrated;
  `
});
```

**Step 4: Verify (CLI)**

```bash
# Spot-check migrated tasks
cu lists <destinationSpaceId>
cu task <migratedTaskId>

# Search for original task references
cu search "[Originally:"
```

---

## 5. 📄 DOCUMENT-DRIVEN TASK WORKFLOW

### Architecture Decision Record → Implementation Tasks

Create a structured document, then generate implementation tasks linked to it.

**Step 1: Create Document (MCP)**

```typescript
call_tool_chain({
  code: `
    const adr = await clickup.clickup_create_document({
      parent: { id: "space_id", type: 4 },
      name: "ADR-001: Database Selection for v2.0",
      visibility: "PUBLIC",
      content_format: "text/md",
      content: [
        "## Status",
        "Proposed",
        "",
        "## Context",
        "We need to select a database for the new microservice architecture. Requirements:",
        "- Support for 10K+ concurrent connections",
        "- Horizontal scalability",
        "- ACID transaction support",
        "- Strong TypeScript/Node.js ecosystem",
        "",
        "## Decision",
        "PostgreSQL with connection pooling via PgBouncer.",
        "",
        "## Alternatives Considered",
        "- MongoDB: Good developer experience but lacked strong ACID guarantees",
        "- CockroachDB: Excellent scalability but immature Node.js ecosystem",
        "",
        "## Consequences",
        "- Positive: Mature ecosystem, strong tooling",
        "- Negative: Vertical scaling ceiling at ~500 connections",
        "- Mitigation: PgBouncer connection pooling"
      ].join("\\n")
    });
    
    console.log("📄 Created ADR:", adr.id, adr.name);
    return adr;
  `
});
```

**Step 2: Create Implementation Tasks (MCP)**

```typescript
call_tool_chain({
  code: `
    const docId = "adr_document_id";
    
    const tasks = await clickup.clickup_create_bulk_tasks({
      listName: "Sprint Backlog",
      tasks: [
        {
          name: "Set up PostgreSQL cluster",
          description: "Part of ADR-001 implementation. Deploy PostgreSQL with PgBouncer.",
          priority: 1,
          tags: ["infrastructure", "adr-001"]
        },
        {
          name: "Configure connection pooling",
          description: "ADR-001: Set up PgBouncer for connection pooling with optimal pool sizes.",
          priority: 2,
          tags: ["infrastructure", "adr-001"]
        },
        {
          name: "Write database migration scripts",
          description: "ADR-001: Create initial schema migration for v2.0 services.",
          priority: 2,
          tags: ["backend", "adr-001"]
        }
      ]
    });
    
    console.log("✅ Created", tasks.length, "implementation tasks for ADR-001");
    return tasks;
  `
});
```

**Step 3: Review in CLI**

```bash
# Check created tasks
cu search "adr-001"

# Review specific task
cu task <taskId>

# Open ADR in browser
cu open <taskId>
```

### Sprint Retrospective Document

```typescript
call_tool_chain({
  code: `
    const retro = await clickup.clickup_create_document({
      parent: { id: "space_id", type: 4 },
      name: "Sprint 12 Retrospective - 2026-04-30",
      visibility: "PUBLIC",
      content_format: "text/md",
      content: [
        "## Sprint 12 Retrospective",
        "**Dates:** April 15-30, 2026",
        "",
        "## What went well ✅",
        "- ",
        "",
        "## What to improve 🔧",
        "- ",
        "",
        "## Action items 📋",
        "- "
      ].join("\\n")
    });
    
    console.log("📄 Retrospective created:", retro.id);
    return retro;
  `
});
```

---

## 6. ⏱️ TIME TRACKING WORKFLOW

### Start → Work → Stop → Verify (MCP)

```typescript
call_tool_chain({
  code: `
    const taskId = "abc123def";
    
    // Step 1: Start timer
    await clickup.clickup_manage_time_entries({
      action: "start_timer",
      task: taskId
    });
    console.log("🔴 Timer started on task", taskId);
    
    // Step 2: Check current timer (verification)
    const current = await clickup.clickup_manage_time_entries({
      action: "get_current"
    });
    console.log("⏱️  Currently tracking:", current.task?.name || "Unknown");
    
    // Step 3: Stop timer
    await clickup.clickup_manage_time_entries({
      action: "stop_timer"
    });
    console.log("⏹️  Timer stopped");
    
    // Step 4: Verify entry exists
    const entries = await clickup.clickup_manage_time_entries({
      action: "get_entries",
      task: taskId
    });
    console.log("📊 Total time entries:", entries.length);
    
    return { taskId, entries };
  `
});
```

### Manual Time Logging

```typescript
call_tool_chain({
  code: `
    // Log a manual entry for completed work
    await clickup.clickup_manage_time_entries({
      action: "add_entry",
      task: "abc123def",
      duration: "2h 30m",
      description: "Code review and refactoring of auth module",
      billable: true,
      tags: ["code-review", "refactor"]
    });
    console.log("✅ Manual time entry logged: 2h 30m");
    
    // Add second entry
    await clickup.clickup_manage_time_entries({
      action: "add_entry",
      task: "abc123def",
      duration: "1h 15m",
      description: "Integration testing with CI pipeline",
      billable: false,
      tags: ["testing"]
    });
    console.log("✅ Manual time entry logged: 1h 15m");
  `
});
```

### CLI Verification After Time Tracking

```bash
# CLI can't track time, but can verify task was worked on
cu activity abc123def | grep -i "time"

# Check task status was updated
cu task abc123def
```

---

## 7. 🔗 CROSS-TOOL INTEGRATION

### Figma → ClickUp (Design to Implementation Tasks)

When design files are available via the Figma MCP server:

```typescript
call_tool_chain({
  code: `
    // Get Figma design file
    const file = await figma.figma_get_file({ fileKey: "abc123" });
    const components = await figma.figma_get_file_components({ fileKey: "abc123" });
    
    // Convert components to ClickUp implementation tasks
    const componentList = Object.values(components.meta.components);
    const tasks = await clickup.clickup_create_bulk_tasks({
      listName: "Implementation Queue",
      tasks: componentList.slice(0, 10).map(comp => ({
        name: "Implement: " + comp.name,
        description: "Figma component: " + comp.name + "\\nDesign file: https://figma.com/file/abc123",
        priority: 3,
        tags: ["from-figma", "ui-component"]
      }))
    });
    
    console.log("🎨 Created", tasks.length, "tasks from Figma design");
    return { 
      componentsFound: componentList.length, 
      tasksCreated: tasks.length 
    };
  `
});
```

### ClickUp → Git (Task to Feature Branch)

```bash
# Get task details and create a matching git branch
TASK_ID="abc123def"
TASK_NAME=$(cu task "$TASK_ID" --json | jq -r '.name' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g')

# Create feature branch
git checkout -b "feature/$TASK_NAME"

# Update task with branch info
cu update "$TASK_ID" --status "in progress"
cu comment "$TASK_ID" -m "Branch created: feature/$TASK_NAME. Working on implementation."

echo "✅ Branch feature/$TASK_NAME created and task updated"
```

### Git → ClickUp (PR Merged → Task Complete)

```bash
# After PR is merged, update the ClickUp task
TASK_ID="abc123def"
PR_NUMBER="42"

cu update "$TASK_ID" --status "done"
cu comment "$TASK_ID" -m "PR #$PR_NUMBER merged. Implementation complete."

echo "✅ Task $TASK_ID marked as done"
```

### ClickUp → Notion (Task to Documentation Sync)

When integrated with Notion MCP:

```typescript
call_tool_chain({
  code: `
    // Get ClickUp task for documentation
    const task = await clickup.clickup_get_task({
      task: "abc123def"
    });
    
    // Create Notion page from task data
    const page = await notion.API_post_page({
      parent: { database_id: "notion_db_id" },
      properties: {
        Name: { title: [{ text: { content: task.name } }] },
        Status: { select: { name: task.status } },
        Priority: { select: { name: task.priority > 2 ? "High" : "Normal" } }
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [{ 
              type: "text", 
              text: { content: "Synced from ClickUp task: " + task.id }
            }]
          }
        }
      ]
    });
    
    console.log("📄 Notion page created:", page.id);
    return { taskId: task.id, pageId: page.id };
  `
});
```

---

## 8. 🚨 ERROR RECOVERY PATTERNS

### Authentication Failure

```yaml
symptoms:
  - "CLI: cu auth fails with '401 Unauthorized'"
  - "MCP: Tool calls fail with authentication errors"
  
recovery:
  step_1:
    tool: CLI
    command: "cu config get apiToken"
    action: "Check if token is set"
    
  step_2:
    action: "Regenerate token at https://app.clickup.com/settings/apps"
    
  step_3:
    tool: CLI
    command: "cu config set apiToken 'pk_newtoken...'"
    action: "Update config with new token"
    
  step_4:
    tool: CLI
    command: "cu auth"
    action: "Verify new token works"
    
  step_5_mcp:
    action: "Update clickup_CLICKUP_API_KEY in Code Mode environment"
```

### Rate Limiting

```yaml
symptoms:
  - "MCP: Bulk operation fails with 429 Too Many Requests"
  - "Multiple operations return rate limit errors"
  
recovery:
  immediate:
    action: "Wait 60 seconds before retrying"
    
  bulk_operations:
    action: "Split bulk operations into smaller batches (max 10 per call)"
    example: |
      // Instead of 50 tasks in one call:
      const batch1 = tasks.slice(0, 10);
      const batch2 = tasks.slice(10, 20);
      // ... etc with 2-second delays between batches
      
  prevention:
    - "Limit concurrent MCP calls to 3 per second"
    - "Use CLI for single reads during rate-limited periods"
    - "Stagger bulk creates with Promise.all + delays"
```

### Wrong Binary (CLI)

```yaml
symptoms:
  - "cu opens Unix connection prompt instead of ClickUp CLI"
  - "which cu returns /usr/bin/cu or /usr/sbin/cu"
  
recovery:
  step_1:
    command: "which cu"
    action: "Identify which binary is being used"
    
  step_2:
    command: "export PATH=\"$(npm config get prefix)/bin:$PATH\""
    action: "Move npm global bin to front of PATH"
    
  step_3:
    command: "which cu"
    action: "Confirm it now points to npm bin"
    
  step_4:
    command: "cu --version"
    action: "Verify it shows @krodak/clickup-cli"
```

### Tool Not Available (MCP)

```yaml
symptoms:
  - "MCP tool name not found in tool list"
  - "search_tools returns fewer than 46 ClickUp tools"
  
recovery:
  step_1:
    action: "Check Code Mode configuration for ClickUp MCP server"
    
  step_2:
    action: "Verify environment variables: clickup_CLICKUP_API_KEY and clickup_CLICKUP_TEAM_ID"
    
  step_3:
    action: "Run search_tools({ task_description: 'clickup' }) to list available tools"
    
  fallback:
    action: "Use CLI for task operations if MCP is degraded"
    tools_available: ["cu create", "cu update", "cu search", "cu task", "cu sprint"]
```

### Combined Error Recovery Script

```typescript
call_tool_chain({
  code: `
    async function safeClickUpCall(toolName, params, maxRetries = 3) {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const result = await clickup["clickup_" + toolName](params);
          return { success: true, data: result, attempts: attempt };
        } catch (error) {
          console.warn("Attempt", attempt, "failed:", error.message);
          
          if (error.message.includes("auth")) {
            return { 
              success: false, 
              error: "AUTH_FAILED", 
              fix: "Regenerate token at https://app.clickup.com/settings/apps" 
            };
          }
          
          if (error.message.includes("rate") || error.message.includes("429")) {
            const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
            console.log("Rate limited. Waiting", delay/1000, "seconds...");
            await new Promise(r => setTimeout(r, delay));
            continue;
          }
          
          if (attempt === maxRetries) {
            return { success: false, error: error.message, attempts };
          }
        }
      }
    }
    
    // Usage with fallback
    const result = await safeClickUpCall("create_task", {
      listName: "Sprint Backlog",
      name: "Critical bug fix"
    });
    
    if (!result.success) {
      console.error("❌ Failed after", result.attempts, "attempts:", result.error);
      if (result.fix) console.log("🔧 Fix:", result.fix);
    } else {
      console.log("✅ Success on attempt", result.attempts);
    }
    
    return result;
  `
});
```

---

## 9. ✅ BEST PRACTICES

### Always Verify CLI First

```yaml
principle: "CLI is faster for reads — use it to verify MCP operations"
pattern:
  after_bulk_create:
    - "MCP: create_bulk_tasks → CLI: cu sprint to verify"
    - "MCP: update_task → CLI: cu task <id> to confirm"
    - "MCP: create_document → CLI: n/a (documents are MCP-only)"
```

### Use MCP for What CLI Can't Do

```yaml
principle: "Don't fight the CLI's limitations — switch to MCP"
switch_points:
  bulk_operations: "When creating 5+ tasks: switch from cu create to create_bulk_tasks"
  documents: "When creating docs: switch to MCP (CLI has no document support)"
  time_tracking: "When tracking time: switch to MCP (CLI has no timer)"
  enterprise: "When managing guests/audit: switch to MCP (Enterprise features only)"
```

### Confirm Destructive Operations

```yaml
principle: "Never silently delete or destroy — always confirm"
destructive_operations:
  delete_task:
    cli: "cu delete <id> --confirm (--confirm is REQUIRED)"
    mcp: "Confirm intent before calling delete_task"
    
  move_task:
    cli: "cu move <id> --to <listId> (reversible but verify)"
    mcp: "Log source and destination before move_task"
    
  remove_from_list:
    cli: "cu move <id> --remove <listId> (task must remain in at least one list)"
    mcp: "Check task is in multiple lists before remove_task_from_list"
```

### Batch Wisely

```yaml
principle: "Batch in groups of 10 for optimal MCP performance"
guidelines:
  bulk_create: "10 tasks per call with 2-second delays between batches"
  bulk_update: "10 tasks per call with 2-second delays between batches"
  rate_limits: "Maximum 3 MCP calls per second"
  large_migrations: "Split into batches of 10, track progress between batches"
```

### Combine CLI Speed with MCP Power

```yaml
recommended_patterns:
  sprint_planning:
    - "CLI: cu sprint (see current state)"
    - "MCP: create_bulk_tasks (add new tasks)"
    - "CLI: cu sprint (verify)"
    - "MCP: create_dependency (wire up blockers)"
    
  task_research:
    - "CLI: cu search 'topic' (fast discovery)"
    - "CLI: cu task <id> (quick details)"
    - "MCP: manage_comments (full comment thread)"
    - "MCP: manage_attachments (check files)"
    
  workspace_setup:
    - "CLI: cu spaces (map current structure)"
    - "MCP: get_workspace (full hierarchy with members)"
    - "MCP: manage_spaces, manage_folders, manage_lists (create structure)"
    - "CLI: cu lists <spaceId> (verify)"
```

---

## 10. 🧭 DECISION GUIDE: CLI vs MCP

### Scenario Matrix

| Scenario | Use | Why |
|----------|-----|-----|
| Create a single task | **CLI** | `cu create` is fastest — one command |
| Create 5+ tasks | **MCP** | `create_bulk_tasks` in one API call |
| Sprint standup | **CLI** | `cu summary` provides ready-made format |
| Search tasks | **CLI** | `cu search` outputs clean Markdown tables |
| Create document | **MCP** | Documents are MCP-only |
| Track time | **MCP** | Time tracking is MCP-only |
| Set goals/OKRs | **MCP** | Goals are MCP-only |
| Manage webhooks | **MCP** | Webhooks are MCP-only |
| Chat / messages | **MCP** | Chat is MCP-only |
| Custom field CRUD | **MCP** | CLI has basic set/remove only |
| Full workspace hierarchy | **MCP** | `get_workspace` with include_hierarchy is richer |
| Quick workspace peek | **CLI** | `cu spaces` + `cu lists` is faster |
| Task status update | **CLI** | `cu update --status` is faster |
| Bulk status update (10+) | **MCP** | `update_bulk_tasks` in one call |
| View activity log | **CLI** | `cu activity` is clean and fast |
| Add file attachment | **MCP** | CLI has no file handling |
| Delete a task | **CLI** | `cu delete --confirm` with explicit confirmation |
| Enterprise admin | **MCP** | Guests, audit logs, user groups are MCP-only |

### Tool Availability Comparison

```yaml
capability_matrix:
  task_crud:
    cli: ["create", "read", "update", "delete"]
    mcp: ["create", "read", "update", "delete", "bulk_create", "bulk_update"]
    
  task_search:
    cli: ["search", "sprint", "overdue", "assigned"]
    mcp: ["search_tasks", "get_task"]
    
  task_relationships:
    cli: ["depend", "subtasks"]
    mcp: ["create_dependency", "create_subtask", "get_subtasks", "link_tasks"]
    
  comments:
    cli: ["comment", "comments"]
    mcp: ["manage_comments (full CRUD)"]
    
  workspace:
    cli: ["spaces", "lists"]
    mcp: ["get_workspace (full hierarchy + members + plan)"]
    
  documents:
    cli: []  # No CLI support
    mcp: ["create_document", "get_document", "list_documents", "create_document_page", etc.]
    
  time_tracking:
    cli: []  # No CLI support
    mcp: ["manage_time_entries (13 actions)"]
    
  goals:
    cli: []  # No CLI support
    mcp: ["manage_goals (8 actions)"]
    
  webhooks:
    cli: []  # No CLI support
    mcp: ["manage_webhooks (4 actions)"]
```

---

## 11. 🏎️ QUICK REFERENCE

### Workflow Decision Tree

```yaml
what_do_you_need:
  daily_standup:
    tool: CLI
    commands: ["cu summary", "cu sprint", "cu overdue"]
    mcp_optional: "manage_time_entries for time data"
    
  sprint_planning:
    primary: MCP
    tools: ["create_bulk_tasks", "create_dependency"]
    verify: ["cu sprint", "cu task <id>"]
    
  project_migration:
    primary: MCP
    tools: ["get_workspace", "manage_spaces", "create_bulk_tasks"]
    verify: ["cu lists", "cu task <id>"]
    
  document_creation:
    primary: MCP
    tools: ["create_document", "create_document_page"]
    verify: "list_documents"
    
  time_tracking:
    primary: MCP
    tools: ["manage_time_entries"]
    verify: "manage_time_entries (get_entries)"
    
  cross_tool_integration:
    primary: MCP
    tools: ["create_bulk_tasks + external MCP tools"]
    verify: ["cu search", "cu task <id>"]
    
  quick_task_update:
    tool: CLI
    commands: ["cu update --status", "cu comment", "cu assign"]
    mcp_fallback: "update_task, manage_comments"
```

### Common Command Sequences

```bash
# 🏃 Sprint standup (CLI only, 3 commands)
cu summary && cu sprint && cu overdue

# 📦 Sprint setup (MCP + CLI)
# → MCP: create_bulk_tasks → CLI: cu sprint → MCP: create_dependency

# 📄 Document-driven task (MCP only)
# → create_document → create_bulk_tasks → create_document_page

# ⏱️ Time tracking (MCP only)
# → start_timer → [work] → stop_timer → get_entries

# 🔗 Cross-tool (Figma → ClickUp)
# → figma_get_file_components → create_bulk_tasks → cu search
```

### Related Resources

- [SKILL.md](../SKILL.md) — Main skill instructions
- [ClickUp - Integrations - MCP Knowledge - v0.100.md](../integrations/ClickUp%20-%20Integrations%20-%20MCP%20Knowledge%20-%20v0.100.md) — MCP tool reference
- [ClickUp - Integrations - CLI Knowledge - v0.100.md](../integrations/ClickUp%20-%20Integrations%20-%20CLI%20Knowledge%20-%20v0.100.md) — CLI command reference
- [tool_reference.md](../../references/tool_reference.md) — Source tool reference
- [cli_reference.md](../../references/cli_reference.md) — Source CLI reference
- [workflows.md](../../references/workflows.md) — Source workflow patterns
