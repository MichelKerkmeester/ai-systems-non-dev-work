
# Figma - Integrations - MCP Knowledge - v0.100

Comprehensive technical reference for all 18 Figma MCP tools with invocation patterns, parameters, return shapes, and priority categorization.

**Loading Condition:** ON-DEMAND
**Purpose:** Complete MCP tool reference documenting all 18 Figma tools accessible via native MCP and Code Mode, with TypeScript invocation examples, parameter specifications, integration paths, error handling patterns, and priority-based categorization for efficient AI agent usage.
**Scope:** All 18 Figma MCP tools organized by functional category - file access (4), images (2), comments (3), team and projects (2), components (4), styles (3). Includes the Figma MCP Agent persona, Option A Official Figma MCP HTTP/OAuth setup, Option B Framelink stdio setup through `figma-developer-mcp`, Code Mode invocation patterns, environment variable prefixing, tool selection decision tree, and quick reference by task adapted from `tool_reference.md`, `INSTALL_GUIDE.md`, and `tool_categories.md`.

## TABLE OF CONTENTS

  - 1. 🔌 SERVER OVERVIEW
  - 2. 🧭 FIGMA MCP AGENT PERSONA
  - 3. 🛠️ INTEGRATION PATHS
  - 4. ⚡ CODE MODE INTEGRATION
  - 5. 📁 FILE MANAGEMENT (4 tools)
  - 6. 🖼️ IMAGE EXPORT (2 tools)
  - 7. 💬 COMMENTS (3 tools)
  - 8. 🏗️ TEAM & PROJECTS (2 tools)
  - 9. 🧩 COMPONENTS (4 tools)
  - 10. 🎨 STYLES (3 tools)
  - 11. ⭐ PRIORITY CATEGORIZATION
  - 12. 🌳 TOOL SELECTION DECISION TREE
  - 13. 🚨 ERROR HANDLING
  - 14. 🏎️ QUICK REFERENCE

---

## 1. 🔌 SERVER OVERVIEW

### MCP Server Details

The Figma MCP server provides native integration with Figma design files for file retrieval, node extraction, image export, component metadata, style metadata, team/project navigation, and collaborative comments. The Figma MCP Agent uses these tools directly through MCP. It does not scrape the browser, manually call the REST API, or pretend to be a designer editing the file.

**Key Information:**
- **Official Remote Server:** `https://mcp.figma.com/mcp`
- **Framelink Package:** `figma-developer-mcp`
- **Protocol:** Model Context Protocol (MCP)
- **Authentication:** OAuth for Official Figma MCP, API key for Framelink
- **Naming Convention:** `figma.figma_{tool_name}` in Code Mode
- **Invocation:** Via Code Mode `call_tool_chain()` TypeScript execution for Option B
- **SYNC Verb:** Create
- **Tool Count:** 18 total tools

**Code Mode Prefixed Environment Variables:**

All Figma configuration uses the `figma_` prefix within Code Mode:
- `figma_FIGMA_API_KEY` - Figma Personal Access Token for Framelink through Code Mode

Do not use bare `FIGMA_API_KEY` for Code Mode. Code Mode reads variables using the provider `name` prefix, so the required variable is `figma_FIGMA_API_KEY`.

### System Architecture

**Operation Sequence:**
1. **Connection Check** (ALWAYS FIRST) - Verify Figma MCP tools are active via tool discovery.
2. **User Request** - Receive file key, file URL, node ID, team ID, project ID, component key, style key, or comment intent.
3. **Intent Recognition** - Determine category needed: File, Image, Component, Style, Comment, Team, or Auth.
4. **Tool Selection** - Choose the highest-priority tool that answers the request without over-fetching.
5. **Native Execution** - Invoke the MCP tool directly, usually through `call_tool_chain()` for Code Mode.
6. **Feedback & Confirmation** - Return focused results, file metadata, asset URLs, or comment status to the user.

### Tool Naming Convention

**Full Code Mode format:** `figma.figma_{tool_name}`

