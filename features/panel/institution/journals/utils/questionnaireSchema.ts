import { z } from "zod";

/**
 * Zod validation schema for Journal Questionnaire
 * Matches Django backend JournalQuestionnaire model exactly
 */
export const questionnaireSchema = z.object({
  journal: z.number(),

  // Section 1: Journal Identity & Formal Data
  journal_title: z.string().min(1, "Journal title is required").max(300),
  issn: z.string().max(20),
  e_issn: z.string().max(20),
  publisher_name: z.string().min(1, "Publisher name is required").max(200),
  publisher_country: z
    .string()
    .min(1, "Publisher country is required")
    .max(100),
  year_first_publication: z
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear() + 1),
  publication_frequency: z.enum([
    "weekly",
    "biweekly",
    "monthly",
    "bimonthly",
    "quarterly",
    "biannual",
    "annual",
    "irregular",
  ]),
  publication_format: z.enum(["online", "print", "both"]),
  journal_website_url: z.string().url("Must be a valid URL").max(500),
  contact_email: z.string().email("Must be a valid email"),

  // Section 2: Scientific Scope & Profile
  main_discipline: z.string().min(1, "Main discipline is required").max(200),
  secondary_disciplines: z.string(),
  aims_and_scope: z.string().min(1, "Aims and scope is required"),
  publishes_original_research: z.boolean(),
  publishes_review_articles: z.boolean(),
  publishes_case_studies: z.boolean(),
  publishes_short_communications: z.boolean(),
  publishes_other: z.string().max(500),

  // Section 3: Editorial Board
  editor_in_chief_name: z
    .string()
    .min(1, "Editor-in-Chief name is required")
    .max(200),
  editor_in_chief_affiliation: z
    .string()
    .min(1, "Editor-in-Chief affiliation is required")
    .max(300),
  editor_in_chief_country: z
    .string()
    .min(1, "Editor-in-Chief country is required")
    .max(100),
  editorial_board_members_count: z.number().int().min(0),
  editorial_board_countries: z
    .string()
    .min(1, "Editorial board countries are required"),
  foreign_board_members_percentage: z.number().min(0).max(100),
  board_details_published: z.boolean(),

  // Section 4: Peer Review Process
  uses_peer_review: z.boolean(),
  peer_review_type: z.enum([
    "single_blind",
    "double_blind",
    "open",
    "post_publication",
    "other",
    "",
  ]),
  reviewers_per_manuscript: z.number().int().min(0).nullable().optional(),
  average_review_time_weeks: z.number().int().min(0).nullable().optional(),
  reviewers_external: z.boolean(),
  peer_review_procedure_published: z.boolean(),
  peer_review_procedure_url: z.string().max(500),

  // Section 5: Ethics & Publication Standards
  follows_publication_ethics: z.boolean(),
  ethics_based_on_cope: z.boolean(),
  ethics_based_on_icmje: z.boolean(),
  ethics_other_guidelines: z.string().max(500),
  uses_plagiarism_detection: z.boolean(),
  plagiarism_software_name: z.string().max(200),
  has_retraction_policy: z.boolean(),
  retraction_policy_url: z.string().max(500),
  has_conflict_of_interest_policy: z.boolean(),
  conflict_of_interest_policy_url: z.string().max(500),

  // Section 6: Publishing Regularity & Stability
  issues_published_in_year: z.number().int().min(0),
  all_issues_published_on_time: z.boolean(),
  articles_published_in_year: z.number().int().min(0),
  submissions_rejected: z.number().int().min(0),
  average_acceptance_rate: z.number().min(0).max(100),

  // Section 7: Authors & Internationalization
  total_authors_in_year: z.number().int().min(0),
  foreign_authors_count: z.number().int().min(0),
  author_countries_count: z.number().int().min(0),
  foreign_authors_percentage: z.number().min(0).max(100),
  encourages_international_submissions: z.boolean(),

  // Section 8: Open Access & Fees
  is_open_access: z.boolean(),
  oa_model: z.enum([
    "gold",
    "hybrid",
    "diamond",
    "green",
    "bronze",
    "not_oa",
    "",
  ]),
  has_apc: z.boolean(),
  apc_amount: z.number().min(0).nullable().optional(),
  apc_currency: z.string().max(10).default("USD"),
  license_type: z.enum([
    "cc_by",
    "cc_by_sa",
    "cc_by_nc",
    "cc_by_nc_sa",
    "cc_by_nd",
    "cc_by_nc_nd",
    "cc0",
    "other",
    "",
  ]),

  // Section 9: Digital Publishing Standards
  assigns_dois: z.boolean(),
  doi_registration_agency: z.string().max(200),
  metadata_standards_used: z.string(),
  uses_online_submission_system: z.boolean(),
  submission_system_name: z.string().max(200),
  digital_archiving_system: z.enum([
    "lockss",
    "clockss",
    "portico",
    "institutional",
    "pmc",
    "other",
    "none",
    "",
  ]),
  other_archiving_system: z.string().max(200),

  // Section 10: Indexing & Visibility
  indexed_databases: z.string().min(1, "Indexed databases are required"),
  year_first_indexed: z
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear() + 1)
    .nullable()
    .optional(),
  indexed_in_google_scholar: z.boolean(),
  indexed_in_doaj: z.boolean(),
  indexed_in_scopus: z.boolean(),
  indexed_in_web_of_science: z.boolean(),
  abstracting_services: z.string(),

  // Section 11: Website Quality & Transparency
  author_guidelines_available: z.boolean(),
  peer_review_rules_available: z.boolean(),
  apcs_clearly_stated: z.boolean(),
  journal_archive_accessible: z.boolean(),

  // Section 12: Declarations & Verification
  data_is_verifiable: z.boolean(),
  data_matches_website: z.boolean(),
  consent_to_evaluation: z.boolean(),
  completed_by_name: z.string().min(1, "Name is required").max(200),
  completed_by_role: z.string().min(1, "Role is required").max(200),
  is_complete: z.boolean().optional(),
});

