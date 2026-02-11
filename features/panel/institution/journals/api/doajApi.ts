/**
 * DOAJ (Directory of Open Access Journals) API Client
 */

import { api } from "@/services/api";

export interface DOAJJournal {
  doaj_id: string;
  title: string;
  alternative_title?: string;
  issn?: string;
  e_issn?: string;
  publisher_name?: string;
  language?: string;
  languages?: string[];
  subjects?: string[];
  is_open_access: boolean;
  license?: string;
  has_apc: boolean;
  apc_amount?: number | null;
  apc_currency?: string | null;
  contact_email?: string;
  website?: string;
  peer_reviewed: boolean;
  peer_review_type?: string;
  has_plagiarism_detection: boolean;
  publication_time_weeks?: number | null;
  keywords?: string;
  country?: string;
  oa_start_year?: number | null;
  doaj_raw_data?: any;
}

export interface DOAJSearchResponse {
  total: number;
  page: number;
  page_size: number;
  results: DOAJJournal[];
}

/**
 * Search journals in DOAJ
 */
export async function searchDOAJJournals(
  query: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<DOAJSearchResponse> {
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    page_size: pageSize.toString(),
  });

  const response = await api.get<DOAJSearchResponse>(
    `/publications/doaj/search/?${params.toString()}`,
  );
  return response;
}

/**
 * Get journal by ISSN from DOAJ
 */
export async function getDOAJJournalByISSN(
  issn: string,
): Promise<DOAJJournal | null> {
  try {
    const response = await api.get<DOAJJournal>(
      `/publications/doaj/issn/${issn}/`,
    );
    return response;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return null; // Journal not found
    }
    throw error;
  }
}
