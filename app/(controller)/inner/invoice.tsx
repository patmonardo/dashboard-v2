//(controller)/inner/invoice.tsx
import { DashboardModel } from '@/lib/model/dashboard';
import { DashboardView } from '@/ui/view/dashboard';
import { LatestInvoicesCard } from '@/ui/graphics/cards/invoice';

export async function LatestInvoicesWrapper() {
  // Fetch latest invoices
  const latestInvoices = await DashboardModel.getLatestInvoices();

  // Format using the view
  const formattedInvoices = DashboardView.formatLatestInvoices(latestInvoices);

  return <LatestInvoicesCard invoices={formattedInvoices} />;
}
