---
title: "Product Owner - Examples - Doc - Behavior Reference - v0.100"
description: "Instantiates Doc Templates section 5, Behavior Reference. Shows state precedence across timing, offline and conflict rules while one edge remains unresolved."
version: "0.100"
contextType: asset
---

# Fieldnote Editor — Form Autosave Behavior

* * *
> **Source basis**
> *   **Current behavior** — The Fieldnote engineering team verified the state machine and settled rules below in the web editor.
> *   **Unknown** — The reconnect-during-conflict edge in Boundaries and Exceptions has no settled rule.
* * *

## Overview
* * *

Fieldnote's web editor autosaves record fields, notes and structured metadata while a user edits. This reference explains the autosave state machine, its timing rules, offline behavior and conflicts when another session changes the same record. Engineers use it to maintain autosave. Support staff use it to diagnose save-related reports.
* * *

###   

### Glossary
* * *

#### Terms and States
* * *

*   **`idle`** — The record has loaded and no local edit has occurred in the current editor session.
*   **`dirty`** — At least one field has changed since the last successful save and no save request is currently in flight.
*   **`saving`** — A save request for the current edit is in flight.
*   **`saved`** — The most recent save request succeeded and no further edits have occurred since.
*   **`conflict`** — A save request failed because the server holds a newer version of the record than the one the editor started from.
* * *

###   

### Structure or Context
* * *

The autosave state lives on the client and is scoped to one open record. The client tracks the loaded revision and compares it with the revision returned by each save response. Field-change events and one background timer drive transitions. The server remains the authority for the current revision.

Offline edits are written to an IndexedDB draft keyed by user and record before the editor shows "Offline — changes saved locally". The editor removes that draft after the server accepts the changes or the user discards them during conflict resolution.

```text
Field change events -> Autosave state machine -> Save request queue -> Server (revision authority)
                                                                    -> Local revision cache
```
* * *

###   

### States and Components
* * *

`idle`
*   **Meaning or role** — Initial state after the editor loads a record and before the first local field change.
*   **Verified behavior** — No network requests are issued. The save indicator shows "Saved" without a new save timestamp.
*   **Status** — Current behavior
* * *

`dirty`
*   **Meaning or role** — Entered the moment any tracked field's value differs from its last-saved value.
*   **Verified behavior** — Starts or restarts the debounce timer described in Behavior Rules. The save indicator shows "Editing…"
*   **Status** — Current behavior
* * *

`saving`
*   **Meaning or role** — Entered only when the editor dispatches a save request after an elapsed debounce timer or manual save trigger while online.
*   **Verified behavior** — Issues one save request carrying the local revision number. Further field changes enter the queue and do not trigger a second concurrent request.
*   **Status** — Current behavior
* * *

`saved`
*   **Meaning or role** — Entered when a save request returns success and the server-returned revision is accepted as current.
*   **Verified behavior** — The save indicator shows "Saved" with a timestamp. Any field changes queued during `saving` immediately transition the state back to `dirty`.
*   **Status** — Current behavior
* * *

`conflict`
*   **Meaning or role** — Entered when a save request returns a revision mismatch, meaning the server's current revision is newer than the one the editor started from.
*   **Verified behavior** — The in-flight save is not applied. The editor stops autosaving further changes until the conflict is resolved per the rules below.
*   **Status** — Current behavior
* * *

##   

## Behavior Rules
* * *

### Timing Rules
* * *

**1\. Debounce Interval**
* * *

The editor waits for a quiet period in field changes before issuing a save. It does not save on every keystroke.

*   **When** — A tracked field changes while the state is `idle` or `dirty`.
*   **Then** — The debounce timer restarts at 2 seconds. A save request fires only once no further changes occur within that window.
*   **How** — Each field-change event resets one shared timer. A burst of edits across multiple fields still produces one save.
*   **Why** — Reduces request volume and avoids saving incomplete intermediate states, such as a half-typed word.
*   **Status** — Current behavior
* * *

**2\. Maximum Wait Cap**
* * *

Continuous editing must still produce a save attempt.

*   **When** — Field changes keep resetting the debounce timer for longer than 10 seconds without a quiet period.
*   **Then** — The editor forces a save request at the 10-second mark regardless of ongoing typing.
*   **Why** — Caps the time before the first server save attempt at 10 seconds, even when the user keeps typing. It does not promise that a failed request reached the server.
*   **Status** — Current behavior
* * *

