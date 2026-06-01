# Figma MCP — Official HTTP/OAuth Config Snippets (Option A — RECOMMENDED)

Configure the official Figma MCP HTTP endpoint in your MCP-aware AI client. No installation, no API token management — OAuth in the browser.

**Endpoint:** `https://mcp.figma.com/mcp`
**Authentication:** OAuth (browser popup on first use)
**Transport:** HTTP

---

## 1. Claude Code CLI

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Then start Claude Code. The first Figma call triggers a browser OAuth popup.

---

## 2. OpenCode (`opencode.json`)

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

---

## 3. VS Code Copilot (`.vscode/mcp.json`)

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

---

## 4. Cursor (`.cursor/mcp.json`)

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

---

## 5. Claude Desktop (`claude_desktop_config.json`)

Location:
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

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

---

## First-use OAuth flow

1. Configure the server (snippet above)
2. Restart your MCP client
3. Issue any Figma command (e.g., "Get the structure of figma file abc123")
4. Browser popup opens at `https://www.figma.com/oauth/...`
5. Sign in with your Figma account
6. Click **Allow** on the consent screen
7. Browser confirms — return to your AI client
8. Subsequent calls reuse the session

If the browser doesn't open automatically, copy the URL from the popup error and open manually.

---

## Verification

After OAuth, in your AI client:

```bash
search_tools({ task_description: "figma file" })
# → returns figma_get_file, figma_get_image, etc.

figma.figma_check_api_key({})
# → confirms session valid
```

Run `./verify.sh` from this folder for an automated round-trip test.

---

## When to choose this option

Use Option A (Official HTTP/OAuth) when:
- You want zero-install setup (no Node.js, no API token management)
- You use Claude Code, Cursor, VS Code Copilot, or any HTTP-MCP-aware client
- You're on macOS / Linux / Windows without WSL
- You don't need offline / air-gapped operation

Switch to Option B (Framelink stdio, see `../figma-mcp-stdio/config-snippets.md`) when:
- You need Code Mode `call_tool_chain()` integration
- Your client doesn't support HTTP transport
- You need a pinned version (vs. live HTTP endpoint)
- You work offline after initial install

---

## Limitations

- OAuth tokens expire and need refresh (handled automatically by the HTTP server)
- Rate limits per Figma API (apply equally to both Option A and B)
- Some experimental tools may lag stdio version

---

## Troubleshooting

**Browser popup doesn't open:** copy the OAuth URL from the error and open manually.

**OAuth fails:** clear browser cookies for `figma.com`, retry.

**File not accessible after OAuth:** ensure your Figma account has read access; check team membership.

**HTTP timeout:** Figma may rate-limit; retry after 30s. See `INSTALL_GUIDE.md` Troubleshooting for details.
