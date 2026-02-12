// Journal types based on backend API

export interface JournalStats {
  impact_factor: number;
  cite_score: number;
  h_index: number;
  acceptance_rate: number;
  average_review_time: number;
  total_articles: number;
  total_issues: number;
  total_citations: number;
  total_reads: number;
  recommendations: number;
  social_media_score: number;
  last_updated: string;
}

export interface EditorialBoardMember {
  id: number;
  name: string;
  role: string;
  role_display: string;
  title: string;
  affiliation: string;
  email: string;
  bio: string;
  expertise: string;
  photo?: string;
  photo_url?: string;
  orcid: string;
  website: string;
  order: number;
  is_active: boolean;
}

export interface JournalListItem {
  id: number;
  title: string;
  short_title: string;
  issn: string;
  e_issn: string;
  description: string;
  institution_name: string;
  publisher_name: string;
  frequency: string;
  frequency_display: string;
  established_year: number;
  is_open_access: boolean;
  peer_reviewed: boolean;
  is_active: boolean;
  cover_image_url?: string;
  stats?: JournalStats;
  editorial_board_count: number;
  issues_count: number;
  created_at: string;
  updated_at: string;
}

export interface Journal {
  id: number;
  institution_id: number;
  institution_name: string;
  title: string;
  short_title: string;
  issn: string;
  e_issn: string;
  description: string;
  scope: string;
  cover_image?: string;
  cover_image_url?: string;
  publisher_name: string;
  frequency: "monthly" | "bimonthly" | "quarterly" | "biannual" | "annual";
  frequency_display: string;
  established_year: number;
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
  stats?: JournalStats;
}

export interface JournalFormData {
  title: string;
  short_title: string;
  issn: string;
  e_issn: string;
  description: string;
  scope: string;
  cover_image?: File;
  publisher_name: string;
  frequency: "monthly" | "bimonthly" | "quarterly" | "biannual" | "annual";
  established_year: number;
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
  editorial_board_data?: EditorialBoardMemberFormData[];
}

export interface EditorialBoardMemberFormData {
  name: string;
  role: string;
  title?: string;
  affiliation?: string;
  email?: string;
  bio?: string;
  expertise?: string;
  photo?: File;
  orcid?: string;
  website?: string;
  order?: number;
  is_active?: boolean;
}

export interface JournalCreateResponse {
  message: string;
  journal: Journal;
}

export interface JournalUpdateResponse {
  message: string;
  journal: Journal;
}

export interface JournalDeleteResponse {
  message: string;
}
