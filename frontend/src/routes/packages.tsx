import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { packageService } from "@/services/packageService";
import { defaultImageFallback, resolveImageUrl, resolvePackageImage, useFallbackImage } from "@/lib/imageUrl";
import { useCurrency } from "@/context/CurrencyProvider";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Trekking Packages — Nomads Navigate Nepal" },
      { name: "description", content: "Trekking Packages — Nomads Navigate Nepal." },
    ],
  }),
  component: PackagesIndex,
});

function PackagesIndex() {
  const handleImageError = useFallbackImage(defaultImageFallback);
  const { formatPrice } = useCurrency();
  const contactEmail = "nomadsnavigatenepal5@gmail.com";
  const whatsappNumber = "+9779769364689";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20Nomads%20Navigate%20Nepal%2C%20I%20am%20interested%20in%20booking%20a%20trek.`;

  const {
    data: response,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["packages", "public"],
    queryFn: () => packageService.getAllPackages({ limit: 100 }),
  });

  const packages = response?.data || [];

  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isPackageDetail = pathname !== "/packages" && pathname.startsWith("/packages/");

  if (isPackageDetail) {
    return <Outlet />;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">Trekking</p>
          <h1 className="mt-1 text-4xl font-semibold">Trekking Packages</h1>
          <p className="mt-2 text-muted-foreground">
            Hand-crafted trekking itineraries across Nepal — click a trek to view full details.
          </p>
        </div>
      </div>

      <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm font-semibold text-foreground">Book now or send a quick enquiry</p>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
          Instantly reach us by email or WhatsApp from the trekking packages section.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`mailto:${contactEmail}?subject=Booking%20Enquiry%20for%20Nepal%20Trek&body=Hello%20Nomads%20Navigate%20Nepal%2C%0A%0AI%20would%20like%20more%20information%20about%20your%20trekking%20packages.%20Please%20contact%20me%20with%20availability%20and%20pricing.%0A%0AThank%20you.`}
            className="inline-flex items-center rounded-full bg-gradient-sunset px-5 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-95"
          >
            Email enquiry
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            WhatsApp booking
          </a>
        </div>
      </div>

      <div className="space-y-10">
        {isLoading && <p>Loading packages...</p>}
        {isError && <p>Error loading packages.</p>}
        {packages.map((d) => (
          <article key={d.id || d._id} className="glass rounded-2xl p-6">
            <div className="md:flex md:items-start md:gap-6">
              <div className="md:flex-shrink-0 md:w-44">
                <img
                  src={resolvePackageImage(d.images?.[0], d.slug, d.title)}
                  alt={d.title}
                  onError={handleImageError}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>

              <div className="mt-4 md:mt-0 flex-1">
                <h2 className="text-2xl font-semibold">{d.title}</h2>
                {d.destination && <p className="mt-1 text-muted-foreground">{d.destination}</p>}

                <p className="mt-3 text-sm text-muted-foreground max-w-3xl line-clamp-3">
                  {d.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>{d.destination}</span>
                  <span>·</span>
                  <span>{d.duration?.days || 0} Days</span>
                  <span>·</span>
                  <span className="capitalize">{d.difficulty}</span>
                  <span>·</span>
                  <span>
                    from <strong>{formatPrice(d.price)}</strong>
                  </span>
                </div>

                {Array.isArray(d.groupPriceTiers) && d.groupPriceTiers.length ? (
                  <div className="mt-4 max-w-md overflow-hidden rounded-xl border border-white/10">
                    <div className="grid grid-cols-2 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <span>Group size</span><span className="text-right">Price / person</span>
                    </div>
                    {d.groupPriceTiers.map((tier: { min: number; max: number; price: number }, index: number) => (
                      <div key={`${tier.min}-${tier.max}-${index}`} className="grid grid-cols-2 border-t border-white/10 px-3 py-2 text-sm">
                        <span>{tier.min}–{tier.max} Pax</span><span className="text-right font-semibold text-accent">{formatPrice(tier.price)}</span>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    to="/packages/$slug"
                    params={{ slug: d.slug }}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-4 py-2 text-sm font-semibold text-white"
                  >
                    View More
                  </Link>
                  <a
                    href={`mailto:${contactEmail}?subject=Booking%20Enquiry%20for%20${encodeURIComponent(d.title)}&body=Hello%20Nomads%20Navigate%20Nepal%2C%0A%0AI%20am%20interested%20in%20the%20${encodeURIComponent(d.title)}%20package.%20Please%20send%20me%20pricing%20and%20availability.%0A%0AThank%20you.`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <Outlet />
    </section>
  );
}
