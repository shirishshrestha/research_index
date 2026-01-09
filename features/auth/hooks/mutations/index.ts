import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { usePost } from "@/hooks/useApi";
import { useAppDispatch } from "@/store/hooks";
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
export function useLoginMutation(form?: FormWithSetError) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return usePost<LoginResponse, LoginRequest>(AUTH_ENDPOINTS.LOGIN, {
    onSuccess: (data) => {
      dispatch(
        setCredentials({
          user: data.user,
          tokens: data.tokens,
        })
      );
      toast.success("Login successful! Redirecting...");
      router.push("/");
    },
    onError: (error) => {
      const axiosError = error as AxiosError<Record<string, string[]>>;
      const data = axiosError?.response?.data;
      if (data && typeof data === "object" && form) {
        let hasFieldError = false;
        Object.entries(data).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            try {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              form.setError(field as any, {
                type: "manual",
                message: messages.join(" "),
              });
              hasFieldError = true;
            } catch {
              console.warn(`Field ${field} not found in form`);
            }
          }
        });
        if (!hasFieldError) {
          toast.error("Login failed. Please check your credentials.");
        }
      } else {
        toast.error("Login failed. Please try again.");
      }
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
          })
        );
        toast.success("Registration successful! Redirecting to login...");
        router.push("/login");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<Record<string, string[]>>;
        const data = axiosError?.response?.data;

        if (data && typeof data === "object" && form) {
          let hasFieldError = false;
          Object.entries(data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
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
                  message: messages.join(" "),
                });
                hasFieldError = true;
              } catch {
                // If field doesn't exist in form, show as toast
                console.warn(`Field ${formField} not found in form`);
              }
            }
          });
          if (!hasFieldError) {
            toast.error("Registration failed. Please try again.");
          }
        } else {
          toast.error("Registration failed. Please try again.");
        }
      },
    }
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
      onSuccess: (data) => {
        dispatch(
          setCredentials({
            user: {
              ...data.user,
              id: 0,
            },
            tokens: data.tokens,
          })
        );
        toast.success("Registration successful! Welcome aboard!");
        router.push("/");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<Record<string, string[]>>;
        const data = axiosError?.response?.data;
        if (data && typeof data === "object" && form) {
          let hasFieldError = false;
          Object.entries(data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
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
                  message: messages.join(" "),
                });
                hasFieldError = true;
              } catch {
                console.warn(`Field ${formField} not found in form`);
              }
            }
          });
          if (!hasFieldError) {
            toast.error("Registration failed. Please try again.");
          }
        } else {
          toast.error("Registration failed. Please try again.");
        }
      },
    }
  );
}

/**
 * Hook for logout mutation
 */
export function useLogoutMutation() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return usePost<{ message: string }, void>(AUTH_ENDPOINTS.LOGOUT, {
    onSuccess: () => {
      dispatch(logoutAction());
      toast.success("Logged out successfully");
      router.push("/login");
    },
    onError: () => {
      // Even if logout fails on backend, clear local state
      dispatch(logoutAction());
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
