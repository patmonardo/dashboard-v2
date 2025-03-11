import { Suspense } from "react";
import Pagination from "@/(controller)/outer/pagination";
import { InvoiceController } from "@/(controller)/inner/invoice";

export default async function Page(props: {
  searchParams?: Promise<{
      query?: string;
      page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await InvoiceController.totalPages();

  return (
    <main className="max-w-7xl mx-auto p-4">
      <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
        {await InvoiceController.list(query, currentPage)}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
