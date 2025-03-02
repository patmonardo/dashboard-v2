//lib/data/schema/revenue.ts
import { z } from 'zod'
import { BaseSchema, BaseStateSchema } from './base'

export const RevenueSchema = z.object({
  id: z.string().uuid(),
  month: z.date(),
  revenue: z.number(), // Use z.number() instead of Decimal
  expenses: z.number().optional().default(0) // Use z.number() instead of Decimal
})

// State Schema - Runtime state and validation errors
export const RevenueStateSchema = BaseStateSchema.extend({
  errors: z.object({
    month: z.array(z.string()).optional(),
    revenue: z.array(z.string()).optional(),
    expenses: z.array(z.string()).optional()
  }).optional()
})

// Shape Schema - Aggregates data and state
export const RevenueShapeSchema = z.object({
  base: RevenueSchema,
  state: RevenueStateSchema
})

export const CreateRevenueSchema = RevenueSchema.omit({
  id: true
})

export const UpdateRevenueSchema = RevenueSchema.omit({
  id: true
}).partial()

// Type exports
export type Revenue = z.infer<typeof RevenueSchema>
export type RevenueState = z.infer<typeof RevenueStateSchema>
export type RevenueShape = z.infer<typeof RevenueShapeSchema>
export type CreateRevenue = z.infer<typeof CreateRevenueSchema>
export type UpdateRevenue = z.infer<typeof UpdateRevenueSchema>
