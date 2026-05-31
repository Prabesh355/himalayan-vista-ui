import { createFileRoute } from '@tanstack/react-router';
import { PackageManagement } from '@/components/admin/PackageManagement';

export const Route = createFileRoute('/admin/packages')({
  component: AdminPackages,
});

function AdminPackages() {
  return <PackageManagement />;
}
