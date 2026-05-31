import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { destinations } from "@/services/mockData";
import { motion } from "framer-motion";
import { type ComponentType, useEffect, useMemo, useRef } from "react";
import {
  Check,
  CirclePlus,
  Minus,
  ShieldCheck,
  Sparkles,
  Clock3,
  MapPin,
  BedDouble,
  BusFront,
  Ticket,
  Users,
  UtensilsCrossed,
  Plane,
  BadgeCheck,
} from "lucide-react";

type ItineraryDay = {
  day: number;
  title: string;
  detail: string;
};

type PriceItem = {
  label: string;
  detail: string;
  icon: ComponentType<{ className?: string }>;
};

type ParsedItinerary = {
  summary: string;
  highlights: string[];
  days: ItineraryDay[];
};

const includedCosts: PriceItem[] = [
  { label: "Accommodation", detail: "Tea houses and selected hotels", icon: BedDouble },
  { label: "Transportation", detail: "Kathmandu → Pokhara and local transfers", icon: BusFront },
  { label: "Permits", detail: "ACAP Permit and TIMS Card", icon: Ticket },
  { label: "Guide Services", detail: "Licensed guide and porter support", icon: Users },
  { label: "Meals", detail: "Breakfast, lunch, and dinner on trek days", icon: UtensilsCrossed },
];

const excludedCosts: PriceItem[] = [
  { label: "International flights", detail: "Flights to and from Nepal", icon: Plane },
  { label: "Travel insurance", detail: "Mandatory high-altitude coverage", icon: ShieldCheck },
  { label: "Personal expenses", detail: "Drinks, tips, laundry, and snacks", icon: Minus },
  { label: "Gear rental", detail: "Optional technical equipment hire", icon: BadgeCheck },
];

const optionalAddOns: PriceItem[] = [
  { label: "Private transfers", detail: "Door-to-door premium vehicle service", icon: CirclePlus },
  { label: "Extra hotel nights", detail: "Before or after the trek in Kathmandu", icon: Sparkles },
  { label: "Equipment rental", detail: "Sleeping bags, poles, jackets, and boots", icon: CirclePlus },
  { label: "Helicopter return", detail: "Fast-track exit for selected routes", icon: CirclePlus },
];

function extractItinerary(markdown: string): ParsedItinerary {
  const lines = markdown.split(/\r?\n/).map((line) => line.trim());
  const summaryParts: string[] = [];
  const highlights: string[] = [];
  const days: ItineraryDay[] = [];
  let hasSeenDays = false;

  for (const line of lines) {
    if (!line || line === "---" || line.startsWith("#")) continue;

    if (/^\*\*Trip notes:\*\*/i.test(line) || /^\*\*Notes:\*\*/i.test(line)) {
      continue;
    }

    const highlightMatch = line.match(/^\*\*Highlights:\*\*\s*(.+)$/i);
    if (highlightMatch) {
      highlights.push(
        ...highlightMatch[1]
          .split(/[,•|]/)
          .map((item) => item.trim())
          .filter(Boolean),
      );
      continue;
    }

    const lineStep = line.match(/^(?:[-*]\s+|\d+\.\s+)?\*\*?Day\s*(\d+)\s*[—–-]\s*(.+?)\*\*?:\s*(.+)$/i);
    const bulletDay = line.match(/^[-*]\s+Day\s*(\d+)\s*[—–-]\s*(.+?):\s*(.+)$/i);
    const mdStep = line.match(/^\d+\.\s+\*\*Day\s*(\d+)\s*[—–-]\s*(.+?)\*\*:\s*(.+)$/i);
    const plainDay = line.match(/^Day\s*(\d+)\s*[—–-]\s*(.+?)\s*[—–-]\s*(.+)$/i);

    const match = lineStep ?? bulletDay ?? mdStep ?? plainDay;
    if (match) {
      hasSeenDays = true;
      days.push({
        day: Number(match[1]),
        title: match[2].replace(/\s*\(.*?\)\s*$/, "").trim(),
        detail: match[3].trim(),
      });
      continue;
    }

    if (!hasSeenDays) {
      summaryParts.push(line.replace(/^[-*]\s+/, ""));
    }
  }

  return {
    summary: summaryParts.join(" ").replace(/\s+/g, " ").trim(),
    highlights,
    days: days.sort((a, b) => a.day - b.day),
  };
}

