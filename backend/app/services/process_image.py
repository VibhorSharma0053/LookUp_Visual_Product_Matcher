import io
import numpy as np
from PIL import Image

import torch
import torchvision.transforms as transforms
from torchvision import models

def get_model():
    model = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
    model = torch.nn.Sequential(*(list(model.children())[:-1]))
    model.eval()
    return model

def transform_image(image_bytes: bytes) -> torch.Tensor:
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    return transform(image).unsqueeze(0)

def get_image_embedding(image_tensor: torch.Tensor, model) -> np.ndarray:
    with torch.no_grad():
        embedding = model(image_tensor)
    return embedding.view(embedding.size(0), -1).numpy()

model = get_model()
print("Vision model loaded successfully!")