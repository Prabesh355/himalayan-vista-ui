import { createFileRoute } from "@tanstack/react-router";
import { BlogDetailPage } from "./blogs.$slug";
import { api } from "@/services/api";
import { generateMeta } from "@/lib/seo";

function authorName(a?: { firstName?: string; lastName?: string; name?: string }) {
  if (!a) return "Nomads Navigate Nepal";
  if (a.firstName || a.lastName) return `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim();
  return a.name || "Nomads Navigate Nepal";
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    try {
      const res = await api.get<{ success: boolean; data: any }>(`/blogs/${params.slug}`);
      return res.data?.data || null;
    } catch (err) {
      console.warn("Failed to fetch blog in /blog/$slug loader:", err);
      return null;
    }
  },
  head: ({ loaderData }) => {
    const blog = loaderData;
    if (!blog) {
      return generateMeta({
        title: "Article Not Found — Nomads Navigate Nepal",
        description: "The requested blog post could not be found."
      });
    }

    const title = blog.seoTitle || `${blog.title} | Nomads Navigate Nepal Blog`;
    const description = blog.seoDescription || blog.excerpt || blog.summary || "";
    const keywords = blog.keywords || `${blog.title}, Nepal travel blog, trekking stories`;
    const ogImage = blog.ogImage || blog.featuredImage || "";
    const canonicalUrl = blog.canonicalUrl || `https://nomadsnavigatenepal.com/blog/${blog.slug}`;
    const robots = blog.robots || "index, follow";

    return generateMeta({
      title,
      description,
      keywords,
      canonicalUrl,
      ogImage,
      robots,
      ogType: "article",
      author: authorName(blog.author)
    });
  },
  component: () => {
    const { slug } = Route.useParams();
    return <BlogDetailPage slug={slug} />;
  }
});
