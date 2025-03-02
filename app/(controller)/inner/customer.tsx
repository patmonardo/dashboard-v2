//@/(controller)/inner/customer.tsx
import { notFound } from "next/navigation";
import Breadcrumbs from "@/(controller)/outer/breadcrumbs";
import { CustomerModel } from "@/lib/model/customer";
import type { FormHandler } from "@/ui/graphics/schema/form";
import { CustomerView } from "@/ui/view/customer";
import type { Customer } from "@/lib/data/schema/customer";
