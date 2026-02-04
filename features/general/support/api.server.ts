/**
 * Server-side API functions for support pages
 * These functions run on the server and use Next.js caching with cache tags
 */

import { serverGet } from "@/lib/server-api";
import { SupportPage } from "./types";

/**
 * Get a specific support page by page type
 * @param pageType - "author_supporter" | "institutional_supporter" | "sponsorship_partnership"
 * @returns Support page data or null if not found
 */
export async function getSupportPage(
  pageType: string,
): Promise<SupportPage | null> {
  try {
    return await serverGet<SupportPage>(`/support/pages/${pageType}/`, {
      tags: [`support-page-${pageType}`, "support-pages"],
      revalidate: 3600, // Cache for 1 hour
    });
  } catch (error) {
    console.error(`Failed to fetch support page ${pageType}:`, error);
    // Return null to show fallback UI instead of crashing the page
    return null;
  }
}

/**
 * Preload support page data (for parallel fetching)
 */
export const preloadSupportPage = (pageType: string) => {
  void getSupportPage(pageType);
};
