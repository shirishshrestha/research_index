import { AuthorStats } from "../dashboard/types";

export interface Coauthor {
  id: number;
  name: string;
  email: string;
  collaboration_count: number;
}

export interface AuthorProfile {
  id: number;
  email: string;
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
  coauthors: Coauthor[];
  collaboration_count: number;
}

export interface AuthorProfileUpdatePayload {
  title?: string;
  full_name?: string;
  institute?: string;
  designation?: string;
  degree?: string;
  gender?: string;
  bio?: string;
  research_interests?: string;
  orcid?: string;
  google_scholar?: string;
  researchgate?: string;
  linkedin?: string;
  website?: string;
  profile_picture?: File | null;
  cv?: File | null;
}
