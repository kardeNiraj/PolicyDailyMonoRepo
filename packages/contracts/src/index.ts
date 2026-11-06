/**
 * PolicyDaily Core Domain Contracts
 */

export enum PolicyCategory {
    LIFE = 'LIFE',
    INVESTMENT_LINKED = 'INVESTMENT_LINKED',
    HEALTH = 'HEALTH',
    VEHICLE = 'VEHICLE',
    PERSONAL_ACCIDENT = 'PERSONAL_ACCIDENT',
    TRAVEL = 'TRAVEL',
    OTHER = 'OTHER',
}

export enum PolicyStatus {
    ACTIVE = 'ACTIVE',
    GRACE_PERIOD = 'GRACE_PERIOD',
    PAID_UP = 'PAID_UP',
    LAPSED = 'LAPSED',
    SURRENDERED = 'SURRENDERED',
    MATURED = 'MATURED',
    EXPIRED = 'EXPIRED',
    UNDER_REVIEW = 'UNDER_REVIEW',
}

export enum PremiumFrequency {
    MONTHLY = 'MONTHLY',
    QUARTERLY = 'QUARTERLY',
    HALF_YEARLY = 'HALF_YEARLY',
    ANNUALLY = 'ANNUALLY',
    SINGLE = 'SINGLE',
}

export enum ExtractionStatus {
    PENDING = 'PENDING',
    PROCESSING = 'PROCESSING',
    EXTRACTED = 'EXTRACTED',
    FAILED = 'FAILED',
}

export enum VerificationStatus {
    UNVERIFIED = 'UNVERIFIED',
    USER_CONFIRMED = 'USER_CONFIRMED',
    REJECTED = 'REJECTED',
}

export interface PolicySummaryDTO {
    id: string;
    userId: string;
    category: PolicyCategory;
    policyType: string;
    providerName: string;
    policyNumber: string;
    status: PolicyStatus;
    sumAssured: number;
    premiumAmount: number;
    premiumFrequency: PremiumFrequency;
    commencementDate: string;
    maturityDate?: string;
    nextPaymentDueDate?: string;
}

export interface ExtractedField<T = string | number> {
    value: T;
    confidence: number;
    pageNumber?: number;
    isConfirmed: boolean;
}

export interface ExtractedPolicyDataDTO {
    providerName?: ExtractedField<string>;
    policyNumber?: ExtractedField<string>;
    policyholderName?: ExtractedField<string>;
    category?: ExtractedField<PolicyCategory>;
    policyType?: ExtractedField<string>;
    commencementDate?: ExtractedField<string>;
    maturityDate?: ExtractedField<string>;
    premiumAmount?: ExtractedField<number>;
    premiumFrequency?: ExtractedField<PremiumFrequency>;
    premiumPayingTermYears?: ExtractedField<number>;
    policyTermYears?: ExtractedField<number>;
    sumAssured?: ExtractedField<number>;
    guaranteedBenefits?: ExtractedField<string>;
    nonGuaranteedBenefits?: ExtractedField<string>;
    exclusions?: ExtractedField<string[]>;
}
