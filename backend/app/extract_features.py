import os
import json
import numpy as np
from PIL import Image


from app.services.config import METADATA_PATH, STATIC_PATH
from app.services.process_image import model, transform_image, get_image_embedding

def extract_all_features():

    print("Starting feature extraction process...")
    
    try:
        with open(METADATA_PATH, 'r') as f:
            product_metadata = json.load(f)
    except FileNotFoundError:
        print(f"Error: {METADATA_PATH} not found. Please run prepare_data.py first.")
        return

    all_features = []
    
    print(f"Processing {len(product_metadata)} images...")
    for product in product_metadata:
        image_filename = product['image_filename']
        image_path = os.path.join(STATIC_PATH, image_filename)
        
        try:
            with open(image_path, 'rb') as f:
                image_bytes = f.read()
            image_tensor = transform_image(image_bytes)
            feature_vector = get_image_embedding(image_tensor, model)
            all_features.append(feature_vector)
        except Exception as e:
            print(f"Error processing {image_path}: {e}")
            all_features.append(np.zeros((1, 2048))) 

    features_array = np.vstack(all_features)
    np.save(METADATA_PATH.parent / 'features.npy', features_array)
    
    print(f"Feature extraction complete! Saved to '{METADATA_PATH.parent / 'features.npy'}' with shape {features_array.shape}")

if __name__ == '__main__':
    extract_all_features()