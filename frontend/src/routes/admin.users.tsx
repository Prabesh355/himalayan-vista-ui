import { createFileRoute } from "@tanstack/react-router";
import { UserManagement } from "@/components/admin/UserManagement";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

function AdminUsers() {
  return <UserManagement />;
}
