import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type ComponentType, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  BadgeCheck,
  BedDouble,
  BusFront,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CirclePlus,
  Clock3,
  Compass,
  Eye,
  Footprints,
  HelpCircle,
  Home,
  Info,
  ListChecks,
  Mail,
  Map,
  MapPinned,
  Minus,
  Mountain,
  Plane,
  Route as RouteIcon,
  Send,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";

import { useCurrency } from "@/context/CurrencyProvider";
import api from "@/services/api";
import { BookingForm } from "@/components/BookingForm";
import { defaultImageFallback, resolveImageUrl, resolvePackageImage } from "@/lib/imageUrl";
import { RelatedPackages } from "@/components/RelatedPackages";

type ItineraryDay = {
  day: number;
  title: string;
  detail: string;
  meta: string[];
  highlights: string[];
};

export type TrekQuickFacts = {
  altitude: string;
  duration: string;
  accommodation: string;
  meals: string;
  transportation: string;
  bestSeason: string;
  groupSize: string;
  difficulty: string;
};

export const defaultQuickFacts: Record<string, TrekQuickFacts> = {
  "everest-base-camp": {
    altitude: "5,364m (Base Camp) / 5,545m (Kala Patthar)",
    duration: "12 - 14 Days",
    accommodation: "Luxury Tea Houses & Eco Lodges",
    meals: "Full Board (Breakfast, Lunch, Dinner)",
    transportation: "Lukla Flight & Private transfers",
    bestSeason: "March - May & Sept - Nov",
    groupSize: "2 - 12 Travelers",
    difficulty: "Challenging",
  },
  "nar-phu-valley": {
    altitude: "5,320m (Kang La Pass)",
    duration: "12 Days",
    accommodation: "Traditional Tibetan Tea Houses",
    meals: "Full Board (Local & Western options)",
    transportation: "Private Jeep / Shared local transfer",
    bestSeason: "Sept - Nov & March - May",
    groupSize: "1 - 10 Travelers",
    difficulty: "Demanding",
  },
  "mera-peak-ski": {
    altitude: "6,476m (Mera Peak Summit)",
    duration: "18 Days",
    accommodation: "Alpine Camping & Selected Tea Houses",
    meals: "Freshly prepared expedition meals",
    transportation: "Lukla Flights & Jeep transfers",
    bestSeason: "April - May & Oct - Nov",
    groupSize: "2 - 8 Climbers",
    difficulty: "Strenuous / Alpine Skiing",
  },
  "mera-peak-expedition": {
    altitude: "6,476m (Mera Peak Summit)",
    duration: "18 Days",
    accommodation: "Alpine Camping & Selected Tea Houses",
    meals: "Freshly prepared expedition meals & Lodge dining",
    transportation: "Lukla Flights & Jeep transfers",
    bestSeason: "April - May & Oct - Nov",
    groupSize: "2 - 8 Climbers",
    difficulty: "Strenuous (Alpine Grade PD)",
  },
  "manaslu-and-tsum-valley": {
    altitude: "5,106m (Larkya La Pass)",
    duration: "20 Days",
    accommodation: "Local Tibetan-style Tea Houses",
    meals: "Traditional Dal Bhat & Lodge menu",
    transportation: "Private 4WD Jeep from Kathmandu",
    bestSeason: "March - May & Sept - Nov",
    groupSize: "2 - 12 Travelers",
    difficulty: "Challenging",
  },
  "kanchenjunga-base-camp": {
    altitude: "5,143m (Pangpema Base Camp)",
    duration: "22 Days",
    accommodation: "Basic Wilderness Tea Houses / Camping",
    meals: "Local standard meals",
    transportation: "Flight to Bhadrapur & Private Jeep",
    bestSeason: "Oct - Nov & March - May",
    groupSize: "2 - 8 Travelers",
    difficulty: "Strenuous",
  },
  "tsho-rolpa-lake": {
    altitude: "4,580m (Tsho Rolpa Lake)",
    duration: "10 Days",
    accommodation: "Lodge & Local Homestays",
    meals: "Full Board (Local organic food)",
    transportation: "Local/Private Bus or Jeep to Chetchet",
    bestSeason: "Sept - Nov & March - May",
    groupSize: "2 - 12 Travelers",
    difficulty: "Moderate to Challenging",
  },
  "annapurna-base-camp": {
    altitude: "4,130m (Base Camp)",
    duration: "10 Days",
    accommodation: "Standard Mountain Tea Houses",
    meals: "Full Board (Breakfast, Lunch, Dinner)",
    transportation: "Private Jeep / Coaster to Pokhara",
    bestSeason: "March - May & Sept - Nov",
    groupSize: "1 - 14 Travelers",
    difficulty: "Moderate",
  },
  "annapurna-circuit": {
    altitude: "5,416m (Thorong La Pass)",
    duration: "14 - 18 Days",
    accommodation: "Premium Tea Houses & Eco Lodges",
    meals: "Full Board (Breakfast, Lunch, Dinner)",
    transportation: "Private Jeep / Shared local transfer",
    bestSeason: "March - May & Sept - Nov",
    groupSize: "2 - 12 Travelers",
    difficulty: "Challenging",
  },
  "three-pass": {
    altitude: "5,545m (Kala Patthar) / 3 Passes",
    duration: "20 Days",
    accommodation: "Standard Tea Houses",
    meals: "Full Board (Breakfast, Lunch, Dinner)",
    transportation: "Lukla Flights & Private transfers",
    bestSeason: "March - May & Sept - Nov",
    groupSize: "2 - 10 Travelers",
    difficulty: "Strenuous",
  },
  "lobuche-east": {
    altitude: "6,119m (Lobuche East Summit)",
    duration: "16 Days",
    accommodation: "Camping & High Camps",
    meals: "Expedition Prepared Meals",
    transportation: "Domestic Flights & Private Jeep",
    bestSeason: "April - May & Oct - Nov",
    groupSize: "2 - 8 Climbers",
    difficulty: "Very Strenuous (Alpine Grade PD+)",
  },
  "api-himal-base-camp": {
    altitude: "4,250m (Base Camp)",
    duration: "16 Days",
    accommodation: "Teahouses / Wilderness Camping",
    meals: "Prepared camp food & local tea houses",
    transportation: "Domestic Flight to Dhangadhi & Private Jeep",
    bestSeason: "Sept - Nov & March - May",
    groupSize: "2 - 10 Travelers",
    difficulty: "Demanding / Remote",
  },
};

