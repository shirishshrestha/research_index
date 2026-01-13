"use server";

import { revalidateTag } from "next/cache";

/**
 * Server Action: Revalidate institution profile cache
 *
 * This function only handles cache revalidation.
 * Actual API calls are made client-side using TanStack Query + Axios.
 */
export async function revalidateInstitutionProfileAction(): Promise<{
  success: boolean;
}> {
  try {
    // Revalidate cache tags - triggers Server Component refetch
    revalidateTag("institution-profile", "default");

    return { success: true };
  } catch (error) {
    console.error("Failed to revalidate profile cache:", error);
    return { success: false };
  }
}
