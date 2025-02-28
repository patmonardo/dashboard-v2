import { Form } from '@/ui/graphics/forms/form'
import type  { FormShape, FormMode, FormContent, FormHandler } from '@/ui/graphics/schema/form'
import type { OperationResult } from '@/lib/data/schema/base';

export abstract class FormView<T extends FormShape> {
  constructor(protected readonly form: Form<T>) {}

  public render(
    mode: FormMode,
    content: FormContent,
    handler: FormHandler
  ): OperationResult<any> {
    let form: any;
    switch (content) {
      case 'jsx':
      case 'json':
      case 'html':
      case 'xml':
        return (this.form.render(mode, content, handler));
      default:
        throw new Error(`Unsupported content type: ${content}`);
    }
  }

  abstract update(): void
  abstract handleSubmit(): Promise<void>
  abstract handleCancel(): void
}
