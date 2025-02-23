import { Invoice } from '@/lib/data/schema/invoice'
import { InvoiceForm } from '@/ui/graphics/forms/invoice'
import { InvoiceFormShape } from '@/ui/graphics/schema/invoice'
import { FormView } from './form'

export class InvoiceView extends FormView<InvoiceFormShape> {
    constructor(private readonly invoice?: Invoice) {
        super(new InvoiceForm(invoice))
    }

    update(): void {
      // Implement the update method to update the invoice form
    }

    async handleSubmit(): Promise<void> {
      // Implement the handleSubmit method to handle form submission
    }

    handleCancel(): void {
      // Implement the handleCancel method to handle form cancellation
    }
  }
