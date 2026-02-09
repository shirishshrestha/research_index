/**
 * Server-side articles API helpers (public publications)
 * These functions run only on the server and use Next.js fetch with cache tags
 */

import { serverGet } from "@/lib/server-api";
import type { Publication, PublicationFilters } from "../types";

/**
 * Fetch all published publications (public endpoint)
 * Supports comprehensive filtering by type, topic, author, year, journal, citations, and more
 * @param filters - Optional filter parameters
 */
export async function getPublicPublications(
  filters?: PublicationFilters,
): Promise<Publication[]> {
  const params = new URLSearchParams();

  if (filters?.type) params.append("type", filters.type);
  if (filters?.topic_branch)
    params.append("topic_branch", filters.topic_branch.toString());
  if (filters?.topic) params.append("topic", filters.topic.toString());
  if (filters?.author) params.append("author", filters.author.toString());
  if (filters?.journal) params.append("journal", filters.journal.toString());
  if (filters?.year) params.append("year", filters.year.toString());
  if (filters?.year_from) params.append("year_from", filters.year_from.toString());
  if (filters?.year_to) params.append("year_to", filters.year_to.toString());
  if (filters?.publisher) params.append("publisher", filters.publisher);
  if (filters?.min_citations) params.append("min_citations", filters.min_citations.toString());
  if (filters?.h_index_min) params.append("h_index_min", filters.h_index_min.toString());
  if (filters?.h_index_max) params.append("h_index_max", filters.h_index_max.toString());
  if (filters?.has_doi !== undefined) params.append("has_doi", filters.has_doi.toString());
  if (filters?.has_pdf !== undefined) params.append("has_pdf", filters.has_pdf.toString());
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
  const response = await serverGet<Publication>(`/publications/${id}/`, {
    requireAuth: false, // Try public first
    tags: ["public-articles", `article-${id}`],
    revalidate: 300,
  });

  return response;
}
