import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, User, Mail, BookOpen, Heart, Settings } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Nomads Navigate Nepal" },
      { name: "description", content: "Your dashboard — Nomads Navigate Nepal." },
    ],
  }),
  component: Dashboard,
});

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    const authToken = localStorage.getItem("authToken");

    if (!storedUser || !authToken) {
      // Redirect to login if no auth token
      navigate({ to: "/login" });
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } catch (err) {
      console.error("Error parsing user data:", err);
      navigate({ to: "/login" });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate({ to: "/" });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient-sunset mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-foreground mb-2">
                Welcome back, <span className="text-gradient-sunset">{user.firstName}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Manage your treks, bookings, and account preferences
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {/* User Info Card */}
          <div className="rounded-2xl glass border border-border/50 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-sunset flex items-center justify-center text-white text-2xl font-bold">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <button className="w-full py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors font-medium text-foreground">
              Edit Profile
            </button>
          </div>

          {/* Quick Stats */}
          <div className="rounded-2xl glass border border-border/50 p-6">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="h-8 w-8 text-gradient-sunset" />
              <div>
                <p className="text-sm text-muted-foreground">Active Bookings</p>
                <p className="text-3xl font-bold text-foreground">0</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">No active treks booked</p>
          </div>

          <div className="rounded-2xl glass border border-border/50 p-6">
            <div className="flex items-center gap-4 mb-4">
              <Heart className="h-8 w-8 text-gradient-sunset" />
              <div>
                <p className="text-sm text-muted-foreground">Saved Treks</p>
                <p className="text-3xl font-bold text-foreground">0</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Add your favorite treks</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Bookings Section */}
          <div className="rounded-2xl glass border border-border/50 p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Your Bookings</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border/50 text-center">
                <p className="text-muted-foreground">No bookings yet</p>
                <button className="mt-3 text-sm text-gradient-sunset hover:opacity-80 font-semibold">
                  Browse Treks →
                </button>
              </div>
            </div>
          </div>

          {/* Account Settings Section */}
          <div className="rounded-2xl glass border border-border/50 p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Account Settings</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-foreground hover:text-foreground">
                <User className="h-5 w-5 text-gradient-sunset" />
                <div className="text-left">
                  <p className="font-medium">Profile Information</p>
                  <p className="text-xs text-muted-foreground">Update your personal details</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-foreground hover:text-foreground">
                <Mail className="h-5 w-5 text-gradient-sunset" />
                <div className="text-left">
                  <p className="font-medium">Email & Notifications</p>
                  <p className="text-xs text-muted-foreground">Manage your communication preferences</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-foreground hover:text-foreground">
                <Settings className="h-5 w-5 text-gradient-sunset" />
                <div className="text-left">
                  <p className="font-medium">Preferences</p>
                  <p className="text-xs text-muted-foreground">Customize your experience</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 rounded-2xl glass border border-border/50 p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Browse our collection of premium Himalayan treks and start planning your unforgettable journey.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-sunset text-white font-semibold hover:shadow-glow transition-all hover:-translate-y-0.5">
            Explore Treks
          </button>
        </div>
      </div>
    </div>
  );
}
