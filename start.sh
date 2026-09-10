#!/usr/bin/env bash
# Startup script for FarmGuardian & Plant Disease AI Backend

echo "=========================================================="
echo "    AGRICARE (FarmGuardian) + Plant Disease AI System     "
echo "=========================================================="

VENV_PYTHON="/home/nandha/Downloads/PlantVillage-Dataset-master/venv/bin/python"
BACKEND_DIR="/home/nandha/Downloads/FarmGuardian/backend"
FRONTEND_DIR="/home/nandha/Downloads/FarmGuardian"

# Check if port 8000 is free
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null ; then
    echo "[!] Port 8000 is already in use (Backend is likely already running)."
else
    echo "[*] Starting FastAPI Backend on http://localhost:8000..."
    $VENV_PYTHON -m uvicorn --app-dir "$BACKEND_DIR" main:app --host 0.0.0.0 --port 8000 &
    BACKEND_PID=$!
    echo "[+] Backend started with PID $BACKEND_PID"
fi

# Check if port 5173 is free
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null ; then
    echo "[!] Port 5173 is already in use (Frontend is likely already running)."
else
    echo "[*] Starting Vite Frontend on http://localhost:5173..."
    npm --prefix "$FRONTEND_DIR" run dev -- --host 0.0.0.0 --port 5173 &
    FRONTEND_PID=$!
    echo "[+] Frontend started with PID $FRONTEND_PID"
fi

echo ""
echo "AGRICARE Platform is accessible at:"
echo "  Frontend UI:  http://localhost:5173/pest-disease"
echo "  Backend Docs: http://localhost:8000/docs"
echo "  API Health:   http://localhost:8000/health"
echo "=========================================================="
