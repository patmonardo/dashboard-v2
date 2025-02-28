import { describe, it, expect } from 'vitest';
import { RevenueModel } from './revenue';
import { CreateRevenue, UpdateRevenue } from '../data/schema/revenue';
import { prisma } from '../data/client';

describe('RevenueModel (Database)', () => {
    it('should create and delete revenue entries', async () => {
        const createdIds: string[] = [];

        try {
            // Create revenue entries for different months
            for (let i = 1; i <= 3; i++) {
                const createData: CreateRevenue = {
                    month: new Date(2023, i, 1), // Different months
                    revenue: 1000 * i,
                    expenses: 500 * i
                };

                const result = await RevenueModel.create(createData);

                expect(result.status).toBe('success');
                expect(result.data).toBeDefined();
                expect(result.data?.revenue).toBe(createData.revenue);
                expect(result.data?.expenses).toBe(createData.expenses);

                if (result.data?.id) {
                    createdIds.push(result.data.id);
                }
            }

            // Verify we can get metrics
            const metrics = await RevenueModel.getMonthlyMetrics();
            expect(metrics.length).toBeGreaterThanOrEqual(3);

            // Check profit calculation
            metrics.forEach(metric => {
                expect(metric.profit).toBe(metric.revenue - metric.expenses);
            });

        } finally {
            // Clean up created entries
            await Promise.all(
                createdIds.map(async (id) => {
                    try {
                        await prisma.revenue.delete({ where: { id } });
                    } catch (error) {
                        console.error(`Failed to delete revenue ${id}:`, error);
                    }
                })
            );
        }
    });

    it('should update a revenue entry', async () => {
        let revenueId: string | undefined;

        try {
            // Create a revenue entry
            const createData: CreateRevenue = {
                month: new Date(2023, 5, 1), // June 2023
                revenue: 2000,
                expenses: 1000
            };

            const createResult = await RevenueModel.create(createData);
            expect(createResult.status).toBe('success');
            revenueId = createResult.data?.id;

            // Update the revenue entry
            const updateData: UpdateRevenue = {
                revenue: 2500,
                expenses: 1200
            };

            const updateResult = await RevenueModel.update(revenueId!, updateData);

            expect(updateResult.status).toBe('success');
            expect(updateResult.data?.revenue).toBe(updateData.revenue);
            expect(updateResult.data?.expenses).toBe(updateData.expenses);

            // Verify the profit calculation through metrics
            const metrics = await RevenueModel.getMonthlyMetrics();
            const updatedEntry = metrics.find(m =>
                m.month.getMonth() === 5 && m.month.getFullYear() === 2023
            );

            expect(updatedEntry).toBeDefined();
            expect(updatedEntry?.profit).toBe(2500 - 1200);

        } finally {
            if (revenueId) {
                await prisma.revenue.delete({ where: { id: revenueId } });
            }
        }
    });

    it('should find all revenue entries', async () => {
        const result = await RevenueModel.findMany();
        expect(Array.isArray(result)).toBe(true);
    });

    it('should count revenue entries', async () => {
        const count = await RevenueModel.count();
        expect(typeof count).toBe('number');
    });
});
