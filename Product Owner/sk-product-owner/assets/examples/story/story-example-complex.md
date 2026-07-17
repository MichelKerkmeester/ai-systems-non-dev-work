---
title: "Product Owner - Examples - Story - Complex Tier - v0.100"
description: "Instantiates Story Templates section 5, Complex tier. Shows four requirements inheriting one pipeline, exactly one priority marker and an honestly incomplete Definition of Ready that blocks sprint entry."
version: "0.100"
contextType: asset
---

# Story - Northbeam Notifications - Activity Digest - Email Pipeline

## Overview
* * *
**User Story**
As a Northbeam member, I want activity digest emails that respect my time and my inbox:
*   Daily summary should recap the day's activity without overwhelming my inbox
*   Weekly roundup should give me the week's highlights when daily is more than I need
*   Mention alert digest should tell me when I've been mentioned without a separate email per mention
*   Inactivity re-engagement should nudge me back only when I've genuinely gone quiet

**Problem**
Every digest type currently schedules and sends on its own:
*   A member can receive a daily summary and a mention digest twenty minutes apart, covering overlapping activity
*   Unsubscribing from one digest type is inconsistent. Some paths silence all four while others silence only the selected type
*   When a member's email bounces, digests silently stop with no fallback, so the member never learns what they missed
*   None of the four types share a rate limit, so a noisy day can trigger several emails to the same inbox within the hour

**Solution**
Route all four digest types through one shared pipeline that owns send-window timing, the per-member cap, cross-digest deduplication, unsubscribe scope and bounce fallback. Each digest type supplies only its trigger, cadence and content rules.

