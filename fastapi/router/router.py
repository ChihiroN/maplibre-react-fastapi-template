import os
from fastapi import APIRouter,UploadFile,HTTPException
import shutil
import base64

router = APIRouter()

@router.get('/Hello')
def Hello():
    return {'Hello': 'World!'}

@router.post('/upload')
def post_uploadfile(upload_file: UploadFile):
    if not os.path.exists('data'):
        os.makedirs('data')
    path = f'data/{upload_file.filename}'# api/filesディレクトリを作成しておく
    try:
        with open(path, 'wb+') as buffer:
            shutil.copyfileobj(upload_file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {
        'filename': upload_file.filename,
        'content_type': upload_file.content_type
    }

@router.get('/upload')
def get_uploas():
    filename = 'data/08mc9569.las'  # Specify your file name or path here
    if not os.path.exists(filename):
        raise HTTPException(status_code=404, detail="File not found")

    # try:
    #     with open(filename, 'rb') as file:
    #         file_bytes = file.read()
    #     # Encode file bytes to base64 to ensure safe JSON encoding
    #     file_base64 = base64.b64encode(file_bytes).decode('utf-8')
    # except IOError as e:
    #     raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")

    return {
        "filename": filename,
        # "file_bytes": file_base64  # Returning the base64 encoded bytes
    }
