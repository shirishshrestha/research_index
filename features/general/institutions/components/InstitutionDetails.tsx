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
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import {
  InstitutionProfileTab,
  MembersTab,
  ResearchTab,
  StatsTab,
} from "./TabDetails";
import type { InstitutionDetail } from "../types";
import { extractErrorMessage } from "@/utils/errorHandling";

interface InstitutionDetailsProps {
  institution?: InstitutionDetail;
}

export function InstitutionDetails({
  institution: serverInstitution,
}: InstitutionDetailsProps) {
  const queryClient = useQueryClient();

  // Mock data for demonstration (fallback if no server data)
  const mockInstitution = {
    name: "KAHS",
    position: "Karnali Academy of Health Sciences (KAHS)",
    affiliation: "Karnali Province",
    verifiedEmail: "kahs.org.np",
    hIndex: 40,
    iIndex: 0,
    citations: 7465,
    about: `The Journal of Karnali Academy of Health Sciences (JKAHS) is a peer-reviewed, open-access journal dedicated to advancing medical and health sciences research in Nepal and beyond. It publishes original research articles, reviews, and case studies that address clinical practice, public health, and biomedical innovation. The journal aims to foster evidence-based healthcare, promote academic integrity, and support the dissemination of knowledge that contributes to improving health outcomes in rural and urban communities alike.`,
    disciplines: [
      "Medical Science",
      "Clinical Research",
      "Public Health",
      "Nursing and Allied Health",
      "Biomedical Research",
    ],
  };

  // Use server data if available, map to component format
  const institution = serverInstitution
    ? {
        name: serverInstitution.institution_name || "Institution Name",
        position: serverInstitution.institution_type?.trim() || "Institution",
        affiliation: (() => {
          const city = serverInstitution.city?.trim();
          const country = serverInstitution.country?.trim();
          const parts = [city, country].filter(Boolean);
          return parts.length > 0 ? parts.join(", ") : "Location not specified";
        })(),
        verifiedEmail: serverInstitution.website?.trim() || "",
        hIndex: serverInstitution.stats?.h_index || 0,
        iIndex: serverInstitution.stats?.i10_index || 0,
        citations: serverInstitution.stats?.total_citations || 0,
        about:
          serverInstitution.description?.trim() || "No description available.",
        disciplines: (() => {
          const areas = serverInstitution.research_areas;
          if (typeof areas === "string") {
            return areas.trim()
              ? areas
                  .split(",")
                  .map((a) => a.trim())
                  .filter(Boolean)
              : [];
          }
          return Array.isArray(areas) ? areas.filter(Boolean) : [];
        })(),
      }
    : mockInstitution;

  // Get follow stats (only if we have a real institution ID and user is authenticated)
  const institutionId = serverInstitution?.id;
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const { data: followStats } = useQuery({
    queryKey: ["follow-stats", institutionId],
    queryFn: () => getFollowStats(institutionId!),
    enabled: !!institutionId && isAuthenticated, // Only fetch if logged in
  });

  // Follow mutation
  const followMutation = useMutation({
    mutationFn: () => followUser(institutionId!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["follow-stats", institutionId],
      });
      toast.success("Successfully followed institution");
    },
    onError: (error: Error) => {
      toast.error(extractErrorMessage(error, "Failed to follow institution"));
    },
  });

  // Unfollow mutation
  const unfollowMutation = useMutation({
    mutationFn: () => unfollowUser(institutionId!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["follow-stats", institutionId],
      });
      toast.success("Successfully unfollowed institution");
    },
    onError: (error: Error) => {
      toast.error(extractErrorMessage(error, "Failed to unfollow institution"));
    },
  });

  const handleFollowToggle = () => {
    // Check authentication before making API call
    if (!isAuthenticated) {
      toast.error("Please log in to follow institutions");
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
            name={institution.name}
            position={institution.position}
            affiliation={institution.affiliation}
            verifiedEmail={institution.verifiedEmail}
            isInstitution
            showFollowButton={!!institutionId}
            isFollowing={followStats?.is_following || false}
            onFollow={handleFollowToggle}
            followLoading={isLoading}
          />
          <ProfileStats
            hIndex={institution.hIndex}
            iIndex={institution.iIndex}
            citations={institution.citations}
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
              content: <InstitutionProfileTab institution={institution} />,
            },
            {
              label: "Research",
              value: "research",
              content: <ResearchTab />,
            },
            {
              label: "Stats",
              value: "stats",
              content: (
                <StatsTab
                  institutionStats={{
                    total_authors:
                      serverInstitution?.total_researchers ||
                      serverInstitution?.stats?.total_authors ||
                      0,
                    total_publications:
                      serverInstitution?.stats?.total_publications || 0,
                    total_citations:
                      serverInstitution?.stats?.total_citations || 0,
                    average_citations_per_paper:
                      serverInstitution?.stats?.average_citations_per_paper ||
                      "0.00",
                    total_reads: serverInstitution?.stats?.total_reads || 0,
                    total_downloads:
                      serverInstitution?.stats?.total_downloads || 0,
                    recommendations_count:
                      serverInstitution?.stats?.recommendations_count || 0,
                  }}
                />
              ),
            },
            {
              label: "Members",
              value: "members",
              content: <MembersTab />,
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
