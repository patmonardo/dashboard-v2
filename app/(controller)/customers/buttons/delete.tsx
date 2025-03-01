// app/(controller)/customers/buttons/delete.tsx
'use client';

import { useRouter } from 'next/navigation';
import { TrashIcon } from '@heroicons/react/24/outline';
import deleteCustomer from '../actions/delete';

export default function DeleteCustomerButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (confirm('Are you sure you want to delete this customer?')) {
      await deleteCustomer(id);
      router.refresh(); // This refreshes the current route's data without a full navigation
    }
  }

  return (
    <button
      className="rounded-md border p-2 hover:bg-gray-100"
      onClick={handleDelete}
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5" />
    </button>
  );
}
