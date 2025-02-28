"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateInvoice, UpdateInvoice } from "@/lib/data/schema/invoice";
import { InvoiceState } from "@/lib/data/schema/invoice";
import { InvoiceModel } from "@/lib/model/invoice";

// Create invoice with error handling
export async function createInvoice(
  prev_state: InvoiceState,
  formData: FormData
) {
    const result = await InvoiceModel.create({
      customerId: formData.get("customerId") as string,
      amount: Number(formData.get("amount") as string),
      date: new Date(formData.get("date") as string),
      status: formData.get("status") as string,
    } as CreateInvoice);

    if (result.status === "error") {
      return {
        message: result.message,
        errors: result.errors, // Return structured errors from model
        ...prev_state
      };
    }

    revalidatePath("/invoices");
    redirect("/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
    const result = await InvoiceModel.update(id, {
      customerId: formData.get("customerId") as string,
      amount: Number(formData.get("amount") as string),
      date: new Date(formData.get("date") as string),
      status: formData.get("status") as string,
    } as UpdateInvoice);

    if (result.status === "error") {
      return {
        status: 'error',
        message: result.message,
        errors: result.errors
      };
    }

    revalidatePath("/invoices");
    redirect("/invoices");

}

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

// Create invoice with error handling
export async function cancelInvoice(
  prev_state: InvoiceState,
  formData: FormData
) {
    revalidatePath("/invoices");
    redirect("/invoices");
}
