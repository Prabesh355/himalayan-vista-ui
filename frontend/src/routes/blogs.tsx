import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Clock, Mountain } from "lucide-react";
import { api } from "@/services/api";

type Author = { _id?: string; firstName?: string; lastName?: string; name?: string };

type BlogItem = {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  excerpt?: string;
  summary?: string;
  content?: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  status?: string;
  publishedAt?: string;
  createdAt?: string;
  readTime?: number;
  author?: Author;
  views?: number;
};

function authorName(a?: Author) {
  if (!a) return "Nomads Navigate Nepal";
  if (a.firstName || a.lastName) return `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim();
  return a.name || "Nomads Navigate Nepal";
}

function formatDate(value?: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Stories from the trail — Nomads Navigate Nepal" },
      {
        name: "description",
        content: "Stories, guides, and dispatches from the Himalayan trails — Nomads Navigate Nepal.",
      },
    ],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["blogs", "public"],
    queryFn: async () => (await api.get<{ success: boolean; data: BlogItem[] }>("/blogs")).data,
  });

  const blogs: BlogItem[] = data?.data ?? [];

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" />
        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium text-accent uppercase tracking-wider">Stories</p>
            <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tight">
              From the <span className="text-gradient-sunset">trail.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Field notes, trekking guides, and dispatches from the Himalayas — written by the team
              that walks them.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="glass rounded-3xl overflow-hidden animate-pulse h-96"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="glass rounded-3xl p-16 text-center">
            <p className="text-lg font-semibold">Couldn't load stories</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please try again in a moment.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-5 py-2.5 text-sm font-semibold text-white shadow-soft"
            >
              Retry
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-summit shadow-glow">
              <Mountain className="h-7 w-7 text-white" />
            </div>
            <p className="mt-6 text-lg font-semibold">No stories yet</p>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Our team is drafting fresh dispatches from the trail. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b, i) => {
              const cover =
                b.featuredImage && b.featuredImage.length > 0
                  ? b.featuredImage
                  : "https://via.placeholder.com/640x800?text=Story";
              const blurb = b.excerpt || b.summary || "";
              const slug = b.slug || b.id || b._id || "";
              return (
                <Link key={b._id || b.id || b.slug || i} to="/blogs/$slug" params={{ slug }}>
                  <motion.article
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.06 }}
                    className="group relative overflow-hidden rounded-3xl glass shadow-soft transition-all hover:shadow-elegant hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={cover}
                        alt={b.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {b.category && (
                        <div className="absolute top-4 left-4">
                          <span className="rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white border border-white/20">
                            {b.category}
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <h3 className="text-xl font-semibold tracking-tight line-clamp-2">
                          {b.title}
                        </h3>
                        {blurb && (
                          <p className="mt-1 text-sm text-white/80 line-clamp-2">{blurb}</p>
                        )}
                        <div className="mt-4 flex items-center justify-between gap-2 text-xs text-white/85">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" /> {formatDate(b.publishedAt || b.createdAt)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> {b.readTime ?? 4} min read
                          </span>
                        </div>
                        <p className="mt-3 text-[11px] uppercase tracking-wider text-white/70">
                          By {authorName(b.author)}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              );
            })}
          </div>
        )}

        {!isLoading && !isError && blogs.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 rounded-full bg-foreground/10 px-5 py-2.5 text-sm font-medium hover:bg-foreground/20 transition-colors"
            >
              Browse destinations instead
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
