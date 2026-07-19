# Goal OpenCode Plugin

`.opencode/plugins/` contains the local Goal plugin and its regression tests.
OpenCode auto-loads `mk-goal.js` when the project starts.

## Files

| Path | Purpose |
|---|---|
| `mk-goal.js` | Persists session goals, injects active goal guidance, tracks lifecycle and usage signals, supervises optional continuation and exposes `mk_goal` and `mk_goal_status`. |
| `tests/mk-goal-*.test.cjs` | Covers the Goal plugin's exports, state, lifecycle, supervision, continuation, capabilities and real tool path. |
| `tests/helpers/continuation-log.cjs` | Reads continuation logs and restores environment variables for Goal tests. |

Runtime state belongs to `../skills/.goal-state/`. It is not a plugin entrypoint.

## Validation

Run from the repository root:

```bash
node --test .opencode/plugins/tests/mk-goal-*.test.cjs
```

Restart OpenCode after changing `mk-goal.js` because OpenCode loads the Goal
plugin only at startup.
