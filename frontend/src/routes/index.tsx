import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowRight, Compass, ShieldCheck, Sparkles, Star } from "lucide-react";
import heroImg from "@/assets/everest-base-camp.jpeg";
import { stats, testimonials } from "@/services/uiData";
import { packageService } from "@/services/packageService";
import { homeContentService } from "@/services/homeContentService";
import { DestinationCard } from "@/components/DestinationCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nomads Navigate Nepal — Himalayan Treks & Adventures" },
      {
        name: "description",
        content:
          "Premium Himalayan trekking and adventure travel. Everest, Annapurna, Langtang and beyond — locally led journeys since 2011.",
      },
      { property: "og:title", content: "Nomads Navigate Nepal" },
      {
        property: "og:description",
        content: "Premium Himalayan trekking and adventure travel, locally led.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: response } = useQuery({
    queryKey: ["home-content"],
    queryFn: () => homeContentService.getHomeContent(),
  });
  const homeData = response?.data;

  return (
    <>
      <Hero data={homeData?.hero} />
      <Stats data={homeData?.stats} />
      <FeaturedDestinations />
      <Why data={homeData?.why} />
      <Testimonials data={homeData?.testimonials} />
      <CTA data={homeData?.cta} />
    </>
  );
}

function Hero({ data }: { data?: any }) {
  const badgeText = data?.badgeText || "Small group sizes · Expert Nepali guides";
  const title = data?.title || "NOMADS NAVIGATE NEPAL";
  const description = data?.description || "Explore Nepal, Beyond Maps";
  const backgroundImage = data?.backgroundImage || heroImg;
  const scrollToEnd = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <section className="relative -mt-20 min-h-[100svh] overflow-hidden">
      <img
        src={backgroundImage}
        alt="Himalayan peaks at sunset with prayer flags"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,oklch(0.16_0.025_250/0.6)_100%)]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-20 pt-40 min-h-[100svh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium text-foreground border border-white/8">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            {badgeText}
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-display tracking-tight text-foreground leading-[1.02]">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-foreground/90 leading-relaxed">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/packages"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-summit px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:-translate-y-0.5"
            >
              Explore Treks
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-foreground border border-border hover:bg-white/5"
            >
              Plan Your Trip
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-14 grid max-w-5xl gap-3 md:grid-cols-4 glass rounded-3xl p-3"
        >
          {[
            { label: "Destination", value: "Everest Region" },
            { label: "Trek style", value: "Classic · Lodge" },
            { label: "When", value: "Apr – May 2026" },
            { label: "Travellers", value: "2 adults" },
          ].map((f) => (
            <button
              key={f.label}
              className="rounded-2xl bg-white/5 hover:bg-white/10 transition px-4 py-3 text-left"
            >
              <p className="text-[10px] uppercase tracking-wider text-white/60">{f.label}</p>
              <p className="mt-0.5 text-sm font-semibold text-white">{f.value}</p>
            </button>
          ))}
        </motion.div>

        <button
          type="button"
          onClick={scrollToEnd}
          className="absolute bottom-6 right-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/10 md:right-8"
        >
          <ArrowDown className="h-4 w-4" />
          Jump to end
        </button>
      </div>
    </section>
  );
}

