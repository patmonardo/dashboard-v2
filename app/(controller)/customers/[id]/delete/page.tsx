//@/(controller)/customers/[id]/delete/page.tsx
import { notFound, redirect } from "next/navigation";
import { CustomerController } from "@/(controller)/inner/customer";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  await CustomerController.delete(id);
}
