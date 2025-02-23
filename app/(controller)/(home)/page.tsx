import { Card } from "@/(controller)/controllers/card";
//import RevenueChart from '@/ui/dashboard/revenue-chart'
//import LatestInvoices from '@/ui/dashboard/latest-invoices'
import { lusitana } from "@/ui/graphics/fonts/lusitana";
import { Suspense } from "react";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from "@/(controller)/controllers/skeletons";
import { DashboardModel } from "@/lib/model/dashboard";

export default async function Page() {
  // Fetch in parallel
  const [
    latestInvoices,
    {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    },
  ] = await Promise.all([
    DashboardModel.getLatestInvoices(),
    DashboardModel.getCardData(),
  ]);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}></Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}></Suspense>
      </div>
    </main>
  );
}
//<RevenueChart />
//<LatestInvoices />
