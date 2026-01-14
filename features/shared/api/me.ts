import { api } from "@/services/api";
import type { MeResponse } from "../types/me";

/**
 * Get current authenticated user profile
 */
export const getCurrentUserFn = async (): Promise<MeResponse> => {
  return api.get("/auth/me/");
};
