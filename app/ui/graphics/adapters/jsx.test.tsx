import { describe, it, expect } from "vitest";
import { ShapeToJSXAdapter } from "./jsx";

describe("ShapeToJSXAdapter", () => {
  // Text input test
  it("should render a text input with label and value", () => {
    const field = {
      id: "name",
      type: "text" as const,
      label: "Name",
      required: true,
      defaultValue: "",
    };

    const data = {
      name: "John Doe",
    };

    const result = ShapeToJSXAdapter.renderText(field, data) as any;

    expect(result?.type).toBe("div");
    const [labelElement, inputElement] = result?.props?.children || [];

    expect(labelElement?.type).toBe("label");
    expect(labelElement?.props?.children).toBe("Name");
    expect(inputElement?.type).toBe("input");
    expect(inputElement?.props?.required).toBe(true);
    expect(inputElement?.props?.defaultValue).toBe("John Doe");
  });

  // Email input test
  it("should render an email input with label and value", () => {
    const field = {
      id: "email",
      type: "email" as const,
      label: "Email Address",
      required: true,
      defaultValue: "",
    };

    const data = {
      email: "john@example.com",
    };

    const result = ShapeToJSXAdapter.renderEmail(field, data) as any;

    expect(result?.type).toBe("div");
    const [labelElement, inputElement] = result?.props?.children || [];

    expect(labelElement?.type).toBe("label");
    expect(labelElement?.props?.children).toBe("Email Address");
    expect(inputElement?.type).toBe("input");
    expect(inputElement?.props?.type).toBe("email");
    expect(inputElement?.props?.required).toBe(true);
    expect(inputElement?.props?.defaultValue).toBe("john@example.com");

    console.log("React Element:", JSON.stringify(result, null, 2));
  });

    // Number input test
    it('should render a number input with label and value', () => {
      const field = {
        id: 'age',
        type: 'number' as const,
        label: 'Age',
        required: true,
        defaultValue: ''
      };

      const data = {
        age: '30'  // Note: HTML form values are always strings
      };

      const result = ShapeToJSXAdapter.renderNumber(field, data) as any;

      expect(result?.type).toBe('div');
      const [labelElement, inputElement] = result?.props?.children || [];

      expect(labelElement?.type).toBe('label');
      expect(labelElement?.props?.children).toBe('Age');
      expect(inputElement?.type).toBe('input');
      expect(inputElement?.props?.type).toBe('number');
      expect(inputElement?.props?.required).toBe(true);
      expect(inputElement?.props?.defaultValue).toBe('30');

      console.log('React Element:', JSON.stringify(result, null, 2));
    });

  // Date input test
  it("should render a date input with label and value", () => {
    const field = {
      id: "birthdate",
      type: "date" as const,
      label: "Birth Date",
      required: true,
      defaultValue: ""
    };

    const data = {
      birthdate: "2023-10-01"  // Date in YYYY-MM-DD format
    };

    const result = ShapeToJSXAdapter.renderDate(field, data) as any;

    expect(result?.type).toBe("div");
    const [labelElement, inputElement] = result?.props?.children || [];

    expect(labelElement?.type).toBe("label");
    expect(labelElement?.props?.children).toBe("Birth Date");
    expect(inputElement?.type).toBe("input");
    expect(inputElement?.props?.type).toBe("date");
    expect(inputElement?.props?.required).toBe(true);
    expect(inputElement?.props?.defaultValue).toBe("2023-10-01");

    console.log("React Element:", JSON.stringify(result, null, 2));
  });

  // Select input test
  it("should render a select input with options and selected value", () => {
    const field = {
      id: "country",
      type: "select" as const,
      label: "Country",
      required: true,
      defaultValue: "",
      options: [
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
      ],
    };

    const data = {
      country: "us",
    };

    const result = ShapeToJSXAdapter.renderSelect(field, data) as any;

    expect(result?.type).toBe("div");
    const [labelElement, selectElement] = result?.props?.children || [];

    expect(labelElement?.type).toBe("label");
    expect(labelElement?.props?.children).toBe("Country");
    expect(selectElement?.type).toBe("select");
    expect(selectElement?.props?.required).toBe(true);

    // Check options
    const options = selectElement?.props?.children || [];
    expect(options).toHaveLength(2);
    expect(options[0]?.props?.value).toBe("us");
    expect(options[0]?.props?.selected).toBe(true);
    expect(options[1]?.props?.value).toBe("ca");
    expect(options[1]?.props?.selected).toBeFalsy();

    console.log("React Element:", JSON.stringify(result, null, 2));
  });
});
