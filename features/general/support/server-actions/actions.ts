/**
 * Server actions for support page cache revalidation
 * These actions run on the server and are called from client components after mutations
 */

"use server";

import { revalidateTag } from "next/cache";

/**
 * Revalidate all support pages cache
 * Call after operations that affect multiple support pages
 */
export async function revalidateSupportPagesCache(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag("support-pages", "max");
    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate support pages cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate specific support page by page type
 * Call after creating, updating, or deleting content on a specific support page
 * @param pageType - "author_supporter" | "institutional_supporter" | "sponsorship_partnership"
 */
export async function revalidateSupportPageCache(
  pageType: string,
): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag(`support-page-${pageType}`, "max");
    revalidateTag("support-pages", "max"); // Also invalidate list view
    return { revalidated: true };
  } catch (error) {
    console.error(`Failed to revalidate support page ${pageType}:`, error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
