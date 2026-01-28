"use server";

import { revalidateTag } from "next/cache";

/**
 * Server Action: Revalidate author profile cache
 *
 * This function only handles cache revalidation.
 * Actual API calls are made client-side using TanStack Query + Axios.
 *
 * Flow:
 * Client Component → useMutation (axios) → revalidateAuthorProfileAction → revalidateTag
 * → router.refresh() → Server Component refetch
 */
export async function revalidateAuthorProfileAction(): Promise<{
  success: boolean;
}> {
  try {
    // Revalidate cache tags - triggers Server Component refetch
    revalidateTag("author-profile", "max"); // Panel view
    revalidateTag("authors", "max"); // Public list view

    return { success: true };
  } catch (error) {
    console.error("Failed to revalidate profile cache:", error);
    return { success: false };
  }
}
