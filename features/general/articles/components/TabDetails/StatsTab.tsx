"use client";

import { BarChart, DoughnutChart } from "@/features/shared/components/charts";
import { StatsCard } from "@/features/shared/components/cards/StatsCard";
import { Quote, Eye, Download, ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Publication } from "@/features/panel/author/publications/types";

interface StatsTabProps {
  article: Publication;
}

export const StatsTab = ({ article }: StatsTabProps) => {
  // Metrics breakdown
  const metricsData = [
    {
      name: "Citations",
      value: article.stats?.citations_count || 0,
      color: "#1e3a8a",
    },
    {
      name: "Reads",
      value: article.stats?.reads_count || 0,
      color: "#3b82f6",
    },
    {
      name: "Downloads",
      value: article.stats?.downloads_count || 0,
      color: "#93c5fd",
    },
    {
      name: "Recommendations",
      value: article.stats?.recommendations_count || 0,
      color: "#7dd3c0",
    },
  ];

  // Metrics distribution for doughnut chart
  const metricsDistribution = [
    {
      name: "Citations",
      value: article.stats?.citations_count || 0,
      color: "#1e3a8a",
    },
    {
      name: "Reads",
      value: article.stats?.reads_count || 0,
      color: "#3b82f6",
    },
    {
      name: "Downloads",
      value: article.stats?.downloads_count || 0,
      color: "#93c5fd",
    },
    {
      name: "Recommendations",
      value: article.stats?.recommendations_count || 0,
      color: "#7dd3c0",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Citations"
          value={article.stats?.citations_count?.toLocaleString() || "0"}
          icon={Quote}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          title="Reads"
          value={article.stats?.reads_count?.toLocaleString() || "0"}
          icon={Eye}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title="Downloads"
          value={article.stats?.downloads_count?.toLocaleString() || "0"}
          icon={Download}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        <StatsCard
          title="Recommendations"
          value={article.stats?.recommendations_count?.toLocaleString() || "0"}
          icon={ThumbsUp}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart - Metrics Breakdown */}
        <BarChart
          title="Metrics Breakdown"
          data={metricsData}
          height={300}
          dataKey="value"
          xAxisKey="name"
          showGrid={true}
        />

        {/* Doughnut Chart - Metrics Distribution */}
        <DoughnutChart
          title="Metrics Distribution"
          data={metricsDistribution}
          height={300}
          innerRadius={60}
          outerRadius={100}
          showLegend={true}
        />
      </div>

      {/* Additional Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Publication Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-text-gray mb-1">Publication Type</p>
            <p className="font-medium">{article.publication_type_display}</p>
          </div>
          <div>
            <p className="text-sm text-text-gray mb-1">Published Date</p>
            <p className="font-medium">
              {article.published_date
                ? new Date(article.published_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </p>
          </div>
          {article.journal_title && (
            <div>
              <p className="text-sm text-text-gray mb-1">Journal</p>
              <p className="font-medium">{article.journal_title}</p>
            </div>
          )}
          {article.doi && (
            <div>
              <p className="text-sm text-text-gray mb-1">DOI</p>
              <p className="font-medium">{article.doi}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
