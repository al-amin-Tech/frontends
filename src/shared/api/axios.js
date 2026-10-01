// src/shared/api/userApi.js

import { createApiInstance } from "./apiFactory";
import { storage } from "../lib/storage";

export const api = createApiInstance({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  storage,
  refreshEndpoint: "/auth/refresh/token",
  actor: "user",
});

export default api;




/*


// src/shared/api/axios.js
import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Required for cookies
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
*/