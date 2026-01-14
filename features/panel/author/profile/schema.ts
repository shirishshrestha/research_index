import { z } from "zod";

export const authorProfileSchema = z.object({
  title: z.enum(["Dr.", "Prof.", "Mr.", "Mrs.", "Ms.", ""]).optional(),
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  institute: z.string().min(2, "Institute must be at least 2 characters"),
  designation: z.string().min(2, "Designation must be at least 2 characters"),
  degree: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other", ""]).optional(),
  bio: z.string().max(1000, "Bio must be less than 1000 characters").optional(),
  research_interests: z
    .string()
    .max(500, "Research interests must be less than 500 characters")
    .optional(),
  orcid: z
    .string()
    .regex(/^(\d{4}-\d{4}-\d{4}-\d{3}[0-9X])?$/, "Invalid ORCID format")
    .optional()
    .or(z.literal("")),
  google_scholar: z.string().url("Invalid URL").optional().or(z.literal("")),
  researchgate: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  profile_picture: z.instanceof(File).optional(),
  cv: z.instanceof(File).optional(),
});

export type AuthorProfileFormData = z.infer<typeof authorProfileSchema>;
