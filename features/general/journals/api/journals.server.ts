import { serverGet } from "@/lib/server-api";
import type { Publication } from "@/features/general/articles/types";

/* =======================
   Journal Types
======================= */

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

/* =======================
   Issue Types
======================= */

export interface Issue {
  id: number;
  journal_title: string;
  volume: number;
  issue_number: number;
  title: string;
  description: string;
  cover_image_url: string | null;
  publication_date: string;
  status: "draft" | "published" | "archived";
  status_display: string;
  is_special_issue: boolean;
  articles_count: number;
  created_at: string;
  updated_at: string;
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

export interface IssueDetail extends Issue {
  journal_id: number;
  cover_image: string | null;
  submission_deadline: string | null;
  doi: string | null;
  pages_range: string | null;
  editorial_note: string | null;
  guest_editors: string | null;
  articles: IssueArticle[];
}

/* =======================
   Volume Types
======================= */

export interface IssueArticleDetail {
  id: number;
  publication_id: number;
  title: string;
  authors: string;
  abstract: string;
  doi: string | null;
  pages: string | null;
  published_date: string;
  pdf_url: string | null;
  order: number;
  section: string;
}

export interface VolumeIssue {
  id: number;
  volume: number;
  issue_number: number;
  title: string;
  description: string;
  cover_image_url: string | null;
  publication_date: string;
  is_special_issue: boolean;
  articles: IssueArticleDetail[];
}

export interface Volume {
  volume: number;
  year: number | null;
  issues_count: number;
  articles_count: number;
  issues: VolumeIssue[];
}

export interface JournalVolumesResponse {
  journal_id: number;
  journal_title: string;
  total_volumes: number;
  volumes: Volume[];
}

/* =======================
   Filters
======================= */

export interface JournalFilters {
  institution?: number | string;
  institutions?: string;
  access_type?: string;
  open_access?: boolean;
  category?: string;
  language?: string;
  license?: string;
  years?: number | string;
  country?: string;
  peer_review?: string;
  peer_reviewed?: boolean;
  impact_factor?: number | string;
  cite_score?: number | string;
  time_to_decision?: number | string;
  time_to_acceptance?: number | string;
  search?: string;
  sort?: string;
}

export interface IssueFilters {
  year?: number;
  volume?: number;
  status?: "draft" | "published" | "archived";
}

/* =======================
   API Functions
======================= */

export async function getPublicJournals(
  filters?: JournalFilters,
): Promise<Journal[]> {
  const params = new URLSearchParams();

  // Basic filters
  if (filters?.institution)
    params.append("institution", String(filters.institution));
  if (filters?.institutions)
    params.append("institutions", filters.institutions);
  if (filters?.access_type) params.append("access_type", filters.access_type);
  if (filters?.open_access !== undefined)
    params.append("open_access", String(filters.open_access));
  if (filters?.peer_reviewed !== undefined)
    params.append("peer_reviewed", String(filters.peer_reviewed));
  if (filters?.search) params.append("search", filters.search);

  // Category and discipline filters
  if (filters?.category) params.append("category", filters.category);
  if (filters?.language) params.append("language", filters.language);
  if (filters?.license) params.append("license", filters.license);
  if (filters?.years) params.append("years", String(filters.years));
  if (filters?.country) params.append("country", filters.country);
  if (filters?.peer_review) params.append("peer_review", filters.peer_review);

  // Performance metrics filters
  if (filters?.impact_factor)
    params.append("impact_factor", String(filters.impact_factor));
  if (filters?.cite_score)
    params.append("cite_score", String(filters.cite_score));
  if (filters?.time_to_decision)
    params.append("time_to_decision", String(filters.time_to_decision));
  if (filters?.time_to_acceptance)
    params.append("time_to_acceptance", String(filters.time_to_acceptance));

  // Sorting
  if (filters?.sort) params.append("sort", filters.sort);

  return serverGet<Journal[]>(
    `/publications/journals/public/${params.toString() ? `?${params}` : ""}`,
    { tags: ["journals"], revalidate: 3600 },
  );
}

export async function getLatestJournals(): Promise<Journal[]> {
  const journals = await getPublicJournals();
  return journals.slice(0, 4);
}

export async function getPublicJournal(
  id: number | string,
): Promise<JournalDetail> {
  return serverGet<JournalDetail>(`/publications/journals/public/${id}/`, {
    tags: ["journals", `journal-${id}`],
    revalidate: 3600,
  });
}

export async function getJournalPublications(
  journalId: number | string,
): Promise<Publication[]> {
  return serverGet<Publication[]>(
    `/publications/journals/${journalId}/publications/`,
    {
      tags: ["journals", `journal-${journalId}`, "publications"],
      revalidate: 3600,
    },
  );
}

export async function getJournalVolumes(
  journalId: number | string,
): Promise<JournalVolumesResponse> {
  return serverGet<JournalVolumesResponse>(
    `/publications/journals/public/${journalId}/volumes/`,
    { tags: ["journals", `journal-${journalId}`, "volumes"], revalidate: 3600 },
  );
}

export async function getPublicJournalIssues(
  journalId: number | string,
  filters?: IssueFilters,
): Promise<Issue[]> {
  const params = new URLSearchParams();

  if (filters?.year) params.append("year", String(filters.year));
  if (filters?.volume) params.append("volume", String(filters.volume));
  if (filters?.status) params.append("status", filters.status);

  return serverGet<Issue[]>(
    `/publications/journals/public/${journalId}/issues/${params.toString() ? `?${params}` : ""}`,
    { tags: ["journals", `journal-${journalId}`, "issues"], revalidate: 3600 },
  );
}

export async function getPublicJournalIssue(
  journalId: number | string,
  issueId: number | string,
): Promise<IssueDetail> {
  return serverGet<IssueDetail>(
    `/publications/journals/public/${journalId}/issues/${issueId}/`,
    {
      tags: ["journals", `journal-${journalId}`, "issues", `issue-${issueId}`],
      revalidate: 3600,
    },
  );
}
