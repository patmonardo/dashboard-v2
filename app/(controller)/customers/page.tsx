import { CustomerController } from "@/(controller)/inner/customer";

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
    <main className="max-w-4xl mx-auto p-4">
      {await CustomerController.list(query, currentPage)}
    </main>
  );
}
