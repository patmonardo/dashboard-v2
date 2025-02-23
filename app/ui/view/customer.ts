import { Customer } from '@/lib/data/schema/customer';
import { CustomerForm } from '@/ui/graphics/forms/customer';
import { CustomerFormShape } from '@/ui/graphics/schema/customer';
import { FormView } from './form';

export class CustomerView extends FormView<CustomerFormShape> {
  constructor(private readonly customer?: Customer) {
    super(new CustomerForm(customer));
  }

  update(): void {
    // Implement the update method to update the customer form
  }

  async handleSubmit(): Promise<void> {
    // Implement the handleSubmit method to handle form submission
  }

  handleCancel(): void {
    // Implement the handleCancel method to handle form cancellation
  }
}
