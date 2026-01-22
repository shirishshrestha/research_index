"use server";

import { revalidateTag } from "next/cache";

/**
 * Server Action: Revalidate institutions cache
 * Call this after creating or updating institutions
 *
 * Cache invalidation flow:
 * Client Component → mutation (axios) → revalidateInstitutionsAction → revalidateTag
 */
export async function revalidateInstitutionsAction(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    // Revalidate cache tags - triggers Server Component refetch
    // Next.js 16 requires profile/config as second argument
    revalidateTag("institutions", "default");

    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate institutions cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate a specific institution by ID
 */
export async function revalidateInstitutionAction(
  id: number | string,
): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag(`institution-${id}`, "default");
    revalidateTag("institutions", "default");

    return { revalidated: true };
  } catch (error) {
    console.error(`Failed to revalidate institution ${id}:`, error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
