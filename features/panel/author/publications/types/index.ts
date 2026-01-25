// Publication types based on backend API structure

export interface TopicBranch {
  id: number;
  topic_id: number;
  topic_name: string;
  parent_id: number | null;
  parent_name: string | null;
  name: string;
  slug: string;
  description: string;
  level: number;
  full_path: string;
  is_active: boolean;
  order: number;
  children_count: string;
  publications_count: string;
  children: string;
  created_at: string;
  updated_at: string;
}

export interface Journal {
  id: number;
  title: string;
  short_title: string;
  issn: string;
  e_issn: string;
  description: string;
}

export interface Issue {
  id: number;
  journal_id: number;
  volume: number;
  issue_number: number;
  title: string;
  publication_date: string;
  status: string;
  status_display: string;
}

export interface MeSHTerm {
  id: number;
  term: string;
  term_type: "major" | "minor";
}

export interface Citation {
  id: number;
  citing_title: string;
  citing_authors: string;
  citing_doi: string;
  citing_year: number;
  citing_journal: string;
  added_at: string;
}

export interface Reference {
  id: number;
  reference_text: string;
  reference_title: string;
  reference_authors: string;
  reference_doi: string;
  reference_year: number;
  reference_journal: string;
  order: number;
}

export interface LinkOut {
  id: number;
  link_type:
    | "pubmed"
    | "pmc"
    | "doi"
    | "arxiv"
    | "google_scholar"
    | "preprint"
    | "publisher"
    | "other";
  link_type_display: string;
  url: string;
  description: string;
}

export interface PublicationStats {
  citations_count: number;
  reads_count: number;
  downloads_count: number;
  recommendations_count: number;
  altmetric_score: string;
  field_citation_ratio: string;
  last_updated: string;
}

export type PublicationType =
  | "journal_article"
  | "conference_paper"
  | "book_chapter"
  | "preprint"
  | "thesis"
  | "technical_report"
  | "poster"
  | "presentation"
  | "book"
  | "review"
  | "other";

export interface Publication {
  id: number;
  title: string;
  abstract: string;
  publication_type: PublicationType;
  publication_type_display: string;
  pdf_file: string;
  pdf_url: string;
  doi: string;
  published_date: string;
  journal: number;
  journal_id: number;
  journal_name: string;
  journal_issn: string;
  volume: string;
  issue: number; // Changed from issue string to issue ID
  pages: string;
  publisher: string;
  co_authors: string;
  erratum_from: number | null;
  erratum_from_title: string;
  pubmed_id: string;
  arxiv_id: string;
  pubmed_central_id: string;
  topic_branch: TopicBranch | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  author_id: number;
  author_name: string;
  author_email: string;
  author_orcid: string;
  mesh_terms: MeSHTerm[];
  citations: Citation[];
  references: Reference[];
  link_outs: LinkOut[];
  stats: PublicationStats;
}

export interface PublicationFormData {
  title: string;
  abstract?: string;
  publication_type: PublicationType;
  pdf_file?: File | string;
  doi?: string;
  published_date?: string;
  journal: number;
  volume?: string;
  pages?: string;
  publisher?: string;
  co_authors?: string;
  erratum_from?: number;
  pubmed_id?: string;
  arxiv_id?: string;
  pubmed_central_id?: string;
  is_published?: boolean;
  topic_branch?: number;
  mesh_terms_data?: Array<{ term: string; term_type: "major" | "minor" }>;
  link_outs_data?: Array<{
    link_type: string;
    url: string;
    description?: string;
  }>;
}

export interface PaginatedResponse<T> {
  results: T[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}
