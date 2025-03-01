import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function UpdateInvoiceButton({ id }: { id: string }) {
  return (
    <Link
      href={`invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
