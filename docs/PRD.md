# Product Requirements Document (PRD)

## Insurance Portfolio Management & Intelligence Platform

**Status:** Initial specification  
**Version:** 1.0  
**Initial market:** India  
**Platforms:** Android and iOS  
**Product strategy:** Personal-first, public launch later

---

## 1. Product vision

Build a mobile-first platform that allows individuals to manage all their insurance policies in one place, understand their financial commitments, monitor upcoming payments, evaluate policy benefits and calculate the actual financial performance of investment-linked insurance products.

The application should reduce the complexity of managing multiple insurance providers, documents, premium schedules and maturity benefits.

## 2. Problem statement

People often own multiple insurance policies but lack a consolidated understanding of:

- Their total annual and lifetime premium commitments.
- Upcoming premium payments and renewal dates.
- Total premiums paid so far.
- Actual insurance coverage.
- Guaranteed and non-guaranteed maturity benefits.
- Annualized returns on investment-linked policies.
- Financial consequences of discontinuing a policy.
- Policy exclusions, conditions and potential red flags.

The product aims to solve these problems through document ingestion, structured policy management, deterministic financial calculations and document-grounded intelligence.

## 3. Target users

**Primary user:** Individuals managing multiple personal insurance policies.

**Secondary users:**

- Families managing policies across multiple members.
- Individuals managing policies purchased by parents.
- People evaluating existing insurance investments.
- Individuals who want to understand policies before renewing or discontinuing them.

## 4. Supported policy categories

The initial product should accommodate:

| Category            | Policy types                                   |
| ------------------- | ---------------------------------------------- |
| Life insurance      | Term, whole life, endowment                    |
| Investment-linked   | ULIP, money-back, participating plans          |
| Health insurance    | Individual, family floater, critical illness   |
| Vehicle insurance   | Two-wheeler, four-wheeler                      |
| Personal protection | Personal accident, disability                  |
| Travel insurance    | Domestic, international                        |
| Other               | Group, specialized and miscellaneous insurance |

The system must support category-specific information without requiring a completely separate data architecture for every policy type.

## 5. Functional requirements

### FR-01: User account and authentication

- Registration and login.
- Secure session management.
- User profile.
- Currency and locale preferences.
- Account deletion and data export.
- Future support for family members and shared access.

### FR-02: Policy document ingestion

PDF upload is the primary policy onboarding mechanism.

Workflow:

1. User selects a policy PDF.
2. Application securely uploads the document.
3. Document extraction service identifies its structure.
4. OCR is applied where the PDF contains scanned pages.
5. AI extracts structured policy information.
6. Application displays extracted fields for verification.
7. User corrects inaccurate or missing fields.
8. User confirms and saves the policy.

Extracted fields should include:

- Insurance provider.
- Policy number.
- Policyholder.
- Policy category and type.
- Policy commencement date.
- Policy end or maturity date.
- Premium amount.
- Premium frequency.
- Premium-paying term.
- Sum assured or coverage amount.
- Guaranteed benefits.
- Non-guaranteed benefits.
- Surrender conditions.
- Renewal conditions.
- Relevant exclusions.

**Important:** Extraction is not equivalent to verification. Every field must retain its extraction status and user-confirmation status.

Manual correction must always be available, even though PDF upload is the primary onboarding experience.

### FR-03: Policy management

- View all policies.
- View individual policy details.
- Edit policy information.
- Archive discontinued or expired policies.
- Track policy status.
- Attach additional documents.
- Maintain policy history.

Possible statuses:

- Active.
- Grace period.
- Paid-up.
- Lapsed.
- Surrendered.
- Matured.
- Expired.
- Under review.

### FR-04: Premium and payment management

Each policy must have an associated premium schedule and payment history.

Supported frequencies:

- Monthly.
- Quarterly.
- Half-yearly.
- Annually.
- Single premium.
- Custom schedule.

Features:

- Generate expected premium dates.
- Track paid, upcoming, overdue and missed payments.
- Record actual payment amounts.
- Record payment dates and references.
- Support late payments and revised premiums.
- Calculate total premiums paid.
- Calculate outstanding future commitments.

The system must distinguish expected payments from actual transactions.

### FR-05: Payment calendar and notifications

Users should be able to see:

- Payments due in the next 7 days.
- Payments due in the next 30 days.
- Payments due in the next 90 days.
- Payments due in the next 365 days.
- Upcoming renewals.
- Policy expirations.
- Maturity dates.

Notifications should be configurable and sent ahead of relevant deadlines.

### FR-06: Portfolio dashboard

The dashboard should display:

