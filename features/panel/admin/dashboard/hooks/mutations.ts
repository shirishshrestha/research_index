"use client";

import { usePost } from "@/hooks/useApi";
import { type UseMutationOptions } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorHandling";

export interface SyncPublicationsRequest {
  limit?: number;
  api_url?: string;
}

export interface SyncPublicationsResponse {
  success: boolean;
  message: string;
  total_processed: number;
  success_count: number;
  error_count: number;
  errors?: Array<{
    title: string;
    error: string;
  }>;
}

/**
 * Mutation hook to sync publications from external journal portal
 * Only accessible to admin users
 */
export const useSyncPublicationsMutation = (
  options?: UseMutationOptions<
    SyncPublicationsResponse,
    Error,
    SyncPublicationsRequest | void
  >,
) => {
  return usePost<SyncPublicationsResponse, SyncPublicationsRequest>(
    "/publications/sync/",
    {
      ...options,
      onSuccess: (data, ...args) => {
        if (data.success) {
          if (data.error_count > 0) {
            toast.warning(
              `Sync completed with ${data.error_count} errors. Successfully synced ${data.success_count} of ${data.total_processed} publications.`,
            );
          } else {
            toast.success(
              `Successfully synced ${data.success_count} publications from external portal!`,
            );
          }
        } else {
          toast.error(data.message || "Sync failed");
        }
        options?.onSuccess?.(data, ...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to sync publications"));
        options?.onError?.(error, ...args);
      },
    },
  );
};
