import { BarChart, PieChart } from "@/features/shared/components/charts";
import { AdminStats } from "../types";

export interface AdminChartsProps {
  stats: AdminStats;
  isPending?: boolean;
}

export function AdminCharts({ stats, isPending = false }: AdminChartsProps) {
  // User distribution data
  const userDistributionData = [
    { name: "Authors", value: stats.total_authors || 0 },
    { name: "Institutions", value: stats.total_institutions || 0 },
  ];

  // Publications status data
  const publicationsStatusData = [
    { name: "Published", value: stats.published_count || 0 },
    { name: "Drafts", value: stats.draft_count || 0 },
  ];

  // Engagement metrics data
  const engagementData = [
    { name: "Reads", value: stats.total_reads || 0 },
    { name: "Downloads", value: stats.total_downloads || 0 },
    { name: "Citations", value: stats.total_citations || 0 },
  ];

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      {/* User Distribution */}
      <PieChart
        title="User Distribution"
        data={userDistributionData}
        dataKey="value"
        nameKey="name"
        height={300}
        isLoading={isPending}
      />

      {/* Publications Status */}
      <PieChart
        title="Publications Status"
        data={publicationsStatusData}
        dataKey="value"
        nameKey="name"
        height={300}
        isLoading={isPending}
      />

      {/* Engagement Metrics */}
      <div className="lg:col-span-2">
        <BarChart
          title="Engagement Metrics"
          data={engagementData}
          dataKey="value"
          xAxisKey="name"
          height={300}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}
