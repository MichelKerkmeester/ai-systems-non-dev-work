---
title: "Product Owner - Examples - Story - Simple Tier - v0.200"
description: "Instantiates the house story shape at Simple size: one requirement with a build checklist and two numbered Given/When/Then acceptance criteria with Mark-as-done, no optional enrichments."
version: "0.200"
contextType: asset
---

# Story - FE - Fieldstack - Inline Project Rename

> _A story is used to define product requirements, acceptance criteria, etc._
> _Use it as the foundation for Tasks that work towards fulfilling the acceptance criteria._

### About
* * *
The project title sits in the project header. Renaming a project today means leaving the project view for Settings.

**Problem**
* * *
Members leave the project view to correct even one character:
*   The header title is read-only
*   Rename lives in Settings, two clicks away from where the name is shown

**Solution**
* * *
Make the header title an inline editable field that saves when the member clicks away:
*   Click the title to edit in place
*   Save on blur, with no separate save button

**User Story**
* * *
As a workspace member:
*   I want to rename a project from its header, so that I can fix a typo without leaving the project view
* * *
###   

### Requirements
* * *
**Inline rename from the header**
* * *
The header title becomes editable on click and saves on blur. Invalid input leaves the last saved name unchanged and explains what to correct.

**Checklist**
- [ ] Make the header title editable on click
- [ ] Save the new name on blur, with no separate save button
- [ ] Reject a name longer than 60 characters, keep the attempted text, and show "Use 60 characters or fewer."
- [ ] Reject an empty or spaces-only name, restore the last saved name, and show "Project name can't be empty."
* * *
###   

### Acceptance criteria
* * *
All acceptance criteria below must be met, or discuss and rescope any that cannot be met.

1. **Rename a project successfully**
* * *
*   **Given** the project header shows `"Q3 Launch"` and the member clicks into it
*   **When** they replace it with `"Q3 Launch - Revised"` and click elsewhere on the page
*   **Then** the name saves on blur and the header shows `"Q3 Launch - Revised"`
* * *
- [ ] _Mark as done, if the criteria are met_
* * *

2. **Invalid name leaves the saved name intact**
* * *
*   **Given** the last saved name is `"Q3 Launch"`
*   **When** the member enters only spaces, or a 61-character name, and the field loses focus
*   **Then** no invalid value is saved and every project surface still shows `"Q3 Launch"`
*   **And** spaces show "Project name can't be empty." while the 61-character value stays editable with "Use 60 characters or fewer."
* * *
- [ ] _Mark as done, if the criteria are met_
* * *
