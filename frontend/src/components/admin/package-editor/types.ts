export type TabKey = "general" | "itinerary" | "images" | "route-map" | "pricing" | "seo" | "overview";

export type PackageFormState = {
  title: string;
  description: string;
  destination: string;
  price: string;
  discountPrice: string;
  durationDays: string;
  durationNights: string;
  images: string[];
  groupSizeMin: string;
  groupSizeMax: string;
  featured: boolean;
  isActive: boolean;
  itinerary: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  canonicalUrl: string;
  ogImage: string;
  keywords: string;
  robots: string;
  routeMapEnabled: boolean;
  routeMapImage: string;
  routeMapTitle: string;
  routeMapDescription: string;
  routeMapAlt: string;
  routeMapCaption: string;
};

export type PackageEditorMutationOptions = {
  isDraft?: boolean;
  silent?: boolean;
};

export type PackageEditorFieldErrors = Partial<Record<keyof PackageFormState, string>> & {
  [key: string]: string | undefined;
};
