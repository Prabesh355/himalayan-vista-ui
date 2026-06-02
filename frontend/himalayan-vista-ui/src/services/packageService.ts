import api from './api';

export const packageService = {
  getAllPackages: async (params?: any) => {
    // E.g. params can include filtering: { search: 'Everest', limit: 10 }
    const response = await api.get('/packages', { params });
    return response.data;
  },

  getPackageById: async (id: string) => {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  },

  createPackage: async (packageData: any) => {
    // Dynamic headers based on whether the data is a FormData object (for image uploads)
    const isFormData = packageData instanceof FormData;
    const response = await api.post('/packages', packageData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  updatePackage: async (id: string, packageData: any) => {
    const isFormData = packageData instanceof FormData;
    const response = await api.put(`/packages/${id}`, packageData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });
    return response.data;
  },

  deletePackage: async (id: string) => {
    const response = await api.delete(`/packages/${id}`);
    return response.data;
  },

  getFeaturedPackages: async (params?: any) => {
    const response = await api.get('/packages/featured', { params });
    return response.data;
  },
};
