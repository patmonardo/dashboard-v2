import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/(controller)/controllers/breadcrumbs";
import { updateCustomer, cancelCustomer } from "@/(controller)/customers/actions";
import type { Invoice } from "@/lib/data/schema/invoice";
import { InvoiceModel } from "@/lib/model/invoice";
import { FormHandler } from "@/ui/graphics/schema/form";
import { InvoiceView } from "@/ui/view/invoice";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const result = await InvoiceModel.findById(id);
  if (result.status === "error") {
    notFound();
  }
  if (result.status === "success") {
    const invoice = result.data as Invoice;
    const view = new InvoiceView(invoice);
    const formResult = view.render("edit", "jsx", {
      submit: updateCustomer.bind(null, id), // Bind id parameter
      cancel: cancelCustomer,
    } as FormHandler);
    if (formResult.status === "success") {
      const form = formResult.data;
      return (
        <main>
          <Breadcrumbs
            breadcrumbs={[
              { label: "Invoices", href: "/dashboard/invoices" },
              {
                label: "Edit Invoice",
                href: `/dashboard/invoices/${id}/edit`,
                active: true,
              },
            ]}
          />
          {form}
        </main>
      );
  }
}
}

