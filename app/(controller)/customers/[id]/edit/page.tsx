import { CustomerController } from "@/(controller)/inner/customer";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return (
    <main className="max-w-4xl mx-auto p-4">
      {await CustomerController.edit(params.id)}
    </main>
  );
}
