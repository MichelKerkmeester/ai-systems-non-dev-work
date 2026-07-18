# CapCut AI System - User Guide v0.111

Transforms natural language requests into professional video projects with **automatic VIDEO processing and intelligent editing workflows** via JianYing MCP integration.

---

## 1. KEY FEATURES

### Core Capabilities

- **MCP Verification First**: Always checks JianYing MCP connection before operations
- **Natural Language Understanding**: Describe your video project in plain words
- **VIDEO Framework**: 5-phase thinking methodology (Visualize → Investigate → Design → Execute → Output)
- **Platform Optimization**: Automatic settings for YouTube, TikTok, Instagram, etc.
- **Visual Feedback**: Real-time progress directly in chat
- **JianYing Integration**: Exports directly to JianYing Pro for final editing

### What It Can Do

**Draft Management:**
- Create video projects with custom resolution/framerate
- Configure for different platforms (YouTube, TikTok, Instagram)
- Export drafts to JianYing Pro

**Video Operations:**
- Add video segments to timeline
- Apply entrance/exit animations
- Add transitions between clips
- Apply visual filters and masks
- Background filling for aspect ratio mismatch
- Keyframe animations for motion

**Audio Operations:**
- Add audio/music clips to timeline
- Apply audio effects (reverb, echo, distortion)
- Add fade in/out effects
- Keyframe volume and pan

**Text Operations:**
- Add text overlays (titles, captions)
- Apply text animations (entrance, exit, loop)
- Custom fonts, colors, and positioning

### What It Cannot Do

- ❌ Real-time video preview
- ❌ AI content generation (images, voice, etc.)
- ❌ Complex motion tracking
- ❌ Advanced color grading
- ❌ Direct video rendering/export to MP4 (requires JianYing Pro)

---

## 2. SYSTEM ARCHITECTURE

```
AGENTS.md → Entry point with intelligent routing logic
    ↓
CapCut - System - Prompt v0.110 (System prompt with VIDEO integration)
     ↓
CapCut - Thinking - VIDEO Framework v0.110 (5-phase methodology)
     ↓
CapCut - System - Interactive Intelligence v0.110 (Conversation flow with transparency)
    ↓
MCP Tool:
  └─ JianYing MCP v0.111 (18 video editing tools)
    ↓
JianYing Pro Desktop App → Final editing and export
    ↓
Output → Rendered video files
```

### CapCut / JianYing Relationship

| Product | Region | Platform | Notes |
|---------|--------|----------|-------|
| **JianYing Pro** | China | Desktop | MCP server works with this app |
| **CapCut** | International | Desktop + Mobile | Same product, different branding |

> **Key Point:** JianYing and CapCut are the same product by ByteDance. JianYing Pro is the Chinese desktop version that the MCP server integrates with.

---

## 3. QUICK SETUP

### Step 1: Create a Claude Project

1. Go to claude.ai
2. Click "Projects" in sidebar
3. Create new project named "CapCut Editor"

### Step 2: Add System Instructions

1. Click "Edit project details"
2. Find "Custom instructions" section
3. Copy and paste: `CapCut - System - Prompt - v0.110.md`
4. Save the project

### Step 3: Upload Reference Documents

Add these documents to your project:
- `CapCut - System - Interactive Intelligence - v0.110.md`
- `CapCut - Thinking - VIDEO Framework - v0.110.md`
- `CapCut - Integrations - MCP JianYing - v0.111.md`

### Step 4: Install MCP Tools

See [INSTALL_GUIDE.md](INSTALL_GUIDE.md) for detailed setup instructions.

### Step 5: Start Editing

```
create a TikTok video project          # Interactive mode
$draft new product promo               # Direct draft mode
$video add clip from Downloads         # Direct video mode
$audio add background music            # Direct audio mode
```

---

## 4. INSTALLING MCP TOOLS

The CapCut system requires the JianYing MCP server.

### Prerequisites

- **Docker Desktop** (recommended) OR Python 3.13+ with uv
- **JianYing Pro** desktop application (Chinese version of CapCut)
- **Claude Desktop** or compatible MCP client

### Quick Installation (Docker - Recommended)

```bash
# Navigate to MCP server folder
cd "CapCut/mcp server/jianying-mcp"

# Build and start container
docker-compose up -d --build

# Verify container is running
docker ps | grep jianying-mcp
```

### MCP Configuration (Docker)

Add to Claude Desktop config (`claude_desktop_config.json`):

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

**Config Location:**
- Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Linux: `~/.config/claude/claude_desktop_config.json`

### Alternative: Native Installation

For native installation without Docker, see [INSTALL_GUIDE.md](INSTALL_GUIDE.md) Option B.

For complete installation instructions including troubleshooting, see [INSTALL_GUIDE.md](INSTALL_GUIDE.md).

---

## 5. HOW IT WORKS

### MCP Connection Verification

System always verifies connections first:

```
 Checking Connections...

**JianYing MCP:**
- Server: Connected
- Rules command: Accessible

**JianYing Pro App:**
- Status: Running

All video operations available.
```

### Thinking - VIDEO Framework

