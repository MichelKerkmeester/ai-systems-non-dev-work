<!-- ANCHOR:video-audio-mcp-docker-volume-reference-guide -->
# Video-Audio MCP Docker Volume Reference Guide

<!-- /ANCHOR:video-audio-mcp-docker-volume-reference-guide -->
<!-- ANCHOR:quick-path-reference -->
## Quick Path Reference

When using Video-Audio MCP through Claude Desktop with Docker, use these paths:

<!-- /ANCHOR:quick-path-reference -->
<!-- ANCHOR:primary-media-directories-only-accessible-paths -->
### Primary Media Directories (ONLY accessible paths)
- **Original Media (Input)**: `/videos/Original/`
- **Processed Media (Output)**: `/videos/New/`

<!-- /ANCHOR:primary-media-directories-only-accessible-paths -->
<!-- ANCHOR:how-to-use -->
### How to Use

Place your media files in the designated folders on your machine:
- **Input files**: `[YOUR_PATH]/Media Editor/export/videos/Original/`
- **Output location**: `[YOUR_PATH]/Media Editor/export/videos/New/`

Reference them in Claude as:
- **Input**: `/videos/Original/filename.mp4`
- **Output**: `/videos/New/filename.mp4`

<!-- /ANCHOR:how-to-use -->
<!-- ANCHOR:usage-examples-in-claude -->
## Usage Examples in Claude

<!-- /ANCHOR:usage-examples-in-claude -->
<!-- ANCHOR:example-1-compress-a-video -->
### Example 1: Compress a Video
```
You: "First, copy your video to the Original folder"
You: "Compress video.mp4 from the Original folder"
Claude: "I'll compress the video at /videos/Original/video.mp4"
```

<!-- /ANCHOR:example-1-compress-a-video -->
<!-- ANCHOR:example-2-extract-audio -->
### Example 2: Extract Audio
```
You: "Extract audio from the video in Original folder"
Claude: "I'll extract audio from /videos/Original/video.mp4"
Claude: "Audio saved to /videos/New/video_audio.mp3"
```

<!-- /ANCHOR:example-2-extract-audio -->
<!-- ANCHOR:example-3-convert-format -->
### Example 3: Convert Format
```
You: "Convert all MOV files in Original to MP4"
Claude: "I'll convert MOV files in /videos/Original/"
Claude: "Converted files saved to /videos/New/"
```

<!-- /ANCHOR:example-3-convert-format -->
<!-- ANCHOR:file-management -->
## File Management

<!-- /ANCHOR:file-management -->
<!-- ANCHOR:copy-files-to-the-original-folder -->
### Copy files to the Original folder:
```bash
# Copy a single video
cp ~/Desktop/video.mp4 "[YOUR_PATH]/Media Editor/export/videos/Original/"

# Copy multiple videos
cp ~/Desktop/*.mp4 "[YOUR_PATH]/Media Editor/export/videos/Original/"

# Copy audio files
cp ~/Music/*.mp3 "[YOUR_PATH]/Media Editor/export/videos/Original/"
```

<!-- /ANCHOR:copy-files-to-the-original-folder -->
<!-- ANCHOR:check-processed-files -->
### Check processed files:
```bash
# List files in New folder
ls -la "[YOUR_PATH]/Media Editor/export/videos/New/"

# Check file size
du -h "[YOUR_PATH]/Media Editor/export/videos/New/"*.mp4
```

<!-- /ANCHOR:check-processed-files -->
<!-- ANCHOR:container-management -->
## Container Management

<!-- /ANCHOR:container-management -->
<!-- ANCHOR:start-the-container -->
### Start the container:
```bash
cd "[YOUR_PATH]/Media Editor/mcp servers/video-audio"
docker-compose up -d
```

<!-- /ANCHOR:start-the-container -->
<!-- ANCHOR:check-container-status -->
### Check container status:
```bash
docker ps | grep video-audio
```

<!-- /ANCHOR:check-container-status -->
<!-- ANCHOR:view-logs -->
### View logs:
```bash
docker logs video-audio
```

<!-- /ANCHOR:view-logs -->
<!-- ANCHOR:restart-container -->
### Restart container:
```bash
docker-compose restart
```

<!-- /ANCHOR:restart-container -->
<!-- ANCHOR:stop-container -->
### Stop container:
```bash
docker-compose down
```

<!-- /ANCHOR:stop-container -->
<!-- ANCHOR:troubleshooting -->
## Troubleshooting

<!-- /ANCHOR:troubleshooting -->
<!-- ANCHOR:file-not-found -->
### File Not Found
- Ensure the file is in the Original folder first
- Check file exists: `docker exec video-audio ls -la /videos/Original/`

<!-- /ANCHOR:file-not-found -->
<!-- ANCHOR:permission-issues -->
### Permission Issues
- The container has read/write access to the mapped directory
- Check Docker Desktop file sharing settings if issues persist

<!-- /ANCHOR:permission-issues -->
<!-- ANCHOR:container-not-running -->
### Container Not Running
```bash
# Check status
docker ps -a | grep video-audio

# Start if stopped
docker-compose up -d
```

<!-- /ANCHOR:container-not-running -->
<!-- ANCHOR:ffmpeg-errors -->
### FFmpeg Errors
- The container includes FFmpeg for media processing
- Check logs for specific error messages: `docker logs video-audio`

<!-- /ANCHOR:ffmpeg-errors -->
<!-- ANCHOR:important-notes -->
## Important Notes

1. **Limited Access**: Only `/videos/` directory is accessible
2. **Original folder** (`/videos/Original/`) for input media files
3. **New folder** (`/videos/New/`) for processed output
4. **Copy files first**: Always copy files to Original folder before processing
5. **No direct access**: Cannot access Desktop, Downloads, or other directories directly
6. **Supports**: Video files (MP4, MOV, AVI, etc.) and audio files (MP3, WAV, etc.)

<!-- /ANCHOR:important-notes -->
<!-- ANCHOR:quick-tips -->
## Quick Tips

- Copy your media files to the Original folder before processing
- Check the New folder for processed outputs
- Claude Desktop must be restarted after config changes
- Container auto-restarts unless explicitly stopped
- FFmpeg is pre-installed in the container for all media operations

<!-- /ANCHOR:quick-tips -->
<!-- ANCHOR:supported-operations -->
## Supported Operations

The Video-Audio MCP supports:
- Video compression and optimization
- Audio extraction from video
- Format conversion (MP4, MOV, AVI, WebM, etc.)
- Video trimming and cutting
- Audio processing and enhancement
- Batch processing of multiple files
- Platform-specific optimization (YouTube, Instagram, TikTok, etc.)

<!-- /ANCHOR:supported-operations -->
