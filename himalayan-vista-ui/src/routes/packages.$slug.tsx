import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { destinations } from "@/services/mockData";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const Route = createFileRoute("/packages/$slug")({
  head: () => ({
    meta: [
      { title: "Trekking Package — Nomads Navigate Nepal" },
      { name: "description", content: "Trekking package details — Nomads Navigate Nepal." },
    ],
  }),
  component: PackageDetails,
});

function PackageDetails() {
  const { slug } = Route.useParams();
  const detailsRef = useRef<HTMLElement | null>(null);
  const pkg = destinations.find((d) => d.slug === slug);
  const contactEmail = "nomadsnavigatenepal5@gmail.com";
  const whatsappNumber = "977981234567";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Nomads%20Navigate%20Nepal%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg?.name || "trek")}%20package.`;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, [slug]);

  if (!pkg) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-2xl font-semibold">Package not found</h2>
        <p className="mt-4">We couldn't locate that trek. <Link to="/packages" className="text-accent">Back to packages</Link>.</p>
      </section>
    );
  }

  return (
    <section id="package-details" ref={detailsRef} className="mx-auto mt-16 max-w-4xl rounded-3xl bg-background/60 px-4 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold">{pkg.name}</h1>
        {pkg.tagline && <p className="mt-2 text-muted-foreground">{pkg.tagline}</p>}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="inline-flex items-center gap-2"><strong>Region:</strong> {pkg.region}</span>
          <span className="inline-flex items-center gap-2"><strong>Duration:</strong> {pkg.duration}</span>
          <span className="inline-flex items-center gap-2"><strong>Difficulty:</strong> {pkg.difficulty}</span>
          <span className="inline-flex items-center gap-2"><strong>From:</strong> ${pkg.priceFrom}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${contactEmail}?subject=Booking%20Enquiry%20for%20${encodeURIComponent(pkg.name)}&body=Hello%20Nomads%20Navigate%20Nepal%2C%0A%0AI%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package.%20Please%20send%20me%20pricing%20and%20availability.%0A%0AThank%20you.`}
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
            WhatsApp enquiry
          </a>
        </div>
      </header>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 prose prose-invert">
          <div className="rounded-3xl border border-white/10 bg-muted p-6">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-4 text-muted-foreground">{pkg.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-background p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Altitude</p>
                <p className="mt-2 text-lg font-semibold">{pkg.altitude}</p>
              </div>
              <div className="rounded-2xl bg-background p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Best season</p>
                <p className="mt-2 text-lg font-semibold">{pkg.bestSeason}</p>
              </div>
              <div className="rounded-2xl bg-background p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Price from</p>
                <p className="mt-2 text-lg font-semibold">${pkg.priceFrom} USD</p>
              </div>
              <div className="rounded-2xl bg-background p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Group size</p>
                <p className="mt-2 text-lg font-semibold">1–12 people</p>
              </div>
            </div>
          </div>

          {pkg.itinerary ? (
            <>
              <h2 className="mt-8 text-2xl font-semibold">Detailed Itinerary</h2>
              <div className="mt-4 rounded-3xl border border-white/10 bg-muted p-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{pkg.itinerary}</ReactMarkdown>
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-3xl border border-white/10 bg-muted p-6">
              <h2 className="text-2xl font-semibold">Detailed itinerary</h2>
              <p className="mt-4 text-muted-foreground">A full day-by-day itinerary for this package is coming soon. In the meantime, email or WhatsApp us for the latest schedule and pricing.</p>
            </div>
          )}
        </div>

        <aside className="md:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-white/10 bg-muted p-6">
            <h3 className="text-lg font-semibold">Price & booking</h3>
            <p className="mt-3 text-sm text-muted-foreground">Starting price is per person in USD and includes core trek services.</p>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold text-foreground">Included</p>
                <ul className="mt-2 list-inside list-disc">
                  <li>Permits & park fees</li>
                  <li>Accommodation during the trek</li>
                  <li>Local guide and support staff</li>
                  <li>All meals on trek days</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground">Not included</p>
                <ul className="mt-2 list-inside list-disc">
                  <li>International flights</li>
                  <li>Personal travel insurance</li>
                  <li>Private gear rental</li>
                  <li>Optional sightseeing in Kathmandu</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <a
                href={`mailto:${contactEmail}?subject=Booking%20Enquiry%20for%20${encodeURIComponent(pkg.name)}&body=Hello%20Nomads%20Navigate%20Nepal%2C%0A%0AI%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package.%20Please%20send%20me%20pricing%20and%20availability.%0A%0AThank%20you.`}
                className="block rounded-full bg-gradient-sunset px-4 py-3 text-center text-sm font-semibold text-white shadow-glow hover:opacity-95"
              >
                Email enquiry
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-full border border-white/20 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-white/10"
              >
                WhatsApp booking
              </a>
            </div>
          </div>
        </aside>
      </section>

      <div className="mt-12">
        <Link to="/packages" className="text-accent">← Back to all trekking packages</Link>
      </div>
    </section>
  );
}
