"""
FastAPI Server for FarmGuardian Plant Health AI.
Serves predictions from trained EfficientNet-B0 model with rich disease context.
"""

import io
import sys
from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image

# Ensure backend directory is in python path
BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from model import get_model, PlantDiseaseModel
from disease_info import get_disease_info, DISEASE_INFO
from gemini_service import (
    ask_agribot,
    get_market_prices,
    predict_yield as predict_yield_ai,
    get_crop_performance,
    get_farm_economics,
    get_smart_guidance,
    is_gemini_configured,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Warm up model on startup
    print("[Server] Loading EfficientNet-B0 model...")
    model = get_model()
    print(f"[Server] Model loaded with {model.num_classes} classes.")
    yield
    print("[Server] Shutting down.")


app = FastAPI(
    title="FarmGuardian Plant Health API",
    description="Disease detection using trained EfficientNet-B0 model on PlantVillage dataset",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for React frontend (localhost:5173, localhost:3000, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def index():
    return {
        "service": "FarmGuardian Plant Health AI",
        "version": "1.0.0",
        "endpoints": {
            "predict": "POST /predict",
            "health": "GET /health",
            "classes": "GET /classes"
        }
    }


@app.get("/health")
def health():
    try:
        model = get_model()
        return {
            "status": "healthy",
            "model": "EfficientNet-B0",
            "num_classes": model.num_classes,
            "device": str(model.device),
            "val_accuracy": "93.98%",
            "gemini_configured": is_gemini_configured()
        }
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={"status": "unhealthy", "error": str(e), "gemini_configured": is_gemini_configured()}
        )


# =========================================================================
# Gemini AI Agriculture Intelligence Schemas & Endpoints
# =========================================================================

class AgriBotRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, Any]]] = None
    language: Optional[str] = "en"


class YieldPredictRequest(BaseModel):
    crop: str = "Rice"
    area: float = 5.0
    soil: str = "Loamy"
    stage: str = "Vegetative"
    sowing_date: Optional[str] = ""


class FarmEconomicsRequest(BaseModel):
    crop: str = "Rice"
    area: float = 5.0


@app.post("/api/agribot")
def api_agribot(req: AgriBotRequest):
    """Chatbot strictly customized for agriculture, soil, crops, and farming."""
    reply = ask_agribot(req.message, req.history, req.language or "en")
    return {"reply": reply}


@app.get("/api/market-prices")
def api_market_prices(state: str = "Maharashtra", crop: str = "All"):
    """Live APMC Mandi market price trends generated via Gemini."""
    return get_market_prices(state, crop)


@app.post("/api/predict-yield")
def api_predict_yield(req: YieldPredictRequest):
    """Agronomic crop yield estimation based on real field parameters."""
    return predict_yield_ai(req.crop, req.area, req.soil, req.stage, req.sowing_date or "")


@app.get("/api/crop-performance")
def api_crop_performance(crop: str = "Rice"):
    """10-year yield history (2015-2024), trends, and future forecast for crops."""
    return get_crop_performance(crop)


@app.post("/api/farm-economics")
def api_farm_economics(req: FarmEconomicsRequest):
    """Input cost breakdown, production estimation, and profit advisory."""
    return get_farm_economics(req.crop, req.area)


@app.get("/api/smart-guidance")
def api_smart_guidance(crop: str = "Rice", sowing_date: str = "2026-04-10"):
    """Real-time crop lifecycle status, active alerts, and daily stage checklist."""
    return get_smart_guidance(crop, sowing_date)


@app.get("/classes")
def list_classes():
    model = get_model()
    classes_list = []
    for idx, cls_name in sorted(model.idx_to_class.items()):
        info = get_disease_info(cls_name)
        classes_list.append({
            "index": idx,
            "raw_name": cls_name,
            "display_name": info["display_name"],
            "plant": info["plant"],
            "disease": info["disease"],
            "is_healthy": info["is_healthy"],
            "risk_level": info["risk_level"]
        })
    return {"total": len(classes_list), "classes": classes_list}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")

    # Validate content type if provided
    if file.content_type and not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail=f"File must be an image. Received: {file.content_type}"
        )

    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image format: {str(e)}")

    model = get_model()
    primary, top_k = model.predict(image, top_k=5)

    detected_raw = primary["class_name"]
    confidence = primary["confidence"]
    info = get_disease_info(detected_raw)

    # Format visual analysis for the frontend chart (top 3)
    visual_analysis = []
    for item in top_k[:3]:
        item_info = get_disease_info(item["class_name"])
        visual_analysis.append({
            "label": item_info["display_name"],
            "raw_label": item["class_name"],
            "value": item["confidence"],
            "is_healthy": item_info["is_healthy"]
        })

    # Response schema designed to be 100% compatible with FarmGuardian frontend
    response = {
        "detected": info["display_name"],
        "detected_raw": detected_raw,
        "plant": info["plant"],
        "disease": info["disease"],
        "is_healthy": info["is_healthy"],
        "confidence": confidence,
        "riskLevel": info["risk_level"],
        "symptoms": info["symptoms"],
        "riskFactors": info["risk_factors"],
        "recommendations": info["recommendations"],
        "visualAnalysis": visual_analysis,
        "marathi": info.get("marathi", {})
    }

    return response


# ---------------------------------------------------------------------------
# SPA Static File Serving (for unified Docker deployment)
# ---------------------------------------------------------------------------
DIST_DIR = BACKEND_DIR / "dist"
if not DIST_DIR.exists():
    DIST_DIR = BACKEND_DIR.parent / "dist"

if DIST_DIR.exists():
    assets_dir = DIST_DIR / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_dir)), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        if full_path.startswith("api/") or full_path in ("docs", "redoc", "openapi.json"):
            raise HTTPException(status_code=404, detail="Endpoint not found")
        target_file = DIST_DIR / full_path
        if full_path and target_file.is_file():
            return FileResponse(str(target_file))
        return FileResponse(str(DIST_DIR / "index.html"))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)

