/**
 * Client-side API calls for author profile
 * Uses axios for mutations from Client Components
 */

import { api } from "@/services/api";
import type { AuthorProfile, AuthorProfileUpdatePayload } from "../types";

/**
 * Update author profile
 * Should only be called from Client Components
 *
 * @param data - The profile data to update
 * @returns Promise resolving to updated profile
 * @example
 * ```ts
 * const updated = await updateAuthorProfile({ full_name: "John Doe" });
 * ```
 */
export async function updateAuthorProfile(
  data: AuthorProfileUpdatePayload
): Promise<AuthorProfile> {
  return api.patch<AuthorProfile>("/auth/profile/author/", data);
}
