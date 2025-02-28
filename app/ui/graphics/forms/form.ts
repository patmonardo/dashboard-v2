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

  protected abstract create(): OperationResult<T>;
  protected abstract edit(): OperationResult<T>;

  render(
    mode: FormMode,
    content: FormContent,
    handler: FormHandler
  ): OperationResult<T> {
    let node: React.ReactNode;
    let result: OperationResult<T>;

    switch (mode) {
      case "create":
        result = this.create();
        break;
      case "edit":
        result = this.edit();
        break;
      default:
        throw new Error(`Unsupported mode: ${mode}`);
    }
    if (result.status == "error") {
      return result;
    }
    const shape = result.data as T;
    let form: any;
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
    result.data = form;
    return result;
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
