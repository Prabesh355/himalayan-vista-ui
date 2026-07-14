import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { DataTable } from "./DataTable";
import { Edit, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { adminService, PackageItem } from "@/services/adminService";
import { toast } from "sonner";
import { defaultImageFallback, resolveImageUrl, useFallbackImage } from "@/lib/imageUrl";
import { useCurrency } from "@/context/CurrencyProvider";
import { cn } from "@/lib/utils";
import { PackageEditorSidebar } from "./package-editor/PackageEditorSidebar";
import { PackageEditorGeneralTab } from "./package-editor/PackageEditorGeneralTab";
import { PackageEditorItineraryTab } from "./package-editor/PackageEditorItineraryTab";
import { PackageEditorImagesTab } from "./package-editor/PackageEditorImagesTab";
import { PackageEditorPricingTab } from "./package-editor/PackageEditorPricingTab";
import { PackageEditorSeoTab } from "./package-editor/PackageEditorSeoTab";
import { PackageEditorOverviewTab } from "./package-editor/PackageEditorOverviewTab";
import { PackageEditorFooter } from "./package-editor/PackageEditorFooter";
import { PackageEditorFieldErrors, PackageFormState, TabKey } from "./package-editor/types";

const emptyForm: PackageFormState = {
  title: "",
  description: "",
  destination: "",
  price: "",
  discountPrice: "",
  durationDays: "1",
  durationNights: "0",
  images: [],
  groupSizeMin: "6",
  groupSizeMax: "8",
  featured: false,
  isActive: true,
  itinerary: "",
  metaTitle: "",
  metaDescription: "",
  slug: "",
  canonicalUrl: "",
  ogImage: "",
};

function mapPackageToForm(pkg: PackageItem): PackageFormState {
  return {
    title: pkg.title || "",
    description: pkg.description || "",
    destination: pkg.destination || "",
    price: String(pkg.price ?? ""),
    discountPrice: String(pkg.discountPrice ?? ""),
    durationDays: String(pkg.duration?.days ?? 1),
    durationNights: String(pkg.duration?.nights ?? 0),
    images: pkg.images || [],
    groupSizeMin: String(pkg.groupSize?.min ?? 1),
    groupSizeMax: String(pkg.groupSize?.max ?? 10),
    featured: Boolean(pkg.featured),
    isActive: Boolean(pkg.isActive ?? true),
    itinerary: pkg.itinerary || "",
    metaTitle: "",
    metaDescription: "",
    slug: pkg.slug || "",
    canonicalUrl: "",
    ogImage: "",
  };
}

function getPackageRecordId(pkg?: PackageItem | null) {
  return String(pkg?._id || pkg?.id || "").trim();
}

export const PackageManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const { formatPrice } = useCurrency();
  const handleImageError = useFallbackImage(defaultImageFallback);
  const [searchTerm, setSearchTerm] = useState("");
  const [localSearch, setLocalSearch] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft">("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortOption, setSortOption] = useState<"-createdAt" | "title" | "price" | "destination">(
    "-createdAt",
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);
  const [form, setForm] = useState<PackageFormState>(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [formErrors, setFormErrors] = useState<PackageEditorFieldErrors>({});
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastEditedAt, setLastEditedAt] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [itineraryView, setItineraryView] = useState<"split" | "editor" | "preview">("split");
  const [itinerarySearch, setItinerarySearch] = useState("");
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null);
  const [replaceImageIndex, setReplaceImageIndex] = useState<number | null>(null);
  const itineraryEditorRef = useRef<HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, destinationFilter, statusFilter, showFeaturedOnly, sortOption, pageSize]);

  // debounce localSearch -> searchTerm
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(localSearch.trim()), 400);
    return () => clearTimeout(id);
  }, [localSearch]);

  const isSearchPending = useMemo(
    () => localSearch.trim() !== searchTerm,
    [localSearch, searchTerm],
  );

  const { data, isLoading, error } = useQuery<
    {
      success: boolean;
      count: number;
      total: number;
      pages: number;
      currentPage: number;
      data: PackageItem[];
    },
    Error
  >({
    queryKey: [
      "admin-packages",
      searchTerm,
      destinationFilter,
      statusFilter,
      showFeaturedOnly,
      sortOption,
      page,
      pageSize,
    ],
    queryFn: () => {
      const params: Record<string, unknown> = {
        search: searchTerm || undefined,
        destination: destinationFilter || undefined,
        sort: sortOption,
        page,
        limit: pageSize,
      };

      if (showFeaturedOnly) {
        params.featured = "true";
      }

      if (statusFilter === "active") {
        params.isActive = "true";
      } else if (statusFilter === "draft") {
        params.isActive = "false";
      }

      return adminService.getPackages(params);
    },
  });

  // Surface load errors as a toast so admins notice failures quickly
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load packages");
    }
  }, [error]);

  const saveMutation = useMutation({
    mutationFn: async (options: { isDraft?: boolean; silent?: boolean } = {}) => {
      const payload = {
        title: form.title,
        description: form.description,
        destination: form.destination,
        price: Number(form.price),
        discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
        duration: { days: Number(form.durationDays), nights: Number(form.durationNights) },
        images: form.images || [],
        groupSize: { min: Number(form.groupSizeMin), max: Number(form.groupSizeMax) },
        featured: form.featured,
        isActive: options.isDraft ? false : form.isActive,
        itinerary: form.itinerary,
        slug: form.slug,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        canonicalUrl: form.canonicalUrl,
        ogImage: form.ogImage,
      };

      const selectedPackageId = getPackageRecordId(selectedPackage);
      const result = selectedPackageId
        ? await adminService.updatePackage(selectedPackageId, payload)
        : await adminService.createPackage(payload);
      return result;
    },
    onMutate: async () => {
      const selectedPackageId = getPackageRecordId(selectedPackage);
      if (selectedPackageId) {
        setPendingActionId(selectedPackageId);
      }
      setSaveSuccess(false);
    },
    onSuccess: async (_data, options) => {
      await queryClient.invalidateQueries({ queryKey: ["admin-packages"] });
      await queryClient.invalidateQueries({ queryKey: ["packages"] });
      await queryClient.invalidateQueries({ queryKey: ["featured-packages"] });
      await queryClient.invalidateQueries({ queryKey: ["package"] });
      setHasUnsavedChanges(false);
      setSaveSuccess(true);
      setLastEditedAt(new Date().toLocaleString());
      if (!options?.silent) {
        toast.success(options?.isDraft ? "Draft saved" : "Package updated successfully");
      }
      setPendingActionId(null);
    },
    onError: (err: any) => {
      console.error("Save error", err);
      const fieldErrors = err?.response?.data?.fieldErrors as
        | Array<{ field: string; message: string }>
        | undefined;
      if (fieldErrors?.length) {
        const mapped: Record<string, string> = {};
        fieldErrors.forEach((fe) => {
          switch (fe.field) {
            case "duration.days":
              mapped.durationDays = fe.message;
              break;
            case "duration.nights":
              mapped.durationNights = fe.message;
              break;
            case "groupSize.min":
              mapped.groupSizeMin = fe.message;
              break;
            case "groupSize.max":
              mapped.groupSizeMax = fe.message;
              break;
            case "images":
              mapped.images = fe.message;
              break;
            case "title":
              mapped.title = fe.message;
              break;
            case "description":
              mapped.description = fe.message;
              break;
            case "price":
              mapped.price = fe.message;
              break;
            case "destination":
              mapped.destination = fe.message;
              break;
            case "itinerary":
              mapped.itinerary = fe.message;
              break;
            default:
              mapped[fe.field] = fe.message;
          }
        });
        setFormErrors(mapped);
      }
      setPendingActionId(null);
      toast.error(err?.response?.data?.message || err?.message || "Save failed");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (packageId: string) => adminService.deletePackage(packageId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-packages"] });
      await queryClient.invalidateQueries({ queryKey: ["packages"] });
      await queryClient.invalidateQueries({ queryKey: ["featured-packages"] });
      toast.success("Package deleted");
      setSelectedPackage(null);
      setIsModalOpen(false);
    },
    onError: (err: any) => {
      console.error("Delete error", err);
      toast.error(err?.response?.data?.message || err?.message || "Delete failed");
    },
  });

  const packages = useMemo(() => {
    const list = data?.data || [];
    const seen = new Set<string>();

    return list.filter((item) => {
      const key = String(item.slug || item._id || item.id || item.title);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [data?.data]);

  const columns = [
    {
      key: "image",
      header: "Image",
      width: "w-24",
      render: (item: PackageItem) => {
        const image = item.images?.[0];

        return (
          <div className="h-14 w-20 overflow-hidden rounded-lg border border-input bg-secondary/30">
            <img
              src={resolveImageUrl(image)}
              alt={item.title}
              onError={handleImageError}
              className="h-full w-full object-cover"
            />
          </div>
        );
      },
    },
    { key: "title", header: "Package Title" },
    {
      key: "duration",
      header: "Duration",
      render: (item: PackageItem) =>
        `${item.duration?.days ?? "—"} Days / ${item.duration?.nights ?? "—"} Nights`,
    },
    {
      key: "price",
      header: "Price",
      render: (item: PackageItem) => formatPrice(Number(item.price || 0)),
    },
    {
      key: "status",
      header: "Status",
      render: (item: PackageItem) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
        >
          {item.isActive ? "Active" : "Draft"}
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
    setActiveTab("general");
    setItineraryView("split");
    setItinerarySearch("");
    setHasUnsavedChanges(false);
    setSaveSuccess(false);
    setLastEditedAt(null);
    setReplaceImageIndex(null);
    setIsModalOpen(true);
  };

  const markDirty = () => {
    setHasUnsavedChanges(true);
    setSaveSuccess(false);
    setLastEditedAt(new Date().toLocaleString());
  };

  const updateFormField = <K extends keyof PackageFormState>(field: K, value: PackageFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    markDirty();
  };

  const handleSave = (options: { isDraft?: boolean; silent?: boolean } = {}) => {
    saveMutation.mutate(options);
  };

  const handleCloseEditor = (nextOpen: boolean) => {
    if (!nextOpen && hasUnsavedChanges) {
      const confirmClose = window.confirm(
        "You have unsaved changes. Close the editor and lose them?",
      );
      if (!confirmClose) return;
    }

    setIsModalOpen(nextOpen);
    if (!nextOpen) {
      setSelectedPackage(null);
      setForm(emptyForm);
      setFormErrors({});
      setHasUnsavedChanges(false);
      setSaveSuccess(false);
    }
  };

  // image helpers
  const handleImageUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLInputElement;
    const url = target.value.trim();
    if (!url) return;
    setForm((prev) => (prev.images.includes(url) ? prev : { ...prev, images: [url, ...prev.images] }));
    markDirty();
    target.value = "";
  };

  const handleFilesUpload = async (files: FileList | null, replaceIndex?: number | null) => {
    const fileArray = Array.from(files || []);
    if (!fileArray.length) return;
    setUploading(true);
    try {
      let uploadedImages = [...form.images];
      for (const file of fileArray) {
        const fd = new FormData();
        fd.append("file", file);
        const selectedPackageId = getPackageRecordId(selectedPackage);
        if (selectedPackageId) {
          fd.append("packageId", selectedPackageId);
        }
        const res = await adminService.uploadImage(fd);
        if (res && res.fileUrl) {
          uploadedImages = typeof replaceIndex === "number"
            ? uploadedImages.map((image, index) => (index === replaceIndex ? res.fileUrl : image))
            : [res.fileUrl, ...uploadedImages.filter((image) => image !== res.fileUrl)];
          const nextImages = uploadedImages;
          setForm((prev) => ({ ...prev, images: nextImages }));
          markDirty();
          if (selectedPackageId) {
            await adminService.updatePackage(selectedPackageId, {
              title: form.title,
              description: form.description,
              destination: form.destination,
              price: Number(form.price),
              discountPrice: form.discountPrice ? Number(form.discountPrice) : null,
              duration: { days: Number(form.durationDays), nights: Number(form.durationNights) },
              images: nextImages,
              groupSize: { min: Number(form.groupSizeMin), max: Number(form.groupSizeMax) },
              featured: form.featured,
              isActive: form.isActive,
              itinerary: form.itinerary,
              slug: form.slug,
              metaTitle: form.metaTitle,
              metaDescription: form.metaDescription,
              canonicalUrl: form.canonicalUrl,
              ogImage: form.ogImage,
            });
            await queryClient.invalidateQueries({ queryKey: ["admin-packages"] });
            await queryClient.invalidateQueries({ queryKey: ["packages"] });
            await queryClient.invalidateQueries({ queryKey: ["featured-packages"] });
            await queryClient.invalidateQueries({ queryKey: ["package"] });
          }
        }
      }
      toast.success(
        getPackageRecordId(selectedPackage)
          ? "Images uploaded and package updated"
          : "Images uploaded. Save package to publish them.",
      );
    } catch (err: any) {
      console.error("Upload error", err);
      toast.error(err?.response?.data?.message || err?.message || "Upload failed");
    } finally {
      setUploading(false);
      setReplaceImageIndex(null);
    }
  };

  const handleReplaceSelection = (index: number) => {
    setReplaceImageIndex(index);
    imageInputRef.current?.click();
  };

  const handleDragStart = (index: number) => setDraggedImageIndex(index);
  const handleDropImage = (targetIndex: number) => {
    if (draggedImageIndex === null || draggedImageIndex === targetIndex) return;
    setForm((prev) => {
      const next = [...prev.images];
      const [moving] = next.splice(draggedImageIndex, 1);
      next.splice(targetIndex, 0, moving);
      return { ...prev, images: next };
    });
    markDirty();
    setDraggedImageIndex(null);
  };

  const deleteImageAt = (index: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
    markDirty();
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    setForm((prev) => {
      const next = [...prev.images];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...prev, images: next };
    });
    markDirty();
  };

  const insertMarkdownSnippet = (snippet: string) => {
    const textarea = itineraryEditorRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const next = `${form.itinerary.slice(0, start)}${snippet}${form.itinerary.slice(end)}`;
    updateFormField("itinerary", next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + snippet.length, start + snippet.length);
    });
  };

  const highlightedItinerary = useMemo(() => {
    if (!itinerarySearch.trim()) return form.itinerary;
    const regex = new RegExp(`(${itinerarySearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig");
    return form.itinerary.replace(regex, "**$1**");
  }, [form.itinerary, itinerarySearch]);

  const wordCount = useMemo(() => form.itinerary.trim().split(/\s+/).filter(Boolean).length, [form.itinerary]);
  const charCount = form.itinerary.length;
  const overviewWarnings = useMemo(() => {
    const warnings: string[] = [];
    if (!form.title.trim()) warnings.push("Package title is required.");
    if (!form.destination.trim()) warnings.push("Destination is required.");
    if (!form.description.trim()) warnings.push("Description is required.");
    if (!form.price.trim()) warnings.push("Pricing is required.");
    if (!form.images.length) warnings.push("Add at least one image.");
    if (!form.itinerary.trim()) warnings.push("Itinerary content is missing.");
    return warnings;
  }, [form]);

  useEffect(() => {
    if (!isModalOpen || !hasUnsavedChanges) return;
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        handleSave({ isDraft: false });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isModalOpen, hasUnsavedChanges, form, selectedPackage]);

  useEffect(() => {
    if (!isModalOpen || !hasUnsavedChanges || saveMutation.isPending) return;
    const timer = window.setTimeout(() => {
      handleSave({ isDraft: true, silent: true });
    }, 30000);
    return () => window.clearTimeout(timer);
  }, [isModalOpen, hasUnsavedChanges, saveMutation.isPending, form, selectedPackage]);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [hasUnsavedChanges]);

  const actions = (item: PackageItem) => {
    const id = getPackageRecordId(item);
    const isPending = pendingActionId === id;
    return (
      <div className="flex justify-end gap-2 text-muted-foreground">
        <button
          className="p-1 hover:text-primary transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => openForm(item)}
          disabled={isPending}
          title="Edit package"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          className="p-1 hover:text-red-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          onClick={() => {
            setPendingActionId(id);
            deleteMutation.mutate(id, {
              onSettled: () => setPendingActionId(null),
            });
          }}
          disabled={isPending}
          title="Delete package"
        >
          {isPending ? (
            <span className="inline-block w-4 h-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
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

        <Dialog open={isModalOpen} onOpenChange={handleCloseEditor}>
          <DialogTrigger asChild>
            <button
              onClick={() => openForm()}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Package
            </button>
          </DialogTrigger>

          <DialogContent className="h-[100dvh] w-screen max-w-none overflow-hidden rounded-none border-0 bg-background p-0">
            <div className="grid h-full md:grid-cols-[300px_minmax(0,1fr)]">
              <PackageEditorSidebar
                selectedPackageTitle={selectedPackage ? "Edit Package" : "Create Package"}
                lastEditedAt={lastEditedAt}
                saveSuccess={saveSuccess}
                imageCount={form.images.length}
                wordCount={wordCount}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              <div className="flex h-full min-w-0 flex-col">
                <div className="border-b bg-background/95 px-5 py-4 backdrop-blur">
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Package editor</p>
                      <h2 className="text-xl font-semibold tracking-tight">
                        {form.title || selectedPackage?.title || "New package"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Use the sidebar to move between content blocks, media, pricing, SEO, and review.
                      </p>
                    </div>
                    {saveSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-700"
                      >
                        <div>
                          <p className="font-medium">Package saved successfully</p>
                          <p className="text-sm text-emerald-700/80">The latest version is ready for publishing.</p>
                        </div>
                      </motion.div>
                    ) : null}
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabKey)} className="flex h-full min-h-0 flex-col">
                  <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <TabsContent value="general" className="mt-0">
                      <PackageEditorGeneralTab
                        form={form}
                        formErrors={formErrors}
                        onChange={updateFormField}
                      />
                    </TabsContent>

                    <TabsContent value="itinerary" className="mt-0">
                      <PackageEditorItineraryTab
                        form={form}
                        formErrors={formErrors}
                        itineraryEditorRef={itineraryEditorRef}
                        itineraryView={itineraryView}
                        setItineraryView={setItineraryView}
                        itinerarySearch={itinerarySearch}
                        setItinerarySearch={setItinerarySearch}
                        insertMarkdownSnippet={insertMarkdownSnippet}
                        highlightedItinerary={highlightedItinerary}
                        wordCount={wordCount}
                        charCount={charCount}
                        onChange={updateFormField}
                      />
                    </TabsContent>

                    <TabsContent value="images" className="mt-0">
                      <PackageEditorImagesTab
                        images={form.images}
                        uploading={uploading}
                        formErrors={formErrors}
                        imageInputRef={imageInputRef}
                        replaceImageIndex={replaceImageIndex}
                        handleImageError={handleImageError}
                        handleImageUrlKeyDown={handleImageUrlKeyDown}
                        handleFilesUpload={handleFilesUpload}
                        handleReplaceSelection={handleReplaceSelection}
                        handleDragStart={handleDragStart}
                        handleDropImage={handleDropImage}
                        deleteImageAt={deleteImageAt}
                        moveImage={moveImage}
                      />
                    </TabsContent>

                    <TabsContent value="pricing" className="mt-0">
                      <PackageEditorPricingTab form={form} formErrors={formErrors} onChange={updateFormField} />
                    </TabsContent>

                    <TabsContent value="seo" className="mt-0">
                      <PackageEditorSeoTab form={form} onChange={updateFormField} />
                    </TabsContent>

                    <TabsContent value="overview" className="mt-0">
                      <PackageEditorOverviewTab
                        form={form}
                        overviewWarnings={overviewWarnings}
                        formatPrice={formatPrice}
                        handleImageError={handleImageError}
                      />
                    </TabsContent>
                  </div>

                  <PackageEditorFooter
                    hasUnsavedChanges={hasUnsavedChanges}
                    isSaving={saveMutation.isPending}
                    selectedPackageExists={Boolean(selectedPackage)}
                    onSaveDraft={() => handleSave({ isDraft: true })}
                    onUpdate={() => handleSave({ isDraft: false })}
                    onDelete={() => {
                      const id = getPackageRecordId(selectedPackage);
                      if (!id) return;
                      const confirmDelete = window.confirm("Delete this package permanently?");
                      if (!confirmDelete) return;
                      deleteMutation.mutate(id);
                    }}
                    onCancel={() => handleCloseEditor(false)}
                  />
                </Tabs>
              </div>
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
              onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "draft")}
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
              <label htmlFor="featured-only" className="text-sm">
                Filter featured packages
              </label>
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
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-700">
          Unable to load packages: {error instanceof Error ? error.message : "Please try again."}
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable
          data={packages}
          columns={columns}
          keyExtractor={(item) => item._id || item.id || item.title}
          onSearch={setLocalSearch}
          searchValue={localSearch}
          onClearSearch={() => setLocalSearch("")}
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
