# ClickUp - Integrations - CLI Knowledge - v0.100

Comprehensive CLI command reference for all 30+ ClickUp CLI (`cu`) commands with flags, output modes, and usage patterns for efficient terminal-based task management.

**Loading Condition:** ON-DEMAND
**Purpose:** Complete CLI command reference documenting all 30+ ClickUp CLI commands for read and write operations, covering installation, output modes, flag specifications, configuration, PATH troubleshooting, and CLI limitations for AI agent usage.
**Scope:** All ClickUp CLI read commands (task discovery, task details, workspace navigation), write commands (task CRUD, comments, assignment, dependencies, custom fields, tags), output mode selection (TTY, piped Markdown, JSON), configuration management, PATH resolution, and combined CLI+MCP workflow patterns.

---

## 1. OVERVIEW

### CLI Details

The ClickUp CLI (`cu`) by `@krodak/clickup-cli` provides 30+ terminal commands for task management, workspace navigation, and sprint tracking. It outputs Markdown tables in piped mode (ideal for AI agents) and provides interactive TTY picker UI for human use.

**Key Information:**
- **Package:** `@krodak/clickup-cli` (npm)
- **Command:** `cu`
- **Commands Available:** 30+
- **Node Requirement:** Node.js >= 22.0.0
- **Output:** Markdown tables (piped), JSON (with `--json`), Interactive picker (TTY)
- **Core Principle:** CLI for speed and single operations; MCP for bulk, enterprise, and document workflows.

### System Architecture

**Operation Sequence:**
1. **Installation** — `npm install -g @krodak/clickup-cli`
2. **Initialization** — `cu init` (interactive setup for API token and team ID)
3. **Verification** — `cu auth` to confirm connectivity
4. **Command Execution** — Run read or write commands
5. **Output Parsing** — Parse Markdown tables or JSON output

### Scope: CLI vs MCP

```yaml
cli_capabilities:
  task_management:
    - "Create, read, update, delete tasks"
    - "Assign tasks to users"
    - "Manage task dependencies"
    - "Move tasks between lists"
    - "Set custom field values"
    - "Add/remove tags"
    - "Comment on tasks"
  
  workspace_navigation:
    - "List spaces and lists"
    - "Search tasks across workspace"
    - "View sprint summaries"
    - "View task activity and comments"
  
  output_formats:
    - "Markdown tables (piped mode)"
    - "JSON (--json flag)"
    - "Interactive TTY picker (terminal mode)"

mcp_only_capabilities:
  - "Documents (create, edit, list)"
  - "Goals and Key Results"
  - "Webhooks management"
  - "Time tracking (start/stop/log)"
  - "Bulk task operations (create/update 5+)"
  - "Chat channels and messages"
  - "Views management"
  - "User groups and guests"
  - "Audit logs (Enterprise)"
  - "Checklists management"
  - "File attachments"
```

---

## 2. INSTALLATION & VERIFICATION

### Installation

```bash
# Global install (recommended)
npm install -g @krodak/clickup-cli

# Verify installation
cu --version
```

### Initial Setup

```bash
# Interactive setup - prompts for API token and team ID
cu init

# Verify authentication
cu auth
```

**Setup Steps:**
1. `cu init` — Interactive prompts for API token and default team
2. `cu auth` — Verify the connection succeeds
3. `cu spaces` — Confirm workspace data is accessible

### Verification Commands

```bash
# Check authentication status
cu auth
# Output: ✅ Authenticated as [user] on [team]

# View current config
cu config get apiToken
cu config get teamId

# Show config file path
cu config path
```

---

## 3. OUTPUT MODES

| Mode | When | Format | Override |
|------|------|--------|----------|
| **TTY (terminal)** | Interactive human use | Picker UI with fuzzy search | N/A |
| **Piped / non-TTY** | AI agent / scripts | Markdown tables | `--json` for raw JSON |
| **JSON** | Structured parsing | Machine-readable JSON | `--json` flag |

### Environment Override

```bash
# Force JSON output even when piped
export CU_OUTPUT=json
cu tasks

# All commands support --help
cu tasks --help
```

### Piped Output Format (Markdown Tables)

When output is piped (non-TTY), `cu` produces clean Markdown tables:

```markdown
| ID      | Name              | Status      | Priority |
|---------|-------------------|-------------|----------|
| abc123  | Fix login bug     | In Progress | High     |
| def456  | Update API docs   | Open        | Normal   |
```

This Markdown table format is ideal for AI agents — easily parseable and human readable.

### JSON Output

