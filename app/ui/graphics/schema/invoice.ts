import { z } from 'zod'
import { FormShapeSchema } from './form'

// Extend the base layout so that actions remain available,
// then add a "sections" property if needed.
export const InvoiceFormShapeSchema = FormShapeSchema.extend({
  layout: FormShapeSchema.shape.layout.extend({
    sections: z.array(
      z.object({
        title: z.string(),
        fields: z.array(z.string())
      })
    ).optional() // make sections optional if not always needed
  })
})

export type InvoiceFormShape = z.infer<typeof InvoiceFormShapeSchema>
