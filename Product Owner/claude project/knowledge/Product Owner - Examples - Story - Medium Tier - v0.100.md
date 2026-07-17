---
title: "Product Owner - Examples - Story - Medium Tier - v0.100"
description: "Instantiates Story Templates section 4, Medium tier. Shows three independent requirements with self-contained rules and scenarios and an honestly unchecked sizing gate."
version: "0.100"
contextType: asset
---

# Story - Lumen Consumer App - Profile Settings - Identity Updates

## Overview
* * *
**User Story**
As a Lumen member, I want to update my profile identity safely:
*   Avatar upload should let me crop my photo before it saves
*   Display name should catch invalid names as I type, not after I try to save
*   Email change should require confirmation from my old address before it takes effect

**Problem**
Each profile control fails at a different point:
*   Avatar uploads save the raw image with no cropping, so off-center or oddly framed photos go straight to other members' feeds
*   Display-name errors only surface after the member tries to save, forcing a guess-and-check loop on every attempt
*   Email changes take effect when submitted, so a stolen session or mistyped address can replace the login email before the owner can stop it

**Solution**
Add three independent safeguards to the profile-settings form: a crop step before avatar save, inline live validation on the display-name field and an old-address confirmation gate before an email change takes effect.

**Documentation**
[Lumen Consumer App - Profile Settings Spec](https://docs.lumen.example/profile/settings)
###   

### Definition of Ready
* * *
Check off each gate. Pull requirements into a sprint only when every box is checked:
*   [x] Every requirement's Story line is written in the Connextra form with a clear value clause
*   [x] Acceptance criteria present and testable for every requirement
*   [x] Dependencies identified (the avatar-upload endpoint, email-change endpoint and transactional-email sender are live)
*   [ ] Sized by the team and each requirement fits comfortably in a sprint
##   

## Requirements
* * *
1\. **Avatar upload with crop**
`(POST /api/profile/avatar)`
* * *
**Task(s):** [LM-2210 - Avatar crop before save](https://app.lumen.example/t/LM-2210)
* * *
**Story:** As a Lumen member updating my avatar, I want to crop my photo before it saves,
so that my profile picture uses the framing I choose instead of the raw upload's automatic framing.

A member expects to select a photo, adjust the crop frame and only then save the cropped result as their avatar. Today the raw upload saves immediately with no framing step, so members end up with off-center faces or partially cut-off photos.

**Rule**
* * *
**Crop shape:** `aspect_ratio = 1:1`
The crop frame stays square. The member can pan and zoom inside it but cannot distort or skip it.
* * *
**Minimum output:** `min_output = 256x256`
The cropped result must resolve to at least 256 by 256 pixels. A source image too small to meet that at 1:1 is rejected before crop with "Choose a photo at least 256 x 256 pixels."
* * *

Which means that:
*   No avatar ever saves without passing through the crop step first
*   A source image too small for the minimum output is rejected with a clear message instead of saving a blurry result
*   The member can pan, zoom or cancel before confirming. Only confirmation saves a new avatar

**Acceptance criteria**

**Scenario:** Member crops and saves a new avatar
*   **Given** the member uploads a `1200x1200` photo
*   **When** they adjust the crop frame and confirm
*   **Then** the cropped square image saves as their avatar at or above `256x256`

**Scenario:** Source image is too small to crop
*   **Given** the member uploads a `200x180` photo
*   **When** the crop step checks it against `min_output = 256x256`
*   **Then** the upload is rejected before crop with "Choose a photo at least 256 x 256 pixels." and the previous avatar remains unchanged

**Scenario:** Member abandons the crop step
*   **Given** the member opens the crop frame but closes the dialog without confirming
*   **When** the dialog closes
*   **Then** no avatar is saved and the member's existing avatar remains exactly as it was
* * *

2\. **Display-name live validation**
`(field: display_name)`
* * *
**Task(s):** [LM-2211 - Live validation on display name](https://app.lumen.example/t/LM-2211)
* * *
**Story:** As a Lumen member editing my display name, I want invalid names flagged as I type,
so that I know immediately why a name won't save instead of finding out only after I hit submit.

A member expects the display-name field to show whether their current input is valid before they ever try to save. Today the field accepts anything while typing and only rejects on submit, so members repeatedly retype names to find the one character causing the failure.

**Rule**
* * *
**Length:** `length(trim(display_name)) = 3..30 Unicode code points`
Leading and trailing spaces do not count. Values outside the range show "Use 3 to 30 characters."
* * *
**Allowed characters:** `^[\p{L}\p{N} _.'-]+$`
Letters, numbers, spaces, underscores, periods, apostrophes and hyphens are allowed. Any other character shows "Use letters, numbers, spaces or . ' - _ only."
* * *
**Feedback delay:** `debounce = 250ms`
Validation runs 250 milliseconds after the last keystroke, avoiding an error between keystrokes.
* * *

Which means that:
*   The member always knows before saving whether the current name would be accepted
*   The save action stays disabled while the field is in an invalid state
*   A name that briefly dips below 3 characters mid-edit is not flagged until typing pauses

**Acceptance criteria**

**Scenario:** Member types a valid name
*   **Given** the display-name field is empty
*   **When** the member types `"Ana Rivera"` and pauses for `250ms`
*   **Then** the field shows a valid state and the save action becomes enabled

**Scenario:** Member types a name with a disallowed character
*   **Given** the display-name field is empty
*   **When** the member types `"Ana@Rivera"` and pauses for `250ms`
*   **Then** the field shows "Use letters, numbers, spaces or . ' - _ only." and the save action stays disabled

**Scenario:** Member never manages to save an invalid name
*   **Given** the trimmed field value contains fewer than `3` or more than `30` Unicode code points
*   **When** the member attempts to submit the form by any path, including pressing Enter
*   **Then** the submission is blocked and the same inline error is shown, so no invalid name ever reaches the save endpoint
* * *

3\. **Email change requires old-address confirmation**
`(POST /api/profile/email/change)`
* * *
**Task(s):** [LM-2212 - Confirm email change via old address](https://app.lumen.example/t/LM-2212)
* * *
**Story:** As a Lumen member changing my email, I want the change confirmed through my old address first,
so that my account can't be silently redirected to an address I didn't intend or don't control.

A member expects that requesting a new email address doesn't immediately change how they log in. Today the change applies the instant it's submitted, so a stolen session or a typo can move the login email before the real owner notices.

**Rule**
* * *
**Pending state:** `status = pending_confirmation`
The requested new address is stored as pending and does not replace the login email yet.
* * *
**Confirmation channel:** `sent_to = old_address`
A confirmation link is sent to the address on file before the change, not the new one.
* * *
**Link expiry:** `confirmation_expiry = 24h`
The confirmation link expires after 24 hours. An expired link discards the pending change and shows "This confirmation link has expired. Request a new email change."
* * *

Which means that:
*   The login email never changes until the old address confirms it
*   An expired confirmation window is a full reset, not a silent retry
*   A member who never received or clicked the link keeps logging in with their original address, unaffected

**Acceptance criteria**

**Scenario:** Member confirms an email change from the old address
*   **Given** a member requests to change their email from `ana@example.com` to `ana.rivera@example.com`
*   **When** they click the confirmation link sent to `ana@example.com` within `24h`
*   **Then** the login email updates to `ana.rivera@example.com` and the pending state clears

**Scenario:** Confirmation link expires before it's used
*   **Given** a pending email change was requested more than `24h` ago and never confirmed
*   **When** the member clicks the expired link, or attempts to log in with the unconfirmed address
*   **Then** the pending change is discarded, the login email remains `ana@example.com` and the page shows "This confirmation link has expired. Request a new email change."

**Scenario:** No email change ever bypasses the old-address gate
*   **Given** a pending email change exists for a member's account
*   **When** any process other than a click on the link sent to the old address attempts to complete it
*   **Then** the login email stays exactly as it was before the request, with no path that updates it without that confirmation
* * *
##   

## Definition of Done
* * *
Verify for every requirement above before its task closes:
*   [ ] The requirement's acceptance criteria all pass against a live account with realistic profile data
*   [ ] Unit and integration tests added covering crop and minimum output, length and character validation, debounce timing, pending state and expiry with CI green
*   [ ] Reviewed by a second engineer
*   [ ] Accessibility verified on the crop dialog and the display-name inline error states
*   [ ] Deployed to staging and verified with production-shaped data
