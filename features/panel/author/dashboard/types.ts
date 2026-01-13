export interface AuthorStats {
  h_index: number;
  i10_index: number;
  total_citations: number;
  total_reads: number;
  total_downloads: number;
  recommendations_count: number;
  total_publications: number;
  average_citations_per_paper: string;
  last_updated: string;
}

export interface AuthorDashboardData {
  stats: AuthorStats;
  collaboration_count: number;
}
