<!-- ANCHOR:media-editor-mcp-server-installation-guide -->
# Media Editor MCP Server Installation Guide

A comprehensive guide to installing, configuring, and using the Imagician and Video-Audio MCP servers for AI-powered media editing.

---

<!-- /ANCHOR:media-editor-mcp-server-installation-guide -->
<!-- ANCHOR:ai-first-install-guide -->
## 🤖 AI-FIRST INSTALL GUIDE

**Copy and paste this prompt to your AI assistant to get installation help:**

```
I want to install the Media Editor MCP servers (Imagician + Video-Audio) for image and video processing.

Please help me:
1. Check if I have Docker Desktop installed and running
2. Set up the folder structure for Media Editor workspace
3. Clone the imagician and video-audio repositories
4. Configure the Docker volume paths for my system
5. Build and start the Docker containers
6. Configure the MCP servers for my environment (I'm using: [Claude Desktop / OpenCode / VS Code Copilot])
7. Verify both servers are working with test commands

My preferred media workspace location is: [your path]

Guide me through each step with the exact commands I need to run.
```

**What the AI will do:**
- Verify Docker Desktop is installed and running
- Create proper folder structure for media files (Original/New directories)
- Clone and configure both MCP server repositories
- Update volume paths in docker-compose files
- Build and start Docker containers
- Configure MCP servers for your AI platform
- Test image and video processing capabilities
- Show you how to use the available tools effectively

**Expected setup time:** 15-20 minutes

---

<!-- /ANCHOR:ai-first-install-guide -->
<!-- ANCHOR:table-of-contents -->
#### TABLE OF CONTENTS

  - 1. 📖 OVERVIEW
  - 2. 📋 PREREQUISITES
  - 3. 📥 INSTALLATION
  - 4. ⚙️ CONFIGURATION
  - 5. ✅ VERIFICATION
  - 6. 🚀 USAGE
  - 7. 🎯 FEATURES
  - 8. 💡 EXAMPLES
  - 9. 🔧 TROUBLESHOOTING
  - 10. 📚 RESOURCES

---

<!-- /ANCHOR:table-of-contents -->
<!-- ANCHOR:1-overview -->
## 1. 📖 OVERVIEW

The Media Editor MCP system provides AI-powered image and video processing through two complementary MCP servers running in Docker containers. This enables Claude and other AI assistants to perform sophisticated media editing operations.

<!-- /ANCHOR:1-overview -->
<!-- ANCHOR:key-features -->
### Key Features

- **Image Processing (Imagician)**: Resize, crop, rotate, compress, convert, apply filters
- **Video Processing (Video-Audio)**: Trim, merge, extract audio, add subtitles, convert formats
- **Audio Extraction**: Separate audio tracks from video files
- **HLS Conversion**: Create streaming-ready video content
- **Batch Processing**: Handle multiple files efficiently
- **Docker Isolation**: Clean, reproducible environment

<!-- /ANCHOR:key-features -->
<!-- ANCHOR:two-server-architecture -->
### Two-Server Architecture

| Server          | Technology      | Purpose                           |
| --------------- | --------------- | --------------------------------- |
| **Imagician**   | Node.js + Sharp | High-performance image processing |
| **Video-Audio** | Python + FFmpeg | Video/audio manipulation          |

```
┌─────────────────────────────────────────────────────────────┐
│                    Your AI Assistant                         │
│  (Claude Desktop, OpenCode, VS Code Copilot, etc.)          │
└──────────────────────┬──────────────────┬───────────────────┘
                       │                  │
                       ▼                  ▼
┌─────────────────────────────┐  ┌────────────────────────────┐
│   Imagician MCP Server      │  │  Video-Audio MCP Server    │
│   (Docker: imagician)       │  │  (Docker: video-audio)     │
│   • Image resize/crop       │  │  • Video trim/merge        │
│   • Format conversion       │  │  • Audio extraction        │
│   • Filters and effects     │  │  • HLS conversion          │
└──────────────┬──────────────┘  └─────────────┬──────────────┘
               │                               │
               ▼                               ▼
┌─────────────────────────────┐  ┌────────────────────────────┐
│  /images (Docker Volume)    │  │  /videos (Docker Volume)   │
│  ├── Original/              │  │  ├── Original/             │
│  └── New/                   │  │  └── New/                  │
└─────────────────────────────┘  └────────────────────────────┘
```

