# Notion MCP Server (Docker)

This folder provides a Docker-based setup for the official Notion MCP server.

Upstream:
- https://github.com/makenotion/notion-mcp-server

## Quick Start (Docker Compose)

1. Create your `.env`:

```bash
cp .env.example .env
```

2. Put your Notion integration token in `.env` (starts with `ntn_`).

3. Build and start:

```bash
docker compose up -d --build
```

4. Configure your MCP client to use the running container.

### Claude Desktop (docker exec)

`~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "notion": {
      "command": "docker",
      "args": ["exec", "-i", "notion-mcp", "notion-mcp-server"],
      "env": {}
    }
  }
}
```

### OpenCode (docker exec)

`opencode.json`

```json
{
  "mcp": {
    "notion": {
      "type": "local",
      "command": ["docker", "exec", "-i", "notion-mcp", "notion-mcp-server"],
      "env": {}
    }
  }
}
```

## Alternative (Recommended by Notion): Docker Run

This does not require `docker compose up`.

```json
{
  "mcpServers": {
    "notion": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "-e", "NOTION_TOKEN", "mcp/notion"],
      "env": {
        "NOTION_TOKEN": "ntn_..."
      }
    }
  }
}
```

## Notes

- Notion requires that pages/databases are explicitly shared with the integration.
- If you set both `NOTION_TOKEN` and `OPENAPI_MCP_HEADERS`, the server may prefer headers.
