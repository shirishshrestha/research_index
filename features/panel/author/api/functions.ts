import { api } from "@/services/api";
import { MeResponse } from "../../types";

/**
 * Get Profile function
 */
export const getProfileFn = async (): Promise<MeResponse> => {
  return api.get("/auth/me/");
};
