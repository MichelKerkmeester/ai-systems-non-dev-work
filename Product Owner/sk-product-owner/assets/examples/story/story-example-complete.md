---
title: "Product Owner - Examples - Story - Complete Reference - v0.100"
description: "The maximal house story: every section and every optional enrichment populated. A blockquote preamble, About, Documentation link, shared-mechanism section, Definition of Ready, requirements each with a value line, Rule block, Which-means-that and checklist, one priority marker, numbered acceptance criteria with Mark-as-done, and a Definition of Done. A reference for what is available, not the default a small story needs."
version: "0.100"
contextType: asset
---

<!-- This is the maximal reference. Most stories use far less. Simple stories drop every optional block; reach for these only when a story earns them. -->

# Story - BO - Beacon - Broadcast Scheduling & Targeting

> _A story is used to define product requirements, acceptance criteria, etc._
> _Use it as the foundation for Tasks that work towards fulfilling the acceptance criteria._

### About
* * *
The team sends broadcasts to members from the Beacon back office. Today a broadcast sends the moment it is submitted, with no scheduling, no audience targeting beyond a region, and no way to save a draft.

**Problem**
* * *
The team cannot control when a broadcast sends or who it reaches:
*   Someone has to be at their screen at the exact send moment
*   There is no way to narrow a region audience to the members that fit
*   A typo goes out with no way to catch it
*   There is no way to save a broadcast and come back to it

**Solution**
* * *
Give the broadcast screen one shared draft-and-send lifecycle with three controls:
*   Scheduling for a future send moment
*   Targeting that narrows a region audience by plan, tenure and activity level
*   A draft state with cancel and edit until the send starts

**User Story**
* * *
As a Beacon team member sending broadcasts:
*   I want to schedule a send for later, so that it lines up with a launch without me being online
*   I want to narrow a region audience to the members that fit, so that a send reaches the right people
*   I want to cancel or edit a send before it goes out, so that I can fix mistakes in time

