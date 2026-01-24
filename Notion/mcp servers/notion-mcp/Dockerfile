FROM node:20-slim

WORKDIR /app

# Install the Notion MCP server (stdio transport by default)
RUN npm install -g @notionhq/notion-mcp-server

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser
USER appuser

# Keep the container running; MCP clients should use `docker exec -i`.
CMD ["sh", "-c", "echo 'Notion MCP container ready (use docker exec -i notion-mcp notion-mcp-server)' && tail -f /dev/null"]
