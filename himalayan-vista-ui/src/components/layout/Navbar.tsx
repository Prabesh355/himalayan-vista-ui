import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ShoppingCart, LogIn, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/NOMADS NAVIGATE  NEPAL STAMP.webp";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Trekking" },
  { to: "/teams", label: "Our Teams" },
  { to: "/blogs", label: "Stories" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const visibleNavLinks = isAdmin
    ? [...navLinks, { to: "/admin", label: "Admin" }]
    : navLinks;

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsAdmin(parsedUser?.role === 'admin');
      } catch {
        setIsAdmin(false);
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
            <img src={logo} alt="Nomads Navigate Nepal" className="h-12 w-14 shrink-0 object-contain transition-transform group-hover:rotate-3 md:h-14 md:w-16" />
            <span className="hidden whitespace-nowrap text-sm font-semibold tracking-tight text-foreground sm:inline md:text-base">
              Nomads <span className="text-gradient-sunset">Navigate Nepal</span>
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-1">
            {visibleNavLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {({ isActive }) => (
                    <>
                      <span>{l.label}</span>
                      {isActive && (
                        <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-sunset" />
                      )}
                    </>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/shop"
              className="hidden md:inline-flex items-center justify-center h-10 w-10 rounded-full glass hover:bg-secondary transition-colors"
              title="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="hidden md:inline-flex items-center justify-center gap-2 rounded-full bg-foreground/10 px-3 py-2 text-sm font-medium hover:bg-foreground/20 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
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
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-2 animate-fade-up">
            {visibleNavLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Link
                to="/shop"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground"
              >
                <ShoppingCart className="h-4 w-4" />
                Shop
              </Link>
              <Link
                to="/login"
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </div>
            <button
              type="button"
              className="mt-2 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-sunset px-4 py-3 text-sm font-semibold text-white"
            >
              <Bell className="h-4 w-4" />
              Subscribe
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
