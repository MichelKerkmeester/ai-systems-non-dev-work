---
title: "Product Owner - Examples - Doc - Quick - v0.100"
description: "Instantiates Doc Templates section 8, Quick document adaptation. Shows a Quick Guide that omits Before You Start and Related Guidance while keeping Overview, Process, Boundaries, the status notice, one unverified step and the full ClickUp contract."
version: "0.100"
contextType: asset
---

# Quick Guide: Rotating the Ledgerly API Signing Key

* * *
> **Status: Current behavior — verified for Ledgerly's REST API v3.** One step's response is not confirmed by the source and is marked unverified below.
* * *

## Overview
* * *

Rotating the signing key replaces the credential Ledgerly uses to verify webhook and API request signatures, without breaking active integrations. Use this guide when a key reaches its scheduled rotation date or exposure is suspected. Any workspace admin can complete it in under ten minutes.
* * *

##   

## Process
* * *

### 1\. Generate the replacement key
* * *

In **Settings → API → Signing Keys**, select **Generate new key**. Ledgerly activates the new key alongside the current one, so both verify signatures during the overlap window.
* * *

### 2\. Update the integration's stored key
* * *

Copy the new key into the integration's configuration or secret store before revoking the old one. A gap between the two steps leaves the integration unable to verify incoming signatures.
* * *

### 3\. Revoke the old key
* * *

Select **Revoke** next to the previous key once every integration confirms the switch. The source does not state whether Ledgerly retries a webhook delivery that was signed with a key revoked mid-flight, so that outcome stays unverified rather than assumed.
* * *

###   

### Boundaries
* * *

*   **Overlap window** — Both keys stay active for up to 24 hours after the new key is generated. Revoking early breaks any integration that has not switched over yet.
*   **Retry behavior** — Unverified. Confirm with Ledgerly support before relying on automatic retry for a signature made with a revoked key.
