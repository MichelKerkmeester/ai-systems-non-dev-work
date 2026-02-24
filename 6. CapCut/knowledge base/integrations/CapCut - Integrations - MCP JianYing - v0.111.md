# CapCut - Integrations - MCP JianYing - v0.111

Technical reference for JianYing MCP server capabilities and integration for video editing operations.

**Loading Condition:** ON-DEMAND
**Purpose:** Define JianYing MCP server capabilities, technical specifications, and operation parameters for video editing integration
**Scope:** Server overview, core capabilities (18 tools), operation specifications, effect resources, and quick reference

> **Note:** JianYing = CapCut (same product by ByteDance). JianYing Pro is the Chinese desktop version; CapCut is the international version. This MCP server works with JianYing Pro desktop application.

## TABLE OF CONTENTS

  - 1. 🔌 SERVER OVERVIEW
  - 2. 🛠️ CORE CAPABILITIES
  - 3. 📋 DRAFT MANAGEMENT
  - 4. 🎥 VIDEO OPERATIONS
  - 5. 🎵 AUDIO OPERATIONS
  - 6. 📝 TEXT OPERATIONS
  - 7. 🔧 UTILITY TOOLS
  - 8. 🏎️ QUICK REFERENCE

---

## 1. 🔌 SERVER OVERVIEW

### MCP Server Details

The JianYing MCP server (`jianying-mcp`) provides comprehensive video editing automation capabilities powered by pyJianYingDraft. It enables draft creation, track management, video/audio/text segment handling, effects, transitions, and project exports through native MCP integration.

**Key Information:**
- **Package:** `jianying-mcp`
- **Repository:** https://github.com/hey-jian-wei/jianying-mcp
- **Engine:** pyJianYingDraft (Python video draft library)
- **Protocol:** Model Context Protocol (MCP)
- **Python:** 3.13+

**Installation:**
```bash
# Clone repository
git clone https://github.com/hey-jian-wei/jianying-mcp.git
cd jianying-mcp

# Install with uv
uv sync
```

### Connection Verification

**Reference:** Connection verification logic is in System - Interactive Intelligence.

Connection verification must be the **first action before all operations**. Use the `rules` tool to test connectivity and server availability.

**Status Messages:**
- ✅ **Connected:** "JianYing MCP Connected - Video editing available"
- ❌ **Disconnected:** "JianYing MCP Not Connected - Setup required"

**Additional Check:**
- ⚠️ **App Check:** Verify JianYing Pro desktop app is running

---

## 2. 🛠️ CORE CAPABILITIES

### Available Operations

**Note:** Thinking methodology is defined in Thinking - VIDEO Framework.

The JianYing MCP server provides comprehensive video editing capabilities:

**Draft Management** - Create and manage video projects
- Tools: `rules`, `create_draft`, `export_draft`
- Use case: Project initialization, configuration, export

**Track Management** - Create timeline tracks
- Tool: `create_track`
- Types: Video tracks, audio tracks, text tracks
- Use case: Layer organization, multi-track editing

**Video Processing** - Handle video content
- Tools: `add_video_segment`, `add_video_animation`, `add_video_transition`, `add_video_filter`, `add_video_mask`, `add_video_background_filling`, `add_video_keyframe`, `add_video_effect`
- Use case: Video clips, animations, effects, scene effects

**Audio Processing** - Handle audio content
- Tools: `add_audio_segment`, `add_audio_effect`, `add_audio_fade`, `add_audio_keyframe`
- Use case: Music, sound effects, voice

**Text Processing** - Handle text overlays
- Tools: `add_text_segment`, `add_text_animation`
- Use case: Titles, captions, subtitles

**Utilities** - Helper functions
- Tools: `parse_media_info`, `find_effects_by_type`
- Use case: Media analysis, effect discovery

### Processing Order

For optimal results, process video projects in this sequence:
1. Verify MCP connection
2. Verify JianYing Pro is running
3. Create draft with resolution/framerate
4. Create required tracks (video, audio, text)
5. Add video segments to video tracks
6. Add audio segments to audio tracks
7. Add text segments to text tracks
8. Apply animations and effects
9. Export draft to JianYing

---

## 3. 📋 DRAFT MANAGEMENT

### rules Tool

Get video production guidelines and verify connection.

```yaml
rules:
  purpose: "Connection check, get production rules"
  parameters: none
  returns: "Production guidelines and best practices"
```

### create_draft Tool

Create a new video draft project.

```yaml
create_draft:
  parameters:
    name: string (required) - Project name
    width: number (optional, default: 1920) - Canvas width
    height: number (optional, default: 1080) - Canvas height
    fps: number (optional, default: 30) - Frames per second

  presets:
    horizontal_hd: {width: 1920, height: 1080, fps: 30}
    vertical_hd: {width: 1080, height: 1920, fps: 30}
    square: {width: 1080, height: 1080, fps: 30}
    4k: {width: 3840, height: 2160, fps: 30}
    cinematic: {width: 1920, height: 1080, fps: 24}
```

### export_draft Tool

Export draft to JianYing project file.

