// Journal Questionnaire types matching Django backend model exactly

export interface JournalQuestionnaire {
  id: number;
  journal: number;
  completeness_percentage?: number;

  // Section 1: Journal Identity & Formal Data
  journal_title: string;
  issn: string;
  e_issn: string;
  publisher_name: string;
  publisher_country: string;
  year_first_publication: number;
  publication_frequency:
    | "weekly"
    | "biweekly"
    | "monthly"
    | "bimonthly"
    | "quarterly"
    | "biannual"
    | "annual"
    | "irregular";
  publication_frequency_display?: string;
  publication_format: "online" | "print" | "both";
  publication_format_display?: string;
  journal_website_url: string;
  contact_email: string;

  // Section 2: Scientific Scope & Profile
  main_discipline: string;
  secondary_disciplines: string;
  aims_and_scope: string;
  publishes_original_research: boolean;
  publishes_review_articles: boolean;
  publishes_case_studies: boolean;
  publishes_short_communications: boolean;
  publishes_other: string;

  // Section 3: Editorial Board
  editor_in_chief_name: string;
  editor_in_chief_affiliation: string;
  editor_in_chief_country: string;
  editorial_board_members_count: number;
  editorial_board_countries: string;
  foreign_board_members_percentage: number;
  board_details_published: boolean;

  // Section 4: Peer Review Process
  uses_peer_review: boolean;
  peer_review_type:
    | "single_blind"
    | "double_blind"
    | "open"
    | "post_publication"
    | "other"
    | "";
  peer_review_type_display?: string;
  reviewers_per_manuscript?: number | null;
  average_review_time_weeks?: number | null;
  reviewers_external: boolean;
  peer_review_procedure_published: boolean;
  peer_review_procedure_url: string;

  // Section 5: Ethics & Publication Standards
  follows_publication_ethics: boolean;
  ethics_based_on_cope: boolean;
  ethics_based_on_icmje: boolean;
  ethics_other_guidelines: string;
  uses_plagiarism_detection: boolean;
  plagiarism_software_name: string;
  has_retraction_policy: boolean;
  retraction_policy_url: string;
  has_conflict_of_interest_policy: boolean;
  conflict_of_interest_policy_url: string;

  // Section 6: Publishing Regularity & Stability
  issues_published_in_year: number;
  all_issues_published_on_time: boolean;
  articles_published_in_year: number;
  submissions_rejected: number;
  average_acceptance_rate: number;

  // Section 7: Authors & Internationalization
  total_authors_in_year: number;
  foreign_authors_count: number;
  author_countries_count: number;
  foreign_authors_percentage: number;
  encourages_international_submissions: boolean;

  // Section 8: Open Access & Fees
  is_open_access: boolean;
  oa_model: "gold" | "hybrid" | "diamond" | "green" | "bronze" | "not_oa" | "";
  oa_model_display?: string;
  has_apc: boolean;
  apc_amount?: number | null;
  apc_currency: string;
  license_type:
    | "cc_by"
    | "cc_by_sa"
    | "cc_by_nc"
    | "cc_by_nc_sa"
    | "cc_by_nd"
    | "cc_by_nc_nd"
    | "cc0"
    | "other"
    | "";
  license_type_display?: string;

  // Section 9: Digital Publishing Standards
  assigns_dois: boolean;
  doi_registration_agency: string;
  metadata_standards_used: string;
  uses_online_submission_system: boolean;
  submission_system_name: string;
  digital_archiving_system:
    | "lockss"
    | "clockss"
    | "portico"
    | "institutional"
    | "pmc"
    | "other"
    | "none"
    | "";
  digital_archiving_system_display?: string;
  other_archiving_system: string;

  // Section 10: Indexing & Visibility
  indexed_databases: string;
  year_first_indexed?: number | null;
  indexed_in_google_scholar: boolean;
  indexed_in_doaj: boolean;
  indexed_in_scopus: boolean;
  indexed_in_web_of_science: boolean;
  abstracting_services: string;