All 18 tools follow this pattern. Examples:
- `figma.figma_get_file`
- `figma.figma_get_file_nodes`
- `figma.figma_get_image`
- `figma.figma_get_file_components`
- `figma.figma_post_comment`

**Common naming mistakes:**

| Wrong | Correct |
|-------|---------|
| `figma.get_file({...})` | `figma.figma_get_file({...})` |
| `figma.figma.get_file({...})` | `figma.figma_get_file({...})` |
| `figma.figma_getFile({...})` | `figma.figma_get_file({...})` |

### Connection Verification

Connection verification must be the **first action before all operations**. Use tool discovery to verify connectivity and available tools.

```typescript
call_tool_chain({
  code: `
    // Verify Figma MCP tools are available
    const tools = await search_tools({
      task_description: "figma design files components styles comments",
      limit: 20
    });
    console.log("Figma tools available:", tools.length);

    // Quick auth test - check whether an API key is configured for Framelink
    const auth = await figma.figma_check_api_key({});
    console.log("API key configured:", auth);

    return { connected: true, tools: tools.length, auth };
  `
});
```

---

## 2. 🧭 FIGMA MCP AGENT PERSONA

### Identity

The Figma MCP Agent is a native MCP design-file access agent.

**IS:**
- Native MCP tool user
- Design-file reader
- Asset export coordinator
- Component and style metadata extractor
- Comment and review assistant
- Team/project navigator

**IS NOT:**
- Designer
- Developer
- Browser scraper
- Manual REST API client
- Figma editor
- File-storage backup agent

### Operating Principles

| Principle | Behavior |
|-----------|----------|
| Native MCP first | Use Figma MCP tools directly instead of browser inspection or manual API calls |
| Least data needed | Prefer `figma_get_file_nodes` over full `figma_get_file` when node IDs are known |
| Preserve design intent | Report the design structure, metadata, and exported assets without inventing UI meaning |
| Create, not screenshot | Use the SYNC verb `Create` for generated summaries, comments, and downstream artifacts |
| Tool certainty | Use official tool names and Code Mode prefixes exactly |
| Permission clarity | Treat 403 and 404 as access/key/file-key problems until proven otherwise |

---

## 3. 🛠️ INTEGRATION PATHS

### Two Supported Paths

| Option | Name | Transport | Auth | Best For |
|--------|------|-----------|------|----------|
| **A** | Official Figma MCP | HTTP remote | OAuth browser login | Simplicity, no install, native client support |
| **B** | Framelink | stdio local process | Figma API key | Code Mode, scripted workflows, local MCP config |

### Option A: Official Figma MCP HTTP/OAuth

Official Figma MCP uses a remote HTTP server at `https://mcp.figma.com/mcp`. There is no local package to install. The first real Figma request triggers OAuth in the browser.

**OpenCode configuration (`opencode.json`):**

