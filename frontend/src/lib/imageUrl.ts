import fallbackImage from "@/assets/Everest Base Camp.jpeg";
import shopFallbackImage from "@/assets/Annapurna Base Camp.jpg";
import { getApiBaseUrl } from "@/lib/apiBaseUrl";
import type React from "react";

function getApiOrigin() {
  try {
    return new URL(getApiBaseUrl()).origin;
  } catch {
    return "";
  }
}

export const defaultImageFallback = fallbackImage;
export const defaultShopImageFallback = shopFallbackImage;

export function resolveImageUrl(src?: string | null, fallback = defaultImageFallback) {
  const value = String(src || "").trim();

  if (!value) return fallback;
  if (/^(https?:|data:|blob:)/i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;

  if (value.startsWith("/uploads/") || value.startsWith("uploads/")) {
    const path = value.startsWith("/") ? value : `/${value}`;
    const origin = getApiOrigin();
    return origin ? `${origin}${path}` : path;
  }

  if (value.startsWith("/")) return value;

  return value;
}

export function useFallbackImage(fallback = defaultImageFallback) {
  return (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (event.currentTarget.src !== fallback) {
      event.currentTarget.src = fallback;
    }
  };
}
