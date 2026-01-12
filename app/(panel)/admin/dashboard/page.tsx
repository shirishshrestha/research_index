"use client";

import PanelContainer from "@/components/layout/PanelContainer";
import { createCurrentUserQueryOptions } from "@/features/panel/author/hooks/query/options";
import { useQuery } from "@tanstack/react-query";
import {
  AdminStatsCards,
  AdminCharts,
} from "@/features/panel/admin/components";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useQuery(createCurrentUserQueryOptions);

  if (isLoading) {
    return (
      <PanelContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <p className="mt-2 text-text-gray">
            Manage system users, content, and settings
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

  if (isError || !data?.profile?.stats || data.profile.user_type !== "admin") {
    return (
      <PanelContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <p className="mt-2 text-text-gray">
            Manage system users, content, and settings
          </p>
        </div>
        <div className="rounded-xl bg-destructive/10 p-6 text-destructive">
          Unable to load dashboard data. Please try refreshing the page.
        </div>
      </PanelContainer>
    );
  }

  // Type narrowing - now TypeScript knows profile is AdminProfile
  const adminProfile = data.profile;

  return (
    <PanelContainer>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
        <p className="mt-2 text-text-gray">
          Manage system users, content, and settings
        </p>
      </div>

      {/* Stats Cards */}
      <AdminStatsCards stats={adminProfile.stats} />

      {/* Charts */}
      <AdminCharts stats={adminProfile.stats} />
    </PanelContainer>
  );
}
