/**
 * API functions for claiming journals and creating institution accounts
 */

import { api } from "@/services/api";
import { AuthTokens, UserProfile } from "../types";

export interface ClaimableJournal {
  id: number;
  title: string;
  short_title?: string;
  issn?: string;
  e_issn?: string;
  publisher?: string;
  website?: string;
  description?: string;
  cover_image_url?: string;
  current_owner: string; // The system placeholder institution
}

export interface SearchClaimableJournalsResponse {
  results: ClaimableJournal[];
  count: number;
  search_query: string;
}

export interface ClaimJournalsWithInstitutionRequest {
  // Institution account details
  email: string;
  password: string;
  confirm_password: string;
  institution_name: string;

  // Optional institution profile fields
  institution_type?: string;
  country?: string;
  website?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  phone?: string;

  // Journals to claim
  journal_ids: number[];
}

export interface ClaimJournalsWithLoginRequest {
  // Login credentials
  email: string;
  password: string;

  // Journals to claim
  journal_ids: number[];
}

export interface ClaimJournalRequest {
  journal_id: number;
}

export interface ClaimJournalsResponse {
  message: string;
  tokens: AuthTokens;
  user: UserProfile;
  institution: {
    id: number;
    name: string;
    email: string;
  };
  journals_claimed: number;
  journal_titles: string[];
}

export interface MyJournalsResponse {
  journals: ClaimableJournal[];
  count: number;
}

/**
 * Search for claimable journals
 */
export async function searchClaimableJournals(
  searchQuery: string,
): Promise<SearchClaimableJournalsResponse> {
  const params = new URLSearchParams({
    search_query: searchQuery,
  });

  const response = await api.get<SearchClaimableJournalsResponse>(
    `/auth/journals/claim/search/?${params.toString()}`,
  );
  return response;
}

/**
 * Create institution account and claim journals
 * This is the primary method for institutions to join the platform
 */
export async function claimJournalsWithInstitution(
  data: ClaimJournalsWithInstitutionRequest,
): Promise<ClaimJournalsResponse> {
  const response = await api.post<ClaimJournalsResponse>(
    "/auth/journals/claim/create-institution/",
    data,
  );
  return response;
}

/**
 * Claim journals by logging in with existing credentials
 * This allows existing institutions to claim multiple journals at once
 */
export async function claimJournalsWithLogin(
  data: ClaimJournalsWithLoginRequest,
): Promise<ClaimJournalsResponse> {
  const response = await api.post<ClaimJournalsResponse>(
    "/auth/journals/claim/with-login/",
    data,
  );
  return response;
}

/**
 * Claim an additional journal for an existing institution
 * Requires authentication
 */
export async function claimAdditionalJournal(
  data: ClaimJournalRequest,
): Promise<{ message: string; journal: ClaimableJournal }> {
  const response = await api.post<{
    message: string;
    journal: ClaimableJournal;
  }>("/auth/journals/claim/add/", data);
  return response;
}

/**
 * Get list of journals owned by the authenticated institution
 * Requires authentication
 */
export async function getMyJournals(): Promise<MyJournalsResponse> {
  const response = await api.get<MyJournalsResponse>(
    "/auth/journals/my-journals/",
  );
  return response;
}
