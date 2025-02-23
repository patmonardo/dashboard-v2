import { notFound } from 'next/navigation';
import Breadcrumbs from '@/(controller)/controllers/breadcrumbs';
import { InvoiceView } from '@/ui/view/invoice';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const invoice = undefined;
    const view = new InvoiceView(invoice);
    const form = view.render('create', 'jsx');

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoice' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoice/create`,
                        active: true,
                    },
                ]}
            />
            ${form}
        </main>
    );
}
