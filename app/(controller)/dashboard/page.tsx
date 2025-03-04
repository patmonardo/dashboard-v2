import { Suspense } from 'react';
import { Card } from '@/ui/graphics/cards/card';
import { RevenueChartController } from '@/(controller)/inner/revenue';
import { LatestInvoicesController } from '@/(controller)/inner/invoice';

// Loading placeholders
function CardSkeleton() {
  return <div className="w-full h-[123px] rounded-xl bg-gray-100 animate-pulse" />;
}

function ChartSkeleton() {
  return <div className="w-full h-[400px] rounded-xl bg-gray-100 animate-pulse" />;
}

function InvoicesSkeleton() {
  return <div className="w-full h-[400px] rounded-xl bg-gray-100 animate-pulse" />;
}

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>

      {/* Cards row */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-4 mb-6">
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Total Customers" value="1,429" type="customers" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Pending" value="$20,550" type="pending" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Total Invoices" value="297" type="invoices" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <Card title="Total Revenue" value="$120,357" type="collected" />
        </Suspense>
      </div>

      {/* Charts and tables */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mb-6">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChartController />
        </Suspense>
        <Suspense fallback={<InvoicesSkeleton />}>
          <LatestInvoicesController />
        </Suspense>
      </div>
    </main>
  );
}
