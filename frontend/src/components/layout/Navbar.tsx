import { Link, useRouterState } from "@tanstack/react-router";
import {
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
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { siteSettingsService } from "@/services/siteSettingsService";
import { useCurrency } from "@/context/CurrencyProvider";
import logo from "@/assets/nomads-logo-official.png";

// ─── Static nav structure ────────────────────────────────────────────────────

const TREKKING_PACKAGES = [
  { label: "Annapurna Circuit Trek", slug: "annapurna-circuit-trek" },
  { label: "Everest Base Camp", slug: "everest-base-camp" },
  { label: "Manaslu and Tsum Valley Trek", slug: "manaslu-and-tsum-valley-trek" },
  { label: "Annapurna Base Camp Trek", slug: "annapurna-base-camp-trek" },
  { label: "Three Pass Trek", slug: "three-pass-trek" },
];

const REMOTE_TREKKING = [
  { label: "API Himal Base Camp", slug: "api-himal-base-camp" },
  { label: "Kanchenjunga Base Camp", slug: "kanchenjunga-base-camp" },
  { label: "Tshorolpa Valley Trek", slug: "tshorolpa-valley-trek" },
];

const EXPEDITIONS = [
  { label: "Lobuche East Peak", slug: "lobuche-east-peak" },
  { label: "Island Peak", slug: "island-peak" },
  { label: "Mera Peak", slug: "mera-peak" },
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
      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors"
    >
      <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
      {label}
    </Link>
  );
}

// ─── Trekking Mega-Dropdown ───────────────────────────────────────────────────

