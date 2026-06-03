import api from "./api";

export interface HomeContentData {
  id?: string;
  hero: {
    badgeText: string;
    title: string;
    description: string;
    backgroundImage?: string;
  };
  stats: Array<{ label: string; value: string }>;
  why: Array<{ icon: string; title: string; body: string }>;
  testimonials: Array<{
    id?: string;
    name: string;
    country: string;
    avatar: string;
    quote: string;
    trek: string;
  }>;
  cta: {
    title: string;
    subtitle: string;
  };
}

export const homeContentService = {
  getHomeContent: async () => {
    const response = await api.get<{ success: boolean; data: HomeContentData }>("/home-content");
    return response.data;
  },
  updateHomeContent: async (data: HomeContentData) => {
    const response = await api.put<{ success: boolean; message: string; data: HomeContentData }>("/home-content", data);
    return response.data;
  }
};
