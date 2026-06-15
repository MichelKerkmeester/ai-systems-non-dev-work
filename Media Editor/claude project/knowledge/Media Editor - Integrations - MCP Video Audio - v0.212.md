---
title: "Media Editor - Integrations - MCP Video Audio - v0.212"
description: "Video-Audio MCP server capabilities, operation parameters, codec and format guidance for video and audio processing operations."
version: "0.212"
contextType: reference
importance_tier: high
trigger_phrases:
  - "video audio mcp"
  - "transcode trim concatenate"
  - "extract audio remove silence"
  - "video operation parameters"
  - "ffmpeg video processing"
---

# Media Editor - Integrations - MCP Video Audio - v0.212

Technical reference for Video-Audio MCP server capabilities and integration for video and audio processing operations.

## 1. OVERVIEW

### Purpose

Defines the technical specifications and operational capabilities for the Video-Audio MCP server powered by FFmpeg. It is the technical reference for video and audio conversion, editing, effects, and codec selection.

### When to Use

- Loaded ON-DEMAND for any video or audio processing operation
- Looking up Video-Audio capabilities, operation parameters, and codecs
- Applying conversion, editing, advanced effects, and quality guidance

---

## 2. SERVER OVERVIEW

The Video-Audio MCP server (`@misbahsy/video-audio-mcp`) provides comprehensive video and audio processing powered by FFmpeg. It enables format conversion, editing, optimization and advanced effects through native MCP integration.

**Key information:**
- Package: `@misbahsy/video-audio-mcp`
- Repository: https://github.com/misbahsy/video-audio-mcp
- Engine: FFmpeg (comprehensive media framework)
- Protocol: Model Context Protocol (MCP)
- Language: Python

**Installation:** UV package manager (`uv sync`) recommended, Python pip as an alternative.

### Connection Verification

Connection verification must be the first action before all operations. Use the `health_check` tool to verify server status and FFmpeg availability.

- Connected: "Video-Audio MCP connected, media processing available."
- Disconnected: "Video-Audio MCP not connected, setup required."

Required dependencies: FFmpeg installed on the system, a configured Python environment and the MCP server running and accessible.

---

## 3. CORE CAPABILITIES

**Video format conversion:**
- `convert_video_format` between MP4, MOV, AVI, WebM and MKV.
- `convert_video_properties` for advanced conversion with codec and quality control.

**Video editing:**
- `trim_video` to extract a time segment.
- `concatenate_videos` to join videos with optional transitions.
- `adjust_video_speed` for slow motion or timelapse.

**Video properties:**
- `set_video_resolution`, `change_aspect_ratio`, `set_video_codec`.

**Video optimization:**
- `set_video_bitrate`, `set_video_frame_rate`.

**Visual effects:**
- `fade_in_out`, `add_transition_effect`.

**Audio operations:**
- `extract_audio_from_video`, `convert_audio_format`, `convert_audio_properties`, `remove_silence`.

**Advanced features:**
- `add_text_overlay`, `add_image_overlay`, `add_subtitle`, `insert_broll`.

**System tools:**
- `health_check` to verify server status and FFmpeg version.

---

## 4. VIDEO OPERATIONS

### Format Conversion

```yaml
convert_video_format:
  video_path: string (required)
  output_video_path: string (required)
  target_format: string (required)  # mp4, mov, avi, webm, mkv

convert_video_properties:
  input_video_path: string (required)
  output_video_path: string (required)
  resolution: string (optional)        # WIDTHxHEIGHT
  video_codec: string (optional)       # libx264, libx265, vp9
  audio_codec: string (optional)       # aac, mp3, opus
  video_bitrate: string (optional)     # 5M
  audio_bitrate: string (optional)     # 192k
  frame_rate: integer (optional)       # 24, 30, 60
```

### Editing

```yaml
trim_video:
  video_path, output_video_path: string (required)
  start_time, end_time: string  # HH:MM:SS or seconds

concatenate_videos:
  video_paths: array of string (required)
  output_video_path: string (required)
  transition: string  # fade, dissolve, wipe, none

adjust_video_speed:
  video_path, output_video_path: string (required)
  speed_factor: float  # 0.25-0.5 slow motion, 1.0 normal, 2.0-4.0 timelapse
```

### Resolution And Aspect Ratio

```yaml
set_video_resolution: { video_path, output_video_path: string, width, height: integer }
change_aspect_ratio:  { video_path, output_video_path: string, aspect_ratio: string }  # 16:9, 4:3, 1:1, 9:16, 21:9
```

