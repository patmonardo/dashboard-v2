import Breadcrumbs from '@/(controller)/controllers/breadcrumbs';
import { InvoiceView } from '@/ui/view/invoice';

export default async function Page() {
    const view = new InvoiceView();
    const form = view.render('create', 'jsx');
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/invoices' },
                    {
                        label: 'Create Invoice',
                        href: '/invoices/create',
                        active: true,
                    },
                ]}
            />
            {form}
        </main>
    );
}
