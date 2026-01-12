"use client";

import PanelContainer from "@/components/layout/PanelContainer";
import { createCurrentUserQueryOptions } from "@/features/panel/author/hooks/query/options";
import { useQuery } from "@tanstack/react-query";
import {
  AuthorStatsCards,
  AuthorCharts,
} from "@/features/panel/author/components";

export default function AuthorDashboard() {
  const { data, isPending, isError } = useQuery(createCurrentUserQueryOptions);

  if (isPending) {
    return (
      <PanelContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Author Dashboard</h1>
          <p className="mt-2 text-text-gray">
            Manage your research profile and publications
          </p>
        </div>
        <div className="animate-pulse">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 rounded-xl bg-card/50"></div>
            ))}
          </div>
        </div>
      </PanelContainer>
    );
  }

  if (isError || !data?.profile?.stats || data.profile.user_type !== "author") {
    return (
      <PanelContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Author Dashboard</h1>
          <p className="mt-2 text-text-gray">
            Manage your research profile and publications
          </p>
        </div>
        <div className="rounded-xl bg-destructive/10 p-6 text-destructive">
          Unable to load dashboard data. Please try refreshing the page.
        </div>
      </PanelContainer>
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
