import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  followUser,
  unfollowUser,
  getFollowStats,
  getUserFollowers,
  getUserFollowing,
} from "@/services/follow";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorHandling";
import { useAppSelector } from "@/store";
import type { RootState } from "@/store/store";

/**
 * Hook to get follow statistics for a user
 */
export function useFollowStats(userId?: number) {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return useQuery({
    queryKey: ["follow-stats", userId],
    queryFn: () => getFollowStats(userId),
    enabled: isAuthenticated && !!userId,
  });
}

/**
 * Hook to follow a user with proper invalidation
 */
export function useFollowUser() {
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
    onSuccess: (_, userId) => {
      // Invalidate all follow-related queries
      queryClient.invalidateQueries({ queryKey: ["follow-stats", userId] });
      queryClient.invalidateQueries({ queryKey: ["follow-stats"] }); // My stats
      queryClient.invalidateQueries({ queryKey: ["user-followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["user-following", userId] });
      queryClient.invalidateQueries({ queryKey: ["user-followers"] }); // My followers
      queryClient.invalidateQueries({ queryKey: ["user-following"] }); // My following

      toast.success("Successfully followed user");
    },
    onError: (error: Error) => {
      if (error.message === "Authentication required") {
        toast.error("Please log in to follow users");
      } else {
        toast.error(extractErrorMessage(error, "Failed to follow user"));
      }
    },
  });
}

/**
 * Hook to unfollow a user with proper invalidation
 */
export function useUnfollowUser() {
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
    onSuccess: (_, userId) => {
      // Invalidate all follow-related queries
      queryClient.invalidateQueries({ queryKey: ["follow-stats", userId] });
      queryClient.invalidateQueries({ queryKey: ["follow-stats"] }); // My stats
      queryClient.invalidateQueries({ queryKey: ["user-followers", userId] });
      queryClient.invalidateQueries({ queryKey: ["user-following", userId] });
      queryClient.invalidateQueries({ queryKey: ["user-followers"] }); // My followers
      queryClient.invalidateQueries({ queryKey: ["user-following"] }); // My following

      toast.success("Successfully unfollowed user");
    },
    onError: (error: Error) => {
      if (error.message === "Authentication required") {
        toast.error("Please log in to unfollow users");
      } else {
        toast.error(extractErrorMessage(error, "Failed to unfollow user"));
      }
    },
  });
}

/**
 * Hook to get user followers
 */
export function useUserFollowers(userId?: number) {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return useQuery({
    queryKey: ["user-followers", userId],
    queryFn: () => getUserFollowers(userId!),
    enabled: isAuthenticated && !!userId,
  });
}

/**
 * Hook to get user following
 */
export function useUserFollowing(userId?: number) {
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return useQuery({
    queryKey: ["user-following", userId],
    queryFn: () => getUserFollowing(userId!),
    enabled: isAuthenticated && !!userId,
  });
}

/**
 * Combined hook for follow/unfollow toggle with state management
 */
export function useFollowToggle(userId: number) {
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();
  const { data: followStats } = useFollowStats(userId);
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const handleToggle = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to follow users");
      return;
    }

    if (followStats?.is_following) {
      unfollowMutation.mutate(userId);
    } else {
      followMutation.mutate(userId);
    }
  };

  return {
    isFollowing: followStats?.is_following || false,
    isLoading: followMutation.isPending || unfollowMutation.isPending,
    toggle: handleToggle,
    followersCount: followStats?.followers_count || 0,
    followingCount: followStats?.following_count || 0,
  };
}
