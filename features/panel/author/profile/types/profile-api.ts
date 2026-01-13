/**
 * API request/response types for author profile operations
 */

/**
 * Payload for updating author profile
 * All fields are optional to support partial updates
 */
export interface AuthorProfileUpdatePayload {
  title?: string;
  full_name?: string;
  institute?: string;
  designation?: string;
  degree?: string;
  gender?: string;
  bio?: string;
  research_interests?: string;
  orcid?: string;
  google_scholar?: string;
  researchgate?: string;
  linkedin?: string;
  website?: string;
  profile_picture?: File | null;
  cv?: File | null;
}

/**
 * API response for profile operations
 */
export interface AuthorProfileApiResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}
