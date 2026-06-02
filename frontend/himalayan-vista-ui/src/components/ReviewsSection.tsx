import { Star } from "lucide-react";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
}: ReviewsSectionProps) {
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
              <span className="text-2xl font-bold text-foreground">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Based on {totalReviews} reviews</p>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="pb-6 border-b border-border/50 last:border-b-0"
          >
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
        ))}
      </div>

      {/* Write Review Button */}
      <button className="mt-8 w-full bg-gradient-sunset text-white py-3 rounded-lg font-semibold hover:shadow-glow transition-all hover:-translate-y-0.5">
        Write a Review
      </button>
    </div>
  );
}
