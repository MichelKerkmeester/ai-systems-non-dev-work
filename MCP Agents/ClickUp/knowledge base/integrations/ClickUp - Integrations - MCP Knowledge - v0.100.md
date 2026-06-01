# ClickUp - Integrations - MCP Knowledge - v0.100

Comprehensive technical reference for all 46 ClickUp MCP tools with invocation patterns, parameters, and priority categorization.

**Loading Condition:** ON-DEMAND
**Purpose:** Complete MCP tool reference documenting all 46 ClickUp tools accessible via Code Mode, with TypeScript invocation examples, parameter specifications, error handling patterns, and priority-based categorization for efficient AI agent usage.
**Scope:** All 46 ClickUp MCP tools organized by functional category — task management (20), documents (7), chat (2), time tracking (1), goals (1), views (1), webhooks (1), workspace structure (4), tags (3), checklists (1), custom fields (1), templates (2), attachments (1), user groups (1), guests (1), audit logs (1), feedback (1). Includes naming conventions, connection prerequisites, Code Mode invocation patterns, error handling, and priority categorization adapted from tool_categories.md.

## TABLE OF CONTENTS

  - 1. 🔌 SERVER OVERVIEW
  - 2. 📋 TASK MANAGEMENT (20 tools)
  - 3. ✅ TASK CHECKLISTS (1 tool)
  - 4. 🏷️ CUSTOM FIELDS (1 tool)
  - 5. ⏱️ TIME TRACKING (1 tool)
  - 6. 🏗️ WORKSPACE STRUCTURE (4 tools)
  - 7. 🔖 TAGS (3 tools)
  - 8. 🎯 GOALS (1 tool)
  - 9. 👁️ VIEWS (1 tool)
  - 10. 📄 DOCUMENTS (7 tools)
  - 11. 🔗 WEBHOOKS (1 tool)
  - 12. 💬 CHAT (2 tools)
  - 13. 📋 TEMPLATES (2 tools)
  - 14. 👥 USER GROUPS (1 tool)
  - 15. 👤 GUESTS (1 tool, Enterprise)
  - 16. 📊 AUDIT LOGS (1 tool, Enterprise)
  - 17. 📝 FEEDBACK (1 tool)
  - 18. ⭐ PRIORITY CATEGORIZATION
  - 19. 🚨 ERROR HANDLING
  - 20. 🏎️ QUICK REFERENCE

---

## 1. 🔌 SERVER OVERVIEW

### MCP Server Details

The ClickUp MCP server provides native integration with the ClickUp API v2 for task management, document creation, time tracking, goal setting, and workspace administration. All 46 tools are accessed via Code Mode with the naming convention `clickup.clickup_{tool_name}`.

**Key Information:**
- **Repository:** https://github.com/clickup/clickup-mcp-server
- **Protocol:** Model Context Protocol (MCP)
- **Authentication:** API token via `CLICKUP_API_KEY` environment variable
- **Team Context:** `CLICKUP_TEAM_ID` environment variable
- **Naming Convention:** `clickup.clickup_{tool_name}` (all lowercase, underscores)
- **Invocation:** Via Code Mode `call_tool_chain()` TypeScript execution

**Code Mode Prefixed Environment Variables:**

All ClickUp configuration uses the `clickup_` prefix within Code Mode:
- `clickup_CLICKUP_API_KEY` — Personal API token
- `clickup_CLICKUP_TEAM_ID` — Team/workspace identifier

### System Architecture

**Operation Sequence:**
1. **Connection Check** (ALWAYS FIRST) — Verify MCP server is active via `search_tools({ task_description: "clickup" })`
2. **Tool Discovery** — List available tools or search by category
3. **User Request** — Receive and parse user intent
4. **Intent Recognition** — Determine tool category needed (task, document, time, goal, etc.)
5. **Tool Selection** — Choose appropriate tool by priority and category
6. **Native Execution** — Invoke via `call_tool_chain()` with TypeScript
7. **Feedback & Confirmation** — Return results to user

### Tool Naming Convention

**Full format:** `clickup.clickup_{tool_name}`

