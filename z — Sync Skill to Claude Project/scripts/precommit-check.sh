#!/usr/bin/env bash
# ───────────────────────────────────────────────────────────────
# COMPONENT: AI SYSTEM SYNC PRECOMMIT CHECK
# ───────────────────────────────────────────────────────────────
# Delegates staged sync drift checks to the CLI while keeping this opt-in hook fail-open.
#
# Enable with SPECKIT_AI_SYSTEM_SYNC_HOOK=on.
# Exit Codes:
#   0 - Success or fail-open tooling condition.
#   1 - Reserved for future blocking mode.
set -euo pipefail

# ───────────────────────────────────────────────────────────────
# 1. CONFIGURATION
# ───────────────────────────────────────────────────────────────

# Keep enforcement explicit so every checkout uses the same current report-only policy.
ENFORCEMENT_MODE='report'

# ───────────────────────────────────────────────────────────────
# 2. REPOSITORY PRECHECKS
# ───────────────────────────────────────────────────────────────

# Opt-in avoids adding commit latency until the check is trusted for this repository.
if [[ "${SPECKIT_AI_SYSTEM_SYNC_HOOK:-off}" != 'on' ]]; then
    exit 0
fi

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$REPO_ROOT" ]]; then
    exit 0
fi

CLI_PATH="$REPO_ROOT/z — Sync Skill to Claude Project/ai-system-sync.cjs"
if [[ ! -f "$CLI_PATH" ]]; then
    exit 0
fi

if ! command -v node >/dev/null 2>&1; then
    exit 0
fi

# ───────────────────────────────────────────────────────────────
# 3. STAGED CHECK
# ───────────────────────────────────────────────────────────────

EXIT_CODE=0
CHECK_OUTPUT="$(node "$CLI_PATH" check --staged 2>&1)" || EXIT_CODE=$?

if [[ -n "$CHECK_OUTPUT" ]]; then
    printf '\n' >&2
    printf '[ai-system-sync] check --staged report (mode: %s):\n' "$ENFORCEMENT_MODE" >&2
    printf '%s\n' "$CHECK_OUTPUT" >&2
    printf '\n' >&2
fi

# ───────────────────────────────────────────────────────────────
# 4. ENFORCEMENT
# ───────────────────────────────────────────────────────────────

if [[ "$ENFORCEMENT_MODE" == 'block' && "$EXIT_CODE" -ne 0 ]]; then
    printf 'BLOCKED: ai-system-sync check --staged reported drift (exit %s).\n' "$EXIT_CODE" >&2
    printf 'Disable locally only for genuine tooling faults: %s\n' \
        'SPECKIT_AI_SYSTEM_SYNC_HOOK=off' >&2
    exit 1
fi

exit 0
