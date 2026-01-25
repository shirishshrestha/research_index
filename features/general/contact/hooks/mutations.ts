"use client";

import { usePost } from "@/hooks/useApi";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorHandling";

export interface ContactFormData {
  fullName: string;
  email: string;
  contactNumber: string;
  institutionName: string;
  enquiryType: string;
  subject: string;
  message: string;
}

export interface ContactPayload {
  full_name: string;
  email: string;
  contact_number: string;
  institution_name: string;
  enquiry_type: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  full_name: string;
  email: string;
  contact_number: string;
  institution_name: string;
  enquiry_type: string;
  subject: string;
  message: string;
  created_at: string;
}

/**
 * Transform camelCase form data to snake_case for API
 */
const transformToPayload = (data: ContactFormData): ContactPayload => ({
  full_name: data.fullName,
  email: data.email,
  contact_number: data.contactNumber,
  institution_name: data.institutionName,
  enquiry_type: data.enquiryType,
  subject: data.subject,
  message: data.message,
});

/**
 * Mutation hook to submit contact form
 * Endpoint: POST /api/contact/
 */
export const useSubmitContactMutation = (options?: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  const postMutation = usePost<ContactResponse, ContactPayload>("/contact/", {
    onSuccess: () => {
      toast.success("Thank you for contacting us! We'll get back to you soon.");
      options?.onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(
          error,
          "Failed to submit contact form. Please try again.",
        ),
      );
      options?.onError?.(error);
    },
  });

  return {
    ...postMutation,
    mutate: (data: ContactFormData) => {
      const payload = transformToPayload(data);
      postMutation.mutate(payload);
    },
    mutateAsync: async (data: ContactFormData) => {
      const payload = transformToPayload(data);
      return postMutation.mutateAsync(payload);
    },
  };
};
