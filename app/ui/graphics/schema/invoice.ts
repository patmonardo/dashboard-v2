// filepath: /home/pat/VSCode/dashboard-v2/app/ui/graphics/schema/invoice.ts
import { z } from "zod";
import { FormActionSchema, FormShapeSchema } from "./form";

// Invoice field identifiers
const InvoiceFieldId = z.enum(["customerId", "amount", "date", "status"]);

// Invoice field types
const InvoiceFieldType = z.enum(["text", "number", "date", "select"]);

// Invoice-specific form field
export const InvoiceFieldShapeSchema = z.object({
  id: InvoiceFieldId,
  type: InvoiceFieldType,
  label: z.string(),
  required: z.boolean().default(false),
  defaultValue: z.string(),
});

// Extend the base layout so that actions remain available,
// then add a "sections" property if needed.
export const InvoiceFormShapeSchema = FormShapeSchema.extend({
  layout: z.object({
    title: z.string(),
    columns: z.literal("single"),
    sections: z.array(
        z.object({
          title: z.string(),
          fieldIds: z.array(InvoiceFieldId),
        })
      ), // make sections optional if not always needed
    actions: z.array(FormActionSchema).default([]),
  }),
  fields: z.array(InvoiceFieldShapeSchema),
});

export type InvoiceFieldShape = z.infer<typeof InvoiceFieldShapeSchema>;
export type InvoiceFormShape = z.infer<typeof InvoiceFormShapeSchema>;
