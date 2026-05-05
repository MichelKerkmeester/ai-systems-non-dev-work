# Figma Agent Installation Guide

---

## 🤖 AI-FIRST INSTALL GUIDE

**Copy and paste this prompt to your AI assistant to get installation help:**

```text
I want to install the Barter Figma MCP Agent for native Figma design-file access.

Please help me:
1. Choose Option A Official Figma MCP over HTTP/OAuth or Option B Framelink over stdio
2. Configure my MCP client for Figma access
3. For Option A: add https://mcp.figma.com/mcp and complete browser OAuth
4. For Option B: install/use figma-developer-mcp with Node.js 18+ and a Figma Personal Access Token
5. Configure .env securely, including the Code Mode variable figma_FIGMA_API_KEY when needed
6. Verify tools with search_tools for figma tools
7. Verify auth with await figma.figma_check_api_key({})
8. Run the repo HTTP endpoint check: mcp servers/figma-mcp-http/verify.sh

My Figma file key is: [paste file key from the URL, e.g., abc123XYZ]
My Figma node ID is: [optional, e.g., 1:234 or 1-234]
I'm using: [Claude Code / OpenCode / VS Code Copilot / Cursor / Claude Desktop]
I prefer: [Option A OAuth / Option B Personal Access Token / help me choose]

Guide me through each step with the exact commands and config snippets I need.
```

**What the AI will do:**
- Help choose between Official HTTP/OAuth and Framelink stdio
- Configure Claude Code, OpenCode, VS Code Copilot, Cursor, or Claude Desktop
- For Option A, guide the OAuth browser login on first Figma request
- For Option B, verify Node.js 18+, token setup, and `.env` handling
- Check Code Mode variable prefixing with `figma_FIGMA_API_KEY`
- Verify Figma MCP tools and authentication before any file operation
- Show common `$file`, `$node`, `$export`, `$component`, `$style`, `$team`, `$comment`, and `$auth` requests

**Expected setup time:** 5-10 minutes (Option A) | 10-15 minutes (Option B)

---

#### TABLE OF CONTENTS

  - 1. 📖 OVERVIEW
  - 2. 📋 PREREQUISITES
  - 3. 📥 INSTALLATION
  - 4. ⚙️ CONFIGURATION
  - 5. ✅ VERIFICATION
  - 6. 🚀 USAGE
  - 7. 🎯 FEATURES
  - 8. 💡 EXAMPLES
  - 9. 🔧 TROUBLESHOOTING
  - 10. 📚 RESOURCES

---

## 1. 📖 OVERVIEW

The Barter Figma MCP Agent provides native MCP access to Figma design files. It is built for retrieval, inspection, export, component and style cataloging, team/project navigation, and collaborative comments. It is not a design editor and does not call the Figma REST API manually.

### Key Features

- **File Access (MCP)**: Retrieve complete file structure, pages, frames, and versioned file data
- **Node Inspection (MCP)**: Fetch specific frames, components, or layers by node ID
- **Image Export (MCP)**: Render nodes as PNG, JPG, SVG, or PDF at configurable scale
- **Components (MCP)**: Extract file components, single component metadata, and team component inventories
- **Styles / Tokens (MCP)**: Retrieve color, typography, effect, and grid styles from files or teams
- **Team Navigation (MCP)**: List team projects and project files with pagination
- **Comments (MCP)**: Read comments, post feedback, reply to threads, and delete comments with confirmation
- **Auth Verification (MCP)**: Check Figma authentication before any operation

### Two-Tool Architecture

| Tool | Technology | Purpose |
| --- | --- | --- |
| **Option A: Official Figma MCP** | HTTP remote server + OAuth | Fast setup for MCP-aware clients with browser login |
| **Option B: Framelink stdio** | Node.js + `figma-developer-mcp` | Local stdio server for Code Mode and scripted workflows |

### Option Comparison

