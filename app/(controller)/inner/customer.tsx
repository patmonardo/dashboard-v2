import type { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/ui/graphics/links/breadcrumbs";
import Pagination from "@/ui/graphics/links/pagination";
import Search from "@/ui/graphics/search/search";
import type { FormHandler } from "@/ui/graphics/schema/form";
import CustomerTable from "@/ui/graphics/tables/customer";
import { CustomerModel } from "@/lib/model/customer";
import { CustomerView } from "@/ui/view/customer";
import createCustomerAction from "@/(controller)/customers/actions/create";
import updateCustomerAction from "@/(controller)/customers/actions/update";
import cancelCustomerAction from "@/(controller)/customers/actions/cancel";

// Single controller class for customer operations
export class CustomerController {
  /**
   * Renders the customer creation form with breadcrumbs
   */
  static async create(): Promise<ReactNode> {
    const view = new CustomerView();
    const result = await view.render("create", "jsx", {
      submit: createCustomerAction,
      cancel: cancelCustomerAction,
    } as FormHandler);

    if (result.status === "error") {
      notFound();
    }

    return (
      <>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Customers", href: "/customers" },
            {
              label: "Create Customer",
              href: "/customers/create",
              active: true,
            },
          ]}
        />
        {result.data}
      </>
    );
  }

  /**
   * Renders the customer edit form with breadcrumbs
   * @param id Customer ID
   */
  static async edit(id: string): Promise<ReactNode> {
    // Fetch the customer data
    const customerResult = await CustomerModel.findById(id);

    if (customerResult.status !== "success" || !customerResult.data) {
      notFound();
    }

    const customer = customerResult.data;
    const view = new CustomerView(customer);

    // Fixed: Use updateCustomerAction.bind with id parameter
    const formResult = await view.render("edit", "jsx", {
      submit: updateCustomerAction.bind(null, id), // Properly bind id parameter
      cancel: cancelCustomerAction,
    } as FormHandler);

    if (formResult.status === "error") {
      notFound();
    }

    return (
      <>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Customers", href: "/customers" },
            {
              label: `Edit ${customer.name}`,
              href: `/customers/${id}/edit`,
              active: true,
            },
          ]}
        />
        {formResult.data}
      </>
    );
  }

  /**
   * Deletes a customer
   * @param id Customer ID
   */
  static async delete(id: string): Promise<void> {
    // Fetch the customer data
    const result = await CustomerModel.delete(id);

    if (result.status === "error") {
      notFound();
    }
    if (result.status === "success") {
      redirect("/customers");
    }
  }

  /**
   * Lists customers with search and pagination
   * @param query Search query
   * @param page Page number
   * @param pageSize Items per page
   */
  static async list(query = "", page = 1, pageSize = 10): Promise<ReactNode> {
    const result = await CustomerModel.findAll({ query, page, pageSize });

    if (result.status !== "success") {
      return (
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold">Error loading customers</h2>
          <p className="text-gray-500">{result.message}</p>
        </div>
      );
    }

    return (
      <>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Customers", href: "/customers", active: true },
          ]}
        />
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Customers</h1>
          <Link
            href="/customers/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Customer
          </Link>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <Search placeholder="Search customers..." />
        </div>
        <CustomerTable customers={result.data} />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={await this.totalPages()} />
        </div>
      </>
    );
  }

  /**
   * Get total pages for pagination
   */
  static async totalPages(pageSize = 10): Promise<number> {
    const totalCustomers = await CustomerModel.count();
    return Math.ceil(totalCustomers / pageSize);
  }
}
