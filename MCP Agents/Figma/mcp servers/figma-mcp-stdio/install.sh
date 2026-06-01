#!/usr/bin/env bash
# Install bundled figma-developer-mcp dependencies into mcp servers/figma-mcp-stdio/node_modules/
# Per Decision D5 (mirror ClickUp full bundling), node_modules/ is committed alongside package.json.
# Run this script once after cloning the AI_Systems/Barter or AI_Systems/Public repo if node_modules/ is absent.

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
cd "$SCRIPT_DIR"

if ! command -v node >/dev/null 2>&1; then
    echo "Error: Node.js 18+ required. Install via: brew install node OR https://nodejs.org/" >&2
    exit 1
fi

NODE_MAJOR="$(node -e 'process.stdout.write(String(process.versions.node.split(".")[0]))')"
if [[ "${NODE_MAJOR}" -lt 18 ]]; then
    echo "Error: Node.js 18+ required (found v${NODE_MAJOR})" >&2
    exit 1
fi

echo "Installing figma-developer-mcp dependencies..."
npm install --no-fund --no-audit

echo ""
echo "Verifying install..."
if [[ -d "node_modules/figma-developer-mcp" ]]; then
    BUNDLE_SIZE_MB="$(du -sm node_modules 2>/dev/null | cut -f1)"
    echo "✅ figma-developer-mcp installed (node_modules: ${BUNDLE_SIZE_MB}MB)"
    if [[ "${BUNDLE_SIZE_MB}" -gt 50 ]]; then
        echo ""
        echo "⚠ Bundle size exceeds 50MB threshold."
        echo "   Per Decision D5 escalation rule, consider switching to lighter alternative:"
        echo "   - Remove node_modules/ from git"
        echo "   - Add 'install.sh' invocation to setup docs"
        echo "   - Update decision-record.md (mark ADR-005 status: Superseded)"
    fi
else
    echo "❌ Install verification failed — figma-developer-mcp not found in node_modules/"
    exit 2
fi
