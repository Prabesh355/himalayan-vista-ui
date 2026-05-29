import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent, d as useRouterState } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { J, z } from "../_libs/next-themes.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { X, c as Menu, I as Instagram, k as Twitter, F as Facebook, Y as Youtube, j as Sun, d as Moon } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-B9v33w1i.css";
function ThemeProvider({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    J,
    {
      attribute: "class",
      defaultTheme: "dark",
      enableSystem: true,
      disableTransitionOnChange: true,
      children
    }
  );
}
function ThemeToggle() {
  const { resolvedTheme, setTheme } = z();
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "aria-label": "Toggle theme",
      onClick: () => setTheme(isDark ? "light" : "dark"),
      className: "relative inline-flex h-10 w-10 items-center justify-center rounded-full glass text-foreground transition-all hover:scale-105 hover:shadow-glow",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: `h-4 w-4 absolute transition-all ${isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: `h-4 w-4 absolute transition-all ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"}` })
      ]
    }
  );
}
const logo = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgODAwIDgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgPCEtLSBTdW4gLS0+DQogIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjEyMCIgcj0iODAiIGZpbGw9IiNGRkE1MDAiIG9wYWNpdHk9IjAuOSIvPg0KICANCiAgPCEtLSBNb3VudGFpbiBSYW5nZSBCYWNrZ3JvdW5kIC0tPg0KICA8ZGVmcz4NCiAgICA8bGluZWFyR3JhZGllbnQgaWQ9Im1vdW50YWluR3JhZGllbnQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj4NCiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNFOEU4RTg7c3RvcC1vcGFjaXR5OjEiIC8+DQogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNEMEQwRDA7c3RvcC1vcGFjaXR5OjEiIC8+DQogICAgPC9saW5lYXJHcmFkaWVudD4NCiAgPC9kZWZzPg0KICANCiAgPCEtLSBNb3VudGFpbiAxIChMZWZ0KSAtLT4NCiAgPHBvbHlnb24gcG9pbnRzPSIxNTAsNTAwIDM1MCwyMDAgMjgwLDUwMCIgZmlsbD0idXJsKCNtb3VudGFpbkdyYWRpZW50KSIgc3Ryb2tlPSIjNUM0MDMzIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCiAgDQogIDwhLS0gTW91bnRhaW4gMiAoQ2VudGVyKSAtLT4NCiAgPHBvbHlnb24gcG9pbnRzPSIzMDAsNTUwIDUwMCwxNTAgNzAwLDU1MCIgZmlsbD0idXJsKCNtb3VudGFpbkdyYWRpZW50KSIgc3Ryb2tlPSIjNUM0MDMzIiBzdHJva2Utd2lkdGg9IjEwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQogIA0KICA8IS0tIE1vdW50YWluIDMgKFJpZ2h0KSAtLT4NCiAgPHBvbHlnb24gcG9pbnRzPSI1NTAsNTAwIDc1MCwyNTAgODIwLDUwMCIgZmlsbD0idXJsKCNtb3VudGFpbkdyYWRpZW50KSIgc3Ryb2tlPSIjNUM0MDMzIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4NCiAgDQogIDwhLS0gVHJla2tlciAtLT4NCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDgwLCAyODApIj4NCiAgICA8IS0tIEhlYWQgLS0+DQogICAgPGNpcmNsZSBjeD0iMCIgY3k9Ii0xNSIgcj0iOCIgZmlsbD0iIzNEMjgxNyIvPg0KICAgIDwhLS0gQm9keSAtLT4NCiAgICA8cmVjdCB4PSItNCIgeT0iLTUiIHdpZHRoPSI4IiBoZWlnaHQ9IjI1IiBmaWxsPSIjM0QyODE3Ii8+DQogICAgPCEtLSBMZWdzIC0tPg0KICAgIDxsaW5lIHgxPSItMyIgeTE9IjIwIiB4Mj0iLTYiIHkyPSIzNSIgc3Ryb2tlPSIjM0QyODE3IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPg0KICAgIDxsaW5lIHgxPSIzIiB5MT0iMjAiIHgyPSI4IiB5Mj0iMzUiIHN0cm9rZT0iIzNEMjgxNyIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4NCiAgICA8IS0tIEFybXMgcmFpc2VkIC0tPg0KICAgIDxsaW5lIHgxPSItNCIgeTE9IjUiIHgyPSItMTUiIHkyPSItNSIgc3Ryb2tlPSIjM0QyODE3IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPg0KICAgIDxsaW5lIHgxPSI0IiB5MT0iNSIgeDI9IjE1IiB5Mj0iLTUiIHN0cm9rZT0iIzNEMjgxNyIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4NCiAgPC9nPg0KICANCiAgPCEtLSBUZXh0IC0tPg0KICA8dGV4dCB4PSI0MDAiIHk9IjY4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ4IiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzNEMjgxNyIgbGV0dGVyLXNwYWNpbmc9IjIiPg0KICAgIE5PTUFEUyBOQVZJR0FURQ0KICA8L3RleHQ+DQogIDx0ZXh0IHg9IjQwMCIgeT0iNzQwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjM0QyODE3IiBsZXR0ZXItc3BhY2luZz0iMiI+DQogICAgTkVQQUwNCiAgPC90ZXh0Pg0KPC9zdmc+DQo=";
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Trekking" },
  { to: "/teams", label: "Our Teams" },
  { to: "/blogs", label: "Stories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => setOpen(false), [pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "nav",
          {
            className: `flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${scrolled ? "glass shadow-elegant" : "bg-transparent"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Nomads Navigate Nepal", className: "h-10 w-10 transition-transform group-hover:rotate-6" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold tracking-tight text-foreground hidden sm:inline", children: [
                  "Nomads ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-sunset", children: "Nepal" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "hidden md:flex items-center gap-1", children: navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: l.to,
                  activeOptions: { exact: l.to === "/" },
                  className: "relative inline-flex items-center px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground",
                  activeProps: { className: "text-foreground" },
                  children: ({ isActive }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: l.label }),
                    isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-sunset" })
                  ] })
                }
              ) }, l.to)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/login",
                    className: "hidden md:inline-flex items-center justify-center rounded-full bg-gradient-sunset px-4 py-2 text-sm font-semibold text-white shadow-soft transition-all hover:shadow-glow hover:-translate-y-0.5",
                    children: "Plan a Trip"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Menu",
                    onClick: () => setOpen((v) => !v),
                    className: "md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full glass",
                    children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
                  }
                )
              ] })
            ]
          }
        ),
        open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden mt-2 glass rounded-2xl p-2 animate-fade-up", children: [
          navLinks.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.to,
              activeOptions: { exact: l.to === "/" },
              className: "block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
              activeProps: { className: "bg-secondary text-foreground" },
              children: l.label
            },
            l.to
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              className: "mt-1 block rounded-xl bg-gradient-sunset px-4 py-3 text-center text-sm font-semibold text-white",
              children: "Plan a Trip"
            }
          )
        ] })
      ] })
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative mt-32 border-t border-border/60 bg-gradient-to-b from-transparent to-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-12 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "Nomads Navigate Nepal", className: "h-10 w-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold tracking-tight", children: [
            "Nomads ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-sunset", children: "Nepal" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground leading-relaxed", children: "Crafting unforgettable Himalayan journeys since 2011. Locally owned, ethically run, lifelong memories." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 flex gap-3", children: [Instagram, Twitter, Facebook, Youtube].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#",
            className: "grid h-9 w-9 place-items-center rounded-full glass text-muted-foreground transition hover:text-foreground hover:scale-105",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
          },
          i
        )) })
      ] }),
      [
        {
          title: "Explore",
          links: [
            ["Destinations", "/destinations"],
            ["Trekking Packages", "/packages"],
            ["Our Teams", "/teams"],
            ["Stories", "/blogs"],
            ["Gallery", "/about"]
          ]
        },
        {
          title: "Company",
          links: [
            ["About Us", "/about"],
            ["Contact", "/contact"],
            ["Sign In", "/login"],
            ["Dashboard", "/dashboard"]
          ]
        },
        {
          title: "Support",
          links: [
            ["Trekking FAQs", "/contact"],
            ["Permits & Visas", "/contact"],
            ["Responsible Travel", "/about"],
            ["Safety", "/about"]
          ]
        }
      ].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold tracking-wide text-foreground", children: col.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2.5", children: col.links.map(([label, href]) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: href,
            className: "text-sm text-muted-foreground transition hover:text-foreground",
            children: label
          }
        ) }, label)) })
      ] }, col.title))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Nomads Navigate Nepal. Made with thin air & strong tea."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Thamel, Kathmandu · Lakeside, Pokhara" })
    ] })
  ] }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$9 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nomads Navigate Nepal — Himalayan Treks & Adventures" },
      { name: "description", content: "Premium Himalayan trekking and adventure travel. Everest, Annapurna, Langtang and beyond — locally led journeys since 2011." },
      { name: "author", content: "Nomads Navigate Nepal" },
      { property: "og:title", content: "Nomads Navigate Nepal" },
      { property: "og:description", content: "Premium Himalayan trekking and adventure travel, locally led." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$9.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 pt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$8 = () => import("./teams-BGpB1iqm.mjs");
const Route$8 = createFileRoute("/teams")({
  head: () => ({
    meta: [{
      title: "Our Team — Nomads Navigate Nepal"
    }, {
      name: "description",
      content: "Meet our experienced trekking guides and expedition leaders. Local experts with decades of combined experience in the Himalayas."
    }, {
      property: "og:title",
      content: "Our Team — Nomads Navigate Nepal"
    }, {
      property: "og:description",
      content: "Meet the expert guides who lead our Himalayan adventures."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./packages-Ddt1OuTo.mjs");
const Route$7 = createFileRoute("/packages")({
  head: () => ({
    meta: [{
      title: "Trekking Packages — Nomads Navigate Nepal"
    }, {
      name: "description",
      content: "Trekking Packages — Nomads Navigate Nepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./login-DIVvrg2F.mjs");
const Route$6 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in / Register — Nomads Navigate Nepal"
    }, {
      name: "description",
      content: "Sign in / Register — Nomads Navigate Nepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./destinations-CYRj3taZ.mjs");
const Route$5 = createFileRoute("/destinations")({
  head: () => ({
    meta: [{
      title: "Destinations — Nomads Navigate Nepal"
    }, {
      name: "description",
      content: "Explore Nepal's most iconic regions — Everest, Annapurna, Langtang, Kathmandu Valley, Pokhara and the lowlands of Chitwan."
    }, {
      property: "og:title",
      content: "Destinations — Nomads Navigate Nepal"
    }, {
      property: "og:description",
      content: "Six signature Himalayan regions. Find the one that calls you."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./dashboard-fjFWcUVI.mjs");
const Route$4 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Your dashboard — Nomads Navigate Nepal"
    }, {
      name: "description",
      content: "Your dashboard — Nomads Navigate Nepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./contact-BjA_voyD.mjs");
const Route$3 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Talk to a guide — Nomads Navigate Nepal"
    }, {
      name: "description",
      content: "Talk to a guide — Nomads Navigate Nepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./blogs-Ct0XSg3T.mjs");
const Route$2 = createFileRoute("/blogs")({
  head: () => ({
    meta: [{
      title: "Stories from the trail — Nomads Navigate Nepal"
    }, {
      name: "description",
      content: "Stories from the trail — Nomads Navigate Nepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about-CnE5OkW-.mjs");
const Route$1 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About Nomads — Nomads Navigate Nepal"
    }, {
      name: "description",
      content: "About Nomads — Nomads Navigate Nepal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-DHyAgE1w.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Nomads Navigate Nepal — Himalayan Treks & Adventures"
    }, {
      name: "description",
      content: "Premium Himalayan trekking and adventure travel. Everest, Annapurna, Langtang and beyond — locally led journeys since 2011."
    }, {
      property: "og:title",
      content: "Nomads Navigate Nepal"
    }, {
      property: "og:description",
      content: "Premium Himalayan trekking and adventure travel, locally led."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TeamsRoute = Route$8.update({
  id: "/teams",
  path: "/teams",
  getParentRoute: () => Route$9
});
const PackagesRoute = Route$7.update({
  id: "/packages",
  path: "/packages",
  getParentRoute: () => Route$9
});
const LoginRoute = Route$6.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$9
});
const DestinationsRoute = Route$5.update({
  id: "/destinations",
  path: "/destinations",
  getParentRoute: () => Route$9
});
const DashboardRoute = Route$4.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$9
});
const ContactRoute = Route$3.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$9
});
const BlogsRoute = Route$2.update({
  id: "/blogs",
  path: "/blogs",
  getParentRoute: () => Route$9
});
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$9
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$9
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  BlogsRoute,
  ContactRoute,
  DashboardRoute,
  DestinationsRoute,
  LoginRoute,
  PackagesRoute,
  TeamsRoute
};
const routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
