// src/shared/api/apiFactory.js
import axios from "axios";
import { normalizeApiError } from "./errorHandler";
import { generateIdempotencyKey } from "../utils/idempotency";

export const createApiInstance = ({ 
  baseURL, 
  storage, 
  refreshEndpoint, 
  actor = 'user' 
}) => {
  const api = axios.create({
    baseURL,
    withCredentials: true, // Crucial for sending/receiving HttpOnly cookies
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  let refreshPromise = null;

  const refreshAccessToken = async () => {
    if (!refreshPromise) {
      refreshPromise = api.post(refreshEndpoint, {})
        .then((response) => {
          // Backend sendSecureResponse puts access_token in response.data.data.access_token
          const accessToken = response?.data?.data?.access_token;
          if (!accessToken) throw new Error("No access token returned.");
          
          storage.setAccessToken(accessToken);
          return accessToken;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }
    return refreshPromise;
  };

  // --- Request Interceptor ---
  api.interceptors.request.use(
    (config) => {
      config.headers = config.headers || {};
      const token = storage.getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Idempotency
      if (config.metadata?.idempotent && !config.headers["X-Idempotency-Key"]) {
        config.headers["X-Idempotency-Key"] = generateIdempotencyKey();
      }

      return config;
    },
    (error) => Promise.reject(normalizeApiError(error))
  );

  // --- Response Interceptor ---
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (!originalRequest || !error.response) {
        return Promise.reject(normalizeApiError(error));
      }

      const { status, data } = error.response;
      const code = data?.code;

      const isRefreshRequest = originalRequest.url?.includes(refreshEndpoint);

      // Check for token expiration (adjust code 'TOKEN_EXPIRED' to match your backend's exact error code)
      const shouldRefresh =
        status === 401 &&
        code === "TOKEN_EXPIRED" && // Or whatever code your backend sends
        !originalRequest._retry &&
        !isRefreshRequest;

      if (!shouldRefresh) {
        return Promise.reject(normalizeApiError(error));
      }

      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed: Nuclear option. Clear storage and force logout.
        storage.clearAuth();
        window.dispatchEvent(new Event(`auth:${actor}-logout`)); // e.g., 'auth:user-logout' or 'auth:admin-logout'
        return Promise.reject(normalizeApiError(refreshError));
      }
    }
  );

  return api;
};