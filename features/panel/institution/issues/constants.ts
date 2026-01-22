/**
 * Query keys for React Query cache management
 */
export const ISSUES_QUERY_KEYS = {
  all: (journalId: number) => ["journals", journalId, "issues"],
  lists: (journalId: number) => [...ISSUES_QUERY_KEYS.all(journalId), "list"],
  list: (journalId: number, filters?: Record<string, unknown>) => [
    ...ISSUES_QUERY_KEYS.lists(journalId),
    filters,
  ],
  details: (journalId: number) => [
    ...ISSUES_QUERY_KEYS.all(journalId),
    "detail",
  ],
  detail: (journalId: number, issueId: number | string) => [
    ...ISSUES_QUERY_KEYS.details(journalId),
    String(issueId),
  ],
};

/**
 * API endpoint paths
 */
export const ISSUES_ENDPOINTS = {
  LIST: (journalId: number) => `/publications/journals/${journalId}/issues/`,
  CREATE: (journalId: number) => `/publications/journals/${journalId}/issues/`,
  DETAIL: (journalId: number, issueId: number) =>
    `/publications/journals/${journalId}/issues/${issueId}/`,
  UPDATE: (journalId: number, issueId: number) =>
    `/publications/journals/${journalId}/issues/${issueId}/`,
  DELETE: (journalId: number, issueId: number) =>
    `/publications/journals/${journalId}/issues/${issueId}/`,
  ADD_ARTICLE: (journalId: number, issueId: number) =>
    `/publications/journals/${journalId}/issues/${issueId}/articles/add/`,
};

/**
 * Issue status options for forms
 */
export const ISSUE_STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "upcoming", label: "Upcoming" },
  { value: "current", label: "Current Issue" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
] as const;

/**
 * Issue status badge variants
 */
export const ISSUE_STATUS_VARIANTS = {
  draft: "secondary",
  upcoming: "outline",
  current: "default",
  published: "default",
  archived: "secondary",
} as const;
