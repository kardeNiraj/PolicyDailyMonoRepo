FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    tesseract-ocr \
    libtesseract-dev \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

COPY services/document-processor/pyproject.toml services/document-processor/README.md ./
RUN pip install --no-cache-dir pip -U && \
    pip install --no-cache-dir .

COPY services/document-processor/app ./app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

