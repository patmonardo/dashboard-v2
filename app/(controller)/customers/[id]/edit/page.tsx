import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/(controller)/controllers/breadcrumbs";
import { updateCustomer,cancelCustomer } from "@/(controller)/customers/actions";
import { CustomerModel } from "@/lib/model/customer";
import type { FormHandler } from "@/ui/graphics/schema/form";
import { CustomerView } from "@/ui/view/customer";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const result = await CustomerModel.findById(id);
  if (result.status === "error") {
    notFound();
  }
  if (result.status === "success") {
    const customer = result.data;
    const view = new CustomerView(customer);

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
              { label: "Customers", href: "/customers" },
              {
                label: "Edit Customer",
                href: `/customers/${id}/edit`,
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
