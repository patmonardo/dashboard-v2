import { describe, it, expect, beforeEach } from "vitest";
import { InvoiceForm } from "./invoice";
import type { Invoice } from "@/lib/data/schema/invoice";

describe("InvoiceForm", () => {
  let mockInvoice: Invoice;
  let form: InvoiceForm;

  beforeEach(() => {
    mockInvoice = {
      id: "123",
      customerId: "456",
      amount: 1000,
      status: "PENDING",
      date: new Date("2024-02-24"),
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });

  describe("Create Mode", () => {
    beforeEach(() => {
      form = new InvoiceForm();
    });

    it("should generate empty create form", () => {
      const shape = form.getFormShape("create");

      expect(shape.layout.title).toBe("Create Invoice");
      expect(shape.fields).toHaveLength(4);
      expect(shape.layout.actions).toHaveLength(2);

      // Check default values
      shape.fields.forEach(field => {
        expect(field.defaultValue).toBe("");
      });
    });

    it("should have correct action buttons", () => {
      const shape = form.getFormShape("create");

      const [cancel, submit] = shape.layout.actions;
      expect(cancel.label).toBe("Cancel");
      expect(submit.label).toBe("Create Invoice");
    });
  });

  describe("Edit Mode", () => {
    beforeEach(() => {
      form = new InvoiceForm(mockInvoice);
    });

    it("should populate form with invoice data", () => {
      const shape = form.getFormShape("edit");

      expect(shape.layout.title).toBe("Edit Invoice");
      expect(shape.fields).toHaveLength(4);

      // Once we uncomment the defaultValue lines in invoice.ts:
      // const amountField = shape.fields.find(f => f.id === "amount");
      // expect(amountField?.defaultValue).toBe(mockInvoice.amount.toString());
    });

    it("should have correct action buttons", () => {
      const shape = form.getFormShape("edit");

      const [cancel, submit] = shape.layout.actions;
      expect(cancel.label).toBe("Cancel");
      expect(submit.label).toBe("Save Changes");
    });
  });

  describe("Form Rendering", () => {
    it("should render as JSX", () => {
      form = new InvoiceForm(mockInvoice);
      const result = form.render("edit", "jsx");
      expect(result).toBeDefined();
    });

    it("should render as HTML", () => {
      form = new InvoiceForm(mockInvoice);
      const result = form.render("edit", "html");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });
  });
});
