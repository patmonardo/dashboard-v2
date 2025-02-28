import { Form } from "./form";
import type { OperationResult } from "@/lib/data/schema/base";
import type { Customer } from "@/lib/data/schema/customer";
import type { CustomerFormShape } from "@/ui/graphics/schema/customer";
import { CustomerFormShapeSchema } from "@/ui/graphics/schema/customer";

export class CustomerForm extends Form<CustomerFormShape> {
  constructor(private readonly customer?: Customer) {
    super(customer);
  }

  private getFormShape(mode: "create" | "edit"): CustomerFormShape {
    const isCreate = mode === "create";

    return CustomerFormShapeSchema.parse({
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
            id: "submit",
            type: "submit",
            action: "submit",
            label: isCreate ? "Create Customer" : "Save Changes",
            variant: "primary",
          },
          {
            id: "cancel",
            type: "button",
            label: "Cancel",
            variant: "secondary",
          },
        ],
      },
      fields: [
        {
          id: "name",
          type: "text",
          label: "Name",
          required: true,
          defaultValue: isCreate ? "" : (this.customer?.name || ""),
        },
        {
          id: "email",
          type: "email",
          label: "Email",
          required: true,
          defaultValue: isCreate ? "" : (this.customer?.email || ""),
        },
        {
          id: "imageUrl",
          type: "url",
          label: "Image URL",
          required: false,
          defaultValue: isCreate ? "" : (this.customer?.imageUrl || ""),
        },
      ],
      state: {
        status: "idle",
      },
    });
  }

  create(): OperationResult<CustomerFormShape> {
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

  edit(): OperationResult<CustomerFormShape> {
    try {
      const shape = this.getFormShape("edit");
      return {
        data: shape,
        status: "success",
        message: "Form updated successfully", // Fixed message
      };
    } catch {
      return {
        data: null,
        status: "error",
        message: "Invalid form configuration", // Fixed message
      };
    }
  }
}
