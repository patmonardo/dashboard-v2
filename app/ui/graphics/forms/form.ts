import React from "react";
import type {
  FormMatter,
  FormMode,
  FormContent,
  FormState,
  FormShape,
} from "@/ui/graphics/schema/form";
import { FormShapeAdapter } from "@/ui/graphics/adapters";

export abstract class Form<T extends FormShape> {
  protected state: FormState = {
    status: "idle",
  };

  constructor(protected readonly data?: FormMatter) {}

  protected abstract create(): T;
  protected abstract edit(): T;

  abstract getFormShape(mode: FormMode): T;

  render(mode: FormMode, format: FormContent): any {
    let shape: T;
    switch (mode) {
      case "create":
        shape = this.create();
        break;
      case "edit":
        shape = this.edit();
        break;
      default:
        throw new Error(`Unsupported mode: ${mode}`);
    }
    switch (format) {
      case "jsx":
        return this.renderJSX(shape, this.data);
      case "json":
        return this.renderJSON(shape, this.data);
      case "html":
        return this.renderHTML(shape, this.data);
      case "xml":
        return this.renderXML(shape, this.data);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  renderJSX(shape: T, data: FormMatter): React.ReactNode {
    return FormShapeAdapter.toJSX(shape, data);
  }

  renderJSON(shape: T, data: FormMatter): string {
    return FormShapeAdapter.toJSON(shape, data);
  }

  renderHTML(shape: T, data: FormMatter): string {
    return FormShapeAdapter.toHTML(shape, data);
  }

  renderXML(shape: T, data: FormMatter): string {
    return FormShapeAdapter.toXML(shape, data);
  }

  setState(state: Partial<FormState>) {
    this.state = {
      ...this.state,
      ...state,
    };
  }
}
