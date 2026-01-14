"use client";

import { usePost, usePatch, useDelete } from "@/hooks/useApi";
import type { Topic, TopicBranch } from "../types";
import type { UseMutationOptions } from "@tanstack/react-query";

export const useCreateTopicMutation = (
  options?: UseMutationOptions<Topic, Error, Partial<Topic>>
) => usePost<Topic, Partial<Topic>>("/publications/topics/", options);

export const useUpdateTopicMutation = (
  id?: number | string,
  options?: UseMutationOptions<Topic, Error, Partial<Topic>>
) =>
  usePatch<Topic, Partial<Topic>>(
    id ? `/publications/topics/${id}/` : "",
    options
  );

export const useDeleteTopicMutation = (
  id?: number | string,
  options?: UseMutationOptions<Topic, Error, void>
) => useDelete<Topic>(id ? `/publications/topics/${id}/` : "", options);

export const useCreateBranchMutation = (
  topicPk?: number | string,
  options?: UseMutationOptions<TopicBranch, Error, Partial<TopicBranch>>
) =>
  usePost<TopicBranch, Partial<TopicBranch>>(
    topicPk ? `/publications/topics/${topicPk}/branches/` : "",
    options
  );

export const useUpdateBranchMutation = (
  topicPk?: number | string,
  id?: number | string,
  options?: UseMutationOptions<TopicBranch, Error, Partial<TopicBranch>>
) =>
  usePatch<TopicBranch, Partial<TopicBranch>>(
    topicPk && id ? `/publications/topics/${topicPk}/branches/${id}/` : "",
    options
  );

export const useDeleteBranchMutation = (
  topicPk?: number | string,
  id?: number | string,
  options?: UseMutationOptions<TopicBranch, Error, void>
) =>
  useDelete<TopicBranch>(
    topicPk && id ? `/publications/topics/${topicPk}/branches/${id}/` : "",
    options
  );