```json
{
  "mcp": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

**Claude Code CLI:**

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

**VS Code Copilot or Cursor (`.vscode/mcp.json` or `.cursor/mcp.json`):**

```json
{
  "servers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp",
      "type": "http"
    }
  }
}
```

**When to choose Option A:**
- You want the quickest path.
- You are using an MCP client with HTTP transport support.
- You prefer OAuth over personal access token handling.
- You do not need Code Mode tool chaining.

**Validation:**

```text
List available Figma tools
```

On first use, a browser popup appears for OAuth. Sign in with the Figma account that has access to the target file.

### Option B: Framelink stdio (`figma-developer-mcp`)

Framelink runs a local stdio MCP server through `npx`. This is the preferred path for Code Mode integration and multi-tool TypeScript workflows.

**Standalone MCP configuration:**

```json
{
  "mcpServers": {
    "Framelink Figma MCP": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=YOUR-KEY", "--stdio"]
    }
  }
}
```

**Environment-variable standalone configuration:**

```json
{
  "mcpServers": {
    "Framelink Figma MCP": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "${FIGMA_API_KEY}"
      }
    }
  }
}
```

**Standalone `.env`:**

```bash
FIGMA_API_KEY=figd_your_token_here
```

**Windows wrapper:**

```json
{
  "mcpServers": {
    "Framelink Figma MCP": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "figma-developer-mcp", "--figma-api-key=YOUR-KEY", "--stdio"]
    }
  }
}
```

**When to choose Option B:**
- You need Code Mode integration.
- You want `call_tool_chain()` TypeScript orchestration.
- You need local stdio MCP behavior.
- You want predictable scripted workflows for file, node, component, and style extraction.

---

## 4. ⚡ CODE MODE INTEGRATION

### `.utcp_config.json`

For Code Mode, configure Framelink as the `figma` provider:

```json
{
  "name": "figma",
  "call_template_type": "mcp",
  "config": {
    "mcpServers": {
      "figma": {
        "transport": "stdio",
        "command": "npx",
        "args": ["-y", "figma-developer-mcp", "--stdio"],
        "env": {
          "FIGMA_API_KEY": "${FIGMA_API_KEY}"
        }
      }
    }
  }
}
```

### Environment Variable Prefixing Rule

Code Mode requires prefixed environment variable names. The prefix is the `.utcp_config.json` `name` field.

```bash
# Wrong for Code Mode
FIGMA_API_KEY=figd_your_token_here

# Correct for Code Mode
figma_FIGMA_API_KEY=figd_your_token_here
```

### Code Mode Invocation Pattern

Use `call_tool_chain()` for multi-step workflows and direct `await figma.figma_<tool>({...})` calls inside the TypeScript block.

```typescript
call_tool_chain({
  code: `
    const file = await figma.figma_get_file({
      fileKey: "abc123XYZ",
      depth: 1
    });

    const styles = await figma.figma_get_file_styles({
      fileKey: "abc123XYZ"
    });

    return {
      fileName: file.name,
      pageCount: file.document.children.length,
      styles
    };
  `
});
```

### Discovery and Tool Details

```typescript
// Discover Figma tools
search_tools({ task_description: "figma components styles images", limit: 20 });

// Inspect a specific tool schema
tool_info({ tool_name: "figma.figma_get_file" });
```

### File Key and Node ID Extraction

The file key is in the Figma URL:

```text
https://www.figma.com/file/ABC123xyz/My-Design-File
                           ^^^^^^^^^
                           fileKey
```

Node IDs appear in URLs as `node-id=1-234`; the MCP tools expect colon syntax `1:234`.

```text
https://www.figma.com/file/ABC123xyz/My-Design-File?node-id=1-234
                                                               ^^^^
                                                               use "1:234"
```

---

## 5. 📁 FILE MANAGEMENT (4 tools)

### File Tool Summary

| Tool | Priority | Category | Purpose |
|------|----------|----------|---------|
| `figma_get_file` | HIGH | File | Get complete file structure |
| `figma_get_file_nodes` | HIGH | File | Get specific nodes from a file |
| `figma_set_api_key` | LOW | Auth | Set Figma API key for Framelink |
| `figma_check_api_key` | LOW | Auth | Check whether API key is configured |

### `figma_get_file`

**Priority:** HIGH
**Category:** File
**Purpose:** Get a complete Figma file by key.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileKey` | string | Yes | File key from the Figma URL |
| `version` | string | No | Specific version ID |
| `depth` | number | No | Node depth, commonly 1-4 |
| `branch_data` | boolean | No | Include branch metadata |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_file({
  fileKey: "abc123XYZ",
  version: "123456",
  depth: 2,
  branch_data: true
});
```

**Return Shape:** File object with `name`, `lastModified`, `thumbnailUrl`, `version`, `document`, pages, and nested node structure according to `depth`.

**When to Use:** Starting a Figma workflow, discovering pages and frames, checking file metadata, or when node IDs are not yet known.

### `figma_get_file_nodes`

**Priority:** HIGH
**Category:** File
**Purpose:** Get specific nodes from a file without retrieving the full document tree.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileKey` | string | Yes | File key from the Figma URL |
| `node_ids` | string[] | Yes | Node IDs such as `["1:2", "3:4"]` |
| `depth` | number | No | Depth of child nodes to include |
| `version` | string | No | Specific version ID |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_file_nodes({
  fileKey: "abc123XYZ",
  node_ids: ["1:2", "3:4"],
  depth: 2,
  version: "123456"
});
```

**Return Shape:** Object keyed by requested node IDs, with node document data, children, component references, styles, and schema version metadata.

**When to Use:** User gives a frame, component, or layer node ID; implementation only needs selected nodes; reducing payload size matters.

### `figma_set_api_key`

**Priority:** LOW
**Category:** Auth
**Purpose:** Set a Figma API key for Framelink.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `api_key` | string | Yes | Figma Personal Access Token, usually starting with `figd_` |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_set_api_key({
  api_key: "figd_your_token_here"
});
```

