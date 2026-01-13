"use client";

import {
  AdminCharts,
  AdminStatsCards,
} from "@/features/panel/admin/components";
import { createCurrentUserQueryOptions } from "@/features/panel/author/hooks/query/options";
import {
  PanelContainer,
  PanelErrorCard,
  PanelLoadingSkeleton,
} from "@/features/shared";
import { useQuery } from "@tanstack/react-query";

export default function AdminDashboard() {
  const { data, isLoading, isError } = useQuery(createCurrentUserQueryOptions);

  if (isLoading) {
    return (
      <PanelLoadingSkeleton
        title="Admin Dashboard"
        description="Manage system users, content, and settings"
        statsCount={8}
      />
    );
  }

  if (isError || !data?.profile?.stats || data.profile.user_type !== "admin") {
    return (
      <PanelErrorCard
        title="Admin Dashboard"
        description="Manage system users, content, and settings"
      />
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
