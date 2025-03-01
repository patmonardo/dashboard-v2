"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { CustomerModel } from '@/lib/model/customer';

export default async function deleteCustomer(id: string) {
  const result = await CustomerModel.delete(id);
  if (result.status === 'error') {
      return {
        message: result.message || "Database Error: Failed to Delete Customer.",
      };
  }
  revalidatePath('/customers');
  redirect('/customers');
}
