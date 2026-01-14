/**
 * Account Status Response
 */
export interface AccountStatus {
  is_active: boolean;
  email: string;
  user_type: "admin" | "author" | "institution";
  created_at: string;
  updated_at: string;
}

/**
 * Change Password Request
 */
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

/**
 * Change Password Response
 */
export interface ChangePasswordResponse {
  message: string;
}

/**
 * Deactivate Account Request
 */
export interface DeactivateAccountRequest {
  password: string;
  confirm_deactivation: boolean;
}

/**
 * Deactivate Account Response
 */
export interface DeactivateAccountResponse {
  message: string;
}

/**
 * Delete Account Request
 */
export interface DeleteAccountRequest {
  password: string;
  confirm_deletion: string;
}

/**
 * Delete Account Response
 */
export interface DeleteAccountResponse {
  message: string;
}
