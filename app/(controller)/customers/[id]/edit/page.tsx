//@/(controller)/customers/[id]/edit/page.tsx
"use server";

import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/(controller)/outer/breadcrumbs";
import { CustomerModel } from "@/lib/model/customer";
import type { FormHandler } from "@/ui/graphics/schema/form";
import { CustomerView } from "@/ui/view/customer";
import updateCustomer from "../../actions/update";
import cancelCustomer from "../../actions/cancel";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const result = await CustomerModel.findById(id);

  if (result.status !== "success") {
    notFound();
  }

  const customer = result.data;
  const view = new CustomerView(customer);

  const formResult = await view.render("edit", "jsx", {
    submit: updateCustomer.bind(null, id), // Bind id parameter
    cancel: cancelCustomer,
  } as FormHandler);

  if (formResult.status === "success") {
    const form = formResult.data;
    return (
      <main className="max-w-4xl mx-auto p-4">
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
  } else {
    // Handle form rendering error
    return (
      <div className="p-4">
        <h1>Error</h1>
        <p>Failed to render customer edit form</p>
      </div>
    );
  }

}
