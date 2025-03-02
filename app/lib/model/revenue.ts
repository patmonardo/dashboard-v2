//@/lib/data/schema/revenue.ts
import { z } from 'zod'
import { prisma } from '../data/client'
import {
  RevenueSchema,
  CreateRevenueSchema,
  UpdateRevenueSchema,
  type Revenue,
  type CreateRevenue,
  type UpdateRevenue
} from '../data/schema/revenue'
import type { OperationResult } from '../data/schema/base'

type RevenueResult = Pick<Revenue, 'month' | 'revenue' | 'expenses'>

type RevenueMetric = {
  month: Date,
  revenue: number,
  expenses: number,
  profit: number,
}

export class RevenueModel {

  static async create(data: CreateRevenue): Promise<OperationResult<Revenue>> {
    try {
      const validated = CreateRevenueSchema.safeParse({
        ...data,
        expenses: data.expenses || 0  // Ensure expenses has a default value
      })

      if (!validated.success) {
        return {
          data: null,
          status: 'error',
          message: 'Missing Fields. Failed to Create Revenue.',
        }
      }
      const revenue = await prisma.revenue.create({
        data: {
          month: validated.data?.month,
          revenue: validated.data?.revenue,
          expenses: validated.data?.expenses
        }
      })
      return {
        data: revenue,
        status: 'success',
        message: 'Revenue created successfully'
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          data: null,
          status: 'error',
          message: 'Validation failed',
        }
      }
      return {
        data: null,
        status: 'error',
        message: 'Failed to create revenue entry'
      }
    }
  }

  static async update(id: string, data: UpdateRevenue): Promise<OperationResult<Revenue>> {
    try {
      const validated = UpdateRevenueSchema.parse(data);

      const revenue = await prisma.revenue.update({
        where: { id },
        data: {
          ...validated,
        },
      });

      return {
        data: revenue,
        status: 'success',
        message: 'Revenue updated successfully',
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          data: null,
          status: 'error',
          message: 'Validation failed',
        };
      }
      return {
        data: null,
        status: 'error',
        message: 'Failed to update revenue entry',
      };
    }
  }

  static async getMonthlyMetrics() {
    const results = await prisma.revenue.findMany({
      orderBy: { month: 'asc' },
      select: {
        month: true,
        revenue: true,
        expenses: true
      }
    })

    return results.map((entry: RevenueResult): RevenueMetric => ({
      month: entry.month,
      revenue: entry.revenue,
      expenses: entry.expenses,
      profit: entry.revenue - entry.expenses // Use subtraction directly
    }))
  }

  static async findMany() {
    return await prisma.revenue.findMany({
      orderBy: { month: 'asc' }
    })
  }

  static async count() {
    return await prisma.revenue.count()
  }
}
