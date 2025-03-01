"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CustomerModel } from "@/lib/model/customer";

export default async function createCustomer(formData: FormData) {
  try {
    // Extract data from form
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const imageUrl = (formData.get("imageUrl") as string) || null;

    // Validate data
    if (!name || !email) {
      console.log("Validation failed: missing name or email");
      return {
        error: "Name and email are required",
      };
    }

    // Create customer in database
    const result = await CustomerModel.create({
      name,
      email,
      imageUrl,
    });

    console.log("Create result:", result);

    if (result.status !== "success") {
      console.log("Create failed:", result.message);
      return {
        error: result.message || "Failed to create customer",
      };
    }

    // Clear page cache
    revalidatePath("/customers");
  } catch (error) {
    console.error("Error creating customer:", error);
    return {
      error: "An unexpected error occurred",
    };
  }

  // Redirect to customer list
  console.log("Redirecting to /customers");
  redirect("/customers");
}