---

<!-- /ANCHOR:two-server-architecture -->
<!-- ANCHOR:2-prerequisites -->
## 2. 📋 PREREQUISITES

Before installing the Media Editor MCP servers, ensure you have:

<!-- /ANCHOR:2-prerequisites -->
<!-- ANCHOR:required -->
### Required

- **Docker Desktop** installed and running
  ```bash
  # Verify Docker is running
  docker --version
  docker ps
  
  # If not installed: https://www.docker.com/products/docker-desktop
  ```

- **Claude Desktop** (or other MCP-compatible client)
  ```bash
  # Download from: https://claude.ai/download
  ```

- **Git** for cloning repositories
  ```bash
  git --version
  ```

<!-- /ANCHOR:required -->
<!-- ANCHOR:recommended -->
### Recommended

- **At least 4GB RAM** available for Docker
- **10GB+ free disk space** for Docker images and media files
- **Terminal/Shell** access (Terminal on macOS, PowerShell on Windows)

---

<!-- /ANCHOR:recommended -->
<!-- ANCHOR:3-installation -->
## 3. 📥 INSTALLATION

<!-- /ANCHOR:3-installation -->
<!-- ANCHOR:step-1-create-folder-structure -->
### Step 1: Create Folder Structure

Create a dedicated directory for the Media Editor system:

```bash
# Create main directory
mkdir -p ~/MCP\ Servers/Media\ Editor

# Create media working directories
mkdir -p ~/MCP\ Servers/Media\ Editor/export/images/Original
mkdir -p ~/MCP\ Servers/Media\ Editor/export/images/New
mkdir -p ~/MCP\ Servers/Media\ Editor/export/videos/Original
mkdir -p ~/MCP\ Servers/Media\ Editor/export/videos/New

# Navigate to MCP Servers directory
cd ~/MCP\ Servers
```

<!-- /ANCHOR:step-1-create-folder-structure -->
<!-- ANCHOR:step-2-clone-repositories -->
### Step 2: Clone Repositories

```bash
# Clone Imagician (Image Processing)
git clone https://github.com/flowy11/imagician.git
cd imagician

# Clone Video-Audio (Video/Audio Processing)
cd ~/MCP\ Servers
git clone https://github.com/misbahsy/video-audio-mcp.git video-audio
```

<!-- /ANCHOR:step-2-clone-repositories -->
<!-- ANCHOR:step-3-configure-docker-volume-paths -->
### Step 3: Configure Docker Volume Paths

<!-- /ANCHOR:step-3-configure-docker-volume-paths -->
<!-- ANCHOR:3-1-update-imagician-docker-compose -->
#### 3.1 Update Imagician Docker Compose

Open `~/MCP Servers/imagician/docker-compose.yml` and update the volume path:

```yaml
# Find and replace this line:
- /path/to/your/Media Editor/export/images:/images:rw

# With your actual path (example for macOS):
- /Users/yourusername/MCP Servers/Media Editor/export/images:/images:rw
```

> 💡 **Tip:** Drag the folder into Terminal to get the exact path.

<!-- /ANCHOR:3-1-update-imagician-docker-compose -->
<!-- ANCHOR:3-2-update-video-audio-docker-compose -->
#### 3.2 Update Video-Audio Docker Compose

Open `~/MCP Servers/video-audio/docker-compose.yml` and update the volume path:

```yaml
# Find and replace this line:
- /path/to/your/Media Editor/export/videos:/videos:rw

# With your actual path (example for macOS):
- /Users/yourusername/MCP Servers/Media Editor/export/videos:/videos:rw
```

<!-- /ANCHOR:3-2-update-video-audio-docker-compose -->
<!-- ANCHOR:step-4-build-and-start-docker-containers -->
### Step 4: Build and Start Docker Containers

<!-- /ANCHOR:step-4-build-and-start-docker-containers -->
<!-- ANCHOR:4-1-start-imagician-server -->
#### 4.1 Start Imagician Server

```bash
# Navigate to imagician folder
cd ~/MCP\ Servers/imagician

# Build and start container
docker-compose up -d --build

# Verify it's running
docker ps | grep imagician
```

