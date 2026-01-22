import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePost } from "@/hooks/useApi";
import { useAppDispatch } from "@/store/hooks";
import { useQueryClient } from "@tanstack/react-query";
import type { UseFormReturn } from "react-hook-form";
import type { AxiosError } from "axios";
import {
  setCredentials,
  logout as logoutAction,
  updateAccessToken,
} from "../../redux";

import { AUTH_ENDPOINTS } from "../../constants";
import type {
  LoginRequest,
  LoginResponse,
  AuthorRegisterRequest,
  InstitutionRegisterRequest,
  RegisterResponse,
  RefreshTokenResponse,
} from "@/features/auth/types";

// Type for form with setError method
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormWithSetError = Pick<UseFormReturn<any>, "setError">;

/**
 * Hook for login mutation
 */
export function useLoginMutation(form: { reset: () => void }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return usePost<LoginResponse, LoginRequest>(AUTH_ENDPOINTS.LOGIN, {
    onSuccess: (data) => {
      // Clear all queries before setting new credentials to ensure fresh data
      queryClient.clear();
      form.reset();

      dispatch(
        setCredentials({
          user: data.user,
          tokens: data.tokens,
        }),
      );
      toast.success("Login successful! Redirecting...");

      // Redirect to role-specific dashboard
      const dashboardRoutes = {
        admin: "/admin/dashboard",
        institution: "/institution/dashboard",
        author: "/author/dashboard",
      };
      const redirectTo = dashboardRoutes[data.user.user_type] || "/";
      router.push(redirectTo);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<Record<string, string | string[]>>;
      const data = axiosError?.response?.data;

      console.log("Login error data:", data);

      // Extract error message from various possible formats
      let errorMessage = "Login failed. Please try again.";

      if (data && typeof data === "object") {
        // Check for common error keys
        const errorValue = data.error || data.detail || data.message;
        if (errorValue) {
          errorMessage = Array.isArray(errorValue)
            ? errorValue.join(" ")
            : errorValue;
        }
      }

      toast.error(errorMessage);
    },
  });
}

/**
 * Hook for author registration mutation
 */
export function useRegisterAuthorMutation(form?: FormWithSetError) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return usePost<RegisterResponse, AuthorRegisterRequest>(
    AUTH_ENDPOINTS.REGISTER_AUTHOR,
    {
      onSuccess: (data) => {
        dispatch(
          setCredentials({
            user: {
              ...data.user,
              id: 0,
            },
            tokens: data.tokens,
          }),
        );
        toast.success("Registration successful! Redirecting to login...");
        router.push("/login");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<
          Record<string, string[] | string>
        >;
        const data = axiosError?.response?.data;

        if (data && typeof data === "object" && form) {
          let hasFieldError = false;
          const nonFieldErrors: string[] = [];

          Object.entries(data).forEach(([field, messages]) => {
            const messageArray = Array.isArray(messages)
              ? messages
              : [messages];

            // Map backend field names to form field names
            const fieldMap: Record<string, string> = {
              full_name: "fullName",
              confirm_password: "confirmPassword",
            };
            const formField = fieldMap[field] || field;

            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              form.setError(formField as any, {
                type: "manual",
                message: messageArray.join(" "),
              });
              hasFieldError = true;
            } catch {
              // Field doesn't exist in form, collect as non-field error
              nonFieldErrors.push(...messageArray);
            }
          });

          // Show non-field errors as toast
          if (nonFieldErrors.length > 0) {
            toast.error(nonFieldErrors.join(" "));
          } else if (!hasFieldError) {
            toast.error("Registration failed. Please try again.");
          }
        } else {
          toast.error("Registration failed. Please try again.");
        }
      },
    },
  );
}

/**
 * Hook for institution registration mutation
 */
export function useRegisterInstitutionMutation(form?: FormWithSetError) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return usePost<RegisterResponse, InstitutionRegisterRequest>(
    AUTH_ENDPOINTS.REGISTER_INSTITUTION,
    {
      onSuccess: async (data) => {
        dispatch(
          setCredentials({
            user: {
              ...data.user,
              id: 0,
            },
            tokens: data.tokens,
          }),
        );

        // Revalidate institutions cache after successful registration
        const { revalidateInstitutionsAction } =
          await import("@/features/general/institutions/server-actions/actions");
        await revalidateInstitutionsAction();

        toast.success("Registration successful! Redirecting to login...");
        router.push("/login");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<
          Record<string, string[] | string>
        >;
        const data = axiosError?.response?.data;
        if (data && typeof data === "object" && form) {
          let hasFieldError = false;
          const nonFieldErrors: string[] = [];

          Object.entries(data).forEach(([field, messages]) => {
            const messageArray = Array.isArray(messages)
              ? messages
              : [messages];

            // Map backend field names to form field names
            const fieldMap: Record<string, string> = {
              institution_name: "institutionName",
              confirm_password: "confirmPassword",
            };
            const formField = fieldMap[field] || field;

            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              form.setError(formField as any, {
                type: "manual",
                message: messageArray.join(" "),
              });
              hasFieldError = true;
            } catch {
              // Field doesn't exist in form, collect as non-field error
              nonFieldErrors.push(...messageArray);
            }
          });

          // Show non-field errors as toast
          if (nonFieldErrors.length > 0) {
            toast.error(nonFieldErrors.join(" "));
          } else if (!hasFieldError) {
            toast.error("Registration failed. Please try again.");
          }
        } else {
          toast.error("Registration failed. Please try again.");
        }
      },
    },
  );
}

/**
 * Hook for logout mutation
 */
export function useLogoutMutation() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return usePost<{ message: string }, void>(AUTH_ENDPOINTS.LOGOUT, {
    onSuccess: () => {
      dispatch(logoutAction());
      queryClient.clear(); // Clear all cached queries
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: () => {
      // Even if logout fails on backend, clear local state
      dispatch(logoutAction());
      queryClient.clear(); // Clear all cached queries
      toast.success("Logged out successfully");
      router.push("/login");
    },
  });
}

/**
 * Hook for token refresh mutation
 */
export function useRefreshTokenMutation() {
  const dispatch = useAppDispatch();

  return usePost<RefreshTokenResponse, void>(AUTH_ENDPOINTS.REFRESH_TOKEN, {
    onSuccess: (data) => {
      dispatch(updateAccessToken(data.access));
    },
  });
}
