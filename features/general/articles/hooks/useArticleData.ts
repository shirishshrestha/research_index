/**
 * React Query hooks for article references and citations
 */

import { useQuery } from "@tanstack/react-query";
import { crossrefApi } from "@/features/panel/author/publications/api/crossref";
import type {
  CrossrefReferencesResponse,
  CrossrefCitationsResponse,
} from "@/features/panel/author/publications/api/crossref";

export const ARTICLE_QUERY_KEYS = {
  references: (doi: string) => ["article", "references", doi] as const,
  citations: (doi: string) => ["article", "citations", doi] as const,
};

/**
 * Hook to fetch references for an article by DOI
 */
export function useArticleReferences(doi: string | null | undefined) {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.references(doi || ""),
    queryFn: () => {
      if (!doi) throw new Error("DOI is required");
      return crossrefApi.getWorkReferences(doi);
    },
    enabled: !!doi,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - references don't change often
  });
}

/**
 * Hook to fetch citations for an article by DOI
 */
export function useArticleCitations(doi: string | null | undefined) {
  return useQuery({
    queryKey: ARTICLE_QUERY_KEYS.citations(doi || ""),
    queryFn: () => {
      if (!doi) throw new Error("DOI is required");
      return crossrefApi.getWorkCitations(doi);
    },
    enabled: !!doi,
    staleTime: 1000 * 60 * 60, // 1 hour - citations can change more frequently
  });
}
