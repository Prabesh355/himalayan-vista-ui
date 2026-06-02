import axios from "axios";
import { getApiBaseUrl } from "@/lib/apiBaseUrl";

/**
 * Central Axios instance.
 */
export const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor: Attach JWT Token automatically
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        window.localStorage.getItem("token") || window.localStorage.getItem("authToken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle global errors (e.g., Token expiration)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Handle unauthorized or token expiry
    if (err.response?.status === 401) {
      console.warn("Unauthorized. Logging out...");
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("authToken");
      }
    }

    return Promise.reject(err);
  },
);

export default api;
