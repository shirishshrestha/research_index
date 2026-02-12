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

export interface EditorialBoardMember {
  id: number;
  name: string;
  role: string;
  role_display?: string;
  title?: string;
  affiliation?: string;
  email?: string;
  bio?: string;
  expertise?: string;
  photo_url?: string;
  orcid?: string;
  website?: string;
  order?: number;
  is_active?: boolean;
}

export interface JournalStats {
  impact_factor: string;
  cite_score: string;
  h_index: number;
  acceptance_rate: string;
  average_review_time: number;
  total_articles: number;
  total_issues: number;
  total_publications?: number;
  total_citations: number;
  total_reads: number;
  recommendations: number;
  social_media_score: string;
  last_updated: string;
}

export interface JournalDetail {
  id: number;
  institution_id: number;
  institution_name: string;
  title: string;
  short_title: string;
  issn: string;
  e_issn: string;
  description: string;
  scope: string;
  cover_image: string;
  cover_image_url: string | null;
  publisher_name: string;
  frequency: string;
  frequency_display: string;
  established_year: number | null;
  language: string;
  about_journal: string;
  ethics_policies: string;
  writing_formatting: string;
  submitting_manuscript: string;
  help_support: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  website: string;
  doi_prefix: string;
  is_active: boolean;
  is_open_access: boolean;
  peer_reviewed: boolean;
  created_at: string;
  updated_at: string;
  editorial_board: EditorialBoardMember[];
  stats: JournalStats | null;
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
