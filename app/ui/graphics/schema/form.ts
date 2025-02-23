import { z } from 'zod'

// Define FormMatter type
export const FormMatterSchema = z.record(z.any()).optional()

// Define FormMode type
export const FormContentSchema = z.enum(['jsx', 'html', 'json', 'xml']).default('jsx');

// Define FormMode type
export const FormModeSchema = z.enum(['create', 'edit']).default('create');

// Form elements
export const FormElementSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'email', 'number', 'select', 'date']),
  label: z.string(),
  defaultValue: z.string().optional(),
  required: z.boolean().default(false),
})

// Form actions
export const FormActionSchema = z.object({
  type: z.enum(['submit', 'reset', 'cancel']),
  label: z.string(),
  variant: z.enum(['primary', 'secondary', 'ghost']),
})

// Form layout
export const FormLayoutSchema = z.object({
  title: z.string(),
  columns: z.enum(['single', 'double']),
  actions: z.array(FormActionSchema),
})

// Form state
export const FormStateSchema = z.object({
  status: z.enum(['idle', 'submitting', 'success', 'error']),
  errors: z.record(z.array(z.string())).optional(),
  message: z.string().optional(),
})

// Form shape
export const FormShapeSchema = z.object({
  layout: FormLayoutSchema,
  elements: z.array(FormElementSchema),
  state: FormStateSchema,
})

// Type exports
export type FormMatter = z.infer<typeof FormMatterSchema>;
export type FormContent = z.infer<typeof FormContentSchema>;
export type FormMode = z.infer<typeof FormModeSchema>;
export type FormElement = z.infer<typeof FormElementSchema>
export type FormAction = z.infer<typeof FormActionSchema>
export type FormLayout = z.infer<typeof FormLayoutSchema>
export type FormState = z.infer<typeof FormStateSchema>
export type FormShape = z.infer<typeof FormShapeSchema>
