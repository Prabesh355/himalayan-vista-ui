const FALLBACK_PROD_API_BASE_URL = "https://himalayan-vista-backend.onrender.com/api";
const FALLBACK_DEV_API_BASE_URL = "http://localhost:5000/api";

function trimTrailingSlash(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getApiBaseUrl() {
  if (import.meta.env.PROD) {
    return FALLBACK_PROD_API_BASE_URL;
  }

  const configured = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;

  if (configured) {
    return trimTrailingSlash(configured);
  }

  return FALLBACK_DEV_API_BASE_URL;
}
