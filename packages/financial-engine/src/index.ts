/**
 * Financial Calculation Engine for PolicyDaily
 * Pure, deterministic mathematical calculations for investment-linked insurance products.
 */

export interface CashFlow {
    date: Date;
    amount: number; // Negative for premiums paid (outflow), positive for benefits received (inflow)
}

export interface ReturnAnalysisResult {
    totalPremiumsPaid: number;
    totalExpectedBenefits: number;
    netGain: number;
    absoluteRoiPercentage: number;
    annualizedReturnXirr?: number;
}

/**
 * Calculates absolute Return on Investment (ROI)
 * Formula: ((Total Returns - Total Cost) / Total Cost) * 100
 */
export function calculateAbsoluteRoi(totalInvested: number, totalReturns: number): number {
    if (totalInvested <= 0) return 0;
    const gain = totalReturns - totalInvested;
    return (gain / totalInvested) * 100;
}

/**
 * Deterministic Net Present Value (NPV) calculation for XIRR solver
 */
export function calculateXirrNpv(rate: number, cashFlows: CashFlow[]): number {
    if (cashFlows.length === 0) return 0;
    const startDate = cashFlows[0].date.getTime();

    return cashFlows.reduce((acc, cf) => {
        const days = (cf.date.getTime() - startDate) / (1000 * 60 * 60 * 24);
        const discountFactor = Math.pow(1 + rate, days / 365.0);
        return acc + cf.amount / discountFactor;
    }, 0);
}

/**
 * Calculates XIRR (Extended Internal Rate of Return) using the Newton-Raphson method
 */
export function calculateXirr(
    cashFlows: CashFlow[],
    guess = 0.1,
    maxIterations = 100,
    tolerance = 1e-6,
): number | null {
    if (cashFlows.length < 2) return null;

    let rate = guess;
    const startDate = cashFlows[0].date.getTime();

    for (let i = 0; i < maxIterations; i++) {
        let npv = 0;
        let dNpv = 0;

        for (const cf of cashFlows) {
            const days = (cf.date.getTime() - startDate) / (1000 * 60 * 60 * 24);
            const years = days / 365.0;
            const factor = Math.pow(1 + rate, years);

            npv += cf.amount / factor;
            dNpv -= (years * cf.amount) / (factor * (1 + rate));
        }

        if (Math.abs(npv) < tolerance) {
            return rate * 100; // Return as percentage
        }

        if (Math.abs(dNpv) < 1e-12) {
            return null; // Derivative too small, cannot converge
        }

        const newRate = rate - npv / dNpv;
        if (Math.abs(newRate - rate) < tolerance) {
            return newRate * 100;
        }

        rate = newRate;
    }

    return null; // Failed to converge
}
