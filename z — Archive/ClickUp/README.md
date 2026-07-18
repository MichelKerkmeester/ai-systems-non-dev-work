# ClickUp Agent - User Guide v0.100

Creates and manages ClickUp workspaces through natural language using CLI and MCP server integration with **transparent SYNC processing**.

---

## 1. OVERVIEW

The ClickUp Agent connects AI assistants to ClickUp through two complementary tools: the ClickUp CLI (`cu`) with 30+ commands for fast daily task operations and sprints, and the ClickUp MCP server with 46 tools for enterprise features including documents, goals, webhooks, time tracking, bulk operations, and chat. The system routes between the two tools based on intent signals in each request — task CRUD and sprints go to the CLI when available; documents, goals, and bulk operations go to the MCP server. Both tools authenticate against the same ClickUp workspace using an API token and Team ID.

| Dimension | CLI (cu) | MCP (Code Mode) |
|---|---|---|
| Version | `@krodak/clickup-cli` npm | `@taazkareem/clickup-mcp-server` npm |
| Commands / Tools | 30+ commands | 46 tools |
| Authentication | API token + Team ID | API key + Team ID |
| Output format | Markdown tables / JSON | JSON via Code Mode |
| Sprint support | Native (`cu sprint`, `cu summary`) | Not available |
| Docs / Goals / Webhooks | Not available | Full support |
| Time tracking | Not available | Full support (10+ actions) |
| Bulk operations | Not available | `create_bulk_tasks`, `update_bulk_tasks` |
| Token cost | Lowest | Medium |

---

## 2. KEY FEATURES

### Task Management (CLI + MCP)

**CLI Operations (30+ commands):**
- Create, update, delete tasks with full property support (priority, assignee, due date, tags, custom fields)
- Daily task views: assigned, overdue, inbox, sprint-filtered
- Bulk task search with full-text query
- Comment posting and viewing
- Dependency management (`depend` command)
- Task movement between lists
- Browser integration (`open` command)

**MCP Operations (20 tools):**
- Full CRUD with advanced filtering and pagination
- Bulk create/update tasks (array-based, single call)
- Subtask management with hierarchical nesting
- Task templates (create from, apply to existing)
- Dependency linking with cross-task references
- Attachment upload with large-file chunking
- Checklist management (6 actions: create, update, delete items)

**Important**: The system NEVER suggests manual workflows or external tools. All operations use native ClickUp CLI or MCP exclusively.

### Sprint & Standup (CLI Only)
- **Sprint Views**: Active sprint task lists with status and assignee breakdowns
- **Multi-Sprint Listing**: View all sprints in a space with date ranges
- **Standup Summaries**: Auto-generated standup-ready reports with completed, in-progress, and blocked sections
- **Overdue Detection**: Tasks past due date highlighted for immediate attention
- **Markdown Output**: All output in clean Markdown tables, parseable by AI agents without token overhead
- **JSON Option**: Structured output available via `--json` flag for downstream processing

### Documents & Goals (MCP Only)

**Document Operations (7 tools):**
- Create documents with hierarchical page structures
- Update document content, add sub-pages
- List documents by workspace or parent page
- Full page lifecycle management

**Goal Operations (8 actions):**
- Create goals with key results
- Update goal progress and status
- Link goals to tasks and documents
- View goal hierarchies and dependencies

### Time Tracking (MCP Only)
- Start/stop timer on any task
- Log manual time entries with descriptions
- View time reports by date range, task, or assignee
- Tag time entries by category
- Edit and delete existing time entries

### Bulk Operations (MCP Only)
- **Bulk Create**: Array of task definitions created in one call
- **Bulk Update**: Status, assignee, or priority changes across many tasks
- Efficient for sprint planning, data migration, and batch status changes

### System Features
- **Connection First**: Always verifies CLI (`cu auth`) and MCP (`search_tools`) before operations
- **SYNC Processing**: Transparent 4-phase methodology for every operation
- **Interactive Mode**: Single comprehensive questions when requests are ambiguous
- **Smart Routing**: Intelligent CLI/MCP selection based on operation type and tool availability
- **Clear Feedback**: Visual progress tracking for every operation

---

## 3. SYSTEM ARCHITECTURE