**Expected output:**
```
imagician    imagician:latest    "node dist/index.js"    Up X minutes
```

<!-- /ANCHOR:4-1-start-imagician-server -->
<!-- ANCHOR:4-2-start-video-audio-server -->
#### 4.2 Start Video-Audio Server

```bash
# Navigate to video-audio folder
cd ~/MCP\ Servers/video-audio

# Build and start container
docker-compose up -d --build

# Verify it's running
docker ps | grep video-audio
```

**Expected output:**
```
video-audio    video-audio:latest    "sh -c 'echo..."    Up X minutes
```

---

<!-- /ANCHOR:4-2-start-video-audio-server -->
<!-- ANCHOR:4-configuration -->
## 4. ⚙️ CONFIGURATION

Configure the MCP servers for your AI platform:

<!-- /ANCHOR:4-configuration -->
<!-- ANCHOR:option-a-configure-for-claude-desktop -->
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
    "imagician": {
      "command": "docker",
      "args": ["exec", "-i", "imagician", "node", "dist/index.js"],
      "env": {
        "IMAGE_PATH": "/images",
        "NODE_ENV": "production"
      }
    },
    "video-audio": {
      "command": "docker",
      "args": ["exec", "-i", "video-audio", "python", "-m", "video_audio_mcp"],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "VIDEO_PATH": "/videos",
        "NODE_ENV": "production"
      }
    }
  }
}
```

**Restart Claude Desktop** (⌘Q then reopen).

<!-- /ANCHOR:option-a-configure-for-claude-desktop -->
<!-- ANCHOR:option-b-configure-for-opencode -->
### Option B: Configure for OpenCode

Add to `opencode.json` in your project root:

```json
{
  "mcp": {
    "imagician": {
      "type": "local",
      "command": ["docker", "exec", "-i", "imagician", "node", "dist/index.js"],
      "env": {
        "IMAGE_PATH": "/images",
        "NODE_ENV": "production"
      }
    },
    "video-audio": {
      "type": "local",
      "command": ["docker", "exec", "-i", "video-audio", "python", "-m", "video_audio_mcp"],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "VIDEO_PATH": "/videos"
      }
    }
  }
}
```

<!-- /ANCHOR:option-b-configure-for-opencode -->
<!-- ANCHOR:option-c-configure-for-vs-code-copilot -->
### Option C: Configure for VS Code Copilot

Create `.vscode/mcp.json` in your workspace:

```json
{
  "mcpServers": {
    "imagician": {
      "command": "docker",
      "args": ["exec", "-i", "imagician", "node", "dist/index.js"],
      "env": {
        "IMAGE_PATH": "/images",
        "NODE_ENV": "production"
      }
    },
    "video-audio": {
      "command": "docker",
      "args": ["exec", "-i", "video-audio", "python", "-m", "video_audio_mcp"],
      "env": {
        "PYTHONUNBUFFERED": "1",
        "VIDEO_PATH": "/videos"
      }
    }
  }
}
```

---

<!-- /ANCHOR:option-c-configure-for-vs-code-copilot -->
<!-- ANCHOR:5-verification -->
## 5. ✅ VERIFICATION

<!-- /ANCHOR:5-verification -->
<!-- ANCHOR:check-1-verify-docker-containers -->
### Check 1: Verify Docker Containers

```bash
# List running containers
docker ps

# Should show both imagician and video-audio running
```

<!-- /ANCHOR:check-1-verify-docker-containers -->
<!-- ANCHOR:check-2-view-container-logs -->
### Check 2: View Container Logs

```bash
# Check Imagician logs
docker logs imagician

# Check Video-Audio logs
docker logs video-audio
```

<!-- /ANCHOR:check-2-view-container-logs -->
<!-- ANCHOR:check-3-test-in-claude-desktop -->
### Check 3: Test in Claude Desktop

Open Claude Desktop and try these commands:

```
# Test Imagician
Can you list the images in /images/Original/?

