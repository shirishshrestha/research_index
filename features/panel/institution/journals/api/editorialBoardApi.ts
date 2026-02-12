import { api } from "@/services/api";
import type {
  EditorialBoardMember,
  EditorialBoardMemberFormData,
} from "../types";

/**
 * Get editorial board members for a journal
 */
export const getEditorialBoardMembers = async (
  journalId: number,
): Promise<EditorialBoardMember[]> => {
  return api.get<EditorialBoardMember[]>(
    `/publications/journals/${journalId}/editorial-board/`,
  );
};

/**
 * Get a single editorial board member
 */
export const getEditorialBoardMember = async (
  journalId: number,
  memberId: number,
): Promise<EditorialBoardMember> => {
  return api.get<EditorialBoardMember>(
    `/publications/journals/${journalId}/editorial-board/${memberId}/`,
  );
};

/**
 * Create a new editorial board member
 */
export const createEditorialBoardMember = async (
  journalId: number,
  data: EditorialBoardMemberFormData,
): Promise<{ message: string; member: EditorialBoardMember }> => {
  const formData = new FormData();

  // Append all fields to FormData
  Object.entries(data).forEach(([key, value]) => {
    if (key === "photo" && value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null && value !== "") {
      formData.append(key, String(value));
    }
  });

  return api.post<{ message: string; member: EditorialBoardMember }>(
    `/publications/journals/${journalId}/editorial-board/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

/**
 * Update an editorial board member
 */
export const updateEditorialBoardMember = async (
  journalId: number,
  memberId: number,
  data: Partial<EditorialBoardMemberFormData>,
): Promise<{ message: string; member: EditorialBoardMember }> => {
  const formData = new FormData();

  // Append all fields to FormData
  Object.entries(data).forEach(([key, value]) => {
    if (key === "photo" && value instanceof File) {
      formData.append(key, value);
    } else if (value !== undefined && value !== null && value !== "") {
      formData.append(key, String(value));
    }
  });

  return api.patch<{ message: string; member: EditorialBoardMember }>(
    `/publications/journals/${journalId}/editorial-board/${memberId}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

/**
 * Delete an editorial board member
 */
export const deleteEditorialBoardMember = async (
  journalId: number,
  memberId: number,
): Promise<{ message: string }> => {
  return api.delete<{ message: string }>(
    `/publications/journals/${journalId}/editorial-board/${memberId}/`,
  );
};
