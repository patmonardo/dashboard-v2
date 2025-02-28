import { Form } from "./form";
import type { Invoice } from "@/lib/data/schema/invoice";
import { InvoiceFormShapeSchema } from "@/ui/graphics/schema/invoice";
import type { InvoiceFormShape } from "@/ui/graphics/schema/invoice";
import type { OperationResult } from "@/lib/data/schema/base";

export class InvoiceForm extends Form<InvoiceFormShape> {
  constructor(private readonly invoice?: Invoice) {
    super(invoice);
  }

  private getFormShape(mode: "create" | "edit"): InvoiceFormShape {
    const isCreate = mode === "create";
    // Format date properly if it exists
    const formattedDate = this.invoice?.date
      ? new Date(this.invoice.date).toISOString().split("T")[0]
      : "";
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
          {
            type: "button",
            action: "cancel",
            label: "Cancel",
            variant: "secondary",
          },
          {
            type: "submit",
            action: "submit",
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
          defaultValue: isCreate ? "" : this.invoice?.customerId || "",
        },
        {
          id: "amount",
          type: "number",
          label: "Amount ($)",
          required: true,
          defaultValue: isCreate ? "" : this.invoice?.amount?.toString() || "",
        },
        {
          id: "status",
          type: "select",
          label: "Status",
          required: true,
          defaultValue: isCreate ? "" : this.invoice?.status || "",
        },
        {
          id: "date",
          type: "date",
          label: "Date",
          required: true,
          defaultValue: isCreate ? "" : formattedDate,
        },
      ],
      state: {
        status: "idle",
      },
    });
  }

  create(): OperationResult<InvoiceFormShape> {
    try {
      const shape = this.getFormShape("create");
      return {
        data: shape,
        status: "success",
        message: "Form created successfully",
      };
    } catch {
      return {
        data: null,
        status: "error",
        message: "Invalid form configuration",
      };
    }
  }

  edit(): OperationResult<InvoiceFormShape> {
    try {
      const shape = this.getFormShape("edit");
      return {
        data: shape,
        status: "success",
        message: "Invoice created successfully",
      };
    } catch {
      return {
        data: null,
        status: "error",
        message: "Invalid invoice configuration",
      };
    }
  }
}
