"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { Issue } from "./journals.server";

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
