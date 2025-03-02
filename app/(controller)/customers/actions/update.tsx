//@/(controller)/customers/actions/update.tsx
"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CustomerModel } from '@/lib/model/customer';

export default async function updateCustomer(id: string, formData: FormData) {
  try {
    // Extract data from the form
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const imageUrl = formData.get('imageUrl') as string || null;

    // Update in database
    const result = await CustomerModel.update(id, {
      name,
      email,
      imageUrl,
    });

    if (result.status !== 'success') {
      return {
        error: result.message || 'Failed to update customer'
      };
    }

    // Clear page cache so the list shows updated data
    revalidatePath('/customers');

  } catch (error) {
    console.error('Error updating customer:', error);
    return {
      error: 'An unexpected error occurred'
    };
  }

  // Redirect back to list
  redirect('/customers');
}
