# PolicyDaily Architecture

## 1. System Overview

PolicyDaily is an Insurance Portfolio Management and Intelligence platform designed to aggregate, parse, analyze, and monitor personal insurance policies across diverse categories (Life, Health, Vehicle, Investment-linked, Personal Protection, Travel).

```
┌─────────────────────────────────────────────────────────────┐
│                       Mobile Client                         │
│               (React Native + Expo SDK 58)                  │
└──────────────┬──────────────────────────────▲───────────────┘
               │                              │
               │ REST / JSON                  │ SSE / Push
               ▼                              │
┌─────────────────────────────────────────────┴───────────────┐
│                      Core API Server                        │
│                          (NestJS)                           │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ Auth / Users │  │ Policy CRUD  │  │ Financial Engine  │  │
│  └──────────────┘  └──────────────┘  └───────────────────┘  │
└──────────────┬──────────────────────────────▲───────────────┘
               │                              │
       Internal│REST / gRPC           Internal│Read / Write
               ▼                              ▼
┌─────────────────────────────┐ ┌─────────────────────────────┐
│  Document Processor Service │ │     PostgreSQL Database     │
│   (Python / FastAPI / OCR)  │ │      (Prisma / Storage)     │
└─────────────────────────────┘ └─────────────────────────────┘
```

---

## 2. Directory Layout & Boundaries

The codebase is organized as a unified monorepo:

- **`apps/mobile`**: Expo-based cross-platform client with Expo Router navigation (`app/`) and modular feature-based structure (`src/features/*`).
- **`apps/api`**: Core backend API providing authentication, policy management, schedules, and analytics orchestration.
- **`services/document-processor`**: Dedicated Python microservice for PDF parsing, Optical Character Recognition (OCR), and AI/LLM structured metadata extraction.
- **`packages/contracts`**: Shared TypeScript types, interfaces, and DTOs shared between backend and mobile clients.
- **`packages/financial-engine`**: Pure, deterministic mathematical calculation engine for policy ROI, XIRR, inflation adjustments, and premium schedule generation.
- **`infrastructure/`**: Container configurations, Dockerfiles, and deployment/migration scripts.
- **`docs/`**: Product, architectural, database, and decision records.

---

## 3. Core Subsystems

### 3.1 Document Ingestion & Verification Loop

1. **Upload**: User submits policy PDF via mobile client to Core API.
2. **Handoff**: Core API forwards file to `services/document-processor`.
3. **Extraction**: Document processor applies text extraction or OCR fallback, then uses AI extraction to identify structured policy fields.
4. **Verification**: Extracted fields are stored with `extraction_status: EXTRACTED` and presented to the user on mobile for explicit confirmation or editing.
5. **Persistence**: Confirmed fields update the policy with `verification_status: VERIFIED`.

### 3.2 Deterministic Financial Engine

- Pure protection policies (Term, Health, Vehicle) are evaluated for coverage, exclusions, and renewal commitments—never misleading investment ROI.
- Investment-linked policies (ULIPs, endowments, money-back) undergo exact mathematical analysis (cash flow dates, premium amounts, maturity values) computing XIRR, absolute ROI, and inflation adjustments via `packages/financial-engine`.

### 3.3 Payment Schedules & Notifications

- Deterministic schedule generator calculates future due dates according to policy frequency (monthly, quarterly, half-yearly, annually).
- Tracks expected vs. reconciled payments and drives upcoming due alerts (7, 30, 90, 365 days).
