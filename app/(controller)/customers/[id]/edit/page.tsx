import { notFound } from "next/navigation";
import Breadcrumbs from "@/(controller)/controllers/breadcrumbs";
import { CustomerModel } from "@/lib/model/customer";
import { CustomerView } from "@/ui/view/customer";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const customer = await CustomerModel.findById(id);
  if (!customer) {
    notFound();
  }
  const view = new CustomerView(customer);
  const form = view.render("edit", "jsx");
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Customers", href: "/dashboard/customers" },
          {
            label: "Edit Customer",
            href: `/dashboard/customers/${id}/edit`,
            active: true,
          },
        ]}
      />
      {form}
    </main>
  );
}
