import { serverGet } from "@/lib/server-api";
import type {
  Institution,
  InstitutionDetail,
  InstitutionFilters,
} from "../types";

/**
 * Fetch all institutions (public endpoint)
 * @param filters - Optional filters for country, type, and search
 */
export async function getPublicInstitutions(
  filters?: InstitutionFilters,
): Promise<Institution[]> {
  const params = new URLSearchParams();

  if (filters?.country) {
    params.append("country", filters.country);
  }
  if (filters?.type) {
    params.append("type", filters.type);
  }
  if (filters?.search) {
    params.append("search", filters.search);
  }

  const endpoint = `/publications/institutions/public/${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await serverGet<Institution[]>(endpoint, {
    tags: ["institutions"],
    revalidate: 3600, // Revalidate every hour
  });

  return response;
}

/**
 * Fetch a single institution by ID (public endpoint)
 * @param id - Institution ID
 */
export async function getPublicInstitution(
  id: number | string,
): Promise<InstitutionDetail> {
  const response = await serverGet<InstitutionDetail>(
    `/publications/institutions/public/${id}/`,
    {
      tags: ["institutions", `institution-${id}`],
      revalidate: 3600, // Revalidate every hour
    },
  );

  return response;
}
