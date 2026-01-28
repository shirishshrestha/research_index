"use client";

import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { followUser, unfollowUser } from "@/services/follow";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorHandling";
import { useAppSelector } from "@/store";
import type { RootState } from "@/store/store";
import type { FollowResponse, UnfollowResponse } from "@/services/follow";

/**
 * Mutation hook to follow a user with comprehensive invalidation
 */
export const useFollowUserMutation = (
  options?: UseMutationOptions<FollowResponse, Error, number>,
) => {
  const queryClient = useQueryClient();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return useMutation({
    mutationFn: (userId: number) => {
      if (!isAuthenticated) {
        throw new Error("Authentication required");
      }
      return followUser(userId);
    },
    onSuccess: (...args) => {
      const [data, userId] = args;

      // Invalidate all follow-related queries
      queryClient.invalidateQueries({ queryKey: ["follow-stats", userId] });
      queryClient.invalidateQueries({ queryKey: ["follow-stats"] }); // My stats
      queryClient.invalidateQueries({ queryKey: ["user-followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["user-following", userId] });
      queryClient.invalidateQueries({ queryKey: ["user-followers"] }); // My followers
      queryClient.invalidateQueries({ queryKey: ["user-following"] }); // My following

      toast.success("Successfully followed user");
      options?.onSuccess?.(...args);
    },
    onError: (error: Error, ...args) => {
      if (error.message === "Authentication required") {
        toast.error("Please log in to follow users");
      } else {
        toast.error(extractErrorMessage(error, "Failed to follow user"));
      }
      options?.onError?.(error, ...args);
    },
    ...options,
  });
};

/**
 * Mutation hook to unfollow a user with comprehensive invalidation
 */
export const useUnfollowUserMutation = (
  options?: UseMutationOptions<UnfollowResponse, Error, number>,
) => {
  const queryClient = useQueryClient();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return useMutation({
    mutationFn: (userId: number) => {
      if (!isAuthenticated) {
        throw new Error("Authentication required");
      }
      return unfollowUser(userId);
    },
    onSuccess: (...args) => {
      const [data, userId] = args;

      // Invalidate all follow-related queries
      queryClient.invalidateQueries({ queryKey: ["follow-stats", userId] });
      queryClient.invalidateQueries({ queryKey: ["follow-stats"] }); // My stats
      queryClient.invalidateQueries({ queryKey: ["user-followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["user-following", userId] });
      queryClient.invalidateQueries({ queryKey: ["user-followers"] }); // My followers
      queryClient.invalidateQueries({ queryKey: ["user-following"] }); // My following

      toast.success("Successfully unfollowed user");
      options?.onSuccess?.(...args);
    },
    onError: (error: Error, ...args) => {
      if (error.message === "Authentication required") {
        toast.error("Please log in to unfollow users");
      } else {
        toast.error(extractErrorMessage(error, "Failed to unfollow user"));
      }
      options?.onError?.(error, ...args);
    },
    ...options,
  });
};
