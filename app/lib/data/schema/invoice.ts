import { z } from 'zod'
import { BaseSchema, BaseStateSchema } from './base'

// Base Invoice Schema
export const InvoiceSchema = BaseSchema.extend({
  customerId: z.string().uuid(),
  amount: z.number().int().positive(), // Ensure amount is positive
  status: z.enum(['PENDING', 'PAID', 'OVERDUE', 'DRAFT']), // Restore the enum
  date: z.date().optional()
})

// Invoice state schema
export const InvoiceStateSchema = BaseStateSchema.extend({
  errors: z.object({
    customerId: z.array(z.string()).optional(),
    amount: z.array(z.string()).optional(),
    status: z.array(z.string()).optional()
  }).optional(),
})

// Invoice shape schema
export const InvoiceShapeSchema = z.object({
  base: InvoiceSchema,
  state: InvoiceStateSchema
})

export const CreateInvoiceSchema = InvoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  amount: z.number().positive({
    message: 'Amount must be greater than 0'
  })
})

export const UpdateInvoiceSchema = InvoiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
}).partial()  // Makes all fields optional for updates

export type Invoice = z.infer<typeof InvoiceSchema>
export type InvoiceState = z.infer<typeof InvoiceStateSchema>
export type InvoiceShape = z.infer<typeof InvoiceShapeSchema>
export type CreateInvoice = z.infer<typeof CreateInvoiceSchema>
export type UpdateInvoice = z.infer<typeof UpdateInvoiceSchema>
