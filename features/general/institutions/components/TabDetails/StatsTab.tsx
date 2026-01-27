"use client";

import { BarChart, DoughnutChart } from "@/features/shared/components/charts";
import { StatsCard } from "@/features/shared/components/cards/StatsCard";
import {
  FileText,
  Quote,
  Users,
  BookOpen,
  Eye,
  Download,
  ThumbsUp,
} from "lucide-react";

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
  // Publications by year data
  const publicationsByYearData = [
    { name: "2020", value: 24, color: "#3b82f6" },
    { name: "2021", value: 32, color: "#3b82f6" },
    { name: "2022", value: 41, color: "#3b82f6" },
    { name: "2023", value: 48, color: "#3b82f6" },
    { name: "2024", value: 55, color: "#3b82f6" },
  ];

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
          title="Total Citations"
          value={institutionStats?.total_citations?.toLocaleString() || "0"}
          icon={Quote}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title="Authors"
          value={institutionStats?.total_authors?.toLocaleString() || "0"}
          icon={Users}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
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

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Total Reads"
          value={institutionStats?.total_reads?.toLocaleString() || "0"}
          icon={Eye}
          iconColor="text-cyan-600"
          iconBgColor="bg-cyan-100"
        />
        <StatsCard
          title="Downloads"
          value={institutionStats?.total_downloads?.toLocaleString() || "0"}
          icon={Download}
          iconColor="text-pink-600"
          iconBgColor="bg-pink-100"
        />
        <StatsCard
          title="Recommendations"
          value={
            institutionStats?.recommendations_count?.toLocaleString() || "0"
          }
          icon={ThumbsUp}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Publications Over Time */}
        <BarChart
          title="Publications Over Time"
          data={publicationsByYearData}
          height={300}
          dataKey="value"
          xAxisKey="name"
          showGrid={true}
        />

        {/* Doughnut Chart - Research Areas Distribution */}
        <DoughnutChart
          title="Research Areas Distribution"
          data={researchAreasData}
          height={300}
          innerRadius={60}
          outerRadius={100}
          showLegend={true}
        />
      </div>
    </div>
  );
};
