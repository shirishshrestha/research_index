import {
  useMutation,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query";
import { api } from "@/services/api";
import { SUPPORT_QUERY_KEYS } from "./hooks";
import type {
  SupportPage,
  PricingTier,
  SupportBenefit,
  WhySupportPoint,
  Sponsor,
} from "./types";
import { toast } from "sonner";
import { extractErrorMessage } from "@/utils/errorHandling";

interface UpdateSupportPageData {
  title?: string;
  overview?: string;
}

interface CreatePricingTierData {
  category: string;
  npr_amount: string;
  usd_amount: string;
  purpose: string;
  order: number;
}

interface UpdatePricingTierData extends CreatePricingTierData {}

interface CreateBenefitData {
  title: string;
  description: string;
  order: number;
}

interface UpdateBenefitData extends CreateBenefitData {}

interface CreateWhySupportData {
  title: string;
  description: string;
  order: number;
}

interface UpdateWhySupportData extends CreateWhySupportData {}

// Update Support Page
export const useUpdateSupportPageMutation = (
  pageId: number,
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateSupportPageData) => {
      return api.put<SupportPage>(`/support/pages/${pageType}/`, data);
    },
    onSuccess: (data) => {
      const queryKey =
        pageType === "author_supporter"
          ? SUPPORT_QUERY_KEYS.authorSupporter
          : pageType === "institutional_supporter"
            ? SUPPORT_QUERY_KEYS.institutionalSupporter
            : SUPPORT_QUERY_KEYS.sponsorshipPartnership;

      queryClient.setQueryData(queryKey, data);
      toast.success("Support page updated successfully");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to update support page"));
    },
  });
};

// Pricing Tiers
export const useCreatePricingTierMutation = (
  pageId: number,
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePricingTierData) => {
      return api.post<PricingTier>(`/support/pricing-tiers/`, {
        ...data,
        support_page: pageId,
      });
    },
    onSuccess: () => {
      const queryKey =
        pageType === "author_supporter"
          ? SUPPORT_QUERY_KEYS.authorSupporter
          : pageType === "institutional_supporter"
            ? SUPPORT_QUERY_KEYS.institutionalSupporter
            : SUPPORT_QUERY_KEYS.sponsorshipPartnership;

      queryClient.invalidateQueries({ queryKey });
      toast.success("Pricing tier created successfully");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to create pricing tier"));
    },
  });
};

export const useUpdatePricingTierMutation = (
  pageId: number,
  tierId: number,
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdatePricingTierData) => {
      return api.put<PricingTier>(`/support/pricing-tiers/${tierId}/`, data);
    },
    onSuccess: () => {
      const queryKey =
        pageType === "author_supporter"
          ? SUPPORT_QUERY_KEYS.authorSupporter
          : pageType === "institutional_supporter"
            ? SUPPORT_QUERY_KEYS.institutionalSupporter
            : SUPPORT_QUERY_KEYS.sponsorshipPartnership;

      queryClient.invalidateQueries({ queryKey });
      toast.success("Pricing tier updated successfully");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to update pricing tier"));
    },
  });
};

export const useDeletePricingTierMutation = (
  pageId: number,
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tierId: number) => {
      return api.delete(`/support/pricing-tiers/${tierId}/`);
    },
    onSuccess: () => {
      const queryKey =
        pageType === "author_supporter"
          ? SUPPORT_QUERY_KEYS.authorSupporter
          : pageType === "institutional_supporter"
            ? SUPPORT_QUERY_KEYS.institutionalSupporter
            : SUPPORT_QUERY_KEYS.sponsorshipPartnership;

      queryClient.invalidateQueries({ queryKey });
      toast.success("Pricing tier deleted successfully");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to delete pricing tier"));
    },
  });
};

// Benefits
export const useCreateBenefitMutation = (
  pageId: number,
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBenefitData) => {
      return api.post<SupportBenefit>(`/support/benefits/`, {
        ...data,
        support_page: pageId,
      });
    },
    onSuccess: () => {
      const queryKey =
        pageType === "author_supporter"
          ? SUPPORT_QUERY_KEYS.authorSupporter
          : pageType === "institutional_supporter"
            ? SUPPORT_QUERY_KEYS.institutionalSupporter
            : SUPPORT_QUERY_KEYS.sponsorshipPartnership;

      queryClient.invalidateQueries({ queryKey });
      toast.success("Benefit created successfully");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to create benefit"));
    },
  });
};

