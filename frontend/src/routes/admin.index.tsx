import { createFileRoute } from "@tanstack/react-router";
import { DashboardOverview } from "@/components/admin/DashboardOverview";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  return <DashboardOverview />;
}
