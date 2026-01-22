import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Attempt to refresh the access token using the refresh token
 * Returns the new access token or null if refresh failed
 */
async function refreshAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    // Server-side fetch doesn't auto-include cookies, so we need to send them manually
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refresh_token=${refreshToken}`,
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Return the new access token
    // Note: The backend sets the cookie via Set-Cookie header
    // We just return the token value to use in the Authorization header
    if (data.access) {
      return data.access;
    }

    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
}

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

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers,
    next: {
      tags: options?.tags,
      revalidate: options?.revalidate,
    },
  });

  // If we get 401 and auth is required, try to refresh the token
  if (response.status === 401 && options?.requireAuth !== false) {
    const newAccessToken = await refreshAccessToken();

    if (newAccessToken) {
      // Retry the original request with new token
      headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers,
        next: {
          tags: options?.tags,
          revalidate: options?.revalidate,
        },
      });
    } else {
      redirect("/login");
    }
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || error.message || "Request failed");
  }

  return response.json();
}
