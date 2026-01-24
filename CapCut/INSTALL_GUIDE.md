# CapCut MCP Server Installation Guide

A comprehensive guide to installing, configuring, and using the JianYing MCP server for AI-powered video editing automation.

---

## 🤖 AI-FIRST INSTALL GUIDE

**Copy and paste this prompt to your AI assistant to get installation help:**

```
I want to install the JianYing MCP server for CapCut/JianYing video editing automation.

Please help me:
1. Check if I have Python 3.13+ installed
2. Install uv package manager if needed
3. Clone the jianying-mcp repository
4. Configure SAVE_PATH and OUTPUT_PATH environment variables
5. Install dependencies with uv sync
6. Configure the MCP server for my environment (I'm using: [Claude Desktop / OpenCode / VS Code Copilot])
7. Verify the server is working with test commands
8. Ensure JianYing Pro is properly configured

My operating system is: [macOS / Windows / Linux]
My preferred workspace location is: [your path]

Guide me through each step with the exact commands I need to run.
```

**What the AI will do:**
- Verify Python 3.13+ is installed (or help install it)
- Install uv package manager
- Clone and configure the MCP server repository
- Set up environment variables for JianYing integration
- Configure MCP for your AI platform
- Test video editing capabilities
- Show you how to use the available tools effectively

**Expected setup time:** 10-15 minutes

---

## 📋 TABLE OF CONTENTS

1. [📖 OVERVIEW](#1-overview)
2. [📋 PREREQUISITES](#2-prerequisites)
3. [📥 INSTALLATION](#3-installation)
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
│   (Python + pyJianYingDraft)                                │
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

---

## 2. 📋 PREREQUISITES

Before installing the JianYing MCP server, ensure you have:

### Required

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

- **JianYing Pro** desktop application
  ```bash
  # Download from: https://www.capcut.cn/
  # Install and launch at least once
  ```

- **Git** for cloning repositories
  ```bash
  git --version
  ```

### Recommended

- **Claude Desktop** (or other MCP-compatible client)
  - Download from: https://claude.ai/download
- **At least 4GB RAM** available
- **5GB+ free disk space** for video projects

---

## 3. 📥 INSTALLATION

### Step 1: Create Folder Structure

```bash
# Create main directory
mkdir -p ~/MCP\ Servers/CapCut
cd ~/MCP\ Servers

# Create JianYing working directories
mkdir -p ~/MCP\ Servers/CapCut/data
mkdir -p ~/MCP\ Servers/CapCut/drafts
```

### Step 2: Clone Repository

```bash
# Clone JianYing MCP
cd ~/MCP\ Servers/CapCut
git clone https://github.com/hey-jian-wei/jianying-mcp.git
cd jianying-mcp
```

### Step 3: Install Dependencies

```bash
# Install with uv
uv sync

# Verify installation
uv run python -c "import pyJianYingDraft; print('OK')"
```

### Step 4: Set Environment Variables

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

### Step 5: Test Server Locally

```bash
# Start the server
cd ~/MCP\ Servers/CapCut/jianying-mcp
uv run server.py

# Should see: "JianYing MCP Server running..."
```

---

## 4. ⚙️ CONFIGURATION

Configure the MCP server for your AI platform:

### Option A: Configure for Claude Desktop

Open the Claude Desktop configuration file:

```bash
# macOS
open ~/Library/Application\ Support/Claude/claude_desktop_config.json

# If file doesn't exist, create it:
mkdir -p ~/Library/Application\ Support/Claude/
touch ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

Add the MCP server configuration:

```json
{
  "mcpServers": {
    "jianying-mcp": {
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

**Restart Claude Desktop** (⌘Q then reopen).

### Option B: Configure for OpenCode

Add to `opencode.json` in your project root:

```json
{
  "mcp": {
    "jianying-mcp": {
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

### Option C: Configure for VS Code Copilot

Create `.vscode/mcp.json` in your workspace:

```json
{
  "mcpServers": {
    "jianying-mcp": {
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

---

## 5. ✅ VERIFICATION

### Check 1: Verify Server Starts

```bash
cd ~/MCP\ Servers/CapCut/jianying-mcp
uv run server.py
```

Expected output:
```
JianYing MCP Server running...
```

### Check 2: Verify Environment Variables

```bash
echo $SAVE_PATH
echo $OUTPUT_PATH
```

Both should return valid paths.

### Check 3: Test in Claude Desktop

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

### Check 4: Verify JianYing Pro

1. Launch JianYing Pro desktop app
2. Check that the drafts folder is accessible
3. Create a test draft via MCP

```
Create a test video project named "MCP Test"
```

### Verification Checklist

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

The CapCut system supports these command shortcuts:

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
- Source: product.mp4
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

### Python Version Error

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

### uv Not Found

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

### Environment Variables Not Set

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

### Draft Not Appearing in JianYing

**Solutions:**
1. Verify OUTPUT_PATH matches JianYing's draft folder location
2. Restart JianYing Pro
3. Check file permissions on the drafts folder
4. Look in JianYing's "Local" drafts section

### MCP Connection Refused

**Solutions:**
1. Ensure server is running: `uv run server.py`
2. Check the cwd path in MCP config is correct
3. Verify environment variables are set in config
4. Restart Claude Desktop completely (⌘Q)

---

## 10. 📚 RESOURCES

### Official Repositories

- **JianYing MCP**: https://github.com/hey-jian-wei/jianying-mcp
- **pyJianYingDraft**: https://github.com/hey-jian-wei/pyJianYingDraft

### Tools & Platforms

- **JianYing Pro**: https://www.capcut.cn/ (Chinese)
- **CapCut**: https://www.capcut.com/ (International)
- **uv Package Manager**: https://astral.sh/uv
- **Claude Desktop**: https://claude.ai/download

### Quick Start Checklist

- [ ] Python 3.13+ installed
- [ ] uv package manager installed
- [ ] Repository cloned
- [ ] Dependencies installed (uv sync)
- [ ] Environment variables set
- [ ] MCP config added
- [ ] Claude Desktop restarted
- [ ] JianYing Pro installed
- [ ] Test connection passed

---

## 🎉 Ready to Go!

Your CapCut MCP system is now configured. Start creating video projects with AI!

**Quick Test:**
1. Open Claude Desktop
2. Ask: "Check JianYing MCP connection"
3. If connected: "Create a test video project"
4. Open JianYing Pro and find your draft

Enjoy AI-powered video editing! 🎬
