import type {
  LoginRequest,
  LoginResponse,
  AuthorRegisterRequest,
  InstitutionRegisterRequest,
  RegisterResponse,
  RefreshTokenResponse,
} from "@/features/auth/types";
import { api } from "@/services/api";
import { AUTH_ENDPOINTS } from "../constants";

/**
 * Login API function
 */
export const loginFn = async (data: LoginRequest): Promise<LoginResponse> => {
  return api.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, data, {
    withCredentials: true,
  });
};

/**
 * Logout API function
 */
export const logoutFn = async (): Promise<{ message: string }> => {
  return api.post<{ message: string }>(AUTH_ENDPOINTS.LOGOUT, {
    withCredentials: true,
  });
};

/**
 * Refresh token API function
 */
export const refreshTokenFn = async (): Promise<RefreshTokenResponse> => {
  return api.post<RefreshTokenResponse>(AUTH_ENDPOINTS.REFRESH_TOKEN, {
    withCredentials: true,
  });
};

/**
 * Register author API function
 */
export const registerAuthorFn = async (
  data: AuthorRegisterRequest
): Promise<RegisterResponse> => {
  return api.post<RegisterResponse>(AUTH_ENDPOINTS.REGISTER_AUTHOR, data, {
    withCredentials: true,
  });
};

/**
 * Register institution API function
 */
export const registerInstitutionFn = async (
  data: InstitutionRegisterRequest
): Promise<RegisterResponse> => {
  return api.post<RegisterResponse>(AUTH_ENDPOINTS.REGISTER_INSTITUTION, data, {
    withCredentials: true,
  });
};
