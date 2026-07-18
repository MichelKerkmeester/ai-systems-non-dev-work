# ClickUp Agent Installation Guide

A comprehensive guide to installing, configuring, and using the ClickUp CLI (`cu`) and ClickUp MCP server for AI-powered project management. Two complementary approaches: CLI for daily task operations and sprint management, MCP for enterprise features like documents, goals, webhooks, time tracking, and bulk operations.

---

## AI-FIRST INSTALL GUIDE

**Copy and paste this prompt to your AI assistant to get installation help:**

```text
I want to install the ClickUp CLI (cu) and ClickUp MCP server for AI-powered project management.

Please help me:
1. Install ClickUp CLI: npm install -g @krodak/clickup-cli (requires Node >= 22)
2. Configure CLI credentials interactively: cu init (needs API token + Team ID)
3. Set up environment variables for MCP server (prefixed clickup_CLICKUP_API_KEY and clickup_CLICKUP_TEAM_ID)
4. Verify CLI works: cu auth, cu tasks
5. Verify MCP works: search_tools for clickup tools
6. Configure my MCP client (Claude Desktop / OpenCode / VS Code Copilot)

My ClickUp API token is: [paste from ClickUp Settings > Apps > API Token]
My Team ID is: [paste from ClickUp Settings > Workspaces]

I'm using: [Claude Desktop / OpenCode / VS Code Copilot]

Guide me through each step with the exact commands I need to run.
```

**What the AI will do:**
- Check Node.js version and install/upgrade if below 22.0.0
- Install ClickUp CLI globally via npm or Homebrew
- Run interactive `cu init` setup with your credentials
- Configure `.env` with prefixed variables for MCP access
- Verify both CLI and MCP connections with test commands
- Configure your MCP client with the correct server settings
- Show you how to use task management, sprints, and standup commands

**Expected setup time:** 5-10 minutes

---

---

## 1. OVERVIEW

The ClickUp Agent provides AI-powered project management through two complementary tools running through CLI and MCP server channels. This enables AI assistants to perform task management, sprint operations, document creation, goal tracking, time management, and more.

### Key Features

- **Task Management (CLI + MCP)**: Full CRUD with priority, assignees, due dates, tags, custom fields
- **Sprint & Standup (CLI)**: Native sprint views and auto-generated standup summaries
- **Bulk Operations (MCP)**: Create and update multiple tasks in single API calls
- **Documents & Goals (MCP)**: Complete lifecycle management with page hierarchies
- **Time Tracking (MCP)**: Start/stop timers, log entries, tagged time categories
- **Workspace Discovery (Both)**: Navigate spaces, folders, lists, and team hierarchy
- **Enterprise Features (MCP)**: Webhooks, chat, guest management, audit logs

### Two-Tool Architecture

| Tool            | Technology        | Purpose                                    |
| --------------- | ----------------- | ------------------------------------------ |
| **CLI (`cu`)**  | Node.js + npm     | Fast daily task ops, sprints, standups     |
| **MCP Server**  | Node.js + Code Mode | Enterprise features, bulk ops, docs, goals |

```
┌─────────────────────────────────────────────────────────────┐
│                    Your AI Assistant                         │
│  (Claude Desktop, OpenCode, VS Code Copilot, etc.)          │
└──────────────────────┬──────────────────┬───────────────────┘
                       │                  │
                                         
┌─────────────────────────────┐  ┌────────────────────────────┐
│   ClickUp CLI (cu)          │  │  ClickUp MCP Server        │
│   npm global package        │  │  Code Mode / NPX           │
│   • Task CRUD (30+ cmds)    │  │  • Task management (20)    │
│   • Sprint views/standups   │  │  • Documents (7)           │
│   • Search & discovery      │  │  • Goals (8 actions)       │
│   • Comments & dependencies │  │  • Time tracking (10+)     │
│   • Tags & custom fields    │  │  • Bulk operations         │
│   • Markdown output         │  │  • Webhooks & chat         │
│   • JSON output (--json)    │  │  • Enterprise features     │
└──────────────┬──────────────┘  └─────────────┬──────────────┘
               │                               │
                                              
┌─────────────────────────────┐  ┌────────────────────────────┐
│  ~/.config/cu/config.json   │  │  .env (prefixed vars)      │
│  API Token + Team ID        │  │  clickup_CLICKUP_API_KEY   │
│  (or CU_* env vars)         │  │  clickup_CLICKUP_TEAM_ID   │
└─────────────────────────────┘  └────────────────────────────┘
```

