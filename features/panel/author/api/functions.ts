import { api } from "@/services/api";

/**
 * Get Profile function
 */
export const getProfileFn = async () => {
  return api.get("/auth/me/");
};
