import { StatsCard } from "@/features/shared/components/cards";
import {
  BookOpen,
  FileText,
  TrendingUp,
  Download,
  Users,
  Award,
} from "lucide-react";
import { AuthorStats } from "../types";

export interface AuthorStatsCardsProps {
  stats: AuthorStats;
  collaboration_count?: number;
  pending?: boolean;
}

export function AuthorStatsCards({
  stats,
  collaboration_count = 0,
  pending = false,
}: AuthorStatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <StatsCard
        title="Total Publications"
        value={stats.total_publications}
        icon={BookOpen}
        iconColor="text-primary"
        iconBgColor="bg-blue-02"
        pending={pending}
      />
      <StatsCard
        title="Total Citations"
        value={stats.total_citations.toLocaleString()}
        icon={FileText}
        iconColor="text-secondary"
        iconBgColor="bg-secondary/20"
        pending={pending}
      />
      <StatsCard
        title="H-Index"
        value={stats.h_index}
        icon={Award}
        iconColor="text-accent"
        iconBgColor="bg-accent/20"
        description="Research impact metric"
        pending={pending}
      />
      <StatsCard
        title="i10-Index"
        value={stats.i10_index}
        icon={Award}
        iconColor="text-primary"
        iconBgColor="bg-blue-02"
        description="Citations > 10"
        pending={pending}
      />
      <StatsCard
        title="Total Reads"
        value={stats.total_reads.toLocaleString()}
        icon={TrendingUp}
        iconColor="text-secondary"
        iconBgColor="bg-secondary/20"
        pending={pending}
      />
      <StatsCard
        title="Total Downloads"
        value={stats.total_downloads.toLocaleString()}
        icon={Download}
        iconColor="text-accent"
        iconBgColor="bg-accent/20"
        pending={pending}
      />
      <StatsCard
        title="Avg Citations/Paper"
        value={parseFloat(stats.average_citations_per_paper).toFixed(2)}
        icon={FileText}
        iconColor="text-primary"
        iconBgColor="bg-blue-02"
        pending={pending}
      />
      <StatsCard
        title="Collaborators"
        value={collaboration_count}
        icon={Users}
        iconColor="text-secondary"
        iconBgColor="bg-secondary/20"
        description="Co-authors"
        pending={pending}
      />
    </div>
  );
}