```yaml
export_draft:
  parameters:
    draft_id: string (required) - Draft to export
    output_path: string (optional) - Custom output location

  returns:
    path: "Path to exported .draft file"
    status: "Export success/failure"
```

---

## 4. 🎥 VIDEO OPERATIONS

### add_video_segment Tool

Add video clip to timeline.

```yaml
add_video_segment:
  parameters:
    track_index: number (required) - Target track index
    source: string (required) - File path or URL
    target_start_end: string (optional) - Timeline position like "1s-4.2s" (start-end format)
    source_start_end: string (optional) - Source clip trim range like "0s-10s"
```

### add_video_animation Tool

Add entrance/exit animations.

```yaml
add_video_animation:
  parameters:
    segment_id: string (required) - Target segment
    type: string (required) - "in" or "out"
    effect_id: string (required) - Animation effect ID
    duration: number (optional) - Animation duration in ms

  common_effects:
    entrance: [fade_in, slide_in, zoom_in, rotate_in]
    exit: [fade_out, slide_out, zoom_out, rotate_out]
```

### add_video_transition Tool

Add transition between segments.

```yaml
add_video_transition:
  parameters:
    segment_id: string (required) - Segment before transition
    effect_id: string (required) - Transition effect ID
    duration: number (optional) - Transition duration in ms

  common_effects:
    - dissolve
    - wipe
    - slide
    - zoom
    - blur
```

### add_video_filter Tool

Apply visual filter effects.

```yaml
add_video_filter:
  parameters:
    segment_id: string (required) - Target segment
    filter_id: string (required) - Filter effect ID
    intensity: number (optional) - Effect intensity 0-100
```

### add_video_mask Tool

Add mask effects.

```yaml
add_video_mask:
  parameters:
    segment_id: string (required) - Target segment
    mask_id: string (required) - Mask effect ID
    invert: boolean (optional) - Invert mask
```

### add_video_background_filling Tool

Fill background for non-matching aspect ratios.

```yaml
add_video_background_filling:
  parameters:
    segment_id: string (required) - Target segment
    type: string (required) - "blur", "color", "image"
    value: string (optional) - Color hex or image path
```

### add_video_keyframe Tool

Add keyframe animation.

```yaml
add_video_keyframe:
  parameters:
    segment_id: string (required) - Target segment
    time: string (required) - Keyframe time like "2.5s"
    property: string (required) - Property to animate
    value: any (required) - Property value

  animatable_properties:
    - position_x
    - position_y
    - scale
    - rotation
    - opacity
```

### add_video_effect Tool

Add video effect (scene, character, or other effect types).

```yaml
add_video_effect:
  parameters:
    segment_id: string (required) - Target segment
    effect_type: string (required) - Type of effect to apply
    effect_id: string (required) - Effect resource ID from find_effects_by_type

  effect_types:
    - VIDEO_SCENE: Scene-based video effects
    - VIDEO_CHARACTER: Character-based effects
```

---

## 5. 🎵 AUDIO OPERATIONS

### add_audio_segment Tool

Add audio clip to timeline.

```yaml
add_audio_segment:
  parameters:
    track_index: number (required) - Target track index
    source: string (required) - File path or URL
    target_start_end: string (optional) - Timeline position like "0s-30s"
    source_start_end: string (optional) - Source audio trim range
    volume: number (optional) - Volume level 0-100
```

### add_audio_effect Tool

Apply audio effects.

```yaml
add_audio_effect:
  parameters:
    segment_id: string (required) - Target segment
    effect_type: string (required) - Effect type
    parameters: object (optional) - Effect parameters

  effect_types:
    - reverb
    - echo
    - distortion
    - pitch_shift
    - equalizer
```

### add_audio_fade Tool

Add fade in/out effects.

```yaml
add_audio_fade:
  parameters:
    segment_id: string (required) - Target segment
    fade_in: number (optional) - Fade in duration in ms
    fade_out: number (optional) - Fade out duration in ms
```

### add_audio_keyframe Tool

Add audio keyframe animation.

```yaml
add_audio_keyframe:
  parameters:
    segment_id: string (required) - Target segment
    time: string (required) - Keyframe time like "5s"
    property: string (required) - Property to animate
    value: number (required) - Property value

  animatable_properties:
    - volume
    - pan
```

---

## 6. 📝 TEXT OPERATIONS

### add_text_segment Tool

Add text overlay to timeline.

```yaml
add_text_segment:
  parameters:
    track_index: number (required) - Target track index
    content: string (required) - Text content
    target_start_end: string (optional) - Timeline position like "0s-5s"
    font: string (optional) - Font family (use find_effects_by_type with Font type)
    size: number (optional) - Font size
    color: string (optional) - Text color hex
    position_x: number (optional) - X position
    position_y: number (optional) - Y position
```

### add_text_animation Tool

Add text animation effects.

```yaml
add_text_animation:
  parameters:
    segment_id: string (required) - Target segment
    type: string (required) - Animation type
    effect_id: string (required) - Animation effect ID from find_effects_by_type

  effect_types:
    - TextIntro: Entrance animations
    - TextOutro: Exit animations
    - TextLoopAnim: Looping animations
```

