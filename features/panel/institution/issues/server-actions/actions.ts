/**
 * Server actions for issue cache revalidation
 * These actions run on the server and are called from client components after mutations
 */

"use server";

import { revalidateTag } from "next/cache";

/**
 * Revalidate journal cache (includes issues)
 * Call after creating, updating, or deleting issues
 * @param journalId - Journal ID that contains the issues
 */
export async function revalidateJournalIssuesCache(
  journalId: number | string,
): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag(`journal-${journalId}`, "max"); // Journal detail includes issues
    revalidateTag("journals", "max"); // List view includes issue counts
    return { revalidated: true };
  } catch (error) {
    console.error(`Failed to revalidate journal ${journalId} issues:`, error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate publications cache when articles are added to issues
 */
export async function revalidateIssuePublicationsCache(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag("publications", "max");
    revalidateTag("public-articles", "max");
    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate publications cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
