/**
 * Server-side articles API helpers (public publications)
 * These functions run only on the server and use Next.js fetch with cache tags
 */

import { serverGet } from "@/lib/server-api";
import type { Publication } from "@/features/panel/author/publications/types";

/**
 * Fetch all published publications by topic branch (public endpoint)
 * This is used for public articles listing pages
 * @param topicId - Topic ID
 * @param branchId - Branch ID
 */
export async function getPublicationsByBranch(
  topicId: number,
  branchId: number,
): Promise<Publication[]> {
  const response = await serverGet<Publication[]>(
    `/publications/topics/${topicId}/branches/${branchId}/publications/`,
    {
      requireAuth: false, // Public endpoint
      tags: ["public-articles", `topic-${topicId}`, `branch-${branchId}`],
    },
  );

  return response;
}

/**
 * Fetch a single published publication by ID (public view)
 * For now, we'll use the same endpoint as author but filter by is_published
 * In production, you might want a dedicated public endpoint
 * @param id - Publication ID
 */
export async function getPublicArticle(id: number): Promise<Publication> {
  const response = await serverGet<Publication>(`/publications/${id}/`, {
    requireAuth: false, // Try public first
    tags: ["public-articles", `article-${id}`],
  });

  return response;
}

// TODO: When backend adds a general public publications list endpoint (with filters),
// add that helper here. For now, we'll use topic-branch filtering.