export function getTrekFacts(slug: string, pkg: any): TrekQuickFacts {
  const normalizedSlug = slug.toLowerCase().replace(/-trek$/, "");
  const matchedKey = Object.keys(defaultQuickFacts).find(
    (k) => normalizedSlug.includes(k) || k.includes(normalizedSlug)
  );

  if (matchedKey) {
    return defaultQuickFacts[matchedKey];
  }

  return {
    altitude: "3,500m - 5,500m",
    duration: `${pkg?.duration?.days || 12} Days`,
    accommodation: "Premium Tea Houses & Mountain Lodges",
    meals: "Full Board (Breakfast, Lunch, Dinner)",
    transportation: "Private/Shared Transfers",
    bestSeason: "Spring (March - May) & Autumn (September - November)",
    groupSize: `${pkg?.groupSize?.min || 1} - ${pkg?.groupSize?.max || 12} Travelers`,
    difficulty: pkg?.difficulty || "Moderate",
  };
}

type PriceItem = {
  label: string;
  detail: string;
  icon: ComponentType<{ className?: string }>;
};

type ParsedItinerary = {
  summary: string;
  highlights: string[];
  days: ItineraryDay[];
  fullMarkdown: string;
};

type TrekDetailSection = {
  id: string;
  title: string;
  body: string;
};

