import { api } from "./api";

export interface FollowUser {
  following: number;
}

export interface FollowResponse {
  message: string;
  follow: {
    id: number;
    follower: number;
    following: number;
    created_at: string;
  };
}

export interface UnfollowResponse {
  message: string;
}

export interface FollowStats {
  followers_count: number;
  following_count: number;
  is_following?: boolean;
}

export interface UserProfileType {
  institute?: string;
  designation?: string;
  institution_name?: string;
}

export interface FollowerUser {
  id: number;
  user: {
    id: number;
    email: string;
    user_type: "author" | "institution";
    name: string;
    profile_picture: string | null;
    user_profile_type: UserProfileType;
  };
  created_at: string;
}

export interface FollowingUser {
  id: number;
  user: {
    id: number;
    email: string;
    user_type: "author" | "institution";
    name: string;
    profile_picture: string | null;
    user_profile_type: UserProfileType;
  };
  created_at: string;
}

/**
 * Follow a user (author or institution)
 */
export const followUser = async (userId: number): Promise<FollowResponse> => {
  return await api.post<FollowResponse>("/auth/follow/", {
    following: userId,
  });
};

/**
 * Unfollow a user
 */
export const unfollowUser = async (
  userId: number,
): Promise<UnfollowResponse> => {
  return await api.delete<UnfollowResponse>(`/auth/unfollow/${userId}/`);
};

/**
 * Get follow statistics for a user
 */
export const getFollowStats = async (userId?: number): Promise<FollowStats> => {
  const endpoint = userId
    ? `/auth/users/${userId}/follow-stats/`
    : "/auth/follow-stats/";
  return await api.get<FollowStats>(endpoint);
};

/**
 * Get list of followers (who follows me)
 */
export const getMyFollowers = async (): Promise<FollowerUser[]> => {
  return await api.get<FollowerUser[]>("/auth/followers/");
};

/**
 * Get list of users I'm following
 */
export const getMyFollowing = async (): Promise<FollowingUser[]> => {
  return await api.get<FollowingUser[]>("/auth/following/");
};

/**
 * Get list of a specific user's followers
 */
export const getUserFollowers = async (
  userId: number,
): Promise<FollowerUser[]> => {
  return await api.get<FollowerUser[]>(`/auth/users/${userId}/followers/`);
};

/**
 * Get list of users a specific user is following
 */
export const getUserFollowing = async (
  userId: number,
): Promise<FollowingUser[]> => {
  return await api.get<FollowingUser[]>(`/auth/users/${userId}/following/`);
};
