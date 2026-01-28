"use client";

import { BarChart, DoughnutChart } from "@/features/shared/components/charts";
import { StatsCard } from "@/features/shared/components/cards/StatsCard";
import { FileText, Quote, Users } from "lucide-react";

interface StatsTabProps {
  institutionStats?: {
    total_authors: number;
    total_publications: number;
    total_citations: number;
    average_citations_per_paper: string;
    total_reads: number;
    total_downloads: number;
    recommendations_count: number;
  };
}

export const StatsTab = ({ institutionStats }: StatsTabProps) => {
  // Engagement metrics data
  const engagementMetricsData = [
    {
      name: "Citations",
      value: institutionStats?.total_citations || 0,
      color: "#3F7E1F",
    },
    {
      name: "Reads",
      value: institutionStats?.total_reads || 0,
      color: "#023B8B",
    },
    {
      name: "Downloads",
      value: institutionStats?.total_downloads || 0,
      color: "#8DB3ED",
    },
    {
      name: "Recommendations",
      value: institutionStats?.recommendations_count || 0,
      color: "#82D558",
    },
  ];

  // Calculate total for percentages
  const totalEngagement = engagementMetricsData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  // Engagement stats component
  const EngagementStats = () => (
    <div className="w-full space-y-2">
      {engagementMetricsData.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-text-gray">{item.name}</span>
          </div>
          <span className="text-sm font-medium">
            {totalEngagement > 0
              ? ((item.value / totalEngagement) * 100).toFixed(2)
              : 0}
            %
          </span>
        </div>
      ))}
    </div>
  );

  // Research areas distribution
  const researchAreasData = [
    { name: "Medicine", value: 35, color: "#1e3a8a" },
    { name: "Engineering", value: 25, color: "#3b82f6" },
    { name: "Agriculture", value: 20, color: "#93c5fd" },
    { name: "Social Sciences", value: 12, color: "#7dd3c0" },
    { name: "Others", value: 8, color: "#bae6fd" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Publications"
          value={institutionStats?.total_publications?.toLocaleString() || "0"}
          icon={FileText}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />

        <StatsCard
          title="Authors"
          value={institutionStats?.total_authors?.toLocaleString() || "0"}
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />

        <StatsCard
          title="Total Citations"
          value={institutionStats?.total_citations?.toLocaleString() || "0"}
          icon={Quote}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />

        <StatsCard
          title="Avg Citations/Paper"
          value={
            institutionStats?.average_citations_per_paper
              ? parseFloat(
                  institutionStats.average_citations_per_paper,
                ).toFixed(2)
              : "0.00"
          }
          icon={Quote}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Engagement Metrics */}
        <BarChart
          title="Engagement Metrics"
          data={engagementMetricsData}
          className="h-fit"
          height={300}
          dataKey="value"
          xAxisKey="name"
          showGrid={true}
          StatValuesComp={EngagementStats}
        />

        {/* Doughnut Chart - Comparison */}
        <div className="space-y-4">
          <div className="flex flex-col gap-6">
            {/* Score Breakdown Card */}
            <div className="bg-card rounded-xl p-6 shadow-sm ring-1 ring-border h-fit">
              <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">Citations</span>
                  <span className="text-sm font-semibold">
                    {institutionStats?.total_citations?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">
                    Recommendations
                  </span>
                  <span className="text-sm font-semibold">
                    {institutionStats?.recommendations_count?.toLocaleString() ||
                      "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">
                    Full-Text Reads*
                  </span>
                  <span className="text-sm font-semibold">
                    {institutionStats?.total_reads?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">Other Reads*</span>
                  <span className="text-sm font-semibold">
                    {institutionStats?.total_downloads?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-gray mt-4 pt-4 border-t border-border">
                *Reads by Nepal Research Index Members
              </p>
            </div>
            {/* Comparison Chart with Description */}
            <div className="grid xl:grid-cols-[40%_1fr] bg-card rounded-xl shadow-sm ring-1 ring-border p-6">
              <DoughnutChart
                data={researchAreasData}
                className="shadow-none! border-none! flex-1"
                height={200}
                innerRadius={60}
                outerRadius={100}
                showLegend={false}
              />
              <div className="flex flex-col justify-center">
                <h4 className="heading-4 text-lg! mb-3.75 text-text-black">
                  Research Areas Distribution
                </h4>
                <p className="text-sm text-text-gray">
                  This institution&apos;s research spans multiple disciplines,
                  with strong focus on Medicine and Engineering, reflecting
                  diverse academic excellence and impactful contributions to
                  research in Nepal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
