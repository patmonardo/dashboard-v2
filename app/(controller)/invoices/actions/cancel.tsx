//@/(controller)/invoices/actions/cancel.tsx
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { InvoiceState } from "@/lib/data/schema/invoice";

// Cancel invoice
export default async function cancelInvoice(
  prev_state: InvoiceState,
  formData: FormData
) {
    revalidatePath("/invoices");
    redirect("/invoices");
}
