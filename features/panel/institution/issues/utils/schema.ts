import { z } from "zod";

/**
 * Issue form validation schema
 */
export const issueFormSchema = z.object({
  volume: z.coerce.number().min(1, "Volume must be at least 1"),
  issue_number: z.coerce.number().min(1, "Issue number must be at least 1"),
  title: z.string().optional(),
  description: z.string().optional(),
  cover_image: z.instanceof(File).optional(),
  publication_date: z.string().min(1, "Publication date is required"),
  submission_deadline: z.string().optional(),
  doi: z.string().optional(),
  pages_range: z.string().optional(),
  editorial_note: z.string().optional(),
  guest_editors: z.string().optional(),
  status: z.enum(["draft", "upcoming", "current", "published", "archived"]),
  is_special_issue: z.boolean().default(false),
});

export type IssueFormSchema = z.infer<typeof issueFormSchema>;

/**
 * Add article to issue form schema
 */
export const addArticleToIssueSchema = z.object({
  publication_id: z.coerce.number().min(1, "Please select an article"),
  order: z.coerce.number().min(0).default(0),
  section: z.string().optional(),
});

export type AddArticleToIssueSchema = z.infer<typeof addArticleToIssueSchema>;
