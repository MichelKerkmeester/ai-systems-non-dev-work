# Figma Agent - User Guide v0.100

Reads Figma files through native MCP with **transparent SYNC processing**.

---

## 1. OVERVIEW

The Figma MCP Agent connects internal Barter AI workflows to Figma through native Model Context Protocol servers. It reads files, retrieves nodes, exports assets, extracts component and style metadata, navigates team/project libraries, and manages comments. It is not a designer, not a developer, and not a manual API wrapper. All Figma work goes through registered MCP tools using the `figma.figma_{tool_name}` naming pattern.

Two integration paths are supported. Option A uses the Official Figma MCP server over HTTP at `https://mcp.figma.com/mcp` with browser OAuth. Option B uses Framelink (`figma-developer-mcp`) over local stdio with a Figma Personal Access Token, which fits Code Mode tool chains. Both expose file access, image export, components, styles, teams, projects, comments, and auth checks.

| Dimension | Option A: Official Figma MCP | Option B: Framelink |
|---|---|---|
| Package / URL | `https://mcp.figma.com/mcp` | `figma-developer-mcp` npm |
| Transport | HTTP remote MCP server | Local stdio MCP process |
| Authentication | OAuth browser login | Figma Personal Access Token |
| Installation | None; add MCP HTTP config | `npx -y figma-developer-mcp --stdio` |
| Configuration | `opencode.json`, `.mcp.json`, `.vscode/mcp.json`, or `.cursor/mcp.json` | MCP client config or `.utcp_config.json` for Code Mode |
| Environment variables | None for normal OAuth flow | `figma_FIGMA_API_KEY` for Code Mode |
| Tool invocation | Native MCP client invocation | Code Mode `call_tool_chain()` TypeScript |
| Recommended use cases | Fast setup, OAuth-first clients, no local package management | Internal scripted workflows, multi-tool chains, explicit PAT auth |

**Internal rule:** Use native Figma MCP only. No manual REST calls, browser scraping, or design authoring workarounds.

---

## 2. WHAT'S NEW IN V0.100

### Initial Barter System Release

- **AI System Packaging**: Promoted Figma from a standalone skill into the Barter MCP Agent structure with AGENTS.md, knowledge base documents, local MCP server folders, and a user guide.
- **Figma MCP Agent Persona**: Formalized the operating boundary: native MCP only, file-access focused, not a designer, not a developer, and not a manual REST API client.
- **Two Integration Paths**: Documented Option A Official HTTP/OAuth and Option B Framelink stdio/API key so internal users can choose the right setup path.
- **SYNC Framework**: Standardized the 4-phase method: Survey, Yield, Navigate, Create. The final verb is always **Create**.
- **Command Registry**: Added `$file`, `$node`, `$export`, `$component`, `$style`, `$team`, `$comment`, `$auth`, and `$interactive` routing with short aliases.
- **MCP Knowledge Base**: Consolidated all 18 Figma MCP tools into one reference for file operations, image export, comments, team/project navigation, components, styles, and auth checks.
- **Connection-First Gate**: Made `search_tools` plus `figma_check_api_key` the required preflight before Figma operations.
- **Combined Workflows**: Added internal workflow patterns for design-system audits, token export, bulk image export, review automation, component documentation, and team library inventory.

---

## 3. KEY FEATURES

### File Operations

- Retrieve full files, specific node IDs, and version history.
- Use bounded depth for large files and node-scoped reads when IDs are known.
- Primary tools: `figma.figma_get_file`, `figma.figma_get_file_nodes`, `figma.figma_get_file_versions`

### Image Export

- Render nodes as PNG, JPG, SVG, or PDF at 0.01x to 4x scale.
- Batch multiple node IDs and retrieve embedded image-fill URLs.
- Primary tools: `figma.figma_get_image`, `figma.figma_get_image_fills`

### Component Extraction

