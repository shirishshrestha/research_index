"use server";

import { revalidateTag } from "next/cache";

/**
 * Server Action: Revalidate institution profile cache
 *
 * This function handles cache revalidation for both panel and public views.
 * Actual API calls are made client-side using TanStack Query + Axios.
 */
export async function revalidateInstitutionProfileAction(): Promise<{
  success: boolean;
}> {
  try {
    // Revalidate cache tags - triggers Server Component refetch
    revalidateTag("institution-profile", "max"); // Panel view
    revalidateTag("institutions", "max"); // Public list view

    return { success: true };
  } catch (error) {
    console.error("Failed to revalidate profile cache:", error);
    return { success: false };
  }
}