- Total active policies.
- Total annual premium commitment.
- Total premiums paid.
- Upcoming premium obligations.
- Monthly equivalent premium expense.
- Total insured coverage, broken down by coverage type.
- Upcoming maturity benefits.
- Policy distribution by category.

All aggregated financial figures must disclose their calculation basis.

### FR-07: Financial analysis

For applicable investment-linked policies:

- Total premiums paid.
- Total expected benefits.
- Guaranteed maturity benefits.
- Non-guaranteed projected benefits.
- Total profit or loss.
- Absolute ROI.
- XIRR.
- Inflation-adjusted value.
- Alternative investment comparison.

For protection-oriented policies:

- Coverage amount.
- Coverage duration.
- Premium cost.
- Renewal and expiry information.
- Exclusions and important conditions.

Do not apply investment ROI scoring to pure protection products.

### FR-08: Policy intelligence

Provide document-grounded policy explanations.

The system should help answer:

- What exactly does this policy cover?
- What benefits are guaranteed?
- What benefits are conditional?
- What happens if a premium is missed?
- What happens if the policy is surrendered?
- What happens if the policy becomes paid-up?
- What are the exclusions?
- What are the important renewal and claim conditions?

Potential financial red flags should be highlighted with supporting document references.

The application must not make unsupported claims that a policy is fraudulent or recommend surrendering a policy without sufficient information.

### FR-09: Data security

- Encrypt sensitive information in transit and at rest.
- Restrict access to uploaded policy documents.
- Implement user-level data isolation.
- Secure authentication and authorization.
- Avoid exposing policy documents through public URLs.
- Support account and document deletion.
- Maintain appropriate audit logs.
- Provide a clear privacy and consent policy.

---

## 6. MVP scope

The first release should contain:

| Feature                               | MVP priority         |
| ------------------------------------- | -------------------- |
| Authentication                        | P0                   |
| PDF policy upload                     | P0                   |
| OCR and AI extraction                 | P0                   |
| User verification of extracted fields | P0                   |
| Add, edit and archive policies        | P0                   |
| Multiple insurance categories         | P0                   |
| Premium schedules                     | P0                   |
| Payment history                       | P0                   |
| Upcoming payment calendar             | P0                   |
| Local notifications                   | P0                   |
| Portfolio dashboard                   | P0                   |
| Basic ROI calculations                | P0, where applicable |
| XIRR calculations                     | P1                   |
| Inflation-adjusted projections        | P1                   |
| AI policy explanations                | P1                   |
| Policy health assessment              | P1                   |
| Family management                     | P2                   |
| Email integration                     | P2                   |
| Alternative investment simulator      | P2                   |
| Automated insurer integrations        | P3                   |

P0 = Essential foundation  
P1 = First major enhancement  
P2 = Later enhancement  
P3 = Future exploration

### MVP release acceptance criteria

A release is considered usable when:

1. A user can register and securely log in.
2. A user can upload a policy PDF.
3. The system can extract available policy information.
4. The user can correct extracted information before saving.
5. A user can maintain multiple policies across categories.
6. Premium schedules are generated correctly.
7. Upcoming premium obligations are visible.
8. Payments can be recorded and reconciled.
9. Portfolio totals match the underlying policy and transaction records.
10. Financial calculations pass independently verified test cases.
11. Notifications work on supported mobile platforms.
12. A user can export or delete their data.

---

## 7. Non-functional requirements

- Mobile-first responsive experience.
- Secure document handling.
- Reliable financial calculations.
- Consistent data across devices.
- Graceful handling of OCR failures.
- Clear distinction between missing, estimated and verified information.
- Good performance with hundreds of policies and transactions.
- Maintainable modular architecture.
- Automated tests for financial calculations and premium schedules.
- Backup and recovery strategy.

## 8. Out of scope for the initial release

- Buying insurance inside the application.
- Selling or distributing insurance products.
- Direct integration with every insurance company.
- Automatic bank-account access.
- Automated investment recommendations.
- Automated policy cancellation or surrender.
- Insurance claim processing.

## 9. Success metrics

Initial product metrics:

- Number of successfully onboarded policies.
- Percentage of documents successfully extracted.
- Percentage of extracted fields corrected by users.
- Time required to onboard a policy.
- Accuracy of premium schedule generation.
- Accuracy of financial calculations.
- Number of upcoming payments successfully tracked.
- Weekly and monthly active users.
- Percentage of users maintaining complete policy records.

**North-star metric:** Percentage of a user's active insurance portfolio that is accurately documented, verified and financially tracked.

## 10. Future direction

Evolve from a personal insurance organizer into a trusted insurance intelligence platform for Indian households.

Potential future capabilities include family portfolios, advanced coverage analysis, policy comparisons, claim readiness, email ingestion and intelligent financial decision support.
