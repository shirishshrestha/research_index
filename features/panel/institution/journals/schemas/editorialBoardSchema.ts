import * as z from "zod";

export const titleOptions = [
  { value: "Mr.", label: "Mr." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Ms.", label: "Ms." },
  { value: "Dr.", label: "Dr." },
  { value: "Prof.", label: "Prof." },
];

export const ROLE_OPTIONS = [
  { value: "editor_in_chief", label: "Editor-in-Chief" },
  { value: "managing_editor", label: "Managing Editor" },
  { value: "associate_editor", label: "Associate Editor" },
  { value: "section_editor", label: "Section Editor" },
  { value: "editorial_board", label: "Editorial Board Member" },
  { value: "reviewer", label: "Reviewer" },
  { value: "advisory_board", label: "Advisory Board Member" },
];

export const editorialBoardMemberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(1, "Please select a role"),
  title: z.string().optional(),
  affiliation: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  bio: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  orcid: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  order: z.number().min(0).default(0),
  is_active: z.boolean().default(true),
});

export type EditorialBoardMemberFormData = z.infer<
  typeof editorialBoardMemberSchema
>;
