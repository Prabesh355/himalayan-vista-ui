import { createFileRoute } from "@tanstack/react-router";
import { PackageDetails } from "./packages.$slug";
import api from "@/services/api";
import { generateMeta, getPackageUrlPrefix } from "@/lib/seo";

export const Route = createFileRoute("/peak-climbing/$slug")({
  loader: async ({ params }) => {
    try {
      const res = await api.get<{ success: boolean; data: any }>(`/packages/slug/${params.slug}`);
      return res.data?.data || null;
    } catch (err: any) {
      console.warn("Failed to fetch package in peak-climbing loader:", err);
      const mockModule = await import("@/services/mockData");
      const fallback = mockModule.destinations.find((d) => d.slug === params.slug);
      if (fallback) {
        const daysMatch = fallback.duration ? fallback.duration.match(/(\d+)\s*days?/i) : null;
        const days = daysMatch ? Number(daysMatch[1]) : 1;
        const nights = Math.max(0, days - 1);
        return {
          id: fallback.slug,
          slug: fallback.slug,
          title: fallback.name,
          description: fallback.description,
          destination: fallback.region,
          price: fallback.priceFrom || 0,
          duration: { days, nights },
          images: fallback.image ? [fallback.image] : [],
          groupSize: { min: 1, max: 12 },
          featured: false,
          isActive: true,
          itinerary: fallback.itinerary || "",
          category: "climbing",
          difficulty: fallback.difficulty.toLowerCase()
        };
      }
      return null;
    }
  },
  head: ({ loaderData }) => {
    const pkg = loaderData;
    if (!pkg) {
      return generateMeta({
        title: "Peak Climbing Package Not Found — Nomads Navigate Nepal",
        description: "The requested peak climbing expedition was not found."
      });
    }

    const title = pkg.seoTitle || `${pkg.title} | Peak Climbing & Expedition in Nepal`;
    const description = pkg.seoDescription || pkg.description || "";
    const keywords = pkg.keywords || `${pkg.title}, ${pkg.destination}, Nepal Peak Climbing, expedition, mountaineering`;
    const ogImage = pkg.ogImage || (pkg.images?.[0] || pkg.image);
    const prefix = getPackageUrlPrefix(pkg.category);
    const canonicalUrl = pkg.canonicalUrl || `https://nomadsnavigatenepal.com/${prefix}/${pkg.slug}`;
    const robots = pkg.robots || "index, follow";

    return generateMeta({
      title,
      description,
      keywords,
      canonicalUrl,
      ogImage,
      robots,
      ogType: "website"
    });
  },
  component: () => {
    const { slug } = Route.useParams();
    return <PackageDetails slug={slug} />;
  }
});
