"use client";

import { createCurrentUserQueryOptions } from "@/features/shared";
import {
  InstitutionCharts,
  InstitutionStatsCards,
} from "@/features/panel/institution/dashboard/components";
import { PanelContainer, PanelErrorCard } from "@/features/shared";
import { useQuery } from "@tanstack/react-query";

export default function InstitutionDashboard() {
  const { data, isPending, isError } = useQuery(createCurrentUserQueryOptions);

  if (
    isError ||
    (!isPending &&
      (!data?.profile?.stats || data.profile.user_type !== "institution"))
  ) {
    return (
      <PanelErrorCard
        title="Institution Dashboard"
        description="Manage your institution profile and publications"
      />
    );
  }

  // Type narrowing - now TypeScript knows profile is InstitutionProfile
  const institutionProfile = data?.profile;

  return (
    <PanelContainer>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">
          Institution Dashboard
        </h1>
        <p className="mt-2 text-text-gray">
          Welcome back,{" "}
          {(institutionProfile && "institution_name" in institutionProfile
            ? institutionProfile.institution_name
            : institutionProfile?.email) || ""}
        </p>
      </div>

      {/* Stats Cards */}
      <InstitutionStatsCards
        stats={institutionProfile?.stats || ({} as any)}
        pending={isPending}
      />

      {/* Charts */}
      <InstitutionCharts
        stats={institutionProfile?.stats || ({} as any)}
        isPending={isPending}
      />
    </PanelContainer>
  );
}
