import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DataTable } from './DataTable';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const mockBookings = [
  { id: 'B-1001', customer: 'John Doe', package: 'Everest Base Camp', date: '2026-06-15', status: 'Pending', amount: '$1200' },
  { id: 'B-1002', customer: 'Jane Smith', package: 'Annapurna Circuit', date: '2026-06-20', status: 'Confirmed', amount: '$1400' },
  { id: 'B-1003', customer: 'Alice Johnson', package: 'Langtang Valley', date: '2026-07-05', status: 'Cancelled', amount: '$900' },
];

export const BookingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const columns = [
    { key: 'id', header: 'Booking ID' },
    { key: 'customer', header: 'Customer' },
    { key: 'package', header: 'Package' },
    { key: 'date', header: 'Date' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: any) => {
        let color = 'bg-gray-100 text-gray-700';
        if (item.status === 'Confirmed') color = 'bg-emerald-100 text-emerald-700';
        if (item.status === 'Pending') color = 'bg-amber-100 text-amber-700';
        if (item.status === 'Cancelled') color = 'bg-rose-100 text-rose-700';
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
            {item.status}
          </span>
        );
      }
    },
  ];

  const actions = (item: any) => (
    <div className="flex justify-end gap-2 text-muted-foreground">
      <button 
        onClick={() => setSelectedBooking(item)}
        className="p-1 hover:text-primary transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-1 hover:text-emerald-500 transition-colors" title="Confirm"><CheckCircle className="w-4 h-4" /></button>
      <button className="p-1 hover:text-rose-500 transition-colors" title="Cancel"><XCircle className="w-4 h-4" /></button>
    </div>
  );

  const filteredData = mockBookings.filter(b => 
    b.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage customer bookings and reservations.</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item.id}
          onSearch={setSearchTerm}
          searchPlaceholder="Search by ID or customer..."
          actions={actions}
        />
      </motion.div>

      {/* Booking Details Modal */}
      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Booking Details - {selectedBooking?.id}</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Customer Name</p>
                  <p className="font-semibold">{selectedBooking.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Package</p>
                  <p className="font-semibold">{selectedBooking.package}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Date</p>
                  <p className="font-semibold">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Amount</p>
                  <p className="font-semibold">{selectedBooking.amount}</p>
                </div>
                <div className="col-span-2 mt-4">
                   <label className="text-sm font-medium">Update Status</label>
                   <select className="flex h-10 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="pending" selected={selectedBooking.status === 'Pending'}>Pending</option>
                      <option value="confirmed" selected={selectedBooking.status === 'Confirmed'}>Confirmed</option>
                      <option value="cancelled" selected={selectedBooking.status === 'Cancelled'}>Cancelled</option>
                   </select>
                </div>
              </div>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="mt-4 bg-primary text-primary-foreground h-10 rounded-md font-medium"
              >
                Save Changes
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
