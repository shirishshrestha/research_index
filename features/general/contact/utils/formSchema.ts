import z from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(35, "Full name must be 35 characters or less"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(35, "Email must be 35 characters or less"),
  contactNumber: z
    .string()
    .min(1, "Contact number is required")
    .max(35, "Contact number must be 35 characters or less"),
  institutionName: z
    .string()
    .min(1, "Institution name is required")
    .max(35, "Institution name must be 35 characters or less"),
  enquiryType: z.string().min(1, "Please select an enquiry type"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(35, "Subject must be 35 characters or less"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be 500 characters or less"),
});
