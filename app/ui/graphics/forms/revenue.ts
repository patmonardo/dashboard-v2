//@/ui/graphics/forms/revenue.ts
import type { OperationResult } from "@/lib/data/schema/base";
import type { Revenue } from "@/lib/data/schema/revenue";
import { RevenueFormShapeSchema } from "@/ui/graphics/schema/revenue";
import type { RevenueFormShape } from "@/ui/graphics/schema/revenue";
import { Form } from "./form";

export class RevenueForm extends Form<RevenueFormShape> {
  constructor(private readonly revenue?: Revenue) {
    super(revenue);
  }

  private async getFormShape(
    mode: "create" | "edit"
  ): Promise<RevenueFormShape> {
    const isCreate = mode === "create";

    // Format month properly if it exists
    const formattedMonth = this.revenue?.month
      ? new Date(this.revenue.month).toISOString().split("T")[0]
      : "";

    return RevenueFormShapeSchema.parse({
      layout: {
        title: isCreate ? "Create Revenue Entry" : "Edit Revenue Entry",
        columns: "single",
        sections: [
          {
            title: "Revenue Details",
            fieldIds: ["month", "revenue", "expenses"],
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
          id: "month",
          type: "date",
          label: "Month",
          required: true,
          defaultValue: formattedMonth,
        },
        {
          id: "revenue",
          type: "currency",
          label: "Revenue ($)",
          required: true,
          defaultValue: this.revenue?.revenue?.toString() || "",
        },
        {
          id: "expenses",
          type: "currency",
          label: "Expenses ($)",
          required: false,
          defaultValue: this.revenue?.expenses?.toString() || "0",
        },
      ],
      state: {
        status: "idle",
      },
    });
  }

  async create(): Promise<OperationResult<RevenueFormShape>> {
    try {
      const shape = await this.getFormShape("create");
      return {
        data: shape,
        status: "success",
        message: "Form created successfully",
      };
    } catch (error) {
      console.error("Error creating revenue form:", error);
      return {
        data: null,
        status: "error",
        message: "Invalid form configuration",
      };
    }
  }

  async edit(): Promise<OperationResult<RevenueFormShape>> {
    try {
      const shape = await this.getFormShape("edit");
      return {
        data: shape,
        status: "success",
        message: "Form loaded successfully",
      };
    } catch (error) {
      console.error("Error creating revenue form:", error);
      return {
        data: null,
        status: "error",
        message: "Invalid revenue configuration",
      };
    }
  }
}
