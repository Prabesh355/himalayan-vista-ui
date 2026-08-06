import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Compass, ShieldCheck, Sparkles, Star } from "lucide-react";
import heroImg from "@/assets/Everest Base Camp.jpeg";
import { stats } from "@/services/uiData";
import { packageService } from "@/services/packageService";
import { homeContentService } from "@/services/homeContentService";
import { DestinationCard } from "@/components/DestinationCard";
import {
  defaultImageFallback,
  resolveImageUrl,
  resolvePackageImage,
  useFallbackImage,
} from "@/lib/imageUrl";
import {
  ReviewsSection,
  type Review as ReviewCard,
  type ReviewFormValues,
} from "@/components/ReviewsSection";
import api from "@/services/api";

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
  const [showSubscribePopup, setShowSubscribePopup] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [popupDismissed, setPopupDismissed] = useState(false);

  useEffect(() => {
    if (popupDismissed) return;
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowSubscribePopup(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [popupDismissed]);

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(subscriberEmail);
  const contactEmail = "nomadsnavigatenepal5@gmail.com";

  const submitSubscription = () => {
    if (!emailIsValid) return;
    window.open(
      `mailto:${contactEmail}?subject=Subscribe%20to%20Website%20Updates&body=Please%20add%20${encodeURIComponent(
        subscriberEmail,
      )}%20to%20your%20email%20update%20list.`,
      "_blank",
    );
    setShowSubscribePopup(false);
    setPopupDismissed(true);
  };

  const closeSubscribePopup = () => {
    setShowSubscribePopup(false);
    setPopupDismissed(true);
  };

  return (
    <div className="bg-background text-foreground selection:bg-accent selection:text-white">
      <Hero data={homeData?.hero} />
      <Stats data={homeData?.stats} />
      <FeaturedDestinations />
      <Why data={homeData?.why} />
      <HomeReviews />
      <CTA data={homeData?.cta} />

      {showSubscribePopup && !popupDismissed ? (
        <div className="fixed bottom-5 right-5 z-50 w-[min(92vw,380px)] rounded-3xl border border-white/10 bg-card/95 p-4 shadow-elegant backdrop-blur-xl text-foreground">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent">Stay updated</p>
              <h2 className="mt-2 text-lg font-semibold">Subscribe for new packages</h2>
            </div>
            <button
              type="button"
              onClick={closeSubscribePopup}
              className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-sm text-muted-foreground hover:bg-white/10"
            >
              Close
            </button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Get notified by email whenever the website publishes a new itinerary or update.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <input
              type="email"
              value={subscriberEmail}
              onChange={(event) => setSubscriberEmail(event.target.value)}
              placeholder="Your email address"
              className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            <button
              type="button"
              onClick={submitSubscription}
              disabled={!emailIsValid}
              className="inline-flex items-center justify-center rounded-2xl bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Subscribe by email
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

type ReviewApiItem = {
  _id?: string;
  id?: string;
  title?: string;
  comment?: string;
  rating?: number;
  verifiedPurchase?: boolean;
  createdAt?: string;
  guestName?: string;
  guestEmail?: string;
  user?:
    | {
        firstName?: string;
        lastName?: string;
        email?: string;
      }
    | string;
};

function Hero({ data }: { data?: any }) {
  const badgeText = String(data?.badgeText || "Elite IFMGA Guides")
    .replace(/\bbooking\s+open\b\s*[·|•–—-]?\s*/i, "")
    .trim() || "Elite IFMGA Guides";
  const title = data?.title || "EXPLORE THE SUMMIT STANDARDS";
  const description =
    data?.description ||
    "Bespoke high-altitude expeditions and luxury Himalayan treks crafted for discerning explorers.";
  const hasCmsImage = Boolean(data?.backgroundImage);
  const backgroundImage = useMemo(
    () => resolveImageUrl(data?.backgroundImage || heroImg, heroImg),
    [data?.backgroundImage],
  );
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
    setImageFailed(false);
  }, [backgroundImage]);

  useEffect(() => {
    // Dynamic CMS images cannot be discovered by the HTML preload scanner.
    // Preload them once; bundled images are discovered from the picture element.
    if (!hasCmsImage || typeof document === "undefined") return;
    const existing = document.querySelector<HTMLLinkElement>('link[data-home-hero-preload]');
    if (existing?.href === backgroundImage) return;
    existing?.remove();
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "image";
    preload.href = backgroundImage;
    preload.fetchPriority = "high";
    preload.dataset.homeHeroPreload = "true";
    document.head.appendChild(preload);
  }, [backgroundImage, hasCmsImage]);
  const scrollToEnd = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };
  const imageSource = imageFailed ? "/images/hero/everest-base-camp-1920.webp" : backgroundImage;

  return (
    <section className="relative -mt-[88px] flex min-h-[100svh] flex-col justify-between overflow-hidden bg-slate-950">
      <img
        src="/images/hero/everest-base-camp-lqip.jpg"
        alt=""
        aria-hidden="true"
        width={48}
        height={27}
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
      />
      <picture className="absolute inset-0">
        {!hasCmsImage ? <source type="image/avif" srcSet="/images/hero/everest-base-camp-768.avif 768w, /images/hero/everest-base-camp-1280.avif 1280w, /images/hero/everest-base-camp-1920.avif 1920w" sizes="100vw" /> : null}
        {!hasCmsImage ? <source type="image/webp" srcSet="/images/hero/everest-base-camp-768.webp 768w, /images/hero/everest-base-camp-1280.webp 1280w, /images/hero/everest-base-camp-1920.webp 1920w" sizes="100vw" /> : null}
        <img
          src={imageSource}
          alt="Himalayan peaks at sunset with prayer flags"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setImageFailed(true)}
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
          className={`h-full w-full object-cover object-[center_30%] transition-opacity duration-[450ms] ease-out ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,oklch(0.08_0.005_35/0.8)_100%)]" />

      {/* Luxury Grid Line Overlay for Editorial Feel */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="mx-auto max-w-7xl h-full border-x border-white/20 grid grid-cols-4">
          <div className="border-r border-white/20"></div>
          <div className="border-r border-white/20"></div>
          <div className="border-r border-white/20"></div>
          <div></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-20 pt-44 min-h-[100svh] w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            {badgeText}
          </span>
          <h1 className="mt-8 text-5xl md:text-8xl font-display tracking-tight text-foreground leading-[0.95] uppercase font-bold">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-foreground/80 leading-relaxed font-light tracking-wide">
            {description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/packages"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-sunset px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-glow transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,170,66,0.4)] hover:-translate-y-0.5"
            >
              Explore Expeditions
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 px-8 py-4 text-xs font-bold uppercase tracking-widest text-foreground transition-all duration-300 backdrop-blur-sm"
            >
              Plan Custom Climb
            </Link>
          </div>
        </motion.div>

        {/* Concierge Planner Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-16 grid max-w-7xl gap-4 md:grid-cols-4 glass rounded-3xl p-4 border border-white/5 bg-black/40 backdrop-blur-xl shadow-elegant"
        >
          {[
            { label: "Select Summit / Valley", value: "Everest & Lhotse Domes" },
            { label: "Expedition Grade", value: "Alpine Grade III (Extreme)" },
            { label: "Target Season", value: "Spring / Autumn 2026" },
            { label: "Logistics Level", value: "Luxury Base Camp (Heated Domes)" },
          ].map((f) => (
            <Link
              key={f.label}
              to="/contact"
              className="rounded-2xl bg-white/5 border border-white/5 hover:border-accent/40 hover:bg-white/10 transition-all duration-300 px-5 py-4 text-left cursor-pointer group"
            >
              <p className="text-[9px] uppercase tracking-[0.15em] font-bold text-accent group-hover:text-white transition-colors">
                {f.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-white tracking-wide">{f.value}</p>
            </Link>
          ))}
        </motion.div>

        <button
          type="button"
          onClick={scrollToEnd}
          className="absolute bottom-6 right-4 inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 transition hover:bg-white/10 md:right-8"
        >
          <ArrowDown className="h-4 w-4 text-accent" />
          Jump to end
        </button>
      </div>
    </section>
  );
}

function Stats({ data }: { data?: any[] }) {
  const defaultStats = [
    { value: "100%", label: "Summit Safety Record" },
    { value: "1:1", label: "Sherpa-to-Climber Ratio" },
    { value: "IFMGA", label: "Certified Mountain Guides" },
    { value: "8,848m", label: "Logistics Mastery" },
  ];

  const items = data && data.length > 0 ? data : defaultStats;

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 text-center border border-white/5 hover:border-accent/20 transition-all duration-300"
          >
            <p className="text-4xl md:text-5xl font-display font-semibold text-gradient-sunset">
              {s.value}
            </p>
            <div className="mt-3 mx-auto h-[1px] w-8 bg-accent/30" />
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedDestinations() {
  const contactEmail = "nomadsnavigatenepal5@gmail.com";
  const whatsappNumber = "+9779769364689";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=Hi%20Nomads%20Navigate%20Nepal%2C%20I%20want%20to%20inquire%20about%20your%20luxury%20expeditions.`;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["featured-packages"],
    queryFn: () => packageService.getFeaturedPackages({ limit: 10 }),
  });

  const featuredPackages = data?.data || [];
  const featuredDestinations = featuredPackages.map((pkg: any) => ({
    slug: pkg.slug,
    name: pkg.title,
    tagline: pkg.tagline || pkg.description || "",
    image: resolvePackageImage(pkg.images?.[0], pkg.slug, pkg.title),
    region: pkg.destination,
    duration: pkg.duration?.days ? `${pkg.duration.days} days` : pkg.duration || "Trek",
    difficulty: pkg.difficulty,
    priceFrom: pkg.price,
    rating: pkg.rating ?? 0,
    tags: pkg.tags || [],
  }));

  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
        <div>
          <p className="text-xs font-bold text-accent uppercase tracking-[0.25em]">
            Signature Expeditions
          </p>
          <h2 className="mt-3 text-4xl md:text-6xl font-display font-semibold tracking-tight uppercase leading-[1.05]">
            Choose Your Next <span className="text-gradient-sunset">Summit</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground font-light tracking-wide leading-relaxed">
            Crafted for those who seek the highest points on earth. Expert high-altitude logistics,
            elite guiding, and unparalleled safety infrastructure.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/destinations"
            className="group inline-flex justify-center items-center gap-2 rounded-full border border-white/10 hover:border-white/20 glass px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 w-full sm:w-auto"
          >
            All Expeditions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex justify-center items-center gap-2 rounded-full bg-gradient-sunset px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white shadow-glow hover:shadow-[0_0_20px_rgba(244,170,66,0.3)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            Consult a Specialist
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Swipe to explore high-altitude routes
          </p>
          {isLoading && (
            <p className="text-xs text-muted-foreground animate-pulse">Retrieving itineraries…</p>
          )}
          {isError && (
            <p className="text-xs text-red-400">
              Trips could not be loaded right now. Please refresh or contact us.
            </p>
          )}
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
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length === 0) return;

    const elRect = el.getBoundingClientRect();
    let closestIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const diff = Math.abs(cardRect.left - elRect.left - 24);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, [destinations]);

  const scrollToCard = (index: number) => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    const targetCard = cards[index];
    if (targetCard) {
      const targetScrollLeft = targetCard.offsetLeft - el.offsetLeft - 24;
      el.scrollTo({
        left: targetScrollLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const scroll = (dir: "left" | "right") => {
    const nextIndex = dir === "left" ? activeIndex - 1 : activeIndex + 1;
    if (nextIndex >= 0 && nextIndex < destinations.length) {
      scrollToCard(nextIndex);
    }
  };

  return (
    <div className="relative group/scroller">
      {activeIndex > 0 && (
        <button
          aria-label="scroll left"
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/80 border border-white/10 text-white shadow-elegant hover:bg-black flex items-center justify-center transition-all opacity-0 group-hover/scroller:opacity-100"
        >
          ‹
        </button>
      )}

      <div
        ref={ref}
        className="flex gap-6 overflow-x-auto pb-6 scroll-pl-6 snap-x snap-mandatory touch-pan-x no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {destinations.map((d, i) => (
          <div
            key={d.slug}
            data-card
            className="snap-start snap-always min-w-[260px] sm:min-w-[280px] md:min-w-[320px]"
          >
            <DestinationCard d={d} index={i} />
          </div>
        ))}
      </div>

      {activeIndex < destinations.length - 1 && (
        <button
          aria-label="scroll right"
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-black/80 border border-white/10 text-white shadow-elegant hover:bg-black flex items-center justify-center transition-all opacity-0 group-hover/scroller:opacity-100"
        >
          ›
        </button>
      )}

      {/* Dot Indicators */}
      <div className="mt-4 flex justify-center gap-2">
        {destinations.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-6 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Why({ data }: { data?: any[] }) {
  const defaultItems = [
    {
      icon: Compass,
      title: "Elite IFMGA Sherpa Guiding",
      body: "Led exclusively by UIAGM/IFMGA certified guides with multiple Everest summits and international high-altitude search & rescue training.",
    },
    {
      icon: ShieldCheck,
      title: "Uncompromising Safety Net",
      body: "Dedicated medical oxygen cylinders, satellite communication links, real-time weather monitoring, and helicopter evacuation cover on every departure.",
    },
    {
      icon: Sparkles,
      title: "Luxury Base Camp Logistics",
      body: "Walk-in heated dome tents with ergonomic furniture, high-altitude gourmet chefs preparing organic menus, and full-time medical support officers.",
    },
  ];

  const iconMap: Record<string, any> = {
    Compass,
    ShieldCheck,
    Sparkles,
  };

  const items =
    data && data.length > 0
      ? data.map((item: any) => ({
          icon: iconMap[item.icon] || Compass,
          title: item.title,
          body: item.body,
        }))
      : defaultItems;

  return (
    <section className="relative py-28 overflow-hidden bg-white/[0.01] border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent/5 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold text-accent uppercase tracking-[0.25em]">
            The Summit Standard
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-semibold tracking-tight uppercase leading-[1.1]">
            Unrivaled Experience, Uncompromising Safety
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((it, i) => {
            const IconComponent = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-3xl p-8 hover:border-accent/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-sunset shadow-glow">
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-display font-semibold tracking-wide">
                    {it.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-light">
                    {it.body}
                  </p>
                </div>
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
  const handleImageError = useFallbackImage(defaultImageFallback);

  return (
    <section className="mx-auto max-w-7xl px-4 py-28">
      <div className="max-w-2xl mb-16">
        <p className="text-xs font-bold text-accent uppercase tracking-[0.25em]">
          Expedition Dispatches
        </p>
        <h2 className="mt-3 text-4xl md:text-5xl font-display font-semibold tracking-tight uppercase leading-[1.1]">
          Journals from the Crest
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {items.map((t, i) => (
          <motion.figure
            key={t.id || t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="glass rounded-3xl p-8 flex flex-col justify-between border border-white/5 hover:border-accent/20 transition-all duration-300"
          >
            <div>
              <div className="flex gap-1 text-amber-400 mb-6">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="text-foreground/90 leading-relaxed font-light italic">
                "{t.quote}"
              </blockquote>
            </div>
            <figcaption className="mt-8 flex items-center gap-3 pt-6 border-t border-white/5">
              <img
                src={resolveImageUrl(t.avatar)}
                alt={t.name}
                onError={handleImageError}
                className="h-10 w-10 rounded-full object-cover border border-white/10"
                loading="lazy"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white">{t.name}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                  {t.country} · {t.trek}
                </p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <div className="mt-20 border-t border-white/10 pt-16">
        <HomeReviews />
      </div>
    </section>
  );
}

function HomeReviews() {
  const queryClient = useQueryClient();
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const reviewsQuery = useQuery({
    queryKey: ["site-reviews"],
    queryFn: async () =>
      (await api.get<{ success: boolean; data: ReviewApiItem[] }> ("/reviews")).data,
  });

  const reviewMutation = useMutation({
    mutationFn: async (values: ReviewFormValues) => {
      const res = await api.post("/reviews/site", values);
      return res.data;
    },
    onMutate: () => {
      setSubmitMessage("");
      setSubmitError("");
    },
    onSuccess: async () => {
      setSubmitMessage("Your review has been published. Thank you for sharing it.");
      await queryClient.invalidateQueries({ queryKey: ["site-reviews"] });
    },
    onError: (error: any) => {
      setSubmitError(
        error?.response?.data?.message ||
          "We could not publish your review right now. Please check your details and try again.",
      );
    },
  });

  const reviewCards: ReviewCard[] =
    reviewsQuery.data?.data?.map((review, index) => {
      const author =
        typeof review.user === "string"
          ? review.user
          : review.guestName ||
            [review.user?.firstName, review.user?.lastName].filter(Boolean).join(" ").trim() ||
            review.user?.email ||
            review.guestEmail ||
            "Guest Traveler";

      return {
        id: review._id || review.id || String(index),
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
    }) || [];

  return (
    <section id="reviews" className="mx-auto max-w-7xl px-4 py-24">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">Traveler Reviews</p>
        <h2 className="mt-3 text-4xl font-display font-semibold uppercase tracking-tight md:text-5xl">
          Share Your Experience
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Read real traveler feedback or post your own review directly from the homepage.
        </p>
      </div>

      {reviewsQuery.isError && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
          Reviews could not be loaded right now. You can still submit your review below.
        </div>
      )}

      <ReviewsSection
        reviews={reviewCards}
        isSubmitting={reviewMutation.isPending}
        isLoading={reviewsQuery.isLoading}
        submitMessage={submitMessage}
        submitError={submitError}
        onSubmitReview={(values) => reviewMutation.mutateAsync(values)}
      />
    </section>
  );
}

function CTA({ data }: { data?: any }) {
  const title = data?.title || "BEGIN YOUR JOURNEY TO THE SUMMIT.";
  const subtitle =
    data?.subtitle ||
    "Consult with our logistics team to design a bespoke Himalayan climb or high-altitude luxury trek. Guided by world-record holder Sherpas.";

  return (
    <section className="mx-auto max-w-7xl px-4 pb-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-aurora p-12 md:p-20 border border-white/5 shadow-elegant">
        {/* Ambient glow details */}
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-black/60 blur-[100px] pointer-events-none" />

        <div className="relative max-w-3xl text-white">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-4">
            Elite Logistics & Guiding
          </p>
          <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tight uppercase leading-[1.05]">
            {title}
          </h2>
          <p className="mt-6 text-white/80 text-lg font-light tracking-wide leading-relaxed">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-widest text-black hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition duration-300"
            >
              Start Planning
              <ArrowRight className="h-4 w-4 text-accent" />
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur px-8 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/30 transition duration-300"
            >
              Browse Routes
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