function Stats({ data }: { data?: any[] }) {
  const items = data && data.length > 0 ? data : stats;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="glass rounded-2xl p-6 text-center"
          >
            <p className="text-3xl md:text-4xl font-semibold text-gradient-summit">{s.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedDestinations() {
  const contactEmail = "nomadsnavigatenepal5@gmail.com";
  const whatsappNumber = "+9779769364689";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20Nomads%20Navigate%20Nepal%2C%20I%20want%20to%20book%20a%20trek.`;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-packages"],
    queryFn: () => packageService.getFeaturedPackages({ limit: 6 }),
  });

  const featuredPackages = data?.data || [];
  const featuredDestinations = featuredPackages.map((pkg: any) => ({
    slug: pkg.slug,
    name: pkg.title,
    tagline: pkg.tagline || pkg.description || "",
    image: pkg.images?.[0] || "https://via.placeholder.com/640x800?text=No+Image",
    region: pkg.destination,
    duration: pkg.duration?.days ? `${pkg.duration.days} days` : pkg.duration || "Trek",
    difficulty: pkg.difficulty,
    priceFrom: pkg.price,
    rating: pkg.rating ?? 0,
    tags: pkg.tags || [],
  }));

  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            Featured journeys
          </p>
          <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
            Where in <span className="text-gradient-summit">Nepal</span> next?
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Six signature regions, hundreds of itineraries. Hover a card to start dreaming.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <Link
            to="/destinations"
            className="group inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-semibold transition hover:shadow-glow"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-95"
          >
            Book via WhatsApp
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-muted-foreground">
            Scroll horizontally to view our most popular treks
          </p>
          {isLoading && <p className="text-sm text-muted-foreground">Loading featured packages…</p>}
          {isError && <p className="text-sm text-red-500">Unable to load featured packages.</p>}
        </div>
        <HorizontalScroller destinations={featuredDestinations} />
      </div>
    </section>
  );
}

function HorizontalScroller({
  destinations,
}: {
  destinations: Array<{
    slug: string;
    name: string;
    image: string;
    tagline?: string;
    region?: string;
    duration?: string;
    difficulty?: string;
    priceFrom?: number;
    price?: number;
    rating?: number;
    tags?: string[];
  }>;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const scroll = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const amt = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: dir === "left" ? -amt : amt, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        aria-label="scroll left"
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-2 backdrop-blur-md hover:bg-white/20 hidden md:inline-flex"
      >
        ‹
      </button>

      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto pb-6 scroll-pl-6 snap-x snap-mandatory touch-pan-x"
      >
        {destinations.map((d, i) => (
          <div key={d.slug} className="snap-start min-w-[260px] md:min-w-[300px]">
            <DestinationCard d={d} index={i} />
          </div>
        ))}
      </div>

      <button
        aria-label="scroll right"
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-2 backdrop-blur-md hover:bg-white/20 hidden md:inline-flex"
      >
        ›
      </button>
    </div>
  );
}

function Why({ data }: { data?: any[] }) {
  const defaultItems = [
    {
      icon: Compass,
      title: "Locally led, always",
      body: "Every trek is guided by certified Nepali leaders born in the regions you'll trek.",
    },
    {
      icon: ShieldCheck,
      title: "Safety isn't optional",
      body: "Oxygen, satellite comms and IFMGA-trained guides on every high-altitude departure.",
    },
    {
      icon: Sparkles,
      title: "Small, by design",
      body: "Group sizes capped at 10 so trails stay quiet and tea-house chats stay personal.",
    },
  ];

  const iconMap: Record<string, any> = {
    Compass,
    ShieldCheck,
    Sparkles,
  };

  const items = data && data.length > 0 
    ? data.map((item: any) => ({
        icon: iconMap[item.icon] || Compass,
        title: item.title,
        body: item.body,
      }))
    : defaultItems;

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-accent/10" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">Why Nomads</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
            The difference is in the details.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => {
            const IconComponent = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-3xl p-7 hover:shadow-elegant transition-all"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-summit shadow-glow">
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ data }: { data?: any[] }) {
  const items = data && data.length > 0 ? data : testimonials;

  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="max-w-2xl mb-12">
        <p className="text-sm font-medium text-accent uppercase tracking-wider">
          Travellers' tales
        </p>
        <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight">
          12,000+ stories. Here are three.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((t, i) => (
          <motion.figure
            key={t.id || t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass rounded-3xl p-7 flex flex-col"
          >
            <div className="flex gap-0.5 text-amber-400">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 text-foreground/90 leading-relaxed">"{t.quote}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 pt-5 border-t border-border/60">
              <img
                src={t.avatar}
                alt={t.name}
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.country} · {t.trek}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

function CTA({ data }: { data?: any }) {
  const title = data?.title || "Your Nepal story starts with one email.";
  const subtitle = data?.subtitle || "Tell us your dates and dream peak — we'll come back within 24 hours with a tailor-made plan.";

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-aurora p-10 md:p-16 shadow-elegant">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-black/20 blur-3xl" />
        <div className="relative max-w-2xl text-white">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {title}
          </h2>
          <p className="mt-4 text-white/85 text-lg">
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-foreground shadow-soft hover:-translate-y-0.5 transition"
            >
              Start planning
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/20"
            >
              Browse treks
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
