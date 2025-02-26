import { Form } from "./form";
import { CustomerFormShapeSchema } from "@/ui/graphics/schema/customer";
import type { CustomerFormShape } from "@/ui/graphics/schema/customer";
import type { Customer } from "@/lib/data/schema/customer";

export class CustomerForm extends Form<CustomerFormShape> {
  constructor(private readonly customer?: Customer) {
    super(customer);
  }

  getFormShape(mode: "create" | "edit"): CustomerFormShape {
    const isCreate = mode === "create";

    //return CustomerFormShapeSchema.safeParse({
    return {
      layout: {
        title: isCreate ? "New Customer" : "Edit Customer",
        columns: "single",
        sections: [
          {
            title: "Customer Information",
            fieldIds: ["name", "email", "imageUrl"],
          },
        ],
        actions: [
          {
            type: "button",  // Changed from "cancel"
            action: "cancel", // Added semantic meaning
            label: "Cancel",
            variant: "secondary"
          },
          {
            type: "submit",
            action: "submit", // Added semantic meaning
            label: isCreate ? "Create Customer" : "Save Changes",
            variant: "primary",
          },
        ]
      },
      fields: [
        {
          id: "name",
          type: "text",
          label: "Name",
          required: true,
          defaultValue: "" // isCreate ? undefined : this.customer?.name,
        },
        {
          id: "email",
          type: "email",
          label: "Email",
          required: true,
          defaultValue: "" // isCreate ? undefined : this.customer?.email,
        },
        {
          id: "imageUrl",
          type: "url",
          label: "Image URL",
          required: false,
          defaultValue: "" // isCreate ? undefined : this.customer?.imageUrl,
        },
      ],
      "state": {
        "status": "idle",
      }
    };
  }

  create(): CustomerFormShape {
    return this.getFormShape("create");
  }

  edit(): CustomerFormShape {
    return this.getFormShape("edit");
  }
}