```
AGENTS.md → Entry point with intelligent routing logic
    ↓
ClickUp - System Prompt (System prompt with SYNC integration)
    ↓
ClickUp - SYNC Thinking Framework (4-phase methodology with cognitive rigor)
    ↓
ClickUp - Interactive Intelligence (Conversation flow with two-layer transparency)
    ↓
ClickUp - MCP Knowledge (46 MCP tools specifications)
ClickUp - CLI Knowledge (30+ CLI commands reference)
    ↓
Combined Workflows (CLI+MCP integration patterns)
    ↓
INSTALL_GUIDE.md (Install/configure CLI and MCP server)
    ↓
mcp servers/clickup-mcp/ (Repo-local server configuration)
    ↓
Output → Native ClickUp operations via CLI or MCP server
```

---

## 4. QUICK SETUP

### Step 1: Create a Project
Create a new project in your AI workspace (Claude, OpenCode, or VS Code Copilot) named "ClickUp Agent."

### Step 2: Add System Instructions
Copy and paste the System Prompt into your project's custom instructions:
- `ClickUp - System - Prompt - v0.100.md`

### Step 3: Upload Reference Documents
Add these documents to your project knowledge base:
- `ClickUp - Integrations - MCP Knowledge - v0.100.md`
- `ClickUp - Integrations - CLI Knowledge - v0.100.md`
- `ClickUp - Thinking - SYNC Framework - v0.100.md`
- `ClickUp - System - Interactive Intelligence - v0.100.md`

### Step 4: Install ClickUp CLI
```bash
npm install -g @krodak/clickup-cli
cu init
# Follow interactive prompts for API token and Team ID
```

### Step 5: Configure MCP Server
Add to `.env`:
```bash
clickup_CLICKUP_API_KEY=pk_your_token_here
clickup_CLICKUP_TEAM_ID=your_team_id_here
```

See `INSTALL_GUIDE.md` for complete setup with multi-platform configuration.

---

## 5. INSTALLING CLICKUP CLI + MCP

Full setup guide: `INSTALL_GUIDE.md`.

### CLI Installation

```bash
# npm (cross-platform)
npm install -g @krodak/clickup-cli

# Homebrew (macOS)
brew tap krodak/tap && brew install clickup-cli

# Configure
cu init
```

### MCP Server Configuration

Already configured in `.utcp_config.json`:

```json
{
  "name": "clickup",
  "call_template_type": "mcp",
  "config": {
    "mcpServers": {
      "clickup": {
        "transport": "stdio",
        "command": "npx",
        "args": ["-y", "@taazkareem/clickup-mcp-server@latest"],
        "env": {
          "CLICKUP_API_KEY": "${CLICKUP_API_KEY}",
          "CLICKUP_TEAM_ID": "${CLICKUP_TEAM_ID}"
        }
      }
    }
  }
}
```

### Getting Your API Token and Team ID

