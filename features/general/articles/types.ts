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
