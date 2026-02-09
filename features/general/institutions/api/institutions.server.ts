import { serverGet } from "@/lib/server-api";
import type { PaginatedResponse, PaginationParams } from "@/types/pagination";
import type {
  Institution,
  InstitutionDetail,
  InstitutionFilters,
} from "../types";

export interface InstitutionsResponse {
  results: Institution[];
  count: number;
  next: string | null;
  previous: string | null;
}

/**
 * Fetch all institutions (public endpoint)
 * Supports comprehensive filtering by country, type, location, metrics, and more
 * @param filters - Optional filters for country, type, location, research areas, etc.
 * @param pagination - Optional pagination parameters
 */
export async function getPublicInstitutions(
  filters?: InstitutionFilters,
  pagination?: PaginationParams,
): Promise<InstitutionsResponse> {
  const params = new URLSearchParams();

  // Pagination
  if (pagination?.page) params.append("page", pagination.page.toString());
  if (pagination?.page_size)
    params.append("page_size", pagination.page_size.toString());

  // Filters
  if (filters?.country) params.append("country", filters.country);
  if (filters?.type) params.append("type", filters.type);
  if (filters?.city) params.append("city", filters.city);
  if (filters?.state) params.append("state", filters.state);
  if (filters?.established_year)
    params.append("established_year", filters.established_year.toString());
  if (filters?.established_from)
    params.append("established_from", filters.established_from.toString());
  if (filters?.established_to)
    params.append("established_to", filters.established_to.toString());
  if (filters?.research_area)
    params.append("research_area", filters.research_area);
  if (filters?.min_researchers)
    params.append("min_researchers", filters.min_researchers.toString());
  if (filters?.min_publications)
    params.append("min_publications", filters.min_publications.toString());
  if (filters?.min_citations)
    params.append("min_citations", filters.min_citations.toString());
  if (filters?.has_website !== undefined)
    params.append("has_website", filters.has_website.toString());
  if (filters?.search) params.append("search", filters.search);

  const endpoint = `/publications/institutions/public/${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await serverGet<PaginatedResponse<Institution>>(endpoint, {
    tags: ["institutions"],
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
 * Fetch a single institution by ID (public endpoint)
 * @param id - Institution ID
 */
export async function getPublicInstitution(
  id: number | string,
): Promise<InstitutionDetail> {
  const response = await serverGet<InstitutionDetail>(
    `/publications/institutions/public/${id}/`,
    {
      tags: ["institutions", `institution-${id}`],
      revalidate: 3600, // Revalidate every hour
    },
  );

  return response;
}
