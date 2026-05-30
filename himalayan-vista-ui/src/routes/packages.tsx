import { createFileRoute } from "@tanstack/react-router";
import { destinations } from "@/services/mockData";
import React from "react";
import ReactMarkdown from "react-markdown";

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
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">Trekking</p>
          <h1 className="mt-1 text-4xl font-semibold">Trekking Packages</h1>
          <p className="mt-2 text-muted-foreground">Hand-crafted trekking itineraries across Nepal — click a trek to view full details.</p>
        </div>
      </div>

      <div className="space-y-12">
        {destinations.map((d) => (
          <article key={d.id} className="glass rounded-2xl p-6">
            <header>
              <h2 className="text-2xl font-semibold">{d.title}</h2>
              {d.tagline && <p className="mt-1 text-muted-foreground">{d.tagline}</p>}
              <p className="mt-2 text-sm text-muted-foreground">{d.region} · {d.duration || "—"} · {d.difficulty || "—"}</p>
            </header>

            <section className="mt-6 prose prose-invert">
              {d.itinerary ? (
                <ReactMarkdown>{d.itinerary}</ReactMarkdown>
              ) : (
                <p className="text-muted-foreground">No itinerary available for this package.</p>
              )}
            </section>

            <div className="mt-6">
              <a className="text-accent" href={`#/packages/${d.slug}`}>View condensed card / booking →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
