---
title: "Goal Plugin Test Helpers"
description: "Continuation-log and environment helpers used by the Goal plugin test suites."
trigger_phrases:
  - "goal plugin test helpers"
---

# Goal Plugin Test Helpers

---

## 1. OVERVIEW

`helpers/` holds shared utility functions for the sibling `mk-goal-*.test.cjs`
files. It centralizes Goal continuation-log reading and environment-variable
restoration so the Goal plugin tests do not duplicate that logic.

Current state:

- One module, `continuation-log.cjs`, exporting two functions.
- Consumed by four test files through `require('./helpers/continuation-log.cjs')`.

---

## 2. KEY FILES

| File | Responsibility |
|---|---|
| `continuation-log.cjs` | Reads Goal continuation-log entries from a state directory and restores environment variables after a Goal plugin test |

---

## 3. ENTRYPOINTS

| Entrypoint | Type | Purpose |
|---|---|---|
| `readContinuationEntries(stateDir)` | Function | Reads `.continuation.log` from `stateDir`, parses each line as JSON and returns the entries. Returns an empty array when the file does not exist |
| `restoreEnv(name, value)` | Function | Sets `process.env[name]` to `value`, or deletes the key when `value` is `undefined` |

Consumed by:

- `mk-goal-lifecycle.test.cjs`
- `mk-goal-state.test.cjs`
- `mk-goal-continuation.test.cjs`
- `mk-goal-capabilities.test.cjs`

---

## 4. RELATED

- [`Goal Plugin Tests`](../README.md)
