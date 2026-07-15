import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import api from "@/services/api";
import { resolveImageUrl, defaultImageFallback } from "@/lib/imageUrl";

export const RelatedBlogs = ({
  currentBlogId,
  category,
}: {
  currentBlogId: string;
  category?: string;
}) => {
  const { data: related, isLoading } = useQuery({
    queryKey: ["related-blogs", currentBlogId, category],
    queryFn: async () => {
      let res = await api.get("/blogs/public", {
        params: { category, limit: 4 },
      });
      let blogs = res.data?.data || [];
      blogs = blogs.filter(
        (b: any) =>
          b.slug !== currentBlogId && b._id !== currentBlogId && b.id !== currentBlogId,
      );

      // If no category match or not enough, just fetch latest
      if (blogs.length < 3) {
        const latestRes = await api.get("/blogs/public", {
          params: { limit: 5 },
        });
        const latest = latestRes.data?.data || [];
        for (const b of latest) {
          if (
            b.slug !== currentBlogId &&
            b._id !== currentBlogId &&
            b.id !== currentBlogId &&
            !blogs.some((existing: any) => existing.slug === b.slug)
          ) {
            blogs.push(b);
          }
        }
      }

      return blogs.slice(0, 3);
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !related || related.length === 0) return null;

  return (
    <section className="py-12 border-t border-border mt-12 bg-muted/20">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-8">Related Articles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((blog: any) => {
            const image = resolveImageUrl(blog.featuredImage || blog.image);

            return (
              <Link
                key={blog.slug || blog.id}
                to={`/blog/${blog.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <img
                    src={image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultImageFallback;
                    }}
                  />
                  {blog.category && (
                    <div className="absolute top-3 left-3 rounded-md bg-primary px-2 py-1 text-[10px] font-bold text-primary-foreground uppercase tracking-wider">
                      {blog.category}
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {blog.summary || blog.excerpt || ""}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs text-muted-foreground font-medium">
                    <span>
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : ""}
                    </span>
                    <span className="text-primary group-hover:underline">Read more</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
