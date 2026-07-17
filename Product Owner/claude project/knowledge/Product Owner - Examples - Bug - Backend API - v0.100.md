---
title: "Product Owner - Examples - Bug - Backend API - v0.100"
description: "Instantiates Bug Report Template section 2. Shows a concurrency-sensitive API defect with paired request evidence and conditional reproduction."
version: "0.100"
contextType: asset
---

# Orders list endpoint returns duplicate rows across page boundaries

### About

---

The `GET /v2/orders` endpoint used by the Ordly Admin Dashboard repeats orders across consecutive 50-row pages when new orders enter the "Newest first" list during an admin's paging session.

| Field           | Value                          |
| --------------- | ------------------------------- |
| Frequency       | Sometimes                      |
| Severity        | Medium                         |
| Platform        | Web (Ordly Admin Dashboard)     |
| Device          | Not provided                   |
| OS Version      | macOS 14.5, Windows 11 23H2     |
| Browser         | Chrome                          |
| Browser Version | 126.0.6478.114                 |

**References:** Not provided

---

### Bug

---

**1. Observed Behavior**

---

When paging through the Orders list using `GET /v2/orders?limit=50&offset=X&sort=created_at:desc`, orders from the end of one response reappear at the start of the next response after new orders enter the list
- The response returns a valid `200` with well-formed JSON, but row content is duplicated across pages
- No error message is returned by the endpoint
- In the captured session, 6 order IDs appear in both page responses and 6 older orders are pushed out of the second response

Steps to Reproduce:
1. Open the Ordly Admin Dashboard Orders list sorted by "Newest first"
2. Request page 3, `GET /v2/orders?limit=50&offset=100&sort=created_at:desc`, then record its final 6 order IDs
3. While page 3 remains open, create 6 new orders through checkout or the internal test-order script within 45 seconds
4. Request page 4, `GET /v2/orders?limit=50&offset=150&sort=created_at:desc`
5. Compare the payloads and observe that page 4 starts with the same 6 order IDs that ended page 3

Screen recording: Not provided. Request and response excerpt captured below.

```text
Request 1 (14:02:11 UTC): GET /v2/orders?limit=50&offset=100&sort=created_at:desc
Response: 50 rows
First row: ORD-48200, created_at 14:01:47 UTC
Final 6 rows: ORD-48156, ORD-48155, ORD-48154, ORD-48153, ORD-48152, ORD-48151

[6 new orders, ORD-48201 through ORD-48206, created between 14:02:15 UTC and 14:02:53 UTC]

Request 2 (14:03:02 UTC): GET /v2/orders?limit=50&offset=150&sort=created_at:desc
Response: 50 rows
First 6 rows: ORD-48156, ORD-48155, ORD-48154, ORD-48153, ORD-48152, ORD-48151
Seventh row: ORD-48150
```

Hypothesis, unverified, needs engineering confirmation: each offset request may be evaluated against the current live list, so the 6 inserts shift the page boundary by 6 rows between requests. The evidence does not confirm this as the root cause.

Reproduction rate: reproduced in 7 of 10 attempts when exactly 6 orders were created within 45 seconds between page requests. It reproduced in 0 of 10 control attempts with no orders created between requests.

---

**2. Expected Behavior**

---

An order already returned during a paging session should not appear again on a later page when new orders are created between requests
- Design spec: Not provided. No documented pagination contract exists for this endpoint
- Previous working behavior: Not provided. No earlier report has been supplied since the endpoint shipped
- User expectation: admins reviewing new orders can trust that the paginated list never shows the same order twice

Checklist
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Bug no longer reproducible
- [ ] No regressions introduced

---
