import { InstitutionStats } from "../dashboard/types";

export interface InstitutionProfile {
  id: number;
  email: string;
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
  research_areas: string[];
  total_researchers: number | null;
  stats: InstitutionStats;
}

export interface InstitutionProfileUpdatePayload {
  institution_name?: string;
  institution_type?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  website?: string;
  established_year?: number | null;
  research_areas?: string | string[];
  total_researchers?: number | null;
  logo?: File | null;
}
