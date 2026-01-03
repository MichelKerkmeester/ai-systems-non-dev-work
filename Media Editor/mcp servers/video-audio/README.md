# Video-Audio

> Docker-based MCP server for video and audio editing powered by FFmpeg.

---

## TABLE OF CONTENTS

- [1. 📖 OVERVIEW](#1--overview)
- [2. 🚀 QUICK START](#2--quick-start)
- [3. 📁 STRUCTURE](#3--structure)
- [4. ⚡ FEATURES](#4--features)
- [5. ⚙️ CONFIGURATION](#5--configuration)
- [6. 💡 USAGE EXAMPLES](#6--usage-examples)
- [7. 🛠️ TROUBLESHOOTING](#7--troubleshooting)
- [8. ❓ FAQ](#8--faq)
- [9. 📚 RELATED DOCUMENTS](#9--related-documents)

---

## 1. 📖 OVERVIEW

### What is Video-Audio?

Video-Audio is a comprehensive Model Context Protocol (MCP) server that provides professional-grade video and audio editing capabilities through FFmpeg. It enables AI assistants to perform format conversion, trimming, overlays, transitions, and advanced audio processing through a standardized interface. This Docker deployment ensures consistent FFmpeg availability and isolated processing.

### Key Statistics

| Category | Count | Details |
|----------|-------|---------|
| Tools | 27+ | Across 4 categories |
| Video Operations | 9 | Format, resolution, codec, bitrate, frame rate |
| Audio Operations | 9 | Format, bitrate, sample rate, channels |
| Creative Tools | 5 | Subtitles, overlays, B-roll, transitions |
| Advanced Editing | 4 | Concatenation, speed, silence removal |

### Key Features

| Feature | Description |
|---------|-------------|
| **Video Processing** | Format conversion, resolution scaling, codec changes, frame rate adjustment |
| **Audio Processing** | Format conversion, bitrate adjustment, sample rate changes, channel configuration |
| **Editing Tools** | Video trimming, speed adjustment, aspect ratio changes |
| **Overlays & Effects** | Text overlays, image watermarks, subtitle burning |
| **Advanced Editing** | Video concatenation with transitions, B-roll insertion, silence removal |
| **Transitions** | Fade in/out effects, crossfade transitions between clips |

### Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Docker | 20.10+ | 24.0+ |
| Docker Compose | 2.0+ | 2.20+ |
| Disk Space | 1GB | 5GB+ (for video processing) |

---

## 2. 🚀 QUICK START

### Prerequisites

- Docker Desktop running
- Videos directory accessible at configured volume path

### 30-Second Setup

```bash
# 1. Navigate to the server directory
cd "/Users/michelkerkmeester/MEGA/AI Systems/Media Editor/mcp servers/video-audio"

# 2. Build and start the container
docker-compose up -d --build

# 3. Verify container is running
docker ps --filter "name=video-audio"
```

### Verify Installation

```bash
# Check container status
docker ps --filter "name=video-audio" --format "table {{.Names}}\t{{.Status}}"

# Expected output:
# NAMES         STATUS
# video-audio   Up X minutes

# Verify FFmpeg is available
docker exec video-audio ffmpeg -version | head -1
# Expected: ffmpeg version X.X.X
```

### First Use

```bash
# Test the MCP server health check
docker exec -i video-audio python /app/server.py <<< '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# Expected: JSON response listing available tools
```

---

## 3. 📁 STRUCTURE

```
video-audio/
├── docker-compose.yml       # Container orchestration
├── Dockerfile               # Container build with FFmpeg
├── README.md                # This file
└── VOLUME_REFERENCE.md      # Volume mounting guide
```

Inside the container (`/app/`):
```
/app/
├── server.py                # MCP server entry point
├── main.py                  # Core processing logic
├── pyproject.toml           # Python dependencies
├── requirements.txt         # Pip requirements
└── tests/                   # Test suite
    ├── test_video_functions.py
    └── example_usage.py
```

### Key Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Defines container, volumes, and environment |
| `Dockerfile` | Builds Python image with FFmpeg |
| `/app/server.py` | FastMCP server implementation |
| `VOLUME_REFERENCE.md` | Detailed volume configuration guide |

---

## 4. ⚡ FEATURES

### Core Video Operations

**extract_audio_from_video**: Extract audio tracks from video files.

| Aspect | Details |
|--------|---------|
| **Purpose** | Separate audio from video for processing |
| **Output Formats** | MP3, WAV, AAC, FLAC |

**trim_video**: Cut video segments with precise timing.

| Aspect | Details |
|--------|---------|
| **Purpose** | Extract specific portions of a video |
| **Parameters** | Start time, end time (supports HH:MM:SS format) |

**convert_video_format**: Convert between video formats.

| Aspect | Details |
|--------|---------|
| **Purpose** | Change container format (MP4, MOV, AVI, MKV, WebM) |
| **Codec Handling** | Automatic codec selection or manual override |

**convert_video_properties**: Comprehensive video property conversion.

| Aspect | Details |
|--------|---------|
| **Purpose** | Change multiple properties in one operation |
| **Options** | Format, resolution, codec, bitrate, frame rate |

**change_aspect_ratio**: Adjust video aspect ratios.

| Aspect | Details |
|--------|---------|
| **Purpose** | Reformat for different platforms (16:9, 9:16, 1:1) |
| **Methods** | Padding, cropping, or stretching |

**set_video_resolution**: Change video resolution.

| Aspect | Details |
|--------|---------|
| **Purpose** | Scale to 1080p, 720p, 4K, or custom dimensions |
| **Quality** | Maintains quality with appropriate bitrate adjustment |

**set_video_codec**: Switch video codecs.

| Aspect | Details |
|--------|---------|
| **Purpose** | Convert to H.264, H.265/HEVC, VP9, AV1 |
| **Use Cases** | Compatibility, compression, quality |

**set_video_bitrate**: Adjust video quality and file size.

| Aspect | Details |
|--------|---------|
| **Purpose** | Control output file size and quality |
| **Format** | Specify as "5M", "2500k", etc. |

**set_video_frame_rate**: Change playback frame rates.

| Aspect | Details |
|--------|---------|
| **Purpose** | Convert between 24, 30, 60 fps, etc. |
| **Use Cases** | Slow motion, time-lapse, format compliance |

### Audio Processing

**convert_audio_format**: Convert between audio formats.

| Aspect | Details |
|--------|---------|
| **Formats** | MP3, WAV, AAC, FLAC, OGG |

**convert_audio_properties**: Comprehensive audio conversion.

| Aspect | Details |
|--------|---------|
| **Options** | Format, bitrate, sample rate, channels |

**set_audio_bitrate**: Adjust audio quality.

| Aspect | Details |
|--------|---------|
| **Range** | 64k to 320k for MP3, higher for lossless |

**set_audio_sample_rate**: Change sample rates.

| Aspect | Details |
|--------|---------|
| **Common Rates** | 44100 Hz, 48000 Hz, 96000 Hz |

**set_audio_channels**: Convert between mono and stereo.

| Aspect | Details |
|--------|---------|
| **Options** | Mono (1), Stereo (2), 5.1 surround (6) |

**Video audio track tools**: Modify audio within video files.

| Tools | Purpose |
|-------|---------|
| `set_video_audio_track_codec` | Change audio codec in video |
| `set_video_audio_track_bitrate` | Adjust audio bitrate in video |
| `set_video_audio_track_sample_rate` | Change audio sample rate in video |
| `set_video_audio_track_channels` | Modify audio channels in video |

### Creative Tools

**add_subtitles**: Burn subtitles with custom styling.

| Aspect | Details |
|--------|---------|
| **Input** | SRT, ASS, VTT subtitle files |
| **Styling** | Font, size, color, position |

**add_text_overlay**: Add dynamic text overlays with timing.

| Aspect | Details |
|--------|---------|
| **Options** | Text, position, timing, font, color, background |
| **Multiple** | Support for multiple text elements |

**add_image_overlay**: Insert watermarks and logos.

| Aspect | Details |
|--------|---------|
| **Position** | Any corner or custom coordinates |
| **Opacity** | Adjustable transparency |

**add_b_roll**: Insert B-roll footage with transitions.

| Aspect | Details |
|--------|---------|
| **Purpose** | Insert cutaway footage at specific timestamps |
| **Transitions** | Fade, cut, or dissolve |

**add_basic_transitions**: Apply fade in/out effects.

| Aspect | Details |
|--------|---------|
| **Types** | Fade in, fade out, both |
| **Duration** | Configurable transition length |

### Advanced Editing

**concatenate_videos**: Join multiple videos with transitions.

| Aspect | Details |
|--------|---------|
| **Input** | Array of video file paths |
| **Transitions** | None, crossfade, dissolve |
| **Duration** | Configurable transition length |

**change_video_speed**: Create slow-motion or time-lapse.

| Aspect | Details |
|--------|---------|
| **Speed** | 0.25x (slow-mo) to 4x (fast forward) |
| **Audio** | Optional audio speed adjustment |

**remove_silence**: Automatically remove silent segments.

| Aspect | Details |
|--------|---------|
| **Purpose** | Clean up podcasts, interviews, tutorials |
| **Threshold** | Configurable silence detection level |

**health_check**: Verify server status.

| Aspect | Details |
|--------|---------|
| **Purpose** | Confirm server is running and FFmpeg available |

---

## 5. ⚙️ CONFIGURATION

### Configuration File

**Location**: `docker-compose.yml`

```yaml
version: "3.8"

services:
  video-audio:
    build: .
    image: video-audio:latest
    container_name: video-audio
    volumes:
      - /Users/michelkerkmeester/MEGA/AI Systems/Media Editor/export/videos:/videos:rw
    environment:
      - PYTHONUNBUFFERED=1
      - NODE_ENV=production
      - VIDEO_PATH=/videos
    network_mode: host
    stdin_open: true
    tty: true
    restart: unless-stopped
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `VIDEO_PATH` | string | `/videos` | Base path for video operations inside container |
| `PYTHONUNBUFFERED` | string | `1` | Ensures real-time Python output |
| `NODE_ENV` | string | `production` | Environment mode |

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VIDEO_PATH` | Yes | Container path where videos are accessible |
| `PYTHONUNBUFFERED` | Yes | Enables real-time logging |

### Volume Mounts

| Host Path | Container Path | Purpose |
|-----------|----------------|---------|
| `.../Media Editor/export/videos` | `/videos` | Read/write access to video/audio files |

---

## 6. 💡 USAGE EXAMPLES

### Example 1: Convert Video Format

```
"Convert my-video.mp4 to MOV format"
```

**Result**: Creates `my-video.mov` with compatible codecs.

### Example 2: Trim Video Segment

```
"Trim the video from 00:30 to 02:15"
```

**Result**: Extracts 1 minute 45 seconds starting at the 30-second mark.

### Example 3: Add Text Overlay

```
"Add the text 'Welcome' centered at the top for the first 3 seconds"
```

**Result**: Video with text overlay appearing during specified timeframe.

### Example 4: Create Highlight Reel

```
"Concatenate clip1.mp4, clip2.mp4, and clip3.mp4 with 1-second crossfade transitions"
```

**Result**: Single video with smooth transitions between clips.

### Example 5: Optimize for Social Media

```
"Convert to 9:16 aspect ratio, reduce to 1080x1920, and compress for Instagram"
```

**Result**: Vertical video optimized for mobile viewing.

### Example 6: Remove Silence from Podcast

```
"Remove all silent parts from podcast-episode.mp3 that are longer than 1 second"
```

**Result**: Cleaned audio with dead air removed.

### Common Patterns

| Pattern | Prompt | When to Use |
|---------|--------|-------------|
| Format conversion | "Convert to MP4 with H.264" | Maximum compatibility |
| Resolution change | "Downscale to 720p" | Reduce file size |
| Extract audio | "Extract audio as MP3" | Create audio-only version |
| Add watermark | "Add logo.png to bottom-right" | Brand videos |
| Speed change | "Create 2x speed version" | Time-lapse effect |
| Concatenate | "Join all clips with fade" | Compile highlights |

---

## 7. 🛠️ TROUBLESHOOTING

### Common Issues

#### Container Not Running

**Symptom**: `docker exec` returns "No such container"

**Cause**: Container stopped or not started

**Solution**:
```bash
# Check container status
docker ps -a --filter "name=video-audio"

# Restart container
docker-compose up -d
```

#### FFmpeg Codec Error

**Symptom**: "Unknown encoder" or "Codec not found"

**Cause**: Requested codec not available in FFmpeg build

**Solution**:
```bash
# List available codecs
docker exec video-audio ffmpeg -codecs | grep -i "codec-name"

# Use alternative codec
# H.264: libx264
# H.265: libx265
# VP9: libvpx-vp9
```

#### Permission Denied on Videos

**Symptom**: "Permission denied" when reading/writing files

**Cause**: Volume mount permissions mismatch

**Solution**:
```bash
# Check host directory permissions
ls -la "/Users/michelkerkmeester/MEGA/AI Systems/Media Editor/export/videos"

# Ensure directory exists and is writable
mkdir -p "/Users/michelkerkmeester/MEGA/AI Systems/Media Editor/export/videos"
chmod 755 "/Users/michelkerkmeester/MEGA/AI Systems/Media Editor/export/videos"
```

#### Processing Takes Too Long

**Symptom**: Video operations hang or timeout

**Cause**: Large file size, complex operations, or insufficient resources

**Solution**:
- Break large videos into smaller segments first
- Reduce resolution before applying effects
- Increase Docker resource limits

### Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Container stopped | `docker-compose up -d` |
| Stale container | `docker-compose down && docker-compose up -d` |
| Build issues | `docker-compose build --no-cache` |
| FFmpeg errors | Check codec availability with `ffmpeg -codecs` |
| Out of space | Clean `/videos` directory of temp files |

### Diagnostic Commands

```bash
# Check container status
docker ps --filter "name=video-audio"

# View container logs
docker logs video-audio --tail 100

# Check FFmpeg version and codecs
docker exec video-audio ffmpeg -version
docker exec video-audio ffmpeg -codecs | head -50

# Test MCP server
docker exec -i video-audio python /app/server.py <<< '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# Check disk space
docker exec video-audio df -h /videos
```

---

## 8. ❓ FAQ

### General Questions

**Q: What video formats are supported?**

A: Input and output support MP4, MOV, AVI, MKV, WebM, and most common formats. FFmpeg handles format detection automatically.

---

**Q: What's the maximum video file size?**

A: Limited by available disk space in the mounted volume. Processing time increases with file size. For files >4GB, ensure sufficient temporary space.

---

**Q: Where should I place videos for processing?**

A: Place videos in the mounted volume directory: `/Users/michelkerkmeester/MEGA/AI Systems/Media Editor/export/videos`. They will be accessible at `/videos` inside the container.

---

**Q: Can I process multiple videos simultaneously?**

A: Yes, the server can handle multiple requests, but FFmpeg operations are CPU-intensive. Parallel processing may slow individual operations.

---

### Technical Questions

**Q: How do I specify video quality?**

A: Use bitrate settings. Common values:
- Low quality: 1-2 Mbps
- Medium quality: 5-8 Mbps  
- High quality: 15-25 Mbps
- 4K: 35-50 Mbps

```
"Convert video to H.264 with 8M bitrate"
```

---

**Q: Which codec should I use for best compatibility?**

A: H.264 (libx264) with AAC audio provides maximum compatibility across devices and platforms.

---

**Q: How do I add subtitles permanently?**

A: Use the `add_subtitles` tool with an SRT file. Subtitles are burned into the video (hardcoded).

```
"Burn subtitles.srt into video.mp4"
```

---

**Q: Can I preserve original quality during format conversion?**

A: Use `-c copy` mode when only changing container format without re-encoding. The server attempts this when codecs are compatible.

---

## 9. 📚 RELATED DOCUMENTS

### Internal Documentation

| Document | Purpose |
|----------|---------|
| [VOLUME_REFERENCE.md](./VOLUME_REFERENCE.md) | Detailed volume mounting configuration |
| [Media Editor README](../../README.md) | Parent system documentation |
| [INSTALL_GUIDE.md](../../INSTALL_GUIDE.md) | Complete installation instructions |

### External Resources

| Resource | Description |
|----------|-------------|
| [Video-Audio MCP GitHub](https://github.com/misbahsy/video-audio-mcp) | Original source repository |
| [FFmpeg Documentation](https://ffmpeg.org/documentation.html) | Complete FFmpeg reference |
| [FFmpeg Codecs](https://ffmpeg.org/ffmpeg-codecs.html) | Codec-specific options |
| [FastMCP Framework](https://github.com/jlowin/fastmcp) | Python MCP framework |
| [MCP Protocol](https://modelcontextprotocol.io/) | Model Context Protocol specification |

---

*Documentation version: 1.0 | Last updated: 2026-01-03*
