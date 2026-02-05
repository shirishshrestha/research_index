"use client";

// NepJOL Import Types

export interface NepJOLImportStatus {
  is_running: boolean;
  started_at: string | null;
  current_journal: string | null;
  current_journal_index: number;
  total_journals: number;
  current_issue: string | null;
  current_article: string | null;
  progress_percentage: number;
  stats: {
    journals_processed: number;
    journals_created: number;
    issues_created: number;
    authors_created: number;
    authors_matched: number;
    publications_created: number;
    publications_skipped: number;
    pdfs_downloaded: number;
    errors: number;
  };
  last_update: string | null;
  estimated_time_remaining: string | null;
  options?: {
    max_journals: number | null;
    max_articles_per_journal: number | null;
    skip_duplicates: boolean;
    download_pdfs: boolean;
    test_mode: boolean;
  };
  current_stage?: string;
  error?: string;
}

export interface NepJOLImportStartRequest {
  max_journals?: number | null;
  max_articles_per_journal?: number | null;
  skip_duplicates?: boolean;
  download_pdfs?: boolean;
  test_mode?: boolean;
}

export interface NepJOLImportHistory {
  total_journals: number;
  total_issues: number;
  total_publications: number;
  last_import: NepJOLImportStatus | null;
}

export interface NepJOLJournal {
  name: string;
  url: string;
  short_name?: string;
}

export interface NepJOLAvailableJournals {
  total: number;
  journals: NepJOLJournal[];
}
