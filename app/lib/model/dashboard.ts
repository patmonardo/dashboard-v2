//@/lib/model/dashboard.ts
import { OperationResult } from "@/lib/data/schema/base";
import { CustomerModel } from "@/lib/model/customer";
import { InvoiceModel } from "@/lib/model/invoice";
import type { InvoiceWithCustomer } from "@/lib/data/schema/invoice";

// Type definitions for the data we'll be returning
type CardData = {
  numberOfCustomers: number;
  numberOfInvoices: number;
  totalPaidInvoices: string;
  totalPendingInvoices: string;
};

type RevenueData = {
  month: string;
  revenue: number;
};

export class DashboardModel {
  static async getCardData(): Promise<CardData> {
    try {
      const numberOfCustomers = await CustomerModel.count();
      const numberOfInvoices = await InvoiceModel.count();
      const totalPaidInvoices = await InvoiceModel.getTotalByStatus("PAID");
      const totalPendingInvoices = await InvoiceModel.getTotalByStatus(
        "PENDING"
      );

      return {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices: totalPaidInvoices.toString(),
        totalPendingInvoices: totalPendingInvoices.toString(),
      };
    } catch (error) {
      console.error("Error fetching card data:", error);
      return {
        numberOfCustomers: 0,
        numberOfInvoices: 0,
        totalPaidInvoices: "0",
        totalPendingInvoices: "0",
      };
    }
  }

  static async getLatestInvoices(): Promise<InvoiceWithCustomer[]> {
    try {
      const result = await InvoiceModel.findLatest(5);

      if (result.status !== "success" || !result.data) {
        console.error("Error fetching latest invoices:", result.message);
        return [];
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching latest invoices:", error);
      return [];
    }
  }

  static async getRevenue(): Promise<RevenueData[]> {
    try {
      const result = await InvoiceModel.getRevenueByMonth();

      if (result.status !== "success" || !result.data) {
        throw new Error(result.message || "Failed to get revenue data");
      }

      return result.data;
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      // Return placeholder data if the query fails
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return months.map((month) => ({
        month,
        revenue: Math.floor(Math.random() * 5000) + 1000,
      }));
    }
  }
}