All 46 tools follow this pattern. Examples:
- `clickup.clickup_create_task`
- `clickup.clickup_search_tasks`
- `clickup.clickup_manage_comments`
- `clickup.clickup_get_workspace`

**Discovery:** Use `search_tools({ task_description: "clickup" })` to list all available tools, or `code_mode_list_tools()` for the complete registry.

### Connection Verification

Connection verification must be the **first action before all operations**. Use tool discovery to verify connectivity and available tools.

```typescript
call_tool_chain({
  code: `
    // Verify ClickUp MCP tools are available
    const tools = await code_mode_search_tools({
      task_description: "clickup"
    });
    console.log("ClickUp tools available:", tools.length);
    
    // Quick auth test - list spaces
    const spaces = await clickup.clickup_manage_spaces({
      action: "list"
    });
    console.log("Connected. Spaces:", spaces.length);
    
    return { connected: true, tools: tools.length };
  `
});
```

**Status Messages:**
- ✅ **Connected:** "ClickUp MCP Connected — All 46 tools available"
- ❌ **Disconnected:** "ClickUp MCP Not Connected — Check Code Mode configuration"
- ⚠️ **Auth Failed:** "Authentication Issue — Verify clickup_CLICKUP_API_KEY"
- ⚠️ **Missing Team:** "Team ID Required — Set clickup_CLICKUP_TEAM_ID"

---

## 2. 📋 TASK MANAGEMENT (20 tools)

### Core Task Operations (8 tools)

| Tool | Purpose | Priority | Key Parameters |
|------|---------|----------|----------------|
| `create_task` | Create a task | HIGH | `listName`/`listId`, `name`, `description?`, `status?`, `priority?`, `assignees?`, `dueDate?`, `tags?` |
| `create_bulk_tasks` | Create multiple tasks | HIGH | `listName`/`listId`, `tasks[]` (array of task objects) |
| `get_task` | Get task details | HIGH | `task` (name or ID, fuzzy matched) |
| `update_task` | Update task fields | HIGH | `task`, `name?`, `description?`, `status?`, `priority?`, `dueDate?`, `assignees?` |
| `update_bulk_tasks` | Update multiple tasks | MEDIUM | `tasks[]` (array with task identifiers and updates) |
| `delete_task` | Delete a task | HIGH | `task` (ID or name). **Irreversible.** |
| `move_task` | Move task to list | MEDIUM | `task`, `listId`/`listName` |
| `search_tasks` | Search workspace tasks | HIGH | `query`, filters (status, priority, assignees, etc.) |

**Priority values:** `urgent` (1), `high` (2), `normal` (3), `low` (4), or use numbers directly.

```typescript
// Create a single task
call_tool_chain({
  code: `
    const task = await clickup.clickup_create_task({
      listName: "Sprint Backlog",
      name: "Implement OAuth2 login flow",
      description: "Build OAuth2 authentication with Google and GitHub providers",
      priority: 2,
      assignees: ["dev@team.com"],
      dueDate: "2026-04-15",
      tags: ["feature", "backend"]
    });
    console.log("Created:", task.id, task.name);
    return task;
  `
});

// Bulk create tasks for sprint planning
call_tool_chain({
  code: `
    const tasks = await clickup.clickup_create_bulk_tasks({
      listName: "Sprint 12",
      tasks: [
        { name: "Design login page", priority: 2, assignees: ["designer@team.com"] },
        { name: "Build login API endpoint", priority: 2, assignees: ["dev@team.com"] },
        { name: "Write login integration tests", priority: 3, assignees: ["qa@team.com"] },
        { name: "Deploy login feature to staging", priority: 1, assignees: ["devops@team.com"] }
      ]
    });
    console.log("Created", tasks.length, "tasks for Sprint 12");
    return tasks;
  `
});

// Search tasks with filters
call_tool_chain({
  code: `
    const results = await clickup.clickup_search_tasks({
      query: "login",
      statuses: ["in progress", "review"],
      priority: 2
    });
    console.log("Found", results.length, "matching tasks");
    results.forEach(t => console.log(" -", t.id, t.name, t.status));
    return results;
  `
});

// Update task status and priority
call_tool_chain({
  code: `
    const updated = await clickup.clickup_update_task({
      task: "abc123def",
      status: "in review",
      priority: 1,
      description: "OAuth2 implementation complete. Ready for code review."
    });
    console.log("Updated:", updated.name, "→", updated.status);
    return updated;
  `
});
```

