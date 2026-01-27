"use client";

import {
  ProfileCard,
  ProfileStats,
  ProfileTabs,
} from "@/features/shared/components/profile";
import { ChevronDown } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followUser, unfollowUser, getFollowStats } from "@/services/follow";
import { toast } from "sonner";
import type { RootState } from "@/store/store";
import {
  AuthorProfileTab,
  FollowingTab,
  ResearchTab,
  StatsTab,
} from "./TabDetails";
import type { AuthorDetail } from "../types";
import { useAppSelector } from "@/store";
import { extractErrorMessage } from "@/utils/errorHandling";

interface AuthorDetailsProps {
  author: AuthorDetail;
}

export function AuthorDetails({ author }: AuthorDetailsProps) {
  const queryClient = useQueryClient();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  // Get follow stats - only if user is authenticated
  const { data: followStats } = useQuery({
    queryKey: ["follow-stats", author.id],
    queryFn: () => getFollowStats(author.id),
    enabled: isAuthenticated, // Only fetch if logged in
  });

  // Follow mutation
  const followMutation = useMutation({
    mutationFn: () => followUser(author.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follow-stats", author.id] });
      toast.success("Successfully followed author");
    },
    onError: (error: Error) => {
      toast.error(extractErrorMessage(error, "Failed to follow author"));
    },
  });

  // Unfollow mutation
  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(author.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["follow-stats", author.id] });
      toast.success("Successfully unfollowed author");
    },
    onError: (error: Error) => {
      toast.error(extractErrorMessage(error, "Failed to unfollow author"));
    },
  });

  const handleFollowToggle = () => {
    // Check authentication before making API call
    if (!isAuthenticated) {
      toast.error("Please log in to follow authors");
      return;
    }

    if (followStats?.is_following) {
      unfollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  const isLoading = followMutation.isPending || unfollowMutation.isPending;

  return (
    <div className="section-padding pt-0!">
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 xl:gap-20">
          <ProfileCard
            name={`${author.title} ${author.full_name}`}
            position={author.designation}
            affiliation={author.institute}
            verifiedEmail={author.website || undefined}
            profilePicture={author.profile_picture_url || undefined}
            bio={author.bio}
            showFollowButton={true}
            isFollowing={followStats?.is_following || false}
            onFollow={handleFollowToggle}
            followLoading={isLoading}
            socialLinks={{
              orcid: author.orcid || undefined,
              googleScholar: author.google_scholar || undefined,
              researchgate: author.researchgate || undefined,
              linkedin: author.linkedin || undefined,
              website: author.website || undefined,
            }}
          />
          <ProfileStats
            hIndex={author.stats?.h_index || 0}
            iIndex={author.stats?.i10_index || 0}
            citations={author.stats?.total_citations || 0}
            publications={author.publications_count}
            reads={author.stats?.total_reads}
            downloads={author.stats?.total_downloads}
          />
        </div>
      </div>
      <div className="">
        <ProfileTabs
          clearParamsOnTabSwitch={{ research: ["category"] }}
          tabs={[
            {
              label: "Profile",
              value: "profile",
              content: (
                <AuthorProfileTab
                  author={{
                    name: `${author.title} ${author.full_name}`,
                    position: author.designation,
                    affiliation: author.institute,
                    verifiedEmail: "",
                    hIndex: author.stats?.h_index || 0,
                    iIndex: author.stats?.i10_index || 0,
                    citations: author.stats?.total_citations || 0,
                    about: author.bio,
                    disciplines: Array.isArray(author.research_interests)
                      ? author.research_interests
                      : author.research_interests
                        ? author.research_interests
                            .split(",")
                            .map((d) => d.trim())
                            .filter(Boolean)
                        : [],
                  }}
                />
              ),
            },
            {
              label: "Research",
              value: "research",
              content: <ResearchTab authorId={author.id} />,
            },
            {
              label: "Reviews",
              value: "reviews",
              content: (
                <div className="text-center py-16">
                  <p className="text-text-gray">
                    Reviews will be displayed here
                  </p>
                </div>
              ),
            },
            {
              label: "Stats",
              value: "stats",
              content: (
                <StatsTab
                  authorStats={{
                    h_index: author.stats?.h_index || 0,
                    i10_index: author.stats?.i10_index || 0,
                    total_citations: author.stats?.total_citations || 0,
                    total_publications: author.publications_count,
                    total_reads: author.stats?.total_reads || 0,
                    total_downloads: author.stats?.total_downloads || 0,
                  }}
                />
              ),
            },
            {
              label: "Following",
              value: "following",
              content: <FollowingTab />,
            },
          ]}
          moreOptions={
            <div>
              <p className="flex items-center gap-1.5 heading-para">
                More <ChevronDown className="stroke-[1.6px] " size={18} />
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}
