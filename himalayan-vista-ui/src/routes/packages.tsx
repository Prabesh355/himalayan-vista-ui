import { createFileRoute } from "@tanstack/react-router";
import { destinations } from "@/services/mockData";
import React from "react";
import { Link } from "@tanstack/react-router";

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
      <div className="space-y-10">
        {destinations.map((d) => (
          <article key={d.id} className="glass rounded-2xl p-6">
            <div className="md:flex md:items-start md:gap-6">
              <div className="md:flex-shrink-0 md:w-44">
                <img src={d.image} alt={d.name} className="w-full h-32 object-cover rounded-lg" />
              </div>

              <div className="mt-4 md:mt-0">
                <h2 className="text-2xl font-semibold">{d.name}</h2>
                {d.tagline && <p className="mt-1 text-muted-foreground">{d.tagline}</p>}

                <p className="mt-3 text-sm text-muted-foreground max-w-3xl">{d.description}</p>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>{d.region}</span>
                  <span>·</span>
                  <span>{d.duration}</span>
                  <span>·</span>
                  <span className="capitalize">{d.difficulty}</span>
                  <span>·</span>
                  <span>from <strong>${d.priceFrom}</strong></span>
                </div>

                <div className="mt-4">
                  <Link to={`/packages/${d.slug}`} className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-4 py-2 text-sm font-semibold text-white">
                    View More
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
