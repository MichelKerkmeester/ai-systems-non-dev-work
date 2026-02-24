# Notion MCP Server Installation Guide

A practical guide to installing and configuring the official Notion MCP server for the Notion Agent system.

---

## 🤖 AI-FIRST INSTALL GUIDE

**Copy and paste this prompt to your AI assistant to get installation help:**

```text
I want to install and configure the Notion MCP server for my Notion Agent.

Please help me:
1. Create a Notion internal integration and get the NOTION_TOKEN
2. Ensure the right pages/databases are shared with the integration
3. Install the Notion MCP server using Docker (preferred) or NPX
4. Configure my MCP client (Claude Desktop / OpenCode / VS Code) with a working config
5. Verify the connection with a simple Notion call

My OS is: [macOS / Windows / Linux]
My preferred install method is: [Docker / NPX]
```

## TABLE OF CONTENTS

  - 1. 📖 OVERVIEW
  - 2. 📋 PREREQUISITES
  - 3. 🔑 NOTION SETUP
  - 4. 📥 INSTALLATION
  - 5. ⚙️ CONFIGURATION
  - 6. ✅ VERIFICATION
  - 7. 🔧 TROUBLESHOOTING
  - 8. 📚 RESOURCES

---

## 1. 📖 OVERVIEW

The Notion MCP server lets MCP-compatible clients (Claude Desktop, OpenCode, etc.) perform native Notion operations (search, pages, databases/data sources, blocks) using your Notion integration token.

This repo includes a Docker Compose setup in `Notion/mcp server/notion-mcp`.

---

## 2. 📋 PREREQUISITES

Before installing the Notion MCP server, ensure you have:

### Required
- **Notion Workspace** (you must be an admin to create integrations)
- **MCP Client** (Claude Desktop, OpenCode, or VS Code)
- **Docker Desktop** (recommended) OR Node.js 18+

---

## 3. 🔑 NOTION SETUP

### Step 1: Create Internal Integration

1. Go to [Notion Integrations](https://www.notion.so/profile/integrations)
2. Click **New integration**
3. Select **Internal** integration
4. Name it (e.g., "Notion Agent")
5. Copy the **Internal Integration Token** (starts with `ntn_`)

### Step 2: Grant Access

Notion will return permission errors unless the content is shared with the integration.

**Method A: Integration Settings (Recommended)**
1. Go to your internal integration settings
2. Navigate to the **Access** tab
3. Search and select pages/databases to share

**Method B: Per-Page Sharing**
1. Open a specific page in Notion
2. Click **...** (three dots) -> **Connections**
3. Search for and select your integration

---

## 4. 📥 INSTALLATION

### Option A: Docker (Recommended)

#### A1. Repo-local Docker Compose (Persistent)

This method keeps a container running in the background, which is faster for repeated use.

1. Navigate to the server directory:
   ```bash
   cd "Notion/mcp server/notion-mcp"
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Add your token to `.env`:
   ```env
   NOTION_TOKEN=ntn_your_token_here
   ```

4. Build and start:
   ```bash
   docker-compose up -d --build
   ```

#### A2. Official Docker Image (On-Demand)

This method spins up a temporary container for each session. No local files needed.

*Configuration only - proceed to Section 5.*

---

### Option B: NPX (No Docker)

Requires Node.js installed locally.

*Configuration only - proceed to Section 5.*

---

## 5. ⚙️ CONFIGURATION

### Claude Desktop

Config file locations:
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**For Docker Compose (Method A1):**
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

**For Docker Run (Method A2):**
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

**For NPX (Option B):**
```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_TOKEN": "ntn_..."
      }
    }
  }
}
```

### OpenCode

Add to `.utcp_config.json` or `opencode.json`:

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

---

## 6. ✅ VERIFICATION

1. **Restart your MCP Client** (fully quit and reopen)
2. **Run a test command**:
   ```text
   Search my Notion for "Home"
   ```
3. **Check Connection Status**:
   If using the Agent system, it will run an automatic connection check.

---

## 7. 🔧 TROUBLESHOOTING

### ❌ Token Issues
**Error:** "Unauthorized" or "Invalid token"
**Fix:**
- Ensure token starts with `ntn_`
- Regenerate token in Notion Integrations dashboard
- Check `.env` file for typos (no quotes needed usually)

### ❌ Permission Errors
**Error:** "Object not found" or "Restricted"
**Fix:**
- The integration **cannot** see your whole workspace by default
- You **MUST** explicitly share pages/databases with the integration user
- Check the "Connections" menu on the specific page you want to access

### ❌ Docker Connection Refused
**Error:** "Error connecting to container"
**Fix:**
- Run `docker ps` to ensure `notion-mcp` is running
- Run `docker logs notion-mcp` to check for startup errors
- Ensure you used the correct command (`docker exec` vs `docker run`) matching your setup

---

## 8. 📚 RESOURCES

- **Official Repo**: [makenotion/notion-mcp-server](https://github.com/makenotion/notion-mcp-server)
- **Notion API Docs**: [developers.notion.com](https://developers.notion.com/)
- **MCP Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io)

