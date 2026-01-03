# Imagician

> Docker-based MCP server for image manipulation using Sharp and ImageMagick.

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

### What is Imagician?

Imagician is a Model Context Protocol (MCP) server that provides comprehensive image processing capabilities. It enables AI assistants to resize, convert, crop, compress, rotate, and transform images through a standardized interface. This Docker deployment packages Sharp and ImageMagick for reliable, isolated image processing.

### Key Statistics

| Category | Count | Details |
|----------|-------|---------|
| Tools | 8 | Resize, convert, crop, compress, rotate, flip, batch, metadata |
| Output Formats | 4 | JPEG, PNG, WebP, AVIF |
| Input Formats | 7+ | JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF |
| Deployment | Docker | Containerized with volume mounts |

### Key Features

| Feature | Description |
|---------|-------------|
| **Image Resizing** | Scale images with multiple fit options (cover, contain, fill) |
| **Format Conversion** | Convert between modern formats with quality control |
| **Batch Processing** | Generate multiple sizes from a single source image |
| **Compression** | Optimize file sizes with progressive encoding support |
| **Transformations** | Rotate by any angle, flip horizontal/vertical |
| **Metadata Extraction** | Get dimensions, format, color space, and file info |

### Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Docker | 20.10+ | 24.0+ |
| Docker Compose | 2.0+ | 2.20+ |
| Disk Space | 500MB | 1GB+ |

---

## 2. 🚀 QUICK START

### Prerequisites

- Docker Desktop running
- Images directory accessible at configured volume path

### 30-Second Setup

```bash
# 1. Navigate to the server directory
cd "/Users/michelkerkmeester/MEGA/AI Systems/Media Editor/mcp servers/imagician"

# 2. Build and start the container
docker-compose up -d --build

# 3. Verify container is running
docker ps --filter "name=imagician"
```

### Verify Installation

```bash
# Check container status
docker ps --filter "name=imagician" --format "table {{.Names}}\t{{.Status}}"

# Expected output:
# NAMES       STATUS
# imagician   Up X minutes
```

### First Use

```bash
# Test the MCP server responds
docker exec -i imagician node /app/dist/index.js <<< '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# Expected: JSON response listing available tools
```

---

## 3. 📁 STRUCTURE

```
imagician/
├── dist/                    # Compiled server code
│   └── index.js            # MCP server entry point
├── docker-compose.yml      # Container orchestration
├── Dockerfile              # Container build definition
├── package.json            # Node.js dependencies
├── README.md               # This file
└── VOLUME_REFERENCE.md     # Volume mounting guide
```

### Key Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Defines container, volumes, and environment |
| `Dockerfile` | Builds Node.js image with Sharp and ImageMagick |
| `dist/index.js` | Compiled MCP server code |
| `VOLUME_REFERENCE.md` | Detailed volume configuration guide |

---

## 4. ⚡ FEATURES

### Image Transformation

**resize_image**: Scale images to specific dimensions with fit options.

| Aspect | Details |
|--------|---------|
| **Purpose** | Change image dimensions while preserving quality |
| **Fit Options** | `cover`, `contain`, `fill`, `inside`, `outside` |
| **Preserve Ratio** | Optional aspect ratio preservation |

**crop_image**: Extract specific regions from images.

| Aspect | Details |
|--------|---------|
| **Purpose** | Cut out a portion of an image |
| **Parameters** | `left`, `top`, `width`, `height` (in pixels) |

**rotate_image**: Rotate images by any angle.

| Aspect | Details |
|--------|---------|
| **Purpose** | Rotate images clockwise by degrees |
| **Background** | Configurable fill color for exposed areas |

**flip_image**: Mirror images along axes.

| Aspect | Details |
|--------|---------|
| **Purpose** | Flip images horizontally or vertically |
| **Directions** | `horizontal`, `vertical`, `both` |

### Format & Quality

**convert_format**: Convert between image formats.

| Aspect | Details |
|--------|---------|
| **Purpose** | Change image format with quality control |
| **Formats** | JPEG, PNG, WebP, AVIF |
| **Quality** | 1-100 for lossy formats |

**compress_image**: Reduce file size with quality settings.

| Aspect | Details |
|--------|---------|
| **Purpose** | Optimize images for web or storage |
| **Progressive** | Optional progressive encoding for JPEG |
| **Quality** | Adjustable compression level |

### Batch Operations

**batch_resize**: Generate multiple sizes from one image.

| Aspect | Details |
|--------|---------|
| **Purpose** | Create responsive image sets (thumbnails, previews) |
| **Input** | Array of `{width, height?, suffix}` specifications |
| **Output** | Multiple files with size suffixes |

### Information

**get_image_info**: Extract metadata and properties.

| Aspect | Details |
|--------|---------|
| **Purpose** | Retrieve image dimensions, format, color space |
| **Returns** | Format, width, height, channels, file size |

---

## 5. ⚙️ CONFIGURATION

### Configuration File

**Location**: `docker-compose.yml`

