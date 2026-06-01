import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { DataTable } from './DataTable';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { adminService, PackageItem } from '@/services/adminService';

type PackageFormState = {
  title: string;
  description: string;
  destination: string;
  price: string;
  discountPrice: string;
  durationDays: string;
  durationNights: string;
  imageUrl: string;
  groupSizeMin: string;
  groupSizeMax: string;
  featured: boolean;
  isActive: boolean;
  itinerary: string;
};

const emptyForm: PackageFormState = {
  title: '',
  description: '',
  destination: '',
  price: '',
  discountPrice: '',
  durationDays: '1',
  durationNights: '0',
  imageUrl: '',
  groupSizeMin: '1',
  groupSizeMax: '10',
  featured: false,
  isActive: true,
  itinerary: '',
};

function mapPackageToForm(pkg: PackageItem): PackageFormState {
  return {
    title: pkg.title || '',
    description: pkg.description || '',
    destination: pkg.destination || '',
    price: String(pkg.price ?? ''),
    discountPrice: String(pkg.discountPrice ?? ''),
    durationDays: String(pkg.duration?.days ?? 1),
    durationNights: String(pkg.duration?.nights ?? 0),
    imageUrl: pkg.images?.[0] || '',
    groupSizeMin: String(pkg.groupSize?.min ?? 1),
    groupSizeMax: String(pkg.groupSize?.max ?? 10),
    featured: Boolean(pkg.featured),
    isActive: Boolean(pkg.isActive ?? true),
    itinerary: pkg.itinerary || '',
  };
}

export const PackageManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [form, setForm] = useState<PackageFormState>(emptyForm);

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-packages'],
    queryFn: () => adminService.getPackages({ limit: 100, sort: '-createdAt' }),
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        description: form.description,
        destination: form.destination,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
        duration: {
          days: Number(form.durationDays),
          nights: Number(form.durationNights),
        },
        images: form.imageUrl ? [form.imageUrl] : [],
        groupSize: {
          min: Number(form.groupSizeMin),
          max: Number(form.groupSizeMax),
        },
        featured: form.featured,
        isActive: form.isActive,
        itinerary: form.itinerary,
      };

      return selectedPackage
        ? adminService.updatePackage(selectedPackage._id || selectedPackage.id || '', payload)
        : adminService.createPackage(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-packages'] });
      setIsModalOpen(false);
      setSelectedPackage(null);
      setForm(emptyForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (packageId: string) => adminService.deletePackage(packageId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-packages'] });
    },
  });

  const packages = data?.data || [];

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return packages.filter((pkg) => {
      return (
        pkg.title.toLowerCase().includes(term) ||
        (pkg.destination || '').toLowerCase().includes(term) ||
        String(pkg.price ?? '').includes(term)
      );
    });
  }, [packages, searchTerm]);

  const columns = [
    { key: 'title', header: 'Package Title' },
    {
      key: 'duration',
      header: 'Duration',
      render: (item: PackageItem) => `${item.duration?.days ?? '—'} Days / ${item.duration?.nights ?? '—'} Nights`,
    },
    {
      key: 'price',
      header: 'Price',
      render: (item: PackageItem) => `$${Number(item.price || 0).toLocaleString()}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: PackageItem) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {item.isActive ? 'Active' : 'Draft'}
        </span>
      ),
    },
  ];

  const openForm = (pkg?: PackageItem) => {
    if (pkg) {
      setSelectedPackage(pkg);
      setForm(mapPackageToForm(pkg));
    } else {
      setSelectedPackage(null);
      setForm(emptyForm);
    }
    setIsModalOpen(true);
  };

  const actions = (item: PackageItem) => (
    <div className="flex justify-end gap-2 text-muted-foreground">
      <button className="p-1 hover:text-primary transition-colors" onClick={() => openForm(item)}>
        <Edit className="w-4 h-4" />
      </button>
      <button className="p-1 hover:text-red-500 transition-colors" onClick={() => deleteMutation.mutate(item._id || item.id || '')}>
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Packages</h1>
          <p className="text-muted-foreground">Manage your travel and trekking packages.</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open); if (!open) { setSelectedPackage(null); setForm(emptyForm); } }}>
          <DialogTrigger asChild>
            <button onClick={() => openForm()} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
              Add Package
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedPackage ? 'Edit Package' : 'Create New Package'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Title</label>
                <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Everest Base Camp" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Package description" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Itinerary (Markdown Format)</label>
                <textarea value={form.itinerary} onChange={(e) => setForm((prev) => ({ ...prev, itinerary: e.target.value }))} className="min-h-48 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono" placeholder="## Trek Title - 7 Days\n\n1. **Day 1 - Arrival:** Details...\n2. **Day 2 - Trek:** Details..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Destination</label>
                  <input value={form.destination} onChange={(e) => setForm((prev) => ({ ...prev, destination: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Khumbu" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Image URL</label>
                  <input value={form.imageUrl} onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Price</label>
                  <input type="number" value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Discount Price</label>
                  <input type="number" value={form.discountPrice} onChange={(e) => setForm((prev) => ({ ...prev, discountPrice: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Days</label>
                  <input type="number" value={form.durationDays} onChange={(e) => setForm((prev) => ({ ...prev, durationDays: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Nights</label>
                  <input type="number" value={form.durationNights} onChange={(e) => setForm((prev) => ({ ...prev, durationNights: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Group Min</label>
                  <input type="number" value={form.groupSizeMin} onChange={(e) => setForm((prev) => ({ ...prev, groupSizeMin: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Group Max</label>
                  <input type="number" value={form.groupSizeMax} onChange={(e) => setForm((prev) => ({ ...prev, groupSizeMax: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center gap-2 rounded-lg border p-3">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm((prev) => ({ ...prev, featured: e.target.checked }))} />
                  Featured package
                </label>
                <label className="flex items-center gap-2 rounded-lg border p-3">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))} />
                  Active package
                </label>
              </div>
              <button
                onClick={() => saveMutation.mutate()}
                className="mt-4 bg-primary text-primary-foreground h-10 rounded-md font-medium disabled:opacity-50"
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? 'Saving…' : selectedPackage ? 'Update Package' : 'Save Package'}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-700">Unable to load packages: {error instanceof Error ? error.message : 'Please try again.'}</div>}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item._id || item.id || item.title}
          onSearch={setSearchTerm}
          searchPlaceholder="Search packages..."
          actions={actions}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
};
