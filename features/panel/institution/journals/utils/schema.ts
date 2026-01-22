import { z } from "zod";

// File validation helper
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ISSN_REGEX = /^[0-9]{4}-[0-9]{3}[0-9X]$/;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const journalFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(300),
  short_title: z.string().max(100),

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
  scope: z.string(),
  cover_image: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= MAX_FILE_SIZE;
      },
      { message: "File size must be less than 5MB" },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return ACCEPTED_IMAGE_TYPES.includes(file.type);
      },
      { message: "Only .jpg, .jpeg, .png and .webp formats are supported" },
    ),
  publisher_name: z.string().max(200),
  frequency: z.enum([
    "monthly",
    "bimonthly",
    "quarterly",
    "biannual",
    "annual",
  ]),
  established_year: z.preprocess((val) => {
    if (typeof val === "string") {
      const trimmed = val.trim();
      return trimmed === "" ? null : Number(trimmed);
    }
    if (typeof val === "number") return val;
    return null; // default for undefined or other types
  }, z.number().min(1900, "Year must be greater than 1900").max(new Date().getFullYear(), `Year cannot be in the future`).nullable()),
  language: z.string().min(1),
  about_journal: z.string(),
  ethics_policies: z.string(),
  writing_formatting: z.string(),
  submitting_manuscript: z.string(),
  help_support: z.string(),
  contact_email: z.string(),
  contact_phone: z.string().max(20),
  contact_address: z.string(),
  website: z.string(),
  doi_prefix: z.string().max(50),
  is_active: z.boolean(),
  is_open_access: z.boolean(),
  peer_reviewed: z.boolean(),
});

export type JournalFormSchema = z.infer<typeof journalFormSchema>;