| Property | Option A: Official HTTP/OAuth | Option B: Framelink stdio |
| --- | --- | --- |
| Server | `https://mcp.figma.com/mcp` | `npx figma-developer-mcp --stdio` |
| Transport | HTTP | stdio |
| Authentication | OAuth browser login | Figma Personal Access Token |
| Node.js required | No | Yes, Node.js 18+ |
| Best for | Claude Code, Cursor, VS Code, Claude Desktop quick setup | Code Mode, local bundled server, pinned local workflows |
| Secret handling | OAuth session in client | `.env`, OS env, or client env block |
| Recommended default | Yes | Use when Code Mode or stdio is required |

```
┌─────────────────────────────────────────────────────────────┐
│                    Your AI Assistant                         │
│  (Claude Code, OpenCode, VS Code Copilot, Cursor, Desktop)  │
└──────────────────────┬──────────────────┬───────────────────┘
                       │                  │
                       ▼                  ▼
┌─────────────────────────────┐  ┌────────────────────────────┐
│  Option A: Official MCP     │  │  Option B: Framelink MCP   │
│  HTTP remote endpoint       │  │  Local stdio process       │
│  • https://mcp.figma.com    │  │  • npx figma-developer-mcp │
│  • OAuth browser login      │  │  • Node.js 18+             │
│  • No local install         │  │  • Personal Access Token   │
│  • Client-managed session   │  │  • Code Mode ready         │
└──────────────┬──────────────┘  └─────────────┬──────────────┘
               │                               │
               ▼                               ▼
┌─────────────────────────────┐  ┌────────────────────────────┐
│  Figma MCP HTTP Server      │  │  .env / MCP client config  │
│  OAuth access to Figma API  │  │  figma_FIGMA_API_KEY       │
│  18 native Figma tools      │  │  18 native Figma tools     │
└──────────────┬──────────────┘  └─────────────┬──────────────┘
               │                               │
               └───────────────┬───────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       Figma API                              │
│  Files, nodes, images, components, styles, teams, comments   │
└─────────────────────────────────────────────────────────────┘
```

### Core Principle

> **Install once, verify before each operation.** The Figma MCP Agent must confirm tool availability and authentication before file, node, export, component, style, team, or comment work.

---

## 2. 📋 PREREQUISITES

### Option A: Official Figma MCP

| Requirement | Details |
| --- | --- |
| **Figma account** | Free or paid account with access to the target files |
| **Browser** | Required for OAuth popup and consent flow |
| **MCP-aware AI client** | Claude Code, OpenCode, VS Code Copilot, Cursor, Claude Desktop, or equivalent |

No Node.js, npm, local package, or Personal Access Token is required for Option A.

### Option B: Framelink stdio

| Requirement | Details |
| --- | --- |
| **Node.js** | Version 18.0.0 or newer |
| **npm** | Included with Node.js |
| **Figma Personal Access Token** | Generated in Figma settings, used as `FIGMA_API_KEY` |
| **MCP-aware AI client** | Any client that can launch stdio MCP servers |
| **Code Mode** | Optional but recommended for `.utcp_config.json` workflows |

Check Node.js:

```bash
node --version
```

Install or upgrade with nvm:

```bash
nvm install 18
```

Use the installed version:

```bash
nvm use 18
```

Install with Homebrew on macOS:

```bash
brew install node
```

### Get a Figma Personal Access Token (Option B Only)

