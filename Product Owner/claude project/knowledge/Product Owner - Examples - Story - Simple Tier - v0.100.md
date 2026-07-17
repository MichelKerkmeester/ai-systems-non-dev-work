---
title: "Product Owner - Examples - Story - Simple Tier - v0.100"
description: "Instantiates Story Templates section 3, Simple tier. Shows one compact requirement with paired validation boundaries and a one-line Readiness gate that honestly blocks sprint entry on incomplete sizing."
version: "0.100"
contextType: asset
---

# Story - Fieldstack Workspace - Project Header - Inline Rename

## Overview
* * *
**Story:** As a workspace member, I want to rename a project directly from its header, so that I can fix a typo or update its name without leaving the project view.

**Problem:** Renaming a project requires opening Settings from the project menu. A member leaves the project view to correct even one character.

**Solution:** Turn the project title in the header into an inline editable field that saves automatically when the member clicks away.

**Documentation:** [Fieldstack Workspace - Project Header Spec](https://docs.fieldstack.example/workspace/project-header)

**Readiness:** Story line and acceptance criteria below are written and testable. The project-rename API endpoint is live. Team sizing is not complete, so this story is not sprint-ready.
* * *

### Requirement
* * *
1\. **Inline project rename from the header**
`(PATCH /api/projects/{id}/name)`
* * *
**Task(s):** [FS-1042 - Inline rename from project header](https://app.fieldstack.example/t/FS-1042)
* * *
A member expects the header title to become editable on click and save on blur. Invalid input must leave the last saved project name unchanged and explain what to correct.

**Rule**
* * *
**Length:** `max_length = 60`
Names longer than 60 characters are rejected. The field keeps the attempted text, returns focus and shows "Use 60 characters or fewer."
* * *
**Empty:** `min_length = 1 (trimmed)`
A name that is empty after trimming is rejected. The field restores the last saved name and shows "Project name can't be empty."
* * *
**Save trigger:** `on blur`
The name saves the moment the field loses focus. There is no separate save button.
* * *

Which means that:
*   A rejected edit never replaces the project's last valid saved name on this header or any other project surface

**Acceptance criteria**

**Scenario:** Member renames the project successfully
*   **Given** the project header shows `"Q3 Launch"` and the member clicks into it
*   **When** they replace it with `"Q3 Launch - Revised"` and click elsewhere on the page
*   **Then** the field sends `"Q3 Launch - Revised"` on blur and the header shows that name after the endpoint accepts it

**Scenario:** Invalid name leaves the saved project name intact
*   **Given** the last saved name is `"Q3 Launch"` and the member enters only spaces or a `61`-character name
*   **When** the field loses focus
*   **Then** no invalid value is persisted and every non-editing project surface still shows `"Q3 Launch"`
*   **And** spaces restore `"Q3 Launch"` with "Project name can't be empty." while a `61`-character value remains editable with "Use 60 characters or fewer."
* * *

### Definition of Done
* * *
Verify before the task closes:
*   [ ] The acceptance criteria pass against a live project with a realistic name history
*   [ ] Tests added covering the `max_length = 60` rule, empty-name rejection and blur-triggered save with CI green
*   [ ] Reviewed by a second engineer
*   [ ] Deployed to staging and verified with production-shaped data
