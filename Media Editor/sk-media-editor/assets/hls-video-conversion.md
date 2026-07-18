---
title: "Media Editor - Reference - HLS Video Conversion - v0.111"
description: "Terminal FFmpeg command recipes for HLS multi-quality video conversion with adaptive streaming, codec settings and a batch script."
version: "0.111"
contextType: asset
importance_tier: high
trigger_phrases:
  - "hls conversion"
  - "adaptive streaming ffmpeg"
  - "multi-quality stream"
  - "m3u8 playlist segments"
  - "hls command recipe"
---

# Media Editor - Reference - HLS Video Conversion - v0.111

Copy and apply Terminal FFmpeg command recipes for HLS (HTTP Live Streaming) video conversion.

**Loading Condition:** ON-DEMAND
**Purpose:** Provides Terminal FFmpeg command patterns for HLS multi-quality video conversion with adaptive streaming
**Scope:** HLS fundamentals, FFmpeg command specifications, quality optimization, codec configuration and batch processing

---

## 1. OVERVIEW

```yaml
system:
  name: "Terminal FFmpeg HLS Converter"
  package: "FFmpeg (command-line)"
  repository: "https://ffmpeg.org"
  protocol: "HTTP Live Streaming (HLS)"
  installation:
    macos: "brew install ffmpeg"
    ubuntu: "sudo apt install ffmpeg"
    windows: "Download from ffmpeg.org"
```

### Connection Verification

Verify FFmpeg before all operations with `ffmpeg -version`.
- Available: "FFmpeg available, terminal HLS conversion ready."
- Unavailable: "FFmpeg not found, installation required."

Required: FFmpeg installed, terminal access, write permissions for the output directory.

---

## 2. CORE CAPABILITIES

- Multi-quality conversion: generate 1080p, 720p, 480p and 360p streams simultaneously with a master playlist.
- Single-quality conversion: generate a single HLS stream at any resolution and bitrate.
- Adaptive streaming: browser-driven, bandwidth-aware quality switching.
- Batch processing: convert multiple videos via a shell script.

Web optimizations: `-movflags +faststart` for immediate playback, `-an` to remove audio (20-30% size savings), 2-second segments for fast initial playback.

### Processing Order

1. Verify FFmpeg installation.
2. Analyze the input video properties.
3. Determine quality levels based on use case.
4. Execute the conversion command.
5. Verify the output structure.

---

## 3. FORMAT SUPPORT

HLS (HTTP Live Streaming, RFC 8216) components:
- Master playlist (`master.m3u8`): index of quality variants.
- Variant playlists (`stream_1080p.m3u8` and others): segment lists per quality.
- Media segments (`segment_000.ts` and others): MPEG transport stream, 2 to 10 seconds each.

Browser support: Safari native on iOS and macOS, Chrome, Firefox and Edge via HLS.js, excellent mobile support.

### Output Structure (Multi-Quality)

```text
output/
  master.m3u8
  1080p/ playlist.m3u8 + segment_*.ts
  720p/  playlist.m3u8 + segment_*.ts
  480p/  playlist.m3u8 + segment_*.ts
  360p/  playlist.m3u8 + segment_*.ts
```

---

## 4. OPERATION SPECIFICATIONS

### Complete Multi-Quality Command

```bash
ffmpeg -i INPUT_VIDEO.mp4 \
  -filter_complex "[0:v]split=4[v1][v2][v3][v4]; \
  [v1]scale=w=1920:h=1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2[v1out]; \
  [v2]scale=w=1280:h=720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2[v2out]; \
  [v3]scale=w=854:h=480:force_original_aspect_ratio=decrease,pad=854:480:(ow-iw)/2:(oh-ih)/2[v3out]; \
  [v4]scale=w=640:h=360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2[v4out]" \
  -map "[v1out]" -c:v:0 libx264 -preset fast -tune fastdecode -profile:v main -level 4.0 \
    -crf 23 -maxrate:v:0 2500k -bufsize:v:0 5000k -g 48 -keyint_min 48 -sc_threshold 0 \
  -map "[v2out]" -c:v:1 libx264 -preset fast -tune fastdecode -profile:v main -level 4.0 \
    -crf 23 -maxrate:v:1 1500k -bufsize:v:1 3000k -g 48 -keyint_min 48 -sc_threshold 0 \
  -map "[v3out]" -c:v:2 libx264 -preset fast -tune fastdecode -profile:v baseline -level 3.1 \
    -crf 23 -maxrate:v:2 800k -bufsize:v:2 1600k -g 48 -keyint_min 48 -sc_threshold 0 \
  -map "[v4out]" -c:v:3 libx264 -preset fast -tune fastdecode -profile:v baseline -level 3.1 \
    -crf 23 -maxrate:v:3 500k -bufsize:v:3 1000k -g 48 -keyint_min 48 -sc_threshold 0 \
  -an \
  -f hls \
  -hls_time 2 \
  -hls_playlist_type vod \
  -hls_flags independent_segments \
  -hls_segment_type mpegts \
  -hls_segment_filename "OUTPUT_DIR/%v/segment_%03d.ts" \
  -master_pl_name "master.m3u8" \
  -var_stream_map "v:0,name:1080p v:1,name:720p v:2,name:480p v:3,name:360p" \
  OUTPUT_DIR/%v/playlist.m3u8
```

