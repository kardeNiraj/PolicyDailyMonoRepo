# PolicyDaily Document Processor Service

FastAPI-powered microservice responsible for insurance policy PDF processing, OCR conversion, and structured field extraction.

## Features

- **PDF Text & Table Parsing**: Fast native text extraction using PyMuPDF.
- **OCR Engine**: Tesseract OCR fallback for scanned policies.
- **AI Structured Extraction**: Extracts core policy metadata (provider, dates, premiums, sum assured, guaranteed vs non-guaranteed benefits, exclusions).
- **Extraction Confidence**: Scores each extracted parameter for explicit user verification.

## Running Locally

```bash
cd services/document-processor
pip install -e ".[dev]"
uvicorn app.main:app --reload --port 8000
```