###   

### Offline Behavior
* * *

**1\. Detecting Offline State**
* * *

The editor distinguishes "no network" from "server error" so it does not treat temporary connectivity loss as a conflict.

*   **When** — The browser reports offline before dispatch or an in-flight request fails without an HTTP response.
*   **Then** — The state remains or returns to `dirty` and does not move to `conflict`. The save indicator shows "Offline — changes saved locally".
*   **How** — Each edit is written to the record's IndexedDB draft and queued for retry. The draft survives a refresh in the same browser profile.
*   **Why** — Prevents an offline gap from being misclassified as a competing edit from another session.
*   **Status** — Current behavior
* * *

**2\. Reconnection Retry**
* * *

*   **When** — The browser reports connectivity restored while the editor holds a queued IndexedDB draft.
*   **Then** — The editor transitions from `dirty` to `saving` and immediately attempts a save using the queued edits and cached revision number. It removes the local draft only after the server accepts the save.
*   **Why** — Minimizes the window during which local-only edits remain unsynced.
*   **Status** — Current behavior
* * *

###   

### Conflict Resolution Rules
* * *

**1\. Revision Mismatch Detection**
* * *

*   **When** — A save request's revision number does not match the server's current revision for that record.
*   **Then** — The server rejects the save and returns its current version of the record. The client transitions to `conflict`.
*   **Why** — Prevents a stale client from silently overwriting a newer edit made elsewhere, such as from another tab or another user with edit access.
*   **Status** — Current behavior
* * *

**2\. Conflict Presentation and Resolution**
* * *

*   **When** — The editor enters `conflict`.
*   **Then** — The editor presents the server's current version alongside the user's unsaved local changes and requires an explicit choice: keep local changes and overwrite, discard local changes and reload the server version or merge field by field.
*   **How** — Autosave remains paused for that record until the user resolves the conflict. No automatic merge or overwrite occurs.
*   **Why** — Conflicting edits carry business meaning that only the user can safely decide between. Silent resolution risks losing either party's work.
*   **Status** — Current behavior
* * *

##   

## Combinations and Precedence
* * *

| Conditions | Outcome | Authority or status |
| ---| ---| --- |
| Browser is offline when the debounce timer elapses | State remains `dirty`, the save stays queued in IndexedDB and no network request is issued | Current behavior |
| In-flight save loses connectivity before an HTTP response | State returns from `saving` to `dirty` and the save stays queued in IndexedDB | Current behavior |
| Conflict detected while offline queue also has pending edits | Conflict resolution takes precedence. The offline queue is held until the conflict is resolved | Current behavior |
| Maximum wait cap reached while offline | Forced save attempt is queued locally like any other offline save | Current behavior |
* * *

###   

### Examples
* * *

#### Ordinary Edit and Save
* * *

*   **Given** — A record is open and the state is `idle`.
*   **When** — The user edits a field and then stops typing for 2 seconds.
*   **Then** — The state moves `dirty` → `saving` → `saved` and the indicator shows a fresh "Saved" timestamp.
* * *

####   

#### Edit While Offline
* * *

*   **Given** — A record is open in `idle` when the device loses network connectivity.
*   **When** — The user edits a field.
*   **Then** — The state stays `dirty`, the indicator shows "Offline — changes saved locally" and the editor writes the changes to the record's IndexedDB draft without issuing a request.
* * *

####   

#### Conflicting Edit From Another Session
* * *

*   **Given** — The same record is open in two browser tabs, both starting from the same revision.
*   **When** — Tab A saves successfully, then Tab B's autosave fires using its now-stale revision number.
*   **Then** — Tab B's save is rejected, its state moves to `conflict` and it presents Tab A's saved version alongside Tab B's unsaved edits for manual resolution.
* * *

###   

### Boundaries and Exceptions
* * *

*   **Read-only records** — Autosave never activates on a record the user cannot edit. Field changes are disabled at the UI layer before the state machine is reached.
*   **Unresolved** — If connectivity drops after the user chooses "Keep local changes and overwrite" but before the overwrite response returns, no settled rule says whether Fieldnote should queue that choice or reopen the conflict after reconnecting. Engineering is tracking this edge as an open decision.
* * *

###   

### Related References
* * *

*   [Fieldnote Editor — Field Validation Rules](https://docs.fieldnote.example/editor/field-validation)
