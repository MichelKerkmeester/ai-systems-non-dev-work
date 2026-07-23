---
title: "Product Owner - Examples - Doc - How It Works - v0.100"
description: "Instantiates Doc Templates section 5, Behavior Reference, at system scale with a prose-first register. A subscription billing lifecycle: states, renewal and proration, dunning retries, cancellation and pause, precedence and one unresolved edge."
version: "0.100"
contextType: asset
---

# Vantage Billing — Subscription Lifecycle

* * *
> **Source basis**
> *   **Current behavior** — The Vantage billing team verified the states, renewal, dunning and cancellation rules below against the production billing service.
> *   **Unknown** — Whether an upgrade during the dunning grace period re-charges the higher amount has no settled rule, noted in Boundaries and Exceptions.
* * *

## Overview
* * *
Vantage bills each workspace on a recurring subscription, and every workspace sits in exactly one billing state at any moment. This reference walks that lifecycle end to end: the states a subscription moves between, how a renewal charges, what the system does when a charge fails, and how a member's own actions, cancelling, pausing or changing plan, interact with the automatic billing run. Engineers read it to maintain the service; support staff read it to explain, in plain terms, why a workspace was charged, kept active, or downgraded.

The lifecycle is deliberately small. A subscription is either trialing before it has ever paid, active and paid through the current period, past due while a failed charge is being retried, paused at the member's request, or canceled. Every rule in this document is a rule about how a subscription moves between those five states, and nothing moves a subscription except the rules below.

| Concept | Business Meaning | Technical Detail |
| ---| ---| --- |
| Subscription state | Where the workspace sits in its billing life | One of `trialing`, `active`, `past_due`, `paused`, `canceled` |
| Billing period | The window a charge pays for | Bounded by `current_period_start` and `current_period_end` |
| Dunning | The retry sequence after a failed charge | Fixed retry schedule inside a grace window |
| Proration | The fair adjustment when a plan changes mid-period | Credit for unused time, charge for the new plan |
* * *

###   

### Glossary
* * *
The five states below are mutually exclusive: a subscription holds exactly one at a time, and the Behavior Rules are the only ways it moves between them.

#### States
* * *
*   **`trialing`** — The workspace is inside a free trial and no charge has been taken yet. It is fully usable, and the first charge is only attempted when the trial ends.
*   **`active`** — The most recent renewal succeeded, so the workspace is paid through the current period and has full access.
*   **`past_due`** — A renewal charge failed and the subscription is being retried inside its grace window. Access continues while the retries run.
*   **`paused`** — The member paused billing. No charges run and access is limited to read-only until the workspace resumes.
*   **`canceled`** — The subscription has ended. No further charge will ever run, and access follows the cancellation rule.
* * *

###   

### Structure or Context
* * *
Billing state lives on the subscription record, and two forces move it. A daily billing run advances renewals and steps through dunning without anyone acting, while member actions, an upgrade, a downgrade, a cancellation or a pause, apply either immediately or at the next period end depending on the rule. When the two meet in the same window, the Combinations and Precedence section decides which wins.

The payment provider, not Vantage, is the authority for whether money actually moved. The billing service marks a charge successful only after the provider confirms it, so a dispatched-but-unconfirmed charge never advances the subscription on its own. The state machine below shows the moves this reference explains.

```text
trialing ──trial ends──> active
active ──renewal ok──> active
active ──renewal fails──> past_due ──retry ok──> active
past_due ──grace expires──> canceled
active ──pause──> paused ──resume──> active
active/past_due ──cancel──> canceled
```

Every arrow is one of the rules that follow. A subscription can never skip a state, and it never sits between two.
* * *

###   

### States and Components
* * *
Each state defines what access the workspace has and what the billing run will do next. The status line records that the behavior is verified against production.

`trialing`
*   **Meaning or role** — A new workspace inside its trial window, before any money has changed hands.
*   **Verified behavior** — No invoice is created during the trial. When the run reaches `trial_end`, it attempts the first charge, moving the subscription to `active` on success or `past_due` on failure.
*   **Status** — Current behavior
* * *

