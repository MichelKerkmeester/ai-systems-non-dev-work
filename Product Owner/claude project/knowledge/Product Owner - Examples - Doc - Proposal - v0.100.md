---
title: "Product Owner - Examples - Doc - Proposal - v0.100"
description: "Instantiates Doc Templates section 6, Proposal. Shows verified current context separated from candidate design while the decision owner and evidence gap stay open."
version: "0.100"
contextType: asset
---

# Proposal — Dark Mode Rollout for Meridian Mobile

* * *
> **Status: Proposal**
> This document describes candidate product and engineering behavior for a dark-mode rollout on the Meridian mobile app. It is not evidence of current implementation. Design review and an engineering feasibility check on the theming approach are required before any part of this proposal can move to approved direction.
* * *

## Overview
* * *

Meridian mobile currently ships with a single light theme. App-store reviews and support tickets include complaints that the app is too bright at night, but this proposal has no verified count, ranking or trend for those complaints. It records the known theming baseline, candidate behavior and evidence needed before anyone approves implementation.
* * *

###   

### Current State
* * *

The current app binary has no theme switch, persisted theme preference or listener for the operating system's appearance setting. The Activity tab reads colors from a small internal token set. Hardcoded-color coverage in every other module is unknown because this proposal did not audit those modules.
* * *

###   

### Desired Outcome
* * *

Users should be able to choose Light, Dark or System appearance without losing text readability or Meridian's visual identity. Before rollout, the team must baseline brightness-related support contacts and define a target reduction. Battery impact is a measurement question, not a promised outcome.
* * *

##   

## Proposed Behavior or Design
* * *

### Theme Token Layer
* * *

Introduce a shared color-token layer that every screen reads from, replacing hardcoded values module by module.

*   **Candidate condition or input** — A screen currently reads a hardcoded color value instead of a token.
*   **Candidate behavior or design** — The screen is migrated to reference a semantic token (for example `surface_default`, `text_primary`) that resolves differently under light and dark theme, following the same role-token pattern the Activity tab already uses.
*   **Evidence or rationale** — The Activity tab's existing token set is the only in-app precedent and is the proposed starting vocabulary. The proposal adds no second vocabulary.
*   **Status** — Proposed
* * *

###   

### Theme Selection and Persistence
* * *

Give users a way to choose a theme and have that choice remembered.

*   **Candidate condition or input** — A user opens the Settings screen.
*   **Candidate behavior or design** — Add a three-way "Appearance" control: Light, Dark and System. The selection persists locally and applies immediately without an app restart.
*   **Evidence or rationale** — The labels match the appearance terms already used by iOS and Android. Meridian has not tested whether this control needs supporting copy.
*   **Status** — Proposed
* * *

###   

### Principles and Constraints
* * *

*   **Brand color integrity** — The primary accent must remain identifiable as Meridian in both themes. Contrast testing, not automatic inversion, determines the dark-theme value.
*   **Accessibility floor** — All text and icon combinations must meet at least 4.5:1 contrast in both themes. This proposal adopts the stricter ratio for icons as a Meridian product constraint.
*   **Migration boundary** — No screen may render a mix of light and dark tokens. If the team chooses incremental delivery, each unmigrated screen remains wholly light until its token audit passes.
* * *

###   

### Options and Trade-offs
* * *

| Option or direction | Benefit | Cost or risk | Evidence | Status |
| ---| ---| ---| ---| --- |
| Full token migration before any dark-mode release | One theme experience on release day | Delays all user-visible value until every screen passes audit | No full-app estimate. The Activity tab proves only that the token pattern works in one module | Unknown — estimate required |
| Incremental migration with unmigrated screens forced to light theme | Releases audited screens sooner | Members cross between dark and forced-light screens during migration | Activity tab provides one module-level precedent | Proposed — no recommendation recorded |
| Runtime theme overlay without token migration | Requires fewer screen-level changes | Hardcoded colors may invert into unreadable or off-brand combinations | No Meridian evidence supports this approach | Not recommended |
* * *

##   

## Recommendation or Decision
* * *

No recommendation has been recorded yet. The Product Design lead is the proposed decision owner for choosing between full migration and incremental migration, pending the engineering feasibility estimate referenced in Open Decisions below.
* * *

###   

### Dependencies and Risks
* * *

*   **Dependency** — A per-screen hardcoded-color audit. Only the Activity tab has been checked.
*   **Dependency** — An engineering estimate for extending or replacing the Activity tab's token mechanism.
*   **Risk** — An incremental rollout forces members between dark and light screens. The team has no usability evidence for that transition.
*   **Risk** — Meridian has not measured battery use under candidate dark-theme colors. External messaging must not claim battery savings without that measurement.
* * *

##   

## Open Decisions
* * *

*   [ ] Full migration versus incremental migration — owner: Product Design lead, pending engineering feasibility estimate
*   [ ] Whether "System" appearance should be the default for new installs or whether "Light" remains default until dark mode is fully migrated
*   [ ] Which screens are prioritized first if incremental migration is chosen
*   [ ] Baseline count and target reduction for brightness-related support contacts — owner: Product Operations
* * *

###   

### Out of Scope
* * *

*   Web and desktop theming. This proposal covers Meridian mobile only.
*   Per-user custom accent-color theming beyond the light/dark/system choice.
* * *

###   

### Source Basis
* * *

*   Activity tab token implementation — current behavior, verified in the shipped app binary
*   App-store reviews and support tickets mentioning nighttime brightness — unknown volume, used only as unquantified motivation
*   Full-app hardcoded-color coverage — unknown until the per-screen audit is complete
