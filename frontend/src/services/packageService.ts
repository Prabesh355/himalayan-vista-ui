import api from "./api";

export const packageService = {
  getAllPackages: async (params?: any) => {
    try {
      const response = await api.get("/packages", { params });
      return response.data;
    } catch (err: any) {
      const status = err.response?.status;
      const databaseUnavailable =
        !err.response || status === 502 || status === 503 || status === 504;
      if (databaseUnavailable || err.code === "ERR_NETWORK" || err.message?.includes("Network Error")) {
        const mockModule = await import("./mockData");
        const fallbackData = mockModule.destinations.map((d) => {
          const daysMatch = d.duration ? d.duration.match(/(\d+)\s*days?/i) : null;
          const days = daysMatch ? Number(daysMatch[1]) : 1;
          const nights = Math.max(0, days - 1);
          return {
            id: d.slug,
            _id: d.slug,
            slug: d.slug,
            title: d.name,
            description: d.description,
            destination: d.region,
            price: d.priceFrom || 0,
            duration: { days, nights },
            images: d.image ? [d.image] : [],
            groupSize: { min: 1, max: 12 },
            featured: d.rating >= 4.8,
            isActive: true,
            itinerary: d.itinerary || "",
            rating: d.rating || 0,
            reviewCount: d.reviews || 0,
          };
        });
        return {
          success: true,
          data: fallbackData,
        };
      }
      throw err;
    }
  },

  getPackageById: async (id: string) => {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  },

  createPackage: async (packageData: any) => {
    const isFormData = packageData instanceof FormData;
    const response = await api.post("/packages", packageData, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
    return response.data;
  },

  updatePackage: async (id: string, packageData: any) => {
    const isFormData = packageData instanceof FormData;
    const response = await api.put(`/packages/${id}`, packageData, {
      headers: isFormData ? { "Content-Type": "multipart/form-data" } : {},
    });
    return response.data;
  },

  deletePackage: async (id: string) => {
    const response = await api.delete(`/packages/${id}`);
    return response.data;
  },

  getFeaturedPackages: async (params?: any) => {
    try {
      const response = await api.get("/packages/featured", { params });
      return response.data;
    } catch (err: any) {
      const status = err.response?.status;
      const databaseUnavailable =
        !err.response || status === 502 || status === 503 || status === 504;
      if (databaseUnavailable || err.code === "ERR_NETWORK" || err.message?.includes("Network Error")) {
        const mockModule = await import("./mockData");
        const fallbackData = mockModule.destinations
          .filter((d) => d.rating >= 4.7)
          .map((d) => {
            const daysMatch = d.duration ? d.duration.match(/(\d+)\s*days?/i) : null;
            const days = daysMatch ? Number(daysMatch[1]) : 1;
            const nights = Math.max(0, days - 1);
            return {
              id: d.slug,
              _id: d.slug,
              slug: d.slug,
              title: d.name,
              description: d.description,
              destination: d.region,
              price: d.priceFrom || 0,
              duration: { days, nights },
              images: d.image ? [d.image] : [],
              groupSize: { min: 1, max: 12 },
              featured: true,
              isActive: true,
              itinerary: d.itinerary || "",
              rating: d.rating || 0,
              reviewCount: d.reviews || 0,
            };
          });
        return {
          success: true,
          data: fallbackData,
        };
      }
      throw err;
    }
  },
};
