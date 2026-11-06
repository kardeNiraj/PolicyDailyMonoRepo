"""PolicyDaily Document Processor Service Entrypoint"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="PolicyDaily Document Processor",
    version="1.0.0",
    description="Document OCR and metadata extraction microservice"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "document-processor"}

