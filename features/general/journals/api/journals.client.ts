"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { PaginationParams } from "@/types/pagination";
import type {
  Issue,
  JournalVolumesResponse,
  Journal,
  JournalFilters,
  JournalsResponse,
} from "./journals.server";

/**
 * Fetch all journals (client-side)
 */
export async function fetchJournals(
  filters?: JournalFilters,
  pagination?: PaginationParams,
): Promise<JournalsResponse> {
  const params = new URLSearchParams();

  // Pagination
  if (pagination?.page) params.append("page", pagination.page.toString());
  if (pagination?.page_size)
    params.append("page_size", pagination.page_size.toString());

  // Filters
  if (filters?.institution)
    params.append("institution", filters.institution.toString());
  if (filters?.institutions)
    params.append("institutions", filters.institutions);
  if (filters?.access_type) params.append("access_type", filters.access_type);
  if (filters?.open_access !== undefined)
    params.append("open_access", filters.open_access.toString());
  if (filters?.category) params.append("category", filters.category);
  if (filters?.language) params.append("language", filters.language);
  if (filters?.license) params.append("license", filters.license);
  if (filters?.years) params.append("years", filters.years.toString());
  if (filters?.country) params.append("country", filters.country);
  if (filters?.peer_review) params.append("peer_review", filters.peer_review);
  if (filters?.peer_reviewed !== undefined)
    params.append("peer_reviewed", filters.peer_reviewed.toString());
  if (filters?.impact_factor)
    params.append("impact_factor", filters.impact_factor.toString());
  if (filters?.cite_score)
    params.append("cite_score", filters.cite_score.toString());
  if (filters?.time_to_decision)
    params.append("time_to_decision", filters.time_to_decision.toString());
  if (filters?.time_to_acceptance)
    params.append("time_to_acceptance", filters.time_to_acceptance.toString());
  if (filters?.search) params.append("search", filters.search);
  if (filters?.sort) params.append("sort", filters.sort);

  const endpoint = `/publications/journals/public/${params.toString() ? `?${params.toString()}` : ""}`;

  return api.get<JournalsResponse>(endpoint);
}

/**
 * Fetch journal volumes with nested issues and articles from the client side
 * @param journalId - The journal ID
 */
async function fetchJournalVolumes(
  journalId: number | string,
): Promise<JournalVolumesResponse> {
  return api.get<JournalVolumesResponse>(
    `/publications/journals/public/${journalId}/volumes/`,
  );
}

/**
 * React Query hook to fetch journal volumes with nested issues and articles
 * @param journalId - The journal ID
 */
export function useJournalVolumes(journalId: number | undefined) {
  return useQuery({
    queryKey: ["journal-volumes", journalId],
    queryFn: () => fetchJournalVolumes(journalId!),
    enabled: !!journalId,
  });
}

/**
 * Fetch journal issues from the client side
 * @param journalId - The journal ID
 * @param filters - Optional filters (year, volume, status)
 */
async function fetchJournalIssues(
  journalId: number | string,
  filters?: { year?: number; volume?: number; status?: string },
): Promise<Issue[]> {
  const params = new URLSearchParams();
  if (filters?.year) params.append("year", String(filters.year));
  if (filters?.volume) params.append("volume", String(filters.volume));
  if (filters?.status) params.append("status", filters.status);

  const queryString = params.toString() ? `?${params.toString()}` : "";
  return api.get<Issue[]>(
    `/publications/journals/${journalId}/issues/${queryString}`,
  );
}

/**
 * React Query hook to fetch journal issues
 * @param journalId - The journal ID
 * @param filters - Optional filters (year, volume, status)
 */
export function useJournalIssues(
  journalId: number | undefined,
  filters?: { year?: number; volume?: number; status?: string },
) {
  return useQuery({
    queryKey: ["journal-issues", journalId, filters],
    queryFn: () => fetchJournalIssues(journalId!, filters),
    enabled: !!journalId,
  });
}
