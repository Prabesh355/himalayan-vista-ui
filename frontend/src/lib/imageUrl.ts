import fallbackImage from "@/assets/Everest Base Camp.jpeg";
import shopFallbackImage from "@/assets/Annapurna Base Camp.jpg";
import everestBaseCamp from "@/assets/Everest Base Camp.jpeg";
import annapurnaBaseCamp from "@/assets/Annapurna Base Camp.jpg";
import annapurnaCircuit from "@/assets/Annapurna Circuit Trek.jpg";
import lobucheEast from "@/assets/Lobuche East.jpg";
import manasluAndTsum from "@/assets/Manaslu and Tsum Valley.jpg";
import meraPeakSki from "@/assets/Mera Peak Ski.jpeg";
import meraPeakExpedition from "@/assets/Mera Peak Expedition.jpg";
import threePassTrek from "@/assets/Three Pass Trek.jpg";
import kanchenjungaBaseCamp from "@/assets/Kanchenjunga Base Camp Trek.JPG";
import tshoRolpaLake from "@/assets/Tsho Rolpa Lake Trek.JPG";
import apiHimalBaseCamp from "@/assets/Api Himal Base Camp Trek.JPG";
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

const packageImagesBySlug: Record<string, string> = {
  "everest-base-camp": everestBaseCamp,
  "annapurna-base-camp": annapurnaBaseCamp,
  "annapurna-circuit-trek": annapurnaCircuit,
  "lobuche-east": lobucheEast,
  "manaslu-tsum-valley": manasluAndTsum,
  "mera-peak-ski": meraPeakSki,
  "mera-peak-expedition": meraPeakExpedition,
  "three-pass-trek": threePassTrek,
  "kanchenjunga-base-camp-trek": kanchenjungaBaseCamp,
  "tsho-rolpa-lake-trek": tshoRolpaLake,
  "api-himal-base-camp-trek": apiHimalBaseCamp,
};

const packageImagesByTitle: Record<string, string> = {
  "everest base camp": everestBaseCamp,
  "annapurna base camp": annapurnaBaseCamp,
  "annapurna circuit trek": annapurnaCircuit,
  "lobuche east": lobucheEast,
  "manaslu and tsum valley": manasluAndTsum,
  "mera peak ski": meraPeakSki,
  "mera peak expedition": meraPeakExpedition,
  "three pass trek": threePassTrek,
  "kanchenjunga base camp trek": kanchenjungaBaseCamp,
  "tsho rolpa lake trek": tshoRolpaLake,
  "api himal base camp trek": apiHimalBaseCamp,
};

function normalizeText(value?: string) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ");
}

export function resolvePackageImage(
  src?: string | null,
  slug?: string,
  title?: string,
  fallback = defaultImageFallback,
) {
  const normalizedSlug = normalizeText(slug || title || "").replace(/\s+/g, "-");
  if (normalizedSlug && packageImagesBySlug[normalizedSlug]) {
    return packageImagesBySlug[normalizedSlug];
  }

  const normalizedTitle = normalizeText(title);
  if (normalizedTitle && packageImagesByTitle[normalizedTitle]) {
    return packageImagesByTitle[normalizedTitle];
  }

  if (normalizedTitle.includes("everest base camp")) return everestBaseCamp;
  if (normalizedTitle.includes("annapurna base camp")) return annapurnaBaseCamp;
  if (normalizedTitle.includes("annapurna circuit")) return annapurnaCircuit;
  if (normalizedTitle.includes("lobuche east")) return lobucheEast;
  if (normalizedTitle.includes("manaslu")) return manasluAndTsum;
  if (normalizedTitle.includes("mera peak")) {
    if (normalizedTitle.includes("ski")) return meraPeakSki;
    return meraPeakExpedition;
  }
  if (normalizedTitle.includes("three pass")) return threePassTrek;

  return resolveImageUrl(src, fallback);
}

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

  if (/^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?\//i.test(value)) {
    try {
      const parsed = new URL(value);
      const origin = getApiOrigin();
      if (origin) {
        return `${origin}${parsed.pathname}${parsed.search}`;
      }
    } catch {
      // fall back to the original URL if parsing fails
    }
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
