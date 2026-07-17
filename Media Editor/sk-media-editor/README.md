---
title: "sk-media-editor"
description: "Media Editor skill for Barter: drives the Imagician and Video-Audio MCP servers plus Terminal FFmpeg to edit, convert, compress and stream existing images, video and audio."
trigger_phrases:
  - "media editor"
  - "$image"
  - "$video"
  - "$audio"
  - "$hls"
  - "$repair"
version: 1.1.0.0
---

# sk-media-editor

> Verifies the right tool is connected, then turns a request to resize, convert, compress or stream existing media into a saved, verified export. It never generates a new image, video or audio clip from a prompt.

| Core layer | What it adds |
|---|---|
| 🧭 **Smart Router** | Five media intents behind exact commands and keyword-weighted semantic scoring |
| 🔒 **Tool Verification Gate** | A blocking check for Imagician, Video-Audio or FFmpeg before any operation runs |
| 🧠 **MEDIA Thinking** | Five phases (Measure, Evaluate, Decide, Implement, Analyze) with two-layer transparency |
| 🎚️ **Format & Quality Intelligence** | Use-case-driven format and quality selection, with the trade-off named in plain language |
| 📤 **Export-First Delivery** | Every result saves to `export/` and is verified before the chat response |
| 🎬 **HLS Streaming Recipes** | A Terminal FFmpeg command pack for multi-quality adaptive delivery |

---

## 1. OVERVIEW

### What This Is

This folder is the CLI packaging of the Media Editor system: one skill that edits, converts, compresses and streams media that already exists. `SKILL.md` carries the identity, the router, the tool verification gate and every rule. `references/` holds the MEDIA thinking framework, the interactive conversation flow, the Imagician and Video-Audio integration specs, and a relative symlink to the shared Human Voice Rules. `assets/` holds the Terminal FFmpeg HLS conversion command pack. A cold model bootstraps through `../AGENTS.md`, and from that point on it IS the Media Editor: scope, tool verification and export rules replace generic assistant behavior.

The Media Editor drives three tool surfaces and reimplements none of them: the Imagician MCP server for images, the Video-Audio MCP server for video and audio, and Terminal FFmpeg for HLS. Every processed result lands in `../export/` before any response is written, and a second, chat-advisory packaging of the same brain lives in `../claude project/` for claude.ai, where no MCP server or terminal is reachable.

### How A Request Flows

```text
                      YOUR REQUEST
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│                    SMART ROUTER                     │
│                                                    │
│  1. Exact commands   $image $video $audio $hls     │
│                      $repair $interactive           │
│  2. Keyword scoring  weighted media-type signals    │
│  3. Interactive      one comprehensive question     │
└────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│   TOOL VERIFICATION GATE (blocking)                 │
│   Imagician: list_images                            │
│   Video-Audio: health_check                         │
│   FFmpeg: ffmpeg -version                           │
└────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│   MODE REFERENCE + INTEGRATION SPEC                 │
│   (mcp-imagician, mcp-video-audio or HLS recipes)   │
└────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│   MEDIA: Measure → Evaluate → Decide                │
│          → Implement → Analyze                      │
│                                                    │
│   Gates: tool reality check, format and quality     │
│          fit, Human Voice Rules, size limits        │
└────────────────────────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────┐
│   export/[###] - [description]/  +  verified save   │
└────────────────────────────────────────────────────┘
                           │
                           ▼
        chat response: path plus a brief summary
```

---

## 2. QUICK START

Point any capable model at `../AGENTS.md` and ask:

```text
$image resize photo.jpg to 1920px and convert to webp
$video trim presentation.mp4 from 00:30 to 02:00
$audio extract the audio track and normalize levels
$hls convert this video to adaptive streaming
$repair diagnose this broken file
compress my vacation photos for the web
```

An exact command routes on a plain substring match, before any keyword scoring runs. Plain language falls through to weighted keyword detection by media type, and a request that matches no command and scores zero on every keyword set lands in Interactive Mode with one comprehensive question.

### Detection, By Example

| Request | Routes to |
|---|---|
| `$image resize photo.jpg` | Image Mode, Imagician (exact command) |
| "compress this video for email" | Video Mode, Video-Audio (the word "video" scores highest) |
| "$hls convert this clip" | HLS Mode, Terminal FFmpeg (exact command) |
| "the file is corrupted, please recover it" | Repair Mode, auto-detect tool ("corrupted" plus "recover") |
| "extract audio and remove silence" | Audio Mode, Video-Audio ("audio" plus "silence") |
| "help with my media" | Interactive Mode, one comprehensive question (no signal scores) |

---

## 3. THE OPERATING MODES

