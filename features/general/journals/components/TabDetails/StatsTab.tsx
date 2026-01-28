"use client";

import { BarChart, DoughnutChart } from "@/features/shared/components/charts";
import { StatsCard } from "@/features/shared/components/cards/StatsCard";
import {
  FileText,
  Quote,
  BookOpen,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react";

interface StatsTabProps {
  journalStats?: {
    total_articles: number;
    total_citations: number;
    total_issues: number;
    impact_factor: string;
    cite_score: string;
    h_index: number;
    acceptance_rate: string;
    average_review_time: number;
    recommendations: number;
  };
}

export const StatsTab = ({ journalStats }: StatsTabProps) => {
  // Publications by year data
  const publicationsByYearData = [
    { name: "2020", value: 24, color: "#3b82f6" },
    { name: "2021", value: 32, color: "#3b82f6" },
    { name: "2022", value: 41, color: "#3b82f6" },
    { name: "2023", value: 48, color: "#3b82f6" },
    { name: "2024", value: 55, color: "#3b82f6" },
  ];

  // Calculate total for percentages
  const totalPublications = publicationsByYearData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  // Publications stats component
  const PublicationsStats = () => (
    <div className="w-full space-y-2">
      {publicationsByYearData.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-text-gray">{item.name}</span>
          </div>
          <span className="text-sm font-medium">
            {totalPublications > 0
              ? ((item.value / totalPublications) * 100).toFixed(2)
              : 0}
            %
          </span>
        </div>
      ))}
    </div>
  );

  // Article types distribution
  const articleTypesData = [
    { name: "Research Article", value: 45, color: "#1e3a8a" },
    { name: "Review", value: 20, color: "#3b82f6" },
    { name: "Case Study", value: 15, color: "#93c5fd" },
    { name: "Short Communication", value: 12, color: "#7dd3c0" },
    { name: "Editorial", value: 8, color: "#bae6fd" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Impact Factor"
          value={
            journalStats?.impact_factor
              ? parseFloat(journalStats.impact_factor).toFixed(3)
              : "0.000"
          }
          icon={TrendingUp}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          title="CiteScore"
          value={
            journalStats?.cite_score
              ? parseFloat(journalStats.cite_score).toFixed(3)
              : "0.000"
          }
          icon={Quote}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title="Acceptance Rate"
          value={
            journalStats?.acceptance_rate
              ? `${parseFloat(journalStats.acceptance_rate).toFixed(0)}%`
              : "0%"
          }
          icon={CheckCircle}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatsCard
          title="Recommendations"
          value={journalStats?.recommendations?.toLocaleString() || "0"}
          icon={Target}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Articles"
          value={journalStats?.total_articles?.toLocaleString() || "0"}
          icon={FileText}
          iconColor="text-cyan-600"
          iconBgColor="bg-cyan-100"
        />
        <StatsCard
          title="Total Citations"
          value={journalStats?.total_citations?.toLocaleString() || "0"}
          icon={Quote}
          iconColor="text-pink-600"
          iconBgColor="bg-pink-100"
        />
        <StatsCard
          title="Total Issues"
          value={journalStats?.total_issues || 0}
          icon={BookOpen}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-100"
        />
        <StatsCard
          title="Avg Review Time"
          value={
            journalStats?.average_review_time
              ? `${journalStats.average_review_time} days`
              : "N/A"
          }
          icon={Clock}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Publications Over Time */}
        <BarChart
          title="Publications Over Time"
          data={publicationsByYearData}
          className="h-fit"
          height={300}
          dataKey="value"
          xAxisKey="name"
          showGrid={true}
          StatValuesComp={PublicationsStats}
        />

        {/* Doughnut Chart - Comparison */}
        <div className="space-y-4">
          <div className="flex flex-col gap-6">
            {/* Score Breakdown Card */}
            <div className="bg-card rounded-xl p-6 shadow-sm ring-1 ring-border h-fit">
              <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">Total Articles</span>
                  <span className="text-sm font-semibold">
                    {journalStats?.total_articles?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">
                    Total Citations
                  </span>
                  <span className="text-sm font-semibold">
                    {journalStats?.total_citations?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">Total Issues</span>
                  <span className="text-sm font-semibold">
                    {journalStats?.total_issues?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">
                    Recommendations
                  </span>
                  <span className="text-sm font-semibold">
                    {journalStats?.recommendations?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-gray mt-4 pt-4 border-t border-border">
                *Based on Nepal Research Index data
              </p>
            </div>
            {/* Comparison Chart with Description */}
            <div className="grid xl:grid-cols-[40%_1fr] bg-card rounded-xl shadow-sm ring-1 ring-border p-6">
              <DoughnutChart
                data={articleTypesData}
                className="shadow-none! border-none! flex-1"
                height={200}
                innerRadius={60}
                outerRadius={100}
                showLegend={false}
              />
              <div className="flex flex-col justify-center">
                <h4 className="heading-4 text-lg! mb-3.75 text-text-black">
                  Article Types Distribution
                </h4>
                <p className="text-sm text-text-gray">
                  This journal publishes diverse article types with a strong
                  emphasis on Research Articles, ensuring high-quality
                  peer-reviewed content that advances knowledge in its field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
