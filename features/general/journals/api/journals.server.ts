import { serverGet } from "@/lib/server-api";
import type { Publication } from "@/features/general/articles/types";

export interface JournalStats {
  total_publications: number;
  total_issues: number;
  total_citations: number;
  impact_factor: number | null;
  h_index: number | null;
}

export interface Journal {
  id: number;
  title: string;
  short_title: string;
  issn: string;
  e_issn: string;
  description: string;
  institution_name: string;
  publisher_name: string;
  frequency: string;
  frequency_display: string;
  established_year: number | null;
  is_open_access: boolean;
  peer_reviewed: boolean;
  is_active: boolean;
  cover_image_url: string | null;
  stats: JournalStats | null;
  editorial_board_count: number;
  issues_count: number;
  created_at: string;
  updated_at: string;
}

export interface EditorialBoardMember {
  id: number;
  name: string;
  role: string;
  affiliation: string;
  email: string;
  bio: string;
  is_active: boolean;
}

export interface JournalDetail extends Journal {
  institution_id: number;
  scope: string;
  cover_image: string;
  language: string;
  about_journal: string;
  ethics_policies: string;
  writing_formatting: string;
  submitting_manuscript: string;
  help_support: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  website: string;
  doi_prefix: string;
  editorial_board: EditorialBoardMember[];
}

export interface IssueArticle {
  id: number;
  publication: number;
  article_title: string;
  article_authors: string;
  article_doi: string;
  order: number;
  section: string;
}

export interface Issue {
  id: number;
  journal_title: string;
  volume: number;
  issue_number: number;
  title: string;
  description: string;
  cover_image_url: string | null;
  publication_date: string;
  status: string;
  status_display: string;
  is_special_issue: boolean;
  articles_count: number;
  created_at: string;
  updated_at: string;
}

export interface IssueDetail extends Issue {
  journal_id: number;
  cover_image: string;
  submission_deadline: string | null;
  doi: string | null;
  pages_range: string | null;
  editorial_note: string | null;
  guest_editors: string | null;
  articles: IssueArticle[];
}

export interface JournalFilters {
  institution?: number | string;
  open_access?: boolean;
  peer_reviewed?: boolean;
  search?: string;
}

/**
 * Fetch all journals (public endpoint)
 * @param filters - Optional filters for institution, open_access, peer_reviewed, and search
 */
export async function getPublicJournals(
  filters?: JournalFilters,
): Promise<Journal[]> {
  const params = new URLSearchParams();

  if (filters?.institution) {
    params.append("institution", String(filters.institution));
  }
  if (filters?.open_access !== undefined) {
    params.append("open_access", String(filters.open_access));
  }
  if (filters?.peer_reviewed !== undefined) {
    params.append("peer_reviewed", String(filters.peer_reviewed));
  }
  if (filters?.search) {
    params.append("search", filters.search);
  }

  const endpoint = `/publications/journals/public/${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await serverGet<Journal[]>(endpoint, {
    tags: ["journals"],
    revalidate: 3600, // Revalidate every hour
  });

  return response;
}

/**
 * Fetch a single journal by ID (public endpoint)
 * @param id - Journal ID
 */
export async function getPublicJournal(
  id: number | string,
): Promise<JournalDetail> {
  const response = await serverGet<JournalDetail>(
    `/publications/journals/public/${id}/`,
    {
      tags: ["journals", `journal-${id}`],
      revalidate: 3600, // Revalidate every hour
    },
  );

  return response;
}

/**
 * Fetch all publications for a specific journal (public endpoint)
 * @param journalId - Journal ID
 */
export async function getJournalPublications(
  journalId: number | string,
): Promise<Publication[]> {
  const response = await serverGet<Publication[]>(
    `/publications/journals/${journalId}/publications/`,
    {
      tags: ["journals", `journal-${journalId}`, "publications"],
      revalidate: 3600, // Revalidate every hour
    },
  );

  return response;
}

/**
 * Fetch all issues for a specific journal (public endpoint)
 * @param journalId - Journal ID
 * @param filters - Optional filters for year, volume, and status
 */
export async function getJournalIssues(
  journalId: number | string,
  filters?: {
    year?: number;
    volume?: number;
    status?: string;
  },
): Promise<Issue[]> {
  const params = new URLSearchParams();

  if (filters?.year) {
    params.append("year", String(filters.year));
  }
  if (filters?.volume) {
    params.append("volume", String(filters.volume));
  }
  if (filters?.status) {
    params.append("status", filters.status);
  }

  const endpoint = `/publications/journals/${journalId}/issues/${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await serverGet<Issue[]>(endpoint, {
    tags: ["journals", `journal-${journalId}`, "issues"],
    revalidate: 3600, // Revalidate every hour
  });

  return response;
}

/**
 * Fetch a single issue by ID (public endpoint)
 * @param journalId - Journal ID
 * @param issueId - Issue ID
 */
export async function getJournalIssue(
  journalId: number | string,
  issueId: number | string,
): Promise<IssueDetail> {
  const response = await serverGet<IssueDetail>(
    `/publications/journals/${journalId}/issues/${issueId}/`,
    {
      tags: ["journals", `journal-${journalId}`, "issues", `issue-${issueId}`],
      revalidate: 3600, // Revalidate every hour
    },
  );

  return response;
}
