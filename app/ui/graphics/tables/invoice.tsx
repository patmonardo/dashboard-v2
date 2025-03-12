import Image from "next/image";
import DeleteInvoiceButton from "@/(controller)/invoices/buttons/delete";
import UpdateInvoiceButton from "@/(controller)/invoices/buttons/update";
import InvoiceStatus from "@/(controller)/invoices/status";
import { formatCurrency, formatDateToLocal } from "@/lib/data/formatting";
import { InvoiceWithCustomer } from "@/lib/data/schema/invoice";

const DEFAULT_IMAGE = "/icons/favicon.ico";

interface InvoiceTableProps {
  invoices: InvoiceWithCustomer[];
}

export default function InvoiceTable({ invoices }: InvoiceTableProps) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {invoices?.length ? (
              invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <Image
                          src={invoice.customer.imageUrl || DEFAULT_IMAGE}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${invoice.customer.name}'s profile picture`}
                        />
                        <p>{invoice.customer.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {invoice.customer.email}
                      </p>
                    </div>
                    <InvoiceStatus status={invoice.status} />
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {formatCurrency(invoice.amount)}
                      </p>
                      <p>{formatDateToLocal(invoice.date)}</p>
                    </div>
                    <div className="flex justify-end gap-3">
                      <UpdateInvoiceButton id={invoice.id} />
                      <DeleteInvoiceButton id={invoice.id} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-4">No invoices found</p>
            )}
          </div>

          {/* Desktop view */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.length ? (
                invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={invoice.customer.imageUrl || DEFAULT_IMAGE}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${invoice.customer.name}'s profile picture`}
                        />
                        <p>{invoice.customer.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {invoice.customer.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(invoice.date)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <InvoiceStatus status={invoice.status} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoiceButton id={invoice.id} />
                      <DeleteInvoiceButton id={invoice.id} />
                    </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
