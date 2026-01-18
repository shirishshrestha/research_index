"use client";

import { useGet } from "@/hooks/useApi";
import type { Publication } from "../types";
import { PUBLICATIONS_QUERY_KEYS, PUBLICATIONS_ENDPOINTS } from "../constants";

/**
 * Query hook to fetch all publications for the authenticated author
 */
export const usePublicationsQuery = () => {
  return useGet<Publication[]>(
    [...PUBLICATIONS_QUERY_KEYS.lists()],
    PUBLICATIONS_ENDPOINTS.LIST
  );
};

/**
 * Query hook to fetch a single publication by ID
 */
export const usePublicationQuery = (id: number | string | undefined) => {
  return useGet<Publication>(
    id ? ["publications", "detail", String(id)] : [],
    id ? PUBLICATIONS_ENDPOINTS.DETAIL(Number(id)) : "",
    {
      enabled: !!id,
    }
  );
};

/**
 * Query hook to fetch publication statistics
 */
export const usePublicationStatsQuery = (id: number | string | undefined) => {
  return useGet(
    id ? ["publications", "stats", String(id)] : [],
    id ? PUBLICATIONS_ENDPOINTS.STATS(Number(id)) : "",
    {
      enabled: !!id,
    }
  );
};

/**
 * Query hook to fetch publication citations
 */
export const usePublicationCitationsQuery = (
  id: number | string | undefined
) => {
  return useGet(
    id ? ["publications", "citations", String(id)] : [],
    id ? PUBLICATIONS_ENDPOINTS.ADD_CITATION(Number(id)) : "",
    {
      enabled: !!id,
    }
  );
};

/**
 * Query hook to fetch publication references
 */
export const usePublicationReferencesQuery = (
  id: number | string | undefined
) => {
  return useGet(
    id ? ["publications", "references", String(id)] : [],
    id ? PUBLICATIONS_ENDPOINTS.ADD_REFERENCE(Number(id)) : "",
    {
      enabled: !!id,
    }
  );
};