### Subtasks & Dependencies (7 tools)

| Tool | Purpose | Priority | Key Parameters |
|------|---------|----------|----------------|
| `create_subtask` | Create subtask | MEDIUM | `task` (parent), `name`, `description?`, `status?`, `priority?` |
| `get_subtasks` | Get task subtasks | MEDIUM | `task` (parent ID or name) |
| `create_dependency` | Create dependency | MEDIUM | `task`, `depends_on`/`blocks` |
| `get_dependency` | Get dependencies | LOW | `task` |
| `update_dependency` | Update dependency | LOW | `dependency_id`, fields |
| `delete_dependency` | Delete dependency | LOW | `dependency_id` |
| `link_tasks` | Link related tasks | MEDIUM | `task`, `linked_task` |

### Multi-List / TIML (2 tools)

| Tool | Purpose | Priority | Key Parameters |
|------|---------|----------|----------------|
| `add_task_to_list` | Add task to additional list | LOW | `task`, `listId`/`listName` |
| `remove_task_from_list` | Remove from list | LOW | `task`, `listId`/`listName` (must remain in at least one) |

### Comments & Attachments (2 tools)

| Tool | Purpose | Priority | Key Parameters |
|------|---------|----------|----------------|
| `manage_comments` | Comment lifecycle | HIGH | `action` (get/create/update/delete), `task`, `comment_text?`, `comment_id?` |
| `manage_attachments` | File attachments | MEDIUM | `action` (list/get/upload), `taskId`/`taskName`, `file_data?`/`file_url?` |

```typescript
// Manage comments
call_tool_chain({
  code: `
    // Create comment
    await clickup.clickup_manage_comments({
      action: "create",
      task: "abc123def",
      comment_text: "PR #42 addresses this. Ready for review."
    });
    
    // Get all comments
    const comments = await clickup.clickup_manage_comments({
      action: "get",
      task: "abc123def"
    });
    console.log("Comments:", comments.length);
    return comments;
  `
});
```

---

## 3. ✅ TASK CHECKLISTS (1 tool)

### `manage_checklists`

**Actions:** `create_checklist`, `edit_checklist`, `delete_checklist`, `create_item`, `edit_item`, `delete_item`

| Parameter | Type | Description |
|-----------|------|-------------|
| `action` | string | One of the 6 actions above |
| `task_id`/`task_name` | string | Target task |
| `checklist_id` | string | Checklist identifier |
| `name` | string | Checklist or item name |
| `resolved` | boolean | Item completion status |
| `parent` | string | Parent item ID for nesting |

```typescript
call_tool_chain({
  code: `
    // Create checklist with items
    const checklist = await clickup.clickup_manage_checklists({
      action: "create_checklist",
      task_name: "Deploy v2.0 to production",
      name: "Deployment Steps"
    });
    
    // Add items
    await clickup.clickup_manage_checklists({
      action: "create_item",
      checklist_id: checklist.id,
      name: "Run database migrations"
    });
    
    await clickup.clickup_manage_checklists({
      action: "create_item",
      checklist_id: checklist.id,
      name: "Update load balancer config"
    });
    
    return checklist;
  `
});
```

---

## 4. 🏷️ CUSTOM FIELDS (1 tool)

### `manage_custom_fields`

**Actions:** `list`, `create`, `set_value`, `remove_value`

**Supported field types:** short_text, number, drop_down, date, checkbox, users, email, url, currency, text, tasks, labels, phone, location, rating, progress, emoji, people

```typescript
call_tool_chain({
  code: `
    // Set custom field value
    await clickup.clickup_manage_custom_fields({
      action: "set_value",
      taskId: "abc123",
      fieldName: "Story Points",
      value: 5
    });
    
    // List all custom fields for a task
    const fields = await clickup.clickup_manage_custom_fields({
      action: "list",
      taskId: "abc123"
    });
    console.log("Custom fields:", fields);
    return fields;
  `
});
```

