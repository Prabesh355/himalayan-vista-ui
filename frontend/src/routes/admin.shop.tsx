import { createFileRoute } from "@tanstack/react-router";
import { ProductManagement } from "@/components/admin/ProductManagement";

export const Route = createFileRoute("/admin/shop")({
  component: AdminShop,
});

function AdminShop() {
  return <ProductManagement />;
}
