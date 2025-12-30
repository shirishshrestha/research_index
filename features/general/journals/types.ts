export interface JournalMetric {
  value: string | number;
  label: string;
}

export interface JournalCardProps {
  title: string;
  institution: string;
  imageUrl?: string;
  badge?: {
    label: string;
    value: string | number;
  };
  metrics: JournalMetric[];
  href?: string;
}