---

## 5. ⏱️ TIME TRACKING (1 tool)

### `manage_time_entries`

**Actions:** `get_entries`, `get_current`, `start_timer`, `stop_timer`, `add_entry`, `update_entry`, `delete_entry`, `get_history`, `get_tags`, `add_tags`, `update_tags`, `delete_tags`, `get_bulk_time_in_status`

```typescript
call_tool_chain({
  code: `
    // Start timer on a task
    await clickup.clickup_manage_time_entries({
      action: "start_timer",
      task: "abc123def"
    });
    console.log("Timer started on task abc123def");
    
    // Later: check current timer
    const current = await clickup.clickup_manage_time_entries({
      action: "get_current"
    });
    console.log("Currently running:", current);
    
    // Stop timer
    await clickup.clickup_manage_time_entries({
      action: "stop_timer"
    });
    console.log("Timer stopped");
    
    // Log manual time entry
    await clickup.clickup_manage_time_entries({
      action: "add_entry",
      task: "abc123def",
      duration: "1h 30m",
      description: "Code review and refactoring",
      billable: true,
      tags: ["code-review"]
    });
    console.log("Manual entry logged");
  `
});
```

---

## 6. 🏗️ WORKSPACE STRUCTURE (4 tools)

### `manage_lists`
**Actions:** `create`, `get`, `get_lists`, `update`, `delete`, `move`, `set_permissions`

### `manage_spaces`
**Actions:** `list`, `get`, `create`, `update`, `delete`, `set_permissions`

### `manage_folders`
**Actions:** `create`, `get`, `update`, `delete`, `move`, `set_permissions`

### `get_workspace`

| Parameter | Type | Description |
|-----------|------|-------------|
| `include_hierarchy` | boolean | Include spaces/folders/lists (default: true) |
| `include_members` | boolean | Include member list |
| `include_plan` | boolean | Include plan details |
| `search_member` | string | Search member by name/email |

```typescript
call_tool_chain({
  code: `
    // Get full workspace hierarchy with members
    const ws = await clickup.clickup_get_workspace({
      include_hierarchy: true,
      include_members: true
    });
    
    console.log("Workspace:", ws.name);
    ws.spaces?.forEach(space => {
      console.log("  Space:", space.name);
      space.folders?.forEach(folder => {
        console.log("    Folder:", folder.name);
        folder.lists?.forEach(list => {
          console.log("      List:", list.name, "(id:", list.id, ")");
        });
      });
      space.lists?.forEach(list => {
        console.log("    List:", list.name, "(id:", list.id, ")");
      });
    });
    
    return ws;
  `
});

// Create a new space
call_tool_chain({
  code: `
    const space = await clickup.clickup_manage_spaces({
      action: "create",
      name: "Engineering",
      features: { time_tracking: true, tags: true }
    });
    console.log("Created space:", space.name, space.id);
    return space;
  `
});
```

---

## 7. 🔖 TAGS (3 tools)

| Tool | Purpose | Priority | Key Parameters |
|------|---------|----------|----------------|
| `manage_space_tags` | Space-level tag CRUD | MEDIUM | `action` (list/create/update/delete), `spaceName`, `tagName` |
| `add_tag_to_task` | Add tag to task | MEDIUM | `tagName`, `taskId`/`taskName` |
| `remove_tag_from_task` | Remove tag from task | MEDIUM | `tagName`, `taskId`/`taskName` |

```typescript
call_tool_chain({
  code: `
    // Create a space tag
    await clickup.clickup_manage_space_tags({
      action: "create",
      spaceName: "Engineering",
      tagName: "urgent"
    });
    
    // Tag a task
    await clickup.clickup_add_tag_to_task({
      tagName: "urgent",
      taskName: "Fix login bug"
    });
    
    // List all space tags
    const tags = await clickup.clickup_manage_space_tags({
      action: "list",
      spaceName: "Engineering"
    });
    console.log("Space tags:", tags);
    return tags;
  `
});
```

