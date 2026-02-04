/**
 * Crossref API client for fetching publication metadata
 */

import { api } from "@/services/api";

export interface CrossrefAuthor {
  given?: string;
  family?: string;
  name?: string;
  affiliation?: Array<{ name: string }>;
  ORCID?: string;
}

export interface CrossrefNormalizedData {
  doi: string;
  title: string;
  authors: CrossrefAuthor[];
  published_date: string | null;
  journal: string;
  volume: string;
  issue: string;
  pages: string;
  publisher: string;
  abstract?: string;
  citation_count: number;
  reference_count: number;
  issn?: string[];
  isbn?: string[];
  type?: string;
  url?: string;
}

export interface CrossrefWorkResponse {
  status: string;
  data: {
    raw: Record<string, unknown>;
    normalized: CrossrefNormalizedData;
  };
}

export interface CrossrefReferencesResponse {
  status: string;
  data: {
    doi: string;
    reference_count: number;
    references: Array<{
      key?: string;
      doi?: string;
      "article-title"?: string;
      unstructured?: string;
      author?: string;
      year?: string;
      journal?: string;
      volume?: string;
      page?: string;
    }>;
  };
}

export interface CrossrefCitationsResponse {
  status: string;
  data: {
    doi: string;
    citation_count: number;
    is_referenced_by_count: number;
  };
}

export const crossrefApi = {
  /**
   * Fetch publication metadata by DOI
   * @param doi - Digital Object Identifier (e.g., 10.1037/0003-066X.59.1.29)
   */
  async getWorkByDOI(doi: string): Promise<CrossrefWorkResponse> {
    // URL encode the DOI to handle slashes
    const encodedDOI = encodeURIComponent(doi);
    return api.get<CrossrefWorkResponse>(`/crossref/works/${encodedDOI}/`);
  },

  /**
   * Get references cited by a publication
   * @param doi - Digital Object Identifier
   */
  async getWorkReferences(doi: string): Promise<CrossrefReferencesResponse> {
    const encodedDOI = encodeURIComponent(doi);
    return api.get<CrossrefReferencesResponse>(
      `/crossref/works/${encodedDOI}/references/`,
    );
  },

  /**
   * Get citation count for a publication
   * @param doi - Digital Object Identifier
   */
  async getWorkCitations(doi: string): Promise<CrossrefCitationsResponse> {
    const encodedDOI = encodeURIComponent(doi);
    return api.get<CrossrefCitationsResponse>(
      `/crossref/works/${encodedDOI}/citations/`,
    );
  },

  /**
   * Search for publications
   * @param query - Search query
   * @param options - Search options (rows, offset, sort, order)
   */
  async searchWorks(
    query: string,
    options?: {
      rows?: number;
      offset?: number;
      sort?: string;
      order?: "asc" | "desc";
    },
  ): Promise<{ status: string; data: unknown }> {
    const params = new URLSearchParams({
      query,
      ...(options?.rows && { rows: String(options.rows) }),
      ...(options?.offset && { offset: String(options.offset) }),
      ...(options?.sort && { sort: options.sort }),
      ...(options?.order && { order: options.order }),
    });

    return api.get(`/crossref/search/works/?${params.toString()}`);
  },

  /**
   * Validate a DOI format
   * @param doi - Digital Object Identifier to validate
   */
  async validateDOI(doi: string): Promise<{ status: string; valid: boolean }> {
    const params = new URLSearchParams({ doi });
    return api.get(`/crossref/validate-doi/?${params.toString()}`);
  },

  /**
   * Import/create a journal from Crossref metadata
   * @param journalName - Journal name from Crossref
   * @param issn - ISSN array
   * @param publisher - Publisher name
   */
  async importJournal(
    journalName: string,
    issn?: string[],
    publisher?: string,
  ): Promise<{
    status: string;
    message: string;
    journal: { id: number; title: string; issn: string; e_issn: string };
  }> {
    return api.post("/crossref/import-journal/", {
      journal_name: journalName,
      issn: issn || [],
      publisher: publisher || "",
    });
  },
};
