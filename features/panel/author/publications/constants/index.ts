export const PUBLICATIONS_QUERY_KEYS = {
  all: ["publications"] as const,
  lists: () => [...PUBLICATIONS_QUERY_KEYS.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...PUBLICATIONS_QUERY_KEYS.lists(), filters] as const,
  details: () => [...PUBLICATIONS_QUERY_KEYS.all, "detail"] as const,
  detail: (id: number) => [...PUBLICATIONS_QUERY_KEYS.details(), id] as const,
  stats: (id: number) => [...PUBLICATIONS_QUERY_KEYS.all, "stats", id] as const,
  citations: (id: number) =>
    [...PUBLICATIONS_QUERY_KEYS.all, "citations", id] as const,
  references: (id: number) =>
    [...PUBLICATIONS_QUERY_KEYS.all, "references", id] as const,
} as const;

export const PUBLICATIONS_ENDPOINTS = {
  LIST: "/publications/",
  DETAIL: (id: number) => `/publications/${id}/`,
  DELETE: (id: number) => `/publications/${id}/`,
  UPDATE: (id: number) => `/publications/${id}/`,
  STATS: (id: number) => `/publications/${id}/stats/`,
  ADD_CITATION: (id: number) => `/publications/${id}/add-citation/`,
  ADD_REFERENCE: (id: number) => `/publications/${id}/add-reference/`,
  BULK_REFERENCES: (id: number) => `/publications/${id}/bulk-references/`,
  LINK_OUTS: (id: number) => `/publications/${id}/link-outs/`,
} as const;

export const PUBLICATION_TYPE_OPTIONS = [
  { value: "journal_article", label: "Journal Article" },
  { value: "conference_paper", label: "Conference Paper" },
  { value: "book_chapter", label: "Book Chapter" },
  { value: "preprint", label: "Preprint" },
  { value: "thesis", label: "Thesis/Dissertation" },
  { value: "technical_report", label: "Technical Report" },
  { value: "poster", label: "Poster" },
  { value: "presentation", label: "Presentation" },
  { value: "book", label: "Book" },
  { value: "review", label: "Review Article" },
  { value: "other", label: "Other" },
] as const;

export const MESH_TERM_TYPE_OPTIONS = [
  { value: "major", label: "Major" },
  { value: "minor", label: "Minor" },
] as const;

export const LINK_OUT_TYPE_OPTIONS = [
  { value: "pubmed", label: "PubMed" },
  { value: "pmc", label: "PubMed Central" },
  { value: "doi", label: "DOI" },
  { value: "arxiv", label: "arXiv" },
  { value: "google_scholar", label: "Google Scholar" },
  { value: "preprint", label: "Preprint Server" },
  { value: "publisher", label: "Publisher" },
  { value: "other", label: "Other" },
] as const;
