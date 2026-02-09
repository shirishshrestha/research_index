import { serverGet } from "@/lib/server-api";
import type { PaginatedResponse, PaginationParams } from "@/types/pagination";
import type { Author, AuthorDetail, AuthorFilters } from "../types";

export interface AuthorsResponse {
  results: Author[];
  count: number;
  next: string | null;
  previous: string | null;
}

/**
 * Fetch all authors (public endpoint)
 * Supports comprehensive filtering by title, institute, designation, metrics, and more
 * @param filters - Optional filters for various author attributes
 * @param pagination - Optional pagination parameters
 */
export async function getPublicAuthors(
  filters?: AuthorFilters,
  pagination?: PaginationParams,
): Promise<AuthorsResponse> {
  const params = new URLSearchParams();

  // Pagination
  if (pagination?.page) params.append("page", pagination.page.toString());
  if (pagination?.page_size)
    params.append("page_size", pagination.page_size.toString());

  // Filters
  if (filters?.title) params.append("title", filters.title);
  if (filters?.institute) params.append("institute", filters.institute);
  if (filters?.designation) params.append("designation", filters.designation);
  if (filters?.gender) params.append("gender", filters.gender);
  if (filters?.degree) params.append("degree", filters.degree);
  if (filters?.research_interest)
    params.append("research_interest", filters.research_interest);
  if (filters?.h_index_min)
    params.append("h_index_min", filters.h_index_min.toString());
  if (filters?.h_index_max)
    params.append("h_index_max", filters.h_index_max.toString());
  if (filters?.i10_index_min)
    params.append("i10_index_min", filters.i10_index_min.toString());
  if (filters?.i10_index_max)
    params.append("i10_index_max", filters.i10_index_max.toString());
  if (filters?.min_citations)
    params.append("min_citations", filters.min_citations.toString());
  if (filters?.max_citations)
    params.append("max_citations", filters.max_citations.toString());
  if (filters?.min_publications)
    params.append("min_publications", filters.min_publications.toString());
  if (filters?.max_publications)
    params.append("max_publications", filters.max_publications.toString());
  if (filters?.has_orcid !== undefined)
    params.append("has_orcid", filters.has_orcid.toString());
  if (filters?.has_google_scholar !== undefined)
    params.append("has_google_scholar", filters.has_google_scholar.toString());
  if (filters?.has_website !== undefined)
    params.append("has_website", filters.has_website.toString());
  if (filters?.search) params.append("search", filters.search);

  const endpoint = `/publications/authors/public/${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await serverGet<PaginatedResponse<Author>>(endpoint, {
    tags: ["authors"],
    revalidate: 3600, // Revalidate every hour
    requireAuth: false,
  });

  return {
    results: response.results,
    count: response.count,
    next: response.next,
    previous: response.previous,
  };
}

/**
 * Fetch a single author by ID (public endpoint)
 * @param id - Author ID
 */
export async function getPublicAuthor(
  id: number | string,
): Promise<AuthorDetail> {
  const response = await serverGet<AuthorDetail>(
    `/publications/authors/public/${id}/`,
    {
      tags: ["authors", `author-${id}`],
      revalidate: 3600, // Revalidate every hour
      requireAuth: false,
    },
  );

  return response;
}
