/**
 * Query keys for React Query cache management
 */
export const JOURNALS_QUERY_KEYS = {
  all: ["journals"] as const,
  lists: () => [...JOURNALS_QUERY_KEYS.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...JOURNALS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...JOURNALS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: number | string) =>
    [...JOURNALS_QUERY_KEYS.details(), String(id)] as const,
  stats: (id: number | string) =>
    [...JOURNALS_QUERY_KEYS.all, "stats", String(id)] as const,
};

/**
 * API endpoint paths
 */
export const JOURNALS_ENDPOINTS = {
  BASE: "/publications/journals/",
  LIST: "/publications/journals/",
  DETAIL: (id: number) => `/publications/journals/${id}/`,
  UPDATE: (id: number) => `/publications/journals/${id}/`,
  DELETE: (id: number) => `/publications/journals/${id}/`,
  STATS: (id: number) => `/publications/journals/${id}/stats/`,
  UPDATE_STATS: (id: number) => `/publications/journals/${id}/stats/`,
};
