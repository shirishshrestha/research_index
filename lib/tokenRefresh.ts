import { api } from "@/services/api";
import { store } from "@/store/store";
import { updateAccessToken, logout } from "@/features/auth/redux";
import { refreshTokenFn } from "@/features/auth/api/functions";
import type { AxiosError } from "axios";

interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

/**
 * Setup axios interceptor for automatic token refresh on 401 errors
 *
 * Call this once in your app initialization (e.g., in providers.tsx)
 */
export const setupTokenRefreshInterceptor = () => {
  let isRefreshing = false;
  let failedQueue: QueueItem[] = [];

  const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  api.instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as typeof error.config & {
        _retry?: boolean;
      };

      // Skip token refresh for login, register, and refresh endpoints
      const skipRefreshEndpoints = [
        "/auth/login/",
        "/auth/register/author/",
        "/auth/register/institution/",
        "/auth/token/refresh/",
      ];
      const isSkipEndpoint = skipRefreshEndpoints.some((endpoint) =>
        originalRequest?.url?.includes(endpoint)
      );

      // If error is 401 and we haven't tried to refresh yet and not a skip endpoint
      if (
        error.response?.status === 401 &&
        !originalRequest?._retry &&
        !isSkipEndpoint
      ) {
        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest && originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return api.instance(originalRequest!);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        if (originalRequest) {
          originalRequest._retry = true;
        }
        isRefreshing = true;

        try {
          // Try to refresh the token
          const response = await refreshTokenFn();
          const newAccessToken = response.access;

          // Update Redux store with new access token
          store.dispatch(updateAccessToken(newAccessToken));

          // Process queued requests
          processQueue(null, newAccessToken);

          // Retry original request with new token
          if (originalRequest && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          return api.instance(originalRequest!);
        } catch (refreshError) {
          // Refresh failed - logout user
          processQueue(refreshError, null);
          store.dispatch(logout());

          // Redirect to login if in browser
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};
