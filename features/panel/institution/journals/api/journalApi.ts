import { api } from "@/services/api";
import type {
  Journal,
  JournalListItem,
  JournalFormData,
  JournalCreateResponse,
  JournalUpdateResponse,
  JournalDeleteResponse,
  JournalStats,
} from "../types";

const JOURNALS_ENDPOINT = "/publications/journals/";

/**
 * Get all journals for the authenticated institution
 */
export const getJournals = async (): Promise<JournalListItem[]> => {
  return api.get<JournalListItem[]>(JOURNALS_ENDPOINT);
};

/**
 * Get a specific journal by ID
 */
export const getJournal = async (id: number): Promise<Journal> => {
  return api.get<Journal>(`${JOURNALS_ENDPOINT}${id}/`);
};

/**
 * Create a new journal
 */
export const createJournal = async (
  data: JournalFormData,
): Promise<JournalCreateResponse> => {
  const formData = new FormData();

  // Append all fields to FormData
  Object.entries(data).forEach(([key, value]) => {
    if (key === "cover_image" && value instanceof File) {
      formData.append(key, value);
    } else if (key === "editorial_board_data") {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return api.post<JournalCreateResponse>(JOURNALS_ENDPOINT, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Update an existing journal
 */
export const updateJournal = async (
  id: number,
  data: Partial<JournalFormData>,
): Promise<JournalUpdateResponse> => {
  const formData = new FormData();

  // Append all fields to FormData
  Object.entries(data).forEach(([key, value]) => {
    if (key === "cover_image" && value instanceof File) {
      formData.append(key, value);
    } else if (key === "editorial_board_data") {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return api.patch<JournalUpdateResponse>(
    `${JOURNALS_ENDPOINT}${id}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

/**
 * Delete a journal
 */
export const deleteJournal = async (
  id: number,
): Promise<JournalDeleteResponse> => {
  return api.delete<JournalDeleteResponse>(`${JOURNALS_ENDPOINT}${id}/`);
};

/**
 * Get journal stats
 */
export const getJournalStats = async (id: number): Promise<JournalStats> => {
  return api.get<JournalStats>(`${JOURNALS_ENDPOINT}${id}/stats/`);
};

/**
 * Update journal stats
 */
export const updateJournalStats = async (
  id: number,
  data: Partial<JournalStats>,
): Promise<{ message: string; stats: JournalStats }> => {
  return api.patch<{ message: string; stats: JournalStats }>(
    `${JOURNALS_ENDPOINT}${id}/stats/`,
    data,
  );
};
