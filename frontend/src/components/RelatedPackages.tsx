import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import api from "@/services/api";
import { resolvePackageImage, defaultImageFallback } from "@/lib/imageUrl";
import { useCurrency } from "@/context/CurrencyProvider";
import { getPackageUrlPrefix } from "@/lib/seo";

export const RelatedPackages = ({
  currentPackageId,
  category,
  destination,
}: {
  currentPackageId: string;
  category?: string;
  destination?: string;
}) => {
  const { formatPrice } = useCurrency();

  const { data: related, isLoading } = useQuery({
    queryKey: ["related-packages", currentPackageId, category, destination],
    queryFn: async () => {
      // First try matching by destination
      let res = await api.get("/packages", {
        params: { destination, limit: 5, isActive: "true" },
      });
      let packages = res.data?.data || [];
      packages = packages.filter((p: any) => p.slug !== currentPackageId && p._id !== currentPackageId && p.id !== currentPackageId);

      // If not enough, fetch by category
      if (packages.length < 3 && category) {
        const catRes = await api.get("/packages", {
          params: { category, limit: 5, isActive: "true" },
        });
        const catPackages = catRes.data?.data || [];
        
        for (const p of catPackages) {
          if (
            p.slug !== currentPackageId &&
            p._id !== currentPackageId &&
            p.id !== currentPackageId &&
            !packages.some((existing: any) => existing.slug === p.slug)
          ) {
            packages.push(p);
          }
        }
      }

      return packages.slice(0, 3);
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !related || related.length === 0) return null;

  return (
    <section className="py-12 border-t border-border">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight mb-8">You May Also Like</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((pkg: any) => {
            const image = resolvePackageImage(pkg.images?.[0] || pkg.image);
            const prefix = getPackageUrlPrefix(pkg.category);
            const url = `/${prefix}/${pkg.slug}`;

            return (
              <Link
                key={pkg.slug || pkg.id}
                to={url}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                  <img
                    src={image}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = defaultImageFallback;
                    }}
                  />
                  {pkg.duration && (
                    <div className="absolute top-4 right-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-md">
                      {pkg.duration.days} Days
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">
                    {pkg.destination || pkg.category || "Adventure"}
                  </div>
                  <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {pkg.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                    <span className="text-sm text-muted-foreground">From</span>
                    <span className="text-lg font-bold text-primary">
                      {formatPrice(pkg.price)}
                    </span>
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
