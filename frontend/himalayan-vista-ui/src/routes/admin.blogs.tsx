import { createFileRoute } from '@tanstack/react-router';
import { BlogManagement } from '@/components/admin/BlogManagement';

export const Route = createFileRoute('/admin/blogs')({
  component: AdminBlogs,
});

function AdminBlogs() {
  return <BlogManagement />;
}
