import { createFileRoute } from "@tanstack/react-router";
import { TeamManagement } from "@/components/admin/TeamManagement";

export const Route = createFileRoute("/admin/teams")({
  component: AdminTeams,
});

function AdminTeams() {
  return <TeamManagement />;
}