import { z } from "zod";
import { FormShapeSchema, FormActionSchema } from "./form";

// Customer field identifiers
const CustomerFieldId = z.enum(["name", "email", "imageUrl"]);

// Customer field types
const CustomerFieldType = z.enum(["text", "email", "url"]);

// Customer-specific form fields
export const CustomerFieldShapeSchema = z.object({
  id: CustomerFieldId,
  type: CustomerFieldType,
  label: z.string(),
  required: z.boolean().default(false),
  defaultValue: z.string().optional(),
});

// The complete customer form shape
export const CustomerFormShapeSchema = FormShapeSchema.extend({
  layout: z.object({
    title: z.string(),
    columns: z.literal("single"),
    sections: z.array(
      z.object({
        title: z.string(),
        fieldIds: z.array(CustomerFieldId),
      })
    ),
    actions: z.array(FormActionSchema).default([]),
  }),
  fields: z.array(CustomerFieldShapeSchema),
});

export type CustomerFieldShape = z.infer<typeof CustomerFieldShapeSchema>;
export type CustomerFormShape = z.infer<typeof CustomerFormShapeSchema>;
