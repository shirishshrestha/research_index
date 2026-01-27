import { serverGet } from "@/lib/server-api";
import type { Publication } from "@/features/panel/author/publications/types";

/**
 * Fetch publications by author ID (public endpoint)
 * @param authorId - Author ID
 */
export async function getAuthorPublications(
  authorId: number | string,
): Promise<Publication[]> {
  const response = await serverGet<Publication[]>(
    `/publications/authors/public/${authorId}/publications/`,
    {
      tags: ["authors", `author-${authorId}`, "publications"],
      revalidate: 3600, // Revalidate every hour
      requireAuth: false,
    },
  );

  return response;
}

/**
 * Fetch publications by institution ID (public endpoint)
 * @param institutionId - Institution ID
 */
export async function getInstitutionPublications(
  institutionId: number | string,
): Promise<Publication[]> {
  const response = await serverGet<Publication[]>(
    `/publications/institutions/public/${institutionId}/publications/`,
    {
      tags: ["institutions", `institution-${institutionId}`, "publications"],
      revalidate: 3600, // Revalidate every hour
      requireAuth: false,
    },
  );

  return response;
}
