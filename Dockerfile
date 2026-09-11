# ==============================================================================
# Stage 1: Build the React + Vite Frontend
# ==============================================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app

# Install npm dependencies (layer caching)
COPY package*.json ./
RUN npm ci

# Copy frontend source files and compile production bundle
COPY index.html tsconfig*.json vite.config.ts ./
COPY src/ ./src/
COPY public/ ./public/
RUN npm run build

# ==============================================================================
# Stage 2: Python Runtime with FastAPI & PyTorch (CPU-only)
# ==============================================================================
FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8000

WORKDIR /app

# Install system tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and packaging utilities
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# Install PyTorch CPU wheels with PyPI fallback for sub-dependencies (numpy, pillow, etc.)
RUN pip install --no-cache-dir torch torchvision --index-url https://download.pytorch.org/whl/cpu --extra-index-url https://pypi.org/simple

# Install remaining backend requirements
COPY backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code, weights, and mappings
COPY backend/ /app/backend/

# Copy built frontend from stage 1
COPY --from=frontend-builder /app/dist /app/backend/dist

WORKDIR /app/backend

EXPOSE 8000

# Start FastAPI server listening on Render's dynamic $PORT
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
