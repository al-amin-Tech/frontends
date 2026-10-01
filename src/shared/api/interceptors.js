// src/shared/api/interceptors.js
import axios from "axios";
import api from "./axios";
import { storage } from "../lib/storage";
import { normalizeApiError } from "./errorHandler";
import { generateIdempotencyKey } from "../utils/idempotency";

let refreshPromise = null;
let interceptorsInitialized = false;

const refreshAccessToken = async () => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh/token`,
    {},
    {
      withCredentials: true,
    }
  );

  const accessToken = response?.data?.data?.access_token;

  if (!accessToken) {
    throw new Error("No access token returned.");
  }

  storage.setAccessToken(accessToken);

  return accessToken;
};

const getFreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

export const setupInterceptors = () => {
  if (interceptorsInitialized) {
    return;
  }

  interceptorsInitialized = true;

  /**
   * -----------------------------------------------
   * Request interceptor
   * -----------------------------------------------
   */
  api.interceptors.request.use(
    (config) => {
      config.headers = config.headers || {};

      const token = storage.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      /**
       * Idempotency
       *
       * Generate once and preserve
       * during retries.
       */
      if (
        config.metadata?.idempotent &&
        !config.headers["X-Idempotency-Key"]
      ) {
        config.headers["X-Idempotency-Key"] = generateIdempotencyKey();
      }

      return config;
    },
    (error) => Promise.reject(normalizeApiError(error))
  );

  /**
   * -----------------------------------------------
   * Response interceptor
   * -----------------------------------------------
   */
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest) {
        return Promise.reject(normalizeApiError(error));
      }

      if (!error.response) {
        return Promise.reject(normalizeApiError(error));
      }

      const { status, data } = error.response;
      const code = data?.code;

      const isRefreshRequest = originalRequest.url?.includes(
        "/auth/refresh/token"
      );

      const shouldRefresh =
        status === 401 &&
        code === "TOKEN_EXPIRED" &&
        !originalRequest._retry &&
        !isRefreshRequest;

      if (!shouldRefresh) {
        return Promise.reject(normalizeApiError(error));
      }

      originalRequest._retry = true;

      try {
        const newToken = await getFreshAccessToken();

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        /**
         * Existing
         * X-Idempotency-Key
         * remains unchanged.
         */
        return api(originalRequest);
      } catch (refreshError) {
        storage.clearAuth();

        window.dispatchEvent(new Event("auth:logout"));

        return Promise.reject(normalizeApiError(refreshError));
      }
    }
  );
};


