"use client";

import { usePost, usePatch, useDelete } from "@/hooks/useApi";
import type { Topic, TopicBranch } from "../types";
import { useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

export const useCreateTopicMutation = (
  options?: UseMutationOptions<Topic, Error, Partial<Topic>>
) => {
  const queryClient = useQueryClient();
  return usePost<Topic, Partial<Topic>>("/publications/topics/", {
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["topics", "list"] });
      options?.onSuccess?.(...args);
    },
  });
};

export const useUpdateTopicMutation = (
  id?: number | string,
  options?: UseMutationOptions<Topic, Error, Partial<Topic>>
) => {
  const queryClient = useQueryClient();
  return usePatch<Topic, Partial<Topic>>(
    id ? `/publications/topics/${id}/` : "",
    {
      ...options,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({ queryKey: ["topics", "list"] });
        options?.onSuccess?.(...args);
      },
    }
  );
};

export const useDeleteTopicMutation = (
  id?: number | string,
  options?: UseMutationOptions<Topic, Error, void>
) => {
  const queryClient = useQueryClient();
  return useDelete<Topic>(id ? `/publications/topics/${id}/` : "", {
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({ queryKey: ["topics", "list"] });
      options?.onSuccess?.(...args);
    },
  });
};

export const useCreateBranchMutation = (
  topicPk?: number | string,
  options?: UseMutationOptions<TopicBranch, Error, Partial<TopicBranch>>
) => {
  const queryClient = useQueryClient();
  return usePost<TopicBranch, Partial<TopicBranch>>(
    topicPk ? `/publications/topics/${topicPk}/branches/` : "",
    {
      ...options,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: ["topics", String(topicPk), "branches"],
        });
        queryClient.invalidateQueries({
          queryKey: ["topics"],
        });
        options?.onSuccess?.(...args);
      },
    }
  );
};

export const useUpdateBranchMutation = (
  topicPk?: number | string,
  id?: number | string,
  options?: UseMutationOptions<TopicBranch, Error, Partial<TopicBranch>>
) => {
  const queryClient = useQueryClient();
  return usePatch<TopicBranch, Partial<TopicBranch>>(
    topicPk && id ? `/publications/topics/${topicPk}/branches/${id}/` : "",
    {
      ...options,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: ["topics", String(topicPk), "branches"],
        });
        options?.onSuccess?.(...args);
      },
    }
  );
};

export const useDeleteBranchMutation = (
  topicPk?: number | string,
  id?: number | string,
  options?: UseMutationOptions<TopicBranch, Error, void>
) => {
  const queryClient = useQueryClient();
  return useDelete<TopicBranch>(
    topicPk && id ? `/publications/topics/${topicPk}/branches/${id}/` : "",
    {
      ...options,
      onSuccess: (...args) => {
        queryClient.invalidateQueries({
          queryKey: ["topics", String(topicPk), "branches"],
        });
        queryClient.invalidateQueries({
          queryKey: ["topics"],
        });
        options?.onSuccess?.(...args);
      },
    }
  );
};