1. **Create API Token**
   - Go to [ClickUp Settings](https://app.clickup.com/settings)
   - Click **Apps** → **API Token**
   - Copy the token (starts with `pk_`)

2. **Find Team ID**
   - Go to **Settings** → **Workspaces**
   - Team ID appears in workspace settings panel
   - Or run `cu config get teamId` after CLI setup

### Environment Variables

```bash
# Code Mode (MCP server — must be prefixed with "clickup_")
clickup_CLICKUP_API_KEY=pk_your_token_here
clickup_CLICKUP_TEAM_ID=your_team_id_here

# CLI (reads these directly)
CU_API_TOKEN=pk_your_token_here
CU_TEAM_ID=your_team_id_here
```

### Important Notes

- CLI requires Node.js 22.0.0 or higher. MCP works with Node 18+.
- Both tools authenticate against the same ClickUp workspace using the same API token and Team ID.
- They use separate configuration sources: CLI reads from `~/.config/cu/config.json` or `CU_*` env vars; MCP reads from `.env` with the `clickup_` prefix.
- The MCP server can also be run via Docker — see `INSTALL_GUIDE.md` for the Docker setup.

---

## 6. CONNECTION VERIFICATION

### Automatic Connection Check

The system automatically verifies both CLI and MCP connections before operations:

```markdown
 ClickUp Connection Check

✔ CLI: Connected (cu auth confirmed)
✔ MCP Server: Connected (46 tools available)
✔ Workspace Access: Confirmed
✔ Authentication: Valid
```

### Test Commands

**CLI Test:**
```bash
cu auth       # Should show authenticated
cu tasks      # Should list your tasks
```

**MCP Test:**
```typescript
// Discover ClickUp tools via Code Mode
search_tools({ task_description: "clickup" });
// Expected: List of clickup.clickup_* tools (46 total)

// Test workspace access
call_tool_chain({
  code: `
    const ws = await clickup.clickup_get_workspace({});
    return ws;
  `
});
```

### Common Connection Issues

**CLI: Wrong Binary Resolves (`cu (Taylor UUCP)` instead of ClickUp CLI):**
```markdown
 Binary Conflict

The system UUCP binary is earlier in PATH.

Solution:
1. echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
2. source ~/.zshrc
3. cu --version  # Should now show ClickUp CLI version
```

**MCP: Environment Variable Not Found:**
```markdown
 Configuration Issue

Variable 'CLICKUP_API_KEY' not found.

Solution:
1. Variables must be PREFIXED in .env:
   clickup_CLICKUP_API_KEY=pk_...
   clickup_CLICKUP_TEAM_ID=your_id
2. NOT: CLICKUP_API_KEY=pk_...
```

**Sprint Features Unavailable via MCP:**
```markdown
 Routing Note

Sprint views and standup summaries are CLI-only features.
No MCP equivalent exists.

Solution:
Install the CLI: npm install -g @krodak/clickup-cli
Then run: cu sprint, cu summary
```

---

## 8. HOW IT WORKS

### SYNC Processing Framework

The system uses intelligent 4-phase SYNC methodology:

```markdown
 SYNC Processing:

S - Survey: Understanding context and requirements
Y - Yield: Converting to optimal native approach (CLI or MCP)
N - Navigate: Executing operations through native tools
C - Create: Validating quality and delivering results

Internal: Full cognitive rigor (routing, tool selection, validation)
External: Concise progress updates only
```

### Native CLI + MCP Operations Only

```markdown
✅ CORRECT Approach:

• Uses cu create, cu update, cu sprint, cu summary (CLI)
• Uses clickup.clickup_create_task() (MCP)
• Uses clickup.clickup_create_bulk_tasks() (MCP for bulk)
• Uses clickup.clickup_manage_goals() (MCP for goals)
• All operations through native CLI or MCP server

❌ NEVER Does This:

• Suggest manual data entry in ClickUp UI
• Use ClickUp REST API directly
• Create non-native workflows
• Build operations outside ClickUp tooling
```

### Smart Routing Logic

The system automatically selects CLI or MCP based on operation type:

| Request Type | Route To | Reason |
|---|---|---|
| Task CRUD, search | CLI (first), MCP (fallback) | CLI is faster, lower token cost |
| Sprint view, standup | CLI only | No MCP equivalent exists |
| Documents, goals, webhooks | MCP only | Not available in CLI |
| Time tracking, chat | MCP only | Not available in CLI |
| Bulk create/update | MCP only | CLI has no bulk commands |
| Workspace discovery | CLI or MCP | Both work; MCP gives full hierarchy |
| Guests, audit logs | MCP only | Enterprise plan required |

### Execution Modes

```markdown
 Standard Mode:

• Default for all operations
• Full SYNC processing (4 phases)
• Smart CLI/MCP routing
• Best for most tasks
• Shows concise progress updates

 Interactive Mode:

• Triggered by ambiguous requests
• Single comprehensive question
• Waits for user input before proceeding
• Use $interactive or $int to force this mode
```

---

## 9. EXAMPLE INTERACTIONS

### Daily Standup Using CLI

```
User: $standup

System:
 ClickUp Connection Check

✔ CLI: Connected
✔ Workspace Access: Confirmed

Generating standup summary!

 SYNC Processing:

S - Survey: Sprint standup with progress and blockers
Y - Yield: CLI sprint summary optimal
N - Navigate: cu sprint → cu summary → cu overdue
C - Create: Compiling standup report...

 ClickUp Operation

Operation: Daily standup generation

 Processing:
├── Current sprint status ✔
├── Completed tasks summary ✔
├── In-progress tasks ✔
├── Blocked items ✔
└── Overdue alerts ✔

✅ Operation Complete!

 Results:
├── Sprint: Sprint 24 (Active)
├── Completed: 8 tasks
├── In Progress: 3 tasks
├── Blocked: 1 task
└── Overdue: 0 tasks

 Run daily for consistent standup format!
   Use --json for programmatic consumption.
```

### Create Sprint Tasks Using CLI

```
User: Create tasks for sprint backlog: login page, API setup, database schema

System:
 ClickUp Connection Check

✔ CLI: Connected
✔ List Access: Sprint Backlog ready

Creating sprint tasks!

 SYNC Processing:

S - Survey: 3 tasks for sprint backlog with default properties
Y - Yield: CLI sequential creation optimal for small batch
N - Navigate: cu create × 3 with list targeting
C - Create: Validating task creation...

 ClickUp Operation

Operation: Sprint task creation

 Processing:
├── "Login page" ✔ (ID: abc123)
├── "API setup" ✔ (ID: def456)
└── "Database schema" ✔ (ID: ghi789)

✅ Operation Complete!

 Results:
├── Tasks Created: 3
├── List: Sprint Backlog
├── Status: To Do
└── Priority: Normal (adjustable)

 Use $bulk for large batches (10+ tasks)!
   Bulk operations route to MCP for single-call efficiency.
```

### Bulk Task Creation Using MCP

```
User: $bulk create 15 tasks for the Q2 roadmap

System:
 ClickUp Connection Check

✔ MCP Server: Connected
✔ Workspace Access: Confirmed

Bulk-creating roadmap tasks via MCP!

 SYNC Processing:

S - Survey: 15 roadmap tasks across 4 categories
Y - Yield: MCP bulk create for single-call efficiency
N - Navigate: clickup.clickup_create_bulk_tasks()
C - Create: Validating all tasks created...

 ClickUp Operation

Operation: Bulk task creation

 Processing:
├── Category: Infrastructure (4 tasks) ✔
├── Category: Features (6 tasks) ✔
├── Category: Improvements (3 tasks) ✔
└── Category: Research (2 tasks) ✔

✅ Operation Complete!

 Results:
├── Tasks Created: 15 (single API call)
├── List: Q2 Roadmap
├── Priority: Assigned per task
└── Assignees: Assigned per task

 Bulk create saves 14 additional API calls!
   All tasks created atomically in one MCP operation.
```

### Document Management Using MCP

```
User: Create a project wiki with architecture and onboarding docs

System:
 ClickUp Connection Check

✔ MCP Server: Connected
✔ Workspace Access: Confirmed

Creating project wiki structure!

 SYNC Processing:

S - Survey: Wiki with hierarchical documentation pages
Y - Yield: MCP document operations for full page lifecycle
N - Navigate: Create doc → Add pages → Populate content
C - Create: Validating page hierarchy...

 ClickUp Operation

Operation: Wiki documentation creation

 Processing:
├── Wiki root document ✔
├── Architecture page ✔
├── Onboarding guide ✔
├── API reference page ✔
└── Internal linking ✔

✅ Operation Complete!

 Results:
├── Documents: 1 created
├── Pages: 4 structured
├── Hierarchy levels: 2
└── Internal links: 6 configured

 Use MCP for all doc management!
   CLI does not support document operations.
```

---

## 10. WHAT GETS CREATED

### Task Structures

```javascript
// Task (Created via CLI or MCP)
Task: {
  name: 'string (required)',
  description: 'rich text with markdown',
  status: 'to do | in progress | done | custom',
  priority: 'urgent | high | normal | low',
  assignees: ['user_ids | email addresses'],
  due_date: 'ISO 8601 timestamp',
  tags: ['array of tag names'],
  custom_fields: { field_id: 'value' },
  dependencies: ['task_ids (blocking)'],
  parent: 'task_id (for subtasks)',
  list_id: 'target list',
  time_estimate: 'milliseconds'
}
```

### Sprint Configurations

```javascript
// Sprint (Managed via CLI)
Sprint: {
  name: 'string (e.g., "Sprint 24")',
  start_date: 'ISO 8601',
  end_date: 'ISO 8601',
  tasks: ['task_ids assigned to sprint'],
  status: 'active | completed | future',
  velocity: 'points_completed (auto-calculated)',
  standup_summary: {
    completed: ['task summaries'],
    in_progress: ['task summaries'],
    blocked: ['task summaries with blockers'],
    overdue: ['task summaries past due']
  }
}
```

### Document Hierarchies

```javascript
// Document Structure (Created via MCP)
Document: {
  name: 'string (doc title)',
  pages: [{
    title: 'string',
    content: 'rich text blocks',
    sub_pages: [{
      title: 'string',
      content: 'rich text blocks'
    }]
  }],
  workspace_id: 'team ID',
  space_id: 'space ID (optional)',
  parent_doc_id: 'string (for nested docs)'
}
```

### Workspace Mappings

```javascript
// Workspace Structure (Discovered via CLI or MCP)
Workspace: {
  name: 'string',
  team_id: 'numeric',
  members: ['user objects (MCP only)'],
  spaces: [{
    id: 'string',
    name: 'string',
    folders: [{
      id: 'string',
      name: 'string',
      lists: [{
        id: 'string',
        name: 'string',
        task_count: 'number',
        statuses: ['status objects']
      }]
    }]
  }]
}
```

### Tool Coverage

| Operation | CLI (cu) | MCP | Notes |
|---|---|---|---|
| Task CRUD | ✅ Full | ✅ Full | CLI preferred for speed |
| Sprint Views | ✅ Native | ❌ | CLI only |
| Standup Summary | ✅ Auto-generated | ❌ | CLI only |
| Bulk Operations | ❌ | ✅ Single call | MCP only |
| Documents | ❌ | ✅ 7 tools | MCP only |
| Goals & OKRs | ❌ | ✅ 8 actions | MCP only |
| Time Tracking | ❌ | ✅ 10+ actions | MCP only |
| Webhooks | ❌ | ✅ 4 actions | MCP only |
| Chat | ❌ | ✅ Channels/messages | MCP only |
| Guest Management | ❌ | ✅ Enterprise only | MCP only |
| Workspace Discovery | ✅ Basic | ✅ Full hierarchy | Both work |
| Custom Fields/Tags | ✅ | ✅ Full definition CRUD | MCP for field creation |

---

## 11. VERSION HISTORY

### v0.100 (Current)
- **Complete System Rebuild**: Transformed from skill (SKILL.md) to full AI System aligned with Media Editor/Notion architecture
- **AI System Architecture**: AGENTS.md entry point with Context Override, Export Protocol, Reading Instructions, and Processing Hierarchy
- **SYNC Framework**: Transitioned to 4-phase methodology (Survey, Yield, Navigate, Create) for clearer operation tracking
- **Knowledge Base Integration**: Three-tier structure (system/, integrations/, reference/) with progressive document loading
- **Smart Routing Enhancement**: Weighted intent scoring with CLI-first task routing and MCP enterprise fallback
- **CLI Knowledge Base**: Complete 30+ CLI command reference with flags, output modes, and combined workflow patterns
- **MCP Knowledge Base**: Complete 46 MCP tool specifications with parameters, examples, and priority categorization
- **Interactive Intelligence**: Comprehensive conversation flow with single-question clarification for ambiguous requests
- **Two-Layer Transparency**: Full cognitive rigor internally through SYNC, concise progress updates externally
- **Native Operations Only**: 100% ClickUp CLI + MCP operations, zero manual processes or external tool suggestions
- **Combined Workflows**: Documented CLI+MCP integration patterns for cross-tool operations
- **Docker Support**: Repo-local MCP server Docker setup in `mcp servers/clickup-mcp/`

### Pre-v0.100 (Previous)
- Original skill-based architecture (SKILL.md)
- Basic CLI and MCP routing with manual reference loading
- Single README.md with feature comparison tables
- No knowledge base or structured document hierarchy
- No SYNC framework or interactive intelligence
- Simple troubleshooting with FAQ section

---

## 12. RESOURCES

### Essential Links
- [ClickUp CLI on npm](https://www.npmjs.com/package/@krodak/clickup-cli) - CLI package (`@krodak/clickup-cli`)
- [ClickUp MCP Server on npm](https://www.npmjs.com/package/@taazkareem/clickup-mcp-server) - MCP server package (`@taazkareem/clickup-mcp-server`)
- [ClickUp API Documentation](https://clickup.com/api) - Official API reference
- [MCP Protocol](https://modelcontextprotocol.io/) - Model Context Protocol specification
- [Claude Desktop](https://claude.ai/download) - Required for MCP integration

### Quick References
- [ClickUp API Reference](https://clickup.com/api) - Full endpoint documentation
- [Task Properties](https://clickup.com/api/clickupreference/operation/CreateTask) - Task creation parameters
- [Custom Fields](https://clickup.com/api/clickupreference/operation/GetAccessibleCustomFields) - Field types and values
- [Webhooks Guide](https://clickup.com/api/clickupreference/operation/CreateWebhook) - Event subscription setup

### Related Systems
- [Figma Agent](../Figma/) - Cross-tool workflow: Figma design to ClickUp task
- [Notion Agent](../Notion/) - Notion workspace management AI system
- [Media Editor](../Media%20Editor/) - Media processing AI system