- List file components, retrieve a component by key, and inventory team libraries.
- Use team component sets for variant-family discovery.
- Primary tools: `figma.figma_get_file_components`, `figma.figma_get_component`, `figma.figma_get_team_components`, `figma.figma_get_team_component_sets`

### Style Tokens

- Extract FILL, TEXT, EFFECT, and GRID styles from files or teams.
- Normalize style metadata into token tables or token JSON-ready structures.
- Primary tools: `figma.figma_get_file_styles`, `figma.figma_get_style`, `figma.figma_get_team_styles`

### Team Navigation

- List team projects and project files with pagination support.
- Use team/project traversal before wide component or style inventory work.
- Primary tools: `figma.figma_get_team_projects`, `figma.figma_get_project_files`

### Comments

- Read comments, post node-targeted feedback, reply to threads, and delete only after explicit confirmation.
- Primary tools: `figma.figma_get_comments`, `figma.figma_post_comment`, `figma.figma_delete_comment`

### Auth Verification

- Check authentication before work starts and set a PAT only for explicit Framelink setup.
- Keep tokens out of prompts, docs, config commits, and output logs.
- Primary tools: `figma.figma_check_api_key`, `figma.figma_set_api_key`

**Important**: The system NEVER uses manual Figma REST calls or non-MCP browser scraping. Every supported operation uses native Figma MCP tooling.

---

## 4. SYSTEM ARCHITECTURE

```
AGENTS.md → Entry point with Figma MCP Agent context override
    ↓
Figma - System Prompt (System prompt with SYNC integration)
    ↓
Figma - SYNC Thinking Framework (4-phase methodology with cognitive rigor)
    ↓
Figma - Interactive Intelligence (Conversation flow with two-layer transparency)
    ↓
Figma - MCP Knowledge (18 MCP tool specifications)
    ↓
Combined Workflows (Figma MCP integration patterns)
    ↓
INSTALL_GUIDE.md (Install/configure Official HTTP and Framelink stdio paths)
    ↓
mcp servers/figma-mcp-http/ (Repo-local Official MCP configuration snippets)
mcp servers/figma-mcp-stdio/ (Repo-local Framelink configuration and installer)
    ↓
Output → Native Figma operations via MCP server only
```

---

## 5. QUICK SETUP

### Step 1: Create a Project
Create a new project in your AI workspace (Claude, OpenCode, VS Code Copilot, or Cursor) named "Figma Agent."

### Step 2: Add System Instructions
Copy and paste the System Prompt into your project's custom instructions:
- `Figma - System - Prompt - v0.100.md`

### Step 3: Upload Reference Documents
Add these documents to your project knowledge base:
- `Figma - Integrations - MCP Knowledge - v0.100.md`
- `Figma - Thinking - SYNC Framework - v0.100.md`
- `Figma - System - Interactive Intelligence - v0.100.md`
- `Figma - Reference - Combined Workflows - v0.100.md`

### Step 4: Choose an Integration Path

**Option A: Official Figma MCP (recommended for most users)**
```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Or add this to `opencode.json`:
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

**Option B: Framelink stdio (recommended for Code Mode chains)**
```bash
npx -y figma-developer-mcp --help
```

Add to `.env`:
```bash
figma_FIGMA_API_KEY=figd_your_token_here
```

### Step 5: Run First Verification
```typescript
call_tool_chain({
  code: `
    const tools = await search_tools({
      task_description: "figma design files components styles comments",
      limit: 20
    });

    const auth = await figma.figma_check_api_key({});

    return {
      toolsFound: tools.length,
      auth
    };
  `
});
```

See `INSTALL_GUIDE.md` for complete setup with client-specific configuration and validation checkpoints.

---

## 6. INSTALLING FIGMA MCP

Full setup guide: `INSTALL_GUIDE.md`.

The install guide covers both supported paths with architecture diagrams, prerequisites, configuration snippets, and validation checkpoints. Option A adds Figma's hosted MCP endpoint and uses OAuth on first use. Option B runs Framelink through `npx`, authenticates with a Figma Personal Access Token, and is the path to use when Code Mode needs `call_tool_chain()` workflows.

### Option A: Official Figma MCP

```bash
# Claude Code CLI
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

