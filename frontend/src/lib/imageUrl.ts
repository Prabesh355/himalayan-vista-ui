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
import nishantKarki from "@/assets/Nishant Karki.jpg";
import sukadevThapa from "@/assets/Sukadev Thapa.jpeg";
import prashantManiTamang from "@/assets/Prashant Mani Tamang.jpg";
import aadarshaBhandari from "@/assets/Aadarsha Bhandari.jpg";
import simonBhattarai from "@/assets/Simon Bhattarai.jpg";
import janguSherpa from "@/assets/Jangu Sherpa.jpg";
import sushantThapa from "@/assets/Sushant Thapa.JPG";
import samraj from "@/assets/Samraj, trekking guide.jpg";
import prashiddha from "@/assets/Prashiddha, trekking guide.jpg";
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

const teamImagesByName: Record<string, string> = {
  "nishant karki": nishantKarki,
  "sukadev thapa": sukadevThapa,
  "prashant mani tamang": prashantManiTamang,
  "aadarsha bhandari": aadarshaBhandari,
  "simon bhattarai": simonBhattarai,
  "jangu sherpa": janguSherpa,
  "sushant thapa": sushantThapa,
  samraj,
  prashidda: prashiddha,
  prashiddha,
};

const shopImagesByName: Record<string, string> = {
  "himalayan trekker": annapurnaCircuit,
  "summit expedition": meraPeakExpedition,
  "everest base camp": everestBaseCamp,
  "annapurna base camp": annapurnaBaseCamp,
  "annapurna circuit trek": annapurnaCircuit,
  "annapurna circuit": annapurnaCircuit,
  "lobuche east": lobucheEast,
  "manaslu and tsum valley": manasluAndTsum,
  "manaslu tsum valley": manasluAndTsum,
  "mera peak ski": meraPeakSki,
  "mera peak expedition": meraPeakExpedition,
  "three pass trek": threePassTrek,
  "kanchenjunga base camp trek": kanchenjungaBaseCamp,
  "kanchenjunga base camp": kanchenjungaBaseCamp,
  "tsho rolpa lake trek": tshoRolpaLake,
  "tsho rolpa valley trek": tshoRolpaLake,
  "tsho rolpa": tshoRolpaLake,
  "api himal base camp trek": apiHimalBaseCamp,
  "api himal base camp": apiHimalBaseCamp,
};

function normalizeText(value?: string) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ");
}

function getUploadCandidateFromName(name?: string, src?: string | null) {
  const rawName = String(name || "").trim();
  if (!rawName) return "";

  const sourceExtension = String(src || "").match(/\.(png|jpe?g|webp|gif)(?:[?#].*)?$/i)?.[1];
  const extension = sourceExtension || "jpg";
  return `/uploads/${encodeURIComponent(rawName)}.${extension}`;
}

export function resolvePackageImage(
  src?: string | null,
  _slug?: string,
  _title?: string,
  fallback = defaultImageFallback,
) {
  return resolveImageUrl(src, fallback);
}

export function resolveShopImage(
  src?: string | null,
  productName?: string,
  fallback = defaultShopImageFallback,
) {
  const providedImage = String(src || "").trim();
  const normalizedName = normalizeText(productName);
  const isUploadedImage =
    providedImage.startsWith("/uploads/") ||
    providedImage.startsWith("uploads/") ||
    /^https?:\/\/[^/]+\/uploads\//i.test(providedImage);

  if (
    providedImage &&
    (isUploadedImage || !["himalayan trekker", "summit expedition"].includes(normalizedName))
  ) {
    return resolveImageUrl(providedImage, fallback);
  }

  if (normalizedName) {
    for (const [name, image] of Object.entries(shopImagesByName)) {
      if (
        normalizedName === name ||
        normalizedName.includes(name) ||
        name.includes(normalizedName)
      ) {
        return image;
      }
    }
  }

  const source = String(src || "").trim();
  const shouldInferUpload =
    !source ||
    source.startsWith("/uploads/") ||
    source.startsWith("uploads/") ||
    /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?\/uploads\//i.test(source);
  const uploadCandidate = shouldInferUpload ? getUploadCandidateFromName(productName, src) : "";
  if (uploadCandidate) {
    return resolveImageUrl(uploadCandidate, fallback);
  }

  return resolveImageUrl(src, fallback);
}

export function resolveTeamImage(
  src?: string | null,
  memberName?: string,
  fallback = defaultImageFallback,
) {
  const providedImage = String(src || "").trim();
  const normalizedName = normalizeText(memberName);
  const isUploadedImage =
    providedImage.startsWith("/uploads/") ||
    providedImage.startsWith("uploads/") ||
    /^https?:\/\/[^/]+\/uploads\//i.test(providedImage);

  if (
    providedImage &&
    (isUploadedImage || !["samraj", "prashidda", "prashiddha"].includes(normalizedName))
  ) {
    return resolveImageUrl(providedImage, fallback);
  }

  if (normalizedName && teamImagesByName[normalizedName]) {
    return teamImagesByName[normalizedName];
  }

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
