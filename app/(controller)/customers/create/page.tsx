import Breadcrumbs from '@/(controller)/controllers/breadcrumbs';
import { CustomerView } from '@/ui/view/customer';

export default async function Page() {
    const view = new CustomerView();
    const form = view.render('create', 'jsx');
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Customers', href: '/customers' },
                    {
                        label: 'Create Customer',
                        href: '/customers/create',
                        active: true,
                    },
                ]}
            />
            {form}
        </main>
    );
}
