"use server";

import { revalidateTag } from "next/cache";

/**
 * Server Action: Revalidate topics tree cache
 *
 * This function only handles cache revalidation.
 * Actual API calls are made client-side using TanStack Query + Axios.
 *
 * Flow:
 * Client Component → useMutation (axios) → revalidateTopicsAction → revalidateTag
 * → router.refresh() → Server Component refetch
 */
export async function revalidateTopicsAction(): Promise<{
  success: boolean;
}> {
  try {
    // Revalidate cache tags - triggers Server Component refetch
    // Next.js 16: Use 'max' profile for stale-while-revalidate semantics
    revalidateTag("topics-tree", "max");

    return { success: true };
  } catch (error) {
    console.error("Failed to revalidate topics cache:", error);
    return { success: false };
  }
}
