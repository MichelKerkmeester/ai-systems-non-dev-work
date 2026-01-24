# JianYing MCP - Video Production MCP Server

[![Python](https://img.shields.io/badge/Python-3.13+-blue.svg)](https://python.org)
[![MCP](https://img.shields.io/badge/MCP-Compatible-green.svg)](https://modelcontextprotocol.io)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

A video production automation tool based on Model Context Protocol (MCP) that enables AI assistants to create professional video content through natural language.

## 🎯 Project Overview

JianYing MCP is a powerful video production automation tool that allows AI to:

- 🎬 **Automatically create JianYing draft projects**
- 🎵 **Intelligently add audio, video, and text materials**
- ✨ **Apply various effects, filters, and animations**
- 🎨 **Automate video editing workflows**
- 📤 **Export to JianYing-editable project files**

## 🚀 Core Features

### 📋 Draft Management
- `rules` - Get video production guidelines
- `create_draft` - Create a new video draft project
- `export_draft` - Export to JianYing project file

### 🛤️ Track Management
- `create_track` - Create video/audio/text tracks

### 🎥 Video Processing
- `add_video_segment` - Add video clips (local files or URLs)
- `add_video_animation` - Add entrance/exit animations
- `add_video_transition` - Add transition effects
- `add_video_filter` - Apply filter effects
- `add_video_mask` - Add mask effects
- `add_video_background_filling` - Background filling
- `add_video_keyframe` - Keyframe animation
- `add_video_effect` - Video scene/character effects

### 🎵 Audio Processing
- `add_audio_segment` - Add audio clips (local files or URLs)
- `add_audio_effect` - Audio effects (autotune, reverb, etc.)
- `add_audio_fade` - Fade in/out effects
- `add_audio_keyframe` - Audio keyframes

### 📝 Text Processing
- `add_text_segment` - Add text segments
- `add_text_animation` - Text animation effects

### 🔧 Utility Tools
- `parse_media_info` - Parse media file information
- `find_effects_by_type` - Find available effect resources

## 📦 Quick Start (Docker)

### Prerequisites

- **Docker Desktop** installed and running
- File sharing enabled for the volume paths in Docker Desktop settings

### Step 1: Build and Start Container

```bash
cd jianying-mcp
docker-compose up -d --build
```

### Step 2: Verify Container is Running

```bash
docker ps | grep jianying-mcp
```

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

### Step 4: Configure Docker Desktop Paths

In **Docker Desktop → Settings → Resources → File Sharing**, add:
- `/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/data`
- `/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/export`
- `/Users/michelkerkmeester/MEGA/Development/AI Systems/Public/CapCut/media`

### Volume Paths

| Container Path | Host Path | Purpose |
|----------------|-----------|---------|
| `/data` | `CapCut/data` | Draft operation data (read-write) |
| `/output` | `CapCut/export` | Exported JianYing projects (read-write) |
| `/media` | `CapCut/media` | Source video/audio files (read-only) |

### Environment Variables

- **SAVE_PATH**: `/data` - Draft storage inside container
- **OUTPUT_PATH**: `/output` - Export location inside container

## 🎥 Demo Video

🎬 [Watch the full demo video](https://www.bilibili.com/video/BV1rhe4z1Eu1)

## 🔧 Development Guide

### Debug Mode

Use MCP Inspector for debugging:

```bash
uv run mcp dev jianyingdraft/server.py
```

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io) - Provides the powerful AI integration protocol
- [pyJianYingDraft](https://github.com/GuanYixuan/pyJianYingDraft) - JianYing project file processing library

---

⭐ If this project helps you, please give it a Star!
