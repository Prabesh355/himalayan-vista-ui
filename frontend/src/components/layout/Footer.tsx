import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { siteSettingsService, CmsLink } from "@/services/siteSettingsService";
import logo from "@/assets/logo.png";

function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function FooterLink({ item }: { item: CmsLink }) {
  const href = item.href || "/";

  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-sm text-muted-foreground transition hover:text-foreground"
      >
        {item.label}
      </a>
    );
  }

  return (
    <Link to={href as any} className="text-sm text-muted-foreground transition hover:text-foreground">
      {item.label}
    </Link>
  );
}

export function Footer() {
  const { data: settingsResponse } = useQuery({
    queryKey: ["site-settings"],
    queryFn: () => siteSettingsService.getSiteSettings(),
    staleTime: 5 * 60 * 1000,
  });
  const settings = settingsResponse?.data;
  const logoSrc = settings?.logoUrl || logo;
  const siteName = settings?.siteName || "Nomads Navigate Nepal";
  const footerTagline =
    settings?.footerTagline ||
    "Crafting unforgettable Himalayan journeys since 2011. Locally owned, ethically run, lifelong memories.";
  const socialLinks = settings?.socialLinks || {};
  const footerColumns =
    settings?.footerColumns?.length
      ? settings.footerColumns
      : [
          {
            title: "Explore",
            links: [
              { label: "Destinations", href: "/destinations", visible: true },
              { label: "Trekking Packages", href: "/packages", visible: true },
              { label: "Our Teams", href: "/teams", visible: true },
              { label: "Stories", href: "/blogs", visible: true },
              { label: "Gallery", href: "/about", visible: true },
            ],
          },
          {
            title: "Company",
            links: [
              { label: "About Us", href: "/about", visible: true },
              { label: "Contact", href: "/contact", visible: true },
              { label: "Sign In", href: "/login", visible: true },
              { label: "Dashboard", href: "/dashboard", visible: true },
            ],
          },
          {
            title: "Support",
            links: [
              { label: "Trekking FAQs", href: "/contact", visible: true },
              { label: "Permits & Visas", href: "/contact", visible: true },
              { label: "Responsible Travel", href: "/about", visible: true },
              { label: "Safety", href: "/about", visible: true },
            ],
          },
        ];
  const copyright =
    settings?.copyrightText || "Nomads Navigate Nepal. Made with thin air & strong tea.";

  return (
    <footer className="relative mt-32 border-t border-white/5 bg-gradient-to-b from-transparent to-black/80">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-4 group">
              <img
                src={logoSrc}
                alt={siteName}
                className="h-20 w-auto shrink-0 object-contain transition-transform group-hover:scale-105"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">
                  Nomads Navigate
                </span>
                <span className="font-display text-sm font-extrabold uppercase tracking-[0.3em] text-accent">
                  Nepal
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {footerTagline}
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground hover:scale-105"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              )}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground hover:scale-105"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground hover:scale-105"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground hover:scale-105"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              )}
              <a
                href={`mailto:${settings?.contactEmail || "nomadsnavigatenepal5@gmail.com"}`}
                className="grid h-9 w-9 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground hover:scale-105"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold tracking-wide text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.filter((link) => link.visible !== false).map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <FooterLink item={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {copyright}
          </p>
          <p>{settings?.address || "Thamel, Kathmandu · Lakeside, Pokhara"}</p>
        </div>
      </div>
    </footer>
  );
}
