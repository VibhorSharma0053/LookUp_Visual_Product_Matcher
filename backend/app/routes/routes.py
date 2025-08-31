import base64
from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from app.services import visual_matcher as search_service

router = APIRouter()

@router.post("/search")
async def search(
    file: UploadFile | None = File(None), 
    url: str | None = Form(None)
):
    image_bytes = None
    if file:
        image_bytes = await file.read()
    elif url:
        if url.startswith('data:image'):
            try:
                header, data = url.split(',', 1)
                image_bytes = base64.b64decode(data)
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Invalid Base64 Data URL: {e}")
        else:
            try:
                image_bytes = await search_service.fetch_image_from_url(url)
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Could not fetch image from URL: {e}")
    else:
        raise HTTPException(status_code=400, detail="No image file or URL provided.")
    
    try:
        results = search_service.find_similar_products(image_bytes)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred during search: {e}")