```bash
# Get raw JSON for scripting
cu tasks --json

# JSON output includes full task objects
cu task abc123 --json | jq '.name, .status, .assignees'
```

---

## 4. DISCOVERY COMMANDS

### Workspace Navigation

| Command | Purpose | Output |
|---------|---------|--------|
| `cu spaces` | List all spaces in workspace | Space list with IDs |
| `cu lists <spaceId>` | Lists in a space | Lists with IDs and task counts |
| `cu auth` | Verify authentication | Connection status |

```bash
# Discover workspace structure
cu spaces
# Output: Markdown table of spaces with IDs

# Explore space contents
cu lists abc123
# Output: Markdown table of lists in the space

# Confirm you're connected
cu auth
# Output: ✅ Authenticated as [user]
```

---

## 5. READ OPERATIONS

### Task Discovery (8 commands)

| Command | Purpose | Example |
|---------|---------|---------|
| `cu tasks` | My open tasks | Default scoped to current user |
| `cu assigned` | Tasks assigned to me | Same as tasks but explicit |
| `cu sprint` | Current sprint tasks | Shows active sprint items |
| `cu sprints` | All sprints | List all sprints with dates |
| `cu summary` | Sprint standup summary | Ready-made standup format |
| `cu search <query>` | Search tasks by text | Workspace-wide full-text search |
| `cu overdue` | Overdue tasks | Tasks past due date |
| `cu inbox` | Notifications | Unread notifications |

```bash
# Daily standup - get full sprint picture
cu summary

# Current sprint overview
cu sprint

# Overdue items needing attention
cu overdue

# Search for specific topics
cu search "login feature"

# Browse all open tasks
cu tasks
```

### Task Details (5 commands)

| Command | Purpose | Example |
|---------|---------|---------|
| `cu task <id>` | Task details | Full task information |
| `cu subtasks <id>` | Task subtasks | Child task list |
| `cu comments <id>` | Task comments | Comment thread |
| `cu activity <id>` | Task activity log | Change history |
| `cu open <query>` | Open task in browser | Opens ClickUp web UI |

```bash
# Get full task details
cu task abc123def

# View subtasks
cu subtasks abc123def

# Read comment thread
cu comments abc123def

# See change history
cu activity abc123def

# Open in browser (great for visual review)
cu open abc123def
```

### Combined Standup Report

```bash
# Generate a complete standup report
echo "## Standup Report - $(date +%Y-%m-%d)"
echo ""
echo "### Sprint Status"
cu sprint
echo ""
echo "### My Tasks"
cu tasks
echo ""
echo "### Overdue Items"
cu overdue
```

---

## 6. WRITE OPERATIONS

### Task Creation

```bash
cu create -n "Task name" -l <listId> [options]
```

| Flag | Required | Description | Example |
|------|----------|-------------|---------|
| `-n` / `--name` | Yes | Task name | `-n "Fix login bug"` |
| `-l` / `--list` | Yes | Target list ID | `-l abc123` |
| `-d` / `--desc` | No | Description | `-d "Detailed description"` |
| `-s` / `--status` | No | Initial status | `-s "to do"` |
| `--priority` | No | Priority (name or 1-4) | `--priority high` or `--priority 2` |
| `--due-date` | No | Due date (YYYY-MM-DD) | `--due-date 2026-04-15` |
| `--assignee` | No | Assign to user | `--assignee me` |
| `--tags` | No | Tags (comma-separated) | `--tags "bug,frontend"` |
| `--custom-item-id` | No | Custom item type | `--custom-item-id 5` |

```bash
# Create a task with full details
cu create -n "Implement user auth" -l abc123 \
  --priority high \
  --assignee me \
  --tags "feature,backend" \
  --due-date 2026-04-15 \
  --desc "Build OAuth2 login with Google and GitHub providers"
```

### Task Update

```bash
cu update <id> [options]
```

| Flag | Description | Example |
|------|-------------|---------|
| `--name` | New name | `--name "Updated name"` |
| `--description` | New description | `--description "New desc"` |
| `--status` | New status (fuzzy matched) | `--status "in progress"` |
| `--priority` | Priority (name or 1-4) | `--priority urgent` |
| `--due-date` | Due date | `--due-date 2026-04-15` |
| `--time-estimate` | Time estimate | `--time-estimate "2h30m"` |
| `--assignee` | Assign user | `--assignee me` |
| `--parent` | Set parent task | `--parent parentId` |

**Status matching:** Fuzzy (exact > starts-with > contains). Example: `--status "prog"` matches "in progress".

**Priority values:** `urgent` (1), `high` (2), `normal` (3), `low` (4), or use numbers directly.

