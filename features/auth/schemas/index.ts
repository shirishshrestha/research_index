import * as z from "zod";

/**
 * Login form schema
 */
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Author signup form schema
 */
export const authorSignupSchema = z
  .object({
    title: z.string().min(1, { message: "Please select a title" }),
    fullName: z.string().min(2, { message: "Full name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    institute: z.string().min(2, { message: "Institute is required" }),
    designation: z.string().min(2, { message: "Designation is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type AuthorSignupFormData = z.infer<typeof authorSignupSchema>;

/**
 * Institution signup form schema
 */
export const institutionSignupSchema = z
  .object({
    institutionName: z
      .string()
      .min(2, { message: "Institution name is required" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type InstitutionSignupFormData = z.infer<typeof institutionSignupSchema>;

/**
 * Title options for author signup
 */
export const titleOptions = [
  { value: "Mr.", label: "Mr." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Ms.", label: "Ms." },
  { value: "Dr.", label: "Dr." },
  { value: "Prof.", label: "Prof." },
];