type DayDraft = {
  day: number;
  title: string;
  detailParts: string[];
  meta: string[];
  highlights: string[];
  activeSection: string | null;
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

const detailSectionIcons: Record<string, ComponentType<{ className?: string }>> = {
  overview: Info,
  "why-choose-this-trek": Compass,
  "why-choose": Compass,
  "trek-overview": Map,
  "trip-overview": Map,
  "trip-facts": ListChecks,
  "cost-includes": CheckCircle2,
  "cost-excludes": Minus,
  includes: CheckCircle2,
  excludes: Minus,
  "best-time-to-trek": CalendarDays,
  "recommended-selling-price": Ticket,
  "package-cost": Ticket,
  faqs: HelpCircle,
  faq: HelpCircle,
};

const highlightIcons = [Mountain, MapPinned, Compass, Footprints, Sparkles, ShieldCheck];
const dayIcons = [CalendarDays, Mountain, Footprints, Home, MapPinned, Compass];

const cleanMarkdownText = (value: string) =>
  value
    .replace(/^#{1,6}\s*/, "")
    .replace(/^[-*•]\s+/, "")
    .replace(/^\d+\.\s+/, "")
    .replace(/^\*+/, "")
    .replace(/\*+$/, "")
    .replace(/\s+/g, " ")
    .trim();

const slugify = (value: string) =>
  cleanMarkdownText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const ensureStringValue = (value: unknown) =>
  typeof value === "string" ? value : value == null ? "" : String(value);

const getSectionTitle = (line: string) => {
  const trimmed = line.trim();
  const markdownHeading = trimmed.match(/^#{1,4}\s+(.+)$/);
  if (markdownHeading) return cleanMarkdownText(markdownHeading[1]);

  const boldHeading = trimmed.match(/^\*\*(.+?)\*\*:?\s*$/);
  if (boldHeading) return cleanMarkdownText(boldHeading[1]);

  const plainHeading = trimmed.match(
    /^(Overview|Why Choose(?: This Trek)?\??|Why Choose .+\??|Trek Highlights|Trip Highlights|Trek Overview|Trip Overview|Trip Facts|Detailed Itinerary|Detailed Day-by-Day Itinerary|Cost Includes|Cost Excludes|Includes|Excludes|Package Cost|Recommended Selling Price|Best Time to Trek|FAQs?|Frequently Asked Questions)\s*:?\s*$/i,
  );
  if (plainHeading) return cleanMarkdownText(plainHeading[1]);

  return null;
};

const parseDayHeading = (line: string) => {
  const cleanedLine = line
    .trim()
    .replace(/^#{1,6}\s*/, "")
    .replace(/^\d+\.\s+/, "");
  const match = cleanedLine.match(
    /^(?:[-*]\s*)?(?:\*\*)?Day\s*(\d+)(?:\s*[:—–-]\s*|\s+)(.+?)\*?$/i,
  );
  if (!match) return null;

  const rest = match[2].replace(/\*\*/g, "").trim();
  const detailSplit = rest.match(/^(.+?)(?::\s+)(.+)$/);

  return {
    day: Number(match[1]),
    title: cleanMarkdownText(detailSplit ? detailSplit[1] : rest),
    detail: detailSplit ? detailSplit[2].trim() : "",
  };
};

function parseTrekSections(markdown: string, packageTitle: string) {
  const lines = markdown.split(/\r?\n/);
  const sections: TrekDetailSection[] = [];
  let current: TrekDetailSection | null = null;
  let autoOverviewStarted = false;

  const pushSection = () => {
    if (!current) return;
    const body = current.body.trim();
    if (body || current.title) {
      sections.push({ ...current, body });
    }
    current = null;
  };

  for (const line of lines) {
    const dayHeading = parseDayHeading(line);
    if (dayHeading) {
      pushSection();
      current = {
        id: "detailed-itinerary",
        title: "Detailed Itinerary",
        body: line,
      };
      autoOverviewStarted = true;
      continue;
    }

    const title = getSectionTitle(line);
    if (title) {
      pushSection();
      const id = slugify(title);
      current = {
        id: title === packageTitle ? "overview" : id || "overview",
        title: title === packageTitle ? "Overview" : title,
        body: title === packageTitle ? "" : "",
      };
      autoOverviewStarted = true;
      continue;
    }

    if (!current && line.trim()) {
      current = {
        id: "overview",
        title: "Overview",
        body: "",
      };
      autoOverviewStarted = true;
    }

    if (current) {
      current.body += `${current.body ? "\n" : ""}${line}`;
    } else if (!autoOverviewStarted && line.trim()) {
      current = {
        id: "overview",
        title: "Overview",
        body: line,
      };
    }
  }

  pushSection();

  const highlightSection = sections.find((section) =>
    /^(trek|trip)?\s*highlights$/i.test(section.title),
  );
  const highlightItems =
    highlightSection?.body
      .split(/\r?\n/)
      .map((line) => cleanMarkdownText(line))
      .filter(Boolean) || [];

  return {
    sections: sections.filter(
      (section) =>
        section.id !== "detailed-itinerary" &&
        !/^(trek|trip)?\s*highlights$/i.test(section.title) &&
        section.body.trim(),
    ),
    highlightItems,
  };
}

function DetailCard({ section, index }: { section: TrekDetailSection; index: number }) {
  const Icon = detailSectionIcons[section.id] || Info;

  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
      className="scroll-mt-28 rounded-[2rem] border border-white/10 bg-card/80 p-6 shadow-elegant backdrop-blur-xl md:p-8"
    >
      <div className="mb-5 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-sunset shadow-glow">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Trek details
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            {section.title}
          </h2>
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-muted-foreground prose-p:max-w-3xl prose-p:leading-8 prose-li:leading-8 prose-headings:text-foreground prose-strong:text-foreground">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{section.body}</ReactMarkdown>
      </div>
    </motion.section>
  );
}

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
      (line.match(
        /^(?:#{1,3}\s*|\*\*)?(Cost Includes|Cost Excludes|Package Cost|Why Choose|Why Tsho Rolpa|Recommended Selling Price)\b/i,
      ) ||
        line.startsWith("✅") ||
        line.startsWith("❌"))
    ) {
      ignoreRemaining = true;
      continue;
    }

    const parsedDayHeading = parseDayHeading(line);
    if (parsedDayHeading) {
      startDay(parsedDayHeading.day, parsedDayHeading.title || `Day ${parsedDayHeading.day}`);
      if (parsedDayHeading.detail && currentDay) addToCurrent(currentDay, parsedDayHeading.detail);
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
    fullMarkdown: markdown,
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

export function PackageDetails({ slug: slugProp }: { slug?: string } = {}) {
  const { formatPrice } = useCurrency();
  const routeParams = Route.useParams();
  const slug = slugProp || routeParams.slug;
  const [openDay, setOpenDay] = useState<number | null>(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const detailsRef = useRef<HTMLElement | null>(null);
  const itineraryRef = useRef<HTMLElement | null>(null);
  const search = useRouterState({
    select: (state) => state.location.search as Record<string, unknown>,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryEmail, setEnquiryEmail] = useState("");
  const [enquiryMessage, setEnquiryMessage] = useState("");
  const [enquirySent, setEnquirySent] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const premiumEase = useMemo(() => [0.22, 0.61, 0.36, 1], []);

  const heroVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: premiumEase,
      },
    },
  }), [shouldReduceMotion, premiumEase]);

  const metaContainerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.08,
        staggerChildren: 0.08,
      },
    },
  }), []);

  const metaItemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: premiumEase,
      },
    },
  }), [shouldReduceMotion, premiumEase]);

  const ctaContainerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.15,
        staggerChildren: 0.08,
      },
    },
  }), []);

  const buttonVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: premiumEase,
      },
    },
    hover: {
      scale: shouldReduceMotion ? 1 : 1.03,
      y: shouldReduceMotion ? 0 : -3,
      boxShadow: "0 8px 30px rgba(217, 119, 6, 0.15)",
      transition: {
        duration: 0.25,
        ease: premiumEase,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: premiumEase,
      },
    },
  }), [shouldReduceMotion, premiumEase]);

  const journeyPlanVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: premiumEase,
      },
    },
  }), [shouldReduceMotion, premiumEase]);

  const dayCardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: premiumEase,
      },
    },
    hover: {
      y: shouldReduceMotion ? 0 : -3,
      boxShadow: "0 10px 30px -10px rgba(217, 119, 6, 0.15)",
      borderColor: "rgba(217, 119, 6, 0.25)",
      transition: {
        duration: 0.25,
        ease: premiumEase,
      },
    },
  }), [shouldReduceMotion, premiumEase]);

  const packageQuery = useQuery({
    queryKey: ["package", slug],
    queryFn: async () => {
      try {
        const res = await api.get<{ success: boolean; data: any }>(`/packages/slug/${slug}`);
        return res.data;
      } catch (err: any) {
        const status = err.response?.status;
        // The navigation can reference packages that have not yet been seeded in
        // the API. Keep those destination pages available from the local catalogue
        // while retaining the API as the primary source whenever it has a record.
        const shouldUseLocalCatalogue =
          !err.response || status === 404 || status === 502 || status === 503 || status === 504;
        if (shouldUseLocalCatalogue) {
          const mockModule = await import("@/services/mockData");
          const fallback = mockModule.destinations.find((d) => d.slug === slug);
          if (fallback) {
            const daysMatch = fallback.duration ? fallback.duration.match(/(\d+)\s*days?/i) : null;
            const days = daysMatch ? Number(daysMatch[1]) : 1;
            const nights = Math.max(0, days - 1);
            return {
              success: true,
              data: {
                id: fallback.slug,
                slug: fallback.slug,
                title: fallback.name,
                description: fallback.description,
                destination: fallback.region,
                price: fallback.priceFrom || 0,
                duration: { days, nights },
                images: fallback.image ? [fallback.image] : [],
                groupSize: { min: 1, max: 12 },
                featured: false,
                isActive: true,
                itinerary: fallback.itinerary || "",
                rating: fallback.rating || 0,
                reviewCount: fallback.reviews || 0,
              },
            };
          }
        }
        throw err;
      }
    },
  });

  const pkg = packageQuery.data?.data;
  const packageId = useMemo(() => {
    const candidate = pkg?._id || pkg?.id || "";
    return typeof candidate === "string" ? candidate : "";
  }, [pkg?._id, pkg?.id]);

  const itineraryMarkdown = useMemo(
    () => (pkg?.itinerary ? ensureStringValue(pkg.itinerary) : ""),
    [pkg?.itinerary],
  );

  const itinerary = useMemo(() => {
    if (!itineraryMarkdown) return null;
    try {
      return extractItinerary(itineraryMarkdown);
    } catch (error) {
      console.error("Failed to parse itinerary summary:", error);
      return null;
    }
  }, [itineraryMarkdown]);

  const trekDetails = useMemo(() => {
    if (!itineraryMarkdown) {
      return { sections: [], highlightItems: [] };
    }
    try {
      return parseTrekSections(itineraryMarkdown, pkg?.title || "");
    } catch (error) {
      console.error("Failed to parse trek sections:", error);
      return { sections: [], highlightItems: [] };
    }
  }, [itineraryMarkdown, pkg?.title]);
  const fullHighlightItems =
    trekDetails.highlightItems.length > 0
      ? trekDetails.highlightItems
      : itinerary?.highlights || [];
  const tocItems = [
    ...trekDetails.sections.slice(0, 6).map((section) => ({
      id: section.id,
      label: section.title,
    })),
    ...(fullHighlightItems.length > 0 ? [{ id: "highlights", label: "Highlights" }] : []),
    ...(itinerary?.days.length ? [{ id: "itinerary", label: "Itinerary" }] : []),
  ];
  const isFullItineraryView = search.view === "itinerary";
  const previewDays = itinerary?.days.slice(0, 5) || [];

  const contactEmail = "nomadsnavigatenepal5@gmail.com";
  const whatsappNumber = "+9779769364689";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20Nomads%20Navigate%20Nepal%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(pkg?.title || "trek")}%20package.`;

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const scrollPercent = (window.scrollY / scrollHeight) * 100;
      setShowStickyCTA(scrollPercent > 40 && scrollPercent < 88);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (packageQuery.isLoading) {
    return (
      <section className="mx-auto mt-16 max-w-4xl px-4 py-20">
        <div className="rounded-[2rem] border border-white/10 bg-card/80 p-8 text-center shadow-elegant backdrop-blur-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Loading trek details
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Preparing the full itinerary and route information.
          </p>
        </div>
      </section>
    );
  }

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



  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryEmail || !enquiryMessage) return;
    setEnquirySent(true);
    setTimeout(() => {
      setEnquiryName("");
      setEnquiryEmail("");
      setEnquiryMessage("");
    }, 3000);
  };

  const facts = getTrekFacts(slug, pkg);
  const quickFactsList = [
    { label: "Highest Altitude", value: facts.altitude, icon: Mountain },
    { label: "Duration", value: facts.duration, icon: CalendarDays },
    { label: "Accommodation", value: facts.accommodation, icon: BedDouble },
    { label: "Meals", value: facts.meals, icon: UtensilsCrossed },
    { label: "Transportation", value: facts.transportation, icon: BusFront },
    { label: "Best Season", value: facts.bestSeason, icon: Compass },
    { label: "Group Size", value: facts.groupSize, icon: Users },
    { label: "Difficulty", value: facts.difficulty, icon: Footprints },
  ];

  const parseItineraryDay = (day: ItineraryDay) => {
    const altitudeMatch = day.title.match(/\b(\d{1,3},?\d{3})\s*m\b/i) || day.detail.match(/\b(\d{1,3},?\d{3})\s*m\b/i);
    const altitude = altitudeMatch ? `${altitudeMatch[1]}m` : "Varies";
    const location = day.title
      .replace(/\(\d{1,3},?\d{3}\s*m\)/i, "")
      .replace(/^(Drive|Trek|Fly|Rest Day|Explore|Hike|Return)\s+(?:from\s+)?(?:to\s+)?/i, "")
      .trim();
    const walkingHours = day.meta.find(m => m.toLowerCase().includes("duration") || m.toLowerCase().includes("hour") || m.toLowerCase().includes("hr")) || "4 - 6 hours";
    const distance = day.meta.find(m => m.toLowerCase().includes("distance") || m.toLowerCase().includes("km")) || "8 - 12 km";
    const accommodation = day.meta.find(m => m.toLowerCase().includes("accommodation") || m.toLowerCase().includes("lodge") || m.toLowerCase().includes("tea house")) || "Mountain Tea House";
    const meals = day.meta.find(m => m.toLowerCase().includes("meals") || m.toLowerCase().includes("breakfast") || m.toLowerCase().includes("dinner")) || "Breakfast, Lunch, Dinner";
    return { altitude, location, walkingHours, distance, accommodation, meals };
  };

  const galleryImages = [
    resolvePackageImage(pkg.images?.[0] || pkg.image, pkg.slug, pkg.title),
    resolvePackageImage(null, "", "Everest Base Camp"),
    resolvePackageImage(null, "", "Annapurna Circuit"),
    resolvePackageImage(null, "", "Api Himal Base Camp"),
    resolvePackageImage(null, "", "Tsho Rolpa"),
    resolvePackageImage(null, "", "Mera Peak Expedition"),
  ];

  const faqsList = [
    {
      q: "What training or physical fitness is required?",
      a: "Trekking in Nepal is demanding. We recommend cardio workouts (running, cycling) and stamina building (hiking with a loaded pack) starting 6-8 weeks prior to departure."
    },
    {
      q: "How do we prevent acute mountain sickness (AMS)?",
      a: "Our itineraries feature built-in acclimatization days. We recommend drinking 4-5 liters of water daily, walking slowly, and consulting your guide on using Acetazolamide (Diamox)."
    },
    {
      q: "What type of travel insurance is mandatory?",
      a: "You must have travel insurance that explicitly covers emergency high-altitude helicopter rescue and medical evacuation up to 6,000m altitude."
    },
    {
      q: "What happens if a flight to Lukla or Pokhara is delayed?",
      a: "Mountain flights are weather-dependent. We build buffer days into the itineraries. In case of extended closures, helicopter options can be arranged locally at extra cost."
    },
    {
      q: "What gear is provided, and what should I bring?",
      a: "We provide group medical kits, map guides, and helper permits. You should bring specialized hiking gear (down jacket, sleeping bag, broken-in boots, trekking poles)."
    }
  ];



  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (target.src !== defaultImageFallback) {
      target.src = defaultImageFallback;
    }
  };

  const heroImageSrc = resolvePackageImage(pkg.images?.[0] || pkg.image, pkg.slug, pkg.title);
  const routeMap = {
    image: pkg.routeMapImage || pkg.routeMap?.image || "",
    title: pkg.routeMapTitle || pkg.routeMap?.title || "",
    description: pkg.routeMapDescription || pkg.routeMap?.description || "",
    alt: pkg.routeMapAlt || pkg.routeMap?.alt || "",
    caption: pkg.routeMapCaption || pkg.routeMap?.caption || "",
  };
  const routeMapImageUrl = routeMap.image ? `${resolveImageUrl(routeMap.image)}${resolveImageUrl(routeMap.image).includes("?") ? "&" : "?"}v=${encodeURIComponent(pkg.updatedAt || routeMap.image)}` : "";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:py-12">
      {/* 1. HERO SECTION */}
      <motion.section
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, ease: premiumEase }}
        className="relative w-full overflow-hidden rounded-[28px] h-[320px] md:h-[450px] lg:h-[580px] bg-card/40"
      >
        <img
          src={heroImageSrc}
          alt={pkg.title}
          onError={handleImageError}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Hero Content Wrapper */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {/* Bottom Left Content */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: premiumEase }}
              className="max-w-xl text-left"
            >
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-accent">
                PREMIUM TREK EXPERIENCE
              </span>
              <h1 className="mt-2 text-3xl font-display font-semibold tracking-tight text-white md:text-5xl">
                {pkg.title}
              </h1>
              <p className="mt-3 text-xs md:text-sm text-white/80 font-medium">
                {pkg.destination} &bull; {pkg.duration?.days || 0} Days &bull; {pkg.difficulty || "Moderate"}
              </p>
              <p className="mt-2 text-sm md:text-lg font-semibold text-white">
                Starting From <span className="text-accent font-bold">{formatPrice(pkg.price)}</span>
              </p>
            </motion.div>

            {/* Bottom Right Glassmorphism Actions */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: premiumEase }}
              className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md"
            >
              <button
                onClick={() => setShowBookingForm(true)}
                className="h-11 rounded-full bg-gradient-sunset px-6 text-xs font-bold uppercase tracking-wider text-white shadow-glow hover:opacity-95 transition cursor-pointer"
              >
                Book Now
              </button>
              <a
                href={`mailto:${contactEmail}?subject=Expedition%20Inquiry%20for%20${encodeURIComponent(pkg.title)}`}
                className="h-11 rounded-full border border-white/20 bg-white/5 px-5 inline-flex items-center text-xs font-semibold text-white hover:bg-white/10 transition"
              >
                Email Enquiry
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="h-11 rounded-full border border-white/20 bg-white/5 px-5 inline-flex items-center text-xs font-semibold text-white hover:bg-white/10 transition"
              >
                WhatsApp
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 2. QUICK FACTS CARDS */}
      <motion.section
        variants={metaContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8"
      >
        {quickFactsList.map((fact, index) => {
          const FactIcon = fact.icon;
          return (
            <motion.div
              key={fact.label}
              variants={metaItemVariants}
              whileHover={{ y: -3 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-[12px] shadow-soft flex flex-col items-center text-center transition"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                <FactIcon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                {fact.label}
              </p>
              <p className="mt-1 text-xs font-semibold text-foreground leading-tight">
                {fact.value}
              </p>
            </motion.div>
          );
        })}
      </motion.section>

      {Array.isArray(pkg.groupPriceTiers) && pkg.groupPriceTiers.length ? (
        <motion.section
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-[12px] shadow-soft"
        >
          <h2 className="text-xl font-display font-semibold uppercase tracking-[0.2em] text-accent">Group Pricing</h2>
          <p className="mt-2 text-sm text-muted-foreground">Per-person pricing based on your group size.</p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08]">
            <table className="w-full text-sm"><thead className="bg-white/[0.05] text-left text-xs uppercase tracking-wider text-muted-foreground"><tr><th className="px-4 py-3">Group size</th><th className="px-4 py-3 text-right">Price per person</th></tr></thead><tbody>{pkg.groupPriceTiers.map((tier: any, index: number) => <tr key={`${tier.min}-${tier.max}-${index}`} className="border-t border-white/[0.08]"><td className="px-4 py-3 font-medium">{tier.min}–{tier.max} Pax</td><td className="px-4 py-3 text-right font-semibold text-accent">{formatPrice(tier.price)}</td></tr>)}</tbody></table>
          </div>
        </motion.section>
      ) : null}

      {routeMap.image ? (
        <motion.section
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-[12px] shadow-soft"
        >
          <h2 className="text-xl font-display font-semibold uppercase tracking-[0.2em] text-accent">{routeMap.title || "Route Map"}</h2>
          {routeMap.description ? <p className="mt-2 text-sm leading-6 text-muted-foreground">{routeMap.description}</p> : null}
          <button type="button" onClick={() => setActiveImage(routeMapImageUrl)} className="mt-5 block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20">
            <img src={routeMapImageUrl} alt={routeMap.alt || `${pkg.title} route map`} loading="lazy" onError={handleImageError} className="max-h-[560px] w-full object-contain" />
          </button>
          {routeMap.caption ? <p className="mt-3 text-xs text-muted-foreground">{routeMap.caption}</p> : null}
        </motion.section>
      ) : null}

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_360px]">
        {/* Left column content */}
        <div className="space-y-16">
          {/* 3. TREK OVERVIEW */}
          <motion.section
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: premiumEase }}
            className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-[12px] shadow-soft"
          >
            <h2 className="text-xl font-display font-semibold uppercase tracking-[0.2em] text-accent">
              Overview
            </h2>
            <div className="relative mt-4">
              {/* Desktop Always Full */}
              <div className="hidden md:block prose prose-invert max-w-none text-muted-foreground leading-8">
                {pkg.description}
              </div>

              {/* Mobile Read More */}
              <div className="block md:hidden">
                <div
                  className={`prose prose-invert max-w-none text-muted-foreground leading-7 transition-all duration-500 overflow-hidden ${
                    isExpanded ? "max-h-[1000px]" : "max-h-[120px]"
                  }`}
                >
                  {pkg.description}
                </div>
                {!isExpanded && (
                  <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
                )}
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="rounded-full border border-accent/30 px-5 py-2 text-xs font-semibold text-accent hover:bg-accent/10 transition"
                  >
                    {isExpanded ? "Show Less" : "Read More"}
                  </button>
                </div>
              </div>
            </div>
          </motion.section>

          {/* 4. HIGHLIGHTS SECTION */}
          {fullHighlightItems.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: premiumEase }}
              className="scroll-mt-28"
            >
              <h2 className="text-xl font-display font-semibold uppercase tracking-[0.2em] text-accent">
                Trek Highlights
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {fullHighlightItems.map((item, index) => {
                  const Icon = highlightIcons[index % highlightIcons.length];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -3 }}
                      className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-[12px] shadow-soft flex gap-4 transition"
                    >
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{item}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}

          {/* 5. DETAILED ITINERARY */}
          {itinerary?.days.length ? (
            <motion.section
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: premiumEase }}
              className="scroll-mt-28"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-display font-semibold uppercase tracking-[0.2em] text-accent">
                  Detailed Itinerary
                </h2>
                <span className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent">
                  {itinerary.days.length} Days
                </span>
              </div>

              {/* Vertical timeline accordion */}
              <div className="mt-8 relative border-l border-white/10 pl-6 ml-4 space-y-6">
                {itinerary.days.map((day, index) => {
                  const isOpen = openDay === index;
                  const dayDetails = parseItineraryDay(day);

                  return (
                    <div key={index} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-5 flex h-4 w-4 items-center justify-center rounded-full border border-accent/50 bg-[#0c0a09]">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>

                      <motion.article
                        initial="hidden"
                        whileInView="visible"
                        whileHover="hover"
                        viewport={{ once: true }}
                        variants={dayCardVariants}
                        className="overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-[12px] shadow-soft transition-colors"
                      >
                        <button
                          type="button"
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/5"
                          onClick={() => setOpenDay(isOpen ? null : index)}
                        >
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                              Day {day.day}
                            </span>
                            <h3 className="text-base md:text-lg font-semibold text-foreground">
                              {dayDetails.location || day.title}
                            </h3>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              Altitude: <span className="text-foreground">{dayDetails.altitude}</span>
                            </p>
                          </div>
                          <ChevronDown
                            className={`h-4 w-4 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                          />
                        </button>

                        <motion.div
                          initial={false}
                          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/[0.08] px-5 pb-5 pt-4">
                            <div className="grid gap-3 grid-cols-2 md:grid-cols-4 mb-4">
                              <div className="rounded-xl bg-white/5 p-2.5 text-center">
                                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Meals</p>
                                <p className="text-xs font-semibold text-foreground mt-1 truncate">{dayDetails.meals}</p>
                              </div>
                              <div className="rounded-xl bg-white/5 p-2.5 text-center">
                                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Lodge</p>
                                <p className="text-xs font-semibold text-foreground mt-1 truncate">{dayDetails.accommodation}</p>
                              </div>
                              <div className="rounded-xl bg-white/5 p-2.5 text-center">
                                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Hours</p>
                                <p className="text-xs font-semibold text-foreground mt-1 truncate">{dayDetails.walkingHours}</p>
                              </div>
                              <div className="rounded-xl bg-white/5 p-2.5 text-center">
                                <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Distance</p>
                                <p className="text-xs font-semibold text-foreground mt-1 truncate">{dayDetails.distance}</p>
                              </div>
                            </div>
                            <p className="text-sm leading-7 text-muted-foreground">
                              {day.detail}
                            </p>
                          </div>
                        </motion.div>
                      </motion.article>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          ) : null}

          {/* 6. INCLUDED & EXCLUDED comparison */}
          <section className="grid gap-6 md:grid-cols-2">
            <CostCard title="What's Included" items={includedCosts} accent="bg-[#10B981]/15 border-[#10B981]/30" icon={CheckCircle2} />
            <CostCard title="What's Excluded" items={excludedCosts} accent="bg-red-500/10 border-red-500/20" icon={Minus} />
          </section>

          {/* 7. ESSENTIAL INFORMATION GUIDE */}
          <motion.section
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-[12px] shadow-soft"
          >
            <h2 className="text-xl font-display font-semibold uppercase tracking-[0.2em] text-accent">
              Essential Trek Guide
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Altitude & Acclimatization", desc: "Trekking above 3,000m altitude carries risks of acute mountain sickness (AMS). We pace our steps and build standard rest/acclimatization cycles.", icon: Compass },
                { title: "Permits & TIMS cards", desc: "All local trek routes require specific conservation licenses (ACAP permits, local community tickets) which we manage entirely for you.", icon: Ticket },
                { title: "Specialized Medical Insurance", desc: "High-altitude medical rescue and helicopter evacuation must be explicitly included in your personal travel policy before arrival.", icon: ShieldCheck },
                { title: "Packing Essentials", desc: "Layered clothing, high-performance thermal layers, sleeping bags, polarized sunglasses, and well broken-in hiking boots are essential.", icon: Footprints }
              ].map((item) => {
                const GuideIcon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 p-2">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                      <GuideIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* 8. GALLERY & LIGHTBOX */}
          <section>
            <h2 className="text-xl font-display font-semibold uppercase tracking-[0.2em] text-accent">
              Expedition Gallery
            </h2>
            <div className="mt-6 grid gap-3 grid-cols-2 md:grid-cols-3">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className="group relative cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 h-32 md:h-40"
                >
                  <img
                    src={img}
                    alt={`${pkg.title} screenshot ${i}`}
                    onError={handleImageError}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />
                </div>
              ))}
            </div>

            {/* Gallery Lightbox Modal */}
            <AnimatePresence>
              {activeImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveImage(null)}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                >
                  <button
                    onClick={() => setActiveImage(null)}
                    className="absolute top-4 right-4 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition"
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <motion.img
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    src={activeImage}
                    alt="Lightbox zoom view"
                    className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-elegant"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* 9. FAQS ACCORDION */}
          <section>
            <h2 className="text-xl font-display font-semibold uppercase tracking-[0.2em] text-accent">
              Frequently Asked Questions
            </h2>
            <div className="mt-6 space-y-3">
              {faqsList.map((faq, i) => {
                const isFaqOpen = activeFaq === i;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-[12px] shadow-soft overflow-hidden"
                  >
                    <button
                      onClick={() => setActiveFaq(isFaqOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground text-sm"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-accent transition-transform duration-200 ${isFaqOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isFaqOpen ? "auto" : 0, opacity: isFaqOpen ? 1 : 0 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/[0.08] px-5 py-4 text-xs md:text-sm text-muted-foreground leading-6">
                        {faq.a}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right column sidebar */}
        <aside className="space-y-6">
          {/* Price Summary */}
          <PriceSummary price={pkg.price} />

          {/* 10. BOOKING CTA & FORM */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-[12px] shadow-soft"
          >
            <h3 className="text-lg font-semibold text-foreground font-display uppercase tracking-wide">
              Secure Expedition Place
            </h3>
            <p className="text-xs text-muted-foreground mt-2 leading-5">
              Confirm your trek dates directly or submit a swift reservation request to receive pricing options.
            </p>

            <form onSubmit={handleSendEnquiry} className="mt-6 space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                <input
                  type="text"
                  required
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  placeholder="Enter name"
                  className="mt-1 w-full h-10 rounded-xl border border-white/10 bg-black/20 px-3 text-xs text-foreground placeholder-white/35 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                <input
                  type="email"
                  required
                  value={enquiryEmail}
                  onChange={(e) => setEnquiryEmail(e.target.value)}
                  placeholder="Enter email"
                  className="mt-1 w-full h-10 rounded-xl border border-white/10 bg-black/20 px-3 text-xs text-foreground placeholder-white/35 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Enquiry Message</label>
                <textarea
                  required
                  rows={3}
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                  placeholder="Write message..."
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 p-3 text-xs text-foreground placeholder-white/35 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={enquirySent}
                className="w-full h-11 rounded-full bg-gradient-sunset text-xs font-bold uppercase tracking-wider text-white shadow-glow hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                {enquirySent ? "Inquiry Transmitted!" : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowBookingForm(true)}
                className="flex-1 h-10 rounded-full border border-accent text-xs font-bold uppercase text-accent hover:bg-accent/10 transition"
              >
                Book Now
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 h-10 rounded-full border border-white/20 bg-white/5 inline-flex items-center justify-center text-xs font-semibold text-white hover:bg-white/10 transition"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        </aside>
      </div>

      <RelatedPackages 
        currentPackageId={packageId} 
        category={pkg.category || "trekking"} 
        destination={pkg.destination} 
      />

      <div className="mt-12 text-center lg:text-left">
        <Link to="/packages" className="text-accent hover:underline inline-flex items-center gap-1">
          ← Back to all trekking packages
        </Link>
      </div>

      {showBookingForm && (
        <BookingForm
          packageId={packageId}
          packageName={pkg.title}
          packagePrice={pkg.discountPrice || pkg.price}
          onClose={() => setShowBookingForm(false)}
          onSuccess={() => {
            setShowBookingForm(false);
          }}
        />
      )}

      {/* Sticky action bar */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.35, ease: premiumEase }}
            className="fixed bottom-6 left-4 right-4 z-40 rounded-2xl border border-white/10 bg-background/90 px-4 py-3 shadow-elegant backdrop-blur-xl max-w-4xl mx-auto flex items-center justify-between gap-4"
          >
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground font-display">{pkg.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                From <span className="text-accent font-semibold">{formatPrice(pkg.price)}</span>
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowBookingForm(true)}
                className="flex-1 sm:flex-none h-10 px-5 rounded-full bg-gradient-sunset text-center text-xs font-bold uppercase tracking-wider text-white shadow-glow hover:opacity-95 transition cursor-pointer flex items-center justify-center animate-none"
              >
                Book Now
              </button>
              <a
                href={`mailto:${contactEmail}?subject=Booking%20Enquiry%20for%20${encodeURIComponent(pkg.title)}`}
                className="flex-1 sm:flex-none h-10 px-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/45 text-center text-xs font-semibold text-white hover:bg-white/5 transition"
              >
                Email
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none h-10 px-4 inline-flex items-center justify-center rounded-full border border-white/10 bg-black/45 text-center text-xs font-semibold text-white hover:bg-white/5 transition"
              >
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