**Return Shape:** Confirmation object or status message indicating the key was stored.

**When to Use:** Initial setup or token rotation for Framelink. Prefer environment variables for repeatable Code Mode configuration.

### `figma_check_api_key`

**Priority:** LOW
**Category:** Auth
**Purpose:** Check whether a Figma API key is configured.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `{}` | object | Yes | Empty object |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_check_api_key({});
```

**Return Shape:** Boolean or status object indicating whether an API key is configured.

**When to Use:** Debugging authentication, validating Framelink setup, or checking whether `figma_FIGMA_API_KEY` has been loaded.

---

## 6. 🖼️ IMAGE EXPORT (2 tools)

| Tool | Priority | Category | Purpose |
|------|----------|----------|---------|
| `figma_get_image` | HIGH | Image | Render nodes as PNG, JPG, SVG, or PDF |
| `figma_get_image_fills` | MEDIUM | Image | Get URLs for embedded images used in a file |

### `figma_get_image`

**Priority:** HIGH
**Category:** Image
**Purpose:** Render one or more Figma nodes as images.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileKey` | string | Yes | File key from the Figma URL |
| `ids` | string[] | Yes | Node IDs to render |
| `scale` | number | No | Scale from 0.01 to 4 |
| `format` | string | No | `jpg`, `png`, `svg`, or `pdf` |
| `svg_include_id` | boolean | No | Include IDs in SVG output |
| `svg_simplify_stroke` | boolean | No | Simplify SVG strokes |
| `use_absolute_bounds` | boolean | No | Use absolute bounds for export |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_image({
  fileKey: "abc123XYZ",
  ids: ["1:2", "3:4"],
  scale: 2,
  format: "png",
  svg_include_id: true,
  svg_simplify_stroke: false,
  use_absolute_bounds: false
});
```

**Return Shape:** Object with image URL mappings, commonly `images: { "1:2": "https://..." }`, plus status metadata.

**When to Use:** Exporting frames, icons, components, thumbnails, implementation references, visual QA assets, or design previews.

### `figma_get_image_fills`

**Priority:** MEDIUM
**Category:** Image
**Purpose:** Get URLs for raster images embedded in a Figma file.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileKey` | string | Yes | File key from the Figma URL |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_image_fills({
  fileKey: "abc123XYZ"
});
```

**Return Shape:** Object mapping Figma image references to hosted image URLs.

**When to Use:** The task needs original embedded bitmap fills rather than rendered node exports.

---

## 7. 💬 COMMENTS (3 tools)

| Tool | Priority | Category | Purpose |
|------|----------|----------|---------|
| `figma_get_comments` | MEDIUM | Comment | Read comments on a file |
| `figma_post_comment` | MEDIUM | Comment | Post a comment or reply |
| `figma_delete_comment` | LOW | Comment | Delete a comment |

### `figma_get_comments`

**Priority:** MEDIUM
**Category:** Comment
**Purpose:** Get all comments on a file.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileKey` | string | Yes | File key from the Figma URL |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_comments({
  fileKey: "abc123XYZ"
});
```

**Return Shape:** Array or object containing comments with IDs, message text, user data, creation time, resolved status, parent comment IDs, and optional node or canvas position metadata.

**When to Use:** Reading design feedback, summarizing review threads, checking open questions, or deciding where to post a reply.

### `figma_post_comment`

**Priority:** MEDIUM
**Category:** Comment
**Purpose:** Post a comment on a file or reply to an existing comment.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileKey` | string | Yes | File key from the Figma URL |
| `message` | string | Yes | Comment text |
| `client_meta` | object | No | Optional node or canvas location |
| `comment_id` | string | No | Parent comment ID for replies |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_post_comment({
  fileKey: "abc123XYZ",
  message: "Create implementation note: spacing matches the 8px grid.",
  client_meta: {
    node_id: "1:234",
    node_offset: { x: 100, y: 50 }
  },
  comment_id: "456"
});
```

**Return Shape:** Created comment object with ID, message, user, timestamp, file key, and position metadata.

**When to Use:** Providing review feedback, posting implementation notes, replying to design questions, or creating audit-friendly comments from an agent workflow.

### `figma_delete_comment`

**Priority:** LOW
**Category:** Comment
**Purpose:** Delete a comment from a file.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileKey` | string | Yes | File key from the Figma URL |
| `comment_id` | string | Yes | Comment ID to delete |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_delete_comment({
  fileKey: "abc123XYZ",
  comment_id: "456"
});
```

**Return Shape:** Confirmation object or empty success response.

**When to Use:** Removing an incorrect automated comment. Confirm intent before deleting because comment removal can lose review context.

---

## 8. 🏗️ TEAM & PROJECTS (2 tools)

| Tool | Priority | Category | Purpose |
|------|----------|----------|---------|
| `figma_get_team_projects` | MEDIUM | Team | Get projects for a team |
| `figma_get_project_files` | MEDIUM | Team | Get files in a project |

### `figma_get_team_projects`

**Priority:** MEDIUM
**Category:** Team
**Purpose:** Get projects for a Figma team.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `team_id` | string | Yes | Figma team ID |
| `page_size` | number | No | Items per page |
| `cursor` | string | No | Pagination cursor |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_team_projects({
  team_id: "123456",
  page_size: 30,
  cursor: "next_page"
});
```

