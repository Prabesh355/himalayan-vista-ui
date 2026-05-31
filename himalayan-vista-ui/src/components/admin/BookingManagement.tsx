import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { DataTable } from './DataTable';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { adminService, BookingRow } from '@/services/adminService';

export const BookingManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<BookingRow | null>(null);
  const [bookingStatus, setBookingStatus] = useState('pending');
  const [paymentStatus, setPaymentStatus] = useState('pending');

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: () => adminService.getBookings({ limit: 100, sort: '-createdAt' }),
  });

  const updateBookingMutation = useMutation({
    mutationFn: ({ bookingId, payload }: { bookingId: string; payload: { bookingStatus: string; paymentStatus: string } }) =>
      adminService.updateBookingStatus(bookingId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      setSelectedBooking(null);
    },
  });

  const bookings = data?.data || [];

  const filteredData = useMemo(() => {
    return bookings.filter((booking) => {
      const userName = typeof booking.user === 'string'
        ? booking.user
        : `${booking.user?.firstName || ''} ${booking.user?.lastName || ''}`;
      const packageTitle = typeof booking.package === 'string' ? booking.package : booking.package?.title || '';
      const term = searchTerm.toLowerCase();

      return (
        (booking.bookingNumber || booking._id).toLowerCase().includes(term) ||
        userName.toLowerCase().includes(term) ||
        packageTitle.toLowerCase().includes(term)
      );
    });
  }, [bookings, searchTerm]);

  const columns = [
    { key: 'bookingNumber', header: 'Booking ID' },
    {
      key: 'customer',
      header: 'Customer',
      render: (item: BookingRow) =>
        typeof item.user === 'string' ? item.user : `${item.user?.firstName || ''} ${item.user?.lastName || ''}`.trim() || item.user?.email || 'Unknown',
    },
    {
      key: 'package',
      header: 'Package',
      render: (item: BookingRow) => (typeof item.package === 'string' ? item.package : item.package?.title || 'Unknown'),
    },
    {
      key: 'travelDate',
      header: 'Travel Date',
      render: (item: BookingRow) => item.travelDate ? new Date(item.travelDate).toLocaleDateString() : '—',
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: BookingRow) => {
        const status = item.bookingStatus || 'pending';
        let color = 'bg-gray-100 text-gray-700';
        if (status === 'confirmed') color = 'bg-emerald-100 text-emerald-700';
        if (status === 'pending') color = 'bg-amber-100 text-amber-700';
        if (status === 'cancelled') color = 'bg-rose-100 text-rose-700';
        if (status === 'completed') color = 'bg-sky-100 text-sky-700';

        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{status}</span>;
      },
    },
    {
      key: 'paymentStatus',
      header: 'Payment',
      render: (item: BookingRow) => item.paymentStatus || 'pending',
    },
  ];

  const actions = (item: BookingRow) => (
    <div className="flex justify-end gap-2 text-muted-foreground">
      <button
        onClick={() => {
          setSelectedBooking(item);
          setBookingStatus(item.bookingStatus || 'pending');
          setPaymentStatus(item.paymentStatus || 'pending');
        }}
        className="p-1 hover:text-primary transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-1 hover:text-emerald-500 transition-colors" title="Confirm">
        <CheckCircle className="w-4 h-4" />
      </button>
      <button className="p-1 hover:text-rose-500 transition-colors" title="Cancel">
        <XCircle className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage customer bookings and reservations.</p>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-700">Unable to load bookings: {error instanceof Error ? error.message : 'Please try again.'}</div>}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item._id || item.id || item.bookingNumber || ''}
          onSearch={setSearchTerm}
          searchPlaceholder="Search by booking ID, customer, or package..."
          actions={actions}
          isLoading={isLoading}
        />
      </motion.div>

      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle>Booking Details - {selectedBooking?.bookingNumber || selectedBooking?._id}</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Customer</p>
                  <p className="font-semibold">
                    {typeof selectedBooking.user === 'string'
                      ? selectedBooking.user
                      : `${selectedBooking.user?.firstName || ''} ${selectedBooking.user?.lastName || ''}`.trim() || selectedBooking.user?.email || 'Unknown'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Package</p>
                  <p className="font-semibold">{typeof selectedBooking.package === 'string' ? selectedBooking.package : selectedBooking.package?.title || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Travel Date</p>
                  <p className="font-semibold">{selectedBooking.travelDate ? new Date(selectedBooking.travelDate).toLocaleDateString() : '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Amount</p>
                  <p className="font-semibold">${selectedBooking.totalPrice?.toLocaleString() || 0}</p>
                </div>
                <div className="col-span-2 grid gap-3 mt-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Booking Status</label>
                    <select value={bookingStatus} onChange={(e) => setBookingStatus(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Payment Status</label>
                    <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="pending">Pending</option>
                      <option value="partial">Partial</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                onClick={() => updateBookingMutation.mutate({ bookingId: selectedBooking._id || selectedBooking.id || '', payload: { bookingStatus, paymentStatus } })}
                className="mt-4 bg-primary text-primary-foreground h-10 rounded-md font-medium disabled:opacity-50"
                disabled={updateBookingMutation.isPending}
              >
                {updateBookingMutation.isPending ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
