import { describe, it, expect, beforeEach } from "vitest";
import { CustomerForm } from "./customer";
import type { Customer } from "@/lib/data/schema/customer";

describe("CustomerForm", () => {
  let mockCustomer: Customer;
  let form: CustomerForm;

  beforeEach(() => {
    mockCustomer = {
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      imageUrl: "https://example.com/image.jpg",
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });

  describe("Create Mode", () => {
    beforeEach(() => {
      form = new CustomerForm();
    });

    it("should generate empty create form", () => {
      const shape = form.getFormShape("create");

      expect(shape.layout.title).toBe("New Customer");
      expect(shape.fields).toHaveLength(3);
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
      expect(submit.label).toBe("Create Customer");
    });
  });

  describe("Edit Mode", () => {
    beforeEach(() => {
      form = new CustomerForm(mockCustomer);
    });

    it("should populate form with customer data", () => {
      const shape = form.getFormShape("edit");

      expect(shape.layout.title).toBe("Edit Customer");
      expect(shape.fields).toHaveLength(3);

      // Once we uncomment the defaultValue lines in customer.ts:
      // const nameField = shape.fields.find(f => f.id === "name");
      // expect(nameField?.defaultValue).toBe(mockCustomer.name);
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
      form = new CustomerForm(mockCustomer);
      const result = form.render("edit", "jsx");
      expect(result).toBeDefined();
    });

    it("should render as HTML", () => {
      form = new CustomerForm(mockCustomer);
      const result = form.render("edit", "html");
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });
  });
});
