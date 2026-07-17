---
title: "Product Owner - Examples - Bug - Frontend Visual - v0.100"
description: "Instantiates Bug Report Template section 2. Shows a visual stacking defect with cross-browser evidence, exact design tokens and focused BDD coverage."
version: "0.100"
contextType: asset
---

# Country dropdown renders behind the payment modal at checkout

### About

---

On the Cartwell checkout page, the country selector inside the payment modal's billing address section opens behind the modal panel instead of in front of it, so most of the option list is hidden beneath the modal edge.

| Field           | Value                              |
| --------------- | ----------------------------------- |
| Frequency       | Always                             |
| Severity        | High                                |
| Platform        | Web                                 |
| Device          | MacBook Air M2, Dell XPS 13         |
| OS Version      | macOS 14.5, Windows 11 23H2         |
| Browser         | Safari, Chrome                      |
| Browser Version | Safari 17.5, Chrome 126.0.6478.114  |

**References:**

**Flows**
- [Checkout - Payment modal](https://www.figma.com/file/cartwell-ds/checkout-flow?node-id=214-3550)

**Components**
- [Country select](https://www.figma.com/file/cartwell-ds/form-components?node-id=88-410)

---

### Bug

---

**1. Observed Behavior**

---

When a shopper opens the country dropdown inside the payment modal's billing address section, the option list paints beneath the opaque modal panel
- Only the dropdown border and roughly 6px of the first option row extend beyond the modal's bottom edge and remain visible
- No error message appears
- A shopper cannot click an option because no full row is visible
- Keyboard arrow keys change the hidden highlighted option, but the shopper cannot see which country is selected
- The same clipping appears at `1440x900` in Safari 17.5 and `1366x768` in Chrome 126.0.6478.114
- DevTools captures in both browsers show computed `z-index: 900` on the dropdown panel and `z-index: 1100` on the modal panel

Steps to Reproduce:
1. Go to cartwell.io and add the "Canvas Weekender" to the cart
2. Proceed to checkout and click "Add payment method" to open the payment modal
3. Inside the modal, scroll to the billing address section
4. Click the country dropdown field
5. Observe the option list clipped at the modal panel's bottom edge after roughly 6px

Screen recording: Not provided. Screenshot attached (checkout-country-dropdown-clipped.png) shows the dropdown border and the top 6px of the "Afghanistan" row extending below the modal. DevTools capture (checkout-country-dropdown-z-index.png) shows the dropdown panel at `900` beneath the modal panel at `1100`.

---

**2. Expected Behavior**

---

The country dropdown panel should render above the payment modal and keep its option rows visible, scrollable and selectable while the modal is open
- Design spec: the dropdown's z-index token (`z-dropdown`, value 1200) should sit above the modal overlay token (`z-modal`, value 1000) per the Cartwell design system. The captured values (900 and 1100) match neither token, which suggests the checkout surface applies hardcoded values instead of the tokens
- Design spec: when less than 320px remains below the field, the dropdown opens above the field instead of clipping at the modal edge
- Previous working behavior: the same dropdown renders correctly in the shipping-address step, which has no modal in view. The non-modal comparison does not establish why the modal context uses the wrong stacking order
- User expectation: shoppers can open the dropdown and select a country without the modal blocking the option list

Checklist
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Bug no longer reproducible
- [ ] No regressions introduced

---

### BDD Scenarios

---

**Scenario:** Country dropdown renders above the payment modal
- **Given** the shopper has the payment modal open on the checkout billing address section
- **When** the shopper clicks the country dropdown field
- **Then** the dropdown panel renders above the modal, opens away from the clipping edge and lets the shopper scroll to and select every country
