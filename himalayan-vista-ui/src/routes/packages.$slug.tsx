import { createFileRoute } from "@tanstack/react-router";
import { useParams, Link } from "@tanstack/react-router";
import { destinations } from "@/services/mockData";
import React from "react";
import ReactMarkdown from "react-markdown";

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
  const params = useParams();
  const slug = (params as any).slug as string | undefined;
  const pkg = destinations.find((d) => d.slug === slug);

  if (!pkg) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-2xl font-semibold">Package not found</h2>
        <p className="mt-4">We couldn't locate that trek. <Link to="/packages" className="text-accent">Back to packages</Link>.</p>
      </section>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-20">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold">{pkg.name}</h1>
        {pkg.tagline && <p className="mt-2 text-muted-foreground">{pkg.tagline}</p>}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span className="inline-flex items-center gap-2"><strong>Region:</strong> {pkg.region}</span>
          <span className="inline-flex items-center gap-2"><strong>Duration:</strong> {pkg.duration}</span>
          <span className="inline-flex items-center gap-2"><strong>Difficulty:</strong> {pkg.difficulty}</span>
          <span className="inline-flex items-center gap-2"><strong>From:</strong> ${pkg.priceFrom}</span>
        </div>
      </header>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 prose prose-invert">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-muted-foreground">{pkg.description}</p>

          {pkg.itinerary ? (
            <>
              <h2 className="mt-8 text-2xl font-semibold">Detailed Itinerary</h2>
              <div className="mt-4">
                <ReactMarkdown>{pkg.itinerary}</ReactMarkdown>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">No itinerary available for this package.</p>
          )}
        </div>

        <aside className="md:col-span-1">
          <div className="sticky top-24 rounded-2xl bg-muted p-4">
            <h3 className="text-lg font-semibold">Trip Highlights</h3>
            <ul className="mt-3 list-inside list-disc text-sm text-muted-foreground">
              <li>Locally guided departures</li>
              <li>All permits & internal flights included (where applicable)</li>
              <li>Tea-house lodging & meals on trek</li>
              <li>Technical support for climbing itineraries</li>
            </ul>
            <div className="mt-6">
              <a href="#contact" className="block rounded-md bg-gradient-sunset px-4 py-2 text-center text-sm font-semibold text-white">Enquire / Book</a>
            </div>
          </div>
        </aside>
      </section>

      <div className="mt-12">
        <Link to="/packages" className="text-accent">← Back to all trekking packages</Link>
      </div>
    </main>
  );
}
