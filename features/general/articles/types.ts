// Re-export publication types from panel/author
export type {
  Publication,
  PublicationType,
  MeSHTerm,
  Citation,
  Reference,
  LinkOut,
  PublicationStats,
  TopicBranch,
} from "@/features/panel/author/publications/types";

// Frontend-specific display types
export interface ArticleMetric {
  value: string | number;
  label: string;
}

export interface ArticleCardProps {
  title: string;
  authors: string;
  publishedAt: string;
  doi: string;
  badge?: {
    label: string;
    value: string | number;
  };
  href?: string;
}

export interface ArticleDetailsProps {
  article: {
    title: string;
    authors: string[];
    doi: string;
    publishedAt: string;
    citationCount: number;
    abstract: string;
    publicationType: string;
    meshTerms: string[];
    relatedInfo: string[];
    linkOut: { label: string; value: string }[];
    erratumFor?: {
      title: string;
      authors: string;
      publishedAt: string;
      doi: string;
      pubmedId: string;
      license?: string;
    };
  };
}

export interface ArticleSidebarProps {
  publicationType: string;
  meshTerms: string[];
  relatedInfo: string[];
  linkOut: string[];
  erratumFor?: {
    title: string;
    authors: string;
    publishedAt: string;
    doi: string;
    pubmedId: string;
  };
}

// Filter options for public publications search
export interface PublicationFilters {
  type?: string;
  topic_branch?: number;
  topic?: number;
  author?: number;
  journal?: number;
  year?: number;
  year_from?: number;
  year_to?: number;
  publisher?: string;
  min_citations?: number;
  h_index_min?: number;
  h_index_max?: number;
  has_doi?: boolean;
  has_pdf?: boolean;
  search?: string;
  page?: number;
}
