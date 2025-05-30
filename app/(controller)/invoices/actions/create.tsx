"use server";

import { InvoiceController } from "@/(controller)/inner/invoice";

/**
 * Server action that proxies to the controller method for updating a invoice
 * @param id The invoice id to update
 * @param formData Form data with updated invoice information
 */
export default async function createInvoice(formData: FormData) {
  return InvoiceController.createInvoice(formData);
}
