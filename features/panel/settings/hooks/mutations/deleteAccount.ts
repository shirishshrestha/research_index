import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { broadcastLogout } from "@/lib/broadcastLogout";
import { deleteAccountFn } from "../../api";
import type { UseFormReturn } from "react-hook-form";
import type { DeleteAccountRequest } from "../../types";
import { ApiError } from "@/features/auth/types";

export const useDeleteAccountMutation = (
  form: UseFormReturn<DeleteAccountRequest>
) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccountFn,
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      // Logout after deletion
      setTimeout(() => {
        broadcastLogout();
        queryClient.clear();
        router.push("/login");
      }, 2000);
    },
    onError: (error: ApiError) => {
      const errorData = error?.response?.data;

      if (errorData && typeof errorData === "object") {
        // Handle field-specific errors
        const fieldErrors = errorData as Record<string, string[]>;
        let hasFieldError = false;

        Object.entries(fieldErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            form.setError(field as keyof DeleteAccountRequest, {
              type: "server",
              message: messages[0],
            });
            hasFieldError = true;
          }
        });

        // If no field-specific errors, show general error
        if (!hasFieldError) {
          const message =
            errorData.details ||
            errorData.message ||
            "Failed to delete account";
          toast.error(message);
        }
      } else {
        toast.error("Failed to delete account. Please try again.");
      }
    },
  });
};