**Return Shape:** Project list with project IDs, names, team IDs, and pagination metadata.

**When to Use:** Navigating Figma team structure, discovering project IDs, or helping a user find files without a direct file URL.

### `figma_get_project_files`

**Priority:** MEDIUM
**Category:** Team
**Purpose:** Get files within a Figma project.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `project_id` | string | Yes | Figma project ID |
| `page_size` | number | No | Items per page |
| `cursor` | string | No | Pagination cursor |
| `branch_data` | boolean | No | Include branch information |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_project_files({
  project_id: "789",
  page_size: 30,
  cursor: "next_page",
  branch_data: true
});
```

**Return Shape:** File list with names, keys, thumbnails, last modified timestamps, branches, and pagination metadata.

**When to Use:** Listing project contents, finding a file key, or selecting the right design file before deeper extraction.

---

## 9. 🧩 COMPONENTS (4 tools)

| Tool | Priority | Category | Purpose |
|------|----------|----------|---------|
| `figma_get_file_components` | HIGH | Component | Get components from a file |
| `figma_get_component` | MEDIUM | Component | Get a specific component by key |
| `figma_get_team_components` | LOW | Component | Get all components for a team |
| `figma_get_team_component_sets` | LOW | Component | Get component sets for a team |

### `figma_get_file_components`

**Priority:** HIGH
**Category:** Component
**Purpose:** Get all components published or used in a file.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileKey` | string | Yes | File key from the Figma URL |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_file_components({
  fileKey: "abc123XYZ"
});
```

**Return Shape:** Component metadata, commonly under `meta.components`, including component keys, names, descriptions, node IDs, containing file information, and timestamps.

**When to Use:** Documenting a design system, listing component inventory, mapping component nodes for export, or preparing implementation work.

### `figma_get_component`

**Priority:** MEDIUM
**Category:** Component
**Purpose:** Get details for one component by component key.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Component key |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_component({
  key: "component_key"
});
```

