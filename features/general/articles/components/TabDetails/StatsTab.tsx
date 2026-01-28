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

  // Calculate total for percentages
  const totalMetrics = metricsData.reduce((sum, item) => sum + item.value, 0);

  // Metrics stats component
  const MetricsStats = () => (
    <div className="w-full space-y-2">
      {metricsData.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-text-gray">{item.name}</span>
          </div>
          <span className="text-sm font-medium">
            {totalMetrics > 0
              ? ((item.value / totalMetrics) * 100).toFixed(2)
              : 0}
            %
          </span>
        </div>
      ))}
    </div>
  );

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
          className="h-fit"
          height={300}
          dataKey="value"
          xAxisKey="name"
          showGrid={true}
          StatValuesComp={MetricsStats}
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
                    {article.stats?.citations_count?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">
                    Recommendations
                  </span>
                  <span className="text-sm font-semibold">
                    {article.stats?.recommendations_count?.toLocaleString() ||
                      "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">
                    Full-Text Reads*
                  </span>
                  <span className="text-sm font-semibold">
                    {article.stats?.reads_count?.toLocaleString() || "0"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-gray">Downloads*</span>
                  <span className="text-sm font-semibold">
                    {article.stats?.downloads_count?.toLocaleString() || "0"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-text-gray mt-4 pt-4 border-t border-border">
                *By Nepal Research Index Members
              </p>
            </div>
            {/* Comparison Chart with Description */}
            <div className="grid xl:grid-cols-[40%_1fr] bg-card rounded-xl shadow-sm ring-1 ring-border p-6">
              <DoughnutChart
                data={metricsDistribution}
                className="shadow-none! border-none! flex-1"
                height={200}
                innerRadius={60}
                outerRadius={100}
                showLegend={false}
              />
              <div className="flex flex-col justify-center">
                <h4 className="heading-4 text-lg! mb-3.75 text-text-black">
                  Metrics Distribution
                </h4>
                <p className="text-sm text-text-gray">
                  This article&apos;s engagement metrics demonstrate strong
                  reader interest and academic impact, with balanced
                  distribution across citations, reads, downloads, and
                  recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
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