| Mode | Tool, triggered by |
|---|---|
| Interactive (default, `$interactive` / `$int`) | Auto-detect, guided discovery for ambiguous requests |
| Image (`$image` / `$img`) | Imagician MCP, resize, convert, compress, crop, rotate, flip |
| Video (`$video` / `$vid`) | Video-Audio MCP, transcode, trim, overlay, concatenate |
| Audio (`$audio` / `$aud`) | Video-Audio MCP, extract, convert, normalize, remove silence |
| HLS (`$hls`) | Terminal FFmpeg, multi-quality adaptive streaming |
| Repair (`$repair` / `$r`) | Auto-detect, diagnose and fix a broken media file |

### Image Mode

Drives the **Imagician MCP server** (`@flowy11/imagician`, built on Sharp). Verify with `list_images` before any operation.

Processing order matters: crop first to remove unwanted area, then resize, then rotate or flip, then convert format, then compress as the final step.

```yaml
convert:
  inputPath: string (required)
  outputPath: string (required)
  format: string (required)  # jpeg, png, webp, avif
  quality: number (optional, default 85)  # 1-100
```

| Preset | Quality guidance |
|---|---|
| Archive | 100, lossless preservation, largest file |
| High quality | 90-95, prints and professional work |
| Standard web | 80-89, the default for web display |
| Good compression | 70-79, size priority with acceptable quality |
| Heavy compression | 60-69, extreme size limits |

Supported formats: JPEG, PNG, WebP, AVIF. Not supported: GIF, TIFF, BMP, SVG. Recommended maximum: 50MB per image, batch processing preferred for large sets.

### Video Mode

Drives the **Video-Audio MCP server** (`@misbahsy/video-audio-mcp`, built on FFmpeg, Python). Verify with `health_check` before any operation.

```yaml
trim_video:
  video_path, output_video_path: string (required)
  start_time, end_time: string  # HH:MM:SS or seconds
```

Formats: MP4, MOV, AVI, MKV, WebM. Codecs default to H.264 for compatibility, with H.265 or VP9 available when size matters. Recommended maximum: 2GB per operation. A conversion on a file over 1GB runs 2 to 10 minutes, a compression pass 5 to 20 minutes.

### Audio Mode

The same **Video-Audio MCP server** drives audio work: extraction, format conversion, normalization and silence removal.

```yaml
remove_silence:
  video_path: string (required)
  output_video_path: string (required)
  # threshold and duration auto-calculated
```

| Preset | Bitrate and use case |
|---|---|
| Voice only | 96k, speech and podcasts |
| Standard | 128k, general audio |
| Music streaming | 192k, good-quality music |
| High quality | 256k, high-quality music |
| Maximum | 320k, archival and production |

### HLS Mode

Drives **Terminal FFmpeg** directly, not an MCP server. Verify with `ffmpeg -version` before any operation. Generates a master playlist plus four quality variants from one source file.

```text
output/
  master.m3u8
  1080p/ playlist.m3u8 + segment_*.ts
  720p/  playlist.m3u8 + segment_*.ts
  480p/  playlist.m3u8 + segment_*.ts
  360p/  playlist.m3u8 + segment_*.ts
```

| Quality | Maxrate, profile |
|---|---|
| 1080p | 2500k, main profile, desktop displays |
| 720p | 1500k, main profile, desktop and tablets |
| 480p | 800k, baseline profile, mobile and slower connections |
| 360p | 500k, baseline profile, very slow connections |

Segments run 2 seconds by default for a fast start and quick quality switching. `-an` strips audio for a further 20 to 30 percent size saving where the delivery does not need it. The full command pack, the batch script and GPU-acceleration notes live in `assets/hls-video-conversion.md`.

### Repair Mode

Auto-detects the required tool from the file and the reported issue, after gathering file type, error messages and recovery priority, then applies the matching connection check before attempting a fix. `$repair` alone with no other context runs a connection check across all bound tools, matching the install guide's Check 4 verification step.

### Interactive Mode

The fallback for a request naming no media type and no command. One comprehensive question replaces a multi-turn interview:

```markdown
Please provide the following at once:

1. Media type: image, video, audio or HLS streaming
2. File information: location, current format, approximate size
3. Processing goal: target use case and the size-versus-quality priority
4. Output preferences: save location and a specific format, or let the system choose
```

A direct command (`$image`, `$video`, `$audio`, `$hls`, `$repair`) narrows this to one focused question for that media type only. Either way, the system waits for the complete response before processing starts.

---

## 4. FORMAT AND QUALITY INTELLIGENCE

Every operation selects a format and a quality level by use case, then names the trade-off in a sentence or two.