**Return Shape:** Component detail object with key, name, description, file metadata, user metadata, thumbnail URL, and related publishing information.

**When to Use:** Looking up a known component key, checking component metadata, or resolving one component without fetching a full file inventory.

### `figma_get_team_components`

**Priority:** LOW
**Category:** Component
**Purpose:** Get all components for a team.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `team_id` | string | Yes | Figma team ID |
| `page_size` | number | No | Items per page |
| `cursor` | string | No | Pagination cursor |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_team_components({
  team_id: "123456",
  page_size: 30,
  cursor: "next_page"
});
```

**Return Shape:** Paginated team component inventory with keys, names, descriptions, file references, thumbnails, and cursor metadata.

**When to Use:** Team-wide design-system inventory or audits. Use sparingly because file-level component lookup is usually more targeted.

### `figma_get_team_component_sets`

**Priority:** LOW
**Category:** Component
**Purpose:** Get component sets, including variants, for a team.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `team_id` | string | Yes | Figma team ID |
| `page_size` | number | No | Items per page |
| `cursor` | string | No | Pagination cursor |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_team_component_sets({
  team_id: "123456",
  page_size: 30,
  cursor: "next_page"
});
```

**Return Shape:** Paginated component set inventory with keys, names, descriptions, containing file metadata, and variant-oriented publishing metadata.

**When to Use:** Auditing team-level variant sets or design-system libraries where component variants matter.

---

## 10. 🎨 STYLES (3 tools)

| Tool | Priority | Category | Purpose |
|------|----------|----------|---------|
| `figma_get_file_styles` | HIGH | Style | Get styles from a file |
| `figma_get_style` | MEDIUM | Style | Get a specific style by key |
| `figma_get_team_styles` | LOW | Style | Get all styles for a team |

### `figma_get_file_styles`

**Priority:** HIGH
**Category:** Style
**Purpose:** Get all styles from a file.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `fileKey` | string | Yes | File key from the Figma URL |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_file_styles({
  fileKey: "abc123XYZ"
});
```

**Return Shape:** Style metadata, commonly under `meta.styles`, including style key, name, description, type, node ID, thumbnail, and timestamps. Style types include `FILL`, `TEXT`, `EFFECT`, and `GRID`.

**When to Use:** Extracting design tokens, documenting color/type/effect/grid styles, or preparing implementation-ready token summaries.

### `figma_get_style`

**Priority:** MEDIUM
**Category:** Style
**Purpose:** Get one style by style key.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Style key |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_style({
  key: "style_key"
});
```

**Return Shape:** Style detail object with name, key, style type, description, file metadata, thumbnail URL, and publishing metadata.

**When to Use:** Looking up one known style, verifying a token's metadata, or resolving style provenance.

### `figma_get_team_styles`

**Priority:** LOW
**Category:** Style
**Purpose:** Get all styles for a team.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `team_id` | string | Yes | Figma team ID |
| `page_size` | number | No | Items per page |
| `cursor` | string | No | Pagination cursor |

**TypeScript Invocation Pattern:**

```typescript
await figma.figma_get_team_styles({
  team_id: "123456",
  page_size: 30,
  cursor: "next_page"
});
```

**Return Shape:** Paginated team style inventory with keys, names, style types, file references, thumbnails, and cursor metadata.

**When to Use:** Team-wide token audits, library inventories, or design-system reviews. Prefer `figma_get_file_styles` when the target file is known.

---

## 11. ⭐ PRIORITY CATEGORIZATION

All 18 tools are categorized by usage frequency for efficient AI agent routing.

### HIGH PRIORITY (5 tools) - Core Design Access

Use actively for most Figma workflows.

| Tool | Category | Purpose |
|------|----------|---------|
| `figma_get_file` | File | Primary file access and structure discovery |
| `figma_get_file_nodes` | File | Targeted node extraction |
| `figma_get_image` | Image | Asset and node export |
| `figma_get_file_components` | Component | File-level component inventory |
| `figma_get_file_styles` | Style | File-level token/style inventory |

