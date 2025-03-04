import { LatestInvoicesCard } from '@/ui/graphics/cards/invoice';
import { InvoiceModel } from '@/lib/model/invoice';
import { formatCurrency } from '@/lib/data/formatting';
import { LatestInvoiceDisplay } from '@/ui/graphics/schema/invoice';

// Status color mapping
const statusColors = {
  PAID: 'bg-green-500',
  PENDING: 'bg-yellow-500',
  OVERDUE: 'bg-red-500',
  DRAFT: 'bg-gray-500',
};

export async function LatestInvoicesController() {
  // Fetch latest invoices with customer data
  const result = await InvoiceModel.getLatestWithCustomers(5);
  if (result.status !== 'success' || !result.data) {
    console.error('Error fetching latest invoices:', result.message);
    return null;
  }
  const invoices = result.data;
  // Transform to display format
  const displayData: LatestInvoiceDisplay[] = invoices.map(invoice => ({
    id: invoice.id,
    customer: {
      name: invoice.customer.name,
      email: invoice.customer.email
    },
    amount: invoice.amount,
    formattedAmount: formatCurrency(invoice.amount),
    date: invoice.date,
    formattedDate: formatInvoiceDate(invoice.date),
    status: invoice.status,
    statusColor: statusColors[invoice.status]
  }));

  // Render the invoices card
  return <LatestInvoicesCard invoices={displayData} />;
}

// Helper for formatting dates
function formatInvoiceDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}
