"use client";

import {
  AuthorCharts,
  AuthorStatsCards,
} from "@/features/panel/author/dashboard/components";
import { createCurrentUserQueryOptions } from "@/features/shared";
import {
  PanelContainer,
  PanelErrorCard,
  PanelLoadingSkeleton,
} from "@/features/shared";
import { useQuery } from "@tanstack/react-query";

export default function AuthorDashboard() {
  const { data, isPending, isError } = useQuery(createCurrentUserQueryOptions);

  if (isPending) {
    return (
      <PanelLoadingSkeleton
        title="Author Dashboard"
        description="Manage your research profile and publications"
        statsCount={8}
      />
    );
  }

  if (isError || !data?.profile?.stats || data.profile.user_type !== "author") {
    return (
      <PanelErrorCard
        title="Author Dashboard"
        description="Manage your research profile and publications"
      />
    );
  }

  // Type narrowing - now TypeScript knows profile is AuthorProfile
  const authorProfile = data.profile;

  return (
    <PanelContainer>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Author Dashboard</h1>
        <p className="mt-2 text-text-gray">
          Welcome back, {authorProfile.full_name || authorProfile.email}
        </p>
      </div>

      {/* Stats Cards */}
      <AuthorStatsCards
        stats={authorProfile.stats}
        collaboration_count={authorProfile.collaboration_count || 0}
      />

      {/* Charts */}
      <AuthorCharts stats={authorProfile.stats} />
    </PanelContainer>
  );
}