First real use opens browser OAuth. Sign in with the Figma account that can read the target file.

### Option B: Framelink MCP Server

```bash
npx -y figma-developer-mcp --help
```

```bash
# Code Mode (MCP provider named "figma" requires this prefix)
figma_FIGMA_API_KEY=figd_your_token_here
```

### Important Notes

- Option A requires no package install and authenticates through browser OAuth.
- Option B requires Node.js 18+ and a Figma Personal Access Token.
- Code Mode requires the prefixed variable `figma_FIGMA_API_KEY`; using only `FIGMA_API_KEY` causes variable lookup failures.
- Never hardcode a real Figma token in config, prompts, docs, or committed files.

---

## 7. CONNECTION VERIFICATION

### Automatic Connection Check

The system verifies Figma MCP registration and authentication before operations:

```markdown
✔ MCP Server: Connected
✔ Authentication: Confirmed
✔ figma.figma_* namespace ready
```

### Test Commands

**MCP Discovery Test:**
```typescript
call_tool_chain({
  code: `
    const tools = await search_tools({
      task_description: "figma",
      limit: 20
    });

    return tools.map(tool => tool.name);
  `
});
```

**Auth Test:**
```typescript
call_tool_chain({
  code: `
    const auth = await figma.figma_check_api_key({});
    return auth;
  `
});
```

**File Access Test:**
```typescript
call_tool_chain({
  code: `
    const file = await figma.figma_get_file({
      fileKey: "your_file_key_here",
      depth: 1
    });

    return {
      name: file.name,
      pages: file.document.children.map(page => page.name)
    };
  `
});
```

### Common Connection Issues

**MCP: Figma Tools Not Found:** Confirm Option A or Option B config is present, restart the AI client, then re-run `search_tools({ task_description: "figma" })`.

**Option A: OAuth Not Completed:** Trigger a first Figma call, complete the browser OAuth prompt, and use the Figma account that can read the target file.

**Option B: Environment Variable Not Found:** Code Mode needs `figma_FIGMA_API_KEY=figd_...`, not only `FIGMA_API_KEY=figd_...`. Restart after changing `.env`.

**File or Node Not Found:** Confirm the file key came from the URL, verify account access, and re-fetch the file tree if the node ID may be stale.

---

## 8. HOW IT WORKS

### Command Registry

| Command | Shortcut | Action |
|---|---|---|
| `$file` | `$f` | File retrieval via `figma_get_file`, `figma_get_file_nodes`, and version history |
| `$node` | `$n` | Specific node fetch via `figma_get_file_nodes` |
| `$export` | `$e` | Image rendering via `figma_get_image` and `figma_get_image_fills` |
| `$component` | `$c` | Component extraction via file, component, team component, and component-set tools |
| `$style` | `$s` | Style/token extraction via file, style, and team style tools |
| `$team` | `$t` | Team/project navigation via `figma_get_team_projects` and `figma_get_project_files` |
| `$comment` | `$cm` | Comment operations via get, post, reply, and delete comment tools |
| `$auth` | `$a` | API key and authentication checks via `figma_check_api_key` and `figma_set_api_key` |
| `$interactive` | `$int` | Guided clarification before routing to the right Figma MCP operation |

### Processing Hierarchy

| Step | Action | Details |
| ---- | ------ | ------- |
| 1 | **Context Override** | Apply Figma MCP Agent boundaries. Reject out-of-scope design creation, development, or manual API work. |
| 2 | **System Prompt** | Load `knowledge base/system/Figma - System - Prompt - v0.100.md`. |
| 3 | **Tool Verification** | Run `search_tools` for Figma tools and `figma_check_api_key`. Blocking if unavailable. |
| 4 | **Detect Command** | Match exact `$command`, then keywords, then topic inference. |
| 5 | **Load Documents** | Load MCP Knowledge always; load SYNC, Interactive Intelligence, or Combined Workflows as needed. |
| 6 | **Interactive Mode** | If ambiguous, ask one comprehensive question and wait. |
| 7 | **Execute SYNC** | Apply Survey → Yield → Navigate → Create using native MCP only. |
| 8 | **Respond** | Return focused results, not full file dumps unless requested. |
| 9 | **Confirm** | Ask whether the deliverable meets the requirement and offer refinement. |

