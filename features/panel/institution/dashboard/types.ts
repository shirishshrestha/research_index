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

export interface InstitutionDashboardData {
  stats: InstitutionStats;
}
