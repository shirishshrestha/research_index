"use client";

import { BarChart, DoughnutChart } from "@/features/shared/components/charts";
import { StatsCard } from "@/features/shared/components/cards/StatsCard";
import { FileText, Quote, BookOpen, ThumbsUp, Eye } from "lucide-react";
import { AuthorDetail } from "../../types";

interface StatsTabProps {
  author?: AuthorDetail;
}

export const StatsTab = ({ author }: StatsTabProps) => {
  // Score Breakdown Data
  const scoreBreakdownData = [
    {
      name: "Citations",
      value: author?.stats?.total_citations || 10,
      color: "#1e3a8a",
    },
    {
      name: "Recommendations",
      value: author?.stats?.recommendations_count || 10,
      color: "#3b82f6",
    },
    {
      name: "Reads",
      value: author?.stats?.total_reads || 10,
      color: "#93c5fd",
    },
    {
      name: "Downloads",
      value: author?.stats?.total_downloads || 10,
      color: "#7dd3c0",
    },
  ];

  // Calculate total for percentages
  const total = scoreBreakdownData.reduce((sum, item) => sum + item.value, 0);

  // Comparison Data for Doughnut Chart with percentages
  const comparisonData = scoreBreakdownData.map((item) => ({
    name: item.name,
    value: total > 0 ? parseFloat(((item.value / total) * 100).toFixed(2)) : 0,
    color: item.color,
  }));

  // Stats values component
  const ScoreBreakdownStats = () => (
    <div className="w-full space-y-2">
      {scoreBreakdownData.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-text-gray">{item.name}</span>
          </div>
          <span className="text-sm font-medium">
            {comparisonData[index]?.value.toFixed(2)}%
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Citations"
          value={author?.stats?.total_citations?.toLocaleString() || "0"}
          icon={Quote}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title=" Avg. Citations per Publication"
          value={author?.stats?.avg_citations_per_publication || 0}
          icon={FileText}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatsCard
          title="Publications"
          value={author?.publications_count?.toLocaleString() || "0"}
          icon={BookOpen}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
        <StatsCard
          title="Reads"
          value={author?.stats?.total_reads?.toLocaleString() || "0"}
          icon={Eye}
          iconColor="text-cyan-600"
          iconBgColor="bg-cyan-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Score Breakdown */}
        <BarChart
          title="Score Breakdown"
          data={scoreBreakdownData}
          className="h-fit"
          height={300}
          dataKey="value"
          xAxisKey="name"
          showGrid={true}
          StatValuesComp={ScoreBreakdownStats}
        />

        {/* Doughnut Chart - Comparison */}
        <div className="space-y-4">
          <div className="flex flex-col gap-6">
            {/* Right: Score Breakdown */}
            <div className="bg-card rounded-xl p-6 shadow-sm ring-1 ring-border h-fit">
              <h3 className="text-lg font-semibold mb-4">Score Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">Citations</span>
                  <span className="text-sm font-semibold">
                    {author?.stats?.total_citations?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">
                    Recommendations
                  </span>
                  <span className="text-sm font-semibold">
                    {author?.stats?.recommendations_count?.toLocaleString() ||
                      "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">
                    Full-Text Reads*
                  </span>
                  <span className="text-sm font-semibold">
                    {author?.stats?.total_reads?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">Other Reads*</span>
                  <span className="text-sm font-semibold">
                    {author?.stats?.total_downloads?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-gray mt-4 pt-4 border-t border-border">
                *Reads by Nepal Research Index Members
              </p>
            </div>
            {/* Left: Chart with description */}
            <div className=" grid xl:grid-cols-[40%_1fr] bg-card rounded-xl shadow-sm ring-1 ring-border p-6 ">
              <DoughnutChart
                data={comparisonData}
                className="shadow-none! border-none! flex-1 "
                height={200}
                innerRadius={60}
                outerRadius={100}
                showLegend={false}
              />
              <div className="flex flex-col  justify-center">
                <h4 className="heading-4 text-lg! mb-3.75 text-text-black">
                  Compared to all Nepal Research Index Members
                </h4>
                <p className="text-sm text-text-gray  ">
                  {author?.full_name}&apos;s research contribution level is
                  higher than <strong>98%</strong> of Nepal Research Index
                  members, reflecting his consistent dedication, impactful
                  publications, and influential role in advancing research and
                  education in Nepal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
