import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";

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
  }, [navigate]);

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}
