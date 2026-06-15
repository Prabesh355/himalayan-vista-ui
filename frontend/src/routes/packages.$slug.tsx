import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { type ComponentType, useEffect, useMemo, useRef } from "react";
import {
  BadgeCheck,
  BedDouble,
  BusFront,
  Check,
  CirclePlus,
  Clock3,
  Minus,
  Plane,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import { ReviewsSection, type Review as ReviewCard } from "@/components/ReviewsSection";
import { useCurrency } from "@/context/CurrencyProvider";
import api from "@/services/api";

type ItineraryDay = {
  day: number;
  title: string;
  detail: string;
  meta: string[];
  highlights: string[];
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

type DayDraft = {
  day: number;
  title: string;
  detailParts: string[];
  meta: string[];
  highlights: string[];
  activeSection: string | null;
};

type ReviewApiItem = {
  _id: string;
  title?: string;
  comment?: string;
  rating?: number;
  verifiedPurchase?: boolean;
  createdAt?: string;
  user?:
    | {
        firstName?: string;
        lastName?: string;
        email?: string;
      }
    | string;
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
  {
    label: "Equipment rental",
    detail: "Sleeping bags, poles, jackets, and boots",
    icon: CirclePlus,
  },
  { label: "Helicopter return", detail: "Fast-track exit for selected routes", icon: CirclePlus },
];

function extractItinerary(markdown: string): ParsedItinerary {
  const lines = markdown.split(/\r?\n/).map((line) => line.trim());
  const summaryParts: string[] = [];
  const highlights: string[] = [];
  const days: DayDraft[] = [];
  let currentDay: DayDraft | null = null;
  let hasSeenDays = false;
  let ignoreRemaining = false;

  const pushDay = () => {
    if (!currentDay) return;
    days.push(currentDay);
    currentDay = null;
  };

  const startDay = (day: number, title: string) => {
    pushDay();
    currentDay = {
      day,
      title,
      detailParts: [],
      meta: [],
      highlights: [],
      activeSection: null,
    };
    hasSeenDays = true;
  };

  const clean = (value: string) =>
    value
      .replace(/^[-*•]\s+/, "")
      .replace(/^\*+/, "")
      .replace(/\*+$/, "")
      .replace(/\s+/g, " ")
      .trim();

  const addToCurrent = (day: DayDraft, value: string) => {
    const cleaned = clean(value);
    if (!cleaned) return;

    if (day.activeSection === "highlights") {
      day.highlights.push(cleaned);
      return;
    }

    if (day.activeSection === "activities") {
      day.meta.push(cleaned);
      return;
    }

    if (day.activeSection === "optional hikes") {
      day.meta.push(`Optional: ${cleaned}`);
      return;
    }

    day.detailParts.push(cleaned);
  };

  const sectionHeader = (line: string) => {
    const match = line.match(
      /^(?:#{1,3}\s*|\*\*)?(Accommodation|Duration|Highlights|Activities|Optional hikes|Best time to trek|Why Choose This Trek\?|Trek Overview|Trip Highlights|Detailed Day-by-Day Itinerary|Detailed Itinerary|Trek Duration|Maximum Elevation|Trek Difficulty|Starting Point|Ending Point)\b\*?\s*:?\s*(.*)$/i,
    );
    if (!match) return null;

    return {
      label: match[1].toLowerCase(),
      value: clean(match[2]),
    };
  };

  for (const line of lines) {
    if (ignoreRemaining) {
      continue;
    }

    if (!line || line === "---") {
      if (currentDay) {
        const activeDay = currentDay as DayDraft;
        activeDay.activeSection = null;
      }
      continue;
    }

    // Ignore includes/excludes and other general trailing sections
    if (
      hasSeenDays &&
      (line.match(/^(?:#{1,3}\s*|\*\*)?(Cost Includes|Cost Excludes|Package Cost|Why Choose|Why Tsho Rolpa|Recommended Selling Price)\b/i) ||
       line.startsWith("✅") ||
       line.startsWith("❌"))
    ) {
      ignoreRemaining = true;
      continue;
    }

    const dayNumberMatch = line.match(/Day\s*(\d+)/i);
    if (dayNumberMatch) {
      const dayNum = Number(dayNumberMatch[1]);
      const afterDayIndex = line.search(/Day\s*\d+/i);
      const dashIndex = Math.max(
        line.indexOf("—", afterDayIndex),
        line.indexOf("–", afterDayIndex),
        line.indexOf("-", afterDayIndex),
      );

      let title = "";
      let detailPart = "";

      if (dashIndex > -1) {
        const colonIndex = line.indexOf(":", dashIndex + 1);
        if (colonIndex > -1) {
          title = clean(line.slice(dashIndex + 1, colonIndex));
          detailPart = line.slice(colonIndex + 1);
        } else {
          title = clean(line.slice(dashIndex + 1));
        }
      } else {
        const after = line.slice(afterDayIndex + dayNumberMatch[0].length).trim();
        const colonIndex = after.indexOf(":");
        if (colonIndex > -1) {
          title = clean(after.slice(0, colonIndex));
          detailPart = after.slice(colonIndex + 1);
        } else {
          title = clean(after);
        }
      }

      startDay(dayNum, title || `Day ${dayNum}`);
      if (detailPart && currentDay) addToCurrent(currentDay, detailPart);
      continue;
    }

    if (line.startsWith("#") && !currentDay) {
      const title = clean(line.replace(/^#+\s*/, ""));
      if (title && summaryParts.length === 0) summaryParts.push(title);
      continue;
    }

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

    const section = sectionHeader(line);
    if (section && currentDay) {
      const activeDay = currentDay as DayDraft;
      activeDay.activeSection = section.label;

      if (section.value) {
        if (section.label === "highlights") {
          section.value
            .split(/[,•|]/)
            .map((item) => clean(item))
            .filter(Boolean)
            .forEach((item) => activeDay.highlights.push(item));
        } else if (section.label === "activities") {
          activeDay.meta.push(section.value);
        } else if (section.label === "duration") {
          activeDay.meta.push(`Duration: ${section.value}`);
        } else if (section.label === "accommodation") {
          activeDay.meta.push(`Accommodation: ${section.value}`);
        } else if (
          section.label === "starting point" ||
          section.label === "ending point" ||
          section.label === "trek duration" ||
          section.label === "maximum elevation" ||
          section.label === "trek difficulty"
        ) {
          activeDay.meta.push(
            `${section.label.replace(/\b\w/g, (ch) => ch.toUpperCase())}: ${section.value}`,
          );
        } else {
          activeDay.detailParts.push(section.value);
        }
      }

      continue;
    }

    const numberedDay = line.match(
      /^\d+\.\s+(?:\*\*)?Day\s*(\d+)\s*[—–-]\s*(.+?)(?:\*\*)?[:\-]?(?:\s*(.+))?$/i,
    );
    if (numberedDay) {
      startDay(Number(numberedDay[1]), clean(numberedDay[2]));
      if (numberedDay[3] && currentDay) addToCurrent(currentDay, numberedDay[3]);
      continue;
    }

    const bulletDay = line.match(
      /^[-*]\s+(?:\*\*)?Day\s*(\d+)\s*[—–-]\s*(.+?)(?:\*\*)?[:\-]?(?:\s*(.+))?$/i,
    );
    if (bulletDay) {
      startDay(Number(bulletDay[1]), clean(bulletDay[2]));
      if (bulletDay[3] && currentDay) addToCurrent(currentDay, bulletDay[3]);
      continue;
    }

    if (line.startsWith("|") && line.endsWith("|")) {
      continue;
    }

    if (currentDay) {
      const activeDay = currentDay as DayDraft;

      if (/^\*\*Highlights:\*\*/i.test(line)) {
        activeDay.activeSection = "highlights";
        continue;
      }

      if (/^\*\*Activities:\*\*/i.test(line)) {
        activeDay.activeSection = "activities";
        continue;
      }

      if (/^\*\*(Accommodation|Duration)\:/i.test(line)) {
        const compact = clean(line.replace(/^\*\*/, "").replace(/\*\*$/, ""));
        activeDay.meta.push(compact);
        continue;
      }

      if (/^[-*•]\s+/.test(line)) {
        addToCurrent(activeDay, line);
        continue;
      }

      addToCurrent(activeDay, line);
      continue;
    }

    if (!hasSeenDays) {
      summaryParts.push(clean(line));
    }
  }

  pushDay();

  return {
    summary: summaryParts.join(" ").replace(/\s+/g, " ").trim(),
    highlights,
    days: days
      .sort((a, b) => a.day - b.day)
      .map((day) => ({
        day: day.day,
        title: day.title,
        detail: day.detailParts.join(" ").replace(/\s+/g, " ").trim(),
        meta: Array.from(new Set(day.meta)).filter(Boolean),
        highlights: Array.from(new Set(day.highlights)).filter(Boolean),
      })),
  };
}

function CostCard({
  title,
  items,
  accent,
  icon: Icon,
}: {
  title: string;
  items: PriceItem[];
  accent: string;
  icon: ComponentType<{ className?: string }>;
}) {
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
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            Premium travel summary
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => {
          const ItemIcon = item.icon;

          return (
            <div
              key={item.label}
              className="flex gap-3 rounded-2xl border border-border/60 bg-background px-4 py-3 transition-colors hover:border-accent/40 hover:bg-secondary/10"
            >
              <div
                className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${accent}`}
              >
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
  const { formatPrice } = useCurrency();

  return (
    <motion.section
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-primary via-primary to-foreground p-6 text-white shadow-elegant"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/65">Package Price</p>
          <p className="mt-2 text-4xl font-semibold">{formatPrice(price)}</p>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
          <Ticket className="h-7 w-7 text-secondary" />
        </div>
      </div>

      <div className="mt-6 grid gap-2 text-sm text-white/90 sm:grid-cols-2">
        {["Accommodation", "Transportation", "Permits", "Guide"].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-2xl bg-white/8 px-4 py-3 backdrop-blur-md"
          >
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
  const { formatPrice } = useCurrency();
  const { slug } = Route.useParams();
  const detailsRef = useRef<HTMLElement | null>(null);
  const itineraryRef = useRef<HTMLElement | null>(null);

  const packageQuery = useQuery({
    queryKey: ["package", slug],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; data: any }>(`/packages/slug/${slug}`);
      return res.data;
    },
  });

  const pkg = packageQuery.data?.data;

  const itinerary = useMemo(() => (pkg?.itinerary ? extractItinerary(pkg.itinerary) : null), [pkg]);

  const reviewsQuery = useQuery({
    queryKey: ["package-reviews", slug],
    queryFn: async () =>
      (await api.get<{ success: boolean; data: ReviewApiItem[] }>(`/reviews/package-slug/${slug}`))
        .data,
    enabled: !!pkg,
  });

  const contactEmail = "nomadsnavigatenepal5@gmail.com";
  const whatsappNumber = "+9779769364689";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20Nomads%20Navigate%20Nepal%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg?.title || "trek")}%20package.`;

  const reviewCards: ReviewCard[] = useMemo(() => {
    const items = reviewsQuery.data?.data || [];

    return items.map((review, index) => {
      const author =
        typeof review.user === "string"
          ? review.user
          : [review.user?.firstName, review.user?.lastName].filter(Boolean).join(" ").trim() ||
            review.user?.email ||
            "Guest Traveler";

      return {
        id: review._id || String(index),
        author,
        rating: review.rating || 0,
        date: review.createdAt
          ? new Date(review.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "Recently",
        title: review.title || `Rated ${review.rating || 0}/5`,
        content: review.comment || "",
        verified: Boolean(review.verifiedPurchase),
      };
    });
  }, [reviewsQuery.data?.data]);

  const averageRating = useMemo(() => {
    if (!reviewCards.length) return 0;
    const total = reviewCards.reduce((sum, review) => sum + review.rating, 0);
    return total / reviewCards.length;
  }, [reviewCards]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const target =
        typeof window !== "undefined" && window.location.hash === "#itinerary"
          ? itineraryRef.current
          : detailsRef.current;
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, [slug, pkg]);

  if (!pkg) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-2xl font-semibold">Package not found</h2>
        <p className="mt-4">
          We couldn&apos;t locate that trek.{" "}
          <Link to="/packages" className="text-accent">
            Back to packages
          </Link>
          .
        </p>
      </section>
    );
  }

  return (
    <section
      id="package-details"
      ref={detailsRef}
      className="mx-auto mt-16 max-w-3xl rounded-3xl bg-background/60 px-4 py-12"
    >
      {/* Mobile Floating Back Button */}
      <Link
        to="/packages"
        className="fixed top-24 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 shadow-elegant backdrop-blur-md text-white hover:bg-black/80 lg:hidden"
        aria-label="Back to packages"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </Link>

      <header className="mb-8">
        <div className="hidden lg:block mb-4">
          <Link to="/packages" className="text-sm text-accent hover:underline flex items-center gap-1">
            ← Back to all trekking packages
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{pkg.title}</h1>
        {pkg.tagline && <p className="mt-2 text-muted-foreground">{pkg.tagline}</p>}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <strong>Region:</strong> <span className="text-foreground">{pkg.destination}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <strong>Duration:</strong> <span className="text-foreground">{pkg.duration?.days || 0} Days</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <strong>Difficulty:</strong> <span className="text-foreground">{pkg.difficulty || "Moderate"}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <strong>Price:</strong> <span className="text-accent font-semibold">{formatPrice(pkg.price)}</span>
          </span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${contactEmail}?subject=Booking%20Enquiry%20for%20${encodeURIComponent(pkg.title)}&body=Hello%20Nomads%20Navigate%20Nepal%2C%0A%0AI%20am%20interested%20in%20the%20${encodeURIComponent(pkg.title)}%20package.%20Please%20send%20me%20pricing%20and%20availability.%0A%0AThank%20you.`}
            className="inline-flex items-center rounded-full bg-gradient-sunset px-5 py-3 text-sm font-semibold text-white shadow-glow hover:opacity-95 transition"
          >
            Email enquiry
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            WhatsApp enquiry
          </a>
        </div>
      </header>

      <div className="space-y-8">
        {itinerary ? (
          <section
            id="itinerary"
            ref={itineraryRef}
            className="scroll-mt-28 rounded-[2rem] border border-border/70 bg-gradient-to-b from-card to-muted/30 p-6 shadow-elegant"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-accent">
                  Journey plan
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                  Detailed Itinerary
                </h2>
              </div>
              <div className="rounded-full border border-accent/20 bg-secondary/10 px-4 py-2 text-sm font-medium text-foreground w-fit">
                {itinerary.days.length}+ days · scroll through the route
              </div>
            </div>

            {itinerary.summary && (
              <p className="mt-5 max-w-4xl text-sm leading-7 text-muted-foreground md:text-base">
                {itinerary.summary}
              </p>
            )}

            {itinerary.highlights.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Trip highlights
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {itinerary.highlights.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-accent/20 bg-secondary/10 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
                    >
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
                        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                          Day {day.day}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-foreground md:text-xl">
                          {day.title}
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-medium text-foreground">
                        <Clock3 className="h-3.5 w-3.5 text-accent" />
                        <span>Structured trek day</span>
                      </div>
                    </div>

                    {(day.meta.length > 0 || day.highlights.length > 0) && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {day.meta.slice(0, 4).map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center rounded-full border border-border/70 bg-secondary/10 px-3 py-1 text-[11px] font-medium text-foreground"
                          >
                            {item}
                          </span>
                        ))}
                        {day.highlights.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[11px] font-medium text-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-[15px]">
                      {day.detail}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="rounded-[2rem] border border-border/70 bg-card p-6 text-center text-muted-foreground">
            No itinerary details available for this package.
          </div>
        )}
      </div>

      <div className="mt-12 text-center lg:text-left">
        <Link to="/packages" className="text-accent hover:underline inline-flex items-center gap-1">
          ← Back to all trekking packages
        </Link>
      </div>

      {/* Floating Thumb-Friendly Action Dock for Mobile */}
      <div className="h-28 lg:hidden" />
      <div className="fixed bottom-6 left-4 right-4 z-50 rounded-2xl border border-white/10 bg-background/80 px-4 py-3.5 shadow-elegant backdrop-blur-xl max-w-md mx-auto lg:hidden">
        <div className="flex gap-3">
          <a
            href={`mailto:${contactEmail}?subject=Booking%20Enquiry%20for%20${encodeURIComponent(pkg.title)}&body=Hello%20Nomads%20Navigate%20Nepal%2C%0A%0AI%20am%20interested%20in%20the%20${encodeURIComponent(pkg.title)}%20package.%20Please%20send%20me%20pricing%20and%20availability.%0A%0AThank%20you.`}
            className="flex-1 rounded-full bg-gradient-sunset px-4 py-3.5 text-center text-sm font-semibold text-white shadow-glow hover:opacity-95 transition"
          >
            Email Enquiry
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3.5 text-center text-sm font-semibold text-white hover:bg-white/20 transition"
          >
            WhatsApp Booking
          </a>
        </div>
      </div>
    </section>
  );
}
