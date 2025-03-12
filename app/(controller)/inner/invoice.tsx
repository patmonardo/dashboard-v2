import type { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/ui/graphics/links/breadcrumbs";
import Pagination from "@/ui/graphics/links/pagination";
import Search from "@/ui/graphics/search/search";
import type { FormHandler } from "@/ui/graphics/schema/form";
import InvoiceTable from "@/ui/graphics/tables/invoice";
import { InvoiceModel } from "@/lib/model/invoice";
import { InvoiceView } from "@/ui/view/invoice";
import createInvoiceAction from "@/(controller)/invoices/actions/create";
import updateInvoiceAction from "@/(controller)/invoices/actions/update";
import cancelInvoiceAction from "@/(controller)/invoices/actions/cancel";

// Single controller class for invoice operations
export class InvoiceController {
  /**
   * Renders the invoice creation form with breadcrumbs
   */
  static async create(): Promise<ReactNode> {
    const view = new InvoiceView();
    const result = await view.render("create", "jsx", {
      submit: createInvoiceAction,
      cancel: cancelInvoiceAction,
    } as FormHandler);

    if (result.status === "error") {
      notFound();
    }

    return (
      <>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Invoices", href: "/invoices" },
            {
              label: "Create Invoice",
              href: "/invoices/create",
              active: true,
            },
          ]}
        />
        {result.data}
      </>
    );
  }

  /**
   * Renders the invoice edit form with breadcrumbs
   * @param id Invoice ID
   */
  static async edit(id: string): Promise<ReactNode> {
    // Fetch the invoice data
    const invoiceResult = await InvoiceModel.findById(id);

    if (invoiceResult.status !== "success" || !invoiceResult.data) {
      notFound();
    }

    const invoice = invoiceResult.data;
    const view = new InvoiceView(invoice);

    // Fixed: Use updateInvoiceAction.bind with id parameter
    const formResult = await view.render("edit", "jsx", {
      submit: updateInvoiceAction.bind(null, id), // Properly bind id parameter
      cancel: cancelInvoiceAction,
    } as FormHandler);

    if (formResult.status === "error") {
      notFound();
    }

    return (
      <>
        <Breadcrumbs
          breadcrumbs={[
            { label: "Invoices", href: "/invoices" },
            {
              label: `Edit Invoice #${id}`,
              href: `/invoices/${id}/edit`,
              active: true,
            },
          ]}
        />
        {formResult.data}
      </>
    );
  }

  /**
   * Deletes an invoice
   * @param id Invoice ID
   */
  static async delete(id: string): Promise<void> {
    // Fetch the customer data
    const result = await InvoiceModel.delete(id);

    if (result.status === "error") {
      notFound();
    }
    if (result.status === "success") {
      redirect("/customers");
    }
  }

  /**
   * Lists invoices with search and pagination
   * @param query Search query
   * @param page Page number
   * @param pageSize Items per page
   */
  static async list(query = "", page = 1, pageSize = 10): Promise<ReactNode> {
    const result = await InvoiceModel.findAll({ query, page, pageSize });

    if (result.status !== "success") {
      return (
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold">Error loading invoices</h2>
          <p className="text-gray-500">{result.message}</p>
        </div>
      );
    }

    return (
      <>
        <Breadcrumbs
          breadcrumbs={[{ label: "Invoices", href: "/invoices", active: true }]}
        />
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Invoices</h1>
          <Link
            href="/invoices/create"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create Invoice
          </Link>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2">
          <Search placeholder="Search invoices..." />
        </div>
        <InvoiceTable invoices={result.data} />
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
    const totalInvoices = await InvoiceModel.count();
    return Math.ceil(totalInvoices / pageSize);
  }

  static async latestInvoices() {
    // Fetch latest invoices with customer data
    const result = await InvoiceModel.getLatestWithCustomers(5);
    if (result.status !== "success") {
      console.error("Error fetching latest invoices:", result.message);
      return null;
    }
    const display = await InvoiceView.displayInvoices(result.data);
    if (display.status !== "success") {
      console.error("Error displaying latest invoices:", result.message);
      return null;
    }
    return <>{display.data}</>;
  }
}
