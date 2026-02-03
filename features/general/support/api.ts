import { api } from "@/services/api";
import type { SupportPage, Sponsor } from "./types";

export const supportApi = {
  // Get Author Supporter page
  getAuthorSupporter: async (): Promise<SupportPage> => {
    return api.get<SupportPage>(`/support/author-supporter/`);
  },

  // Get Institutional Supporter page
  getInstitutionalSupporter: async (): Promise<SupportPage> => {
    return api.get<SupportPage>(`/support/institutional-supporter/`);
  },

  // Get Sponsorship & Partnership page
  getSponsorshipPartnership: async (): Promise<SupportPage> => {
    return api.get<SupportPage>(`/support/sponsorship-partnership/`);
  },

  // Sponsor management
  getAllSponsors: async (): Promise<Sponsor[]> => {
    return api.get<Sponsor[]>(`/support/sponsors/`);
  },

  createSponsor: async (data: FormData): Promise<Sponsor> => {
    return api.post<Sponsor>(`/support/sponsors/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  updateSponsor: async (id: number, data: FormData): Promise<Sponsor> => {
    return api.put<Sponsor>(`/support/sponsors/${id}/`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteSponsor: async (id: number): Promise<void> => {
    return api.delete(`/support/sponsors/${id}/`);
  },
};
