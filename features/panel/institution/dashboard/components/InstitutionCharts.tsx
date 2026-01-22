import { BarChart, DoughnutChart } from "@/features/shared/components/charts";
import { InstitutionStats } from "../types";

export interface InstitutionChartsProps {
  stats: InstitutionStats;
  isPending?: boolean;
}

export function InstitutionCharts({
  stats,
  isPending = false,
}: InstitutionChartsProps) {
  // Research output data
  const researchOutputData = [
    { name: "Publications", value: stats.total_publications || 0 },
    { name: "Citations", value: stats.total_citations || 0 },
    { name: "Authors", value: stats.total_authors || 0 },
  ];

  // Engagement distribution
  const engagementData = [
    { name: "Reads", value: stats.total_reads || 0 },
    { name: "Downloads", value: stats.total_downloads || 0 },
    {
      name: "Recommendations",
      value: stats.recommendations_count || 0,
    },
  ];

  // Performance metrics
  const performanceData = [
    {
      name: "Avg Citations",
      value: parseFloat(stats.average_citations_per_paper) || 0,
    },
    { name: "Publications", value: stats.total_publications || 0 },
    { name: "Authors", value: stats.total_authors || 0 },
  ];

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      {/* Research Output */}
      <BarChart
        title="Research Output Overview"
        data={researchOutputData}
        dataKey="value"
        xAxisKey="name"
        height={300}
        isLoading={isPending}
      />

      {/* Engagement Distribution */}
      <DoughnutChart
        title="Engagement Distribution"
        data={engagementData}
        dataKey="value"
        nameKey="name"
        height={300}
        isLoading={isPending}
        centerContent={
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {(
                stats.total_reads +
                stats.total_downloads +
                stats.recommendations_count
              ).toLocaleString()}
            </div>
            <div className="text-sm text-text-gray">Total Engagement</div>
          </div>
        }
      />

      {/* Performance Metrics */}
      <div className="lg:col-span-2">
        <BarChart
          title="Institution Performance Metrics"
          data={performanceData}
          dataKey="value"
          xAxisKey="name"
          height={250}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}
