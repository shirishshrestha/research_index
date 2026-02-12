import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorHandling";
import {
  createEditorialBoardMember,
  updateEditorialBoardMember,
  deleteEditorialBoardMember,
} from "../api";
import type { EditorialBoardMemberFormData } from "../types";

export const useCreateEditorialBoardMemberMutation = (journalId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EditorialBoardMemberFormData & { photo?: File }) =>
      createEditorialBoardMember(journalId, data),
    onSuccess: (data) => {
      toast.success(
        data.message || "Editorial board member added successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["journal", journalId] });
    },
    onError: (error: Error) => {
      toast.error(
        extractErrorMessage(error, "Failed to add editorial board member"),
      );
    },
  });
};

export const useUpdateEditorialBoardMemberMutation = (
  journalId: number,
  memberId: number,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: Partial<EditorialBoardMemberFormData> & { photo?: File },
    ) => updateEditorialBoardMember(journalId, memberId, data),
    onSuccess: (data) => {
      toast.success(
        data.message || "Editorial board member updated successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["journal", journalId] });
    },
    onError: (error: Error) => {
      toast.error(
        extractErrorMessage(error, "Failed to update editorial board member"),
      );
    },
  });
};

export const useDeleteEditorialBoardMemberMutation = (journalId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberId: number) =>
      deleteEditorialBoardMember(journalId, memberId),
    onSuccess: (data) => {
      toast.success(
        data.message || "Editorial board member deleted successfully",
      );
      queryClient.invalidateQueries({ queryKey: ["journal", journalId] });
    },
    onError: (error: Error) => {
      toast.error(
        extractErrorMessage(error, "Failed to delete editorial board member"),
      );
    },
  });
};
