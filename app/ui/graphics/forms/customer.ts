import type { Customer } from '@/lib/data/schema/customer';
import { CustomerFormShapeSchema } from '@/ui/graphics/schema/customer';
import type { CustomerFormShape } from '@/ui/graphics/schema/customer';
import { Form } from './form';

export class CustomerForm extends Form<CustomerFormShape> {
  constructor(private readonly customer?: Customer) {
    super(customer);
  }

  getFormShape(mode: 'create' | 'edit'): CustomerFormShape {
    const isCreate = mode === 'create';

    return CustomerFormShapeSchema.parse({
      layout: {
        title: isCreate ? 'New Customer' : 'Edit Customer',
        columns: 'single',
        sections: [
          {
            title: 'Customer Information',
            fields: ['name', 'email', 'imageUrl']
          }
        ],
        actions: [
          { type: 'cancel', label: 'Cancel', variant: 'secondary' },
          { type: 'submit', label: isCreate ? 'Create Customer' : 'Save Changes', variant: 'primary' }
        ]
      },
      fields: {
        elements: [
          {
            id: 'name',
            type: 'text',
            label: 'Name',
            required: true,
            defaultValue: isCreate ? undefined : this.customer?.name
          },
          {
            id: 'email',
            type: 'email',
            label: 'Email',
            required: true,
            defaultValue: isCreate ? undefined : this.customer?.email
          },
          {
            id: 'imageUrl',
            type: 'url',
            label: 'Image URL',
            required: false,
            defaultValue: isCreate ? undefined : this.customer?.imageUrl
          }
        ]
      }
    });
  }

  create(): CustomerFormShape {
    return this.getFormShape('create');
  }

  edit(): CustomerFormShape {
    return this.getFormShape('edit');
  }

}
