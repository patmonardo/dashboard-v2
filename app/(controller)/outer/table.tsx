//@/(controller)/outer/table.tsx
import { InvoiceController } from "@/(controller)/inner/invoice";

export async function LatestInvoices() {
  return await InvoiceController.latestInvoices();
}
