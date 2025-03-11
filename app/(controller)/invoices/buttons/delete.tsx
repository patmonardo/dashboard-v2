//@/(controller)/invoices/buttons/delete.tsx
import Link from "next/link";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteInvoiceButton({ id }: { id: string }) {
  return (
    <Link
      href={`invoices/${id}/delete`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <TrashIcon className="w-5" />
    </Link>
  );
}
