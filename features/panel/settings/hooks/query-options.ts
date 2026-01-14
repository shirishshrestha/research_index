import { queryOptions } from "@tanstack/react-query";
import { getAccountStatusFn } from "../api";
import { SETTINGS_QUERY_KEYS } from "../constants";

export const createAccountStatusQueryOptions = () =>
  queryOptions({
    queryKey: SETTINGS_QUERY_KEYS.accountStatus,
    queryFn: getAccountStatusFn,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
