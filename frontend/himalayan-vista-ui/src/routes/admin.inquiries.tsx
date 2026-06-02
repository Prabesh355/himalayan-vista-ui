import { createFileRoute } from '@tanstack/react-router';
import { InquiryManagement } from '@/components/admin/InquiryManagement';

export const Route = createFileRoute('/admin/inquiries')({
  component: AdminInquiries,
});

function AdminInquiries() {
  return <InquiryManagement />;
}
