---
title: "Product Owner - Examples - Doc - README - v0.100"
description: "Instantiates Doc Templates section 7, Narrative overview, as a folder README. Open this example when authoring a working-folder README that must orient a newcomer in one screen, earn a reading map instead of listing files, and keep one honestly open question visible."
version: "0.100"
contextType: asset
---

# Ledgerly Payments: Payout Integration Working Docs

* * *
> **Status: Mixed.** The diagnosis and decision record below are verified current state as of the dates named inside them. The refund exposure named in Where Things Stand is unverified pending Finance's audit.
* * *

This folder holds the working documents for Ledgerly's Meridian Pay integration: the double-payout diagnosis, the on-call runbook, the idempotency-key decision record and the evidence exports each one draws on. It exists because the incident spans several weeks and more than one owner, and nobody arriving in week three should have to rebuild the story from Slack threads.

Some users received the same reimbursement payout twice during a Meridian outage window in mid-June 2026. Engineering has confirmed why that happened and recorded the forward fix. What is still open is the money question: how many users and how far back the exposure runs, which is Finance's live audit, not a settled number yet.

As of today, the root cause is confirmed and written down, the runbook is live for on-call and the fix is decided but not yet merged.
##   

## How the Double Payouts Surfaced
* * *

Support first flagged duplicate reimbursement emails on June 14, when a handful of users reported the same expense report paid out twice. The first hypothesis was a double form submission on the client, a natural read given the symptom, but it was a dead end: the request logs showed one submission per report, matched to two separate payout records on Ledgerly's side.

Pulling Meridian's webhook logs on June 17 found the real cause. Meridian resent its `payout.succeeded` event for the same transaction after a twelve-minute delivery outage, and Ledgerly's webhook handler treated every delivery as a new payout instead of checking whether that transaction id had already been recorded. The diagnosis went into `diagnosis-double-payout.md` on June 18. The decision to fix it with idempotency keys, rather than a dedup pass after the fact, followed on June 22.
* * *

##   

## Where Things Stand
* * *

The diagnosis is settled and the runbook has already carried on-call through two recurrences without a customer-visible delay. The decision record locks in the forward fix. What remains is implementation and the backward-looking question Finance owns.

*   **Root cause** — confirmed: the webhook handler has no idempotency check against Meridian's event id.
*   **Forward fix** — decided: key processing on Meridian's event id, recorded in `decision-idempotency-keys.md`.
*   **Runbook** — live: on-call has used the manual reconciliation step twice since it shipped.
* * *

##   

## What Happens Next
* * *

Two threads stay open. One is engineering merging the decided fix so the runbook's manual step can retire. The other is Finance's audit, which is why this folder cannot yet say how many users were affected or what the total refund comes to.

*   [ ] Merge the idempotency-key change against `decision-idempotency-keys.md` and retire the runbook's manual step once it ships.
*   [ ] Close Finance's ledger audit to establish how far back the exposure reaches. The affected user count and refund total are genuinely unknown until that audit lands, not just unpublished.
*   [ ] Confirm with Support before drafting any customer-facing notice, since the refund total isn't final yet.
###   

### Reading Map
* * *

Open these in order. Each one assumes you already read the ones before it.

*   [`diagnosis-double-payout.md`](diagnosis-double-payout.md) — start here for the root cause narrative and the specific event ids involved.
*   [`runbook-payout-reconciliation.md`](runbook-payout-reconciliation.md) — read next if you're on call today and need to manually reconcile a duplicate payout.
*   [`decision-idempotency-keys.md`](decision-idempotency-keys.md) — the forward-fix decision, its owner and why a post-hoc dedup pass was rejected.
*   [`evidence/webhook-payloads/`](evidence/webhook-payloads/) — the raw captured Meridian payloads behind the diagnosis. Open only to verify a specific event id.
*   [`evidence/payout-ledger-exports/`](evidence/payout-ledger-exports/) — the ledger rows Finance is auditing against for the open exposure question.
