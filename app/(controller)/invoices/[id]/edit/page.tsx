import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/(controller)/controllers/breadcrumbs";
import type { Invoice } from "@/lib/data/schema/invoice";
import { InvoiceModel } from "@/lib/model/invoice";
import { FormHandler } from "@/ui/graphics/schema/form";
import { InvoiceView } from "@/ui/view/invoice";
import updateInvoice from "../../actions/update";
import cancelInvoice from "../../actions/cancel";

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
    const formResult = await view.render("edit", "jsx", {
      submit: updateInvoice.bind(null, id),
      cancel: cancelInvoice,
    } as FormHandler);
    if (formResult.status === "success") {
      const form = formResult.data;
      return (
        <main className="max-w-4xl mx-auto p-4">
          <Breadcrumbs
            breadcrumbs={[
              { label: "Invoices", href: "/invoices" },
              {
                label: "Edit Invoice",
                href: `/invoices/${id}/edit`,
                active: true,
              },
            ]}
          />
          {form}
        </main>
      );
    }
  } else {
    // Handle form rendering error
    return (
      <div className="p-4">
        <h1>Error</h1>
        <p>Failed to render invoice edit form</p>
      </div>
    );
  }
}