export type QuestionnaireSchemaType = z.infer<typeof questionnaireSchema>;

// Default values for a new questionnaire
export const getDefaultQuestionnaireValues = (
  journalId: number,
  journalTitle: string,
): Partial<QuestionnaireSchemaType> => ({
  journal: journalId,
  journal_title: journalTitle,
  issn: "",
  e_issn: "",
  publisher_name: "",
  publisher_country: "",
  year_first_publication: new Date().getFullYear(),
  publication_frequency: "quarterly",
  publication_format: "online",
  journal_website_url: "",
  contact_email: "",
  main_discipline: "",
  secondary_disciplines: "",
  aims_and_scope: "",
  publishes_original_research: true,
  publishes_review_articles: false,
  publishes_case_studies: false,
  publishes_short_communications: false,
  publishes_other: "",
  editor_in_chief_name: "",
  editor_in_chief_affiliation: "",
  editor_in_chief_country: "",
  editorial_board_members_count: 0,
  editorial_board_countries: "",
  foreign_board_members_percentage: 0,
  board_details_published: false,
  uses_peer_review: true,
  peer_review_type: "",
  reviewers_per_manuscript: null,
  average_review_time_weeks: null,
  reviewers_external: true,
  peer_review_procedure_published: false,
  peer_review_procedure_url: "",
  follows_publication_ethics: true,
  ethics_based_on_cope: false,
  ethics_based_on_icmje: false,
  ethics_other_guidelines: "",
  uses_plagiarism_detection: false,
  plagiarism_software_name: "",
  has_retraction_policy: false,
  retraction_policy_url: "",
  has_conflict_of_interest_policy: false,
  conflict_of_interest_policy_url: "",
  issues_published_in_year: 0,
  all_issues_published_on_time: false,
  articles_published_in_year: 0,
  submissions_rejected: 0,
  average_acceptance_rate: 0,
  total_authors_in_year: 0,
  foreign_authors_count: 0,
  author_countries_count: 0,
  foreign_authors_percentage: 0,
  encourages_international_submissions: false,
  is_open_access: false,
  oa_model: "",
  has_apc: false,
  apc_amount: null,
  apc_currency: "USD",
  license_type: "",
  assigns_dois: false,
  doi_registration_agency: "",
  metadata_standards_used: "",
  uses_online_submission_system: false,
  submission_system_name: "",
  digital_archiving_system: "",
  other_archiving_system: "",
  indexed_databases: "",
  year_first_indexed: null,
  indexed_in_google_scholar: false,
  indexed_in_doaj: false,
  indexed_in_scopus: false,
  indexed_in_web_of_science: false,
  abstracting_services: "",
  author_guidelines_available: false,
  peer_review_rules_available: false,
  apcs_clearly_stated: false,
  journal_archive_accessible: false,
  data_is_verifiable: true,
  data_matches_website: true,
  consent_to_evaluation: true,
  completed_by_name: "",
  completed_by_role: "",
  is_complete: false,
});
