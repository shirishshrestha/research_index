/**
 * Server-side API calls for institution profile
 * Uses native fetch() with Next.js caching
 * Should only be used in Server Components
 */

import { serverGet } from "@/lib/server-api";
import type { InstitutionProfile } from "../types";

/**
 * Fetch institution profile data from the server
 * Uses Next.js cache tags for revalidation
 *
 * @returns Promise resolving to institution profile data
 * @example
 * ```ts
 * const profile = await getInstitutionProfile();
 * ```
 */
export async function getInstitutionProfile(): Promise<InstitutionProfile> {
  return serverGet<InstitutionProfile>("/auth/profile/institution/", {
    tags: ["institution-profile"],
    revalidate: 300, // Cache for 5 minutes
  });
}