---

## 8. 🎯 GOALS (1 tool)

### `manage_goals`

**Actions:** `list`, `get`, `create`, `update`, `delete`, `create_key_result`, `update_key_result`, `delete_key_result`

**Key result types:** `number`, `percentage`, `automatic`, `boolean`, `currency`

```typescript
call_tool_chain({
  code: `
    // Create a quarterly goal
    const goal = await clickup.clickup_manage_goals({
      action: "create",
      name: "Q2 2026 - Ship v2.0",
      dueDate: "2026-06-30",
      color: "#7B68EE"
    });
    console.log("Created goal:", goal.id, goal.name);
    
    // Add key results
    await clickup.clickup_manage_goals({
      action: "create_key_result",
      goalId: goal.id,
      name: "Complete all v2 features",
      type: "percentage",
      stepsStart: 0,
      stepsEnd: 100
    });
    
    await clickup.clickup_manage_goals({
      action: "create_key_result",
      goalId: goal.id,
      name: "Test coverage above 80%",
      type: "number",
      stepsStart: 0,
      stepsEnd: 80,
      unit: "%"
    });
    
    console.log("Key results added to goal");
    return goal;
  `
});
```

---

## 9. 👁️ VIEWS (1 tool)

### `manage_views`

**Actions:** `list`, `get`, `create`, `update`, `delete`, `get_tasks`

**View types:** `list`, `board`, `calendar`, `gantt`, `timeline`, `table`, `mind_map`, `workload`, `activity`, `map`

```typescript
call_tool_chain({
  code: `
    // Create a sprint board view
    const view = await clickup.clickup_manage_views({
      action: "create",
      spaceId: "space_id",
      name: "Sprint Board",
      type: "board"
    });
    console.log("Created view:", view.name, view.id);
    
    // List all views in a space
    const views = await clickup.clickup_manage_views({
      action: "list",
      spaceId: "space_id"
    });
    console.log("Total views:", views.length);
    return views;
  `
});
```

---

## 10. 📄 DOCUMENTS (7 tools)

| Tool | Purpose | Priority | Key Parameters |
|------|---------|----------|----------------|
| `create_document` | Create document | MEDIUM | `parent`, `name`, `content?`, `content_format?`, `visibility?` |
| `get_document` | Get document | LOW | `documentId`/`documentName` |
| `list_documents` | List documents | LOW | `parent` |
| `list_document_pages` | List pages | LOW | `documentId` |
| `get_document_pages` | Get page content | LOW | `documentId`, `pageIds` |
| `create_document_page` | Create page | LOW | `documentId`, `name`, `content` |
| `update_document_page` | Update page | LOW | `documentId`, `pageId`, `content`, `content_edit_mode?` |

**Parent types:** 4=Space, 5=Folder, 6=List, 7=All, 12=Workspace
**Content formats:** `text/md` (default), `text/html`, `text/plain`
**Edit modes:** `replace` (default), `append`, `prepend`

```typescript
call_tool_chain({
  code: `
    // Create a markdown document for architecture decisions
    const doc = await clickup.clickup_create_document({
      parent: { id: "space_id", type: 4 },
      name: "ADR-001: Database Selection",
      visibility: "PUBLIC",
      content: "## Status\\n\\nProposed\\n\\n## Context\\n\\nWe need to select a database for the new service.",
      content_format: "text/md"
    });
    console.log("Created document:", doc.id, doc.name);
    
    // Add a page to the document
    const page = await clickup.clickup_create_document_page({
      documentId: doc.id,
      name: "Research Notes",
      content: "## Candidate Databases\\n\\n- PostgreSQL\\n- MongoDB\\n- CockroachDB"
    });
    console.log("Created page:", page.id);
    
    // List all documents in a space
    const docs = await clickup.clickup_list_documents({
      parent: { id: "space_id", type: 4 }
    });
    console.log("Documents in space:", docs.length);
    return docs;
  `
});
```

---

## 11. 🔗 WEBHOOKS (1 tool)

### `manage_webhooks`

**Actions:** `list`, `create`, `update`, `delete`

