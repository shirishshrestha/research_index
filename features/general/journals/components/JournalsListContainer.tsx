"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { fetchJournals } from "../api/journals.client";
import { JournalsListView } from "./JournalsListView";
import { JournalsListSkeleton } from "./JournalCardSkeleton";

export function JournalsListContainer() {
  const searchParams = useSearchParams();

  // Parse URL parameters
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("page_size") || "10");

  // Map URL params to API filters
  const filters = useMemo(() => {
    return {
      institution: searchParams.get("institution") || undefined,
      institutions: searchParams.get("institutions") || undefined,
      access_type: searchParams.get("access_type") || undefined,
      open_access:
        searchParams.get("open_access") === "true"
          ? true
          : searchParams.get("open_access") === "false"
            ? false
            : undefined,
      category: searchParams.get("category") || undefined,
      language: searchParams.get("language") || undefined,
      license: searchParams.get("license") || undefined,
      years: searchParams.get("years") || undefined,
      country: searchParams.get("country") || undefined,
      peer_review: searchParams.get("peer_review") || undefined,
      peer_reviewed:
        searchParams.get("peer_reviewed") === "true"
          ? true
          : searchParams.get("peer_reviewed") === "false"
            ? false
            : undefined,
      impact_factor: searchParams.get("impact_factor") || undefined,
      cite_score: searchParams.get("cite_score") || undefined,
      time_to_decision: searchParams.get("time_to_decision") || undefined,
      time_to_acceptance: searchParams.get("time_to_acceptance") || undefined,
      search: searchParams.get("search") || undefined,
      sort: searchParams.get("sort") || undefined,
    };
  }, [searchParams]);

  // Fetch data using TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["journals", filters, currentPage, pageSize],
    queryFn: () =>
      fetchJournals(filters, { page: currentPage, page_size: pageSize }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return <JournalsListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-lg">
          Error loading journals. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <JournalsListView initialData={data?.results || []} pagination={data} />
  );
}
