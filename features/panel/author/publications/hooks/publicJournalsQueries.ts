"use client";

import { useGet } from "@/hooks/useApi";
import type { Journal, Issue } from "../types";

/**
 * Query keys for public journals and issues (accessible by authors)
 */
export const PUBLIC_JOURNALS_QUERY_KEYS = {
  all: ["public-journals"] as const,
  lists: () => [...PUBLIC_JOURNALS_QUERY_KEYS.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...PUBLIC_JOURNALS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...PUBLIC_JOURNALS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: number | string) =>
    [...PUBLIC_JOURNALS_QUERY_KEYS.details(), String(id)] as const,
  issues: (journalId: number | string) =>
    [...PUBLIC_JOURNALS_QUERY_KEYS.detail(journalId), "issues"] as const,
} as const;

/**
 * Query hook to fetch all public journals
 * Available for all authenticated users
 */
export const usePublicJournalsQuery = (options?: { enabled?: boolean }) => {
  return useGet<Journal[]>(
    [...PUBLIC_JOURNALS_QUERY_KEYS.lists()],
    "/publications/journals/public/",
    {
      ...options,
    },
  );
};

/**
 * Query hook to fetch a single public journal by ID
 */
export const usePublicJournalQuery = (id: number | string | undefined) => {
  return useGet<Journal>(
    id ? PUBLIC_JOURNALS_QUERY_KEYS.detail(id).map(String) : [],
    id ? `/publications/journals/public/${id}/` : "",
    {
      enabled: !!id,
    },
  );
};

/**
 * Query hook to fetch issues for a specific journal
 * Automatically fetches when journalId is provided
 */
export const useJournalIssuesQuery = (
  journalId: number | string | undefined,
) => {
  return useGet<Issue[]>(
    journalId ? PUBLIC_JOURNALS_QUERY_KEYS.issues(journalId).map(String) : [],
    journalId ? `/publications/journals/${journalId}/issues/` : "",
    {
      enabled: !!journalId,
    },
  );
};
