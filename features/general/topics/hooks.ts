"use client";

import { useGet } from "@/hooks/useApi";
import type { TopicTree } from "./types";
import type { UseQueryOptions } from "@tanstack/react-query";

/**
 * Hook to fetch topics tree with nested branches
 * @param search - Optional search query to filter topics and branches
 * @param options - Optional TanStack Query options
 */
export const useTopicTreeQuery = (
  search?: string,
  options?: Omit<UseQueryOptions<TopicTree>, "queryKey" | "queryFn">,
) => {
  const searchParam = search ? `?search=${encodeURIComponent(search)}` : "";
  return useGet<TopicTree>(
    ["topics", "tree", search || "all"],
    `/publications/topics/tree/${searchParam}`,
    options,
  );
};
