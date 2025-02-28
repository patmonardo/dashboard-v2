import { notFound, redirect } from "next/navigation";
import { CustomerModel } from "@/lib/model/customer";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const result = await CustomerModel.delete(id);
  if (result.status === "error") {
    notFound();
  }
  if (result.status === "success") {
    redirect("/customers");
  }
}