**Event types:** `taskCreated`, `taskUpdated`, `taskDeleted`, `taskStatusUpdated`, `taskPriorityUpdated`, `taskAssigneeUpdated`, `taskDueDateUpdated`, `taskCommentPosted`, `listCreated`, `listUpdated`, `folderCreated`, `spaceCreated`, `goalCreated`, and more. Use `["*"]` for all events.

```typescript
call_tool_chain({
  code: `
    const webhook = await clickup.clickup_manage_webhooks({
      action: "create",
      endpoint: "https://hooks.example.com/clickup",
      events: ["taskCreated", "taskStatusUpdated", "taskCommentPosted"],
      space_id: "space_id"
    });
    console.log("Webhook created:", webhook.id);
    return webhook;
  `
});
```

---

## 12. 💬 CHAT (2 tools)

### `manage_chat_channels`
**Actions:** `list`, `get`, `create`, `update`, `delete`, `get_members`, `get_followers`, `create_dm`

### `manage_chat_messages`
**Actions:** `get`, `create`, `update`, `delete`, `get_replies`, `create_reply`, `add_reaction`, `remove_reaction`, `get_reactions`, `get_tagged_users`

```typescript
call_tool_chain({
  code: `
    // Send a message to the engineering channel
    const msg = await clickup.clickup_manage_chat_messages({
      action: "create",
      channel_name: "engineering",
      content: "Sprint 12 has been deployed to production! 🚀",
      notify_all: true
    });
    console.log("Message sent:", msg.id);
    
    // List all channels
    const channels = await clickup.clickup_manage_chat_channels({
      action: "list"
    });
    console.log("Chat channels:", channels.length);
    return channels;
  `
});
```

---

## 13. 📋 TEMPLATES (2 tools)

| Tool | Purpose | Priority | Key Parameters |
|------|---------|----------|----------------|
| `get_task_templates` | List templates | LOW | `page?` (0-indexed pagination) |
| `create_task_from_template` | Create from template | LOW | `templateId`, `listName`/`listId`, `name?` |

```typescript
call_tool_chain({
  code: `
    // List available task templates
    const templates = await clickup.clickup_get_task_templates({
      page: 0
    });
    console.log("Available templates:", templates.length);
    
    // Create task from template
    const task = await clickup.clickup_create_task_from_template({
      templateId: templates[0].id,
      listName: "Sprint Backlog",
      name: "New Feature Implementation"
    });
    console.log("Created from template:", task.id);
    return task;
  `
});
```

---

## 14. 👥 USER GROUPS (1 tool)

### `manage_user_groups`

**Actions:** `list`, `create`, `update`, `delete`

```typescript
call_tool_chain({
  code: `
    // List all user groups
    const groups = await clickup.clickup_manage_user_groups({
      action: "list"
    });
    console.log("User groups:", groups.length);
    groups.forEach(g => console.log(" -", g.name, g.id));
    return groups;
  `
});
```

---

## 15. 👤 GUESTS (1 tool, Enterprise)

### `manage_guests`

**Actions:** `invite`, `get`, `edit`, `remove`, `add_to_task`, `remove_from_task`, `add_to_list`, `remove_from_list`, `add_to_folder`, `remove_from_folder`

**Note:** Enterprise plan required. Guest management is not available on Free, Unlimited, or Business plans.

---

## 16. 📊 AUDIT LOGS (1 tool, Enterprise)

### `get_audit_logs`

**Filter categories:** `auth-and-security`, `custom-fields`, `hierarchy-activity`, `user-activity`, `agent-settings-activity`, `other-activity`

**Note:** Enterprise plan required.

```typescript
call_tool_chain({
  code: `
    const logs = await clickup.clickup_get_audit_logs({
      filter: "user-activity",
      startDate: "2026-04-01",
      endDate: "2026-04-30"
    });
    console.log("Audit entries:", logs.length);
    return logs;
  `
});
```

---

## 17. 📝 FEEDBACK (1 tool)

### `submit_feedback`

**Types:** `bug`, `feature`, `question`