Key parameters: `split=4` duplicates the video stream four times, `scale` with `force_original_aspect_ratio=decrease` downscales only, `pad` centers content, `-crf 23` is visually transparent quality, `-maxrate` caps streaming bandwidth, `-bufsize` is twice the maxrate, `-g 48` aligns the GOP with 2-second segments at 24fps, `-an` removes audio.

### Single Quality Command

```bash
ffmpeg -i INPUT_VIDEO.mp4 \
  -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" \
  -c:v libx264 -preset fast -tune fastdecode -profile:v main -level 4.0 \
  -crf 23 -maxrate 2500k -bufsize 5000k \
  -g 48 -keyint_min 48 -sc_threshold 0 \
  -an \
  -f hls -hls_time 2 -hls_playlist_type vod \
  -hls_flags independent_segments \
  -hls_segment_filename "OUTPUT_DIR/segment_%03d.ts" \
  OUTPUT_DIR/playlist.m3u8
```

### Test Command (First 10 Seconds)

```bash
ffmpeg -i INPUT_VIDEO.mp4 -t 10 \
  -vf "scale=1920:1080" \
  -c:v libx264 -preset fast -crf 23 -maxrate 2500k \
  -an test_output.mp4
```

---

## 5. QUALITY OPTIMIZATION

| Quality | Resolution | Maxrate | Bufsize | Profile  | Level | Use Case                  |
| ------- | ---------- | ------- | ------- | -------- | ----- | ------------------------- |
| 1080p   | 1920x1080  | 2500k   | 5000k   | main     | 4.0   | Desktop displays          |
| 720p    | 1280x720   | 1500k   | 3000k   | main     | 4.0   | Desktop standard, tablets |
| 480p    | 854x480    | 800k    | 1600k   | baseline | 3.1   | Mobile, slower connections|
| 360p    | 640x360    | 500k    | 1000k   | baseline | 3.1   | Very slow connections     |

CRF scale (0-51, lower is better): 18 visually lossless, 23 high quality (recommended), 28 medium. Use 20-22 for premium quality, 24-26 for bandwidth-limited.

Adaptive selection by bandwidth: above 3 Mbps prefers 1080p, 1.5-3 Mbps picks 720p, 700kb-1.5 Mbps picks 480p, below 700kb picks 360p. Switching is seamless: drops to lower quality when the buffer runs low and upgrades after bandwidth is stable.

---

## 6. CODEC SPECIFICATIONS

- H.264 profiles: baseline for 480p and 360p (maximum compatibility), main for 1080p and 720p (better efficiency, B-frames).
- H.264 levels: 3.1 up to 720p at 30fps, 4.0 up to 1080p at 30fps, 4.1 for high-framerate 1080p.
- GOP: framerate times segment duration. At 24fps with 2-second segments, GOP is 48. Aligns with segment boundaries for clean quality switching.
- Buffer size: twice the maxrate, allowing bitrate variations.
- Segment duration: 2 seconds recommended for fast playback and quick quality switching. 4 seconds reduces files but slows switching. 6 to 10 seconds is not recommended.

---

## 7. BATCH PROCESSING

A Bash script converts multiple videos to HLS with four quality levels. Save as `convert_hls.sh` and `chmod +x convert_hls.sh`.

