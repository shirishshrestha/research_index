export interface Institution {
  id: number;
  institution_name: string;
  institution_type: string;
  logo_url: string | null;
  description: string;
  city: string;
  state: string;
  country: string;
  website: string;
  established_year: number | null;
  research_areas: string[] | string;
  journals_count: number;
}

export interface InstitutionDetail extends Institution {
  address: string;
  postal_code: string;
  phone: string;
  total_researchers: number;
  stats: {
    total_publications: number;
    total_citations: number;
    h_index: number;
    i10_index: number;
  } | null;
}

export interface InstitutionFilters {
  country?: string;
  type?: string;
  search?: string;
}

export interface InstitutionProfileProps {
  institution: {
    name: string;
    position: string;
    affiliation: string;
    verifiedEmail: string;
    hIndex: number;
    iIndex: number;
    citations: number;
    about: string;
    disciplines: string[];
  };
}
