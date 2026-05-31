import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { DataTable } from './DataTable';
import { Eye, Mail, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { adminService, InquiryItem } from '@/services/adminService';

export const InquiryManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);
  const [status, setStatus] = useState('new');
  const [priority, setPriority] = useState('medium');
  const [response, setResponse] = useState('');

  const inquiriesQuery = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: () => adminService.getInquiries(),
  });

  const statsQuery = useQuery({
    queryKey: ['admin-inquiry-stats'],
    queryFn: () => adminService.getInquiryStats(),
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!selectedInquiry) return null;

      await adminService.updateInquiry(selectedInquiry._id || selectedInquiry.id || '', {
        status,
        priority,
      });

      if (response.trim()) {
        await adminService.respondToInquiry(selectedInquiry._id || selectedInquiry.id || '', response.trim());
      }

      return true;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
      await queryClient.invalidateQueries({ queryKey: ['admin-inquiry-stats'] });
      setSelectedInquiry(null);
      setResponse('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (inquiryId: string) => adminService.deleteInquiry(inquiryId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
      await queryClient.invalidateQueries({ queryKey: ['admin-inquiry-stats'] });
    },
  });

  const inquiries = inquiriesQuery.data?.data || [];
  const stats = statsQuery.data?.data;

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return inquiries.filter((inquiry) => {
      const haystack = [
        inquiry.firstName,
        inquiry.lastName,
        inquiry.email,
        inquiry.subject,
        inquiry.inquiryType,
        inquiry.status,
        inquiry.priority,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [inquiries, searchTerm]);

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (item: InquiryItem) => `${item.firstName} ${item.lastName}`,
    },
    { key: 'email', header: 'Email' },
    { key: 'subject', header: 'Subject' },
    {
      key: 'status',
      header: 'Status',
      render: (item: InquiryItem) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'replied' ? 'bg-emerald-100 text-emerald-700' : item.status === 'closed' ? 'bg-slate-100 text-slate-700' : 'bg-amber-100 text-amber-700'}`}>
          {item.status || 'new'}
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (item: InquiryItem) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.priority === 'high' ? 'bg-rose-100 text-rose-700' : item.priority === 'low' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-700'}`}>
          {item.priority || 'medium'}
        </span>
      ),
    },
  ];

  const actions = (item: InquiryItem) => (
    <div className="flex justify-end gap-2 text-muted-foreground">
      <button
        className="p-1 hover:text-primary transition-colors"
        title="View"
        onClick={() => {
          setSelectedInquiry(item);
          setStatus(item.status || 'new');
          setPriority(item.priority || 'medium');
          setResponse(item.response || '');
        }}
      >
        <Eye className="w-4 h-4" />
      </button>
      <button className="p-1 hover:text-primary transition-colors" title="Email">
        <Mail className="w-4 h-4" />
      </button>
      <button className="p-1 hover:text-red-500 transition-colors" title="Delete" onClick={() => deleteMutation.mutate(item._id || item.id || '')}>
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
          <p className="text-muted-foreground">Review and respond to customer inquiries.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-card border p-4">
          <p className="text-sm text-muted-foreground">Total Inquiries</p>
          <p className="mt-2 text-3xl font-bold">{stats?.total ?? inquiries.length}</p>
        </div>
        <div className="rounded-xl bg-card border p-4">
          <p className="text-sm text-muted-foreground">New</p>
          <p className="mt-2 text-3xl font-bold">{stats?.byStatus?.find((item) => item._id === 'new')?.count ?? 0}</p>
        </div>
        <div className="rounded-xl bg-card border p-4">
          <p className="text-sm text-muted-foreground">Replied</p>
          <p className="mt-2 text-3xl font-bold">{stats?.byStatus?.find((item) => item._id === 'replied')?.count ?? 0}</p>
        </div>
      </div>

      {(inquiriesQuery.error || statsQuery.error) && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-700">
          Unable to load inquiries: {(inquiriesQuery.error || statsQuery.error) instanceof Error ? (inquiriesQuery.error || statsQuery.error)?.message : 'Please try again.'}
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item._id || item.id || item.email}
          onSearch={setSearchTerm}
          searchPlaceholder="Search inquiries..."
          actions={actions}
          isLoading={inquiriesQuery.isLoading}
        />
      </motion.div>

      <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
          </DialogHeader>
          {selectedInquiry && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Name</p>
                  <p className="font-semibold">{selectedInquiry.firstName} {selectedInquiry.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Email</p>
                  <p className="font-semibold">{selectedInquiry.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Subject</p>
                  <p className="font-semibold">{selectedInquiry.subject || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Type</p>
                  <p className="font-semibold">{selectedInquiry.inquiryType || '—'}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Message</p>
                <div className="mt-2 rounded-lg border bg-secondary/40 p-4 text-sm">
                  {selectedInquiry.message || '—'}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="new">New</option>
                    <option value="replied">Replied</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Response</label>
                <textarea value={response} onChange={(e) => setResponse(e.target.value)} className="min-h-36 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Write your response here..." />
              </div>
              <button
                onClick={() => saveMutation.mutate()}
                className="mt-4 bg-primary text-primary-foreground h-10 rounded-md font-medium disabled:opacity-50"
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? 'Saving…' : 'Save Inquiry'}
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
