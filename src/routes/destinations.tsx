import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations, type Difficulty, type Region } from "@/services/mockData";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — Nomads Navigate Nepal" },
      { name: "description", content: "Explore Nepal's most iconic regions — Everest, Annapurna, Langtang, Kathmandu Valley, Pokhara and the lowlands of Chitwan." },
      { property: "og:title", content: "Destinations — Nomads Navigate Nepal" },
      { property: "og:description", content: "Six signature Himalayan regions. Find the one that calls you." },
    ],
  }),
  component: DestinationsPage,
});

const regions: ("All" | Region)[] = ["All", "Everest", "Annapurna", "Langtang", "Kathmandu Valley", "Pokhara", "Lowlands"];
const difficulties: ("All" | Difficulty)[] = ["All", "Easy", "Moderate", "Challenging", "Strenuous"];

function DestinationsPage() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>("All");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.tagline.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q);
      const matchesR = region === "All" || d.region === region;
      const matchesD = difficulty === "All" || d.difficulty === difficulty;
      return matchesQ && matchesR && matchesD;
    });
  }, [query, region, difficulty]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15" />
        <div className="relative mx-auto max-w-7xl px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-medium text-accent uppercase tracking-wider">Destinations</p>
            <h1 className="mt-2 text-5xl md:text-6xl font-semibold tracking-tight">
              Pick your <span className="text-gradient-sunset">horizon.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              From high-altitude classics to jungle plains — six regions, every kind of traveller.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-10 glass rounded-2xl p-3 flex flex-col lg:flex-row gap-3"
          >
            <div className="flex items-center gap-2 flex-1 rounded-xl bg-background/50 px-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Everest, Pokhara, jungle…"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>

            <Select value={region} onChange={setRegion} options={regions} label="Region" />
            <Select value={difficulty} onChange={setDifficulty} options={difficulties} label="Difficulty" />

            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-sunset px-5 py-3 text-sm font-semibold text-white shadow-soft hover:shadow-glow transition">
              <SlidersHorizontal className="h-4 w-4" />
              Refine
            </button>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span> destinations found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center">
            <p className="text-lg font-semibold">No matches</p>
            <p className="mt-2 text-sm text-muted-foreground">Try widening your filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d, i) => (
              <DestinationCard key={d.id} d={d} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function Select<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: readonly T[];
  label: string;
}) {
  return (
    <label className="relative flex items-center gap-2 rounded-xl bg-background/50 px-4 min-w-[170px]">
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full bg-transparent py-3 text-sm font-medium outline-none cursor-pointer appearance-none pr-2"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-background text-foreground">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}