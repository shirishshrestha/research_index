import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart3,
  TrendingUp,
  FileText,
  BookOpen,
  Target,
  Clock,
} from "lucide-react";
import type { Journal } from "../types";

interface JournalStatisticsProps {
  journal?: Journal;
  isPending?: boolean;
}

export function JournalStatistics({
  journal,
  isPending,
}: JournalStatisticsProps) {
  if (isPending) {
    return (
      <div className="space-y-4">
        {/* Highlight Stats Skeleton */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-linear-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardContent className="">
              <Skeleton className="h-24" />
            </CardContent>
          </Card>
          <Card className="bg-linear-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardContent className="">
              <Skeleton className="h-24" />
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats Skeleton */}
        <Card className="gap-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="h-4 w-4" />
              Detailed Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-20 rounded-lg" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!journal) {
    return null;
  }
  if (!journal.stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No statistics available yet
          </p>
        </CardContent>
      </Card>
    );
  }

  const { stats } = journal;

  return (
    <div className="space-y-4">
      {/* Highlight Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-linear-to-br from-blue-50 to-blue-100/50 border-blue-200">
          <CardContent className="">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Impact Factor
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.impact_factor || "N/A"}
                </p>
              </div>
              <div className="p-2 bg-blue-200/50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-purple-50 to-purple-100/50 border-purple-200">
          <CardContent className="">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-purple-900 mb-1">
                  CiteScore
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.cite_score || "N/A"}
                </p>
              </div>
              <div className="p-2 bg-purple-200/50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <Card className="gap-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <BarChart3 className="h-4 w-4" />
            Detailed Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <StatItem
              icon={<Target className="h-4 w-4" />}
              label="H-Index"
              value={stats.h_index}
              color="text-orange-600"
              bgColor="bg-orange-50"
            />
            <StatItem
              icon={<Target className="h-4 w-4" />}
              label="Acceptance Rate"
              value={stats.acceptance_rate}
              suffix="%"
              color="text-green-600"
              bgColor="bg-green-50"
            />
            <StatItem
              icon={<FileText className="h-4 w-4" />}
              label="Total Articles"
              value={stats.total_articles}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <StatItem
              icon={<BookOpen className="h-4 w-4" />}
              label="Total Issues"
              value={stats.total_issues}
              color="text-indigo-600"
              bgColor="bg-indigo-50"
            />
            <StatItem
              icon={<TrendingUp className="h-4 w-4" />}
              label="Total Citations"
              value={stats.total_citations}
              color="text-pink-600"
              bgColor="bg-pink-50"
            />
            <StatItem
              icon={<Clock className="h-4 w-4" />}
              label="Avg Review Time"
              value={stats.average_review_time}
              suffix=" days"
              color="text-cyan-600"
              bgColor="bg-cyan-50"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value?: number | null;
  suffix?: string;
  color: string;
  bgColor: string;
}

function StatItem({
  icon,
  label,
  value,
  suffix = "",
  color,
  bgColor,
}: StatItemProps) {
  const displayValue =
    value !== null && value !== undefined ? `${value}${suffix}` : "N/A";

  return (
    <div className={`p-3 rounded-lg ${bgColor}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={color}>{icon}</div>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
      </div>
      <p className={`text-xl font-bold ${color}`}>{displayValue}</p>
    </div>
  );
}
