/**
 * Server-side API calls for topics
 * Uses native fetch() with Next.js caching
 * Should only be used in Server Components
 */

import { serverGet } from "@/lib/server-api";
import type { TopicTree, Topic } from "../types";

/**
 * Fetch topics tree with nested branches
 * Uses Next.js cache tags for revalidation
 *
 * @param search - Optional search query to filter topics and branches
 * @returns Promise resolving to topics tree
 * @example
 * ```ts
 * const topics = await getTopicsTree();
 * const searchedTopics = await getTopicsTree("technology");
 * ```
 */
export async function getTopicsTree(search?: string): Promise<TopicTree> {
  const searchParam = search ? `?search=${encodeURIComponent(search)}` : "";
  return serverGet<TopicTree>(`/publications/topics/tree/${searchParam}`, {
    tags: ["topics-tree"],
    requireAuth: false, // Topics are public - no auth required
  });
}

/**
 * Fetch a specific topic by ID
 * Uses Next.js cache tags for revalidation
 *
 * @param id - Topic ID
 * @returns Promise resolving to topic with nested branches
 * @example
 * ```ts
 * const topic = await getTopic("7");
 * ```
 */
export async function getTopic(id: string): Promise<Topic | null> {
  try {
    const topicsTree = await getTopicsTree();
    return topicsTree.find((topic) => topic.id.toString() === id) || null;
  } catch (error) {
    console.error("Failed to fetch topic:", error);
    return null;
  }
}
