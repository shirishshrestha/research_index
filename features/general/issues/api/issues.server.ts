import { serverGet } from "@/lib/server-api";
import type { PaginatedResponse, PaginationParams } from "@/types/pagination";

/* =======================
   Issue Types (Extended)
======================= */

export interface IssueArticlePreview {
  id: number;
  publication_id: number;
  title: string;
  authors: string;
  doi: string | null;
  pages: string | null;
  published_date: string;
  order: number;
  section: string;
}

export interface IssueListItem {
  id: number;
  journal_id: number;
  journal_title: string;
  journal_issn: string;
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
  articles?: IssueArticlePreview[];
}

export interface IssueFilters {
  journal?: number | string;
  volume?: number;
  year?: number;
  status?: "draft" | "published" | "archived";
  is_special_issue?: boolean;
  search?: string;
  sort?: string;
}

export interface IssuesResponse {
  results: IssueListItem[];
  count: number;
  next: string | null;
  previous: string | null;
}

/* =======================
   API Functions
======================= */

export async function getPublicIssues(
  filters?: IssueFilters,
  pagination?: PaginationParams,
): Promise<IssuesResponse> {
  const params = new URLSearchParams();

  // Pagination
  if (pagination?.page) params.append("page", pagination.page.toString());
  if (pagination?.page_size)
    params.append("page_size", pagination.page_size.toString());

  // Filters
  if (filters?.journal) params.append("journal", String(filters.journal));
  if (filters?.volume) params.append("volume", String(filters.volume));
  if (filters?.year) params.append("year", String(filters.year));
  if (filters?.status) params.append("status", filters.status);
  if (filters?.is_special_issue !== undefined)
    params.append("is_special_issue", String(filters.is_special_issue));
  if (filters?.search) params.append("search", filters.search);
  if (filters?.sort) params.append("sort", filters.sort);

  const response = await serverGet<PaginatedResponse<IssueListItem>>(
    `/publications/issues/public/${params.toString() ? `?${params}` : ""}`,
    { tags: ["issues"], revalidate: 3600, requireAuth: false },
  );

  return {
    results: response.results,
    count: response.count,
    next: response.next,
    previous: response.previous,
  };
}

export async function getLatestIssues(
  limit: number = 6,
): Promise<IssueListItem[]> {
  const response = await getPublicIssues(
    { status: "published", sort: "-publication_date" },
    { page: 1, page_size: limit },
  );

  return response.results;
}
