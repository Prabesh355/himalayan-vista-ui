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
    <article className="mx-auto max-w-4xl px-4 py-20 prose prose-invert">
      <header>
        <h1 className="text-4xl font-semibold">{pkg.title}</h1>
        <p className="text-muted-foreground">{pkg.tagline || pkg.region}</p>
      </header>

      <section className="mt-8">
        {pkg.itinerary ? (
          <div>
            <h2 className="text-2xl font-semibold">Itinerary</h2>
            <div className="mt-4">
              <ReactMarkdown>{pkg.itinerary}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">No itinerary available for this package.</p>
        )}
      </section>

      <div className="mt-12">
        <Link to="/packages" className="text-accent">← Back to all trekking packages</Link>
      </div>
    </article>
  );
}
