<!-- ANCHOR:imagician-mcp-docker-volume-reference-guide -->
# Imagician MCP Docker Volume Reference Guide

<!-- /ANCHOR:imagician-mcp-docker-volume-reference-guide -->
<!-- ANCHOR:quick-path-reference -->
## Quick Path Reference

When using Imagician MCP through Claude Desktop with Docker, use these paths:

<!-- /ANCHOR:quick-path-reference -->
<!-- ANCHOR:primary-image-directories-only-accessible-paths -->
### Primary Image Directories (ONLY accessible paths)
- **Original Images (Input)**: `/images/Original/`
- **New Images (AI Output)**: `/images/New/`

<!-- /ANCHOR:primary-image-directories-only-accessible-paths -->
<!-- ANCHOR:how-to-use -->
### How to Use

Place your images in the designated folders on your machine:
- **Input files**: `[YOUR_PATH]/Media Editor/export/images/Original/`
- **Output location**: `[YOUR_PATH]/Media Editor/export/images/New/`

Reference them in Claude as:
- **Input**: `/images/Original/filename.jpg`
- **Output**: `/images/New/filename.jpg`

<!-- /ANCHOR:how-to-use -->
<!-- ANCHOR:usage-examples-in-claude -->
## Usage Examples in Claude

<!-- /ANCHOR:usage-examples-in-claude -->
<!-- ANCHOR:example-1-process-an-image -->
### Example 1: Process an Image
```
You: "First, copy your image to the Original folder"
You: "Optimize sunset.jpg from the Original folder"
Claude: "I'll optimize the image at /images/Original/sunset.jpg"
```

<!-- /ANCHOR:example-1-process-an-image -->
<!-- ANCHOR:example-2-batch-process-images -->
### Example 2: Batch Process Images
```
You: "Convert all PNGs in the Original folder to WebP"
Claude: "I'll process images in /images/Original/"
```

<!-- /ANCHOR:example-2-batch-process-images -->
<!-- ANCHOR:example-3-check-output -->
### Example 3: Check Output
```
You: "Where is my processed image?"
Claude: "Your processed image is saved to /images/New/"
```

<!-- /ANCHOR:example-3-check-output -->
<!-- ANCHOR:file-management -->
## File Management

<!-- /ANCHOR:file-management -->
<!-- ANCHOR:copy-files-to-the-original-folder -->
### Copy files to the Original folder:
```bash
# Copy a file from Desktop
cp ~/Desktop/photo.jpg "[YOUR_PATH]/Media Editor/export/images/Original/"

# Copy multiple files
cp ~/Desktop/*.jpg "[YOUR_PATH]/Media Editor/export/images/Original/"
```

<!-- /ANCHOR:copy-files-to-the-original-folder -->
<!-- ANCHOR:check-processed-files -->
### Check processed files:
```bash
# List files in New folder
ls -la "[YOUR_PATH]/Media Editor/export/images/New/"
```

<!-- /ANCHOR:check-processed-files -->
<!-- ANCHOR:container-management -->
## Container Management

<!-- /ANCHOR:container-management -->
<!-- ANCHOR:start-the-container -->
### Start the container:
```bash
cd "[YOUR_PATH]/Media Editor/mcp servers/imagician"
docker-compose up -d
```

<!-- /ANCHOR:start-the-container -->
<!-- ANCHOR:check-container-status -->
### Check container status:
```bash
docker ps | grep imagician
```

<!-- /ANCHOR:check-container-status -->
<!-- ANCHOR:view-logs -->
### View logs:
```bash
docker logs imagician
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
- Check file exists: `docker exec imagician ls -la /images/Original/`

<!-- /ANCHOR:file-not-found -->
<!-- ANCHOR:permission-issues -->
### Permission Issues
- The container has read/write access to all mapped directories
- If issues persist, check Docker Desktop file sharing settings

<!-- /ANCHOR:permission-issues -->
<!-- ANCHOR:container-not-running -->
### Container Not Running
```bash
# Check status
docker ps -a | grep imagician

# Start if stopped
docker-compose up -d
```

<!-- /ANCHOR:container-not-running -->
<!-- ANCHOR:important-notes -->
## Important Notes

1. **Limited Access**: Only `/images/` directory is accessible
2. **Original folder** (`/images/Original/`) for input files
3. **New folder** (`/images/New/`) for AI-generated output
4. **Copy files first**: Always copy files to Original folder before processing
5. **No direct access**: Cannot access Desktop, Downloads, or other directories directly

<!-- /ANCHOR:important-notes -->
<!-- ANCHOR:quick-tips -->
## Quick Tips

- Copy your files to the Original folder before processing
- Check the New folder for processed outputs
- Claude Desktop must be restarted after config changes
- Container auto-restarts unless explicitly stopped

<!-- /ANCHOR:quick-tips -->
