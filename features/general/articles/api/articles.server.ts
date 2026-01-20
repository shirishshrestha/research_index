/**
 * Server-side articles API helpers (public publications)
 * These functions run only on the server and use Next.js fetch with cache tags
 */

import { serverGet } from "@/lib/server-api";
import type { Publication, PublicationFilters } from "../types";

/**
 * Fetch all published publications (public endpoint)
 * Supports filtering by type, topic_branch, author, and search
 * @param filters - Optional filter parameters
 */
export async function getPublicPublications(
  filters?: PublicationFilters,
): Promise<Publication[]> {
  const params = new URLSearchParams();

  if (filters?.type) params.append("type", filters.type);
  if (filters?.topic_branch)
    params.append("topic_branch", filters.topic_branch.toString());
  if (filters?.author) params.append("author", filters.author.toString());
  if (filters?.search) params.append("search", filters.search);

  const queryString = params.toString();
  const endpoint = `/publications/public/${queryString ? `?${queryString}` : ""}`;

  const response = await serverGet<Publication[]>(endpoint, {
    requireAuth: false, // Public endpoint
    tags: ["public-publications"],
    revalidate: 300, // Revalidate every 5 minutes
  });

  return response;
}

/**
 * Fetch publications for a specific journal (public endpoint)
 * @param journalId - Journal ID
 * @param filters - Optional filter parameters (type, issue, search)
 */
export async function getJournalPublications(
  journalId: number,
  filters?: { type?: string; issue?: number; search?: string },
): Promise<Publication[]> {
  const params = new URLSearchParams();

  if (filters?.type) params.append("type", filters.type);
  if (filters?.issue) params.append("issue", filters.issue.toString());
  if (filters?.search) params.append("search", filters.search);

  const queryString = params.toString();
  const endpoint = `/publications/journals/${journalId}/publications/${queryString ? `?${queryString}` : ""}`;

  const response = await serverGet<Publication[]>(endpoint, {
    requireAuth: false, // Public endpoint
    tags: ["journal-publications", `journal-${journalId}`],
    revalidate: 300, // Revalidate every 5 minutes
  });

  return response;
}

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
      revalidate: 300,
    },
  );

  return response;
}

/**
 * Fetch a single published publication by ID (public view)
 * @param id - Publication ID
 */
export async function getPublicArticle(id: number): Promise<Publication> {
  const response = await serverGet<Publication>(`/publications/public/${id}/`, {
    requireAuth: false, // Public endpoint
    tags: ["public-articles", `article-${id}`],
    revalidate: 300,
  });

  return response;
}
