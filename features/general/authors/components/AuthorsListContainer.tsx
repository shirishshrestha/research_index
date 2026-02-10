"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { fetchAuthors } from "../api/authors.client";
import { AuthorsListView } from "./AuthorsListView";
import { AuthorsListSkeleton } from "./AuthorListSkeleton";

export function AuthorsListContainer() {
  const searchParams = useSearchParams();

  // Parse URL parameters
  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("page_size") || "10");

  // Map URL params to API filters
  const filters = useMemo(() => {
    const publicationCount = searchParams.get("publication_count");
    let minPublications: number | undefined;
    let maxPublications: number | undefined;

    if (publicationCount) {
      const range = publicationCount;
      if (range === "1-10") {
        minPublications = 1;
        maxPublications = 10;
      } else if (range === "11-30") {
        minPublications = 11;
        maxPublications = 30;
      } else if (range === "31-50") {
        minPublications = 31;
        maxPublications = 50;
      } else if (range === "51-100") {
        minPublications = 51;
        maxPublications = 100;
      } else if (range === "100+") {
        minPublications = 100;
      }
    }

    return {
      title: searchParams.get("title") || undefined,
      institute:
        searchParams.get("institute") ||
        searchParams.get("affiliation") ||
        undefined,
      designation: searchParams.get("designation") || undefined,
      gender: searchParams.get("gender") || undefined,
      degree: searchParams.get("degree") || undefined,
      research_interest:
        searchParams.get("research_interest") ||
        searchParams.get("field") ||
        undefined,
      h_index_min: searchParams.get("h_index_min")
        ? parseInt(searchParams.get("h_index_min")!)
        : undefined,
      h_index_max: searchParams.get("h_index_max")
        ? parseInt(searchParams.get("h_index_max")!)
        : undefined,
      i10_index_min: searchParams.get("i10_index_min")
        ? parseInt(searchParams.get("i10_index_min")!)
        : undefined,
      i10_index_max: searchParams.get("i10_index_max")
        ? parseInt(searchParams.get("i10_index_max")!)
        : undefined,
      min_citations: searchParams.get("min_citations")
        ? parseInt(searchParams.get("min_citations")!)
        : undefined,
      max_citations: searchParams.get("max_citations")
        ? parseInt(searchParams.get("max_citations")!)
        : undefined,
      min_publications: searchParams.get("min_publications")
        ? parseInt(searchParams.get("min_publications")!)
        : minPublications,
      max_publications: searchParams.get("max_publications")
        ? parseInt(searchParams.get("max_publications")!)
        : maxPublications,
      has_orcid:
        searchParams.get("has_orcid") === "true"
          ? true
          : searchParams.get("has_orcid") === "false"
            ? false
            : undefined,
      has_google_scholar:
        searchParams.get("has_google_scholar") === "true"
          ? true
          : searchParams.get("has_google_scholar") === "false"
            ? false
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
    queryKey: ["authors", filters, currentPage, pageSize],
    queryFn: () =>
      fetchAuthors(filters, { page: currentPage, page_size: pageSize }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return <AuthorsListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-lg">
          Error loading authors. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <AuthorsListView initialData={data?.results || []} pagination={data} />
  );
}
