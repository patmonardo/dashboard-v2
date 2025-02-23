import { notFound } from 'next/navigation';
import Breadcrumbs from '@/(controller)/controllers/breadcrumbs';
import { InvoiceModel } from '@/lib/model/invoice';
import { InvoiceView } from '@/ui/view/invoice';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const invoice = undefined;
    const view = new InvoiceView(invoice);
    const form = view.render('create', 'jsx');

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: '/dashboard/invoice' },
                    {
                        label: 'Edit Invoice',
                        href: `/dashboard/invoice/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            ${form}
        </main>
    );
}
