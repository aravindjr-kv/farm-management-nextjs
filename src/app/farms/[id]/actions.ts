"use server";

import { revalidatePath } from "next/cache";

export async function revalidateFarmDetails(prev: null, formData: FormData) {
  const id = formData.get("id");
  if (!id) {
    throw new Error("Id is required");
  }
  revalidatePath(`/farms/${id}`);

  return null;
}
