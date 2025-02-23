import { z } from 'zod'
import { ChartShapeSchema } from '../schema/chart'

export const RevenueChartSchema = ChartShapeSchema.extend({
  data: z.object({
    variables: z.array(z.object({
      name: z.enum(['month', 'revenue', 'expenses']),
      type: z.enum(['temporal', 'quantitative'])
    }))
  }),
  visual: z.object({
    type: z.enum(['bar', 'line']),
    color: z.string(),
    opacity: z.number()
  })
})

export type RevenueChart = z.infer<typeof RevenueChartSchema>