**Time estimate formats:** `"2h"`, `"30m"`, `"1h30m"`, or milliseconds.

```bash
# Update task status
cu update abc123 --status "in progress"

# Assign to yourself
cu update abc123 --assignee me

# Update multiple fields at once
cu update abc123 \
  --status "in review" \
  --priority urgent \
  --time-estimate "4h"
```

### Comments

```bash
cu comment <taskId> -m "Comment text"
```

```bash
# Add a comment to a task
cu comment abc123 -m "PR #42 addresses this issue. Ready for review."
```

### Assignment

```bash
cu assign <taskId> --to userId|me --remove userId|me
```

```bash
# Assign task to yourself
cu assign abc123 --to me

# Remove assignment
cu assign abc123 --remove me
```

### Dependencies

```bash
cu depend <taskId> --on <otherId>       # Task depends on other
cu depend <taskId> --blocks <otherId>   # Task blocks other
cu depend <taskId> --remove             # Remove dependency
```

```bash
# Set "login API" depends on "auth service"
cu depend api456 --on auth789

# Set "database migration" blocks "deployment"
cu depend db123 --blocks deploy456

# Remove a dependency
cu depend api456 --remove
```

### Move / Multi-List

```bash
cu move <taskId> --to <listId>          # Move to list
cu move <taskId> --remove <listId>      # Remove from list
```

```bash
# Move task to next sprint
cu move abc123 --to sprint13list

# Remove from a secondary list
cu move abc123 --remove oldlist
```

### Custom Fields

```bash
cu field <taskId> --set "Field Name" value
cu field <taskId> --remove "Field Name"
```

**Supported types:** text, number, checkbox, dropdown, date, url, email.

```bash
# Set story points
cu field abc123 --set "Story Points" 5

# Set a date field
cu field abc123 --set "Target Date" 2026-04-15

# Remove a field value
cu field abc123 --remove "Old Label"
```

### Tags

```bash
cu tag <taskId> --add "bug,frontend"
cu tag <taskId> --remove "bug"
```

```bash
# Add multiple tags
cu tag abc123 --add "bug,frontend,urgent"

# Remove a tag
cu tag abc123 --remove "urgent"
```

### Delete

```bash
cu delete <taskId> --confirm
```

**⚠️ Warning:** Irreversible. Always requires `--confirm` flag. No undo.

```bash
# Delete a task (requires --confirm)
cu delete abc123 --confirm
```

---

## 7. COMMAND FLAG REFERENCE

### Universal Flags

| Flag | Applies To | Description |
|------|-----------|-------------|
| `--help` | All commands | Show usage information |
| `--json` | Read commands | Output raw JSON instead of Markdown |
| `--confirm` | `delete` | Required for destructive operations |

### Create Flags

| Flag | Type | Valid Values |
|------|------|-------------|
| `-n` / `--name` | string | Any text |
| `-l` / `--list` | string | List ID |
| `-d` / `--desc` | string | Any text |
| `-s` / `--status` | string | Status name (fuzzy matched) |
| `--priority` | string/number | `urgent`(1), `high`(2), `normal`(3), `low`(4) |
| `--due-date` | string | YYYY-MM-DD format |
| `--assignee` | string | User ID or `me` |
| `--tags` | string | Comma-separated tag names |
| `--custom-item-id` | number | Custom item type ID |

### Update Flags

| Flag | Type | Valid Values |
|------|------|-------------|
| `--name` | string | Any text |
| `--description` | string | Any text |
| `--status` | string | Status name (fuzzy matched) |
| `--priority` | string/number | `urgent`(1), `high`(2), `normal`(3), `low`(4) |
| `--due-date` | string | YYYY-MM-DD format |
| `--time-estimate` | string | `"2h"`, `"30m"`, `"1h30m"`, or ms |
| `--assignee` | string | User ID or `me` |
| `--parent` | string | Parent task ID |

### Config Keys

| Key | Description |
|-----|-------------|
| `apiToken` | ClickUp API token |
| `teamId` | Default team/workspace ID |

---

## 8. CONFIGURATION

### Config File Location

```bash
# Show config file path
cu config path
# Typical: ~/.config/clickup-cli/config.json or similar
```

### Viewing Configuration

```bash
# View specific values
cu config get apiToken
cu config get teamId

# List all config
cu config list
```

### Setting Configuration

```bash
# Set API token
cu config set apiToken "pk_1234567890"

# Set default team
cu config set teamId "12345678"

# Interactive re-initialization
cu init
```

### Environment Variables

