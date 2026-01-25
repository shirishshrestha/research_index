// Author list item (for listing pages)
export interface Author {
  id: number;
  title: string;
  full_name: string;
  institute: string;
  designation: string;
  degree: string;
  profile_picture_url: string | null;
  bio: string;
  research_interests: string;
  orcid: string;
  google_scholar: string;
  publications_count: number;
}

// Author stats
export interface AuthorStats {
  h_index: number;
  i10_index: number;
  total_citations: number;
  total_reads: number;
  total_downloads: number;
  recommendations_count: number;
  total_publications: number;
  avg_citations_per_publication: number;
  last_updated: string;
}

// Co-author
export interface CoAuthor {
  id: number | null;
  name: string;
  email: string | null;
  institute: string | null;
  is_registered: boolean;
}

// Author detail (for single author page)
export interface AuthorDetail {
  id: number;
  title: string;
  full_name: string;
  institute: string;
  designation: string;
  degree: string;
  gender: string;
  profile_picture_url: string | null;
  cv_url: string | null;
  bio: string;
  research_interests: string;
  orcid: string;
  google_scholar: string;
  researchgate: string;
  linkedin: string;
  website: string;
  publications_count: number;
  stats: AuthorStats | null;
  coauthors: CoAuthor[];
}

// Author filters
export interface AuthorFilters {
  institute?: string;
  designation?: string;
  search?: string;
}

// Legacy interface for backward compatibility
export interface AuthorProfileProps {
  author: {
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
