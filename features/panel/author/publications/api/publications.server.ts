/**
 * Server-side publications API helpers
 * These functions run only on the server and use Next.js fetch with cache tags
 */

import { serverGet } from "@/lib/server-api";
import type { Publication } from "../types";
import type { PaginatedResponse } from "@/types/pagination";

/**
 * Fetch all publications for the authenticated author (server-side)
 * This is used for server-side rendering of the author's publications list
 * Requires authentication token from cookies
 */
export async function getAuthorPublications(): Promise<
  PaginatedResponse<Publication>
> {
  const response = await serverGet<PaginatedResponse<Publication>>(
    "/publications/",
    {
      tags: ["author-publications"],
    },
  );

  return response;
}

/**
 * Fetch a single publication by ID for the authenticated author
 * @param id - Publication ID
 */
export async function getAuthorPublication(id: number): Promise<Publication> {
  const response = await serverGet<Publication>(`/publications/${id}/`, {
    tags: ["author-publications", `publication-${id}`],
  });

  return response;
}
