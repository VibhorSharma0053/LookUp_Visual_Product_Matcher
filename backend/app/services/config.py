from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_PATH = BASE_DIR / "database" / "images"
METADATA_PATH = BASE_DIR / "database" / "products.json"
FEATURES_PATH = BASE_DIR / "database" / "features.npy"