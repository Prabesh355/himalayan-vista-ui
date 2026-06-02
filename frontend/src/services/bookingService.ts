import api from "./api";

export const bookingService = {
  // For standard users
  getMyBookings: async () => {
    const response = await api.get("/bookings/my-bookings");
    return response.data;
  },

  createBooking: async (bookingData: any) => {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  },

  getBookingById: async (id: string) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  // For Admins
  getAllBookings: async (params?: any) => {
    const response = await api.get("/bookings", { params });
    return response.data;
  },

  updateBookingStatus: async (id: string, status: string) => {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  },

  deleteBooking: async (id: string) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },
};
