export interface AdminStats {
  total_users: number;
  total_authors: number;
  total_institutions: number;
  total_publications: number;
  published_count: number;
  draft_count: number;
  total_citations: number;
  total_reads: number;
  total_downloads: number;
  total_journals: number;
  total_topics: number;
  last_updated: string;
}

export interface AdminDashboardData {
  stats: AdminStats;
}