---

## 7. 🔧 UTILITY TOOLS

### parse_media_info Tool

Get information about media files.

```yaml
parse_media_info:
  parameters:
    path: string (required) - Path to media file

  returns:
    duration: number - Duration in ms
    width: number - Video width
    height: number - Video height
    fps: number - Frames per second
    codec: string - Video codec
    audio_codec: string - Audio codec
    file_size: number - Size in bytes
```

### find_effects_by_type Tool

Discover available effects by type.

```yaml
find_effects_by_type:
  parameters:
    type: string (required) - Effect category

  effect_types:
    # Video Effects
    - VIDEO_SCENE: Scene-based video effects
    - VIDEO_CHARACTER: Character-based effects
    - IntroType: Video entrance animations
    - OutroType: Video exit animations
    - GroupAnimationType: Group animation effects
    - TransitionType: Transition effects between segments
    - filter_type: Visual filter effects
    - mask_type: Mask overlay effects

    # Audio Effects
    - ToneEffectType: Tone/voice modification
    - AudioSceneEffectType: Audio scene effects
    - SpeechToSongType: Speech to song conversion

    # Text Effects
    - TextIntro: Text entrance animations
    - TextOutro: Text exit animations
    - TextLoopAnim: Looping text animations
    - Font: Available font families

  returns:
    effects: array - List of available effects with resource IDs
```

---

## 8. 🏎️ QUICK REFERENCE

### MCP Tools Summary (18 Tools)

```yaml
tools:
  # Draft Management (3 tools)
  rules:
    purpose: "Connection check, get guidelines"
    key_params: []

  create_draft:
    purpose: "Create new project"
    key_params: [name, width, height, fps]

  export_draft:
    purpose: "Export to JianYing"
    key_params: [draft_id, output_path]

  # Track Management (1 tool)
  create_track:
    purpose: "Create timeline track"
    key_params: [type, index]

  # Video Operations (8 tools)
  add_video_segment:
    purpose: "Add video clip"
    key_params: [track_index, source, target_start_end]

  add_video_animation:
    purpose: "Add entrance/exit animation"
    key_params: [segment_id, type, effect_id]

  add_video_transition:
    purpose: "Add transition effect"
    key_params: [segment_id, effect_id]

  add_video_filter:
    purpose: "Apply visual filter"
    key_params: [segment_id, filter_id]

  add_video_mask:
    purpose: "Add mask effect"
    key_params: [segment_id, mask_id]

  add_video_background_filling:
    purpose: "Fill background for aspect ratio"
    key_params: [segment_id, type]

  add_video_keyframe:
    purpose: "Add keyframe animation"
    key_params: [segment_id, time, property, value]

  add_video_effect:
    purpose: "Add video scene/character effect"
    key_params: [segment_id, effect_type, effect_id]

  # Audio Operations (4 tools)
  add_audio_segment:
    purpose: "Add audio clip"
    key_params: [track_index, source, target_start_end]

  add_audio_effect:
    purpose: "Apply audio effect"
    key_params: [segment_id, effect_type]

  add_audio_fade:
    purpose: "Add fade in/out"
    key_params: [segment_id, fade_in, fade_out]

  add_audio_keyframe:
    purpose: "Add audio keyframe"
    key_params: [segment_id, time, property, value]

  # Text Operations (2 tools)
  add_text_segment:
    purpose: "Add text overlay"
    key_params: [track_index, content, target_start_end]

  add_text_animation:
    purpose: "Animate text"
    key_params: [segment_id, type, effect_id]

  # Utility Tools (2 tools)
  parse_media_info:
    purpose: "Get media file information"
    key_params: [path]

  find_effects_by_type:
    purpose: "Discover available effects"
    key_params: [type]
```

### Integration References

```yaml
related_documents:
  thinking_methodology:
    file: "CapCut - Thinking - VIDEO Framework"
    sections:
      - "Section 2: VIDEO Principles"
      - "Section 3: Cognitive Rigor"

  conversation_flow:
    file: "CapCut - System - Interactive Intelligence"
    sections:
      - "Section 1: Conversation Architecture"
      - "Section 2: Response Templates"
      - "Section 5: Error Recovery"
```

### Limitations

```yaml
limitations:
  operations:
    can_do:
      - "Create drafts with custom resolution/fps"
      - "Manage video/audio/text tracks"
      - "Add segments from files or URLs"
      - "Apply animations, transitions, effects"
      - "Export to JianYing project format"
    cannot_do:
      - "Real-time preview"
      - "AI content generation"
      - "Complex motion tracking"
      - "Advanced color grading"
      - "Direct video rendering/export to MP4"

  requirements:
    - "JianYing Pro desktop app must be installed"
    - "JianYing Pro must be running for import"
    - "Python 3.13+ required"
    - "uv package manager required"

  environment:
    SAVE_PATH: "Directory for draft data storage"
    OUTPUT_PATH: "Directory for exported project files"
```

---

*This document focuses exclusively on JianYing MCP server capabilities and technical specifications. For thinking methodology, see Thinking - VIDEO Framework. For conversation flows and error handling, see System - Interactive Intelligence.*

