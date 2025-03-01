"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateInvoice } from "@/lib/data/schema/invoice";
import { InvoiceModel } from "@/lib/model/invoice";

export default async function createInvoice(formData: FormData) {
  // Add debugging
  console.log('createInvoice action called');
  console.log('Form data:', Object.fromEntries(formData.entries()));

  try {
    // Extract data from form
    const customerId = formData.get('customerId') as string;
    const amountStr = formData.get('amount') as string;
    const dateStr = formData.get('date') as string;
    const status = formData.get('status') as string;

    console.log('Extracted values:', { customerId, amountStr, dateStr, status });

    // Validate data
    if (!customerId || !amountStr || !dateStr || !status) {
      console.log('Validation failed: missing required fields');
      return {
        error: 'All fields are required'
      };
    }

    // Convert and validate numeric/date values
    const amount = Number(amountStr);
    if (isNaN(amount) || amount <= 0) {
      console.log('Validation failed: invalid amount');
      return {
        error: 'Amount must be a positive number'
      };
    }

    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.log('Validation failed: invalid date');
      return {
        error: 'Invalid date format'
      };
    }

    // Create invoice in database
    const result = await InvoiceModel.create({
      customerId,
      amount,
      date,
      status
    } as CreateInvoice);

    console.log('Create result:', result);

    if (result.status !== 'success') {
      console.log('Create failed:', result.message);
      return {
        error: result.message || 'Failed to create invoice'
      };
    }

    // Clear page cache
    revalidatePath('/invoices');

  } catch (error) {
    console.error('Error creating invoice:', error);
    return {
      error: 'An unexpected error occurred'
    };
  }

  // Redirect to invoice list
  console.log('Redirecting to /invoices');
  redirect('/invoices');
}