| Ratio | Use Case                         | Common Resolutions   |
| ----- | -------------------------------- | -------------------- |
| 16:9  | Standard video (YouTube, TV)     | 1920x1080, 1280x720  |
| 1:1   | Social media square              | 1080x1080, 720x720   |
| 9:16  | Vertical video (Stories, TikTok) | 1080x1920, 720x1280  |
| 21:9  | Cinematic ultrawide              | 2560x1080, 3440x1440 |

---

## 5. AUDIO OPERATIONS

```yaml
extract_audio_from_video: { video_path, output_audio_path: string, audio_codec: string }  # aac, mp3, flac
convert_audio_format:     { input_audio_path, output_audio_path, target_format: string, bitrate, sample_rate, channels }
remove_silence:           { video_path, output_video_path: string }  # threshold and duration auto-calculated
```

### Audio Quality Guidelines

| Preset          | Bitrate | Use Case             | Quality              |
| --------------- | ------- | -------------------- | -------------------- |
| Voice Only      | 96k     | Speech, podcasts     | Acceptable for voice |
| Standard        | 128k    | General audio        | Good for most uses   |
| Music Streaming | 192k    | Music, good quality  | High quality audio   |
| High Quality    | 256k    | High quality music   | Very high quality    |
| Maximum         | 320k    | Archival, production | Maximum quality      |

Sample rates: 22.05 kHz minimal voice, 44.1 kHz CD quality, 48 kHz professional. Channels: 1 mono (voice), 2 stereo (music, video).

---

## 6. ADVANCED FEATURES

```yaml
add_text_overlay:  { video_path, output_video_path, text: string, position, font_size, font_color, start_time, duration }
add_image_overlay: { video_path, output_video_path, image_path: string, position, scale, start_time, duration }  # watermark or logo
add_transition_effect: { video1_path, video2_path, output_video_path, transition_type, transition_duration }  # fade, dissolve, wipe
fade_in_out:       { video_path, output_video_path: string }
add_subtitle:      { video_path, output_video_path, subtitle_path: string, style: object }  # SRT or ASS
insert_broll:      { main_video_path, broll_video_path, output_video_path, insert_points, broll_duration }
```

Position options: top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, bottom-right.

---

## 7. FORMAT SUPPORT

**Video:**
- MP4 (H.264, H.265 / AAC, MP3): universal compatibility.
- MOV (H.264, ProRes / AAC, PCM): Apple ecosystem.
- AVI: legacy systems.
- MKV: maximum flexibility.
- WebM (VP8, VP9 / Opus, Vorbis): web streaming.

**Audio:**
- MP3: lossy, universal playback.
- WAV (PCM): lossless, editing and production.
- AAC: lossy, modern devices.
- FLAC: lossless, archival.
- OGG (Vorbis): lossy, open source.

---

## 8. CODEC SPECIFICATIONS

**Video codecs:**
- H.264 (libx264): universal compatibility, good compression, fast. Default choice.
- H.265 (libx265): modern devices, excellent compression (about 50% smaller), slower. Size optimization.
- VP9: web browsers, excellent compression, slow. Web streaming.
- ProRes: professional editing, minimal compression, very fast. Production workflow.

**Audio codecs:**
- AAC: modern standard, excellent quality. Default choice.
- MP3: universal compatibility, good quality.
- PCM: uncompressed, perfect quality. Editing and production.
- FLAC: lossless, perfect quality. Archival.
- Opus: modern, excellent quality. Streaming efficiency.

---

## 9. QUICK REFERENCE

### Performance Characteristics

| File Size      | Trim    | Convert  | Compress |
| -------------- | ------- | -------- | -------- |
| Under 100MB    | 1-5s    | 5-15s    | 10-30s   |
| 100MB to 1GB   | 5-20s   | 30-120s  | 60-300s  |
| Over 1GB       | 20-60s  | 2-10min  | 5-20min  |

### Limitations

- Required: FFmpeg installed, Python environment, sufficient disk space.
- Recommended maximum: 2GB per operation. Split large files as a workaround.
- Can do: format conversion, transcoding, trimming, concatenation, overlays, subtitles, effects, audio extraction and processing.
- Cannot do: AI content generation, complex non-linear editing, real-time processing, direct upload to platforms.

---

*This reference focuses on Video-Audio MCP server capabilities. For thinking methodology, see the MEDIA Framework. For conversation flows and error handling, see Interactive Intelligence.*