The system applies the VIDEO methodology automatically:

1. **V - Visualize**: Understand creative vision, platform, style
2. **I - Investigate**: Analyze source media, check compatibility
3. **D - Design**: Plan timeline, select tracks and effects
4. **E - Execute**: Create draft, add segments, apply effects
5. **O - Output**: Export to JianYing, validate, guide user

### Two-Layer Transparency

**Internal (Applied Fully):**
- Complete VIDEO methodology
- Resolution and framerate analysis
- Platform compatibility checks
- Effect availability verification
- Timeline optimization

**External (Concise Updates):**
- Progress updates by phase
- Key processing decisions
- Optimization benefits
- Quality confirmation

---

## 6. OPERATING MODES

| Mode | Command | Use When |
|------|---------|----------|
| **Interactive** | DEFAULT | Guided project discovery |
| **Draft** | `$draft` | Create new video project |
| **Video** | `$video` / `$vid` | Direct video processing |
| **Audio** | `$audio` / `$aud` | Direct audio processing |
| **Text** | `$text` / `$txt` | Direct text overlays |

### Mode Activation

**Interactive Mode (Default):**
```
User: help with a video project
System: [Checking MCP connections...]
✅ Video editing ready!

What type of project?
• New video project
• Add content to existing draft
• Apply effects/transitions
• Export project
```

**Direct Command Mode:**
```
User: $draft TikTok promo video
System: [Direct mode - draft context questions only]
```

---

## 7. EXAMPLE INTERACTIONS

### Create a New Video Project

```
User: create a TikTok video with product shots

System: I'll create a TikTok video project for you!

 Video Project Creation

**Thinking:** VIDEO methodology applied
**Operation:** New TikTok project setup

**📂 Project:**
- Name: Product Promo
- Resolution: 1080x1920 (vertical)
- Framerate: 30 fps

**🔄 Processing:**
- Step 1: Draft created ✔
- Step 2: Video track added ✔
- Step 3: Audio track added ✔

✅ Project Created!

**📁 Output:**
- Draft saved to: /output/Product_Promo

**🎯 Next Steps:**
- Add video segments with $video
- Add background music with $audio
- Add text overlays with $text
- Export when ready
```

### Add Video Segment

```
User: $video add clip /path/to/product.mp4 from 2s to 10s

System: Adding video segment to timeline...

 Video Segment Added

**📂 Input:**
- File: product.mp4
- Source range: 2s-10s

**🔄 Processing:**
- Segment added to track 0 ✔
- Timeline position: 0s-8s ✔

✅ Segment added successfully!

**💡 Tip:** Use add_video_animation to add entrance effects
```

---

## 8. TROUBLESHOOTING

### MCP Connection Issues (Docker)

**Container not running:**
```bash
# Check container status
docker ps | grep jianying-mcp

# Start container if stopped
cd "CapCut/mcp server/jianying-mcp"
docker-compose up -d

# Rebuild if needed
docker-compose up -d --build
```

**Volume mount permission denied:**
1. Open Docker Desktop → Settings → Resources → File Sharing
2. Add the CapCut data/export/media paths
3. Restart Docker Desktop
4. Rebuild: `docker-compose up -d --build`

### MCP Connection Issues (Native)

**Server not running:**
```bash
cd /path/to/jianying-mcp
uv run server.py
```

**Environment variables not set:**
```bash
export SAVE_PATH="/path/to/jianying/data"
export OUTPUT_PATH="/path/to/jianying/drafts"
```

**Python version error:**
```bash
python --version  # Requires 3.13+
pyenv install 3.13.0
pyenv local 3.13.0
```

### JianYing Pro App Issues

**Draft not appearing:**
1. Verify OUTPUT_PATH matches JianYing draft folder
2. Restart JianYing Pro
3. Check file permissions

**App not detected:**
1. Launch JianYing Pro desktop application
2. Wait for app to fully load
3. Retry the operation

### Common Path Configuration

**macOS:**
```yaml
save_path: ~/Movies/JianYing/Data
output_path: ~/Movies/JianYing/Drafts
```

**Windows:**
```yaml
save_path: %USERPROFILE%\Documents\JianYing\Data
output_path: %USERPROFILE%\Documents\JianYing\Drafts
```

---

## 9. RESOURCES

### MCP Server Documentation

- [JianYing MCP](https://github.com/hey-jian-wei/jianying-mcp) - Video editing automation
- [pyJianYingDraft](https://github.com/hey-jian-wei/pyJianYingDraft) - Underlying Python library

### Tools & Platforms

- [Claude Desktop](https://claude.ai/download) - Required for MCP
- [JianYing Pro](https://www.capcut.cn/) - Desktop video editor (Chinese)
- [CapCut](https://www.capcut.com/) - International version

### Related Documentation

- [INSTALL_GUIDE.md](INSTALL_GUIDE.md) - Detailed installation instructions
- `knowledge base/` - Technical reference documents
- `mcp server/jianying-mcp/` - MCP server files

---

*The CapCut AI System provides intelligent video editing automation through the JianYing MCP server, enabling natural language video project creation and manipulation.*

