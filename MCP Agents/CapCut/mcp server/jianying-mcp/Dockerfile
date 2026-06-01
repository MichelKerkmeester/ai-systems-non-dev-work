# JianYing MCP Server Dockerfile
FROM python:3.13-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libmediainfo0v5 \
    mediainfo \
    && rm -rf /var/lib/apt/lists/*

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Set working directory
WORKDIR /app

# Copy project files
COPY pyproject.toml uv.lock ./
COPY jianyingdraft ./jianyingdraft/
COPY pyJianYingDraft ./pyJianYingDraft/
COPY material ./material/

# Install dependencies
RUN uv sync --frozen

# Create data directories
RUN mkdir -p /data /output

# Set environment variables
ENV SAVE_PATH=/data
ENV OUTPUT_PATH=/output
ENV PYTHONUNBUFFERED=1

# Run the MCP server
CMD ["uv", "run", "python", "-m", "jianyingdraft.server"]
