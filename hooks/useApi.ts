import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { api } from "@/services/api";

export function useGet<T>(
  key: string[],
  endpoint: string,
  options?: Omit<UseQueryOptions<T>, "queryKey" | "queryFn">
) {
  return useQuery<T>({
    queryKey: key,
    queryFn: () => api.get<T>(endpoint),
    ...options,
  });
}

export function usePost<TData, TVariables>(
  endpoint: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (data: TVariables) => api.post<TData>(endpoint, data),
    ...options,
  });
}

export function usePut<TData, TVariables>(
  endpoint: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (data: TVariables) => api.put<TData>(endpoint, data),
    ...options,
  });
}

export function usePatch<TData, TVariables>(
  endpoint: string,
  options?: UseMutationOptions<TData, Error, TVariables>
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (data: TVariables) => api.patch<TData>(endpoint, data),
    ...options,
  });
}

export function useDelete<TData>(
  endpoint: string,
  options?: UseMutationOptions<TData, Error, void>
) {
  return useMutation<TData, Error, void>({
    mutationFn: () => api.delete<TData>(endpoint),
    ...options,
  });
}