**Documentation**
[Northbeam Notifications - Digest Pipeline Spec](https://docs.northbeam.example/notifications/digest-pipeline)
##   

## How the digest pipeline works
* * *
Daily summary, weekly roundup, mention alert and inactivity re-engagement all create candidates for one shared pipeline. Each type decides what triggers a candidate and which content belongs to it. The pipeline decides when and where that candidate can be delivered.

For each member, the pipeline evaluates eligible candidates against the same send window, rolling cap, deduplication ledger and subscription state. A candidate cannot bypass those checks because its type uses a different cadence. Delivery failures follow the same fallback path for every type.

**Send window & cadence**
* * *
Every candidate can deliver only inside the member's `send_window`, derived from the profile timezone and defaulted to `07:00-10:00 local`. Inside that window, `digest_cap = 1 delivered digest per rolling 24h` applies across email and the in-app inbox. When candidates compete, the order is `daily_summary > mention_digest > weekly_roundup > inactivity_reengagement`.

A lower-priority candidate waits for the first evaluation in the next send window after the rolling cap clears. Its content remains attached to that digest type and is rechecked against the type's own content rules before delivery. Deferred daily content never turns into a weekly roundup or mention digest.
* * *

**Unsubscribe scope & bounce fallback**
* * *
Unsubscribing is scoped to one digest type unless the member chooses `unsubscribe_scope = all_digests`. That token suppresses all four types in email and the in-app inbox. A type-specific opt-out leaves the other three types eligible.

The pipeline records delivered activity IDs for `dedupe_window = 7d`. An item sent in a mention digest does not appear again in a daily summary or weekly roundup during that window. If email bounces, the pipeline delivers the same digest to the in-app inbox, marks `email_bounced = true` and counts that fallback against the shared cap. It skips later email attempts until the member confirms or replaces the address.
* * *
###   

### Definition of Ready
* * *
Check off each gate. Pull requirements into a sprint only when every box is checked:
*   [x] Every requirement's Story line is written in the Connextra form with a clear value clause
*   [x] Acceptance criteria present and testable for every requirement
*   [x] Dependencies identified (the transactional-email sender, in-app inbox service and profile timezone field are live, while the shared pipeline is in scope for this story)
*   [ ] Sized by the team and each requirement fits comfortably in a sprint
##   

## Requirements
* * *
1\. **Daily summary digest** ← PRIO
`(digest_type: daily_summary)`
* * *
**Task(s):** [NB-3301 - Daily summary digest](https://app.northbeam.example/t/NB-3301)
* * *
**Story:** As a Northbeam member who checks in most days, I want a daily summary digest,
so that I can catch up on the day's activity without opening every notification one by one.

A member expects one email a day that recaps activity since the last daily send. It must not send on a quiet day or repeat activity covered by a recent mention digest. Daily summary leads the pipeline's candidate priority.

**Send window & cadence**
* * *
**Trigger:** `digest_type = daily_summary`
Evaluated once per calendar day against the member's `send_window`.
* * *
**Cadence:** `cadence = daily`, subject to the shared `digest_cap = 1 per 24h`
Daily summary competes for the shared cap like every other type. It wins the window when a lower-priority candidate is also eligible.
* * *
**Content rule:** `content_cap = 10 items`, `skip_if_empty = true`
Lists the top 10 items of qualifying activity since the last daily send. No candidate is created when there is no qualifying activity.
* * *

Which means that:
*   A member never receives an empty daily summary
*   Activity delivered by another digest within `dedupe_window = 7d` does not appear again
*   Content beyond the top 10 items stays in-app instead of crowding the email

**Acceptance criteria**

**Scenario:** Member receives a normal daily summary
*   **Given** a member has 6 qualifying activity items since their last daily send and is inside their `send_window`
*   **When** the daily evaluation pass runs
*   **Then** the digest sends listing all 6 items, under the `content_cap = 10` limit

**Scenario:** Quiet day produces no send
*   **Given** a member has zero qualifying activity items since their last daily send
*   **When** the daily evaluation pass runs
*   **Then** `skip_if_empty` applies and no digest sends for that day

**Scenario:** Shared cap already used by another digest type
*   **Given** a mention alert digest already sent to the member within the last `24h`
*   **When** the daily evaluation pass would also fire
*   **Then** the daily summary waits for the first eligible send window after the cap clears, keeps its daily content and does not stack a second delivery inside `24h`
* * *

2\. **Weekly roundup digest**
`(digest_type: weekly_roundup)`
* * *
**Task(s):** [NB-3302 - Weekly roundup digest](https://app.northbeam.example/t/NB-3302)
* * *
**Story:** As a Northbeam member who finds daily emails too frequent, I want a weekly roundup digest,
so that I still get the highlights without a message every day.

A member who prefers a lighter cadence expects one weekly email with highlights, not every individual item. The roundup uses the same activity pool as the daily summary and groups a week of highlights.

**Send window & cadence**
* * *
**Trigger:** `digest_type = weekly_roundup`
Evaluated once per week, on the member's chosen send day, default `Monday`.
* * *
**Cadence:** `cadence = weekly`, subject to the shared `digest_cap = 1 per 24h`
When weekly roundup and daily summary are both eligible, daily summary sends first and weekly roundup waits for its next eligible window.
* * *
**Content rule:** `content_cap = 15 items`, grouped into a highlights section
Surfaces the top 15 items of the week, grouped by project instead of chronologically.
* * *

Which means that:
*   A member who unsubscribes from weekly roundup keeps receiving the other three digest types unaffected
*   A bounced address receives weekly content in the in-app inbox instead
*   The roundup excludes activity delivered by any digest within `dedupe_window = 7d`

**Acceptance criteria**

**Scenario:** Member receives a normal weekly roundup
*   **Given** a member has 12 qualifying items across the week and their send day arrives inside their `send_window`
*   **When** the weekly evaluation pass runs
*   **Then** the digest sends with the week's highlights grouped by project, under the `content_cap = 15` limit

**Scenario:** Member unsubscribed from this digest type only
*   **Given** the member set `unsubscribe_scope` to the weekly roundup type specifically, not `all_digests`
*   **When** the weekly evaluation pass runs
*   **Then** no weekly roundup sends for that member, while daily summary, mention alert and inactivity re-engagement remain unaffected

**Scenario:** Member's email previously bounced
*   **Given** the member's account is marked `email_bounced = true` from an earlier send failure
*   **When** the weekly evaluation pass runs
*   **Then** the roundup content is delivered to the in-app inbox and no email attempt is made
* * *

3\. **Mention alert digest**
`(digest_type: mention_digest)`
* * *
**Task(s):** [NB-3303 - Mention alert digest](https://app.northbeam.example/t/NB-3303)
* * *
**Story:** As a Northbeam member who gets mentioned in comments, I want mentions batched into one digest,
so that I hear about being mentioned without a separate email landing for every single one.

A member expects mentions in one grouped email because a busy thread can produce several in quick succession. The batch closes after 4 hours and does not wait for the member's daily or weekly cycle.

**Send window & cadence**
* * *
**Trigger:** `digest_type = mention_digest`
Evaluated whenever at least one new mention has arrived since the last mention send.
* * *
**Cadence:** `mention_batch = 4h`, subject to the shared `send_window` and `digest_cap = 1 per 24h`
Mentions arriving within a rolling 4-hour window create one candidate when the window closes. A batch that closes outside the send window waits for the next send window.
* * *
**Content rule:** `content_cap = 20 mentions`, then `remaining_count` with one "View all mentions" link
Lists the first 20 mentions with jump-links. If the batch contains more, the digest states the remaining count and links to the complete in-app list.
* * *

Which means that:
*   No individual mention triggers its own separate email
*   A mention that arrives while the shared cap is already used is deferred, not dropped
*   `unsubscribe_scope = all_digests` suppresses mention alerts in both email and the in-app inbox

**Acceptance criteria**

**Scenario:** Member receives a batched mention digest
*   **Given** 3 mentions arrive for a member within a rolling `mention_batch = 4h` window
*   **When** the batch window closes
*   **Then** one digest sends inside the member's next eligible send window and lists all 3 mentions with jump-links

**Scenario:** Mention batch collides with the shared send cap
*   **Given** a daily summary sent within the last `24h` and 3 mentions are waiting in a closed batch
*   **When** the rolling cap clears and the member's next `send_window` opens
*   **Then** one mention digest sends with all 3 queued mentions and their jump-links

**Scenario:** Member opted out of all digests
*   **Given** the member set `unsubscribe_scope = all_digests`
*   **When** new mentions arrive and a batch window closes
*   **Then** no mention digest reaches email or the in-app inbox until the member changes their unsubscribe scope
* * *

4\. **Inactivity re-engagement digest**
`(digest_type: inactivity_reengagement)`
* * *
**Task(s):** [NB-3304 - Inactivity re-engagement digest](https://app.northbeam.example/t/NB-3304)
* * *
**Story:** As a Northbeam member who has gone quiet, I want a single re-engagement email once I've genuinely stopped checking in,
so that I'm reminded of what changed without being nagged during a busy week.

A member who hasn't logged in for a real stretch of time expects one reminder of what they've missed, not a repeating drumbeat of emails. Because this digest exists specifically to interrupt inactivity, its own cooldown is longer than the shared 24-hour cap so it doesn't repeat every time the member stays away.

**Send window & cadence**
* * *
**Trigger:** `inactivity_threshold = 14d` since `max(last_login_at, last_activity_at)` and `reengagement_sent_for_current_inactivity = false`.
* * *
**Cadence:** `reengagement_cooldown = 30d`, on top of the shared `digest_cap = 1 per 24h`
After one re-engagement send, `reengagement_sent_for_current_inactivity` becomes `true`. No second reminder sends during the same continuous inactive period. New login or in-app activity resets the flag, but a new inactivity episode still cannot send within 30 days of the previous reminder.
* * *
**Content rule:** `content_cap = 5 highlights` since `max(last_login_at, last_activity_at)`, followed by the "Open Northbeam" action.
* * *

Which means that:
*   A member never receives more than one re-engagement email per `reengagement_cooldown = 30d` window
*   Continuous inactivity produces one reminder, even after the 30-day cooldown expires
*   Logging back in resets the inactivity clock and allows a future inactivity episode to qualify after the cooldown
*   A bounced address receives the content in the in-app inbox, where it waits for the member's next visit

**Acceptance criteria**

**Scenario:** Member crosses the inactivity threshold
*   **Given** a member's latest login or in-app activity was 15 days ago, `reengagement_sent_for_current_inactivity = false`, no re-engagement digest sent in the last `30d`, the shared cap is free and the member is inside their `send_window`
*   **When** the inactivity evaluation pass runs
*   **Then** one re-engagement digest sends up to 5 highlights and the "Open Northbeam" action

**Scenario:** Continuous inactivity does not repeat after the cooldown
*   **Given** a member received a re-engagement digest 31 days ago, has had no login or in-app activity since and `reengagement_sent_for_current_inactivity = true`
*   **When** the inactivity evaluation pass runs again
*   **Then** no second digest sends even though `reengagement_cooldown = 30d` has elapsed

**Scenario:** Delivery fails on an inactive member's stale address
*   **Given** the re-engagement digest attempts to send and the member's registered address bounces
*   **When** the pipeline processes the bounce
*   **Then** the pipeline marks `email_bounced = true`, delivers the content to the in-app inbox instead and does not retry the email address silently
* * *
##   

## Definition of Done
* * *
Verify for every requirement above before its task closes:
*   [ ] The requirement's acceptance criteria all pass against a live pipeline with realistic member activity data
*   [ ] Unit and integration tests added covering the send window, shared `digest_cap = 1 per 24h`, `dedupe_window = 7d`, unsubscribe scope, bounce fallback and each digest type's trigger and content rule with CI green
*   [ ] Reviewed by a second engineer
*   [ ] A 100,000-candidate staging batch completes with p95 member evaluation at or below 2 seconds and no member receives more than one digest
*   [ ] Deployed to staging and verified with production-shaped data
