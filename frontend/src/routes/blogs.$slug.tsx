import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { api } from "@/services/api";
import { useMemo } from "react";
import { generateMeta, schemaBuilders } from "@/lib/seo";
import { RelatedBlogs } from "@/components/RelatedBlogs";

type Author = { _id?: string; firstName?: string; lastName?: string; name?: string };

export type BlogItem = {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  excerpt?: string;
  summary?: string;
  content?: string;
  featuredImage?: string;
  category?: string;
  publishedAt?: string;
  createdAt?: string;
  readTime?: number;
  author?: Author;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  robots?: string;
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

export const Route = createFileRoute("/blogs/$slug")({
  loader: async ({ params }) => {
    let blog = null;
    try {
      const res = await api.get<{ success: boolean; data: any }>(`/blogs/${params.slug}`);
      blog = res.data?.data;
    } catch (err) {
      console.warn("Failed to fetch blog in redirect loader:", err);
    }

    if (blog) {
      throw redirect({
        to: `/blog/$slug`,
        params: { slug: blog.slug },
        statusCode: 301,
      });
    }

    throw redirect({
      to: "/blogs",
      statusCode: 301,
    });
  },
  component: () => null,
});

export function BlogDetailPage({ slug }: { slug: string }) {
  const loaderData = Route.useLoaderData() as any;
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => (await api.get<{ success: boolean; data: BlogItem }>(`/blogs/${slug}`)).data,
    initialData: loaderData ? { success: true, data: loaderData } : undefined,
  });

  const blog = data?.data;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20">
        <div className="h-[70vh] rounded-3xl glass animate-pulse" />
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-2xl font-semibold">Story not found</p>
        <p className="mt-2 text-muted-foreground">The article may have been moved or unpublished.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-5 py-2.5 text-sm font-semibold text-white"
          >
            Retry
          </button>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to stories
          </Link>
        </div>
      </div>
    );
  }

  const cover = blog.featuredImage || "https://via.placeholder.com/1200x700?text=Story";

  const jsonLdData = useMemo(() => {
    if (!blog) return null;

    const fullUrl = `https://nomadsnavigatenepal.com/blog/${blog.slug}`;
    const mainImg = blog.featuredImage || "https://via.placeholder.com/1200x700?text=Story";

    const articleSchema = schemaBuilders.article({
      title: blog.title,
      description: blog.excerpt || blog.summary || "",
      image: mainImg,
      url: fullUrl,
      publishedDate: blog.publishedAt || blog.createdAt || "",
      authorName: authorName(blog.author),
      category: blog.category
    });

    const breadcrumbSchema = schemaBuilders.breadcrumbs([
      { name: "Home", item: "https://nomadsnavigatenepal.com" },
      { name: "Stories", item: "https://nomadsnavigatenepal.com/blogs" },
      { name: blog.title, item: fullUrl }
    ]);

    return [articleSchema, breadcrumbSchema];
  }, [blog]);

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      {jsonLdData && jsonLdData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Link
        to="/blogs"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to stories
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 overflow-hidden rounded-3xl glass shadow-soft"
      >
        <div className="aspect-[16/8] overflow-hidden bg-secondary/30">
          <img src={cover} alt={blog.title} className="h-full w-full object-cover" />
        </div>
        <div className="p-6 md:p-10 space-y-5">
          {blog.category ? (
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {blog.category}
            </span>
          ) : null}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDate(blog.publishedAt || blog.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {blog.readTime ?? 4} min read
            </span>
            <span>By {authorName(blog.author)}</span>
          </div>
          <div className="prose prose-lg max-w-none prose-headings:tracking-tight prose-img:rounded-2xl prose-img:shadow-lg dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content || blog.excerpt || blog.summary || ""}
            </ReactMarkdown>
          </div>
        </div>
      </motion.div>

      <RelatedBlogs currentBlogId={blogId} category={blog.category} />
    </article>
  );
}