  // Section 11: Website Quality & Transparency
  author_guidelines_available: boolean;
  peer_review_rules_available: boolean;
  apcs_clearly_stated: boolean;
  journal_archive_accessible: boolean;

  // Section 12: Declarations & Verification
  data_is_verifiable: boolean;
  data_matches_website: boolean;
  consent_to_evaluation: boolean;
  completed_by_name: string;
  completed_by_role: string;

  // Metadata
  is_complete: boolean;
  submission_date?: string;
  last_updated?: string;
}

export interface QuestionnaireFormData {
  journal: number;
  journal_title: string;
  issn: string;
  e_issn: string;
  publisher_name: string;
  publisher_country: string;
  year_first_publication: number;
  publication_frequency: string;
  publication_format: string;
  journal_website_url: string;
  contact_email: string;
  main_discipline: string;
  secondary_disciplines: string;
  aims_and_scope: string;
  publishes_original_research: boolean;
  publishes_review_articles: boolean;
  publishes_case_studies: boolean;
  publishes_short_communications: boolean;
  publishes_other: string;
  editor_in_chief_name: string;
  editor_in_chief_affiliation: string;
  editor_in_chief_country: string;
  editorial_board_members_count: number;
  editorial_board_countries: string;
  foreign_board_members_percentage: number;
  board_details_published: boolean;
  uses_peer_review: boolean;
  peer_review_type: string;
  reviewers_per_manuscript?: number | null;
  average_review_time_weeks?: number | null;
  reviewers_external: boolean;
  peer_review_procedure_published: boolean;
  peer_review_procedure_url: string;
  follows_publication_ethics: boolean;
  ethics_based_on_cope: boolean;
  ethics_based_on_icmje: boolean;
  ethics_other_guidelines: string;
  uses_plagiarism_detection: boolean;
  plagiarism_software_name: string;
  has_retraction_policy: boolean;
  retraction_policy_url: string;
  has_conflict_of_interest_policy: boolean;
  conflict_of_interest_policy_url: string;
  issues_published_in_year: number;
  all_issues_published_on_time: boolean;
  articles_published_in_year: number;
  submissions_rejected: number;
  average_acceptance_rate: number;
  total_authors_in_year: number;
  foreign_authors_count: number;
  author_countries_count: number;
  foreign_authors_percentage: number;
  encourages_international_submissions: boolean;
  is_open_access: boolean;
  oa_model: string;
  has_apc: boolean;
  apc_amount?: number | null;
  apc_currency: string;
  license_type: string;
  assigns_dois: boolean;
  doi_registration_agency: string;
  metadata_standards_used: string;
  uses_online_submission_system: boolean;
  submission_system_name: string;
  digital_archiving_system: string;
  other_archiving_system: string;
  indexed_databases: string;
  year_first_indexed?: number | null;
  indexed_in_google_scholar: boolean;
  indexed_in_doaj: boolean;
  indexed_in_scopus: boolean;
  indexed_in_web_of_science: boolean;
  abstracting_services: string;
  author_guidelines_available: boolean;
  peer_review_rules_available: boolean;
  apcs_clearly_stated: boolean;
  journal_archive_accessible: boolean;
  data_is_verifiable: boolean;
  data_matches_website: boolean;
  consent_to_evaluation: boolean;
  completed_by_name: string;
  completed_by_role: string;
  is_complete?: boolean;
}

export interface QuestionnaireListItem {
  id: number;
  journal: number;
  journal_title: string;
  is_complete: boolean;
  completeness_percentage: number;
  submission_date?: string;
  last_updated: string;
}

export interface QuestionnaireCreateResponse {
  message: string;
  questionnaire: JournalQuestionnaire;
}

export interface QuestionnaireUpdateResponse {
  message: string;
  questionnaire: JournalQuestionnaire;
}
