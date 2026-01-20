import { AxiosError } from "axios";

/**
 * Extract user-friendly error message from backend error response
 *
 * Backend error formats:
 * 1. { error: "message" }
 * 2. { detail: "message" }
 * 3. { message: "message" }
 * 4. { field_name: ["error1", "error2"] }
 * 5. { field_name: "error message" }
 * 6. { non_field_errors: ["error1", "error2"] }
 */
export function extractErrorMessage(
  error: unknown,
  fallbackMessage: string = "An error occurred. Please try again.",
): string {
  // If it's already a string, return it
  if (typeof error === "string") {
    return error;
  }

  // Handle axios error
  if (error && typeof error === "object" && "response" in error) {
    const axiosError = error as AxiosError<Record<string, string | string[]>>;
    const data = axiosError?.response?.data;

    if (data && typeof data === "object") {
      // Check for common error keys first
      const errorValue =
        data.error || data.detail || data.message || data.non_field_errors;
      if (errorValue) {
        return Array.isArray(errorValue)
          ? errorValue.join(" ")
          : String(errorValue);
      }

      // Extract first field error
      const firstFieldError = Object.values(data).find((val) => val);
      if (firstFieldError) {
        return Array.isArray(firstFieldError)
          ? firstFieldError.join(" ")
          : String(firstFieldError);
      }
    }
  }

  // Handle Error instance
  if (error instanceof Error) {
    return error.message || fallbackMessage;
  }

  return fallbackMessage;
}
