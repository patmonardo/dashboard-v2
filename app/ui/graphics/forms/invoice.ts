import type { Invoice } from "@/lib/data/schema/invoice";
import { Form } from "./form";
import { InvoiceFormShapeSchema } from "@/ui/graphics/schema/invoice";
import type { InvoiceFormShape } from "@/ui/graphics/schema/invoice";

export class InvoiceForm extends Form<InvoiceFormShape> {
  constructor(private readonly invoice?: Invoice) {
    super(invoice);
  }

  getFormShape(mode: "create" | "edit"): InvoiceFormShape {
    const isCreate = mode === "create";

    return InvoiceFormShapeSchema.parse({
      layout: {
        title: isCreate ? "Create Invoice" : "Edit Invoice",
        columns: "single",
        sections: [
          {
            title: "Invoice Details",
            fieldIds: ["customerId", "amount", "status", "date"],
          },
        ],
        actions: [
          { type: "cancel", label: "Cancel", variant: "secondary" },
          {
            type: "submit",
            label: isCreate ? "Create Invoice" : "Save Changes",
            variant: "primary",
          },
        ],
      },
      fields: [
        {
          id: "customerId",
          type: "select",
          label: "Customer",
          required: true,
          defaultValue: isCreate ? undefined : this.invoice?.customerId,
        },
        {
          id: "amount",
          type: "number",
          label: "Amount ($)",
          required: true,
          defaultValue: isCreate ? undefined : this.invoice?.amount,
        },
        {
          id: "status",
          type: "select",
          label: "Status",
          required: true,
          defaultValue: isCreate ? undefined : this.invoice?.status,
        },
        {
          id: "date",
          type: "date",
          label: "Date",
          required: true,
          defaultValue: isCreate ? undefined : this.invoice?.date,
        },
      ],
    });
  }

  create(): InvoiceFormShape {
    return this.getFormShape("create");
  }

  edit(): InvoiceFormShape {
    return this.getFormShape("edit");
  }
}
