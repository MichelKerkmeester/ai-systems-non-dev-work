---
title: "Product Owner - Examples - Task - UI Refinement - v0.100"
description: "Instantiates Task Templates section 2, Canonical Task. Shows design-parity work scoped with no functional change and cross-device accessibility verification."
version: "0.100"
contextType: asset
---

# Align the Meridian settings screen with the current design reference

### About

---

A design audit of the Meridian mobile app found that the shipped settings screen has drifted from design reference v3. The screen still uses the earlier 12pt section gap, full-width dividers and 20x20 leading icons while newer settings surfaces use the current tokens.

Match design reference v3 on iOS and Android. Keep every label, row, navigation target, toggle, permission rule and analytics event unchanged.

**References**

---

Page

- [Settings screen, design reference v3](figma-url)

Components

- [Settings row component](figma-url)
- [Settings section header component](figma-url)

### Requirements

---

### **Spacing**

---

1.  **Match section and row spacing to the design tokens**

---

Replace the earlier spacing values with the exact measurements in design reference v3. Rows may grow for wrapped labels but must never shrink below the specified height.

**Checklist**

- [ ] Set spacing between section headers and their first row to `space-16` (16pt)
- [ ] Set spacing between grouped sections to `space-24` (24pt)
- [ ] Set minimum row height to 52pt with `space-16` (16pt) horizontal padding
- [ ] Align each leading icon to the 16pt row margin and each label to 52pt from the row edge (`16pt + 24pt + 12pt`)
- [ ] Apply the same spacing values on both iOS and Android builds

---

### **Dividers**

---

2.  **Update divider style and placement**

---

Dividers currently run full width between every row, including after the last row in a group. Reference v3 uses one inset divider between adjacent rows only.

**Checklist**

- [ ] Set every divider to 1px using `border-subtle`
- [ ] Inset the divider's leading edge to 52pt so it aligns with the row label
- [ ] Remove the divider after the last row in each grouped section
- [ ] Remove the divider between a section header and its first row

---

### **Icons**

---

3.  **Resize leading icons to match the spec**

---

Leading row icons still use the retired 20x20 size. Reference v3 uses 24x24 icons with one color token across both themes.

**Checklist**

- [ ] Resize all leading row icons from 20x20 to 24x24
- [ ] Keep 12pt spacing between the icon and the row label
- [ ] Use `icon-secondary` for enabled icons in light and dark mode
- [ ] Use `opacity-disabled` (40%) for rows disabled by account permissions

---

### **Verification**

---

4.  **Confirm parity across devices and accessibility settings**

---

The parity check must cover Meridian's 320pt and 430pt width boundaries in addition to the 390pt reference frame.

**Checklist**

- [ ] Confirm row spacing and divider insets hold at the supported 320pt and 430pt viewport widths
- [ ] Confirm row labels wrap to a second line without changing icon alignment when the device text size is set to the largest accessibility setting
- [ ] Confirm dark mode divider and icon colors match the reference file's dark mode variant
- [ ] Confirm no row's tap target drops below 44pt in height after the spacing changes
- [ ] Confirm every row opens the same destination or changes the same setting as before this refinement
