"use client";

import { usePost, usePatch, useDelete } from "@/hooks/useApi";
import type { Publication, PublicationFormData } from "../types";
import { useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { PUBLICATIONS_QUERY_KEYS, PUBLICATIONS_ENDPOINTS } from "../constants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorHandling";
import {
  revalidateAllPublications,
  revalidatePublication,
} from "../server-actions/actions";

/**
 * Mutation hook to create a new publication
 */
export const useCreatePublicationMutation = (
  options?: UseMutationOptions<
    Publication,
    Error,
    FormData | PublicationFormData
  >,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return usePost<Publication, FormData | PublicationFormData>(
    PUBLICATIONS_ENDPOINTS.LIST,
    {
      ...options,
      onSuccess: async (...args) => {
        // 1. Invalidate client-side cache
        queryClient.invalidateQueries({
          queryKey: PUBLICATIONS_QUERY_KEYS.lists(),
        });

        // 2. Call server action to revalidate server cache
        await revalidateAllPublications();

        // 3. Refresh server components
        router.refresh();

        toast.success("Publication created successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to create publication"));
        options?.onError?.(error, ...args);
      },
    },
  );
};

/**
 * Mutation hook to update an existing publication
 */
export const useUpdatePublicationMutation = (
  id?: number | string,
  options?: UseMutationOptions<
    Publication,
    Error,
    FormData | Partial<PublicationFormData>
  >,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return usePatch<Publication, FormData | Partial<PublicationFormData>>(
    id ? PUBLICATIONS_ENDPOINTS.UPDATE(Number(id)) : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // 1. Invalidate client-side cache
        queryClient.invalidateQueries({
          queryKey: PUBLICATIONS_QUERY_KEYS.lists(),
        });
        queryClient.invalidateQueries({
          queryKey: PUBLICATIONS_QUERY_KEYS.detail(Number(id)),
        });

        // 2. Call server action to revalidate server cache
        await revalidatePublication(Number(id));
        await revalidateAllPublications();

        // 3. Refresh server components
        router.refresh();

        toast.success("Publication updated successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to update publication"));
        options?.onError?.(error, ...args);
      },
    },
  );
};

/**
 * Mutation hook to delete a publication
 */
export const useDeletePublicationMutation = (
  id?: number | string,
  options?: UseMutationOptions<Publication, Error, void>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useDelete<Publication>(
    id ? PUBLICATIONS_ENDPOINTS.DELETE(Number(id)) : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // 1. Invalidate client-side cache
        queryClient.invalidateQueries({
          queryKey: PUBLICATIONS_QUERY_KEYS.lists(),
        });

        // 2. Call server action to revalidate server cache
        await revalidateAllPublications();

        // 3. Refresh server components
        router.refresh();

        toast.success("Publication deleted successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to delete publication"));
        options?.onError?.(error, ...args);
      },
    },
  );
};
