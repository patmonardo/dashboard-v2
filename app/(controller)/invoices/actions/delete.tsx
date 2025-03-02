//@/(controller)/invoices/actions/delete.tsx
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateInvoice } from "@/lib/data/schema/invoice";
import { InvoiceState } from "@/lib/data/schema/invoice";
import { InvoiceModel } from "@/lib/model/invoice";

export async function deleteInvoice(id: string) {
  const result = await InvoiceModel.delete(id);

  if (result.status === "error") {
    return {
      message: result.message || "Database Error: Failed to Delete Invoice.",
    };
  }

  revalidatePath("/invoices");
  return { message: "Invoice deleted successfully" };
}
