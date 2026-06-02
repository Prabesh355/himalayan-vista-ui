import { createFileRoute } from "@tanstack/react-router";
import { ReviewManagement } from "@/components/admin/ReviewManagement";

export const Route = createFileRoute("/admin/reviews")({
  component: ReviewManagement,
});
