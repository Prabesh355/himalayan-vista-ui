import { Star } from "lucide-react";
import { type FormEvent, useState } from "react";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
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
  submitMessage?: string;
  submitError?: string;
  onSubmitReview?: (values: ReviewFormValues) => void | Promise<void>;
}

export function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
  isSubmitting = false,
  submitMessage,
  submitError,
  onSubmitReview,
}: ReviewsSectionProps) {
  const [form, setForm] = useState<ReviewFormValues>({
    guestName: "",
    guestEmail: "",
    title: "",
    rating: 5,
    comment: "",
  });

  const updateForm = (field: keyof ReviewFormValues, value: string | number) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmitReview?.(form);
    setForm({
      guestName: "",
      guestEmail: "",
      title: "",
      rating: 5,
      comment: "",
    });
  };

  return (
    <div className="rounded-2xl glass border border-border/50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">Reviews</h2>
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">{averageRating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="pb-6 border-b border-border/50 last:border-b-0">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{review.author}</span>
                    {review.verified && (
                      <span className="text-xs bg-green-500/20 text-green-600 px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              {/* Review Content */}
              <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{review.content}</p>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-border/50 bg-background/60 p-5 text-sm text-muted-foreground">
            No reviews yet. Be the first traveler to share your experience.
          </div>
        )}
      </div>

      {onSubmitReview && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-border/50 bg-background/70 p-5"
        >
          <div>
            <h3 className="text-lg font-semibold text-foreground">Write a Review</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Share your trek experience with future travelers.
            </p>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-foreground">
              Name
              <input
                required
                value={form.guestName}
                onChange={(event) => updateForm("guestName", event.target.value)}
                className="mt-2 w-full rounded-xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                placeholder="Your name"
              />
            </label>
            <label className="text-sm font-medium text-foreground">
              Email
              <input
                type="email"
                value={form.guestEmail}
                onChange={(event) => updateForm("guestEmail", event.target.value)}
                className="mt-2 w-full rounded-xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="mt-4 block text-sm font-medium text-foreground">
            Review title
            <input
              required
              value={form.title}
              onChange={(event) => updateForm("title", event.target.value)}
              className="mt-2 w-full rounded-xl border border-border/70 bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent"
              placeholder="Amazing trek with great guides"
            />
          </label>

          <div className="mt-4">
            <p className="text-sm font-medium text-foreground">Rating</p>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => updateForm("rating", rating)}
                  className="rounded-full p-1 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={`${rating} star rating`}
                >
                  <Star
                    className={`h-6 w-6 ${
                      rating <= form.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <label className="mt-4 block text-sm font-medium text-foreground">
            Review
            <textarea
              required
              minLength={10}
              value={form.comment}
              onChange={(event) => updateForm("comment", event.target.value)}
              className="mt-2 min-h-32 w-full rounded-xl border border-border/70 bg-background px-4 py-3 text-sm leading-7 text-foreground outline-none transition focus:border-accent"
              placeholder="Tell visitors what made this trek special..."
            />
          </label>

          {submitMessage && (
            <p className="mt-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-600">
              {submitMessage}
            </p>
          )}
          {submitError && (
            <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-5 w-full rounded-lg bg-gradient-sunset py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isSubmitting ? "Publishing..." : "Publish Review"}
          </button>
        </form>
      )}
    </div>
  );
}
