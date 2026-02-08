"use client";

import { useGet } from "@/hooks/useApi";
import type {
  AdminUser,
  AdminAuthorDetail,
  AdminInstitutionDetail,
} from "../types";

export const useAdminUsersQuery = (params?: {
  user_type?: "author" | "institution" | "admin";
  search?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (params?.user_type) queryParams.set("user_type", params.user_type);
  if (params?.search) queryParams.set("search", params.search);

  const queryString = queryParams.toString();

  return useGet<AdminUser[]>(
    ["admin", "users", queryString],
    `/users/admin/users/${queryString ? `?${queryString}` : ""}`,
  );
};

export const useAdminAuthorDetailQuery = (id: number | undefined) => {
  return useGet<AdminAuthorDetail>(
    ["admin", "authors", String(id)],
    id ? `/users/admin/authors/${id}/` : "",
    { enabled: !!id },
  );
};

export const useAdminInstitutionDetailQuery = (id: number | undefined) => {
  return useGet<AdminInstitutionDetail>(
    ["admin", "institutions", String(id)],
    id ? `/users/admin/institutions/${id}/` : "",
    { enabled: !!id },
  );
};
