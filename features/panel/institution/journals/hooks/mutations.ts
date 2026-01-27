"use client";

import { usePost, usePatch, useDelete } from "@/hooks/useApi";
import type {
  JournalFormData,
  JournalCreateResponse,
  JournalUpdateResponse,
  JournalDeleteResponse,
  JournalStats,
} from "../types";
import { useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { JOURNALS_QUERY_KEYS, JOURNALS_ENDPOINTS } from "../constants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorHandling";
import {
  revalidateJournalsCache,
  revalidateJournalCache,
  revalidateJournalPublicationsCache,
} from "../server-actions/actions";

/**
 * Prepare FormData for journal creation/update
 */
export const prepareJournalFormData = (
  data: JournalFormData | Partial<JournalFormData>,
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "cover_image" && value instanceof File) {
      formData.append(key, value);
    } else if (key === "editorial_board_data") {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

/**
 * Mutation hook to create a new journal
 */
export const useCreateJournalMutation = (
  options?: UseMutationOptions<
    JournalCreateResponse,
    Error,
    FormData | JournalFormData
  >,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return usePost<JournalCreateResponse, FormData | JournalFormData>(
    JOURNALS_ENDPOINTS.BASE,
    {
      ...options,
      onSuccess: async (...args) => {
        queryClient.invalidateQueries({
          queryKey: JOURNALS_QUERY_KEYS.lists(),
        });
        await revalidateJournalsCache();
        router.refresh();
        toast.success("Journal created successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to create journal"));
        options?.onError?.(error, ...args);
      },
    },
  );
};

/**
 * Mutation hook to update an existing journal
 */
export const useUpdateJournalMutation = (
  id?: number | string,
  options?: UseMutationOptions<
    JournalUpdateResponse,
    Error,
    FormData | Partial<JournalFormData>
  >,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return usePatch<JournalUpdateResponse, FormData | Partial<JournalFormData>>(
    id ? JOURNALS_ENDPOINTS.UPDATE(Number(id)) : "",
    {
      ...options,
      onSuccess: async (...args) => {
        queryClient.invalidateQueries({
          queryKey: JOURNALS_QUERY_KEYS.lists(),
        });
        queryClient.invalidateQueries({
          queryKey: JOURNALS_QUERY_KEYS.detail(Number(id)),
        });
        await revalidateJournalCache(Number(id));
        router.refresh();
        toast.success("Journal updated successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to update journal"));
        options?.onError?.(error, ...args);
      },
    },
  );
};

/**
 * Mutation hook to delete a journal
 */
export const useDeleteJournalMutation = (
  id?: number | string,
  options?: UseMutationOptions<JournalDeleteResponse, Error, void>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useDelete<JournalDeleteResponse>(
    id ? JOURNALS_ENDPOINTS.DELETE(Number(id)) : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // Invalidate client-side cache
        queryClient.invalidateQueries({
          queryKey: JOURNALS_QUERY_KEYS.lists(),
        });

        // Revalidate server-side cache
        await revalidateJournalsCache();

        // Refresh server components
        router.refresh();

        toast.success("Journal deleted successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to delete journal"));
        options?.onError?.(error, ...args);
      },
    },
  );
};

/**
 * Mutation hook to update journal stats
 */
export const useUpdateJournalStatsMutation = (
  id?: number | string,
  options?: UseMutationOptions<
    { message: string; stats: JournalStats },
    Error,
    Partial<JournalStats>
  >,
) => {
  const queryClient = useQueryClient();

  return usePatch<
    { message: string; stats: JournalStats },
    Partial<JournalStats>
  >(id ? JOURNALS_ENDPOINTS.UPDATE_STATS(Number(id)) : "", {
    ...options,
    onSuccess: async (...args) => {
      // Invalidate stats cache
      queryClient.invalidateQueries({
        queryKey: JOURNALS_QUERY_KEYS.stats(Number(id)),
      });

      // Revalidate server-side cache
      await revalidateJournalCache(Number(id));
      await revalidateJournalPublicationsCache();

      toast.success("Journal stats updated successfully");
      options?.onSuccess?.(...args);
    },
    onError: (error, ...args) => {
      toast.error(extractErrorMessage(error, "Failed to update journal stats"));
      options?.onError?.(error, ...args);
    },
  });
};
