import { z } from 'zod'
import { Decimal } from '@prisma/client/runtime/library'

// Base Schema (all entities have these properties)
export const BaseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Base State (runtime state)
export const BaseStateSchema = z.object({
  status: z.enum(['active', 'archived', 'deleted']),
  validation: z.record(z.array(z.string())).optional(),
  message: z.string().optional()
})

// Base Shape (Structure + State)
export const BaseShapeSchema = z.object({
  base: BaseSchema,
  state: BaseStateSchema
})

// Simple operation result type
export function OperationResultSchema<T>() {
  return z.object({
    data: z.nullable(z.any() as z.ZodType<T>),
    status: z.enum(['success', 'error']),
    message: z.string(),
  });
}

export type OperationResult<T> = z.infer<ReturnType<typeof OperationResultSchema<T>>>;

// Base monetary value
export const MonetarySchema = z.object({
  amount: z.instanceof(Decimal),
  currency: z.string().default('USD')
})

// Base time period
export const PeriodSchema = z.object({
  startDate: z.date(),
  endDate: z.date().optional()
})

export type Base = z.infer<typeof BaseSchema>
export type BaseState = z.infer<typeof BaseStateSchema>
export type BaseShape = z.infer<typeof BaseShapeSchema>
export type Monetary = z.infer<typeof MonetarySchema>
export type Period = z.infer<typeof PeriodSchema>
