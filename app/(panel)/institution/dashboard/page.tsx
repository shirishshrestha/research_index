"use client";

import { createCurrentUserQueryOptions } from "@/features/shared";
import {
  InstitutionCharts,
  InstitutionStatsCards,
} from "@/features/panel/institution/dashboard/components";
import {
  PanelContainer,
  PanelErrorCard,
  PanelLoadingSkeleton,
} from "@/features/shared";
import { useQuery } from "@tanstack/react-query";

export default function InstitutionDashboard() {
  const { data, isLoading, isError } = useQuery(createCurrentUserQueryOptions);

  if (isLoading) {
    return (
      <PanelLoadingSkeleton
        title="Institution Dashboard"
        description="Manage your institution profile and publications"
        statsCount={7}
      />
    );
  }

  if (
    isError ||
    !data?.profile?.stats ||
    data.profile.user_type !== "institution"
  ) {
    return (
      <PanelErrorCard
        title="Institution Dashboard"
        description="Manage your institution profile and publications"
      />
    );
  }

  // Type narrowing - now TypeScript knows profile is InstitutionProfile
  const institutionProfile = data.profile;

  return (
    <PanelContainer>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">
          Institution Dashboard
        </h1>
        <p className="mt-2 text-text-gray">
          Welcome back,{" "}
          {institutionProfile.institution_name || institutionProfile.email}
        </p>
      </div>

      {/* Stats Cards */}
      <InstitutionStatsCards stats={institutionProfile.stats} />

      {/* Charts */}
      <InstitutionCharts stats={institutionProfile.stats} />
    </PanelContainer>
  );
}
