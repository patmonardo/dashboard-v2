import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { InvoiceState } from "@/lib/data/schema/invoice";
import { InvoiceModel } from "@/lib/model/invoice";

// Create Customer action
export async function createInvoice(
  prev_state: InvoiceState,
  formData: FormData
) {
  const result = await InvoiceModel.create({
    customerId: formData.get("customerId") as string,
    amount: Number(formData.get("amount") as string),
    date: new Date(formData.get("date") as string),
    status: formData.get("status") as string,
  });
  if (result.status === "error") {
  }
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function updateInvoice(id: string, formData: FormData) {
  const result = await InvoiceModel.update(id, {
    customerId: formData.get("customerId") as string,
    amount: Number(formData.get("amount") as string),
    date: new Date(formData.get("date") as string),
    status: formData.get("status") as string,
  });
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function deleteInvoice(id: string) {
  const result = await InvoiceModel.delete(id);
  if (result.status === "error") {
    revalidatePath("/dashboard/customers");
    return {
      message: "Database Error: Failed to Delete Customer.",
    };
  }
}
