import { calculateAbsoluteRoi, calculateXirr, CashFlow } from '../src';

describe('Financial Engine', () => {
    describe('calculateAbsoluteRoi', () => {
        it('calculates positive ROI accurately', () => {
            const roi = calculateAbsoluteRoi(100000, 150000);
            expect(roi).toBe(50);
        });

        it('calculates negative ROI for loss accurately', () => {
            const roi = calculateAbsoluteRoi(100000, 80000);
            expect(roi).toBe(-20);
        });

        it('returns 0 if invested amount is zero or negative', () => {
            expect(calculateAbsoluteRoi(0, 50000)).toBe(0);
            expect(calculateAbsoluteRoi(-100, 50000)).toBe(0);
        });
    });

    describe('calculateXirr', () => {
        it('calculates exact 1-year annualized return', () => {
            const cashFlows: CashFlow[] = [
                { date: new Date('2024-01-01'), amount: -10000 },
                { date: new Date('2025-01-01'), amount: 11000 },
            ];

            const xirr = calculateXirr(cashFlows);
            expect(xirr).not.toBeNull();
            expect(xirr).toBeCloseTo(10, 0); // ~10% annualized return
        });

        it('calculates multi-period irregular cash flows correctly', () => {
            const cashFlows: CashFlow[] = [
                { date: new Date('2023-01-01'), amount: -50000 },
                { date: new Date('2024-01-01'), amount: -50000 },
                { date: new Date('2025-01-01'), amount: 120000 },
            ];

            const xirr = calculateXirr(cashFlows);
            expect(xirr).not.toBeNull();
            expect(xirr).toBeGreaterThan(0);
        });

        it('returns null if fewer than 2 cash flows are provided', () => {
            expect(calculateXirr([])).toBeNull();
            expect(calculateXirr([{ date: new Date(), amount: -1000 }])).toBeNull();
        });
    });
});
