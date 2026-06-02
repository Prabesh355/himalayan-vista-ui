import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Clock, MapPin, Star, TrendingUp } from "lucide-react";

type DestinationCardData = {
  slug: string;
  name: string;
  image: string;
  tagline?: string;
  region?: string;
  destination?: string;
  duration?: string;
  difficulty?: string;
  price?: number;
  priceFrom?: number;
  rating?: number;
  tags?: string[];
};

const difficultyColor: Record<string, string> = {
  Easy: "text-emerald-400",
  Moderate: "text-sky-400",
  Challenging: "text-amber-400",
  Strenuous: "text-rose-400",
};

export function DestinationCard({ d, index = 0 }: { d: DestinationCardData; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-3xl glass shadow-soft transition-all hover:shadow-elegant hover:-translate-y-1"
    >
      <Link to="/packages/$slug" params={{ slug: d.slug }} className="block" aria-label={d.name}>
        <div className="relative aspect-[4/5] overflow-hidden">
          <img
            src={d.image}
            alt={d.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
            {(d.tags ?? []).slice(0, 2).map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white border border-white/20"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white border border-white/20">
            <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
            {d.rating ?? 0}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <div className="flex items-center gap-1.5 text-xs text-white/80">
              <MapPin className="h-3.5 w-3.5" />
              {d.region ?? d.destination ?? "Unknown"}
            </div>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">{d.name}</h3>
            <p className="mt-1 text-sm text-white/80 line-clamp-2">{d.tagline}</p>

            {/* Intentionally hide itinerary snippet on flashcards; full details shown on Trekking detail pages */}

            <div className="mt-4 flex items-center justify-between gap-2 text-xs text-white/85">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {d.duration}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 ${difficultyColor[d.difficulty ?? "Moderate"]}`}
              >
                <TrendingUp className="h-3.5 w-3.5" /> {d.difficulty ?? "Moderate"}
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5">
                from{" "}
                <span className="font-semibold text-white">${d.priceFrom ?? d.price ?? 0}</span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
// No inline itinerary snippet here — cards are concise and link to full package pages.
