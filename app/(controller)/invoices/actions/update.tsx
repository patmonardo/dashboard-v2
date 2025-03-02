//@/(controller)/invoices/actions/update.tsx
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UpdateInvoice } from "@/lib/data/schema/invoice";
import { InvoiceModel } from "@/lib/model/invoice";

export default async function updateInvoice(id: string, formData: FormData) {
  try {
    // Extract data from form
    const customerId = formData.get("customerId") as string;
    const amountStr = formData.get("amount") as string;
    const dateStr = formData.get("date") as string;
    const status = formData.get("status") as string;

    // Validate required fields
    if (!customerId || !amountStr || !dateStr || !status) {
      return {
        status: "error",
        message: "All fields are required"
      };
    }

    // Convert and validate numbers and dates
    const amount = Number(amountStr);
    const date = new Date(dateStr);

    if (isNaN(amount) || amount <= 0) {
      return {
        status: "error",
        message: "Amount must be a positive number"
      };
    }

    if (isNaN(date.getTime())) {
      return {
        status: "error",
        message: "Invalid date format"
      };
    }

    // Update invoice in database
    const result = await InvoiceModel.update(id, {
      customerId,
      amount,
      date,
      status
    } as UpdateInvoice);

    if (result.status === "error") {
      return {
        status: "error",
        message: result.message || "Failed to update invoice"
      };
    }

    // Clear page cache
    revalidatePath("/invoices");
  } catch (error) {
    console.error("Error updating invoice:", error);
    return {
      status: "error",
      message: "An unexpected error occurred"
    };
  }

  // Redirect outside try/catch block
  redirect("/invoices");
}
