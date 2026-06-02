import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const ReactMarkdown: any = require('react-markdown');
const remarkGfm: any = require('remark-gfm');
import { motion } from 'framer-motion';
import { DataTable } from './DataTable';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { adminService, PackageItem } from '@/services/adminService';
import { toast } from 'sonner';

type PackageFormState = {
  title: string;
  description: string;
  destination: string;
  price: string;
  discountPrice: string;
  durationDays: string;
  durationNights: string;
  images: string[];
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
  images: [],
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
    images: pkg.images || [],
    groupSizeMin: String(pkg.groupSize?.min ?? 1),
    groupSizeMax: String(pkg.groupSize?.max ?? 10),
    featured: Boolean(pkg.featured),
    isActive: Boolean(pkg.isActive ?? true),
    itinerary: pkg.itinerary || '',
  };
}

export const PackageManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [localSearch, setLocalSearch] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft'>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortOption, setSortOption] = useState<'-createdAt' | 'title' | 'price' | 'destination'>('-createdAt');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [form, setForm] = useState<PackageFormState>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string | undefined>>({});
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, destinationFilter, statusFilter, showFeaturedOnly, sortOption, pageSize]);

  // debounce localSearch -> searchTerm
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(localSearch.trim()), 400);
    return () => clearTimeout(id);
  }, [localSearch]);

  const isSearchPending = useMemo(() => (localSearch.trim() !== searchTerm), [localSearch, searchTerm]);

  const { data, isLoading, error } = useQuery<{ success: boolean; count: number; total: number; pages: number; currentPage: number; data: PackageItem[] }, Error>({
    queryKey: ['admin-packages', searchTerm, destinationFilter, statusFilter, showFeaturedOnly, sortOption, page, pageSize],
    queryFn: () => {
      const params: Record<string, unknown> = {
        search: searchTerm || undefined,
        destination: destinationFilter || undefined,
        sort: sortOption,
        page,
        limit: pageSize,
      };

      if (showFeaturedOnly) {
        params.featured = 'true';
      }

      if (statusFilter === 'active') {
        params.isActive = 'true';
      } else if (statusFilter === 'draft') {
        params.isActive = 'false';
      }

      return adminService.getPackages(params);
    },
  });

  // Surface load errors as a toast so admins notice failures quickly
  useEffect(() => {
    if (error) {
      toast.error(error.message || 'Failed to load packages');
    }
  }, [error]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        description: form.description,
        destination: form.destination,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
        duration: { days: Number(form.durationDays), nights: Number(form.durationNights) },
        images: form.images || [],
        groupSize: { min: Number(form.groupSizeMin), max: Number(form.groupSizeMax) },
        featured: form.featured,
        isActive: form.isActive,
        itinerary: form.itinerary,
      };

      return selectedPackage
        ? adminService.updatePackage(selectedPackage._id || selectedPackage.id || '', payload)
        : adminService.createPackage(payload);
    },
    onMutate: async () => {
      // mark the currently edited package as pending so its row buttons can be disabled
      if (selectedPackage && (selectedPackage._id || selectedPackage.id)) {
        setPendingActionId(String(selectedPackage._id || selectedPackage.id));
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-packages'] });
      setIsModalOpen(false);
      setSelectedPackage(null);
      setForm(emptyForm);
      toast.success('Package saved successfully');
      setPendingActionId(null);
    },
    onError: (err: any) => {
      console.error('Save error', err);
      const fieldErrors = err?.response?.data?.fieldErrors as Array<{ field: string; message: string }> | undefined;
      if (fieldErrors?.length) {
        const mapped: Record<string, string> = {};
        fieldErrors.forEach((fe) => {
          switch (fe.field) {
            case 'duration.days':
              mapped.durationDays = fe.message;
              break;
            case 'duration.nights':
              mapped.durationNights = fe.message;
              break;
            case 'groupSize.min':
              mapped.groupSizeMin = fe.message;
              break;
            case 'groupSize.max':
              mapped.groupSizeMax = fe.message;
              break;
            case 'images':
              mapped.images = fe.message;
              break;
            case 'title':
              mapped.title = fe.message;
              break;
            case 'description':
              mapped.description = fe.message;
              break;
            case 'price':
              mapped.price = fe.message;
              break;
            case 'destination':
              mapped.destination = fe.message;
              break;
            case 'itinerary':
              mapped.itinerary = fe.message;
              break;
            default:
              mapped[fe.field] = fe.message;
          }
        });
        setFormErrors(mapped);
      }
      setPendingActionId(null);
      toast.error(err?.response?.data?.message || err?.message || 'Save failed');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (packageId: string) => adminService.deletePackage(packageId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['admin-packages'] });
      toast.success('Package deleted');
      setSelectedPackage(null);
    },
    onError: (err: any) => {
      console.error('Delete error', err);
      toast.error(err?.response?.data?.message || err?.message || 'Delete failed');
    },
  });

  const packages = data?.data || [];

  const columns = [
    { key: 'title', header: 'Package Title' },
    { key: 'duration', header: 'Duration', render: (item: PackageItem) => `${item.duration?.days ?? '—'} Days / ${item.duration?.nights ?? '—'} Nights` },
    { key: 'price', header: 'Price', render: (item: PackageItem) => `$${Number(item.price || 0).toLocaleString()}` },
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
    setFormErrors({});
    setIsModalOpen(true);
  };

  // image helpers
  const handleImageUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const target = e.target as HTMLInputElement;
    const url = target.value.trim();
    if (!url) return;
    setForm(prev => ({ ...prev, images: [...prev.images, url] }));
    target.value = '';
  };

  const handleFilesUpload = async (files: FileList | null) => {
    const fileArray = Array.from(files || []);
    if (!fileArray.length) return;
    setUploading(true);
    try {
      for (const file of fileArray) {
        const fd = new FormData();
        fd.append('file', file);
        if (selectedPackage && (selectedPackage._id || selectedPackage.id)) {
          fd.append('packageId', String(selectedPackage._id || selectedPackage.id));
        }
        const res = await adminService.uploadImage(fd);
        if (res && res.fileUrl) {
          setForm((prev) => ({ ...prev, images: [...prev.images, res.fileUrl] }));
        }
      }
      toast.success('Images uploaded');
    } catch (err: any) {
      console.error('Upload error', err);
      toast.error(err?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const actions = (item: PackageItem) => {
    const id = String(item._id || item.id || '');
    const isPending = pendingActionId === id;
    return (
      <div className="flex justify-end gap-2 text-muted-foreground">
        <button
          className="p-1 hover:text-primary transition-colors"
          onClick={() => openForm(item)}
          disabled={isPending}
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          className="p-1 hover:text-red-500 transition-colors"
          onClick={() => {
            setPendingActionId(id);
            deleteMutation.mutate(id, {
              onSettled: () => setPendingActionId(null),
            });
          }}
          disabled={isPending}
        >
          {isPending ? <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    );
  };

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
                {formErrors.title && <p className="text-sm text-red-600 mt-1">{formErrors.title}</p>}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Description</label>
                <textarea value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} className="min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Package description" />
                {formErrors.description && <p className="text-sm text-red-600 mt-1">{formErrors.description}</p>}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Itinerary (Markdown)</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <textarea value={form.itinerary} onChange={(e) => setForm((prev) => ({ ...prev, itinerary: e.target.value }))} className="min-h-48 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono" placeholder={"## Trek Title - 7 Days\n\n1. **Day 1 - Arrival:** Details...\n2. **Day 2 - Trek:** Details..."} />
                  <div className="min-h-48 w-full rounded-md border border-input bg-background px-3 py-2 text-sm overflow-auto">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose max-w-none">{form.itinerary || '*No itinerary provided*'}</ReactMarkdown>
                  </div>
                </div>
                {formErrors.itinerary && <p className="text-sm text-red-600 mt-1">{formErrors.itinerary}</p>}
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Images</label>
                <div className="flex gap-2">
                  <input placeholder="Paste image URL and press Enter" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onKeyDown={handleImageUrlKeyDown} />
                  <label className="flex items-center gap-2">
                    <input type="file" accept="image/*" multiple onChange={(e) => handleFilesUpload(e.target.files)} />
                    <span className="text-xs text-muted-foreground">Upload</span>
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.images.map((img, idx) => (
                    <div key={img + idx} className="relative w-24 h-16 border rounded overflow-hidden">
                      <img src={img} alt={`img-${idx}`} className="object-cover w-full h-full" />
                      <button type="button" onClick={() => setForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))} className="absolute top-0 right-0 bg-red-600 text-white text-xs px-1">×</button>
                      <div className="absolute left-0 bottom-0 flex gap-1">
                        {idx > 0 && <button className="text-xs bg-black/50 text-white px-1" onClick={() => { setForm(prev => { const arr = [...prev.images]; [arr[idx-1], arr[idx]] = [arr[idx], arr[idx-1]]; return { ...prev, images: arr }; }); }}>◀</button>}
                        {idx < form.images.length - 1 && <button className="text-xs bg-black/50 text-white px-1" onClick={() => { setForm(prev => { const arr = [...prev.images]; [arr[idx], arr[idx+1]] = [arr[idx+1], arr[idx]]; return { ...prev, images: arr }; }); }}>▶</button>}
                      </div>
                    </div>
                  ))}
                </div>
                {formErrors.images && <p className="text-sm text-red-600 mt-1">{formErrors.images}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Destination</label>
                  <input value={form.destination} onChange={(e) => setForm((prev) => ({ ...prev, destination: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Khumbu" />
                  {formErrors.destination && <p className="text-sm text-red-600 mt-1">{formErrors.destination}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Price</label>
                  <input type="number" value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  {formErrors.price && <p className="text-sm text-red-600 mt-1">{formErrors.price}</p>}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Discount Price</label>
                  <input type="number" value={form.discountPrice} onChange={(e) => setForm((prev) => ({ ...prev, discountPrice: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  {formErrors.discountPrice && <p className="text-sm text-red-600 mt-1">{formErrors.discountPrice}</p>}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Days</label>
                  <input type="number" value={form.durationDays} onChange={(e) => setForm((prev) => ({ ...prev, durationDays: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  {formErrors.durationDays && <p className="text-sm text-red-600 mt-1">{formErrors.durationDays}</p>}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Nights</label>
                  <input type="number" value={form.durationNights} onChange={(e) => setForm((prev) => ({ ...prev, durationNights: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  {formErrors.durationNights && <p className="text-sm text-red-600 mt-1">{formErrors.durationNights}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Group Min</label>
                  <input type="number" value={form.groupSizeMin} onChange={(e) => setForm((prev) => ({ ...prev, groupSizeMin: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  {formErrors.groupSizeMin && <p className="text-sm text-red-600 mt-1">{formErrors.groupSizeMin}</p>}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Group Max</label>
                  <input type="number" value={form.groupSizeMax} onChange={(e) => setForm((prev) => ({ ...prev, groupSizeMax: e.target.value }))} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  {formErrors.groupSizeMax && <p className="text-sm text-red-600 mt-1">{formErrors.groupSizeMax}</p>}
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

              <button onClick={() => saveMutation.mutate()} className="mt-4 bg-primary text-primary-foreground h-10 rounded-md font-medium disabled:opacity-50" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving…' : selectedPackage ? 'Update Package' : 'Save Package'}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 rounded-xl border border-secondary/50 bg-secondary/10 p-4">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Destination</label>
            <input
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
              placeholder="Search destination"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'draft')}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="all">All packages</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Sort</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="-createdAt">Newest first</option>
              <option value="createdAt">Oldest first</option>
              <option value="title">Title</option>
              <option value="price">Price</option>
              <option value="destination">Destination</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Featured only</label>
            <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3">
              <input
                id="featured-only"
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="featured-only" className="text-sm">Filter featured packages</label>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_auto] items-end">
          <div className="text-sm text-muted-foreground">
            Showing {data?.count ?? 0} packages from {data?.total ?? 0} total.
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <span>Page size</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="h-10 rounded-md border border-input bg-background px-2 text-sm"
              >
                {[10, 20, 50].map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-700">Unable to load packages: {error instanceof Error ? error.message : 'Please try again.'}</div>}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable
          data={packages}
          columns={columns}
          keyExtractor={(item) => item._id || item.id || item.title}
          onSearch={setLocalSearch}
          searchValue={localSearch}
          onClearSearch={() => setLocalSearch('')}
          isSearchPending={isSearchPending}
          searchPlaceholder="Search packages..."
          actions={actions}
          isLoading={isLoading}
          pagination={{
            currentPage: data?.currentPage ?? 1,
            totalPages: data?.pages ?? 1,
            totalItems: data?.total ?? packages.length,
            pageSize,
            pageSizeOptions: [10, 20, 50],
            onPageChange: (next) => setPage(Math.max(1, Math.min(data?.pages ?? 1, next))),
            onPageSizeChange: (size) => setPageSize(size),
          }}
        />
      </motion.div>
    </div>
  );
};
