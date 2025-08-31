import pandas as pd
import os
import json

CSV_FILE_PATH = "C:/Users/Namrata/Downloads/archive/styles.csv"

IMAGES_FOLDER_PATH = './database/images'

OUTPUT_JSON_PATH = './database/products.json'


def create_metadata_file():
    print("Starting data preparation...")
    if not os.path.exists(IMAGES_FOLDER_PATH):
        print(f"Error: Images folder not found at '{IMAGES_FOLDER_PATH}'")
        return

    selected_images = os.listdir(IMAGES_FOLDER_PATH)
    selected_ids = {int(img.split('.')[0]) for img in selected_images}
    print(f"Found {len(selected_ids)} selected images.")

    try:
        df = pd.read_csv(CSV_FILE_PATH, on_bad_lines='skip') 
    except FileNotFoundError:
        print(f"Error: CSV file not found at '{CSV_FILE_PATH}'. Please update the path.")
        return

    df_selected = df[df['id'].isin(selected_ids)].copy() 
    print(f"Found metadata for {len(df_selected)} images in the CSV.")

    df_selected['image_filename'] = df_selected['id'].astype(str) + '.jpg'

    products_metadata = df_selected[[
        'id', 
        'productDisplayName', 
        'masterCategory',
        'subCategory',
        'articleType',
        'image_filename'
    ]].to_dict(orient='records')

    os.makedirs(os.path.dirname(OUTPUT_JSON_PATH), exist_ok=True)
    with open(OUTPUT_JSON_PATH, 'w') as f:
        json.dump(products_metadata, f, indent=4)

    print(f"Successfully created '{OUTPUT_JSON_PATH}' with {len(products_metadata)} entries.")


if __name__ == '__main__':
    create_metadata_file()