import React from "react";
import { FormMatter, FormField, FormShape } from "@/ui/graphics/schema/form";

export class ShapeToJSXAdapter {
  static toJSX(shape: FormShape, data: FormMatter): React.ReactNode {
    return (
      <div>
        <h1>{shape.layout.title}</h1>
        {shape.fields.map((field) => {
          switch (field.type) {
            case "text":
              return ShapeToJSXAdapter.renderText(field, data);
            case "email":
              return ShapeToJSXAdapter.renderEmail(field, data);
            case "number":
              return ShapeToJSXAdapter.renderNumber(field, data);
            case "date":
              return ShapeToJSXAdapter.renderDate(field, data);
            case "select":
              return ShapeToJSXAdapter.renderSelect(field, data);
            default:
              return null;
          }
        })}
      </div>
    );
  }

  static renderText(field: FormField, data: FormMatter): React.ReactElement {
    return (
      <div>
        <label htmlFor={field.id}>{field.label}</label>
        <input
          type="text"
          id={field.id}
          name={field.id}
          required={field.required}
          defaultValue={data?.[field.id]} // Prepopulate with data.id
        />
      </div>
    );
  }

  static renderEmail(field: FormField, data: FormMatter): React.ReactElement {
    return (
      <div>
        <label htmlFor={field.id}>{field.label}</label>
        <input
          type="email"
          id={field.id}
          name={field.id}
          required={field.required}
          defaultValue={data?.[field.id] || field.defaultValue}
        />
      </div>
    );
  }

  static renderNumber(field: FormField, data: FormMatter): React.ReactElement {
    return (
      <div>
        <label htmlFor={field.id}>{field.label}</label>
        <input
          type="number"
          id={field.id}
          name={field.id}
          required={field.required}
          defaultValue={data?.[field.id]} // Prepopulate with data.id
        />
      </div>
    );
  }

  static renderDate(field: FormField, data: FormMatter): React.ReactElement {
    return (
      <div>
        <label htmlFor={field.id}>{field.label}</label>
        <input
          type="date"
          id={field.id}
          name={field.id}
          required={field.required}
          defaultValue={data?.[field.id]} // Prepopulate with data.id
        />
      </div>
    );
  }
  static renderSelect(field: FormField, data: FormMatter): React.ReactElement {
    const selectedValue = data?.[field.id] || field.defaultValue;
    return (
      <div>
        <label htmlFor={field.id}>{field.label}</label>
        <select
          id={field.id}
          name={field.id}
          required={field.required}
          defaultValue={selectedValue}
        >
          {field.options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              selected={option.value === selectedValue}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
