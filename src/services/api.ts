import axios from "axios";

/**
 * Central Axios instance.
 *
 * Replace VITE_API_BASE_URL in your env with your Express backend
 * (e.g. http://localhost:5000/api) when ready to wire real endpoints.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("nnn_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Hook for global error toast — wire to sonner where needed.
    return Promise.reject(err);
  },
);

export default api;