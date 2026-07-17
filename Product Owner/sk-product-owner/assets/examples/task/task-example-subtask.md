---
title: "Product Owner - Examples - Task - Subtask - v0.100"
description: "Instantiates Task Templates section 4, Subtask. Shows zero-result and request-failure recovery kept distinct without leaking permission state."
version: "0.100"
contextType: asset
---

# Empty states for search results in Corsair

### About

---

This subtask covers the empty and error states for the global search results panel in Corsair, part of the parent task "Search experience overhaul." The panel currently shows the same blank area after a successful zero-result search and after a failed request, so users cannot tell whether to change the query or retry it.

Design and write the copy for two states: no results found and search request failed. Both states need a supporting action so users can recover without leaving the search panel.

**References**

---

Components

- [Search results empty state](figma-url)
- [Search results error state](figma-url)

### Requirements

---

### **No results found**

---

1.  **Design and write the zero-results state**

---

Users need this state only when the request succeeds and returns no records they are allowed to see. It confirms that search worked and points back to the query. It does not imply a service failure.

**Checklist**

- [ ] Show an illustration and headline only after a successful search returns zero visible results
- [ ] Use the headline "No results for '[query]'"
- [ ] Use the supporting line "Check your spelling or try a different keyword"
- [ ] Include a "Clear search" button that resets the search field and returns focus to it
- [ ] Show this state only after the search request completes, not while results are loading
- [ ] Preserve the submitted query's capitalization in `[query]` and truncate only the displayed value after 80 characters
- [ ] Keep the state scoped to the active `Projects`, `Tasks` or `People` tab without suggesting results from other tabs

**User Story**

- **Given:** a user types a query with no matching records
- **When:** the search request completes
- **Then:** the panel shows the zero-results state with the user's query in the headline and a way to clear it

---

### **Search failed**

---

2.  **Design and write the request-failed state**

---

Users need a retry state when Corsair cannot obtain a result set. This state must never appear for a successful request with zero visible records.

**Checklist**

- [ ] Show a distinct error state after a network failure, a timeout at 10 seconds or a `5xx` response
- [ ] Use the headline "Search isn't working right now"
- [ ] After a network failure, use the supporting line "Check your connection and try again."
- [ ] After a 10-second timeout or `5xx` response, use the supporting line "We couldn't load your results. Try again."
- [ ] Include a "Retry" button that reruns the last query
- [ ] Preserve the user's typed query in the search field so retrying does not require retyping
- [ ] Log the failure reason for the search service without showing raw error text to the user

---

### **Loading and permissions**

---

3.  **Cover loading and permission edge cases**

---

Loading and access filtering happen before Corsair chooses either state. The panel must not reveal that inaccessible records matched the query.

**Checklist**

- [ ] Show a loading indicator while the search request is in flight, before either empty or error state can appear
- [ ] Exclude projects and tasks the user does not have access to from the result count used to trigger the zero-results state
- [ ] If access filtering removes every visible result, show the zero-results state and do not mention permissions
- [ ] Never show a hidden-result count or copy such as "3 results are unavailable" in either state