`active`
*   **Meaning or role** — Paid and current for the running period, with full access to the workspace.
*   **Verified behavior** — On `current_period_end` the daily run charges the renewal. A success starts a fresh period and the state stays `active`; a failure moves it to `past_due` and opens dunning.
*   **Status** — Current behavior
* * *

`past_due`
*   **Meaning or role** — A renewal charge failed, and the subscription is being retried rather than cut off immediately.
*   **Verified behavior** — Dunning runs on the schedule in Behavior Rules, access continues through the grace window, and a single successful retry returns the subscription to `active`.
*   **Status** — Current behavior
* * *

`paused`
*   **Meaning or role** — Billing is suspended at the member's request, a deliberate hold rather than a failure.
*   **Verified behavior** — No renewal runs while paused, and access drops to read-only. Resuming returns the subscription to `active` and charging picks up at the next period.
*   **Status** — Current behavior
* * *

`canceled`
*   **Meaning or role** — The subscription has ended, whether by the member's choice or by exhausted dunning.
*   **Verified behavior** — No further charge runs. Access ends immediately or at period end, depending on which cancellation path produced the state.
*   **Status** — Current behavior
* * *

##   

## Behavior Rules
* * *
These rules are the arrows in the diagram above. Each names the condition that triggers it, the resulting move and the reason it works that way, so a reader can predict the next state from what they can observe.

### Renewal and Proration
* * *
Renewal is the engine of the lifecycle: it is the recurring charge that keeps a workspace paid, and proration is how a mid-period plan change stays fair to both sides.

**1. Period Renewal**
* * *
A subscription renews itself at the end of each period without the member acting. The daily run finds subscriptions that have reached their period boundary and charges them, and the outcome of that charge is what decides whether the workspace keeps uninterrupted access.

*   **When** — The daily run reaches a subscription's `current_period_end` while it is `active`.
*   **Then** — It charges the plan amount. On success the period rolls forward and the state stays `active`; on failure the state moves to `past_due` and dunning begins.
*   **Why** — Keeps access tied to a paid period without the member having to renew by hand each cycle.
*   **Status** — Current behavior
* * *

**2. Plan Change Proration**
* * *
When a workspace changes plan partway through a period, the system settles the difference so nobody pays twice for the same time and nobody loses time they already bought. The direction of the change decides whether that settlement happens now or at the next renewal.

*   **When** — A workspace changes plan mid-period while `active`.
*   **Then** — An upgrade takes effect immediately with a prorated charge for the rest of the period; a downgrade takes effect at the next `current_period_end`, with no charge taken now.
*   **Why** — A member pays only for what they use, and a downgrade never strips paid-for capability early.
*   **Status** — Current behavior
* * *

###   

### Dunning
* * *
Dunning is how the system treats a failed renewal as a temporary problem rather than an immediate cutoff. Most failures are expired cards or momentary insufficient funds, so the subscription is retried on a fixed schedule and access continues while those retries run.

**1. Retry Schedule**
* * *
Rather than give up on the first failure, the billing run retries the charge several times across a week, always against the workspace's current default payment method. That last detail matters: a member who updates their card mid-dunning is picked up automatically on the next scheduled retry, with no support action needed.

*   **When** — A renewal charge fails and the subscription enters `past_due`.
*   **Then** — The provider is retried on day 0, day 3, day 5 and day 7 after the failure, and access continues throughout this 7-day grace window.
*   **How** — Each retry uses the workspace's current default payment method, so an updated card is used on the next retry.
*   **Why** — Spaced retries recover most temporary failures without cutting a paying customer off early.
*   **Status** — Current behavior
* * *

**2. Grace Expiry**
* * *
The grace window has a hard end. If none of the scheduled retries succeed, the subscription cannot stay unpaid indefinitely, so it cancels once the last retry fails.

*   **When** — The day-7 retry fails and no charge has succeeded in the window.
*   **Then** — The subscription moves to `canceled` and access ends.
*   **Why** — Caps the unpaid period at seven days rather than serving an unpaid workspace without limit.
*   **Status** — Current behavior
* * *

