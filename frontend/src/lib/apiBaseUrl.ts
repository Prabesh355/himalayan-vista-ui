const FALLBACK_PROD_API_BASE_URL = "https://himalayan-vista-backend.onrender.com/api";
const FALLBACK_DEV_API_BASE_URL = "http://localhost:5001/api";

function trimTrailingSlash(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function isLocalUrl(url: string) {
  try {
    const parsed = new URL(url);
    return ["localhost", "127.0.0.1", "::1"].includes(parsed.hostname);
  } catch {
    return false;
  }
}

function pointsToCurrentFrontend(url: string) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.origin === window.location.origin;
  } catch {
    return false;
  }
}

export function getApiBaseUrl() {
  const configured = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;

  if (configured) {
    const normalized = trimTrailingSlash(configured);

    if (import.meta.env.PROD && (isLocalUrl(normalized) || pointsToCurrentFrontend(normalized))) {
      console.warn(
        `Ignoring invalid production API URL "${normalized}". Falling back to ${FALLBACK_PROD_API_BASE_URL}.`,
      );
      return FALLBACK_PROD_API_BASE_URL;
    }

    return normalized;
  }

  if (import.meta.env.PROD) {
    return FALLBACK_PROD_API_BASE_URL;
  }

  return FALLBACK_DEV_API_BASE_URL;
}
