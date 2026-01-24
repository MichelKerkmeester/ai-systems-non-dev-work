# CapCut MCP Server Installation Guide

A comprehensive guide to installing the JianYing MCP server for AI-powered video editing automation.

---

## 🤖 AI-FIRST INSTALL GUIDE

**Copy and paste this prompt to your AI assistant to get installation help:**

```
I want to install the JianYing MCP server for CapCut/JianYing video editing automation.

Please help me:
1. Choose between Docker (recommended) or native installation
2. Set up the environment and dependencies
3. Configure the MCP server for my environment (I'm using: [Claude Desktop / OpenCode / VS Code Copilot])
4. Verify the server is working
5. Ensure JianYing Pro is properly configured

My operating system is: [macOS / Windows / Linux]
My preferred installation method is: [Docker / Native]

Guide me through each step with the exact commands I need to run.
```

---

## 📋 TABLE OF CONTENTS

1. [📖 OVERVIEW](#1-overview)
2. [📋 PREREQUISITES](#2-prerequisites)
3. [📥 INSTALLATION](#3-installation)
   - [Option A: Docker (Recommended)](#option-a-docker-recommended)
   - [Option B: Native Installation](#option-b-native-installation)
4. [⚙️ CONFIGURATION](#4-configuration)
5. [✅ VERIFICATION](#5-verification)
6. [🚀 USAGE](#6-usage)
7. [🎯 AVAILABLE TOOLS](#7-available-tools)
8. [💡 EXAMPLES](#8-examples)
9. [🔧 TROUBLESHOOTING](#9-troubleshooting)
10. [📚 RESOURCES](#10-resources)

---

## 1. 📖 OVERVIEW

The JianYing MCP server provides AI-powered video editing automation through the pyJianYingDraft library. It enables Claude and other AI assistants to create and manipulate video projects that can be opened in JianYing Pro (CapCut's Chinese desktop version).

### Key Features

- **Draft Management**: Create video projects with custom resolution/framerate
- **Video Processing**: Add clips, animations, transitions, filters, masks
- **Audio Processing**: Add music/audio, effects, fades, keyframes
- **Text Overlays**: Add titles, captions with animations
- **Effect Discovery**: Find available effects by type
- **JianYing Integration**: Export drafts directly to JianYing Pro

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Your AI Assistant                        │
│  (Claude Desktop, OpenCode, VS Code Copilot, etc.)          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  JianYing MCP Server                        │
│   (Python 3.13 + pyJianYingDraft)                           │
│   • 18 video editing tools                                  │
│   • Draft creation and export                               │
│   • Effect and resource management                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  JianYing Pro Desktop                       │
│   • Open exported drafts                                    │
│   • Preview and fine-tune                                    │
│   • Render final video                                       │
└─────────────────────────────────────────────────────────────┘
```

### JianYing / CapCut Relationship

| Product          | Region        | Platform              |
| ---------------- | ------------- | --------------------- |
| **JianYing Pro** | China         | Desktop (Mac/Windows) |
| **CapCut**       | International | Desktop + Mobile      |

> **Note:** JianYing and CapCut are the same product by ByteDance. The MCP server works with JianYing Pro desktop application.

### Installation Methods Comparison

| Feature          | Docker (Recommended)     | Native                      |
| ---------------- | ------------------------ | --------------------------- |
| Setup complexity | Low                      | Medium                      |
| Dependencies     | Docker Desktop only      | Python 3.13+, uv, mediainfo |
| Isolation        | Full container isolation | Shared system environment   |
| Portability      | High                     | Medium                      |
| Updates          | Rebuild container        | uv sync                     |

---

## 2. 📋 PREREQUISITES

### For Both Methods

- **JianYing Pro** desktop application
  - Download from: https://www.capcut.cn/
  - Install and launch at least once

### For Docker Installation (Recommended)

- **Docker Desktop** installed and running
  ```bash
  # Check Docker is running
  docker --version
  docker ps
  ```

### For Native Installation

- **Python 3.13+** (required by pyJianYingDraft)
  ```bash
  # Check Python version
  python --version

  # If not installed or wrong version, use pyenv:
  brew install pyenv  # macOS
  pyenv install 3.13.0
  pyenv global 3.13.0
  ```

- **uv** package manager
  ```bash
  # Install uv
  curl -LsSf https://astral.sh/uv/install.sh | sh

  # Verify installation
  uv --version
  ```

- **Git** for cloning repositories
  ```bash
  git --version
  ```

---

## 3. 📥 INSTALLATION

### Option A: Docker (Recommended)

Docker provides isolated, reproducible environments with minimal setup.

#### Step 1: Navigate to Repository

```bash
cd "/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/mcp server/jianying-mcp"
```

#### Step 2: Configure Docker Desktop File Sharing

Open **Docker Desktop → Settings → Resources → File Sharing** and add:

- `/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/data`
- `/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/export`
- `/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/media`

> **Important:** Docker Desktop must have permission to access these paths for volume mounts to work.

#### Step 3: Build and Start Container

```bash
docker-compose up -d --build
```

This will:
1. Build the Docker image with Python 3.13 + mediainfo
2. Install pyJianYingDraft dependencies
3. Start the container in detached mode

#### Step 4: Verify Container is Running

```bash
docker ps | grep jianying-mcp
```

Expected output:
```
CONTAINER ID   IMAGE           STATUS      NAMES
abc123...      jianying-mcp    Up 2 min    jianying-mcp
```

#### Volume Paths (Docker)

| Container Path | Host Path       | Purpose                                 |
| -------------- | --------------- | --------------------------------------- |
| `/data`        | `CapCut/data`   | Draft operation data (read-write)       |
| `/output`      | `CapCut/export` | Exported JianYing projects (read-write) |
| `/media`       | `CapCut/media`  | Source video/audio files (read-only)    |

---

### Option B: Native Installation

Native installation runs directly on your system without Docker.

#### Step 1: Create Folder Structure

```bash
# Create main directory
mkdir -p ~/MCP\ Servers/CapCut
cd ~/MCP\ Servers

# Create JianYing working directories
mkdir -p ~/MCP\ Servers/CapCut/data
mkdir -p ~/MCP\ Servers/CapCut/drafts
mkdir -p ~/MCP\ Servers/CapCut/media
```

#### Step 2: Clone Repository

```bash
# Clone JianYing MCP
cd ~/MCP\ Servers/CapCut
git clone https://github.com/hey-jian-wei/jianying-mcp.git
cd jianying-mcp
```

#### Step 3: Install Dependencies

```bash
# Install with uv
uv sync

# Verify installation
uv run python -c "import pyJianYingDraft; print('OK')"
```

#### Step 4: Set Environment Variables

**macOS/Linux (add to ~/.zshrc or ~/.bashrc):**
```bash
export SAVE_PATH="$HOME/MCP Servers/CapCut/data"
export OUTPUT_PATH="$HOME/MCP Servers/CapCut/drafts"
```

**Windows (PowerShell):**
```powershell
[Environment]::SetEnvironmentVariable("SAVE_PATH", "$env:USERPROFILE\MCP Servers\CapCut\data", "User")
[Environment]::SetEnvironmentVariable("OUTPUT_PATH", "$env:USERPROFILE\MCP Servers\CapCut\drafts", "User")
```

**Reload shell:**
```bash
source ~/.zshrc  # or ~/.bashrc
```

#### Step 5: Test Server Locally

```bash
# Start the server
cd ~/MCP\ Servers/CapCut/jianying-mcp
uv run server.py

# Should see: "JianYing MCP Server running..."
```

---

## 4. ⚙️ CONFIGURATION

Configure the MCP server for your AI platform:

### For Docker Installation

#### Claude Desktop (Docker)

```json
{
  "mcpServers": {
    "jianying": {
      "command": "docker",
      "args": ["exec", "-i", "jianying-mcp", "uv", "run", "python", "-m", "jianyingdraft.server"],
      "env": {}
    }
  }
}
```

#### OpenCode via Code Mode (Docker)

Add to `.utcp_config.json`:

```json
{
  "name": "jianying",
  "call_template_type": "mcp",
  "config": {
    "mcpServers": {
      "jianying": {
        "transport": "stdio",
        "command": "docker",
        "args": ["exec", "-i", "jianying-mcp", "uv", "run", "python", "-m", "jianyingdraft.server"],
        "env": {}
      }
    }
  }
}
```

#### VS Code Copilot (Docker)

Create `.vscode/mcp.json`:

```json
{
  "mcpServers": {
    "jianying": {
      "command": "docker",
      "args": ["exec", "-i", "jianying-mcp", "uv", "run", "python", "-m", "jianyingdraft.server"],
      "env": {}
    }
  }
}
```

---

### For Native Installation

#### Claude Desktop (Native)

Open the configuration file:

```bash
# macOS
open ~/Library/Application\ Support/Claude/claude_desktop_config.json

# If file doesn't exist, create it:
mkdir -p ~/Library/Application\ Support/Claude/
touch ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Add:

```json
{
  "mcpServers": {
    "jianying": {
      "command": "uv",
      "args": ["run", "server.py"],
      "cwd": "/Users/yourusername/MCP Servers/CapCut/jianying-mcp",
      "env": {
        "SAVE_PATH": "/Users/yourusername/MCP Servers/CapCut/data",
        "OUTPUT_PATH": "/Users/yourusername/MCP Servers/CapCut/drafts"
      }
    }
  }
}
```

#### OpenCode (Native)

Add to `opencode.json`:

```json
{
  "mcp": {
    "jianying": {
      "type": "local",
      "command": ["uv", "run", "server.py"],
      "cwd": "/Users/yourusername/MCP Servers/CapCut/jianying-mcp",
      "env": {
        "SAVE_PATH": "/Users/yourusername/MCP Servers/CapCut/data",
        "OUTPUT_PATH": "/Users/yourusername/MCP Servers/CapCut/drafts"
      }
    }
  }
}
```

#### VS Code Copilot (Native)

Create `.vscode/mcp.json`:

```json
{
  "mcpServers": {
    "jianying": {
      "command": "uv",
      "args": ["run", "server.py"],
      "cwd": "/path/to/jianying-mcp",
      "env": {
        "SAVE_PATH": "/path/to/data",
        "OUTPUT_PATH": "/path/to/drafts"
      }
    }
  }
}
```

**Restart your AI client** after configuration changes.

---

## 5. ✅ VERIFICATION

### Docker Verification

```bash
# Check 1: Container running
docker ps | grep jianying-mcp

# Check 2: Container logs
docker logs jianying-mcp

# Check 3: Test MCP directly
docker exec -i jianying-mcp uv run python -m jianyingdraft.server
# Press Ctrl+C to exit
```

### Native Verification

```bash
# Check 1: Server starts
cd ~/MCP\ Servers/CapCut/jianying-mcp
uv run server.py

# Check 2: Environment variables
echo $SAVE_PATH
echo $OUTPUT_PATH
```

### Test in AI Client

Open Claude Desktop and try:

```
Can you check the JianYing MCP connection?
```

Expected response:
```
🔌 Checking Connections...

**JianYing MCP:**
- Server: Connected
- Rules command: Accessible

Ready for video editing operations!
```

### Verification Checklist

**Docker:**
- [ ] Docker Desktop installed and running
- [ ] File sharing enabled for required paths
- [ ] Container built (`docker-compose up -d --build`)
- [ ] Container running (`docker ps`)
- [ ] MCP configuration added
- [ ] AI client restarted
- [ ] Connection test passed
- [ ] JianYing Pro installed

**Native:**
- [ ] Python 3.13+ installed
- [ ] uv package manager installed
- [ ] Repository cloned
- [ ] Dependencies installed (uv sync)
- [ ] Environment variables set (SAVE_PATH, OUTPUT_PATH)
- [ ] Server starts without errors
- [ ] MCP configuration added
- [ ] AI client restarted
- [ ] Connection test passed
- [ ] JianYing Pro installed

---

## 6. 🚀 USAGE

### Basic Workflow

| Step | Action           | Description                          |
| ---- | ---------------- | ------------------------------------ |
| 1    | Create draft     | Set up project with resolution/fps   |
| 2    | Create tracks    | Add video, audio, text tracks        |
| 3    | Add segments     | Place content on timeline            |
| 4    | Apply effects    | Add animations, transitions, filters |
| 5    | Export draft     | Save to JianYing format              |
| 6    | Open in JianYing | Preview and render                   |

### Quick Commands

| Command                 | Function           |
| ----------------------- | ------------------ |
| `$draft`                | Create new project |
| `$video` / `$vid`       | Video operations   |
| `$audio` / `$aud`       | Audio operations   |
| `$text` / `$txt`        | Text overlays      |
| `$interactive` / `$int` | Full guided flow   |

### Time Format

All time parameters use string format:
- `"1s"` - 1 second
- `"1.5s"` - 1.5 seconds
- `"0s-10s"` - Range from 0 to 10 seconds
- `"2s-4.5s"` - Range from 2 to 4.5 seconds

### Media File Access

- **Docker:** Place files in `CapCut/media/` → accessible at `/media/` in container
- **Native:** Use full paths or relative paths from your working directory

---

## 7. 🎯 AVAILABLE TOOLS

### Draft Management (3 tools)

| Tool           | Purpose                          |
| -------------- | -------------------------------- |
| `rules`        | Connection check, get guidelines |
| `create_draft` | Create new video project         |
| `export_draft` | Export to JianYing format        |

### Track Management (1 tool)

| Tool           | Purpose               |
| -------------- | --------------------- |
| `create_track` | Create timeline track |

### Video Operations (8 tools)

| Tool                           | Purpose                          |
| ------------------------------ | -------------------------------- |
| `add_video_segment`            | Add video clip to timeline       |
| `add_video_animation`          | Add entrance/exit animation      |
| `add_video_transition`         | Add transition between clips     |
| `add_video_filter`             | Apply visual filter              |
| `add_video_mask`               | Add mask effect                  |
| `add_video_background_filling` | Fill background for aspect ratio |
| `add_video_keyframe`           | Add keyframe animation           |
| `add_video_effect`             | Add scene/character effect       |

### Audio Operations (4 tools)

| Tool                 | Purpose                    |
| -------------------- | -------------------------- |
| `add_audio_segment`  | Add audio clip to timeline |
| `add_audio_effect`   | Apply audio effect         |
| `add_audio_fade`     | Add fade in/out            |
| `add_audio_keyframe` | Add audio keyframe         |

### Text Operations (2 tools)

| Tool                 | Purpose          |
| -------------------- | ---------------- |
| `add_text_segment`   | Add text overlay |
| `add_text_animation` | Animate text     |

### Utility Tools (2 tools)

| Tool                   | Purpose                    |
| ---------------------- | -------------------------- |
| `parse_media_info`     | Get media file information |
| `find_effects_by_type` | Discover available effects |

---

## 8. 💡 EXAMPLES

### Create a TikTok Video Project

```
User: Create a TikTok video project for a product promo

System: Creating vertical video project...

🎬 Project Created

**Settings:**
- Resolution: 1080x1920 (vertical)
- Framerate: 30 fps
- Platform: TikTok optimized

✅ Draft created successfully!

Next: Add video segments with $video
```

### Add Video with Animation

```
User: Add product.mp4 with fade in animation

System: Adding video segment...

🎬 Video Added

**Segment:**
- Source: /media/product.mp4
- Position: 0s-10s
- Animation: Fade in (500ms)

✅ Segment added with animation!
```

### Discover Available Effects

```
User: What transition effects are available?

System: Searching for transition effects...

🔍 Available Transitions

**TransitionType effects:**
- dissolve
- fade
- wipe_left
- wipe_right
- slide_up
- slide_down
- zoom_in
- zoom_out
- blur
- [... more effects]

Use effect IDs with add_video_transition
```

---

## 9. 🔧 TROUBLESHOOTING

### Docker Issues

#### Container Won't Start

```bash
# Check logs
docker logs jianying-mcp

# Check compose file
docker-compose config
```

#### Volume Mount Permission Denied

**Solution:** Enable file sharing in Docker Desktop:
1. Open Docker Desktop → Settings → Resources → File Sharing
2. Add the required paths
3. Restart Docker Desktop
4. Rebuild container: `docker-compose up -d --build`

#### Container Memory Issues

The docker-compose.yml sets memory limits:
- **Limit:** 2GB
- **Reservation:** 512MB

Adjust in docker-compose.yml if needed:
```yaml
deploy:
  resources:
    limits:
      memory: 4G
```

---

### Native Issues

#### Python Version Error

```
Error: Python 3.13+ required
```

**Solution:**
```bash
# Install Python 3.13 with pyenv
pyenv install 3.13.0
pyenv local 3.13.0

# Verify
python --version
```

#### uv Not Found

```
Error: uv: command not found
```

**Solution:**
```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh

# Reload shell
source ~/.zshrc
```

#### Environment Variables Not Set

```
Error: SAVE_PATH/OUTPUT_PATH undefined
```

**Solution:**
```bash
# Add to ~/.zshrc
export SAVE_PATH="$HOME/MCP Servers/CapCut/data"
export OUTPUT_PATH="$HOME/MCP Servers/CapCut/drafts"

# Reload
source ~/.zshrc
```

---

### Common Issues (Both Methods)

#### MCP Connection Refused

**Docker:**
1. Ensure container is running: `docker ps | grep jianying-mcp`
2. Restart container: `docker-compose restart`
3. Check MCP config uses `docker exec -i jianying-mcp`

**Native:**
1. Ensure server is running: `uv run server.py`
2. Check the cwd path in MCP config is correct
3. Verify environment variables are set in config

**Both:** Restart Claude Desktop completely (⌘Q)

#### Draft Not Appearing in JianYing

**Solutions:**
1. Check the export folder location
2. Verify volume mounts (Docker) or OUTPUT_PATH (Native)
3. Restart JianYing Pro
4. Look in JianYing's "Local" drafts section

---

## 10. 📚 RESOURCES

### Official Repositories

- **JianYing MCP**: https://github.com/hey-jian-wei/jianying-mcp
- **pyJianYingDraft**: https://github.com/hey-jian-wei/pyJianYingDraft

### Tools & Platforms

- **JianYing Pro**: https://www.capcut.cn/ (Chinese)
- **CapCut**: https://www.capcut.com/ (International)
- **Docker Desktop**: https://www.docker.com/products/docker-desktop
- **uv Package Manager**: https://astral.sh/uv
- **Claude Desktop**: https://claude.ai/download

### Docker Commands Reference

| Command                             | Purpose                   |
| ----------------------------------- | ------------------------- |
| `docker-compose up -d --build`      | Build and start container |
| `docker-compose down`               | Stop and remove container |
| `docker-compose restart`            | Restart container         |
| `docker logs jianying-mcp`          | View container logs       |
| `docker exec -it jianying-mcp bash` | Shell into container      |

---

## 🎉 Ready to Go!

Your CapCut MCP system is now configured. Start creating video projects with AI!

**Quick Test:**
1. **Docker:** Verify container: `docker ps | grep jianying-mcp`
   **Native:** Start server: `uv run server.py`
2. Open Claude Desktop
3. Ask: "Check JianYing MCP connection"
4. If connected: "Create a test video project"
5. Open JianYing Pro and find your draft

Enjoy AI-powered video editing! 🎬
