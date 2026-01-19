"use client";

import { usePost, usePatch, useDelete } from "@/hooks/useApi";
import type { Publication, PublicationFormData } from "../types";
import { useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { PUBLICATIONS_QUERY_KEYS, PUBLICATIONS_ENDPOINTS } from "../constants";
import { useRouter } from "next/navigation";
import {
  revalidateAllPublications,
  revalidatePublication,
} from "../server-actions/actions";

/**
 * Mutation hook to create a new publication
 */
export const useCreatePublicationMutation = (
  options?: UseMutationOptions<Publication, Error, PublicationFormData>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return usePost<Publication, PublicationFormData>(
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

        options?.onSuccess?.(...args);
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
    Partial<PublicationFormData>
  >,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return usePatch<Publication, Partial<PublicationFormData>>(
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

        options?.onSuccess?.(...args);
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

        options?.onSuccess?.(...args);
      },
    },
  );
};
