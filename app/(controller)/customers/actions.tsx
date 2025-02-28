"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CustomerModel } from '@/lib/model/customer';

// Create Customer action
export async function createCustomer(formData: FormData) {
    const result = await CustomerModel.create({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      imageUrl: formData.get('imageUrl') as string,
    });

    if (result.status === 'error') {
      // Return validation errors to the form
      return {
        status: 'error',
        message: result.message || 'Failed to create customer',
        errors: result.errors || {},
      };
    }
    revalidatePath('/customers');
    redirect('/customers');
}

export async function updateCustomer(id: string, formData: FormData) {
  const result = await CustomerModel.update(id,  {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    imageUrl: formData.get('imageUrl') as string
  });

  if (result.status === 'error') {
    // Return validation errors to the form
    return {
      status: 'error',
      message: result.message || 'Failed to update customer',
      errors: result.errors || {},
    };
  }
  revalidatePath('/customers');
  redirect('/customers');
}

export async function deleteCustomer(id: string) {
  const result = await CustomerModel.delete(id);
  if (result.status === 'error') {
      return {
        message: result.message || "Database Error: Failed to Delete Customer.",
      };
  }
  revalidatePath('/customers');
  redirect('/customers');
}

// Create Customer action
export async function cancelCustomer(formData: FormData) {
  revalidatePath('/customers');
  redirect('/customers');
}