# Test Video-Audio
Can you check the video-audio MCP server status?
```

<!-- /ANCHOR:check-3-test-in-claude-desktop -->
<!-- ANCHOR:check-4-run-repair-command -->
### Check 4: Run Repair Command

```
$repair
```

This runs connection verification for both MCP servers.

---

<!-- /ANCHOR:check-4-run-repair-command -->
<!-- ANCHOR:6-usage -->
## 6. 🚀 USAGE

<!-- /ANCHOR:6-usage -->
<!-- ANCHOR:file-workflow -->
### File Workflow

| Step | Action              | Location                                   |
| ---- | ------------------- | ------------------------------------------ |
| 1    | Place input files   | `Original/` folder                         |
| 2    | Reference in Claude | `/images/Original/` or `/videos/Original/` |
| 3    | Process with AI     | Claude performs operations                 |
| 4    | Find output         | `New/` folder                              |

<!-- /ANCHOR:file-workflow -->
<!-- ANCHOR:working-with-images -->
### Working with Images

```
# Place input images in:
Media Editor/export/images/Original/

# Reference in Claude as:
/images/Original/filename.jpg

# Processed images saved to:
Media Editor/export/images/New/
```

<!-- /ANCHOR:working-with-images -->
<!-- ANCHOR:working-with-videos -->
### Working with Videos

```
# Place input videos in:
Media Editor/export/videos/Original/

# Reference in Claude as:
/videos/Original/filename.mp4

# Processed videos saved to:
Media Editor/export/videos/New/
```

<!-- /ANCHOR:working-with-videos -->
<!-- ANCHOR:quick-commands -->
### Quick Commands

The Media Editor system supports these command shortcuts in Claude:

| Command                  | Function                   |
| ------------------------ | -------------------------- |
| `$image` or `$img`       | Image operations mode      |
| `$video` or `$vid`       | Video operations mode      |
| `$audio` or `$aud`       | Audio operations mode      |
| `$hls`                   | HLS video conversion       |
| `$repair` or `$r`        | Connection troubleshooting |
| `$interactive` or `$int` | Full conversational flow   |

---

<!-- /ANCHOR:quick-commands -->
<!-- ANCHOR:7-features -->
## 7. 🎯 FEATURES

<!-- /ANCHOR:7-features -->
<!-- ANCHOR:imagician-capabilities -->
### Imagician Capabilities

| Feature      | Description                                       |
| ------------ | ------------------------------------------------- |
| **Resize**   | Change image dimensions with aspect ratio options |
| **Crop**     | Extract portions of images                        |
| **Rotate**   | Rotate images by any angle                        |
| **Compress** | Reduce file size with quality control             |
| **Convert**  | Change formats (JPG, PNG, WebP, etc.)             |
| **Filters**  | Apply blur, sharpen, grayscale, etc.              |
| **Metadata** | Read/write EXIF data                              |

<!-- /ANCHOR:imagician-capabilities -->
<!-- ANCHOR:video-audio-capabilities -->
### Video-Audio Capabilities

| Feature           | Description                           |
| ----------------- | ------------------------------------- |
| **Trim**          | Cut video to specific start/end times |
| **Merge**         | Combine multiple videos               |
| **Extract Audio** | Separate audio track from video       |
| **Add Subtitles** | Burn in or attach subtitle tracks     |
| **Convert**       | Change formats (MP4, MOV, WebM, etc.) |
| **HLS**           | Create streaming-ready content        |
| **Compress**      | Reduce video file size                |

---

<!-- /ANCHOR:video-audio-capabilities -->
<!-- ANCHOR:8-examples -->
## 8. 💡 EXAMPLES

<!-- /ANCHOR:8-examples -->
<!-- ANCHOR:image-processing-examples -->
### Image Processing Examples

```
# Resize an image
Resize the image /images/Original/photo.jpg to 800x600 and save to /images/New/

# Convert format
Convert /images/Original/image.png to JPEG with 85% quality

# Apply filters
Apply grayscale filter to /images/Original/photo.jpg

# Batch resize
Resize all images in /images/Original/ to max 1920px width
```

<!-- /ANCHOR:image-processing-examples -->
<!-- ANCHOR:video-processing-examples -->
### Video Processing Examples

```
# Trim video
Trim /videos/Original/video.mp4 from 00:30 to 02:00

# Extract audio
Extract the audio from /videos/Original/video.mp4 as MP3

