---
title: "Product Owner - Examples - Task - Standard Feature - v0.100"
description: "Instantiates Task Templates section 3, Parent Task. Shows shared feature scope stated once while independent child tasks carry their own detail."
version: "0.100"
contextType: asset
---

# Save and manage filter presets on the Vantage Analytics dashboard

### About

---

Vantage Analytics users rebuild the same filter combinations every time they open the Traffic Overview dashboard. This parent task coordinates the child work needed to save the current `Date range`, `Compare with`, `Channel`, `Country`, `Device` and `Campaign` values as one preset, manage saved presets and open the report with one personal default.

The first version covers presets owned by one user on the Traffic Overview report. Preset sharing, cross-report copying, organization-managed presets and new filter types are out of scope. The child tasks below own their behavior and acceptance checks. This parent holds only the shared feature boundary and delivery order.

**References**

---

Flows

- [Save and apply filter preset](figma-url)

Page

- [Traffic Overview dashboard](figma-url)

Components

- [Filter preset dropdown](figma-url)

**Epic**

---

- `Dashboard personalization`

### Requirements

---

1.  **Save and name the current filter combination**

---

[VA-241 - Save a filter preset](https://app.vantage.example/t/VA-241)

2.  **Rename and delete saved presets**

---

[VA-242 - Manage saved filter presets](https://app.vantage.example/t/VA-242)

3.  **Apply a preset and restore all six filter values**

---

[VA-243 - Apply a saved filter preset](https://app.vantage.example/t/VA-243)

4.  **Set one personal default and handle no-presets fallback**

---

[VA-244 - Default filter preset and empty state](https://app.vantage.example/t/VA-244)
