"use client";

import {
  AdminCharts,
  AdminStatsCards,
  SyncPublicationsButton,
} from "@/features/panel/admin";
import { createCurrentUserQueryOptions } from "@/features/shared";
import { PanelContainer, PanelErrorCard } from "@/features/shared";
import { useQuery } from "@tanstack/react-query";

export default function AdminDashboard() {
  const { data, isPending, isError } = useQuery(createCurrentUserQueryOptions);

  if (
    isError ||
    (!isPending &&
      (!data?.profile?.stats || data.profile.user_type !== "admin"))
  ) {
    return (
      <PanelErrorCard
        title="Admin Dashboard"
        description="Manage system users, content, and settings"
      />
    );
  }

  // Type narrowing - now TypeScript knows profile is AdminProfile
  const adminProfile = data?.profile;

  return (
    <PanelContainer>
      {/* Header with Sync Button */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          <p className="mt-2 text-text-gray">
            Manage system users, content, and settings
          </p>
        </div>
        <SyncPublicationsButton />
      </div>

      {/* Stats Cards */}
      <AdminStatsCards
        stats={adminProfile?.stats || ({} as any)}
        pending={isPending}
      />

      {/* Charts */}
      <AdminCharts
        stats={adminProfile?.stats || ({} as any)}
        isPending={isPending}
      />
    </PanelContainer>
  );
}