---

## 2. PREREQUISITES

### ClickUp API Token

1. Open [ClickUp Settings](https://app.clickup.com/settings)
2. Navigate to **Apps** section
3. Click **API Token**
4. Copy the token (starts with `pk_`)

### ClickUp Team ID

1. Open [ClickUp Settings](https://app.clickup.com/settings)
2. Navigate to **Workspaces**
3. Copy the Team ID (numeric)
4. Or after CLI setup: `cu config get teamId`

### Node.js

| Tool        | Minimum     | Recommended |
|-------------|-------------|-------------|
| CLI (`cu`)  | 22.0.0      | Latest LTS  |
| MCP Server  | 18.0.0      | 22+         |

Check your version:
```bash
node --version
```

### Required

- **Node.js** 22.0.0+ (CLI), 18.0.0+ (MCP)
  ```bash
  # Install/upgrade via nvm
  nvm install 22
  nvm use 22
  
  # Or via Homebrew (macOS)
  brew install node
  ```

- **npm** (included with Node.js)
  ```bash
  npm --version
  ```

- **MCP Client** (Claude Desktop, OpenCode, or VS Code Copilot)
  ```bash
  # Claude Desktop: https://claude.ai/download
  # OpenCode: already installed in this repo
  # VS Code Copilot: via VS Code extensions
  ```

### Recommended

- **Node.js 22+** for both CLI and MCP compatibility
- **Git** for cloning repositories (if using Docker MCP setup)

---

## 3. INSTALLATION

### Step 1: Install ClickUp CLI

#### Option A: npm (Recommended, Cross-Platform)

```bash
npm install -g @krodak/clickup-cli
```

#### Option B: Homebrew (macOS)

```bash
brew tap krodak/tap && brew install clickup-cli
```

#### Option C: Direct Download

Download the latest binary from [npm registry](https://www.npmjs.com/package/@krodak/clickup-cli).

---

### Step 2: Configure CLI Credentials

#### Interactive Setup (Recommended)

```bash
cu init
# Prompts for:
#   - ClickUp API token (starts with pk_)
#   - Team ID (numeric)
```

This writes to `~/.config/cu/config.json`:

```json
{
  "apiToken": "pk_your_token_here",
  "teamId": "your_team_id"
}
```

#### Manual Configuration

Create `~/.config/cu/config.json` manually with the format above.

#### Environment Variable Overrides

```bash
export CU_API_TOKEN="pk_your_token_here"
export CU_TEAM_ID="your_team_id"
```

Environment variables override the config file at runtime.

---

### Step 3: Install ClickUp MCP Server

#### Option A: NPX Auto-Download (Default)

The MCP server is already configured in `.utcp_config.json` and auto-downloads via NPX. No manual installation needed:

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

#### Option B: Docker Setup (Repo-Local)

This repo includes a Docker Compose setup in `mcp servers/clickup-mcp/` for a persistent local MCP server:

1. Navigate to the server directory:
   ```bash
   cd "mcp servers/clickup-mcp"
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Add your credentials to `.env`:
   ```env
   CLICKUP_API_KEY=pk_your_token_here
   CLICKUP_TEAM_ID=your_team_id_here
   ```

4. Build and start the container:
   ```bash
   docker-compose up -d --build
   ```

5. Verify the container is running:
   ```bash
   docker ps | grep clickup-mcp
   ```

#### Option C: Global npm Install

```bash
npm install -g @taazkareem/clickup-mcp-server
# Then reference the global binary in your MCP config
```

---

### Step 4: Configure Environment Variables

Add to `.env` in the project root. Code Mode requires **prefixed** variable names matching the manual name ("clickup"):

```bash
# Code Mode (MCP server) — CRITICAL: use the "clickup_" prefix
clickup_CLICKUP_API_KEY=pk_your_token_here
clickup_CLICKUP_TEAM_ID=your_team_id_here

# CLI (reads these directly, no prefix needed)
CU_API_TOKEN=pk_your_token_here
CU_TEAM_ID=your_team_id_here
```

**Important**: Without the `clickup_` prefix, Code Mode cannot find the variables and the MCP server will fail to authenticate.

---

## 4. CONFIGURATION

Configure the MCP server for your AI platform:

### Option A: Configure for OpenCode

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

For the Docker setup, update the command to use Docker:

```json
{
  "name": "clickup",
  "call_template_type": "mcp",
  "config": {
    "mcpServers": {
      "clickup": {
        "transport": "stdio",
        "command": "docker",
        "args": ["exec", "-i", "clickup-mcp", "node", "dist/index.js"],
        "env": {}
      }
    }
  }
}
```

### Option B: Configure for Claude Desktop

Config file locations:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**For NPX (Default):**
```json
{
  "mcpServers": {
    "clickup": {
      "command": "npx",
      "args": ["-y", "@taazkareem/clickup-mcp-server@latest"],
      "env": {
        "CLICKUP_API_KEY": "pk_your_token_here",
        "CLICKUP_TEAM_ID": "your_team_id"
      }
    }
  }
}
```

**For Docker:**
```json
{
  "mcpServers": {
    "clickup": {
      "command": "docker",
      "args": ["exec", "-i", "clickup-mcp", "node", "dist/index.js"],
      "env": {}
    }
  }
}
```

### Option C: Configure for VS Code Copilot

Create `.vscode/mcp.json` in your workspace:

```json
{
  "mcpServers": {
    "clickup": {
      "command": "npx",
      "args": ["-y", "@taazkareem/clickup-mcp-server@latest"],
      "env": {
        "CLICKUP_API_KEY": "pk_your_token_here",
        "CLICKUP_TEAM_ID": "your_team_id"
      }
    }
  }
}
```

### PATH Troubleshooting (CLI Only)

If `cu --version` shows "Taylor UUCP" instead of the ClickUp CLI, the system UUCP binary is found before the npm global binary:

```bash
# Check which cu is being used
which cu

# Ensure npm global bin comes first in PATH
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
which cu  # Should now point to npm global
cu auth   # Should work
```

**After any configuration change, restart your MCP client completely** (⌘Q on Mac, not just close window).

---

## 5. ✅ VERIFICATION

### Verification Checklist

| Check | Tool | Command | Expected Result |
|---|---|---|---|
| CLI installed | CLI | `cu --version` | ClickUp CLI version string (NOT "Taylor UUCP") |
| CLI configured | CLI | `cu auth` | "Authenticated" or user info |
| CLI working | CLI | `cu tasks` | List of tasks (or empty) |
| Node.js version | CLI | `node --version` | >= 22.0.0 for CLI |
| MCP tools discovered | MCP | `search_tools({ task_description: "clickup" })` | List of 46 `clickup.clickup_*` tools |
| MCP workspace access | MCP | `call_tool_chain({ code: "return await clickup.clickup_get_workspace({});" })` | Workspace data returned |
| Environment variables | MCP | Check `.env` has `clickup_CLICKUP_API_KEY` and `clickup_CLICKUP_TEAM_ID` | Variables present with correct values |
| Docker container (if used) | Docker | `docker ps \| grep clickup-mcp` | Container running |

### Automated System Check

When using the ClickUp Agent, the system runs an automatic connection check:

```markdown
 ClickUp Connection Check

✔ CLI: Connected (cu auth confirmed)
✔ MCP Server: Connected (46 tools available)
✔ Workspace Access: Confirmed
✔ Authentication: Valid
```

### Manual Test Commands

**CLI Tests:**
```bash
# Verify authentication
cu auth

# List your tasks
cu tasks

# View current sprint
cu sprint

# Generate standup summary
cu summary

# Search for tasks
cu search "login"
```

**MCP Tests:**
```typescript
// Discover all ClickUp tools
search_tools({ task_description: "clickup" });

// Test workspace access
call_tool_chain({
  code: `
    const ws = await clickup.clickup_get_workspace({ include_hierarchy: true });
    return ws;
  `
});

// Test task list
call_tool_chain({
  code: `
    const tasks = await clickup.clickup_list_tasks({ listName: "Your List Name" });
    return tasks;
  `
});
```

---

## 6. USAGE

### Command Shortcuts

The ClickUp Agent supports these command shortcuts:

| Command        | Shortcut | Function                            |
| -------------- | -------- | ----------------------------------- |
| `$task`        | —        | Task operations (CRUD, status)      |
| `$sprint`      | `$sp`    | Sprint management and views         |
| `$standup`     | `$su`    | Standup generation and reporting    |
| `$create`      | `$c`     | Create tasks, docs, goals           |
| `$search`      | `$s`     | Search across workspace             |
| `$bulk`        | —        | Bulk create/update operations       |
| `$docs`        | `$d`     | Document management                 |
| `$goals`       | `$g`     | Goals and OKR management            |
| `$time`        | `$t`     | Time tracking operations            |
| `$workspace`   | `$ws`    | Workspace discovery and management  |
| `$interactive` | `$int`   | Guided interactive workflow         |

### Operation Routing

| Request Type | Route To | Reason |
|---|---|---|
| Task CRUD, search | CLI (first), MCP (fallback) | CLI is faster, lower token cost |
| Sprint view, standup | CLI only | No MCP equivalent |
| Documents, goals, webhooks | MCP only | Not in CLI |
| Time tracking, chat | MCP only | Not in CLI |
| Bulk create/update | MCP only | CLI has no bulk commands |
| Workspace discovery | CLI or MCP | Both work; MCP gives full hierarchy |
| Guests, audit logs | MCP only | Enterprise plan required |

### Interactive Mode

For guided operations, use:
```
$interactive
```

This activates the full conversational flow with single-question clarification.

---

## 7. FEATURES

### CLI Capabilities (30+ Commands)

| Category      | Commands                                    | Description                               |
| ------------- | ------------------------------------------- | ----------------------------------------- |
| **Daily View** | `tasks`, `assigned`, `sprint`, `overdue`, `inbox` | See your work at a glance          |
| **Sprint**    | `sprint`, `sprints`, `summary`              | Sprint state and standup output           |
| **Search**    | `search`                                    | Full-text task search                     |
| **Task Detail**| `task`, `subtasks`, `comments`, `activity`  | Inspect a task                            |
| **Task Write** | `create`, `update`, `delete`, `assign`, `move` | Modify tasks                           |
| **Comments**  | `comment`, `comments`                       | Post and view comments                    |
| **Fields**    | `field`, `tag`                              | Custom fields and tags                    |
| **Dependencies**| `depend`                                  | Add task dependencies                     |
| **Workspace** | `spaces`, `lists`, `auth`                   | Navigate and verify config                |
| **Utility**   | `open`, `inbox`                             | Browser open, notifications               |

### MCP Capabilities (46 Tools)

| Category          | Tool Count | Key Capabilities                              |
| ----------------- | ---------- | --------------------------------------------- |
| **Task Management** | 20       | Full CRUD, bulk ops, dependencies, subtasks    |
| **Documents**     | 7          | Create/update docs, pages, sub-pages           |
| **Goals**         | 1          | Goals and key results (8 actions)              |
| **Time Tracking** | 1          | Start/stop timers, log entries (10+ actions)   |
| **Chat**          | 2          | Channels, messages, threads, reactions         |
| **Webhooks**      | 1          | Create, list, update, delete subscriptions     |
| **Views**         | 1          | 10 view types, list/create/delete (6 actions)  |
| **Lists/Spaces**  | 3          | Structure management                           |
| **Custom Fields** | 1          | Field definitions and values (4 actions)       |
| **Tags**          | 3          | Space tags, add/remove from tasks              |
| **Checklists**    | 1          | Checklist items on tasks (6 actions)           |
| **Attachments**   | 1          | Upload, list, get (with large-file chunking)   |
| **Workspace**     | 1          | Hierarchy, members, plan details               |
| **User Groups**   | 1          | Group management (4 actions)                   |
| **Guests**        | 1          | Guest management (Enterprise, 10 actions)      |
| **Audit Logs**    | 1          | Activity logs (Enterprise)                     |
| **Feedback**      | 1          | Bug reports and feature requests               |

---

## 8. EXAMPLES

### CLI Examples

```bash
# Daily standup
cu summary

# Current sprint
cu sprint

# Create a task with full details
cu create \
  -n "Implement login page" \
  -l abc123 \
  -d "Build login UI with email/password auth" \
  --status "to do" \
  --priority high \
  --assignee me \
  --tags "frontend,auth" \
  --due-date 2026-04-15

# Mark task done
cu update <task-id> --status "done"

# Add a comment
cu comment <task-id> -m "Deployed to staging, ready for review"

# Search tasks
cu search "login page"

# View overdue tasks
cu overdue

# View your task queue
cu assigned
```

### MCP Examples

```typescript
// Bulk create sprint tasks
call_tool_chain({
  code: `
    const tasks = await clickup.clickup_create_bulk_tasks({
      listName: "Sprint Backlog",
      tasks: [
        { name: "Design login page", priority: 2, assignees: ["designer@team.com"] },
        { name: "Implement login API", priority: 2, assignees: ["backend@team.com"] },
        { name: "Write login tests", priority: 3, assignees: ["qa@team.com"] }
      ]
    });
    return tasks;
  `
});

// Create a document
call_tool_chain({
  code: `
    const doc = await clickup.clickup_create_document({
      name: "Architecture Wiki",
      spaceName: "Engineering",
      pages: [
        { title: "Overview", content: "System architecture overview..." },
        { title: "API Design", content: "API endpoints and schemas..." }
      ]
    });
    return doc;
  `
});

// Start time tracking
call_tool_chain({
  code: `
    const timer = await clickup.clickup_manage_time({
      action: "start",
      taskId: "abc123",
      description: "Implementing login page"
    });
    return timer;
  `
});

// Get workspace hierarchy
call_tool_chain({
  code: `
    const ws = await clickup.clickup_get_workspace({
      include_hierarchy: true
    });
    return ws;
  `
});
```

---

## 9. TROUBLESHOOTING

### CLI Issues

| Issue | Cause | Solution |
|---|---|---|
| `cu (Taylor UUCP)` shown | System UUCP binary in PATH before npm | Fix PATH: `echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc` |
| `Error: Invalid API token` | Token expired or incorrect | Re-run `cu init` with correct token |
| `Error: Team not found` | Wrong Team ID or not in workspace | Verify Team ID: ClickUp Settings → Workspaces |
| `command not found: cu` | CLI not installed | `npm install -g @krodak/clickup-cli` |
| Node version too old | Node below 22.0.0 | Upgrade: `nvm install 22 && nvm use 22` |
| `cu auth` succeeds but `cu tasks` fails | Token lacks task permissions | Check API token scope in ClickUp Apps settings |

### MCP Issues

| Issue | Cause | Solution |
|---|---|---|
| `Variable 'CLICKUP_API_KEY' not found` | Missing `clickup_` prefix in `.env` | Use `clickup_CLICKUP_API_KEY=pk_...` (prefixed) |
| `Tool not found: clickup_*` | MCP server not started or misconfigured | Verify `.utcp_config.json` has clickup entry; restart client |
| `Authentication failed` | Invalid API key | Check key starts with `pk_`; regenerate in ClickUp Apps |
| `Team not found in MCP` | Wrong Team ID in `.env` | Verify Team ID is numeric; check ClickUp Workspaces |
| `Sprint features not available` | Using MCP for CLI-only features | Install CLI: `npm install -g @krodak/clickup-cli` |
| `Permission denied` (Enterprise features) | Not on Enterprise plan | Guests and audit logs require Enterprise plan |

### Docker Issues

| Issue | Cause | Solution |
|---|---|---|
| Container not running | Docker Desktop not started | Start Docker Desktop and retry; `docker ps` to verify |
| `Error connecting to container` | Container name mismatch | Run `docker ps` to check container name; use correct name in config |
| Volume mount errors | Wrong path in docker-compose.yml | Check and fix volume paths; verify directory exists |
| Container keeps stopping | Build error or misconfiguration | `docker-compose down && docker-compose up -d --build`; check `docker logs clickup-mcp` |

### General Issues

| Issue | Cause | Solution |
|---|---|---|
| Both CLI and MCP fail | API token invalid or expired | Regenerate token in ClickUp Apps; update both config locations |
| Workspace not found | Wrong Team ID used | Verify Team ID in ClickUp Settings → Workspaces |
| Token format error | Token doesn't start with `pk_` | ClickUp API tokens always start with `pk_` |
| MCP tool count wrong | Server version mismatch | Update to latest: NPX auto-downloads `@latest`; Docker rebuilds |

---

## 10. RESOURCES

### Official Repositories

- **ClickUp CLI**: [npmjs.com/package/@krodak/clickup-cli](https://www.npmjs.com/package/@krodak/clickup-cli)
- **ClickUp MCP Server**: [npmjs.com/package/@taazkareem/clickup-mcp-server](https://www.npmjs.com/package/@taazkareem/clickup-mcp-server)

### ClickUp Documentation

- **API Reference**: [clickup.com/api](https://clickup.com/api)
- **Task Properties**: [Create Task API](https://clickup.com/api/clickupreference/operation/CreateTask)
- **Custom Fields**: [Accessible Custom Fields](https://clickup.com/api/clickupreference/operation/GetAccessibleCustomFields)
- **Webhooks**: [Create Webhook API](https://clickup.com/api/clickupreference/operation/CreateWebhook)

### MCP & Platform

- **MCP Protocol**: [modelcontextprotocol.io](https://modelcontextprotocol.io/)
- **Claude Desktop**: [claude.ai/download](https://claude.ai/download)
- **OpenCode Documentation**: [opencode.ai](https://opencode.ai)
- **VS Code Copilot**: [GitHub Copilot Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

### CLI Commands Reference

| Command | Purpose |
|---|---|
| `cu init` | Interactive credential setup |
| `cu auth` | Verify authentication |
| `cu tasks` | List open tasks |
| `cu sprint` | Current sprint view |
| `cu summary` | Standup summary |
| `cu create -n "name" -l listId` | Create a task |
| `cu update id --status done` | Update task status |
| `cu search "query"` | Full-text search |
| `cu config get teamId` | Show configured Team ID |

### Docker Commands Reference

| Command | Purpose |
|---|---|
| `docker ps` | List running containers |
| `docker logs clickup-mcp` | View MCP server logs |
| `docker restart clickup-mcp` | Restart MCP container |
| `docker-compose up -d` | Start containers in background |
| `docker-compose down` | Stop and remove containers |
| `docker-compose up -d --build` | Rebuild and start containers |

---

### Quick Start Checklist

- [ ] Node.js >= 22.0.0 installed (`node --version`)
- [ ] ClickUp API token created (Settings → Apps → API Token)
- [ ] Team ID retrieved (Settings → Workspaces)
- [ ] CLI installed (`npm install -g @krodak/clickup-cli`)
- [ ] CLI configured (`cu init` with API token + Team ID)
- [ ] CLI verified (`cu auth` succeeds, `cu tasks` returns data)
- [ ] `.env` configured with `clickup_CLICKUP_API_KEY` and `clickup_CLICKUP_TEAM_ID`
- [ ] MCP verification: `search_tools({ task_description: "clickup" })` returns 46 tools
- [ ] MCP client configured (Claude Desktop / OpenCode / VS Code Copilot)
- [ ] MCP client restarted after configuration changes
- [ ] Test operation: `cu sprint` (CLI) + workspace discovery (MCP)
- [ ] Docker container running (if using Docker MCP setup)

---

## Ready to Go!

Your ClickUp Agent is now configured. Start managing tasks, sprints, documents, and more through AI-powered natural language!

**Quick Test:**
1. Run `cu summary` to generate a standup report
2. Ask your AI: "Show me my tasks" or "Create a sprint task for review"
3. Use `$bulk` for batch task creation via MCP
4. Use `$docs` for document and wiki management via MCP

Enjoy AI-powered ClickUp project management! 🚀
