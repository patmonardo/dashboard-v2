import { Suspense } from 'react'
import { lusitana } from '@/ui/graphics/fonts/lusitana'
import Search from '@/(controller)/controllers/search'
import Table from '@/(controller)/customers/table'
import Pagination from '@/(controller)/controllers/pagination'
import { CustomersTableSkeleton } from '@/(controller)/controllers/skeletons'
import { CreateCustomer } from '@/(controller)/customers/buttons'


export default async function Page(props: {
  searchParams?: Promise<{
      query?: string;
      page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = 1 // await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomer />
      </div>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>

      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages || 1} />
      </div>
    </div>
  )
}

// <Table query={query} currentPage={currentPage} />
