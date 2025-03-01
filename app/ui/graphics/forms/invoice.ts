import type { OperationResult } from "@/lib/data/schema/base";
import type { Invoice } from "@/lib/data/schema/invoice";
import { CustomerModel } from "@/lib/model/customer";
import { InvoiceFormShapeSchema } from "@/ui/graphics/schema/invoice";
import type { InvoiceFormShape } from "@/ui/graphics/schema/invoice";
import { Form } from "./form";

export class InvoiceForm extends Form<InvoiceFormShape> {
  constructor(private readonly invoice?: Invoice) {
    super(invoice);
  }

  private async getFormShape(
    mode: "create" | "edit"
  ): Promise<InvoiceFormShape> {
    const isCreate = mode === "create";

    // Get customer data for the dropdown
    const result = await CustomerModel.findAll();

    if (result.status !== "success") {
      // Handle error case
      throw new Error("Failed to load customers");
    }

    const customers = result.data;

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
            id: "submit",
            type: "submit",
            label: mode === "create" ? "Create" : "Save Changes",
            variant: "primary",
          },
          {
            id: "cancel",
            label: "Cancel",
            type: "button",
            variant: "secondary",
          },
        ],
      },
      fields: [
        {
          id: "customerId",
          type: "select",
          label: "Customer",
          required: true,
          options: customers.map((c) => ({
            value: c.id,
            label: c.name,
          })),
        },
        {
          id: "amount",
          type: "number",
          label: "Amount ($)",
          required: true,
        },
        {
          id: "status",
          type: "select",
          label: "Status",
          required: true,
          options: [
            { value: "PAID", label: "Paid" },
            { value: "PENDING", label: "Pending" },
            { value: "OVERDUE", label: "Overdue" },
          ],
        },
        {
          id: "date",
          type: "date",
          label: "Date",
          required: true,
          defaultValue: formattedDate, // Set default for edit mode
        },
      ],
      state: {
        status: "idle",
      },
    });
  }

  async create(): Promise<OperationResult<InvoiceFormShape>> {
    try {
      const shape = await this.getFormShape("create");
      return {
        data: shape,
        status: "success",
        message: "Form created successfully",
      };
    } catch (error) {
      console.error("Error creating invoice form:", error);
      return {
        data: null,
        status: "error",
        message: "Invalid form configuration",
      };
    }
  }

  async edit(): Promise<OperationResult<InvoiceFormShape>> {
    try {
      const shape = await this.getFormShape("edit");
      return {
        data: shape,
        status: "success",
        message: "Invoice created successfully",
      };
    } catch (error) {
      console.error("Error creating invoice form:", error);
      return {
        data: null,
        status: "error",
        message: "Invalid invoice configuration",
      };
    }
  }
}
