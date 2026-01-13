/**
 * Server-side API calls for author profile
 * Uses native fetch() with Next.js caching
 * Should only be used in Server Components
 */

import { serverGet } from "@/lib/server-api";
import type { AuthorProfile } from "../types";

/**
 * Fetch author profile data from the server
 * Uses Next.js cache tags for revalidation
 *
 * @returns Promise resolving to author profile data
 * @example
 * ```ts
 * const profile = await getAuthorProfile();
 * ```
 */
export async function getAuthorProfile(): Promise<AuthorProfile> {
  return serverGet<AuthorProfile>("/auth/profile/author/", {
    tags: ["author-profile"],
  });
}
