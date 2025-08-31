import json
import numpy as np
import httpx
from sklearn.metrics.pairwise import cosine_similarity

from app.services import process_image
from app.services.config import METADATA_PATH, FEATURES_PATH

product_metadata = None
database_features = None

def load_data():
    global product_metadata, database_features
    if not METADATA_PATH.is_file() or not FEATURES_PATH.is_file():
        print("ERROR: Database files not found.")
        return
    
    with open(METADATA_PATH, 'r') as f:
        product_metadata = json.load(f)
    database_features = np.load(FEATURES_PATH)
    print("Product data and features loaded successfully!")

load_data()

async def fetch_image_from_url(url: str) -> bytes:
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.content

def find_similar_products(image_bytes: bytes) -> list:
    if product_metadata is None or database_features is None:
        raise RuntimeError("Database not loaded. Check server startup logs.")

    image_tensor = process_image.transform_image(image_bytes)
    query_embedding = process_image.get_image_embedding(image_tensor, process_image.model)
    
    similarities = cosine_similarity(query_embedding, database_features).flatten()
    
    top_n = 15
    top_indices = similarities.argsort()[::-1][:top_n]

    results = []
    for i in top_indices:
        results.append({
            "product": product_metadata[i],
            "similarity": float(similarities[i])
        })
    return results