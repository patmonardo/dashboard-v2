import { Suspense } from "react";
import { Card } from "@/ui/graphics/cards/card";
import { InvoiceController } from "@/(controller)/inner/invoice";
import { RevenueController } from "@/(controller)/inner/revenue";
import { DashboardModel } from "@/lib/model/dashboard";
import {
  CardSkeleton,
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from "@/ui/graphics/styles/skeletons";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  // Fetch card data using the model
  const data = await DashboardModel.getCardData();
  console.log(data.totalPaidInvoices, data.totalPendingInvoices);
  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      {/* Cards row */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-4 mb-6">
        <Suspense fallback={<CardSkeleton />}>
          <Card
            title="Total Customers"
            value={data.numberOfCustomers.toLocaleString()}
            type="customers"
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card
            title="Pending"
            value={data.totalPendingInvoices.toString()}
            type="pending"
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card
            title="Total Invoices"
            value={data.numberOfInvoices.toLocaleString()}
            type="invoices"
          />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card
            title="Total Revenue"
            value={data.totalPaidInvoices.toString()}
            type="collected"
          />
        </Suspense>
      </div>

      {/* Charts and tables */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-6">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueController.displayChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <InvoiceController.latestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
