// Support page types matching backend models

export interface PricingTier {
  id: number;
  category: string;
  npr_amount: string;
  usd_amount: string;
  purpose: string;
  order: number;
}

export interface SupportBenefit {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface WhySupportPoint {
  id: number;
  title: string;
  description: string;
  order: number;
}

export interface Sponsor {
  id: number;
  name: string;
  logo?: File | string;
  logo_url?: string;
  website_url?: string;
  is_active: boolean;
  order: number;
  show_on_author_supporter: boolean;
  show_on_institutional_supporter: boolean;
  show_on_sponsorship_partnership: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedSponsorResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Sponsor[];
}

export interface SupportPage {
  id: number;
  page_type:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership";
  title: string;
  overview: string;
  pricing_tiers: PricingTier[];
  benefits: SupportBenefit[];
  why_support_points: WhySupportPoint[];
  sponsors: Sponsor[];
  sponsorship_detail?: string;
  partnership_detail?: string;
  created_at: string;
  updated_at: string;
}
