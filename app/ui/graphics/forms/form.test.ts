import { describe, it, expect, beforeEach } from "vitest";
import { Form } from "./form";
import type {
  FormMatter,
  FormMode,
  FormState,
  FormShape,
} from "@/ui/graphics/schema/form";

// Concrete test implementation
class TestForm extends Form<FormShape> {
  // Allow test access to protected state
  public setState(newState: Partial<FormState>) {
    this.state = { ...this.state, ...newState };
  }

  protected create(): FormShape {
    return {
      layout: {
        title: "Creation Form",
        columns: "single",
        actions: [
          {
            type: "submit",
            action: "submit",
            label: "Create",
            variant: "primary",
          },
        ],
      },
      fields: [
        {
          id: "essence",
          type: "text",
          label: "Essence",
          required: true,
          defaultValue: "",
        },
      ],
      state: this.state, // Use the current state
    };
  }

  protected edit(): FormShape {
    return {
      layout: {
        title: "Edit Form",
        columns: "single",
        actions: [
          {
            type: "submit",
            action: "submit",
            label: "Save",
            variant: "primary",
          },
        ],
      },
      fields: [
        {
          id: "essence",
          type: "text",
          label: "Modified Essence",
          required: true,
          defaultValue: this.data?.essence || "",
        },
      ],
      state: this.state,
    };
  }

  getFormShape(mode: FormMode): FormShape {
    return mode === "create" ? this.create() : this.edit();
  }
}

describe("Form Base Class", () => {
  let form: TestForm;
  let testData: FormMatter;

  beforeEach(() => {
    testData = { essence: "Pure Being" };
    form = new TestForm(testData);
  });

  // Modified create mode test
  it("should handle create mode rendering", () => {
    const result = form.render("create", "jsx");
    expect(result).toBeDefined();

    // Check for specific creation form elements
    const shape = form.getFormShape("create");
    expect(shape.layout.title).toBe("Creation Form");
    expect(shape.fields[0].label).toBe("Essence");
    expect(shape.layout.actions[0].label).toBe("Create");
  });

  // Modified edit mode test
  it("should handle edit mode rendering", () => {
    const result = form.render("edit", "jsx");
    expect(result).toBeDefined();

    // Check for specific edit form elements
    const shape = form.getFormShape("edit");
    expect(shape.layout.title).toBe("Edit Form");
    expect(shape.fields[0].label).toBe("Modified Essence");
    expect(shape.layout.actions[0].label).toBe("Save");
  });

  it("should maintain state across renders", () => {
    form.setState({ status: "submitting" });
    const shape = form.getFormShape("create");
    expect(shape.state.status).toBe("submitting");
  });

  it("should handle format transformations", () => {
    const shape = form.getFormShape("create");

    // Basic existence checks
    expect(form.renderJSX(shape, testData)).toBeDefined();
    expect(form.renderHTML(shape, testData)).toBeDefined();
    expect(form.renderJSON(shape, testData)).toBeDefined();
  });
});
