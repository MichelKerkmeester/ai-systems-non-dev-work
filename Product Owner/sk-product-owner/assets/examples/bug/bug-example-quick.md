---
title: "Product Owner - Examples - Bug - Quick Bug - v0.100"
description: "Instantiates Bug Report Template section 2 in Quick form. Shows honest missing environment data and an unverified route hypothesis in a concise report."
version: "0.100"
contextType: asset
---

# Terms of Service footer link returns 404 on the marketing site

### About

---

On the Fernbank marketing site, the "Terms of Service" link in the global footer opens a 404 page instead of the terms page.

| Field           | Value                                                        |
| --------------- | -------------------------------------------------------------- |
| Frequency       | Always                                                        |
| Severity        | Medium                                                        |
| Platform        | Web                                                           |
| Device          | Not provided (desktop and mobile web form factors reported, models unknown) |
| OS Version      | Not provided                                                  |
| Browser         | Chrome, Safari, Firefox                                        |
| Browser Version | Not provided                                                  |

**References:** Not provided

---

### Bug

---

**1. Observed Behavior**

---

Clicking "Terms of Service" in the footer of any tested marketing page loads the site's 404 page instead of the terms content
- The custom 404 page appears with the heading "We couldn't find that page" and a "Back to homepage" button
- The browser tab title changes to "Page not found - Fernbank" and the page returns a 404 status
- The result reproduced 6 of 6 times from the homepage, Pricing and About pages across desktop and mobile web

Steps to Reproduce:
1. Go to fernbank.com
2. Scroll to the footer on any marketing page
3. Click "Terms of Service"
4. Observe the page load fernbank.com/terms-of-service and return a 404

Screen recording: Not provided. Screenshot attached (fernbank-terms-404.png) shows the 404 page with the URL bar reading fernbank.com/terms-of-service.

Opening `fernbank.com/legal/terms` directly loads the page titled "Terms of Service" with a `200` response.

Hypothesis, unverified, needs engineering confirmation: the footer may still use the retired `/terms-of-service` route from the legal-pages restructure reportedly shipped on July 8, 2026. The working `/legal/terms` route does not confirm why the footer still opens the old route.

---

**2. Expected Behavior**

---

Clicking "Terms of Service" in the footer should load `fernbank.com/legal/terms` and return a `200` response
- Design spec: Not provided
- Previous working behavior: the reporter states that the link worked before the legal-pages restructure reportedly shipped on July 8, 2026. A regression log was not provided
- User expectation: visitors can read the terms without hitting a dead link

Checklist
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Bug no longer reproducible
- [ ] No regressions introduced

---
