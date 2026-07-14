import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Star } from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  country?: string;
  createdAt?: string | number;
}

export type ReviewFormValues = {
  guestName: string;
  guestEmail: string;
  title: string;
  rating: number;
  comment: string;
};

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  isSubmitting?: boolean;
  isLoading?: boolean;
  submitMessage?: string;
  submitError?: string;
  onSubmitReview?: (values: ReviewFormValues) => void | Promise<void>;
}

const emptyReviewForm: ReviewFormValues = {
  guestName: "",
  guestEmail: "",
  title: "",
  rating: 5,
  comment: "",
};

export function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
  isSubmitting = false,
  isLoading = false,
  submitMessage,
  submitError,
  onSubmitReview,
}: ReviewsSectionProps) {
  const [form, setForm] = useState<ReviewFormValues>(emptyReviewForm);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "lowest">("recent");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setVisibleCount(6);
  }, [sortBy]);

  const updateForm = (field: keyof ReviewFormValues, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const sortedReviews = useMemo(() => {
    const nextReviews = [...reviews];
    nextReviews.sort((left, right) => {
      const leftTime = left.createdAt ? new Date(left.createdAt).getTime() : 0;
      const rightTime = right.createdAt ? new Date(right.createdAt).getTime() : 0;

      if (sortBy === "highest") {
        return right.rating - left.rating || rightTime - leftTime;
      }
      if (sortBy === "lowest") {
        return left.rating - right.rating || leftTime - rightTime;
      }
      return rightTime - leftTime;
    });

    return nextReviews;
  }, [reviews, sortBy]);

  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const hasMoreReviews = sortedReviews.length > visibleCount;

  const ratingDistribution = useMemo(() => {
    const counts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((review) => review.rating === star).length,
    }));

    return counts.map((item) => ({
      ...item,
      percent: totalReviews ? Math.round((item.count / totalReviews) * 100) : 0,
    }));
  }, [reviews, totalReviews]);

  const recommendationPercentage = totalReviews
    ? Math.round((reviews.filter((review) => review.rating >= 4).length / totalReviews) * 100)
    : 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSubmitReview) return;

    await onSubmitReview(form);
    setForm(emptyReviewForm);
    setIsDialogOpen(false);
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-elegant backdrop-blur-xl sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-accent">
            <Sparkles className="h-4 w-4" />
            Traveler Feedback
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Read what adventurers loved most
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Explore authentic experiences from fellow travelers and share your own story in a few simple steps.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {onSubmitReview ? (
            <Button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="rounded-full bg-gradient-sunset px-5 py-3 text-sm font-semibold text-white shadow-glow"
            >
              Write a review
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : null}

          <label className="flex items-center gap-2 rounded-full border border-white/10 bg-background/70 px-4 py-2 text-sm text-muted-foreground">
            <span className="sr-only">Sort reviews by</span>
            <select
              aria-label="Sort reviews"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as "recent" | "highest" | "lowest")}
              className="bg-transparent text-sm font-medium text-foreground outline-none"
            >
              <option value="recent">Most recent</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-background/70 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.45)]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${index < Math.round(averageRating) ? "fill-current" : "text-white/20"}`}
                    />
                  ))}
                </div>
                <span className="text-3xl font-semibold text-foreground">{averageRating.toFixed(1)}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">Overall rating</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-semibold text-foreground">{totalReviews}</p>
              <p className="mt-2 text-sm text-muted-foreground">Total reviews</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-background/60 p-4">
              <p className="text-sm font-medium text-foreground">Recommendation</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{recommendationPercentage}%</p>
              <p className="mt-1 text-sm text-muted-foreground">of travelers recommend this experience</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-background/60 p-4">
              <p className="text-sm font-medium text-foreground">Guest satisfaction</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-accent" />
                Verified stories and thoughtful feedback
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.star} className="flex items-center gap-3">
                <span className="w-8 text-sm font-medium text-muted-foreground">{item.star}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-sunset"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm text-muted-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-accent/20 bg-gradient-to-br from-accent/10 via-background/70 to-background/90 p-6 shadow-[0_20px_60px_-30px_rgba(244,170,66,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Share your story</p>
          <h3 className="mt-3 text-2xl font-semibold text-foreground">Enjoyed your adventure with us?</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Your experience helps future travelers choose the right expedition and plan with confidence.
          </p>
          {onSubmitReview ? (
            <Button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="mt-6 rounded-full border border-accent/30 bg-background/80 px-5 py-3 text-sm font-semibold text-foreground hover:bg-background"
            >
              Write a review
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </div>

      {submitMessage ? (
        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
          {submitMessage}
        </div>
      ) : null}
      {submitError ? (
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {submitError}
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-56 animate-pulse rounded-[1.5rem] border border-white/10 bg-background/60" />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <AnimatePresence initial={false}>
            {visibleReviews.map((review) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-[1.5rem] border border-white/10 bg-background/70 p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-sunset text-sm font-semibold text-white">
                      {review.author
                        .split(" ")
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase() || "T"}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-foreground">{review.author}</p>
                        {review.verified ? (
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                            Verified traveler
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.country || "Traveler"} · {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`${review.id}-${index}`}
                        className={`h-4 w-4 ${index < review.rating ? "fill-current" : "text-white/15"}`}
                      />
                    ))}
                  </div>
                </div>

                <h4 className="mt-5 text-lg font-semibold text-foreground">{review.title}</h4>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">“{review.content}”</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      {hasMoreReviews && !isLoading ? (
        <div className="mt-8 flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setVisibleCount((current) => current + 4)}
            className="rounded-full border-white/10 bg-background/70 px-5 py-3 text-sm font-semibold text-foreground"
          >
            Load more reviews
          </Button>
        </div>
      ) : null}

      {onSubmitReview ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl rounded-[1.75rem] border-white/10 bg-card/95 p-0 sm:p-0">
            <div className="p-6 sm:p-8">
              <DialogHeader className="text-left">
                <DialogTitle className="text-2xl font-semibold text-foreground">
                  Share your experience
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm leading-7 text-muted-foreground">
                  Tell future travelers what made your journey special and help them plan with confidence.
                </DialogDescription>
              </DialogHeader>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="review-name">Name</Label>
                    <Input
                      id="review-name"
                      required
                      value={form.guestName}
                      onChange={(event) => updateForm("guestName", event.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review-email">Email</Label>
                    <Input
                      id="review-email"
                      type="email"
                      value={form.guestEmail}
                      onChange={(event) => updateForm("guestEmail", event.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-title">Review title</Label>
                  <Input
                    id="review-title"
                    required
                    value={form.title}
                    onChange={(event) => updateForm("title", event.target.value)}
                    placeholder="Amazing trek with great guides"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => updateForm("rating", rating)}
                        className="rounded-full p-1 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={`${rating} star rating`}
                      >
                        <Star
                          className={`h-6 w-6 ${rating <= form.rating ? "fill-amber-400 text-amber-400" : "text-white/20"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="review-text">Review</Label>
                  <Textarea
                    id="review-text"
                    required
                    minLength={10}
                    value={form.comment}
                    onChange={(event) => updateForm("comment", event.target.value)}
                    placeholder="Tell future travelers what made this experience memorable..."
                    className="min-h-32"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="rounded-full bg-gradient-sunset px-5 text-white">
                    {isSubmitting ? "Publishing..." : "Publish review"}
                  </Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
