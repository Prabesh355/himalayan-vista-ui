import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import api from "@/services/api";

type MeResponse = {
  success: boolean;
  user?: {
    role?: string;
  };
};

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
  const [mounted, setMounted] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-current-user"],
    queryFn: async () => (await api.get<MeResponse>("/auth/me")).data,
    retry: false,
    enabled: mounted,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) {
      return;
    }

    if (isError) {
      navigate({ to: "/login" });
      return;
    }

    if (data?.user?.role !== "admin") {
      navigate({ to: "/" });
    }
  }, [data?.user?.role, isError, isLoading, mounted, navigate]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-4">
        <div className="rounded-2xl glass border border-border/50 p-8 text-center max-w-md w-full">
          <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-gradient-sunset border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Verifying admin access…</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
