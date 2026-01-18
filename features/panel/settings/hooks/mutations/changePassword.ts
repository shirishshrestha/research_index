import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { broadcastLogout } from "@/lib/broadcastLogout";
import { changePasswordFn } from "../../api";
import type { UseFormReturn } from "react-hook-form";
import type { ChangePasswordRequest } from "../../types";
import { ApiError } from "@/features/auth/types";
import { useLogoutMutation } from "@/features/auth";

export const useChangePasswordMutation = (
  form: UseFormReturn<ChangePasswordRequest>
) => {
  const logoutMutate = useLogoutMutation();

  return useMutation({
    mutationFn: changePasswordFn,
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      // Logout after password change
      setTimeout(() => {
        broadcastLogout();
        logoutMutate.mutate();
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
            form.setError(field as keyof ChangePasswordRequest, {
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
            "Failed to change password";
          toast.error(message);
        }
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    },
  });
};
