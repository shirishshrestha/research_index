"use client";

import { useQuery } from "@tanstack/react-query";
import type { IssuesResponse, IssueFilters } from "./issues.server";
import type { PaginationParams } from "@/types/pagination";
import { api } from "@/services/api";

export function usePublicIssues(
  filters?: IssueFilters,
  pagination?: PaginationParams,
) {
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

  return useQuery<IssuesResponse>({
    queryKey: ["issues", filters, pagination],
    queryFn: () =>
      api.get(
        `/publications/issues/public/${params.toString() ? `?${params}` : ""}`,
      ),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
