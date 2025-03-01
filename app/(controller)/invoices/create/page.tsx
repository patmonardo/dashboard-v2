import { notFound } from "next/navigation";
import Breadcrumbs from "@/(controller)/controllers/breadcrumbs";
import { FormHandler } from "@/ui/graphics/schema/form";
import { InvoiceView } from "@/ui/view/invoice";
import createInvoice from "../actions/create";
import cancelInvoice from "../actions/cancel";

export default async function Page() {
  const view = new InvoiceView();
  const result = await view.render("create", "jsx", {
    submit: createInvoice,
    cancel: cancelInvoice,
  } as FormHandler);
  if (result.status !== "success") {
    notFound();
  }
  const form = result.data;
  return (
    <main className="max-w-4xl mx-auto p-4">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/invoices" },
          {
            label: "Create Invoice",
            href: "/invoices/create",
            active: true,
          },
        ]}
      />
      {form}
    </main>
  );
}
