import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import type { RootState } from "@/store/store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Store reference will be set after store initialization
let store: { getState: () => RootState } | null = null;

export const setApiStore = (storeInstance: { getState: () => RootState }) => {
  store = storeInstance;
};

// Create axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable sending cookies with requests
});

// Request interceptor for adding auth tokens, etc.
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token from Redux store if available
    if (store) {
      const state = store.getState();
      const token = state.auth.tokens?.access;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor is set up in tokenRefresh.ts via setupTokenRefreshInterceptor()
// which handles token refresh on 401 errors

export const api = {
  baseUrl: API_BASE_URL,
  instance: axiosInstance,

  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.get<T>(endpoint, config);
    return response.data;
  },

  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await axiosInstance.post<T>(endpoint, data, config);
    return response.data;
  },

  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await axiosInstance.put<T>(endpoint, data, config);
    return response.data;
  },

  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await axiosInstance.patch<T>(endpoint, data, config);
    return response.data;
  },

  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.delete<T>(endpoint, config);
    return response.data;
  },
};