| Use case | Recommendation |
|---|---|
| Web images | WebP at 85% for size and broad support, AVIF when compatibility allows |
| Email images | JPEG at 80% for universal client support, PNG when transparency matters |
| Web video | H.264 MP4 for universal playback, H.265 or VP9 when size matters and support allows |
| Streaming video | HLS multi-quality (1080p, 720p, 480p, 360p) for adaptive bandwidth delivery |
| Podcast audio | MP3 at 192 kbps for universal playback, AAC for modern devices, FLAC for archival |

The MEDIA framework runs this selection through five phases, each showing a short external update while the full comparison stays internal:

| Phase | What the user sees |
|---|---|
| Measure (20%) | "Analyzing source (4K PNG, 8.5MB)" |
| Evaluate (30%) | "Evaluating (WebP optimal)" |
| Decide (20%) | "Deciding (85% quality, 1080p)" |
| Implement (10%) | "Processing (95% reduction)" |
| Analyze (20%) | "Complete (quality verified)" |

A quality metric below its threshold, an unsupported format or a disconnected tool triggers the improvement protocol: identify the issue, try an alternative format or quality, then fall back to the best compromise, capped at three iterations. A tool that stays unavailable stops the operation and reports setup guidance instead of an unverified promise.

---

## 5. OUTPUT FORMAT

Chat responses follow fixed formatting rules: dash bullets only, never emoji bullets, no horizontal dividers or decorative lines, one bullet per line, and headers with a line break before the next block. The response never pastes a full processing log or a metadata dump.

The visual feedback shape:

```markdown
[Media Type] processing complete

Input:
- File: [name] ([size])
- Format: [format]

Processing:
- Step 1: [description] done
- Step 2: [description] done

Results:
- Size: [original] to [new] ([percentage]% reduction)
- Quality: [percentage]% maintained
- Format: [original] to [new]

Output:
- Saved to: export/[### - description]/

Next steps:
- [Suggestion 1]
- [Suggestion 2]
```

---

## 6. EXPORT AND DELIVERY

Export is blocking. The strict sequence: verify the tool connection, process the media, save the output, verify the save succeeded, and only then respond with the path and a two-to-three sentence summary.

```text
export/[###] - [description]/
```

Media exports use a folder rather than a single file, since one operation often produces several outputs (an HLS conversion alone yields a master playlist, four variant playlists and a segment set per quality).

Examples:
- `export/001 - resized-product-images/`
- `export/002 - compressed-hero-video/`

Prohibited every time: showing full processing logs or metadata dumps in chat, showing the output path after a long inline description instead of leading with it, and asking whether to save. Saving is mandatory, not a question.

Blocking gates that stand between processing and delivery: no operation runs before tool verification passes, the deliverable stays inside the bound tool's capabilities (100MB for MCP operations, 5GB for HLS), and the export folder is saved and verified before the response is written.

---

## 7. ASSETS AND REFERENCE INVENTORY

`SKILL.md` plus these six files make the seven knowledge files mirrored into `claude project/knowledge/`.

| File | What it covers |
|---|---|
| `references/media-framework.md` | MEDIA methodology, RICCE validation, quality gates and the two-layer transparency model. ALWAYS-loaded |
| `references/human-voice-rules.md` | Shared Human Voice Rules symlink into `z — Knowledge/`. ALWAYS-loaded, never edited from this system |
| `references/interactive-intelligence.md` | Conversation flow, state machine, the comprehensive question and the per-mode question templates |
| `references/mcp-imagician.md` | Imagician MCP capabilities, operation parameters, format and quality tables for image work |
| `references/mcp-video-audio.md` | Video-Audio MCP capabilities, operation parameters, codec tables for video and audio work |
| `assets/hls-video-conversion.md` | Terminal FFmpeg HLS command recipes, quality tables and the batch conversion script |

The router loads `media-framework.md` and `human-voice-rules.md` on every invocation, and loads exactly one integration reference on demand once the tool is bound, so a request never triggers a bulk read of the whole set.

---

## 8. DUAL PACKAGING

`sk-media-editor/` is the source of truth and the CLI runtime: it holds live MCP and FFmpeg connections, verifies them, runs the operation and saves to `export/`. `claude project/` is a derived, chat-advisory mirror: `knowledge/` recopies the same seven files, and `Custom Instructions.md` is a hand-synthesized kernel that cannot execute a tool. In claude.ai, the Media Editor applies the same MEDIA thinking and format intelligence, then returns a Guidance Block instead of a processed file, the exact recipe and command for the user to run in the CLI runtime or their own terminal, with the no-execution limitation stated plainly.

