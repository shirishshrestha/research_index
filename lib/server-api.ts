import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverGet<T = unknown>(
  endpoint: string,
  options?: {
    tags?: string[];
    revalidate?: number | false;
    requireAuth?: boolean; // Set to false for public endpoints
  },
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  // Build headers - only add auth for endpoints that require it (default: true)
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add auth header if required (default behavior) and token exists
  if (options?.requireAuth !== false && accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers,
    next: {
      tags: options?.tags,
      revalidate: options?.revalidate,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.message || "Invalid token");
  }

  return response.json();
}
