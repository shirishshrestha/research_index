/**
 * Client-side API calls for institution profile
 * Uses axios for mutations from Client Components
 */

import { api } from "@/services/api";
import type {
  InstitutionProfile,
  InstitutionProfileUpdatePayload,
} from "../types";

/**
 * Update institution profile
 * Should only be called from Client Components
 *
 * @param data - The profile data to update
 * @returns Promise resolving to updated profile
 * @example
 * ```ts
 * const updated = await updateInstitutionProfile({ institution_name: "MIT" });
 * ```
 */
export async function updateInstitutionProfile(
  data: InstitutionProfileUpdatePayload
): Promise<InstitutionProfile> {
  return api.patch<InstitutionProfile>("/auth/profile/institution/", data);
}
