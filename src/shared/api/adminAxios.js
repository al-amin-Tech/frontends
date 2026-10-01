// src/shared/api/adminApi.js
// TODO: Adjust paths
import { createApiInstance } from "./apiFactory";
import { adminStorage } from "../lib/AdminStorage";

export const adminApi = createApiInstance({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL,
  storage: adminStorage,
  refreshEndpoint: "/auth/refresh/token",
  actor: "admin",
});

export default adminApi;