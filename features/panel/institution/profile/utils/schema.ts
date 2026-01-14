import { z } from "zod";

export const institutionProfileSchema = z.object({
  institution_name: z
    .string()
    .min(2, "Institution name must be at least 2 characters"),
  institution_type: z
    .enum(["University", "Research Institute", "Company", "Other", ""])
    .optional(),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postal_code: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  established_year: z.string().optional(),
  research_areas: z.string().optional(),
  total_researchers: z.string().optional(),
  logo: z.instanceof(File).optional(),
});

export type InstitutionProfileFormData = z.infer<
  typeof institutionProfileSchema
>;
