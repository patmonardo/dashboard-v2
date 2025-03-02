//@/(controller)/invoices/table.tsx
import Image from "next/image";
import InvoiceStatus from "@/(controller)/invoices/status";
import { InvoiceModel } from "@/lib/model/invoice";
import { InvoiceWithCustomer } from "@/lib/data/schema/invoice";
import { formatDateToLocal, formatCurrency } from "@/lib/data/formatting";
import UpdateInvoiceButton from "./buttons/update";
import DeleteInvoiceButton from "./buttons/delete";

const DEFAULT_IMAGE = '/icons/favicon.ico';

// This should be async since it's calling an async function
export async function totalPages(pageSize = 10): Promise<number> {
  const totalCustomers = await InvoiceModel.count();
  return Math.ceil(totalCustomers / pageSize);
}

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  let invoices: InvoiceWithCustomer[] = [];
  // Fetch invoices with pagination and search
  const pageSize = 10; // Number of customers per page
  const result = await InvoiceModel.findAll({
    query,
    page: currentPage,
    pageSize,
  });

  if (result.status === "success") {
    invoices = result.data;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
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
                  <div className="flex justify-end gap-2">
                    <UpdateInvoiceButton id={invoice.id} />
                    <DeleteInvoiceButton id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
