import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { DataTable } from "./DataTable";
import { CheckCircle2, Trash2, Star, MessageSquareText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { adminService, ReviewItem } from "@/services/adminService";

export const ReviewManagement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);

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

  const reviews = reviewsQuery.data?.reviews || [];

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return reviews.filter((review) => {
      const haystack = [
        review.user?.firstName,
        review.user?.lastName,
        review.user?.email,
        review.package?.title,
        review.package?.destination,
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
      render: (item: ReviewItem) =>
        `${item.user?.firstName || "Guest"} ${item.user?.lastName || ""}`.trim(),
    },
    {
      key: "package",
      header: "Package",
      render: (item: ReviewItem) => item.package?.title || "—",
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
          <p className="text-muted-foreground">Approve, review, and moderate customer feedback.</p>
        </div>
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
                  <p className="font-semibold">
                    {selectedReview.user?.firstName || "Guest"}{" "}
                    {selectedReview.user?.lastName || ""}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedReview.user?.email || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">Package</p>
                  <p className="font-semibold">{selectedReview.package?.title || "—"}</p>
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
    </div>
  );
};
