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
