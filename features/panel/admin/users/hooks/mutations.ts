"use client";

import { usePatch, useDelete } from "@/hooks/useApi";
import type {
  AuthorUpdateData,
  InstitutionUpdateData,
  AdminAuthorDetail,
  AdminInstitutionDetail,
} from "../types";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateAuthorMutation = (
  id: number | undefined,
  options?: {
    onSuccess?: () => void;
  },
) => {
  const queryClient = useQueryClient();

  return usePatch<
    { message: string; author: AdminAuthorDetail },
    AuthorUpdateData
  >(`/users/admin/authors/${id}/`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "authors", String(id)],
      });
      options?.onSuccess?.();
    },
  });
};

export const useUpdateInstitutionMutation = (
  id: number | undefined,
  options?: {
    onSuccess?: () => void;
  },
) => {
  const queryClient = useQueryClient();

  return usePatch<
    { message: string; institution: AdminInstitutionDetail },
    InstitutionUpdateData
  >(`/users/admin/institutions/${id}/`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "institutions", String(id)],
      });
      options?.onSuccess?.();
    },
  });
};

export const useDeleteAuthorMutation = (
  id: number | undefined,
  options?: {
    onSuccess?: () => void;
  },
) => {
  const queryClient = useQueryClient();

  return useDelete<{ message: string }>(`/users/admin/authors/${id}/`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      options?.onSuccess?.();
    },
  });
};

export const useDeleteInstitutionMutation = (
  id: number | undefined,
  options?: {
    onSuccess?: () => void;
  },
) => {
  const queryClient = useQueryClient();

  return useDelete<{ message: string }>(`/users/admin/institutions/${id}/`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      options?.onSuccess?.();
    },
  });
};