1. Open [Figma Settings](https://www.figma.com/settings)
2. Go to **Personal access tokens**
3. Generate a new token
4. Copy it immediately
5. Store it in `.env` or your MCP client secret manager

### File Keys and Node IDs

The file key is the alphanumeric segment in a Figma URL:

```text
https://www.figma.com/file/ABC123xyz/My-Design-File
                           └─────────┘
                           fileKey
```

Node IDs often appear as `node-id=1-234` in URLs. MCP tools usually expect colon syntax:

```text
URL node-id=1-234  ->  MCP node ID "1:234"
```

### Validation: `phase_1_complete`

**Option A:**

```bash
echo "Figma account, browser, and MCP client ready"
```

**Option B:**

```bash
node --version
```

**Checklist:**
- [ ] **Option A:** Figma account can open the target file?
- [ ] **Option A:** Browser popups are allowed for OAuth?
- [ ] **Option A:** MCP client supports HTTP servers?
- [ ] **Option B:** Node.js is 18.0.0 or newer?
- [ ] **Option B:** Personal Access Token is created and stored securely?

❌ **STOP if validation fails.** Fix prerequisites before installing or configuring MCP.

---

## 3. 📥 INSTALLATION

Choose one path. Option A is recommended unless you specifically need Code Mode or a stdio-only MCP client.

### Option A: Official Figma MCP (Recommended)

There is no package to install. Add the remote MCP endpoint to your client.

#### Claude Code CLI

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Restart Claude Code after adding the server.

#### OpenCode (`opencode.json`)

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

#### VS Code Copilot (`.vscode/mcp.json`)

```json
{
  "servers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

#### Cursor (`.cursor/mcp.json`)

```json
{
  "servers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

#### Claude Desktop (`claude_desktop_config.json`)

Config file locations:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "figma": {
      "type": "http",
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```

First use triggers OAuth. Sign in with the Figma account that has access to the target file.

### Option B: Framelink stdio

Use Option B when your client needs stdio, when you need Code Mode, or when you prefer a local MCP process.

#### Standalone (Any MCP Client)

```json
{
  "mcpServers": {
    "Framelink Figma MCP": {
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--figma-api-key=YOUR-FIGMA-TOKEN", "--stdio"]
    }
  }
}
```

Replace `YOUR-FIGMA-TOKEN` with your Personal Access Token. Prefer the environment-variable version below for repeatable setup.

#### Standalone with Environment Variable

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

Add the unprefixed variable for standalone MCP clients:

```bash
FIGMA_API_KEY=figd_your_token_here
```

#### Code Mode Integration (`.utcp_config.json`)

For Code Mode, configure Figma as the `figma` MCP provider:

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

Code Mode reads the provider-prefixed environment variable from `.env`:

```bash
figma_FIGMA_API_KEY=figd_your_token_here
```

#### OpenCode (`opencode.json`)

```json
{
  "mcp": {
    "figma": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "${FIGMA_API_KEY}"
      }
    }
  }
}
```

#### Local-Bundled Invocation

This repo includes a bundled Framelink package under `mcp servers/figma-mcp-stdio/node_modules/`. Use it when you want runtime to avoid an `npx` network fetch.

Install bundled dependencies if `node_modules/` is absent:

```bash
cd "mcp servers/figma-mcp-stdio"
```

```bash
./install.sh
```

Use the local CLI entrypoint:

```json
{
  "mcpServers": {
    "Framelink Figma MCP (local)": {
      "command": "node",
      "args": ["./node_modules/figma-developer-mcp/dist/cli.js", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "${FIGMA_API_KEY}"
      },
      "cwd": "/Users/michelkerkmeester/MEGA/Development/AI_Systems/Barter/MCP Agents/Figma/mcp servers/figma-mcp-stdio"
    }
  }
}
```

### Validation: `phase_2_complete`

**Option A:**

```bash
bash "mcp servers/figma-mcp-http/verify.sh"
```

**Option B:**

```bash
npx -y figma-developer-mcp --help
```

**Local bundled Option B:**

```bash
cd "mcp servers/figma-mcp-stdio"
```

```bash
npm run verify
```

**Checklist:**
- [ ] **Option A:** HTTP endpoint responds?
- [ ] **Option A:** Client config includes `https://mcp.figma.com/mcp`?
- [ ] **Option B:** Framelink help output appears?
- [ ] **Option B:** Local bundle exists if using local-bundled invocation?
- [ ] MCP client has been fully restarted after config changes?

❌ **STOP if validation fails.** Fix config syntax, client support, Node.js version, or network access before continuing.

---

## 4. ⚙️ CONFIGURATION

Configuration is mostly client-specific. The critical difference is authentication: Option A uses OAuth; Option B uses a Personal Access Token.

### `.env` File Setup

Create a `.env` file in the project root or wherever your MCP client loads environment variables.

For standalone Framelink:

```bash
FIGMA_API_KEY=figd_your_token_here
```

For Code Mode:

```bash
figma_FIGMA_API_KEY=figd_your_token_here
```

### Code Mode Environment Prefix Rule

Code Mode prefixes environment variables with the provider `name` from `.utcp_config.json`. If the provider is named `figma`, the required `.env` key is:

```bash
figma_FIGMA_API_KEY=figd_your_token_here
```

This is critical. Do not use only the bare variable for Code Mode:

```bash
FIGMA_API_KEY=figd_your_token_here
```

The bare variable is fine for standalone MCP clients, but Code Mode will fail with a "Variable not found" error unless `figma_FIGMA_API_KEY` exists.

### Token Security Notes

| Rule | Reason |
| --- | --- |
| Never commit `.env` | Personal Access Tokens grant access to Figma files |
| Prefer env vars over inline args | Config files are commonly shared or copied |
| Rotate tokens if exposed | Figma tokens can be revoked and regenerated |
| Use OAuth when possible | Option A avoids local token handling |
| Restart after changes | Most MCP clients load env vars only at startup |

Add `.env` to `.gitignore` if it is not already ignored:

```bash
grep -q '^.env$' .gitignore || echo '.env' >> .gitignore
```

### Tool Naming Convention

All Code Mode examples use the full namespace:

```typescript
await figma.figma_check_api_key({});
```

Common mistakes:

| Wrong | Correct |
| --- | --- |
| `figma.get_file({...})` | `figma.figma_get_file({...})` |
| `figma.figma.get_file({...})` | `figma.figma_get_file({...})` |
| `figma.figma_getFile({...})` | `figma.figma_get_file({...})` |

### Validation: `phase_3_complete`

Validate JSON config syntax:

```bash
python3 -m json.tool .utcp_config.json >/dev/null
```

Check Code Mode env var without printing the token:

```bash
test -n "$figma_FIGMA_API_KEY" && echo "figma_FIGMA_API_KEY is set"
```

Check standalone env var without printing the token:

```bash
test -n "$FIGMA_API_KEY" && echo "FIGMA_API_KEY is set"
```

**Checklist:**
- [ ] Option A config uses HTTP URL exactly?
- [ ] Option B config uses `figma-developer-mcp` and `--stdio`?
- [ ] Code Mode `.env` uses `figma_FIGMA_API_KEY`?
- [ ] `.env` is ignored by git?
- [ ] MCP client restarted after config changes?

❌ **STOP if validation fails.** Fix JSON, env naming, or client restart state before verification.

---

## 5. ✅ VERIFICATION

The Figma MCP Agent verifies two things before operating: tool discovery and authentication.

### Option A: OAuth Flow Walkthrough

1. Start your MCP client after adding the HTTP config
2. Ask for any Figma operation, such as listing Figma tools or reading a file
3. Browser opens the Figma OAuth screen
4. Sign in with the Figma account that has file access
5. Approve the MCP connection
6. Return to your AI client
7. Retry the Figma request if the first call only initiated auth

If the popup does not appear, copy the OAuth URL from the client output and open it manually.

### Option B: MCP Command Sequence

Use tool discovery first:

```typescript
search_tools({ task_description: "figma file components styles images comments", limit: 20 });
```

Then verify authentication:

```typescript
await figma.figma_check_api_key({});
```

Then test a shallow file call:

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

### Run the HTTP Endpoint Check

From the repo root:

```bash
bash "mcp servers/figma-mcp-http/verify.sh"
```

This checks DNS, HTTPS reachability, and MCP protocol response for `https://mcp.figma.com/mcp`. It does not complete OAuth because OAuth requires the browser flow inside your MCP client.

### Verification Checklist

| Check | Option | Command | Expected Result |
| --- | --- | --- | --- |
| HTTP endpoint reachable | A | `bash "mcp servers/figma-mcp-http/verify.sh"` | Endpoint responds |
| OAuth complete | A | First Figma request | Browser login succeeds |
| Node.js ready | B | `node --version` | 18.0.0+ |
| Framelink starts | B | `npx -y figma-developer-mcp --help` | Help output |
| Tools discovered | A/B | `search_tools({ task_description: "figma" })` | Figma tools listed |
| Auth checked | B | `await figma.figma_check_api_key({})` | Configured/valid status |
| File access | A/B | `figma_get_file` with known file key | File metadata returned |

### Validation: `phase_4_complete`

**Checklist:**
- [ ] Tool discovery returns Figma tools?
- [ ] OAuth or token auth is valid?
- [ ] A shallow `figma_get_file` call works for a file you can access?
- [ ] Node IDs are normalized from `1-234` to `1:234` when needed?
- [ ] You know which option your client is using?

❌ **STOP if validation fails.** Use Troubleshooting before trying file, node, export, component, style, team, or comment operations.

---

## 6. 🚀 USAGE

### First-Run Example

After configuration and verification, ask:

```text
$file ABC123xyz depth 1
```

The Figma MCP Agent should:
1. Survey the request and extract the file key
2. Yield the required MCP route
3. Navigate tool selection to `figma_get_file`
4. Create the requested file summary

### Command Shortcuts

| Command | Shortcut | Function |
| --- | --- | --- |
| `$file` | `$f` | Retrieve file metadata, pages, and document tree |
| `$node` | `$n` | Inspect specific node IDs |
| `$export` | `$e` | Render nodes as PNG, JPG, SVG, or PDF |
| `$component` | `$c` | List file/team components or inspect component keys |
| `$style` | `$s` | Extract file/team styles and token metadata |
| `$team` | `$t` | Navigate team projects and project files |
| `$comment` | `$cm` | Read, post, reply to, or delete comments |
| `$auth` | `$a` | Check authentication status |
| `$interactive` | `$int` | Guided single-question workflow |

### Common Invocations

```text
$file ABC123xyz depth 2
```

```text
$node ABC123xyz 1:234 depth 2
```

```text
$export ABC123xyz node 1:234 png scale 2
```

```text
$component ABC123xyz list file components
```

```text
$style ABC123xyz extract design tokens
```

```text
$team 123456 list projects
```

```text
$comment ABC123xyz read all comments
```

```text
$auth check figma setup
```

### Operation Routing

| Request Type | Primary Tool | Notes |
| --- | --- | --- |
| File overview | `figma_get_file` | Use shallow `depth` first for large files |
| Specific frame or layer | `figma_get_file_nodes` | Prefer when node IDs are known |
| Rendered asset | `figma_get_image` | Use multiple IDs in one request when possible |
| Embedded raster fills | `figma_get_image_fills` | Gets original placed image URLs |
| File components | `figma_get_file_components` | Best for design-system file inventory |
| File styles | `figma_get_file_styles` | Best for colors, type, effects, grids |
| Team projects | `figma_get_team_projects` | Requires team ID |
| Project files | `figma_get_project_files` | Requires project ID |
| Comments | `figma_get_comments`, `figma_post_comment` | Delete requires explicit confirmation |

---

## 7. 🎯 FEATURES

### Capability Summary

| Category | Tools | Capability |
| --- | --- | --- |
| **File Management** | `figma_get_file`, `figma_get_file_nodes` | Read complete files or targeted nodes |
| **Authentication** | `figma_check_api_key`, `figma_set_api_key` | Validate or set Framelink token state |
| **Images** | `figma_get_image`, `figma_get_image_fills` | Export rendered nodes or embedded fills |
| **Comments** | `figma_get_comments`, `figma_post_comment`, `figma_delete_comment` | Review and manage comment threads |
| **Team / Projects** | `figma_get_team_projects`, `figma_get_project_files` | Browse team and project file structure |
| **Components** | `figma_get_file_components`, `figma_get_component`, `figma_get_team_components`, `figma_get_team_component_sets` | Inventory components and variants |
| **Styles** | `figma_get_file_styles`, `figma_get_style`, `figma_get_team_styles` | Extract published style metadata |

### Priority Categories

| Priority | Tools | Use |
| --- | --- | --- |
| **High** | `figma_get_file`, `figma_get_file_nodes`, `figma_get_image`, `figma_get_file_components`, `figma_get_file_styles` | Most daily Figma MCP work |
| **Medium** | `figma_get_image_fills`, `figma_get_comments`, `figma_post_comment`, `figma_get_team_projects`, `figma_get_project_files`, `figma_get_component`, `figma_get_style` | Situational workflows |
| **Low** | `figma_set_api_key`, `figma_check_api_key`, `figma_delete_comment`, `figma_get_team_components`, `figma_get_team_component_sets`, `figma_get_team_styles` | Setup, rare operations, broad inventory |

### Export Formats

| Format | Use Case | Notes |
| --- | --- | --- |
| `png` | UI previews, raster assets | Supports scale 0.01 to 4 |
| `jpg` | Photos, large backgrounds | Smaller output than PNG |
| `svg` | Icons and vector assets | Optional SVG ID/stroke flags |
| `pdf` | Page or frame handoff | Useful for print-like review |

---

## 8. 💡 EXAMPLES

### Example 1: Get File Structure

```typescript
call_tool_chain({
  code: `
    const file = await figma.figma_get_file({
      fileKey: "abc123XYZ",
      depth: 1
    });

    return {
      name: file.name,
      lastModified: file.lastModified,
      pages: file.document.children.map(page => ({
        id: page.id,
        name: page.name
      }))
    };
  `
});
```

### Example 2: Inspect Specific Nodes

```typescript
call_tool_chain({
  code: `
    const nodes = await figma.figma_get_file_nodes({
      fileKey: "abc123XYZ",
      node_ids: ["1:234", "1:235"],
      depth: 2
    });

    return nodes;
  `
});
```

### Example 3: Export a Frame as PNG

```typescript
call_tool_chain({
  code: `
    const images = await figma.figma_get_image({
      fileKey: "abc123XYZ",
      ids: ["1:234"],
      format: "png",
      scale: 2
    });

    return images;
  `
});
```

### Example 4: Extract Components and Styles

```typescript
call_tool_chain({
  code: `
    const fileKey = "abc123XYZ";

    const [components, styles] = await Promise.all([
      figma.figma_get_file_components({ fileKey }),
      figma.figma_get_file_styles({ fileKey })
    ]);

    return {
      componentCount: components.meta.components.length,
      styleCount: styles.meta.styles.length,
      components: components.meta.components.map(component => ({
        name: component.name,
        key: component.key,
        nodeId: component.node_id
      })),
      styles: styles.meta.styles.map(style => ({
        name: style.name,
        type: style.style_type,
        key: style.key
      }))
    };
  `
});
```

### Example 5: Read Comments and Post a Reply

```typescript
call_tool_chain({
  code: `
    const fileKey = "abc123XYZ";

    const comments = await figma.figma_get_comments({ fileKey });

    const reply = await figma.figma_post_comment({
      fileKey,
      message: "Create implementation note: reviewed via Figma MCP Agent.",
      comment_id: comments.comments[0].id
    });

    return {
      existingCommentCount: comments.comments.length,
      reply
    };
  `
});
```

---

## 9. 🔧 TROUBLESHOOTING

### Option A Issues

| Issue | Cause | Solution |
| --- | --- | --- |
| OAuth popup does not open | Browser popup blocked or client cannot launch browser | Copy the OAuth URL from client output and open it manually; allow popups for Figma |
| OAuth fails repeatedly | Stale browser session or wrong account | Sign out of Figma, clear Figma cookies if needed, retry and use the account with file access |
| File not accessible after OAuth | Authenticated account lacks access | Open the file in browser with the same account; request view access from the file owner |
| HTTP endpoint timeout | Network issue or temporary Figma service problem | Run `bash "mcp servers/figma-mcp-http/verify.sh"` and retry after 30 seconds |

### Option B Issues

| Issue | Cause | Solution |
| --- | --- | --- |
| `"Variable not found"` | Code Mode `.env` used `FIGMA_API_KEY` instead of `figma_FIGMA_API_KEY` | Set `figma_FIGMA_API_KEY=figd_...`, restart the client, retry auth check |
| Invalid token | Token expired, revoked, malformed, or copied with extra characters | Regenerate token in Figma settings and update `.env` |
| `command not found: npx` | Node.js/npm not installed or not on PATH | Install Node.js 18+ and restart the terminal/client |
| Framelink does not start | Missing dependency or broken local bundle | Run `npx -y figma-developer-mcp --help` or `cd "mcp servers/figma-mcp-stdio"` then `./install.sh` |
| Tool not found | Wrong function namespace or client did not load MCP server | Use `figma.figma_get_file`, restart the MCP client, run tool discovery |

### Figma Operation Issues

| Issue | Cause | Solution |
| --- | --- | --- |
| Rate limits | Too many file, export, or team requests in a short window | Batch node IDs, reduce depth, paginate team calls, and retry after a delay |
| Node ID changes after design edit | Figma node was deleted, duplicated, detached, or moved through edits | Re-fetch the file tree and use current node IDs |
| `404 Not Found` | Wrong file key, node ID, project ID, or team ID | Copy IDs directly from the latest Figma URL or tool output |
| `403 Forbidden` | Authenticated account or token lacks permission | Share the file/team/project with that account or regenerate token under the right user |
| Empty components list | File has no published components or none accessible through API | Check the Assets panel and publish library components if needed |
| Empty styles list | File has no published styles or styles are local/unpublished | Check the Styles panel and publish token styles if needed |

### Recovery Commands

Check Official endpoint:

```bash
bash "mcp servers/figma-mcp-http/verify.sh"
```

Check Node.js:

```bash
node --version
```

Check Framelink:

```bash
npx -y figma-developer-mcp --help
```

Discover tools:

```typescript
search_tools({ task_description: "figma tools", limit: 20 });
```

Verify auth:

```typescript
await figma.figma_check_api_key({});
```

---

## 10. 📚 RESOURCES

### Official and Project Resources

- **Official Figma MCP Server**: [developers.figma.com/docs/figma-mcp-server](https://developers.figma.com/docs/figma-mcp-server/)
- **Figma MCP Endpoint**: `https://mcp.figma.com/mcp`
- **Framelink / figma-developer-mcp**: [github.com/GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP)

### Local References

| Document | Purpose |
| --- | --- |
| [AGENTS.md](./AGENTS.md) | Figma MCP Agent routing, persona, and operational rules |
| [knowledge base/system/Figma - System - Prompt - v0.100.md](./knowledge%20base/system/Figma%20-%20System%20-%20Prompt%20-%20v0.100.md) | Command routing, tool verification, and SYNC behavior |
| [knowledge base/integrations/Figma - Integrations - MCP Knowledge - v0.100.md](./knowledge%20base/integrations/Figma%20-%20Integrations%20-%20MCP%20Knowledge%20-%20v0.100.md) | 18-tool MCP reference and integration notes |
| [mcp servers/figma-mcp-http/config-snippets.md](./mcp%20servers/figma-mcp-http/config-snippets.md) | Option A client snippets |
| [mcp servers/figma-mcp-http/verify.sh](./mcp%20servers/figma-mcp-http/verify.sh) | Official HTTP endpoint verification |
| [mcp servers/figma-mcp-stdio/config-snippets.md](./mcp%20servers/figma-mcp-stdio/config-snippets.md) | Option B client snippets |
| [mcp servers/figma-mcp-stdio/install.sh](./mcp%20servers/figma-mcp-stdio/install.sh) | Local bundled Framelink install |

### Quick Start Checklist

- [ ] Choose Option A Official HTTP/OAuth or Option B Framelink stdio
- [ ] Add the correct MCP client configuration
- [ ] For Option A, complete browser OAuth on first Figma request
- [ ] For Option B, install Node.js 18+ and set the token
- [ ] For Code Mode, use `figma_FIGMA_API_KEY` in `.env`
- [ ] Restart the MCP client after configuration changes
- [ ] Run `bash "mcp servers/figma-mcp-http/verify.sh"` for Option A endpoint reachability
- [ ] Run `search_tools({ task_description: "figma tools" })`
- [ ] Run `await figma.figma_check_api_key({})`
- [ ] Test `$file your_file_key depth 1`
