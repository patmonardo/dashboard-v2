import { z } from "zod";

// Define FormMatter type
export const FormMatterSchema = z.record(z.any()).optional();

// Define FormMode type
export const FormModeSchema = z.enum(["create", "edit"]).default("create");

// Define FormMode type
export const FormContentSchema = z.enum(["jsx", "html", "json", "xml"]).default("jsx");

// Form content
export const FormOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const FormHandlerSchema = z.object({
  submit: z.function(),
  reset: z.function().optional(),
  cancel: z.function().optional(),
  delete: z.function().optional(),
});

// Form elements
export const FormFieldSchema = z.object({
  id: z.string(), // Link to FormMatter
  type: z.string(),
  label: z.string(),
  required: z.boolean(),
  defaultValue: z.string(),
  options: z.array(FormOptionSchema).optional(),
});

export const FormActionSchema = z.object({
  id: z.string().default("submit"),// Link to FormHandler
  type: z.enum(["submit", "reset", "button"]).readonly(),
  label: z.string(),
  variant: z.enum(["primary", "secondary", "ghost"]),
  options: z.array(FormOptionSchema).optional(),
});


// Form layout
export const FormLayoutSchema = z.object({
  title: z.string(),
  columns: z.enum(["single", "double"]),
  actions: z.array(FormActionSchema),
});

// Form state
export const FormStateSchema = z.object({
  status: z.enum(["idle", "submitting", "success", "error"]),
  errors: z.record(z.array(z.string())).optional(),
  message: z.string().optional(),
});

// Form shape
export const FormShapeSchema = z.object({
  fields: z.array(FormFieldSchema),
  layout: FormLayoutSchema,
  state: FormStateSchema,
});

// Type exports
export type FormMatter = z.infer<typeof FormMatterSchema>;
export type FormMode = z.infer<typeof FormModeSchema>;
export type FormContent = z.infer<typeof FormContentSchema>;
export type FormOptions = z.infer<typeof FormOptionSchema>;
export type FormHandler = z.infer<typeof FormHandlerSchema>;
export type FormField = z.infer<typeof FormFieldSchema>;
export type FormAction = z.infer<typeof FormActionSchema>;
export type FormLayout = z.infer<typeof FormLayoutSchema>;
export type FormState = z.infer<typeof FormStateSchema>;
export type FormShape = z.infer<typeof FormShapeSchema>;
