/**
 * Server actions for journal cache revalidation
 * These actions run on the server and are called from client components after mutations
 */

"use server";

import { revalidateTag } from "next/cache";

/**
 * Revalidate all journals cache
 * Call after creating, updating, or deleting journals
 */
export async function revalidateJournalsCache(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag("journals", "max");
    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate journals cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate specific journal by ID
 * Call after updating or deleting a specific journal
 * @param id - Journal ID
 */
export async function revalidateJournalCache(id: number | string): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag(`journal-${id}`, "max");
    revalidateTag("journals", "max"); // Also refresh list
    return { revalidated: true };
  } catch (error) {
    console.error(`Failed to revalidate journal ${id}:`, error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate publications cache
 * Call when journal stats change or issues are added/removed
 */
export async function revalidateJournalPublicationsCache(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag("publications", "max");
    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate publications cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