```typescript
call_tool_chain({
  code: `
    await clickup.clickup_submit_feedback({
      type: "feature",
      description: "Add bulk time entry editing support",
      priority: "medium"
    });
    console.log("Feedback submitted");
  `
});
```

---

## 18. ⭐ PRIORITY CATEGORIZATION

All 46 tools are categorized by usage frequency for efficient AI agent routing.

### HIGH PRIORITY (8 tools) — Daily Use

Core task and workspace operations. Use actively for most workflows.

| Tool | Category | Purpose |
|------|----------|---------|
| `create_task` | Tasks | Primary task creation |
| `get_task` | Tasks | Most common lookup |
| `update_task` | Tasks | Core status/field updates |
| `delete_task` | Tasks | Task removal (confirm first) |
| `search_tasks` | Tasks | Task discovery |
| `manage_comments` | Tasks | Collaboration essential |
| `get_workspace` | Workspace | Structure discovery |
| `create_bulk_tasks` | Tasks | Efficient multi-task setup |

### MEDIUM PRIORITY (19 tools) — Weekly Use

Useful but situational. Use when specific needs arise.

| Tool | Category | Purpose |
|------|----------|---------|
| `update_bulk_tasks` | Tasks | Batch status changes |
| `create_subtask` | Tasks | Task decomposition |
| `get_subtasks` | Tasks | Task hierarchy |
| `move_task` | Tasks | Task reorganization |
| `link_tasks` | Tasks | Task relationships |
| `create_dependency` | Tasks | Workflow ordering |
| `manage_lists` | Structure | List CRUD |
| `manage_spaces` | Structure | Space CRUD |
| `manage_folders` | Structure | Folder CRUD |
| `manage_custom_fields` | Fields | Custom field CRUD |
| `manage_checklists` | Tasks | Checklist management |
| `manage_attachments` | Tasks | File operations |
| `add_tag_to_task` | Tags | Task categorization |
| `remove_tag_from_task` | Tags | Tag cleanup |
| `manage_space_tags` | Tags | Tag definitions |
| `manage_views` | Views | View CRUD |
| `create_document` | Docs | Knowledge base |
| `manage_time_entries` | Time | Effort logging |
| `manage_goals` | Goals | OKR tracking |

### LOW PRIORITY (19 tools) — Rare/Setup

Rarely needed or enterprise-only. Use sparingly.

| Tool | Category | Purpose |
|------|----------|---------|
| `get_dependency` | Tasks | Rare lookup |
| `update_dependency` | Tasks | Rare modification |
| `delete_dependency` | Tasks | Rare cleanup |
| `add_task_to_list` | TIML | Multi-list add |
| `remove_task_from_list` | TIML | Multi-list remove |
| `get_document` | Docs | Occasional lookup |
| `list_documents` | Docs | Occasional browse |
| `list_document_pages` | Docs | Occasional browse |
| `get_document_pages` | Docs | Occasional read |
| `create_document_page` | Docs | Occasional write |
| `update_document_page` | Docs | Occasional edit |
| `manage_webhooks` | Webhooks | Integration setup |
| `manage_chat_channels` | Chat | Channel CRUD |
| `manage_chat_messages` | Chat | Message CRUD |
| `get_task_templates` | Templates | Template discovery |
| `create_task_from_template` | Templates | Template usage |
| `manage_user_groups` | Admin | User group CRUD |
| `manage_guests` | Admin | Guest management (Enterprise) |
| `get_audit_logs` | Admin | Audit logs (Enterprise) |
| `submit_feedback` | Meta | Bug/feature report |

---

## 19. 🚨 ERROR HANDLING

### Common Error Patterns

