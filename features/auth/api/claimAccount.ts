/**
 * API functions for claiming imported user accounts
 */

import { api } from "@/services/api";

export interface ImportedAuthor {
  id: number;
  user_id: number;
  email: string;
  title: string;
  full_name: string;
  institute: string;
  designation: string;
  orcid?: string;
  is_active: boolean;
}

export interface SearchImportedAuthorsResponse {
  results: ImportedAuthor[];
  count: number;
  search_query: string;
}

export interface ClaimAuthorRequest {
  author_id: number;
  new_email: string;
  password: string;
  confirm_password: string;
  bio?: string;
  research_interests?: string;
  google_scholar?: string;
  researchgate?: string;
  linkedin?: string;
  website?: string;
}

export interface ClaimAccountResponse {
  message: string;
  user: {
    email: string;
    user_type: string;
    is_active: boolean;
  };
}

/**
 * Search for imported authors that can be claimed
 */
export async function searchImportedAuthors(
  searchQuery: string,
): Promise<SearchImportedAuthorsResponse> {
  const params = new URLSearchParams({
    search_query: searchQuery,
  });

  const response = await api.get<SearchImportedAuthorsResponse>(
    `/auth/claim/authors/search/?${params.toString()}`,
  );
  return response;
}

/**
 * Claim an imported author account
 */
export async function claimAuthorAccount(
  data: ClaimAuthorRequest,
): Promise<ClaimAccountResponse> {
  const response = await api.post<ClaimAccountResponse>(
    "/auth/claim/author/",
    data,
  );
  return response;
}
