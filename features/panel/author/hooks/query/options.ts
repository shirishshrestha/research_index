import { queryOptions } from "@tanstack/react-query";
import { getProfileFn } from "../../api/functions";

export const createCurrentUserQueryOptions = queryOptions({
  queryKey: ["me"],
  queryFn: getProfileFn,
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
});