function CostCard({ title, items, accent, icon: Icon }: { title: string; items: PriceItem[]; accent: string; icon: ComponentType<{ className?: string }> }) {
  return (
    <motion.section
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl border border-border/70 bg-card p-5 shadow-soft backdrop-blur-xl"
    >
      <div className="flex items-center gap-3">
        <div className={`grid h-11 w-11 place-items-center rounded-2xl ${accent}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Premium travel summary</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => {
          const ItemIcon = item.icon;

          return (
            <div key={item.label} className="flex gap-3 rounded-2xl border border-border/60 bg-background px-4 py-3 transition-colors hover:border-accent/40 hover:bg-secondary/10">
              <div className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${accent}`}>
                <ItemIcon className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}

function PriceSummary({ price }: { price: number }) {
  return (
    <motion.section
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-primary via-primary to-foreground p-6 text-white shadow-elegant"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/65">Package Price</p>
          <p className="mt-2 text-4xl font-semibold">${price}</p>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
          <Ticket className="h-7 w-7 text-secondary" />
        </div>
      </div>

      <div className="mt-6 grid gap-2 text-sm text-white/90 sm:grid-cols-2">
        {[
          "Accommodation",
          "Transportation",
          "Permits",
          "Guide",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 rounded-2xl bg-white/8 px-4 py-3 backdrop-blur-md">
            <Check className="h-4 w-4 text-secondary" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

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
  const itinerary = useMemo(() => (pkg?.itinerary ? extractItinerary(pkg.itinerary) : null), [pkg]);
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

      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">{pkg.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Altitude", value: pkg.altitude },
                { label: "Best season", value: pkg.bestSeason },
                { label: "Duration", value: pkg.duration },
                { label: "Group size", value: "1–12 people" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-border/60 bg-background p-4">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">{item.label}</p>
                  <p className="mt-2 text-base font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {itinerary ? (
            <section className="rounded-[2rem] border border-border/70 bg-gradient-to-b from-card to-muted/30 p-6 shadow-elegant">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent">Journey plan</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Detailed Itinerary</h2>
                </div>
                <div className="rounded-full border border-accent/20 bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground">
                  {itinerary.days.length}+ days · scroll through the route
                </div>
              </div>

              {itinerary.summary && (
                <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground md:text-base">{itinerary.summary}</p>
              )}

              {itinerary.highlights.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Trip highlights</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {itinerary.highlights.map((item) => (
                      <span key={item} className="inline-flex items-center rounded-full border border-accent/20 bg-secondary/10 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="relative mt-8 pl-3 sm:pl-6">
                <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-accent via-border to-transparent sm:left-6" />
                <div className="space-y-5">
                  {itinerary.days.map((day, index) => (
                    <motion.article
                      key={`${day.day}-${day.title}`}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.35, delay: index * 0.03 }}
                      whileHover={{ y: -3 }}
                      className="relative rounded-[1.75rem] border border-border/70 bg-background/95 p-5 pl-5 shadow-soft backdrop-blur-md sm:p-6 sm:pl-6"
                    >
                      <span className="absolute -left-1 top-6 grid h-8 w-8 place-items-center rounded-full border-4 border-background bg-gradient-sunset text-xs font-bold text-white shadow-glow sm:-left-2 sm:h-10 sm:w-10">
                        {day.day}
                      </span>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Day {day.day}</p>
                          <h3 className="mt-1 text-lg font-semibold text-foreground md:text-xl">{day.title}</h3>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-medium text-foreground">
                          <Clock3 className="h-3.5 w-3.5 text-accent" />
                          <span>Structured trek day</span>
                        </div>
                      </div>

                      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-[15px]">{day.detail}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <PriceSummary price={pkg.priceFrom} />
          <CostCard title="Included Costs" items={includedCosts} accent="bg-gradient-sunset" icon={Check} />
          <CostCard title="Excluded Costs" items={excludedCosts} accent="bg-gradient-to-br from-rose-500 to-red-700" icon={Minus} />
          <CostCard title="Optional Add-ons" items={optionalAddOns} accent="bg-gradient-to-br from-primary to-accent" icon={CirclePlus} />

          <div className="rounded-[2rem] border border-white/10 bg-muted/70 p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-foreground">Plan your booking</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Need a custom route, private departure, or luxury upgrade? We can tailor the package to your dates and comfort level.</p>
            <div className="mt-6 grid gap-3">
              <a
                href={`mailto:${contactEmail}?subject=Booking%20Enquiry%20for%20${encodeURIComponent(pkg.name)}&body=Hello%20Nomads%20Navigate%20Nepal%2C%0A%0AI%20am%20interested%20in%20the%20${encodeURIComponent(pkg.name)}%20package.%20Please%20send%20me%20pricing%20and%20availability.%0A%0AThank%20you.`}
                className="inline-flex items-center justify-center rounded-full bg-gradient-sunset px-4 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-95"
              >
                Email enquiry
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground hover:bg-secondary/10"
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
