import { StatsCard } from "@/features/shared/components/cards";
import {
  Users,
  BookOpen,
  FileText,
  BarChart3,
  TrendingUp,
  Globe,
} from "lucide-react";
import { AdminStats } from "../types";

export interface AdminStatsCardsProps {
  stats: AdminStats;
  pending?: boolean;
}

export function AdminStatsCards({
  stats,
  pending = false,
}: AdminStatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <StatsCard
        title="Total Users"
        value={pending ? 0 : stats.total_users}
        icon={Users}
        iconColor="text-primary"
        iconBgColor="bg-blue-02"
        description={
          pending
            ? ""
            : `${stats.total_authors} authors, ${stats.total_institutions} institutions`
        }
        pending={pending}
      />
      <StatsCard
        title="Total Publications"
        value={pending ? 0 : stats.total_publications}
        icon={BookOpen}
        iconColor="text-secondary"
        iconBgColor="bg-secondary/20"
        description={
          pending
            ? ""
            : `${stats.published_count} published, ${stats.draft_count} drafts`
        }
        pending={pending}
      />
      <StatsCard
        title="Total Citations"
        value={pending ? 0 : stats.total_citations.toLocaleString()}
        icon={FileText}
        iconColor="text-accent"
        iconBgColor="bg-accent/20"
        pending={pending}
      />
      <StatsCard
        title="Total Reads"
        value={pending ? 0 : stats.total_reads.toLocaleString()}
        icon={TrendingUp}
        iconColor="text-primary"
        iconBgColor="bg-blue-02"
        pending={pending}
      />
      <StatsCard
        title="Total Downloads"
        value={pending ? 0 : stats.total_downloads.toLocaleString()}
        icon={BarChart3}
        iconColor="text-secondary"
        iconBgColor="bg-secondary/20"
        pending={pending}
      />
      <StatsCard
        title="Total Journals"
        value={pending ? 0 : stats.total_journals}
        icon={Globe}
        iconColor="text-accent"
        iconBgColor="bg-accent/20"
        pending={pending}
      />
      <StatsCard
        title="Authors"
        value={pending ? 0 : stats.total_authors}
        icon={Users}
        iconColor="text-primary"
        iconBgColor="bg-blue-02"
        pending={pending}
      />
      <StatsCard
        title="Topics"
        value={pending ? 0 : stats.total_topics}
        icon={BookOpen}
        iconColor="text-secondary"
        iconBgColor="bg-secondary/20"
        pending={pending}
      />
    </div>
  );
}
