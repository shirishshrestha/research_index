import { useQuery } from "@tanstack/react-query";
import { supportApi } from "./api";

export const SUPPORT_QUERY_KEYS = {
  authorSupporter: ["support", "author-supporter"],
  institutionalSupporter: ["support", "institutional-supporter"],
  sponsorshipPartnership: ["support", "sponsorship-partnership"],
  sponsors: ["support", "sponsors"],
};

export function useAuthorSupporterQuery() {
  return useQuery({
    queryKey: SUPPORT_QUERY_KEYS.authorSupporter,
    queryFn: supportApi.getAuthorSupporter,
    staleTime: 1000 * 60 * 30, // 30 minutes - support pages don't change often
  });
}

export function useInstitutionalSupporterQuery() {
  return useQuery({
    queryKey: SUPPORT_QUERY_KEYS.institutionalSupporter,
    queryFn: supportApi.getInstitutionalSupporter,
    staleTime: 1000 * 60 * 30,
  });
}

export function useSponsorshipPartnershipQuery() {
  return useQuery({
    queryKey: SUPPORT_QUERY_KEYS.sponsorshipPartnership,
    queryFn: supportApi.getSponsorshipPartnership,
    staleTime: 1000 * 60 * 30,
  });
}

export function useSponsorsQuery() {
  return useQuery({
    queryKey: SUPPORT_QUERY_KEYS.sponsors,
    queryFn: supportApi.getAllSponsors,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