```bash
# Override API token (takes precedence over config file)
export CLICKUP_API_TOKEN="pk_1234567890"

# Override team ID
export CLICKUP_TEAM_ID="12345678"

# Force JSON output
export CU_OUTPUT=json
```

### Token Management

```bash
# Generate a new token:
# 1. Go to https://app.clickup.com/settings/apps
# 2. Click "Generate" under API Token
# 3. Copy the token
# 4. Set it: cu config set apiToken "pk_..."

# Verify it works
cu auth
```

---

## 9. PATH TROUBLESHOOTING

### The "System cu" Problem

On some systems, `cu` may conflict with the Unix `cu` (Call Up) command used for terminal connections.

**Symptom:** Running `cu` opens a connection prompt instead of ClickUp CLI.

**Resolution:**

```bash
# 1. Check which binary is being used
which cu
# If it shows /usr/bin/cu or /usr/sbin/cu, that's the Unix tool

# 2. Find the npm global path
npm list -g --depth=0
# Look for @krodak/clickup-cli

# 3. Ensure npm global bin is FIRST in PATH
export PATH="$(npm config get prefix)/bin:$PATH"

# 4. Verify again
which cu
# Should now show: /Users/[user]/.nvm/versions/node/v22.x.x/bin/cu

# 5. Add to shell profile for persistence
echo 'export PATH="$(npm config get prefix)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### PATH Precedence Order

```yaml
path_resolution:
  priority_order:
    1: "npm global bin directory (override with PATH)"
    2: "Local node_modules/.bin (if installed locally)"
    3: "System binaries (/usr/bin/cu - Unix tool, avoid)"
  
  verification:
    - "cu --version should show @krodak/clickup-cli version"
    - "cu auth should succeed with configured token"
```

### Common PATH Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| `cu: command not found` | npm global bin not in PATH | Add to PATH |
| Opens connection prompt | System `cu` found first | Reorder PATH |
| Permission denied | npm global directory permissions | Use nvm or fix npm perms |
| `cu --version` fails | Wrong binary | Check `which cu` |

---

## 10. CLI LIMITATIONS

### What CLI CANNOT Do

These operations are **MCP-only** — not available via CLI:

| Capability | Why MCP Only | MCP Tool |
|-----------|-------------|----------|
| **Documents** | No CLI command for docs | `create_document`, `get_document`, etc. |
| **Goals / OKRs** | No goal management in CLI | `manage_goals` |
| **Webhooks** | No webhook management | `manage_webhooks` |
| **Time Tracking** | No timer or entry logging | `manage_time_entries` |
| **Bulk Operations** | Single task only in CLI | `create_bulk_tasks`, `update_bulk_tasks` |
| **Chat** | No chat in CLI | `manage_chat_channels`, `manage_chat_messages` |
| **Views** | No view management | `manage_views` |
| **Checklists** | No checklist management | `manage_checklists` |
| **File Attachments** | No file handling | `manage_attachments` |
| **User Groups** | No user group management | `manage_user_groups` |
| **Guests** | No guest management | `manage_guests` |
| **Audit Logs** | No audit log access | `get_audit_logs` |

### When CLI Falls Short

```yaml
cli_limitations_routing:
  bulk_task_creation:
    problem: "Creating 10+ tasks individually is slow"
    solution: "Use MCP create_bulk_tasks instead"
    
  document_workflows:
    problem: "No document creation or editing"
    solution: "Use MCP create_document for ADRs, retrospectives, docs"
    
  time_tracking:
    problem: "No timer or manual entry"
    solution: "Use MCP manage_time_entries for all time operations"
    
  complex_field_management:
    problem: "CLI field command supports basic types only"
    solution: "Use MCP manage_custom_fields for full CRUD with all field types"
```

---

## 11. COMBINED CLI+MCP PATTERNS

### Decision Guide: When to Use What

| Scenario | Use | Why |
|----------|-----|-----|
| Create single task | **CLI** | `cu create` is fastest |
| Create 5+ tasks | **MCP** | `create_bulk_tasks` in one call |
| Sprint standup | **CLI** | `cu summary` is CLI-only |
| Search tasks | **CLI** | `cu search` with Markdown output |
| Create document | **MCP** | Documents are MCP-only |
| Track time | **MCP** | Time tracking is MCP-only |
| Set goals | **MCP** | Goals are MCP-only |
| Manage webhooks | **MCP** | Webhooks are MCP-only |
| Chat / messages | **MCP** | Chat is MCP-only |
| Custom field CRUD | **MCP** | CLI has basic set/remove only |
| Workspace hierarchy | **Either** | CLI: `cu spaces` / MCP: `get_workspace` |
| Task update | **CLI** | `cu update` is faster |

### Hybrid Workflow Pattern

```bash
# 1. Use CLI for quick workspace discovery
SPACE_ID=$(cu spaces --json | jq -r '.[] | select(.name=="Engineering") | .id')
LIST_ID=$(cu lists "$SPACE_ID" --json | jq -r '.[] | select(.name=="Sprint 12") | .id')

