import api from "@/services/api";

export interface DashboardStats {
  totalUsers: number;
  activePackages: number;
  totalBookings: number;
  newInquiries: number;
  pendingReviews: number;
}

export interface BookingOverviewItem {
  _id: string;
  count: number;
  totalRevenue?: number;
}

export interface PaymentOverviewItem {
  _id: string;
  count: number;
}

export interface AdminUser {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  createdAt?: string;
}

export interface BookingRow {
  _id: string;
  id?: string;
  bookingNumber?: string;
  user?:
    | {
        _id?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
      }
    | string;
  package?:
    | {
        _id?: string;
        title?: string;
        destination?: string;
      }
    | string;
  travelDate?: string;
  endDate?: string;
  bookingStatus?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  numberOfTravelers?: number;
  totalPrice?: number;
  specialRequests?: string;
  notes?: string;
  createdAt?: string;
}

export interface PackageItem {
  _id: string;
  id?: string;
  slug?: string;
  title: string;
  description?: string;
  itinerary?: string;
  destination?: string;
  price?: number;
  discountPrice?: number;
  images?: string[];
  duration?: {
    days?: number;
    nights?: number;
  };
  groupSize?: {
    min?: number;
    max?: number;
  };
  groupPriceTiers?: Array<{ min: number; max: number; price: number }>;
  featured?: boolean;
  isActive?: boolean;
  rating?: number;
  reviewCount?: number;
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string;
  robots?: string;
  routeMapEnabled?: boolean;
  routeMapImage?: string;
  routeMapTitle?: string;
  routeMapDescription?: string;
  routeMapAlt?: string;
  routeMapCaption?: string;
  createdAt?: string;
}

export interface ItineraryDayItem { _id: string; id?: string; packageId: string; dayNumber: number; title: string; subtitle?: string; altitude?: string; meals?: string; accommodation?: string; hours?: string; distance?: string; coverImage?: string; gallery?: Array<{ image: string; alt?: string; caption?: string }>; checklist?: string[]; description?: string; notes?: string; tips?: string; sortOrder?: number; }

export interface ProductItem {
  _id: string;
  id?: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  image?: string;
  inStock?: boolean;
  isActive?: boolean;
  rating?: number;
  reviews?: number;
  createdAt?: string;
}

export interface BlogItem {
  _id: string;
  id?: string;
  title: string;
  summary?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  status?: string;
  featuredImage?: string;
  author?:
    | {
        _id?: string;
        name?: string;
        firstName?: string;
        lastName?: string;
      }
    | string;
  slug?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  robots?: string;
  createdAt?: string;
}

export interface TeamItem {
  _id: string;
  id?: string;
  name: string;
  role: string;
  bio?: string;
  avatar?: string;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
}

export interface InquiryItem {
  _id: string;
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject?: string;
  inquiryType?: string;
  message?: string;
  status?: string;
  priority?: string;
  preferredContact?: string;
  response?: string;
  createdAt?: string;
}

export interface ReviewItem {
  _id: string;
  id?: string;
  title?: string;
  comment?: string;
  rating?: number;
  status?: string;
  guestName?: string;
  guestEmail?: string;
  user?: any;
  package?: any;
  createdAt?: string;
}

