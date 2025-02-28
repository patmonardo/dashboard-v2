import React from "react";
import { z } from "zod";

import type {
  FormMatter,
  FormHandler,
  FormField,
  FormAction,
  FormShape,
} from "@/ui/graphics/schema/form";

export class ShapeToJSXAdapter {
  static toJSX(
    shape: FormShape,
    data: FormMatter,
    handler: FormHandler
  ): React.ReactNode {
    // Get the main form action from options
    const formAction = handler.submit as any;
    console.log(formAction)
    return (
      <form action={formAction}>
        {/* Render fields */}
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

        {/* Render actions */}
        <div className="form-actions">
          {shape.layout.actions.map((action) =>
            ShapeToJSXAdapter.renderButton(action, handler)
          )}
        </div>
      </form>
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

  static renderButton(
    action: FormAction,
    handler: FormHandler
  ): React.ReactElement {
    // Common button attributes
    const buttonProps = {
      className: `btn btn-${action.variant || "primary"}`,
    };

    if (action.type === "submit") {
      return (
        <button {...buttonProps} type="submit">
          {action.label}
        </button>
      );
    }

    if (action.type === "reset") {
      return (
        <button {...buttonProps} type="reset">
          {action.label}
        </button>
      );
    }
    // Regular button
    // For cancel buttons (or other custom buttons)
    if (action.id === "cancel" && handler.cancel) {
      console.log("handler.cancel: ", handler.cancel);

      return (
        <button
          {...buttonProps}
          type="button"
          formAction={handler.cancel as any}
        >
          {action.label}
        </button>
      );
    }

    // Fallback (should never happen with TypeScript)
   return <></>;
  }
}
