"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Category, CategoryFilter, ListCard } from "@/features/shared";
import { useUserFollowers, useUserFollowing } from "@/features/shared/hooks";
import type { FollowerUser, FollowingUser } from "@/services/follow";

const categories: Category[] = [
  { label: "Followers", value: "followers" },
  { label: "Following", value: "following" },
];

export const FollowingTab = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const authorId = Number(params?.id);
  const activeCategory = searchParams.get("category") || "followers";

  // Fetch followers
  const { data: followers = [], isLoading: loadingFollowers } =
    useUserFollowers(activeCategory === "followers" ? authorId : undefined);

  // Fetch following
  const { data: following = [], isLoading: loadingFollowing } =
    useUserFollowing(activeCategory === "following" ? authorId : undefined);

  // Update categories with counts
  const updatedCategories = categories.map((cat) => ({
    ...cat,
    count:
      cat.value === "followers"
        ? followers.length
        : cat.value === "following"
          ? following.length
          : undefined,
  }));

  const isLoading = loadingFollowers || loadingFollowing;

  // Transform follower/following data to ListCard format
  const displayData =
    activeCategory === "followers"
      ? followers.map((follower: FollowerUser) => {
          const user = follower.user;
          return {
            id: String(user.id),
            userId: user.id,
            name: user.name || "Unknown User",
            position:
              user.user_type === "author"
                ? user.user_profile_type?.designation || "Author"
                : user.user_profile_type?.institution_name || "Institution",
            verifiedAffiliation: user.email
              ? `Verified ${user.email}`
              : undefined,
            imageUrl: user.profile_picture || undefined,
            href:
              user.user_type === "author"
                ? `/authors/${user.id}`
                : `/institutions/${user.id}`,
            showBrowseButtons: user.user_type === "author",
          };
        })
      : following.map((follow: FollowingUser) => {
          const user = follow.user;
          return {
            id: String(user.id),
            userId: user.id,
            name: user.name || "Unknown User",
            position:
              user.user_type === "author"
                ? user.user_profile_type?.designation || "Author"
                : user.user_profile_type?.institution_name || "Institution",
            verifiedAffiliation: user.email
              ? `Verified ${user.email}`
              : undefined,
            imageUrl: user.profile_picture || undefined,
            href:
              user.user_type === "author"
                ? `/authors/${user.id}`
                : `/institutions/${user.id}`,
            showBrowseButtons: user.user_type === "author",
          };
        });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[287px_1fr] gap-6">
      <aside className="">
        <div className="flex flex-col gap-1.25 sticky top-32">
          <CategoryFilter categories={updatedCategories} />
        </div>
      </aside>
      <aside className="space-y-6.25">
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-text-gray">Loading...</p>
          </div>
        ) : displayData.length > 0 ? (
          displayData.map((user) => <ListCard key={user.id} {...user} />)
        ) : (
          <div className="text-center py-8">
            <p className="text-text-gray">
              No {activeCategory === "followers" ? "followers" : "following"}{" "}
              yet
            </p>
          </div>
        )}
      </aside>
    </div>
  );
};
