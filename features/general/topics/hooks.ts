"use client";

import { useGet } from "@/hooks/useApi";
import type { TopicTree } from "./types";

/**
 * Hook to fetch topics tree with nested branches
 * @param search - Optional search query to filter topics and branches
 */
export const useTopicTreeQuery = (search?: string) => {
  const searchParam = search ? `?search=${encodeURIComponent(search)}` : "";
  return useGet<TopicTree>(
    ["topics", "tree", search || "all"],
    `/publications/topics/tree/${searchParam}`
  );
};