function TrekkingDropdown({ onClose }: { onClose: () => void }) {
  const { open, setOpen, ref } = useDropdown();

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 px-2 py-2 text-[11px] lg:text-xs font-bold uppercase tracking-wider transition-colors hover:text-foreground ${
          open ? "text-foreground" : "text-foreground/80"
        }`}
      >
        Trekking
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full pt-2 z-50 min-w-[520px]">
          <div className="glass-strong rounded-2xl p-4 shadow-elegant border border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-4">
              {/* Classic Trekking */}
              <div>
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-accent">
                  Classic Trekking
                </p>
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
              <div>
                <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-accent">
                  Remote Trekking
                </p>
                <p className="mb-2 px-3 text-[10px] text-muted-foreground italic">Main Objective</p>
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
            <div className="mt-4 border-t border-border/30 pt-3">
              <Link
                to="/packages"
                onClick={() => { setOpen(false); onClose(); }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-sunset px-4 py-2 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
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

// ─── Expedition Dropdown ──────────────────────────────────────────────────────

function ExpeditionDropdown({ onClose }: { onClose: () => void }) {
  const { open, setOpen, ref } = useDropdown();

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 px-2 py-2 text-[11px] lg:text-xs font-bold uppercase tracking-wider transition-colors hover:text-foreground ${
          open ? "text-foreground" : "text-foreground/80"
        }`}
      >
        Expedition
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full pt-2 z-50 min-w-[220px]">
          <div className="glass-strong rounded-2xl p-3 shadow-elegant border border-border/50 bg-background/95 backdrop-blur-xl">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-accent">
              Peak Climbing
            </p>
            <div className="space-y-0.5">
              {EXPEDITIONS.map((exp) => (
                <Link
                  key={exp.slug}
                  to="/packages/$slug"
                  params={{ slug: exp.slug }}
                  onClick={() => { setOpen(false); onClose(); }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors"
                >
                  <Mountain className="h-3.5 w-3.5 shrink-0 text-accent" />
                  {exp.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </li>
  );
}

// ─── Others Dropdown ──────────────────────────────────────────────────────────

function OthersDropdown({ isAdmin }: { isAdmin: boolean }) {
  const { open, setOpen, ref } = useDropdown();

  const links = isAdmin
    ? [...MORE_LINKS, { to: "/admin", label: "Admin" }]
    : MORE_LINKS;

  return (
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 px-2 py-2 text-[11px] lg:text-xs font-bold uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground"
      >
        Others
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full pt-2 z-50 min-w-[150px]">
          <div className="glass-strong rounded-xl p-2 shadow-elegant border border-border/50 bg-background/95 backdrop-blur-xl">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to as any}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-white/10 hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
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

  useEffect(() => { setOpen(false); setMobileExpanded(null); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMobile = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
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
            <Link to="/" className="flex flex-col items-center text-center group shrink-0">
              <img
                src={logoSrc}
                alt={siteName}
                className={`object-contain transition-all duration-500 ease-out group-hover:scale-105 ${
                  scrolled ? "h-9 w-auto" : "h-16 w-auto md:h-20"
                }`}
                style={{ background: "transparent" }}
              />
              {/* Text directly under logo — hidden on scroll */}
              <div
                className={`flex flex-col items-center transition-all duration-500 overflow-hidden ${
                  scrolled ? "max-h-0 opacity-0 mt-0" : "max-h-10 opacity-100 mt-0.5"
                }`}
              >
                <span className="font-display text-[8px] font-bold uppercase tracking-[0.18em] text-foreground/80 whitespace-nowrap leading-none">
                  Nomads Navigate
                </span>
                <span className="font-display text-[9px] font-black uppercase tracking-[0.2em] text-accent whitespace-nowrap leading-none mt-0.5">
                  Nepal
                </span>
              </div>
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
              <li>
                <Link
                  to="/destinations"
                  className="relative inline-flex items-center px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap"
                  activeProps={{ className: "text-foreground" }}
                >
                  {({ isActive }) => (
                    <>
                      Destinations
                      {isActive && <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-sunset" />}
                    </>
                  )}
                </Link>
              </li>
              <TrekkingDropdown onClose={closeMobile} />
              <ExpeditionDropdown onClose={closeMobile} />
              <li>
                <Link
                  to="/teams"
                  className="relative inline-flex items-center px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap"
                  activeProps={{ className: "text-foreground" }}
                >
                  {({ isActive }) => (
                    <>
                      Our Teams
                      {isActive && <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-sunset" />}
                    </>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="relative inline-flex items-center px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap"
                  activeProps={{ className: "text-foreground" }}
                >
                  {({ isActive }) => (
                    <>
                      Stories
                      {isActive && <span className="absolute inset-x-2.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-sunset" />}
                    </>
                  )}
                </Link>
              </li>
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
              <OthersDropdown isAdmin={isAdmin} />
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

            {/* Admin dashboard link */}
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary ring-1 ring-primary/20 transition-colors hover:bg-primary/15"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                Dashboard
              </Link>
            )}

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
              className="md:hidden fixed inset-x-0 top-[72px] bottom-0 z-50 overflow-y-auto overscroll-contain"
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

                  {/* Destinations */}
                  <Link to="/destinations" onClick={closeMobile} className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10 hover:text-foreground">
                    Destinations
                  </Link>

                  {/* Trekking accordion */}
                  <div>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === "trekking" ? null : "trekking")}
                      className="w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10"
                    >
                      Trekking
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "trekking" ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpanded === "trekking" && (
                      <div className="mx-2 mb-2 rounded-xl bg-white/5 p-2">
                        <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">Classic Trekking</p>
                        {TREKKING_PACKAGES.map((pkg) => (
                          <Link key={pkg.slug} to="/packages/$slug" params={{ slug: pkg.slug }} onClick={closeMobile}
                            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-white/10">
                            <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />{pkg.label}
                          </Link>
                        ))}
                        <div className="my-2 border-t border-border/20" />
                        <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">Remote Trekking</p>
                        {REMOTE_TREKKING.map((pkg) => (
                          <Link key={pkg.slug} to="/packages/$slug" params={{ slug: pkg.slug }} onClick={closeMobile}
                            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-white/10">
                            <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />{pkg.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Expedition accordion */}
                  <div>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === "expedition" ? null : "expedition")}
                      className="w-full flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10"
                    >
                      Expedition
                      <ChevronDown className={`h-4 w-4 transition-transform ${mobileExpanded === "expedition" ? "rotate-180" : ""}`} />
                    </button>
                    {mobileExpanded === "expedition" && (
                      <div className="mx-2 mb-2 rounded-xl bg-white/5 p-2">
                        <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-accent">Peak Climbing</p>
                        {EXPEDITIONS.map((exp) => (
                          <Link key={exp.slug} to="/packages/$slug" params={{ slug: exp.slug }} onClick={closeMobile}
                            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-white/10">
                            <Mountain className="h-3.5 w-3.5 text-accent shrink-0" />{exp.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Our Teams */}
                  <Link to="/teams" onClick={closeMobile} className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10 hover:text-foreground">
                    Our Teams
                  </Link>

                  {/* Stories */}
                  <Link to="/blogs" onClick={closeMobile} className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10 hover:text-foreground">
                    Stories
                  </Link>

                  {/* Shop */}
                  <Link to="/shop" onClick={closeMobile} className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10 hover:text-foreground">
                    Shop
                  </Link>

                  {/* Others */}
                  <div className="my-2 border-t border-border/30" />
                  {(isAdmin ? [...MORE_LINKS, { to: "/admin", label: "Admin" }] : MORE_LINKS).map((l) => (
                    <Link key={l.to} to={l.to as any} onClick={closeMobile}
                      className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-white/10 hover:text-foreground">
                      {l.label}
                    </Link>
                  ))}

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