### SYNC Processing Framework

The system uses intelligent 4-phase SYNC methodology:

```markdown
 SYNC Processing:

S - Survey: Understanding file, node, team, project, component, style, comment, and auth requirements
Y - Yield: Converting intent into the optimal native Figma MCP tool chain
N - Navigate: Executing operations through registered figma.figma_* tools
C - Create: Validating returned data and delivering the requested artifact

Internal: Full cognitive rigor (routing, tool selection, validation)
External: Concise progress updates only
```

### Native MCP Operations Only

```markdown
✅ CORRECT Approach:

• Uses figma.figma_get_file() for file structure
• Uses figma.figma_get_file_nodes() for scoped node reads
• Uses figma.figma_get_image() for PNG, JPG, SVG, or PDF exports
• Uses figma.figma_get_file_components() for component metadata
• Uses figma.figma_post_comment() for review comments
• All operations through native MCP server tools

❌ NEVER Does This:

• Create or edit visual Figma layers
• Use Figma REST API manually
• Scrape Figma through a browser
• Pretend to infer design details not returned by MCP
• Suggest non-MCP workflows for supported Figma operations
```

### Smart Routing Logic

The system automatically selects the minimum sufficient Figma MCP tool:

| Request Type | Route To | Reason |
|---|---|---|
| File overview, page list | `figma_get_file` | Full structure is needed |
| Known frame or layer IDs | `figma_get_file_nodes` | Node-scoped reads avoid over-fetching |
| PNG, JPG, SVG, PDF export | `figma_get_image` | Native rendered asset URLs |
| Embedded image fills | `figma_get_image_fills` | Returns source image-fill URLs |
| File components | `figma_get_file_components` | File-scoped component inventory |
| Team library components | `figma_get_team_components` | Team-wide component inventory with pagination |
| Design tokens | `figma_get_file_styles` or `figma_get_team_styles` | Style metadata grouped by token category |
| Review comments | `figma_get_comments`, `figma_post_comment` | Native Figma comment workflow |
| Team/project discovery | `figma_get_team_projects`, `figma_get_project_files` | Native navigation of Figma workspace hierarchy |

### Execution Modes

```markdown
 Standard Mode:

• Default for direct commands and clear requests
• Full SYNC processing (4 phases)
• Native Figma MCP tool selection
• Best for file reads, exports, inventories, and comments
• Shows concise progress updates

 Interactive Mode:

• Triggered by ambiguous requests
• Single comprehensive question
• Waits for user input before proceeding
• Use $interactive or $int to force this mode
```

---

## 9. EXAMPLE INTERACTIONS

### Basic File Read

```
User: $file https://www.figma.com/file/abc123XYZ/Product-System

System:
Connection verified. SYNC: Survey file URL -> Yield bounded get_file -> Navigate page/frame tree -> Create file summary.
Result: file name, pages, frame IDs, and last-modified metadata.
```

```typescript
call_tool_chain({
  code: `
    const file = await figma.figma_get_file({
      fileKey: "abc123XYZ",
      depth: 2
    });

    return {
      name: file.name,
      pages: file.document.children.map(page => ({
        id: page.id,
        name: page.name
      }))
    };
  `
});
```

### Export PNG

```
User: $export file abc123XYZ node 12:345 as PNG at 2x

System:
Connection verified. SYNC: Survey node export -> Yield get_image -> Navigate PNG at 2x -> Create URL map.
Result: map of node ID to hosted PNG URL.
```

