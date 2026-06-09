import { useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { DataTable } from "./DataTable";
import { Edit, Trash2, Plus, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { adminService, BlogItem } from "@/services/adminService";
import { toast } from "sonner";

type BlogFormState = {
  title: string;
  summary: string;
  content: string;
  category: string;
  featuredImage: string;
  status: string;
};

const emptyForm: BlogFormState = {
  title: "",
  summary: "",
  content: "",
  category: "",
  featuredImage: "",
  status: "draft",
};

function mapBlogToForm(blog: BlogItem): BlogFormState {
  return {
    title: blog.title || "",
    summary: blog.summary || blog.excerpt || "",
    content: blog.content || "",
    category: blog.category || "",
    featuredImage: "",
    status: blog.status || "draft",
  };
}

export const BlogManagement = () => {
  const queryClient = useQueryClient();
  const featuredImageInputRef = useRef<HTMLInputElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);
  const [form, setForm] = useState<BlogFormState>(emptyForm);
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: () => adminService.getBlogs(),
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        summary: form.summary,
        excerpt: form.summary,
        content: form.content,
        category: form.category,
        status: form.status,
        featuredImage: form.featuredImage,
      };

      return selectedBlog
        ? adminService.updateBlog(selectedBlog._id || selectedBlog.id || "", payload)
        : adminService.createBlog(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      await queryClient.invalidateQueries({ queryKey: ["blogs", "public"] });
      setIsModalOpen(false);
      setSelectedBlog(null);
      setForm(emptyForm);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (blogId: string) => adminService.deleteBlog(blogId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      await queryClient.invalidateQueries({ queryKey: ["blogs", "public"] });
    },
  });

  const blogs = data?.data || [];

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(term) ||
        (blog.category || "").toLowerCase().includes(term),
    );
  }, [blogs, searchTerm]);

  const columns = [
    { key: "title", header: "Post Title" },
    {
      key: "author",
      header: "Author",
      render: (item: BlogItem) =>
        typeof item.author === "string"
          ? item.author
          : `${item.author?.firstName || ""} ${item.author?.lastName || ""}`.trim() ||
            item.author?.name ||
            "Admin",
    },
    {
      key: "date",
      header: "Date",
      render: (item: BlogItem) =>
        item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "—",
    },
    {
      key: "status",
      header: "Status",
      render: (item: BlogItem) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}`}
        >
          {item.status || "draft"}
        </span>
      ),
    },
  ];

  const openForm = (blog?: BlogItem) => {
    if (blog) {
      setSelectedBlog(blog);
      setForm(mapBlogToForm(blog));
    } else {
      setSelectedBlog(null);
      setForm(emptyForm);
    }
    setIsModalOpen(true);
  };

  const handleFeaturedImageUpload = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    setUploadingFeaturedImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await adminService.uploadImage(fd);
      if (res?.fileUrl) {
        setForm((prev) => ({ ...prev, featuredImage: res.fileUrl }));
        toast.success("Featured image uploaded");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || err?.message || "Upload failed");
    } finally {
      setUploadingFeaturedImage(false);
    }
  };

  const actions = (item: BlogItem) => (
    <div className="flex justify-end gap-2 text-muted-foreground">
      <button className="p-1 hover:text-primary transition-colors" onClick={() => openForm(item)}>
        <Edit className="w-4 h-4" />
      </button>
      <button
        className="p-1 hover:text-red-500 transition-colors"
        onClick={() => deleteMutation.mutate(item._id || item.id || "")}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground">Manage your blog posts and articles.</p>
        </div>
        <Dialog
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) {
              setSelectedBlog(null);
              setForm(emptyForm);
            }
          }}
        >
          <DialogTrigger asChild>
            <button
              onClick={() => openForm()}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Post
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedBlog ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Summary</label>
                <textarea
                  value={form.summary}
                  onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
                  className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  className="min-h-48 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Featured Image URL</label>
                {form.featuredImage ? (
                  <div className="overflow-hidden rounded-xl border border-border">
                    <img
                      src={form.featuredImage}
                      alt="Featured preview"
                      className="h-48 w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => featuredImageInputRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-secondary"
                    disabled={uploadingFeaturedImage}
                  >
                    <Upload className="h-4 w-4" />
                    {uploadingFeaturedImage ? "Uploading…" : "Upload from device"}
                  </button>
                  <input
                    ref={featuredImageInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      void handleFeaturedImageUpload(e.target.files);
                      e.currentTarget.value = "";
                    }}
                  />
                  <input
                    value={form.featuredImage}
                    onChange={(e) => setForm((prev) => ({ ...prev, featuredImage: e.target.value }))}
                    className="flex-1 min-w-[260px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Or paste an image URL"
                  />
                </div>
              </div>
              <button
                onClick={() => saveMutation.mutate()}
                className="mt-4 bg-primary text-primary-foreground h-10 rounded-md font-medium disabled:opacity-50"
                disabled={saveMutation.isPending}
              >
                {saveMutation.isPending ? "Saving…" : selectedBlog ? "Update Post" : "Save Post"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-700">
          Unable to load blogs: {error instanceof Error ? error.message : "Please try again."}
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item._id || item.id || item.slug || item.title}
          onSearch={setSearchTerm}
          searchPlaceholder="Search blogs..."
          actions={actions}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
};
