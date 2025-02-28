import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/(controller)/controllers/breadcrumbs";
import { createInvoice, cancelInvoice } from "@/(controller)/invoices/actions";
import { FormHandler } from "@/ui/graphics/schema/form";
import { InvoiceView } from "@/ui/view/invoice";

export default async function Page() {
  const view = new InvoiceView();
  const result = view.render("create", "jsx", {
    submit: createInvoice,
    cancel: cancelInvoice,
  } as FormHandler);
  if (result.status === "error") {
    notFound();
  }
  if (result.status === "success") {
    const form = result.data;
    return (
      <main>
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
}
