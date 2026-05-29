import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShieldCheck, User, Package, BookOpen, MessageSquare } from "lucide-react";

interface AdminStats {
  totalUsers: number;
  activePackages: number;
  totalBookings: number;
  newInquiries: number;
  pendingReviews: number;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  stats?: AdminStats;
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Nomads Navigate Nepal" },
      { name: "description", content: "Admin dashboard for Nomads Navigate Nepal." },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate({ to: '/login' });
      return;
    }

    let parsedUser;
    try {
      parsedUser = JSON.parse(storedUser);
    } catch {
      navigate({ to: '/login' });
      return;
    }

    if (parsedUser.role !== 'admin') {
      navigate({ to: '/' });
      return;
    }

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/admin/dashboard/stats`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(async (res) => {
        const data: ApiResponse = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Unable to load admin stats');
        }
        setStats(data.stats || null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground max-w-3xl">
                Welcome to the Nomads Navigate Nepal admin panel. Monitor users, bookings, packages and content from one place.
              </p>
            </div>
            <div className="rounded-2xl bg-secondary/60 border border-border/50 p-4 text-center">
              <p className="text-sm text-muted-foreground">Admin email</p>
              <p className="font-semibold text-foreground">nomadsnavigatenepal5@gmail.com</p>
            </div>
          </div>
        </div>

        {loading && (
          <div className="rounded-2xl glass border border-border/50 p-10 text-center">
            <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-gradient-sunset border-t-transparent" />
            <p className="mt-4 text-muted-foreground">Loading admin metrics...</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl glass border border-red-500/20 bg-red-500/10 p-6 text-red-800">
            <p className="font-semibold">Unable to load admin dashboard</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        )}

        {stats && (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-12">
            <div className="rounded-2xl glass border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <User className="h-6 w-6 text-gradient-sunset" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl glass border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Package className="h-6 w-6 text-gradient-sunset" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Packages</p>
                  <p className="text-3xl font-bold text-foreground">{stats.activePackages}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl glass border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="h-6 w-6 text-gradient-sunset" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalBookings}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl glass border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-6 w-6 text-gradient-sunset" />
                <div>
                  <p className="text-sm text-muted-foreground">New Inquiries</p>
                  <p className="text-3xl font-bold text-foreground">{stats.newInquiries}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl glass border border-border/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="h-6 w-6 text-gradient-sunset" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pendingReviews}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl glass border border-border/50 p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Admin tools</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="rounded-xl bg-secondary/60 p-4">
                Manage users, assign roles, and keep your team secure.
              </li>
              <li className="rounded-xl bg-secondary/60 p-4">
                Review bookings, approve packages, and respond to new inquiries.
              </li>
              <li className="rounded-xl bg-secondary/60 p-4">
                Monitor admin-only metrics and keep the site running smoothly.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl glass border border-border/50 p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick actions</h2>
            <div className="grid gap-3">
              <button className="w-full rounded-xl bg-gradient-sunset py-3 text-white font-semibold hover:shadow-glow transition-all">
                View all users
              </button>
              <button className="w-full rounded-xl bg-secondary py-3 text-foreground hover:bg-secondary/80 transition-colors">
                Review pending bookings
              </button>
              <button className="w-full rounded-xl bg-secondary py-3 text-foreground hover:bg-secondary/80 transition-colors">
                Check new inquiries
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
