import { DashboardModel } from '@/lib/model/dashboard';
import { DashboardView } from '@/ui/view/dashboard';
import { RevenueChart } from '@/ui/graphics/charts/revenue';
import { LatestInvoicesCard } from '@/ui/graphics/cards/latest-invoices-card';

export async function RevenueChartWrapper() {
  // Fetch revenue data
  const revenue = await DashboardModel.getRevenue();

  // Format the data using the view
  const formattedRevenue = DashboardView.formatRevenueData(revenue);

  // Return the client component with the formatted data
  return <RevenueChart revenue={formattedRevenue} />;
}


export async function LatestInvoicesWrapper() {
  // Fetch latest invoices
  const latestInvoices = await DashboardModel.getLatestInvoices();

  // Format using the view
  const formattedInvoices = DashboardView.formatLatestInvoices(latestInvoices);

  return <LatestInvoicesCard invoices={formattedInvoices} />;
}
