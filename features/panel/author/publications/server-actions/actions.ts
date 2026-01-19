/**
 * Server actions for publications
 * These actions run on the server and are called from client components after mutations
 */

"use server";

import { revalidateTag } from "next/cache";

/**
 * Revalidate author publications cache
 * Call this after creating, updating, or deleting a publication
 */
export async function revalidateAuthorPublications() {
  revalidateTag("author-publications", "max");
}

/**
 * Revalidate a specific publication
 * Call this after updating a specific publication
 * @param id - Publication ID
 */
export async function revalidatePublication(id: number) {
  revalidateTag(`publication-${id}`, "max");
  revalidateTag("author-publications", "max");
}

/**
 * Revalidate public articles cache
 * Call this when a publication's is_published status changes
 * or when publications are added/removed that affect public listings
 */
export async function revalidatePublicArticles() {
  revalidateTag("public-articles", "max");
}

/**
 * Revalidate all publications-related caches
 * Use this for operations that affect both author and public views
 */
export async function revalidateAllPublications() {
  revalidateTag("author-publications", "max");
  revalidateTag("public-articles", "max");
}
