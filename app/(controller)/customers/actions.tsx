import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CustomerState } from '@/lib/data/schema/customer';
import { CustomerModel } from '@/lib/model/customer';

// Create Customer action
export async function createCustomer(prev_state: CustomerState, formData: FormData) {
    const result = await CustomerModel.create({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      imageUrl: formData.get('imageUrl') as string,
    });
    if (result.status === 'error') {
    }
    revalidatePath('/dashboard/customers');
    redirect('/dashboard/customers');
}

export async function updateCustomer(id: string, formData: FormData) {
  const result = await CustomerModel.update(id,  {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    imageUrl: formData.get('imageUrl') as string
  });
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  const result = await CustomerModel.delete(id);
  if (result.status === 'error') {
      return {
          message: 'Database Error: Failed to Delete Customer.',
      };
  }
  revalidatePath('/dashboard/customers');
}
