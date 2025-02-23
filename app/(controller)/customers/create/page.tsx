import { notFound } from 'next/navigation';
import Breadcrumbs from '@/(controller)/controllers/breadcrumbs';
import { CustomerModel } from '@/lib/model/customer';
import { CustomerView } from '@/ui/view/customer';

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    const customer = undefined;
    const view = new CustomerView(customer);
    const form = view.render('create', 'jsx');

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: '/dashboard/customers' },
                    {
                      label: 'Create Customer',
                      href: '/dashboard/customers/create',
                      active: true,
                  },
                ]}
            />
            ${form}
        </main>
    );
}
