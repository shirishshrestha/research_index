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
  logo: string;
  website_url?: string;
  order: number;
}

export interface SponsorshipPoint {
  id: number;
  text: string;
  order: number;
}

export interface PartnershipPoint {
  id: number;
  text: string;
  order: number;
}

export interface SponsorshipPartnershipContent {
  sponsorship_intro: string;
  partnership_intro: string;
  join_cta: string;
  sponsorship_points: SponsorshipPoint[];
  partnership_points: PartnershipPoint[];
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
  sponsorship_content?: SponsorshipPartnershipContent;
  created_at: string;
  updated_at: string;
}
