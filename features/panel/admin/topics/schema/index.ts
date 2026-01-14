import { z } from "zod";

export const topicSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  slug: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[a-zA-Z0-9-_]+$/.test(val),
      "Slug can only contain letters, numbers, hyphens, and underscores"
    ),
  description: z.string().optional(),
  icon: z.string().optional(),
  is_active: z.boolean(),
  order: z.number().int().min(0),
});

export const branchSchema = z.object({
  topic: z.number().int().positive("Topic is required"),
  parent: z.number().int().positive().optional().nullable(),
  name: z.string().min(1, "Name is required").max(255, "Name is too long"),
  slug: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[a-zA-Z0-9-_]+$/.test(val),
      "Slug can only contain letters, numbers, hyphens, and underscores"
    ),
  description: z.string().optional(),
  is_active: z.boolean(),
  order: z.number().int().min(0),
});

export type TopicFormData = z.infer<typeof topicSchema>;
export type BranchFormData = z.infer<typeof branchSchema>;
