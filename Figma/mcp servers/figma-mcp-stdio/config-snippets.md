# Figma MCP — Framelink stdio Config Snippets (Option B)

Configure the bundled `figma-developer-mcp` stdio server in your MCP-aware AI client. All snippets assume:

- This folder (`mcp servers/figma-mcp-stdio/`) is reachable from your client config
- `node_modules/figma-developer-mcp` is installed (run `./install.sh` if absent)
- Your Figma Personal Access Token is available as `FIGMA_API_KEY` (or substitute directly)

> **Token security:** Generate at https://www.figma.com/settings → Personal access tokens. Never commit to git. Use `.env` or your OS keychain.

---

## 1. Standalone (any MCP client)

The simplest setup — runs `figma-developer-mcp` via `npx`. Works in Claude Desktop, Cursor, OpenCode, VS Code Copilot.

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

Replace `YOUR-FIGMA-TOKEN` with your actual Personal Access Token (`figd_...`).

---

## 2. Standalone with environment variable

Same as above but reads the token from `FIGMA_API_KEY` env var (cleaner; no token in config file).

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

`.env` (sibling to your client config):

```bash
FIGMA_API_KEY=figd_your_token_here
```

---

## 3. Code Mode integration (`.utcp_config.json`)

For Code Mode users — the MCP appears as a `figma.figma_<tool>` namespace via `call_tool_chain()`.

```json
{
  "manuals": [
    {
      "name": "figma",
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "figma-developer-mcp", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "${figma_FIGMA_API_KEY}"
      }
    }
  ]
}
```

`.env`:

```bash
# Code Mode prefixes env vars with the manual name
figma_FIGMA_API_KEY=figd_your_token_here
```

> **Critical:** Code Mode prefixes all env vars with `{manual_name}_`. Use `figma_FIGMA_API_KEY`, NOT `FIGMA_API_KEY` (the unprefixed form will fail with "Variable not found").

---

## 4. OpenCode (`opencode.json`)

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

---

## 5. Local-bundled invocation (no `npx` network call)

If you want to use the locally bundled `node_modules/figma-developer-mcp` (no network during runtime):

```json
{
  "mcpServers": {
    "Framelink Figma MCP (local)": {
      "command": "node",
      "args": ["./node_modules/figma-developer-mcp/dist/cli.js", "--stdio"],
      "env": {
        "FIGMA_API_KEY": "${FIGMA_API_KEY}"
      },
      "cwd": "/Users/<you>/MEGA/Development/AI_Systems/Public/Figma/mcp servers/figma-mcp-stdio"
    }
  }
}
```

Adjust `cwd` to the absolute path of this folder on your machine.

---

## Verification

After configuring, restart your MCP client. Then:

```bash
# In your AI client, run:
search_tools({ task_description: "figma file" })
# → should return figma_get_file, figma_get_image, etc.

# Confirm auth:
figma.figma_check_api_key({})
# → returns auth status
```

If verification fails, see `INSTALL_GUIDE.md` Troubleshooting section.

---

## When to choose this option

Use Option B (Framelink stdio) when:
- You're already using Code Mode for multi-tool orchestration
- You need the MCP server pinned to a specific version (vs. live HTTP)
- Your AI client doesn't support HTTP transport (some Cursor/older clients)
- You're working offline or on an air-gapped machine after initial install

Otherwise, prefer Option A (Official HTTP/OAuth) — see `../figma-mcp-http/config-snippets.md`.
