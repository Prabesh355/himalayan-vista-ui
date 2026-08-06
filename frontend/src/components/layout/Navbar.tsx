import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Globe,
  LayoutDashboard,
  LogIn,
  MapPin,
  Menu,
  Mountain,
  Settings,
  UserCircle,
  X,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { siteSettingsService } from "@/services/siteSettingsService";
import { useCurrency } from "@/context/CurrencyProvider";
import logo from "@/assets/logo.png";
import simonBhattarai from "@/assets/Simon Bhattarai.jpg";
import nishantKarki from "@/assets/Nishant Karki.jpg";

// ─── Static nav structure ────────────────────────────────────────────────────

const TREKKING_PACKAGES = [
  { label: "Annapurna Circuit Trek", slug: "annapurna-circuit-trek" },
  { label: "Everest Base Camp", slug: "everest-base-camp" },
  { label: "Manaslu & Tsum Valley", slug: "manaslu-tsum-valley" },
  { label: "Annapurna Base Camp", slug: "annapurna-base-camp" },
  { label: "Three Pass Trek", slug: "three-pass-trek" },
];

const REMOTE_TREKKING = [
  { label: "Nar Phu Valley Trek", slug: "nar-phu-valley-trek" },
  { label: "API Himal Base Camp", slug: "api-himal-base-camp" },
  { label: "Kanchenjunga Base Camp", slug: "kanchenjunga-base-camp" },
  { label: "Tsho Rolpa Valley Trek", slug: "tsho-rolpa-valley-trek" },
];

const EXPEDITIONS = [
  { label: "Lobuche East Peak", slug: "lobuche-east" },
  { label: "Mera Peak Ski", slug: "mera-peak-ski" },
  { label: "Mera Peak Expedition", slug: "mera-peak-expedition" },
];

const MORE_LINKS = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type StoredUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
};

// ─── Dropdown hook ────────────────────────────────────────────────────────────

function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return { open, setOpen, ref };
}

// ─── Package dropdown item ────────────────────────────────────────────────────

function PackageLink({ label, slug, onClick }: { label: string; slug: string; onClick?: () => void }) {
  return (
    <Link
      to="/packages/$slug"
      params={{ slug }}
      onClick={onClick}
      className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:-translate-y-px hover:bg-white/10 hover:text-foreground"
    >
      <MapPin className="h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-200 group-hover:scale-110" />
      {label}
    </Link>
  );
}

// ─── Destination Mega-Dropdown ────────────────────────────────────────────────

