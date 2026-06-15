---
title: "Media Editor - Integrations - MCP Imagician - v0.211"
description: "Imagician MCP server capabilities, format support, operation parameters and quality guidance for image processing operations."
version: "0.211"
contextType: reference
importance_tier: high
trigger_phrases:
  - "imagician mcp"
  - "image resize convert compress"
  - "webp avif jpeg png"
  - "image operation parameters"
  - "sharp image processing"
---

# Media Editor - Integrations - MCP Imagician - v0.211

Technical reference for Imagician MCP server capabilities and integration for image processing operations.

## 1. OVERVIEW

### Purpose

Defines the Imagician MCP server capabilities, technical specifications, and operation parameters for image processing. It is the technical reference for resize, convert, crop, compress, and transform operations powered by Sharp.

### When to Use

- Loaded ON-DEMAND for any image processing operation
- Looking up Imagician capabilities, format support, and operation parameters
- Applying quality optimization, resize and crop strategies, and transforms

---

## 2. SERVER OVERVIEW

The Imagician MCP server (`@flowy11/imagician`) provides high-performance image processing powered by Sharp, a Node.js image library. It enables format conversion, resizing, cropping, compression and transformations through native MCP integration.

**Key information:**
- Package: `@flowy11/imagician`
- Repository: https://github.com/flowy11/imagician
- Engine: Sharp (Node.js image processing)
- Protocol: Model Context Protocol (MCP)

**Installation:**
```bash
npx -y @flowy11/imagician          # Quick start, no install
npm install -g @flowy11/imagician  # Global install
```

### Connection Verification

Connection verification must be the first action before all operations. Use the `list_images` tool to test connectivity and server availability.

- Connected: "Imagician connected, image processing available."
- Disconnected: "Imagician not connected, setup required."

---

## 3. CORE CAPABILITIES

- **Resize:** change dimensions with multiple fit modes. Parameters: width, height, fit mode, aspect ratio preservation.
- **Convert:** change format with quality control. Parameters: target format (JPEG, PNG, WebP, AVIF), quality level.
- **Crop:** extract a region. Parameters: x, y, width, height.
- **Compress:** optimize file size while keeping quality. Parameters: quality level, strip metadata, optimize flag.
- **Rotate:** rotate by angle. Parameters: angle in degrees, background color.
- **Flip:** flip horizontally or vertically. Parameter: direction.
- **Get metadata:** extract dimensions, format, color space and orientation via `getMetadata`.
- **Batch processing:** process multiple images with an array of operations.
- **List images:** list images in a folder via `list_images`.

### Processing Order

1. Verify connection.
2. Crop if needed (remove unwanted areas first).
3. Resize if needed.
4. Rotate or flip if needed.
5. Convert format.
6. Optimize quality (final compression).

---

## 4. FORMAT SUPPORT

- **JPEG (.jpg, .jpeg):** input and output, no transparency. Best for photos and complex images.
- **PNG (.png):** input and output, transparency. Best for graphics, screenshots and transparency.
- **WebP (.webp):** input and output, transparency. Best for modern web with better compression than JPEG or PNG.
- **AVIF (.avif):** input and output, transparency. Best for next-generation compression on modern browsers.

Not supported: GIF, TIFF, BMP, SVG.

---

## 5. OPERATION SPECIFICATIONS

### Resize

```yaml
resize:
  inputPath: string (required)
  outputPath: string (required)
  width: number (optional)
  height: number (optional)
  fit: string (optional, default "inside")  # cover, contain, fill, inside, outside
  preserveAspectRatio: boolean (default true)
```

Fit modes: cover crops to fill, contain fits with padding, fill stretches to exact size, inside scales down within bounds (most common), outside scales to fit outside bounds.

### Convert

```yaml
convert:
  inputPath: string (required)
  outputPath: string (required)
  format: string (required)  # jpeg, png, webp, avif
  quality: number (optional, default 85)  # 1-100
```

### Crop

```yaml
crop:
  inputPath: string (required)
  outputPath: string (required)
  x: number (required)
  y: number (required)
  width: number (required)
  height: number (required)
```

### Compress

```yaml
compress:
  inputPath: string (required)
  outputPath: string (required)
  quality: number (optional, default 80)  # 1-100
  strip: boolean (optional, default false)
  optimize: boolean (optional, default true)
```

---

## 6. QUALITY OPTIMIZATION

| Preset            | Quality Range | Use Case                          | File Size | Visual Quality |
| ----------------- | ------------- | --------------------------------- | --------- | -------------- |
| Archive           | 100           | Lossless preservation             | Largest   | Perfect        |
| High Quality      | 90-95         | Prints, professional work         | Large     | Excellent      |
| Standard Web      | 80-89         | Web display (default)             | Moderate  | Very good      |
| Good Compression  | 70-79         | Size priority, acceptable quality | Smaller   | Good           |
| Heavy Compression | 60-69         | Extreme size limits               | Small     | Acceptable     |

Format-specific quality:
- Photos: JPEG 80-85%, WebP 85%, AVIF 75-80%.
- Graphics: PNG 100% lossless, WebP 90-95% with transparency.
- Web: primary WebP at 85%, fallback JPEG at 80%, modern AVIF at 75%.

---

## 7. RESIZE AND CROP

Resize strategies: proportional resizing (maintains aspect ratio), fixed width, fixed height, exact dimensions (may distort) and max dimensions (always preserves aspect ratio).

Common scenarios:
```yaml
thumbnail:        { width: 150, height: 150, fit: cover }
web_optimization: { width: 1920, fit: inside, preserveAspectRatio: true }
mobile:           { width: 800, fit: inside, preserveAspectRatio: true }
instagram_feed:   { width: 1080, height: 1080, fit: cover }
instagram_story:  { width: 1080, height: 1920, fit: cover }
twitter_card:     { width: 1200, height: 628, fit: cover }
```

---

## 8. TRANSFORMS

```yaml
rotate:
  inputPath: string (required)
  outputPath: string (required)
  angle: number (required)  # common: 90, 180, 270, -90, -180, -270
  background: string (optional)

flip:
  inputPath: string (required)
  outputPath: string (required)
  direction: string (required)  # horizontal, vertical
```

Orientation auto-correction reads the EXIF orientation flag, applies the rotation and updates or removes the EXIF data.

---

## 9. QUICK REFERENCE

### MCP Tools Summary

```yaml
list_images:  { purpose: "Connection check, list files", params: [folder] }
resize:       { purpose: "Change dimensions", params: [width, height, fit] }
convert:      { purpose: "Change format", params: [format, quality] }
crop:         { purpose: "Extract region", params: [x, y, width, height] }
compress:     { purpose: "Reduce file size", params: [quality, strip, optimize] }
rotate:       { purpose: "Rotate image", params: [angle, background] }
flip:         { purpose: "Mirror image", params: [direction] }
getMetadata:  { purpose: "Get image info", params: [] }
batch:        { purpose: "Process multiple", params: [operations_array] }
```

### Limitations

- Supported formats: JPEG, PNG, WebP, AVIF. Not supported: GIF, TIFF, BMP, SVG.
- Can do: resize, convert, crop, compress, rotate, flip, metadata, batch.
- Cannot do: AI generation, complex filters, image composition, text rendering.
- Recommended maximum: 50MB per image. Batch processing preferred for large sets.

---

*This reference focuses on Imagician MCP server capabilities. For thinking methodology, see the MEDIA Framework. For conversation flows and error handling, see Interactive Intelligence.*
