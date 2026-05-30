import { createFileRoute } from "@tanstack/react-router";
import { destinations } from "@/services/mockData";
import { DestinationCard } from "@/components/DestinationCard";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((d, i) => (
          <div key={d.id}>
            <a href={`/packages/${d.slug}`}>
              <DestinationCard d={d} index={i} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