```yaml
version: "3.8"

services:
  imagician:
    build: .
    image: imagician:latest
    container_name: imagician
    volumes:
      - /Users/michelkerkmeester/MEGA/AI Systems/Media Editor/export/images:/images:rw
    environment:
      - IMAGE_PATH=/images
      - NODE_ENV=production
    network_mode: host
    stdin_open: true
    tty: true
    restart: unless-stopped
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `IMAGE_PATH` | string | `/images` | Base path for image operations inside container |
| `NODE_ENV` | string | `production` | Node.js environment mode |

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `IMAGE_PATH` | Yes | Container path where images are accessible |
| `NODE_ENV` | No | Set to `production` for optimized performance |

### Volume Mounts

| Host Path | Container Path | Purpose |
|-----------|----------------|---------|
| `.../Media Editor/export/images` | `/images` | Read/write access to image files |

---

## 6. 💡 USAGE EXAMPLES

### Example 1: Resize an Image

```
"Resize photo.jpg to 800x600 pixels maintaining aspect ratio"
```

**Result**: Creates resized image at specified dimensions.

### Example 2: Convert to WebP

```
"Convert all PNG images in /images to WebP format with 85% quality"
```

**Result**: Creates WebP versions with optimized file sizes.

### Example 3: Create Thumbnails

```
"Generate thumbnails from header.jpg: small (150px), medium (300px), large (600px)"
```

**Result**: Creates `header-small.jpg`, `header-medium.jpg`, `header-large.jpg`.

### Example 4: Compress for Web

```
"Compress product-image.jpg to under 100KB while maintaining acceptable quality"
```

**Result**: Optimized image with reduced file size.

### Common Patterns

| Pattern | Prompt | When to Use |
|---------|--------|-------------|
| Batch resize | "Create responsive sizes from hero.jpg" | Responsive web images |
| Format convert | "Convert to WebP for web optimization" | Modern browser support |
| Quick compress | "Compress for email attachment" | Reducing file size |
| Get dimensions | "What are the dimensions of logo.png?" | Image inspection |

---

## 7. 🛠️ TROUBLESHOOTING

### Common Issues

#### Container Not Running

**Symptom**: `docker exec` returns "No such container"

**Cause**: Container stopped or not started

**Solution**:
```bash
# Check container status
docker ps -a --filter "name=imagician"

# Restart container
docker-compose up -d
```

#### Permission Denied on Images

**Symptom**: "EACCES: permission denied" errors

**Cause**: Volume mount permissions mismatch

**Solution**:
```bash
# Check host directory permissions
ls -la "/Users/michelkerkmeester/MEGA/AI Systems/Media Editor/export/images"

# Ensure directory exists and is writable
mkdir -p "/Users/michelkerkmeester/MEGA/AI Systems/Media Editor/export/images"
chmod 755 "/Users/michelkerkmeester/MEGA/AI Systems/Media Editor/export/images"
```

#### Unsupported Format Error

**Symptom**: "Input file is missing or of an unsupported image format"

**Cause**: File format not recognized or file corrupted

**Solution**:
- Verify file extension matches actual format
- Check file integrity
- Convert using external tool first if needed

### Quick Fixes

| Problem | Quick Fix |
|---------|-----------|
| Container stopped | `docker-compose up -d` |
| Stale container | `docker-compose down && docker-compose up -d` |
| Build issues | `docker-compose build --no-cache` |
| Volume not mounted | Verify path in `docker-compose.yml` |

### Diagnostic Commands

```bash
# Check container status
docker ps --filter "name=imagician"

# View container logs
docker logs imagician --tail 50

# Inspect volume mounts
docker inspect imagician --format '{{json .Mounts}}' | jq

# Test MCP server response
docker exec -i imagician node /app/dist/index.js <<< '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

---

## 8. ❓ FAQ

### General Questions

**Q: What image formats are supported?**

A: Input supports JPEG, PNG, WebP, AVIF, GIF, BMP, and TIFF. Output supports JPEG, PNG, WebP, and AVIF with quality control.

---

**Q: Where should I place images for processing?**

A: Place images in the mounted volume directory: `/Users/michelkerkmeester/MEGA/AI Systems/Media Editor/export/images`. They will be accessible at `/images` inside the container.

---

**Q: Can I process images outside the mounted volume?**

A: No, the container can only access files within mounted volumes. Move or copy images to the export directory first.

---

### Technical Questions

**Q: How do I change the quality setting for compression?**

A: Specify quality (1-100) when requesting compression. Higher values mean better quality but larger files.

```
"Compress image.jpg with 75% quality"
```

---

**Q: What's the maximum image size supported?**

A: Limited by container memory. Default Docker settings support images up to ~100MP. For larger images, increase container memory limits in `docker-compose.yml`.

---

**Q: How do I add watermarks to images?**

A: Use image overlay functionality through the add_image_overlay tool, positioning the watermark as needed.

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
| [Imagician GitHub](https://github.com/flowy11/imagician) | Original source repository |
| [Sharp Documentation](https://sharp.pixelplumbing.com/) | Image processing library docs |
| [ImageMagick Docs](https://imagemagick.org/script/command-line-processing.php) | Advanced image operations |
| [MCP Protocol](https://modelcontextprotocol.io/) | Model Context Protocol specification |

---

*Documentation version: 1.0 | Last updated: 2026-01-03*
