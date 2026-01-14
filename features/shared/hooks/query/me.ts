import { queryOptions } from "@tanstack/react-query";
import { getCurrentUserFn } from "../../api/me";

export const createCurrentUserQueryOptions = queryOptions({
  queryKey: ["me"],
  queryFn: getCurrentUserFn,
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000, // 10 minutes
});
