import { z } from "zod";

// Publication form schema
export const publicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  abstract: z.string().optional(),
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
  pdf_file: z.any().optional(),
  doi: z.string().optional(),
  published_date: z.string().optional(),
  journal_name: z.string().optional(),
  volume: z.string().optional(),
  issue: z.string().optional(),
  pages: z.string().optional(),
  publisher: z.string().optional(),
  co_authors: z.string().optional(),
  erratum_from: z.number().optional(),
  pubmed_id: z.string().optional(),
  arxiv_id: z.string().optional(),
  pubmed_central_id: z.string().optional(),
  is_published: z.boolean().default(true),
  topic_branch: z.number().optional(),
  mesh_terms_data: z
    .array(
      z.object({
        term: z.string().min(1, "MeSH term is required"),
        term_type: z.enum(["major", "minor"]),
      })
    )
    .optional(),
  link_outs_data: z
    .array(
      z.object({
        link_type: z.string().min(1, "Link type is required"),
        url: z.string().url("Invalid URL").min(1, "URL is required"),
        description: z.string().optional(),
      })
    )
    .optional(),
});

export type PublicationFormSchema = z.infer<typeof publicationSchema>;