```typescript
call_tool_chain({
  code: `
    const images = await figma.figma_get_image({
      fileKey: "abc123XYZ",
      ids: ["12:345"],
      format: "png",
      scale: 2
    });

    return images.images;
  `
});
```

### Team Component Library

```
User: $component list team library components for team 987654

System:
Connection verified. SYNC: Survey team library -> Yield paginated team components -> Navigate cursor -> Create component list.
Result: component names, keys, node IDs, descriptions, and next cursor.
```

```typescript
call_tool_chain({
  code: `
    const firstPage = await figma.figma_get_team_components({
      team_id: "987654",
      page_size: 30
    });

    const components = firstPage.meta?.components || firstPage.components || [];

    return {
      count: Array.isArray(components) ? components.length : Object.keys(components).length,
      nextCursor: firstPage.cursor || firstPage.pagination?.next_page
    };
  `
});
```

### Style Design Tokens

```
User: $style extract design tokens from file abc123XYZ

System:
Connection verified. SYNC: Survey style inventory -> Yield file styles -> Navigate type grouping -> Create token summary.
Result: token-ready style groups.
```

```typescript
call_tool_chain({
  code: `
    const styles = await figma.figma_get_file_styles({
      fileKey: "abc123XYZ"
    });

    const allStyles = Object.values(styles.meta?.styles || {});
    const byType = allStyles.reduce((acc, style) => {
      const type = style.style_type || "UNKNOWN";
      acc[type] = acc[type] || [];
      acc[type].push({
        name: style.name,
        key: style.key,
        description: style.description
      });
      return acc;
    }, {});

    return byType;
  `
});
```

### Comment Review

```
User: $comment post "Ready for engineering review" on node 12:345 in file abc123XYZ

System:
Connection verified. SYNC: Survey review comment -> Yield post_comment -> Navigate node metadata -> Create comment confirmation.
Result: posted comment ID and message.
```

```typescript
call_tool_chain({
  code: `
    const comment = await figma.figma_post_comment({
      fileKey: "abc123XYZ",
      message: "Ready for engineering review",
      client_meta: {
        node_id: "12:345"
      }
    });

    return {
      id: comment.id,
      message: comment.message
    };
  `
});
```

---

## 10. WHAT GETS RETURNED

### File Structures

```typescript
type FigmaFileSummary = {
  name: string;
  lastModified: string;
  version: string;
  document: { id: string; name: string; type: "DOCUMENT"; children: FigmaPage[] };
};
```

### Node Results

```typescript
type FigmaNodeResult = {
  nodes: Record<string, { document: FigmaNode; components?: object; styles?: object }>;
};
```

### Image Export Results

```typescript
type FigmaImageExport = {
  err?: string | null;
  images: Record<string, string | null>;
};
```

### Component Inventories

```typescript
type FigmaComponentInventory = {
  meta: {
    components: Array<{ key: string; name: string; node_id: string; description?: string }>;
  };
};
```

### Style Token Inventories

```typescript
type FigmaStyleInventory = {
  meta: {
    styles: Array<{ key: string; name: string; style_type: "FILL" | "TEXT" | "EFFECT" | "GRID"; node_id: string }>;
  };
};
```

### Team and Project Mappings

```typescript
type FigmaTeamProjectMapping = {
  projects: Array<{ id: string; name: string }>;
  files?: Array<{ key: string; name: string; last_modified?: string }>;
  cursor?: string;
};
```

### Comment Threads

```typescript
type FigmaCommentThread = {
  comments: Array<{
    id: string;
    message: string;
    created_at: string;
    user: { id: string; handle: string };
    client_meta?: { node_id?: string };
  }>;
};
```

### Common Operation Outputs

| Operation | Returned Shape | Use |
|---|---|---|
| `$file` | File metadata, document tree, page/frame nodes | File survey and navigation |
| `$node` | Node map keyed by requested IDs | Scoped inspection before export or review |
| `$export` | `images` map from node ID to hosted asset URL | PNG, JPG, SVG, or PDF handoff |
| `$component` | Component metadata with keys and node IDs | Library inventory and documentation |
| `$style` | Style metadata grouped by FILL, TEXT, EFFECT, GRID | Design-token summaries |
| `$team` | Project and file lists with optional cursor | Team navigation and inventory |
| `$comment` | Comment thread records or posted comment ID | Review workflows |

