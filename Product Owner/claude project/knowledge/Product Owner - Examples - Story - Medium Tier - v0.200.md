---
title: "Product Owner - Examples - Story - Medium Tier - v0.200"
description: "Instantiates the house story shape at Medium size: three independent requirements with build checklists and numbered acceptance criteria, plus a Documentation link and one optional Rule block."
version: "0.200"
contextType: asset
---

# Story - FE - Lumen - Profile Identity Updates

> _A story is used to define product requirements, acceptance criteria, etc._
> _Use it as the foundation for Tasks that work towards fulfilling the acceptance criteria._

### About
* * *
The profile settings form lets a member update their avatar, display name and login email. Each control fails at a different point today.

**Problem**
* * *
Each profile control breaks its own promise:
*   Avatar uploads save the raw image with no cropping, so off-center photos reach other members' feeds
*   Display-name errors only surface after the member tries to save, forcing guess-and-check
*   Email changes take effect the instant they are submitted, so a stolen session can move the login email before the owner notices

**Solution**
* * *
Add three independent safeguards to the profile-settings form:
*   A crop step before an avatar saves
*   Inline live validation on the display-name field
*   An old-address confirmation gate before an email change takes effect

**User Story**
* * *
As a Lumen member:
*   I want to crop my avatar before it saves, so that my picture uses the framing I choose
*   I want display-name errors flagged as I type, so that I know immediately why a name will not save
*   I want an email change confirmed through my old address, so that my account cannot be silently redirected

**Documentation**
* * *
[Lumen Consumer App - Profile Settings Spec](https://docs.lumen.example/profile/settings)
###   

### Requirements
* * *
_Mention_ [@Owner](https://app.lumen.example/u/owner) _if design input from Product is needed_

**Avatar upload with crop**
* * *
A member expects to select a photo, adjust the crop frame, and only then save the cropped result. Today the raw upload saves immediately, so faces end up off-center or cut off.

**Checklist**
- [ ] Add a crop step between selecting a photo and saving it
- [ ] Keep the crop frame square; let the member pan and zoom but not skip it
- [ ] Reject a source image too small to produce a 256 by 256 result, before crop, with "Choose a photo at least 256 x 256 pixels."
- [ ] Save only the cropped result as the avatar
* * *

**Display-name live validation**
* * *
A member expects the field to show whether the current name is valid before they try to save. Today it accepts anything while typing and only rejects on submit.

**Rule**
* * *
**Length:** `length(trim(display_name)) = 3..30`
Leading and trailing spaces do not count. Values outside the range show "Use 3 to 30 characters."
* * *
**Allowed characters:** `^[\p{L}\p{N} _.'-]+$`
Letters, numbers, spaces, underscores, periods, apostrophes and hyphens only. Anything else shows "Use letters, numbers, spaces or . ' - _ only."
* * *

**Checklist**
- [ ] Validate the field as the member types, 250 ms after the last keystroke
- [ ] Keep the save action disabled while the field is invalid
- [ ] Show the length and character messages inline, not on submit
* * *

**Email change confirmed via old address**
* * *
A member expects that requesting a new email does not immediately change how they log in. Today the change applies the instant it is submitted.

**Checklist**
- [ ] Store the requested address as pending; do not replace the login email yet
- [ ] Send a confirmation link to the address on file, not the new one
- [ ] Apply the change only when the old address confirms within 24 hours
- [ ] Discard the pending change when the link expires, and show "This confirmation link has expired. Request a new email change."
* * *
###   

### Acceptance criteria
* * *
All acceptance criteria below must be met, or discuss and rescope any that cannot be met.

1. **Crop and save a new avatar**
* * *
*   **Given** the member uploads a `1200x1200` photo
*   **When** they adjust the crop frame and confirm
*   **Then** the cropped square image saves as their avatar at or above `256x256`
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

2. **Reject a source image too small to crop**
* * *
*   **Given** the member uploads a `200x180` photo
*   **When** the crop step checks it against the 256 by 256 minimum
*   **Then** the upload is rejected before crop with "Choose a photo at least 256 x 256 pixels." and the previous avatar stays unchanged
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

3. **Type a valid display name**
* * *
*   **Given** the display-name field is empty
*   **When** the member types `"Ana Rivera"` and pauses for `250ms`
*   **Then** the field shows a valid state and the save action becomes enabled
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

4. **Never save an invalid display name**
* * *
*   **Given** the trimmed field value has fewer than `3` or more than `30` characters, or a disallowed character
*   **When** the member attempts to submit by any path, including pressing Enter
*   **Then** submission is blocked and the inline message shows, so no invalid name reaches the save endpoint
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

5. **Confirm an email change from the old address**
* * *
*   **Given** a member requests to change their email from `ana@example.com` to `ana.rivera@example.com`
*   **When** they click the confirmation link sent to `ana@example.com` within `24h`
*   **Then** the login email updates to `ana.rivera@example.com` and the pending state clears
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

6. **Expired confirmation resets the change**
* * *
*   **Given** a pending email change was requested more than `24h` ago and never confirmed
*   **When** the member clicks the expired link, or tries to log in with the unconfirmed address
*   **Then** the pending change is discarded and the login email stays `ana@example.com`
*   **And** the page shows "This confirmation link has expired. Request a new email change."
* * *
- [ ] _Mark as done, if the criteria are met_
* * *
