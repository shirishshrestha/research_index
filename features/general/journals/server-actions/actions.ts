"use server";

import { revalidateTag } from "next/cache";

/**
 * Server Action: Revalidate journals cache
 * Call this after creating or updating journals
 */
export async function revalidateJournalsAction(): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag("journals", "default");

    return { revalidated: true };
  } catch (error) {
    console.error("Failed to revalidate journals cache:", error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Revalidate a specific journal by ID
 */
export async function revalidateJournalAction(id: number | string): Promise<{
  revalidated: boolean;
  error?: string;
}> {
  try {
    revalidateTag(`journal-${id}`, "default");
    revalidateTag("journals", "default");

    return { revalidated: true };
  } catch (error) {
    console.error(`Failed to revalidate journal ${id}:`, error);
    return {
      revalidated: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
