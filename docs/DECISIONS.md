# Architecture Decision Records (ADRs)

## ADR-001: Monorepo Architecture with pnpm Workspaces

- **Status**: Accepted
- **Context**: The project combines a Node.js/TypeScript backend API, a React Native/Expo mobile app, a Python document processing microservice, and shared mathematical/contract packages.
- **Decision**: Use `pnpm` workspaces orchestrated with `lerna` to allow atomic commits, synchronized contracts, and isolated dependencies.

---

## ADR-002: Dedicated Python Microservice for Document Processing

- **Status**: Accepted
- **Context**: Ingesting insurance policies requires high-accuracy PDF parsing (tables, multi-column layouts), OCR fallback for scanned images, and integration with AI/LLM extraction pipelines.
- **Decision**: Deploy a dedicated Python service (`services/document-processor`) utilizing FastAPI, PyMuPDF, OCR tools, and Pydantic schemas, leaving the Core API (`apps/api`) lightweight and focused on business domain logic.

---

## ADR-003: Deterministic Financial Calculations in Isolated Package

- **Status**: Accepted
- **Context**: Financial calculations (XIRR, ROI, schedule projections) must be mathematically exact, rigorously tested, and shareable across clients or services without duplication.
- **Decision**: Implement all financial and scheduling mathematics inside `packages/financial-engine` with 100% test coverage and zero runtime web dependencies.

---

## ADR-004: Explicit Separation Between Protection and Investment Policies

- **Status**: Accepted
- **Context**: Pure protection policies (term life, health, motor) are expenses for risk mitigation. Applying investment ROI metrics to them produces misleading or negative indicators.
- **Decision**: The financial engine explicitly restricts investment ROI / XIRR calculations to investment-linked policies (`INVESTMENT_LINKED`), while protection policies present coverage duration, claim conditions, and premium expense tracking.

---

## ADR-005: Database & ORM Selection

- **Status**: Accepted
- **Context**: Needs robust schema migrations, strict type safety, relation modeling, and JSONB support for policy metadata and extraction results.
- **Decision**: Use PostgreSQL 16 with Prisma ORM in `apps/api`.