---

## 11. VERSION HISTORY

### v0.100 (Current)
- **Barter Agent Release**: Initial internal Figma MCP Agent package for the Barter MCP Agents workspace.
- **System Architecture**: AGENTS.md entry point, system prompt, SYNC framework, interactive intelligence, MCP knowledge, and combined workflows.
- **Native MCP Boundary**: Formalized Figma MCP Agent as native MCP only, not a designer, not a developer, and not a manual API operator.
- **Two Integration Paths**: Official Figma MCP HTTP/OAuth and Framelink stdio/API key paths documented for internal setup.
- **Command Routing**: `$file`, `$node`, `$export`, `$component`, `$style`, `$team`, `$comment`, `$auth`, and `$interactive` commands added.
- **Connection Verification**: `search_tools` plus `figma_check_api_key` made the required preflight.

### Source Skill History
- **v1.0.0.0**: First Figma skill release with file access, image export, comments, style lookup, setup help, quick start, install guide, tool reference, and category map.
- **v1.0.1.0**: Removed duplicate install guidance and corrected broken documentation paths.
- **v1.0.2.0**: Standardized environment-variable naming across the docs, including the Code Mode `figma_FIGMA_API_KEY` prefix.
- **v1.0.3.0**: Improved README section lookup with hidden anchors and cleaned wording for retrieval and readability.
- **v1.0.4.0 - v1.0.6.0**: No local changelog files were present in the supplied source package.
- **v1.0.7.0**: Removed decorative symbols from headings and aligned docs with current validation rules.

---

## 12. RESOURCES

### Essential Internal Files
- [AGENTS.md](./AGENTS.md) - Figma MCP Agent entry point, context override, reading instructions, and processing hierarchy
- [knowledge base/](./knowledge%20base/) - System prompt, SYNC framework, interactive intelligence, MCP knowledge, and combined workflows
- [mcp servers/](./mcp%20servers/) - Repo-local configuration snippets and Framelink install support
- [Figma - System - Prompt - v0.100.md](./knowledge%20base/system/Figma%20-%20System%20-%20Prompt%20-%20v0.100.md) - Core routing and mandatory behavior
- [Figma - Integrations - MCP Knowledge - v0.100.md](./knowledge%20base/integrations/Figma%20-%20Integrations%20-%20MCP%20Knowledge%20-%20v0.100.md) - Complete 18-tool MCP reference
- [Figma - Thinking - SYNC Framework - v0.100.md](./knowledge%20base/system/Figma%20-%20Thinking%20-%20SYNC%20Framework%20-%20v0.100.md) - Survey, Yield, Navigate, Create framework
- [Figma - System - Interactive Intelligence - v0.100.md](./knowledge%20base/system/Figma%20-%20System%20-%20Interactive%20Intelligence%20-%20v0.100.md) - Clarification and conversation flow
- [Figma - Reference - Combined Workflows - v0.100.md](./knowledge%20base/reference/Figma%20-%20Reference%20-%20Combined%20Workflows%20-%20v0.100.md) - Multi-tool Figma MCP workflow recipes

### Install and Source References
Install and Source References: see local INSTALL_GUIDE.md (sibling) — the original mcp-figma developer skill was retired; this AI Systems agent supersedes it.

### External References
- [Official Figma MCP Server](https://developers.figma.com/docs/figma-mcp-server/) - Figma-hosted MCP documentation
- [Figma API Documentation](https://www.figma.com/developers/api) - Figma API reference for data shapes and permissions
- [figma-developer-mcp on npm](https://www.npmjs.com/package/figma-developer-mcp) - Framelink package
- [Model Context Protocol](https://modelcontextprotocol.io/) - MCP protocol reference