### MEDIUM PRIORITY (7 tools) - Situational Workflows

Use when the request specifically needs these resources.

| Tool | Category | Purpose |
|------|----------|---------|
| `figma_get_image_fills` | Image | Embedded image URL extraction |
| `figma_get_comments` | Comment | Read design feedback |
| `figma_post_comment` | Comment | Post review or implementation feedback |
| `figma_get_team_projects` | Team | Team navigation |
| `figma_get_project_files` | Team | Project file discovery |
| `figma_get_component` | Component | Specific component lookup |
| `figma_get_style` | Style | Specific style lookup |

### LOW PRIORITY (6 tools) - Setup, Rare, or Broad Inventory

Use sparingly.

| Tool | Category | Purpose |
|------|----------|---------|
| `figma_set_api_key` | Auth | One-time API key setup |
| `figma_check_api_key` | Auth | Authentication debugging |
| `figma_delete_comment` | Comment | Remove a comment |
| `figma_get_team_components` | Component | Team-wide component inventory |
| `figma_get_team_component_sets` | Component | Team-wide variant set inventory |
| `figma_get_team_styles` | Style | Team-wide style inventory |

---

## 12. 🌳 TOOL SELECTION DECISION TREE

```text
User Request
     |
     +-- "Get Figma file" / "Design structure" / "List pages"
     |   +-- file key known -> figma_get_file
     |   +-- node IDs known -> figma_get_file_nodes
     |
     +-- "Get specific frame" / "Element by ID" / "Inspect node"
     |   +-- data needed -> figma_get_file_nodes
     |   +-- visual needed -> figma_get_image
     |
     +-- "Export image" / "PNG" / "SVG" / "PDF" / "Asset"
     |   +-- rendered node export -> figma_get_image
     |   +-- embedded bitmap fills -> figma_get_image_fills
     |
     +-- "Get components" / "Design system"
     |   +-- file known -> figma_get_file_components
     |   +-- component key known -> figma_get_component
     |   +-- team-wide inventory -> figma_get_team_components
     |   +-- variants/component sets -> figma_get_team_component_sets
     |
     +-- "Get styles" / "Design tokens" / "Colors" / "Typography"
     |   +-- file known -> figma_get_file_styles
     |   +-- style key known -> figma_get_style
     |   +-- team-wide inventory -> figma_get_team_styles
     |
     +-- "Comments" / "Feedback" / "Review thread"
     |   +-- read -> figma_get_comments
     |   +-- post or reply -> figma_post_comment
     |   +-- delete -> figma_delete_comment
     |
     +-- "Team projects" / "Find a file"
     |   +-- team known -> figma_get_team_projects
     |   +-- project known -> figma_get_project_files
     |
     +-- "Auth" / "API key" / "connection"
         +-- check -> figma_check_api_key
         +-- set -> figma_set_api_key
```

### Quick Reference by Task

| Task | Primary Tool | Secondary Tool |
|------|--------------|----------------|
| Get file structure | `figma_get_file` | `figma_get_file_nodes` |
| Inspect selected nodes | `figma_get_file_nodes` | `figma_get_file` |
| Export assets | `figma_get_image` | `figma_get_image_fills` |
| List components | `figma_get_file_components` | `figma_get_component` |
| Extract tokens | `figma_get_file_styles` | `figma_get_style` |
| Read feedback | `figma_get_comments` | - |
| Post feedback | `figma_post_comment` | `figma_get_comments` |
| Navigate team | `figma_get_team_projects` | `figma_get_project_files` |
| Team component audit | `figma_get_team_components` | `figma_get_team_component_sets` |
| Team style audit | `figma_get_team_styles` | `figma_get_file_styles` |
| Debug auth | `figma_check_api_key` | `figma_set_api_key` |

---

## 13. 🚨 ERROR HANDLING

### Common Error Patterns

