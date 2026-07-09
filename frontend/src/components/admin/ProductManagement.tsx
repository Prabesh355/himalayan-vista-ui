import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "./DataTable";
import { adminService, ProductItem } from "@/services/adminService";
import { defaultShopImageFallback, resolveImageUrl, useFallbackImage } from "@/lib/imageUrl";
import { toast } from "sonner";

type ProductFormState = {
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
  inStock: boolean;
  isActive: boolean;
};

const emptyForm: ProductFormState = {
  name: "",
  description: "",
  category: "Trekking Gear",
  price: "",
  image: "",
  inStock: true,
  isActive: true,
};

function mapProductToForm(product: ProductItem): ProductFormState {
  return {
    name: product.name || "",
    description: product.description || "",
    category: product.category || "Trekking Gear",
    price: String(product.price ?? ""),
    image: product.image || "",
    inStock: Boolean(product.inStock ?? true),
    isActive: Boolean(product.isActive ?? true),
  };
}

export const ProductManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const handleImageError = useFallbackImage(defaultShopImageFallback);
  const [localSearch, setLocalSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft">("all");
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "out">("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(localSearch.trim()), 400);
    return () => clearTimeout(id);
  }, [localSearch]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter, stockFilter, pageSize]);

  const isSearchPending = useMemo(
    () => localSearch.trim() !== searchTerm,
    [localSearch, searchTerm],
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-products", searchTerm, statusFilter, stockFilter, page, pageSize],
    queryFn: () => {
      const params: Record<string, unknown> = {
        search: searchTerm || undefined,
        page,
        limit: pageSize,
        sort: "-createdAt",
      };

      if (statusFilter === "active") params.isActive = "true";
      if (statusFilter === "draft") params.isActive = "false";
      if (stockFilter === "in") params.inStock = "true";
      if (stockFilter === "out") params.inStock = "false";

      return adminService.getProducts(params);
    },
  });

  useEffect(() => {
    if (error instanceof Error) {
      toast.error(error.message || "Failed to load shop products");
    }
  }, [error]);

  const products = data?.data || [];

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        name: form.name,
        description: form.description,
        category: form.category,
        price: Number(form.price),
        image: form.image,
        inStock: form.inStock,
        isActive: form.isActive,
      };

      return selectedProduct
        ? adminService.updateProduct(selectedProduct._id || selectedProduct.id || "", payload)
        : adminService.createProduct(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      setIsModalOpen(false);
      setSelectedProduct(null);
      setForm(emptyForm);
      toast.success("Product saved successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Product save failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (productId: string) => adminService.deleteProduct(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Delete failed");
    },
  });

  const openForm = (product?: ProductItem) => {
    setSelectedProduct(product || null);
    setForm(product ? mapProductToForm(product) : emptyForm);
    setIsModalOpen(true);
  };

  const handleFileUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await adminService.uploadImage(fd);
      if (res?.fileUrl) {
        setForm((prev) => ({ ...prev, image: res.fileUrl }));
        if (selectedProduct?._id || selectedProduct?.id) {
          await adminService.updateProduct(selectedProduct._id || selectedProduct.id || "", {
            name: form.name,
            description: form.description,
            category: form.category,
            price: Number(form.price),
            image: res.fileUrl,
            inStock: form.inStock,
            isActive: form.isActive,
          });
          await queryClient.invalidateQueries({ queryKey: ["admin-products"] });
          await queryClient.invalidateQueries({ queryKey: ["products"] });
        }
      }
      toast.success(
        selectedProduct
          ? "Image uploaded and product updated"
          : "Image uploaded. Save product to publish it.",
      );
    } catch (err: any) {
      toast.error(err?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const columns = [
    {
      key: "image",
      header: "Image",
      render: (item: ProductItem) => (
        <img
          src={resolveImageUrl(item.image, defaultShopImageFallback)}
          alt={item.name}
          onError={handleImageError}
          className="h-12 w-12 rounded-lg object-cover"
        />
      ),
    },
    { key: "name", header: "Product" },
    { key: "category", header: "Category" },
    {
      key: "price",
      header: "Price",
      render: (item: ProductItem) => `$${Number(item.price || 0).toLocaleString()}`,
    },
    {
      key: "status",
      header: "Status",
      render: (item: ProductItem) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
        >
          {item.isActive ? "Active" : "Draft"}
        </span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      render: (item: ProductItem) => (
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${item.inStock ? "bg-sky-100 text-sky-700" : "bg-red-100 text-red-700"}`}
        >
          {item.inStock ? "In stock" : "Out"}
        </span>
      ),
    },
  ];

  const actions = (item: ProductItem) => {
    const id = String(item._id || item.id || "");
    return (
      <div className="flex justify-end gap-2 text-muted-foreground">
        <button className="p-1 hover:text-primary" onClick={() => openForm(item)}>
          <Edit className="h-4 w-4" />
        </button>
        <button className="p-1 hover:text-red-500" onClick={() => deleteMutation.mutate(id)}>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shop Products</h1>
          <p className="text-muted-foreground">Manage shop products, prices, stock, and images.</p>
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => openForm()}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              Add Product
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[560px]">
            <DialogHeader>
              <DialogTitle>{selectedProduct ? "Edit Product" : "Create Product"}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <label className="grid gap-2 text-sm font-medium">
                Product name
                <input
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Description
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  className="min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Category
                  <input
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Price
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  />
                </label>
              </div>
              <label className="grid gap-2 text-sm font-medium">
                Image URL
                <input
                  value={form.image}
                  onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                  placeholder="Paste image URL or upload below"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Upload image
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </label>
              {form.image && (
                <img
                  src={resolveImageUrl(form.image, defaultShopImageFallback)}
                  alt="Product preview"
                  onError={handleImageError}
                  className="h-32 w-32 rounded-lg object-cover"
                />
              )}
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-lg border p-3">
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    onChange={(e) => setForm((prev) => ({ ...prev, inStock: e.target.checked }))}
                  />
                  In stock
                </label>
                <label className="flex items-center gap-2 rounded-lg border p-3">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                  />
                  Active on shop
                </label>
              </div>
              <button
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending || uploading}
                className="h-10 rounded-md bg-primary font-medium text-primary-foreground disabled:opacity-50"
              >
                {uploading ? "Uploading..." : saveMutation.isPending ? "Saving..." : "Save Product"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 rounded-xl border border-secondary/50 bg-secondary/10 p-4 sm:grid-cols-3">
        <label className="grid gap-2 text-sm font-medium">
          Status
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All products</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Stock
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as typeof stockFilter)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All stock</option>
            <option value="in">In stock</option>
            <option value="out">Out of stock</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Page size
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-700">
          Unable to load shop products.
        </div>
      )}

      <DataTable
        data={products}
        columns={columns}
        keyExtractor={(item) => item._id || item.id || item.name}
        onSearch={setLocalSearch}
        searchValue={localSearch}
        onClearSearch={() => setLocalSearch("")}
        isSearchPending={isSearchPending}
        searchPlaceholder="Search products..."
        actions={actions}
        isLoading={isLoading}
        pagination={{
          currentPage: data?.currentPage ?? 1,
          totalPages: data?.pages ?? 1,
          totalItems: data?.total ?? products.length,
          pageSize,
          pageSizeOptions: [10, 20, 50],
          onPageChange: (next) => setPage(Math.max(1, Math.min(data?.pages ?? 1, next))),
          onPageSizeChange: (size) => setPageSize(size),
        }}
      />
    </div>
  );
};
