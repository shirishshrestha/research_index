"use client";

import { usePost } from "@/hooks/useApi";
import type { NepJOLImportStartRequest } from "../types";
import { useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorHandling";

/**
 * Mutation hook to start NepJOL import
 */
export const useStartNepJOLImportMutation = (
  options?: UseMutationOptions<
    { message: string; status: string; started_at: string },
    Error,
    NepJOLImportStartRequest
  >,
) => {
  const queryClient = useQueryClient();

  return usePost<
    { message: string; status: string; started_at: string },
    NepJOLImportStartRequest
  >("/nepjol/import/start/", {
    ...options,
    onSuccess: async (...args) => {
      // Invalidate status query to start polling
      queryClient.invalidateQueries({
        queryKey: ["nepjol", "import", "status"],
      });

      toast.success("NepJOL import started successfully");
      options?.onSuccess?.(...args);
    },
    onError: (error, ...args) => {
      toast.error(extractErrorMessage(error, "Failed to start NepJOL import"));
      options?.onError?.(error, ...args);
    },
  });
};

/**
 * Mutation hook to stop NepJOL import
 */
export const useStopNepJOLImportMutation = (
  options?: UseMutationOptions<
    { message: string; stats: Record<string, number> },
    Error,
    void
  >,
) => {
  const queryClient = useQueryClient();

  return usePost<{ message: string; stats: Record<string, number> }, void>(
    "/nepjol/import/stop/",
    {
      ...options,
      onSuccess: async (...args) => {
        // Invalidate queries
        queryClient.invalidateQueries({
          queryKey: ["nepjol", "import", "status"],
        });
        queryClient.invalidateQueries({
          queryKey: ["nepjol", "import", "history"],
        });

        toast.success("NepJOL import stopped successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to stop NepJOL import"));
        options?.onError?.(error, ...args);
      },
    },
  );
};
