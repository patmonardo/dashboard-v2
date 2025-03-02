//@/(controller)/inner/revenue.tsx
import { DashboardModel } from '@/lib/model/dashboard';
import { DashboardView } from '@/ui/view/dashboard';
import { RevenueChart } from '@/ui/graphics/charts/revenue';

export async function RevenueChartWrapper() {
  // Fetch revenue data
  const revenue = await DashboardModel.getRevenue();

  // Format the data using the view
  const formattedRevenue = DashboardView.formatRevenueData(revenue);

  // Return the client component with the formatted data
  return <RevenueChart revenue={formattedRevenue} />;
}