```yaml
error_patterns:
  oauth_popup_blocked:
    option: "A"
    cause: "Browser blocked the Official Figma MCP OAuth popup"
    fix: "Allow popups and retry a Figma request"

  oauth_expired:
    option: "A"
    cause: "OAuth session expired"
    fix: "Trigger a new Figma request and re-authenticate in the browser"

  api_key_missing:
    option: "B"
    cause: "Code Mode cannot find figma_FIGMA_API_KEY"
    fix: "Set figma_FIGMA_API_KEY in .env and restart the AI client"

  tool_not_found:
    option: "B"
    cause: "Wrong Code Mode function name"
    fix: "Use figma.figma_get_file, not figma.get_file"

  file_not_found:
    option: "Both"
    cause: "Invalid file key or inaccessible file"
    fix: "Verify the file key from the Figma URL and confirm account access"

  permission_denied:
    option: "Both"
    cause: "Figma account or API key lacks access to the file/team/project"
    fix: "Share the file with the authenticated account or regenerate the key"

  rate_limit:
    option: "Both"
    cause: "Too many Figma API requests"
    fix: "Batch node IDs, use shallow depth, add delay and retry"
```

### Recovery Patterns

| Failure | Recovery |
|---------|----------|
| Tool not found | Correct the Code Mode name to `figma.figma_<tool>` |
| `403 Forbidden` | Re-authenticate OAuth or verify API key access |
| `404 Not Found` | Re-check file key, node ID, project ID, or team ID |
| `429 Rate limit` | Wait, retry once, then reduce request volume |
| Missing env var | Use `figma_FIGMA_API_KEY` for Code Mode |

### Rate Limit Guidance

| Pattern | Preferred Behavior |
|---------|--------------------|
| Need many nodes | Use one `figma_get_file_nodes` call with multiple `node_ids` |
| Need previews | Use one `figma_get_image` call with multiple `ids` |
| Need file overview | Use `depth: 1` first, then fetch specific nodes |
| Need team inventory | Paginate with `page_size` and `cursor` |
| Hit 429 | Wait, retry once, then reduce request volume |

---

## 14. 🏎️ QUICK REFERENCE

### Task Operations Decision Flow

```yaml
what_do_you_need:
  file_overview:
    tools: [figma_get_file]
    priority: HIGH
    category: File

  targeted_node_data:
    tools: [figma_get_file_nodes]
    priority: HIGH
    category: File

  asset_export:
    tools: [figma_get_image, figma_get_image_fills]
    priority: [HIGH, MEDIUM]
    category: Image

  file_design_system:
    tools: [figma_get_file_components, figma_get_file_styles]
    priority: HIGH
    category: [Component, Style]

  specific_metadata_lookup:
    tools: [figma_get_component, figma_get_style]
    priority: MEDIUM
    category: [Component, Style]

  comments:
    tools: [figma_get_comments, figma_post_comment, figma_delete_comment]
    priority: [MEDIUM, MEDIUM, LOW]
    category: Comment

  team_navigation:
    tools: [figma_get_team_projects, figma_get_project_files]
    priority: MEDIUM
    category: Team

  team_library_inventory:
    tools: [figma_get_team_components, figma_get_team_component_sets, figma_get_team_styles]
    priority: LOW
    category: [Component, Style]

  auth_debugging:
    tools: [figma_check_api_key, figma_set_api_key]
    priority: LOW
    category: Auth
```

### Related Resources

- `../system/Figma - System - Prompt - v0.100.md` - Routing logic and core agent rules
- `../system/Figma - Thinking - SYNC Framework - v0.100.md` - 4-phase processing methodology
- `../system/Figma - System - Interactive Intelligence - v0.100.md` - Clarification flow
- `../reference/Figma - Reference - Combined Workflows - v0.100.md` - Multi-tool patterns
- `../../INSTALL_GUIDE.md` - Option A (Official HTTP/OAuth) and Option B (Framelink stdio) setup
- `../../AGENTS.md` - Entry point with Context Override and Document Loading DAG
