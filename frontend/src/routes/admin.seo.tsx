import { createFileRoute } from "@tanstack/react-router";
import { SeoDashboard } from "@/components/admin/SeoDashboard";

export const Route = createFileRoute("/admin/seo")({
  component: SeoDashboard,
});
