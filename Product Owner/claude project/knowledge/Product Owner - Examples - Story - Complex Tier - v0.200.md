---
title: "Product Owner - Examples - Story - Complex Tier - v0.200"
description: "Instantiates the house story shape at Complex size: four requirements inheriting one pipeline, with the optional shared-mechanism section, one priority marker, per-requirement value lines and a Definition of Done."
version: "0.200"
contextType: asset
---

# Story - BE - Northbeam - Activity Digest Pipeline

> _A story is used to define product requirements, acceptance criteria, etc._
> _Use it as the foundation for Tasks that work towards fulfilling the acceptance criteria._

### About
* * *
Northbeam sends four kinds of activity digest by email. Each one schedules and sends on its own today, with no shared timing, cap or deduplication.

**Problem**
* * *
Every digest type runs independently:
*   A member can receive a daily summary and a mention digest twenty minutes apart, covering overlapping activity
*   Unsubscribing from one type sometimes silences all four, sometimes only one
*   When an address bounces, digests stop silently with no fallback
*   No type shares a rate limit, so a noisy day sends several emails to one inbox within the hour

**Solution**
* * *
Route all four digest types through one shared pipeline that owns send-window timing, the per-member cap, cross-digest deduplication, unsubscribe scope and bounce fallback:
*   Each type supplies only its trigger, cadence and content
*   The pipeline decides when and where a candidate can be delivered

**User Story**
* * *
As a Northbeam member:
*   I want a daily summary that recaps the day without overwhelming my inbox
*   I want a weekly roundup when daily is more than I need
*   I want mentions batched into one digest instead of an email each
*   I want a re-engagement nudge only when I have genuinely gone quiet

**Documentation**
* * *
[Northbeam Notifications - Digest Pipeline Spec](https://docs.northbeam.example/notifications/digest-pipeline)
###   

### How the digest pipeline works
* * *
Daily summary, weekly roundup, mention alert and inactivity re-engagement all create candidates for one shared pipeline. Each type decides what triggers a candidate and which content belongs to it. The pipeline decides when and where that candidate can be delivered.

For each member, the pipeline evaluates candidates against the same send window, rolling cap, deduplication ledger and subscription state. A candidate cannot bypass those checks because its type uses a different cadence. Delivery failures follow the same fallback path for every type.

**Send window and cap**
* * *
Every candidate delivers only inside the member's `send_window`, defaulted to `07:00-10:00 local`. Inside it, `digest_cap = 1 delivered digest per rolling 24h` applies across email and the in-app inbox. When candidates compete, the order is `daily_summary > mention_digest > weekly_roundup > inactivity_reengagement`. A lower-priority candidate waits for the next window after the cap clears and keeps its own content.
* * *
###   

### Requirements
* * *
_Mention_ [@Owner](https://app.northbeam.example/u/owner) _if design input from Product is needed_

**Daily summary digest** ← PRIO
* * *
**Story:** As a member who checks in most days, I want a daily summary, so that I can catch up without opening every notification one by one.

One email a day recaps activity since the last daily send. It must not send on a quiet day, and it leads the pipeline's candidate priority.

**Checklist**
- [ ] Evaluate once per calendar day inside the member's send window
- [ ] List the top 10 qualifying items since the last daily send
- [ ] Send nothing when there is no qualifying activity
- [ ] Exclude activity already delivered by another digest within the last 7 days
* * *

**Weekly roundup digest**
* * *
**Story:** As a member who finds daily emails too frequent, I want a weekly roundup, so that I still get the highlights without a message every day.

One weekly email groups the week's highlights from the same activity pool as the daily summary.

**Checklist**
- [ ] Evaluate once per week on the member's chosen send day, default Monday
- [ ] Group the top 15 items of the week by project
- [ ] Wait for the next window when daily summary is also eligible
* * *

**Mention alert digest**
* * *
**Story:** As a member who gets mentioned in comments, I want mentions batched, so that I hear about them without a separate email for each one.

Mentions in a busy thread arrive in quick succession; the batch closes after 4 hours rather than waiting for a daily or weekly cycle.

**Checklist**
- [ ] Open a 4-hour batch when the first new mention arrives
- [ ] Send one digest listing the first 20 mentions with jump-links
- [ ] State the remaining count and link to the full in-app list when the batch holds more
* * *

**Inactivity re-engagement digest**
* * *
**Story:** As a member who has gone quiet, I want a single re-engagement email once I have genuinely stopped checking in, so that I am reminded without being nagged.

The nudge sends once per continuous inactive period, with a cooldown longer than the shared cap so it does not repeat.

**Checklist**
- [ ] Trigger after 14 days since the member's last login or activity
- [ ] Send at most one re-engagement email per 30-day cooldown
- [ ] Reset the inactivity clock when the member logs back in
* * *
###   

### Acceptance criteria
* * *
All acceptance criteria below must be met, or discuss and rescope any that cannot be met.

1. **Normal daily summary**
* * *
*   **Given** a member has 6 qualifying items since their last daily send and is inside their `send_window`
*   **When** the daily evaluation pass runs
*   **Then** the digest sends listing all 6 items, under the 10-item cap
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

2. **Quiet day produces no send**
* * *
*   **Given** a member has zero qualifying items since their last daily send
*   **When** the daily evaluation pass runs
*   **Then** no digest sends for that day
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

3. **Shared cap defers a lower-priority digest**
* * *
*   **Given** a mention digest already sent within the last `24h` and 3 mentions wait in a closed batch
*   **When** a daily summary would also fire
*   **Then** the daily summary sends and the mention digest waits for the next eligible window with its 3 mentions
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

4. **Type-scoped unsubscribe**
* * *
*   **Given** the member unsubscribed from the weekly roundup type only, not all digests
*   **When** the weekly evaluation pass runs
*   **Then** no weekly roundup sends, while the other three types stay unaffected
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

5. **Bounced address falls back to the in-app inbox**
* * *
*   **Given** the member's account is marked `email_bounced = true`
*   **When** any digest evaluation pass runs
*   **Then** the content is delivered to the in-app inbox and no email attempt is made
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

6. **Re-engagement does not repeat in a cooldown**
* * *
*   **Given** a member received a re-engagement digest 20 days ago and has had no activity since
*   **When** the inactivity evaluation pass runs
*   **Then** no second re-engagement sends until the 30-day cooldown clears
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

### Definition of Done
* * *
Verify for every requirement above before its task closes:
- [ ] The requirement's acceptance criteria all pass against a live pipeline with realistic member activity
- [ ] Tests cover the send window, the shared 24h cap, the 7-day dedupe window, unsubscribe scope, bounce fallback and each type's trigger and content rule; CI green
- [ ] Reviewed by a second engineer
- [ ] A 100,000-candidate staging batch keeps p95 member evaluation at or below 2 seconds with no member receiving more than one digest
- [ ] Deployed to staging and verified with production-shaped data
