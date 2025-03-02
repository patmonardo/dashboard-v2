//@/(controller)/customers/table.tsx
import Image from "next/image";
import { Customer } from "@/lib/data/schema/customer";
import { CustomerModel } from "@/lib/model/customer";
import UpdateCustomerButton from "./buttons/update";
import DeleteCustomerButton from "./buttons/delete";

const DEFAULT_IMAGE = '/icons/favicon.ico';

export async function totalPages(pageSize = 10): Promise<number> {
  const totalCustomers = await CustomerModel.count();
  return Math.ceil(totalCustomers / pageSize);
}

export default async function CustomersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  let customers: Customer[] = [];

  // Fetch customers with pagination and search
  const pageSize = 10; // Number of customers per page
  const result = await CustomerModel.findAll({
    query,
    page: currentPage,
    pageSize,
  });

  if (result.status === "success") {
    customers = result.data;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {customers?.length ? (
              customers.map((customer) => (
                <div
                  key={customer.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <Image
                        src={customer.imageUrl || DEFAULT_IMAGE}
                        alt={`${customer.name}'s profile picture`}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                      />
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div className="flex justify-end gap-2">
                      <UpdateCustomerButton id={customer.id} />
                      <DeleteCustomerButton id={customer.id} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-4">No customers found</p>
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
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {customers?.length ? (
                customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={customer.imageUrl || DEFAULT_IMAGE}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${customer.name}'s profile picture`}
                        />
                        <p>{customer.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {customer.email}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateCustomerButton id={customer.id} />
                        <DeleteCustomerButton id={customer.id} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No customers found
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
