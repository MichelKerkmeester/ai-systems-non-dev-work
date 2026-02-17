<!-- ANCHOR:capcut-mcp-server-installation-guide -->
# CapCut MCP Server Installation Guide

A comprehensive guide to installing the JianYing MCP server for AI-powered video editing automation.

---

<!-- /ANCHOR:capcut-mcp-server-installation-guide -->
<!-- ANCHOR:ai-first-install-guide -->
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

<!-- /ANCHOR:ai-first-install-guide -->
<!-- ANCHOR:table-of-contents -->
## TABLE OF CONTENTS

  - 1. 📖 OVERVIEW
  - 2. 📋 PREREQUISITES
  - 3. 📥 INSTALLATION
  - Option A: Docker (Recommended)
  - Option B: Native Installation
4. ⚙️ CONFIGURATION
5. ✅ VERIFICATION
6. 🚀 USAGE
7. 🎯 AVAILABLE TOOLS
8. 💡 EXAMPLES
9. 🔧 TROUBLESHOOTING
10. 📚 RESOURCES

---

<!-- /ANCHOR:table-of-contents -->
<!-- ANCHOR:1-overview -->
## 1. 📖 OVERVIEW

The JianYing MCP server provides AI-powered video editing automation through the pyJianYingDraft library. It enables Claude and other AI assistants to create and manipulate video projects that can be opened in JianYing Pro (CapCut's Chinese desktop version).

<!-- /ANCHOR:1-overview -->
<!-- ANCHOR:key-features -->
### Key Features

- **Draft Management**: Create video projects with custom resolution/framerate
- **Video Processing**: Add clips, animations, transitions, filters, masks
- **Audio Processing**: Add music/audio, effects, fades, keyframes
- **Text Overlays**: Add titles, captions with animations
- **Effect Discovery**: Find available effects by type
- **JianYing Integration**: Export drafts directly to JianYing Pro

<!-- /ANCHOR:key-features -->
<!-- ANCHOR:architecture -->
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

<!-- /ANCHOR:architecture -->
<!-- ANCHOR:jianying-capcut-relationship -->
### JianYing / CapCut Relationship

| Product          | Region        | Platform              |
| ---------------- | ------------- | --------------------- |
| **JianYing Pro** | China         | Desktop (Mac/Windows) |
| **CapCut**       | International | Desktop + Mobile      |

> **Note:** JianYing and CapCut are the same product by ByteDance. The MCP server works with JianYing Pro desktop application.

<!-- /ANCHOR:jianying-capcut-relationship -->
<!-- ANCHOR:installation-methods-comparison -->
### Installation Methods Comparison

| Feature          | Docker (Recommended)     | Native                      |
| ---------------- | ------------------------ | --------------------------- |
| Setup complexity | Low                      | Medium                      |
| Dependencies     | Docker Desktop only      | Python 3.13+, uv, mediainfo |
| Isolation        | Full container isolation | Shared system environment   |
| Portability      | High                     | Medium                      |
| Updates          | Rebuild container        | uv sync                     |

---

<!-- /ANCHOR:installation-methods-comparison -->
<!-- ANCHOR:2-prerequisites -->
## 2. 📋 PREREQUISITES

<!-- /ANCHOR:2-prerequisites -->
<!-- ANCHOR:for-both-methods -->
### For Both Methods

- **JianYing Pro** desktop application
  - Download from: https://www.capcut.cn/
  - Install and launch at least once

<!-- /ANCHOR:for-both-methods -->
<!-- ANCHOR:for-docker-installation-recommended -->
### For Docker Installation (Recommended)

- **Docker Desktop** installed and running
  ```bash
  # Check Docker is running
  docker --version
  docker ps
  ```

<!-- /ANCHOR:for-docker-installation-recommended -->
<!-- ANCHOR:for-native-installation -->
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

<!-- /ANCHOR:for-native-installation -->
<!-- ANCHOR:3-installation -->
## 3. 📥 INSTALLATION

<!-- /ANCHOR:3-installation -->
<!-- ANCHOR:option-a-docker-recommended -->
### Option A: Docker (Recommended)

Docker provides isolated, reproducible environments with minimal setup.

<!-- /ANCHOR:option-a-docker-recommended -->
<!-- ANCHOR:step-1-navigate-to-repository -->
#### Step 1: Navigate to Repository

```bash
cd "/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/mcp server/jianying-mcp"
```

<!-- /ANCHOR:step-1-navigate-to-repository -->
<!-- ANCHOR:step-2-configure-docker-desktop-file-sharing -->
#### Step 2: Configure Docker Desktop File Sharing

Open **Docker Desktop → Settings → Resources → File Sharing** and add:

- `/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/data`
- `/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/export`
- `/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/media`

> **Important:** Docker Desktop must have permission to access these paths for volume mounts to work.

<!-- /ANCHOR:step-2-configure-docker-desktop-file-sharing -->
<!-- ANCHOR:step-3-build-and-start-container -->
#### Step 3: Build and Start Container

```bash
docker-compose up -d --build
```

This will:
1. Build the Docker image with Python 3.13 + mediainfo
2. Install pyJianYingDraft dependencies
3. Start the container in detached mode

<!-- /ANCHOR:step-3-build-and-start-container -->
<!-- ANCHOR:step-4-verify-container-is-running -->
#### Step 4: Verify Container is Running

```bash
docker ps | grep jianying-mcp
```

Expected output:
```
CONTAINER ID   IMAGE           STATUS      NAMES
abc123...      jianying-mcp    Up 2 min    jianying-mcp
```

<!-- /ANCHOR:step-4-verify-container-is-running -->
<!-- ANCHOR:volume-paths-docker -->
#### Volume Paths (Docker)

| Container Path | Host Path       | Purpose                                 |
| -------------- | --------------- | --------------------------------------- |
| `/data`        | `CapCut/data`   | Draft operation data (read-write)       |
| `/output`      | `CapCut/export` | Exported JianYing projects (read-write) |
| `/media`       | `CapCut/media`  | Source video/audio files (read-only)    |

---

<!-- /ANCHOR:volume-paths-docker -->
<!-- ANCHOR:option-b-native-installation -->
### Option B: Native Installation

Native installation runs directly on your system without Docker.

<!-- /ANCHOR:option-b-native-installation -->
<!-- ANCHOR:step-1-create-folder-structure -->
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

<!-- /ANCHOR:step-1-create-folder-structure -->
<!-- ANCHOR:step-2-clone-repository -->
#### Step 2: Clone Repository

```bash
# Clone JianYing MCP
cd ~/MCP\ Servers/CapCut
git clone https://github.com/hey-jian-wei/jianying-mcp.git
cd jianying-mcp
```

<!-- /ANCHOR:step-2-clone-repository -->
<!-- ANCHOR:step-3-install-dependencies -->
#### Step 3: Install Dependencies

```bash
# Install with uv
uv sync

# Verify installation
uv run python -c "import pyJianYingDraft; print('OK')"
```

<!-- /ANCHOR:step-3-install-dependencies -->
<!-- ANCHOR:step-4-set-environment-variables -->
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

<!-- /ANCHOR:step-4-set-environment-variables -->
<!-- ANCHOR:step-5-test-server-locally -->
#### Step 5: Test Server Locally

```bash
# Start the server
cd ~/MCP\ Servers/CapCut/jianying-mcp
uv run server.py

# Should see: "JianYing MCP Server running..."
```

---

<!-- /ANCHOR:step-5-test-server-locally -->
<!-- ANCHOR:4-configuration -->
## 4. ⚙️ CONFIGURATION

Configure the MCP server for your AI platform:

<!-- /ANCHOR:4-configuration -->
<!-- ANCHOR:for-docker-installation -->
### For Docker Installation

<!-- /ANCHOR:for-docker-installation -->
<!-- ANCHOR:claude-desktop-docker -->
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

<!-- /ANCHOR:claude-desktop-docker -->
<!-- ANCHOR:opencode-via-code-mode-docker -->
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

<!-- /ANCHOR:opencode-via-code-mode-docker -->
<!-- ANCHOR:vs-code-copilot-docker -->
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

<!-- /ANCHOR:vs-code-copilot-docker -->
<!-- ANCHOR:for-native-installation-2 -->
### For Native Installation

<!-- /ANCHOR:for-native-installation-2 -->
<!-- ANCHOR:claude-desktop-native -->
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

<!-- /ANCHOR:claude-desktop-native -->
<!-- ANCHOR:opencode-native -->
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

<!-- /ANCHOR:opencode-native -->
<!-- ANCHOR:vs-code-copilot-native -->
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

<!-- /ANCHOR:vs-code-copilot-native -->
<!-- ANCHOR:5-verification -->
## 5. ✅ VERIFICATION

<!-- /ANCHOR:5-verification -->
<!-- ANCHOR:docker-verification -->
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

<!-- /ANCHOR:docker-verification -->
<!-- ANCHOR:native-verification -->
### Native Verification

```bash
# Check 1: Server starts
cd ~/MCP\ Servers/CapCut/jianying-mcp
uv run server.py

# Check 2: Environment variables
echo $SAVE_PATH
echo $OUTPUT_PATH
```

<!-- /ANCHOR:native-verification -->
<!-- ANCHOR:test-in-ai-client -->
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

<!-- /ANCHOR:test-in-ai-client -->
<!-- ANCHOR:verification-checklist -->
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

<!-- /ANCHOR:verification-checklist -->
<!-- ANCHOR:6-usage -->
## 6. 🚀 USAGE

<!-- /ANCHOR:6-usage -->
<!-- ANCHOR:basic-workflow -->
### Basic Workflow

| Step | Action           | Description                          |
| ---- | ---------------- | ------------------------------------ |
| 1    | Create draft     | Set up project with resolution/fps   |
| 2    | Create tracks    | Add video, audio, text tracks        |
| 3    | Add segments     | Place content on timeline            |
| 4    | Apply effects    | Add animations, transitions, filters |
| 5    | Export draft     | Save to JianYing format              |
| 6    | Open in JianYing | Preview and render                   |

<!-- /ANCHOR:basic-workflow -->
<!-- ANCHOR:quick-commands -->
### Quick Commands

| Command                 | Function           |
| ----------------------- | ------------------ |
| `$draft`                | Create new project |
| `$video` / `$vid`       | Video operations   |
| `$audio` / `$aud`       | Audio operations   |
| `$text` / `$txt`        | Text overlays      |
| `$interactive` / `$int` | Full guided flow   |

<!-- /ANCHOR:quick-commands -->
<!-- ANCHOR:time-format -->
### Time Format

All time parameters use string format:
- `"1s"` - 1 second
- `"1.5s"` - 1.5 seconds
- `"0s-10s"` - Range from 0 to 10 seconds
- `"2s-4.5s"` - Range from 2 to 4.5 seconds

<!-- /ANCHOR:time-format -->
<!-- ANCHOR:media-file-access -->
### Media File Access

- **Docker:** Place files in `CapCut/media/` → accessible at `/media/` in container
- **Native:** Use full paths or relative paths from your working directory

---

<!-- /ANCHOR:media-file-access -->
<!-- ANCHOR:7-available-tools -->
## 7. 🎯 AVAILABLE TOOLS

<!-- /ANCHOR:7-available-tools -->
<!-- ANCHOR:draft-management-3-tools -->
### Draft Management (3 tools)

| Tool           | Purpose                          |
| -------------- | -------------------------------- |
| `rules`        | Connection check, get guidelines |
| `create_draft` | Create new video project         |
| `export_draft` | Export to JianYing format        |

<!-- /ANCHOR:draft-management-3-tools -->
<!-- ANCHOR:track-management-1-tool -->
### Track Management (1 tool)

| Tool           | Purpose               |
| -------------- | --------------------- |
| `create_track` | Create timeline track |

<!-- /ANCHOR:track-management-1-tool -->
<!-- ANCHOR:video-operations-8-tools -->
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

<!-- /ANCHOR:video-operations-8-tools -->
<!-- ANCHOR:audio-operations-4-tools -->
### Audio Operations (4 tools)

| Tool                 | Purpose                    |
| -------------------- | -------------------------- |
| `add_audio_segment`  | Add audio clip to timeline |
| `add_audio_effect`   | Apply audio effect         |
| `add_audio_fade`     | Add fade in/out            |
| `add_audio_keyframe` | Add audio keyframe         |

<!-- /ANCHOR:audio-operations-4-tools -->
<!-- ANCHOR:text-operations-2-tools -->
### Text Operations (2 tools)

| Tool                 | Purpose          |
| -------------------- | ---------------- |
| `add_text_segment`   | Add text overlay |
| `add_text_animation` | Animate text     |

<!-- /ANCHOR:text-operations-2-tools -->
<!-- ANCHOR:utility-tools-2-tools -->
### Utility Tools (2 tools)

| Tool                   | Purpose                    |
| ---------------------- | -------------------------- |
| `parse_media_info`     | Get media file information |
| `find_effects_by_type` | Discover available effects |

---

<!-- /ANCHOR:utility-tools-2-tools -->
<!-- ANCHOR:8-examples -->
## 8. 💡 EXAMPLES

<!-- /ANCHOR:8-examples -->
<!-- ANCHOR:create-a-tiktok-video-project -->
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

<!-- /ANCHOR:create-a-tiktok-video-project -->
<!-- ANCHOR:add-video-with-animation -->
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

<!-- /ANCHOR:add-video-with-animation -->
<!-- ANCHOR:discover-available-effects -->
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

<!-- /ANCHOR:discover-available-effects -->
<!-- ANCHOR:9-troubleshooting -->
## 9. 🔧 TROUBLESHOOTING

<!-- /ANCHOR:9-troubleshooting -->
<!-- ANCHOR:docker-issues -->
### Docker Issues

<!-- /ANCHOR:docker-issues -->
<!-- ANCHOR:container-won-t-start -->
#### Container Won't Start

```bash
# Check logs
docker logs jianying-mcp

# Check compose file
docker-compose config
```

<!-- /ANCHOR:container-won-t-start -->
<!-- ANCHOR:volume-mount-permission-denied -->
#### Volume Mount Permission Denied

**Solution:** Enable file sharing in Docker Desktop:
1. Open Docker Desktop → Settings → Resources → File Sharing
2. Add the required paths
3. Restart Docker Desktop
4. Rebuild container: `docker-compose up -d --build`

<!-- /ANCHOR:volume-mount-permission-denied -->
<!-- ANCHOR:container-memory-issues -->
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

<!-- /ANCHOR:container-memory-issues -->
<!-- ANCHOR:native-issues -->
### Native Issues

<!-- /ANCHOR:native-issues -->
<!-- ANCHOR:python-version-error -->
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

<!-- /ANCHOR:python-version-error -->
<!-- ANCHOR:uv-not-found -->
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

<!-- /ANCHOR:uv-not-found -->
<!-- ANCHOR:environment-variables-not-set -->
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

<!-- /ANCHOR:environment-variables-not-set -->
<!-- ANCHOR:common-issues-both-methods -->
### Common Issues (Both Methods)

<!-- /ANCHOR:common-issues-both-methods -->
<!-- ANCHOR:mcp-connection-refused -->
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

<!-- /ANCHOR:mcp-connection-refused -->
<!-- ANCHOR:draft-not-appearing-in-jianying -->
#### Draft Not Appearing in JianYing

**Solutions:**
1. Check the export folder location
2. Verify volume mounts (Docker) or OUTPUT_PATH (Native)
3. Restart JianYing Pro
4. Look in JianYing's "Local" drafts section

---

<!-- /ANCHOR:draft-not-appearing-in-jianying -->
<!-- ANCHOR:10-resources -->
## 10. 📚 RESOURCES

<!-- /ANCHOR:10-resources -->
<!-- ANCHOR:official-repositories -->
### Official Repositories

- **JianYing MCP**: https://github.com/hey-jian-wei/jianying-mcp
- **pyJianYingDraft**: https://github.com/hey-jian-wei/pyJianYingDraft

<!-- /ANCHOR:official-repositories -->
<!-- ANCHOR:tools-and-platforms -->
### Tools & Platforms

- **JianYing Pro**: https://www.capcut.cn/ (Chinese)
- **CapCut**: https://www.capcut.com/ (International)
- **Docker Desktop**: https://www.docker.com/products/docker-desktop
- **uv Package Manager**: https://astral.sh/uv
- **Claude Desktop**: https://claude.ai/download

<!-- /ANCHOR:tools-and-platforms -->
<!-- ANCHOR:docker-commands-reference -->
### Docker Commands Reference

| Command                             | Purpose                   |
| ----------------------------------- | ------------------------- |
| `docker-compose up -d --build`      | Build and start container |
| `docker-compose down`               | Stop and remove container |
| `docker-compose restart`            | Restart container         |
| `docker logs jianying-mcp`          | View container logs       |
| `docker exec -it jianying-mcp bash` | Shell into container      |

---

<!-- /ANCHOR:docker-commands-reference -->
<!-- ANCHOR:ready-to-go -->
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

<!-- /ANCHOR:ready-to-go -->
