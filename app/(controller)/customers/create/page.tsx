"use server";

import { notFound, redirect } from "next/navigation";
import Breadcrumbs from "@/(controller)/controllers/breadcrumbs";
import { FormHandler } from "@/ui/graphics/schema/form";
import { CustomerView } from "@/ui/view/customer";
import createCustomer from "../actions/create";
import cancelCustomer from "../actions/cancel";

export default async function Page() {
  const view = new CustomerView();
  const result = await view.render("create", "jsx", {
    submit: createCustomer,
    cancel: cancelCustomer,
  } as FormHandler);
  if (result.status === "error") {
    notFound();
  }
  if (result.status === "success") {
    const form = result.data;
    return (
      <main className="max-w-4xl mx-auto p-4">
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
