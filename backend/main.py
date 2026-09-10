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
from fastapi.responses import JSONResponse
from PIL import Image

# Ensure backend directory is in python path
BACKEND_DIR = Path(__file__).resolve().parent
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from model import get_model, PlantDiseaseModel
from disease_info import get_disease_info, DISEASE_INFO


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
            "val_accuracy": "93.98%"
        }
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={"status": "unhealthy", "error": str(e)}
        )


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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
