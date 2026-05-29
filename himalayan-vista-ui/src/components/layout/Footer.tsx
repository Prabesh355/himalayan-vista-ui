import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import logo from "@/assets/logo.svg";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-gradient-to-b from-transparent to-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Nomads Navigate Nepal" className="h-10 w-10" />
              <span className="font-semibold tracking-tight">
                Nomads <span className="text-gradient-sunset">Nepal</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Crafting unforgettable Himalayan journeys since 2011. Locally owned, ethically run, lifelong memories.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground hover:scale-105"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Explore",
              links: [
                ["Destinations", "/destinations"],
                ["Trekking Packages", "/packages"],
                ["Our Teams", "/teams"],
                ["Stories", "/blogs"],
                ["Gallery", "/about"],
              ],
            },
            {
              title: "Company",
              links: [
                ["About Us", "/about"],
                ["Contact", "/contact"],
                ["Sign In", "/login"],
                ["Dashboard", "/dashboard"],
              ],
            },
            {
              title: "Support",
              links: [
                ["Trekking FAQs", "/contact"],
                ["Permits & Visas", "/contact"],
                ["Responsible Travel", "/about"],
                ["Safety", "/about"],
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold tracking-wide text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      to={href as string}
                      className="text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Nomads Navigate Nepal. Made with thin air & strong tea.</p>
          <p>Thamel, Kathmandu · Lakeside, Pokhara</p>
        </div>
      </div>
    </footer>
  );
}