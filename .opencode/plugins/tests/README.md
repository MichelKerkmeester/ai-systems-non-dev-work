# Goal Plugin Tests

These Node test runner suites cover `.opencode/plugins/mk-goal.js` without a
live OpenCode session.

| Test | Coverage |
|---|---|
| `mk-goal-capabilities.test.cjs` | Goal history and doctor/health reporting. |
| `mk-goal-continuation.test.cjs` | Autonomy gates and continuation limits. |
| `mk-goal-export-contract.test.cjs` | Goal plugin export shape and test seams. |
| `mk-goal-lifecycle.test.cjs` | Lifecycle events, usage accounting and prompt blocks. |
| `mk-goal-state.test.cjs` | Session-keyed persistence and passive injection. |
| `mk-goal-supervisor.test.cjs` | Verifier verdicts and durable goal state. |
| `mk-goal-tool-path.test.cjs` | Tool execution and session resolution. |

`helpers/continuation-log.cjs` provides shared continuation-log and environment
helpers for the Goal plugin suites.

Run from the repository root:

```bash
node --test .opencode/plugins/tests/mk-goal-*.test.cjs
```
