"""
EfficientNet-B0 Model Loader & Inference Engine for Plant Disease Classification.
Loads trained weights from best_efficientnet_b0.pth and class mappings from class_mapping.json.
"""

import os
import json
from pathlib import Path
from typing import List, Dict, Any, Tuple
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

DEFAULT_CHECKPOINT = "/home/nandha/Downloads/PlantVillage-Dataset-master/checkpoints/best_efficientnet_b0.pth"
DEFAULT_CLASS_MAPPING = "/home/nandha/Downloads/PlantVillage-Dataset-master/splits/class_mapping.json"

class PlantDiseaseModel:
    def __init__(
        self,
        checkpoint_path: str = None,
        class_mapping_path: str = None,
        device: str = None
    ):
        self.checkpoint_path = checkpoint_path or os.getenv("MODEL_PATH", DEFAULT_CHECKPOINT)
        self.class_mapping_path = class_mapping_path or os.getenv("CLASS_MAPPING_PATH", DEFAULT_CLASS_MAPPING)
        
        if device:
            self.device = torch.device(device)
        else:
            self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        print(f"[Model] Initializing PlantDiseaseModel on device: {self.device}")
        print(f"[Model] Checkpoint: {self.checkpoint_path}")
        print(f"[Model] Class mapping: {self.class_mapping_path}")

        # Load class mappings
        with open(self.class_mapping_path, "r", encoding="utf-8") as f:
            mapping_data = json.load(f)
            self.idx_to_class = {int(k): v for k, v in mapping_data["idx_to_class"].items()}
            self.class_to_idx = mapping_data["class_to_idx"]
            self.num_classes = mapping_data.get("num_classes", len(self.idx_to_class))

        # Build EfficientNet-B0
        self.model = models.efficientnet_b0(weights=None)
        in_features = self.model.classifier[1].in_features
        self.model.classifier = nn.Sequential(
            nn.Dropout(p=0.2, inplace=True),
            nn.Linear(in_features, self.num_classes)
        )

        # Load trained checkpoint
        checkpoint = torch.load(self.checkpoint_path, map_location=self.device, weights_only=False)
        state_dict = checkpoint["model_state_dict"] if "model_state_dict" in checkpoint else checkpoint
        self.model.load_state_dict(state_dict)
        self.model.to(self.device)
        self.model.eval()

        val_acc = checkpoint.get("val_acc", "N/A")
        print(f"[Model] Successfully loaded weights (Trained Val Accuracy: {val_acc}%)")

        # Standard ImageNet normalization matching training
        self.transform = transforms.Compose([
            transforms.Resize((256, 256)),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

    def predict(self, image: Image.Image, top_k: int = 3) -> Tuple[Dict[str, Any], List[Dict[str, Any]]]:
        """
        Run inference on a PIL image.
        Returns:
            primary_prediction: Dict with class_name, confidence, idx
            top_predictions: List of Dicts with class_name, confidence, idx
        """
        if image.mode != "RGB":
            image = image.convert("RGB")

        tensor = self.transform(image).unsqueeze(0).to(self.device)

        with torch.no_grad():
            logits = self.model(tensor)
            probs = torch.softmax(logits, dim=1)[0]
            top_probs, top_indices = torch.topk(probs, k=min(top_k, self.num_classes))

        top_predictions = []
        for prob, idx in zip(top_probs.tolist(), top_indices.tolist()):
            cls_name = self.idx_to_class[idx]
            conf_pct = round(prob * 100.0, 1)
            top_predictions.append({
                "class_name": cls_name,
                "confidence": conf_pct,
                "index": idx
            })

        primary = top_predictions[0]
        return primary, top_predictions


_model_instance = None

def get_model() -> PlantDiseaseModel:
    global _model_instance
    if _model_instance is None:
        _model_instance = PlantDiseaseModel()
    return _model_instance
