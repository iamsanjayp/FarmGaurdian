# FarmGuardian Plant Disease AI Backend

FastAPI backend serving the trained **EfficientNet-B0** plant disease classification model trained on the PlantVillage dataset (38 classes, 93.98% validation accuracy).

## Requirements

- Python 3.9+
- PyTorch & Torchvision
- FastAPI & Uvicorn
- Pillow & python-multipart

```bash
pip install -r requirements.txt
```

## Running the Server

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

Or from the repository root:
```bash
./start.sh
```

## Environment Variables (Optional)

- `MODEL_PATH`: Path to trained PyTorch `.pth` checkpoint (defaults to `checkpoints/best_efficientnet_b0.pth`)
- `CLASS_MAPPING_PATH`: Path to `class_mapping.json` (defaults to `class_mapping.json`)

## Endpoints

- `POST /predict`: Upload leaf image file to get disease predictions, confidence, symptoms, and recommendations
- `GET /health`: Health status, model name, and validation accuracy
- `GET /classes`: List of all 38 supported crop & disease categories
- `GET /docs`: Interactive Swagger API documentation
