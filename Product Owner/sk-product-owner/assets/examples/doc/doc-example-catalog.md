---
title: "Product Owner - Examples - Doc - Catalog - v0.100"
description: "Instantiates Doc Templates section 4, Catalog. Shows local status labels preserved across current, approved and proposed entries in one mixed-status catalog."
version: "0.100"
contextType: asset
---

# Prism Design System — Color Token Roles

* * *

## Overview
* * *

This mixed-status catalog lists Prism color tokens by role, not raw value. Seven entries marked Current behavior ship in package `4.8.2`. `surface_overlay` remains proposed and `accent_primary_pressed` is approved but not shipped. Product teams must follow each entry's local status. Raw color values, theme overrides and component aliases are out of scope.
* * *

###   

### Shared Vocabulary
* * *

*   **`role token`** — A token named for its function (for example `surface_raised`), not its appearance (for example `gray_100`). Prism only exposes role tokens to product teams.
*   **`surface`** — A token that sets a background color for a container, card or page-level region.
*   **`text`** — A token that sets a foreground color for typography or icon glyphs.
*   **`accent`** — A token used for primary interactive elements such as buttons, links and selected states.
*   **`feedback`** — A token that communicates a semantic outcome such as success, warning or danger.
* * *

###   

### Index
* * *

| ID | Entry | Category | Status | Source |
| ---| ---| ---| ---| --- |
| `surface_default` | [surface_default](#surface_default--page-background) | Surface | Current behavior | Prism token registry `4.8.2` |
| `surface_raised` | [surface_raised](#surface_raised--elevated-container) | Surface | Current behavior | Prism token registry `4.8.2` |
| `surface_overlay` | [surface_overlay](#surface_overlay--scrim-background) | Surface | Proposal | Design systems RFC-014 |
| `text_default` | [text_default](#text_default--primary-foreground) | Text | Current behavior | Prism token registry `4.8.2` |
| `text_muted` | [text_muted](#text_muted--secondary-foreground) | Text | Current behavior | Prism token registry `4.8.2` |
| `accent_primary` | [accent_primary](#accent_primary--primary-interactive-color) | Accent | Current behavior | Prism token registry `4.8.2` |
| `accent_primary_pressed` | [accent_primary_pressed](#accent_primary_pressed--primary-pressed-state) | Accent | Approved direction | Design systems RFC-014 |
| `feedback_success` | [feedback_success](#feedback_success--success-signal) | Feedback | Current behavior | Prism token registry `4.8.2` |
| `feedback_danger` | [feedback_danger](#feedback_danger--error-signal) | Feedback | Current behavior | Prism token registry `4.8.2` |
* * *

##   

## Surface
* * *

### `surface_default` — Page Background
* * *

**Status:** Current behavior

*   **Purpose** — Sets the base background color for full-page and full-screen regions.
*   **Usage** — Applied to the root layout background in every product surface unless a component explicitly overrides it.
*   **Value reference** — `--prism-color-surface-default`

**Related entries**
* * *

*   [surface_raised](#surface_raised--elevated-container)
* * *

###   

### `surface_raised` — Elevated Container
* * *

**Status:** Current behavior

*   **Purpose** — Sets the background color for containers that sit visually above the page, such as cards, panels and modals.
*   **Usage** — Pair with the standard elevation shadow token. Without that shadow, light-theme cards do not read as raised.
*   **Value reference** — `--prism-color-surface-raised`

**Related entries**
* * *

*   [surface_default](#surface_default--page-background)
*   [surface_overlay](#surface_overlay--scrim-background)
* * *

###   

### `surface_overlay` — Scrim Background
* * *

**Status:** Proposal — not current product behavior

*   **Purpose** — Proposed token for the dimmed backdrop shown behind a modal or drawer.
*   **Candidate value reference** — `--prism-color-surface-overlay`. This identifier is proposed and unavailable in package `4.8.2`.
*   **Usage** — Would replace the current one-off overlay values used by modal and drawer backdrops.
*   **Evidence or rationale** — RFC-014 records shipped overlay opacities of 24%, 32% and 40% across three product teams. The RFC has not been approved and the token registry does not contain this token.
* * *

##   

## Text
* * *

### `text_default` — Primary Foreground
* * *

**Status:** Current behavior

*   **Purpose** — Sets the default color for body copy, headings and standard icon glyphs.
*   **Usage** — The implicit default for any text element that does not specify a text token.
*   **Value reference** — `--prism-color-text-default`
* * *

###   

### `text_muted` — Secondary Foreground
* * *

**Status:** Current behavior

*   **Purpose** — Sets a lower-emphasis color for helper text, timestamps and placeholder copy.
*   **Usage** — Must maintain a minimum 4.5:1 contrast ratio against `surface_default` and `surface_raised`. Do not pair it with an unchecked background token.
*   **Value reference** — `--prism-color-text-muted`
* * *

##   

## Accent
* * *

### `accent_primary` — Primary Interactive Color
* * *

**Status:** Current behavior

*   **Purpose** — Marks the primary interactive color used for default-state primary buttons, active tabs and links.
*   **Usage** — Reserved for the primary action on a screen. Do not apply it to two competing actions in one view.
*   **Value reference** — `--prism-color-accent-primary`

**Related entries**
* * *

*   [accent_primary_pressed](#accent_primary_pressed--primary-pressed-state)
* * *

###   

### `accent_primary_pressed` — Primary Pressed State
* * *

**Status:** Approved direction — not confirmed as shipped

*   **Purpose** — Approved token intended to give `accent_primary` controls a distinct pressed-state color instead of the current opacity-based pressed effect.
*   **Value reference** — `--prism-color-accent-primary-pressed`. This approved identifier is not available in package `4.8.2`.
*   **Usage** — Will replace the current opacity-based pressed effect after the token registry and component library both ship support.
*   **Evidence or rationale** — Design systems leadership approved this entry in the RFC-014 review on June 18, 2026. Delivery remains unscheduled.
* * *

##   

## Feedback
* * *

### `feedback_success` — Success Signal
* * *

**Status:** Current behavior

*   **Purpose** — Marks a successful outcome, such as a completed save or a passed validation.
*   **Usage** — Used for success banners, success toasts and positive validation states on form fields.
*   **Value reference** — `--prism-color-feedback-success`
* * *

###   

### `feedback_danger` — Error Signal
* * *

**Status:** Current behavior

*   **Purpose** — Marks a destructive action or an error state, such as a failed save or a validation failure.
*   **Usage** — Used for error banners, error toasts, destructive button variants and invalid form-field states.
*   **Value reference** — `--prism-color-feedback-danger`
* * *

###   

### Catalog Boundaries
* * *

*   **Theme scope** — This catalog describes token roles, not their resolved values under light, dark or high-contrast themes. Resolved values live in the theme mapping tables, not here.
*   **Component aliases** — Component-level tokens (for example a button's own background token) that merely point at one of these role tokens are not listed individually.
*   **Unresolved** — `surface_overlay` and `accent_primary_pressed` are absent from package `4.8.2`. Treat either identifier in code as forward-looking until a later package release includes it.
* * *

###   

### Sources
* * *

*   Prism token registry `4.8.2` — current behavior, verified against the shipped token package
*   Design systems RFC-014 — proposal scope for `surface_overlay` and approved-direction scope for `accent_primary_pressed`