# Convert to HLS
Convert /videos/Original/video.mp4 to HLS format for streaming

# Merge videos
Merge all videos in /videos/Original/ into one file
```

---

<!-- /ANCHOR:video-processing-examples -->
<!-- ANCHOR:9-troubleshooting -->
## 9. 🔧 TROUBLESHOOTING

<!-- /ANCHOR:9-troubleshooting -->
<!-- ANCHOR:docker-containers-not-running -->
### Docker Containers Not Running

```bash
# Check Docker Desktop is running
docker ps

# Restart containers
docker restart imagician
docker restart video-audio

# View detailed logs
docker logs imagician --tail 50
docker logs video-audio --tail 50
```

<!-- /ANCHOR:docker-containers-not-running -->
<!-- ANCHOR:claude-desktop-not-connecting -->
### Claude Desktop Not Connecting

1. **Verify containers are running:**
   ```bash
   docker ps | grep -E "imagician|video-audio"
   ```

2. **Check config file exists and is valid:**
   ```bash
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

3. **Validate JSON syntax** (no trailing commas, proper brackets)

4. **Restart Claude Desktop completely** (⌘Q, not just close window)

<!-- /ANCHOR:claude-desktop-not-connecting -->
<!-- ANCHOR:permission-issues -->
### Permission Issues

```bash
# Check folder permissions
ls -la ~/MCP\ Servers/Media\ Editor/export/

# Grant permissions if needed
chmod -R 755 ~/MCP\ Servers/Media\ Editor/export/
```

<!-- /ANCHOR:permission-issues -->
<!-- ANCHOR:containers-keep-stopping -->
### Containers Keep Stopping

```bash
# Rebuild with logs visible
cd ~/MCP\ Servers/imagician
docker-compose down
docker-compose up --build

# Same for video-audio
cd ~/MCP\ Servers/video-audio
docker-compose down
docker-compose up --build
```

<!-- /ANCHOR:containers-keep-stopping -->
<!-- ANCHOR:volume-path-issues -->
### Volume Path Issues

```bash
# Verify the path in docker-compose.yml matches your actual folder
# The path before the colon should be your local path
# The path after the colon should be /images or /videos

# Test volume mounting
docker run --rm -v /your/path/to/images:/test alpine ls /test
```

---

<!-- /ANCHOR:volume-path-issues -->
<!-- ANCHOR:10-resources -->
## 10. 📚 RESOURCES

<!-- /ANCHOR:10-resources -->
<!-- ANCHOR:official-repositories -->
### Official Repositories

- **Imagician**: https://github.com/flowy11/imagician
- **Video-Audio MCP**: https://github.com/misbahsy/video-audio-mcp

<!-- /ANCHOR:official-repositories -->
<!-- ANCHOR:docker-commands-reference -->
### Docker Commands Reference

| Command                        | Purpose                        |
| ------------------------------ | ------------------------------ |
| `docker ps`                    | List running containers        |
| `docker logs [container]`      | View container logs            |
| `docker restart [container]`   | Restart a container            |
| `docker-compose up -d`         | Start containers in background |
| `docker-compose down`          | Stop and remove containers     |
| `docker-compose up -d --build` | Rebuild and start containers   |

<!-- /ANCHOR:docker-commands-reference -->
<!-- ANCHOR:quick-start-checklist -->
### Quick Start Checklist

- [ ] Docker Desktop installed and running
- [ ] Folder structure created (Original/New directories)
- [ ] Repositories cloned
- [ ] Volume paths updated in docker-compose files
- [ ] Containers built and running
- [ ] Claude Desktop config updated
- [ ] Claude Desktop restarted
- [ ] Test commands verified

---

<!-- /ANCHOR:quick-start-checklist -->
<!-- ANCHOR:ready-to-go -->
## 🎉 Ready to Go!

Your Media Editor MCP system is now configured. Place media files in the `Original/` folders and start editing with AI!

**Quick Test:**
1. Place a test image in `Media Editor/export/images/Original/`
2. Open Claude Desktop
3. Run: `$repair` to verify connections
4. Ask: `Resize the image in /images/Original/ to 800x600`

Enjoy AI-powered media editing! 🚀
<!-- /ANCHOR:ready-to-go -->
