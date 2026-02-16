"use client";

import {
  ProfileCard,
  ProfileStats,
  ProfileTabs,
} from "@/features/shared/components/profile";
import {
  ExportButton,
  ShareButton,
} from "@/features/shared/components/export-share";
import { useFollowToggle } from "@/features/shared/hooks";
import {
  AuthorProfileTab,
  FollowingTab,
  ResearchTab,
  StatsTab,
} from "./TabDetails";
import type { AuthorDetail } from "../types";

interface AuthorDetailsProps {
  author: AuthorDetail;
}

export function AuthorDetails({ author }: AuthorDetailsProps) {
  const { isFollowing, isLoading, toggle } = useFollowToggle(author.id);

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
            isFollowing={isFollowing}
            onFollow={toggle}
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
              content: <StatsTab author={author} />,
            },
            {
              label: "Following",
              value: "following",
              content: <FollowingTab />,
            },
          ]}
          moreOptions={
            <div className="flex items-center gap-3 w-full justify-end">
              <ExportButton entityId={author.id} entityType="author" />
              <ShareButton
                entityId={author.id}
                entityType="author"
                entityTitle={author.full_name}
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