`mcp servers/` holds the Imagician and Video-Audio implementations the skill drives (`imagician/`, `video-audio/`), maintained independently of the knowledge mirrors. `knowledge base/` is the pre-conversion legacy folder, superseded and kept read-only for comparison. `../SYNC.md` holds the manual sync contract: there is no `derive.py`, so every mirror update is a manual copy, `cp -L` for the Human Voice symlink so the Project receives file bytes rather than a link.

---

## 9. EXTERNAL RESOURCES

Format and codec references worth bookmarking, carried over from the pre-alignment root guide now archived in `../z_legacy/`. MCP server installation and Docker setup live in `../install-guide.md`, not repeated here.

| Resource | Link |
|---|---|
| FFmpeg documentation | https://ffmpeg.org/documentation.html |
| Sharp documentation (Imagician's image engine) | https://sharp.pixelplumbing.com/ |
| WebP guide | https://developers.google.com/speed/webp |
| HLS specification (RFC 8216) | https://datatracker.ietf.org/doc/html/rfc8216 |
| H.264 overview | https://en.wikipedia.org/wiki/Advanced_Video_Coding |
| Audio formats comparison | https://www.adobe.com/creativecloud/video/discover/audio-file-formats.html |

---

## 10. FAQ

**What happens when a required tool is not connected?**
The operation stops before it starts. The response reports the connection status in plain language and gives setup guidance instead of promising a result the bound tool cannot deliver.

**Can it generate a new image, video or clip from a text prompt?**
No. The Media Editor edits, converts, compresses and streams media that already exists. A generation request gets refused and reframed into a supported editing operation where one applies.

**What is the file size limit?**
100MB for MCP operations (Imagician recommends staying under 50MB per image, Video-Audio under 2GB per operation), and 5GB for HLS conversions through Terminal FFmpeg.

**Does the claude.ai Project actually run the MCP servers or FFmpeg?**
No. The Project is advisory only. It applies the same MEDIA thinking and format intelligence, then hands back a Guidance Block, the recipe and exact commands to run in the CLI runtime or a terminal.

**What if my request does not name a media type?**
It lands in Interactive Mode, which asks one comprehensive question covering media type, file information, processing goal and output preferences, then waits for the full answer before processing.

**Can it do color grading, effects or non-linear editing?**
No. That is out of scope and gets refused and reframed into a supported operation, the same as an upload-to-platform request.

---

## 11. TROUBLESHOOTING

| What you see | What to do |
|---|---|
| The response stops before any processing with a connection warning | The bound tool is not verified. Follow the setup guidance in the response, or see `../install-guide.md` for the full Docker and direct-install paths |
| A response shows a wall of processing log or metadata | That violates the export protocol. Treat the response as non-compliant and ask for the path and summary form instead |
| A request routed to the wrong mode | Add the exact command token (`$image`, `$video`, `$audio`, `$hls`, `$repair`) instead of relying on keyword scoring |
| The system keeps asking one comprehensive question | No command and no keyword scored above zero. Answer the question in one reply, or add a command token to skip straight to that mode |
| An HLS conversion request got declined | Confirm Terminal FFmpeg is installed (`ffmpeg -version`). The Video-Audio MCP server handles single-format conversion as a fallback when FFmpeg is unavailable |
| A generation or upload request got refused | Working as intended. Rephrase as an edit of a file that already exists, or use a different tool for generation or platform upload |

---

## 12. RELATED DOCUMENTS

| Document | Purpose |
|---|---|
| [`SKILL.md`](./SKILL.md) | Executable identity, smart router, MEDIA methodology, rules and integration points |
| [`../AGENTS.md`](../AGENTS.md) | CLI bootstrap, context override and the manual-load DAG |
| [`../SYNC.md`](../SYNC.md) | Manual sync contract between this skill and the Claude Project mirror |
| [`../install-guide.md`](../install-guide.md) | Docker and direct-install setup for Imagician, Video-Audio and FFmpeg |
| [`references/media-framework.md`](./references/media-framework.md) | MEDIA methodology, RICCE validation and quality gates |
| [`references/interactive-intelligence.md`](./references/interactive-intelligence.md) | Conversation flow, state machine and response templates |
| [`references/mcp-imagician.md`](./references/mcp-imagician.md) | Imagician MCP capabilities and operation parameters |
| [`references/mcp-video-audio.md`](./references/mcp-video-audio.md) | Video-Audio MCP capabilities and operation parameters |
| [`references/human-voice-rules.md`](./references/human-voice-rules.md) | Shared voice and style rules every response follows |
| [`assets/hls-video-conversion.md`](./assets/hls-video-conversion.md) | Terminal FFmpeg HLS recipes, quality tables and the batch script |
| [`../claude%20project/README.md`](../claude%20project/README.md) | Upload and checksum manifest for the Claude Project packaging |
