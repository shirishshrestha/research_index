"use client";

import { useGet } from "@/hooks/useApi";
import type { Journal, JournalListItem, JournalStats } from "../types";
import { JOURNALS_QUERY_KEYS, JOURNALS_ENDPOINTS } from "../constants";

/**
 * Query hook to fetch all journals for the authenticated institution
 * @param initialData - Optional initial data from server-side rendering
 */
export const useJournalsQuery = (initialData?: JournalListItem[]) => {
  return useGet<JournalListItem[]>(
    [...JOURNALS_QUERY_KEYS.lists()],
    JOURNALS_ENDPOINTS.LIST,
    {
      initialData,
    },
  );
};

/**
 * Query hook to fetch a single journal by ID
 */
export const useJournalQuery = (id: number | string | undefined) => {
  return useGet<Journal>(
    id ? JOURNALS_QUERY_KEYS.detail(id).map(String) : [],
    id ? JOURNALS_ENDPOINTS.DETAIL(Number(id)) : "",
    {
      enabled: !!id,
    },
  );
};

/**
 * Query hook to fetch journal statistics
 */
export const useJournalStatsQuery = (id: number | string | undefined) => {
  return useGet<JournalStats>(
    id ? JOURNALS_QUERY_KEYS.stats(id).map(String) : [],
    id ? JOURNALS_ENDPOINTS.STATS(Number(id)) : "",
    {
      enabled: !!id,
    },
  );
};