###   

### Cancellation and Pause
* * *
Cancellation and pause are the two ways a member steps out of the normal renewal cycle. They differ in intent: a cancellation ends the subscription, while a pause is a temporary hold the member expects to lift.

**1. Cancel at Period End**
* * *
Cancelling does not cut a workspace off on the spot. Because the current period is already paid, the subscription keeps running until that period ends and only then moves to canceled, so the member loses nothing they have paid for.

*   **When** — A member cancels while `active`.
*   **Then** — The subscription stays `active` and keeps access until `current_period_end`, then moves to `canceled`, and no further renewal is attempted.
*   **Why** — The member keeps the time already paid for and is never charged again.
*   **Status** — Current behavior
* * *

**2. Pause**
* * *
A pause is a billing hold, not a way out of an unpaid charge. It suspends renewals and drops the workspace to read-only, and it is deliberately refused while a subscription still owes a failed charge.

*   **When** — A member pauses while `active`.
*   **Then** — The state moves to `paused`, no charge runs, and access becomes read-only until the workspace resumes.
*   **How** — Pause is rejected while a subscription is `past_due`; the outstanding charge must clear first.
*   **Why** — Pause should never become a way to sit on an unpaid balance.
*   **Status** — Current behavior
* * *

##   

## Combinations and Precedence
* * *
The automatic billing run and a member's actions can land in the same window, and when they do, one has to win cleanly. The table below records how the common collisions resolve, so nobody has to guess whether a cancellation or a retry takes effect first.

| Conditions | Outcome | Authority or status |
| ---| ---| --- |
| Cancel requested while `past_due` | Cancellation wins: dunning stops and the subscription cancels at period end | Current behavior |
| A retry succeeds during the grace window | The subscription returns to `active` and dunning stops for that cycle | Current behavior |
| Plan change requested while `past_due` | The change is blocked until the outstanding charge clears | Current behavior |
| Pause requested while `past_due` | The pause is rejected; the failed charge must clear first | Current behavior |
* * *

###   

### Examples
* * *
Three worked cases show the rules in motion, from the ordinary renewal to a recovery in dunning and a cancellation during the trial.

#### Ordinary Renewal
* * *
*   **Given** — An `active` workspace on the Team plan reaches `current_period_end`.
*   **When** — The daily billing run charges the renewal and the provider approves it.
*   **Then** — A new period starts, an invoice is recorded and the state stays `active`.
* * *

####   

#### Recovery During Dunning
* * *
*   **Given** — A renewal charge failed on an expired card and the subscription is `past_due`.
*   **When** — The member updates the card and the day-3 retry runs.
*   **Then** — The charge succeeds, the subscription returns to `active` and no further retries run for that cycle.
* * *

####   

#### Cancel During a Trial
* * *
*   **Given** — A `trialing` workspace three days before `trial_end`.
*   **When** — The member cancels.
*   **Then** — The subscription moves to `canceled` at `trial_end`, no first charge is attempted and no invoice is created.
* * *

###   

### Boundaries and Exceptions
* * *
A few behaviors sit at the edge of the rules above and are easy to assume wrongly. Each is stated here so a reader does not infer a refund, a charge or a resolution that the system does not actually make.

*   **No partial-period refund on downgrade** — A downgrade never issues a mid-period refund. It takes effect at the next renewal, and immediate credit applies only to an upgrade's proration.
*   **Provider is the charge authority** — The billing service records a charge as successful only after the provider confirms it, never on request dispatch alone, so a pending charge does not advance the subscription.
*   **Unresolved** — When a workspace upgrades while `past_due` inside the grace window, no settled rule says whether dunning should re-run against the higher upgraded amount or keep retrying the original failed amount. Engineering is tracking this edge as an open decision.
* * *

###   

### Related References
* * *
*   [Vantage Billing — Invoice and Proration Formulas](https://docs.vantage.example/billing/proration)
*   [Vantage Billing — Payment Method Management](https://docs.vantage.example/billing/payment-methods)
