"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { fetchInstitutions } from "../api/institutions.client";
import { InstitutionsListView } from "./InstitutionsListView";
import { InstitutionsListSkeleton } from "./InstitutionListSkeleton";

export function InstitutionsListContainer() {
  const searchParams = useSearchParams();

  // Parse URL parameters
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("page_size") || "10");

  // Map URL params to API filters
  const filters = useMemo(() => {
    const publicationCount = searchParams.get("publication_count");
    let minPublications: number | undefined;

    if (publicationCount) {
      const range = publicationCount;
      if (range === "1-10") {
        minPublications = 1;
      } else if (range === "11-30") {
        minPublications = 11;
      } else if (range === "31-50") {
        minPublications = 31;
      } else if (range === "51-100") {
        minPublications = 51;
      } else if (range === "100+") {
        minPublications = 100;
      }
    }

    return {
      country: searchParams.get("country") || undefined,
      type: searchParams.get("type") || undefined,
      city: searchParams.get("city") || undefined,
      state: searchParams.get("state") || undefined,
      established_year: searchParams.get("established_year")
        ? parseInt(searchParams.get("established_year")!)
        : undefined,
      established_from: searchParams.get("established_from")
        ? parseInt(searchParams.get("established_from")!)
        : undefined,
      established_to: searchParams.get("established_to")
        ? parseInt(searchParams.get("established_to")!)
        : undefined,
      research_area:
        searchParams.get("research_area") ||
        searchParams.get("field") ||
        undefined,
      min_researchers: searchParams.get("min_researchers")
        ? parseInt(searchParams.get("min_researchers")!)
        : undefined,
      min_publications: searchParams.get("min_publications")
        ? parseInt(searchParams.get("min_publications")!)
        : minPublications,
      min_citations: searchParams.get("min_citations")
        ? parseInt(searchParams.get("min_citations")!)
        : undefined,
      has_website:
        searchParams.get("has_website") === "true"
          ? true
          : searchParams.get("has_website") === "false"
            ? false
            : undefined,
      search: searchParams.get("search") || undefined,
    };
  }, [searchParams]);

  // Fetch data using TanStack Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["institutions", filters, currentPage, pageSize],
    queryFn: () =>
      fetchInstitutions(filters, { page: currentPage, page_size: pageSize }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return <InstitutionsListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-lg">
          Error loading institutions. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <InstitutionsListView initialData={data?.results || []} pagination={data} />
  );
}