```bash
#!/bin/bash
OUTPUT_BASE="hls_output"
QUALITIES=("1080p" "720p" "480p" "360p")
VIDEOS=("your-video-1.mp4" "your-video-2.mov")

check_ffmpeg() {
  if ! command -v ffmpeg &> /dev/null; then
    echo "FFmpeg not found. Install:"
    echo "  macOS: brew install ffmpeg"
    echo "  Ubuntu: sudo apt install ffmpeg"
    echo "  Windows: Download from ffmpeg.org"
    exit 1
  fi
  echo "FFmpeg found: $(ffmpeg -version | head -n 1)"
}

convert_to_hls() {
  local input=$1
  local basename=$(basename "$input" | sed 's/\.[^.]*$//')
  local output_dir="$OUTPUT_BASE/$basename"
  mkdir -p "$output_dir"

  ffmpeg -i "$input" -hide_banner -loglevel warning -stats \
    -filter_complex "[0:v]split=4[v1][v2][v3][v4]; \
    [v1]scale=w=1920:h=1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2[v1out]; \
    [v2]scale=w=1280:h=720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2[v2out]; \
    [v3]scale=w=854:h=480:force_original_aspect_ratio=decrease,pad=854:480:(ow-iw)/2:(oh-ih)/2[v3out]; \
    [v4]scale=w=640:h=360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2[v4out]" \
    -map "[v1out]" -c:v:0 libx264 -preset fast -tune fastdecode -profile:v main -level 4.0 \
      -crf 23 -maxrate:v:0 2500k -bufsize:v:0 5000k -g 48 -keyint_min 48 -sc_threshold 0 \
    -map "[v2out]" -c:v:1 libx264 -preset fast -tune fastdecode -profile:v main -level 4.0 \
      -crf 23 -maxrate:v:1 1500k -bufsize:v:1 3000k -g 48 -keyint_min 48 -sc_threshold 0 \
    -map "[v3out]" -c:v:2 libx264 -preset fast -tune fastdecode -profile:v baseline -level 3.1 \
      -crf 23 -maxrate:v:2 800k -bufsize:v:2 1600k -g 48 -keyint_min 48 -sc_threshold 0 \
    -map "[v4out]" -c:v:3 libx264 -preset fast -tune fastdecode -profile:v baseline -level 3.1 \
      -crf 23 -maxrate:v:3 500k -bufsize:v:3 1000k -g 48 -keyint_min 48 -sc_threshold 0 \
    -an -f hls -hls_time 2 -hls_playlist_type vod -hls_flags independent_segments \
    -hls_segment_type mpegts -hls_segment_filename "$output_dir/%v/segment_%03d.ts" \
    -master_pl_name "master.m3u8" \
    -var_stream_map "v:0,name:1080p v:1,name:720p v:2,name:480p v:3,name:360p" \
    "$output_dir/%v/playlist.m3u8"

  if [ $? -eq 0 ]; then echo "Success: $basename"; else echo "Failed: $basename"; fi
}

check_ffmpeg
mkdir -p "$OUTPUT_BASE"
for video in "${VIDEOS[@]}"; do
  [ -f "$video" ] && convert_to_hls "$video" || echo "File not found: $video"
done
```

Test playback: `ffplay hls_output/VIDEO_NAME/master.m3u8` or serve with `python3 -m http.server 8000`.

---

## 8. QUICK REFERENCE

### Troubleshooting

- FFmpeg not found: install per platform, then `ffmpeg -version`.
- Codec not supported: install FFmpeg with libx264, verify with `ffmpeg -codecs | grep 264`.
- Permission denied: `chmod +x script.sh`, `mkdir -p output_directory`.
- Large file size: raise CRF to 26, reduce maxrate to 2000k, or drop the 1080p variant.
- Poor quality: lower CRF to 20, raise maxrate to 3000k, or use `-preset medium`.
- Browser playback: verify HLS.js loads, check the console, test with `ffplay master.m3u8`, set CORS headers when cross-domain.

### GPU Acceleration

Replace `-c:v libx264` with `h264_nvenc` (NVIDIA, 3-5x faster), `h264_qsv` (Intel, 2-4x faster) or `h264_videotoolbox` (macOS, 2-3x faster). Use libx264 software encoding for best quality and compatibility. GPU encoding suits large batches where speed matters.

### Limitations

- Can do: HLS conversion at all quality levels, batch processing, custom encoding parameters, any FFmpeg-supported input conversion.
- Cannot do (from this HLS recipe): real-time preview, GUI, live streaming. Interactive editing is handled by the Video-Audio MCP server, or by Terminal FFmpeg directly when that server is down.
- Input: any FFmpeg-supported video format. Output of this recipe: HLS (.m3u8 playlists plus .ts segments).

When to use MCP versus terminal: prefer the Video-Audio MCP server for single-format conversions and interactive editing, and use Terminal FFmpeg for HLS multi-quality streaming and batch processing. Terminal FFmpeg is also the fallback for single-format conversions and editing when the MCP server is unavailable, as defined in the SKILL.md Tool Verification Gate. HLS itself has no MCP path and always runs on Terminal FFmpeg.

---

*This asset focuses on Terminal FFmpeg commands for HLS conversion. For MCP operations, see the Video-Audio integration reference. For thinking methodology, see the MEDIA Framework.*
