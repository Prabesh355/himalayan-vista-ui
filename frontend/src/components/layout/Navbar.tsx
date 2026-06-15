import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChevronDown,
  Globe,
  LayoutDashboard,
  LogIn,
  Menu,
  Settings,
  ShoppingCart,
  UserCircle,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { siteSettingsService, CmsLink } from "@/services/siteSettingsService";
import { useCurrency } from "@/context/CurrencyProvider";
// import logo from "@/assets/NOMADS NAVIGATE  NEPAL STAMP.webp";
// import logo from "@/assets/logo-nomads.png";
import logo from "@/assets/nomadslogonew.jpeg";

const fallbackNavLinks: CmsLink[] = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Trekking" },
  { to: "/teams", label: "Our Teams" },
  { to: "/blogs", label: "Stories" },
  { to: "/shop", label: "Shop" },
] as const as unknown as CmsLink[];

const fallbackMoreLinks: CmsLink[] = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const as unknown as CmsLink[];

type StoredUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
};

function normalizeLink(link: CmsLink): CmsLink {
  return {
    ...link,
    href: link.href || (link as any).to || "/",
  };
}

function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function sortVisibleLinks(items: CmsLink[], placement: "primary" | "more") {
  return items
    .map(normalizeLink)
    .filter((item) => item.visible !== false && (item.placement || "primary") === placement)
    .sort((a, b) => (a.order || 0) - (b.order || 0));
}

function NavLinkItem({ item, className }: { item: CmsLink; className: string }) {
  const href = item.href || "/";

  if (isExternalLink(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
      </a>
    );
  }

  return (
    <Link
      to={href as any}
      activeOptions={{ exact: href === "/" }}
      className={className}
      activeProps={{ className: "text-foreground font-bold" }}
    >
      {({ isActive }) => (
        <>
          <span>{item.label}</span>
          {isActive && (
            <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-sunset" />
          )}
        </>
      )}
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
  const cmsItems = settings?.navbarItems?.length ? settings.navbarItems : [];
  const navLinks = cmsItems.length ? sortVisibleLinks(cmsItems, "primary") : fallbackNavLinks;
  const moreLinks = cmsItems.length ? sortVisibleLinks(cmsItems, "more") : fallbackMoreLinks;
  const visibleMoreLinks = isAdmin
    ? [...moreLinks, { id: "admin", href: "/admin", label: "Admin", visible: true }]
    : moreLinks;
  const logoSrc = settings?.logoUrl || logo;
  const adminName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "Admin";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "glass shadow-elegant" : "bg-transparent"
          }`}
        >
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoSrc}
              alt={settings?.siteName || "Nomads Navigate Nepal"}
              className="h-12 w-12 shrink-0 object-contain rounded-full transition-transform group-hover:rotate-3 md:h-14 md:w-14"
            />
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.id || l.href}>
                <NavLinkItem
                  item={l}
                  className="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:text-foreground data-[status=active]:text-foreground"
                />
              </li>
            ))}
            <li className="relative group">
              <button className="inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold text-foreground/90 transition-colors hover:text-foreground">
                Others
                <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
                <div className="glass rounded-xl p-2 shadow-elegant min-w-[140px] border border-border/50">
                  {visibleMoreLinks.map((l) => (
                    <NavLinkItem
                      key={l.id || l.href}
                      item={l}
                      className="block px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-secondary hover:text-foreground rounded-lg transition-colors"
                    />
                  ))}
                </div>
              </div>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            {/* Currency selector added to desktop view */}
            <label className="hidden md:flex items-center gap-1 rounded-full bg-secondary/50 px-3 py-2 text-sm font-medium text-foreground">
              <Globe className="h-4 w-4" />
              <select
                value={currency}
                onChange={(event) => setCurrency(event.target.value as typeof currency)}
                className="bg-transparent text-sm font-semibold outline-none"
                aria-label="Choose currency"
              >
                {currencies.map((option) => (
                  <option key={option.code} value={option.code} className="bg-background text-foreground">
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-xs font-semibold text-primary ring-1 ring-primary/20 transition-colors hover:bg-primary/15"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            )}
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center justify-center h-10 w-10 rounded-full glass hover:bg-secondary transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            {isAdmin ? (
              <div className="hidden md:block relative group">
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground/10 px-3 py-2 text-sm font-medium hover:bg-foreground/20 transition-colors">
                  <UserCircle className="h-4 w-4" />
                  {adminName}
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                    Admin
                  </span>
                </button>
                <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
                  <div className="glass min-w-[170px] rounded-xl border border-border/50 p-2 shadow-elegant">
                    <Link to="/admin" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-secondary">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-secondary">
                      <Globe className="h-4 w-4" />
                      View Website
                    </Link>
                    <Link to="/admin/settings" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold hover:bg-secondary">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-foreground/10 px-3 py-2 text-sm font-medium hover:bg-foreground/20 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
            <button
              type="button"
              className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sunset px-4 py-2 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-glow hover:-translate-y-0.5"
              title="Subscribe for updates"
            >
              <Bell className="h-4 w-4" />
              Subscribe
            </button>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 border border-border shadow-md backdrop-blur-sm text-foreground"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu backdrop overlay + sliding panel */}
        {open && (
          <>
            {/* Dark backdrop - clicking it closes the menu */}
            <div
              className="md:hidden fixed inset-0 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            {/* Scrollable mobile nav panel */}
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
                  {navLinks.map((l) => (
                    <NavLinkItem
                      key={l.id || l.href}
                      item={l}
                      className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-secondary hover:text-foreground active:bg-secondary/80"
                    />
                  ))}
                  <div className="my-2 border-t border-border/30" />
                  {visibleMoreLinks.map((l) => (
                    <NavLinkItem
                      key={l.id || l.href}
                      item={l}
                      className="block rounded-xl px-4 py-3.5 text-base font-semibold text-foreground/90 hover:bg-secondary hover:text-foreground active:bg-secondary/80"
                    />
                  ))}
                  <div className="my-2 border-t border-border/30" />
                  <div className="flex flex-wrap gap-2">
                    {/* Currency selector added to mobile view */}
                    <label className="flex-1 min-w-[120px] rounded-xl bg-secondary px-3 py-3 text-sm font-medium text-foreground">
                      <span className="mb-1 block text-xs text-muted-foreground">Currency</span>
                      <select
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value as typeof currency)}
                        className="w-full bg-transparent text-sm font-semibold outline-none"
                        aria-label="Choose currency"
                      >
                        {currencies.map((option) => (
                          <option key={option.code} value={option.code} className="bg-background text-foreground">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <Link
                      to="/shop"
                      className="flex-1 min-w-[100px] flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3.5 text-sm font-medium text-foreground active:bg-secondary/80"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Shop
                    </Link>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {isAdmin ? (
                      <Link
                        to="/admin"
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3.5 text-sm font-medium text-foreground active:bg-secondary/80"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3.5 text-sm font-medium text-foreground active:bg-secondary/80"
                      >
                        <LogIn className="h-4 w-4" />
                        Login
                      </Link>
                    )}
                  </div>
                  <button
                    type="button"
                    className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-sunset px-4 py-3.5 text-sm font-semibold text-white shadow-soft active:opacity-90"
                  >
                    <Bell className="h-4 w-4" />
                    Subscribe
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
