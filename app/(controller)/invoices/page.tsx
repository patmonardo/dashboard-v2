import { Suspense } from 'react';
import Search from '@/(controller)/controllers/search';
import Table from '@/(controller)/invoices/table';
import Pagination from '@/(controller)/controllers/pagination';
import { InvoicesTableSkeleton } from '@/(controller)/controllers/skeletons';
import { CreateInvoice } from '@/(controller)/invoices/buttons';
import { lusitana } from '@/ui/graphics/fonts/lusitana';
import { InvoiceModel } from '@/lib/model/invoice';

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
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}

// <Table query={query} currentPage={currentPage} />
