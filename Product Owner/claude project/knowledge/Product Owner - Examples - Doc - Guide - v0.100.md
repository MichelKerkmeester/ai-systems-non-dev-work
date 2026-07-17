---
title: "Product Owner - Examples - Doc - Guide - v0.100"
description: "Instantiates Doc Templates section 3, Guide. Shows one writing standard adapted across four empty-state intents, including a state that needs no action."
version: "0.100"
contextType: asset
---

# Writing Empty-State Copy for Driftboard

* * *
> **Status: Current behavior — verified for Driftboard's web app.** This guide reflects the Product Design team's current empty-state writing conventions. The team maintains it as internal working material, not a public specification.
* * *

## Overview
* * *

An empty state appears when a Driftboard view, list or panel has nothing to show. The reason determines the message: no content exists yet, filters removed every match, the user completed the queue or a report has not reached its data threshold. Use this guide to write the headline, subcopy and action for each intent.
* * *

###   

### Before You Start
* * *

*   **Required context** — Confirm the surface and cause: first use, zero filter matches, completed queue or insufficient history.
*   **Required context** — Confirm whether the component has slots for an illustration, headline, subcopy and primary action. Not every surface has all four.
*   **Known limitation** — The illustration library covers six states: new workspace, empty list, no search results, all caught up, error and offline. Use the "empty list" asset when no closer shipped illustration exists.
* * *

##   

## Process
* * *

### 1\. Board View — No Tasks Yet
* * *

This state appears the first time a user opens a board that has no cards in any column. The goal is to explain what a board is for and get the user to create the first card without feeling like they did something wrong.

*   **Headline** — Lead with what the board is for, not with the absence of content. Avoid "Nothing here yet" as a standalone headline.
*   **Subcopy** — One sentence, plain language, no jargon such as "backlog" or "sprint" unless the workspace has already opted into that terminology.
*   **Primary action** — Always present on this surface. Use this exact label: "Add your first card". Do not use "Get started".

**Example**
* * *

Headline: "This board is ready for its first card"
Subcopy: "Cards represent tasks your team is working on. Add one to see how Driftboard organizes work."
Primary action: "Add your first card"
* * *

###   

### 2\. List View — No Items Match Filters
* * *

This state appears when a saved or ad hoc filter combination returns zero rows, even though the underlying list has data. It must never look identical to the "no data at all" state, because the fix is different: adjust the filters, not create content.

*   **Headline** — Reference filtering directly with "No items match your filters".
*   **Subcopy** — Name a concrete recovery path such as removing a filter or widening the date range.
*   **Primary action** — Use one of these exact labels: "Clear filters" or "Clear search". Creating an item does not resolve a filter mismatch.

**Example**
* * *

Headline: "No items match your filters"
Subcopy: "Try removing a filter or widening the date range to see more results."
Primary action: "Clear filters"
* * *

###   

### 3\. Inbox — All Caught Up
* * *

This state appears when a user has cleared every notification and mention in their inbox. Unlike the other states, this one is a reward moment, not a nudge toward an action.

*   **Headline** — Confirm completion with the exact copy "You're all caught up".
*   **Subcopy** — Optional. When used, confirm what will happen next without prompting the user.
*   **Primary action** — Omit. Do not force a CTA onto a state that has nothing left to do.

**Example**
* * *

Headline: "You're all caught up"
Subcopy: "New mentions and updates will show up here as they happen."
* * *

###   

### 4\. Reports — Not Enough Data Yet
* * *

This state appears when a report needs a minimum amount of history, for example seven days of activity, before it can render a trend. The state is temporary and clears when the threshold is met.

*   **Headline** — Set a concrete expectation with "Your report is still gathering data".
*   **Subcopy** — State the exact threshold that resolves the state when the threshold is known and stable.
*   **Primary action** — An optional secondary link may return the user to the board that supplies the report data.

**Example**
* * *

Headline: "Your report is still gathering data"
Subcopy: "Trends appear once a board has at least seven days of activity."
Secondary action: "View board"
* * *

###   

### Quality Checks
* * *

*   [ ] Does the headline describe the surface's purpose or next step instead of only stating absence?
*   [ ] Is the subcopy one sentence and free of internal jargon the workspace has not already adopted?
*   [ ] Does the state distinguish "no data ever" from "filtered to nothing," where both are possible on that surface?
*   [ ] Is a primary action present only where an action genuinely resolves the empty state?
*   [ ] Does the copy fit the surface's available illustration, headline, subcopy and action slots without truncation?
* * *

###   

### Boundaries and Exceptions
* * *

*   **Character limits** — Headlines are capped at 48 characters and subcopy at 120 characters across all surfaces to fit the shared empty-state component without wrapping awkwardly on narrow viewports.
*   **Localization** — Translated strings may run longer than the English source. Flag English headlines above 40 characters or subcopy above 100 characters for localization review before they approach the hard cap.
*   **Error and offline states** — These are not empty states. They follow the separate system-messaging standard.
* * *

###   

### Related Guidance
* * *

*   [Driftboard Voice and Tone Standard](https://design.driftboard.example/voice-and-tone)
*   [Empty-State Component Specification](https://design.driftboard.example/components/empty-state)
