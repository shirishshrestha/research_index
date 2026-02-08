"use client";

import { useGet } from "@/hooks/useApi";
import type {
  AdminUser,
  AdminAuthorDetail,
  AdminInstitutionDetail,
  PaginatedAdminUsersResponse,
} from "../types";

export const useAdminUsersQuery = (params?: {
  user_type?: "author" | "institution" | "admin";
  search?: string;
  page?: number;
  page_size?: number;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.user_type) queryParams.set("user_type", params.user_type);
  if (params?.search) queryParams.set("search", params.search);
  if (params?.page) queryParams.set("page", String(params.page));
  if (params?.page_size) queryParams.set("page_size", String(params.page_size));

  const queryString = queryParams.toString();

  return useGet<PaginatedAdminUsersResponse>(
    ["admin", "users", queryString],
    `/auth/admin/users/${queryString ? `?${queryString}` : ""}`,
  );
};

export const useAdminAuthorDetailQuery = (id: number | undefined) => {
  return useGet<AdminAuthorDetail>(
    ["admin", "authors", String(id)],
    id ? `/auth/admin/authors/${id}/` : "",
    { enabled: !!id },
  );
};

export const useAdminInstitutionDetailQuery = (id: number | undefined) => {
  return useGet<AdminInstitutionDetail>(
    ["admin", "institutions", String(id)],
    id ? `/auth/admin/institutions/${id}/` : "",
    { enabled: !!id },
  );
};
