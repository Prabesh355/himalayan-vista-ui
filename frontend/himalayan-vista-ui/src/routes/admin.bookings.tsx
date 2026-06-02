import { createFileRoute } from '@tanstack/react-router';
import { BookingManagement } from '@/components/admin/BookingManagement';

export const Route = createFileRoute('/admin/bookings')({
  component: AdminBookings,
});

function AdminBookings() {
  return <BookingManagement />;
}
