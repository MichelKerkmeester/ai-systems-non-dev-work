<!-- ANCHOR:jianying-mcp-video-production-mcp-server -->
# JianYing MCP - Video Production MCP Server

[![Python](https://img.shields.io/badge/Python-3.13+-blue.svg)](https://python.org)
[![MCP](https://img.shields.io/badge/MCP-Compatible-green.svg)](https://modelcontextprotocol.io)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) <!-- upstream license; no local LICENSE file in this repo -->

A video production automation tool based on Model Context Protocol (MCP) that enables AI assistants to create professional video content through natural language.

<!-- /ANCHOR:jianying-mcp-video-production-mcp-server -->
<!-- ANCHOR:project-overview -->
## 🎯 Project Overview

JianYing MCP is a powerful video production automation tool that allows AI to:

- 🎬 **Automatically create JianYing draft projects**
- 🎵 **Intelligently add audio, video, and text materials**
- ✨ **Apply various effects, filters, and animations**
- 🎨 **Automate video editing workflows**
- 📤 **Export to JianYing-editable project files**

<!-- /ANCHOR:project-overview -->
<!-- ANCHOR:core-features -->
## 🚀 Core Features

<!-- /ANCHOR:core-features -->
<!-- ANCHOR:draft-management -->
### 📋 Draft Management
- `rules` - Get video production guidelines
- `create_draft` - Create a new video draft project
- `export_draft` - Export to JianYing project file

<!-- /ANCHOR:draft-management -->
<!-- ANCHOR:track-management -->
### 🛤️ Track Management
- `create_track` - Create video/audio/text tracks

<!-- /ANCHOR:track-management -->
<!-- ANCHOR:video-processing -->
### 🎥 Video Processing
- `add_video_segment` - Add video clips (local files or URLs)
- `add_video_animation` - Add entrance/exit animations
- `add_video_transition` - Add transition effects
- `add_video_filter` - Apply filter effects
- `add_video_mask` - Add mask effects
- `add_video_background_filling` - Background filling
- `add_video_keyframe` - Keyframe animation
- `add_video_effect` - Video scene/character effects

<!-- /ANCHOR:video-processing -->
<!-- ANCHOR:audio-processing -->
### 🎵 Audio Processing
- `add_audio_segment` - Add audio clips (local files or URLs)
- `add_audio_effect` - Audio effects (autotune, reverb, etc.)
- `add_audio_fade` - Fade in/out effects
- `add_audio_keyframe` - Audio keyframes

<!-- /ANCHOR:audio-processing -->
<!-- ANCHOR:text-processing -->
### 📝 Text Processing
- `add_text_segment` - Add text segments
- `add_text_animation` - Text animation effects

<!-- /ANCHOR:text-processing -->
<!-- ANCHOR:utility-tools -->
### 🔧 Utility Tools
- `parse_media_info` - Parse media file information
- `find_effects_by_type` - Find available effect resources

<!-- /ANCHOR:utility-tools -->
<!-- ANCHOR:quick-start-docker -->
## 📦 Quick Start (Docker)

<!-- /ANCHOR:quick-start-docker -->
<!-- ANCHOR:prerequisites -->
### Prerequisites

- **Docker Desktop** installed and running
- File sharing enabled for the volume paths in Docker Desktop settings

<!-- /ANCHOR:prerequisites -->
<!-- ANCHOR:step-1-build-and-start-container -->
### Step 1: Build and Start Container

```bash
# From the repo root:
cd "CapCut/mcp server/jianying-mcp"
docker-compose up -d --build
```

<!-- /ANCHOR:step-1-build-and-start-container -->
<!-- ANCHOR:step-2-verify-container-is-running -->
### Step 2: Verify Container is Running

```bash
docker ps | grep jianying-mcp
```

<!-- /ANCHOR:step-2-verify-container-is-running -->
<!-- ANCHOR:step-3-configure-mcp-client -->
### Step 3: Configure MCP Client

Add to your MCP configuration:

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

<!-- /ANCHOR:step-3-configure-mcp-client -->
<!-- ANCHOR:step-4-configure-docker-desktop-paths -->
### Step 4: Configure Docker Desktop Paths

In **Docker Desktop → Settings → Resources → File Sharing**, add (local-only, adjust to your machine):
- `/Users/<you>/.../CapCut/data`
- `/Users/<you>/.../CapCut/export`
- `/Users/<you>/.../CapCut/media`

<!-- /ANCHOR:step-4-configure-docker-desktop-paths -->
<!-- ANCHOR:volume-paths -->
### Volume Paths

| Container Path | Host Path | Purpose |
|----------------|-----------|---------|
| `/data` | `CapCut/data` | Draft operation data (read-write) |
| `/output` | `CapCut/export` | Exported JianYing projects (read-write) |
| `/media` | `CapCut/media` | Source video/audio files (read-only) |

<!-- /ANCHOR:volume-paths -->
<!-- ANCHOR:environment-variables -->
### Environment Variables

- **SAVE_PATH**: `/data` - Draft storage inside container
- **OUTPUT_PATH**: `/output` - Export location inside container

<!-- /ANCHOR:environment-variables -->
<!-- ANCHOR:demo-video -->
## 🎥 Demo Video

🎬 [Watch the full demo video](https://www.bilibili.com/video/BV1rhe4z1Eu1)

<!-- /ANCHOR:demo-video -->
<!-- ANCHOR:development-guide -->
## 🔧 Development Guide

<!-- /ANCHOR:development-guide -->
<!-- ANCHOR:debug-mode -->
### Debug Mode

Use MCP Inspector for debugging:

```bash
uv run mcp dev jianyingdraft/server.py
```

<!-- /ANCHOR:debug-mode -->
<!-- ANCHOR:acknowledgments -->
## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io) - Provides the powerful AI integration protocol
- [pyJianYingDraft](https://github.com/GuanYixuan/pyJianYingDraft) - JianYing project file processing library

---

⭐ If this project helps you, please give it a Star!

<!-- /ANCHOR:acknowledgments -->
