import { api } from "@/services/api";
import type { SupportPage } from "./types";

const SUPPORT_API_BASE = "/support/pages";

export const supportApi = {
  // Get Author Supporter page
  getAuthorSupporter: async (): Promise<SupportPage> => {
    return api.get<SupportPage>(`${SUPPORT_API_BASE}/author_supporter/`);
  },

  // Get Institutional Supporter page
  getInstitutionalSupporter: async (): Promise<SupportPage> => {
    return api.get<SupportPage>(`${SUPPORT_API_BASE}/institutional_supporter/`);
  },

  // Get Sponsorship & Partnership page
  getSponsorshipPartnership: async (): Promise<SupportPage> => {
    return api.get<SupportPage>(`${SUPPORT_API_BASE}/sponsorship_partnership/`);
  },
};
