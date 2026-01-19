"use client";

import { usePost, usePatch, useDelete } from "@/hooks/useApi";
import type { Topic, TopicBranch } from "../types";
import { useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { revalidateTopicsAction } from "@/features/general/topics/server-actions/actions";
import { useRouter } from "next/navigation";

export const useCreateTopicMutation = (
  options?: UseMutationOptions<Topic, Error, Partial<Topic>>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return usePost<Topic, Partial<Topic>>("/publications/topics/", {
    ...options,
    onSuccess: async (...args) => {
      // Invalidate TanStack Query cache
      queryClient.invalidateQueries({ queryKey: ["topics", "list"] });
      queryClient.invalidateQueries({ queryKey: ["topics", "tree"] });

      // Revalidate server cache
      await revalidateTopicsAction();

      // Trigger server component refetch
      router.refresh();

      options?.onSuccess?.(...args);
    },
  });
};

export const useUpdateTopicMutation = (
  id?: number | string,
  options?: UseMutationOptions<Topic, Error, Partial<Topic>>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return usePatch<Topic, Partial<Topic>>(
    id ? `/publications/topics/${id}/` : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // Invalidate TanStack Query cache
        queryClient.invalidateQueries({ queryKey: ["topics", "list"] });
        queryClient.invalidateQueries({ queryKey: ["topics", "tree"] });

        // Revalidate server cache
        await revalidateTopicsAction();

        // Trigger server component refetch
        router.refresh();

        options?.onSuccess?.(...args);
      },
    },
  );
};

export const useDeleteTopicMutation = (
  id?: number | string,
  options?: UseMutationOptions<Topic, Error, void>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useDelete<Topic>(id ? `/publications/topics/${id}/` : "", {
    ...options,
    onSuccess: async (...args) => {
      // Invalidate TanStack Query cache
      queryClient.invalidateQueries({ queryKey: ["topics", "list"] });
      queryClient.invalidateQueries({ queryKey: ["topics", "tree"] });

      // Revalidate server cache
      await revalidateTopicsAction();

      // Trigger server component refetch
      router.refresh();

      options?.onSuccess?.(...args);
    },
  });
};

export const useCreateBranchMutation = (
  topicPk?: number | string,
  options?: UseMutationOptions<TopicBranch, Error, Partial<TopicBranch>>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return usePost<TopicBranch, Partial<TopicBranch>>(
    topicPk ? `/publications/topics/${topicPk}/branches/` : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // Invalidate TanStack Query cache
        queryClient.invalidateQueries({
          queryKey: ["topics", String(topicPk), "branches"],
        });
        queryClient.invalidateQueries({
          queryKey: ["topics"],
        });

        // Revalidate server cache
        await revalidateTopicsAction();

        // Trigger server component refetch
        router.refresh();

        options?.onSuccess?.(...args);
      },
    },
  );
};

export const useUpdateBranchMutation = (
  topicPk?: number | string,
  id?: number | string,
  options?: UseMutationOptions<TopicBranch, Error, Partial<TopicBranch>>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return usePatch<TopicBranch, Partial<TopicBranch>>(
    topicPk && id ? `/publications/topics/${topicPk}/branches/${id}/` : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // Invalidate TanStack Query cache
        queryClient.invalidateQueries({
          queryKey: ["topics", String(topicPk), "branches"],
        });
        queryClient.invalidateQueries({
          queryKey: ["topics", "tree"],
        });

        // Revalidate server cache
        await revalidateTopicsAction();

        // Trigger server component refetch
        router.refresh();

        options?.onSuccess?.(...args);
      },
    },
  );
};

export const useDeleteBranchMutation = (
  topicPk?: number | string,
  id?: number | string,
  options?: UseMutationOptions<TopicBranch, Error, void>,
) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useDelete<TopicBranch>(
    topicPk && id ? `/publications/topics/${topicPk}/branches/${id}/` : "",
    {
      ...options,
      onSuccess: async (...args) => {
        // Invalidate TanStack Query cache
        queryClient.invalidateQueries({
          queryKey: ["topics", String(topicPk), "branches"],
        });
        queryClient.invalidateQueries({
          queryKey: ["topics"],
        });

        // Revalidate server cache
        await revalidateTopicsAction();

        // Trigger server component refetch
        router.refresh();

        options?.onSuccess?.(...args);
      },
    },
  );
};
