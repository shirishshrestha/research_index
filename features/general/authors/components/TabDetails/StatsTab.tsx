"use client";

import { BarChart, DoughnutChart } from "@/features/shared/components/charts";
import { StatsCard } from "@/features/shared/components/cards/StatsCard";
import { FileText, Quote, BookOpen, ThumbsUp, Eye } from "lucide-react";

interface StatsTabProps {
  authorStats?: {
    h_index: number;
    i10_index: number;
    total_citations: number;
    total_publications: number;
    total_reads: number;
    total_downloads: number;
  };
}

export const StatsTab = ({ authorStats }: StatsTabProps) => {
  // Score Breakdown Data
  const scoreBreakdownData = [
    { name: "Citations", value: 6356, color: "#1e3a8a" },
    { name: "Recommendations", value: 127, color: "#3b82f6" },
    { name: "Full-Text Reads", value: 608, color: "#93c5fd" },
    { name: "Other Reads", value: 2247, color: "#7dd3c0" },
  ];

  // Comparison Data for Doughnut Chart
  const comparisonData = [
    { name: "Citations", value: 93.11, color: "#1e3a8a" },
    { name: "Recommendations", value: 0.93, color: "#3b82f6" },
    { name: "Full-Text Reads", value: 2.67, color: "#93c5fd" },
    { name: "Other Reads", value: 3.29, color: "#7dd3c0" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="h-index"
          value={authorStats?.h_index || 0}
          icon={FileText}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          title="i10-index"
          value={authorStats?.i10_index || 0}
          icon={FileText}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatsCard
          title="Citations"
          value={authorStats?.total_citations?.toLocaleString() || "0"}
          icon={Quote}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title="Publications"
          value={authorStats?.total_publications?.toLocaleString() || "0"}
          icon={BookOpen}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
        <StatsCard
          title="Reads"
          value={authorStats?.total_reads?.toLocaleString() || "0"}
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
          height={300}
          dataKey="value"
          xAxisKey="name"
          showGrid={true}
        />

        {/* Doughnut Chart - Comparison */}
        <div className="space-y-4">
          <DoughnutChart
            title="Compared to all Nepal Research Index Members"
            data={comparisonData}
            height={300}
            innerRadius={60}
            outerRadius={100}
            showLegend={false}
          />
          <p className="text-sm text-text-gray text-center px-4">
            This author&apos;s research contribution level is higher than{" "}
            <strong>98%</strong> of Nepal Research Index members, reflecting
            consistent dedication, impactful publications, and influential role
            in advancing research and education in Nepal.
          </p>
        </div>
      </div>
    </div>
  );
};
