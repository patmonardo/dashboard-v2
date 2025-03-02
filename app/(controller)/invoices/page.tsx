//@/(controller)/invoices/page.tsx
import { Suspense } from 'react';
import { inter } from '@/ui/graphics/fonts/inter';
import Search from '@/(controller)/outer/search';
import Table from '@/(controller)/invoices/table';
import Pagination from '@/(controller)/outer/pagination';
import { totalPages } from '@/(controller)/invoices/table';
import { InvoicesTableSkeleton } from '@/(controller)/outer/skeletons';
import CreateInvoiceButton from './buttons/create';

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
                <h1 className={`${inter.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoiceButton />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
              <Table query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={await totalPages()|| 1} />
            </div>
        </div>
    );
}

