import { notFound } from "next/navigation";
import Breadcrumbs from "@/(controller)/controllers/breadcrumbs";
import { InvoiceModel } from "@/lib/model/invoice";
import { InvoiceView } from "@/ui/view/invoice";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const invoice = await InvoiceModel.findById(id);
  if (!invoice) {
    notFound();
  }
  const view = new InvoiceView(invoice);
  const form = view.render("edit", "jsx");
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
