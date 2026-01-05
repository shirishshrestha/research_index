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

export interface JournalDetails {
  journalCover?: string;
  title: string;
  institution: string;
  issn: string;
  doiPrefix: string;
  license: string;
  badge?: {
    label: string;
    value: string | number;
  };
}
