import React from "react";
import { AdminLayout } from "./AdminLayout";
import { DashboardOverview } from "./DashboardOverview";
import { PackageManagement } from "./PackageManagement";
import { BookingManagement } from "./BookingManagement";
import { UserManagement } from "./UserManagement";

// Note: In a real TanStack Router app, these would be separate route components.
// For demonstration, we aggregate them here or you can drop them directly into your route files.
export const AdminDashboard = ({
  view = "dashboard",
}: {
  view?: "dashboard" | "packages" | "bookings" | "users";
}) => {
  return (
    <AdminLayout>
      {view === "dashboard" && <DashboardOverview />}
      {view === "packages" && <PackageManagement />}
      {view === "bookings" && <BookingManagement />}
      {view === "users" && <UserManagement />}
    </AdminLayout>
  );
};
