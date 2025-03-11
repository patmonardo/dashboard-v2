//@/ui/view/invoice.ts
import type { OperationResult } from "@/lib/data/schema/base";
import { Invoice, InvoiceWithCustomer } from "@/lib/data/schema/invoice";
import { InvoiceForm } from "@/ui/graphics/forms/invoice";
import { InvoiceFormShape } from "@/ui/graphics/schema/invoice";
import { formatCurrency } from "@/lib/data/formatting";
import { LatestInvoiceDisplay } from "@/ui/graphics/schema/invoice";
import { LatestInvoicesCard } from "@/ui/graphics/cards/invoice";
import { FormView } from "./form";

export class InvoiceView extends FormView<InvoiceFormShape> {
  constructor(private readonly invoice?: Invoice) {
    super(new InvoiceForm(invoice));
  }

  static async displayInvoices(
    invoices: InvoiceWithCustomer[]
  ): Promise<OperationResult<any>> {
    // Status color mapping
    const statusColors = {
      PAID: "bg-green-500",
      PENDING: "bg-yellow-500",
      OVERDUE: "bg-red-500",
      DRAFT: "bg-gray-500",
    };

    // Transform to display format
    const displayData: LatestInvoiceDisplay[] = invoices.map((invoice) => ({
      id: invoice.id,
      customer: {
        name: invoice.customer.name,
        email: invoice.customer.email,
      },
      amount: invoice.amount,
      formattedAmount: formatCurrency(invoice.amount),
      date: invoice.date,
      formattedDate: formatInvoiceDate(invoice.date),
      status: invoice.status,
      statusColor: statusColors[invoice.status],
    }));

    // Render the invoices card
    const card = LatestInvoicesCard({ invoices: displayData });
    return {
      status: "success",
      message: "Latest invoices display",
      data: card,
    };
  }
}

// Helper for formatting dates
function formatInvoiceDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
