"use client";

import { useGet } from "@/hooks/useApi";
import type { Issue, IssueListItem } from "../types";
import { ISSUES_QUERY_KEYS, ISSUES_ENDPOINTS } from "../constants";
import type { PaginatedResponse } from "@/types/pagination";

/**
 * Query hook to fetch all issues for a specific journal
 * @param journalId - The ID of the journal
 * @param initialData - Optional initial data from server-side rendering
 */
export const useIssuesQuery = (
  journalId: number | string | undefined,
  initialData?: PaginatedResponse<IssueListItem>,
) => {
  return useGet<PaginatedResponse<IssueListItem>>(
    journalId
      ? (ISSUES_QUERY_KEYS.lists(Number(journalId)) as unknown as string[])
      : [],
    journalId ? ISSUES_ENDPOINTS.LIST(Number(journalId)) : "",
    {
      enabled: !!journalId,
      initialData,
    },
  );
};

/**
 * Query hook to fetch a single issue by ID
 * @param journalId - The ID of the journal
 * @param issueId - The ID of the issue
 */
export const useIssueQuery = (
  journalId: number | string | undefined,
  issueId: number | string | undefined,
) => {
  return useGet<Issue>(
    journalId && issueId
      ? (ISSUES_QUERY_KEYS.detail(
          Number(journalId),
          issueId,
        ) as unknown as string[])
      : [],
    journalId && issueId
      ? ISSUES_ENDPOINTS.DETAIL(Number(journalId), Number(issueId))
      : "",
    {
      enabled: !!journalId && !!issueId,
    },
  );
};
