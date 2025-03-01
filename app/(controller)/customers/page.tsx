import { Suspense } from 'react'
import { inter } from '@/ui/graphics/fonts/inter'
import Search from '@/(controller)/controllers/search'
import Table from '@/(controller)/customers/table'
import Pagination from '@/(controller)/controllers/pagination'
import { totalPages } from '@/(controller)/customers/table'
import { CustomersTableSkeleton } from '@/(controller)/controllers/skeletons'
import CreateCustomerButton from './buttons/create'

export default async function Page(props: {
  searchParams?: Promise<{
      query?: string;
      page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomerButton />
      </div>
      <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={await totalPages() || 1} />
      </div>
    </div>
  )
}

