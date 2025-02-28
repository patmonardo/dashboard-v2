"use server";
import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/(controller)/controllers/breadcrumbs";
import { createCustomer, cancelCustomer } from "@/(controller)/customers/actions";
import { FormHandler } from "@/ui/graphics/schema/form";
import { CustomerView } from "@/ui/view/customer";

export default async function Page() {
  const view = new CustomerView();
  const result = view.render("create", "jsx", {
    submit: createCustomer,
    cancel: cancelCustomer,
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
            { label: "Customers", href: "/customers" },
            {
              label: "Create Customer",
              href: "/customers/create",
              active: true,
            },
          ]}
        />
        {form}
      </main>
    );
  }
}
