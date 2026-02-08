// Admin User Management Types

export interface AdminUser {
  id: number;
  email: string;
  user_type: "author" | "institution" | "admin";
  is_active: boolean;
  is_staff: boolean;
  created_at: string;
  updated_at: string;
  profile_name: string;
  profile_info: AuthorProfileInfo | InstitutionProfileInfo | null;
  publications_count: number;
}

export interface PaginatedAdminUsersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminUser[];
}

export interface AuthorProfileInfo {
  institute: string;
  designation: string;
  orcid: string;
}

export interface InstitutionProfileInfo {
  institution_type: string;
  city: string;
  country: string;
}

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

export interface InstitutionStats {
  total_publications: number;
  total_citations: number;
  average_citations_per_paper: string;
  total_reads: number;
  total_downloads: number;
  recommendations_count: number;
  total_authors: number;
  last_updated: string;
  compared_summary: string;
}

export interface AdminAuthorDetail {
  id: number;
  user_id: number;
  email: string;
  is_active: boolean;
  title: string;
  full_name: string;
  institute: string;
  designation: string;
  degree: string;
  gender: string;
  profile_picture: string;
  cv: string;
  bio: string;
  research_interests: string;
  orcid: string;
  google_scholar: string;
  researchgate: string;
  linkedin: string;
  website: string;
  created_at: string;
  updated_at: string;
  stats: AuthorStats;
  publications_count: number;
}

export interface AdminInstitutionDetail {
  id: number;
  user_id: number;
  email: string;
  is_active: boolean;
  institution_name: string;
  institution_type: string;
  logo: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  website: string;
  established_year: number;
  research_areas: string;
  total_researchers: number;
  created_at: string;
  updated_at: string;
  stats: InstitutionStats;
}

export type AuthorUpdateData = Partial<
  Omit<
    AdminAuthorDetail,
    | "id"
    | "user_id"
    | "created_at"
    | "updated_at"
    | "stats"
    | "publications_count"
  >
>;

export type InstitutionUpdateData = Partial<
  Omit<
    AdminInstitutionDetail,
    "id" | "user_id" | "created_at" | "updated_at" | "stats"
  >
>;
