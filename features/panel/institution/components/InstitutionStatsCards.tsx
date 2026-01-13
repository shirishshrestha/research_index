import { StatsCard } from "@/features/shared/components/cards";
import {
  BookOpen,
  FileText,
  TrendingUp,
  Download,
  Users,
  Award,
} from "lucide-react";

export interface InstitutionStats {
  total_publications: number;
  total_citations: number;
  average_citations_per_paper: string;
  total_reads: number;
  total_downloads: number;
  recommendations_count: number;
  total_authors: number;
  last_updated: string;
}

export interface InstitutionStatsCardsProps {
  stats: InstitutionStats;
  pending?: boolean;
}

export function InstitutionStatsCards({
  stats,
  pending = false,
}: InstitutionStatsCardsProps) {
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
        title="Avg Citations/Paper"
        value={parseFloat(stats.average_citations_per_paper).toFixed(2)}
        icon={Award}
        iconColor="text-accent"
        iconBgColor="bg-accent/20"
        pending={pending}
      />
      <StatsCard
        title="Total Authors"
        value={stats.total_authors}
        icon={Users}
        iconColor="text-primary"
        iconBgColor="bg-blue-02"
        description="Institution researchers"
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
        title="Recommendations"
        value={stats.recommendations_count}
        icon={Award}
        iconColor="text-primary"
        iconBgColor="bg-blue-02"
        pending={pending}
      />
    </div>
  );
}
