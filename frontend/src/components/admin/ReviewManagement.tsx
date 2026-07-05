import { type FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { DataTable } from "./DataTable";
import { CheckCircle2, Edit3, Plus, Trash2, Star, MessageSquareText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { adminService, ReviewItem } from "@/services/adminService";

type ReviewFormState = {
  guestName: string;
  guestEmail: string;
  title: string;
  rating: number;
  comment: string;
  status: string;
};

const emptyReviewForm: ReviewFormState = {
  guestName: "",
  guestEmail: "",
  title: "",
  rating: 5,
  comment: "",
  status: "approved",
};

const getReviewerName = (review: ReviewItem) =>
  review.guestName ||
  [review.user?.firstName, review.user?.lastName].filter(Boolean).join(" ").trim() ||
  review.user?.email ||
  "Guest Traveler";

const getReviewerEmail = (review: ReviewItem) => review.guestEmail || review.user?.email || "";

export const ReviewManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [form, setForm] = useState<ReviewFormState>(emptyReviewForm);

  const reviewsQuery = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: () => adminService.getReviews(),
  });

  const approveMutation = useMutation({
    mutationFn: (reviewId: string) => adminService.approveReview(reviewId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (reviewId: string) => adminService.deleteReview(reviewId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      setSelectedReview(null);
    },
  });

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        guestName: form.guestName.trim(),
        guestEmail: form.guestEmail.trim(),
        title: form.title.trim(),
        rating: Number(form.rating),
        comment: form.comment.trim(),
        status: form.status,
      };

      if (editingReview) {
        return adminService.updateReview(editingReview._id || editingReview.id || "", payload);
      }

      return adminService.createReview(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      await queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      setIsEditorOpen(false);
      setEditingReview(null);
      setForm(emptyReviewForm);
    },
  });

  const reviews = reviewsQuery.data?.reviews || [];

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return reviews.filter((review) => {
      const haystack = [
        review.user?.firstName,
        review.user?.lastName,
        review.user?.email,
        review.guestName,
        review.guestEmail,
        review.package?.title,
        review.package?.destination,
        review.title,
        review.comment,
        review.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [reviews, searchTerm]);

  const columns = [
    {
      key: "reviewer",
      header: "Reviewer",
      render: (item: ReviewItem) => getReviewerName(item),
    },
    {
      key: "package",
      header: "Scope",
      render: (item: ReviewItem) => item.package?.title || "Homepage",
    },
    {
      key: "rating",
      header: "Rating",
      render: (item: ReviewItem) => (
        <span className="inline-flex items-center gap-1 font-medium">
          <Star className="h-4 w-4 fill-current text-amber-500" />
          {item.rating}/5
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: ReviewItem) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "approved" ? "bg-emerald-100 text-emerald-700" : item.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}
        >
          {item.status || "pending"}
        </span>
      ),
    },
  ];

  const openEditor = (review?: ReviewItem) => {
    setEditingReview(review || null);
    setForm(
      review
        ? {
            guestName: getReviewerName(review),
            guestEmail: getReviewerEmail(review),
            title: review.title || "",
            rating: review.rating || 5,
            comment: review.comment || "",
            status: review.status || "approved",
          }
        : emptyReviewForm,
    );
    setIsEditorOpen(true);
  };

  const updateForm = (field: keyof ReviewFormState, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveMutation.mutate();
  };

  const actions = (item: ReviewItem) => (
    <div className="flex justify-end gap-2 text-muted-foreground">
      <button
        className="p-1 hover:text-primary transition-colors"
        title="View Review"
        onClick={() => setSelectedReview(item)}
      >
        <MessageSquareText className="w-4 h-4" />
      </button>
      <button
        className="p-1 hover:text-primary transition-colors"
        title="Edit Review"
        onClick={() => openEditor(item)}
      >
        <Edit3 className="w-4 h-4" />
      </button>
      <button
        className="p-1 hover:text-emerald-600 transition-colors disabled:opacity-50"
        title="Approve Review"
        onClick={() => approveMutation.mutate(item._id || item.id || "")}
        disabled={item.status === "approved" || approveMutation.isPending}
      >
        <CheckCircle2 className="w-4 h-4" />
      </button>
      <button
        className="p-1 hover:text-red-500 transition-colors"
        title="Delete Review"
        onClick={() => deleteMutation.mutate(item._id || item.id || "")}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground">
            Create, edit, approve, and moderate homepage customer feedback.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openEditor()}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Review
        </button>
      </div>

      {reviewsQuery.error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-700">
          Unable to load reviews:{" "}
          {reviewsQuery.error instanceof Error ? reviewsQuery.error.message : "Please try again."}
        </div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <DataTable
          data={filteredData}
          columns={columns}
          keyExtractor={(item) =>
            item._id || item.id || `${item.rating}-${item.comment?.slice(0, 10)}`
          }
          onSearch={setSearchTerm}
          searchValue={searchTerm}
          searchPlaceholder="Search reviews by user, package, or comment..."
          actions={actions}
          isLoading={reviewsQuery.isLoading}
        />
      </motion.div>

      <Dialog open={!!selectedReview} onOpenChange={(open) => !open && setSelectedReview(null)}>
        <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
          </DialogHeader>
          {selectedReview && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Reviewer</p>
                  <p className="font-semibold">{getReviewerName(selectedReview)}</p>
                  <p className="text-sm text-muted-foreground">
                    {getReviewerEmail(selectedReview) || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Scope</p>
                  <p className="font-semibold">{selectedReview.package?.title || "Homepage"}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedReview.package?.destination || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Rating</p>
                  <p className="font-semibold">{selectedReview.rating}/5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Status</p>
                  <p className="font-semibold capitalize">{selectedReview.status || "pending"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Comment</p>
                <div className="mt-2 rounded-lg border bg-secondary/40 p-4 text-sm whitespace-pre-wrap">
                  {selectedReview.comment || "—"}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-[720px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingReview ? "Edit Review" : "New Review"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="grid gap-4 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium">
                Reviewer name
                <input
                  required
                  value={form.guestName}
                  onChange={(event) => updateForm("guestName", event.target.value)}
                  className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="text-sm font-medium">
                Reviewer email
                <input
                  type="email"
                  value={form.guestEmail}
                  onChange={(event) => updateForm("guestEmail", event.target.value)}
                  className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium">
                Review title
                <input
                  required
                  value={form.title}
                  onChange={(event) => updateForm("title", event.target.value)}
                  className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <label className="text-sm font-medium">
                Status
                <select
                  value={form.status}
                  onChange={(event) => updateForm("status", event.target.value)}
                  className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </label>
            </div>

            <label className="text-sm font-medium">
              Rating
              <input
                required
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(event) => updateForm("rating", Number(event.target.value))}
                className="mt-2 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>

            <label className="text-sm font-medium">
              Comment
              <textarea
                required
                minLength={10}
                value={form.comment}
                onChange={(event) => updateForm("comment", event.target.value)}
                className="mt-2 min-h-32 w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              />
            </label>

            {saveMutation.error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-700">
                {(saveMutation.error as any)?.response?.data?.message ||
                  "Unable to save this review. Please check the fields and try again."}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
              >
                {saveMutation.isPending ? "Saving..." : "Save Review"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
