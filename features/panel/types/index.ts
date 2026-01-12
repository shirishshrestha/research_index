import { AdminStats } from "../admin/components";
import { AuthorStats } from "../author/components";
import { InstitutionStats } from "../institution/components";

export interface BaseUserProfile {
  id: number;
  email: string;
  user_type: "admin" | "author" | "institution";
}

export interface AdminProfile extends BaseUserProfile {
  user_type: "admin";
  is_staff: boolean;
  is_superuser: boolean;
  created_at: string;
  updated_at: string;
  stats: AdminStats;
}

export interface AuthorProfile extends BaseUserProfile {
  user_type: "author";
  title: string;
  full_name: string;
  institute: string;
  designation: string;
  degree: string;
  gender: string;
  profile_picture: string | null;
  profile_picture_url: string | null;
  cv: string | null;
  cv_url: string | null;
  bio: string;
  research_interests: string;
  orcid: string;
  google_scholar: string;
  researchgate: string;
  linkedin: string;
  website: string;
  stats: AuthorStats;
  coauthors: unknown[];
  collaboration_count: number;
}

export interface InstitutionProfile extends BaseUserProfile {
  user_type: "institution";
  institution_name: string;
  institution_type: string;
  logo: string | null;
  logo_url: string | null;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone: string;
  website: string;
  established_year: number | null;
  research_areas: string;
  total_researchers: number | null;
  stats: InstitutionStats;
}

export type UserProfile = AdminProfile | AuthorProfile | InstitutionProfile;

export interface MeResponse {
  user_type: "admin" | "author" | "institution";
  profile: UserProfile;
}
