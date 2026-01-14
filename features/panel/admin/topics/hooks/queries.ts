"use client";

import { useGet } from "@/hooks/useApi";
import type { PaginatedResponse, Topic, TopicBranch } from "../types";

export const useTopicsQuery = () => {
  return useGet<PaginatedResponse<Topic>>(
    ["topics", "list"],
    "/publications/topics/"
  );
};

export const useTopicQuery = (id: number | string | undefined) => {
  return useGet<Topic>(
    ["topics", String(id)],
    id ? `/publications/topics/${id}/` : ""
  );
};

export const useTopicBranchesQuery = (topicPk: number | string | undefined) =>
  useGet<PaginatedResponse<TopicBranch>>(
    ["topics", String(topicPk), "branches"],
    topicPk ? `/publications/topics/${topicPk}/branches/` : ""
  );

export const useBranchPublicationsQuery = (
  topicPk: number | string | undefined,
  branchPk: number | string | undefined
) =>
  useGet(
    ["topics", String(topicPk), "branches", String(branchPk), "publications"],
    topicPk && branchPk
      ? `/publications/topics/${topicPk}/branches/${branchPk}/publications/`
      : ""
  );

export const useBranchQuery = (
  topicPk: number | string | undefined,
  id: number | string | undefined
) =>
  useGet(
    ["topics", String(topicPk), "branches", String(id)],
    topicPk && id ? `/publications/topics/${topicPk}/branches/${id}/` : ""
  );
