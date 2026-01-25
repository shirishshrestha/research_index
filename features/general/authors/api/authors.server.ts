import { serverGet } from "@/lib/server-api";
import type { Author, AuthorDetail, AuthorFilters } from "../types";

/**
 * Fetch all authors (public endpoint)
 * @param filters - Optional filters for institute, designation, and search
 */
export async function getPublicAuthors(
  filters?: AuthorFilters,
): Promise<Author[]> {
  const params = new URLSearchParams();

  if (filters?.institute) {
    params.append("institute", filters.institute);
  }
  if (filters?.designation) {
    params.append("designation", filters.designation);
  }
  if (filters?.search) {
    params.append("search", filters.search);
  }

  const endpoint = `/publications/authors/public/${params.toString() ? `?${params.toString()}` : ""}`;

  const response = await serverGet<Author[]>(endpoint, {
    tags: ["authors"],
    revalidate: 3600, // Revalidate every hour
  });

  return response;
}

/**
 * Fetch a single author by ID (public endpoint)
 * @param id - Author ID
 */
export async function getPublicAuthor(
  id: number | string,
): Promise<AuthorDetail> {
  const response = await serverGet<AuthorDetail>(
    `/publications/authors/public/${id}/`,
    {
      tags: ["authors", `author-${id}`],
      revalidate: 3600, // Revalidate every hour
    },
  );

  return response;
}