function DestinationDropdown({ onClose }: { onClose: () => void }) {
  const { open, setOpen, ref } = useDropdown();

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-2 text-[11px] lg:text-xs font-bold uppercase tracking-[0.18em] transition-all duration-200 hover:border-white/10 hover:bg-white/5 hover:text-foreground ${
          open ? "bg-white/10 text-foreground shadow-sm" : "text-foreground/80"
        }`}
      >
        Destination
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-[min(92vw,880px)] sm:w-[min(84vw,820px)]">
          <div className="glass-strong overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950/96 via-slate-950/92 to-slate-900/95 p-5 shadow-2xl backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-accent">Destination</p>
                <p className="mt-1 text-sm text-white/85">Browse the most popular trekking and expedition routes.</p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70">
                Premium route catalog
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
              {/* Expedition */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                  Expedition
                </p>
                <p className="mb-3 px-3 text-[10px] text-white/55 italic">Ski Sport Expedition</p>
                <div className="space-y-0.5">
                  {EXPEDITIONS.map((exp) => (
                    <Link
                      key={exp.slug}
                      to="/packages/$slug"
                      params={{ slug: exp.slug }}
                      onClick={() => { setOpen(false); onClose(); }}
                      className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:-translate-y-px hover:bg-white/10 hover:text-foreground"
                    >
                      <Mountain className="h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-200 group-hover:scale-110" />
                      {exp.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Classic Trekking */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                  Trekking
                </p>
                <p className="mb-3 px-3 text-[10px] text-white/55 italic">Classic Trekking</p>
                <div className="space-y-0.5">
                  {TREKKING_PACKAGES.map((pkg) => (
                    <PackageLink
                      key={pkg.slug}
                      label={pkg.label}
                      slug={pkg.slug}
                      onClick={() => { setOpen(false); onClose(); }}
                    />
                  ))}
                </div>
              </div>

              {/* Remote Trekking */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                  &nbsp;
                </p>
                <p className="mb-3 px-3 text-[10px] text-white/55 italic">Remote Trekking</p>
                <div className="space-y-0.5">
                  {REMOTE_TREKKING.map((pkg) => (
                    <PackageLink
                      key={pkg.slug}
                      label={pkg.label}
                      slug={pkg.slug}
                      onClick={() => { setOpen(false); onClose(); }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <p className="text-[11px] text-white/55">Quick access to the most visited route pages.</p>
              <Link
                to="/packages"
                onClick={() => { setOpen(false); onClose(); }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-px hover:opacity-95"
              >
                View All Packages →
              </Link>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

// ─── About Us Dropdown ────────────────────────────────────────────────────────

function AboutUsDropdown({ onClose, isAdmin }: { onClose: () => void; isAdmin: boolean }) {
  const { open, setOpen, ref } = useDropdown();

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 px-2 py-2 text-[11px] lg:text-xs font-bold uppercase tracking-wider transition-colors hover:text-foreground ${
          open ? "text-foreground" : "text-foreground/80"
        }`}
      >
        About Us
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full pt-2 z-50 min-w-[280px]">
          <div className="glass-strong rounded-xl p-3 shadow-elegant border border-border/50 bg-background/95 backdrop-blur-xl">
            <Link
              to="/blogs"
              onClick={() => { setOpen(false); onClose(); }}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors"
            >
              Stories
            </Link>
            <Link
              to="/teams"
              onClick={() => { setOpen(false); onClose(); }}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors"
            >
              Our Team
            </Link>
            <Link
              to="/about"
              onClick={() => { setOpen(false); onClose(); }}
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors"
            >
              Legal Documents
            </Link>

            <div className="my-2 border-t border-border/30" />
            <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">Contact Our Expert</p>
            <div className="px-3 py-2">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <img src={simonBhattarai} alt="Simon Bhattarai" className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-semibold">Simon Bhattarai</p>
                    <p className="text-[11px] text-muted-foreground">Senior Expedition Leader</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={nishantKarki} alt="Nishant Karki" className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-xs font-semibold">Nishant Karki</p>
                    <p className="text-[11px] text-muted-foreground">Trekking Guide</p>
                  </div>
                </div>
                <Link
                  to="/contact"
                  onClick={() => { setOpen(false); onClose(); }}
                  className="mt-2 text-xs text-accent hover:underline font-semibold"
                >
                  Contact Form →
                </Link>
              </div>
            </div>

            {isAdmin && (
              <>
                <div className="my-2 border-t border-border/30" />
                <Link
                  to="/admin"
                  onClick={() => { setOpen(false); onClose(); }}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors"
                >
                  Admin Dashboard
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [headerTopOffset, setHeaderTopOffset] = useState(88);
  const headerRef = useRef<HTMLElement | null>(null);
  const { currency, currencies, setCurrency } = useCurrency();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = user?.role === "admin";

  const { data: settingsResponse } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => siteSettingsService.getSiteSettings(),
    staleTime: 5 * 60 * 1000,
  });
  const settings = settingsResponse?.data;
  const logoSrc = settings?.logoUrl || logo;
  const siteName = settings?.siteName || "Nomads Navigate Nepal";
  const adminName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "Admin";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch { setUser(null); }
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      const height = headerRef.current?.offsetHeight ?? 88;
      setHeaderTopOffset(height);
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, [scrolled]);

  useEffect(() => { setOpen(false); setMobileExpanded(null); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMobile = () => setOpen(false);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <nav
          className={`flex items-center justify-between transition-all duration-500 rounded-2xl px-4 py-2 ${
            scrolled
              ? "glass shadow-elegant"
              : "bg-black/10 backdrop-blur-sm"
          }`}
        >
          {/* ── Left: Logo + Nav ── */}
          <div className="flex items-center gap-5">

            {/* Logo: icon stacked above text, no background */}
            <Link to="/" className="flex items-center group shrink-0">
              <img
                src={logoSrc}
                alt={siteName}
                className={`object-contain transition-all duration-500 ease-out group-hover:scale-105 ${
                  scrolled ? "h-9 w-auto" : "h-16 w-auto md:h-20"
                }`}
                style={{ background: "transparent" }}
              />
            </Link>

            {/* ── Desktop nav — sits beside logo ── */}
            <ul className="hidden md:flex items-center">
              <li>
                <Link
                  to="/"
                  activeOptions={{ exact: true }}
                  className="relative inline-flex items-center px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap"
                  activeProps={{ className: "text-foreground" }}
                >
                  {({ isActive }) => (
                    <>
                      Home
                      {isActive && <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-sunset" />}
                    </>
                  )}
                </Link>
              </li>
              <DestinationDropdown onClose={closeMobile} />
              <AboutUsDropdown onClose={closeMobile} isAdmin={isAdmin} />
              <li>
                <Link
                  to="/shop"
                  className="relative inline-flex items-center px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap"
                  activeProps={{ className: "text-foreground" }}
                >
                  {({ isActive }) => (
                    <>
                      Shop
                      {isActive && <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-sunset" />}
                    </>
                  )}
                </Link>
              </li>
              <li>
                <a
                  href="/#reviews"
                  className="relative inline-flex items-center px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap"
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* ── Right: actions ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Currency */}
            <label className="hidden md:flex items-center gap-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-foreground cursor-pointer transition-colors">
              <Globe className="h-3.5 w-3.5" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as typeof currency)}
                className="bg-transparent text-[11px] font-semibold outline-none"
                aria-label="Choose currency"
              >
                {currencies.map((opt) => (
                  <option key={opt.code} value={opt.code} className="bg-background text-foreground">
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            {/* User / Admin menu */}
            {isAdmin ? (
              <div className="hidden md:block relative group">
                <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-2.5 py-1.5 text-[11px] font-medium hover:bg-foreground/20 transition-colors">
                  <UserCircle className="h-3.5 w-3.5" />
                  {adminName}
                  <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary">Admin</span>
                </button>
                <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto z-50">
                  <div className="glass-strong min-w-[170px] rounded-xl border border-border/50 p-2 shadow-elegant">
                    <Link to="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-secondary/20"><LayoutDashboard className="h-4 w-4" />Dashboard</Link>
                    <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-secondary/20"><Globe className="h-4 w-4" />View Website</Link>
                    <Link to="/admin/settings" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-secondary/20"><Settings className="h-4 w-4" />Settings</Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-3 py-1.5 text-[11px] font-medium hover:bg-foreground/20 transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                Login
              </Link>
            )}

            {/* Plan Your Trip CTA */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-gradient-sunset px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-soft transition-all hover:shadow-glow hover:-translate-y-0.5 whitespace-nowrap"
            >
              Plan Your Trip →
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 border border-border shadow-md backdrop-blur-sm text-foreground"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        {open && (
          <>
            <div
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              className="md:hidden fixed inset-x-0 bottom-0 z-50 overflow-y-auto overscroll-contain"
              style={{ top: headerTopOffset, maxHeight: `calc(100vh - ${headerTopOffset}px)` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto max-w-7xl px-4 pb-8">
                <div className="glass-strong rounded-2xl p-3 animate-fade-up border border-border/50 bg-background/95 backdrop-blur-xl shadow-xl">
                  {isAdmin && (
                    <div className="mb-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">
                      Admin Mode
                    </div>
                  )}

                  {/* Home */}
                  <Link to="/" onClick={closeMobile} className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10 hover:text-foreground">
                    Home
                  </Link>

                  {/* Destination accordion */}
                  <div>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === "destination" ? null : "destination")}
                      className={`group w-full flex items-center justify-between rounded-2xl border px-4 py-3.5 text-base font-semibold transition-all duration-200 ${mobileExpanded === "destination" ? "border-white/10 bg-white/10 text-foreground shadow-sm" : "border-transparent text-foreground/90 hover:border-white/10 hover:bg-white/5 hover:text-foreground"}`}
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent" />
                        Destination
                      </span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded === "destination" ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpanded === "destination" && (
                      <div className="mx-2 mb-2 space-y-4 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.03] p-3 shadow-inner">
                        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Destination</p>
                            <p className="mt-1 text-xs text-muted-foreground">Quick links to the most popular route pages.</p>
                          </div>
                          <span className="rounded-full border border-white/10 bg-background/80 px-3 py-1 text-[10px] font-medium text-muted-foreground shadow-sm">
                            Mobile menu
                          </span>
                        </div>

                        {/* Expedition */}
                        <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                          <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Expedition</p>
                          <p className="px-3 mb-2 text-[10px] text-white/55 italic">Ski Sport Expedition</p>
                          {EXPEDITIONS.map((exp) => (
                            <Link key={exp.slug} to="/packages/$slug" params={{ slug: exp.slug }} onClick={closeMobile}
                              className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:-translate-y-px hover:bg-white/10 hover:text-foreground">
                              <Mountain className="h-3.5 w-3.5 text-accent shrink-0 transition-transform duration-200 group-hover:scale-110" />{exp.label}
                            </Link>
                          ))}
                        </div>

                        {/* Trekking */}
                        <div className="rounded-xl border border-white/10 bg-white/5 p-2">
                          <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">Trekking</p>
                          <p className="px-3 mb-2 text-[10px] text-white/55 italic">Classic Trekking</p>
                          {TREKKING_PACKAGES.map((pkg) => (
                            <Link key={pkg.slug} to="/packages/$slug" params={{ slug: pkg.slug }} onClick={closeMobile}
                              className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:-translate-y-px hover:bg-white/10 hover:text-foreground">
                              <MapPin className="h-3.5 w-3.5 text-accent shrink-0 transition-transform duration-200 group-hover:scale-110" />{pkg.label}
                            </Link>
                          ))}
                          
                          <div className="my-3 border-t border-white/10 mx-3" />
                          <p className="px-3 mb-2 text-[10px] text-white/55 italic">Remote Trekking</p>
                          {REMOTE_TREKKING.map((pkg) => (
                            <Link key={pkg.slug} to="/packages/$slug" params={{ slug: pkg.slug }} onClick={closeMobile}
                              className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:-translate-y-px hover:bg-white/10 hover:text-foreground">
                              <MapPin className="h-3.5 w-3.5 text-accent shrink-0 transition-transform duration-200 group-hover:scale-110" />{pkg.label}
                            </Link>
                          ))}
                        </div>

                        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
                          <p className="text-[11px] text-white/60">Quick access to all package routes.</p>
                          <Link to="/packages" onClick={closeMobile} className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-px hover:opacity-95">
                            View All →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* About Us accordion */}
                  <div>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === "about" ? null : "about")}
                      className="w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10"
                    >
                      About Us
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "about" ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpanded === "about" && (
                      <div className="mx-2 mb-2 rounded-xl bg-white/5 p-2">
                        <Link to="/blogs" onClick={closeMobile} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-white/10">
                          Stories
                        </Link>
                        <Link to="/teams" onClick={closeMobile} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-white/10">
                          Our Team
                        </Link>
                        <Link to="/about" onClick={closeMobile} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-white/10">
                          Legal Documents
                        </Link>
                        
                        <div className="my-2 border-t border-border/20 mx-3" />
                        <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">Contact Our Expert</p>
                        <div className="px-3 py-2 text-xs text-foreground/80 space-y-3">
                          <div className="flex items-center gap-2">
                            <img src={simonBhattarai} alt="Simon Bhattarai" className="h-9 w-9 rounded-full object-cover" />
                            <div>
                              <p className="font-semibold">Simon Bhattarai</p>
                              <p className="text-[11px] text-muted-foreground">Senior Expedition Leader</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <img src={nishantKarki} alt="Nishant Karki" className="h-9 w-9 rounded-full object-cover" />
                            <div>
                              <p className="font-semibold">Nishant Karki</p>
                              <p className="text-[11px] text-muted-foreground">Trekking Guide</p>
                            </div>
                          </div>
                          <Link to="/contact" onClick={closeMobile} className="mt-2 inline-block text-accent hover:underline">Contact Form →</Link>
                        </div>
                        
                        {isAdmin && (
                           <>
                             <div className="my-2 border-t border-border/20 mx-3" />
                             <Link to="/admin" onClick={closeMobile} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-accent hover:bg-white/10">
                               Admin Dashboard
                             </Link>
                           </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Shop */}
                  <Link to="/shop" onClick={closeMobile} className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10 hover:text-foreground">
                    Shop
                  </Link>

                  {/* Reviews */}
                  <a
                    href="/#reviews"
                    onClick={closeMobile}
                    className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10 hover:text-foreground"
                  >
                    Reviews
                  </a>

                  <div className="my-2 border-t border-border/30" />
                  <div className="flex flex-wrap gap-2">
                    {/* Currency */}
                    <label className="flex-1 min-w-[120px] rounded-xl bg-secondary/20 px-3 py-3 text-sm font-medium text-foreground">
                      <span className="mb-1 block text-xs text-muted-foreground">Currency</span>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as typeof currency)}
                        className="w-full bg-transparent text-sm font-semibold outline-none"
                        aria-label="Choose currency"
                      >
                        {currencies.map((opt) => (
                          <option key={opt.code} value={opt.code} className="bg-background text-foreground">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-2 flex gap-2">
                    {isAdmin ? (
                      <Link to="/admin" onClick={closeMobile}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary/20 px-4 py-3.5 text-sm font-medium text-foreground">
                        <LayoutDashboard className="h-4 w-4" />Dashboard
                      </Link>
                    ) : (
                      <Link to="/login" onClick={closeMobile}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary/20 px-4 py-3.5 text-sm font-medium text-foreground">
                        <LogIn className="h-4 w-4" />Login
                      </Link>
                    )}
                  </div>

                  <button
                    type="button"
                    className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-sunset px-4 py-3.5 text-sm font-semibold text-white shadow-soft"
                  >
                    <Bell className="h-4 w-4" />Subscribe
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