export const adminService = {
  getDashboardStats: async () =>
    (await api.get<{ success: boolean; stats: DashboardStats }>("/admin/dashboard/stats")).data,
  getBookingOverview: async () =>
    (
      await api.get<{
        success: boolean;
        bookingStats: BookingOverviewItem[];
        paymentStats: PaymentOverviewItem[];
      }>("/bookings/stats/overview")
    ).data,
  getUsers: async () =>
    (await api.get<{ success: boolean; count: number; users: AdminUser[] }>("/admin/users")).data,
  updateUserRole: async (userId: string, role: string) =>
    (await api.put(`/admin/users/${userId}/role`, { role })).data,
  updateUserStatus: async (userId: string, isActive: boolean) =>
    (await api.put(`/admin/users/${userId}/status`, { isActive })).data,
  getBookings: async (params?: Record<string, unknown>) =>
    (
      await api.get<{
        success: boolean;
        count: number;
        total: number;
        pages: number;
        currentPage: number;
        data: BookingRow[];
      }>("/bookings/admin/all", { params })
    ).data,
  updateBookingStatus: async (
    bookingId: string,
    payload: { bookingStatus?: string; paymentStatus?: string; notes?: string },
  ) => (await api.put(`/bookings/${bookingId}/status`, payload)).data,
  getPackages: async (params?: Record<string, unknown>) =>
    (
      await api.get<{
        success: boolean;
        count: number;
        total: number;
        pages: number;
        currentPage: number;
        data: PackageItem[];
      }>("/packages/admin/all", { params })
    ).data,
  createPackage: async (payload: Record<string, unknown>) =>
    (await api.post("/packages", payload)).data,
  updatePackage: async (packageId: string, payload: Record<string, unknown>) =>
    (await api.put(`/packages/${packageId}`, payload)).data,
  deletePackage: async (packageId: string) => (await api.delete(`/packages/${packageId}`)).data,
  getItineraryDays: async (packageId: string) => (await api.get<{ success: boolean; data: ItineraryDayItem[] }>(`/itinerary-days/package/${packageId}`)).data,
  createItineraryDay: async (packageId: string, payload: Partial<ItineraryDayItem>) => (await api.post(`/itinerary-days/package/${packageId}`, payload)).data,
  updateItineraryDay: async (id: string, payload: Partial<ItineraryDayItem>) => (await api.put(`/itinerary-days/${id}`, payload)).data,
  deleteItineraryDay: async (id: string) => (await api.delete(`/itinerary-days/${id}`)).data,
  duplicateItineraryDay: async (id: string) => (await api.post(`/itinerary-days/${id}/duplicate`)).data,
  reorderItineraryDays: async (packageId: string, ids: string[]) => (await api.patch(`/itinerary-days/package/${packageId}/reorder`, { ids })).data,
  getProducts: async (params?: Record<string, unknown>) =>
    (
      await api.get<{
        success: boolean;
        count: number;
        total: number;
        pages: number;
        currentPage: number;
        data: ProductItem[];
      }>("/products/admin/all", { params })
    ).data,
  createProduct: async (payload: Record<string, unknown>) =>
    (await api.post("/products", payload)).data,
  updateProduct: async (productId: string, payload: Record<string, unknown>) =>
    (await api.put(`/products/${productId}`, payload)).data,
  deleteProduct: async (productId: string) => (await api.delete(`/products/${productId}`)).data,
  getBlogs: async () => (await api.get<{ success: boolean; data: BlogItem[] }>("/blogs")).data,
  createBlog: async (payload: Record<string, unknown>) => (await api.post("/blogs", payload)).data,
  updateBlog: async (blogId: string, payload: Record<string, unknown>) =>
    (await api.put(`/blogs/${blogId}`, payload)).data,
  deleteBlog: async (blogId: string) => (await api.delete(`/blogs/${blogId}`)).data,
  getTeamMembers: async () => {
    try {
      return (
        await api.get<{ success: boolean; count?: number; data: TeamItem[] }>(
          "/team-members/admin/all",
        )
      ).data;
    } catch (err: any) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        return (await api.get<{ success: boolean; data: TeamItem[] }>("/team-members")).data;
      }
      throw err;
    }
  },
  createTeamMember: async (payload: Record<string, unknown>) =>
    (await api.post("/team-members", payload)).data,
  updateTeamMember: async (memberId: string, payload: Record<string, unknown>) =>
    (await api.put(`/team-members/${memberId}`, payload)).data,
  deleteTeamMember: async (memberId: string) =>
    (await api.delete(`/team-members/${memberId}`)).data,
  getSeoHealth: async () =>
    (await api.get<{ success: boolean; data: any }>("/seo/health")).data,
  autoFixSeo: async () => (await api.post<{ success: boolean; data: { packagesUpdated: number; blogsUpdated: number } }>("/seo/autofix")).data,
  getInquiries: async () =>
    (await api.get<{ success: boolean; data: InquiryItem[] }>("/inquiries")).data,
  getInquiryStats: async () =>
    (
      await api.get<{
        success: boolean;
        data: {
          total: number;
          byStatus: Array<{ _id: string; count: number }>;
          byPriority: Array<{ _id: string; count: number }>;
        };
      }>("/inquiries/stats")
    ).data,
  updateInquiry: async (inquiryId: string, payload: Record<string, unknown>) =>
    (await api.put(`/inquiries/${inquiryId}`, payload)).data,
  uploadImage: async (formData: FormData) => (await api.post("/uploads", formData)).data,
  respondToInquiry: async (inquiryId: string, response: string) =>
    (await api.post(`/inquiries/${inquiryId}/respond`, { response })).data,
  deleteInquiry: async (inquiryId: string) => (await api.delete(`/inquiries/${inquiryId}`)).data,
  getReviews: async () =>
    (await api.get<{ success: boolean; count: number; reviews: ReviewItem[] }>("/admin/reviews"))
      .data,
  createReview: async (payload: Record<string, unknown>) =>
    (await api.post("/admin/reviews", payload)).data,
  updateReview: async (reviewId: string, payload: Record<string, unknown>) =>
    (await api.put(`/admin/reviews/${reviewId}`, payload)).data,
  approveReview: async (reviewId: string) =>
    (await api.put(`/admin/reviews/${reviewId}/approve`, {})).data,
  deleteReview: async (reviewId: string) => (await api.delete(`/admin/reviews/${reviewId}`)).data,
};
