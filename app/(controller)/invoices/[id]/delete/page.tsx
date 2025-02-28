import { notFound, redirect } from "next/navigation";
import { InvoiceModel } from "@/lib/model/invoice";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const result = await InvoiceModel.delete(id);
  if (result.status === "error") {
    notFound();
  }
  if (result.status === "success") {
    redirect("/invoices");
  }
}
