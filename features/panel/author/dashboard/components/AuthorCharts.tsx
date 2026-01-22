import { BarChart, DoughnutChart } from "@/features/shared/components/charts";
import { AuthorStats } from "../types";

export interface AuthorChartsProps {
  stats: AuthorStats;
  isPending?: boolean;
}

export function AuthorCharts({ stats, isPending = false }: AuthorChartsProps) {
  // Impact metrics data
  const impactMetricsData = [
    { name: "H-Index", value: stats.h_index || 0 },
    { name: "i10-Index", value: stats.i10_index || 0 },
    { name: "Citations", value: stats.total_citations || 0 },
  ];

  // Engagement data for doughnut chart
  const engagementData = [
    { name: "Reads", value: stats.total_reads || 0 },
    { name: "Downloads", value: stats.total_downloads || 0 },
    {
      name: "Recommendations",
      value: stats.recommendations_count || 0,
    },
  ];

  // Publication metrics
  const publicationMetricsData = [
    { name: "Publications", value: stats.total_publications || 0 },
    {
      name: "Avg Citations",
      value: parseFloat(stats.average_citations_per_paper) || 0,
    },
  ];

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      {/* Publication Performance */}
      <BarChart
        title="Publication Performance"
        data={publicationMetricsData}
        dataKey="value"
        xAxisKey="name"
        height={300}
        isLoading={isPending}
      />

      {/* Engagement Distribution */}
      <DoughnutChart
        title="Engagement Distribution"
        data={engagementData}
        className="gap-1"
        dataKey="value"
        nameKey="name"
        height={300}
        isLoading={isPending}
      />

      <div className="lg:col-span-2">
        {/* Impact Metrics */}
        <BarChart
          title="Research Impact Metrics"
          data={impactMetricsData}
          dataKey="value"
          xAxisKey="name"
          height={300}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}
