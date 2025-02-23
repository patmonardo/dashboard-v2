import { Form } from '@/ui/graphics/forms/form'
import { FormShape,  FormMode, FormContent } from '@/ui/graphics/schema/form'

export abstract class FormView<T extends FormShape> {
  constructor(protected readonly form: Form<T>) {
    this.form = form
  }

  render(mode: FormMode, content: FormContent): any  {
    switch (content) {
      case 'jsx':
      case 'json':
      case 'html':
      case 'xml':
          return this.form.render(mode, content);
      default:
        throw new Error(`Unsupported content type: ${content}`);
      }
  }

  abstract update(): void
  abstract handleSubmit(): Promise<void>
  abstract handleCancel(): void
}
