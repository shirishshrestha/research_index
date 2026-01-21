import { z } from "zod";
const ISSN_REGEX = /^[0-9]{4}-[0-9]{3}[0-9X]$/;

// Global Zod schema for the entire questionnaire
export const questionnaireSchema = z.object({
  // Section 1: Journal Identity & Formal Data
  journal_title: z.string().min(1, "Journal title is required"),
  issn: z
    .string()
    .min(9, "ISSN must be 9 characters: XXXX-XXXX")
    .max(9, "ISSN must be 9 characters: XXXX-XXXX")
    .regex(ISSN_REGEX, "Invalid ISSN format (e.g., 1234-567X)"),

  e_issn: z
    .string()
    .min(9, "E-ISSN must be 9 characters: XXXX-XXXX")
    .max(9, "E-ISSN must be 9 characters: XXXX-XXXX")
    .regex(ISSN_REGEX, "Invalid E-ISSN format (e.g., 1234-567X)"),
  description: z.string().min(1, "Description is required"),
  publisher_name: z.string().min(1, "Publisher name is required"),
  publisher_country: z.string().min(1, "Publisher country is required"),
  year_first_publication: z.coerce
    .number()
    .min(1800, "Year must be after 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
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
  journal_website_url: z.string().url("Must be a valid URL"),
  contact_email: z.string().email("Must be a valid email"),

  // Section 2: Scientific Scope & Profile
  main_discipline: z.string().min(1, "Main discipline is required"),
  secondary_disciplines: z.string().default(""),
  aims_and_scope: z.string().min(1, "Aims and scope is required"),
  publishes_original_research: z.boolean().default(false),
  publishes_review_articles: z.boolean().default(false),
  publishes_case_studies: z.boolean().default(false),
  publishes_short_communications: z.boolean().default(false),
  publishes_other: z.string().default(""),

  // Section 3: Editorial Board
  editor_in_chief_name: z.string().min(1, "Editor-in-chief name is required"),
  editor_in_chief_affiliation: z
    .string()
    .min(1, "Editor-in-chief affiliation is required"),
  editor_in_chief_country: z
    .string()
    .min(1, "Editor-in-chief country is required"),
  editorial_board_members_count: z.coerce
    .number()
    .min(0, "Must be a positive number"),
  editorial_board_countries: z
    .string()
    .min(1, "Editorial board countries is required (comma-separated)"),
  foreign_board_members_percentage: z.coerce
    .number()
    .min(0, "Must be between 0 and 100")
    .max(100, "Must be between 0 and 100"),
  board_details_published: z.boolean().default(false),

  // Section 4: Peer Review Process
  uses_peer_review: z.boolean().default(false),
  peer_review_type: z
    .enum([
      "single_blind",
      "double_blind",
      "open",
      "post_publication",
      "other",
      "",
    ])
    .default(""),
  reviewers_per_manuscript: z.coerce.number().nullable().optional(),
  average_review_time_weeks: z.coerce.number().nullable().optional(),
  reviewers_external: z.boolean().default(false),
  peer_review_procedure_published: z.boolean().default(false),
  peer_review_procedure_url: z.string().default(""),

  // Section 5: Ethics & Publication Standards
  follows_publication_ethics: z.boolean().default(false),
  ethics_based_on_cope: z.boolean().default(false),
  ethics_based_on_icmje: z.boolean().default(false),
  ethics_other_guidelines: z.string().default(""),
  uses_plagiarism_detection: z.boolean().default(false),
  plagiarism_software_name: z.string().default(""),
  has_retraction_policy: z.boolean().default(false),
  retraction_policy_url: z.string().default(""),
  has_conflict_of_interest_policy: z.boolean().default(false),
  conflict_of_interest_policy_url: z.string().default(""),

  // Section 6: Publishing Regularity & Stability
  issues_published_in_year: z.coerce
    .number()
    .min(0, "Must be a positive number"),
  all_issues_published_on_time: z.boolean().default(false),
  articles_published_in_year: z.coerce
    .number()
    .min(0, "Must be a positive number"),
  submissions_rejected: z.coerce.number().min(0, "Must be a positive number"),
  average_acceptance_rate: z.coerce
    .number()
    .min(0, "Must be between 0 and 100")
    .max(100, "Must be between 0 and 100"),

  // Section 7: Authors & Internationalization
  total_authors_in_year: z.coerce.number().min(0, "Must be a positive number"),
  foreign_authors_count: z.coerce.number().min(0, "Must be a positive number"),
  author_countries_count: z.coerce.number().min(0, "Must be a positive number"),
  foreign_authors_percentage: z.coerce
    .number()
    .min(0, "Must be between 0 and 100")
    .max(100, "Must be between 0 and 100"),
  encourages_international_submissions: z.boolean().default(false),

  // Section 8: Open Access & Fees
  is_open_access: z.boolean().default(false),
  oa_model: z
    .enum(["gold", "hybrid", "diamond", "green", "bronze", "not_oa", ""])
    .default(""),
  has_apc: z.boolean().default(false),
  apc_amount: z.coerce.number().nullable().optional(),
  apc_currency: z.string().min(1, "APC currency is required (e.g., USD, EUR)"),
  license_type: z
    .enum([
      "cc_by",
      "cc_by_sa",
      "cc_by_nc",
      "cc_by_nc_sa",
      "cc_by_nd",
      "cc_by_nc_nd",
      "cc0",
      "other",
      "",
    ])
    .default(""),

  // Section 9: Digital Publishing Standards
  assigns_dois: z.boolean().default(false),
  doi_registration_agency: z.string().default(""),
  metadata_standards_used: z.string().default(""),
  uses_online_submission_system: z.boolean().default(false),
  submission_system_name: z.string().default(""),
  digital_archiving_system: z
    .enum([
      "lockss",
      "clockss",
      "portico",
      "institutional",
      "pmc",
      "other",
      "none",
      "",
    ])
    .default(""),
  other_archiving_system: z.string().default(""),

  // Section 10: Indexing & Visibility
  indexed_databases: z
    .string()
    .min(1, "Indexed databases is required (comma-separated list)"),
  year_first_indexed: z.coerce.number().nullable().optional(),
  indexed_in_google_scholar: z.boolean().default(false),
  indexed_in_doaj: z.boolean().default(false),
  indexed_in_scopus: z.boolean().default(false),
  indexed_in_web_of_science: z.boolean().default(false),
  abstracting_services: z.string().default(""),

  // Section 11: Website Quality & Transparency
  author_guidelines_available: z.boolean().default(false),
  peer_review_rules_available: z.boolean().default(false),
  apcs_clearly_stated: z.boolean().default(false),
  journal_archive_accessible: z.boolean().default(false),

  // Section 12: Declarations & Verification
  data_is_verifiable: z.boolean().default(false),
  data_matches_website: z.boolean().default(false),
  consent_to_evaluation: z.boolean().default(false),
  completed_by_name: z.string().min(1, "Name of person completing is required"),
  completed_by_role: z.string().min(1, "Role of person completing is required"),
});

// Partial schema for forms (all fields optional)
export const questionnaireSchemaPartial = questionnaireSchema.partial();

export type QuestionnaireSchemaType = z.infer<typeof questionnaireSchema>;
export type QuestionnaireSchemaPartialType = z.infer<
  typeof questionnaireSchemaPartial
>;
