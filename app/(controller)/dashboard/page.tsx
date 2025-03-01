import { Suspense } from "react";
import { DashboardModel } from "@/lib/model/dashboard";
import { DashboardView } from "@/ui/view/dashboard";
import { StatCard } from "@/ui/graphics/cards/card";
import {
  RevenueChartWrapper,
  LatestInvoicesWrapper,
} from "@/(controller)/controllers/revenue";
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
} from "@/(controller)/controllers/skeletons";
import styles from '@/app/ui/home.module.css';

export default async function Page() {
  // Fetch data using the model
  const cardData = await DashboardModel.getCardData();

  // Format data using the view
  const formattedCardData = DashboardView.formatCardData(cardData);

  return (
    <main className="bg-white">
      <h1 className="mb-4 text-xl md:text-2xl font-semibold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard {...formattedCardData.collected} />
        <StatCard {...formattedCardData.pending} />
        <StatCard {...formattedCardData.invoices} />
        <StatCard {...formattedCardData.customers} />
      </div>

      {/* Revenue Chart and Latest Invoices */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <div className="md:col-span-5">
            <RevenueChartWrapper />
          </div>
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <div className="md:col-span-3">
            <LatestInvoicesWrapper />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
