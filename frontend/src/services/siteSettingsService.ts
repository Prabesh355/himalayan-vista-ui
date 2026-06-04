import api from "./api";

export interface CmsLink {
  id?: string;
  label: string;
  href: string;
  placement?: "primary" | "more";
  visible?: boolean;
  order?: number;
}

export interface FooterColumn {
  title: string;
  links: CmsLink[];
}

export interface SiteSettingsData {
  id?: string;
  siteName: string;
  logoUrl?: string;
  faviconUrl?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  googleMapsUrl?: string;
  copyrightText: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  navbarItems: CmsLink[];
  footerTagline: string;
  footerColumns: FooterColumn[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
  };
  promotionalBanner?: {
    enabled?: boolean;
    text?: string;
    linkLabel?: string;
    linkHref?: string;
  };
}

export const siteSettingsService = {
  getSiteSettings: async () => {
    const response = await api.get<{ success: boolean; data: SiteSettingsData }>("/site-settings");
    return response.data;
  },
  updateSiteSettings: async (data: SiteSettingsData) => {
    const response = await api.put<{ success: boolean; message: string; data: SiteSettingsData }>(
      "/site-settings",
      data,
    );
    return response.data;
  },
};
