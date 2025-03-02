//@/ui/graphics/forms/form.tsx
import React from "react";
import type {
  FormMatter,
  FormMode,
  FormContent,
  FormHandler,
  FormState,
  FormShape,
} from "@/ui/graphics/schema/form";
import { FormShapeAdapter } from "@/ui/graphics/adapters";
import type { OperationResult } from "@/lib/data/schema/base";

export abstract class Form<T extends FormShape> {
  protected state: FormState = {
    status: "idle",
  };

  constructor(protected readonly data?: FormMatter) {}

  protected abstract create(): Promise<OperationResult<T>>;
  protected abstract edit(): Promise<OperationResult<T>>;

  async render(
    mode: FormMode,
    content: FormContent,
    handler: FormHandler
  ): Promise<OperationResult<React.ReactNode | string>> {
    let result: OperationResult<T>;

    try {
      // Get the form shape based on mode
      switch (mode) {
        case "create":
          result = await this.create();
          break;
        case "edit":
          result = await this.edit();
          break;
        default:
          throw new Error(`Unsupported mode: ${mode}`);
      }

      // If there was an error getting the form shape, return early
      if (result.status === "error") {
        return {
          status: "error",
          data: null,
          message: result.message || "Failed to create form"
        };
      }

      // Render the form in the requested format
      const shape = result.data;
      let form: React.ReactNode | string;

      switch (content) {
        case "jsx":
          form = this.renderJSX(shape, this.data, handler);
          break;
        case "json":
          form = this.renderJSON(shape, this.data, handler);
          break;
        case "html":
          form = this.renderHTML(shape, this.data, handler);
          break;
        case "xml":
          form = this.renderXML(shape, this.data, handler);
          break;
        default:
          throw new Error(`Unsupported format: ${content}`);
      }

      return {
        status: "success",
        data: form,
        message: "Form rendered successfully"
      };
    } catch (error) {
      console.error("Error rendering form:", error);
      return {
        status: "error",
        data: null,
        message: "Failed to render form"
      };
    }
  }

  renderJSX(
    shape: T,
    data: FormMatter,
    handler: FormHandler
  ): React.ReactNode {
    return FormShapeAdapter.toJSX(shape, data, handler);
  }

  renderJSON(shape: T, data: FormMatter, handler: FormHandler): string {
    return FormShapeAdapter.toJSON(shape, data);
  }

  renderHTML(shape: T, data: FormMatter, handler: FormHandler): string {
    return FormShapeAdapter.toHTML(shape, data);
  }

  renderXML(shape: T, data: FormMatter, handler: FormHandler): string {
    return FormShapeAdapter.toXML(shape, data);
  }

  setState(state: Partial<FormState>) {
    this.state = {
      ...this.state,
      ...state,
    };
  }
}
