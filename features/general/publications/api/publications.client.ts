import { useQuery } from "@tanstack/react-query";
import type { Publication } from "@/features/panel/author/publications/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAuthorPublications(
  authorId: number | string,
): Promise<Publication[]> {
  const response = await fetch(
    `${API_BASE_URL}/publications/authors/public/${authorId}/publications/`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch author publications: ${response.statusText}`,
    );
  }

  return response.json();
}

async function fetchInstitutionPublications(
  institutionId: number | string,
): Promise<Publication[]> {
  const response = await fetch(
    `${API_BASE_URL}/publications/institutions/public/${institutionId}/publications/`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch institution publications: ${response.statusText}`,
    );
  }

  return response.json();
}

export function useAuthorPublications(authorId?: number | string) {
  return useQuery({
    queryKey: ["author-publications", authorId],
    queryFn: () => fetchAuthorPublications(authorId!),
    enabled: !!authorId,
  });
}

export function useInstitutionPublications(institutionId?: number | string) {
  return useQuery({
    queryKey: ["institution-publications", institutionId],
    queryFn: () => fetchInstitutionPublications(institutionId!),
    enabled: !!institutionId,
  });
}
