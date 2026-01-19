import { z } from "zod";

export const publicationSchema = z.object({
  // Required
  title: z.string().min(1, "Title is required"),

  // Optional strings - use optional() for proper typing
  abstract: z.string().optional().default(""),
  doi: z.string().optional().default(""),
  published_date: z.string().optional().default(""),
  journal_name: z.string().optional().default(""),
  volume: z.string().optional().default(""),
  issue: z.string().optional().default(""),
  pages: z.string().optional().default(""),
  publisher: z.string().optional().default(""),
  co_authors: z.string().optional().default(""),
  pubmed_id: z.string().optional().default(""),
  arxiv_id: z.string().optional().default(""),
  pubmed_central_id: z.string().optional().default(""),

  // Enum (always defined)
  publication_type: z.enum([
    "journal_article",
    "conference_paper",
    "book_chapter",
    "preprint",
    "thesis",
    "technical_report",
    "poster",
    "presentation",
    "book",
    "review",
    "other",
  ]),

  // Files (can be null in forms)
  pdf_file: z.any().nullable().optional(),

  // Booleans must NEVER be optional in RHF
  is_published: z.boolean().default(true),

  // Numbers that may not exist
  topic_branch: z.number().nullable().optional(),
  erratum_from: z.number().nullable().optional(),

  // Field arrays - optional with default
  mesh_terms_data: z
    .array(
      z.object({
        term: z.string().min(1, "MeSH term is required"),
        term_type: z.enum(["major", "minor"]),
      }),
    )
    .optional()
    .default([]),

  link_outs_data: z
    .array(
      z.object({
        link_type: z.string().min(1, "Link type is required"),
        url: z.string().url("Invalid URL"),
        description: z.string().optional().default(""),
      }),
    )
    .optional()
    .default([]),
});

export type PublicationFormSchema = z.infer<typeof publicationSchema>;
