"use client";

import { usePost, usePatch, useDelete } from "@/hooks/useApi";
import type {
  IssueFormData,
  IssueCreateResponse,
  IssueUpdateResponse,
  IssueDeleteResponse,
  AddArticleToIssueData,
  AddArticleToIssueResponse,
} from "../types";
import { useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { ISSUES_QUERY_KEYS, ISSUES_ENDPOINTS } from "../constants";
import { JOURNALS_QUERY_KEYS } from "../../journals/constants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorHandling";

/**
 * Prepare FormData for issue creation/update
 */
export const prepareIssueFormData = (
  data: IssueFormData | Partial<IssueFormData>,
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "cover_image" && value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};

/**
 * Mutation hook to create a new issue
 */
export const useCreateIssueMutation = (
  journalId: number | string | undefined,
  options?: UseMutationOptions<
    IssueCreateResponse,
    Error,
    FormData | IssueFormData
  >,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return usePost<IssueCreateResponse, FormData | IssueFormData>(
    journalId ? ISSUES_ENDPOINTS.CREATE(Number(journalId)) : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // Invalidate issues cache
        queryClient.invalidateQueries({
          queryKey: ISSUES_QUERY_KEYS.all(Number(journalId)),
        });

        // Invalidate journal stats
        queryClient.invalidateQueries({
          queryKey: JOURNALS_QUERY_KEYS.stats(Number(journalId)),
        });

        // Refresh server components
        router.refresh();

        toast.success("Issue created successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to create issue"));
        options?.onError?.(error, ...args);
      },
    },
  );
};

/**
 * Mutation hook to update an existing issue
 */
export const useUpdateIssueMutation = (
  journalId: number | string | undefined,
  issueId: number | string | undefined,
  options?: UseMutationOptions<
    IssueUpdateResponse,
    Error,
    FormData | Partial<IssueFormData>
  >,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return usePatch<IssueUpdateResponse, FormData | Partial<IssueFormData>>(
    journalId && issueId
      ? ISSUES_ENDPOINTS.UPDATE(Number(journalId), Number(issueId))
      : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // Invalidate issues cache
        queryClient.invalidateQueries({
          queryKey: ISSUES_QUERY_KEYS.all(Number(journalId)),
        });
        queryClient.invalidateQueries({
          queryKey: ISSUES_QUERY_KEYS.detail(
            Number(journalId),
            Number(issueId),
          ),
        });

        // Refresh server components
        router.refresh();

        toast.success("Issue updated successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to update issue"));
        options?.onError?.(error, ...args);
      },
    },
  );
};

/**
 * Mutation hook to delete an issue
 */
export const useDeleteIssueMutation = (
  journalId: number | string | undefined,
  issueId: number | string | undefined,
  options?: UseMutationOptions<IssueDeleteResponse, Error, void>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useDelete<IssueDeleteResponse>(
    journalId && issueId
      ? ISSUES_ENDPOINTS.DELETE(Number(journalId), Number(issueId))
      : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // Invalidate issues cache
        queryClient.invalidateQueries({
          queryKey: ISSUES_QUERY_KEYS.all(Number(journalId)),
        });

        // Invalidate journal stats
        queryClient.invalidateQueries({
          queryKey: JOURNALS_QUERY_KEYS.stats(Number(journalId)),
        });

        // Refresh server components
        router.refresh();

        toast.success("Issue deleted successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(extractErrorMessage(error, "Failed to delete issue"));
        options?.onError?.(error, ...args);
      },
    },
  );
};

/**
 * Mutation hook to add an article to an issue
 */
export const useAddArticleToIssueMutation = (
  journalId: number | string | undefined,
  issueId: number | string | undefined,
  options?: UseMutationOptions<
    AddArticleToIssueResponse,
    Error,
    AddArticleToIssueData
  >,
) => {
  const queryClient = useQueryClient();

  return usePost<AddArticleToIssueResponse, AddArticleToIssueData>(
    journalId && issueId
      ? ISSUES_ENDPOINTS.ADD_ARTICLE(Number(journalId), Number(issueId))
      : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // Invalidate issue detail to refresh articles list
        queryClient.invalidateQueries({
          queryKey: ISSUES_QUERY_KEYS.detail(
            Number(journalId),
            Number(issueId),
          ),
        });

        // Invalidate journal stats
        queryClient.invalidateQueries({
          queryKey: JOURNALS_QUERY_KEYS.stats(Number(journalId)),
        });

        toast.success("Article added to issue successfully");
        options?.onSuccess?.(...args);
      },
      onError: (error, ...args) => {
        toast.error(
          extractErrorMessage(error, "Failed to add article to issue"),
        );
        options?.onError?.(error, ...args);
      },
    },
  );
};
