/**
 * Server actions for author cache revalidation
 * These actions run on the server and are called from client components after mutations
 */

"use server";

import { revalidateTag } from "next/cache";

/**
 * Revalidate all authors cache
 * Call after creating, updating, or deleting authors
 */
export async function revalidateAuthorsCache(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag("authors", "max");
    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate authors cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate specific author by ID
 * Call after updating author profile, stats, or publications
 * @param id - Author ID
 */
export async function revalidateAuthorCache(id: number | string): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag(`author-${id}`, "max");
    revalidateTag("authors", "max"); // Also refresh list
    return { revalidated: true };
  } catch (error) {
    console.error(`Failed to revalidate author ${id}:`, error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
