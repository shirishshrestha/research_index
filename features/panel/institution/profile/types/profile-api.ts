/**
 * API request/response types for institution profile operations
 */

/**
 * Payload for updating institution profile
 * All fields are optional to support partial updates
 */
export interface InstitutionProfileUpdatePayload {
  institution_name?: string;
  institution_type?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  website?: string;
  established_year?: number | null;
  research_areas?: string;
  total_researchers?: number | null;
  logo?: File | null;
}

/**
 * API response for profile operations
 */
export interface InstitutionProfileApiResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}