```yaml
error_patterns:
  authentication:
    cause: "Invalid or expired API token"
    fix: "Regenerate API token and update clickup_CLICKUP_API_KEY in Code Mode"
    
  team_not_found:
    cause: "Missing or incorrect CLICKUP_TEAM_ID"
    fix: "Set clickup_CLICKUP_TEAM_ID to correct workspace ID"
    
  task_not_found:
    cause: "Task ID or name not found in workspace"
    fix: "Use search_tasks to find the correct task first, then use its ID"
    
  list_not_found:
    cause: "List name or ID does not exist"
    fix: "Verify list name with get_workspace or manage_lists (action: 'get_lists')"
    
  rate_limit:
    cause: "Exceeding ClickUp API rate limits"
    fix: "Implement exponential backoff. Reduce concurrent bulk operations."
    
  permission_denied:
    cause: "API token does not have access to the requested resource"
    fix: "Verify token permissions. Some operations require workspace admin."
    
  enterprise_only:
    cause: "manage_guests or get_audit_logs used on non-Enterprise plan"
    fix: "Use only on Enterprise workspaces. Check plan before invoking."
```

### Recovery Patterns

```typescript
call_tool_chain({
  code: `
    async function safeClickUpCall(toolName, params) {
      try {
        const result = await clickup["clickup_" + toolName](params);
        return { success: true, data: result };
      } catch (error) {
        console.error("ClickUp call failed:", error.message);
        
        // Handle specific errors
        if (error.message.includes("auth")) {
          return { 
            success: false, 
            error: "AUTH_FAILED",
            fix: "Regenerate API token at https://app.clickup.com/settings/apps"
          };
        }
        
        if (error.message.includes("rate")) {
          // Exponential backoff
          await new Promise(r => setTimeout(r, 2000));
          try {
            const retry = await clickup["clickup_" + toolName](params);
            return { success: true, data: retry };
          } catch (retryError) {
            return { success: false, error: "RATE_LIMIT", details: retryError.message };
          }
        }
        
        return { success: false, error: error.message };
      }
    }
    
    // Usage
    const result = await safeClickUpCall("create_task", {
      listName: "Sprint Backlog",
      name: "Test task"
    });
    
    if (!result.success) {
      console.log("Failed:", result.error, "Fix:", result.fix);
    }
    
    return result;
  `
});
```

---

## 20. 🏎️ QUICK REFERENCE

### Task Operations Decision Flow

```yaml
what_do_you_need:
  single_task_crud:
    tools: [create_task, get_task, update_task, delete_task]
    priority: HIGH
    
  task_search_discovery:
    tools: [search_tasks, get_workspace]
    priority: HIGH
    
  bulk_task_operations:
    tools: [create_bulk_tasks, update_bulk_tasks]
    priority: [HIGH, MEDIUM]
    
  task_relationships:
    tools: [create_subtask, link_tasks, create_dependency]
    priority: MEDIUM
    
  comments_attachments:
    tools: [manage_comments, manage_attachments]
    priority: [HIGH, MEDIUM]
    
  workspace_structure:
    tools: [get_workspace, manage_lists, manage_spaces, manage_folders]
    priority: [HIGH, MEDIUM, MEDIUM, MEDIUM]
    
  custom_fields_tags:
    tools: [manage_custom_fields, add_tag_to_task, remove_tag_from_task, manage_space_tags]
    priority: MEDIUM
    
  documents:
    tools: [create_document, get_document, list_documents, list_document_pages, get_document_pages, create_document_page, update_document_page]
    priority: [MEDIUM, LOW, LOW, LOW, LOW, LOW, LOW]
    
  time_goals_views:
    tools: [manage_time_entries, manage_goals, manage_views]
    priority: MEDIUM
    
  chat_webhooks:
    tools: [manage_chat_channels, manage_chat_messages, manage_webhooks]
    priority: LOW
    
  admin:
    tools: [manage_user_groups, manage_guests, get_audit_logs, submit_feedback]
    priority: LOW
```

### Related Resources

- [SKILL.md](../SKILL.md) — Main skill instructions
- [ClickUp - Integrations - CLI Knowledge - v0.100.md](./ClickUp%20-%20Integrations%20-%20CLI%20Knowledge%20-%20v0.100.md) — CLI command reference
- [ClickUp - Reference - Combined Workflows - v0.100.md](../reference/ClickUp%20-%20Reference%20-%20Combined%20Workflows%20-%20v0.100.md) — Combined CLI+MCP workflows
- [tool_reference.md](../../references/tool_reference.md) — Source tool reference
- [tool_categories.md](../../assets/tool_categories.md) — Priority categorization
