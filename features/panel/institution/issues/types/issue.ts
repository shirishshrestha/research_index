/**
 * Issue status enum matching backend choices
 */
export type IssueStatus =
  | "draft"
  | "upcoming"
  | "current"
  | "published"
  | "archived";

/**
 * Issue article interface
 */
export interface IssueArticle {
  id: number;
  publication: number;
  article_title: string;
  article_authors: string;
  article_doi: string;
  order: number;
  section: string;
}

/**
 * Issue list item interface (simplified for listings)
 */
export interface IssueListItem {
  id: number;
  journal_title: string;
  volume: number;
  issue_number: number;
  title: string;
  description: string;
  cover_image_url: string | null;
  publication_date: string;
  status: IssueStatus;
  status_display: string;
  is_special_issue: boolean;
  articles_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Full issue details interface
 */
export interface Issue {
  id: number;
  journal_id: number;
  journal_title: string;
  volume: number;
  issue_number: number;
  title: string;
  description: string;
  cover_image: string | null;
  cover_image_url: string | null;
  publication_date: string;
  submission_deadline: string | null;
  doi: string;
  pages_range: string;
  editorial_note: string;
  guest_editors: string;
  status: IssueStatus;
  status_display: string;
  is_special_issue: boolean;
  articles: IssueArticle[];
  created_at: string;
  updated_at: string;
}

/**
 * Issue form data interface
 */
export interface IssueFormData {
  volume: number;
  issue_number: number;
  title?: string;
  description?: string;
  cover_image?: File;
  publication_date: string;
  submission_deadline?: string;
  doi?: string;
  pages_range?: string;
  editorial_note?: string;
  guest_editors?: string;
  status: IssueStatus;
  is_special_issue: boolean;
}

/**
 * API response interfaces
 */
export interface IssueCreateResponse {
  message: string;
  issue: Issue;
}

export interface IssueUpdateResponse {
  message: string;
  issue: Issue;
}

export interface IssueDeleteResponse {
  message: string;
}

/**
 * Add article to issue request
 */
export interface AddArticleToIssueData {
  publication_id: number;
  order?: number;
  section?: string;
}

export interface AddArticleToIssueResponse {
  message: string;
  article: {
    id: number;
    publication_id: number;
    order: number;
    section: string;
  };
}
