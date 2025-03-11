//@/(controller)/outer/chart.tsx

import { RevenueController } from "@/(controller)/inner/revenue";

export async function RevenueChart() {
  return await RevenueController.displayChart();
}