# 2. Use MCP for bulk creation (in Code Mode)
# call_tool_chain with clickup.clickup_create_bulk_tasks

# 3. Use CLI to verify
cu lists "$SPACE_ID"  # Confirm new tasks appear
cu sprint             # Verify sprint composition
```

---

## 12. ERROR HANDLING

### Error Patterns

```yaml
error_patterns:
  exit_codes:
    success: 0
    failure: 1
    
  output_streams:
    stdout: "Command output (Markdown tables or JSON)"
    stderr: "Error messages"
    
  common_errors:
    authentication:
      cause: "Invalid API token"
      fix: "cu config set apiToken 'pk_...' or cu init"
      
    task_not_found:
      cause: "Task ID doesn't exist or isn't accessible"
      fix: "Use cu search to find the task first"
      
    list_not_found:
      cause: "List ID doesn't exist"
      fix: "Use cu spaces and cu lists to discover correct IDs"
      
    missing_confirm:
      cause: "Delete command used without --confirm"
      fix: "Add --confirm flag to acknowledge irreversibility"
```

### Script Error Handling

```bash
# Check if command succeeded
if cu task abc123 > /dev/null 2>&1; then
  echo "Task exists"
else
  echo "Task not found"
fi

# Capture output with error handling
result=$(cu tasks --json 2>&1) || echo "Failed: $result"

# Pipe with error awareness
cu tasks 2>/dev/null | grep "in progress" || echo "No in-progress tasks"
```

### JSON Error Details

```bash
# JSON output mode includes error info in structured format
cu task nonexistent --json 2>&1
# Returns JSON with error code and message
```

---

## 13. QUICK REFERENCE

### Command Cheat Sheet

```yaml
read_commands:
  discovery:
    - "cu spaces                     # List all spaces"
    - "cu lists <spaceId>            # Lists in a space"
    - "cu auth                       # Verify connection"
    
  task_view:
    - "cu tasks                      # My open tasks"
    - "cu sprint                     # Current sprint"
    - "cu summary                    # Standup summary"
    - "cu search <query>             # Search tasks"
    - "cu overdue                    # Overdue tasks"
    - "cu inbox                      # Notifications"
    
  task_details:
    - "cu task <id>                  # Full task info"
    - "cu subtasks <id>              # Child tasks"
    - "cu comments <id>              # Comment thread"
    - "cu activity <id>              # Change history"
    - "cu open <id>                  # Open in browser"

write_commands:
  task_management:
    - "cu create -n '...' -l <id>    # Create task"
    - "cu update <id> --status '...'  # Update task"
    - "cu delete <id> --confirm       # Delete task"
    
  collaboration:
    - "cu comment <id> -m '...'      # Add comment"
    - "cu assign <id> --to me        # Assign task"
    
  structure:
    - "cu depend <id> --on <id>      # Add dependency"
    - "cu move <id> --to <id>        # Move task"
    
  data:
    - "cu field <id> --set '...' val # Set custom field"
    - "cu tag <id> --add '...'       # Add tags"

configuration:
  - "cu init                        # Interactive setup"
  - "cu config get <key>            # Read config"
  - "cu config set <key> <val>      # Set config"
  - "cu config path                 # Config file location"
```

### Output Format Quick Select

```yaml
output_selection:
  for_ai_agents:
    default: "Markdown tables (piped output)"
    structured: "--json flag"
    
  for_humans:
    interactive: "TTY picker UI"
    readable: "Just run commands in terminal"
    
  for_scripts:
    recommended: "--json | jq [filter]"
    fallback: "Markdown table parsing"
```

### Related Resources

- [SKILL.md](../SKILL.md) — Main skill instructions
- [ClickUp - Integrations - MCP Knowledge - v0.100.md](./ClickUp%20-%20Integrations%20-%20MCP%20Knowledge%20-%20v0.100.md) — MCP tool reference
- [ClickUp - Reference - Combined Workflows - v0.100.md](../reference/ClickUp%20-%20Reference%20-%20Combined%20Workflows%20-%20v0.100.md) — Combined CLI+MCP workflows
- [cli_reference.md](../../references/cli_reference.md) — Source CLI reference
