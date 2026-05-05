#!/usr/bin/env bash
# Verify the Official Figma MCP HTTP endpoint is reachable + responsive.
# Does NOT exercise OAuth (that requires a browser); only confirms the server
# accepts MCP protocol negotiation.

set -euo pipefail

ENDPOINT="${FIGMA_MCP_ENDPOINT:-https://mcp.figma.com/mcp}"
TIMEOUT_SEC="${FIGMA_MCP_TIMEOUT:-10}"

echo "Verifying Figma MCP HTTP endpoint: ${ENDPOINT}"
echo ""

# 1. DNS resolution
echo "1. DNS resolution..."
if host mcp.figma.com >/dev/null 2>&1 || nslookup mcp.figma.com >/dev/null 2>&1; then
    echo "   ✅ mcp.figma.com resolves"
else
    echo "   ❌ DNS resolution failed"
    exit 2
fi

# 2. HTTPS reachability
echo "2. HTTPS reachability..."
HTTP_CODE="$(curl --silent --output /dev/null --write-out '%{http_code}' \
    --max-time "${TIMEOUT_SEC}" \
    -X POST "${ENDPOINT}" \
    -H 'Content-Type: application/json' \
    -d '{"jsonrpc":"2.0","method":"initialize","params":{"protocolVersion":"2024-11-05","clientInfo":{"name":"verify.sh","version":"1.0"}},"id":1}' 2>/dev/null || echo "000")"

case "${HTTP_CODE}" in
    200|400|401|403)
        echo "   ✅ HTTPS responds (status ${HTTP_CODE} — server reachable; OAuth flow handles auth)"
        ;;
    000)
        echo "   ❌ Connection failed (timeout or network issue)"
        exit 2
        ;;
    5*)
        echo "   ⚠ Server error (status ${HTTP_CODE}) — endpoint may be temporarily down"
        exit 3
        ;;
    *)
        echo "   ⚠ Unexpected status ${HTTP_CODE} — manual review needed"
        exit 3
        ;;
esac

# 3. MCP protocol negotiation (best-effort)
echo "3. MCP protocol response..."
RESPONSE="$(curl --silent --max-time "${TIMEOUT_SEC}" \
    -X POST "${ENDPOINT}" \
    -H 'Content-Type: application/json' \
    -H 'Accept: application/json' \
    -d '{"jsonrpc":"2.0","method":"tools/list","params":{},"id":2}' 2>/dev/null || echo '')"

if echo "${RESPONSE}" | grep -q '"result"\|"error"\|"jsonrpc"'; then
    echo "   ✅ MCP protocol response received"
    echo ""
    echo "✅ Figma MCP HTTP endpoint verified."
    echo ""
    echo "Next step: configure your AI client per ./config-snippets.md and trigger any Figma command."
    echo "First call opens a browser OAuth popup."
else
    echo "   ⚠ Empty or non-MCP response — endpoint reachable but protocol layer untested"
    echo ""
    echo "Server is reachable. OAuth must complete in your AI client to fully verify."
fi
