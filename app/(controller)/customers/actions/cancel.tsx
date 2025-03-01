"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Cancel Customer action
export default async function cancelCustomer() {
  revalidatePath('/customers');
  redirect('/customers');
}
