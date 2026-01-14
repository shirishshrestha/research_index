import { api } from "@/services/api";
import type {
  AccountStatus,
  ChangePasswordRequest,
  ChangePasswordResponse,
  DeactivateAccountRequest,
  DeactivateAccountResponse,
  DeleteAccountRequest,
  DeleteAccountResponse,
} from "../types";

/**
 * Get account status
 */
export const getAccountStatusFn = async (): Promise<AccountStatus> => {
  return api.get("/auth/settings/account-status/");
};

/**
 * Change password
 */
export const changePasswordFn = async (
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  return api.post("/auth/settings/change-password/", data);
};

/**
 * Deactivate account
 */
export const deactivateAccountFn = async (
  data: DeactivateAccountRequest
): Promise<DeactivateAccountResponse> => {
  return api.post("/auth/settings/deactivate-account/", data);
};

/**
 * Delete account
 */
export const deleteAccountFn = async (
  data: DeleteAccountRequest
): Promise<DeleteAccountResponse> => {
  return api.post("/auth/settings/delete-account/", data);
};