**Documentation**
* * *
[Beacon Back Office - Broadcast Lifecycle Spec](https://docs.beacon.example/backoffice/broadcasts)
###   

### How the send lifecycle works
* * *
Every broadcast is a draft until someone schedules or sends it. The lifecycle owns the states, the transitions and the lock, so scheduling, targeting and the draft controls all share one state machine.

A broadcast moves through `draft -> scheduled -> sending -> sent`. It is editable and cancellable in `draft` and `scheduled`. Editing a `scheduled` broadcast returns it to `draft` so the corrected version is re-submitted. Once it enters `sending`, it locks: no cancel, no edit. Every cancel or edit records who acted and when.

**States and transitions**
* * *
**`draft`:** editable, not scheduled, never sends on its own.
`scheduled`: a future `send_at` is set; still editable and cancellable.
`sending`: the send has started; locked.
`sent`: complete.
* * *
###   

### Definition of Ready
* * *
Check off as met; pull requirements into a sprint only when every box is checked:
- [ ] Every requirement has a clear value clause and testable acceptance criteria
- [ ] Dependencies identified (the targeting query service and the scheduled-send worker are live)
- [ ] Sized by the team and each requirement fits comfortably in a sprint
###   

### Requirements
* * *
_Mention_ [@Owner](https://app.beacon.example/u/owner) _if design input from Product is needed_

**Scheduling** ← PRIO
* * *
**Story:** As a team member preparing a broadcast, I want to set a future date and time, so that it goes out at the right moment without anyone clicking send.

A team member picks a future moment and the broadcast sends itself then. A past time is rejected. The send stays editable and cancellable until it starts.

**Rule**
* * *
**Send time:** `send_at > now()`
A time at or before the current moment is rejected with "Choose a time in the future." Nothing is created.
* * *
**Timezone:** `display_tz = user_local`
The chosen time shows in the team member's own timezone, both while editing and in the scheduled list.
* * *

Which means that:
*   A scheduled broadcast sends with no one online at the send moment
*   A past time never creates a scheduled send
*   The team member always reads the time in their own timezone

**Checklist**
- [ ] Let the team member pick a future date and time for the send
- [ ] Send it at that moment on its own, with no one clicking send
- [ ] Reject a time in the past and ask for a future time
- [ ] Show the chosen time in the team member's own timezone
* * *

**Targeting**
* * *
**Story:** As a team member aiming a broadcast, I want to narrow a region audience by plan, tenure and activity level, so that a send reaches the members it is meant for.

Region sets the base audience; more regions widen it. Plan, tenure and activity level narrow it. An empty filter reaches everyone, exactly as today.

**Rule**
* * *
**Base audience:** `region` is a multi-select; more values widen the audience.
More regions include more members, never fewer.
* * *
**Empty filter:** `filter = empty` equals `filter = all values`
An unset filter, and a filter with every value selected, both mean everyone.
* * *

Which means that:
*   A broadcast with no filters reaches every member in the chosen regions, same as today
*   Adding a region widens the audience; adding a plan, tenure or activity filter narrows it
*   Selecting every value of a filter is the same as leaving it empty

**Checklist**
- [ ] Add targeting by region, plan, tenure and activity level, if it does not already exist
- [ ] Let the team member pick one or more regions as the base audience, widening it
- [ ] Let the team member narrow that audience by plan, tenure and activity level
- [ ] Leave every filter empty by default, so an unfiltered send reaches everyone
* * *

**Draft controls**
* * *
**Story:** As a team member, I want to save, cancel or edit a broadcast until it goes out, so that I can prepare it and fix mistakes in time.

A broadcast lives as a draft until scheduled or sent. It can be cancelled or edited right up until the send starts; editing returns it to draft. Once sending, it locks.

**Rule**
* * *
**Lock point:** `state = sending` blocks cancel and edit
A broadcast that has started sending cannot be cancelled or edited.
* * *

Which means that:
*   A draft never sends on its own
*   A cancel or edit before `sending` always succeeds and is recorded
*   Once a send starts, no change lands, and the team member sees a clear message

**Checklist**
- [ ] Save a broadcast as a draft without sending or scheduling it
- [ ] Cancel or edit a scheduled send until it starts going out
- [ ] Return an edited send to draft so the corrected version is re-submitted
- [ ] Record who cancelled or edited a send and when
- [ ] Block any change once a send has started, with a clear message
* * *
###   

### Acceptance criteria
* * *
All acceptance criteria below must be met, or discuss and rescope any that cannot be met.

1. **Schedule a send for later**
* * *
*   **Given** a broadcast with its content and audience set
*   **When** a team member picks a future date and time and submits
*   **Then** it saves as `scheduled` and goes out at that moment with no one clicking send
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

2. **Reject a send time in the past**
* * *
*   **Given** a team member picks a date and time earlier than now
*   **When** they submit
*   **Then** the form blocks it with "Choose a time in the future." and nothing is created
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

3. **Narrow a region send**
* * *
*   **Given** a send aimed at the EU region
*   **When** a team member also filters to Pro-plan members with over a year of tenure and weekly activity
*   **Then** only members who match all of those receive it
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

4. **An unfiltered send is unchanged**
* * *
*   **Given** a send aimed at a region with no extra filters
*   **When** it goes out
*   **Then** every member in that region receives it, the same as today
*   **And** selecting every value of a filter behaves the same as leaving it empty
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

5. **Cancel a scheduled send**
* * *
*   **Given** a send scheduled to go out in two hours
*   **When** a team member cancels it
*   **Then** it never goes out and the cancellation records who did it and when
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

6. **Lock a send once it is going out**
* * *
*   **Given** a send that has entered `sending`
*   **When** a team member tries to cancel or edit it
*   **Then** the action is blocked with a message that it is already on its way
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

7. **Edit a scheduled send returns it to draft**
* * *
*   **Given** a `scheduled` send
*   **When** a team member edits it before it starts
*   **Then** it returns to `draft` and the corrected version must be re-submitted to schedule again
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

### Definition of Done
* * *
Verify for every requirement above before its task closes:
- [ ] The requirement's acceptance criteria all pass against the live back office with production-shaped audience data
- [ ] Tests cover the future-time rule, the widen-not-narrow targeting semantics, the draft state machine and the sending lock; CI green
- [ ] Reviewed by a second engineer
- [ ] The scheduled-send worker fires within one minute of `send_at` under staging load
- [ ] Deployed to staging and verified with a real scheduled send and a real cancellation