export const useDeleteBenefitMutation = (
  pageId: number,
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (benefitId: number) => {
      return api.delete(`/support/benefits/${benefitId}/`);
    },
    onSuccess: () => {
      const queryKey =
        pageType === "author_supporter"
          ? SUPPORT_QUERY_KEYS.authorSupporter
          : pageType === "institutional_supporter"
            ? SUPPORT_QUERY_KEYS.institutionalSupporter
            : SUPPORT_QUERY_KEYS.sponsorshipPartnership;

      queryClient.invalidateQueries({ queryKey });
      toast.success("Benefit deleted successfully");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to delete benefit"));
    },
  });
};

// Why Support Points
export const useCreateWhySupportMutation = (
  pageId: number,
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateWhySupportData) => {
      return api.post<WhySupportPoint>(`/support/why-support/`, {
        ...data,
        support_page: pageId,
      });
    },
    onSuccess: () => {
      const queryKey =
        pageType === "author_supporter"
          ? SUPPORT_QUERY_KEYS.authorSupporter
          : pageType === "institutional_supporter"
            ? SUPPORT_QUERY_KEYS.institutionalSupporter
            : SUPPORT_QUERY_KEYS.sponsorshipPartnership;

      queryClient.invalidateQueries({ queryKey });
      toast.success("Why support point created successfully");
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to create why support point"),
      );
    },
  });
};

export const useDeleteWhySupportMutation = (
  pageId: number,
  pageType:
    | "author_supporter"
    | "institutional_supporter"
    | "sponsorship_partnership",
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pointId: number) => {
      return api.delete(`/support/why-support/${pointId}/`);
    },
    onSuccess: () => {
      const queryKey =
        pageType === "author_supporter"
          ? SUPPORT_QUERY_KEYS.authorSupporter
          : pageType === "institutional_supporter"
            ? SUPPORT_QUERY_KEYS.institutionalSupporter
            : SUPPORT_QUERY_KEYS.sponsorshipPartnership;

      queryClient.invalidateQueries({ queryKey });
      toast.success("Why support point deleted successfully");
    },
    onError: (error) => {
      toast.error(
        extractErrorMessage(error, "Failed to delete why support point"),
      );
    },
  });
};

// Sponsor Management
export const useCreateSponsorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return api.post<Sponsor>(`/support/sponsors/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPORT_QUERY_KEYS.sponsors });
      queryClient.invalidateQueries({
        queryKey: SUPPORT_QUERY_KEYS.authorSupporter,
      });
      queryClient.invalidateQueries({
        queryKey: SUPPORT_QUERY_KEYS.institutionalSupporter,
      });
      queryClient.invalidateQueries({
        queryKey: SUPPORT_QUERY_KEYS.sponsorshipPartnership,
      });
      toast.success("Sponsor created successfully");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to create sponsor"));
    },
  });
};

export const useUpdateSponsorMutation = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      return api.put<Sponsor>(`/support/sponsors/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPORT_QUERY_KEYS.sponsors });
      queryClient.invalidateQueries({
        queryKey: SUPPORT_QUERY_KEYS.authorSupporter,
      });
      queryClient.invalidateQueries({
        queryKey: SUPPORT_QUERY_KEYS.institutionalSupporter,
      });
      queryClient.invalidateQueries({
        queryKey: SUPPORT_QUERY_KEYS.sponsorshipPartnership,
      });
      toast.success("Sponsor updated successfully");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to update sponsor"));
    },
  });
};

export const useDeleteSponsorMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return api.delete(`/support/sponsors/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPORT_QUERY_KEYS.sponsors });
      queryClient.invalidateQueries({
        queryKey: SUPPORT_QUERY_KEYS.authorSupporter,
      });
      queryClient.invalidateQueries({
        queryKey: SUPPORT_QUERY_KEYS.institutionalSupporter,
      });
      queryClient.invalidateQueries({
        queryKey: SUPPORT_QUERY_KEYS.sponsorshipPartnership,
      });
      toast.success("Sponsor deleted successfully");
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error, "Failed to delete sponsor"));
    },
  });
};
