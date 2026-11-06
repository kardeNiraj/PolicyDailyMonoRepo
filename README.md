# PolicyDaily (policy-intelligence)

> Mobile-first insurance portfolio management and intelligence platform. Consolidated policy tracking, deterministic financial calculations (XIRR, ROI), and document-grounded AI extraction.

---

## 🏗️ Repository Architecture

```
policy-intelligence/
│
├── apps/
│   ├── mobile/             # React Native + Expo SDK 58 cross-platform mobile client
│   │   ├── app/            # Expo Router file-based screens and tabs
│   │   ├── src/            # Features, components, services, navigation, hooks, theme
│   │   ├── assets/         # App icons, splash screens, visual assets
│   │   └── package.json
│   │
│   └── api/                # Core API backend (NestJS + Express + TypeScript)
│       ├── src/
│       │   ├── modules/    # auth, users, policies, payments, documents, analytics, notifications
│       │   ├── common/     # Filters, interceptors, pipes, utils
│       │   ├── config/     # Environment and runtime configurations
│       │   ├── database/   # Database connection and Prisma client
│       │   ├── middleware/ # Correlation IDs, security, logging
│       │   ├── routes/     # Global routing definitions
│       │   ├── app.ts      # Application factory and configuration
│       │   └── server.ts   # HTTP listener bootstrap
│       ├── prisma/         # Prisma schema and PostgreSQL migrations
│       └── package.json
│
├── services/
│   └── document-processor/ # Python / FastAPI microservice for PDF parsing and OCR
│       ├── app/
│       │   ├── api/        # REST endpoints
│       │   ├── extractors/ # AI / LLM structured field extractors
│       │   ├── ocr/        # Tesseract OCR engine
│       │   ├── parsers/    # PDF table and text parsers (PyMuPDF)
│       │   ├── schemas/    # Pydantic validation models
│       │   ├── services/   # Document processing pipeline
│       │   └── main.py     # FastAPI application entrypoint
│       ├── tests/          # Python unit and integration tests
│       ├── pyproject.toml
│       └── README.md
│
├── packages/
│   ├── contracts/          # Shared TypeScript domain contracts, DTOs & enums
│   └── financial-engine/   # Deterministic financial calculations (XIRR, ROI, schedule engine)
│
├── infrastructure/
│   ├── docker/             # Production & development Dockerfiles
│   └── scripts/            # Development and deployment helper scripts
│
├── docs/                   # Comprehensive project documentation
│   ├── PRD.md              # Product Requirements Document
│   ├── ARCHITECTURE.md     # System architecture and design
│   ├── DATABASE.md         # PostgreSQL database schema and data dictionary
│   ├── API.md              # REST API endpoint specifications
│   └── DECISIONS.md        # Architecture Decision Records (ADRs)
│
├── TASKS.md                # Living project roadmap and session progress tracker
├── .env.example
├── .gitignore
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: v22+
- **pnpm**: v9+ / v11+
- **Docker & Docker Compose**
- **Python**: 3.11+ (for local document processor development)

### 2. Environment Setup

```bash
cp .env.example .env
```

### 3. Start Infrastructure & Backend Services (Docker)

```bash
# Starts PostgreSQL (5432), Core API (3000), and Document Processor (8000)
docker compose up -d

# View logs
docker compose logs -f
```

### 4. Start Mobile Application (Host)

```bash
pnpm --filter mobile start
```

Press `i` for iOS Simulator, `a` for Android Emulator, or scan the QR code in the Expo Go app.

---

## 🧪 Testing & Linting

```bash
# Lint all packages and apps
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test
```
